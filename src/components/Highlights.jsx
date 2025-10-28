import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const highlights = [
  {
    id: 1,
    name: 'HopeCare Clinic',
    tagline: 'Affordable wellness for every family',
    stat: 'Supported 3,000+ families in 2025',
    image:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'GoodFood Bank',
    tagline: 'Nourishing neighbors, ending hunger',
    stat: 'Served 250,000 meals this year',
    image:
      'https://images.unsplash.com/photo-1505252585461-04db1eb84625?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Code for Youth',
    tagline: 'Tech education for the next generation',
    stat: '700 students placed in STEM clubs',
    image:
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1600&auto=format&fit=crop',
  },
];

export default function Highlights() {
  const [index, setIndex] = useState(0);
  const item = highlights[index % highlights.length];

  return (
    <section id="highlights" className="relative py-20 bg-[#0f0f0f]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Spotlight of the Month</h2>
            <p className="text-white/70">Celebrate outstanding organizations making real impact.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIndex((p) => (p - 1 + highlights.length) % highlights.length)}
              className="rounded-full bg-white/10 hover:bg-white/20 text-white px-3 py-2"
            >
              ◀
            </button>
            <button
              onClick={() => setIndex((p) => (p + 1) % highlights.length)}
              className="rounded-full bg-white/10 hover:bg-white/20 text-white px-3 py-2"
            >
              ▶
            </button>
          </div>
        </div>

        <div className="relative h-[360px] overflow-hidden rounded-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="absolute inset-0"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/40 to-transparent" />

              <div className="relative z-10 h-full w-full p-10 flex flex-col justify-end">
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }}>
                  <h3 className="text-3xl md:text-4xl font-extrabold text-white">
                    {item.name}
                  </h3>
                  <p className="text-white/80 text-lg">{item.tagline}</p>
                  <div className="mt-3 text-teal-300 font-semibold">{item.stat}</div>

                  <button className="mt-6 inline-flex items-center gap-2 rounded-xl bg-teal-400/90 hover:bg-teal-300 text-black font-semibold px-5 py-2.5 transition-all shadow-[0_0_25px_rgba(78,205,196,0.6)]">
                    View Profile
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
