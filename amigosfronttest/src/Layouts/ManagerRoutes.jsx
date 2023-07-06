import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import fetcher from '../Helpers/fetcher';
import { AuthContext } from '../Contexts/AuthContext';

const ManagerRoutes = ({ children, ...rest }) => {

  const { isLoggedIn, userEmail, login, token, userRole } = useContext(AuthContext);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Il faut être Manager ou Admin pour avoir accès ici !');
        navigate('/login');
        return;
      }

      try {
        const resp = await fetcher.get('/api/v1/auth/auth', {}, { Authorization: `Bearer ${localStorage.getItem('token')}` });
        if (resp.valid && (resp.role === 'MANAGER') || (resp.role === 'ADMIN') ) {
          login(resp.token, resp.role, resp.email);
          setIsLoading(false);
        } else {
          alert('Il faut être Manager ou Admin pour avoir accès ici !');
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
    return <div>Chargement...</div>;
  }


  return <Outlet />;
};

export default ManagerRoutes;
