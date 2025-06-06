import React from 'react';
import './footer.scss';
import { FaFacebookF, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import Logo from '../logo/Logo';

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="footer-content">
                <div className="footer-logo">
                    <Logo />
                </div>

                <div className="footer-links">
                    <h4>Ցանկ</h4>
                    <ul>
                        <li><a href="https://www.ardaglobal.org/" target='_blank' rel="noopener noreferrer" >ARDA Global Center</a></li>
                        <li><a href="/education">ARDA Education</a></li>
                        <li><a href="/construction">ARDA Construction</a></li>
                        <li><a href="/medical">ARDA Medical Center</a></li>
                        <li><a href="/work">Work & Partnership</a></li>
                    </ul>
                </div>

                <div className="footer-contact">
                    <h4>Կապ մեզ հետ</h4>
                    <ul>
                        <li><FaPhoneAlt /> <a href="tel:+37477053446">+374 77 05 34 46</a></li>
                        <li><FaPhoneAlt /> <a href="tel:+37498771255">+374 98 77 12 55</a></li>
                        <li><FaEnvelope /> <a href="mailto:ardaeducation2025@gmail.com">ardaeducation2025@gmail.com</a></li>
                        <li><FaMapMarkerAlt /> <a href="https://yandex.com/maps/10262/yerevan/?ll=44.519171%2C40.202557&mode=routes&rtext=40.197212%2C44.505483~40.208209%2C44.536648&rtt=auto&ruri=~ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgozMTc0MDM2Mzk3EkXVgNWh1bXVodW91b_VodW2LCDUtdaA1ofVodW2LCDVitWh1oDVuNaC1bXWgCDVjdaH1aHVr9WrINaD1bjVstW41oEsIDkiCg2GJTJCFTXVIEI%2C&z=14.94" target='_blank' rel="noopener noreferrer">Պարույր Սևակ 9</a></li>
                    </ul>
                </div>

                <div className="footer-social">
                    <h4>Սոցիալական ցանցեր</h4>
                    <div className="social-icons">
                        <a href="https://www.facebook.com/ARDA_KENTRON/?locale=hy_AM" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>

                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} ԱՌԴԱ Բ/Հ | Բոլոր իրավունքները պաշտպանված են</p>
            </div>
        </footer>
    );
};

export default Footer;
