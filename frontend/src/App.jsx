import { useState, lazy, Suspense } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import { api, authStorage } from './services/api';
import './App.css';

// Lazy-loaded below-the-fold components (code splitting for reduced initial JS)
const HowItWorks = lazy(() => import('./components/HowItWorks'));
const Trust = lazy(() => import('./components/Trust'));
const Footer = lazy(() => import('./components/Footer'));
const Login = lazy(() => import('./pages/Login'));

// Lazy-loaded route-level components
const SignUp = lazy(() => import('./pages/SignUp'));
const AthleteDashboard = lazy(() => import('./pages/AthleteDashboard'));
const AcademyDashboard = lazy(() => import('./pages/AcademyDashboard'));

/**
 * Route Guard: Ensures user has a valid, non-expired JWT token and correct role
 */
function ProtectedRoute({ children, requiredRole }) {
  const isAuth = authStorage.isAuthenticated();
  const user = authStorage.getUser();

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role && user.role !== requiredRole) {
    return <Navigate to={user.role === 'academy' ? '/academy' : '/athlete'} replace />;
  }

  return children;
}

function LandingPage({ initialLoginOpen = false, initialRole = 'athlete' }) {
  const [isLoginOpen, setIsLoginOpen] = useState(initialLoginOpen);
  const [loginRole, setLoginRole] = useState(initialRole);
  const navigate = useNavigate();

  const handleOpenLogin = (role = 'athlete') => {
    setLoginRole(role);
    setIsLoginOpen(true);
  };

  const handleLoginSuccess = (role) => {
    setIsLoginOpen(false);
    if (role === 'academy') {
      navigate('/academy');
    } else {
      navigate('/athlete');
    }
  };

  return (
    <>
      <Navbar
        onOpenLogin={(role = 'athlete') => handleOpenLogin(role)}
        onOpenSignUp={() => navigate('/signup')}
        onOpenOpportunities={() => handleOpenLogin('athlete')}
        onOpenAcademies={() => handleOpenLogin('academy')}
      />
      <Hero
        onOpenOpportunities={() => handleOpenLogin('athlete')}
        onOpenAcademies={() => handleOpenLogin('academy')}
      />
      <Suspense fallback={null}>
        <HowItWorks />
        <Trust />
        <Footer
          onOpenOpportunities={() => handleOpenLogin('athlete')}
          onOpenAcademies={() => handleOpenLogin('academy')}
        />
      </Suspense>

      {/* Blurred Background Login Modal */}
      {isLoginOpen && (
        <Suspense fallback={null}>
          <Login
            isModal={true}
            initialRole={loginRole}
            onClose={() => setIsLoginOpen(false)}
            onSwitchToSignUp={() => {
              setIsLoginOpen(false);
              navigate('/signup');
            }}
            onLoginSuccess={handleLoginSuccess}
          />
        </Suspense>
      )}
    </>
  );
}

function AppRoutes() {
  const navigate = useNavigate();

  const handleLoginSuccess = (role) => {
    if (role === 'academy') {
      navigate('/academy');
    } else {
      navigate('/athlete');
    }
  };

  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Login Route (Opens blurred Landing Page with Login Popup) */}
      <Route
        path="/login"
        element={<LandingPage initialLoginOpen={true} />}
      />

      {/* Sign Up Route */}
      <Route
        path="/signup"
        element={
          <Suspense fallback={null}>
            <div className="app-container">
              <SignUp
                onClose={() => navigate('/')}
                onSwitchToLogin={() => navigate('/login')}
              />
            </div>
          </Suspense>
        }
      />

      {/* Athlete Dashboard Route (Protected) */}
      <Route
        path="/athlete"
        element={
          <ProtectedRoute requiredRole="athlete">
            <Suspense fallback={null}>
              <AthleteDashboard
                onLogout={() => {
                  api.auth.logout();
                  navigate('/login');
                }}
              />
            </Suspense>
          </ProtectedRoute>
        }
      />

      {/* Academy Dashboard Route (Protected) */}
      <Route
        path="/academy/*"
        element={
          <ProtectedRoute requiredRole="academy">
            <Suspense fallback={null}>
              <AcademyDashboard
                onLogout={() => {
                  api.auth.logout();
                  navigate('/login');
                }}
              />
            </Suspense>
          </ProtectedRoute>
        }
      />



      {/* Unknown routes fallback to / */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}

export default function App() {
  return <AppRoutes />;
}