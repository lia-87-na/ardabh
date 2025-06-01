import React, { useState } from 'react';
import './LoginModal.scss';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ onClose, onSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError('');
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                onSuccess(); // Սեթ է անելու isAdmin-ը true
                navigate('/admin'); // ✅ Ռեդիրեքտ դեպի /admin
            } else {
                setError(result.message || 'Սխալ մուտքանուն կամ գաղտնաբառ');
            }
        } catch (err) {
            setError('Սերվերի սխալ');
            console.error(err);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <h2>Ադմինի մուտք</h2>
                <input
                    type="text"
                    placeholder="Մուտքանուն"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    autoFocus
                />
                <input
                    type="password"
                    placeholder="Գաղտնաբառ"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                {error && <p className="error">{error}</p>}
                <div className="buttons">
                    <button onClick={handleLogin}>Մուտք</button>
                    <button onClick={onClose}>Փակել</button>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
