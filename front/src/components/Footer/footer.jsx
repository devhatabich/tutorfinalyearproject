import React from 'react'

const Footer = () => {
    return (
        <div className="w-[100%] bg-gray-200 flex justify-center ">
            <div className="md:p-3 w-[100%] flex flex-col items-center py-4">
                <div className="flex gap-1 items-center cursor-pointer">
                    <h3 className="text-gray-700 font-bold text-xl">TutorMe</h3>
                    <img src={'https://showcase.setu.ie/C00259849/setuLogo.png'} alt="setu logo" className='w-6 h-6' />
                </div>
                <div className="text-sm">@Copyright 2026</div>
            </div>
        </div>

    )//text-blue-800 font-bold text-xl
}

export default Footer