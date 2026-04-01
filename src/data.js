const DEFAULT_CONTENT = {
  hero: {
    title: "NextScholar",
    subtitle: "A Foundation Mastery Program for Mathematics, Science and English",
  },
  about: {
    title: "About Us",
    content: "NextScholar brings a revolutionary approach to foundational learning. We combine cutting-edge technology, 3D interactive models, and a premium curriculum to make learning Mathematics, Science, and English an immersive experience. Designed for students who want to excel, our program focuses on deep understanding rather than rote memorization."
  },
  program: {
    title: "Program Overview",
    items: [
      { id: 1, subject: "Mathematics", desc: "Advanced problem-solving with 3D visualizations." },
      { id: 2, subject: "Science", desc: "Interactive experiments and concept simulations." },
      { id: 3, subject: "English", desc: "Comprehensive language mastery and vocabulary building." }
    ]
  },
  testimonials: [
    { id: 1, name: "Sarah L.", role: "Student, Grade 8", content: "The interactive 3D models helped me understand physics concepts I struggled with for months!" },
    { id: 2, name: "Michael R.", role: "Parent", content: "NextScholar transformed my child's approach to learning. The progress tracking is incredibly transparent." },
  ],
  contact: {
    email: "hello@nextscholar.edu",
    phone: "+1 (800) 123-4567"
  }
};

export const getSiteContent = () => {
  const content = localStorage.getItem('nextScholarContent');
  if (content) {
    return JSON.parse(content);
  }
  return DEFAULT_CONTENT;
};

export const updateSiteContent = (newContent) => {
  localStorage.setItem('nextScholarContent', JSON.stringify(newContent));
};

export const resetSiteContent = () => {
  localStorage.setItem('nextScholarContent', JSON.stringify(DEFAULT_CONTENT));
  return DEFAULT_CONTENT;
};
