import React from 'react'
import './main.scss'
import About from './about/About'
import Courses from './courses/Courses'
import Up from '../../../up/Up'
import Statistics from './statistics/Statistics'
import Social from './Social'

import Register from './register/Register'
import AnimatedImageSlider from './AnimatedImageSlider'
import Staff from './staff/Staff'
export default function Main() {
  return (
    <div className='main' >
      <About />
      <Courses />
      <AnimatedImageSlider />
      <Social />
      <Statistics />
      <Staff />
      <Register />
      <Up />
    </div>
  )
}
