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
import {useParams} from 'react-router-dom';
function AllActivities(props) {
    const {id} = useParams();

    return (
        <div className = "px-5 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100 ">
            <div className = 'w-[21%] sm:block sm:w-[23%] hidden py-5'>
                <div className = "h-fit ">
                    <ProfileCard />

                </div>


            </div>

            <div className = 'w-[100%] py-5 sm:w-[50%]'>
                <div >
                    <Card padding={1}>
                        <div className = 'text-xl'>All Activity</div>
                        <div className = 'cursor-pointer w-fit p-2 border-1 rounded-4xl bg-green-800 my-2 text-white font-semibold'>Posts</div>
                        <div className = 'my-2 flex flex-col gap-2'>
                            <div>
                                <Post/>

                            </div>
                            <div>
                                <Post/>

                            </div>

                        </div>

                    </Card>

                </div>
            </div>

               



            <div className = 'w-[26%] py-5 hidden md:block'>
                
                <div className = 'my-5 sticky top-19'>
                    <Advertisement />

                </div>

            </div>
            
        </div>
    );
}

export default AllActivities;