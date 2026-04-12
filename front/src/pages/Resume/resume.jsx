import React, { useState, useEffect } from 'react'
import Advertisement from '../../components/Advertisement/advertisement'
import Card from '../../components/Card/card'
import Avatar from '../../components/Avatar/avatar'
import VideoCallIcon from '@mui/icons-material/VideoCall';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import GroupsIcon from '@mui/icons-material/Groups';
const StarRating = ({ value, onChange, readOnly = false }) => (
    <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(n => (
            <button
                key={n}
                type="button"
                disabled={readOnly}
                onClick={() => !readOnly && onChange && onChange(n)}
                className={readOnly ? 'cursor-default' : 'cursor-pointer'}
            >
                {n <= value
                    ? <StarIcon sx={{ fontSize: 28, color: '#f59e0b' }} />
                    : <StarBorderIcon sx={{ fontSize: 28, color: '#d1d5db' }} />
                }
            </button>
        ))}
    </div>
);

const RateModal = ({ meeting, onClose, onRated }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const preview = rating > 0 ? Math.round(meeting.pointsPromised * rating / 5) : 0;

    const handleSubmit = async () => {
        if (!rating) return toast.error('Please select a rating');
        setSubmitting(true);
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/meeting/${meeting._id}/rate`, { rating, comment }, { withCredentials: true });
            toast.success(`Meeting rated! ${preview} points transferred.`);
            onRated();
            onClose();
        } catch (err) {
            toast.error(err?.response?.data?.error || 'Could not submit rating');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
                <h3 className="font-bold text-gray-900 text-lg mb-1">Rate Meeting</h3>
                <p className="text-sm text-gray-500 mb-4">"{meeting.title}" with <strong>{meeting.receiver?.f_name}</strong></p>

                <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700 block mb-2">Your Rating</label>
                    <StarRating value={rating} onChange={setRating} />
                    {rating > 0 && (
                        <p className="text-sm text-gray-500 mt-2">
                            Points to transfer: <strong className="text-green-700">{preview}</strong> / {meeting.pointsPromised}
                        </p>
                    )}
                </div>

                <div className="mb-5">
                    <label className="text-sm font-medium text-gray-700 block mb-1">Comment (optional)</label>
                    <textarea
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        rows={3}
                        className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-gray-400 resize-none"
                        placeholder="Share your experience..."
                    />
                </div>

                <div className="flex gap-3 justify-end">
                    <button onClick={onClose} className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer">Cancel</button>
                    <button
                        onClick={handleSubmit}
                        disabled={!rating || submitting}
                        className="px-5 py-2 text-sm font-semibold text-white rounded-lg disabled:opacity-50 cursor-pointer hover:opacity-90"
                        style={{ backgroundColor: '#435465' }}
                    >
                        {submitting ? 'Submitting...' : 'Submit Rating'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const FeedbackModal = ({ star, onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h3 className="font-bold text-gray-900 text-lg mb-1">Meeting Feedback</h3>
            <p className="text-sm text-gray-500 mb-4">from <strong>{star.fromUserName}</strong></p>
            <div className="mb-3">
                <div className="text-sm text-gray-600 mb-1">Meeting: <span className="font-medium text-gray-900">{star.meetingTitle}</span></div>
                <div className="text-sm text-gray-600 mb-1">Date: <span className="font-medium">{new Date(star.meetingDate).toLocaleDateString()}</span></div>
            </div>
            <div className="mb-3">
                <StarRating value={star.rating} readOnly />
            </div>
            {star.comment && <p className="text-sm text-gray-700 bg-gray-50 rounded-xl px-4 py-3 mb-4">"{star.comment}"</p>}
            <div className="flex justify-end">
                <button onClick={onClose} className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer">Close</button>
            </div>
        </div>
    </div>
);

const MeetingCard = ({ meeting, ownId, onDelete, onRated }) => {
    const [rateOpen, setRateOpen] = useState(false);
    const isCreator = meeting.creator?._id === ownId || meeting.creator?._id?.toString() === ownId;
    const other = isCreator ? meeting.receiver : meeting.creator;
    const isPast = new Date(meeting.scheduledAt) < new Date();
    const locked = meeting.status === 'pending' && !isPast;
    const canRate = isCreator && meeting.status === 'completed';

    const statusColor = {
        pending: isPast ? '#f59e0b' : '#6b7280',
        completed: '#f59e0b',
        rated: '#435465',
    }[meeting.status] || '#6b7280';

    const statusLabel = meeting.status === 'rated' ? 'Rated' : isPast ? 'Awaiting Rating' : 'Upcoming';

    return (
        <div className="border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-start gap-4">
            <Avatar src={other?.profilePic} name={other?.f_name} size="md" className="w-10 h-10 shrink-0" />
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div>
                        <h3 className="font-semibold text-gray-900 text-sm">{meeting.title}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">with <strong>{other?.f_name}</strong> · {isCreator ? 'You scheduled' : 'Invited by ' + meeting.creator?.f_name}</p>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: statusColor + '20', color: statusColor }}>
                        {statusLabel}
                    </span>
                </div>
                {meeting.description && <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">{meeting.description}</p>}
                <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-500">
                    <span>{new Date(meeting.scheduledAt).toLocaleString()}</span>
                    <span>{meeting.pointsPromised} pts promised</span>
                    {meeting.status === 'rated' && <span>{meeting.rating}/5 · {meeting.pointsTransferred} pts transferred</span>}
                </div>
                {meeting.status === 'rated' && meeting.comment && (
                    <p className="text-xs text-gray-500 mt-1.5 italic">"{meeting.comment}"</p>
                )}
            </div>
            <div className="flex gap-2 sm:flex-col shrink-0">
                {canRate && (
                    <button
                        onClick={() => setRateOpen(true)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white rounded-lg cursor-pointer hover:opacity-90"
                        style={{ backgroundColor: '#f59e0b' }}
                        title="Rate this meeting"
                    >
                        <LockOpenIcon sx={{ fontSize: 14 }} /> Rate
                    </button>
                )}
                {locked && (
                    <span className="flex items-center gap-1 text-xs text-gray-400 px-3 py-1.5 bg-gray-100 rounded-lg">
                        <LockIcon sx={{ fontSize: 14 }} /> Locked
                    </span>
                )}
                {meeting.status !== 'rated' && (
                    <button
                        onClick={() => onDelete(meeting._id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 cursor-pointer transition-colors"
                        title="Delete meeting"
                    >
                        <DeleteIcon sx={{ fontSize: 18 }} />
                    </button>
                )}
            </div>
            {rateOpen && <RateModal meeting={meeting} onClose={() => setRateOpen(false)} onRated={onRated} />}
        </div>
    );
};

const Resume = () => {
    const [meetings, setMeetings] = useState([]);
    const [filter, setFilter] = useState('all');
    const [ownId, setOwnId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem('userInfo');
        if (stored) setOwnId(JSON.parse(stored)?._id);
        fetchMeetings();
    }, []);

    const fetchMeetings = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/meeting`, { withCredentials: true });
            setMeetings(res.data.meetings || []);
        } catch {
            toast.error('Could not load meetings');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this meeting for both users?')) return;
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/meeting/${id}`, { withCredentials: true });
            setMeetings(prev => prev.filter(m => m._id !== id));
            toast.success('Meeting deleted');
        } catch (err) {
            toast.error(err?.response?.data?.error || 'Could not delete meeting');
        }
    };

    const now = new Date();
    const filtered = filter === 'upcoming'
        ? meetings.filter(m => new Date(m.scheduledAt) >= now && m.status === 'pending')
        : meetings;

    return (
        <div className='px-4 md:px-8 xl:px-32 py-6 flex gap-5 w-full min-h-screen' style={{ backgroundColor: '#f0f4f1' }}>
            <div className='flex-1 min-w-0'>
                <Card padding={1}>
                    <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                        <h2 className="font-bold text-gray-900 text-lg">Meetings</h2>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setFilter('all')}
                                className="px-4 py-1.5 text-sm font-semibold rounded-lg border transition-colors cursor-pointer transition-opacity hover:opacity-90 mt-1 up-btn-glow"
                                style={filter === 'all'
                                    ? { backgroundColor: '#435465', color: '#fff', borderColor: '#435465' }
                                    : { backgroundColor: '#fff', color: '#374151', borderColor: '#e5e7eb' }}
                            >
                                Show All Meetings
                            </button>
                            <button
                                onClick={() => setFilter('upcoming')}
                                className="px-4 py-1.5 text-sm font-semibold rounded-lg border transition-colors cursor-pointer transition-opacity hover:opacity-90 mt-1 up-btn-glow"
                                style={filter === 'upcoming'
                                    ? { backgroundColor: '#435465', color: '#fff', borderColor: '#435465' }
                                    : { backgroundColor: '#fff', color: '#374151', borderColor: '#e5e7eb' }}
                            >
                                Show Upcoming
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-16">
                            <div className="w-8 h-8 border-3 border-gray-200 border-t-green-800 rounded-full animate-spin" />
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                            <GroupsIcon sx={{ fontSize: 56, marginBottom: 2, color: '#9ca3af' }} />
                            <div className="text-base font-medium text-gray-500">
                                {filter === 'upcoming' ? 'No upcoming meetings' : 'No meetings yet'}
                            </div>
                            <div className="text-sm text-gray-400 mt-1">Schedule a meeting from the Messages page</div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {filtered.map(m => (
                                <MeetingCard
                                    key={m._id}
                                    meeting={m}
                                    ownId={ownId}
                                    onDelete={handleDelete}
                                    onRated={fetchMeetings}
                                />
                            ))}
                        </div>
                    )}
                </Card>
            </div>
            <div className='hidden md:block w-64 shrink-0 sticky top-18 self-start'>
                <Advertisement />
            </div>
            <ToastContainer />
        </div>
    );
};

export default Resume;
