import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
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

export default api;

// ========== Helper Methods ==========

// GET
export const getNoAuth = (url, config = {}) => apiRequest("get", url, null, false, config);
export const getAuth = (url, config = {}) => apiRequest("get", url, null, true, config);

// POST
export const postNoAuth = (url, data, config = {}) => apiRequest("post", url, data, false, config);
export const postAuth = (url, data, config = {}) => apiRequest("post", url, data, true, config);

// PUT
export const putNoAuth = (url, data, config = {}) => apiRequest("put", url, data, false, config);
export const putAuth = (url, data, config = {}) => apiRequest("put", url, data, true, config);

// PATCH
export const patchNoAuth = (url, data, config = {}) => apiRequest("patch", url, data, false, config);
export const patchAuth = (url, data, config = {}) => apiRequest("patch", url, data, true, config);

// DELETE
export const deleteNoAuth = (url, config = {}) => apiRequest("delete", url, null, false, config);
export const deleteAuth = (url, config = {}) => apiRequest("delete", url, null, true, config);
