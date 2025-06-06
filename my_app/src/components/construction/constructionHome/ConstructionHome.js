import React, { useState } from 'react';
import './constructionHome.scss';
import { BiArea } from "react-icons/bi";
import { PiSolarPanelLight } from "react-icons/pi";
import { IoBedOutline } from "react-icons/io5";

export default function ConstructionHome() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        const { name, email, message } = formData;
        if (!name || !email || !message) {
            setError('Խնդրում ենք լրացնել բոլոր դաշտերը։');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                setSuccess('Նամակը հաջողությամբ ուղարկվեց։');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setError(data.message || 'Սխալ առաջացավ։');
            }
        } catch (err) {
            setError('Սերվերի հետ կապ հաստատել չհաջողվեց։');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="construction-home">
            <section className="homePage">
                <div className="hompage-text">
                    <h1>Մոդեռն ոճային բնակարաններ հատուկ նախագծով</h1>
                    <p>ARDA ոճային բնակարաններն այսուհետ նաև Հայաստանում են:</p>
                    <a href='#contactUs' className="contact-link">Կապ Մեզ Հետ</a>
                </div>
                <div className="homePage-image">
                    <img src="/images/Ardataxamas.jpeg" alt="Modular Home" />
                </div>
            </section>

            <section className="exterior">
                <h2>Արտաքին Տեսք</h2>
                <img src="/images/exterior4.jpeg" alt="Exterior View" />
            </section>

            <section className="specs">
                <h2>Առանձնահատկություններ</h2>
                <div className="spec-cards">
                    <div className="card">
                        <BiArea />
                        <p>112 մ<sup>2</sup></p>
                    </div>
                    <div className="card">
                        <PiSolarPanelLight />
                        <p>Արևային կայաններ</p>
                    </div>
                    <div className="card">
                        <IoBedOutline />
                        <p>3 Ննջասենյակ</p>
                    </div>
                </div>
            </section>

            <section id='contactUs' className="contactUs">
                <section className='choose'>
                    <h2>Ինչու՞ ընտրել մեզ</h2>
                    <strong>Բնակարան կարող եք ձեռք բերել մեզ մոտ</strong>
                    <ol>
                        <li>Ամենամսյա վճարում</li>
                        <li>Առանց հիպոթեք</li>
                        <li>Առանց կանխավճար</li>
                        <li>0% տոկոսադրույք</li>
                        <li>Ճկուն վճարման համակարգ</li>
                        <li>10 տարի մարման ժամկետ</li>
                        <li>Բնակարան առանց կոմունալ վճարումների</li>
                    </ol>
                </section>

                <form className="contact-form" onSubmit={handleSubmit}>
                    <h2>Բնակարանի ձեռքբերման դիմում</h2>
                    {error && <p className="error">{error}</p>}
                    {success && <p className="success">{success}</p>}
                    <input
                        type="text"
                        name="name"
                        placeholder="Անուն Ազգանուն"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Էլ․ փոստ"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="message"
                        rows="5"
                        placeholder="Հաղորդագրություն"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Ուղարկվում է...' : 'Ուղարկել'}
                    </button>
                </form>
            </section>
        </div>
    );
}
