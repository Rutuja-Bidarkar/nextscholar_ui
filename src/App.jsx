import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Enquiry from './pages/Enquiry';
import Admin from './pages/Admin';
import { getSiteContent } from './data';

function App() {
  const [content, setContent] = useState(getSiteContent());

  useEffect(() => {
    // Listen for custom event from Admin panel to hot-reload content
    const handleContentUpdate = () => setContent(getSiteContent());
    window.addEventListener('contentUpdated', handleContentUpdate);
    return () => window.removeEventListener('contentUpdated', handleContentUpdate);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-darker text-light relative overflow-hidden flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow z-10">
          <Routes>
            <Route path="/" element={<Home content={content} />} />
            <Route path="/enquiry" element={<Enquiry />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
