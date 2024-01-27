import React from 'react'
import navLogo from '../assets/logo/navblackLogo.png';

function Navbar() {
  return (
    <div className='flex justify-center h-[150px] '>
      <img src={navLogo} alt='logo'/>
    </div>
  )
}

export default Navbar
