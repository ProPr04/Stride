import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AthleteDashboard from './pages/AthleteDashboard';
import AcademyDashboard from './academics/AcademyDashboard';
import HowItWorks from './components/HowItWorks';
import Trust from './components/Trust';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import { api, authStorage } from './services/api';
import './App.css';

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

function LandingPage({ initialLoginOpen = false }) {

  const [isLoginOpen, setIsLoginOpen] = useState(initialLoginOpen);
  const navigate = useNavigate();

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
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenSignUp={() => navigate('/signup')}
      />
      <Hero />
      <HowItWorks />
      <Trust />
      <Footer />

      {/* Blurred Background Login Modal */}
      {isLoginOpen && (
        <Login
          isModal={true}
          onClose={() => setIsLoginOpen(false)}
          onSwitchToSignUp={() => {
            setIsLoginOpen(false);
            navigate('/signup');
          }}
          onLoginSuccess={handleLoginSuccess}
        />
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
          <div className="app-container">
            <SignUp
              onSwitchToLogin={() => navigate('/login')}
            />
          </div>
        }
      />

      {/* Athlete Dashboard Route (Protected) */}
      <Route
        path="/athlete"
        element={
          <ProtectedRoute requiredRole="athlete">
            <AthleteDashboard
              onLogout={() => {
                api.auth.logout();
                navigate('/login');
              }}
            />
          </ProtectedRoute>
        }
      />

      {/* Academy Dashboard Route (Protected) */}
      <Route
        path="/academy/*"
        element={
          <ProtectedRoute requiredRole="academy">
            <AcademyDashboard
              onLogout={() => {
                api.auth.logout();
                navigate('/login');
              }}
            />
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