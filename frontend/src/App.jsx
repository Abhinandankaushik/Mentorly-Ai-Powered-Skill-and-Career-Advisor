import { useState } from 'react'
import './index.css'
import Home from './pages/Home'
import { Route,Routes } from 'react-router-dom'
import GetYourRoadmap from './pages/GetYourRoadmap'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
       <Route path='/' element={<Home/>} />
       <Route path='/chat' element={<GetYourRoadmap/>} />
      
    </Routes>
  )
}

export default App
