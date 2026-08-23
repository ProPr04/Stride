import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AthleteDashboard from './pages/AthleteDashboard';
import AcademyDashboard from './pages/AcademyDashboard';
import HowItWorks from './components/HowItWorks';
import Trust from './components/Trust';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import './App.css';

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

      {/* Athlete Dashboard Route */}
      <Route
        path="/athlete"
        element={
          <AthleteDashboard
            onLogout={() => navigate('/')}
          />
        }
      />

      {/* Academy Dashboard Route */}
      <Route
        path="/academy"
        element={<AcademyDashboard />}
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