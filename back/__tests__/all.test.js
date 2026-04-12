const request = require('supertest');
const { app } = require('../index');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../models/user');
const Post = require('../models/post');
const Meeting = require('../models/meeting');
const Report = require('../models/report');
const Conversation = require('../models/conversation');
const Message = require('../models/message');
const jwt = require('jsonwebtoken');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.disconnect();
    await mongoose.connect(uri);
    process.env.JWT_PRIVATE_KEY = 'secret';
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
});

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_PRIVATE_KEY, { expiresIn: '1h' });
};

describe('Backend Tests (1 to 13)', () => {

    it('1. Users can create profiles', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'profile@example.com',
                password: 'password123',
                f_name: 'Profile User'
            });
        expect(res.statusCode).toBe(201);
        const user = await User.findOne({ email: 'profile@example.com' });
        expect(user.f_name).toBe('Profile User');
    });

    it('2. Users can create posts and comment and like', async () => {
        const user1 = await User.create({ email: 'post1@ex.com', password: 'pwd', f_name: 'Post User' });
        const user2 = await User.create({ email: 'post2@ex.com', password: 'pwd', f_name: 'Commenter' });
        const token1 = generateToken(user1._id);
        const token2 = generateToken(user2._id);

        const postRes = await request(app)
            .post('/api/post/')
            .set('Cookie', [`token=${token1}`])
            .send({ desc: 'My first post' });
        expect(postRes.statusCode).toBe(200);
        const postId = postRes.body.post._id;

        const likeRes = await request(app)
            .post('/api/post/likeDislike')
            .set('Cookie', [`token=${token2}`])
            .send({ postId });
        expect(likeRes.statusCode).toBe(200);
        expect(likeRes.body.likes).toContainEqual(user2._id.toString());

        const commentRes = await request(app)
            .post('/api/comment/')
            .set('Cookie', [`token=${token2}`])
            .send({ postId, comment: 'Nice post!' });
        expect(commentRes.statusCode).toBe(200);
        expect(commentRes.body.message).toMatch(/Comment/i);
    });

    it('3. Users can send friend requests and unfriend', async () => {
        const u1 = await User.create({ email: 'f1@ex.com', password: 'pwd', f_name: 'F1' });
        const u2 = await User.create({ email: 'f2@ex.com', password: 'pwd', f_name: 'F2' });
        const token1 = generateToken(u1._id);
        const token2 = generateToken(u2._id);

        const reqRes = await request(app)
            .post('/api/auth/sendFriendReq')
            .set('Cookie', [`token=${token1}`])
            .send({ reciever: u2._id });
        expect(reqRes.statusCode).toBe(200);

        const accRes = await request(app)
            .post('/api/auth/acceptFriendRequest')
            .set('Cookie', [`token=${token2}`])
            .send({ friendId: u1._id });
        expect(accRes.statusCode).toBe(200);

        const unfriendRes = await request(app)
            .delete(`/api/auth/removeFromFriendList/${u2._id}`)
            .set('Cookie', [`token=${token1}`]);
        expect(unfriendRes.statusCode).toBe(200);
    });

    it('4. Users can update bio', async () => {
        const user = await User.create({ email: 'bio@ex.com', password: 'pwd', f_name: 'Bio' });
        const token = generateToken(user._id);

        const updateRes = await request(app)
            .put('/api/auth/update')
            .set('Cookie', [`token=${token}`])
            .send({
                user: { headline: 'Software Engineer', about: 'I love coding' }
            });
        
        expect(updateRes.statusCode).toBe(200);
        expect(updateRes.body.user.headline).toBe('Software Engineer');
    });

    it('5. Users can schedule meetings', async () => {
        const creator = await User.create({ email: 'm1@ex.com', password: 'pwd', f_name: 'M1', points: 100 });
        const receiver = await User.create({ email: 'm2@ex.com', password: 'pwd', f_name: 'M2', points: 100 });
        const token1 = generateToken(creator._id);

        const scheduleRes = await request(app)
            .post('/api/meeting/')
            .set('Cookie', [`token=${token1}`])
            .send({
                receiverId: receiver._id,
                title: 'Tech sync',
                scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000), 
                pointsPromised: 50
            });
        expect(scheduleRes.statusCode).toBe(201);
        expect(scheduleRes.body.meeting.title).toBe('Tech sync');
    });

    it('6. Users can rate meetings', async () => {
        const creator = await User.create({ email: 'm3@ex.com', password: 'pwd', f_name: 'M3', points: 100 });
        const receiver = await User.create({ email: 'm4@ex.com', password: 'pwd', f_name: 'M4', points: 100 });
        const token1 = generateToken(creator._id);

        const meeting = await Meeting.create({
            creator: creator._id,
            receiver: receiver._id,
            title: 'Test Meeting',
            scheduledAt: new Date(Date.now() - 24 * 60 * 60 * 1000), 
            pointsPromised: 50, 
            status: 'completed'
        });

        const rateRes = await request(app)
            .post(`/api/meeting/${meeting._id}/rate`)
            .set('Cookie', [`token=${token1}`])
            .send({ rating: 4, comment: 'Good chat' });
        
        expect(rateRes.statusCode).toBe(200);
        expect(rateRes.body.pointsTransferred).toBe(40);
    });

    it('7. Users can report messages and posts and profiles', async () => {
        const u1 = await User.create({ email: 'r1@ex.com', password: 'pwd', f_name: 'R1' });
        const token1 = generateToken(u1._id);

        const post = await Post.create({ user: u1._id, desc: 'Bad post' });
        
        const reportRes = await request(app)
            .post('/api/report/')
            .set('Cookie', [`token=${token1}`])
            .send({
                targetId: post._id,
                reportType: 'post',
                reason: 'Spam'
            });
        
        expect(reportRes.statusCode).toBe(201);
    });

    it('8. Administrators can freeze accounts and its out of the database, then every users that was friend with that now frozen account looses that friend.', async () => {
        const user1 = await User.create({ email: 'u1@example.com', password: 'pwd', f_name: 'U1' });
        const user2 = await User.create({ email: 'u2@example.com', password: 'pwd', f_name: 'U2' });
        const admin = await User.create({ email: 'admin@example.com', password: 'pwd', f_name: 'Admin', isAdmin: true });

        user1.friends.push(user2._id);
        user2.friends.push(user1._id);
        await user1.save();
        await user2.save();

        const token = generateToken(admin._id);

        const res = await request(app)
            .delete(`/api/admin/user/${user1._id}/freeze`)
            .set('Cookie', [`token=${token}`]);

        expect(res.statusCode).toBe(200);

        const deletedUser = await User.findById(user1._id);
        expect(deletedUser).toBeNull();

        const updatedUser2 = await User.findById(user2._id);
        expect(updatedUser2.friends).not.toContainEqual(user1._id);
    });

    it('9. Users can clear chat history only on their side', async () => {
        const u1 = await User.create({ email: 'c1@example.com', password: 'pwd', f_name: 'C1' });
        const u2 = await User.create({ email: 'c2@example.com', password: 'pwd', f_name: 'C2' });
        
        const conv = await Conversation.create({ members: [u1._id, u2._id] });
        await Message.create({ conversation: conv._id, sender: u1._id, message: 'Hello' });

        const token = generateToken(u1._id);

        const res = await request(app)
            .delete(`/api/message/clear/${conv._id}`)
            .set('Cookie', [`token=${token}`]);
        
        expect(res.statusCode).toBe(200);
        
        const getRes = await request(app)
            .get(`/api/message/${conv._id}`)
            .set('Cookie', [`token=${token}`]);
            
        expect(getRes.body.message.length).toBe(0);
    });

    it('10. all new users per registration are given with 500 points', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'test500@example.com',
                password: 'password123',
                f_name: 'Test User'
            });

        expect(res.statusCode).toEqual(201);
        const user = await User.findOne({ email: 'test500@example.com' });
        expect(user.points).toBe(500);
    });

    it('11. there is no negative balance', async () => {
        const creator = await User.create({ email: 'creator_neg@example.com', password: 'pwd', points: 10, f_name: 'Creator' });
        const receiver = await User.create({ email: 'receiver_neg@example.com', password: 'pwd', points: 500, f_name: 'Receiver' });
        const token = generateToken(creator._id);

        const meeting = await Meeting.create({
            creator: creator._id,
            receiver: receiver._id,
            title: 'Test Meeting',
            scheduledAt: new Date(Date.now() - 24 * 60 * 60 * 1000), 
            pointsPromised: 50, 
            status: 'completed'
        });

        const res = await request(app)
            .post(`/api/meeting/${meeting._id}/rate`)
            .set('Cookie', [`token=${token}`])
            .send({ rating: 5, comment: 'Great' });
        
        expect(res.statusCode).toBe(200);
        const updatedCreator = await User.findById(creator._id);
        expect(updatedCreator.points).toBeGreaterThanOrEqual(0); 
    });

    it('12. users can not schedule meetings with the same users at the same time, so there is no dupliated meetings that match with date and time and user author.', async () => {
        const creator = await User.create({ email: 'creator2@example.com', password: 'pwd', points: 500, f_name: 'Creator2' });
        const receiver = await User.create({ email: 'receiver2@example.com', password: 'pwd', points: 500, f_name: 'Receiver2' });
        const token = generateToken(creator._id);
        const scheduledAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

        const res1 = await request(app)
            .post('/api/meeting/')
            .set('Cookie', [`token=${token}`])
            .send({
                receiverId: receiver._id,
                title: 'Meeting 1',
                scheduledAt: scheduledAt,
                pointsPromised: 100
            });
        expect(res1.statusCode).toBe(201);

        const res2 = await request(app)
            .post('/api/meeting/')
            .set('Cookie', [`token=${token}`])
            .send({
                receiverId: receiver._id,
                title: 'Meeting 2',
                scheduledAt: scheduledAt,
                pointsPromised: 100
            });
        
        expect(res2.statusCode).toBe(400);
    });

    it('13. users can not have more than 3 meetings on one day.', async () => {
        const creator = await User.create({ email: 'creator3@example.com', password: 'pwd', points: 5000, f_name: 'Creator3' });
        const receiver1 = await User.create({ email: 'r1@example.com', password: 'pwd', points: 500, f_name: 'R1' });
        const receiver2 = await User.create({ email: 'r2@example.com', password: 'pwd', points: 500, f_name: 'R2' });
        const receiver3 = await User.create({ email: 'r3@example.com', password: 'pwd', points: 500, f_name: 'R3' });
        const receiver4 = await User.create({ email: 'r4@example.com', password: 'pwd', points: 500, f_name: 'R4' });
        const token = generateToken(creator._id);

        const baseTime = Date.now() + 24 * 60 * 60 * 1000;

        await Meeting.create({ creator: creator._id, receiver: receiver1._id, title: 'M1', scheduledAt: new Date(baseTime + 2 * 60 * 60 * 1000), pointsPromised: 100 });
        await Meeting.create({ creator: creator._id, receiver: receiver2._id, title: 'M2', scheduledAt: new Date(baseTime + 4 * 60 * 60 * 1000), pointsPromised: 100 });
        await Meeting.create({ creator: creator._id, receiver: receiver3._id, title: 'M3', scheduledAt: new Date(baseTime + 6 * 60 * 60 * 1000), pointsPromised: 100 });

        const res = await request(app)
            .post('/api/meeting/')
            .set('Cookie', [`token=${token}`])
            .send({
                receiverId: receiver4._id,
                title: 'Meeting 4',
                scheduledAt: new Date(baseTime + 8 * 60 * 60 * 1000),
                pointsPromised: 100
            });
        
        expect(res.statusCode).toBe(400);
    });

});
