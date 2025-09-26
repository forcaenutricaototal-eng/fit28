import React from 'react';
import { Link } from 'react-router-dom';
import { WORKOUT_CATEGORIES, SUGGESTED_WORKOUTS, RECENT_ACTIVITIES } from '../constants';
import { BellIcon, FireIcon, RunnerIcon, DumbbellIcon, HeartIcon, ClockIcon } from '../components/Icons';

const Header: React.FC = () => (
    <header className="px-4 pt-8 flex justify-between items-center">
        <div className="flex items-center gap-3">
            <img src="https://i.pravatar.cc/150?u=emma" alt="Emma" className="w-12 h-12 rounded-full border-2 border-brand-gray-2" />
            <div>
                <p className="text-brand-text-secondary text-sm">Olá Emma 👋</p>
                <p className="text-brand-text font-semibold text-lg">Prepare-se</p>
            </div>
        </div>
        <div className="flex items-center gap-4">
            <button className="relative">
                <BellIcon className="w-6 h-6 text-brand-text" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-brand-dark"></span>
            </button>
            <button>
                <FireIcon className="w-6 h-6 text-brand-text" />
            </button>
        </div>
    </header>
);

const ChallengeCard: React.FC = () => (
    <div className="mx-4 my-6 p-4 bg-brand-gray-1 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
            <div className="bg-brand-gray-2 p-3 rounded-full">
                <span className="text-2xl">🏆</span>
            </div>
            <div>
                <p className="font-semibold text-white">Novo Desafio</p>
                <p className="text-sm text-brand-text-secondary">2 Semanas de Energia</p>
            </div>
        </div>
        <button className="bg-brand-green text-black font-bold py-2 px-6 rounded-full text-sm">INICIAR</button>
    </div>
);

const Calendar: React.FC = () => {
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const dates = [13, 14, 15, 16, 17, 18, 19];
    const activeDate = 16;
    return(
        <div className="px-4">
            <div className="flex justify-between">
            {days.map((day, index) => (
                <div key={day} className="flex flex-col items-center gap-2">
                    <span className="text-xs text-brand-text-secondary">{day}</span>
                    <span className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold ${dates[index] === activeDate ? 'bg-brand-green text-black' : 'text-white'}`}>{dates[index]}</span>
                </div>
            ))}
            </div>
        </div>
    );
};

const WorkoutCategories: React.FC = () => {
    const icons = [<RunnerIcon key="1" className="w-5 h-5"/>, <HeartIcon key="2" className="w-5 h-5"/>, <DumbbellIcon key="3" className="w-5 h-5"/>];
    return (
        <div className="px-4 my-6">
            <div className="grid grid-cols-3 gap-4">
                {WORKOUT_CATEGORIES.map((cat, index) => (
                    <button key={cat} className={`flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold transition-colors ${index === 0 ? 'bg-brand-green text-black' : 'bg-brand-gray-1 text-white'}`}>
                        {icons[index]}
                        {cat}
                    </button>
                ))}
            </div>
        </div>
    );
};

const WorkoutList: React.FC = () => (
    <div className="px-4 my-6 space-y-4">
        <div className="flex flex-nowrap overflow-x-auto gap-4 pb-2 -mx-4 px-4">
            {SUGGESTED_WORKOUTS.map(workout => (
                <Link to="/workout" key={workout.id} className="flex-shrink-0 w-40 relative rounded-2xl overflow-hidden group">
                    <img src={workout.image} alt={workout.title} className="w-full h-52 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 text-white">
                        <p className="font-semibold text-sm">{workout.title}</p>
                        <p className="text-xs text-brand-text-secondary flex items-center gap-1">
                            <ClockIcon className="w-3 h-3"/>
                            {workout.duration} min
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    </div>
);

const RecentActivity: React.FC = () => {
    const icons = {
        'Caminhada': <RunnerIcon className="w-6 h-6"/>,
        'Treino': <DumbbellIcon className="w-6 h-6"/>
    };
    const colors = {
        'Caminhada': 'bg-green-500/20 text-green-400',
        'Treino': 'bg-red-500/20 text-red-400'
    };
    return (
        <div className="px-4 my-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Atividade Recente</h2>
                <button className="text-sm text-brand-text-secondary">Ver Tudo</button>
            </div>
            <div className="space-y-3">
                {RECENT_ACTIVITIES.map(activity => (
                    <div key={activity.type} className="bg-brand-gray-1 p-4 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-full ${colors[activity.type as keyof typeof colors]}`}>
                                {icons[activity.type as keyof typeof icons]}
                            </div>
                            <div>
                                <p className="font-semibold text-white">{activity.type}</p>
                                <p className="text-xs text-brand-text-secondary">{activity.time}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-lg text-white">{activity.value}</p>
                            <p className="text-xs text-brand-text-secondary">{activity.unit}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const Home: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-green-900/30 via-brand-dark to-brand-dark min-h-full">
      <Header />
      <ChallengeCard />
      <Calendar />
      <WorkoutCategories />
      <WorkoutList />
      <RecentActivity />
    </div>
  );
};

export default Home;