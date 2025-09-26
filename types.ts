export interface Workout {
  id: number;
  title: string;
  duration: number;
  image: string;
}

export interface Activity {
  // FIX: Updated activity types to match Portuguese values used in constants.ts
  type: 'Caminhada' | 'Treino';
  value: string;
  unit: string;
  time: string;
}

export interface ProgressData {
  name: string;
  weight: number;
}
