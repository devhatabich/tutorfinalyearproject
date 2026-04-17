import React from 'react'

const Cookies = () => {
    return (
        <div className="min-h-screen px-4 md:px-16 xl:px-32 py-12" style={{ backgroundColor: 'rgb(240, 244, 241)' }}>
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm [box-shadow:_10px_10px_0_rgb(0_0_0_)] border border-gray-200 p-8 md:p-12" style={{ backgroundColor: '#435465', borderStyle:'solid' }}>
                <h1 className="text-3xl font-extrabold mb-2 [text-shadow:_4px_4px_0_rgb(0_0_0_)]" style={{ color: '#fff' }}>Cookie Policy</h1>
                <p className="text-sm text-gray-400 mb-8">Last updated: April 2026</p>

                <p className="text-gray-600 text-base leading-relaxed mb-6" style={{color: '#fff'}}>
                    This Cookie Policy explains how our Peer Tutoring Platform uses cookies and similar technologies when you use the platform.
                </p>

                <h2 className="text-xl font-bold text-gray-800 mb-3 [text-shadow:_4px_4px_0_rgb(0_0_0_)]" style={{ color: '#fff' }} >1. What Are Cookies?</h2>
                <p className="text-gray-600 text-base leading-relaxed mb-4" style={{color: '#fff'}}>
                    Cookies are small text files stored on your device by your browser when you visit a website. They help the system remember certain information about your session, such as whether you are authenticated.
                </p>

                <h2 className="text-xl font-bold text-gray-800 mb-3 [text-shadow:_4px_4px_0_rgb(0_0_0_)]" style={{ color: '#fff' }}>2. Cookies We Use Within Our System</h2>
                <div className="overflow-x-auto mb-4" style={{color: '#fff'}}>
                    <table className="w-full text-sm text-gray-600 border border-gray-200 rounded-lg overflow-hidden">
                        <thead className="bg-gray-50 text-gray-700 text-left">
                            <tr>
                                <th className="px-4 py-3 font-semibold border-b border-gray-200">Cookie</th>
                                <th className="px-4 py-3 font-semibold border-b border-gray-200">Purpose</th>
                                <th className="px-4 py-3 font-semibold border-b border-gray-200">Duration</th>
                            </tr>
                        </thead>
                        <tbody style={{backgroundColor: '#fff'}}>
                            <tr className="border-b border-gray-100">
                                <td className="px-4 py-3 font-mono">token</td>
                                <td className="px-4 py-3">Authentication cookie used to keep users securely logged in</td>
                                <td className="px-4 py-3">7 days</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono">isLogin</td>
                                <td className="px-4 py-3">Client-side login state used for interface behaviour</td>
                                <td className="px-4 py-3">Session</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2 className="text-xl font-bold text-gray-800 mb-3 [text-shadow:_4px_4px_0_rgb(0_0_0_)]" style={{ color: '#fff' }}>3. Third-Party Cookies</h2>
                <p className="text-gray-600 text-base leading-relaxed mb-4" style={{color: '#fff'}}>
                    If you use Google authentication, Google may place its own cookies on your device in accordance with Google’s own privacy and cookie policies. These cookies are controlled by Google, not by TutorMe.
                </p>

                <h2 className="text-xl font-bold text-gray-800 mb-3 [text-shadow:_4px_4px_0_rgb(0_0_0_)]" style={{ color: '#fff' }}>4. How We Use Cookies</h2>
                <p className="text-gray-600 text-base leading-relaxed mb-4" style={{color: '#fff'}}>
                    Cookies are used to maintain secure login sessions, recognise authenticated users across protected pages and support core platform functionality. However, the platform does <span style={{fontWeight: 'bold'}}>not</span> use cookies for advertising purposes.
                </p>

                <h2 className="text-xl font-bold text-gray-800 mb-3 [text-shadow:_4px_4px_0_rgb(0_0_0_)]" style={{ color: '#fff' }}>5. Changes to This Policy</h2>
                <p className="text-gray-600 text-base leading-relaxed mb-6" style={{color: '#fff'}}>
                    This Cookie Policy may be updated from time to time. Continued use of Peer Tutoring Platform after any updates means that you accept the revised policy.
                </p>

                <div className="mt-8 pt-6 border-t border-gray-100 text-sm text-gray-400">
                    Made with love by <a target="_blank" className="text-gray-400 no-underline hover:text-[#7eb8a4] transition-colors cursor-pointer" href='https://github.com/devhatabich'>@devhatabich</a>
                </div>
            </div>
        </div>
    )
}

export default Cookies
