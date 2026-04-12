import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/Card/card'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ImageIcon from '@mui/icons-material/Image';
import SendIcon from '@mui/icons-material/Send';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import EventIcon from '@mui/icons-material/Event';
import FlagIcon from '@mui/icons-material/Flag';
import Advertisement from '../../components/Advertisement/advertisement';
import Conversation from '../../components/Conversation/conversation';
import Avatar from '../../components/Avatar/avatar';
import { uploadImage } from '../../utils/uploadImage';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import socket from '../../../socket';

const ScheduleMeetingModal = ({ selfData, otherUser, onClose, onCreated }) => {
    const [form, setForm] = useState({ title: '', description: '', date: '', time: '', pointsPromised: '' });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    const userPoints = selfData?.points ?? 0;
    const hasNoPoints = userPoints === 0;

    const handlePointsChange = (e) => {
        const raw = e.target.value.replace(/\D/g, '');
        setForm(p => ({ ...p, pointsPromised: raw }));
        if (errors.pointsPromised) setErrors(p => ({ ...p, pointsPromised: '' }));
    };

    const validate = () => {
        const errs = {};
        if (!form.title.trim()) errs.title = 'Meeting title is required.';
        if (!form.date) errs.date = 'Please select a date.';
        if (!form.time) errs.time = 'Please enter a time.';
        if (form.date && form.time) {
            const scheduledAt = new Date(`${form.date}T${form.time}`);
            if (isNaN(scheduledAt.getTime())) errs.time = 'Invalid time format. Use HH:MM (24h).';
            else if (scheduledAt < new Date()) errs.date = 'Meeting date & time must be in the future.';
        }
        if (!form.pointsPromised) {
            errs.pointsPromised = 'Points are required. Minimum is 100 pts.';
        } else {
            const pts = Number(form.pointsPromised);
            if (pts < 100) errs.pointsPromised = 'Minimum points required is 100.';
            else if (pts % 100 !== 0) errs.pointsPromised = 'Points must be in multiples of 100 (e.g. 100, 200, 300).';
            else if (pts > userPoints) errs.pointsPromised = `You only have ${userPoints} pts. You can't promise more than you have.`;
        }
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (hasNoPoints) return;
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }
        const scheduledAt = new Date(`${form.date}T${form.time}`);
        const pts = Number(form.pointsPromised);
        setSubmitting(true);
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/meeting`, {
                receiverId: otherUser._id,
                title: form.title,
                description: form.description,
                scheduledAt: scheduledAt.toISOString(),
                pointsPromised: pts,
            }, { withCredentials: true });
            toast.success('Meeting scheduled successfully!');
            onCreated && onCreated();
            onClose();
        } catch (err) {
            toast.error(err?.response?.data?.error || 'Could not schedule meeting. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const minDate = new Date().toISOString().split('T')[0];

    const inputClass = (field) =>
        `w-full border rounded-xl px-3 py-2 text-sm outline-none ${errors[field] ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-gray-400'}`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
                <h3 className="font-bold text-gray-900 text-lg mb-1">Schedule Meeting</h3>
                <p className="text-sm text-gray-500 mb-4">with <strong>{otherUser?.f_name}</strong></p>

                {hasNoPoints && (
                    <div className="mb-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">
                        You don't have any points. You need at least <strong>100 points</strong> to schedule a meeting.
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Title *</label>
                        <input
                            value={form.title}
                            onChange={e => { setForm(p => ({ ...p, title: e.target.value })); if (errors.title) setErrors(p => ({ ...p, title: '' })); }}
                            className={inputClass('title')}
                            placeholder="e.g. Product Review Call"
                        />
                        {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Description</label>
                        <textarea
                            value={form.description}
                            onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                            rows={2}
                            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-gray-400 resize-none"
                            placeholder="What will you discuss?"
                        />
                    </div>
                    <div className="flex gap-3">
                        <div className="flex-1">
                            <label className="text-sm font-medium text-gray-700 block mb-1">Date *</label>
                            <input
                                type="date"
                                value={form.date}
                                min={minDate}
                                onChange={e => { setForm(p => ({ ...p, date: e.target.value })); if (errors.date) setErrors(p => ({ ...p, date: '' })); }}
                                className={inputClass('date')}
                            />
                            {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
                        </div>
                        <div className="w-1/3">
                            <label className="text-sm font-medium text-gray-700 block mb-1">Time *</label>
                            <input
                                type="text"
                                value={form.time}
                                onChange={e => { setForm(p => ({ ...p, time: e.target.value })); if (errors.time) setErrors(p => ({ ...p, time: '' })); }}
                                className={inputClass('time')}
                                placeholder="HH:MM (24h)"
                            />
                            {errors.time && <p className="text-xs text-red-500 mt-1">{errors.time}</p>}
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Points Promised *</label>
                        <input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={form.pointsPromised}
                            onChange={handlePointsChange}
                            disabled={hasNoPoints}
                            className={`${inputClass('pointsPromised')} ${hasNoPoints ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                            placeholder="Min. 100 pts (multiples of 100)"
                        />
                        <div className="flex items-center justify-between mt-1">
                            {errors.pointsPromised
                                ? <p className="text-xs text-red-500">{errors.pointsPromised}</p>
                                : <p className="text-xs text-gray-400">Enter points in multiples of 100 (100, 200, 300…)</p>
                            }
                            <p className="text-xs text-gray-400 ml-2 shrink-0">Balance: <strong>{userPoints} pts</strong></p>
                        </div>
                    </div>
                    <div className="flex gap-3 justify-end mt-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer">Cancel</button>
                        <button
                            type="submit"
                            disabled={submitting || hasNoPoints}
                            className="px-5 py-2 text-sm font-semibold text-white rounded-lg disabled:opacity-50 cursor-pointer transition-opacity hover:opacity-90 mt-1 up-btn-glow "
                            style={{ backgroundColor: '#435465' }}
                        >
                            {submitting ? 'Scheduling...' : 'Schedule'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const ReportMessageModal = ({ message, onClose }) => {
    const [reason, setReason] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/report`, {
                reportType: 'message',
                targetId: message._id,
                reason,
                targetSnapshot: {
                    messageText: message.message,
                    picture: message.picture,
                    senderName: message.sender?.f_name,
                    senderId: message.sender?._id,
                },
            }, { withCredentials: true });
            toast.success('Message reported');
            onClose();
        } catch (err) {
            toast.error(err?.response?.data?.error || 'Could not submit report');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
                <h3 className="font-bold text-gray-900 text-lg mb-3">Report Message</h3>
                <p className="text-sm text-gray-500 mb-3">Message from <strong>{message.sender?.f_name}</strong>:</p>
                <p className="text-sm text-gray-700 bg-gray-50 rounded-xl px-3 py-2 mb-4 truncate">{message.message || '[image]'}</p>
                <textarea
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                    rows={2}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-gray-400 resize-none mb-4"
                    placeholder="Reason (optional)"
                />
                <div className="flex gap-3 justify-end">
                    <button onClick={onClose} className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer">Cancel</button>
                    <button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="px-5 py-2 text-sm font-semibold text-white rounded-lg disabled:opacity-50 cursor-pointer"
                        style={{ backgroundColor: '#dc2626' }}
                    >
                        {submitting ? 'Reporting...' : 'Report'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const Messages = () => {
    const navigate = useNavigate();
    const [conversations, setConversations] = useState([]);
    const [ownData, setOwnData] = useState(null);
    const [activeConvId, setActiveConvId] = useState(null);
    const [selectedConvDetails, setSelectedConDetail] = useState(null);
    const [messages, setMessages] = useState([]);
    const [canMessage, setCanMessage] = useState(true);
    const [imageUploading, setImageUploading] = useState(false);
    const [imageLink, setImageLink] = useState(null);
    const [messageText, setMessageText] = useState('');
    const [scheduleMeetingOpen, setScheduleMeetingOpen] = useState(false);
    const [reportMessage, setReportMessage] = useState(null);
    const [hoveredMsg, setHoveredMsg] = useState(null);
    const [chatMenuOpen, setChatMenuOpen] = useState(false);
    const chatMenuRef = useRef();
    const messagesContainerRef = useRef();

    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSelectedConv = async (id, memberData) => {
        setActiveConvId(id);
        socket.emit('joinConversation', id);
        setSelectedConDetail(memberData);
        setCanMessage(true);
        if (memberData?._id) {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/isFriend/${memberData._id}`, { withCredentials: true });
                setCanMessage(res.data.isFriend);
            } catch { /* keep true as fallback */ }
        }
    };

    useEffect(() => {
        const stored = localStorage.getItem('userInfo');
        const parsed = stored ? JSON.parse(stored) : null;
        setOwnData(parsed);
        fetchConversationOnLoad(parsed?._id);
    }, []);

    useEffect(() => {
        if (activeConvId) fetchMessages();
    }, [activeConvId]);

    useEffect(() => {
        socket.on('receiveMessage', (response) => setMessages(prev => [...prev, response]));
        return () => socket.off('receiveMessage');
    }, []);

    const fetchMessages = async () => {
        await axios.get(`${import.meta.env.VITE_API_URL}/api/message/${activeConvId}`, { withCredentials: true })
            .then(res => {
                setMessages(res.data.message);
                window.dispatchEvent(new Event('messages-read'));
            })
            .catch(() => toast.error('Could not load messages'));
    };

    const fetchConversationOnLoad = async (ownId) => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/conversation/get-conversation`, { withCredentials: true });
            const convs = res.data.conversations;
            setConversations(convs);
            const firstConv = convs[0];
            if (firstConv) {
                setActiveConvId(firstConv._id);
                socket.emit('joinConversation', firstConv._id);
                const other = firstConv.members?.find(m => m._id !== ownId);
                if (other) {
                    setSelectedConDetail(other);
                    try {
                        const friendRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/isFriend/${other._id}`, { withCredentials: true });
                        setCanMessage(friendRes.data.isFriend);
                    } catch { /* keep true */ }
                }
            }
        } catch {
            toast.error('Could not load conversations');
        }
    };

    const handleInputImage = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImageUploading(true);
        try {
            const url = await uploadImage(file);
            setImageLink(url);
        } catch (err) {
            toast.error(err.message || 'Image upload failed');
        } finally {
            setImageUploading(false);
        }
    };

    const handleSendMessage = async () => {
        if (!messageText.trim() && !imageLink) return;
        await axios.post(
            `${import.meta.env.VITE_API_URL}/api/message`,
            { conversation: activeConvId, message: messageText, picture: imageLink },
            { withCredentials: true }
        ).then(res => {
            socket.emit('sendMessage', activeConvId, res.data);
            setMessageText('');
            setImageLink(null);
        }).catch(err => {
            if (err?.response?.status === 403) {
                setCanMessage(false);
            } else {
                toast.error('Could not send message');
            }
        });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleClearChat = async () => {
        if (!activeConvId) return;
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/message/clear/${activeConvId}`, { withCredentials: true });
            setMessages([]);
            toast.success('Chat cleared');
        } catch {
            toast.error('Could not clear chat');
        } finally {
            setChatMenuOpen(false);
        }
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (chatMenuRef.current && !chatMenuRef.current.contains(e.target)) setChatMenuOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className='px-4 md:px-8 xl:px-32 py-6 flex gap-5 w-full min-h-screen' style={{ backgroundColor: '#f0f4f1' }}>
            <div className='flex-1 min-w-0'>
                <Card padding={0}>
                    <div className="border-b border-gray-200 px-5 py-3 font-semibold text-gray-900">Messaging</div>

                    <div className='flex h-[600px]'>
                        {/* Conversation list */}
                        <div className='w-full sm:w-2/5 border-r border-gray-200 overflow-y-auto shrink-0'>
                            {conversations.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-gray-400 p-6 text-center">
                                    <ChatBubbleOutlineIcon sx={{ fontSize: 40, marginBottom: 1 }} />
                                    <p className="text-sm font-medium">No conversations yet</p>
                                    <p className="text-xs mt-1">Connect with people and start chatting</p>
                                </div>
                            ) : conversations.map((item, index) => (
                                <Conversation
                                    activeConvId={activeConvId}
                                    handleSelectedConv={handleSelectedConv}
                                    item={item}
                                    key={index}
                                    ownId={ownData?._id}
                                />
                            ))}
                        </div>

                        {/* Chat pane */}
                        <div className='flex-1 min-w-0 flex-col hidden sm:flex'>
                            {!selectedConvDetails ? (
                                <div className="flex flex-col items-center justify-center h-full text-gray-400 p-6 text-center">
                                    <ChatBubbleOutlineIcon sx={{ fontSize: 48, marginBottom: 1 }} />
                                    <p className="text-sm font-medium">Select a conversation</p>
                                </div>
                            ) : (
                                <>
                                    {/* Chat header */}
                                    <div className='border-b border-gray-200 py-3 px-4 flex justify-between items-center shrink-0'>
                                        <div className='flex items-center gap-3 min-w-0'>
                                            <Avatar src={selectedConvDetails?.profilePic} name={selectedConvDetails?.f_name} size="md" className='w-9 h-9 shrink-0' />
                                            <div className='min-w-0'>
                                                <p className="text-sm font-semibold text-gray-900 truncate">{selectedConvDetails?.f_name}</p>
                                                <p className="text-xs text-gray-400 truncate">{selectedConvDetails?.headline}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {canMessage && (
                                                <button
                                                    onClick={() => setScheduleMeetingOpen(true)}
                                                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors"
                                                    title="Schedule a meeting"
                                                >
                                                    <EventIcon sx={{ fontSize: 15 }} /> Schedule Meeting
                                                </button>
                                            )}
                                            <div ref={chatMenuRef} className="relative">
                                                <button onClick={() => setChatMenuOpen(p => !p)} className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer rounded-full hover:bg-gray-100">
                                                    <MoreHorizIcon sx={{ fontSize: 20 }} />
                                                </button>
                                                {chatMenuOpen && (
                                                    <div className="absolute top-full right-0 mt-1 w-40 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden">
                                                        <button
                                                            onClick={handleClearChat}
                                                            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                                                        >
                                                            Clear Chat
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Messages list */}
                                    <div ref={messagesContainerRef} className='flex-1 overflow-y-auto p-4 flex flex-col gap-3 min-h-0'>
                                        {messages.map((item, index) => {
                                            const isSelf = item?.sender?._id === ownData?._id;
                                            const isHovered = hoveredMsg === item._id;
                                            return (
                                                <div
                                                    key={index}
                                                    className={`flex gap-2 group ${isSelf ? 'flex-row-reverse' : 'flex-row'}`}
                                                    onMouseEnter={() => setHoveredMsg(item._id)}
                                                    onMouseLeave={() => setHoveredMsg(null)}
                                                >
                                                    <Avatar src={item?.sender?.profilePic} name={item?.sender?.f_name} size="sm" className='w-7 h-7 shrink-0 mt-1' />
                                                    <div className={`max-w-[70%] ${isSelf ? 'items-end' : 'items-start'} flex flex-col`}>
                                                        {item?.postId ? (
                                                            <button
                                                                onClick={() => navigate(`/feeds?post=${item.postId}`)}
                                                                className={`text-sm rounded-2xl overflow-hidden break-words text-left cursor-pointer hover:opacity-90 transition-opacity ${isSelf ? 'text-white rounded-tr-sm' : 'bg-gray-100 text-gray-800 rounded-tl-sm'}`}
                                                                style={isSelf ? { backgroundColor: '#435465' } : {}}
                                                            >
                                                                {item?.picture && (
                                                                    <img className='w-full max-h-48 object-cover' src={item.picture} alt="" />
                                                                )}
                                                                {item?.message && <div className='px-4 py-2'>{item.message}</div>}
                                                                <div className={`px-4 pb-2 text-xs ${isSelf ? 'text-green-200' : 'text-green-700'}`}>Tap to view post →</div>
                                                            </button>
                                                        ) : (
                                                            <div
                                                                className={`text-sm rounded-2xl overflow-hidden break-words ${isSelf ? 'text-white rounded-tr-sm' : 'bg-gray-100 text-gray-800 rounded-tl-sm'}`}
                                                                style={isSelf ? { backgroundColor: '#435465' } : {}}
                                                            >
                                                                {item?.picture && (
                                                                    <img className='w-full max-h-48 object-cover' src={item.picture} alt="" />
                                                                )}
                                                                {item?.message && <div className='px-4 py-2'>{item.message}</div>}
                                                            </div>
                                                        )}
                                                        {!isSelf && isHovered && (
                                                            <button
                                                                onClick={() => setReportMessage(item)}
                                                                className="mt-1 flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                                                            >
                                                                <FlagIcon sx={{ fontSize: 12 }} /> Report
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Image preview strip */}
                                    {canMessage && imageLink && (
                                        <div className='px-3 pt-2 shrink-0'>
                                            <div className='relative w-20 h-16'>
                                                <img src={imageLink} className='w-full h-full object-cover rounded-lg' alt="" />
                                                <button onClick={() => setImageLink(null)} className='absolute -top-1 -right-1 w-5 h-5 bg-gray-800 text-white rounded-full text-xs flex items-center justify-center cursor-pointer'>✕</button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Input or not-friends banner */}
                                    {canMessage ? (
                                        <div className='border-t border-gray-200 p-3 shrink-0'>
                                            <textarea
                                                value={messageText}
                                                onChange={(e) => setMessageText(e.target.value)}
                                                onKeyDown={handleKeyDown}
                                                rows={2}
                                                className="w-full bg-gray-50 border border-gray-200 outline-none rounded-xl text-sm p-3 resize-none focus:border-gray-300 transition-colors"
                                                placeholder="Write a message… (Enter to send, Shift+Enter for newline)"
                                            />
                                            <div className='flex justify-between items-center mt-1.5'>
                                                <label htmlFor="messageImage" className={`cursor-pointer transition-colors ${imageUploading ? 'text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}>
                                                    {imageUploading
                                                        ? <div className='w-4 h-4 border-2 border-gray-300 border-t-gray-500 rounded-full animate-spin' />
                                                        : <ImageIcon sx={{ fontSize: 20 }} />
                                                    }
                                                </label>
                                                <input id="messageImage" type='file' accept='image/*' onChange={handleInputImage} className="hidden" disabled={imageUploading} />
                                                <button
                                                    onClick={handleSendMessage}
                                                    disabled={!messageText.trim() && !imageLink}
                                                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                                                    style={{ backgroundColor: '#435465' }}
                                                >
                                                    <SendIcon sx={{ fontSize: 16 }} /> Send
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='border-t border-gray-200 px-3 py-2.5 shrink-0 flex items-center gap-3'>
                                            <span className='flex-1 text-sm text-amber-700'>
                                                🔒 You are no longer connected with <strong>{selectedConvDetails?.f_name}</strong>.
                                            </span>
                                            <button
                                                disabled
                                                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-semibold text-white opacity-40 cursor-not-allowed bg-gray-400"
                                            >
                                                <SendIcon sx={{ fontSize: 16 }} /> Send
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </Card>
            </div>

            <div className='hidden md:block w-64 shrink-0'>
                <Advertisement />
            </div>

            {scheduleMeetingOpen && (
                <ScheduleMeetingModal
                    selfData={ownData}
                    otherUser={selectedConvDetails}
                    onClose={() => setScheduleMeetingOpen(false)}
                    onCreated={() => {}}
                />
            )}

            {reportMessage && (
                <ReportMessageModal
                    message={reportMessage}
                    onClose={() => setReportMessage(null)}
                />
            )}

            <ToastContainer />
        </div>
    );
};

export default Messages;
