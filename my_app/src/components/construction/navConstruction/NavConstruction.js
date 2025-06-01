import React from 'react'
import './navConstruction.scss'
import Logo from '../../logo/Logo'
import { NavLink } from 'react-router-dom'

export default function NavConstruction() {
    const navItems = [
        { name: 'Գլխավոր', path: '/construction' }, // Շարունակվում է construction-ում
        { name: 'Նախագծեր', path: '/construction/Նախագծեր' },
        { name: 'Կառուցապատում', path: '/construction/Կառուցապատում' },
    ];

    return (
        <div className='navigation'>
            <Logo />
            <ul>
                {navItems.map((item, index) => (
                    <li key={index}>
                        <NavLink
                            to={item.path}
                            className={({ isActive }) => (isActive ? 'active-link' : '')}
                        >
                            {item.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
}

