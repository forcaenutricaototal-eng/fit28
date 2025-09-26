import React from 'react';
import { Link } from 'react-router-dom';
import ProgressChart from '../components/ProgressChart';
import { PROGRESS_DATA } from '../constants';
import { ChevronLeftIcon, MoreVertIcon, ClockIcon, PlayIcon, PauseIcon, VolumeUpIcon, ExpandIcon, PlusIcon, PencilIcon } from '../components/Icons';

const Workout: React.FC = () => {
    const [isPlaying, setIsPlaying] = React.useState(true);

    return (
        <div className="text-white">
            {/* Header */}
            <header className="px-4 pt-8 flex justify-between items-center absolute top-0 left-0 right-0 z-10">
                <Link to="/" className="p-2 bg-black/30 rounded-full">
                    <ChevronLeftIcon className="w-6 h-6" />
                </Link>
                <button className="p-2 bg-black/30 rounded-full">
                    <MoreVertIcon className="w-6 h-6" />
                </button>
            </header>
            
            {/* Video Player */}
            <div className="relative h-80 bg-brand-gray-1">
                <img src="https://picsum.photos/seed/workout-bg/400/600" alt="Workout" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="w-full h-1 bg-white/20 rounded-full mb-2">
                        <div className="w-1/4 h-full bg-white rounded-full"></div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-4">
                            <button onClick={() => setIsPlaying(!isPlaying)}>
                                {isPlaying ? <PauseIcon className="w-6 h-6"/> : <PlayIcon className="w-6 h-6"/>}
                            </button>
                            <span>0:00 - 5:40</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <VolumeUpIcon className="w-5 h-5"/>
                            <ExpandIcon className="w-5 h-5"/>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold">Rosca Concentrada</h1>
                        <p className="text-brand-text-secondary mt-1">Halter Sentado</p>
                    </div>
                    <div className="flex items-center gap-2 bg-brand-gray-1 px-3 py-1.5 rounded-full text-sm">
                        <ClockIcon className="w-4 h-4 text-brand-green" />
                        <span>15 min</span>
                    </div>
                </div>

                <p className="text-brand-text-secondary my-4 text-sm leading-relaxed">
                    Sente-se em um banco, incline-se para a frente e descanse o cotovelo na parte interna da coxa. Levante o halter em um movimento controlado, focando em contrair o bíceps no topo. Ev...
                </p>

                <div className="my-8">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-xl font-bold">Meu Progresso</h2>
                        <div className="flex items-center gap-3">
                            <button className="text-brand-text-secondary"><PencilIcon className="w-5 h-5"/></button>
                            <button className="text-brand-text-secondary"><PlusIcon className="w-5 h-5"/></button>
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-brand-green">47.5kg</p>
                    <ProgressChart data={PROGRESS_DATA} />
                </div>
            </div>
        </div>
    );
};

export default Workout;