import React, { useState } from 'react'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const MessageModal = ({ selfData, userData }) => {
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);

    const handleSendMessage = async () => {
        if (!message.trim()) return toast.error('Please enter a message.');
        setSending(true);
        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/conversation/add-conversation`,
                { recieverId: userData?._id, message },
                { withCredentials: true }
            );
            window.location.reload();
        } catch (err) {
            toast.error(err?.response?.data?.error || 'Something went wrong');
        } finally {
            setSending(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className='px-5 py-4'>
            <div className='w-full mb-4'>
                <label className='text-sm font-medium text-gray-700 block mb-1'>
                    Message to <span style={{ color: '#435465' }}>{userData?.f_name}</span>
                </label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={5}
                    className='w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gray-400 transition-colors resize-none'
                    placeholder='Write your message… (Enter to send)'
                />
            </div>
            <button
                onClick={handleSendMessage}
                disabled={!message.trim() || sending}
                className='w-full py-2.5 rounded-lg text-sm font-semibold text-white cursor-pointer transition-opacity hover:opacity-90 mt-1 up-btn-glow  disabled:opacity-40 disabled:cursor-not-allowed'
                style={{ backgroundColor: '#435465' }}
            >
                {sending ? 'Sending…' : 'Send Message'}
            </button>
            <ToastContainer />
        </div>
    );
};

export default MessageModal;
