import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Shield, 
  Database, 
  Code, 
  Briefcase, 
  GraduationCap, 
  Mail, 
  Github, 
  Linkedin, 
  ExternalLink,
  ChevronRight,
  MapPin,
  Phone,
  Lock,
  Cpu,
  Send
} from 'lucide-react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// --- CONFIGURATION ---
// Follow the instructions in FIREBASE_SETUP.md to get these keys!
const firebaseConfig = {
  // 1. Get these from Firebase Console -> Project Settings
  apiKey: "AIzaSyBpwqpWtFHSeDF9ULJxJGv8DjIbEL8ak74",
  authDomain: "my-portfolio-168ce.firebaseapp.com",
  projectId: "my-portfolio-168ce",
  storageBucket: "my-portfolio-168ce.firebasestorage.app",
  messagingSenderId: "636124222900",
  appId: "1:636124222900:web:dbd10c7cd9e0c9759bcee1"
};

// Initialize Firebase only if config is present (and not the placeholder)
const isConfigured = firebaseConfig.apiKey !== "PASTE_YOUR_API_KEY_HERE";
const app = isConfigured ? initializeApp(firebaseConfig) : null;
const db = app ? getFirestore(app) : null;

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const scrollTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) {
      setStatus('Firebase not configured! See comments in code.');
      // Fallback for demo purposes if they haven't set it up yet
      if (!isConfigured) {
        alert("You haven't pasted your Firebase keys in src/App.tsx yet! Check the guide.");
      }
      return;
    }
    
    setStatus('sending');
    try {
      // This will automatically create the "messages" collection if it doesn't exist
      await addDoc(collection(db, "messages"), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error("Error adding document: ", error);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-emerald-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold text-xl">
              <Terminal size={20} />
              <span>~/prathamesh</span>
            </div>
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Experience', 'Education', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className={`text-sm font-medium transition-colors hover:text-emerald-400 ${
                    activeSection === item.toLowerCase() ? 'text-emerald-400' : 'text-slate-400'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-mono mb-6 border border-emerald-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Open to Opportunities
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Prathamesh <span className="text-emerald-500">Upadhye</span>
            </h1>
            <p className="text-xl text-slate-400 mb-8 max-w-lg leading-relaxed">
              MSc. CyberSecurity & Security Test Engineer. 
              Specializing in vulnerability assessment, automation, and securing digital infrastructure.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-10 text-sm text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-emerald-500" /> Virginia, USA
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-emerald-500" /> 571-274-8558
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-emerald-500" /> bhalprathamesh6@gmail.com
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => scrollTo('contact')}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-all flex items-center gap-2"
              >
                Contact Me <ChevronRight size={16} />
              </button>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                className="px-6 py-3 border border-slate-700 hover:border-emerald-500/50 hover:bg-emerald-500/5 text-slate-300 rounded-lg font-medium transition-all flex items-center gap-2"
              >
                <Github size={18} /> GitHub
              </a>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full opacity-20 animate-pulse"></div>
            <div className="relative bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-2xl">
              <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-2 text-xs text-slate-500 font-mono">bash — 80x24</span>
              </div>
              <div className="font-mono text-sm space-y-2">
                <div className="flex">
                  <span className="text-emerald-500 mr-2">➜</span>
                  <span className="text-blue-400">~</span>
                  <span className="text-slate-400 ml-2">whoami</span>
                </div>
                <div className="text-slate-300 ml-4">
                  Security Test Engineer | Ethical Hacker
                </div>
                <div className="flex mt-4">
                  <span className="text-emerald-500 mr-2">➜</span>
                  <span className="text-blue-400">~</span>
                  <span className="text-slate-400 ml-2">cat skills.json</span>
                </div>
                <div className="text-yellow-100 ml-4">
                  <pre>{`{
  "languages": ["Python", "Bash", "React"],
  "tools": ["Burp Suite", "Wireshark", "Nmap"],
  "focus": ["Vulnerability Assessment", "OS Hardening"]
}`}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
            <Code className="text-emerald-500" /> Technical Arsenal
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-950 border border-slate-800 rounded-xl hover:border-emerald-500/30 transition-colors">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4 text-emerald-500">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Security Tools</h3>
              <div className="flex flex-wrap gap-2">
                {['Burp Suite', 'Wireshark', 'Nmap', 'Metasploit', 'Nessus', 'OWASP ZAP', 'Scapy'].map(skill => (
                  <span key={skill} className="px-2 py-1 bg-slate-900 border border-slate-800 rounded text-xs text-emerald-400 font-mono">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 bg-slate-950 border border-slate-800 rounded-xl hover:border-emerald-500/30 transition-colors">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4 text-blue-500">
                <Terminal size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Development</h3>
              <div className="flex flex-wrap gap-2">
                {['Python', 'Bash', 'PowerShell', 'React', 'Flutter', 'Git', 'GitHub'].map(skill => (
                  <span key={skill} className="px-2 py-1 bg-slate-900 border border-slate-800 rounded text-xs text-blue-400 font-mono">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 bg-slate-950 border border-slate-800 rounded-xl hover:border-emerald-500/30 transition-colors">
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4 text-purple-500">
                <Database size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Methodologies</h3>
              <div className="flex flex-wrap gap-2">
                {['Penetration Testing', 'OS Hardening', 'Network Segmentation', 'TCP/IP', 'Firewalls', 'Jira'].map(skill => (
                  <span key={skill} className="px-2 py-1 bg-slate-900 border border-slate-800 rounded text-xs text-purple-400 font-mono">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
            <Briefcase className="text-emerald-500" /> Experience
          </h2>

          <div className="space-y-12 relative border-l border-slate-800 ml-3 md:ml-6">
            
            {/* Experience Item 1 */}
            <div className="relative pl-8 md:pl-12">
              <div className="absolute -left-[5px] top-2 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-slate-950"></div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="text-xl font-bold text-white">Security Test Engineer</h3>
                <span className="text-sm font-mono text-emerald-500">Jul 2024 - Jul 2025</span>
              </div>
              <div className="text-slate-400 font-medium mb-4">Testriq QA Lab LLP | Thane, India</div>
              <ul className="space-y-2 text-slate-400 list-disc ml-4">
                <li>Performed security testing to identify vulnerabilities and ensure compliance with best practices.</li>
                <li>Improved testing efficiency by 30-70% and reduced execution time by 30-50% through targeted automation.</li>
                <li>Collaborated with clients to gather requirements and tailor risk-based test strategies.</li>
                <li>Tracked and prioritized defects using Jira and TestRail, producing trend reports for stakeholders.</li>
              </ul>
            </div>

            {/* Experience Item 2 */}
            <div className="relative pl-8 md:pl-12">
              <div className="absolute -left-[5px] top-2 w-3 h-3 rounded-full bg-slate-700 ring-4 ring-slate-950"></div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="text-xl font-bold text-white">Security Test Intern</h3>
                <span className="text-sm font-mono text-slate-500">Jun 2024 - Jul 2024</span>
              </div>
              <div className="text-slate-400 font-medium mb-4">Testriq QA Lab LLP | Thane, India</div>
              <ul className="space-y-2 text-slate-400 list-disc ml-4">
                <li>Authored test cases mapped to functional requirements and executed manual/exploratory tests.</li>
                <li>Logged defects with clear reproduction steps and contributed to regression suite maintenance.</li>
              </ul>
            </div>

            {/* Experience Item 3 */}
            <div className="relative pl-8 md:pl-12">
              <div className="absolute -left-[5px] top-2 w-3 h-3 rounded-full bg-slate-700 ring-4 ring-slate-950"></div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="text-xl font-bold text-white">Alpha Tester - "Fall Guys"</h3>
                <span className="text-sm font-mono text-slate-500">May 2020 - Nov 2020</span>
              </div>
              <div className="text-slate-400 font-medium mb-4">Epic Games | Remote</div>
              <ul className="space-y-2 text-slate-400 list-disc ml-4">
                <li>Tested pre-release builds to validate gameplay stability and core flows.</li>
                <li>Discovered a critical voice chat bug affecting gameplay, accelerating a high-impact fix.</li>
                <li>Reported issues in real-time via Discord and internal trackers.</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
            <GraduationCap className="text-emerald-500" /> Education
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-950 border border-slate-800 rounded-xl">
              <div className="text-emerald-400 text-sm font-mono mb-2">Fall 2025 - Current</div>
              <h3 className="text-xl font-bold text-white mb-1">MSc in Cybersecurity</h3>
              <div className="text-slate-400 mb-4">Northeastern University, Virginia</div>
              <div className="text-sm text-slate-500">
                Relevant Coursework: Advanced Cryptography, Digital Forensics, Cloud Security, GRC.
              </div>
            </div>

            <div className="p-6 bg-slate-950 border border-slate-800 rounded-xl">
              <div className="text-slate-500 text-sm font-mono mb-2">July 2024</div>
              <h3 className="text-xl font-bold text-white mb-1">BE in Information Technology</h3>
              <div className="text-slate-400 mb-4">St Francis Institute of Technology</div>
              <div className="text-sm text-slate-500">
                Honors in Cybersecurity. Coursework in Secure Software Development, Network Security.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Initialize Connection</h2>
          
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Identity (Name)</label>
                <input
                  type="text"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Communication Channel (Email)</label>
                <input
                  type="email"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Payload (Message)</label>
                <textarea
                  required
                  rows={4}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="Enter your message..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending' || status === 'success'}
                className={`w-full py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                  status === 'success' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                {status === 'sending' ? (
                  'Transmitting...'
                ) : status === 'success' ? (
                  'Transmission Complete'
                ) : (
                  <>Send Message <Send size={18} /></>
                )}
              </button>
              
              {status === 'error' && (
                <p className="text-red-400 text-center text-sm mt-2">
                  Transmission failed. Please check your connection.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800 text-center text-slate-500 text-sm">
        <p>© 2025 Prathamesh Upadhye. All systems operational.</p>
      </footer>
    </div>
  );
}

export default App;