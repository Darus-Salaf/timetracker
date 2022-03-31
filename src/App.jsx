import Times from "./Times";
import {
  BrowserRouter, Routes, Route
} from 'react-router-dom'
import Login from "./Login";
import Private from './Private'
import { createContext, useEffect, useState } from "react";
import Logout from "./components/Logout";
import Profile from "./Profile";

export const AdminContext = createContext()

export default function App() {

  const [admin, setAdmin] = useState(false)
  let isAdmin = localStorage.getItem('email')

  useEffect(() => {
    if (isAdmin === 'razibahmed@gmail.com') {
      setAdmin(true)
    }
  }, [isAdmin])

  return <BrowserRouter>
    <div style={{ position: 'relative' }}>
      <AdminContext.Provider value={[admin, setAdmin]}>
        <Routes>
          <Route path="/" element={<Private><Times /></Private>} />
          <Route path="/login" element={<Login />} />
          <Route path="/times/:page" element={<Private><Times /></Private>} />
          <Route path="/profile" element={<Private><Profile /></Private>} />
        </Routes>
        {isAdmin && <Logout />}
      </AdminContext.Provider>
    </div>
  </BrowserRouter>
}
