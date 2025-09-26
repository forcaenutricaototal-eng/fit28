import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Workout from './pages/Workout';
import Meals from './pages/Meals';
import Profile from './pages/Profile';

const App: React.FC = () => {
  return (
    <div className="w-full max-w-sm h-[90vh] max-h-[844px] mx-auto flex flex-col font-sans">
      <div className="bg-brand-dark text-brand-text w-full h-full rounded-3xl shadow-2xl overflow-hidden relative">
        <HashRouter>
          <main className="overflow-y-auto h-[calc(100%-80px)] pb-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/workout" element={<Workout />} />
              <Route path="/meals" element={<Meals />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          <BottomNav />
        </HashRouter>
      </div>
    </div>
  );
};

export default App;