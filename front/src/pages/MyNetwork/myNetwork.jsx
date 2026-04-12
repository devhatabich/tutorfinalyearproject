import React, { useState, useEffect } from 'react'
import ProfileCard from '../../components/ProfileCard/profileCard'
import Avatar from '../../components/Avatar/avatar'
import Card from '../../components/Card/card'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const MyNetwork = () => {
    const [tab, setTab] = useState('friends')
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [pendingCount, setPendingCount] = useState(0)

    const fetchFriendList = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/friendsList`, { withCredentials: true })
            setData(res.data.friends)
        } catch {
            toast.error('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    const fetchPendingRequest = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/pendingFriendsList`, { withCredentials: true })
            setData(res.data.pendingFriends)
            setPendingCount(res.data.pendingFriends.length)
        } catch {
            toast.error('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    // Always fetch pending count on mount so the badge is visible from the start
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/auth/pendingFriendsList`, { withCredentials: true })
            .then(res => setPendingCount(res.data.pendingFriends.length))
            .catch(() => {})
    }, [])

    useEffect(() => {
        if (tab === 'friends') fetchFriendList()
        else fetchPendingRequest()
    }, [tab])

    const handleAccept = async (friendId) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/acceptFriendRequest`, { friendId }, { withCredentials: true })
            toast.success(res.data.message)
            setData(prev => prev.filter(u => u._id !== friendId))
            setPendingCount(prev => Math.max(0, prev - 1))
        } catch (err) {
            toast.error(err?.response?.data?.error || 'Something went wrong')
        }
    }

    const handleDecline = async (senderId) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/auth/declineFriendRequest/${senderId}`, { withCredentials: true })
            toast.success('Request declined')
            setData(prev => prev.filter(u => u._id !== senderId))
            setPendingCount(prev => Math.max(0, prev - 1))
        } catch (err) {
            toast.error(err?.response?.data?.error || 'Something went wrong')
        }
    }

    return (
        <div className='px-4 md:px-8 xl:px-32 py-6 min-h-screen' style={{ backgroundColor: '#f0f4f1' }}>
            {/* Header bar */}
            <div className='bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6'>
                <div>
                    <h2 className="font-bold text-lg text-gray-900">
                        {tab === 'friends' ? 'My Connections' : 'Pending Requests'}
                    </h2>
                    <p className="text-sm text-gray-400">
                        {data.length} {tab === 'friends' ? 'connections' : 'pending'}
                    </p>
                </div>
                <div className='flex gap-2'>
                    <button
                        onClick={() => setTab('friends')}
                        className='px-4 py-1.5 text-sm font-medium rounded-full transition-colors cursor-pointer border transition-opacity hover:opacity-90 mt-1 up-btn-glow'
                        style={tab === 'friends'
                            ? { backgroundColor: '#435465', color: '#fff', borderColor: '#435465' }
                            : { backgroundColor: 'transparent', color: '#374151', borderColor: '#d1d5db' }}
                    >
                        Peers
                    </button>
                    <button
                        onClick={() => setTab('pending')}
                        className='relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors cursor-pointer border transition-opacity hover:opacity-90 mt-1 up-btn-glow'
                        style={tab === 'pending'
                            ? { backgroundColor: '#435465', color: '#fff', borderColor: '#435465' }
                            : { backgroundColor: 'transparent', color: '#374151', borderColor: '#d1d5db' }}
                    >
                        Pending
                        {pendingCount > 0 && (
                            <span className='absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 text-[10px] font-bold bg-red-500 text-white rounded-full flex items-center justify-center'>
                                {pendingCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className='w-8 h-8 border-2 border-gray-300 border-t-[#435465] rounded-full animate-spin' />
                </div>
            ) : data.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                    <div className="text-5xl mb-4"><PeopleAltIcon sx={{ fontSize: 56,  color: '#9ca3af' }}/></div>
                    <div className="text-lg font-medium">
                        {tab === 'friends' ? 'No peers yet' : 'No pending requests'}
                    </div>
                    <div className="text-sm mt-1">Find people to connect with</div>
                </div>
            ) : tab === 'friends' ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {data.map((item, index) => (
                        <ProfileCard key={index} data={item} />
                    ))}
                </div>
            ) : (
                /* Pending requests — show Accept/Decline */
                <div className='flex flex-col gap-3'>
                    {data.map((item, index) => (
                        <Card key={index} padding={0}>
                            <div className='flex items-center gap-4 px-5 py-4'>
                                <Link to={`/profile/${item._id}`}>
                                    <Avatar src={item?.profilePic} name={item?.f_name} size="lg" className='w-14 h-14 shrink-0' />
                                </Link>
                                <div className='flex-1 min-w-0'>
                                    <Link to={`/profile/${item._id}`} className='font-semibold text-gray-900 hover:underline text-sm'>
                                        {item?.f_name}
                                    </Link>
                                    <div className='text-xs text-gray-500 mt-0.5 truncate'>{item?.headline}</div>
                                    <div className='text-xs text-gray-400'>{item?.curr_location}</div>
                                </div>
                                <div className='flex gap-2 shrink-0'>
                                    <button
                                        onClick={() => handleAccept(item._id)}
                                        className='px-4 py-1.5 rounded-full text-sm font-semibold text-white cursor-pointer transition-opacity hover:opacity-90 mt-1 up-btn-glow'
                                        style={{ backgroundColor: '#435465' }}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleDecline(item._id)}
                                        className='px-4 py-1.5 rounded-full text-sm font-semibold border border-gray-300 text-gray-600 cursor-pointer hover:bg-gray-50'
                                    >
                                        Decline
                                    </button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            <ToastContainer />
        </div>
    )
}

export default MyNetwork
