import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AthleteDashboard from './pages/AthleteDashboard';
import HowItWorks from './components/HowItWorks';
import Trust from './components/Trust';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import './App.css';

function LandingPage() {
  return (
    <>
      <Navbar/>
      <Hero />

      <HowItWorks />
      <Trust />
      <Footer />
    </>
  );
}

function AppRoutes() {
  const navigate = useNavigate();

  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Login */}
      <Route
        path="/login"
        element={
          <div className="app-container">
            <Login
              onSwitchToSignUp={() => navigate("/signup")}
              onLoginSuccess={() => navigate("/athlete")}
            />
          </div>
        }
      />

      {/* Sign Up */}
      <Route
        path="/signup"
        element={
          <div className="app-container">
            <SignUp
              onSwitchToLogin={() => navigate("/login")}
            />
          </div>
        }
      />

      {/* Athlete Dashboard */}
      <Route
        path="/athlete"
        element={
          <AthleteDashboard
            onLogout={() => navigate("/login")}
          />
        }
      />

      {/* Academy Dashboard */}
      <Route
        path="/academy"
        element={<AcademyDashboard />}
      />

      {/* Unknown routes */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}

function App() {
  return <AppRoutes />;
}

export default App;