import React from 'react'
import {Link} from 'react-router-dom'
const Navbar1 = () => {
    return (
        <nav className = 'w-[100%] bg-gray-100 md:px-[50px] px-[15px] flex justify-between py-4 box-border'>
            <Link to={'/'} className = 'flex justify-between'>
                <div className = 'flex gap-3 items-center cursor-pointer'>
                    <img src={'https://consent.cookiefirst.com/branding/62607ce2-30ac-4272-a6ca-424e23d913b1/0bb3c63d-b705-41c9-a506-37bfff324294.png'} alt='SETU Logo' className='w-10 h-10' />
                    <h3 className = 'text-gray-700 font-bold text-3xl m-0'>Peer Tutoring</h3>
                </div>


            </Link>
                <div className = 'flex box-border md:gap-4 gap-2 justify-center items-center'>
                    <Link to={'/signUp'} className = 'md:px-4 md:py-2 box-border text-black rounded-3xl text-xl hover:bg-gray-200 cursor-pointer'>Join now</Link>
                    <Link to={'/login'} className = 'px-4 py-2 box-border border-1 text-blue-800 border-blue-800 rounded-xl hover:bg-blue-50 cursor-pointer'>Sign in</Link>
                </div>




        </nav >
    )
}

export default Navbar1