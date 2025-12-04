import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import UserLogin from './components/Login/UserLogin';
import ExpertLogin from './components/Login/ExpertLogin';
import ExpertProfile from './components/ExpertProfile/ExpertProfile';
import ExpertDetailPage from './pages/ExpertDetailPage';
import FindTherapist from './components/FindTherapist/FindTherapist';
import ServicesPage from './pages/ServicesPage';
import FAQPage from './pages/FAQPage';
import ProtectedRoute from './components/common/ProtectedRoute';
import DashboardPage from './pages/admin/DashboardPage';
import ProfileManagementPage from './pages/admin/ProfileManagementPage';
import AppointmentsPage from './pages/admin/AppointmentsPage';
import UserDashboardPage from './pages/UserDashboardPage';
import { ToastProvider } from './components/common/Toast';

function App() {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="terms-of-use" element={<TermsPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="faq" element={<FAQPage />} />
            <Route path="experts" element={<ExpertProfile />} />
            <Route path="expert/:id" element={<ExpertDetailPage />} />
            <Route path="find-therapist" element={<FindTherapist />} />

            {/* Protected User Routes */}
            <Route
              path="user/dashboard"
              element={
                <ProtectedRoute>
                  <UserDashboardPage />
                </ProtectedRoute>
              }
            />

            {/* Protected Admin Routes */}
            <Route
              path="admin/dashboard"
              element={
                <ProtectedRoute requireExpert>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin/profile"
              element={
                <ProtectedRoute requireExpert>
                  <ProfileManagementPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin/appointments"
              element={
                <ProtectedRoute requireExpert>
                  <AppointmentsPage />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="login" element={<UserLogin />} />
          <Route path="expert-login" element={<ExpertLogin />} />
        </Routes>
      </Router>
    </ToastProvider>
  );
}

export default App;
