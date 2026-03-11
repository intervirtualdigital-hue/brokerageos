import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';

// Lazy load pages for code splitting & faster initial load
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const System = lazy(() => import('./pages/System').then(m => ({ default: m.System })));
const Modules = lazy(() => import('./pages/Modules').then(m => ({ default: m.Modules })));
const Demo = lazy(() => import('./pages/Demo').then(m => ({ default: m.Demo })));
const WhoItsFor = lazy(() => import('./pages/WhoItsFor').then(m => ({ default: m.WhoItsFor })));
const Resources = lazy(() => import('./pages/Resources').then(m => ({ default: m.Resources })));
const FAQ = lazy(() => import('./pages/FAQ').then(m => ({ default: m.FAQ })));
const BookReview = lazy(() => import('./pages/BookReview').then(m => ({ default: m.BookReview })));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));
const ResourceArchitectureDiff = lazy(() => import('./pages/ResourceArchitectureDiff').then(m => ({ default: m.ResourceArchitectureDiff })));
const ResourceValuationFunnels = lazy(() => import('./pages/ResourceValuationFunnels').then(m => ({ default: m.ResourceValuationFunnels })));
const ResourceBuyerQualification = lazy(() => import('./pages/ResourceBuyerQualification').then(m => ({ default: m.ResourceBuyerQualification })));
const ResourceNdaAutomation = lazy(() => import('./pages/ResourceNdaAutomation').then(m => ({ default: m.ResourceNdaAutomation })));

// A minimal fallback to display while chunks are loading
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh] w-full">
    <div className="w-8 h-8 rounded-full border-2 border-brand-accent/20 border-t-brand-accent animate-spin" />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={
            <Suspense fallback={<PageLoader />}>
              <Home />
            </Suspense>
          } />
          <Route path="system" element={
            <Suspense fallback={<PageLoader />}>
              <System />
            </Suspense>
          } />
          <Route path="modules" element={
            <Suspense fallback={<PageLoader />}>
              <Modules />
            </Suspense>
          } />
          <Route path="demo" element={
            <Suspense fallback={<PageLoader />}>
              <Demo />
            </Suspense>
          } />
          <Route path="who-its-for" element={
            <Suspense fallback={<PageLoader />}>
              <WhoItsFor />
            </Suspense>
          } />
          <Route path="resources" element={
            <Suspense fallback={<PageLoader />}>
              <Resources />
            </Suspense>
          } />
          <Route path="resources/architecture-difference" element={
            <Suspense fallback={<PageLoader />}>
              <ResourceArchitectureDiff />
            </Suspense>
          } />
          <Route path="resources/valuation-funnels" element={
            <Suspense fallback={<PageLoader />}>
              <ResourceValuationFunnels />
            </Suspense>
          } />
          <Route path="resources/buyer-qualification" element={
            <Suspense fallback={<PageLoader />}>
              <ResourceBuyerQualification />
            </Suspense>
          } />
          <Route path="resources/nda-automation" element={
            <Suspense fallback={<PageLoader />}>
              <ResourceNdaAutomation />
            </Suspense>
          } />
          <Route path="faq" element={
            <Suspense fallback={<PageLoader />}>
              <FAQ />
            </Suspense>
          } />
          <Route path="book-review" element={
            <Suspense fallback={<PageLoader />}>
              <BookReview />
            </Suspense>
          } />
          <Route path="*" element={
            <Suspense fallback={<PageLoader />}>
              <NotFound />
            </Suspense>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
