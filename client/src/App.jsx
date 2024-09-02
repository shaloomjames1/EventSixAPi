import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from './User/pages/Signup'
import Login from './User/pages/Login'
import Navbar from './User/Components/Navbar'
import UserList from './User/pages/UserList'
import UpdateUser from './User/pages/UpdateUser'
import UserDetail from './User/pages/UserDetail '

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>

          <Route path="/" element={<Signup/>}/>
          <Route path="/user/:id" element={<UserDetail />} />
          <Route path='/login' element={<Login/>} />
          <Route path="/list" element={<UserList/>}/>
          <Route path='/update/:id' element={<UpdateUser/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App