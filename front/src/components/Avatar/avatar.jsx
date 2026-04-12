import React, { useState } from 'react'

const fontSizes = {
    xs:   10,
    sm:   12,
    md:   14,
    lg:   18,
    xl:   22,
    '2xl': 30,
    '3xl': 38,
}

const palette = [
    '#435465', '#2D6A4F', '#1a3c6e', '#4a1a6e',
    '#6e4a1a', '#6e1a4a', '#1a6e4a', '#6e1a1a',
    '#2c5364', '#6b4226',
]

const getBgColor = (name) => {
    if (!name) return palette[0]
    return palette[name.charCodeAt(0) % palette.length]
}

const Avatar = ({ src, name, size = 'md', className = '' }) => {
    const [imgError, setImgError] = useState(false)
    const letter = name ? name.charAt(0).toUpperCase() : '?'

    if (src && !imgError) {
        return (
            <img
                src={src}
                className={`rounded-full object-cover shrink-0 ${className}`}
                alt={name || ''}
                onError={() => setImgError(true)}
            />
        )
    }

    return (
        <div
            className={`rounded-full flex items-center justify-center font-bold text-white shrink-0 select-none ${className}`}
            style={{ backgroundColor: getBgColor(name) }}
            title={name}
        >
            <span style={{ fontSize: `${fontSizes[size] || 14}px`, lineHeight: 1 }}>
                {letter}
            </span>
        </div>
    )
}

export default Avatar
