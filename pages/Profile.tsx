import React from 'react';
import { UserIcon } from '../components/Icons';

const Profile: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 text-brand-text-secondary">
        <UserIcon className="w-24 h-24 mb-4"/>
        <h1 className="text-2xl font-bold text-white mb-2">Página de Perfil</h1>
        <p>Esta página está em construção. Volte em breve para ver estatísticas pessoais, configurações e mais!</p>
    </div>
  );
};

export default Profile;