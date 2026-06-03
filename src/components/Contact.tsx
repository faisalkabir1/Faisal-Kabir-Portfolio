import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Send, Check, AlertTriangle, Inbox, Eye, Trash2, Key, Phone, Linkedin, Github } from 'lucide-react';

interface Submission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [showDeveloperPanel, setShowDeveloperPanel] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  // Load the mock or real submissions from server
  const fetchSubmissions = async () => {
    try {
      const res = await fetch('/api/contact');
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data.submissions || []);
      }
    } catch (err) {
      console.error('Error fetching submissions from server:', err);
    }
  };

  useEffect(() => {
    if (showDeveloperPanel) {
      fetchSubmissions();
    }
  }, [showDeveloperPanel]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        // Refresh inbox if active
        if (showDeveloperPanel) {
          fetchSubmissions();
        }
      } else {
        setStatus('error');
        setErrorMessage(result.error || 'Unable to broadcast message at this moment.');
      }
    } catch (err) {
      console.error('Submission failed:', err);
      setStatus('error');
      setErrorMessage('Network connection lost. Please verify your server status.');
    }
  };

  const deleteSubmission = async (id: string) => {
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        fetchSubmissions();
      }
    } catch (err) {
      console.error('Failed to delete transaction:', err);
    }
  };

  return (
    <section id="contact" className="py-16 bg-zinc-50 dark:bg-zinc-930">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Block */}
        <div id="contact-section-header" className="mb-10 text-center">
          <p className="text-xs font-mono font-medium tracking-widest text-zinc-400 dark:text-zinc-500 uppercase mb-3">
            Get In Touch
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#00bc7d]">
            Contact Me.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-stretch" id="contact-wrapper-grid">
          {/* Detail Side Card */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white dark:bg-zinc-950 p-8 rounded-2xl border border-zinc-150/40 dark:border-zinc-800/40 shadow-xs" id="contact-details-side">
            <div>
              <h3 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white mb-4">
                Let's discuss something remarkable.
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed mb-8">
                Seeking a technical audit, modern design deployment, or full-stack integrations? Submit details below or trigger direct emails.
              </p>

              <div className="space-y-6" id="contact-channels-info">
                <div className="flex items-center space-x-4" id="channel-email-wrapper">
                  <div className="p-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl text-[#00bc7d] dark:text-[#00bc7d]">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-400 block">Personal Email</span>
                    <a
                      id="direct-mailto-link"
                      href="mailto:onlyfaisalkabir@gmail.com"
                      className="text-xs font-semibold text-zinc-900 dark:text-white hover:underline hover:text-emerald-500 transition-colors"
                    >
                      onlyfaisalkabir@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4" id="channel-phone-wrapper">
                  <div className="p-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl text-[#00bc7d] dark:text-[#00bc7d]">
                    <Phone size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-400 block">Call Option</span>
                    <a
                      id="direct-phone-link"
                      href="tel:+8801916603009"
                      className="text-xs font-semibold text-zinc-900 dark:text-white hover:underline hover:text-emerald-500 transition-colors"
                    >
                      +8801916603009
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4" id="channel-linkedin-wrapper">
                  <div className="p-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl text-[#00bc7d] dark:text-[#00bc7d]">
                    <Linkedin size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-400 block">LinkedIn Profile</span>
                    <a
                      id="direct-linkedin-link"
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-zinc-900 dark:text-white hover:underline hover:text-emerald-500 transition-colors"
                    >
                      linkedin.com/in/faisal-kabir
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4" id="channel-github-wrapper">
                  <div className="p-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl text-[#00bc7d] dark:text-[#00bc7d]">
                    <Github size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-400 block">GitHub Account</span>
                    <a
                      id="direct-github-link"
                      href="https://github.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-zinc-900 dark:text-white hover:underline hover:text-emerald-500 transition-colors"
                    >
                      github.com/faisal-kabir
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && (
              <div className="pt-8 border-t border-zinc-100 dark:border-zinc-900/80 mt-12 md:mt-24">
                <button
                  id="dev-inbox-toggler"
                  onClick={() => setShowDeveloperPanel(!showDeveloperPanel)}
                  className="inline-flex items-center space-x-2 text-[10px] font-mono text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition cursor-pointer"
                >
                  <Eye size={12} />
                  <span>{showDeveloperPanel ? 'Close Submission Cabinet' : 'Developer Panel: Submissions'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Form Content Side */}
          <div className="lg:col-span-12 xl:col-span-7 bg-white dark:bg-zinc-950 p-8 rounded-2xl border border-zinc-150/40 dark:border-zinc-800/40 shadow-xs flex flex-col justify-between" id="contact-form-side">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  id="success-alert-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-12 text-center flex flex-col items-center justify-center h-full"
                >
                  <div className="w-12 h-12 rounded-full bg-zinc-90 w-full flex items-center justify-center text-zinc-950 dark:bg-white dark:text-zinc-950 mb-6">
                    <Check size={20} />
                  </div>
                  <h4 className="text-lg font-bold text-zinc-950 dark:text-white mb-2">
                    Inbound Transmission Anchored!
                  </h4>
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs max-w-sm mx-auto leading-relaxed mb-6">
                    Form response dispatched safely to my inbox. I typically respond within 24 operational hours.
                  </p>
                  <button
                    id="submit-another-btn"
                    onClick={() => setStatus('idle')}
                    className="px-6 py-2 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white text-xs font-semibold cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900 transition"
                  >
                    Transmit Another Note
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  id="primary-contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleFormSubmit}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5" id="form-sender-fields">
                    <div id="field-name-wrapper">
                      <label htmlFor="name" className="block text-[10px] font-mono font-bold uppercase text-zinc-400 dark:text-zinc-500 mb-1.5">
                        Your Name
                      </label>
                      <input
                        id="form-input-name"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-100 dark:border-zinc-800/80 rounded-xl px-4 py-3 text-xs focus:outline-hidden focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white transition"
                        placeholder="John Doe"
                      />
                    </div>

                    <div id="field-email-wrapper">
                      <label htmlFor="email" className="block text-[10px] font-mono font-bold uppercase text-zinc-400 dark:text-zinc-500 mb-1.5">
                        Your Email
                      </label>
                      <input
                        id="form-input-email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-100 dark:border-zinc-800/80 rounded-xl px-4 py-3 text-xs focus:outline-hidden focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white transition"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div id="field-subject-wrapper">
                    <label htmlFor="subject" className="block text-[10px] font-mono font-bold uppercase text-zinc-400 dark:text-zinc-500 mb-1.5">
                      Subject
                    </label>
                    <input
                      id="form-input-subject"
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-100 dark:border-zinc-800/80 rounded-xl px-4 py-3 text-xs focus:outline-hidden focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white transition"
                      placeholder="Project architecture analysis..."
                    />
                  </div>

                  <div id="field-message-wrapper">
                    <label htmlFor="message" className="block text-[10px] font-mono font-bold uppercase text-zinc-400 dark:text-zinc-500 mb-1.5">
                      Message Details
                    </label>
                    <textarea
                      id="form-input-message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-100 dark:border-zinc-800/80 rounded-xl px-4 py-3 text-xs focus:outline-hidden focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white transition resize-none"
                      placeholder="My primary project objectives..."
                    />
                  </div>

                  {status === 'error' && (
                    <div id="contact-error-prompt" className="p-3 bg-red-50 dark:bg-red-950/20 text-red-500 text-xs rounded-xl flex items-center space-x-2.5">
                      <AlertTriangle size={14} className="shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    id="transmit-message-btn"
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-3 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-xs font-semibold rounded-xl flex items-center justify-center space-x-2 hover:opacity-90 transition shadow-xs cursor-pointer disabled:opacity-50"
                  >
                    <span>{status === 'submitting' ? 'Anchoring...' : 'Transit Message'}</span>
                    <Send size={12} />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Dynamic Developer Submission Cabinet view */}
        <AnimatePresence>
          {showDeveloperPanel && (
            <motion.div
              id="dev-submissions-panel"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-12 bg-white dark:bg-zinc-950 border border-zinc-150/45 dark:border-zinc-800/40 rounded-2xl p-6 md:p-8 max-w-5xl mx-auto overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-zinc-100 dark:border-zinc-900 pb-4" id="cabinet-header">
                <div>
                  <h3 className="text-sm font-bold text-zinc-950 dark:text-white flex items-center space-x-2">
                    <Inbox size={16} />
                    <span>Inbound submissions database cabinet</span>
                  </h3>
                  <p className="text-[10px] text-zinc-500 mt-1">
                    Direct access to local memory logs on the container. Simulates what is emailed via Resend.
                  </p>
                </div>

                <div className="flex items-center space-x-2" id="cabinet-credentials-info">
                  <span className="text-[10px] bg-zinc-100 dark:bg-zinc-900 px-2 py-1 rounded-sm text-zinc-500 font-mono">
                    PORT: 3000 API
                  </span>
                </div>
              </div>

              {submissions.length > 0 ? (
                <div className="space-y-4" id="cabinet-logs-list">
                  {submissions.map((sub) => (
                    <div
                      key={sub.id}
                      id={`sub-entry-${sub.id}`}
                      className="p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80 rounded-xl relative group"
                    >
                      <button
                        id={`delete-sub-btn-${sub.id}`}
                        onClick={() => deleteSubmission(sub.id)}
                        className="absolute top-4 right-4 text-zinc-400 hover:text-red-500 transition cursor-pointer"
                        aria-label="Delete Submission"
                      >
                        <Trash2 size={14} />
                      </button>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3" id={`sub-meta-${sub.id}`}>
                        <div>
                          <span className="text-[9px] font-mono text-zinc-400 block uppercase">Sender</span>
                          <span className="text-xs font-semibold text-zinc-900 dark:text-white capitalize">{sub.name}</span>
                        </div>
                        <div>
                          <span className="text-[9px] font-mono text-zinc-400 block uppercase font-mono">Contact Email</span>
                          <span className="text-xs text-zinc-700 dark:text-zinc-300">{sub.email}</span>
                        </div>
                        <div>
                          <span className="text-[9px] font-mono text-zinc-400 block uppercase">Captured Time</span>
                          <span className="text-xs text-zinc-500">{new Date(sub.timestamp).toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="mb-2" id={`sub-subj-line-${sub.id}`}>
                        <span className="text-[9px] font-mono text-zinc-400 block uppercase">Subject Line</span>
                        <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">{sub.subject}</span>
                      </div>

                      <div id={`sub-body-line-${sub.id}`}>
                        <span className="text-[9px] font-mono text-zinc-400 block uppercase">Message Payload</span>
                        <p className="text-zinc-650 dark:text-zinc-400 text-xs leading-relaxed mt-1 font-sans bg-white dark:bg-zinc-950 p-3 rounded-lg border border-zinc-100 dark:border-zinc-850">
                          {sub.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div id="cabinet-empty-view" className="text-center py-8 text-zinc-400 dark:text-zinc-600 text-xs">
                  Inbox cabinet empty. Complete the contact form above to write entries.
                </div>
              )}

              {/* Server connection setup tips */}
              <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-900/30 rounded-xl flex items-start space-x-3" id="cabinet-setup-walkthrough">
                <Key size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-emerald-850 dark:text-emerald-400 mb-1">
                    Receiving Messages in your Personal Email Inbox
                  </h4>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
                    These contact form responses are fully functional! The backend handles submissions, logs them securely, and is set up to dispatch them directly to your designated email. To activate immediate email relaying:
                  </p>
                  <ol className="text-[10px] text-zinc-500 list-decimal pl-4 mt-2 space-y-1 font-sans">
                    <li>Create an account at <a href="https://resend.com" target="_blank" className="underline font-semibold hover:text-emerald-500">Resend.com</a> to retrieve a free API Key.</li>
                    <li>Add <code className="bg-emerald-100/30 dark:bg-emerald-900/20 px-1 py-0.5 rounded-sm font-mono">RESEND_API_KEY="your_key"</code> and your target <code className="bg-emerald-100/30 dark:bg-emerald-900/20 px-1 py-0.5 rounded-sm font-mono">CONTACT_EMAIL="your_email"</code> to your workspace secrets or `.env` variables.</li>
                  </ol>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
