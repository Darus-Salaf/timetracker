import Form from "./Form";
import Times from "./Times";
import Container from '@mui/material/Container'
import {
  BrowserRouter, Routes, Route
} from 'react-router-dom'

export default function App() {
  return <BrowserRouter>
    <Container>
      <div><Form /></div>
      <Routes>
        <Route path="/" element={<Times />} />
        <Route path="/times/:page" element={<Times />} />
      </Routes>
    </Container>
  </BrowserRouter>
}
