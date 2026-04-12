import React from 'react'

const Terms = () => {
    return (
        <div className="min-h-screen px-4 md:px-16 xl:px-32 py-12" style={{ backgroundColor: 'rgb(240, 244, 241)' }}>
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm [box-shadow:_10px_10px_0_rgb(0_0_0_)] border border-gray-200 p-8 md:p-12" style={{ backgroundColor: '#435465', borderStyle:'solid' }}>
                <h1 className="text-3xl font-extrabold mb-2 [text-shadow:_4px_4px_0_rgb(0_0_0_)]" style={{ color: '#fff' }}>Terms of Use</h1>
                <p className="text-sm text-gray-400 mb-8">Last updated: April 2026</p>

                <p className="text-gray-600 text-base leading-relaxed mb-6" style={{color: '#fff'}}>
                    By accessing or using TutorMe, you agree to these Terms of Use. Please read them carefully before using the platform.
                </p>

                <h2 className="text-xl font-bold text-gray-800 mb-3 [text-shadow:_4px_4px_0_rgb(0_0_0_)]" style={{ color: '#fff' }}>1. Eligibility</h2>
                <p className="text-gray-600 text-base leading-relaxed mb-4" style={{color: '#fff'}}>
                    You must be at least 13 years old to use TutorMe. By creating an account, you confirm that you meet this age requirement and that the information you provide is accurate.
                </p>

                <h2 className="text-xl font-bold text-gray-800 mb-3 [text-shadow:_4px_4px_0_rgb(0_0_0_)]" style={{ color: '#fff' }}>2. Account Responsibilities</h2>
                <p className="text-gray-600 text-base leading-relaxed mb-4" style={{color: '#fff'}}>
                    You are responsible for keeping your login details confidential and for all activity that happens under your account. You must notify us immediately if you believe your account has been accessed without your permission. You must not impersonate another person, misrepresent your identity, or create accounts for misleading or fraudulent purposes.
                </p>

                <h2 className="text-xl font-bold text-gray-800 mb-3 [text-shadow:_4px_4px_0_rgb(0_0_0_)]" style={{ color: '#fff' }} >3. Acceptable Usage</h2>
                <p className="text-gray-600 text-base leading-relaxed mb-2" style={{color: '#fff'}}>When using TutorMe, you agree not to:</p>
                <ul className="list-disc list-inside text-gray-600 text-base leading-relaxed mb-4 space-y-2" style={{color: '#fff'}}>
                    <li>post, share, or upload unlawful, harmful, abusive, or offensive content</li>
                    <li>harass, threaten, intimidate, or harm other users</li>
                    <li>send spam, advertising, or unsolicited messages</li>
                    <li>attempt to gain unauthorised access to the platform, accounts, or data</li>
                    <li>interfere with, damage, disrupt, or reverse-engineer any part of the platform</li>
                    <li>use bots, scripts, scrapers, or other automated tools without permission</li>
                </ul>

                <h2 className="text-xl font-bold text-gray-800 mb-3 [text-shadow:_4px_4px_0_rgb(0_0_0_)]" style={{ color: '#fff' }} >4. User Content</h2>
                <p className="text-gray-600 text-base leading-relaxed mb-4" style={{color: '#fff'}}>
                    By posting content on the platform, you grant TutorMe a non-exclusive, limited licence to store, display, and make that content available to other users as necessary for the operation of the platform. You are responsible for ensuring that the content you post does not violate any law or the rights of others.
                </p>

                <h2 className="text-xl font-bold text-gray-800 mb-3 [text-shadow:_4px_4px_0_rgb(0_0_0_)]" style={{ color: '#fff' }} >5. Suspension and Termination</h2>
                <p className="text-gray-600 text-base leading-relaxed mb-4 " style={{color: '#fff'}}>
                    We may suspend, restrict, or terminate your access to TutorMe if you violate these Terms of Use or use the platform in a way that may harm the platform or its users. Where appropriate, we may do this without prior notice.
                </p>

                <h2 className="text-xl font-bold text-gray-800 mb-3 [text-shadow:_4px_4px_0_rgb(0_0_0_)]" style={{ color: '#fff' }} >6. Limitation of Liability</h2>
                <p className="text-gray-600 text-base leading-relaxed mb-4" style={{color: '#fff'}}>
                    TutorMe is provided on an “as is” and “as available” basis. We make no warranties or guarantees about the platform, including its reliability, availability, or suitability for a particular purpose. To the fullest extent permitted by law, TutorMe will not be liable for any indirect, incidental, or consequential loss or damage arising from your use of the platform.
                </p>

                <h2 className="text-xl font-bold text-gray-800 mb-3 [text-shadow:_4px_4px_0_rgb(0_0_0_)]" style={{ color: '#fff' }} >7. Changes to Terms</h2>
                <p className="text-gray-600 text-base leading-relaxed mb-6" style={{color: '#fff'}}>
                    We may update these Terms of Use from time to time. Any changes will be posted on this page. By continuing to use TutorMe after changes are made, you accept the updated Terms.
                </p>

                <div className="mt-8 pt-6 border-t border-gray-100 text-sm text-gray-400">
                    Made with love by <a href='https://github.com/devhatabich'>@devhatabich</a>
                </div>
            </div>
        </div>
    )
}

export default Terms
