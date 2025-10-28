import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, MapPin, BadgeDollarSign, Accessibility, Users } from 'lucide-react';

const sampleResources = [
  {
    id: 1,
    name: 'HopeCare Clinic',
    category: 'Health',
    location: 'Downtown',
    isFree: true,
    accessibility: ['Wheelchair'],
    age: 'All Ages',
    description: 'Low-cost primary care and wellness screenings.',
    logo: 'https://images.unsplash.com/photo-1638202993928-7267aad84cfe?q=80&w=200&auto=format&fit=crop',
    lat: 37.7749,
    lon: -122.4194,
  },
  {
    id: 2,
    name: 'GoodFood Bank',
    category: 'Food',
    location: 'East Side',
    isFree: true,
    accessibility: ['Drive-through'],
    age: 'All Ages',
    description: 'Weekly groceries and hot meals for families.',
    logo: 'https://images.unsplash.com/photo-1542834369-f10ebf06d3cb?q=80&w=200&auto=format&fit=crop',
    lat: 37.7849,
    lon: -122.4094,
  },
  {
    id: 3,
    name: 'Code for Youth',
    category: 'Education',
    location: 'West End',
    isFree: false,
    accessibility: ['ASL Support'],
    age: 'Teens',
    description: 'After-school coding and robotics club.',
    logo: 'https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=200&auto=format&fit=crop',
    lat: 37.7649,
    lon: -122.4294,
  },
  {
    id: 4,
    name: 'Mindful Space',
    category: 'Mental Health',
    location: 'North Hills',
    isFree: true,
    accessibility: ['Wheelchair'],
    age: 'Adults',
    description: 'Counseling and support groups with licensed therapists.',
    logo: 'https://images.unsplash.com/photo-1527137342181-19aab11a8ee8?q=80&w=200&auto=format&fit=crop',
    lat: 37.7549,
    lon: -122.4394,
  },
];

export default function ResourceDirectory({ searchQuery }) {
  const [filters, setFilters] = useState({
    category: 'All',
    location: 'All',
    freeOnly: false,
    accessibility: 'Any',
    age: 'Any',
  });

  const filtered = useMemo(() => {
    const q = (searchQuery || '').toLowerCase();
    return sampleResources.filter((r) => {
      const matchesQuery = q
        ? [r.name, r.category, r.location, r.description].some((v) => v.toLowerCase().includes(q))
        : true;
      const matchesCategory = filters.category === 'All' || r.category === filters.category;
      const matchesLocation = filters.location === 'All' || r.location === filters.location;
      const matchesFree = !filters.freeOnly || r.isFree;
      const matchesAccess = filters.accessibility === 'Any' || r.accessibility.includes(filters.accessibility);
      const matchesAge = filters.age === 'Any' || r.age === filters.age;
      return matchesQuery && matchesCategory && matchesLocation && matchesFree && matchesAccess && matchesAge;
    });
  }, [searchQuery, filters]);

  return (
    <section id="resources" className="relative py-16 bg-[#111]">
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <motion.aside
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-3 h-fit sticky top-4 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 text-white mb-4">
            <Filter className="h-5 w-5" />
            <h3 className="font-semibold">Filters</h3>
          </div>
          <div className="space-y-4 text-sm text-white/80">
            <div>
              <div className="mb-1 text-white/60">Category</div>
              <select
                value={filters.category}
                onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}
                className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2"
              >
                <option>All</option>
                <option>Health</option>
                <option>Food</option>
                <option>Education</option>
                <option>Mental Health</option>
              </select>
            </div>
            <div>
              <div className="mb-1 text-white/60">Location</div>
              <select
                value={filters.location}
                onChange={(e) => setFilters((f) => ({ ...f, location: e.target.value }))}
                className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2"
              >
                <option>All</option>
                <option>Downtown</option>
                <option>East Side</option>
                <option>West End</option>
                <option>North Hills</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white/80">
                <BadgeDollarSign className="h-4 w-4" />
                Free Only
              </div>
              <input
                type="checkbox"
                checked={filters.freeOnly}
                onChange={(e) => setFilters((f) => ({ ...f, freeOnly: e.target.checked }))}
              />
            </div>
            <div>
              <div className="mb-1 text-white/60">Accessibility</div>
              <select
                value={filters.accessibility}
                onChange={(e) => setFilters((f) => ({ ...f, accessibility: e.target.value }))}
                className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2"
              >
                <option>Any</option>
                <option>Wheelchair</option>
                <option>ASL Support</option>
                <option>Drive-through</option>
              </select>
            </div>
            <div>
              <div className="mb-1 text-white/60">Age Group</div>
              <select
                value={filters.age}
                onChange={(e) => setFilters((f) => ({ ...f, age: e.target.value }))}
                className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2"
              >
                <option>Any</option>
                <option>All Ages</option>
                <option>Teens</option>
                <option>Adults</option>
              </select>
            </div>
          </div>
        </motion.aside>

        <div className="lg:col-span-9 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((r) => (
              <motion.div
                key={r.id}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-teal-300/50 transition-colors"
              >
                <div className="p-4 flex items-start gap-3">
                  <img src={r.logo} alt="logo" className="h-10 w-10 rounded-lg object-cover" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-teal-400/20 text-teal-200 border border-teal-400/30">
                        {r.category}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-300/20 text-yellow-200 border border-yellow-300/30">
                        {r.isFree ? 'Free' : 'Paid'}
                      </span>
                    </div>
                    <h4 className="mt-2 text-white font-semibold leading-tight">{r.name}</h4>
                    <div className="mt-1 text-white/70 text-sm line-clamp-3">{r.description}</div>
                    <div className="mt-3 inline-flex items-center gap-1 text-teal-200 text-sm">
                      <MapPin className="h-4 w-4" />
                      {r.location}
                    </div>
                  </div>
                </div>
                <div className="px-4 pb-4 flex items-center gap-2 text-xs text-white/70">
                  <span className="inline-flex items-center gap-1"><Accessibility className="h-3.5 w-3.5" /> {r.accessibility.join(', ')}</span>
                  <span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {r.age}</span>
                </div>
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-teal-300/10 to-yellow-300/10" />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="mt-6 overflow-hidden rounded-2xl border border-white/10"
          >
            <div className="flex items-center justify-between bg-white/5 px-4 py-3">
              <div className="text-white/80 font-medium">Map Preview</div>
              <div className="text-xs text-white/60">OpenStreetMap</div>
            </div>
            <div className="bg-black/30">
              {/* Interactive map via OSM embed (no extra deps) */}
              <iframe
                title="map"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=-122.55%2C37.70%2C-122.35%2C37.84&layer=mapnik&marker=${filtered[0]?.lat || 37.7749}%2C${filtered[0]?.lon || -122.4194}`}
                className="w-full h-[320px]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
