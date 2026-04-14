import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  MessageSquare, 
  Zap, 
  Shield, 
  Cpu,
  CheckCircle2,
  ArrowRight,
  Share2,
  ExternalLink,
  Mail
} from 'lucide-react';
import FileUpload from './FileUpload';

interface LandingPageProps {
  onUpload: (file: File) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onUpload }) => {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden selection:bg-blue-100 selection:text-blue-700">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-50/50 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-indigo-50/40 rounded-full blur-[100px]" />
        <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] bg-purple-50/30 rounded-full blur-[120px]" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-200">
                <FileText className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 font-display">
                PDF.ai
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <NavLink href="#features">Features</NavLink>
              <NavLink href="#how-it-works">How it works</NavLink>
              <NavLink href="#pricing">Pricing</NavLink>
            </div>

            <div className="flex items-center space-x-4">
              <button className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">
                Sign in
              </button>
              <button className="bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-800 transition-all shadow-md active:scale-95">
                Join Waitlist
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                Powered by Llama 3.3 • Context-aware RAG
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900">
              The <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Smartest</span> way to <br />
              chat with your PDFs.
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-500 font-medium leading-relaxed">
              Upload any document and get instant answers, professional summaries, and intelligent mind maps. Built for researchers, students, and professionals.
            </p>
          </motion.div>

          {/* Core Feature: The Uploader */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto"
            id="uploader"
          >
            <div className="bg-white p-2 rounded-3xl premium-shadow-lg border border-gray-100 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative">
                <FileUpload onUpload={onUpload} />
              </div>
            </div>
          </motion.div>

          {/* Trusted By Section (Social Proof) */}
          <div className="pt-20">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mb-8">
              Trusted by 10,000+ professionals worldwide
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale">
              <MockLogo name="Stripe" />
              <MockLogo name="Google" />
              <MockLogo name="Netflix" />
              <MockLogo name="Airbnb" />
              <MockLogo name="Microsoft" />
            </div>
          </div>
        </div>

        {/* Features Grid (Bento Style) */}
        <section id="features" className="max-w-7xl mx-auto pt-40 px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">Everything you need to master your data</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Skip the endless scrolling. Let our AI do the heavy lifting for you in seconds.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[250px]">
            {/* Feature 1: Large Card */}
            <div className="md:col-span-8 bg-gray-50 rounded-3xl p-10 border border-gray-100 flex flex-col justify-between overflow-hidden relative group">
               <div className="relative z-10 space-y-4">
                 <div className="bg-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
                    <MessageSquare className="text-white" size={24} />
                 </div>
                 <h3 className="text-2xl font-bold text-gray-900">Context-Aware AI Chat</h3>
                 <p className="text-gray-500 max-w-md">Our AI understands the nuances of your document. Ask specific questions and get page-cited answers instantly.</p>
               </div>
               <div className="absolute right-[-40px] bottom-[-40px] w-64 h-64 bg-white rounded-full shadow-2xl border border-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <Cpu className="text-blue-100 w-32 h-32" />
               </div>
            </div>

            {/* Feature 2: Small Card */}
            <div className="md:col-span-4 bg-blue-600 rounded-3xl p-10 text-white flex flex-col justify-between">
              <Zap size={32} />
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Lightning Fast</h3>
                <p className="text-blue-100 text-sm">Processed under 3 seconds. Speed is our superpower.</p>
              </div>
            </div>

            {/* Feature 3: Small Card */}
            <div className="md:col-span-4 bg-gray-900 rounded-3xl p-10 text-white flex flex-col justify-between">
              <Shield size={32} className="text-green-400" />
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Privacy First</h3>
                <p className="text-gray-400 text-sm">Your files are encrypted and never used for training.</p>
              </div>
            </div>

            {/* Feature 4: Large Card */}
            <div className="md:col-span-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-10 border border-indigo-100 flex flex-col justify-between relative overflow-hidden">
               <div className="space-y-4">
                 <div className="bg-indigo-600 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
                    <CheckCircle2 className="text-white" size={24} />
                 </div>
                 <h3 className="text-2xl font-bold text-gray-900">Smart Summaries & Mind Maps</h3>
                 <p className="text-gray-500 max-w-md">Automatically generate structured summaries and visual connections to grasp complex topics faster than ever.</p>
               </div>
               <div className="absolute right-10 bottom-10 flex space-x-4">
                 <div className="w-12 h-20 bg-white rounded-xl shadow-md border border-gray-100" />
                 <div className="w-12 h-24 bg-white rounded-xl shadow-md border border-gray-100 translate-y-[-10px]" />
                 <div className="w-12 h-18 bg-white rounded-xl shadow-md border border-gray-100" />
               </div>
            </div>
          </div>
        </section>

        {/* Inspirational Story / Creator Section */}
        <section id="story" className="max-w-7xl mx-auto pt-40 px-4">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100">
                  <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">The Story Behind PDF.ai</span>
                </div>
                <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                  Born from the struggle of a student, built for the success of millions.
                </h2>
                <div className="space-y-4 text-lg text-gray-600 italic font-medium leading-relaxed">
                  <p>
                    "I remember the nights before my finals—staring at 200-page researchers and textbooks, feeling overwhelmed and defeated. I struggled to find the key answers I needed in time. That struggle became my fuel."
                  </p>
                  <p>
                    "I built this tool to be the solution I never had. Once I started using my own AI prototypes, my grades soared. This isn't just a product; it's a lifeline for every student who knows they have the potential, but just needs a smarter way to unlock it."
                  </p>
                </div>
                <div className="flex items-center space-x-4 pt-4">
                   <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg">
                      <span className="font-bold">BB</span>
                   </div>
                   <div>
                     <p className="font-bold text-gray-900">Bhargavi Battula</p>
                     <p className="text-sm text-gray-500">Founder & Lead Engineer</p>
                   </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-[2.5rem] premium-shadow border border-gray-100 relative"
              >
                 <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-xl rotate-12">
                    <span className="font-black text-xs uppercase tracking-tighter">Student<br/>Approved</span>
                 </div>
                 <div className="space-y-6">
                    <div className="flex space-x-2">
                       {[1,2,3,4,5].map(i => <span key={i} className="text-yellow-400">★</span>)}
                    </div>
                    <p className="text-2xl font-bold text-gray-900 leading-snug">
                       "My exam prep went from 10 hours of reading to 1 hour of intelligent chatting. Best decision ever."
                    </p>
                    <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                       <a 
                        href="https://github.com/bhargavibattula" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-blue-600 font-bold hover:underline"
                       >
                         <span>View Creator Github</span>
                         <ExternalLink size={16} />
                       </a>
                    </div>
                 </div>
              </motion.div>
           </div>
        </section>

        {/* Call to Action */}
        <section className="max-w-7xl mx-auto pt-40 pb-20 px-4">
           <div className="bg-gray-900 rounded-[3rem] p-12 md:p-24 text-center space-y-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.2),transparent)]"></div>
              <h2 className="text-4xl md:text-5xl font-bold text-white relative z-10">Start chatting with your documents today.</h2>
              <p className="text-gray-400 max-w-xl mx-auto relative z-10">Join thousands of students who have simplified their study prep with Bhargavi's brainchild.</p>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 relative z-10">
                <button 
                  onClick={() => document.getElementById('uploader')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-gray-900 px-8 py-4 rounded-full font-bold hover:scale-105 active:scale-95 transition-all flex items-center space-x-2"
                >
                  <span>Get Started for Free</span>
                  <ArrowRight size={18} />
                </button>
                <a 
                  href="https://github.com/bhargavibattula"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-400 font-semibold transition-colors px-6"
                >
                  Follow Creator
                </a>
              </div>
           </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 pt-20 pb-10 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-20">
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <FileText className="text-white" size={18} />
              </div>
              <span className="text-xl font-bold tracking-tight">PDF.ai</span>
            </div>
            <p className="text-gray-500 mb-8 max-w-xs text-sm leading-relaxed">
              Making information accessible and actionable for everyone, anywhere on any document. Built with passion by Bhargavi Battula.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/bhargavibattula" target="_blank" rel="noopener noreferrer">
                <SocialIcon icon={<ExternalLink size={18} />} />
              </a>
              <SocialIcon icon={<Share2 size={18} />} />
              <SocialIcon icon={<Mail size={18} />} />
            </div>
          </div>
          
          <FooterColumn title="Product" links={['Features', 'API', 'Changelog', 'Pricing']} />
          <FooterColumn title="Company" links={['About', 'Blog', 'Careers', 'Contact']} />
          <FooterColumn title="Legal" links={['Privacy', 'Terms', 'Security', 'Cookies']} />
        </div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-10 border-t border-gray-50 text-gray-400 text-sm">
          <p>© 2026 Bhargavi Battula. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
             <button className="hover:text-gray-900 transition-colors">Status</button>
             <button className="hover:text-gray-900 transition-colors">System</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <a href={href} className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors">
    {children}
  </a>
);

const FooterColumn = ({ title, links }: { title: string, links: string[] }) => (
  <div>
    <h4 className="font-bold text-gray-900 mb-6 text-sm uppercase tracking-wider">{title}</h4>
    <nav className="flex flex-col space-y-4">
      {links.map(link => (
        <button key={link} className="text-sm text-gray-500 hover:text-gray-900 transition-colors text-left">
          {link}
        </button>
      ))}
    </nav>
  </div>
);

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <button className="p-2 rounded-full border border-gray-200 text-gray-400 hover:border-gray-900 hover:text-gray-900 transition-all">
    {icon}
  </button>
);

const MockLogo = ({ name }: { name: string }) => (
  <span className="text-2xl font-black">{name}</span>
);

export default LandingPage;
