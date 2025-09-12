import { useState } from 'react'
import './index.css'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import GetYourRoadmap from './pages/GetYourRoadmap'
import Roadmap from './components/Roadmap/Roadmap'
import Tutor from './components/Tutor'
import Analytics from './components/analytics'
function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/chat' element={<GetYourRoadmap />} />
      <Route path='/roadmap/:career' element={<Roadmap />} />
      <Route path='/get-your-tutor/:searchPrompt' element={<Tutor />} />
      <Route path='/analytics/:career' element={<Analytics/>} />
    </Routes>
  )
}

export default App
