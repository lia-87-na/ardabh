import React from 'react'
 import { motion } from 'framer-motion'
import './work.scss'
import NotFound from '../notFound/notFound'
export default function Work() {
  return (
      <motion.div
          className='work'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
      >
        <NotFound/>
      </motion.div>
  )
}
