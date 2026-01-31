import React from 'react'

const Footer = () => {
    return (
        <div className='w-[100%] bg-gray-200 flex justify-center mt-36.25'>
            <div className='md:p-3 w-[100%] flex flex-col items-center py-4'>
                <div className='flex gap-3 items-center cursor-pointer'>
                    <h3 className = 'text-gray-700 font-bold text-xl'>Peer Tutoring</h3>
                    <img src={'https://showcase.setu.ie/C00259849/setuLogo.png'} alt='SETU Logo' className='w-12 h-12'/>
                </div>
                <div className={'text-sm text-black'}>@Copyright 2025</div>
            </div>
        </div>
    )
}
export default Footer