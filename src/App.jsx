import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScrollToTop from '@/components/ScrollToTop';
import CustomCursor from '@/components/CustomCursor';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';
import ProjectDetail from '@/pages/ProjectDetail';

function App() {
  return (
    <Router>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] focus:bg-parchment focus:text-void focus:px-5 focus:py-3 font-body font-bold text-sm tracking-caption uppercase"
      >
        Skip to main content
      </a>
      <ScrollToTop />
      <CustomCursor />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/works/:slug" element={<ProjectDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
