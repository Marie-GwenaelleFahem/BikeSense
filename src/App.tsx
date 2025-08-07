import './index.css';
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Notfound from './pages/Notfound';
import { AlertSettingsProvider } from './context/AlertSettingsContext';

function App() {
    return (
        <BrowserRouter>
            <AlertSettingsProvider>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/settings" element={<Settings />} />
                        <Route path="*" element={<Notfound />} />
                    </Route>
                </Routes>
            </AlertSettingsProvider>
        </BrowserRouter>
    );
}

export default App
