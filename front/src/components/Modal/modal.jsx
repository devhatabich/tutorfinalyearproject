import React, { useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close';

const Modal = ({ title, closeModal, children, maxWidth = 'max-w-xl' }) => {

    // Close on Escape key
    useEffect(() => {
        const handleKey = (e) => { if (e.key === 'Escape') closeModal(); };
        document.addEventListener('keydown', handleKey);
        // Prevent body scroll while modal is open
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <div
            className='fixed inset-0 z-50 flex items-center justify-center p-4'
            style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(2px)', animation: 'fadeIn 0.15s ease' }}
            onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
            <div
                className={`w-full ${maxWidth} bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh]`}
                style={{ animation: 'slideUp 0.2s ease' }}
            >
                {/* Header */}
                <div className='flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0'>
                    <span className='font-semibold text-gray-900 text-base'>{title}</span>
                    <button
                        onClick={closeModal}
                        className='w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer text-gray-500'
                    >
                        <CloseIcon sx={{ fontSize: 18 }} />
                    </button>
                </div>

                {/* Scrollable content */}
                <div className='overflow-y-auto flex-1'>
                    {children}
                </div>
            </div>

            <style>{`
                @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
                @keyframes slideUp { from { opacity: 0; transform: translateY(16px) scale(0.98) } to { opacity: 1; transform: translateY(0) scale(1) } }
            `}</style>
        </div>
    );
};

export default Modal;
