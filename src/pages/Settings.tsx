// src/pages/Settings.tsx
import React from 'react';
import { useAlertSettings } from '../context/AlertSettingsContext';
// TODO: Add auth context and add user to the form      
const Settings: React.FC = () => {
    const { tempLimit, humidityLimit, movementThreshold, setTempLimit, setHumidityLimit, setMovementThreshold } = useAlertSettings();


    const handleSave = () => {
        // TODO: Save the settings to the database
        console.log('Save');
    };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Paramètres</h1>

      <section className="bg-white p-6 rounded shadow w-3/4 mx-auto">
        <h2 className="text-xl font-semibold mb-4">Profil</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block font-medium">
              Adresse email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="exemple@domain.com"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label htmlFor="name" className="block font-medium">
              Nom complet
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label htmlFor="password" className="block font-medium">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="********"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label htmlFor="passwordConfirmation" className="block font-medium">
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              id="passwordConfirmation"
              name="passwordConfirmation"
              placeholder="********"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label htmlFor="role" className="block font-medium">
              Rôle
            </label>
            <select id="role" name="role" className="w-full p-2 border rounded">
              <option value="admin">Admin</option>
              <option value="employee">Employé(e)</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Enregistrer
          </button>
        </form>
        

  <h2 className="text-xl font-semibold my-6">Seuils d'alerte</h2>

  <form className="space-y-4">
    <div>
      <label htmlFor="tempLimit" className="block font-medium">
        Température maximale (°C)
      </label>
      <input
        type="number"
        id="tempLimit"
        name="tempLimit"
        value={tempLimit}
        onChange={(e) => setTempLimit(Number(e.target.value))}
        className="w-full p-2 border rounded"
      />
    </div>

    <div>
      <label htmlFor="humidityLimit" className="block font-medium">
        Humidité maximale (%)
      </label>
      <input
        type="number"
        id="humidityLimit"
        name="humidityLimit"
        value={humidityLimit}
        onChange={(e) => setHumidityLimit(Number(e.target.value))}
        className="w-full p-2 border rounded"
      />
    </div>

    <div>
      <label htmlFor="movementThreshold" className="block font-medium">
        Durée max de mouvement (sec)
      </label>
      <input
        type="number"
        id="movementThreshold"
        name="movementThreshold"
        value={movementThreshold}
        onChange={(e) => setMovementThreshold(Number(e.target.value))}
        className="w-full p-2 border rounded"
      />
    </div>

    <button
      type="button"
      onClick={handleSave}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Mettre à jour les seuils
    </button>
  </form>

      </section>
    </div>  
  );
};

export default Settings;
