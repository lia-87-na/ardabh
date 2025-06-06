import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
    "/images/knit1.jpg",
    "/images/knit2.jpg",
    "/images/knit3.jpg",
  
    "/images/construction1.jpg",
    "/images/construction2.jpg",
    "/images/construction3.jpg",
    "/images/student.jpg",
    
];

export default function AnimatedImageSlider() {
    const [index, setIndex] = useState(0);
    const intervalRef = useRef(null);

    const containerStyle = {
        position: "relative",
        width: "80%",
        maxWidth: 700,
        aspectRatio: "16 / 9", // պահում է հարաբերակցությունը
        margin: "auto",
        overflow: "hidden",
        borderRadius: 16,
        boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        userSelect: "none",
    };

    const imageStyle = {
        position: "absolute",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius: 16,
    };

    useEffect(() => {
        startAutoSlide();

        return () => clearInterval(intervalRef.current);
    }, []);

    const startAutoSlide = () => {
        intervalRef.current = setInterval(() => {
            setIndex(prev => (prev + 1) % images.length);
        }, 4000);
    };

    const pauseAutoSlide = () => {
        clearInterval(intervalRef.current);
    };

    const goToSlide = (i) => {
        setIndex(i);
    };

    return (
        <div
            style={containerStyle}
            onMouseEnter={pauseAutoSlide}
            onMouseLeave={startAutoSlide}
        >
            
            <AnimatePresence initial={false} mode="wait">
                <motion.img
                    key={images[index]}
                    src={images[index]}
                    alt={`Slide ${index + 1}`}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 1 }}
                    style={imageStyle}
                    draggable={false}
                />
            </AnimatePresence>

            {/* Pagination Dots */}
            <div
                style={{
                    position: "absolute",
                    bottom: 12,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    gap: 10,
                    pointerEvents: "auto",
                }}
            >
                {images.map((_, i) => (
                    <motion.div
                        key={i}
                        onClick={() => goToSlide(i)}
                        style={{
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            backgroundColor: i === index ? "#0077cc" : "#ccc",
                            cursor: "pointer",
                        }}
                        whileHover={{ scale: 1.3 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    />
                ))}
            </div>
        </div>
    );
}
