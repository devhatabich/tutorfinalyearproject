import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GoogleLoginComp from '../../components/GoogleLogin/googleLoginComp'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'

const SignUp = (props) => {
    const navigate = useNavigate()
    const [registerField, setRegisterField] = useState({ email: '', password: '', f_name: '' })

    const handleInputField = (event, key) => {
        setRegisterField({ ...registerField, [key]: event.target.value })
    }

    const handleRegister = async () => {
        if (registerField.email.trim().length === 0 || registerField.password.trim().length === 0 || registerField.f_name.trim().length === 0) {
            return toast.error('Please fill all details.')
        }
        const nameRegex = /^[a-zA-Z][a-zA-Z\s]*$/;
        const emailGmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;
        if (!nameRegex.test(registerField.f_name.trim()))
            return toast.error('Name must contain Latin letters only');
        if (!emailGmailRegex.test(registerField.email.trim()))
            return toast.error('Email must be a valid Gmail address (e.g. you@gmail.com)');
        if (registerField.password.trim().length < 6)
            return toast.error('Password must be at least 6 characters');
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, registerField);
            // Auto-login immediately after registration
            const loginRes = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/login`,
                { email: registerField.email, password: registerField.password },
                { withCredentials: true }
            );
            props.changeLoginValue(true);
            localStorage.setItem('isLogin', 'true');
            localStorage.setItem('userInfo', JSON.stringify(loginRes.data.userExist));
            navigate('/feeds');
        } catch (err) {
            toast.error(err?.response?.data?.error || 'Something went wrong');
        }
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
                    <h1 className="text-2xl font-bold text-gray-900">Create account</h1>
                    <p className="text-sm text-gray-500 mt-1">Join our community today!</p>
                </div>

                <div className='flex flex-col gap-4'>
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Full name</label>
                        <input
                            value={registerField.f_name}
                            onChange={(e) => handleInputField(e, 'f_name')}
                            type="text"
                            maxLength={50}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all"
                            placeholder="Your name"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
                        <input
                            value={registerField.email}
                            onChange={(e) => handleInputField(e, 'email')}
                            type="text"
                            maxLength={100}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all"
                            placeholder="you@gmail.com"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Password</label>
                        <input
                            value={registerField.password}
                            onChange={(e) => handleInputField(e, 'password')}
                            type="password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        onClick={handleRegister}
                        className="w-full py-2.5 px-4 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90 up-btn-glow mt-1"
                        style={{ backgroundColor: '#435465' }}
                    >
                        Create Account
                    </button>
                </div>

                <div className="flex items-center gap-3 my-4">
                    <div className="flex-1 border-t border-gray-200" />
                    <span className="text-xs text-gray-400 font-medium">or sign up with</span>
                    <div className="flex-1 border-t border-gray-200" />
                </div>

                <div className='rounded-full overflow-hidden border border-gray-200 transition-colors hover:bg-white'>
                    <GoogleLoginComp changeLoginValue={props.changeLoginValue} />
                </div>
            </div>

            <p className="mt-5 text-sm text-gray-500">
                Already registered?{' '}
                <Link to={'/login'} className="font-semibold hover:underline" style={{ color: '#435465' }}>
                    Sign in
                </Link>
            </p>
            <ToastContainer />
        </div>
    )
}

export default SignUp
