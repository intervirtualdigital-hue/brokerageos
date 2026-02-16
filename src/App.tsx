import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/features/auth/context';
import LoginPage from '@/features/auth/components/login-page';
import RoleBasedRoute from '@/features/auth/components/role-based-route';
import SellerDashboardPage from '@/features/seller/components/dashboard/seller-dashboard-page';
import VerificationBookingPage from '@/features/seller/components/dashboard/verification-booking-page';
import SellerDocumentsPage from '@/features/seller/components/documents/seller-documents-page';
import DataRoomReadyPage from '@/features/seller/components/documents/data-room-ready-page';
import { DashboardLayout } from './layouts/dashboard-layout';

// Seller Components
import DashboardPage from './features/dashboard/components/dashboard-page'; // Original one, to be refactored as SellerDashboard
// import NDARequestPage from './features/nda/components/nda-request-page';
import DocumentsPage from './features/documents/components/documents-page';
import AppointmentsPage from './features/appointments/components/appointments-page';
import MessagesPage from './features/messages/components/messages-page';
import ResourcesPage from './features/resources/components/resources-page';

import BuyerDashboardPage from '@/features/buyer/components/dashboard/buyer-dashboard-page';
import ListingDetailPage from '@/features/buyer/components/listing/listing-detail-page';
import NdaWizardPage from '@/features/buyer/components/nda/nda-wizard-page';
import NdaSuccessPage from '@/features/buyer/components/nda/nda-success-page';
import BuyerDataRoomPage from '@/features/buyer/components/documents/buyer-data-room-page';
import DealRoomDispatcher from '@/features/auth/components/deal-room-dispatcher';

function AppContent() {
  const { user } = useAuth();
  // Redirect root to role-specific dashboard if logged in, else login
  // For now, we reuse the existing layout for all roles but logic will split here

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Routes */}
      <Route element={<RoleBasedRoute allowedRoles={['seller', 'buyer', 'partner', 'broker']} />}>
        <Route path="/" element={<DashboardLayout />}>
          {/* Dynamic Dashboard Routing */}
          <Route index element={
            user?.role === 'seller' ? <SellerDashboardPage /> :
              user?.role === 'buyer' ? <BuyerDashboardPage /> :
                <DashboardPage /> // Fallback for other roles
          } />

          {/* Seller Specific Routes */}
          <Route path="seller/verification" element={<VerificationBookingPage />} />
          <Route path="seller/documents" element={<SellerDocumentsPage />} />
          <Route path="seller/data-room-ready" element={<DataRoomReadyPage />} />

          {/* Buyer Routes */}
          <Route path="listing/:id" element={<ListingDetailPage />} />
          <Route path="nda" element={<NdaWizardPage />} />
          <Route path="nda/success" element={<NdaSuccessPage />} />
          <Route path="buy/data-room" element={<BuyerDataRoomPage />} />

          {/* Shared / Other Routes */}
          <Route path="deal-room" element={<DealRoomDispatcher />} />
          <Route path="documents" element={<DocumentsPage />} />
          {/* Obsolete NDARequestPage route removed in favor of new Wizard */}
          <Route path="appointments" element={<AppointmentsPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="resources" element={<ResourcesPage />} />
          <Route path="settings" element={<div>Settings Content</div>} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
