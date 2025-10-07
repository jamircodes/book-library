import React from "react";

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 bg-gradient-to-r from-blue-800 to-indigo-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold tracking-wide">📚 Online Library</h1>
        <nav className="space-x-6 hidden md:flex">
          <a href="#featured" className="hover:text-yellow-300">
            Featured
          </a>
          <a href="#about" className="hover:text-yellow-300">
            About
          </a>
          <a href="#contact" className="hover:text-yellow-300">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
