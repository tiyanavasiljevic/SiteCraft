import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import Dashboard from './pages/Dashboard'
import Chat from './pages/Chat'
import SendMail from './pages/SendMail'
import LogIn from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

      

    return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />}/>
            <Route path="Dashboard" element={<Dashboard />} />
            <Route path="Chat" element={<Chat />} />
            <Route path="SendMail" element={<SendMail />} />
            <Route path="Login" element={<LogIn />} />
            <Route path="Register" element={<Register />} />
          </Route>
    </Routes>
    </BrowserRouter>
</div>
    
  );
}

export default App;
