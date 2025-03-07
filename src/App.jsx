import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './pages/MainLayout'
import Dashboard from './pages/Dashboard'
import Chat from './pages/Chat'
import SendMail from './pages/SendMail'
import LogIn from './pages/Login'
import Register from './pages/Register'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="App">
    <BrowserRouter>
    <Routes>

      <Route path= '/' element={<MainLayout></MainLayout>}>

      <Route path= '/Dashboard' element={<Dashboard></Dashboard>}></Route>

      <Route path= '/Chat' element={<Chat></Chat>}></Route>

      <Route path= '/SendMail' element={<SendMail></SendMail>}></Route>
      
      <Route path= '/LogIn' element={<LogIn></LogIn>}></Route>

      <Route path= '/Register' element={<Register></Register>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
</div>
    </>
  )
}

export default App;
