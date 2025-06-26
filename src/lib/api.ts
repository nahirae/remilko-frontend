import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Fungsi untuk mendapatkan token dari localStorage dengan aman
const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

// Interceptor untuk menyisipkan token ke setiap request secara otomatis
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fungsi request generik yang menangani error dan cache
export const apiRequest = async (method: string, url: string, data: any = null, isAuth: boolean = false, config: any = {}) => {
  try {
    const finalConfig = { ...config };
    // Paksa request GET untuk selalu mengambil data baru dari server (mencegah cache)
    if (method.toLowerCase() === 'get') {
      finalConfig.cache = 'no-store';
    }

    if (isAuth) {
      const token = getToken();
      if (!token) throw new Error("Akses ditolak. Silakan login terlebih dahulu.");
    }

    const response = await api({
      method,
      url,
      data,
      ...finalConfig,
    });

    return response.data;
  } catch (error: any) {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    // Penanganan token kedaluwarsa
    if (status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        alert("Sesi Anda telah berakhir. Silakan login kembali.");
        window.location.href = "/login";
      }
    }
    
    console.error(`API Error (${method.toUpperCase()} ${url}):`, error.response?.data || error);
    throw new Error(message || "Terjadi kesalahan saat menghubungi server.");
  }
};

// --- Helper Methods ---
export const getAuth = (url: string, config = {}) => apiRequest("get", url, null, true, config);
export const postAuth = (url: string, data: any, config = {}) => apiRequest("post", url, data, true, config);
export const putAuth = (url: string, data: any, config = {}) => apiRequest("put", url, data, true, config);
export const deleteAuth = (url: string, config = {}) => apiRequest("delete", url, null, true, config);