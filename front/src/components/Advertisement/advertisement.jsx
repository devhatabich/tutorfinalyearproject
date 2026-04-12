import React, { useState, useEffect } from 'react'
import Card from '../Card/card'
import { Link } from 'react-router-dom'
import Avatar from '../Avatar/avatar'

const Advertisement = () => {
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        let stored = localStorage.getItem('userInfo')
        setUserData(stored ? JSON.parse(stored) : null)
    }, [])

    return (
        <div className='sticky top-18'>
            <Card padding={0}>
                <div className='p-5'>
                    <div className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#435465' }}>Quick Actions</div>
                    <div className="flex items-center gap-3 mb-4">
                        <Avatar src={userData?.profilePic} name={userData?.f_name} size="md" className='w-10 h-10 border border-gray-200' />
                        <div>
                            <div className="text-sm font-semibold text-gray-800">{userData?.f_name}</div>
                            <div className="text-xs text-gray-400">{userData?.points ?? '—'} points</div>
                        </div>
                    </div>
                    <Link
                        to='/resume'
                        className="block w-full text-center text-sm font-semibold text-white py-2 px-4 rounded-lg transition-opacity hover:opacity-90 mt-1 up-btn-glow"
                        style={{ backgroundColor: '#435465' }}
                    >
                        Schedule a meeting
                    </Link>
                </div>
            </Card>
        </div>
    )
}

export default Advertisement
