import React from 'react'

const Privacy = () => {
    return (
        <div className="min-h-screen px-4 md:px-16 xl:px-32 py-12" style={{ backgroundColor: 'rgb(240, 244, 241)' }}>
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm [box-shadow:_10px_10px_0_rgb(0_0_0_)] border border-gray-200 p-8 md:p-12" style={{ backgroundColor: '#435465', borderStyle:'solid' }}>

                <h1 className="text-3xl font-extrabold mb-2 [text-shadow:_4px_4px_0_rgb(0_0_0_)]" style={{ color: '#fff' }}>Privacy Policy</h1>
                <p className="text-sm text-gray-400 mb-8">Last updated: April 2026</p>

                <p className="text-gray-600 text-base leading-relaxed mb-6" style={{color: '#fff'}}>
                    Your privacy matters to us. This policy explains what data TutorMe collects, how we use it, and your rights as a user.
                </p>

                <h2 className="text-xl font-bold text-gray-800 mb-3 [text-shadow:_4px_4px_0_rgb(0_0_0_)]" style={{ color: '#fff' }}>1. Information We Collect</h2>
                <p className="text-gray-600 text-base leading-relaxed mb-4" style={{color: '#fff'}}>
                    We collect information that you provide directly when using the platform. This may include your name, email address, profile information, academic interests, skills, profile picture, and any content you create such as posts, comments, messages, meeting details, ratings, and reports. If you use Google sign-in, we may also receive basic profile information made available by Google, such as your name, email, and profile image.
                </p>

                <h2 className="text-xl font-bold text-gray-800 mb-3 [text-shadow:_4px_4px_0_rgb(0_0_0_)]" style={{ color: '#fff' }}>2. How We Use Your Information</h2>
                <ul className="list-disc list-inside text-gray-600 text-base leading-relaxed mb-4 space-y-2" style={{color: '#fff'}}>
                    <li>To create and manage user accounts in TutorMe platform</li>
                    <li>To enable peer connections, messaging, and meeting scheduling</li>
                    <li>To display posts, comments, ratings, and notifications</li>
                    <li>To support moderation and administration of the platform</li>
                </ul>

                <h2 className="text-xl font-bold text-gray-800 mb-3 [text-shadow:_4px_4px_0_rgb(0_0_0_)]" style={{ color: '#fff' }} >3. Data Sharing</h2>
                <p className="text-gray-600 text-base leading-relaxed mb-4" style={{color: '#fff'}}>
                    We do not sell your personal data to third parties. Some profile information and content you choose to share may be visible to other authenticated users of the platform. Data may also be processed by third-party service providers only where necessary to support platform functionality, such as authentication, database hosting, cloud storage, or file upload services.
                </p>

                <h2 className="text-xl font-bold text-gray-800 mb-3 [text-shadow:_4px_4px_0_rgb(0_0_0_)]" style={{ color: '#fff' }}>4. Data Retention</h2>
                <p className="text-gray-600 text-base leading-relaxed mb-4" style={{color: '#fff'}}>
                    We do not sell your personal data to third parties. Some profile information and content you choose to share may be visible to other authenticated users of the platform. Data may also be processed by third-party service providers only where necessary to support platform functionality, such as authentication, database hosting, cloud storage, or file upload services.
                </p>

                <h2 className="text-xl font-bold text-gray-800 mb-3 [text-shadow:_4px_4px_0_rgb(0_0_0_)]" style={{ color: '#fff' }}>5. Security</h2>
                <p className="text-gray-600 text-base leading-relaxed mb-4" style={{color: '#fff'}}>
                    Reasonable security measures are used to protect user data, including password hashing, token-based authentication, protected routes, and secure communication mechanisms. However, no online system can guarantee complete security, so users should also take care to protect their login credentials.
                </p>

                <h2 className="text-xl font-bold text-gray-800 mb-3 [text-shadow:_4px_4px_0_rgb(0_0_0_)]" style={{ color: '#fff' }}>6. Your Rights</h2>
                <p className="text-gray-600 text-base leading-relaxed mb-4" style={{color: '#fff'}}>
                    You may have the right to access, update, or request deletion of your personal data, depending on applicable data protection rules. You may also request corrections to inaccurate profile information.
                </p>

                <h2 className="text-xl font-bold text-gray-800 mb-3 [text-shadow:_4px_4px_0_rgb(0_0_0_)]" style={{ color: '#fff' }}>7. Contact</h2>
                <p className="text-gray-600 text-base leading-relaxed mb-6" style={{color: '#fff'}}>
                    If you have questions about this privacy policy or how your data is used, you can contact the project owner or system administrator through the platform.
                </p>

                <div className="mt-8 pt-6 border-t border-gray-100 text-sm text-gray-400">
                    Made with love by <a href='https://github.com/devhatabich'>@devhatabich</a>
                </div>
            </div>
        </div>
    )
}

export default Privacy
