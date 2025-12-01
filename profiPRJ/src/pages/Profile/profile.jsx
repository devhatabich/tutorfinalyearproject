import React, {useState} from 'react';
import Card from "../../components/Card/card.jsx";
import CreateIcon from '@mui/icons-material/Create';
import EditIcon from '@mui/icons-material/Edit';
import Advertisement from "../../components/Advertisement/advertisement.jsx";
import Post from "../../components/Post/post.jsx";
import AddIcon from '@mui/icons-material/Add';
import Modal from "../../components/Modal/modal.jsx";
import ImageModal from "../../components/ImageModal/imageModal.jsx";
import AboutModal from "../../components/AboutModal/aboutModal.jsx";
import MessageModal from "../../components/MessageModal/messageModal.jsx";
import ExpModal from "../../components/ExpModal/expModal.jsx";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import {useParams} from 'react-router-dom';
import EditInfoModal from "../../components/EditModal/editInfoModal.jsx";
function Profile(props) {
    const {id} = useParams();
    const [expModal, setExpModal] = useState(false);
    const [aboutModal,setAboutModal] = useState(false);
    const [infoModal, setInfoModal] = useState(false);
    const [imageSetModal, setImageModal] = useState(false);
    const [circularImage, setCircularImage] = useState(false);
    const [messageModal, setMessageModal] = useState(false);
    const handleMessageModal = () => {
        setMessageModal(prev=>!prev);
    }
    const handleExpModal = () => {
        setExpModal(prev=>!prev);

    }

    const handleAboutModal = () => {
        setAboutModal(prev => !prev)
    }

    const handleInfoModal = () => {
        setInfoModal(prev=>!prev);
    }


    // const [circular, setCircularImage] = useState(true)

    const handleImageModalOpenClose = () => {
        setImageModal(prev => !prev);
    }
    const handleOnEditCover = () => {
        setImageModal(true)
        setCircularImage(false)
    }

    const handleCircularImageOpen = () => {
        setImageModal(true)
        setCircularImage(true)
    }


    return (
        <div className='px-5 xl:px-50 py-5 mt-5 flex flex-col gap-5 w-full pt-12 bg-gray-100'>
            <div className='flex justify-between'>
                <div className='w-full md:w-[70%]'>
                    <div>
                        <Card padding={0}>
                            <div className='w-full h-fit'>
                                <div className='relative w-full h-[200px]'>
                                    <div
                                        onClick={handleOnEditCover}
                                        className='absolute cursor-pointer top-3 right-3 z-20 w-[35px] flex justify-center h-[35px] rounded-full p-3 bg-white'>
                                        <EditIcon/></div>
                                    <img
                                        src='https://d7hftxdivxxvm.cloudfront.net/?quality=80&resize_to=width&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2F2RNK1P0BYVrSCZEy_Sd1Ew%252F3417757448_4a6bdf36ce_o.jpg&width=910'
                                        className='h-[200px] w-full rounded-tr-lg rounded-tl-lg'/>
                                    <div onClick={handleCircularImageOpen}
                                         className='absolute object-cover top-24 left-6 z-10'><img
                                        className='rounded-full border-2 border-white cursor-pointer w-35 h-35'
                                        src='https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg'/>
                                    </div>
                                </div>
                                <div className='mt-10 relative px-8 py-2'>
                                    <div
                                        className='absoute cursor-pointer top-0 right-3 z-20 w-[35px] flex justify-center items-center h-[35px] rounded-full p-3 bg-white'
                                        onClick={handleInfoModal}>
                                        <CreateIcon/></div>
                                    <div className='w-full'>
                                        <div className='text-2xl'>Test User</div>
                                        <div className='text-gray-700'>Carlow</div>
                                        <div className='text-sm text-gray-500'>Year 2</div>
                                        <div className='text-sm text-gray-500'>IT Management (Honours)</div>
                                        <div className='text-md text-blue-800 w-fit cursor-pointer hover:underline'>500
                                            contributions
                                        </div>
                                        <div className='md:flex w-full justify-between'>
                                            <div className='my-5 flex gap-5'>
                                                <div
                                                    className='cursor-pointer p-2 border-1 rounded-lg bg-blue-800 text-white font-semibold'>Ask
                                                    help
                                                </div>
                                                <div
                                                    className='cursor-pointer p-2 border-1 rounded-lg bg-blue-800 text-white font-semibold'>Share
                                                </div>
                                                <div
                                                    className='cursor-pointer p-2 border-1 rounded-lg bg-blue-800 text-white font-semibold'>Review
                                                </div>
                                            </div>
                                            <div className='my-5 flex gap-5'>
                                                <div
                                                    onClick = {handleMessageModal} className='cursor-pointer p-2 border-1 rounded-lg bg-blue-800 text-white font-semibold'>Message
                                                </div>
                                                <div
                                                    className='cursor-pointer p-2 border-1 rounded-lg bg-blue-800 text-white font-semibold'>Connect
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>

                        </Card>
                    </div>
                    <div className='mt-5'>
                        <Card padding={1}>
                            <div className='flex justify-between items-center'>
                                <div className='text-xl'>About</div>
                                {/*<div onClick='handleAboutModal' className='cursor-pointer'><EditIcon/></div>*/}
                                <div onClick={handleAboutModal} className='cursor-pointer'>
                                    <EditIcon/>
                                </div>

                            </div>
                            <div className='text-gray-700 text-md w-[80%]'>Studying at SETU. Eager to help, feel free to
                                reach me out whenever you face any problems regarding your studies!
                            </div>
                        </Card>
                    </div>
                    <div className='mt-5'>
                        <Card padding={1}>
                            <div className='flex justify-between items-center'>
                                <div className='text-xl'>Specialization</div>
                            </div>
                            <div className='text-gray-700 text-md my-2 w-full flex gap-4 flex-wrap'>
                                <div className='py-2 px-3 cursor-pointer bg-blue-800 text-white rounded-lg'>DSA</div>
                                <div className='py-2 px-3 cursor-pointer bg-blue-800 text-white rounded-lg'>Computer
                                    Architecture
                                </div>
                                <div
                                    className='py-2 px-3 cursor-pointer bg-blue-800 text-white rounded-lg'>Mathematics
                                </div>

                            </div>

                        </Card>

                    </div>

                    <div className='mt-5'>
                        <Card padding={1}>
                            <div className='flex justify-between items-center'>
                                <div className='text-xl'>Activities</div>
                            </div>
                            <div
                                className='cursor-pointer px-3 py-1 w-fit border-1 rounded-4xl bg-green-800 text-white font-semibold'>Posts
                            </div>
                            <div className='overflow-x-auto my-2 flex gap-1 overflow-y-hidden w-fill'>
                                <Link to={`/profile/${id}/activities/111`} className='cursor-pointer shrink-0 w-[350px] h-[560px]'>
                                    <Post profile={1}/>
                                </Link>
                                <Link to={`/profile/${id}/activities/112`} className='cursor-pointer shrink-0 w-[350px] h-[560px]'>
                                    <Post profile={1}/>
                                </Link>
                            </div>

                            <div className = 'w-full flex justify-center items-center'>
                                <Link to={`/profile/${id}/activities`} className = 'p-2 rounded-xl cursor-pointer hover:bg-gray-300'>Show All Posts <ArrowRightAltIcon/></Link>

                            </div>
                        </Card>
                    </div>

                    <div className='mt-5'>
                        <Card padding={1}>
                            <div className='flex justify-between items-center'>
                                <div className='text-xl'>Degree</div>
                                <div onClick={handleExpModal} className='cursor-pointer '><AddIcon/></div>
                            </div>
                            <div className='mt-5'>
                                <div className='p-2 border-t-1 border-gray-300 flex justify-between'>
                                    <div>
                                        <div className='text-lg'>Games Development (Honours)</div>
                                        <div className='text-sm'>Year 4</div>
                                        <div className='text-sm'>Carlow</div>

                                    </div>
                                    <div className='cursor-pointer'><EditIcon/></div>

                                </div>
                                <div className='p-2 border-t-1 border-gray-300 flex justify-between'>
                                    <div>
                                        <div className='text-lg'>Games Development (Honours)</div>
                                        <div className='text-sm'>Year 4</div>
                                        <div className='text-sm'>Carlow</div>

                                    </div>
                                    <div className='cursor-pointer'><EditIcon/></div>

                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                <div className='hidden md:flex md:w-[28%]'>
                    <div className='sticky top-19'>
                        <Advertisement/>

                    </div>

                </div>

            </div>

            {/*{*/}
            {/*    imageSetModal && <Modal title='Upload Image' closeModal={handleImageModalOpenClose}>*/}
            {/*        <ImageModal isCurcular={circularImage}/>*/}
            {/*    </Modal>*/}
            {/*}*/}
            {
                imageSetModal && (
                    <Modal title='Upload Image' closeModal={handleImageModalOpenClose}>
                        <ImageModal isCircular={circularImage}/>
                    </Modal>
                )
            }


            {/*{*/}
            {/*    infoModal && <Modal title='Edit info' closeModal={handleInfoModal}>*/}

            {/*    </Modal>*/}
            {/*}*/}

            {
                infoModal && (
                    <Modal title='Edit info' closeModal={handleInfoModal}>
                        <EditInfoModal/>
                    </Modal>
                )
            }


            {/*{*/}
            {/*    aboutModal && <Modal title={'Edit About'} closeModal={handleAboutModal()}>*/}
            {/*        <AboutModal/>*/}
            {/*    </Modal>*/}
            {/*}*/}
            {
                aboutModal && (
                    <Modal title='Edit About' closeModal={handleAboutModal}>
                        <AboutModal/>
                    </Modal>
                )
            }


            {/*{*/}
            {/*    expModal && <Modal title={'Experience'} closeModal={handleExpModal}>*/}
            {/*        <ExpModal/>*/}

            {/*    </Modal>*/}
            {/*}*/}
            {
                expModal && (
                    <Modal title={'Experience'} closeModal={handleExpModal}>
                        <ExpModal/>
                    </Modal>
                )
            }


            {/*{*/}
            {/*    messageModal && <Modal title={'Send Message'} closeModal={handleMessageModal}>*/}
            {/*        <MessageModal>*/}

            {/*        </MessageModal>*/}
            {/*    </Modal>*/}
            {/*}*/}
            {
                messageModal && (
                    <Modal title={'Send Message'} closeModal={handleMessageModal}>
                        <MessageModal>
                        </MessageModal>
                    </Modal>
                )
            }


        </div>
    );
}

export default Profile;
// https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg