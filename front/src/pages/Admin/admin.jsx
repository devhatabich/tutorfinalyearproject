import React, { useState, useEffect, useCallback } from 'react'
import Avatar from '../../components/Avatar/avatar'
import DashboardIcon from '@mui/icons-material/Dashboard';
import FlagIcon from '@mui/icons-material/Flag';
import GroupIcon from '@mui/icons-material/Group';
import ArticleIcon from '@mui/icons-material/Article';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PostAddIcon from '@mui/icons-material/PostAdd';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// Sidebar nav items
const NAV = [
    { key: 'dashboard', label: 'Dashboard', icon: <DashboardIcon sx={{ fontSize: 20 }} /> },
    { key: 'reports',   label: 'Reports',   icon: <FlagIcon sx={{ fontSize: 20 }} /> },
    { key: 'users',     label: 'Users',     icon: <GroupIcon sx={{ fontSize: 20 }} /> },
    { key: 'posts',     label: 'Posts',     icon: <ArticleIcon sx={{ fontSize: 20 }} /> },
];

const REPORT_TABS = ['Messages', 'Posts', 'Users'];

// Shared helpers
const StatCard = ({ icon, label, value, sub }) => (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: '#435465' }}>
            {icon}
        </div>
        <div>
            <div className="text-2xl font-bold text-gray-900">{value ?? '—'}</div>
            <div className="text-sm text-gray-500 leading-tight">{label}</div>
            {sub && <div className="text-xs text-gray-700 font-medium mt-0.5">{sub}</div>}
        </div>
    </div>
);

