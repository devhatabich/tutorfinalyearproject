import React, { useState, useRef } from 'react'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import CloseIcon from '@mui/icons-material/Close';
import PublicIcon from '@mui/icons-material/Public';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Avatar from '../Avatar/avatar';
import { uploadImage } from '../../utils/uploadImage';

const MAX_CHARS = 3000;

const TYPES = [
    { id: 'post',  label: 'Post',  icon: <ArticleOutlinedIcon sx={{ fontSize: 18 }} /> },
    { id: 'photo', label: 'Photo', icon: <ImageOutlinedIcon sx={{ fontSize: 18 }} /> },
    { id: 'video', label: 'Video', icon: <VideoCallOutlinedIcon sx={{ fontSize: 18 }} /> },
];

const AddModal = ({ personalData, defaultType = 'post' }) => {
    const [activeType, setActiveType] = useState(defaultType);
    const [desc, setDesc] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const [videoUrl, setVideoUrl] = useState('');
    const [imageUploading, setImageUploading] = useState(false);
    const [posting, setPosting] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef();

    const charsLeft = MAX_CHARS - desc.length;
    const isEmpty = desc.trim().length === 0 && !imageUrl && !videoUrl.trim();

    const handlePost = async () => {
        if (isEmpty) return toast.error('Please write something or add media.');
        if (desc.length > MAX_CHARS) return toast.error(`Text exceeds ${MAX_CHARS} characters.`);
        setPosting(true);
        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/post`,
                { desc, imageLink: imageUrl || videoUrl || undefined },
                { withCredentials: true }
            );
            window.location.reload();
        } catch (err) {
            toast.error(err?.response?.data?.error || 'Something went wrong');
        } finally {
            setPosting(false);
        }
    };

    const handleUploadFile = async (file) => {
        if (!file) return;
        if (!file.type.startsWith('image/')) return toast.error('Please upload an image file.');
        setImageUploading(true);
        try {
            const url = await uploadImage(file);
            setImageUrl(url);
            setActiveType('photo');
        } catch (err) {
            toast.error(err.message || 'Image upload failed.');
        } finally {
            setImageUploading(false);
        }
    };

    const handleFileInput = (e) => handleUploadFile(e.target.files?.[0]);

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        handleUploadFile(e.dataTransfer.files?.[0]);
    };

    const handleTypeClick = (typeId) => {
        setActiveType(typeId);
        if (typeId === 'photo') fileInputRef.current?.click();
    };

    return (
        <div className='flex flex-col'>
            {/* Author row */}
            <div className='flex items-center gap-3 px-5 pt-4 pb-3'>
                <Avatar src={personalData?.profilePic} name={personalData?.f_name} size="md" className='w-11 h-11 border border-gray-200 shrink-0' />
                <div className='min-w-0'>
                    <div className='font-semibold text-gray-900 text-sm truncate'>{personalData?.f_name}</div>
                    <div className='flex items-center gap-1 mt-0.5 px-2 py-0.5 border border-gray-300 rounded-full w-fit cursor-pointer hover:bg-gray-50 transition-colors'>
                        <PublicIcon sx={{ fontSize: 12, color: '#6b7280' }} />
                        <span className='text-xs text-gray-500 font-medium'>Everyone</span>
                    </div>
                </div>
            </div>

            {/* Textarea to prevent overflow */}
            <div className='px-5 w-full min-w-0'>
                <textarea
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder={
                        activeType === 'video' ? 'Share a video link and describe it...' :
                        activeType === 'photo' ? 'Add a caption for your photo...' :
                                                 'What do you want to talk about?'
                    }
                    rows={5}
                    maxLength={MAX_CHARS}
                    className='w-full resize-none outline-none text-gray-800 text-sm leading-relaxed placeholder-gray-400 block'
                    style={{ fontFamily: 'inherit', boxSizing: 'border-box' }}
                    autoFocus
                />
                <div className={`text-right text-xs mb-2 ${charsLeft < 100 ? 'text-red-500' : 'text-gray-300'}`}>
                    {charsLeft < MAX_CHARS ? `${charsLeft} remaining` : ''}
                </div>
            </div>

            {/* Video URL input */}
            {activeType === 'video' && (
                <div className='px-5 mb-3 w-full min-w-0'>
                    <input
                        type='url'
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        placeholder='Paste a video URL (YouTube, etc.)'
                        className='w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gray-400 transition-colors block'
                        style={{ boxSizing: 'border-box' }}
                    />
                </div>
            )}

            {/* Upload zone */}
            {activeType === 'photo' && !imageUrl && (
                <div
                    className={`mx-5 mb-3 border-2 border-dashed rounded-xl p-6 flex flex-col items-center gap-2 cursor-pointer transition-colors ${dragOver ? 'border-[#435465] bg-[#f0f7f4]' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                >
                    {imageUploading ? (
                        <>
                            <div className='w-8 h-8 border-2 border-gray-300 border-t-[#435465] rounded-full animate-spin' />
                            <span className='text-sm text-gray-400'>Uploading…</span>
                        </>
                    ) : (
                        <>
                            <CloudUploadOutlinedIcon sx={{ fontSize: 32, color: '#9ca3af' }} />
                            <span className='text-sm font-medium text-gray-500'>Drag & drop or <span style={{ color: '#435465' }}>browse</span></span>
                            <span className='text-xs text-gray-400'>JPG, PNG, GIF up to 10 MB</span>
                        </>
                    )}
                </div>
            )}

            {/* Image preview */}
            {imageUrl && (
                <div className='mx-5 mb-3 relative rounded-xl overflow-hidden border border-gray-200'>
                    <img src={imageUrl} className='w-full max-h-64 object-cover' alt="Preview"
                        onError={e => { e.target.style.display = 'none'; }} />
                    <button
                        onClick={() => { setImageUrl(null); setActiveType('post'); }}
                        className='absolute top-2 right-2 w-7 h-7 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer'
                    >
                        <CloseIcon sx={{ fontSize: 14 }} />
                    </button>
                </div>
            )}

            <input ref={fileInputRef} type='file' accept='image/*' className='hidden' onChange={handleFileInput} />

            {/* Footer*/}
            <div className='px-5 py-3 border-t border-gray-100 flex items-center justify-between gap-3'>
                <div className='flex gap-1 flex-wrap'>
                    {TYPES.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => handleTypeClick(t.id)}
                            title={t.label}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                                activeType === t.id ? 'text-white' : 'text-gray-500 hover:bg-gray-100'
                            }`}
                            style={activeType === t.id ? { backgroundColor: '#435465' } : {}}
                        >
                            {t.icon} {t.label}
                        </button>
                    ))}
                </div>

                <button
                    onClick={handlePost}
                    disabled={isEmpty || posting || imageUploading}
                    className='px-5 py-2 rounded-full text-sm font-semibold text-white transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0'
                    style={{ backgroundColor: '#435465' }}
                >
                    {posting ? 'Posting…' : 'Post'}
                </button>
            </div>

            <ToastContainer />
        </div>
    );
};

export default AddModal;
