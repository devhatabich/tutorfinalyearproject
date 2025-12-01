import React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Card from "../../components/Card/card.jsx";
import Conversation from "../../components/Conversation/conversation.jsx";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ImageIcon from '@mui/icons-material/Image';
import Advertisement from "../../components/Advertisement/advertisement.jsx";
function Messages(props) {
    return (
        <div className='px-5 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100'>
            <div className='w-full justify-between flex pt-5'>
                <div className='w-full md:w-[70%]'>
                    <Card padding={0}>
                        <div className='border-b-1 border-gray-300 px-5 py-2 font-semibold text-lg'>
                            Chat
                        </div>

                        <div className='border-b-1 border-gray-300 px-5 py-2'>
                            <div
                                className='py-1 px-3 cursor-pointer hover:bg-green-900 bg-green-800 font-semibold flex gap-2 w-fit rounded-2xl text-white'>Focused<ArrowDropDownIcon/>
                            </div>
                        </div>

                        <div className='w-full md:flex'>
                            <div className='h-[590px] oveflow-auto w-full md:w-[40%] border-r-1 border-gray-400'>
                                <Conversation/>
                            </div>
                            <div className='w-full md:w-[60%] border-gray-400'>
                                <div className='border-gray-300 py-2 px-4 border-b-2 flex justify-between items-center'>
                                    <div>
                                        <p className='text-sm font-semibold'>User 1</p>
                                        <p className='text-sm text-gray-400'>Waterford</p>
                                    </div>
                                    <div>
                                        <MoreHorizIcon/>
                                    </div>
                                </div>
                                <div className='h-[360px] w-full overflow-auto border-b-1 border-gray-300'>
                                    <div className='w-full border-b-1 border-gray-300 gap-3 p-4'>
                                        <img className='rounded-[100%] cursor-pointer w-16 h-15'
                                             src={'https://i.redd.it/pdylcq4xq0i41.jpg'}/>
                                        <div className='my-2'>
                                            <div className='text-md'>User 1</div>
                                            <div className='text-sm text-gray-500'>Carlow</div>
                                        </div>
                                    </div>
                                    <div className='w-full'>
                                        <div className='flex w-full cursor-pointer border-gray-300 gap-3 p-4'>
                                            <div className='shrink-0'>
                                                <img className='w-8 h-8 rounded-[100%] cursor-pointer'
                                                     src={'https://i.redd.it/pdylcq4xq0i41.jpg'}/>
                                            </div>
                                            <div className='mb-2 w-full'>
                                                <div className='text-md'>User 1</div>
                                                <div className='text-sm mt-6 hover:bg-gray-200'>Text Message</div>
                                                <div className='my-2'><img className='w-[240px] h-[180px] rounded-md'
                                                                           src={'https://preview.redd.it/the-fact-that-this-meme-is-more-popular-than-joe-himself-is-v0-ghph5qilg0ke1.jpeg?width=828&auto=webp&s=f7da81dbcb702cc2b2637b2de20119390b3df168'}/>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className='flex w-full cursor-pointer border-gray-300 gap-3 p-4'>
                                        <div className='shrink-0'>
                                            <img className='w-8 h-8 rounded-[100%] cursor-pointer'
                                                 src={'https://i.redd.it/pdylcq4xq0i41.jpg'}/>
                                        </div>
                                        <div className='mb-2 w-full'>
                                            <div className='text-md'>User 1</div>
                                            <div className='text-sm mt-6 hover:bg-gray-200'>Text Message</div>
                                            <div className='my-2'><img className='w-[240px] h-[180px] rounded-md'
                                                                       src={'https://preview.redd.it/the-fact-that-this-meme-is-more-popular-than-joe-himself-is-v0-ghph5qilg0ke1.jpeg?width=828&auto=webp&s=f7da81dbcb702cc2b2637b2de20119390b3df168'}/>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                                <div className='p-2 w-full border-b-1 border-gray-200  '>
                                    <div>
                                        <textarea rows={4}
                                                  className='bg-gray-200 outline-0 rounded-xl text-sm w-full p-3'
                                                  placeholder='Write a message'></textarea>
                                    </div>

                                    <div className='p-3 flex justify-between'>
                                        <div>
                                            <label htmlFor={'messageImage'}
                                                   className='cursor-pointer'><ImageIcon/></label>
                                            <input id='messageImage' type='file' className='hidden'/>
                                        </div>
                                        <div
                                            className='cursor-pointer px-3 py-1 rounded-2xl border-1 bg-blue-950 text-white'>
                                            Send
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </Card>

                </div>
                <div className = 'hidden md:flex md:w-[25%]'>
                    <div className = 'sticky top-19'>
                        <Advertisement/>
                    </div>

                </div>
            </div>
        </div>
    );

}


export default Messages;