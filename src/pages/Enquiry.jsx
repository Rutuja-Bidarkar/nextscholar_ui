import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Phone, Clock, Calendar, ChevronDown, Send } from 'lucide-react';

export default function Enquiry() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    // Simulate EmailJS or backend API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Store in localStorage to simulate DB
    const existing = JSON.parse(localStorage.getItem('nextScholarEnquiries') || '[]');
    existing.push({ ...data, date: new Date().toISOString() });
    localStorage.setItem('nextScholarEnquiries', JSON.stringify(existing));

    setSuccess(true);
    setIsSubmitting(false);
    reset();
    
    // Auto hide success
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="pt-32 pb-20 min-h-screen relative flex items-center justify-center bg-gradient-to-br from-darker via-black to-purple-900/20">
      {/* Background decorations */}
      <div className="absolute top-40 -left-64 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 -right-64 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <div className="glass-dark p-12 rounded-[2.5rem] border border-white/10 shadow-2xl backdrop-blur-xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black mb-4 text-gradient">Join NextScholar</h1>
            <p className="text-xl text-gray-400">Transform your foundation. Reserve your spot today.</p>
          </div>

          {success && (
            <div className="mb-8 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 text-center font-medium animate-pulse">
              Request submitted successfully! We will contact you soon.
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Student Name</label>
                <input
                  {...register("name", { required: "Name is required" })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-gray-600"
                  placeholder="John Doe"
                />
                {errors.name && <span className="text-red-400 text-sm">{errors.name.message}</span>}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2"><Mail size={16}/> Email Address</label>
                <input
                  type="email"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                  })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-gray-600"
                  placeholder="john@example.com"
                />
                {errors.email && <span className="text-red-400 text-sm">{errors.email.message}</span>}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2"><Phone size={16}/> Phone Number</label>
                <input
                  {...register("phone", { 
                    required: "Phone is required",
                    pattern: { value: /^[0-9+\s-]{10,}$/, message: "Invalid phone number" }
                  })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-gray-600"
                  placeholder="+1 234 567 8900"
                />
                {errors.phone && <span className="text-red-400 text-sm">{errors.phone.message}</span>}
              </div>

              {/* Standard */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Standard / Grade</label>
                <div className="relative">
                  <select
                    {...register("standard", { required: "Please select a standard" })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="bg-darker">Select Standard</option>
                    {[6, 7, 8, 9, 10].map(grade => (
                      <option key={grade} value={grade} className="bg-darker">Grade {grade}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-3.5 text-gray-400 pointer-events-none" size={20} />
                </div>
                {errors.standard && <span className="text-red-400 text-sm">{errors.standard.message}</span>}
              </div>

              {/* Preferred Time to call */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2"><Clock size={16}/> Exact Call Time</label>
                <input
                  type="time"
                  {...register("callTime", { required: "Call time is required" })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all [color-scheme:dark]"
                />
                {errors.callTime && <span className="text-red-400 text-sm">{errors.callTime.message}</span>}
              </div>

              {/* Slot */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2"><Calendar size={16}/> Preferred Time Slot</label>
                <div className="relative">
                  <select
                    {...register("timeSlot", { required: "Please select a time slot" })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="bg-darker">Select Slot</option>
                    <option value="Morning" className="bg-darker">Morning (9 AM - 12 PM)</option>
                    <option value="Afternoon" className="bg-darker">Afternoon (12 PM - 4 PM)</option>
                    <option value="Evening" className="bg-darker">Evening (4 PM - 8 PM)</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-3.5 text-gray-400 pointer-events-none" size={20} />
                </div>
                {errors.timeSlot && <span className="text-red-400 text-sm">{errors.timeSlot.message}</span>}
              </div>

            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-lg hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] transition-all flex justify-center items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="animate-pulse">Sending Request...</span>
              ) : (
                <>Submit Enquiry <Send size={20} /></>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
