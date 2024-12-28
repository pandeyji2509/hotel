import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import PropertyList from './components/PropertyList';
import Recommendations from './components/Recommendations';
import Home from './components/Home';
import Layout from './layouts/Layout';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      verifyToken(token);
    } else {
      setIsLoading(false);
    }
  }, []);
  const PrivateRoute =({ children })=> {
    const { isAuthenticated } = useContext(AuthContext);
    return isAuthenticated ? children : <Navigate to="/login" />;
  }
  const verifyToken = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/verify', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('token');
      }
    } catch {
      localStorage.removeItem('token');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/login" 
            element={
              !isAuthenticated ? 
              <Login setIsAuthenticated={setIsAuthenticated} /> : 
              <Navigate to="/properties" replace />
            } 
          />
          <Route 
            path="/register" 
            element={
              !isAuthenticated ? 
              <Register setIsAuthenticated={setIsAuthenticated} /> : 
              <Navigate to="/properties" replace />
            } 
          />
          <Route path="/properties" element={<PropertyList />} />
          <Route
  path="/recommendations"
  element={
    <PrivateRoute>
      <Recommendations />
    </PrivateRoute>
  }
/>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
