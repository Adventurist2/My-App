import React, { useState } from 'react';
import './App.css';
import {useNavigate} from 'react-router-dom';
const url = import.meta.env.VITE_SIGNUP;


export function Signup() {
    const navigate = useNavigate();
    const [formdata,setformdata] = useState({
        username: "",
        password : ""
    })
    async function hitting(data){
        try{
            const respone = await fetch(url,
                {
                    method:"POST",
                    headers: {
                        "Content-Type": "application/json",
                        
                    },
                    body: JSON.stringify({ username: data.username,password:data.password })
            });
            if(!respone.ok){
                throw new Error(`Response status:${respone.status}`);
            }
            const ans = await respone.json()
            const token = ans.token;
            localStorage.setItem('jwt_token',token);
            navigate('/profile');
        }
        catch(err){
            console.log(err);
        }
    }
    function handlesubmit(e){
        e.preventDefault();
        hitting(formdata);
        setformdata({username:"",password:""});
    }
    function handlechange(e){
        const {name,value} = e.target;
        setformdata((prev)=>{
            return {...prev,[name]:value}
        });
    }
    return (
        <div className=" flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
                
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
                            Sign up
                        </button>
                    </div>

                    <div className="my-4 text-center">
                        <p className="text-gray-500">or</p>
                    </div>

                    <div className="space-y-2">
                        <button 
                            type="button" 
                            className="bg-red-500 text-white py-2 px-4 rounded-lg w-full hover:bg-red-600 transition duration-300"
                        >
                            Sign up with Gmail
                        </button>
                        <button 
                            type="button" 
                            className="bg-green-500 text-white py-2 px-4 rounded-lg w-full hover:bg-green-600 transition duration-300"
                        >
                            Sign up with mobile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
