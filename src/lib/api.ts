import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Ambil token dari localStorage
const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

// Interceptor: Tambahkan token otomatis jika ada
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fungsi reusable request
export const apiRequest = async (method, url, data = null, isAuth = false, config = {}) => {
  try {
    const headers = {
      ...config.headers,
    };

    // Jika butuh Auth manual
    if (isAuth) {
      const token = getToken();
      if (!token) throw new Error("Silakan login terlebih dahulu.");
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await api({
      method,
      url,
      data,
      headers,
      ...config,
    });

    return response.data;
  } catch (error: any) {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    // Penanganan token expired
    if (status === 401 && message.toLowerCase().includes("token")) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        alert("Sesi login telah habis. Silakan login ulang.");
        window.location.href = "/login";
      }
    }

    console.error(`API Error (${method.toUpperCase()} ${url}):`, error.response?.data || error.message);
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
