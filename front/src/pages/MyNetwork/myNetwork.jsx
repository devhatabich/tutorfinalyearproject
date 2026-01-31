import React, {useState} from 'react';
import ProfileCard from "../../components/ProfileCard/profileCard.jsx";

function MyNetwork(props) {
    const [text, setText] = useState("Catch up with peers!")

    const handleFriends = async() => {
        setText("Catch up with peers!")
    }
    const handlePending = async() => {
        setText("Pending Requests")
    }
    return (
        <div className = 'px-5 xl:px-50 py-9 flex-col gap-5 w-full mt-5 bg-gray-100 grid grid-cols-[repeat(auto-fill, _minmax(120px, _1fr)]'>
            <div className = 'gap-5 py-4 px-10 border-1 border-gray-400 w-full flex justify-between my-5 text-xl bg-white rounded-xl'>
                <div>{text}</div>
                <div className = 'flex gap-3'>
                    <button onClick = {handleFriends} className = {`cursor-pointer p-1 border-1 rounded-lg border-gray-300 ${text === "Catch up with peers!"?'bg-blue-800 text-white':''}`}>Friends</button>
                    <button onClick={handlePending} className = {`cursor-pointer p-1 border-1 rounded-lg border-gray-300 ${text==='Pending Requests'?'bg-blue-800 text-white':''}`}>Pending Requests</button>
                </div>
            </div>
            <div className = 'flex h-[80vh] w-full gap-7 flex-wrap items-center justify-center'>
                <div className = 'md:w-[23%] sm:w-full'>
                    <ProfileCard/>

                </div>

                <div className = 'md:w-[23%] sm:w-full'>
                    <ProfileCard/>

                </div>

                <div className = 'md:w-[23%] sm:w-full'>
                    <ProfileCard/>

                </div>

                <div className = 'md:w-[23%] sm:w-full'>
                    <ProfileCard/>

                </div>

            </div>

        </div>
    );
}

export default MyNetwork;