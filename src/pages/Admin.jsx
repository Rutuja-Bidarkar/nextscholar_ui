import React, { useState, useEffect } from 'react';
import { getSiteContent, updateSiteContent, resetSiteContent } from '../data';
import { Save, LogIn, Lock, Info, RotateCcw } from 'lucide-react';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [content, setContent] = useState(getSiteContent());
  const [saveStatus, setSaveStatus] = useState('');

  const login = (e) => {
    e.preventDefault();
    if (password === 'admin123') setIsAuthenticated(true);
    else alert('Incorrect Password (Use: admin123)');
  };

  const handleChange = (section, field, value) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleProgramChange = (id, field, value) => {
    setContent(prev => ({
      ...prev,
      program: {
        ...prev.program,
        items: prev.program.items.map(p => p.id === id ? { ...p, [field]: value } : p)
      }
    }));
  };

  const handleTestimonialChange = (id, field, value) => {
    setContent(prev => ({
      ...prev,
      testimonials: prev.testimonials.map(t => t.id === id ? { ...t, [field]: value } : t)
    }));
  };

  const saveContent = () => {
    updateSiteContent(content);
    setSaveStatus('Saved Successfully!');
    // Dispatch event to app to trigger rerender if needed, but react router usually handles it on navigation
    window.dispatchEvent(new Event('contentUpdated'));
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const resetContent = () => {
    if(window.confirm("Are you sure you want to reset all content to defaults?")) {
      const defaultData = resetSiteContent();
      setContent(defaultData);
      window.dispatchEvent(new Event('contentUpdated'));
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="glass-dark p-12 rounded-3xl max-w-md w-full text-center">
          <Lock size={48} className="mx-auto text-purple-500 mb-6" />
          <h2 className="text-3xl font-bold mb-8">Admin Access</h2>
          <form onSubmit={login} className="space-y-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-purple-500 outline-none text-white text-center tracking-widest"
              placeholder="Enter Password"
            />
            <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold hover:shadow-lg transition-all flex justify-center items-center gap-2">
              <LogIn size={20} /> Login
            </button>
          </form>
          <p className="mt-6 text-gray-500 text-sm flex items-center justify-center gap-1"><Info size={14}/> Demo password: admin123</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 min-h-screen bg-darker">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <div className="flex justify-between items-center mb-10 glass p-6 rounded-2xl sticky top-24 z-20">
          <h1 className="text-3xl font-bold text-gradient">Content Management</h1>
          <div className="flex gap-4">
            <button onClick={resetContent} className="px-6 py-3 bg-red-600/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-600/40 transition-colors flex items-center gap-2 font-semibold">
              <RotateCcw size={18} /> Reset
            </button>
            <button onClick={saveContent} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg hover:shadow-purple-500/30 transition-all flex items-center gap-2 font-semibold text-white">
              <Save size={18} /> {saveStatus || 'Save Changes'}
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {/* Hero Content */}
          <section className="glass-dark p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 text-blue-400 border-b border-white/10 pb-4">Hero Section</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400">Main Title</label>
                <input value={content.hero.title} onChange={e => handleChange('hero', 'title', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded p-3 mt-1 outline-none focus:border-purple-500" />
              </div>
              <div>
                <label className="text-sm text-gray-400">Subtitle</label>
                <textarea value={content.hero.subtitle} onChange={e => handleChange('hero', 'subtitle', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded p-3 mt-1 outline-none focus:border-purple-500 h-24" />
              </div>
            </div>
          </section>

          {/* About */}
          <section className="glass-dark p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 text-blue-400 border-b border-white/10 pb-4">About Section</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400">Title</label>
                <input value={content.about.title} onChange={e => handleChange('about', 'title', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded p-3 mt-1 outline-none focus:border-purple-500" />
              </div>
              <div>
                <label className="text-sm text-gray-400">Content</label>
                <textarea value={content.about.content} onChange={e => handleChange('about', 'content', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded p-3 mt-1 outline-none focus:border-purple-500 h-32" />
              </div>
            </div>
          </section>

          {/* Programs */}
          <section className="glass-dark p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 text-blue-400 border-b border-white/10 pb-4">Programs Overview</h2>
            <input value={content.program.title} onChange={e => handleChange('program', 'title', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded p-3 mb-6 outline-none focus:border-purple-500" />
            <div className="grid md:grid-cols-3 gap-6">
              {content.program.items.map(item => (
                <div key={item.id} className="bg-black/30 p-4 rounded-xl border border-white/5">
                  <input value={item.subject} onChange={e => handleProgramChange(item.id, 'subject', e.target.value)} className="w-full bg-transparent font-bold text-lg mb-2 focus:text-purple-400 outline-none" />
                  <textarea value={item.desc} onChange={e => handleProgramChange(item.id, 'desc', e.target.value)} className="w-full bg-black/50 border border-white/10 rounded p-2 text-sm h-24 outline-none focus:border-purple-500 text-gray-300" />
                </div>
              ))}
            </div>
          </section>

          {/* Testimonials */}
          <section className="glass-dark p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 text-blue-400 border-b border-white/10 pb-4">Testimonials</h2>
            <div className="space-y-6">
              {content.testimonials.map(item => (
                <div key={item.id} className="bg-black/30 p-4 rounded-xl border border-white/5 grid md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <input value={item.name} onChange={e => handleTestimonialChange(item.id, 'name', e.target.value)} className="w-full bg-black/50 border border-white/10 rounded p-2 focus:border-purple-500 outline-none" placeholder="Name" />
                    <input value={item.role} onChange={e => handleTestimonialChange(item.id, 'role', e.target.value)} className="w-full bg-black/50 border border-white/10 rounded p-2 focus:border-purple-500 outline-none" placeholder="Role (e.g. Student)" />
                  </div>
                  <textarea value={item.content} onChange={e => handleTestimonialChange(item.id, 'content', e.target.value)} className="w-full bg-black/50 border border-white/10 rounded p-2 focus:border-purple-500 outline-none h-full min-h-[100px]" placeholder="Quote" />
                </div>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section className="glass-dark p-8 rounded-2xl mb-12">
            <h2 className="text-2xl font-bold mb-6 text-blue-400 border-b border-white/10 pb-4">Contact Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-400">Email Address</label>
                <input value={content.contact.email} onChange={e => handleChange('contact', 'email', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded p-3 mt-1 outline-none focus:border-purple-500" />
              </div>
              <div>
                <label className="text-sm text-gray-400">Phone Number</label>
                <input value={content.contact.phone} onChange={e => handleChange('contact', 'phone', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded p-3 mt-1 outline-none focus:border-purple-500" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
