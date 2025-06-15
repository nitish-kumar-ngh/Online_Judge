import React, { useState } from 'react';
import {
  Code, User, BookOpen, Trophy, Settings, LogOut, Menu, X, Home, Users, Award, Bell
} from 'lucide-react';

const Navbar = ({ currentPage, setCurrentPage, user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'problems', label: 'Problems', icon: Code },
    { id: 'contest', label: 'Contest', icon: Trophy },
    { id: 'discuss', label: 'Discuss', icon: Users },
    { id: 'interview', label: 'Interview', icon: BookOpen }
  ];

  const handleNavigation = (id) => {
    setCurrentPage(id);
    setIsMenuOpen(false);
  };

  const NavButton = ({ id, label, icon: Icon }) => {
    const isActive = currentPage === id;
    const baseStyles = 'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors';
    const activeStyles = 'bg-blue-100 text-blue-700';
    const inactiveStyles = 'text-gray-700 hover:text-blue-700 hover:bg-gray-100';
    return (
      <button
        onClick={() => handleNavigation(id)}
        className={`${baseStyles} ${isActive ? activeStyles : inactiveStyles}`}
      >
        <Icon size={16} className="mr-2" />
        {label}
      </button>
    );
  };

  const ProfileDropdown = () => (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200 py-1">
      <div className="px-4 py-2 border-b border-gray-100">
        <p className="text-sm font-medium text-gray-900">{user.name}</p>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
      <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
        <User size={16} className="mr-3" />
        Profile
      </button>
      <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
        <Award size={16} className="mr-3" />
        My Progress
      </button>
      <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
        <Settings size={16} className="mr-3" />
        Settings
      </button>
      <div className="border-t border-gray-100 mt-1">
        <button
          onClick={onLogout}
          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
        >
          <LogOut size={16} className="mr-3" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <nav className="bg-white border-b shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex justify-center items-center mr-3">
            <Code className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-gray-900">CodePractice</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {navItems.map(item => (
            <NavButton key={item.id} {...item} />
          ))}
        </div>

        {/* User Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-100">
            <Bell size={20} />
          </button>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex justify-center items-center">
                  <User size={16} className="text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
              </button>
              {isProfileOpen && <ProfileDropdown />}
            </div>
          ) : (
            <button
              onClick={() => handleNavigation('login')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
            >
              Sign In
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-2 py-3 space-y-1">
          {navItems.map(item => (
            <NavButton key={item.id} {...item} />
          ))}
          <div className="border-t border-gray-200 pt-3">
            {user ? (
              <>
                <div className="flex items-center px-3 py-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex justify-center items-center mr-3">
                    <User size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                  <User size={16} className="mr-3" />
                  Profile
                </button>
                <button
                  onClick={onLogout}
                  className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                >
                  <LogOut size={16} className="mr-3" />
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => handleNavigation('login')}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
