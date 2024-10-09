import React, { useEffect, useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
const url = import.meta.env.VITE_LOGIN;

export function Login() {
    const navigate = useNavigate();
    const [formdata, setformdata] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState(""); // New state for error handling

    useEffect(() => {
        const token = localStorage.getItem('jwt_token');
        const check_jwt = async () => {
            if (token) {
                try {
                    const res = await fetch(url, {
                        method: "GET",
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        }
                    });
                    if (res.ok) {
                        const ans_res = await res.json();
                        if (ans_res.isregistered) {
                            navigate('/profile');
                        }
                    }
                } catch (err) {
                    console.log("User needs to login");
                }
            }
        };

        check_jwt();
    }, [navigate]);

    async function hitting(data) {
        try {
            console.log(data);
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: data.username, password: data.password })
            });
    
            if (!response.ok) {
                const errorData = await response.json(); // Attempt to get JSON error response
                throw new Error(errorData.message || "Login failed"); // Use specific error message if available
            }
    
            const ans = await response.json(); 
            localStorage.setItem('jwt_token', ans.jwt_token); 
            navigate('/profile'); 
        } catch (err) {
            setError(err.message); // Set error message for display
            console.log(err);
        }
    }
    

    function handlesubmit(e) {
        e.preventDefault();
        hitting(formdata);
        setformdata({ username: "", password: "" });
    }

    function handlechange(e) {
        const { name, value } = e.target;
        setformdata(prev => ({ ...prev, [name]: value }));
    }

    return (
        <div className="flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-center mb-6">Log in</h2>
                {error && <p className="text-red-500 text-center">{error}</p>} {/* Display error message */}
                <form onSubmit={handlesubmit}>
                    <div className="space-y-4">
                        <input
                            onChange={handlechange}
                            name="username"
                            value={formdata.username}
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                            placeholder="Email/Username"
                            required
                        />
                        <input
                            onChange={handlechange}
                            name="password"
                            value={formdata.password}
                            type="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                            placeholder="Password"
                            required
                        />
                        <p className="text-xs text-gray-600">Password must be at least 6 characters</p>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-600 transition duration-300"
                        >
                            Log in
                        </button>
                    </div>
                    <div className="my-4 text-center">
                        <p className="text-gray-500">or</p>
                    </div>
                    <div className="space-y-2">
                        <button type="button" className="bg-red-500 text-white py-2 px-4 rounded-lg w-full hover:bg-red-600 transition duration-300">
                            Log in with Gmail
                        </button>
                        <button type="button" className="bg-green-500 text-white py-2 px-4 rounded-lg w-full hover:bg-green-600 transition duration-300">
                            Log in with mobile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
