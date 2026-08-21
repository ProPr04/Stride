import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import HowItWorks from "./components/HowItWorks";
import Trust from "./components/Trust";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <HowItWorks />
      <Trust />
      <Footer />

      <div className="app-container">
        {currentView === "login" ? (
          <Login onSwitchToSignUp={() => setCurrentView("signup")} />
        ) : (
          <SignUp onSwitchToLogin={() => setCurrentView("login")} />
        )}
      </div>
    </>
  );
}

export default App;

