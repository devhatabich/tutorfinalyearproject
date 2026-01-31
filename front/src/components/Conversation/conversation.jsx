import React from 'react';

function Conversation(props) {
    return (
       
                <div className = 'flex items-center w-full cursor-pointer border-b-1 border-gray-300 gap-3 p-4 hover:bg-gray-200'>
                    <div className = 'srhink-0'>
                        <img className = 'w-12 h-12 rounded-[100%] cursor-pointer' src={'https://i.redd.it/pdylcq4xq0i41.jpg'}/>
                    </div>
                    <div>
                        <div className ='text-md'>User 1</div>
                        <div className ='text-sm text-gray-500'>Waterford</div>
                    </div>
                </div>



    );
}

export default Conversation;