import React from 'react'
import './logo.scss'
 import logo from './../images/logo.png'
export default function Logo() {
  return (
      <div className='logo'>
          <a href="/">
              <img src={logo} alt="Arda logo" /></a>
      </div>
  )
}
