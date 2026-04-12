import React from 'react'

const About = () => {
    return (
        <div className="min-h-screen px-4 md:px-16 xl:px-32 py-12 " style={{ backgroundColor: 'rgb(240, 244, 241)'}}>
            <div className="max-w-3xl mx-auto bg-white rounded-2xl  [box-shadow:_10px_10px_0_rgb(0_0_0_)] shadow-sm border border-gray-200 p-8 md:p-12" style={{ backgroundColor: '#435465', borderStyle:'solid' }}>
                <div className="flex items-center gap-3 mb-8">
                    <div className="[box-shadow:_4px_4px_0_rgb(0_0_0_)] w-10 h-10 rounded-full flex items-center justify-center shadow-sm overflow-hidden" style={{ backgroundColor: '#fff' }}>
                        <img className=' w-full h-full p-0.5 object-cover'  src={'https://m3-uploads.s3.eu-west-1.amazonaws.com/favicon.webp'}/>
                    </div>
                    <h1 className="text-3xl font-extrabold [text-shadow:_4px_4px_0_rgb(0_0_0_)]" style={{ color: '#fff' }}>A very little bit about TutorMe...</h1>
                </div>

                <p className="text-base leading-relaxed mb-6" style={{color: '#fff'}}>
                    TutorMe is an academic support platform developed to help struggling students get help promptly by support one another through structured tutoring.
                </p>

                <h2 className="text-xl font-extrabold mb-3  [text-shadow:_4px_4px_0_rgb(0_0_0_)]" style={{ color: '#fff' }}>Philosophy behind the platform</h2>
                <p className="text-gray-600 text-base leading-relaxed mb-6" style={{color: '#fff'}}>
                    Academic support should be easier to access, more immediate and less intimidating. The platform is designed to create a supportive student community within an university where learners can seek guidance, share knowledge and build confidence through peer interaction.
                </p>

                <h2 className="text-xl font-extrabold mb-3  [text-shadow:_4px_4px_0_rgb(0_0_0_)]" style={{ color: '#fff' }}>Join our community today!</h2>
                <ul className="list-disc list-inside text-gray-600 text-base leading-relaxed mb-6 space-y-2"  style={{color: '#fff'}}>
                    <li>Quick access to academic help from other students</li>
                    <li>Place to offer your own knowledge and support</li>
                    <li>Private messaging with friends you connect with</li>
                    <li>Cool profile that shows topics you are passionate about</li>
                    <li>Easy meeting scheduling for tutoring sessions</li>
                    <li>500 points at the start to help you smooth the journey and grow faster</li>
                </ul>

                <h2 className="text-xl font-extrabold mb-3  [text-shadow:_4px_4px_0_rgb(0_0_0_)]" style={{ color: '#fff' }}>Why was it chosen as a final year project?</h2>
                <p className="text-gray-600 text-base leading-relaxed mb-6" style={{color: '#fff'}}>
                    During my studies, I noticed that many students require assistance with academic modules but do not always receive support in a timely manner, which lowers motivation and overall leads to poor performance. The decision to incorporate a gamification element through ratings and points allowed this project to make the learning process fun and engaging, address a real academic support problem and apply a modern technology stack in the industry that is well suited to the development of a fullstack web platform for this context.
                </p>

                <div className="mt-8 pt-6 border-t border-gray-100 text-sm text-gray-400">
                    Made with love by <a href='https://github.com/devhatabich'>@devhatabich</a>
                </div>
            </div>
        </div>
    )
}

export default About
