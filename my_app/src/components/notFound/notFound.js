import React, { useEffect, useState } from 'react';
import './notfound.scss';

const NotFound = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="not-found-page">
            {loading ? (
                <div className="loader-container">
                    <span className="loader"></span>
                    <p>Բեռնում է...</p>
                </div>
            ) : (
                <div className="not-found-content">
                    <h1>404 | Էջը չի գտնվել</h1>
                    <p>Էջում դեռ կատարվում են աշխատանքներ։</p>
                </div>
            )}
        </div>
    );
};

export default NotFound;
