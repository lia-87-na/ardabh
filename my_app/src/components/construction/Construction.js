import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavConstruction from './navConstruction/NavConstruction';
import VanadzorHome from './vanadzorHome/VanadzorHome';
import ConstructionHome from './constructionHome/ConstructionHome';
import MediaSection from './constructionHome/MediaSection/MediaSection';


export default function Construction() {
    return (
        <motion.div
            className='construction'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
        >
            <NavConstruction />
            <Routes>
                <Route index element={<ConstructionHome/>} />
                <Route path="Նախագծեր" element={<VanadzorHome />} />
                <Route path="Կառուցապատում" element={<MediaSection/>} />
            </Routes>
        </motion.div>
    );
}
