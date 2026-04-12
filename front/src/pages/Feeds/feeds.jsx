import React, { useState, useEffect, useRef } from 'react'
import Card from '../../components/Card/card'
import ProfileCard from '../../components/ProfileCard/profileCard'
import VideoCallIcon from '@mui/icons-material/VideoCall';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import ArticleIcon from '@mui/icons-material/Article';
import Advertisement from '../../components/Advertisement/advertisement';
import Post from '../../components/Post/post';
import Modal from '../../components/Modal/modal';
import AddModal from '../../components/AddModal/addModal';
import Avatar from '../../components/Avatar/avatar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';

const Feeds = () => {
    const [personalData, setPersonalData] = useState(null);
    const [post, setPost] = useState([])
    const [addPostModal, setAddPostModal] = useState(false);
    const [postType, setPostType] = useState('post');
    const [stats, setStats] = useState({ postCount: 0, totalLikes: 0 });
    const [highlightId, setHighlightId] = useState(null);
    const [searchParams] = useSearchParams();
    const didScrollRef = useRef(false);

    const openModal = (type = 'post') => { setPostType(type); setAddPostModal(true); };

    const fetchData = async () => {
        try {
            const [userData, postData, statsData] = await Promise.all([
                axios.get(`${import.meta.env.VITE_API_URL}/api/auth/self`, { withCredentials: true }),
                axios.get(`${import.meta.env.VITE_API_URL}/api/post/getAllPost`),
                axios.get(`${import.meta.env.VITE_API_URL}/api/post/myStats`, { withCredentials: true }),
            ]);
            setPersonalData(userData.data.user);
            localStorage.setItem('userInfo', JSON.stringify(userData.data.user));
            setPost(postData.data.posts);
            setStats(statsData.data);
        } catch (err) {
            console.log(err)
            toast.error(err?.response?.data?.error)
        }
    }

    useEffect(() => { fetchData() }, [])

    useEffect(() => {
        const targetId = searchParams.get('post');
        if (!targetId || !post.length || didScrollRef.current) return;
        const el = document.getElementById(`post-${targetId}`);
        if (el) {
            didScrollRef.current = true;
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setHighlightId(targetId);
            setTimeout(() => setHighlightId(null), 3000);
        }
    }, [post, searchParams])

    return (
        <div className='px-4 md:px-8 xl:px-32 py-6 flex gap-5 w-full' style={{ backgroundColor: '#f0f4f1' }}>
            {/* Left sidebar */}
            <div className='hidden sm:block w-56 shrink-0'>
                <div className='sticky top-18 flex flex-col gap-4'>
                    <ProfileCard data={personalData} />
                    <Card padding={1}>
                        <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#435465' }}>Your Stats</div>
                        <div className="flex justify-between text-sm py-1.5 border-b border-gray-100">
                            <span className="text-gray-500">Connections</span>
                            <span className="font-semibold text-gray-700">{personalData?.friends?.length ?? '—'}</span>
                        </div>
                        <div className="flex justify-between text-sm py-1.5 border-b border-gray-100">
                            <span className="text-gray-500">Posts</span>
                            <span className="font-semibold text-gray-700">{stats.postCount}</span>
                        </div>
                        <div className="flex justify-between text-sm py-1.5">
                            <span className="text-gray-500">Likes received</span>
                            <span className="font-semibold text-gray-700">{stats.totalLikes}</span>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Main feed */}
            <div className='flex-1 min-w-0 flex flex-col gap-4'>
                <Card padding={1}>
                    <div className='flex gap-3 items-center'>
                        <Avatar src={personalData?.profilePic} name={personalData?.f_name} size="md" className='w-11 h-11 border border-gray-200 shrink-0' />
                        <div
                            onClick={() => openModal('post')}
                            className="flex-1 border border-gray-200 py-2.5 px-4 rounded-full text-sm text-gray-400 cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                            What's on your mind?
                        </div>
                    </div>
                    <div className='flex mt-3 pt-3 border-t border-gray-100'>
                        {[
                            { icon: <VideoCallIcon sx={{ fontSize: 20, color: '#435465' }} />, label: 'Video',   type: 'video' },
                            { icon: <InsertPhotoIcon sx={{ fontSize: 20, color: '#6b7280' }} />, label: 'Photo', type: 'photo' },
                            { icon: <ArticleIcon sx={{ fontSize: 20, color: '#d97706' }} />, label: 'Article',   type: 'post'  },
                        ].map((item) => (
                            <div
                                key={item.label}
                                onClick={() => openModal(item.type)}
                                className='flex-1 flex gap-1.5 items-center justify-center py-1.5 rounded-lg text-sm text-gray-500 cursor-pointer hover:bg-gray-50 transition-colors'
                            >
                                {item.icon} {item.label}
                            </div>
                        ))}
                    </div>
                </Card>

                {post.map((item, index) => (
                    <Post item={item} key={index} personalData={personalData} highlight={highlightId === item._id?.toString()} />
                ))}
            </div>

            {/* Right sidebar */}
            <div className='hidden md:block w-64 shrink-0'>
                <div className='sticky top-18'>
                    <Advertisement />
                </div>
            </div>

            {addPostModal && (
                <Modal closeModal={() => setAddPostModal(false)} title="Create a post">
                    <AddModal personalData={personalData} defaultType={postType} />
                </Modal>
            )}
            <ToastContainer />
        </div>
    )
}

export default Feeds
