import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginComponent from './components/auth/LoginComponent';
import RegisterComponent from './components/auth/RegisterComponent';
import DashboardComponent from './components/main/DashboardComponent';
import SearchTab from './components/main/SearchTab';
import UploadedFilePage from './components/main/UploadedFilePage'; // Import the new component
import DashboardPage from './components/main/DashboardPage';

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
                  <Route path="/uploaded_file" element={<UploadedFilePage />} />
                  <Route path="/dashboard_page" element={<DashboardPage />} />
              </Routes>
          </div>
      </Router>
  );
};

export default App;