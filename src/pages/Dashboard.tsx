import SensorCard from '../components/SensorCard';
import AlertBanner from '../components/AlertBanner';
import type { SensorType } from '../types/Sensor';
import type { AlertType } from '../types/Alerts';

const Dashboard = () => {
  // Mock de données simulées
  const sensors = [
    { type: 'température' as SensorType, value: '22°C' },
    { type: 'humidité' as SensorType, value: '45%' },
    { type: 'mouvement' as SensorType, value: 'Aucun mouvement' },
  ];

  const alerts = [
    { type: 'température' as AlertType, message: 'Température trop élevée dans la zone A' },
    { type: 'mouvement' as AlertType, message: 'Mouvement suspect détecté à 23h12' },
  ];
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Tableau de bord</h1>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sensors.map((sensor, index) => (
          <SensorCard key={index} type={sensor.type} value={sensor.value} />
        ))}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Alertes</h2>
        {alerts.map((alert, index) => (
          <AlertBanner key={index} type={alert.type} message={alert.message} />
        ))}
      </section>
    </main>
  );
};

export default Dashboard;
