import React from 'react';
import './header.scss';
import Logo from '../../../logo/Logo';
import Nav from './nav/Nav';


export default function Header() {

    return (
        <>
            <div className='header' id='top'>
                <Logo />
                <Nav />
            </div>
        
        </>
    );
}