import React, { useState } from 'react';
import './App.css';
import hamburgerIcon from './assets/hamburger.svg';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true); 
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const signout=(prop)=>{
    localStorage.removeItem('jwt_token');;
    navigate('/login');
  }
  return (
    <div className={`sidebar bg-white h-screen flex flex-col relative shadow-lg transition-all duration-300 ease-in-out ${isOpen ? 'w-1/5' : 'w-16'}`}>
      
      <nav className="w-full bg-blue-600 h-16 flex items-center justify-start p-4">
        <button onClick={toggleSidebar} className="focus:outline-none">
          <img className="w-6 h-6" src={hamburgerIcon} alt="hamburger menu" /> 
        </button>
      </nav>

      <div className={`w-full bg-blue-600 h-10 mt-4 text-center text-white font-semibold transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        Todos
      </div>

      <div className={`flex flex-col gap-4 mt-auto mb-8 p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div onClick={signout} className="w-full bg-blue-600 h-10 flex items-center justify-center text-white hover:cursor-pointer">Sign Out</div>
      </div>
    </div>
  );
}
