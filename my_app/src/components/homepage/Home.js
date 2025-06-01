import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ✅ ավելացվել է useNavigate
import './home.scss';
import Logo from '../logo/Logo';
import LoginButton from '../admin/LoginButton';
import LoginModal from '../admin/LoginModal';

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate(); // ✅

    useEffect(() => {
        const storedAdmin = localStorage.getItem('isAdmin');
        setIsAdmin(storedAdmin === 'true');
    }, []);

    const homeblocks = [
        { title: `ARDA GLOBAL CENTER`, url: `https://www.ardaglobal.org/` },
        { title: `ARDA EDUCATION CENTER`, url: `/education` },
        { title: `WORK & PARTNERSHIP`, url: `/work` },
        { title: `ARDA MEDICAL CENTER`, url: `/medical` },
        { title: `ARDA CONSTRUCTION`, url: `/construction` },
        ...(isAdmin ? [{ title: `REGISTRATIONS TABEL`, url: '/admin' }] : [])
    ];

    const handleLoginClick = () => {
        if (isAdmin) {
            localStorage.removeItem('isAdmin');
            setIsAdmin(false);
            navigate('/'); // ✅ ելքից հետո գնում է գլխավոր էջ
        } else {
            setIsModalOpen(true);
        }
    };

    const handleLoginSuccess = () => {
        setIsModalOpen(false);
        setIsAdmin(true);
        localStorage.setItem('isAdmin', 'true');
        navigate('/admin'); // ✅ մուտքից հետո ուղարկում է admin էջ
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <div id='home'>
            <div className='home'>
                <Logo />
            </div>
            <LoginButton isAdmin={isAdmin} onClick={handleLoginClick} />
           
            {homeblocks.map((elem, index) => {
                const isExternal = elem.url.startsWith('http');
                return (
                    <div className='homeblocks' key={index}>
                        <h2>
                            {isExternal ? (
                                <a href={elem.url} target='_blank' rel='noreferrer'>{elem.title}</a>
                            ) : (
                                <Link to={elem.url}>{elem.title}</Link>
                            )}
                        </h2>
                    </div>
                );
            })}

            {/* Մուտքի մոդալ պատուհան */}
            {isModalOpen && (
                <LoginModal onClose={handleModalClose} onSuccess={handleLoginSuccess} />
            )}
        </div>
    );
}
