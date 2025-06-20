import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode';

export function useAuth(requiredRole = 'user') {
  const [user, setUser] = useState<{ id: string; role: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
      return;
    }
    try {
      const decoded: any = (jwt_decode as any)(token);
      if (requiredRole === 'admin' && decoded.role !== 'admin') {
        router.push('/');
        return;
      }
      setUser({ id: decoded.id, role: decoded.role });
    } catch {
      router.push('/');
    }
  }, [router, requiredRole]);

  return user;
}
