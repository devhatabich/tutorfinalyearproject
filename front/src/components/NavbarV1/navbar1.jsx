import React from 'react'
import { Link } from 'react-router-dom'
const Navbar1 = () => {
    return (
        <nav className='w-[100%] bg-gray-100 md:px-[100px] px-[20px] flex justify-between py-4 box-border'>
            <Link to={'/'} className=" flex justify-between">
                <div className="flex gap-1 items-center cursor-pointer">
                    <h3 className="text-gray-700 font-bold text-3xl">TutorMe</h3>
                    <img src={'https://showcase.setu.ie/C00259849/setuLogo.png'} alt="SETU logo" className='w-7 h-7' />
                </div>
            </Link>

            <div className="flex box-border md:gap-4 gap-2 justify-center items-center">
                <Link to={'/signUp'} className="md:px-4 md:py-2 box-border text-black rounded-3xl text-xl hover:bg-gray-200 cursor-pointer">Join now</Link>
                <Link to={'/login'} className="px-4 py-2 box-border border-1 text-gray-700 border-gray-700 rounded-3xl text-xl hover:bg-gray-200 cursor-pointer">Sign in</Link>
            </div>
        </nav>
    )
}

export default Navbar1