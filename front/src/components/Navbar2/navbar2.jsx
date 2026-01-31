import React, {useState} from 'react';
import './navbar2.css'
import HomeIcon from '@mui/icons-material/Home';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import ArticleIcon from '@mui/icons-material/Article';
import AppsIcon from '@mui/icons-material/Apps';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import {Link, useLocation} from 'react-router-dom';
function Navbar2() {
    const [dropDown, setDropDown] = useState(false);
    const location = useLocation();
    return (
        <div className='bg-white h-13 flex justify-between py-1 px-5 xl:px-50 fixed top-0 w-[100%] z-1000'>
            <div className='flex gap-2 items-center'>
                <Link to={'/feeds'} className='flex'>
                    <img className='w-13 h-13 shrink-0'
                         src={'https://consent.cookiefirst.com/branding/62607ce2-30ac-4272-a6ca-424e23d913b1/0bb3c63d-b705-41c9-a506-37bfff324294.png'}
                         alt="logo"/>
                </Link>
                <div className='relative'>
                    <input className='searchInput w-70 bg-gray-100 rounded-sm h-10 px-4 text-black mr-2'
                           placeholder='Search'/>
                    {
                        dropDown && <div className='absolute w-88 left-0 bg-gray-200'>
                            <div className='flex gap-2 items-center mb-1 cursor-pointer'>
                                <div><img src={'https://www.farmersjournal.ie/WEBFILES/000/710/256/1861240-710256.jpg'}
                                          className='w-10 h-10 rounded-full'/></div>
                                <div>Student1</div>
                            </div>
                        </div>
                    }
                </div>

            </div>

            <div className='hidden gap-10 md:flex'>

                <Link to={'/feeds'} className='flex flex-col items-center cursor-pointer'>
                    <HomeIcon sx={{color: location.pathname === '/feeds' ? "black" : "gray"}}/>
                    <div className={`text-sm text-gray-500 ${location.pathname === '/feeds' ? "border-b-3" : ""}`}>
                        Home
                    </div>
                </Link>

                <Link to={'/myNetwork'} className='flex flex-col items-center cursor-pointer'>
                    <Diversity3Icon sx={{color: location.pathname === '/myNetwork' ? "black" : "gray"}}/>
                    <div className={`text-sm text-gray-500 ${location.pathname === '/myNetwork' ? "border-b-3" : ""}`}>

                        Peers
                    </div>
                </Link>

                <Link to={'/resume'} className='flex flex-col items-center cursor-pointer'>
                    <ArticleIcon sx={{color: location.pathname === '/resume' ? "black" : "gray"}}/>
                    <div className={`text-sm text-gray-500 ${location.pathname === '/resume' ? "border-b-3" : ""}`}>

                        Post
                    </div>
                </Link>

                {/*<div className='flex flex-col items-center cursor-pointer'>*/}
                {/*    <AppsIcon sx={{color: location.pathname === '/posts ' ? "black" : "gray"}}/>*/}
                {/*    <div className={`text-sm text-gray-500 ${location.pathname === '/posts' ? "border-b-3" : ""}`}>*/}

                {/*        Others*/}
                {/*    </div>*/}
                {/*</div>*/}

                <Link to={'/messages'}  className='flex flex-col items-center cursor-pointer'>
                    <ChatIcon sx={{color: location.pathname === '/messages' ? "black" : "gray"}}/>
                    <div className={`text-sm text-gray-500 ${location.pathname === '/messages' ? "border-b-3" : ""}`}>
                        Messages
                    </div>
                </Link>

                <Link to={'/notification'} className='flex flex-col items-center cursor-pointer'>
                    <div><NotificationsActiveIcon
                        sx={{color: location.pathname === '/notification' ? "black" : "gray"}}/><span
                        className='p1 text-sm rounded-full bg-red-700 text-white'>1</span></div>
                    <div
                        className={`text-sm text-gray-500 ${location.pathname === '/notification' ? "border-b-3" : ""}`}>
                        Notifications
                    </div>
                </Link>

                <Link to={`/profile/`} className='flex flex-col items-center cursor-pointer'>
                    <img className='w-8 h-8 rounded-full'
                         src={'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg'}/>
                    <div className='text-sm text-gray-500'>
                        Me
                    </div>
                </Link>
            </div>

        </div>
    );
}

export default Navbar2;