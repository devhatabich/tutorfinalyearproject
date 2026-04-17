import React, { useState } from 'react'

const inputCls = 'w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gray-400 transition-colors';

const ExpModal = ({ handleEditFunc, selfData, updateExp }) => {
    const [data, setData] = useState({
        designation: updateExp?.clicked ? updateExp?.data?.designation : '',
        company_name: updateExp?.clicked ? updateExp?.data?.company_name : '',
        duration: updateExp?.clicked ? updateExp?.data?.duration : '',
        location: updateExp?.clicked ? updateExp?.data?.location : '',
    });

    const onChange = (key) => (e) => setData(prev => ({ ...prev, [key]: e.target.value }));

    const updateExpSave = () => {
        const newFilteredData = selfData?.experience.filter(item => item._id !== updateExp?.data?._id);
        handleEditFunc({ ...selfData, experience: [...newFilteredData, data] });
    };

    const handleOnSave = () => {
        if (updateExp?.clicked) return updateExpSave();
        handleEditFunc({ ...selfData, experience: [...(selfData?.experience || []), data] });
    };

    const handleOnDelete = () => {
        const newFilteredData = selfData?.experience.filter(item => item._id !== updateExp?.data?._id);
        handleEditFunc({ ...selfData, experience: newFilteredData });
    };

    const field = (label, key, placeholder) => (
        <div className='w-full mb-4'>
            <label className='text-sm font-medium text-gray-700 block mb-1'>{label}</label>
            <input
                type='text'
                value={data[key]}
                onChange={onChange(key)}
                className={inputCls}
                placeholder={placeholder}
            />
        </div>
    );

    return (
        <div className='px-5 py-4 overflow-y-auto'>
            {field('Degree Title', 'designation', 'e.g. Software Development')}
            {field('University Name', 'company_name', 'e.g. SETU')}
            {field('Duration', 'duration', 'e.g. 2020 – 2024')}
            {field('University Campus Location', 'location', 'e.g. Carlow, Carlow')}

            <div className='flex gap-3 mt-2'>
                <button
                    onClick={handleOnSave}
                    className='flex-1 py-2.5 rounded-lg text-sm font-semibold text-white cursor-pointer hover:opacity-90 transition-opacity'
                    style={{ backgroundColor: '#435465' }}
                >
                    {updateExp?.clicked ? 'Update' : 'Add'}
                </button>
                {updateExp?.clicked && (
                    <button
                        onClick={handleOnDelete}
                        className='px-5 py-2.5 rounded-lg text-sm font-semibold text-white cursor-pointer hover:opacity-90 transition-opacity bg-red-600'
                    >
                        Delete
                    </button>
                )}
            </div>
        </div>
    );
};

export default ExpModal;
