import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const withAuth = (WrappedComponent, requiredRole = null) => {
  const AuthenticatedComponent = (props) => {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      const checkAuthStatus = async () => {
        try {
          // Validate the token and get user information (including roles)
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/validate_token`, {
            withCredentials: true,  // Ensure cookies are sent with the request
          });

          const user = response.data.user;

          // Check if the user role matches the required role (if specified)
          if (requiredRole && user.role !== requiredRole) {
            router.push('/unauthorized'); // Redirect to unauthorized page
            return;
          }

          setIsAuthorized(true);  // User is authenticated and authorized
        } catch (error) {
          if (error.response && error.response.status === 401) {
            console.error('Auth error:', error);
            router.push('/login');  // Redirect to login if not authenticated
          }
        }
      };

      checkAuthStatus();
    }, [router]);

    // Show nothing or a loading spinner until the role check is complete
    if (!isAuthorized) return <div>Loading...</div>;

    // Render the wrapped component if the user is authorized
    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
