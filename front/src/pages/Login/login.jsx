import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GoogleLoginComp from '../../components/GoogleLogin/googleLoginComp'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'

const Login = (props) => {
    const navigate = useNavigate();
    const [loginField, setLoginField] = useState({ email: '', password: '' })

    useEffect(() => {
        if (sessionStorage.getItem('auth_error')) {
            sessionStorage.removeItem('auth_error');
            toast.error('Session expired. Please log in again.');
        }
    }, []);

    const onChangeInput = (event, key) => {
        setLoginField({ ...loginField, [key]: event.target.value })
    }

    const handleLogin = async () => {
        if (loginField.email.trim().length === 0 || loginField.password.trim().length === 0) {
            return toast.error('Please fill all credentials')
        }
        await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, loginField, { withCredentials: true })
            .then((res) => {
                props.changeLoginValue(true);
                localStorage.setItem('isLogin', 'true');
                localStorage.setItem('userInfo', JSON.stringify(res.data.userExist));
                navigate(res.data.userExist?.isAdmin ? '/admin' : '/feeds');
            })
            .catch(err => toast.error(err?.response?.data?.error))
    }

    return (
        <div className='min-h-[80vh] flex flex-col items-center justify-center py-10 px-4' style={{ backgroundColor: '#f0f4f1' }}>
            <div className='w-full max-w-sm bg-white rounded-2xl shadow-lg p-8'>
                <div className="mb-6">
                    <div className="flex items-center gap-2.5 mb-4">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center shadow-sm overflow-hidden" style={{ backgroundColor: '#fff' }}>
                            <img className="p-0.5 w-full h-full" src={'https://m3-uploads.s3.eu-west-1.amazonaws.com/favicon.webp'}></img>
                        </div>
                        <span className="font-bold text-xl tracking-tight" style={{ color: '#435465' }}>TutorMe</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Sign in</h1>
                    <p className="text-sm text-gray-500 mt-1">Welcome back!</p>
                </div>

                <div className='mb-4 rounded-full overflow-hidden border border-gray-200 transition-colors'>
                    <GoogleLoginComp changeLoginValue={props.changeLoginValue} />
                </div>

                <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1 border-t border-gray-200" />
                    <span className="text-xs text-gray-400 font-medium">or continue with email</span>
                    <div className="flex-1 border-t border-gray-200" />
                </div>

                <div className='flex flex-col gap-4'>
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
                        <input
                            type="text"
                            value={loginField.email}
                            onChange={(e) => onChangeInput(e, 'email')}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all"
                            style={{ '--tw-ring-color': '#435465' }}
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Password</label>
                        <input
                            type="password"
                            value={loginField.password}
                            onChange={(e) => onChangeInput(e, 'password')}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        onClick={handleLogin}
                        className="w-full py-2.5 px-4 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90 mt-1 up-btn-glow "
                        style={{ backgroundColor: '#435465' }}
                    >
                        Sign In
                    </button>
                </div>
            </div>

            <p className="mt-5 text-sm text-gray-500">
                New here?{' '}
                <Link to='/signUp' className="font-semibold hover:underline" style={{ color: '#435465' }}>
                    Create an account
                </Link>
            </p>
            <ToastContainer />
        </div>
    )
}

export default Login
