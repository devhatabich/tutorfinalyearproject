import React from 'react';
import Card from "../Card/card.jsx";

function Advertisement(props) {
    return (
        <div className = 'sticky top-18'>
            <Card padding={0}>
                <div className = 'mb-8 h-25'>
                    <div className = 'relative w-full h-22 rounded-md'>
                        <img src='https://upload.wikimedia.org/wikipedia/en/9/9d/Bonzi_Buddy.png' className = 'rounded-t-md h-full w-full' />
                    </div>
                    <div className = 'flex justify-self-center m-0 z-10'>
                        <img src = 'https://d7hftxdivxxvm.cloudfront.net/?quality=80&resize_to=width&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2F2RNK1P0BYVrSCZEy_Sd1Ew%252F3417757448_4a6bdf36ce_o.jpg&width=910' className = 'rounded-full border-2 h-16 w-16 border-white cursor-pointer'/>
                    </div>
                </div>

                <div className = 'px-5 my-5 mx-auto text-gray-700'>
                    <div className = 'text-base font-semibold text-center'>Test User</div>
                    <div className = 'text-sm my-3 text-center'>Latest Posts</div>
                    <div className = 'text-sm my-1 text-center p-2 rounded-2xl font-bold border-blue-950 text-white bg-blue-800 cursor-point'>Explore</div>
                </div>
            </Card>

        </div>
    );
}

export default Advertisement;