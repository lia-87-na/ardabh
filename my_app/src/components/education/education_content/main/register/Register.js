import React, { useState } from 'react';
import axios from 'axios';
import './register.scss';

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        specialty: '',
        phone: '',
        email: '',
    });

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        setLoading(true); // ✅ Այստեղ դրեցիր loading-ը

        try {
            const response = await axios.post('http://localhost:5000/api/register', formData);
            if (response.status === 200) {
                setSuccess(true);
                setFormData({ name: '', specialty: '', phone: '', email: '' });
            }
        } catch (err) {
            setError('Մուտքը ձախողվեց։ Խնդրում ենք փորձել նորից։');
        } finally {
            setLoading(false); // ✅ Ավարտից հետո անջատում ենք loading-ը
        }
    };


    return (
        <div id='register'>
            <h2>Գրանցվել առցանց</h2>
            <form className='form' onSubmit={handleSubmit}>
                <label>
                    Անուն Ազգանուն*
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder='Անուն Ազգանուն'
                        required
                    />
                </label>
                <label>
                    Ընտրել մասնագիտությունը*
                    <select
                        name="specialty"
                        value={formData.specialty}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Մասնագիտություն</option>
                        <option value="Վեբ Ծրագրավորում">Վեբ Ծրագրավորում</option>
                        <option value="Շյուղագործություն">Շյուղագործություն</option>
                        <option value="Շինաշխատանքներ">Շինաշխատանքներ</option>
                    </select>
                </label>
                <label>
                    Հեռախոսահամար*
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder='Հեռախոսահամար'
                        required
                    />
                </label>
                <label>
                    Էլ․ հասցե*
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder='email@example.com'
                        required
                    />
                </label>
                <button type="submit" disabled={loading}>
                    {loading ? 'Մշակվում է․․․' : 'Գրանցվել'}
                </button>
             

                {success && <p style={{ color: 'green' }}> ✅  Շնորհակալություն :  Գրանցումը հաջողությամբ կատարվեց :</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
}
