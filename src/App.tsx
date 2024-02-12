import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectRoute from './components/ProtectRoute'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import Missing from './pages/Missing'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      <Route element={<ProtectRoute />}>
        <Route path="/home" element={<Home />} />
      </Route>

      <Route path="/*" element={<Missing />} />
    </Routes>
  )
}

export default App
