import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const SocialConnectModal = ({ platform, points, onConnect, onClose }) => {
    const [connecting, setConnecting] = useState(false);

    const handleConnect = async () => {
        setConnecting(true);
        try {
            const field = platform === 'linkedin' ? 'linkedinConnected' : 'twitterConnected';
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/auth/update`, { user: { [field]: true } }, { withCredentials: true });
            const stored = localStorage.getItem('userInfo');
            if (stored) {
                const parsed = JSON.parse(stored);
                parsed[field] = true;
                localStorage.setItem('userInfo', JSON.stringify(parsed));
            }
            onConnect();
        } catch {
            onConnect();
        } finally {
            setConnecting(false);
        }
    };

    const platformName = platform === 'linkedin' ? 'LinkedIn' : 'Twitter';
    const color = platform === 'linkedin' ? '#0A66C2' : '#1DA1F2';
    const label = platform === 'linkedin' ? 'in' : 'X';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white shrink-0" style={{ backgroundColor: color }}>{label}</span>
                    <div>
                        <h3 className="font-bold text-gray-900 text-base">Connect {platformName}</h3>
                        <p className="text-xs text-gray-500">Share your achievements with your network</p>
                    </div>
                </div>
                <div className="bg-gray-50 rounded-xl px-4 py-3 mb-4">
                    <p className="text-sm text-gray-700 italic">
                        "Hey! I have gained <strong>{points}</strong> points! Join me in TutorMe to grow together. "
                    </p>
                    <p className="text-xs text-gray-400 mt-1">This is the text that will be pre-filled when you share</p>
                </div>
                <p className="text-xs text-gray-500 mb-4">
                    Connecting will open {platformName} with this post pre-filled. You can edit or cancel it before posting.
                </p>
                <div className="flex gap-3">
                    <button onClick={onClose} className="flex-1 px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer">
                        Cancel
                    </button>
                    <button
                        onClick={handleConnect}
                        disabled={connecting}
                        className="flex-1 px-4 py-2 text-sm font-semibold text-white rounded-lg disabled:opacity-50 cursor-pointer hover:opacity-90"
                        style={{ backgroundColor: color }}
                    >
                        {connecting ? 'Connecting...' : `Connect & Share`}
                    </button>
                </div>
            </div>
        </div>
    );
};

const Footer = () => {
    const [user, setUser] = useState(null);
    const [connectModal, setConnectModal] = useState(null); // 'linkedin' | 'twitter' | null

    useEffect(() => {
        const stored = localStorage.getItem('userInfo');
        if (stored) setUser(JSON.parse(stored));
    }, []);

    const getShareText = () => `Hey! I have gained ${user?.points ?? 0} points! Join me in TutorMe to grow together.`;

    const openLinkedIn = () => {
        const text = getShareText();
        window.open(`https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(text)}`, '_blank');
    };

    const openTwitter = () => {
        const text = getShareText();
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
    };

    const handleLinkedInClick = () => {
        if (!user) return window.open('https://www.linkedin.com', '_blank');
        if (!user.linkedinConnected) {
            setConnectModal('linkedin');
        } else {
            openLinkedIn();
        }
    };

    const handleTwitterClick = () => {
        if (!user) return window.open('https://www.twitter.com', '_blank');
        if (!user.twitterConnected) {
            setConnectModal('twitter');
        } else {
            openTwitter();
        }
    };

    const handleConnected = () => {
        const stored = localStorage.getItem('userInfo');
        if (stored) setUser(JSON.parse(stored));
        setConnectModal(null);
        if (connectModal === 'linkedin') openLinkedIn();
        else openTwitter();
    };

    return (
        <footer className="w-full bg-white border-t border-gray-200">
            <div className="px-5 md:px-16 xl:px-32 py-10">

                {/* Top grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">

                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-7 h-7 rounded-full flex items-center justify-center shadow-sm" style={{ backgroundColor: '#fff', borderRadius: '50%', borderColor: '#435465'}}>
                                <img className="p-0.5 w-full h-full" src={'https://m3-uploads.s3.eu-west-1.amazonaws.com/favicon.webp'}></img>
                            </div>
                            <span className="font-bold text-base" style={{ color: '#435465' }}>TutorMe</span>
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                            A peer tutoring platform for university students. Ask for help, schedule sessions, help and learn together.
                        </p>
                        <div className="mt-4 flex gap-3">
                            <button
                                onClick={handleLinkedInClick}
                                title={user ? (user.linkedinConnected ? 'Share on LinkedIn' : 'Connect LinkedIn') : 'Visit LinkedIn'}
                                className="relative w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors hover:bg-white up-btn-glow group"
                            >
                                <span className="text-xs font-bold text-gray-400 group-hover:text-gray-600">in</span>
                                {user && user.linkedinConnected && (
                                    <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white" style={{ backgroundColor: '#0A66C2' }} />
                                )}
                            </button>
                            <button
                                onClick={handleTwitterClick}
                                title={user ? (user.twitterConnected ? 'Share on Twitter' : 'Connect Twitter') : 'Visit Twitter'}
                                className="relative w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors hover:bg-white up-btn-glow group"
                            >
                                <span className="text-xs font-bold text-gray-400 group-hover:text-gray-600">X</span>
                                {user && user.twitterConnected && (
                                    <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white" style={{ backgroundColor: '#1DA1F2' }} />
                                )}
                            </button>
                        </div>
                        {user && (
                            <p className="text-xs text-gray-400 mt-2">
                                {(!user.linkedinConnected || !user.twitterConnected)
                                    ? 'Click an icon to connect & share your points'
                                    : 'Click to share your achievements'}
                            </p>
                        )}
                    </div>

                    {/* Community */}
                    <div>
                        <h4 className="font-semibold text-gray-800 text-sm mb-4">Community</h4>
                        <ul className="flex flex-col gap-2.5">
                            <li><Link to="/signUp" className="text-sm text-gray-500 hover:text-gray-800 transition-colors up-link">Join Community</Link></li>
                            <li><Link to="/myNetwork" className="text-sm text-gray-500 hover:text-gray-800 transition-colors up-link">Peers</Link></li>
                            <li><Link to="/notification" className="text-sm text-gray-500 hover:text-gray-800 transition-colors up-link">Notifications</Link></li>
                            <li><Link to="/feeds" className="text-sm text-gray-500 hover:text-gray-800 transition-colors up-link">Feed</Link></li>
                        </ul>
                    </div>

                    {/* Platform */}
                    <div>
                        <h4 className="font-semibold text-gray-800 text-sm mb-4">Platform</h4>
                        <ul className="flex flex-col gap-2.5">
                            <li><Link to="/messages" className="text-sm text-gray-500 hover:text-gray-800 transition-colors up-link">Messages</Link></li>
                            <li><Link to="/resume" className="text-sm text-gray-500 hover:text-gray-800 transition-colors up-link">Sessions</Link></li>
                            <li><Link to="/myNetwork" className="text-sm text-gray-500 hover:text-gray-800 transition-colors up-link">Discover Tutors</Link></li>
                            <li><Link to="/feeds" className="text-sm text-gray-500 hover:text-gray-800 transition-colors up-link">Share Posts</Link></li>
                        </ul>
                    </div>

                    {/* About */}
                    <div>
                        <h4 className="font-semibold text-gray-800 text-sm mb-4">About</h4>
                        <ul className="flex flex-col gap-2.5">
                            <li><Link to="/about" className="text-sm text-gray-500 hover:text-gray-800 transition-colors up-link">About TutorMe</Link></li>
                            <li><Link to="/privacy" className="text-sm text-gray-500 hover:text-gray-800 transition-colors up-link">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="text-sm text-gray-500 hover:text-gray-800 transition-colors up-link">Terms of Use</Link></li>
                            <li><Link to="/cookies" className="text-sm text-gray-500 hover:text-gray-800 transition-colors up-link">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
                    <p className="text-xs text-gray-400">Made with love by <a href='https://github.com/devhatabich'>@devhatabich</a> &mdash; TutorMe &copy; {new Date().getFullYear()}</p>
                    <p className="text-xs text-gray-400">Building community together.</p>
                </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-100 text-sm text-gray-400">

            </div>

            {connectModal && (
                <SocialConnectModal
                    platform={connectModal}
                    points={user?.points ?? 0}
                    onConnect={handleConnected}
                    onClose={() => setConnectModal(null)}
                />
            )}
        </footer>
    );
}

export default Footer
