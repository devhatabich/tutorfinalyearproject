import React from 'react'

const Card = (props) => {
    return (
        <div id={props.id} className={`w-full flex flex-col bg-white rounded-xl border shadow-sm ${props.highlight ? 'border-green-400 ring-2 ring-green-300' : 'border-gray-200'} ${props.padding ? 'p-5' : 'p-0'}`}>
            {props.children}
        </div>
    )
}

export default Card
