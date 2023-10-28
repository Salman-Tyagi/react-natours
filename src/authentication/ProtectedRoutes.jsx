import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../services/apiAuth';

function ProtectedRoutes({ children }) {
  const user = getCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return navigate('/login');
  }, []);

  if (user) return children;
}

export default ProtectedRoutes;
