import React, { useState, useEffect, useRef } from 'react'
import Card from '../Card/card'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import CommentIcon from '@mui/icons-material/Comment';
import SendIcon from '@mui/icons-material/Send';
import FlagIcon from '@mui/icons-material/Flag';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Avatar from '../Avatar/avatar';

const Post = ({ profile, item, personalData, highlight }) => {
    const [seeMore, setSeeMore] = useState(false);
    const [comment, setComment] = useState(false);
    const [comments, setComments] = useState([]);
    const [liked, setLiked] = useState(false);
    const [noOfLikes, setNoOfLike] = useState(item?.likes?.length || 0)
    const [commentText, setCommenttext] = useState('')
    const [shareOpen, setShareOpen] = useState(false);
    const [shareConvs, setShareConvs] = useState([]);
    const [sharing, setSharing] = useState(false);
    const [moreOpen, setMoreOpen] = useState(false);
    const [reportOpen, setReportOpen] = useState(false);
    const [reportReason, setReportReason] = useState('');
    const [reporting, setReporting] = useState(false);
    const shareRef = useRef(null);
    const moreRef = useRef(null);

    const handleSendComment = async (e) => {
        e.preventDefault();
        if (commentText.trim().length === 0) return toast.error('Please enter a comment');
        await axios.post(`${import.meta.env.VITE_API_URL}/api/comment`, { postId: item?._id, comment: commentText }, { withCredentials: true })
            .then((res) => { setComments([res.data.comment, ...comments]); setCommenttext(''); })
            .catch(() => alert('Something went wrong'))
    }

    useEffect(() => {
        if (!personalData?._id) return;
        const hasLiked = item?.likes?.some(id => id.toString() === personalData._id.toString());
        setLiked(!!hasLiked);
    }, [personalData?._id])

    const handleLikeFunc = async () => {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/post/likeDislike`, { postId: item?._id }, { withCredentials: true })
            .then(() => {
                if (liked) { setNoOfLike(prev => prev - 1); setLiked(false); }
                else { setLiked(true); setNoOfLike(prev => prev + 1); }
            })
            .catch(() => alert('Something went wrong'))
    }

    const handleCommentBoxOpenClose = async () => {
        setComment(true)
        await axios.get(`${import.meta.env.VITE_API_URL}/api/comment/${item?._id}`)
            .then(resp => setComments(resp.data.comments))
            .catch(() => alert('Something went wrong'))
    }

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (shareRef.current && !shareRef.current.contains(e.target)) setShareOpen(false);
            if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleReportPost = async () => {
        setReporting(true);
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/report`, {
                reportType: 'post',
                targetId: item._id,
                reason: reportReason,
            }, { withCredentials: true });
            toast.success('Post reported');
            setReportOpen(false);
            setMoreOpen(false);
        } catch (err) {
            toast.error(err?.response?.data?.error || 'Could not submit report');
        } finally {
            setReporting(false);
        }
    };

    const handleShareClick = async () => {
        if (shareOpen) { setShareOpen(false); return; }
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/conversation/get-conversation`, { withCredentials: true });
            setShareConvs(res.data.conversations || []);
            setShareOpen(true);
        } catch {
            toast.error('Could not load conversations');
        }
    };

    const handleForwardPost = async (convId) => {
        if (sharing) return;
        setSharing(true);
        const authorName = item?.user?.f_name || 'Someone';
        const content = item?.desc ? `${item.desc.slice(0, 120)}${item.desc.length > 120 ? '...' : ''}` : '';
        const text = `${authorName}'s post${content ? `: ${content}` : ''}`;
        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/message`,
                { conversation: convId, message: text, picture: item?.imageLink || undefined, postId: item?._id },
                { withCredentials: true }
            );
            toast.success('Post forwarded!');
            setShareOpen(false);
        } catch {
            toast.error('Could not forward post');
        } finally {
            setSharing(false);
        }
    };

    const desc = item?.desc;
    const isOwnPost = personalData?._id && item?.user?._id && personalData._id.toString() === item.user._id.toString();

    return (
        <Card id={`post-${item?._id}`} padding={0} highlight={highlight}>
            {/* Author */}
            <div className='flex gap-3 p-4 items-center justify-between'>
                <div className="flex gap-3 items-center">
                    <Link to={`/profile/${item?.user?._id}`}>
                        <Avatar src={item?.user?.profilePic} name={item?.user?.f_name} size="md" className='w-10 h-10 border border-gray-200' />
                    </Link>
                    <div>
                        <Link to={`/profile/${item?.user?._id}`} className="text-sm font-semibold text-gray-900 hover:underline">{item?.user?.f_name}</Link>
                        <div className="text-xs text-gray-400">{item?.user?.headline}</div>
                    </div>
                </div>
                {!isOwnPost && !profile && (
                    <div ref={moreRef} className="relative">
                        <button onClick={() => setMoreOpen(p => !p)} className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer rounded-full hover:bg-gray-100">
                            <MoreHorizIcon sx={{ fontSize: 20 }} />
                        </button>
                        {moreOpen && (
                            <div className="absolute top-full right-0 mt-1 w-40 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden">
                                <button
                                    onClick={() => { setReportOpen(true); setMoreOpen(false); }}
                                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                >
                                    <FlagIcon sx={{ fontSize: 16 }} /> Report Post
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Report modal */}
            {reportOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
                        <h3 className="font-bold text-gray-900 text-lg mb-3">Report Post</h3>
                        <textarea
                            value={reportReason}
                            onChange={e => setReportReason(e.target.value)}
                            rows={2}
                            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-gray-400 resize-none mb-4"
                            placeholder="Reason (optional)"
                        />
                        <div className="flex gap-3 justify-end">
                            <button onClick={() => setReportOpen(false)} className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer">Cancel</button>
                            <button
                                onClick={handleReportPost}
                                disabled={reporting}
                                className="px-5 py-2 text-sm font-semibold text-white rounded-lg disabled:opacity-50 cursor-pointer"
                                style={{ backgroundColor: '#dc2626' }}
                            >
                                {reporting ? 'Reporting...' : 'Report'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Content */}
            <div className='text-sm text-gray-700 px-4 pb-3 whitespace-pre-line leading-relaxed'>
                {seeMore ? desc : desc?.length > 120 ? `${desc.slice(0, 120)}...` : desc}
                {desc?.length > 120 && (
                    <span onClick={() => setSeeMore(prev => !prev)} className="ml-1 cursor-pointer font-medium" style={{ color: '#435465' }}>
                        {seeMore ? 'See less' : 'See more'}
                    </span>
                )}
            </div>

            {item?.imageLink && (
                <div className='w-full max-h-80 overflow-hidden'>
                    <img className='w-full h-full object-cover' src={item?.imageLink} alt=""
                        onError={e => { e.target.parentElement.style.display = 'none'; }} />
                </div>
            )}

            {/* Like count */}
            <div className='px-4 py-2 flex justify-between items-center border-t border-gray-100'>
                <div className='flex gap-1 items-center'>
                    <ThumbUpIcon sx={{ color: '#40916C', fontSize: 14 }} />
                    <span className='text-xs text-gray-500'>{noOfLikes}</span>
                </div>
                <span className='text-xs text-gray-400'>{item?.comments} comments</span>
            </div>

            {/* Actions */}
            {!profile && (
                <div className='flex border-t border-gray-100'>
                    <button onClick={handleLikeFunc} className='flex-1 flex justify-center gap-1.5 items-center py-2.5 text-sm text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer'>
                        {liked ? <ThumbUpIcon sx={{ fontSize: 18, color: '#435465' }} /> : <ThumbUpOutlinedIcon sx={{ fontSize: 18 }} />}
                        <span className={liked ? 'font-semibold' : ''} style={{ color: liked ? '#435465' : undefined }}>{liked ? 'Liked' : 'Like'}</span>
                    </button>
                    <button onClick={handleCommentBoxOpenClose} className='flex-1 flex justify-center gap-1.5 items-center py-2.5 text-sm text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer border-l border-gray-100'>
                        <CommentIcon sx={{ fontSize: 18 }} /> Comment
                    </button>
                    <div ref={shareRef} className='flex-1 relative border-l border-gray-100'>
                        <button onClick={handleShareClick} className='w-full flex justify-center gap-1.5 items-center py-2.5 text-sm text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer'>
                            <SendIcon sx={{ fontSize: 18 }} /> Share
                        </button>
                        {shareOpen && (
                            <div className='absolute bottom-full right-0 mb-1 w-56 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden'>
                                <div className='px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide border-b border-gray-100'>Forward to...</div>
                                {shareConvs.length === 0 ? (
                                    <div className='px-4 py-3 text-sm text-gray-400'>No conversations yet</div>
                                ) : shareConvs.map((conv, i) => {
                                    const other = conv.members?.find(m => m._id !== personalData?._id);
                                    if (!other) return null;
                                    return (
                                        <button
                                            key={i}
                                            onClick={() => handleForwardPost(conv._id)}
                                            disabled={sharing}
                                            className='w-full px-3 py-2.5 hover:bg-gray-50 transition-colors text-left cursor-pointer disabled:opacity-50'
                                        >
                                            <span className='text-sm text-gray-700 truncate'>{other.f_name}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Comments */}
            {comment && (
                <div className='p-4 border-t border-gray-100'>
                    <div className='flex gap-3 items-center mb-4'>
                        <Avatar src={personalData?.profilePic} name={personalData?.f_name} size="sm" className='w-9 h-9 border border-gray-200' />
                        <form className="flex-1 flex gap-2" onSubmit={handleSendComment}>
                            <input
                                value={commentText}
                                onChange={(e) => setCommenttext(e.target.value)}
                                placeholder="Add a comment..."
                                className="flex-1 border border-gray-200 py-2 px-4 rounded-full text-sm outline-none focus:border-gray-400 transition-colors"
                            />
                            <button type='submit' className='text-sm font-semibold text-white px-4 py-2 rounded-full' style={{ backgroundColor: '#435465' }}>Send</button>
                        </form>
                    </div>

                    <div className='flex flex-col gap-3'>
                        {comments.map((c, index) => (
                            <div key={index} className='flex gap-3'>
                                <Link to={`/profile/${c?.user?._id}`}>
                                    <Avatar src={c?.user?.profilePic} name={c?.user?.f_name} size="sm" className='w-8 h-8 border border-gray-200' />
                                </Link>
                                <div className='bg-gray-50 rounded-xl px-4 py-2 flex-1'>
                                    <Link to={`/profile/${c?.user?._id}`} className="text-xs font-semibold text-gray-800 hover:underline">{c?.user?.f_name}</Link>
                                    <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">{c?.comment}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <ToastContainer />
        </Card>
    )
}

export default Post
