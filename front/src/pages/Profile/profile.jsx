import React, { useState, useEffect, useRef } from 'react'
import Advertisement from '../../components/Advertisement/advertisement'
import Card from '../../components/Card/card'
import EditIcon from '@mui/icons-material/Edit';
import Post from '../../components/Post/post';
import AddIcon from '@mui/icons-material/Add';
import Modal from '../../components/Modal/modal';
import ImageModal from '../../components/ImageModal/imageModal';
import EditinfoModal from '../../components/EditInfoModal/editinfoModal';
import AboutModal from '../../components/AboutModal/aboutModal';
import ExpModal from '../../components/ExpModal/expModal';
import MessageModal from '../../components/MessageModal/messageModal';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ShareIcon from '@mui/icons-material/Share';
import LogoutIcon from '@mui/icons-material/Logout';
import FlagIcon from '@mui/icons-material/Flag';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Avatar from '../../components/Avatar/avatar';

const StarDisplay = ({ value }) => (
    <span className="flex gap-0.5">
        {[1,2,3,4,5].map(n => {
            if (n <= Math.floor(value)) return <StarIcon key={n} sx={{ fontSize: 16, color: '#f59e0b' }} />;
            if (n === Math.floor(value) + 1 && value % 1 >= 0.25 && value % 1 < 0.75) return <StarHalfIcon key={n} sx={{ fontSize: 16, color: '#f59e0b' }} />;
            return <StarBorderIcon key={n} sx={{ fontSize: 16, color: '#d1d5db' }} />;
        })}
    </span>
);

