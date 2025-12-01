import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar1 from './components/NavbarV1/navbar1'
import LandingPage from "./pages/LandingPage/landingPage";
import Footer from './components/Footer/footer.jsx';
import {Routes, Route} from 'react-router-dom'
import SignUp from "./pages/SignUp/signUp.jsx";
import Login from "./pages/Login/login.jsx";
import Feeds from "./pages/Feeds/feeds.jsx";
import Navbar2 from "./components/Navbar2/navbar2.jsx";
import Post from "./components/Post/post.jsx";
import MyNetwork from "./pages/MyNetwork/myNetwork.jsx";
import Resume from "./pages/Resume/resume.jsx";
import Messages from "./pages/Messages/messages.jsx";
import Profile from "./pages/Profile/profile.jsx";
import AllActivities from "./pages/AllActivities/allActivities.jsx";
import SingleActivity from "./pages/SingleActivity/singleActivity.jsx";
import Notification from "./pages/Notification/notifications.jsx";
function App() {
    const isLogin = true;
    return (
        <div className='bg-gray-100 w-[100%] h-[100%] box-border min-w-[500px]'>
            {isLogin ? <Navbar2/> : <Navbar1/>}
            <Routes>
                <Route path='/' element={<LandingPage/>}/>
                <Route path='/signUp' element={<SignUp/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/feeds' element={<Feeds/>}/>
                <Route path='/post' element={<Post/>}/>
                {/*<Route path='/notifications' element={<Notification/>}/>*/}
                <Route path='/notification' element={<Notification/>}/>
                <Route path='/myNetwork' element={<MyNetwork/>}/>
                <Route path='/resume' element={<Resume/>}/>
                <Route path='/messages' element={<Messages/>}/>
                <Route path='/profile:id' element={<Profile/>}/>
                <Route path='/profile:id/activities' element={<AllActivities/>}/>
                <Route path='/profile:id/activities:postId' element={<SingleActivity/>}/>


            </Routes>
            <Footer/>
        </div>
    );
}

export default App
