import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AthleteDashboard from './pages/AthleteDashboard';
import './App.css';

function AppRoutes() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      <Route
        path="/login"
        element={
          <div className="app-container">
            <Login
              onSwitchToSignUp={() => navigate('/signup')}
              onLoginSuccess={() => navigate('/dashboard')}
            />
          </div>
        }
      />

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

      <Route
        path="/dashboard"
        element={
          <AthleteDashboard
            onLogout={() => navigate('/login')}
          />
        }
      />

      {/* Fallback to /dashboard if unknown path */}
      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;



