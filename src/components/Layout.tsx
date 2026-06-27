import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#F5F2ED] text-[#1A1A1A] font-serif flex flex-col selection:bg-[#1A1A1A] selection:text-[#F5F2ED]">
      {/* Header Navigation */}
      <header className="flex flex-col md:flex-row justify-between items-center px-6 md:px-12 py-6 md:py-8 border-b border-[#1A1A1A]/10 gap-4 sticky top-0 bg-[#F5F2ED]/95 backdrop-blur z-40">
        <div className="text-xs tracking-[0.3em] uppercase font-sans font-bold text-gray-600">
          React Beginners // Slab 01
        </div>
        
        <NavLink to="/" className="text-3xl font-black tracking-tighter italic hover:opacity-80 transition-opacity">
          MONOLITH.
        </NavLink>

        <nav className="flex gap-6 md:gap-8 text-xs uppercase tracking-widest font-sans">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `hover:opacity-50 transition-opacity ${isActive ? 'font-bold border-b border-[#1A1A1A] pb-1' : ''}`
            }
          >
            Overview
          </NavLink>
          <NavLink 
            to="/translator" 
            className={({ isActive }) => 
              `hover:opacity-50 transition-opacity ${isActive ? 'font-bold border-b border-[#1A1A1A] pb-1' : ''}`
            }
          >
            Translator
          </NavLink>
          <NavLink 
            to="/generator" 
            className={({ isActive }) => 
              `hover:opacity-50 transition-opacity ${isActive ? 'font-bold border-b border-[#1A1A1A] pb-1' : ''}`
            }
          >
            String Generator
          </NavLink>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      {/* Footer Bar */}
      <footer className="px-6 md:px-12 py-6 border-t border-[#1A1A1A]/10 flex flex-col sm:flex-row justify-between items-center text-[10px] uppercase tracking-[0.2em] font-sans text-gray-500 gap-4 mt-auto">
        <div>© {new Date().getFullYear()} Monolith Slab Applications</div>
        <div className="flex gap-6">
          <span className="hover:text-[#1A1A1A] cursor-pointer transition-colors">React 19</span>
          <span className="hover:text-[#1A1A1A] cursor-pointer transition-colors">Tailwind v4</span>
          <span className="hover:text-[#1A1A1A] cursor-pointer transition-colors">RapidAPI</span>
        </div>
        <div>Crafted for Beginners Slab 1</div>
      </footer>
    </div>
  );
}
