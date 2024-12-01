import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/LoginPage/login'
import AdminDashboard from './pages/Admin/AdminDashboard'
import UpcomingShow from './pages/Admin/Movies/UpcomingShow'
import ProtectedRoute from './pages/Layout/AdminLayout/AdminProtectedRoute'
import AdminLayout from './pages/Layout/AdminLayout/AdminLayout'
import NowShowing from './pages/Admin/Movies/NowShowing'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />

        {/* ADMIN ROUTES */}
        <Route> 
          <Route path='/admin' element={<ProtectedRoute />}> {/* Add a protected route here as an element */}
            {/* Admin Layout */}
            <Route element={<AdminLayout />}>
              <Route path='dashboard' element={<AdminDashboard />} />
              <Route path='upcoming' element={<UpcomingShow />} />
              <Route path='nowshowing' element={<NowShowing />} />
            </Route>
          </Route>
        </Route>

        {/* USER ROUTES */}
        
        {/* <Route> 
          <Route path='/user' element={<UserProtectedRoute />}>
            <Route element={<UserLayout />}>
              <Route path='home' element={<Home />} />
            </Route>
          </Route>
        </Route> */}

      </Routes>
    </BrowserRouter>
  )
}

export default App
