import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import fetcher from '../Helpers/fetcher';

const PrivateRoutes = ({ children, ...rest }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to access this page');
        navigate('/login');
        return;
      }

      try {
        const response = await fetcher.get('/api/v1/auth/auth', {}, { Authorization: `Bearer ${localStorage.getItem('token')}` });
        if (response.valid) {
          setIsLoading(false);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error(error);
        navigate('/login');
      }
    };

    validateToken();
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>; // Render a loading state until token validation is completed
  }

  // Render the protected routes
  return <Outlet />;
};

export default PrivateRoutes;
