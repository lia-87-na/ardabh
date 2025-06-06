import React, { useState, useEffect } from 'react';
import './nav.scss';
import { IoMdMenu } from "react-icons/io";

export default function Nav() {
    const [menuOpen, setMenuOpen] = useState(false);
    const nav = [
        { title: 'Մեր մասին', href: '#about' },
        { title: 'Դասընթացներ', href: '#courses' },
        { title: 'Վիճակագրություն', href: '#statistics' },
        { title: 'Աշխատակազմ', href: '#staff' },
        { title: 'Գրանցվել', href: '#register' },
    ];

    useEffect(() => {
        // Scroll lock when menu open
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
      
        } else {
            document.body.style.overflow = '';
           
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = '';
        };
    }, [menuOpen]);

    return (
        <>
            <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
                <IoMdMenu size={28} />
            </div>
            <nav className={menuOpen ? 'open' : ''}>
                <ul>
                    {nav.map((elem, index) => (
                        <li key={index}>
                            <a
                                href={elem.href}
                                onClick={() => setMenuOpen(false)}
                            >
                                {elem.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}
