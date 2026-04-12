import React from 'react'
import { Link } from 'react-router-dom'
import GoogleLoginComp from '../../components/GoogleLogin/googleLoginComp'
const LandingPage = (props) => {
    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#364351' }}>
            {/* Hero Section */}
            <div className="flex flex-col md:flex-row items-center px-5 md:px-16 xl:px-32 py-12 md:py-20 gap-10 md:gap-16">
                {/* Left: Text + CTAs */}
                <div className="flex-1 max-w-lg">
                    <div
                        className="text-xs font-semibold uppercase tracking-widest mb-4" style={{color: '#ffffffde'}}

                    >
                        Growing Together
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-5" style={{ color: '#fff' }}>
                        Time to level-up<br />
                        <span style={{ color: '#FCD053' }}>your studies.</span>
                    </h1>
                    <p className="text-gray-500 text-lg mb-8 leading-relaxed" style={{color: '#ffffffde'}}>
                        Ask for help, offer support, earn points and build meaningful academic connections — all in one place.
                    </p>

                    <div className="flex flex-col gap-3 w-full sm:w-80">
                        <div className="rounded-full overflow-hidden border border-gray-200 bg-white transition-colors hover:bg-white">
                            <GoogleLoginComp changeLoginValue={props.changeLoginValue} />
                        </div>

                        <div className="flex items-center gap-3 my-1">
                            <div className="flex-1 border-t border-gray-300" />
                            <span className="text-sm text-gray-400">or</span>
                            <div className="flex-1 border-t border-gray-300" />
                        </div>

                        <Link
                            to={'/login'}
                            className="flex items-center justify-center py-3 px-6 rounded-full font-semibold text-sm border-2 transition-opacity hover:opacity-90    mt-1 up-btn-glow"
                            style={{ borderColor: '#435465', color: '#435465', backgroundColor: '#fff' }}
                        >
                            Sign in with email
                        </Link>

                        <Link
                            to={'/signUp'}
                            className="flex items-center justify-center py-3 px-6 rounded-full font-semibold text-sm text-white transition-opacity hover:opacity-90 up-btn-glow"
                            style={{ backgroundColor: '#435465' }}
                        >
                            Create an account
                        </Link>
                    </div>
                </div>

                {/* Right: Image */}
                <div className="flex-1 w-full max-w-xl">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                        <img
                            alt="university"
                            className='w-full h-92 sm:h-96 md:h-[480px] object-cover'
                            src='https://m3-uploads.s3.eu-west-1.amazonaws.com/setuWall.jpg'
                        />

                        <div
                            className="absolute inset-0 opacity-20"
                            style={{ background: 'linear-gradient(135deg, #435465 0%, transparent 60%)' }}
                        />
                        <div className="absolute bottom-2 left-6 right-6 bg-white bg-opacity-90 rounded-xl p-4 shadow">
                            <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#FCD053' }}>Student Community</div>
                            <div className="font-bold text-gray-800 text-sm">Connect with students who are ready to learn and support each other.</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features */}
            <div className="flex-1 border-t border-gray-200 px-5 md:px-16 xl:px-32 py-10" style={{backgroundColor: 'rgb(240, 244, 241)'}}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8  ">
                    {[
                        { title: 'Create Tutoring Content', desc: 'Post academic questions, request support or offer help to other students.' },
                        { title: 'Schedule Tutoring Sessions', desc: 'Arrange meetings with friends to learn topics together.' },
                        { title: 'Help and Earn', desc: 'Rate completed sessions and earn points for contributing to the community.' },
                    ].map((f, i) => (
                        <div key={i} className="flex flex-col gap-2  [box-shadow:_4px_4px_0_rgb(0_0_0_)]" style={{ backgroundColor: '#435465', borderStyle:'solid' }}>
                            <div className="w-8 h-1  mb-1" style={{ backgroundColor: '#FCD053' }} />
                            <div className="ps-2 font-extrabold text-gray-800 text-xl [text-shadow:_2px_2px_0_rgb(0_0_0_)]" style={{ color: '#fff' }}>{f.title}</div>
                            <div className="ps-2 text-xs leading-relaxed" style={{color: '#ffffffde'}}>{f.desc}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LandingPage
