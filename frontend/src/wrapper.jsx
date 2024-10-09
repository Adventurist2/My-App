import React, { useState } from 'react';
import './App.css';
import { Signup } from './Signup';
import bgImage from './assets/bgimage.jpg';

function Wrapper({children}) {
  const [count, setCount] = useState(0);

  return (
    <div
      className="relative w-screen h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: `url(${bgImage})` }}  // Use the imported image
    >
      {/* Glassmorphism overlay container */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-md flex items-center justify-center">
        <div className="bg-white/20 backdrop-blur-lg rounded-lg border border-white/20 p-8 max-w-lg w-full mx-4 h-3/4 flex justify-center">
          {children}
        </div>
      </div>
    </div>
    
  );
}

export default Wrapper;
