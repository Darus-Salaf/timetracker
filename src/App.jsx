import Times from "./Times";
import Container from '@mui/material/Container'
import {
  BrowserRouter, Routes, Route
} from 'react-router-dom'
import Login from "./Login";
import Private from './Private'
import { createContext, useEffect, useState } from "react";
import { Avatar } from "@mui/material";

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
    <Container>
      <AdminContext.Provider value={[admin, setAdmin]}>
        <Routes>
          <Route path="/" element={<Private><Times /></Private>} />
          <Route path="/login" element={<Login />} />
          <Route path="/times/:page" element={<Private><Times /></Private>} />
        </Routes>
        <div style={{display: 'flex', justifyContent: 'end'}}><Avatar style={{ background: 'slateblue', fontSize: '1.2rem', height: '4rem', width: '4rem' }}>Logout</Avatar></div>
      </AdminContext.Provider>
    </Container>
  </BrowserRouter>
}
