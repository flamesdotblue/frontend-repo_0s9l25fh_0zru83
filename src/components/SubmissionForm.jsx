import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Mail, Phone, Globe, Send } from 'lucide-react';

export default function SubmissionForm({ onSubmitResource }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    category: 'Health',
    location: 'Downtown',
  });
  const [status, setStatus] = useState('idle');

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 1200);
      return;
    }
    setStatus('loading');
    setTimeout(() => {
      onSubmitResource?.(form);
      setStatus('success');
      setTimeout(() => setStatus('idle'), 1200);
      setForm({ name: '', email: '', phone: '', website: '', category: 'Health', location: 'Downtown' });
    }, 800);
  };

  return (
    <section id="add" className="relative py-20 bg-gradient-to-b from-[#0f0f0f] to-[#131313]">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center">Add a Community Resource</h2>
        <p className="text-white/70 text-center mt-2">Help the hub grow. We review every submission.</p>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <label className="group relative">
            <span className="text-white/80 text-sm">Organization Name</span>
            <div className={`mt-1 flex items-center gap-2 rounded-xl border ${form.name ? 'border-emerald-400/60' : 'border-white/15'} bg-black/30 px-3 py-2` }>
              <Building2 className="h-4 w-4 text-white/70" />
              <input
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                className="w-full bg-transparent outline-none text-white placeholder-white/50"
                placeholder="HopeCare Clinic"
              />
            </div>
          </label>
          <label className="group relative">
            <span className="text-white/80 text-sm">Contact Email</span>
            <div className={`mt-1 flex items-center gap-2 rounded-xl border ${form.email ? 'border-emerald-400/60' : 'border-white/15'} bg-black/30 px-3 py-2` }>
              <Mail className="h-4 w-4 text-white/70" />
              <input
                type="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                className="w-full bg-transparent outline-none text-white placeholder-white/50"
                placeholder="contact@hopecare.org"
              />
            </div>
          </label>
          <label className="group relative">
            <span className="text-white/80 text-sm">Phone</span>
            <div className="mt-1 flex items-center gap-2 rounded-xl border border-white/15 bg-black/30 px-3 py-2">
              <Phone className="h-4 w-4 text-white/70" />
              <input
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                className="w-full bg-transparent outline-none text-white placeholder-white/50"
                placeholder="(555) 123-9876"
              />
            </div>
          </label>
          <label className="group relative">
            <span className="text-white/80 text-sm">Website</span>
            <div className="mt-1 flex items-center gap-2 rounded-xl border border-white/15 bg-black/30 px-3 py-2">
              <Globe className="h-4 w-4 text-white/70" />
              <input
                value={form.website}
                onChange={(e) => update('website', e.target.value)}
                className="w-full bg-transparent outline-none text-white placeholder-white/50"
                placeholder="https://example.org"
              />
            </div>
          </label>

          <label className="group relative">
            <span className="text-white/80 text-sm">Category</span>
            <select
              value={form.category}
              onChange={(e) => update('category', e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-white"
            >
              <option>Health</option>
              <option>Food</option>
              <option>Education</option>
              <option>Mental Health</option>
              <option>Housing</option>
            </select>
          </label>

          <label className="group relative">
            <span className="text-white/80 text-sm">Location</span>
            <select
              value={form.location}
              onChange={(e) => update('location', e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-white"
            >
              <option>Downtown</option>
              <option>East Side</option>
              <option>West End</option>
              <option>North Hills</option>
              <option>South Park</option>
            </select>
          </label>

          <div className="md:col-span-2 flex items-center justify-between">
            <div className="text-sm text-white/60">
              By submitting, you agree your info may be shared publicly.
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className={`inline-flex items-center gap-2 rounded-xl ${status === 'error' ? 'bg-rose-500/90' : 'bg-teal-400/90 hover:bg-teal-300'} text-black font-semibold px-5 py-2.5 transition-all shadow-[0_0_25px_rgba(78,205,196,0.6)]`}
            >
              <Send className="h-4 w-4" />
              {status === 'idle' && 'Submit'}
              {status === 'loading' && 'Submitting…'}
              {status === 'success' && '✅ Thanks!'}
              {status === 'error' && 'Please fill required fields'}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
