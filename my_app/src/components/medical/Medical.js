import React from 'react'
import { motion } from 'framer-motion'
import NotFound from '../notFound/notFound'
export default function Medical() {
  return (
      <motion.div
          className='medical'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
      >
          <NotFound/>
      </motion.div>
  )
}
