import './App.css'
import { useEffect } from 'react'
import { Route, Routes,Navigate } from 'react-router-dom'
import Navbar from './Navbar'
import Homepage from './Pages/Homepage'
import Profile from './Pages/Profile'
import LoginPage from './Pages/LoginPage'
import Signup from './Pages/Signup'
import SettingPage from './Pages/SettingPage'
import { useAuthStore } from './store/useAuthStore'
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'

function App() {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])


  if(isCheckingAuth && !authUser) return(
    <div className='flex justify-center items-center h-screen'>
      <Loader className='animate-spin text-primary' size={50} />
    </div>
  )

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <Homepage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/" />} />
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/setting" element={authUser ? <SettingPage /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
