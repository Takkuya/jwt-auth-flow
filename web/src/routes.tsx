import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Users } from './pages/Users'

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/users" element={<Users />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}
