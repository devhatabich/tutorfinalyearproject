import React, { useState, useEffect } from 'react'
import ProfileCard from '../../components/ProfileCard/profileCard'
import Post from '../../components/Post/post'
import Advertisement from '../../components/Advertisement/advertisement'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const SingleActivity = () => {
    const { id, postId } = useParams();
    const [post, setPost] = useState(null)
    const [ownData, setOwnData] = useState(null);

    const fetchDataOnLoad = async () => {
        await axios.get(`${import.meta.env.VITE_API_URL}/api/post/getPostById/${postId}`)
            .then(res => setPost(res.data.post))
            .catch(err => alert(err?.response?.data?.error))
    }

    useEffect(() => {
        fetchDataOnLoad();
        let stored = localStorage.getItem('userInfo');
        setOwnData(stored ? JSON.parse(stored) : null);
    }, [])

    return (
        <div className='px-4 md:px-8 xl:px-32 py-6 flex gap-5 w-full min-h-screen' style={{ backgroundColor: '#f0f4f1' }}>
            {/* Left sidebar */}
            <div className='hidden sm:block w-56 shrink-0 sticky top-18 self-start'>
                <ProfileCard data={post?.user} />
            </div>

            {/* Main */}
            <div className='flex-1 min-w-0'>
                {post && <Post item={post} personalData={ownData} />}
            </div>

            {/* Right sidebar */}
            <div className='hidden md:block w-64 shrink-0 sticky top-18 self-start'>
                <Advertisement />
            </div>
        </div>
    )
}

export default SingleActivity
