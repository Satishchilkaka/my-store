// withAuthentication.tsx
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../pages/useAuth'; // Adjust the import path

export const withAuthentication = (WrappedComponent: React.FC) => {
  const WithAuthenticationComponent: React.FC = () => {
    const auth = useAuth(); // Use the useAuth hook
    const router = useRouter();

    useEffect(() => {
      if (!auth.token) {
        router.push('/'); 
      }
    }, [auth.token, router]);

    return <WrappedComponent />;
  };

  // Add displayName property for linting and debugging
  WithAuthenticationComponent.displayName = `withAuthentication(${WrappedComponent.displayName || WrappedComponent.name})`;

  return WithAuthenticationComponent;
};