// Dashboard section
const Dashboard = ({ stats, reports, onNavigate }) => (
    <div className="p-6 space-y-6">
        <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Dashboard</h2>
            <p className="text-sm text-blue-200">Overview of platform activity</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <StatCard
                icon={<PeopleAltIcon sx={{ color: '#435465', fontSize: 24 }} />}
                label="Total Users"
                value={stats.totalUsers}
                sub={stats.newUsersThisWeek > 0 ? `+${stats.newUsersThisWeek} this week` : null}
            />
            <StatCard
                icon={<PostAddIcon sx={{ color: '#435465', fontSize: 24 }} />}
                label="Total Posts"
                value={stats.totalPosts}
            />
            <StatCard
                icon={<EventNoteIcon sx={{ color: '#435465', fontSize: 24 }} />}
                label="Total Meetings"
                value={stats.totalMeetings}
            />
            <StatCard
                icon={<ReportProblemIcon sx={{ color: stats.pendingReports > 0 ? '#dc2626' : '#435465', fontSize: 24 }} />}
                label="Pending Reports"
                value={stats.pendingReports}
                sub={stats.pendingReports > 0 ? 'Needs attention' : null}
            />
        </div>

        {/* Recent reports */}
        {reports.length > 0 && (
            <div>
                <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Recent Reports</h3>
                    <button
                        onClick={() => onNavigate('reports')}
                        className="text-sm font-medium hover:underline cursor-pointer"
                        style={{ color: '#435465' }}
                    >
                        View all →
                    </button>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100 overflow-hidden">
                    {reports.slice(0, 5).map(r => (
                        <div key={r._id} className="flex items-center gap-3 px-5 py-3">
                            <Avatar src={r.reporter?.profilePic} name={r.reporter?.f_name} size="sm" className="w-8 h-8 shrink-0" />
                            <div className="flex-1 min-w-0">
                                <span className="text-sm text-gray-700">
                                    <strong>{r.reporter?.f_name}</strong> reported a <strong>{r.reportType}</strong>
                                </span>
                                {r.reason && <span className="text-xs text-gray-400 ml-2">"{r.reason}"</span>}
                            </div>
                            <span className="text-xs text-gray-400 shrink-0">{new Date(r.createdAt).toLocaleDateString()}</span>
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>
);

// Reports section
const Reports = ({ reports, onMarkRead, onMarkReviewed, onFreezeUser }) => {
    const [tab, setTab] = useState('Messages');

    const tabReports = reports.filter(r =>
        tab === 'Messages' ? r.reportType === 'message'
        : tab === 'Posts'  ? r.reportType === 'post'
        : r.reportType === 'user'
    );
    const counts = {
        Messages: reports.filter(r => r.reportType === 'message').length,
        Posts:    reports.filter(r => r.reportType === 'post').length,
        Users:    reports.filter(r => r.reportType === 'user').length,
    };

    return (
        <div className="p-6 space-y-4">
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">Reports</h2>
                <p className="text-sm text-gray-500">Review and action reported content</p>
            </div>
            {/* Sub-tabs */}
            <div className="flex border-b border-gray-200">
                {REPORT_TABS.map(t => (
                    <button
                        key={t}
                        onClick={() => setTab(t)}
                        className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold border-b-2 transition-colors cursor-pointer"
                        style={tab === t ? { color: '#435465', borderColor: '#435465' } : { color: '#6b7280', borderColor: 'transparent' }}
                    >
                        {t}
                        {counts[t] > 0 && (
                            <span className="text-xs bg-red-100 text-red-600 rounded-full px-2 py-0.5 font-bold">{counts[t]}</span>
                        )}
                    </button>
                ))}
            </div>

            {tabReports.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                    <CheckCircleOutlineIcon sx={{ fontSize: 48, color: '#9ca3af', marginBottom: 1 }} />
                    <p className="text-sm font-medium">No pending reports</p>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {tabReports.map(report => (
                        <div key={report._id} className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-start gap-4">
                            <div className="flex items-center gap-3 shrink-0">
                                <Avatar src={report.reporter?.profilePic} name={report.reporter?.f_name} size="sm" className="w-9 h-9" />
                                <div>
                                    <div className="text-xs font-semibold text-gray-700">{report.reporter?.f_name}</div>
                                    <div className="text-xs text-gray-400">reported</div>
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                {tab === 'Messages' && (
                                    <>
                                        <div className="text-xs text-gray-500 mb-1">Message from <strong>{report.targetSnapshot?.senderName || 'Unknown'}</strong></div>
                                        {report.targetSnapshot?.messageText && (
                                            <div className="text-sm text-gray-800 bg-gray-50 rounded-xl px-3 py-2 mb-2">{report.targetSnapshot.messageText}</div>
                                        )}
                                        {report.targetSnapshot?.picture && (
                                            <img src={report.targetSnapshot.picture} alt="reported" className="h-28 rounded-xl object-cover border border-gray-200" />
                                        )}
                                        {!report.targetSnapshot?.messageText && !report.targetSnapshot?.picture && (
                                            <div className="text-sm text-gray-400 italic">[no content]</div>
                                        )}
                                    </>
                                )}
                                {tab === 'Posts' && (
                                    <>
                                        <div className="text-xs text-gray-500 mb-1">Post by <strong>{report.targetSnapshot?.authorName || 'Unknown'}</strong></div>
                                        {report.targetSnapshot?.desc && (
                                            <div className="text-sm text-gray-800 bg-gray-50 rounded-xl px-3 py-2 mb-2 line-clamp-2">{report.targetSnapshot.desc}</div>
                                        )}
                                        {report.targetSnapshot?.imageLink && (
                                            <img src={report.targetSnapshot.imageLink} alt="" className="h-20 rounded-xl object-cover border border-gray-200" />
                                        )}
                                    </>
                                )}
                                {tab === 'Users' && (
                                    <div>
                                        <div className="text-sm font-semibold text-gray-900">{report.targetSnapshot?.name}</div>
                                        <div className="text-xs text-gray-500">{report.targetSnapshot?.email}</div>
                                        {report.targetSnapshot?.headline && <div className="text-xs text-gray-400 mt-0.5">{report.targetSnapshot.headline}</div>}
                                    </div>
                                )}
                                {report.reason && <div className="text-xs text-gray-400 mt-2 italic">Reason: "{report.reason}"</div>}
                                <div className="text-xs text-gray-400 mt-1">{new Date(report.createdAt).toLocaleString()}</div>
                            </div>
                            <div className="flex flex-col gap-2 shrink-0">
                                <button
                                    onClick={() => onMarkRead(report._id)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                                >
                                    <CheckCircleOutlineIcon sx={{ fontSize: 14 }} /> Mark as Read
                                </button>
                                {tab !== 'Users' ? (
                                    <button
                                        onClick={() => onMarkReviewed(report._id, report.reportType)}
                                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 border border-red-200 rounded-lg hover:bg-red-50 cursor-pointer"
                                    >
                                        <DeleteForeverIcon sx={{ fontSize: 14 }} /> Remove Content
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => onFreezeUser(report.targetId, report.targetSnapshot?.name)}
                                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white rounded-lg cursor-pointer hover:opacity-90"
                                        style={{ backgroundColor: '#dc2626' }}
                                    >
                                        <PersonOffIcon sx={{ fontSize: 14 }} /> Freeze Account
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

//  Users section
const Users = ({ onFreezeUser }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/admin/users`, { withCredentials: true })
            .then(res => setUsers(res.data.users || []))
            .catch(() => toast.error('Could not load users'))
            .finally(() => setLoading(false));
    }, []);

    const filtered = search.trim()
        ? users.filter(u => u.f_name?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase()))
        : users;

    return (
        <div className="p-6 space-y-4">
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">Users</h2>
                <p className="text-sm text-gray-500">{users.length} total users</p>
            </div>
            <div className="relative max-w-sm">
                <SearchIcon sx={{ fontSize: 18, color: '#9ca3af' }} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search by name or email..."
                    className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-sm outline-none focus:border-gray-400"
                />
            </div>
            {loading ? (
                <div className="flex justify-center py-16"><div className="w-7 h-7 border-2 border-gray-200 border-t-green-800 rounded-full animate-spin" /></div>
            ) : (
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                    {filtered.length === 0 ? (
                        <div className="text-center py-12 text-gray-400 text-sm">No users found</div>
                    ) : filtered.map((user, i) => (
                        <div key={user._id} className={`flex items-center gap-4 px-5 py-3 ${i !== filtered.length - 1 ? 'border-b border-gray-100' : ''}`}>
                            <Avatar src={user.profilePic} name={user.f_name} size="sm" className="w-9 h-9 shrink-0" />
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                                    {user.f_name}
                                    {user.isAdmin && (
                                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Admin</span>
                                    )}
                                </div>
                                <div className="text-xs text-gray-400 truncate">{user.email}</div>
                                {user.headline && <div className="text-xs text-gray-400 truncate">{user.headline}</div>}
                            </div>
                            <div className="flex items-center gap-3 shrink-0 text-xs text-gray-400">
                                <span>{user.friends?.length ?? 0} friends</span>
                                <span>{user.points ?? 0} pts</span>
                            </div>
                            {!user.isAdmin && (
                                <button
                                    onClick={() => onFreezeUser(user._id, user.f_name, () => setUsers(prev => prev.filter(u => u._id !== user._id)))}
                                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-red-600 border border-red-200 rounded-lg hover:bg-red-50 cursor-pointer shrink-0"
                                >
                                    <PersonOffIcon sx={{ fontSize: 14 }} /> Freeze
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// Posts section
const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/admin/posts`, { withCredentials: true })
            .then(res => setPosts(res.data.posts || []))
            .catch(() => toast.error('Could not load posts'))
            .finally(() => setLoading(false));
    }, []);

    const handleDelete = async (postId) => {
        if (!window.confirm('Permanently delete this post?')) return;
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/posts/${postId}`, { withCredentials: true });
            setPosts(prev => prev.filter(p => p._id !== postId));
            toast.success('Post deleted');
        } catch {
            toast.error('Could not delete post');
        }
    };

    return (
        <div className="p-6 space-y-4">
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">Posts</h2>
                <p className="text-sm text-gray-500">{posts.length} total posts</p>
            </div>
            {loading ? (
                <div className="flex justify-center py-16"><div className="w-7 h-7 border-2 border-gray-200 border-t-green-800 rounded-full animate-spin" /></div>
            ) : (
                <div className="flex flex-col gap-3">
                    {posts.length === 0 ? (
                        <div className="text-center py-12 text-gray-400 text-sm">No posts yet</div>
                    ) : posts.map(post => (
                        <div key={post._id} className="bg-white border border-gray-200 rounded-2xl p-4 flex gap-4 items-start">
                            <Avatar src={post.user?.profilePic} name={post.user?.f_name} size="sm" className="w-9 h-9 shrink-0" />
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-semibold text-gray-900">{post.user?.f_name}</div>
                                <div className="text-xs text-gray-400 mb-1">{new Date(post.createdAt).toLocaleString()}</div>
                                {post.desc && <p className="text-sm text-gray-700 line-clamp-2">{post.desc}</p>}
                                {post.imageLink && (
                                    <img src={post.imageLink} alt="" className="mt-2 h-24 rounded-xl object-cover border border-gray-200" />
                                )}
                                <div className="text-xs text-gray-400 mt-2">{post.likes?.length ?? 0} likes · {post.comments ?? 0} comments</div>
                            </div>
                            <button
                                onClick={() => handleDelete(post._id)}
                                className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-red-600 border border-red-200 rounded-lg hover:bg-red-50 cursor-pointer shrink-0"
                            >
                                <DeleteForeverIcon sx={{ fontSize: 14 }} /> Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// Main Admin component
const Admin = () => {
    const [section, setSection] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [stats, setStats] = useState({ totalUsers: 0, totalPosts: 0, pendingReports: 0, totalMeetings: 0, newUsersThisWeek: 0 });
    const [reports, setReports] = useState([]);
    const [adminUser, setAdminUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const stored = localStorage.getItem('userInfo');
        const user = stored ? JSON.parse(stored) : null;
        if (!user?.isAdmin) { navigate('/feeds'); return; }
        setAdminUser(user);
        fetchStats();
        fetchReports();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/stats`, { withCredentials: true });
            setStats(res.data);
        } catch { /* ignore */ }
    };

    const fetchReports = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/reports`, { withCredentials: true });
            setReports(res.data.reports || []);
        } catch { toast.error('Could not load reports'); }
    };

    const handleMarkRead = async (id) => {
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/reports/${id}/read`, {}, { withCredentials: true });
            setReports(prev => prev.filter(r => r._id !== id));
            setStats(s => ({ ...s, pendingReports: Math.max(0, s.pendingReports - 1) }));
            toast.success('Marked as read');
        } catch { toast.error('Could not update report'); }
    };

    const handleMarkReviewed = async (id, reportType) => {
        if (!window.confirm(`This will permanently delete the reported ${reportType}. Continue?`)) return;
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/reports/${id}/reviewed`, {}, { withCredentials: true });
            setReports(prev => prev.filter(r => r._id !== id));
            setStats(s => ({ ...s, pendingReports: Math.max(0, s.pendingReports - 1) }));
            toast.success('Content removed');
        } catch { toast.error('Could not process report'); }
    };

    const handleFreezeUser = async (userId, userName, onSuccess) => {
        if (!window.confirm(`Freeze ${userName}'s account? This permanently deletes their account, posts, and messages.`)) return;
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/user/${userId}/freeze`, { withCredentials: true });
            setReports(prev => prev.filter(r => !(r.reportType === 'user' && r.targetId === userId)));
            setStats(s => ({ ...s, totalUsers: Math.max(0, s.totalUsers - 1) }));
            onSuccess && onSuccess();
            toast.success(`${userName}'s account removed`);
        } catch { toast.error('Could not freeze account'); }
    };

    const handleLogout = () => {
        axios.post(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {}, { withCredentials: true }).finally(() => {
            localStorage.clear();
            window.location.href = '/login';
        });
    };

    const navigate_section = (key) => { setSection(key); setSidebarOpen(false); };

    const pendingCount = reports.length;

    // Sidebar content
    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            {/* Brand */}
            <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
                    <span className="font-bold text-sm" style={{ color: '#435465' }}>A</span>
                </div>
                <div>
                    <div className="font-bold text-white text-sm">TutorMe</div>
                    <div className="text-xs text-green-300">Admin Panel</div>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {NAV.map(item => (
                    <button
                        key={item.key}
                        onClick={() => navigate_section(item.key)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer relative"
                        style={section === item.key
                            ? { backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff' }
                            : { color: 'rgba(255,255,255,0.65)' }}
                    >
                        {item.icon}
                        {item.label}
                        {item.key === 'reports' && pendingCount > 0 && (
                            <span className="ml-auto text-xs bg-red-500 text-white rounded-full px-2 py-0.5 font-bold">{pendingCount}</span>
                        )}
                    </button>
                ))}
            </nav>

            {/* Admin user footer */}
            <div className="px-4 py-4 border-t border-white/10">
                <div className="flex items-center gap-3 mb-3">
                    <Avatar src={adminUser?.profilePic} name={adminUser?.f_name} size="sm" className="w-8 h-8 shrink-0" />
                    <div className="min-w-0">
                        <div className="text-sm font-semibold text-white truncate">{adminUser?.f_name}</div>
                        <div className="text-xs text-green-300">Administrator</div>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium cursor-pointer transition-colors"
                    style={{ color: 'rgba(255,255,255,0.65)' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}
                >
                    <LogoutIcon sx={{ fontSize: 18 }} /> Logout
                </button>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 z-[100] flex bg-gray-50 overflow-hidden">
            {/* Desktop sidebar */}
            <aside
                className="hidden md:flex flex-col w-64 shrink-0 h-full"
                style={{ backgroundColor: '#435465' }}
            >
                <SidebarContent />
            </aside>

            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <>
                    <div
                        className="fixed inset-0 z-[110] bg-black/50 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                    <aside
                        className="fixed top-0 left-0 h-full w-64 z-[120] flex flex-col md:hidden"
                        style={{ backgroundColor: '#435465' }}
                    >
                        <SidebarContent />
                    </aside>
                </>
            )}

            {/*  Main area  */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Mobile top bar */}
                <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 shrink-0">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer"
                        style={{ color: '#435465' }}
                    >
                        <MenuIcon />
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#435465' }}>
                            <span className="text-white font-bold text-xs">A</span>
                        </div>
                        <span className="font-bold text-sm" style={{ color: '#435465' }}>Admin Panel</span>
                    </div>
                    {/*<Avatar src={adminUser?.profilePic} name={adminUser?.f_name} size="xs" className="w-7 h-7" />*/}
                </div>

                {/* Scrollable content */}
                <main className="flex-1 overflow-y-auto">
                    {section === 'dashboard' && (
                        <Dashboard stats={stats} reports={reports} onNavigate={navigate_section} />
                    )}
                    {section === 'reports' && (
                        <Reports
                            reports={reports}
                            onMarkRead={handleMarkRead}
                            onMarkReviewed={handleMarkReviewed}
                            onFreezeUser={(id, name) => handleFreezeUser(id, name, null)}
                        />
                    )}
                    {section === 'users' && (
                        <Users onFreezeUser={handleFreezeUser} />
                    )}
                    {section === 'posts' && (
                        <Posts />
                    )}
                </main>
            </div>

            <ToastContainer />
        </div>
    );
};

export default Admin;
