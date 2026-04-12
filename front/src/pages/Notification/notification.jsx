import React, { useEffect, useState } from 'react'
import ProfileCard from '../../components/ProfileCard/profileCard'
import Advertisement from '../../components/Advertisement/advertisement'
import Card from '../../components/Card/card'
import Avatar from '../../components/Avatar/avatar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const Notification = () => {
    const navigate = useNavigate();
    const [ownData, setOwnData] = useState(null);
    const [notifications, setNotifications] = useState([]);

    const fetchNotificationData = async () => {
        await axios.get(`${import.meta.env.VITE_API_URL}/api/notification`, { withCredentials: true })
            .then(res => setNotifications(res.data.notifications))
            .catch(() => alert('Something went wrong'))
    }

    const handleOnClickNotification = async (item) => {
        await axios.put(`${import.meta.env.VITE_API_URL}/api/notification/isRead`, { notificationId: item._id }, { withCredentials: true })
            .then(() => {
                if (item.type === 'comment') navigate(`/profile/${ownData?._id}/activities/${item.postId}`)
                else if (['meeting_created', 'meeting_rate_reminder', 'points_deducted', 'points_received'].includes(item.type)) navigate('/resume')
                else navigate('/myNetwork')
            })
            .catch(() => alert('Something went wrong'))
    }

    useEffect(() => {
        let stored = localStorage.getItem('userInfo');
        setOwnData(stored ? JSON.parse(stored) : null);
        fetchNotificationData();
    }, [])

    return (
        <div className='px-4 md:px-8 xl:px-32 py-6 flex gap-5 w-full min-h-screen' style={{ backgroundColor: '#f0f4f1' }}>
            {/* Left sidebar */}
            <div className='hidden sm:block w-56 shrink-0 sticky top-18 self-start'>
                <ProfileCard data={ownData} />
            </div>

            {/* Main */}
            <div className='flex-1 min-w-0'>
                <Card padding={0}>
                    <div className="px-5 py-3 border-b border-gray-200 font-bold text-gray-900">Notifications</div>
                    {notifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                            <div className="text-5xl mb-4"><NotificationsActiveIcon sx={{ fontSize: 56,  color: '#9ca3af' }}/></div>
                            <div className="text-base font-medium">No notifications yet</div>
                        </div>
                    ) : notifications.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => handleOnClickNotification(item)}
                            className='flex gap-4 items-center px-5 py-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors last:border-0'
                            style={!item?.isRead ? { backgroundColor: '#f0f7f4' } : {}}
                        >
                            <Avatar src={item?.sender?.profilePic} name={item?.sender?.f_name} size="md" className='w-11 h-11 shrink-0' />
                            <div className='flex-1 min-w-0'>
                                <p className="text-sm text-gray-800">{item?.content}</p>
                            </div>
                            {!item?.isRead && (
                                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: '#435465' }} />
                            )}
                        </div>
                    ))}
                </Card>
            </div>

            {/* Right sidebar */}
            <div className='hidden md:block w-64 shrink-0 sticky top-18 self-start'>
                <Advertisement />
            </div>
        </div>
    )
}

export default Notification
