import { Routes, Route } from "react-router-dom";
import HowItWorks from "./components/HowItWorks";
import Trust from "./components/Trust";
import Footer from "./components/Footer";
import AcademyDashboard from "./academics/AcademyDashboard";

function App() {
  return (
    <Routes>
      {/* Landing Page */}
      <Route
        path="/"
        element={
          <>
            <HowItWorks />
            <Trust />
            <Footer />
          </>
        }
      />

      {/* Academy Dashboard */}
      <Route path="/academy" element={<AcademyDashboard />} />
    </Routes>
  );
}

export default App;