import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen } from 'lucide-react';

const MENU_ITEMS = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/#about' },
  { label: 'Program', href: '/#program' },
  { label: 'Assessment', href: '/#assessment' },
  { label: 'Progress', href: '/#progress' },
  { label: 'Who Can Join', href: '/#who-can-join' },
  { label: 'Certificates', href: '/#certificates' },
  { label: 'Partners', href: '/#partners' },
  { label: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass-dark py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo and Menu Items */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <BookOpen className="text-secondary group-hover:text-primary transition-colors" size={28} />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              NextScholar
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden xl:flex items-center gap-6">
            {MENU_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-gray-300 hover:text-white transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all group-hover:w-full rounded" />
              </a>
            ))}
          </div>
        </div>

        {/* Right Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Login
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors">
            LMS
          </button>
          <Link to="/enquiry" className="px-5 py-2 text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all outline-none text-white whitespace-nowrap">
            Join Class
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="xl:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="xl:hidden absolute top-full left-0 w-full glass-dark border-t border-white/10 flex flex-col p-4">
          {MENU_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="py-3 px-4 text-gray-300 border-b border-white/5"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <div className="flex flex-col gap-3 p-4">
            <button className="w-full py-2 bg-white/5 rounded">Login</button>
            <button className="w-full py-2 bg-white/5 rounded">LMS</button>
            <Link to="/enquiry" className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded text-center" onClick={() => setIsOpen(false)}>
              Join Class
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
