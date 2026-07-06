import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScrollToTop from '@/components/ScrollToTop';
import CustomCursor from '@/components/CustomCursor';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';
import ProjectDetail from '@/pages/ProjectDetail';

function App() {
  return (
    <Router>
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
