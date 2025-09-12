import { useState } from 'react'
import './index.css'
import Home from './pages/Home'
import { Route,Routes } from 'react-router-dom'
import GetYourRoadmap from './pages/GetYourRoadmap'
import Roadmap from './components/Roadmap/Roadmap'
import { useParams } from 'react-router-dom'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
       <Route path='/' element={<Home/>} />
       <Route path='/chat' element={<GetYourRoadmap/>} />
       <Route path='/roadmap/:career' element={<Roadmap />} />
    </Routes>
  )
}

export default App
