import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './state/useAuth'
import Viewer from './components/Viewer'
import LoginPage from './pages/Login'
import { Protected } from './components/Protected'

export default function App() {
  const { init, loading } = useAuth()

  useEffect(() => {
    void init()
  }, [init])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/app"
        element={
          <Protected>
            <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
              <Viewer />
            </div>
          </Protected>
        }
      />
      <Route path="*" element={<Navigate to="/app" replace />} />
    </Routes>
  )
}

