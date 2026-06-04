import React, { useState, useEffect } from 'react';
import { 
  Lock, KeyRound, User, Briefcase, Award, FolderKanban, 
  GraduationCap, Star, Settings, Eye, Trash2, Plus, 
  Upload, Save, RefreshCw, LogOut, ArrowLeft, Check, 
  AlertCircle, ChevronRight, MessageSquare, Mail, MapPin, 
  Smartphone, PlusCircle, X, ExternalLink
} from 'lucide-react';
import { personalInfo as initialInfo, projects as initialProjects, skills as initialSkills, experiences as initialExperiences, education as initialEducation, trainings as initialTrainings, references as initialReferences, testimonials as initialTestimonials } from '../data';
import { Project, Skill, Experience, Testimonial } from '../types';

interface Submission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

export default function AdminPanel({ onBack }: { onBack: () => void }) {
  // Authentication State
  const [passkey, setPasskey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // Active Tab Manager
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'skills' | 'experience' | 'education' | 'reviews' | 'submissions'>('profile');

  // Unified State Stores (Pre-populated from data.ts)
  const [personalInfo, setPersonalInfo] = useState(initialInfo);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences);
  const [education, setEducation] = useState(initialEducation);
  const [trainings, setTrainings] = useState(initialTrainings);
  const [references, setReferences] = useState(initialReferences);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  // Local raw input state to prevent cursor jump/loss during comma-separated technologies typing
  const [techInputs, setTechInputs] = useState<Record<string, string>>({});

  // Image load error fallback tracker inside admin lists
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  // Action status feedbacks
  const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error' | 'warning'; message: string }>({ type: 'idle', message: '' });

  // Upload fields per item tracker
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);

  // Load submissions and check existing session
  useEffect(() => {
    const savedToken = sessionStorage.getItem('faisal_portfolio_auth_token');
    const savedPasskey = sessionStorage.getItem('faisal_portfolio_passkey');
    if (savedToken === 'faisal-admin-auth-token-1337' && savedPasskey) {
      setPasskey(savedPasskey);
      setIsAuthenticated(true);
      fetchSubmissions();
    }
  }, []);

  const fetchSubmissions = async () => {
    try {
      const res = await fetch('/api/contact');
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data.submissions || []);
      }
    } catch (e) {
      console.error('Error fetching submissions:', e);
    }
  };

  const deleteSubmission = async (id: string) => {
    if (!window.confirm('Are you sure you want to dismiss this message?')) return;
    try {
      const res = await fetch(`/api/contact/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setSubmissions(prev => prev.filter(s => s.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsVerifying(true);

    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passkey })
      });

      // Check if server returned a non-JSON response (e.g. 404 HTML page)
      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        setAuthError('Server error: API route not found. Check Vercel deployment and vercel.json configuration.');
        return;
      }

      const data = await res.json();

      if (res.ok && data.success) {
        sessionStorage.setItem('faisal_portfolio_auth_token', data.token);
        sessionStorage.setItem('faisal_portfolio_passkey', passkey);
        setIsAuthenticated(true);
        fetchSubmissions();
      } else if (res.status === 500 && data.error?.includes('ADMIN_PASSKEY')) {
        // Specific error for missing env variable
        setAuthError('Server misconfiguration: ADMIN_PASSKEY is not set in Vercel Environment Variables. Go to Vercel Dashboard → Settings → Environment Variables and add it.');
      } else {
        setAuthError(data.error || 'Access denied. Incorrect passkey.');
      }
    } catch (err: any) {
      setAuthError('Connection failed. The /api/admin/verify serverless function is unreachable. Ensure vercel.json routes are correct and the project is redeployed.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('faisal_portfolio_auth_token');
    sessionStorage.removeItem('faisal_portfolio_passkey');
    setIsAuthenticated(false);
    setPasskey('');
  };

  // Reusable File Binary Uploader — uses Vercel Blob via /api/upload-image
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, onComplete: (url: string) => void) => {
    if (!event.target.files || !event.target.files[0]) return;
    const file = event.target.files[0];

    if (!file.type.startsWith('image/')) {
      alert('Only image files are permitted.');
      return;
    }

    // 5MB client-side size guard
    if (file.size > 5 * 1024 * 1024) {
      alert('Image exceeds 5MB limit. Please compress or resize before uploading.');
      return;
    }

    setUploadProgress('Reading and uploading image...');
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64Data = reader.result as string;
        try {
          const response = await fetch('/api/upload-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              passkey,
              fileName: file.name,
              fileContent: base64Data
            })
          });

          const contentType = response.headers.get('content-type') || '';
          if (!contentType.includes('application/json')) {
            alert('Upload failed: API route not found. Check vercel.json and redeploy.');
            setUploadProgress(null);
            return;
          }

          const data = await response.json();
          if (response.ok && data.success) {
            // data.imagePath is a full https:// Vercel Blob URL
            onComplete(data.imagePath);
            setUploadProgress(null);
          } else {
            alert(data.error || 'Image upload failed.');
            setUploadProgress(null);
          }
        } catch (fetchErr: any) {
          alert(`Upload request failed: ${fetchErr.message}`);
          setUploadProgress(null);
        }
      };
      reader.onerror = () => {
        alert('Failed to read file. Please try again.');
        setUploadProgress(null);
      };
    } catch (err: any) {
      alert(`Upload error: ${err.message}`);
      setUploadProgress(null);
    }
  };

  // Resolve image src — handles both full Blob URLs (https://) and legacy relative paths
  const resolveImageSrc = (src: string) => {
    if (!src) return '';
    if (src.startsWith('http://') || src.startsWith('https://')) return src;
    return src.startsWith('/') ? src : `/${src}`;
  };

  // Save portfolio data — on Vercel this is ephemeral (filesystem is read-only)
  // Changes are acknowledged with a clear warning so the user knows to commit to GitHub
  const handleSavePortfolioData = async () => {
    setStatus({ type: 'loading', message: 'Sending data to server...' });

    try {
      const response = await fetch('/api/portfolio-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          passkey,
          personalInfo,
          projects,
          skills,
          experiences,
          education,
          trainings,
          references,
          testimonials
        })
      });

      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        setStatus({ type: 'error', message: 'API route not found. Check vercel.json configuration.' });
        return;
      }

      const data = await response.json();

      if (response.ok && data.success) {
        // Vercel's filesystem is read-only — inform the user clearly
        setStatus({
          type: 'warning',
          message: '⚠️ Data received by server. However, Vercel\'s filesystem is read-only — changes will NOT persist across redeployments. To save permanently, update src/data.ts in your GitHub repo and redeploy.'
        });
      } else {
        setStatus({ type: 'error', message: data.error || 'Failed to save portfolio data.' });
      }
    } catch (err: any) {
      setStatus({ type: 'error', message: `Request failed: ${err.message || err}` });
    }
  };

  // Dynamic Array Handlers for Skills
  const handleSkillChange = (index: number, field: keyof Skill, value: any) => {
    setSkills(prev => {
      const clone = [...prev];
      clone[index] = { ...clone[index], [field]: value };
      return clone;
    });
  };

  const addNewSkill = () => {
    setSkills(prev => [...prev, { name: '', category: 'automation', level: 1 }]);
  };

  const removeSkill = (index: number) => {
    setSkills(prev => prev.filter((_, i) => i !== index));
  };

  // Dynamic Array Handlers for Experience
  const handleExperienceChange = (expId: string, field: keyof Experience, value: any) => {
    setExperiences(prev => prev.map(exp => {
      if (exp.id === expId) return { ...exp, [field]: value };
      return exp;
    }));
  };

  const handleExBulletChange = (expId: string, bIndex: number, text: string) => {
    setExperiences(prev => prev.map(exp => {
      if (exp.id === expId) {
        const bullets = [...exp.description];
        bullets[bIndex] = text;
        return { ...exp, description: bullets };
      }
      return exp;
    }));
  };

  const addExBullet = (expId: string) => {
    setExperiences(prev => prev.map(exp => {
      if (exp.id === expId) return { ...exp, description: [...exp.description, ''] };
      return exp;
    }));
  };

  const removeExBullet = (expId: string, bIndex: number) => {
    setExperiences(prev => prev.map(exp => {
      if (exp.id === expId) return { ...exp, description: exp.description.filter((_, i) => i !== bIndex) };
      return exp;
    }));
  };

  const addNewExperience = () => {
    const newId = `exp-${Date.now()}`;
    setExperiences(prev => [{ id: newId, role: '', company: '', period: '', description: [''] }, ...prev]);
  };

  const removeExperience = (id: string) => {
    setExperiences(prev => prev.filter(e => e.id !== id));
  };

  // Dynamic Array Handlers for Projects
  const handleProjectFieldChange = (projId: string, field: keyof Project, value: any) => {
    setProjects(prev => prev.map(proj => {
      if (proj.id === projId) return { ...proj, [field]: value };
      return proj;
    }));
  };

  const handleProjTechnologiesChange = (projId: string, text: string) => {
    setTechInputs(prev => ({ ...prev, [projId]: text }));
    const list = text.split(',').map(t => t.trim()).filter(Boolean);
    handleProjectFieldChange(projId, 'technologies', list);
  };

  const addNewProject = () => {
    const newId = `proj-${Date.now()}`;
    setProjects(prev => [
      { id: newId, title: '', description: '', longDescription: '', category: 'automation', technologies: [], image: '', featured: true, tag: '' },
      ...prev
    ]);
  };

  const removeProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  // Dynamic Array Handlers for Reviews (Testimonials)
  const handleTestimonialChange = (id: string, field: keyof Testimonial, value: any) => {
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const addNewTestimonial = () => {
    const newId = `rec-${Date.now()}`;
    setTestimonials(prev => [...prev, { id: newId, name: '', designation: '', company: '', reviewText: '', image: '', rating: 5 }]);
  };

  const removeTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  // Dynamic Handlers for Education
  const handleEduChange = (index: number, field: string, value: string) => {
    setEducation(prev => {
      const clone = [...prev];
      clone[index] = { ...clone[index], [field]: value };
      return clone;
    });
  };

  const addNewEducation = () => {
    setEducation(prev => [...prev, { degree: '', school: '', passingYear: '', details: '' }]);
  };

  const removeEducation = (index: number) => {
    setEducation(prev => prev.filter((_, i) => i !== index));
  };

  // Dynamic Handlers for Trainings & Certifications
  const handleTrainingChange = (index: number, field: string, value: string) => {
    setTrainings(prev => {
      const clone = [...prev];
      clone[index] = { ...clone[index], [field]: value };
      return clone;
    });
  };

  const addNewTraining = () => {
    setTrainings(prev => [...prev, { title: '', provider: '', link: '' }]);
  };

  const removeTraining = (index: number) => {
    setTrainings(prev => prev.filter((_, i) => i !== index));
  };

  // Lockscreen Login UI
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center px-4 font-sans select-none relative overflow-hidden">
        <div className="absolute top-1/4 -left-10 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 -right-10 w-80 h-80 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl relative z-10 transition-transform duration-300">
          <button 
            onClick={onBack}
            className="flex items-center text-xs text-zinc-500 hover:text-white cursor-pointer mb-6 transition"
          >
            <ArrowLeft size={14} className="mr-1" />
            <span>Return to Portfolio</span>
          </button>

          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
              <Lock size={24} />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white">Administrator Access</h2>
            <p className="text-xs text-zinc-500 mt-1">
              Please input your secure passkey to log in.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Administrative Passkey
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter Admin Secret Passkey"
                  value={passkey}
                  onChange={(e) => setPasskey(e.target.value)}
                  className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-xl px-4 py-3.5 pl-11 text-xs focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all font-mono"
                  required
                  autoFocus
                />
                <KeyRound size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              </div>
            </div>

            {authError && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs flex items-start space-x-2">
                <AlertCircle size={14} className="shrink-0 mt-0.5" />
                <span className="leading-relaxed">{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 text-black text-xs font-bold py-3.5 rounded-xl transition flex items-center justify-center space-x-2 cursor-pointer select-none"
            >
              {isVerifying ? (
                <>
                  <RefreshCw size={14} className="animate-spin text-black" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span>Unlock Admin Desk</span>
                  <ChevronRight size={14} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-[10px] text-zinc-600">
            Secure SQA Environment • Powered by Google AI Studio
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans antialiased flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-zinc-900 border-b md:border-b-0 md:border-r border-zinc-800 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <h1 className="text-sm font-bold text-white tracking-widest uppercase font-mono">
                  Manager Desk<span>.</span>
                </h1>
              </div>
              <p className="text-[10px] text-zinc-500 font-medium">Control Cabinet Suite</p>
            </div>
            <button
              onClick={onBack}
              className="md:hidden p-2 text-zinc-400 hover:text-white"
              title="Return to site"
            >
              <ArrowLeft size={16} />
            </button>
          </div>

          <nav className="space-y-1">
            <span className="block text-[9px] font-bold uppercase tracking-wider text-zinc-500 mb-2">Sections Config</span>
            {([
              { key: 'profile', icon: <User size={14} />, label: 'Personal Details' },
              { key: 'skills', icon: <Award size={14} />, label: 'Technical Skills' },
              { key: 'experience', icon: <Briefcase size={14} />, label: 'Work Experience' },
              { key: 'projects', icon: <FolderKanban size={14} />, label: 'Portfolio Projects' },
              { key: 'education', icon: <GraduationCap size={14} />, label: 'Education & Trainings' },
              { key: 'reviews', icon: <Star size={14} />, label: 'Testimonial Reviews' },
            ] as const).map(({ key, icon, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-3 transition cursor-pointer select-none ${
                  activeTab === key
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40 border border-transparent'
                }`}
              >
                {icon}
                <span>{label}</span>
              </button>
            ))}

            <span className="block text-[9px] font-bold uppercase tracking-wider text-zinc-500 pt-4 mb-2">Interactions</span>
            <button
              onClick={() => setActiveTab('submissions')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition cursor-pointer select-none ${
                activeTab === 'submissions'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40 border border-transparent'
              }`}
            >
              <div className="flex items-center space-x-3">
                <MessageSquare size={14} />
                <span>Inbox Messages</span>
              </div>
              {submissions.length > 0 && (
                <span className="bg-emerald-500 text-black font-bold font-mono text-[9px] px-1.5 py-0.5 rounded-full">
                  {submissions.length}
                </span>
              )}
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-zinc-800 space-y-3 mt-6">
          <button
            onClick={onBack}
            className="w-full py-2.5 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 text-zinc-300 text-xs font-bold rounded-xl flex items-center justify-center space-x-2 cursor-pointer transition select-none"
          >
            <ArrowLeft size={13} />
            <span>Go to Frontend</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full py-2.5 bg-zinc-800 hover:bg-red-950/20 hover:text-red-400 text-zinc-400 text-xs font-bold rounded-xl flex items-center justify-center space-x-2 cursor-pointer transition select-none"
          >
            <LogOut size={13} />
            <span>Session Lock</span>
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 flex flex-col min-w-0" id="admin-desk-main">
        {/* Global Save Action Bar */}
        <header className="bg-zinc-900 border-b border-zinc-800 px-6 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-20">
          <div>
            <h2 className="text-sm font-bold text-white font-mono tracking-wider uppercase">
              {activeTab === 'profile' && 'Personal Information'}
              {activeTab === 'skills' && 'Technical Skills Proficiency'}
              {activeTab === 'experience' && 'Work Experience Settings'}
              {activeTab === 'projects' && 'Portfolio Project Matrix'}
              {activeTab === 'education' && 'Education & Certified Trainings'}
              {activeTab === 'reviews' && 'Reviews & Recommendations Carousel'}
              {activeTab === 'submissions' && 'Contact Form Submissions'}
            </h2>
            <p className="text-[10px] text-zinc-500">Edit values and press Save to sync with server.</p>
          </div>

          <button
            onClick={handleSavePortfolioData}
            disabled={status.type === 'loading'}
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 text-black text-xs font-extrabold rounded-xl transition flex items-center space-x-2 cursor-pointer shadow-lg shadow-emerald-500/10 shrink-0 select-none"
          >
            {status.type === 'loading' ? (
              <RefreshCw size={14} className="animate-spin text-black" />
            ) : (
              <Save size={14} />
            )}
            <span>Save & Sync</span>
          </button>
        </header>

        {/* Status Banner */}
        {status.type !== 'idle' && (
          <div className="px-6 md:px-8 pt-4">
            <div className={`p-4 border rounded-xl flex items-start space-x-3 text-xs ${
              status.type === 'success'
                ? 'bg-emerald-950/10 text-emerald-400 border-emerald-900/40'
                : status.type === 'warning'
                ? 'bg-amber-950/10 text-amber-400 border-amber-900/40'
                : status.type === 'error'
                ? 'bg-red-950/10 text-red-500 border-red-900/40'
                : 'bg-zinc-900 text-zinc-300 border-zinc-800'
            }`}>
              {status.type === 'loading' && <RefreshCw size={14} className="animate-spin text-emerald-500 shrink-0 mt-0.5" />}
              {status.type === 'success' && <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />}
              {status.type === 'warning' && <AlertCircle size={14} className="text-amber-400 shrink-0 mt-0.5" />}
              {status.type === 'error' && <AlertCircle size={14} className="text-red-500 shrink-0 mt-0.5" />}
              <div>
                <p className="font-semibold">
                  {status.type === 'loading' ? 'Processing...' : status.type === 'success' ? 'Synchronized!' : status.type === 'warning' ? 'Heads Up' : 'Error'}
                </p>
                <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">{status.message}</p>
              </div>
              <button onClick={() => setStatus({ type: 'idle', message: '' })} className="ml-auto text-zinc-500 hover:text-white shrink-0">
                <X size={13} />
              </button>
            </div>
          </div>
        )}

        {/* Active Tab Panel */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto">

          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div id="tab-profile-editor" className="space-y-6 max-w-4xl">
              <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-6">
                <span className="block text-xs font-bold text-white mb-4 border-b border-zinc-800 pb-2">Profile & Bio</span>
                
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 pb-6 border-b border-zinc-800">
                  <div className="shrink-0">
                    <div className="w-24 h-24 bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800 flex items-center justify-center">
                      {personalInfo.avatar && !failedImages['profile-avatar'] ? (
                        <img 
                          src={resolveImageSrc(personalInfo.avatar)}
                          alt="avatar" 
                          className="w-full h-full object-cover" 
                          onError={() => setFailedImages(prev => ({ ...prev, 'profile-avatar': true }))}
                        />
                      ) : (
                        <User size={32} className="text-zinc-600" />
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                      Upload Avatar Photo
                    </label>
                    <input 
                      type="file" 
                      accept="image/*"
                      id="profile-avatar-input"
                      onChange={(e) => handleFileUpload(e, (url) => setPersonalInfo(p => ({ ...p, avatar: url })))}
                      className="hidden" 
                    />
                    <button
                      onClick={() => document.getElementById('profile-avatar-input')?.click()}
                      className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold rounded-lg flex items-center space-x-1.5 transition cursor-pointer select-none"
                    >
                      <Upload size={13} />
                      <span>Upload photo</span>
                    </button>
                    {uploadProgress && <p className="text-[10px] text-emerald-400 animate-pulse mt-1">{uploadProgress}</p>}
                    <p className="text-[10px] text-zinc-500 mt-2 font-mono truncate max-w-xs" title={personalInfo.avatar}>
                      {personalInfo.avatar || 'No image set'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Full Name</label>
                    <input type="text" value={personalInfo.name} onChange={(e) => setPersonalInfo(p => ({ ...p, name: e.target.value }))}
                      className="w-full bg-zinc-950 text-white text-xs border border-zinc-800 rounded-lg p-3 focus:outline-none focus:border-emerald-500" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Professional Title</label>
                    <input type="text" value={personalInfo.title} onChange={(e) => setPersonalInfo(p => ({ ...p, title: e.target.value }))}
                      className="w-full bg-zinc-950 text-white text-xs border border-zinc-800 rounded-lg p-3 focus:outline-none focus:border-emerald-500" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Email Address</label>
                    <input type="email" value={personalInfo.email} onChange={(e) => setPersonalInfo(p => ({ ...p, email: e.target.value }))}
                      className="w-full bg-zinc-950 text-white text-xs border border-zinc-800 rounded-lg p-3 focus:outline-none focus:border-emerald-500" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Phone</label>
                    <input type="text" value={personalInfo.phone || ''} onChange={(e) => setPersonalInfo(p => ({ ...p, phone: e.target.value }))}
                      className="w-full bg-zinc-950 text-white text-xs border border-zinc-800 rounded-lg p-3 focus:outline-none focus:border-emerald-500" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Location</label>
                    <input type="text" value={personalInfo.location || ''} onChange={(e) => setPersonalInfo(p => ({ ...p, location: e.target.value }))}
                      className="w-full bg-zinc-950 text-white text-xs border border-zinc-800 rounded-lg p-3 focus:outline-none focus:border-emerald-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">GitHub URL</label>
                      <input type="text" value={personalInfo.github || ''} onChange={(e) => setPersonalInfo(p => ({ ...p, github: e.target.value }))}
                        className="w-full bg-zinc-950 text-white text-xs border border-zinc-800 rounded-lg p-3 focus:outline-none focus:border-emerald-500" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">LinkedIn URL</label>
                      <input type="text" value={personalInfo.linkedin || ''} onChange={(e) => setPersonalInfo(p => ({ ...p, linkedin: e.target.value }))}
                        className="w-full bg-zinc-950 text-white text-xs border border-zinc-800 rounded-lg p-3 focus:outline-none focus:border-emerald-500" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Objective</label>
                  <textarea value={personalInfo.objective || ''} onChange={(e) => setPersonalInfo(p => ({ ...p, objective: e.target.value }))}
                    className="w-full bg-zinc-950 text-white text-xs border border-zinc-800 rounded-lg p-3 h-20 focus:outline-none focus:border-emerald-500" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Bio Description</label>
                  <textarea value={personalInfo.bio} onChange={(e) => setPersonalInfo(p => ({ ...p, bio: e.target.value }))}
                    className="w-full bg-zinc-950 text-white text-xs border border-zinc-800 rounded-lg p-3 h-32 focus:outline-none focus:border-emerald-500" />
                </div>
              </div>
            </div>
          )}

          {/* SKILLS TAB */}
          {activeTab === 'skills' && (
            <div id="tab-skills-editor" className="space-y-6 max-w-5xl">
              <div className="flex justify-between items-center bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
                <p className="text-xs text-zinc-400">Specify system tools, technologies & professional test categories.</p>
                <button onClick={addNewSkill} className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-black text-[10px] font-bold rounded-lg flex items-center space-x-1 cursor-pointer">
                  <Plus size={12} /><span>Add Skill</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(['languages', 'manual', 'automation', 'performance', 'tools'] as const).map((cat) => {
                  const prettyNames: Record<string, string> = {
                    languages: 'Languages & Core Systems',
                    manual: 'Manual Testing Methodologies',
                    automation: 'QA Test Automation Engines',
                    performance: 'API & Performance Benchmarks',
                    tools: 'Administrative SDLC Tools'
                  };
                  return (
                    <div key={cat} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
                      <span className="block text-xs font-bold text-emerald-400 border-b border-zinc-800 pb-2 tracking-wide font-mono">
                        {prettyNames[cat]}
                      </span>
                      {skills.filter(s => s.category === cat).length === 0 && (
                        <p className="text-[10px] text-zinc-600 italic">No skills registered for this category.</p>
                      )}
                      <div className="space-y-3.5">
                        {skills.map((s, idx) => {
                          if (s.category !== cat) return null;
                          return (
                            <div key={idx} className="flex items-center justify-between p-3 bg-zinc-950 border border-zinc-800 rounded-xl space-x-3">
                              <div className="flex-1 space-y-1.5 min-w-0">
                                <input type="text" value={s.name} onChange={(e) => handleSkillChange(idx, 'name', e.target.value)}
                                  className="w-full bg-transparent text-white font-semibold text-xs border-b border-transparent focus:border-emerald-500 focus:outline-none pb-0.5"
                                  placeholder="Skill Name..." />
                                <div className="flex items-center space-x-1">
                                  <span className="text-[9px] text-zinc-500 mr-1.5 uppercase font-mono">Power:</span>
                                  {[1,2,3,4,5].map((lvl) => (
                                    <button key={lvl} type="button" onClick={() => handleSkillChange(idx, 'level', lvl)}
                                      className={`w-3.5 h-3.5 rounded-full border transition-all cursor-pointer ${s.level >= lvl ? 'bg-emerald-500 border-emerald-400' : 'bg-zinc-800 border-zinc-700'}`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 shrink-0">
                                <select value={s.category} onChange={(e) => handleSkillChange(idx, 'category', e.target.value as any)}
                                  className="appearance-none bg-zinc-900 border border-zinc-800 rounded-md px-2 py-1 text-[10px] text-zinc-400 focus:outline-none cursor-pointer">
                                  <option value="languages">Languages</option>
                                  <option value="manual">Manual</option>
                                  <option value="automation">Automation</option>
                                  <option value="performance">Performance</option>
                                  <option value="tools">Tools</option>
                                </select>
                                <button onClick={() => removeSkill(idx)} className="p-1 px-2 hover:bg-red-500/10 hover:text-red-500 text-zinc-600 rounded-md transition cursor-pointer">
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* EXPERIENCE TAB */}
          {activeTab === 'experience' && (
            <div id="tab-experience-editor" className="space-y-6 max-w-5xl">
              <div className="flex justify-between items-center bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
                <p className="text-xs text-zinc-400">Configure your work experience nodes.</p>
                <button onClick={addNewExperience} className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-black text-[10px] font-bold rounded-lg flex items-center space-x-1 cursor-pointer">
                  <Plus size={12} /><span>Add Experience</span>
                </button>
              </div>
              <div className="space-y-6">
                {experiences.map((exp) => (
                  <div key={exp.id} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl relative space-y-4">
                    <button onClick={() => removeExperience(exp.id)}
                      className="absolute top-6 right-6 p-2 rounded-lg bg-zinc-950/40 hover:bg-red-500/10 text-zinc-500 hover:text-red-500 transition cursor-pointer border border-zinc-800">
                      <Trash2 size={14} />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4 border-b border-zinc-800">
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Company</label>
                        <input type="text" value={exp.company} onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)}
                          className="w-full bg-zinc-950 text-white text-xs border border-zinc-800 rounded-lg p-3 font-semibold focus:outline-none focus:border-emerald-500" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Role Title</label>
                        <input type="text" value={exp.role} onChange={(e) => handleExperienceChange(exp.id, 'role', e.target.value)}
                          className="w-full bg-zinc-950 text-white text-xs border border-zinc-800 rounded-lg p-3 focus:outline-none focus:border-emerald-500" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Period</label>
                        <input type="text" value={exp.period} onChange={(e) => handleExperienceChange(exp.id, 'period', e.target.value)}
                          className="w-full bg-zinc-950 text-white text-xs border border-zinc-800 rounded-lg p-3 font-mono focus:outline-none focus:border-emerald-500"
                          placeholder="e.g., September 2023 – Present" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                          Bullet Points ({exp.description.length})
                        </span>
                        <button onClick={() => addExBullet(exp.id)}
                          className="px-2.5 py-1 border border-zinc-800 hover:border-zinc-700 text-[9px] font-extrabold text-zinc-400 hover:text-white rounded-md transition cursor-pointer flex items-center space-x-1">
                          <Plus size={10} /><span>Add Bullet</span>
                        </button>
                      </div>
                      {exp.description.length === 0 && (
                        <p className="text-[10px] text-zinc-600 italic">No bullets added yet.</p>
                      )}
                      <div className="space-y-2">
                        {exp.description.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-center space-x-2 bg-zinc-950 p-2.5 rounded-xl border border-zinc-800">
                            <span className="font-mono text-[10px] text-zinc-600 select-none shrink-0 w-5 text-center">{bIdx + 1}.</span>
                            <textarea value={bullet} onChange={(e) => handleExBulletChange(exp.id, bIdx, e.target.value)}
                              className="flex-1 bg-transparent text-white text-xs border-0 focus:ring-0 focus:outline-none h-11 resize-none py-1 leading-snug" />
                            <button onClick={() => removeExBullet(exp.id, bIdx)}
                              className="p-1.5 text-zinc-600 hover:text-red-500 hover:bg-red-500/10 rounded-md transition cursor-pointer shrink-0">
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROJECTS TAB */}
          {activeTab === 'projects' && (
            <div id="tab-projects-editor" className="space-y-6 max-w-5xl">
              <div className="flex justify-between items-center bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
                <p className="text-xs text-zinc-400">Manage portfolio projects. ({projects.length} total)</p>
                <button onClick={addNewProject} className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-black text-[10px] font-bold rounded-lg flex items-center space-x-1 cursor-pointer">
                  <Plus size={12} /><span>Add Project</span>
                </button>
              </div>
              <div className="space-y-6">
                {projects.map((proj) => (
                  <div key={proj.id} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl relative space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                      <div className="flex items-center space-x-3">
                        <span className="text-xs font-mono bg-zinc-950 text-emerald-400 px-2 py-1 rounded border border-zinc-800">{proj.id}</span>
                        <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider">/ {proj.category}</span>
                      </div>
                      <button onClick={() => removeProject(proj.id)}
                        className="p-2 bg-zinc-950/40 hover:bg-red-500/10 border border-zinc-800 text-zinc-500 hover:text-red-500 rounded-lg transition cursor-pointer">
                        <Trash2 size={13} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      <div className="md:col-span-4 space-y-3">
                        <label className="block text-[10px] font-bold uppercase text-zinc-400">Project Cover Image</label>
                        <div className="aspect-video bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800 flex items-center justify-center">
                          {proj.image && !failedImages[proj.id] ? (
                            <img src={resolveImageSrc(proj.image)} alt={proj.title} className="w-full h-full object-cover"
                              onError={() => setFailedImages(prev => ({ ...prev, [proj.id]: true }))} />
                          ) : (
                            <FolderKanban size={24} className="text-zinc-700" />
                          )}
                        </div>
                        <input type="file" accept="image/*" id={`proj-img-input-${proj.id}`}
                          onChange={(e) => handleFileUpload(e, (url) => handleProjectFieldChange(proj.id, 'image', url))}
                          className="hidden" />
                        <button onClick={() => document.getElementById(`proj-img-input-${proj.id}`)?.click()}
                          className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold rounded-lg flex items-center justify-center space-x-1.5 transition cursor-pointer">
                          <Upload size={12} /><span>Replace Image</span>
                        </button>
                        {uploadProgress && <p className="text-[9px] text-emerald-400 animate-pulse text-center">{uploadProgress}</p>}
                        <div className="p-2 border border-zinc-800 bg-zinc-950 rounded-lg text-[9px] font-mono text-zinc-500 truncate" title={proj.image}>
                          {proj.image || '[No image set]'}
                        </div>
                        <label className="flex items-center space-x-2.5 cursor-pointer pt-1">
                          <input type="checkbox" checked={proj.featured}
                            onChange={(e) => handleProjectFieldChange(proj.id, 'featured', e.target.checked)}
                            className="rounded border-zinc-800 text-emerald-500 focus:ring-emerald-500 bg-zinc-950 cursor-pointer" />
                          <span className="text-xs font-semibold text-zinc-300">Feature in highlights</span>
                        </label>
                      </div>

                      <div className="md:col-span-8 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Project Title</label>
                            <input type="text" value={proj.title} onChange={(e) => handleProjectFieldChange(proj.id, 'title', e.target.value)}
                              className="w-full bg-zinc-950 text-white text-xs border border-zinc-800 rounded-lg p-3 font-bold focus:outline-none focus:border-emerald-500" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Category</label>
                            <select value={proj.category} onChange={(e) => handleProjectFieldChange(proj.id, 'category', e.target.value)}
                              className="w-full bg-zinc-950 text-white text-xs border border-zinc-800 rounded-lg p-3 focus:outline-none focus:border-emerald-500 cursor-pointer">
                              <option value="fullstack">Web / Mobile (fullstack)</option>
                              <option value="testcases">Test Cases (testcases)</option>
                              <option value="api">API Testing (api)</option>
                              <option value="automation">Web UI Automation</option>
                              <option value="performance">Performance (performance)</option>
                              <option value="manual">Manual (manual)</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Badge Tag</label>
                            <input type="text" value={proj.tag || ''} onChange={(e) => handleProjectFieldChange(proj.id, 'tag', e.target.value)}
                              className="w-full bg-zinc-950 text-white text-xs border border-zinc-800 rounded-lg p-3 focus:outline-none focus:border-emerald-500"
                              placeholder="e.g., Automation Suite" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Tech Stack (comma separated)</label>
                            <input type="text"
                              value={techInputs[proj.id] !== undefined ? techInputs[proj.id] : proj.technologies.join(', ')}
                              onChange={(e) => handleProjTechnologiesChange(proj.id, e.target.value)}
                              className="w-full bg-zinc-950 text-white text-xs border border-zinc-800 rounded-lg p-3 focus:outline-none focus:border-emerald-500 font-mono"
                              placeholder="Selenium, Java, Postman" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Short Description</label>
                          <input type="text" value={proj.description} onChange={(e) => handleProjectFieldChange(proj.id, 'description', e.target.value)}
                            className="w-full bg-zinc-950 text-white text-xs border border-zinc-800 rounded-lg p-3 focus:outline-none focus:border-emerald-500" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Full Description</label>
                          <textarea value={proj.longDescription} onChange={(e) => handleProjectFieldChange(proj.id, 'longDescription', e.target.value)}
                            className="w-full bg-zinc-950 text-white text-xs border border-zinc-800 rounded-lg p-3 h-20 focus:outline-none focus:border-emerald-500 leading-relaxed" />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {[
                            { label: 'Demo URL', field: 'demoUrl' as const, placeholder: 'https://...' },
                            { label: 'GitHub Repo', field: 'githubUrl' as const, placeholder: 'https://github...' },
                            { label: 'Play Store', field: 'playStoreUrl' as const, placeholder: 'Google Play link' },
                            { label: 'App Store', field: 'appStoreUrl' as const, placeholder: 'Apple Store link' },
                          ].map(({ label, field, placeholder }) => (
                            <div key={field}>
                              <label className="block text-[9px] font-bold uppercase text-zinc-500 mb-1">{label}</label>
                              <input type="text" value={(proj as any)[field] || ''} onChange={(e) => handleProjectFieldChange(proj.id, field, e.target.value)}
                                className="w-full bg-zinc-950 text-white text-[10px] font-mono border border-zinc-800 rounded p-2 focus:outline-none focus:border-emerald-500"
                                placeholder={placeholder} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EDUCATION & TRAINING TAB */}
          {activeTab === 'education' && (
            <div id="tab-education-editor" className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-7xl">
              <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-800 pb-2 mb-2">
                  <span className="text-xs font-bold text-white flex items-center space-x-1.5 font-mono">
                    <GraduationCap size={15} className="text-emerald-500" />
                    <span>Academic Background</span>
                  </span>
                  <button onClick={addNewEducation}
                    className="px-2.5 py-1 border border-zinc-800 hover:border-zinc-700 text-[9px] font-bold text-zinc-400 hover:text-white rounded-md transition cursor-pointer flex items-center space-x-1">
                    <Plus size={10} /><span>Add School</span>
                  </button>
                </div>
                {education.length === 0 && <p className="text-[10px] text-zinc-600 italic text-center py-6">No academic cards registered.</p>}
                <div className="space-y-4">
                  {education.map((edu, idx) => (
                    <div key={idx} className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl relative space-y-3">
                      <button onClick={() => removeEducation(idx)}
                        className="absolute top-4 right-4 p-1 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-md transition cursor-pointer">
                        <Trash2 size={12} />
                      </button>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-2">
                          <label className="block text-[9px] font-bold uppercase text-zinc-400 mb-0.5">Degree Title</label>
                          <input type="text" value={edu.degree} onChange={(e) => handleEduChange(idx, 'degree', e.target.value)}
                            className="w-full bg-zinc-900 text-white text-xs border border-zinc-800 rounded p-2 focus:outline-none" />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold uppercase text-zinc-400 mb-0.5">Grad Year</label>
                          <input type="text" value={edu.passingYear} onChange={(e) => handleEduChange(idx, 'passingYear', e.target.value)}
                            className="w-full bg-zinc-900 text-white text-xs border border-zinc-800 rounded p-2 font-mono text-center focus:outline-none" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold uppercase text-zinc-400 mb-0.5">School / University</label>
                        <input type="text" value={edu.school} onChange={(e) => handleEduChange(idx, 'school', e.target.value)}
                          className="w-full bg-zinc-900 text-white text-xs border border-zinc-800 rounded p-2 font-semibold focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold uppercase text-zinc-400 mb-0.5">Details / GPA</label>
                        <input type="text" value={edu.details} onChange={(e) => handleEduChange(idx, 'details', e.target.value)}
                          className="w-full bg-zinc-900 text-white text-xs border border-zinc-800 rounded p-2 focus:outline-none" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-800 pb-2 mb-2">
                  <span className="text-xs font-bold text-white flex items-center space-x-1.5 font-mono">
                    <Award size={15} className="text-emerald-500" />
                    <span>Certifications & Trainings</span>
                  </span>
                  <button onClick={addNewTraining}
                    className="px-2.5 py-1 border border-zinc-800 hover:border-zinc-700 text-[9px] font-bold text-zinc-400 hover:text-white rounded-md transition cursor-pointer flex items-center space-x-1">
                    <Plus size={10} /><span>Add Course</span>
                  </button>
                </div>
                {trainings.length === 0 && <p className="text-[10px] text-zinc-600 italic text-center py-6">No certifications listed.</p>}
                <div className="space-y-4">
                  {trainings.map((trn, idx) => (
                    <div key={idx} className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl relative space-y-3">
                      <button onClick={() => removeTraining(idx)}
                        className="absolute top-4 right-4 p-1 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-md transition cursor-pointer">
                        <Trash2 size={12} />
                      </button>
                      <div>
                        <label className="block text-[9px] font-bold uppercase text-zinc-400 mb-0.5">Course Title</label>
                        <input type="text" value={trn.title} onChange={(e) => handleTrainingChange(idx, 'title', e.target.value)}
                          className="w-full bg-zinc-900 text-white text-xs border border-zinc-800 rounded p-2 font-semibold focus:outline-none" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[9px] font-bold uppercase text-zinc-400 mb-0.5">Provider</label>
                          <input type="text" value={trn.provider} onChange={(e) => handleTrainingChange(idx, 'provider', e.target.value)}
                            className="w-full bg-zinc-900 text-white text-xs border border-zinc-800 rounded p-2 focus:outline-none" />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold uppercase text-zinc-400 mb-0.5">Credential Link</label>
                          <input type="text" value={trn.link} onChange={(e) => handleTrainingChange(idx, 'link', e.target.value)}
                            className="w-full bg-zinc-900 text-white text-xs border border-zinc-800 rounded p-2 font-mono focus:outline-none" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* REVIEWS TAB */}
          {activeTab === 'reviews' && (
            <div id="tab-reviews-editor" className="space-y-6 max-w-5xl">
              <div className="flex justify-between items-center bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
                <p className="text-xs text-zinc-400">Manage testimonial review cards. ({testimonials.length} reviews)</p>
                <button onClick={addNewTestimonial} className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-black text-[10px] font-bold rounded-lg flex items-center space-x-1 cursor-pointer">
                  <Plus size={12} /><span>Add Review</span>
                </button>
              </div>
              <div className="space-y-6">
                {testimonials.map((test) => (
                  <div key={test.id} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl relative space-y-4">
                    <button onClick={() => removeTestimonial(test.id)}
                      className="absolute top-6 right-6 p-2 bg-zinc-950/40 hover:bg-red-500/10 border border-zinc-800 text-zinc-500 hover:text-red-500 rounded-lg transition cursor-pointer">
                      <Trash2 size={13} />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="space-y-3">
                        <label className="block text-[10px] font-bold uppercase text-zinc-400">Reviewer Photo</label>
                        <div className="w-24 h-24 bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800 flex items-center justify-center">
                          {test.image && !failedImages[test.id] ? (
                            <img src={resolveImageSrc(test.image)} alt={test.name} className="w-full h-full object-cover"
                              onError={() => setFailedImages(prev => ({ ...prev, [test.id]: true }))} />
                          ) : (
                            <User size={38} className="text-zinc-700" />
                          )}
                        </div>
                        <input type="file" accept="image/*" id={`testi-img-input-${test.id}`}
                          onChange={(e) => handleFileUpload(e, (url) => handleTestimonialChange(test.id, 'image', url))}
                          className="hidden" />
                        <button onClick={() => document.getElementById(`testi-img-input-${test.id}`)?.click()}
                          className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-[10px] font-semibold rounded-lg flex items-center justify-center space-x-1.5 transition cursor-pointer">
                          <Upload size={12} /><span>Replace Photo</span>
                        </button>
                        {uploadProgress && <p className="text-[9px] text-emerald-400 animate-pulse text-center">{uploadProgress}</p>}
                        <div className="p-2 border border-zinc-800 bg-zinc-950 rounded-lg text-[9px] font-mono text-zinc-500 truncate" title={test.image}>
                          {test.image || '[No image]'}
                        </div>
                      </div>
                      <div className="md:col-span-3 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Author Name</label>
                            <input type="text" value={test.name} onChange={(e) => handleTestimonialChange(test.id, 'name', e.target.value)}
                              className="w-full bg-zinc-950 text-white text-xs border border-zinc-800 rounded-lg p-3 font-bold focus:outline-none focus:border-emerald-500" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Designation</label>
                            <input type="text" value={test.designation} onChange={(e) => handleTestimonialChange(test.id, 'designation', e.target.value)}
                              className="w-full bg-zinc-950 text-white text-xs border border-zinc-800 rounded-lg p-3 focus:outline-none focus:border-emerald-500" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Company</label>
                            <input type="text" value={test.company} onChange={(e) => handleTestimonialChange(test.id, 'company', e.target.value)}
                              className="w-full bg-zinc-950 text-white text-xs border border-zinc-800 rounded-lg p-3 focus:outline-none focus:border-emerald-500" />
                          </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Rating</label>
                            <select value={test.rating} onChange={(e) => handleTestimonialChange(test.id, 'rating', Number(e.target.value))}
                              className="w-full bg-zinc-950 text-amber-400 font-bold text-xs border border-zinc-800 rounded-lg p-3 focus:outline-none focus:border-emerald-500 cursor-pointer">
                              <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                              <option value="4">⭐⭐⭐⭐ (4/5)</option>
                              <option value="3">⭐⭐⭐ (3/5)</option>
                            </select>
                          </div>
                          <div className="col-span-3">
                            <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Review ID</label>
                            <input type="text" disabled value={test.id}
                              className="w-full bg-zinc-950/40 text-zinc-500 text-xs border border-zinc-800 rounded-lg p-3 font-mono cursor-not-allowed" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Review Text</label>
                          <textarea value={test.reviewText} onChange={(e) => handleTestimonialChange(test.id, 'reviewText', e.target.value)}
                            className="w-full bg-zinc-950 text-white text-xs border border-zinc-800 rounded-lg p-3 h-24 focus:outline-none focus:border-emerald-500 leading-relaxed" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUBMISSIONS TAB */}
          {activeTab === 'submissions' && (
            <div id="tab-submissions-panel" className="space-y-6 max-w-6xl">
              <div className="flex justify-between items-center bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
                <span className="text-xs text-zinc-400">Messages sent via the contact form.</span>
                <div className="flex items-center space-x-3">
                  <span className="bg-zinc-800 px-3 py-1 text-[10px] text-zinc-400 font-mono rounded-md uppercase tracking-wider">
                    {submissions.length} messages
                  </span>
                  <button onClick={fetchSubmissions}
                    className="px-3 py-1.5 border border-zinc-800 hover:border-zinc-700 text-[10px] text-zinc-400 hover:text-white rounded-lg flex items-center space-x-1 transition cursor-pointer">
                    <RefreshCw size={11} /><span>Refresh</span>
                  </button>
                </div>
              </div>

              {submissions.length === 0 ? (
                <div className="text-center p-16 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/40">
                  <Mail size={32} className="text-zinc-700 mx-auto mb-3" />
                  <h3 className="text-sm font-semibold text-zinc-400">No submissions yet</h3>
                  <p className="text-xs text-zinc-600 mt-1 max-w-sm mx-auto">
                    Contact form messages will appear here.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {submissions.map((sub) => (
                    <div key={sub.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 relative flex flex-col justify-between hover:border-zinc-700 transition">
                      <div>
                        <button onClick={() => deleteSubmission(sub.id)}
                          className="absolute top-5 right-5 p-1.5 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-md transition cursor-pointer border border-transparent hover:border-red-500/20">
                          <Trash2 size={13} />
                        </button>
                        <div className="space-y-1 pb-4 border-b border-zinc-800">
                          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-bold px-2 py-0.5 rounded inline-block tracking-wider">
                            ID: {sub.id}
                          </span>
                          <h3 className="text-white font-bold text-sm pt-1">{sub.name}</h3>
                          <p className="text-zinc-400 text-xs flex items-center space-x-1.5">
                            <Mail size={11} className="shrink-0" />
                            <a href={`mailto:${sub.email}`} className="hover:underline text-[11px] truncate">{sub.email}</a>
                          </p>
                        </div>
                        <div className="py-4 space-y-2">
                          <p className="text-zinc-500 text-[10px] uppercase font-mono tracking-wider font-bold">Subject:</p>
                          <p className="font-semibold text-xs text-zinc-200">{sub.subject}</p>
                          <p className="text-zinc-500 text-[10px] uppercase font-mono tracking-wider font-bold pt-2">Message:</p>
                          <div className="bg-zinc-950 p-3.5 border border-zinc-800 rounded-xl text-zinc-300 text-xs leading-relaxed max-h-40 overflow-y-auto whitespace-pre-wrap">
                            {sub.message}
                          </div>
                        </div>
                      </div>
                      <div className="pt-2 flex items-center justify-between border-t border-zinc-800 text-[9px] font-mono text-zinc-500">
                        <span>CONTACT FORM API</span>
                        <span>{new Date(sub.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
