import React from 'react';
import ProfileCard from "../../components/ProfileCard/profileCard.jsx";
import Card from "../../components/Card/card.jsx";
import Post from "../../components/Post/post.jsx";
import Advertisement from "../../components/Advertisement/advertisement.jsx";

function SingleActivity(props) {
    return (
        <div className="px-5 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100 ">
            <div className='w-[21%] sm:block sm:w-[23%] hidden py-5'>
                <div className="h-fit ">
                    <ProfileCard/>

                </div>


            </div>

            <div className='w-[100%] py-5 sm:w-[50%]'>


                <div>
                    <Post/>

                </div>
                <div>
                    <Post/>

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

export default SingleActivity;