import React from 'react';

function ImageModal({isCircular}) {
    return (
        <div className = ''>
            {/*{isCircular ? "Circular Image" : "Cover Image"}*/}
            <div className = 'p-5 relative flex items-center flex-col h-full'>
                {
                    isCircular ? (
                        <img className = 'rounded-full w-[150px] h-[150px]' src='https://png.pngtree.com/thumb_back/fh260/background/20210207/pngtree-simple-solid-color-on-gray-background-image_557017.jpg'/>
                    ): (
                        <img className = 'rounded-xl w-full h-[200px] object-cover' src='https://images.pexels.com/photos/3377405/pexels-photo-3377405.jpeg?cs=srgb&dl=pexels-elina-araja-1743227-3377405.jpg&fm=jpg'/>
                    )
                }

                <label htmlFor = 'btn-submit' className = 'absolute bottom-10 left-0 p-3 bg-blue-900 text-white rounded-2xl cursor-pointer'>Upload</label>
                <input type='file' className = 'hidden' id='btn-submit'/>

                <div className = 'right-0 absolute bottom-10 left-0 p-3 bg-blue-900 text-white rounded-2xl cursor-pointer'>Submit</div>
            </div>

        </div>
    );
}

export default ImageModal;