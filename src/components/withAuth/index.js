import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const router = useRouter();

    useEffect(() => {
        const checkAuthStatus = async () => {
          try {
            // Make a request to the backend to validate the token
            const response = await axios.get('http://127.0.0.1:3002/api/v1/validate_token', {
              withCredentials: true,  // Ensure cookies are sent with the request
            });
            console.log('Token valid:', response.data);
            // If response is OK (i.e., valid token), the user is authenticated
          } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error('Auth error:', error);
              // If we get a 401 response, redirect the user to the login page
              router.push('/customer/login');
            }
          }
        };
  
        checkAuthStatus();
      }, [router]);

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
