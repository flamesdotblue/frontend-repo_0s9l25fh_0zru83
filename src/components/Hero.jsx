import { useEffect, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { Search, MapPin, Heart, GraduationCap, Brain, Utensils } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const suggestionList = [
  { label: 'Health', icon: Heart },
  { label: 'Food', icon: Utensils },
  { label: 'Education', icon: GraduationCap },
  { label: 'Mental Health', icon: Brain },
  { label: 'Nearby', icon: MapPin },
];

export default function Hero({ onSearch }) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const ref = useRef(null);
  const { scrollY } = useScroll({ target: ref });
  const scale = useTransform(scrollY, [0, 400], [1, 0.98]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.7]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Enter') {
        onSearch?.(query.trim());
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [query, onSearch]);

  return (
    <section ref={ref} className="relative h-[85vh] w-full overflow-hidden flex items-center justify-center bg-[#0f0f0f]">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/cEecEwR6Ehj4iT8T/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />

      <motion.div style={{ scale, opacity }} className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight text-white"
        >
          The Community Connect Hub
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
          className="mt-4 text-white/80 max-w-2xl mx-auto"
        >
          Empowering Every Neighbor — One Connection at a Time
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.15 }}
          className="mt-10"
        >
          <div className={`backdrop-blur-xl bg-white/10 border ${focused ? 'border-teal-300/80' : 'border-white/20'} rounded-2xl shadow-2xl p-2 transition-colors`}
          >
            <div className="flex items-center gap-2 px-2">
              <Search className="h-5 w-5 text-white/80" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Search Health, Food, Education, Mental Health…"
                className="w-full bg-transparent outline-none py-3 text-white placeholder-white/60"
              />
              <button
                onClick={() => onSearch?.(query.trim())}
                className="ml-2 rounded-xl bg-teal-400/90 hover:bg-teal-300 text-black font-semibold px-4 py-2 transition-all shadow-[0_0_20px_rgba(78,205,196,0.6)]"
              >
                Search
              </button>
            </div>

            {query.length < 1 && (
              <div className="px-3 pb-3">
                <div className="flex flex-wrap gap-2">
                  {suggestionList.map(({ label, icon: Icon }) => (
                    <button
                      key={label}
                      onClick={() => {
                        setQuery(label);
                        onSearch?.(label);
                      }}
                      className="group flex items-center gap-2 rounded-full px-3 py-1.5 text-sm bg-white/10 hover:bg-white/20 text-white/90 transition-colors"
                    >
                      <Icon className="h-4 w-4 opacity-90" />
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
