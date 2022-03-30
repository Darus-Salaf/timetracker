import { Navigate } from "react-router-dom"

export default function Private({ children }) {
  const auth = localStorage.getItem('token')
  return auth ? children : <Navigate to="/login" />
}
