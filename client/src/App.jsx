import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from './User/pages/Signup'
import Login from './User/pages/Login'
import Navbar from './User/Components/Navbar'
import UserList from './User/pages/UserList'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>

          <Route path="/" element={<UserList/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path='/login' element={<Login/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App