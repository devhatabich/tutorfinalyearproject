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
    const [isLogin, setIsLogin] = useState(localStorage.getItem('isLogin'));

    const changeLoginValue = (val) => {
        setIsLogin(val)
    }
    return (
        <div className='bg-gray-100 w-[100%] h-[100%] box-border'>
            {isLogin ? <Navbar2/> : <Navbar1/>}
            <Routes>
                <Route path='/' element={isLogin?<Navigate to={'/feeds'}/>:<LandingPage changeLoginValue={changeLoginValue}/>}/>
                <Route path='/signUp' element={isLogin?<Navigate to={'/feeds'}/>:<SignUp changeLoginValue={changeLoginValue}/>}/>
                <Route path='/login' element={isLogin?<Navigate to={'/feeds'}/>:<Login changeLoginValue={changeLoginValue}/>}/>
                <Route path='/feeds' element={isLogin?<Feeds/> : <Navigate to={'/login'}/>}/>
                <Route path='/myNetwork' element={isLogin?<MyNetwork/> : <Navigate to={'/login'}/>}/>
                <Route path='/resume' element={isLogin?<Resume/> : <Navigate to={'/login'}/>}/>
                <Route path='/messages' element={isLogin?<Messages/>:<Navigate to={'/login'}/>}/>
                <Route path='/notification' element={isLogin?<Notification/>:<Navigate to={'/login'}/>}/>
                <Route path='/profile:id' element={isLogin?<Profile/>:<Navigate to={'/login'}/>}/>
                <Route path='/profile:id/activities' element={isLogin?<AllActivities/>:<Navigate to={'/login'}/>}/>
                <Route path='/profile:id/activities:postId' element={isLogin?<SingleActivity/>:<Navigate to={'/login'}/>}/>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App
