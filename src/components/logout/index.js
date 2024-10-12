
import axios from 'axios';

export const handleLogout = async (router) => {

  try {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/logout`, {
      withCredentials: true,  // Include cookies in the request
    });

    if (response.status === 200) {
      // Redirect to login page after logout
      router.push('/login');
    } else {
      console.error('Failed to log out');
    }
  } catch (error) {
    console.error('Error during logout:', error);
  }
};
