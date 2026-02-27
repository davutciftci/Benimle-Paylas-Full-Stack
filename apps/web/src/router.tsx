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
import AdminDashboard from './pages/admin/AdminDashboard';
import ExpertDashboard from './pages/expert/ExpertDashboard';
import ProfileManagementPage from './pages/expert/ProfileManagementPage';
import AppointmentsPage from './pages/expert/AppointmentsPage';
import UserDashboardPage from './pages/UserDashboardPage';
import PsychologistApplicationPage from './pages/PsychologistApplicationPage';
import HowItWorksPage from './pages/HowItWorksPage';
import PsychologicalTestsPage from './pages/PsychologicalTestsPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';

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
            {
                path: 'blog/:id',
                element: <BlogDetailPage />,
            },
            
            // --- USER ROUTES ---
            {
                path: 'user/dashboard',
                element: (
                    <ProtectedRoute allowedRoles={['user']}>
                        <UserDashboardPage />
                    </ProtectedRoute>
                ),
            },

            // --- EXPERT ROUTES ---
            {
                path: 'expert/dashboard',
                element: (
                    <ProtectedRoute allowedRoles={['expert']}>
                        <ExpertDashboard />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'expert/profile',
                element: (
                    <ProtectedRoute allowedRoles={['expert']}>
                        <ProfileManagementPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'expert/appointments',
                element: (
                    <ProtectedRoute allowedRoles={['expert']}>
                        <AppointmentsPage />
                    </ProtectedRoute>
                ),
            },

            // --- ADMIN ROUTES ---
            {
                path: 'admin/dashboard',
                element: (
                    <ProtectedRoute allowedRoles={['admin']}>
                        <AdminDashboard />
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
