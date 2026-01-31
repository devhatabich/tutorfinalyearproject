import React from 'react';

function ExpModal(props) {
    return (
        <div className = 'mt-8 w-full h-[350px] overflow-auto'>
            <div className = 'w-full mb-4'>
                <label>Degree*</label>
                <br/>
                <input type={'text'} className = 'p-2 mt-1 w-full border-1 rounded-md' placeholder={'Enter Degree'}/>
            </div>
            <div className = 'w-full mb-4'>
                <label>Year*</label>
                <br/>
                <input type={'text'} className = 'p-2 mt-1 w-full border-1 rounded-md' placeholder={'Enter Year'}/>
            </div>
            <div className = 'w-full mb-4'>
                <label>Campus*</label>
                <br/>
                <input type={'text'} className = 'p-2 mt-1 w-full border-1 rounded-md' placeholder={'Enter Campus'}/>
            </div>
            <div className = 'bg-blue-950 text-white w-fit py-1 px-3 cursor-pointer rounded-2xl'>Save</div>

        </div>
    );
}

export default ExpModal;