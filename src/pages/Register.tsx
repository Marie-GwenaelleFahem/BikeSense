import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, Bike, ArrowRight, User, Check, X } from 'lucide-react';

const Register: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const passwordsDoNotMatch = confirmPassword !== '' && password !== confirmPassword;
    const lengthOk = password.length >= 8;
    const upperOk = /[A-Z]/.test(password);
    const lowerOk = /[a-z]/.test(password);
    const digitOk = /[0-9]/.test(password);
    const isPasswordStrong = lengthOk && upperOk && lowerOk && digitOk;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPasswordStrong || password !== confirmPassword) {
      return;
    }
    setIsLoading(true);
    
    // Simulation d'une connexion
    setTimeout(() => {
      setIsLoading(false);
      // Ici vous pouvez ajouter la logique de connexion réelle
      window.location.href = '/dashboard';
    }, 1500);
  };


    return (<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
        <div className="max-w-md w-full space-y-8">
          {/* Logo et titre */}
          <div className="text-center animate-fade-in-up">
            <div className="flex justify-center mb-6">
              <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl">
                <Bike className="w-10 h-10 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Bienvenue sur BikeSense
            </h2>
            <p className="text-gray-600">
              Créez votre compte pour accéder à votre tableau de bord
            </p>
          </div>
  
          {/* Formulaire de création de compte */}
          <div className="card p-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Prénom */}
              <div>
                <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-2">
                  Prénom
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        id="firstname"
                        name="firstname"
                        type="text"
                        autoComplete="firstname"
                        required
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                        placeholder="Votre prénom"
                    />
                </div>
              </div>

              {/* Nom */}              
              <div>
                <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-2">
                  Nom
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                    id="lastname"
                    name="lastname"
                    type="text"
                    autoComplete="lastname"
                    required
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    placeholder="Votre nom"
                    />
                </div>
                
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>
  
              {/* Mot de passe */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    placeholder="••••••••"
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
                {/* Indicateurs de robustesse */}
                <ul className="mt-2 text-sm space-y-1">
                  <li className={`flex items-center gap-2 ${lengthOk ? 'text-green-600' : 'text-gray-500'}`}>
                    {lengthOk ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />} Au moins 8 caractères
                  </li>
                  <li className={`flex items-center gap-2 ${upperOk ? 'text-green-600' : 'text-gray-500'}`}>
                    {upperOk ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />} Une majuscule
                  </li>
                  <li className={`flex items-center gap-2 ${lowerOk ? 'text-green-600' : 'text-gray-500'}`}>
                    {lowerOk ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />} Une minuscule
                  </li>
                  <li className={`flex items-center gap-2 ${digitOk ? 'text-green-600' : 'text-gray-500'}`}>
                    {digitOk ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />} Un chiffre
                  </li>
                </ul>
              </div>
                

                {/* Confirmer le mot de passe */}
                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirmer le mot de passe
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="confirm-password"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                      placeholder="••••••••"
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
                  {passwordsDoNotMatch && (
                    <p className="text-sm text-red-600 mt-1">Les mots de passe ne correspondent pas.</p>
                  )}
                </div>
  
              {/* Options supplémentaires */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Se souvenir de moi
                  </label>
                </div>
              </div>
  
              {/* Bouton de connexion */}
              <button
                type="submit"
                disabled={isLoading || !isPasswordStrong || passwordsDoNotMatch}
                className="btn-primary w-full flex items-center justify-center space-x-2 py-3 text-lg font-semibold"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Connexion en cours...</span>
                  </>
                ) : (
                  <>
                    <span>Se connecter</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
  
            {/* Séparateur */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Ou</span>
                </div>
              </div>
            </div>
  
            {/* Lien pour se connecter en cas de compte déjà existant */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Déjà un compte ?{' '}
                <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200">
                  Connectez-vous
                </Link>
              </p>
            </div>
          </div>
  
          {/* Informations supplémentaires */}
          <div className="text-center text-sm text-gray-500 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <p>© 2024 BikeSense. Tous droits réservés.</p>
          </div>
        </div>
      </div>
    )
}

export default Register;