import React, { useEffect, useState } from 'react'
import ProfileCard from '../../components/ProfileCard/profileCard'
import { useParams } from 'react-router-dom'
import Advertisement from '../../components/Advertisement/advertisement';
import Post from '../../components/Post/post';
import axios from 'axios'

const AllActivities = () => {
    const { id } = useParams();
    const [post, setPosts] = useState([])
    const [ownData, setOwnData] = useState(null)

    const fetchDataOnLoad = async () => {
        await axios.get(`${import.meta.env.VITE_API_URL}/api/post/getAllPostForUser/${id}`)
            .then(res => setPosts(res.data.posts))
            .catch(err => alert(err?.response?.data?.error))
    }

    useEffect(() => {
        fetchDataOnLoad();
        let stored = localStorage.getItem('userInfo');
        setOwnData(stored ? JSON.parse(stored) : null);
    }, [id])

    return (
        <div className='px-4 md:px-8 xl:px-32 py-6 flex gap-5 w-full min-h-screen' style={{ backgroundColor: '#f0f4f1' }}>
            {/* Left sidebar */}
            <div className='hidden sm:block w-56 shrink-0 sticky top-18 self-start'>
                <ProfileCard data={post[0]?.user} />
            </div>

            {/* Main */}
            <div className='flex-1 min-w-0 flex flex-col gap-4'>
                <div className="font-bold text-gray-900 text-lg">All Activity</div>
                {post.map((item, index) => (
                    <Post key={index} item={item} personalData={ownData} />
                ))}
            </div>

            {/* Right sidebar */}
            <div className='hidden md:block w-64 shrink-0 sticky top-18 self-start'>
                <Advertisement />
            </div>
        </div>
    )
}

export default AllActivities
