// src/components/AlertStatsChart.tsx
import React, { useState } from 'react';
import useHistoricalData from '../../hooks/useHistoricalData';
import useAlerts from '../../features/alerts/useAlerts';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid,
} from 'recharts';

const AlertStatsChart: React.FC = () => {
  const { sensors } = useHistoricalData();
  const allAlerts = useAlerts(sensors);

  const [period, setPeriod] = useState<'all' | 'thisWeek' | 'lastWeek' | 'thisMonth' | 'lastMonth'>('thisWeek');

  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay()); // Dimanche
  const startOfLastWeek = new Date(startOfWeek);
  startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);
  const endOfLastWeek = new Date(startOfWeek);
  const startOfMonth = new Date(now);
  startOfMonth.setDate(1);
  const startOfLastMonth = new Date(now);
  startOfLastMonth.setMonth(now.getMonth() - 1);
  const endOfLastMonth = new Date(startOfLastMonth);
  endOfLastMonth.setDate(startOfLastMonth.getDate() + 31);

  const filteredAlerts = allAlerts.filter((alert) => {
    const ts = new Date(alert.timestamp);
    if (period === 'thisWeek') return ts >= startOfWeek;
    if (period === 'lastWeek') return ts >= startOfLastWeek && ts < endOfLastWeek;
    if (period === 'thisMonth') return ts >= startOfMonth && ts < now;
    if (period === 'lastMonth') return ts >= startOfLastMonth && ts < endOfLastMonth;
      return true;
  });

  const grouped = filteredAlerts.reduce<Record<string, number>>((acc, alert) => {
    acc[alert.type] = (acc[alert.type] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(grouped).map(([type, count]) => ({ type, count }));

  return (
    <div className="bg-white p-6 rounded shadow space-y-4">
      <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Statistiques des alertes</h2>
        <select
          className="border rounded px-2 py-1"
          value={period}
          onChange={(e) => setPeriod(e.target.value as any)}
        >
          <option value="thisWeek">Cette semaine</option>
          <option value="lastWeek">La semaine dernière</option>
          <option value="thisMonth">Ce mois-ci</option>
          <option value="lastMonth">Le mois dernier</option>
        </select>
      </div>

      {data.length === 0 ? (
          <p>Aucune alerte pour la période sélectionnée.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#f87171" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default AlertStatsChart;
