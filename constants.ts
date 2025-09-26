import { Workout, Activity, ProgressData } from './types';

export const WORKOUT_CATEGORIES = ['Aquecimento', 'Cardio', 'Força'];

export const SUGGESTED_WORKOUTS: Workout[] = [
  { id: 1, title: 'Alongamento & Fluxo', duration: 15, image: 'https://picsum.photos/seed/stretch/200/300' },
  { id: 2, title: 'Força em Dupla', duration: 10, image: 'https://picsum.photos/seed/partner/200/300' },
  { id: 3, title: 'Explosão de Core', duration: 19, image: 'https://picsum.photos/seed/core/200/300' },
];

export const RECENT_ACTIVITIES: Activity[] = [
  { type: 'Caminhada', value: '7890', unit: 'passos', time: 'Hoje às 12:43' },
  { type: 'Treino', value: '2', unit: '/min', time: 'Ontem às 18:00' },
];

export const PROGRESS_DATA: ProgressData[] = [
    { name: 'Seg', weight: 30 },
    { name: 'Ter', weight: 45 },
    { name: 'Qua', weight: 48 },
    { name: 'Qui', weight: 35 },
    { name: 'Dom', weight: 40 },
];