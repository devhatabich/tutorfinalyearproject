import React, { useState } from 'react'

const field = (label, input) => (
    <div className='w-full mb-4'>
        <label className='text-sm font-medium text-gray-700 block mb-1'>{label}</label>
        {input}
    </div>
);

const inputCls = 'w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gray-400 transition-colors';

const EditinfoModal = ({ handleEditFunc, selfData }) => {
    const [data, setData] = useState({
        f_name: selfData?.f_name || '',
        headline: selfData?.headline || '',
        curr_company: selfData?.curr_company || '',
        curr_location: selfData?.curr_location || '',
        linkedinConnected: selfData?.linkedinConnected || false,
        twitterConnected: selfData?.twitterConnected || false,
    });

    const onChange = (key) => (e) => setData(prev => ({ ...prev, [key]: e.target.value }));

    const handleSave = () => {
        handleEditFunc({ ...selfData, ...data });
    };

    return (
        <div className='px-5 py-4 overflow-y-auto'>
            {field('Full Name', <input value={data.f_name} onChange={onChange('f_name')} type='text' className={inputCls} placeholder='Enter full name' />)}
            {field('Headline', <textarea value={data.headline} onChange={onChange('headline')} rows={3} className={`${inputCls} resize-none`} placeholder='Programme Name' />)}
            {field('Current Company', <input value={data.curr_company} onChange={onChange('curr_company')} type='text' className={inputCls} placeholder='University name' />)}
            {field('Current Location', <input value={data.curr_location} onChange={onChange('curr_location')} type='text' className={inputCls} placeholder='Town, County' />)}

            <div className='mb-4'>
                <p className='text-sm font-medium text-gray-700 mb-2'>Social Accounts</p>
                <div className='flex flex-col gap-2'>
                    <div className='flex items-center justify-between px-3 py-2.5 rounded-lg border border-gray-200'>
                        <div className='flex items-center gap-2'>
                            <span className='w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-white' style={{ backgroundColor: '#0A66C2' }}>in</span>
                            <span className='text-sm text-gray-700'>LinkedIn</span>
                        </div>
                        {data.linkedinConnected ? (
                            <button
                                type='button'
                                onClick={() => setData(p => ({ ...p, linkedinConnected: false }))}
                                className='text-xs text-red-500 hover:text-red-700 cursor-pointer font-medium'
                            >
                                Disconnect
                            </button>
                        ) : (
                            <span className='text-xs text-gray-400'>Not connected</span>
                        )}
                    </div>
                    <div className='flex items-center justify-between px-3 py-2.5 rounded-lg border border-gray-200'>
                        <div className='flex items-center gap-2'>
                            <span className='w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-white' style={{ backgroundColor: '#1DA1F2' }}>tw</span>
                            <span className='text-sm text-gray-700'>Twitter</span>
                        </div>
                        {data.twitterConnected ? (
                            <button
                                type='button'
                                onClick={() => setData(p => ({ ...p, twitterConnected: false }))}
                                className='text-xs text-red-500 hover:text-red-700 cursor-pointer font-medium'
                            >
                                Disconnect
                            </button>
                        ) : (
                            <span className='text-xs text-gray-400'>Not connected</span>
                        )}
                    </div>
                </div>
            </div>

            <button
                onClick={handleSave}
                className='w-full py-2.5 rounded-lg text-sm font-semibold text-white mt-2 cursor-pointer transition-opacity hover:opacity-90 up-btn-glow'
                style={{ backgroundColor: '#435465' }}
            >
                Save changes
            </button>
        </div>
    );
};

export default EditinfoModal;
