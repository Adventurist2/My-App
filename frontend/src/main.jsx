import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Errorpage from './errorpage.jsx'

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet,
  Link
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path = "/" element = {<Layout/>} errorElement = {<Errorpage/>} >
    
    </Route>
    <Route path="/*" element={<App />}  />
    </> 
  )
)

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-500 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold">Welcome to My App</h1>
      </header>
      <nav className="bg-gray-800 text-white p-4">
        <ul className="flex space-x-4">
          <li>
            <Link to="/signup" className="hover:underline">Sign up</Link>
          </li>
          <li>
            <Link to="/login" className="hover:underline">Login</Link>
          </li>
        </ul>
      </nav>
      <main className="flex-grow p-4">
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2024 My App. All rights reserved.</p>
      </footer>
    </div>
  );
}


createRoot(document.getElementById('root')).render(
    <RouterProvider router = {router}/>
)
 