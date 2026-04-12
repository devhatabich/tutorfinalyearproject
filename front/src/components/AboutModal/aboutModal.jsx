import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify';

const inputCls = 'w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gray-400 transition-colors';

const AboutModal = ({ handleEditFunc, selfData }) => {
    const [data, setData] = useState({
        about: selfData?.about || '',
        skillInp: selfData?.skills?.join(', ') || '',
    });

    const onChange = (key) => (e) => setData(prev => ({ ...prev, [key]: e.target.value }));

    const handleSave = () => {
        const skills = data.skillInp.split(',').map(s => s.trim()).filter(Boolean);
        handleEditFunc({ ...selfData, about: data.about, skills });
    };

    return (
        <div className='px-5 py-4 overflow-y-auto'>
            <div className='w-full mb-4'>
                <label className='text-sm font-medium text-gray-700 block mb-1'>About</label>
                <textarea value={data.about} onChange={onChange('about')} rows={4} className={`${inputCls} resize-none`} placeholder='Write something about yourself…' />
            </div>

            <div className='w-full mb-4'>
                <label className='text-sm font-medium text-gray-700 block mb-1'>Skills <span className='text-gray-400 font-normal'>(comma separated)</span></label>
                <textarea value={data.skillInp} onChange={onChange('skillInp')} rows={3} className={`${inputCls} resize-none`} placeholder='e.g. React, Node.js, Design' />
            </div>

            <button
                onClick={handleSave}
                className='w-full py-2.5 rounded-lg text-sm font-semibold text-white cursor-pointer transition-opacity hover:opacity-90 mt-1 up-btn-glow'
                style={{ backgroundColor: '#435465' }}
            >
                Save changes
            </button>
            <ToastContainer />
        </div>
    );
};

export default AboutModal;
