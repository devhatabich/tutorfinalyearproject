const Report = require('../models/report');
const Post = require('../models/post');
const User = require('../models/user');

exports.createReport = async (req, res) => {
    try {
        const { reportType, targetId, reason, targetSnapshot: clientSnapshot } = req.body;
        const reporter = req.user._id;

        if (!reportType || !targetId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        let targetSnapshot = clientSnapshot || {};

        if (reportType === 'post') {
            const post = await Post.findById(targetId).populate('user');
            if (post) {
                targetSnapshot = {
                    desc: post.desc,
                    imageLink: post.imageLink,
                    authorName: post.user?.f_name,
                    authorId: post.user?._id,
                };
            }
        } else if (reportType === 'user') {
            const user = await User.findById(targetId);
            if (user) {
                targetSnapshot = { name: user.f_name, email: user.email, headline: user.headline };
            }
        }

        // Prevent duplicate pending reports from same user
        const existing = await Report.findOne({ reporter, reportType, targetId, status: 'pending' });
        if (existing) {
            return res.status(400).json({ error: 'You have already reported this item' });
        }

        const report = new Report({ reporter, reportType, targetId, reason: reason || '', targetSnapshot });
        await report.save();

        return res.status(201).json({ message: 'Report submitted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error', message: err.message });
    }
};
