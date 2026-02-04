import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import ErrorBoundary from './components/ErrorBoundary'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Browse from './pages/Browse'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const [toastPosition, setToastPosition] = useState(
    typeof window !== 'undefined' && window.innerWidth < 640 ? 'top-center' : 'top-right'
  )

  useEffect(() => {
    const updatePosition = () => {
      setToastPosition(window.innerWidth < 640 ? 'top-center' : 'top-right')
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)
    return () => window.removeEventListener('resize', updatePosition)
  }, [])

  return (
    <ErrorBoundary>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster
          position={toastPosition}
          toastOptions={{
            className: 'toast-base',
            duration: 3500,
            success: {
              className: 'toast-base toast-success',
              icon: '✅',
            },
            error: {
              className: 'toast-base toast-error',
              icon: '❌',
            },
          }}
        />
      </Router>
    </ErrorBoundary>
  )
}

export default App
