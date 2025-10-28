import { useState } from 'react';
import Hero from './components/Hero';
import ResourceDirectory from './components/ResourceDirectory';
import Highlights from './components/Highlights';
import SubmissionForm from './components/SubmissionForm';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 h-14 flex items-center justify-between">
          <a href="#home" className="font-extrabold tracking-tight text-white">
            Community Connect
          </a>
          <nav className="hidden md:flex items-center gap-6 text-white/80">
            <a href="#resources" className="hover:text-white transition-colors">Resources</a>
            <a href="#highlights" className="hover:text-white transition-colors">Highlights</a>
            <a href="#add" className="hover:text-white transition-colors">Add Resource</a>
          </nav>
        </div>
      </header>

      <main>
        <Hero onSearch={(q) => setSearchQuery(q)} />
        <ResourceDirectory searchQuery={searchQuery} />
        <Highlights />
        <SubmissionForm onSubmitResource={() => {}} />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/40">
        <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white/70 text-sm">© 2025 The Community Connect Hub</div>
          <div className="flex items-center gap-4 text-white/70 text-sm">
            <a href="#resources" className="hover:text-white">Resources</a>
            <a href="#highlights" className="hover:text-white">Highlights</a>
            <a href="#add" className="hover:text-white">Submit</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
