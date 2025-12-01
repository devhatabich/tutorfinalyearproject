import React from 'react';
import ImageIcon from '@mui/icons-material/Image';
function AddModal(props) {
    return (
        <div className = ''>
            <div className = 'flex gap-4 items-center'>
                <div className = 'relative'>
                    <img src = 'https://d7hftxdivxxvm.cloudfront.net/?quality=80&resize_to=width&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2F2RNK1P0BYVrSCZEy_Sd1Ew%252F3417757448_4a6bdf36ce_o.jpg&width=910' className = 'w-15 h-15 rounded-full' alt="Img" />
                </div>
                <div className = 'text-2xl'>Test User</div>
            </div>

            <div>
                <textarea id="comment" cols={25} rows={5} placeholder='What do you want to talk about?' className = 'resize-none h-20 my-3 outline-0 text-xl p-2'></textarea>
            </div>

            {/*<div>*/}
            {/*    <img className = 'w-20 h-20 rounded-xl' src='https://ubuntucommunity.s3.us-east-2.amazonaws.com/original/2X/0/0921cb27d5604b464218a64ae88a3f43c7b7371a.png'/>*/}
            {/*</div>*/}

            <div className = 'flex justify-between items-center'>
                <div className = 'my-6'>
                    <label className = 'cursor-pointer' htmlFor='inputFile'><ImageIcon/></label>
                    <input type='file' className = 'hidden' id='inputFile'/>
                </div>
                <div className = 'bg-blue-950 text-white py-1 px-3 cursor-pointer rounded-2xl h-fit'>Post</div>
            </div>
        </div>
    );
}

export default AddModal;