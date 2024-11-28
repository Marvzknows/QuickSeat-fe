import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/LoginPage/login'
import AdminDashboard from './pages/Layout/AdminLayout/AdminDashboard'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />

        {/* Admin Layout */}
        {/* <Route  element={<ProtectedRoute}> */}
          <Route path='/dashboard' element={<AdminDashboard />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
