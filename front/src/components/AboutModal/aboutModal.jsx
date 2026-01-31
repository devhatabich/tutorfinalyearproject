import React from 'react';

function AboutModal(props) {
    return (
        <div className = 'my-8'>
            <div className ='w-full mb-4'>
                <label>About*</label>
                <br/>
                <textarea className = 'p-2 w-full mt-1 border-1 rounded-md' cols={10} rows={3}></textarea>
            </div>

            <div className ='w-full mb-4'>
                <label>Interests* (Add by separating comma)</label>
                <br/>
                <textarea className = 'p-2 w-full mt-1 border-1 rounded-md' cols={10} rows={3}></textarea>
            </div>

            <div className ='w-full mb-4'>
                <label htmlFor = 'resumeUpload' className = 'p-2 bg-blue-800 text-white rounded-lg cursor-pointer'>Profile Upload</label>
                <input type={'file'} className = 'hidden' id={'resumeUpload'}/>
                <div className = 'my-2'></div>
            </div>
            <div className = 'bg-blue-950 text-white w-fit py-1 px-3 cursor-pointer rounded-2xl'>Save</div>

        </div>
    );
}

export default AboutModal;