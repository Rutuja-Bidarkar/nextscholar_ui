import React, { useEffect, useRef } from 'react';
import { updateScrollProgress } from '../utils/scrollStore';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, Award, Users, BookOpen, Clock, ArrowRight } from 'lucide-react';
import HeroBackground from '../components/HeroBackground';

gsap.registerPlugin(ScrollTrigger);

export default function Home({ content }) {
  const containerRef = useRef(null);

  useEffect(() => {
    // We bind a ScrollTrigger to the whole container
    // that updates the scrollStore progress value from 0 to 1
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          updateScrollProgress(self.progress);
        }
      });
      
      // Add general reveal animations for sections
      gsap.utils.toArray('.reveal').forEach((elem) => {
        gsap.fromTo(elem, {
          y: 50,
          opacity: 0
        }, {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: elem,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        });
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen">
      
      <HeroBackground />

      {/* --- HERO SECTION --- */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative text-center">
        
        <div className="container mx-auto px-6 flex flex-col items-center relative z-10">
          <div className="z-10 reveal flex flex-col items-center">
            <h1 className="text-6xl md:text-[9rem] font-black mb-6 text-gradient tracking-tight drop-shadow-lg leading-none">
              {content.hero.title}
            </h1>
            <div className="bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent p-[1px] mb-8">
              <div className="bg-darker px-8 py-4 border-l-4 border-indigo-500 max-w-2xl text-left">
                <p className="text-xl md:text-3xl text-gray-300 leading-relaxed">
                  {content.hero.subtitle}
                </p>
              </div>
            </div>
            <div className="flex gap-4 justify-center mt-4">
              <a href="/enquiry" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all flex items-center gap-2 group text-lg text-white">
                Enquiry Form <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#about" className="px-8 py-4 glass-dark rounded-full font-semibold hover:bg-white/10 transition-colors border border-white/20 text-lg text-white">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="py-32 relative bg-dark/80 backdrop-blur-sm border-t border-white/5">
        <div className="container mx-auto px-6 reveal flex flex-col items-center text-center">
          <div className="max-w-4xl glass-dark p-12 rounded-3xl relative overflow-hidden flex flex-col items-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px]" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 flex items-center justify-center gap-4 w-full">
              <BookOpen className="text-blue-500" size={40} />
              {content.about.title}
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed z-10 relative">
              {content.about.content}
            </p>
          </div>
        </div>
      </section>

      {/* --- PROGRAM SECTION --- */}
      <section id="program" className="py-32 relative">
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-gradient reveal">
            {content.program.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 reveal">
            {content.program.items.map(item => (
              <div key={item.id} className="glass p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 border-t-2 border-t-purple-500/50">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-6 border border-white/10">
                  <BookOpen className="text-purple-400" size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.subject}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- METRICS / PROGRESS SECTION --- */}
      <section id="progress" className="py-32 bg-gradient-to-b from-transparent to-purple-900/20 border-b border-white/5 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center reveal">
            <div className="glass p-12 rounded-[3rem] shadow-[0_0_50px_rgba(139,92,246,0.15)] bg-black/40">
              <h2 className="text-4xl font-bold mb-8 text-white">Advanced Progress Tracking</h2>
              <div className="space-y-6">
                {[
                  { value: 85, label: "Mathematics Mastery" },
                  { value: 92, label: "Science Foundation" },
                  { value: 78, label: "English Vocabulary" }
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-300">{stat.label}</span>
                      <span className="font-bold text-purple-400">{stat.value}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-3">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full" style={{ width: `${stat.value}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-5xl font-bold mb-6 text-gradient">Real-time Insights</h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Parents and students can access interactive dashboards showing topic-by-topic comprehension, time spent on assessments, and projected growth.
              </p>
              <ul className="space-y-4">
                {['Weekly AI generated reports', 'Weakness isolation algorithms', 'Gamified milestone tracking'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-lg text-gray-300">
                    <CheckCircle className="text-green-500 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <section id="assessment" className="py-32 relative z-10">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-gradient reveal">
            What Our Community Says
          </h2>
          <div className="grid md:grid-cols-2 gap-8 reveal">
            {content.testimonials.map(t => (
              <div key={t.id} className="glass p-10 rounded-3xl relative">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Users size={100} />
                </div>
                <p className="text-xl text-gray-300 mb-8 italic relative z-10">"{t.content}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-xl font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">{t.name}</h4>
                    <span className="text-purple-400">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-black/80 border-t border-white/10 py-12 relative z-10">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4">NextScholar</h3>
            <p className="text-gray-400">Pioneering the future of educational technology with immersive 3D learning.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <p className="text-gray-400 flex items-center gap-2 mb-2"><Clock size={16}/> {content.contact.phone}</p>
            <p className="text-gray-400">Email: {content.contact.email}</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <a href="/admin" className="text-purple-400 hover:underline">Admin Login</a>
              <a href="/enquiry" className="text-purple-400 hover:underline">Join Program</a>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-600 mt-12 pt-8 border-t border-white/5">
          &copy; {new Date().getFullYear()} NextScholar Educational Platform. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
