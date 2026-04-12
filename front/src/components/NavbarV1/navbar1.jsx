import React from 'react'
import { Link } from 'react-router-dom'

const Navbar1 = () => {
    return (
        <nav className='w-full bg-white border-b border-gray-200 px-5 md:px-16 xl:px-32 flex justify-between items-center py-4'>
            <Link to={'/'} className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center shadow-sm" style={{ backgroundColor: '#fff', borderRadius: '50%', borderColor: '#435465'}}>
                    <img className="p-0.5 w-full h-full" src={'https://m3-uploads.s3.eu-west-1.amazonaws.com/favicon.webp'}></img>
                </div>
                <span className="font-bold text-base " style={{ color: '#435465' }}>TutorMe</span>
            </Link>

            <div className="flex items-center gap-3">
                <Link
                    to={'/signUp'}
                    className="px-5 py-2 rounded-full text-sm font-medium  hover:border-gray-400  transition-opacity hover:opacity-90 hover:bg-white up-btn-glow"
                    style={{ color: '#374452', border: '1.5px solid #374452' }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#fff' }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent' }}
                >
                    Join Us
                </Link>
                <Link
                    to={'/login'}
                    className="px-5 py-2 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90 up-btn-glow"
                    style={{ backgroundColor: '#374452' }}
                >
                    Sign In
                </Link>
            </div>
        </nav>
    )
}

export default Navbar1
