import { useState } from 'react';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('login');

  return (
    <div className="app-container">
      {currentView === 'login' ? (
        <Login onSwitchToSignUp={() => setCurrentView('signup')} />
      ) : (
        <SignUp onSwitchToLogin={() => setCurrentView('login')} />
      )}
    </div>
  );
}

export default App;

