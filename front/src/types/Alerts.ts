export type AlertType = 'température' | 'humidité' | 'mouvement';

export interface Alert {
  type: AlertType;
  message: string;
}
