import React from 'react';

interface AlertBannerProps {
  type: 'température' | 'humidité' | 'mouvement';
  message: string;
}

const AlertBanner: React.FC<AlertBannerProps> = ({ type, message }) => {
  return (
    <div className="bg-red-100 text-red-800 p-4 rounded-md border border-red-400 mb-4">
      <strong className="capitalize">Alerte {type} :</strong> {message}
    </div>
  );
};

export default AlertBanner;