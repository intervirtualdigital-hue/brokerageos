
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Home } from './pages/Home';
import { System } from './pages/System';
import { Modules } from './pages/Modules';
import { Demo } from './pages/Demo';
import { WhoItsFor } from './pages/WhoItsFor';
import { Resources } from './pages/Resources';
import { FAQ } from './pages/FAQ';
import { BookReview } from './pages/BookReview';
import { NotFound } from './pages/NotFound';
import { ResourceArchitectureDiff } from './pages/ResourceArchitectureDiff';
import { ResourceValuationFunnels } from './pages/ResourceValuationFunnels';
import { ResourceBuyerQualification } from './pages/ResourceBuyerQualification';
import { ResourceNdaAutomation } from './pages/ResourceNdaAutomation';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="system" element={<System />} />
          <Route path="modules" element={<Modules />} />
          <Route path="demo" element={<Demo />} />
          <Route path="who-its-for" element={<WhoItsFor />} />
          <Route path="resources" element={<Resources />} />
          <Route path="resources/architecture-difference" element={<ResourceArchitectureDiff />} />
          <Route path="resources/valuation-funnels" element={<ResourceValuationFunnels />} />
          <Route path="resources/buyer-qualification" element={<ResourceBuyerQualification />} />
          <Route path="resources/nda-automation" element={<ResourceNdaAutomation />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="book-review" element={<BookReview />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