const FeedbackModal = ({ star, onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h3 className="font-bold text-gray-900 text-lg mb-1">Meeting Feedback</h3>
            <p className="text-sm text-gray-500 mb-4">from <strong>{star.fromUserName}</strong></p>
            <div className="mb-3 space-y-1">
                <div className="text-sm text-gray-600">Meeting: <span className="font-medium text-gray-900">{star.meetingTitle}</span></div>
                <div className="text-sm text-gray-600">Date: <span className="font-medium">{new Date(star.meetingDate).toLocaleDateString()}</span></div>
            </div>
            <div className="mb-3"><StarDisplay value={star.rating} /></div>
            {star.comment && <p className="text-sm text-gray-700 bg-gray-50 rounded-xl px-4 py-3 mb-4">"{star.comment}"</p>}
            <div className="flex justify-end">
                <button onClick={onClose} className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer">Close</button>
            </div>
        </div>
    </div>
);

const Profile = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [imageSetModal, setImageModal] = useState(false);
    const [circularImage, setCircularImage] = useState(true);
    const [infoModal, setInfoModal] = useState(false);
    const [aboutModal, setAboutModal] = useState(false);
    const [expModal, setExpModal] = useState(false);
    const [messageModal, setMessageModal] = useState(false);
    const [shareMenuOpen, setShareMenuOpen] = useState(false);
    const [reportUserOpen, setReportUserOpen] = useState(false);
    const [reportReason, setReportReason] = useState('');
    const [reporting, setReporting] = useState(false);
    const [feedbackStar, setFeedbackStar] = useState(null);
    const shareMenuRef = useRef(null);

    const [userData, setUserData] = useState(null);
    const [postData, setPostData] = useState([]);
    const [ownData, setOwnData] = useState(null);
    const [updateExp, setUpdateExp] = useState({ clicked: '', id: '', datas: {} });

    const updateExpEdit = (id, data) => {
        setUpdateExp({ ...updateExp, clicked: true, id, data });
        setExpModal(prev => !prev);
    }

    useEffect(() => { fetchDataOnLoad() }, [id])

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (shareMenuRef.current && !shareMenuRef.current.contains(e.target)) {
                setShareMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fetchDataOnLoad = async () => {
        try {
            const [userDatas, postDatas, ownDatas] = await Promise.all([
                axios.get(`${import.meta.env.VITE_API_URL}/api/auth/user/${id}`),
                axios.get(`${import.meta.env.VITE_API_URL}/api/post/getTop5Post/${id}`),
                axios.get(`${import.meta.env.VITE_API_URL}/api/auth/self`, { withCredentials: true })
            ]);
            setUserData(userDatas.data.user);
            setPostData(postDatas.data.posts);
            setOwnData(ownDatas.data.user);
            localStorage.setItem('userInfo', JSON.stringify(ownDatas.data.user));
        } catch (err) {
            console.log(err);
            alert('Something went wrong');
        }
    }

    const amIfriend = () => userData?.friends?.filter(item => item === ownData?._id)?.length;
    const isInPendingList = () => userData?.pending_friends?.filter(item => item === ownData?._id)?.length;
    const isInSelfPendingList = () => ownData?.pending_friends?.filter(item => item === userData?._id)?.length;

    const checkFriendStatus = () => {
        if (amIfriend()) return 'Disconnect';
        if (isInSelfPendingList()) return 'Approve Request';
        if (isInPendingList()) return 'Request Sent';
        return 'Connect';
    }

    const handleSendFriendRequest = async () => {
        const status = checkFriendStatus();
        if (status === 'Request Sent') return;
        if (status === 'Connect') {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/sendFriendReq`, { reciever: userData?._id }, { withCredentials: true })
                .then(res => { toast.success(res.data.message); setTimeout(() => window.location.reload(), 2000); })
                .catch(err => toast.error(err?.response?.data?.error));
        } else if (status === 'Approve Request') {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/acceptFriendRequest`, { friendId: userData?._id }, { withCredentials: true })
                .then(res => { toast.success(res.data.message); setTimeout(() => window.location.reload(), 2000); })
                .catch(err => toast.error(err?.response?.data?.error));
        } else {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/auth/removeFromFriendList/${userData?._id}`, { withCredentials: true })
                .then(res => { toast.success(res.data.message); setTimeout(() => window.location.reload(), 2000); })
                .catch(err => toast.error(err?.response?.data?.error));
        }
    }

    const handleLogout = async () => {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {}, { withCredentials: true })
            .then(() => { localStorage.clear(); window.location.reload(); })
            .catch(err => toast.error(err?.response?.data?.error));
    }

    const shareToLinkedIn = () => {
        const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
        window.open(url, '_blank');
        setShareMenuOpen(false);
    };

    const shareToTwitter = () => {
        const text = encodeURIComponent(`Check out ${userData?.f_name}'s profile on TutorMe!`);
        const url = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(window.location.href)}`;
        window.open(url, '_blank');
        setShareMenuOpen(false);
    };

    const handleEditFunc = async (data) => {
        await axios.put(`${import.meta.env.VITE_API_URL}/api/auth/update`, { user: data }, { withCredentials: true })
            .then(() => window.location.reload())
            .catch(() => alert('Something went wrong'));
    }

    const handleReportUser = async () => {
        setReporting(true);
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/report`, {
                reportType: 'user',
                targetId: userData._id,
                reason: reportReason,
            }, { withCredentials: true });
            toast.success('User reported');
            setReportUserOpen(false);
        } catch (err) {
            toast.error(err?.response?.data?.error || 'Could not submit report');
        } finally {
            setReporting(false);
        }
    };

    const avgStars = userData?.stars?.length
        ? (userData.stars.reduce((sum, s) => sum + s.rating, 0) / userData.stars.length).toFixed(1)
        : null;

    // Bug #6: guard against both being null/undefined (both null === null = true is wrong)
    const isOwn = !!(userData?._id && ownData?._id && userData._id.toString() === ownData._id.toString());

    return (
        <div className='px-4 md:px-8 xl:px-32 py-6 min-h-screen' style={{ backgroundColor: '#f0f4f1' }}>
            <div className='flex gap-5 items-start'>
                {/* Main column */}
                <div className='flex-1 min-w-0 flex flex-col gap-4'>

                    {/* Profile header card */}
                    <Card padding={0}>
                        {/* Cover */}
                        <div className='relative w-full h-40 sm:h-52'>
                            {userData?.cover_pic && userData.cover_pic !== 'https://wallpaperaccess.com/full/6060285.png' ? (
                                <img
                                    src={userData.cover_pic}
                                    className='w-full h-full object-cover rounded-t-xl'
                                    alt=""
                                    onError={e => { e.target.style.display = 'none'; e.target.nextSibling?.style.setProperty('display', 'flex'); }}
                                />
                            ) : null}
                            <div
                                className='w-full h-full rounded-t-xl flex-col items-center justify-center gap-2'
                                style={{ backgroundColor: '#000000', display: (userData?.cover_pic && userData.cover_pic !== 'https://wallpaperaccess.com/full/6060285.png') ? 'none' : 'flex' }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                                <span className='text-sm font-medium' style={{ color: 'rgba(255,255,255,0.8)' }}>Add a background photo</span>
                                <span className='text-xs' style={{ color: 'rgba(255,255,255,0.45)' }}>Stand out with a banner that represents you</span>
                            </div>
                            {isOwn && (
                                <button
                                    className='absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow cursor-pointer hover:bg-gray-50 transition-colors'
                                    onClick={() => { setImageModal(true); setCircularImage(false); }}
                                >
                                    <EditIcon sx={{ fontSize: 16 }} />
                                </button>
                            )}
                            <div className='absolute -bottom-12 left-5 sm:left-6'>
                                <div
                                    className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white overflow-hidden shadow-md ${isOwn ? 'cursor-pointer' : 'cursor-default'}`}
                                    onClick={() => isOwn && (setImageModal(true), setCircularImage(true))}
                                >
                                    <Avatar src={userData?.profilePic} name={userData?.f_name} size="2xl" className='w-full h-full' />
                                </div>
                            </div>
                        </div>

                        {/* Info */}
                        <div className='mt-14 px-5 sm:px-6 pb-5'>
                            <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4'>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900">{userData?.f_name}</h1>
                                    <p className="text-sm text-gray-600 mt-0.5">{userData?.headline}</p>
                                    <p className="text-xs text-gray-400 mt-0.5">{userData?.curr_location}</p>
                                    <p className="text-sm font-medium mt-2 cursor-pointer hover:underline" style={{ color: '#435465' }}>
                                        {userData?.friends?.length} Peers
                                    </p>
                                </div>
                                {isOwn && (
                                    <button
                                        className='absolute top-44 right-5 sm:static w-8 h-8 bg-white rounded-full flex items-center justify-center shadow cursor-pointer hover:bg-gray-50 transition-colors sm:mt-0'
                                        onClick={() => setInfoModal(true)}
                                    >
                                        <EditIcon sx={{ fontSize: 16 }} />
                                    </button>
                                )}
                            </div>

                            {/* Actions */}
                            <div className='flex flex-wrap gap-2 mt-4'>
                                <div className='relative' ref={shareMenuRef}>
                                    <button
                                        onClick={() => setShareMenuOpen(prev => !prev)}
                                        className='flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90'
                                        style={{ backgroundColor: '#435465' }}
                                    >
                                        <ShareIcon sx={{ fontSize: 16 }} /> Share
                                    </button>
                                    {shareMenuOpen && (
                                        <div className='absolute top-full left-0 mt-1 w-44 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden'>
                                            <button
                                                onClick={shareToLinkedIn}
                                                className='w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer'
                                            >
                                                <span className='w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-white' style={{ backgroundColor: '#0A66C2' }}>in</span>
                                                LinkedIn
                                            </button>
                                            <button
                                                onClick={shareToTwitter}
                                                className='w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer border-t border-gray-100'
                                            >
                                                <span className='w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-white' style={{ backgroundColor: '#1DA1F2' }}>tw</span>
                                                Twitter
                                            </button>
                                        </div>
                                    )}
                                </div>
                                {isOwn && (
                                    <button
                                        onClick={handleLogout}
                                        className='flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors'
                                    >
                                        <LogoutIcon sx={{ fontSize: 16 }} /> Logout
                                    </button>
                                )}
                                {!isOwn && amIfriend() ? (
                                    <button
                                        onClick={() => setMessageModal(true)}
                                        className='px-4 py-2 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90'
                                        style={{ backgroundColor: '#435465' }}
                                    >
                                        Message
                                    </button>
                                ) : null}
                                {!isOwn && (
                                    <button
                                        onClick={handleSendFriendRequest}
                                        className='px-4 py-2 rounded-lg text-sm font-semibold border transition-colors'
                                        style={checkFriendStatus() === 'Request Sent'
                                            ? { backgroundColor: '#f3f4f6', color: '#6b7280', borderColor: '#e5e7eb' }
                                            : { backgroundColor: '#435465', color: '#fff', borderColor: '#435465' }}
                                    >
                                        {checkFriendStatus()}
                                    </button>
                                )}
                                {!isOwn && (
                                    <button
                                        onClick={() => setReportUserOpen(true)}
                                        className='flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold border border-red-200 text-red-600 hover:bg-red-50 transition-colors'
                                    >
                                        <FlagIcon sx={{ fontSize: 15 }} /> Report
                                    </button>
                                )}
                            </div>
                        </div>
                    </Card>

                    {/* About */}
                    <Card padding={1}>
                        <div className='flex justify-between items-center mb-2'>
                            <h2 className='font-bold text-gray-900'>Introduction</h2>
                            {isOwn && <button onClick={() => setAboutModal(true)} className='cursor-pointer text-gray-400 hover:text-gray-600'><EditIcon sx={{ fontSize: 18 }} /></button>}
                        </div>
                        <p className='text-sm text-gray-600 leading-relaxed'>{userData?.about || 'No introduction added yet.'}</p>
                    </Card>

                    {/* Skills */}
                    <Card padding={1}>
                        <h2 className='font-bold text-gray-900 mb-3'>Expert in</h2>
                        <div className='flex gap-2 flex-wrap'>
                            {userData?.skills?.map((item, index) => (
                                <span key={index} className='py-1.5 px-3 text-sm font-medium text-white rounded-full' style={{ backgroundColor: '#435465' }}>
                                    {item}
                                </span>
                            ))}
                        </div>
                    </Card>

                    {/* Recent Activity */}
                    <Card padding={1}>
                        <h2 className='font-bold text-gray-900 mb-3'>Recent Activity</h2>
                        <div className="overflow-x-auto flex gap-3 pb-2">
                            {postData.map((item, ind) => (
                                <div
                                    key={ind}
                                    onClick={() => navigate(`/profile/${id}/activities/${item?._id}`)}
                                    className='shrink-0 w-72 rounded-xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer'
                                >
                                    <Post profile={1} item={item} personalData={ownData} />
                                </div>
                            ))}
                        </div>
                        {postData.length > 4 && (
                            <Link
                                to={`/profile/${id}/activities`}
                                className='mt-3 flex items-center justify-center gap-1 text-sm font-medium py-2 rounded-lg hover:bg-gray-50 transition-colors'
                                style={{ color: '#435465' }}
                            >
                                Show all posts <ArrowRightAltIcon sx={{ fontSize: 18 }} />
                            </Link>
                        )}
                    </Card>

                    {/* Stars & Feedback */}
                    {userData && (userData.stars.length > 0 || !isOwn) && (
                        <Card padding={1}>
                            <div className="flex items-center justify-between mb-3">
                                <h2 className='font-bold text-gray-900'>Stars & Feedback</h2>
                                {avgStars && (
                                    <div className="flex items-center gap-2">
                                        <StarDisplay value={parseFloat(avgStars)} />
                                        <span className="text-sm font-semibold text-gray-700">{avgStars} / 5</span>
                                        <span className="text-xs text-gray-400">({userData.stars.length} rating{userData.stars.length !== 1 ? 's' : ''})</span>
                                    </div>
                                )}
                            </div>
                            {userData?.stars?.length === 0 ? (
                                <p className="text-sm text-gray-400">No feedback received yet.</p>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    {(userData.stars || []).map((star, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setFeedbackStar(star)}
                                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left w-full cursor-pointer"
                                        >
                                            <div className="flex-1 min-w-0">
                                                <div className="text-sm font-semibold text-gray-900">{star.fromUserName}</div>
                                                <div className="text-xs text-gray-500 mt-0.5 truncate">{star.meetingTitle}</div>
                                                {star.comment && <div className="text-xs text-gray-600 mt-1 italic truncate">"{star.comment}"</div>}
                                            </div>
                                            <StarDisplay value={star.rating} />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </Card>
                    )}

                    {/* Education / Experience */}
                    <Card padding={1}>
                        <div className='flex justify-between items-center mb-3'>
                            <h2 className='font-bold text-gray-900'>Education</h2>
                            {isOwn && (
                                <button onClick={() => setExpModal(true)} className='cursor-pointer text-gray-400 hover:text-gray-600'>
                                    <AddIcon sx={{ fontSize: 20 }} />
                                </button>
                            )}
                        </div>
                        <div className='flex flex-col gap-1'>
                            {userData?.experience?.map((item, index) => (
                                <div key={index} className='flex justify-between items-start p-3 rounded-lg hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0'>
                                    <div>
                                        <div className="text-sm font-semibold text-gray-900">{item.designation}</div>
                                        <div className="text-sm text-gray-600">{item.company_name}</div>
                                        <div className="text-xs text-gray-400 mt-0.5">{item.duration} · {item.location}</div>
                                    </div>
                                    {isOwn && (
                                        <button onClick={() => updateExpEdit(item._id, item)} className='cursor-pointer text-gray-400 hover:text-gray-600 shrink-0'>
                                            <EditIcon sx={{ fontSize: 16 }} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Right sidebar */}
                <div className='hidden md:block w-64 shrink-0 sticky top-18'>
                    <Advertisement />
                </div>
            </div>

            {/* Modals */}
            {imageSetModal && <Modal title='Upload Image' closeModal={() => setImageModal(false)}><ImageModal handleEditFunc={handleEditFunc} selfData={ownData} isCircular={circularImage} /></Modal>}
            {infoModal && <Modal title="Edit Info" closeModal={() => setInfoModal(false)}><EditinfoModal handleEditFunc={handleEditFunc} selfData={ownData} /></Modal>}
            {aboutModal && <Modal title="Edit About" closeModal={() => setAboutModal(false)}><AboutModal handleEditFunc={handleEditFunc} selfData={ownData} /></Modal>}
            {expModal && <Modal title="Education" closeModal={() => { setUpdateExp({ clicked: '', id: '', datas: {} }); setExpModal(false); }}><ExpModal handleEditFunc={handleEditFunc} selfData={ownData} updateExp={updateExp} setUpdateExp={updateExpEdit} /></Modal>}
            {messageModal && <Modal title="Send Message" closeModal={() => setMessageModal(false)}><MessageModal selfData={ownData} userData={userData} /></Modal>}

            {reportUserOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
                        <h3 className="font-bold text-gray-900 text-lg mb-1">Report User</h3>
                        <p className="text-sm text-gray-500 mb-4">Reporting <strong>{userData?.f_name}</strong></p>
                        <textarea
                            value={reportReason}
                            onChange={e => setReportReason(e.target.value)}
                            rows={2}
                            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-gray-400 resize-none mb-4"
                            placeholder="Reason (optional)"
                        />
                        <div className="flex gap-3 justify-end">
                            <button onClick={() => setReportUserOpen(false)} className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer">Cancel</button>
                            <button
                                onClick={handleReportUser}
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

            {feedbackStar && <FeedbackModal star={feedbackStar} onClose={() => setFeedbackStar(null)} />}

            <ToastContainer />
        </div>
    )
}

export default Profile
