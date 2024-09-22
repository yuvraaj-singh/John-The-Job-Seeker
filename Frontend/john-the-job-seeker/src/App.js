import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterComponent from './components/auth/RegisterComponent';
import LoginComponent from './components/auth/LoginComponent';
import DashboardComponent from './components/main/DashboardComponent';

const App = () => {
  return (
      <Router>
          <div className="container">
              <Routes>
                  <Route path="/" element={<LoginComponent />} />
                  <Route path="/register" element={<RegisterComponent />} />
                  <Route path="/login" element={<LoginComponent />} />
                  <Route path="/dashboard" element={<DashboardComponent />} />
              </Routes>
          </div>
      </Router>
  );
};

export default App;