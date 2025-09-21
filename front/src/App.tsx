import './index.css';
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Settings from './pages/Settings';
import Login from './pages/Login';

import Notfound from './pages/Notfound';
import { AlertSettingsProvider } from './context/AlertSettingsContext';
import History from './pages/History';
import Chart from './pages/Chart';
import Register from './pages/Register';
import { RequireAuth } from './routes/AppRoutes';
import { RequireRole } from './routes/RequireRole';

function App() {
    return (
        <BrowserRouter>
            <AlertSettingsProvider>
                <Routes>
                <Route path="/" element={<Layout />}>
                    {/* Redirection par défaut vers login */}
                    <Route index element={<Navigate to="/login" replace />} />
                    
                    {/* Routes publiques (accessibles sans authentification) */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    
                    {/* Routes protégées (nécessitent une authentification) */}
                    <Route element={<RequireAuth />}>
                        {/* Dashboard accessible à tous les utilisateurs connectés */}
                        <Route path="/dashboard" element={<Dashboard />} />
                        
                        {/* Settings - Admin seulement */}
                        <Route path="/settings" element={
                          <RequireRole allowedRoles={['admin']}>
                            <Settings />
                          </RequireRole>
                        } />
                        
                        {/* History et Chart - Admin et Employee seulement (pas Guest) */}
                        <Route path="/history" element={
                          <RequireRole allowedRoles={['admin', 'employee']}>
                            <History />
                          </RequireRole>
                        } />
                        <Route path="/chart" element={
                          <RequireRole allowedRoles={['admin', 'employee']}>
                            <Chart />
                          </RequireRole>
                        } />
                    </Route>
                    
                    {/* Page 404 - accessible à tous */}
                    <Route path="*" element={<Notfound />} />
                </Route>
            </Routes>
            </AlertSettingsProvider>
        </BrowserRouter>
    );
}

export default App
