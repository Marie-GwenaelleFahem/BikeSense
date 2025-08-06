import React from 'react';
import SensorList from '../features/sensors/SensorList';
import AlertList from '../features/alerts/AlertList';

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Tableau de bord</h1>
      <SensorList />
      <AlertList />
    </div>
  );
};

export default Dashboard;
