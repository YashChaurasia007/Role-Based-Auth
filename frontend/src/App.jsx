import './App.css'
import Signup from './components/signup.jsx'
import Login from './components/login.jsx'
import Dashboard from './components/dashboard.jsx'
import Users from './components/users.jsx'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="dashboard/admin/users" element={<Dashboard />} />
            <Route path="dashboard/admin/user" element={<Users />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
