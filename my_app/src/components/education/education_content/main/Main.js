import React from 'react'
import './main.scss'
import About from './about/About'
import Courses from './courses/Courses'
import Up from '../../../up/Up'
import Statistics from './statistics/Statistics'
import Social from './Social'
import Contact from './contact/Contact'
import Register from './register/Register'
import AnimatedImageSlider from './AnimatedImageSlider'
export default function Main() {
  return (
    <div className='main' >
      <About />
      <Courses />
      <AnimatedImageSlider/>
      <Social />
      <Statistics />
     <div id='contact'>
        <Contact />
        <Register />
     </div>
      <Up />
    </div>
  )
}
