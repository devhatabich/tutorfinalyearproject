import React, { useState } from 'react'
import { uploadImage } from '../../utils/uploadImage';
import { toast, ToastContainer } from 'react-toastify';
import Avatar from '../Avatar/avatar';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import defaultBanner from '../../assets/defaultBanner.svg';

const ImageModal = ({ isCircular, selfData, handleEditFunc }) => {
    const OLD_DEFAULT = 'https://images.ctfassets.net/nnkxuzam4k38/1E1b1Wv462zOVykwDznOWq/f360d62d7b4b67a8fe6b77074b535ebb/pure-black-background.jpg';
    const rawCover = selfData?.cover_pic;
    const [imgLink, setImageLink] = useState(isCircular ? selfData?.profilePic : (rawCover && rawCover !== OLD_DEFAULT ? rawCover : null));
    const [loading, setLoading] = useState(false);

    const handleInputImage = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) return toast.error('Please upload an image file.');
        setLoading(true);
        try {
            const url = await uploadImage(file);
            setImageLink(url);
            toast.success('Image uploaded!');
        } catch (err) {
            toast.error(err.message || 'Upload failed');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitBtn = () => {
        if (!imgLink) return toast.error('Please upload an image first.');
        const field = isCircular ? 'profilePic' : 'cover_pic';
        handleEditFunc({ ...selfData, [field]: imgLink });
    };

    return (
        <div className='px-5 py-4 flex flex-col items-center gap-5'>
            {/* Preview */}
            <div className={`overflow-hidden border-2 border-gray-200 shadow-sm ${isCircular ? 'rounded-full w-36 h-36' : 'rounded-xl w-full h-44'}`}>
                {imgLink ? (
                    <img
                        src={imgLink}
                        className='w-full h-full object-cover'
                        alt='Preview'
                        onError={e => { e.target.style.display = 'none'; }}
                    />
                ) : (
                    isCircular ? (
                        <Avatar src={null} name={selfData?.f_name} size='3xl' className='w-full h-full' />
                    ) : (
                        <div className='w-full h-full flex flex-col items-center justify-center gap-2' style={{ backgroundColor: '#000000' }}>
                            <CloudUploadOutlinedIcon sx={{ fontSize: 32, color: 'rgba(255,255,255,0.5)' }} />
                            <span className='text-white text-sm font-medium'>Add a background photo</span>
                            <span className='text-xs' style={{ color: 'rgba(255,255,255,0.45)' }}>Stand out with a banner that represents you</span>
                        </div>
                    )
                )}
            </div>

            {/* Upload button */}
            <label
                htmlFor='imageUploadInput'
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white cursor-pointer hover:opacity-90 transition-opacity ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                style={{ backgroundColor: '#435465' }}
            >
                <CloudUploadOutlinedIcon sx={{ fontSize: 18 }} />
                {loading ? 'Uploading…' : 'Choose Image'}
            </label>
            <input
                onChange={handleInputImage}
                type='file'
                accept='image/*'
                className='hidden'
                id='imageUploadInput'
                disabled={loading}
            />

            {/* Submit */}
            <button
                onClick={handleSubmitBtn}
                disabled={!imgLink || loading}
                className='w-full py-2.5 rounded-lg text-sm font-semibold text-white cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed'
                style={{ backgroundColor: '#435465' }}
            >
                Save
            </button>

            <ToastContainer />
        </div>
    );
};

export default ImageModal;
