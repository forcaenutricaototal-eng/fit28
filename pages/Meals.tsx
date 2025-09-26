import React from 'react';
import { Link } from 'react-router-dom';
import { BellIcon, FireIcon, MoreVertIcon, SearchIcon, HeartIcon, CommentIcon, BookmarkIcon } from '../components/Icons';

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

const NutritionCard: React.FC<{icon: string, label: string, value: string, total: string, color: string}> = ({icon, label, value, total, color}) => (
    <div className="bg-brand-gray-1 p-4 rounded-2xl flex-1 text-center">
        <div className={`text-2xl mb-2 ${color}`}>{icon}</div>
        <p className="font-bold text-lg text-white">{value}</p>
        <p className="text-xs text-brand-text-secondary">/ {total}</p>
        <p className="text-sm font-medium text-white mt-2">{label}</p>
    </div>
);

const DailyNutrition: React.FC = () => (
    <div className="px-4 my-6">
        <h2 className="text-xl font-bold text-white mb-4">Sua Nutrição Diária</h2>
        <div className="grid grid-cols-2 gap-4">
            <NutritionCard icon="🔥" label="Calorias" value="1120Kcal" total="230 queimadas" color="text-orange-400" />
            <NutritionCard icon="🥩" label="Proteínas" value="98g" total="392 kcal" color="text-red-400" />
            <NutritionCard icon="🌾" label="Carbos" value="120g" total="480 kcal" color="text-yellow-400" />
            <NutritionCard icon="🧈" label="Gorduras" value="45g" total="405 kcal" color="text-blue-400" />
        </div>
    </div>
);

const CommunityPost: React.FC = () => (
    <div className="bg-brand-gray-1 rounded-2xl overflow-hidden">
        <div className="p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <img src="https://i.pravatar.cc/150?u=regina" alt="Regina Fly" className="w-10 h-10 rounded-full"/>
                <div>
                    <p className="font-semibold text-white">Regina Fly</p>
                    <p className="text-xs text-brand-text-secondary">12k Seguidores</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <button className="bg-brand-green text-black font-bold text-xs py-1.5 px-4 rounded-full">Seguir</button>
                <button className="text-brand-text-secondary"><MoreVertIcon className="w-5 h-5"/></button>
            </div>
        </div>
        <div className="relative">
            <img src="https://picsum.photos/seed/food/400/250" alt="Power-packed bowl" className="w-full h-auto"/>
             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm p-2 rounded-full flex gap-3">
                <span className="text-xl">🌶️</span>
                <span className="text-xl">🥑</span>
                <span className="text-xl">🍅</span>
                <span className="text-xl">🥩</span>
                <span className="text-xl">🍄</span>
            </div>
        </div>
        <div className="p-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4 text-brand-text-secondary">
                    <div className="flex items-center gap-1.5">
                        <HeartIcon className="w-5 h-5 text-red-500"/>
                        <span className="text-sm text-white">90 Curtidas</span>
                    </div>
                     <div className="flex items-center gap-1.5">
                        <CommentIcon className="w-5 h-5"/>
                        <span className="text-sm text-white">12</span>
                    </div>
                </div>
                <BookmarkIcon className="w-5 h-5 text-brand-text-secondary"/>
            </div>
            <p className="text-sm text-white mt-3">
                <span className="font-semibold">Tigela potente:</span> <span className="text-brand-text-secondary">quinoa, abacate, proteína grelhada e...</span>
            </p>
        </div>
    </div>
)

const CookingCommunity: React.FC = () => (
    <div className="px-4 my-6">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Comunidade Culinária</h2>
            <button><SearchIcon className="w-6 h-6 text-brand-text-secondary"/></button>
        </div>
        <CommunityPost/>
    </div>
);

const Meals: React.FC = () => {
    return (
        <div className="bg-gradient-to-b from-green-900/30 via-brand-dark to-brand-dark min-h-full">
            <Header />
            <DailyNutrition />
            <CookingCommunity />
        </div>
    );
};

export default Meals;