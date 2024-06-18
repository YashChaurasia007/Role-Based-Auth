import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const login = () => {
    const navigate = useNavigate();
    const [initialvalues, setInitialvalues] = useState({
        password: '',
        email: ''
    });

    function handle_Change(e) {
        setInitialvalues((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }


    const handle_Submit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(initialvalues)
            });
            let result = await res.text();
            if (res.ok) {
                navigate('/dashboard');
            } else {
                toast('Invalid Credentials');
                console.error('Login failed:', res.result);
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div>
            <div>
                <div class="bg-gray-100 flex items-center justify-center h-screen">
                    <div class="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                        <div class="flex justify-center mb-6">
                            <span class="inline-block bg-gray-200 rounded-full p-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4" /></svg>
                            </span>
                        </div>
                        <h2 class="text-xl font-semibold text-center mb-4">Enter your details to Login.</h2>
                        {/* <h2 class="text-gray-600 text-center mb-6">Enter your details to Login.</h2> */}
                        <form>
                            <div class="mb-4">
                                <label for="email" class="block text-gray-700 text-sm font-semibold mb-2">Email Address *</label>
                                <input type="email" id="email" name='email' value={initialvalues.email} onChange={handle_Change} class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="hello@alignui.com" />
                            </div>
                            <div class="mb-4">
                                <label for="password" class="block text-gray-700 text-sm font-semibold mb-2">Password *</label>
                                <input type="password" id="password" name='password' value={initialvalues.password} onChange={handle_Change} class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="••••••••" />
                                <p class="text-gray-600 text-xs mt-4">Register yourself <Link to="/signup" className='text-blue font-bold'>Signup</Link></p>
                            </div>
                            <button onClick={handle_Submit} class="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Login</button>
                        </form>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </div>
    )
}

export default login