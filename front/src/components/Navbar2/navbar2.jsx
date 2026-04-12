import React, { useState, useEffect, useRef } from 'react'
import './navbar2.css'
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import Avatar from '../Avatar/avatar';

const Navbar2 = () => {
    const location = useLocation();
    const [userData, setUserData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState('');
    const [searchUser, setSearchUser] = useState([]);
    const [notificationCount, setNotificationCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);
    const [unreadMsgCount, setUnreadMsgCount] = useState(0);
    const [mobileOpen, setMobileOpen] = useState(false);
    const mobileMenuRef = useRef(null);
    const searchRef = useRef(null);

    // Reduced debounce to 350ms for snappier feel
    useEffect(() => {
        if (!searchTerm.trim()) {
            setDebouncedTerm('');
            setSearchUser([]);
            return;
        }
        const handler = setTimeout(() => setDebouncedTerm(searchTerm), 350);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    useEffect(() => {
        if (debouncedTerm.trim()) searchAPICall(debouncedTerm);
    }, [debouncedTerm]);

    // Re-fetch unread message count when messages are read in Messages page
    useEffect(() => {
        const handler = () => {
            axios.get(`${import.meta.env.VITE_API_URL}/api/message/unread-count`, { withCredentials: true })
                .then(res => setUnreadMsgCount(res.data.count || 0))
                .catch(() => {});
        };
        window.addEventListener('messages-read', handler);
        return () => window.removeEventListener('messages-read', handler);
    }, []);

    // Click-outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setSearchUser([]);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const searchAPICall = async (query) => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/auth/findUser?query=${encodeURIComponent(query)}`,
                { withCredentials: true }
            );
            setSearchUser(res.data.users || []);
        } catch (err) {
            console.log(err);
            setSearchUser([]);
        }
    };

    const fetchCounts = async () => {
        await Promise.allSettled([
            axios.get(`${import.meta.env.VITE_API_URL}/api/notification/activeNotification`, { withCredentials: true })
                .then(res => setNotificationCount(res.data.count || 0)),
            axios.get(`${import.meta.env.VITE_API_URL}/api/auth/pendingFriendsList`, { withCredentials: true })
                .then(res => setPendingCount(res.data.pendingFriends?.length || 0)),
            axios.get(`${import.meta.env.VITE_API_URL}/api/message/unread-count`, { withCredentials: true })
                .then(res => setUnreadMsgCount(res.data.count || 0)),
        ]);
    };

    useEffect(() => {
        // Always fetch from API so the correct logged-in user is shown
        // even after switching accounts, without relying on stale localStorage.
        axios.get(`${import.meta.env.VITE_API_URL}/api/auth/self`, { withCredentials: true })
            .then(res => {
                setUserData(res.data.user);
                localStorage.setItem('userInfo', JSON.stringify(res.data.user));
            })
            .catch(() => {
                const stored = localStorage.getItem('userInfo');
                if (stored) setUserData(JSON.parse(stored));
            });
    }, []);

    // Re-fetch counts on every page navigation so badges stay up-to-date
    // (e.g. after accepting a friend request or reading notifications)
    useEffect(() => {
        fetchCounts();
    }, [location.pathname]);

    useEffect(() => { setMobileOpen(false); }, [location.pathname]);

    const navItems = [
        { to: '/feeds', icon: <HomeIcon sx={{ fontSize: 22 }} />, label: 'Home' },
        { to: '/myNetwork', icon: <GroupIcon sx={{ fontSize: 22 }} />, label: 'Peers', badge: pendingCount },
        { to: '/resume', icon: <WorkOutlinedIcon sx={{ fontSize: 22 }} />, label: 'Meetings' },
        { to: '/messages', icon: <MessageOutlinedIcon sx={{ fontSize: 22 }} />, label: 'Chat', badge: unreadMsgCount },
        { to: '/notification', icon: <AddAlertOutlinedIcon sx={{ fontSize: 22 }} />, label: 'Alerts', badge: notificationCount },
    ];

    return (
        <>
            <div className="bg-white border-b border-gray-200 h-14 flex items-center justify-between px-4 md:px-8 xl:px-32 fixed top-0 w-full z-50 shadow-sm">
                {/* Left: logo + search */}
                <div className='flex gap-3 items-center'>
                    <Link to='/feeds' className="flex items-center gap-2 shrink-0">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center shadow-sm cursor-pointer hover:border-gray-400 transition-colors hover:bg-white up-btn-glow group" style={{ backgroundColor: '#fff', borderRadius: '50%', borderColor: '#435465'}}>
                            <img className="p-0.5 w-full h-full" src={'https://m3-uploads.s3.eu-west-1.amazonaws.com/favicon.webp'}></img>
                        </div>
                        <span className="hidden sm:block font-bold text-sm tracking-tight" style={{ color: '#435465' }}>TutorMe</span>
                    </Link>
                    <div className='relative' ref={searchRef}>
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="searchInput w-44 sm:w-56 bg-gray-100 rounded-md h-9 px-4 text-sm outline-none transition-all"
                            placeholder="Search people..."
                        />
                        {searchUser.length > 0 && searchTerm.trim().length > 0 && (
                            <div className='absolute top-11 left-0 w-72 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50'>
                                {searchUser.map((item, index) => (
                                    <Link
                                        to={`/profile/${item?._id}`}
                                        key={index}
                                        className='flex gap-3 px-4 py-3 items-center hover:bg-gray-50 transition-colors'
                                        onClick={() => { setSearchTerm(''); setSearchUser([]); }}
                                    >
                                        <Avatar src={item?.profilePic} name={item?.f_name} size="sm" className='w-9 h-9' />
                                        <div>
                                            <div className="text-sm font-medium">{item?.f_name}</div>
                                            <div className="text-xs text-gray-500">{item?.headline}</div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Desktop nav */}
                <div className='hidden md:flex items-stretch h-14 gap-1'>
                    {navItems.map((nav) => {
                        const isActive = location.pathname === nav.to;
                        return (
                            <Link
                                key={nav.to}
                                to={nav.to}
                                className='relative flex flex-col items-center justify-center px-4 transition-colors hover:bg-gray-50'
                                style={{ color: isActive ? '#435465' : '#6b7280' }}
                            >
                                <div className="relative flex items-center justify-center w-6 h-6">
                                    <span style={{ color: isActive ? '#435465' : '#9ca3af' }}>{nav.icon}</span>
                                    {nav.badge > 0 && (
                                        <span className="absolute -top-1.5 -right-2 text-[10px] bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center font-bold leading-none">
                                            {nav.badge > 99 ? '99+' : nav.badge}
                                        </span>
                                    )}
                                </div>
                                <span className="text-xs mt-1 font-medium leading-none">{nav.label}</span>
                                {isActive && <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t" style={{ backgroundColor: '#435465' }} />}
                            </Link>
                        );
                    })}

                    {userData?.isAdmin && (
                        <Link
                            to='/admin'
                            className='relative flex flex-col items-center justify-center px-4 transition-colors hover:bg-[#f0f7f4]'
                            style={{ color: location.pathname === '/admin' ? '#dc2626' : '#6b7280' }}
                        >
                            <div className="flex items-center justify-center w-6 h-6">
                                <AdminPanelSettingsIcon sx={{ fontSize: 22, color: location.pathname === '/admin' ? '#dc2626' : '#9ca3af' }} />
                            </div>
                            <span className="text-xs mt-1 font-medium leading-none">Admin</span>
                            {location.pathname === '/admin' && <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t bg-red-600" />}
                        </Link>
                    )}
                    <Link to={`/profile/${userData?._id}`} className='flex flex-col items-center justify-center px-3 ml-1'>
                        <div className="flex items-center justify-center w-6 h-6">
                            <Avatar src={userData?.profilePic} name={userData?.f_name} size="sm" className='w-6 h-6 border-2 border-[#435465]' />
                        </div>
                        <span className="text-xs mt-1 text-gray-500 font-medium leading-none">Me</span>
                    </Link>
                </div>

                {/* Mobile hamburger */}
                <button
                    className='md:hidden p-2 rounded-md'
                    style={{ color: '#435465' }}
                    onClick={() => setMobileOpen(prev => !prev)}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <CloseIcon /> : <MenuIcon />}
                </button>
            </div>

            {/* Mobile drawer */}
            {mobileOpen && (
                <div
                    ref={mobileMenuRef}
                    className='md:hidden fixed top-14 left-0 right-0 bg-white border-b border-gray-200 z-40 shadow-lg'
                >
                    <div className='flex flex-col py-2'>
                        {navItems.map((nav) => (
                            <Link
                                key={nav.to}
                                to={nav.to}
                                className='flex items-center gap-4 px-6 py-3 text-sm font-medium transition-colors hover:bg-gray-50'
                                style={{ color: location.pathname === nav.to ? '#435465' : '#374151' }}
                            >
                                <span style={{ color: location.pathname === nav.to ? '#435465' : '#9ca3af' }}>{nav.icon}</span>
                                {nav.label}
                            </Link>
                        ))}
                        {userData?.isAdmin && (
                            <Link
                                to='/admin'
                                className='flex items-center gap-4 px-6 py-3 text-sm font-medium hover:bg-gray-50'
                                style={{ color: location.pathname === '/admin' ? '#dc2626' : '#374151' }}
                            >
                                <AdminPanelSettingsIcon sx={{ color: '#9ca3af', fontSize: 22 }} />
                                Admin Panel
                            </Link>
                        )}
                        <Link
                            to={`/profile/${userData?._id}`}
                            className='flex items-center gap-4 px-6 py-3 text-sm font-medium hover:bg-gray-50'
                        >
                            <Avatar src={userData?.profilePic} name={userData?.f_name} size="sm" className='w-8 h-8' />
                            <span style={{ color: '#374151' }}>My Profile</span>
                        </Link>
                    </div>
                </div>
            )}

            {/* Spacer for fixed navbar */}
            <div className='h-14' />
        </>
    );
};

export default Navbar2;
