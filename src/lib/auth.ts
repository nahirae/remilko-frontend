import { postNoAuth, postAuth, getAuth, putAuth } from './api';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface UpdateProfileData {
  name?: string;
  email?: string;
  password?: string;
}

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  return await postNoAuth('/register', data);
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await postNoAuth('/login', data);
  if (response.token) {
    localStorage.setItem('token', response.token);
  }
  return response;
};

export const logout = async (): Promise<void> => {
  await postAuth('/logout');
  localStorage.removeItem('token');
  window.dispatchEvent(new Event('storage'));
};

export const getProfile = async (): Promise<User> => {
  return await getAuth('/profile');
};

export const putProfile = async (): Promise<User> => {
  return await putAuth('/profile');
};

export const updateProfile = async (data: UpdateProfileData): Promise<User> => {
  return await putAuth('/profile', data);
};