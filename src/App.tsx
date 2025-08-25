import './index.css';
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Settings from './pages/Settings';
import Login from './pages/Login';

import Notfound from './pages/Notfound';
import { AlertSettingsProvider } from './context/AlertSettingsContext';
import History from './pages/History';
import Chart from './pages/Chart';
import Register from './pages/Register';
import { RequireAuth } from './routes/AppRoutes';

function App() {
    return (
        <BrowserRouter>
            <AlertSettingsProvider>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route element={<RequireAuth />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/history" element={<History />} />
                        <Route path="/chart" element={<Chart />} />
                    </Route>
                    <Route path="*" element={<Notfound />} />
                </Route>
            </Routes>
            </AlertSettingsProvider>
        </BrowserRouter>
    );
}

export default App
