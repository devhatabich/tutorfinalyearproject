const MessageModal = require('../models/message');
const ConversationModal = require('../models/conversation');


exports.sendMessage = async(req,res)=>{
    try{
        let { conversation, message, picture, postId } = req.body;
        const conv = await ConversationModal.findById(conversation);
        if (conv) {
            const otherId = conv.members.find(m => !m.equals(req.user._id));
            const isFriend = req.user.friends.some(id => id.equals(otherId));
            if (!isFriend) {
                return res.status(403).json({ error: 'NOT_FRIENDS', message: 'Messaging is only available between connected users.' });
            }
        }
        let addMessage = new MessageModal({sender:req.user._id,conversation,message,picture,postId:postId||null,isRead:false});
        await addMessage.save();
        let populatedMessage = await addMessage.populate("sender");
        return res.status(201).json(populatedMessage);
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Server error',message:err.message });
    }
}


exports.getMessage = async(req,res)=>{
    try{
        let {convId} = req.params;
        // Mark all messages in this conversation sent by others as read
        await MessageModal.updateMany(
            { conversation: convId, sender: { $ne: req.user._id }, isRead: false },
            { isRead: true }
        );
        const conv = await ConversationModal.findById(convId);
        const cleared = conv?.clearedHistory?.find(c => c.user.equals(req.user._id));
        const query = { conversation: convId };
        if (cleared) query.createdAt = { $gt: cleared.clearedAt };
        let message = await MessageModal.find(query).populate("sender");
        return res.status(200).json({ messages: "Fetched Message Successfully", message })

    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Server error',message:err.message });
    }
}

exports.clearChat = async(req,res)=>{
    try{
        const { convId } = req.params;
        await ConversationModal.updateOne(
            { _id: convId },
            { $pull: { clearedHistory: { user: req.user._id } } }
        );
        await ConversationModal.updateOne(
            { _id: convId },
            { $push: { clearedHistory: { user: req.user._id, clearedAt: new Date() } } }
        );
        return res.status(200).json({ message: 'Chat cleared' });
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Server error', message: err.message });
    }
}


exports.getUnreadCount = async(req,res)=>{
    try{
        // Find all conversations the user is part of
        const convs = await ConversationModal.find({ members: { $in: [req.user._id] } });
        const convIds = convs.map(c => c._id);
        const count = await MessageModal.countDocuments({
            conversation: { $in: convIds },
            sender: { $ne: req.user._id },
            isRead: false
        });
        return res.status(200).json({ count });
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Server error',message:err.message });
    }
}