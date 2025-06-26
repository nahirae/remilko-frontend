import { postNoAuth, postAuth, getAuth, putAuth } from './api';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
  photo_user: string | null;
}

interface ProfileResponse {
  data: {
    user: User[];
  };
  meta: {
    code: number;
    status: string;
    message: string;
  };
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
  const response = await getAuth<ProfileResponse>('/profile');
  if (!response.data.user || response.data.user.length === 0) {
    throw new Error('No user data found');
  }
  return response.data.user[0];
};

export const putProfile = async (): Promise<User> => {
  return await putAuth('/profile');
};

export const updateProfile = async (data: UpdateProfileData): Promise<User> => {
  return await putAuth('/profile', data);
};