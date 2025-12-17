import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import UserLogin from './components/Login/UserLogin';
import UserRegister from './components/Login/UserRegister';
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
import PsychologistApplicationPage from './pages/PsychologistApplicationPage';
import HowItWorksPage from './pages/HowItWorksPage';
import PsychologicalTestsPage from './pages/PsychologicalTestsPage';
import BlogPage from './pages/BlogPage';

/**
 * Application router configuration using createBrowserRouter
 * This provides better data loading, error handling, and type safety
 */
export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'about',
                element: <AboutPage />,
            },
            {
                path: 'contact',
                element: <ContactPage />,
            },
            {
                path: 'privacy-policy',
                element: <PrivacyPolicyPage />,
            },
            {
                path: 'terms-of-use',
                element: <TermsPage />,
            },
            {
                path: 'services',
                element: <ServicesPage />,
            },
            {
                path: 'faq',
                element: <FAQPage />,
            },
            {
                path: 'experts',
                element: <ExpertProfile />,
            },
            {
                path: 'expert/:id',
                element: <ExpertDetailPage />,
            },
            {
                path: 'find-therapist',
                element: <FindTherapist />,
            },
            {
                path: 'psychologist-application',
                element: <PsychologistApplicationPage />,
            },
            {
                path: 'how-it-works',
                element: <HowItWorksPage />,
            },
            {
                path: 'psychological-tests',
                element: <PsychologicalTestsPage />,
            },
            {
                path: 'blog',
                element: <BlogPage />,
            },
            // Protected User Routes
            {
                path: 'user/dashboard',
                element: (
                    <ProtectedRoute>
                        <UserDashboardPage />
                    </ProtectedRoute>
                ),
            },
            // Protected Admin/Expert Routes
            {
                path: 'admin/dashboard',
                element: (
                    <ProtectedRoute requireExpert>
                        <DashboardPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'admin/profile',
                element: (
                    <ProtectedRoute requireExpert>
                        <ProfileManagementPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'admin/appointments',
                element: (
                    <ProtectedRoute requireExpert>
                        <AppointmentsPage />
                    </ProtectedRoute>
                ),
            },
        ],
    },
    // Login routes outside of RootLayout
    {
        path: 'login',
        element: <UserLogin />,
    },
    {
        path: 'register',
        element: <UserRegister />,
    },
]);
