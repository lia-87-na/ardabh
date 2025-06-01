import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Home from './components/homepage/Home';
import Education from './components/education/Education';
import Work from './components/work/Work';
import Medical from './components/medical/Medical';
import Construction from './components/construction/Construction';
import Footer from './components/footer/Footer';
import AdminPanel from './components/admin/AdminPanel';
import PrivateRoute from './components/admin/PrivateRoute';

function AppRoutes() {



    return (
    
<>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/admin"
                    element={
                        <PrivateRoute>
                            <AdminPanel />
                        </PrivateRoute>
                    }
                />
                <Route path="/education" element={<Education />} />
                <Route path="/work" element={<Work />} />
                <Route path="/medical" element={<Medical />} />
                <Route path="/construction/*" element={<Construction />} />
            </Routes>

            <Footer />
        </>
    );
}

export default AppRoutes;
