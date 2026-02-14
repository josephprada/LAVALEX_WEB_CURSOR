import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LandingPage } from './components/LandingPage'
import { AdminPage } from './pages/AdminPage'
import { NotFound404 } from './pages/NotFound404'
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute'
import './styles/mixins.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
