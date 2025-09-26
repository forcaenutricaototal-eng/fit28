import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, DumbbellIcon, PlateIcon, UserIcon } from './Icons';

const navItems = [
  { path: '/', icon: HomeIcon, label: 'Dashboard' },
  { path: '/workout', icon: DumbbellIcon, label: 'Treino' },
  { path: '/meals', icon: PlateIcon, label: 'Refeições' },
  { path: '/profile', icon: UserIcon, label: 'Perfil' },
];

const BottomNav: React.FC = () => {
  return (
    <nav className="absolute bottom-0 left-0 right-0 h-20 bg-brand-gray-1 bg-opacity-80 backdrop-blur-sm border-t border-brand-gray-2 rounded-b-3xl flex justify-around items-center px-4">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center text-xs w-16 transition-colors duration-300 ${
              isActive ? 'text-brand-green' : 'text-brand-text-secondary hover:text-white'
            }`
          }
        >
          <item.icon className="w-6 h-6 mb-1" />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;