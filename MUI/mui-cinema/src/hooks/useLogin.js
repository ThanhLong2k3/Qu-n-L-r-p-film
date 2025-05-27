// src/hooks/useLogin.js
import { useMutation } from '@tanstack/react-query';
import { loginApi } from '../services/loginService';
import useAuthStore from '../store/useAuthStore';

const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      setUser(data.userInfo);
      setToken(data.token);
      // Lưu token vào localStorage hoặc sessionStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.userInfo.username);
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });
};

export default useLogin;
