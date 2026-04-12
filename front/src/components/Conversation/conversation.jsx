import React, { useEffect, useState } from 'react'
import Avatar from '../Avatar/avatar'


const Conversation = ({ item, ownId, handleSelectedConv, activeConvId }) => {
    const [memberData, setMemberData] = useState(null)

    useEffect(() => {
        const resolvedId = ownId || JSON.parse(localStorage.getItem('userInfo') || '{}')._id;
        const other = item?.members?.find(m => m._id !== resolvedId);
        setMemberData(other || null);
    }, [ownId, item]);

    return (
        <div
            onClick={() => memberData && handleSelectedConv(item?._id, memberData)}
            className={`flex items-center w-full cursor-pointer border-b border-gray-100 gap-3 p-4 transition-colors hover:bg-gray-50 ${activeConvId === item?._id ? 'bg-gray-50 border-l-2' : ''}`}
            style={activeConvId === item?._id ? { borderLeftColor: '#435465' } : {}}
        >
            <Avatar src={memberData?.profilePic} name={memberData?.f_name} size="md" className='w-11 h-11 shrink-0' />
            <div className='min-w-0'>
                <div className="text-sm font-medium text-gray-900 truncate">{memberData?.f_name}</div>
                <div className="text-xs text-gray-400 truncate">{memberData?.headline}</div>
            </div>
        </div>
    );
};

export default Conversation;
