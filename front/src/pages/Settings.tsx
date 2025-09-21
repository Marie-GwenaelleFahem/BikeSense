// src/pages/Settings.tsx
import React, { useState } from 'react';
import { useAlertSettings } from '../context/AlertSettingsContext';
import { useAuth } from '../context/AuthContext';
import { useToastHelpers } from '../components/Toast';
import { User, Bell, Shield, Save, Eye, EyeOff, Mail, Lock, Thermometer, Droplets, Activity, Users } from 'lucide-react';
import AdminUserPanel from '../components/AdminUserPanel';
import { apiFetch } from '../services/api';

const Settings: React.FC = () => {
  const { user, refreshMe } = useAuth();
  const { tempLimit, humidityLimit, movementThreshold, setTempLimit, setHumidityLimit, setMovementThreshold } = useAlertSettings();
  const { success, error, warning } = useToastHelpers();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // États pour les champs du formulaire
  const [formData, setFormData] = useState({
    firstName: user?.firstname || '',
    lastName: user?.lastname || '',
    email: user?.email || '',
  });

  // États pour le changement de mot de passe
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Mise à jour des champs quand l'utilisateur change
  React.useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstname || '',
        lastName: user.lastname || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Sauvegarde réelle du profil en BDD
      const response = await apiFetch('/auth/profile', {
        method: 'PUT',
        json: {
          firstname: formData.firstName,
          lastname: formData.lastName,
          email: formData.email
        }
      });

      if (response.success) {
        console.log('✅ Profil sauvegardé:', response.message);
        
        // Mise à jour fluide sans rechargement de page
        await refreshMe();
        success('Profil mis à jour', 'Vos informations ont été sauvegardées avec succès !');
      } else {
        console.error('❌ Erreur sauvegarde:', response.message);
        error('Erreur de sauvegarde', response.message);
      }
    } catch (error: any) {
      console.error('❌ Erreur sauvegarde profil:', error);
      error('Erreur de sauvegarde', error.message || 'Une erreur est survenue lors de la sauvegarde');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    // Validation côté client
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      warning('Champs manquants', 'Veuillez remplir tous les champs');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      error('Mots de passe différents', 'Les nouveaux mots de passe ne correspondent pas');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      warning('Mot de passe trop court', 'Le nouveau mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setIsChangingPassword(true);
    try {
      const response = await apiFetch('/auth/change-password', {
        method: 'PUT',
        json: {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        }
      });

      if (response.success) {
        success('Mot de passe modifié', 'Votre mot de passe a été changé avec succès !');
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        error('Erreur de changement', response.message);
      }
    } catch (error: any) {
      console.error('❌ Erreur changement mot de passe:', error);
      error('Erreur de changement', error.message || 'Une erreur est survenue lors du changement de mot de passe');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'alerts', label: 'Alertes', icon: Bell },
    { id: 'security', label: 'Sécurité', icon: Shield },
    ...(user?.role === 'admin' ? [{ id: 'admin', label: 'Administration', icon: Users }] : []),
  ];

  return (
    <div className="min-h-screen p-6 space-y-8 animate-fade-in-up">
      {/* En-tête */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Paramètres</h1>
            <p className="text-gray-600">Gérez vos préférences et configurations</p>
          </div>
        </div>
      </div>

      {/* Onglets */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Contenu des onglets */}
      <div className="max-w-4xl">
        {activeTab === 'profile' && (
          <div className="space-y-8">
            {/* Informations personnelles */}
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Informations personnelles</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      Prénom
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="John"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Nom
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="exemple@domain.com"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="btn-primary flex items-center space-x-2"
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sauvegarde...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      <span>Sauvegarder les modifications</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

{activeTab === 'alerts' && (
          <div className="space-y-8">
            {/* Seuils d'alerte */}
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Seuils d'alerte</h2>
              <p className="text-gray-600 mb-6">Configurez les seuils pour déclencher les alertes automatiques</p>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="card p-6 border border-orange-200 bg-orange-50">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-orange-500 rounded-lg">
                        <Thermometer className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Température</h3>
                        <p className="text-sm text-gray-600">Seuil maximal</p>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="tempLimit" className="block text-sm font-medium text-gray-700 mb-2">
                        Température (°C)
                      </label>
                      <input
                        type="number"
                        id="tempLimit"
                        name="tempLimit"
                        value={tempLimit}
                        onChange={(e) => setTempLimit(Number(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200"
                        min="0"
                        max="100"
                      />
                    </div>
                  </div>

                  <div className="card p-6 border border-blue-200 bg-blue-50">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-blue-500 rounded-lg">
                        <Droplets className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Humidité</h3>
                        <p className="text-sm text-gray-600">Seuil maximal</p>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="humidityLimit" className="block text-sm font-medium text-gray-700 mb-2">
                        Humidité (%)
                      </label>
                      <input
                        type="number"
                        id="humidityLimit"
                        name="humidityLimit"
                        value={humidityLimit}
                        onChange={(e) => setHumidityLimit(Number(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                        min="0"
                        max="100"
                      />
                    </div>
                  </div>

                  <div className="card p-6 border border-green-200 bg-green-50">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-green-500 rounded-lg">
                        <Activity className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Mouvement</h3>
                        <p className="text-sm text-gray-600">Vitesse minimum</p>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="movementThreshold" className="block text-sm font-medium text-gray-700 mb-2">
                        Vitesse (km/h)
                      </label>
                      <input
                        type="number"
                        id="movementThreshold"
                        name="movementThreshold"
                        value={movementThreshold}
                        onChange={(e) => setMovementThreshold(Number(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                        min="1"
                        max="200"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Bell className="w-4 h-4" />
                  <span>Les seuils sont sauvegardés automatiquement</span>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-8">
            {/* Changement de mot de passe */}
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Sécurité</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Mot de passe actuel
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Nouveau mot de passe
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="newPassword"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirmer le nouveau mot de passe
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handlePasswordChange}
                  disabled={isChangingPassword}
                  className="btn-primary flex items-center space-x-2"
                >
                  {isChangingPassword ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Modification...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      <span>Changer le mot de passe</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Onglet Administration (Admin seulement) */}
        {activeTab === 'admin' && user?.role === 'admin' && (
          <div className="space-y-8">
            <AdminUserPanel currentUser={user} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
