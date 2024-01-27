import { useState } from 'react'

import './App.css'
import Navbar from './component/Navbar'
import Home from './component/Home'

function App() {
  

  return (
    <>
    <div className='h-screen bg-black '>
     <Navbar/>
     <Home/>
  </div>
    </>
  )
}

export default App
