import { useState } from 'react'
import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import AdminPanel from './components/AdminPanel'
import ShopPage from './components/ShopPage'
import ShopDetailsPage from './components/ShopDetailsPage'
import Cart from './components/Cart'
import Report from './components/Report'



function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Dashboard' element={<Dashboard />}/> 
        <Route path='/admin' element={<AdminPanel />}/> 
        <Route path='/shops' element={<ShopPage />}/> 
        <Route path='/shop/:shopName' element={<ShopDetailsPage />}/> 
        <Route path='/cart' element={<Cart />}/> 
        <Route path='/report' element={<Report />}/> 

      </Routes>
    </Router>
    
   
  )
}

export default App
