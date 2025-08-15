import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/SideBar/SideBar';
import { About } from './pages/About';
import { Resume } from './pages/Resume';
import { Projects } from './pages/Projects';
import { Skills } from './pages/Skills';
import { Contact } from './pages/Contact';
import { Navigation } from './components/Navigation/Navigation';
import { Hero } from './components/Hero/Hero';

function App() {
  return (
    <>
        <BrowserRouter>
            <main className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 relative overflow-hidden">
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-accent-500/10 to-primary-600/10 animate-gradient"></div>
                
                {/* Floating orbs for visual effect */}
                <div className="absolute top-20 left-20 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
                
                <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 lg:gap-6 p-4 lg:p-6 h-screen">
                    <Sidebar />
                    <div className="flex-1 flex flex-col min-h-0">
                        <Navigation />
                        <div className="glass-card p-4 lg:p-6 flex-1 overflow-hidden">
                            <Routes>
                                <Route path="/" element={<Hero />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/resume" element={<Resume />} />
                                <Route path="/projects" element={<Projects />} />
                                <Route path="/skills" element={<Skills />} />
                                <Route path="/contact" element={<Contact />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </main>
        </BrowserRouter>
    </>
  );
}

export default App;
