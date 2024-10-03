import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginComponent from './components/auth/LoginComponent';
import RegisterComponent from './components/auth/RegisterComponent';
import DashboardComponent from './components/main/DashboardComponent';
import SearchTab from './components/main/SearchTab';

const App = () => {
  return (
      <Router>
          <div className="container">
              <Routes>
                  <Route path="/" element={<LoginComponent />} />
                  <Route path="/register" element={<RegisterComponent />} />
                  <Route path="/login" element={<LoginComponent />} />
                  <Route path="/dashboard" element={<DashboardComponent />} />
                  <Route path="/search_job" element={<SearchTab />} />
              </Routes>
          </div>
      </Router>
  );
};

export default App;