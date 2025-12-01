import React from 'react';
import Card from "../Card/card.jsx";

function ProfileCard(props) {
    return (
        <Card padding={0}>
            <div className = 'relative h-25'>
                <div className = 'relative w-full h-22 rounded-md'>
                    <img src='https://upload.wikimedia.org/wikipedia/en/9/9d/Bonzi_Buddy.png' className = 'rounded-t-md h-full w-full' />
                </div>
                <div className = 'absolute top-14 left-6 z-10'>
                    <img src = 'https://d7hftxdivxxvm.cloudfront.net/?quality=80&resize_to=width&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2F2RNK1P0BYVrSCZEy_Sd1Ew%252F3417757448_4a6bdf36ce_o.jpg&width=910' className = 'rounded-full border-2 h-16 w-16 border-white cursor-pointer'/>
                </div>
            </div>
            <div className = 'p-5 text-gray-700'>
                <div className = 'text-xl font-bold'>Test User</div>
                <div className = 'text-sm my-1'>Year 1</div>
                <div className = 'text-sm my-1'>Cyber Security (Honours)</div>
                <div className = 'text-sm my-1'>Carlow</div>

            </div>
        </Card>
    );
}

export default ProfileCard;