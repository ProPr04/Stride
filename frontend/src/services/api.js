/**
 * Stride API Service Client
 * Centralized service to connect Frontend with Backend.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Checks if authentication is globally enabled or bypassed via environment variable.
 */
export const isAuthEnabled = () => {
  return import.meta.env.VITE_ENABLE_AUTH !== 'false';
};

/**
 * Token and Local Storage Helpers
 */
export const authStorage = {
  getToken: () => localStorage.getItem('stride_token'),
  setToken: (token) => localStorage.setItem('stride_token', token),
  removeToken: () => localStorage.removeItem('stride_token'),
  getUser: () => {
    try {
      const user = localStorage.getItem('stride_user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },
  setUser: (user) => localStorage.setItem('stride_user', JSON.stringify(user)),
  isAuthenticated: () => {
    // If authentication is disabled via environment variable, allow direct access
    if (!isAuthEnabled()) {
      return true;
    }

    const token = localStorage.getItem('stride_token');
    if (!token) return false;
    try {
      // Decode JWT payload to verify expiration
      const parts = token.split('.');
      if (parts.length !== 3) {
        authStorage.clear();
        return false;
      }
      const base64Url = parts[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const payload = JSON.parse(jsonPayload);
      if (payload.exp && Date.now() >= payload.exp * 1000) {
        // Token has expired! Purge auth session
        authStorage.clear();
        return false;
      }
      return true;
    } catch {
      authStorage.clear();
      return false;
    }
  },
  clear: () => {
    localStorage.removeItem('stride_token');
    localStorage.removeItem('stride_user');
    sessionStorage.clear();
  },
};

/**
 * Generic API Fetch Handler
 */
async function apiFetch(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  const token = authStorage.getToken();
  const currentUser = authStorage.getUser();

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(currentUser?.role ? { 'x-mock-role': currentUser.role } : {}),
    ...(currentUser?.id ? { 'x-mock-user-id': String(currentUser.id) } : {}),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });


  // Automatically clear session if backend reports 401 Unauthorized / Token Expired
  if (response.status === 401) {
    authStorage.clear();
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMessage = data.message || `Request failed with status ${response.status}`;
    const error = new Error(errorMessage);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}


/**
 * API Service Modules
 */
export const api = {
  // Authentication Endpoints
  auth: {
    login: async (email, password, role) => {
      const result = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password, role }),
      });
      if (result.token) {
        authStorage.setToken(result.token);
      }
      if (result.data?.user) {
        authStorage.setUser(result.data.user);
      }
      return result;
    },


    register: async ({ email, password, role }) => {
      const result = await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password, role }),
      });
      if (result.token) {
        authStorage.setToken(result.token);
      }
      if (result.data?.user) {
        authStorage.setUser(result.data.user);
      }
      return result;
    },

    logout: () => {
      authStorage.clear();
    },
  },

  // Profile Endpoints
  profiles: {
    getMyProfile: async () => {
      return apiFetch('/profiles/me');
    },

    updateMyProfile: async (profileData) => {
      return apiFetch('/profiles/me', {
        method: 'PUT',
        body: JSON.stringify(profileData),
      });
    },

    getAthleteProfile: async (userId) => {
      return apiFetch(`/profiles/athlete/${userId}`);
    },

    getAllAthletes: async (filters = {}) => {
      const params = new URLSearchParams();
      if (filters.sport && filters.sport !== 'All') params.append('sport', filters.sport);
      if (filters.search) params.append('search', filters.search);
      const query = params.toString() ? `?${params.toString()}` : '';
      return apiFetch(`/profiles/athletes${query}`);
    },
  },


  // Opportunities Endpoints
  opportunities: {
    getAll: async (filters = {}) => {
      const params = new URLSearchParams();
      if (filters.sport && filters.sport !== 'All') params.append('sport', filters.sport);
      if (filters.role) params.append('role', filters.role);
      if (filters.search) params.append('search', filters.search);
      const query = params.toString() ? `?${params.toString()}` : '';
      return apiFetch(`/opportunities${query}`);
    },


    getMyPosted: async () => {
      return apiFetch('/opportunities/my');
    },

    create: async (opportunityData) => {
      return apiFetch('/opportunities', {
        method: 'POST',
        body: JSON.stringify(opportunityData),
      });
    },

    updateStatus: async (id, status) => {
      return apiFetch(`/opportunities/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
    },

    update: async (id, data) => {
      return apiFetch(`/opportunities/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },
  },

  // Agreements / Applications Endpoints
  agreements: {
    getMyAgreements: async () => {
      return apiFetch('/agreements/me');
    },

    apply: async (opportunityId, academyId) => {
      return apiFetch('/agreements/apply', {
        method: 'POST',
        body: JSON.stringify({ opportunityId, academyId }),
      });
    },

    updateStatus: async (id, status) => {
      return apiFetch(`/agreements/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
    },
  },

  // Saved opportunities (athlete)
  saved: {
    getMySaved: async () => apiFetch('/saved'),
    save: async (opportunityId) => apiFetch('/saved', {
      method: 'POST',
      body: JSON.stringify({ opportunityId }),
    }),
    unsave: async (opportunityId) => apiFetch(`/saved/${opportunityId}`, {
      method: 'DELETE',
    }),
  },
};

export default api;
