import React, {useState} from 'react';
import Card from "../../components/Card/card.jsx";
import ProfileCard from "../../components/ProfileCard/profileCard.jsx";
import VideoCallIcon from '@mui/icons-material/VideoCall';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import Advertisement from "../../components/Advertisement/advertisement.jsx";
import Post from "../../components/Post/post.jsx";
import AddModal from "../../components/AddModal/addModal.jsx";
import Modal from "../../components/Modal/modal.jsx";
function Feeds(props) {

    const [addPostModal, setAddPostModal] = useState(false);

    const handleOpenPostModal = () => {
        setAddPostModal(prev=>!prev);
    }
    return (
        <div className = "px-5 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100 ">
            <div className = 'w-[21%] sm:block sm:w-[23%] hidden py-5'>
                <div className = "h-fit ">
                    <ProfileCard />

                </div>
                <div className = 'w-full my-5 text-gray-700 text-sm '>
                    <Card padding={1}>
                        <div className = 'w-full flex justify-between'>
                            <div>Profile Viewers</div>
                            <div >77</div>
                        </div>
                        <div className = 'w-full flex justify-between'>
                            <div>Post Impressions</div>
                            <div >22</div>
                        </div>

                    </Card>

                </div>

            </div>

            <div className = 'w-[100%] py-5 sm:w-[50%]'>

                <div className='text-gray-700'>
                    <Card padding={1}>
                        <div className = 'flex gap-2 items-center'>
                            <img src='https://d7hftxdivxxvm.cloudfront.net/?quality=80&resize_to=width&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2F2RNK1P0BYVrSCZEy_Sd1Ew%252F3417757448_4a6bdf36ce_o.jpg&width=910' className = 'rounded-4xl w-13 h-13 border-2 border-white cursor-pointer'/>
                            <div onClick = {() => setAddPostModal(true)} className = 'w-full border-1 py-3 px-3 rounded-3xl cursor-pointer hover:bg-gray-100'>Start a post</div>
                        </div>

                        <div className = 'w-full flex mt-3'>
                            <div onClick = {() => setAddPostModal(true)} className = 'flex gap-2 p-2 cursor-pointer justify-center rounded-lg w-[33%] hover:bg-gray-100'><VideoCallIcon sx={{color: "rgb(67, 84, 101)"}}/>Video</div>
                            <div onClick = {() => setAddPostModal(true)} className = 'flex gap-2 p-2 cursor-pointer justify-center rounded-lg w-[33%] hover:bg-gray-100'><InsertPhotoIcon sx={{color: "rgb(67, 84, 101)"}}/>Photo</div>
                            <div onClick = {() => setAddPostModal(true)} className = 'flex gap-2 p-2 cursor-pointer justify-center rounded-lg w-[33%] hover:bg-gray-100'><TextSnippetIcon sx={{color: "rgb(67, 84, 101)"}}/>Article</div>
                        </div>

                    </Card>
                </div>

                <div className = 'border-b-1 border-gray-400 w-[100%] my-5' />

                <div className = 'w-full flex flex-col gap-5'>
                    <Post />

                    <Post />
                </div>

            </div>

            <div className = 'w-[26%] py-5 hidden md:block'>
                <div>
                    <Card padding = {1}>
                        <div className = 'text-xl text-gray-700 font-bold'>News</div>
                        <div className = 'text-gray-700 font-medium'>Top Posts</div>
                        <div className = 'my-1 '>
                            <div className = 'text-sm text-gray-700'>Peer Tutoring is ready for release 🥳</div>
                            <div className = 'text-xs text-gray-400'>1h ago</div>
                        </div>
                        <div className = 'my-1'>
                            <div className = 'text-sm text-gray-700'>Stay tuned!</div>
                            <div className = 'text-xs text-gray-400'>7h ago</div>
                        </div>

                    </Card>
                </div>
                <div className = 'my-5 sticky top-19'>
                    <Advertisement />

                </div>

            </div>
            {
                addPostModal && <Modal closeModal = {handleOpenPostModal} title={''}>
                    <AddModal />
                </Modal>
            }
        </div>
    );
}

export default Feeds;