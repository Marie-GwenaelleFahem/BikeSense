import React from 'react';
import AlertBanner from '../../components/AlertBanner';
import useMockSensors from '../../hooks/useMockSensors';
import useAlerts from './useAlerts';

const AlertList: React.FC = () => {
  const sensors = useMockSensors();
  const alerts = useAlerts(sensors);

  return (
    <section className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Alertes</h2>
      {alerts.length === 0 ? (
        <p>Aucune alerte détectée.</p>
      ) : (
        alerts.map((alert, index) => (
          <AlertBanner key={index} type={alert.type} message={alert.message} />
        ))
      )}
    </section>
  );
};

export default AlertList;
