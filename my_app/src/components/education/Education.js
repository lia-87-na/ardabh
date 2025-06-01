import React from 'react';
import { motion } from 'framer-motion';
import './education.scss';
import Header from './education_content/header/Header';
import Main from './education_content/main/Main';


export default function Education() {
    return (
        <motion.div
            className='education'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
        >
            <Header />
            <Main />
       
        </motion.div>
    );
}
