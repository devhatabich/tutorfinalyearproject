import React from 'react';
import ProfileCard from "../../components/ProfileCard/profileCard.jsx";
import Card from "../../components/Card/card.jsx";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import Post from "../../components/Post/post.jsx";
import Advertisement from "../../components/Advertisement/advertisement.jsx";
import Modal from "../../components/Modal/modal.jsx";
import AddModal from "../../components/AddModal/addModal.jsx";

function Notifications(props) {
    return (
        <div className="px-5 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100 ">
            <div className='w-[21%] sm:block sm:w-[23%] hidden py-5'>
                <div className="h-fit ">
                    <ProfileCard/>

                </div>

            </div>

            <div className='w-[100%] py-5 sm:w-[50%]'>
                <div>
                    <Card padding={0}>
                        <div className = 'w-full'>
                            <div className = {`border-b-1 cursor-pointer flex gap-4 items-center border-gray-300 p-3`}>
                                <img src='https://d7hftxdivxxvm.cloudfront.net/?quality=80&resize_to=width&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2F2RNK1P0BYVrSCZEy_Sd1Ew%252F3417757448_4a6bdf36ce_o.jpg&width=910' className = 'rounded-full cursor-pointer w-15 h-15'/>
                                <div>Test User has sent you a friend request</div>
                            </div>

                            <div className = {`border-b-1 cursor-pointer flex gap-4 items-center border-gray-300 p-3`}>
                                <img src='https://d7hftxdivxxvm.cloudfront.net/?quality=80&resize_to=width&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2F2RNK1P0BYVrSCZEy_Sd1Ew%252F3417757448_4a6bdf36ce_o.jpg&width=910' className = 'rounded-full cursor-pointer w-15 h-15'/>
                                <div>Test User commented on your post</div>
                            </div>
                        </div>

                    </Card>
                </div>


            </div>

            <div className='w-[26%] py-5 hidden md:block'>

                <div className='my-5 sticky top-19'>
                    <Advertisement/>

                </div>

            </div>

        </div>
    );
}

export default Notifications;