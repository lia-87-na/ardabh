import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './adminPanel.scss';

export default function AdminPanel() {
    const [registrations, setRegistrations] = useState([]);
    const [filteredRegs, setFilteredRegs] = useState([]);
    const [selectedEmails, setSelectedEmails] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchRegistrations = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/backup');
            setRegistrations(res.data.data || []);
            setFilteredRegs(res.data.data || []);
        } catch {
            setMessage('Չհաջողվեց բեռնել գրանցումները։');
        }
    };

    useEffect(() => { fetchRegistrations(); }, []);

    const handleSearch = async (e) => {
        const q = e.target.value;
        setSearchQuery(q);
        if (!q.trim()) return setFilteredRegs(registrations);

        try {
            const res = await axios.get(`http://localhost:5000/api/search?q=${encodeURIComponent(q)}`);
            setFilteredRegs(res.data.data || []);
        } catch {
            setMessage('Որոնումը ձախողվեց։');
        }
    };

    const toggleSelect = (email) => {
        setSelectedEmails(prev =>
            prev.includes(email) ? prev.filter(e => e !== email) : [...prev, email]
        );
    };

    const deleteSelected = async () => {
        if (selectedEmails.length === 0) return setMessage('Ընտրեք էլփոստ(ներ)։');
        setLoading(true);
        try {
            await axios.delete('http://localhost:5000/api/registrations/delete', {
                data: { emails: selectedEmails }
            });
            setMessage('Ընտրվածները ջնջվել են։');
            setSelectedEmails([]);
            fetchRegistrations();
        } catch {
            setMessage('Չհաջողվեց ջնջել ընտրվածները։');
        }
        setLoading(false);
    };

    const deleteAll = async () => {
        if (!window.confirm('Ջնջե՞լ բոլոր գրանցումները։')) return;
        setLoading(true);
        try {
            await axios.delete('http://localhost:5000/api/registrations');
            setMessage('Բոլոր գրանցումները ջնջվել են։');
            setSelectedEmails([]);
            fetchRegistrations();
        } catch {
            setMessage('Չհաջողվեց ջնջել բոլորը։');
        }
        setLoading(false);
    };

    return (
        <div className="admin-panel">
            <h2>Գրանցված մասնակիցներ</h2>
            <input
                type="text"
                placeholder="Որոնում..."
                value={searchQuery}
                onChange={handleSearch}
                className="search-input"
            />
            <div className="button-group">
                <button onClick={deleteAll} disabled={loading}>Ջնջել բոլորը</button>
                <button onClick={deleteSelected} disabled={loading}>Ջնջել ընտրվածները</button>
            </div>
            {message && <p className="message">{message}</p>}
            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Ընտրել</th>
                            <th>Անուն</th>
                            <th>Մասնագիտություն</th>
                            <th>Հեռախոս</th>
                            <th>Էլ․ հասցե</th>
                            <th>Ժամանակ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRegs.length === 0 ? (
                            <tr><td colSpan="6">Տվյալներ չկան</td></tr>
                        ) : (
                            filteredRegs.map((r, i) => (
                                <tr key={i}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedEmails.includes(r.email)}
                                            onChange={() => toggleSelect(r.email)}
                                        />
                                    </td>
                                    <td>{r.name}</td>
                                    <td>{r.specialty}</td>
                                    <td><a href={`tel:+374${r.phone.slice(1)}`}>{r.phone}</a></td>
                                    <td>{r.email}</td>
                                    <td>{new Date(r.timestamp).toLocaleString()}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
