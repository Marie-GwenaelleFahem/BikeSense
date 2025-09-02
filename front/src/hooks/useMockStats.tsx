import { Activity, AlertTriangle, Thermometer } from 'lucide-react';

interface Stat {
  title: string;
  value: string;
  icon: any;
  color: string;
  bgColor: string;
  textColor: string;
}

const useMockStats = (): Stat[] => {
  return [
    {
      title: "Alertes actives", 
      value: "3",
      icon: AlertTriangle,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      textColor: "text-red-600"
    },
    {
      title: "Température moyenne",
      value: "31.4°C",
      icon: Thermometer,
      color: "from-blue-500 to-blue-600", 
      bgColor: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      title: "Taux d'humidité moyen",
      value: "38%",
      icon: Activity,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50", 
      textColor: "text-purple-600"
    }
  ];
};

export default useMockStats;