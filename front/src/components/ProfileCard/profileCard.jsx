import React from 'react'
import Card from '../Card/card'
import { Link } from 'react-router-dom'
import Avatar from '../Avatar/avatar'

const ProfileCard = (props) => {
    return (
        <Card padding={0}>
            <Link to={`/profile/${props.data?._id}`} className='relative block'>
                <div className='relative w-full h-20 rounded-t-xl overflow-hidden bg-gray-100'>
                    {props.data?.cover_pic
                        ? <img src={props.data.cover_pic} className='w-full h-full object-cover' alt="" />
                        : <div className='w-full h-full' style={{ background: 'linear-gradient(135deg, #435465 0%, #435465 100%)' }} />
                    }
                </div>
                <div className='absolute top-10 left-5 z-10'>
                    <Avatar
                        src={props?.data?.profilePic}
                        name={props?.data?.f_name}
                        size="lg"
                        className='h-14 w-14 border-2 border-white shadow'
                    />
                </div>
            </Link>
            <div className='pt-9 px-5 pb-5'>
                <Link to={`/profile/${props.data?._id}`} className="font-semibold text-gray-900 hover:underline text-sm">{props?.data?.f_name}</Link>
                <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">{props?.data?.headline}</div>
                <div className="text-xs text-gray-400 mt-0.5">{props?.data?.curr_location}</div>
            </div>
        </Card>
    )
}

export default ProfileCard
