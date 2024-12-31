import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/SideBar/SideBar';
import { About } from './pages/About';
import { Resume } from './pages/Resume';
import { Projects } from './pages/Projects';
import { Skills } from './pages/Skills';
import { Contact } from './pages/Contact';
import { Navigation } from './components/Navigation/Navigation';



function App() {
  return (
    <>
        <BrowserRouter>
            <main className="min-h-screen bg-[#121212]">
                <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-6 p-4">
                    <Sidebar />
                    <div className="flex-1">
                        <Navigation />
                        <div className="bg-[#1e1e1e] rounded-[20px] p-8 min-h-[calc(100vh-180px)]">
                            <Routes>
                                <Route path="/" element={<About />} />
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
