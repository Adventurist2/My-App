import { useState } from 'react';
import Sidebar from './sidebar';
import Mainbar from './Mainbar';

export default function Profile() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    return (
        <div className={` w-screen h-screen flex transition-colors duration-300`}>
            <Sidebar toggleDarkMode={toggleDarkMode} />
            <Mainbar isDarkMode={isDarkMode} />
        </div>
    );
}
