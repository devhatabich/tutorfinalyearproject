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
                    <div className = "flex gap-3">
                        <a href="https://github.com/devhatabich" target="_blank" className = "w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center text-gray-400 hover:text-[#7eb8a4] hover:border-[#7eb8a4] transition-colors cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.165c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cookies
