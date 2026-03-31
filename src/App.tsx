import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from '@/layouts/public-layout';
import { DashboardLayout } from '@/layouts/dashboard-layout';
import { PortalGate } from '@/components/portal/portal-gate';
import { AuthProvider } from '@/features/auth/context';

/* ─── Public pages ─────────────────────────────────────────── */
import HomePage from '@/pages/home-page';
import ServicesPage from '@/pages/services-page';
import ListingsPage from '@/pages/listings-page';
import ListingDetailPage from '@/pages/listing-detail-page';
import SellerValuationPage from '@/pages/seller-valuation-page';
import BuyerInquiryPage from '@/pages/buyer-inquiry-page';
import ResourcesPage from '@/pages/resources-page';
import ContactPage from '@/pages/contact-page';
import CareersPage from '@/pages/careers-page';
import BookingPage from '@/pages/booking-page';

/* ─── Portal pages (Internal Team) ─────────────────────────── */
import DashboardPage from '@/features/dashboard/components/dashboard-page';
import AppointmentsPage from '@/features/appointments/components/appointments-page';
import MessagesPage from '@/features/messages/components/messages-page';
import PortalListingsPage from '@/features/listings/components/portal-listings-page';
import ClientsPage from '@/features/clients/components/clients-page';
import DealsPage from '@/features/deals/components/deals-page';
import TasksPage from '@/features/tasks/components/tasks-page';
import AnalyticsPage from '@/features/analytics/components/analytics-page';
import FunnelBuilderPage from '@/features/funnels/components/funnel-builder-page';
import SettingsPage from '@/features/settings/components/settings-page';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* ── Public Routes (no auth) ─────────────── */}
          <Route element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="listings" element={<ListingsPage />} />
            <Route path="listings/:id" element={<ListingDetailPage />} />
            <Route path="sell" element={<SellerValuationPage />} />
            <Route path="buy" element={<BuyerInquiryPage />} />
            <Route path="resources" element={<ResourcesPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="careers" element={<CareersPage />} />
            <Route path="book" element={<BookingPage />} />
          </Route>

          {/* ── Internal Portal Routes ──────────────── */}
          <Route path="portal" element={<PortalGate />}>
            <Route element={<DashboardLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="messages" element={<MessagesPage />} />
              <Route path="calendar" element={<AppointmentsPage />} />
              <Route path="listings" element={<PortalListingsPage />} />
              <Route path="clients" element={<ClientsPage />} />
              <Route path="deals" element={<DealsPage />} />
              <Route path="tasks" element={<TasksPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="funnels" element={<FunnelBuilderPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="*" element={<Navigate to="/portal" replace />} />
            </Route>
          </Route>

          {/* ── Catch-all ───────────────────────────── */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
