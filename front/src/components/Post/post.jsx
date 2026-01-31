import React from 'react';
import Card from "../Card/card.jsx";
import {useState} from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import NotesIcon from '@mui/icons-material/Notes';
import SendIcon from '@mui/icons-material/Send';
function Post({profile}) {
    const [seeMore, setSeeMore] = useState(true);
    const [comment, setComment] = useState(false);
    const handleSendComment = (e) =>{
        e.preventDefault();
    }
    const desc = `ueyeyeyeyey chicha pichi kuchi michi! im so glad to be here before release`
    return (
        <Card padding={0}>
            <div className = 'flex gap-3 p-4'>
                <div className = 'w-12 h-12 rounded-4xl'>
                    <img src = 'https://d7hftxdivxxvm.cloudfront.net/?quality=80&resize_to=width&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2F2RNK1P0BYVrSCZEy_Sd1Ew%252F3417757448_4a6bdf36ce_o.jpg&width=910' className = 'rounded-4xl w-12 h-12 border-white cursor-pointer'/>
                </div>
                <div>
                    <div className = 'text-lg font-semibold text-gray-700'>Another User</div>
                    <div className = 'text xs text-gray-500'>Waterford</div>
                </div>
            </div>

            <div className = 'text-md p-4 my-3 whitespace-pre-line flex-grow text-black'>
                {seeMore?desc:`${desc.slice(0,25)}`} <span onClick ={()=>setSeeMore(prev=>!prev)} className = 'cursor-pointer text-gray-500'>{seeMore?"See Less":'See More'}</span>
            </div>

            <div className = 'w-[100%] h-[300px]'>
                <img className = 'w-full h-full' src='https://ubuntucommunity.s3.us-east-2.amazonaws.com/original/2X/0/0921cb27d5604b464218a64ae88a3f43c7b7371a.png'/>

            </div>

            <div className = 'my-2 p-4 flex justify-between items-center'>
                <div className = 'flex gap-1 items-center'>
                    <FavoriteIcon sx={{color: 'red', fontSize:12}}/><div className ='text-sm text-gray-600'>0 Likes</div>
                </div>
                <div className = 'flex gap-1 items-center'>
                    <div className = 'text-sm text-gray-600'>0 Comments</div>
                </div>
                {/*<FavoriteIcon />*/}
            </div>

            {
                !profile &&  <div className = 'flex p-1'>
                    <div className = 'w-[33%] justify-center flex gap-2 items-center border-r-1 border-gray-300 p-2 cursor-pointer hover:bg-gray-100'>
                        <FavoriteBorderIcon sx={{color:"black", fontSize:22}}/><span className='text-gray-600'>Like</span>
                    </div>
                    <div onClick = {()=>setComment(true)} className = 'w-[33%] justify-center flex gap-2 items-center border-r-1 border-gray-300 p-2 cursor-pointer hover:bg-gray-100'>
                        <NotesIcon sx={{color:"black",fontSize:22}}/><span className='text-gray-600'>Comment</span>
                    </div>
                    <div className = 'w-[33%] justify-center flex gap-2 items-center border-r-1 border-gray-300 p-2 cursor-pointer hover:bg-gray-100'>
                        <SendIcon sx={{color:"black",fontSize:22}}/><span className='text-gray-600'>Forward</span>
                    </div>

                </div>
            }

            {
                comment && <div className = 'p-4 w-full'>
                    <div className = 'flex gap-2 items-center'>
                        <img src='https://d7hftxdivxxvm.cloudfront.net/?quality=80&resize_to=width&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2F2RNK1P0BYVrSCZEy_Sd1Ew%252F3417757448_4a6bdf36ce_o.jpg&width=910'  className = 'rounded-full w-12 h-12 border-2 border-white cursor-pointer' />

                        <form className = 'w-full flex gap-2' onSubmit = {handleSendComment}>
                            <input placeholder = 'Add a comment...' className = 'text-gray-500 w-full border-1 py-3 px-5 rounded-3xl hover:bg-gray-100' />
                            <button type='submit' className = 'cursor-pointer bg-blue-800 text-white rounded-3xl py-1 px-3'>Send</button>
                        </form>
                    </div>

                    {/*other section*/}
                    <div className = 'w-full py-4'>
                        <div className = 'my-4'>
                            <div className = 'flex gap-3'>
                                <img src='https://d7hftxdivxxvm.cloudfront.net/?quality=80&resize_to=width&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2F2RNK1P0BYVrSCZEy_Sd1Ew%252F3417757448_4a6bdf36ce_o.jpg&width=910'  className = 'rounded-full w-10 h-10 border-2 border-white cursor-pointer' />

                                <div className = 'cursor-pointer'>
                                    <div className='text-md text-gray-700 font-semibold '>User</div>
                                    <div className='text-sm text-gray-500'>Waterford</div>

                                </div>
                            </div>
                            <div className = 'my-2 px-11 text-black'>Can't wait for release ❤️</div>

                        </div>



                    </div>



                </div>
            }

            {/*Comment Secton*/}
            {/*<div className = 'p-4 w-full'>*/}
            {/*    <div className = 'flex gap-2 items-center'>*/}
            {/*        <img src='https://d7hftxdivxxvm.cloudfront.net/?quality=80&resize_to=width&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2F2RNK1P0BYVrSCZEy_Sd1Ew%252F3417757448_4a6bdf36ce_o.jpg&width=910'  className = 'rounded-full w-12 h-12 border-2 border-white cursor-pointer' />*/}

            {/*        <form className = 'w-full flex gap-2' onSubmit = {handleSendComment}>*/}
            {/*            <input placeholder = 'ImageModal a comment...' className = 'w-full border-1 py-3 px-5 rounded-3xl hover:bg-gray-100' />*/}
            {/*            <button type='submit' className = 'cursor-pointer bg-blue-800 text-white rounded-3xl py-1 px-3'>Send</button>*/}
            {/*        </form>*/}
            {/*    </div>*/}

            {/*    /!*other section*!/*/}
            {/*    <div className = 'w-full py-4'>*/}
            {/*        <div className = 'my-4'>*/}
            {/*            <div className = 'flex gap-3'>*/}
            {/*                <img src='https://d7hftxdivxxvm.cloudfront.net/?quality=80&resize_to=width&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2F2RNK1P0BYVrSCZEy_Sd1Ew%252F3417757448_4a6bdf36ce_o.jpg&width=910'  className = 'rounded-full w-10 h-10 border-2 border-white cursor-pointer' />*/}

            {/*                <div className = 'cursor-pointer'>*/}
            {/*                    <div className='text-md'>User</div>*/}
            {/*                    <div className='text-sm text-gray-500'>Waterford</div>*/}

            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div className = 'my-2 px-11'>Can't wait for release ❤️</div>*/}

            {/*        </div>*/}



            {/*    </div>*/}



            {/*</div>*/}

        </Card>
    );
}

export default Post;