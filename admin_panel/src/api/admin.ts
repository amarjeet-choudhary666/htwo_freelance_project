import type { User } from '../types/admin';

const API_BASE = '/api/v1';

// Helper function for API calls
const apiCall = async (endpoint: string, options?: RequestInit) => {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
};

// Dashboard APIs
export const dashboardAPI = {
  getStats: () => apiCall('/admin/api/stats'),
  getDashboard: () => apiCall('/admin'),
};

// Submission APIs
export const submissionAPI = {
  getAll: (params?: { page?: number; limit?: number; search?: string; status?: string; type?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.search) searchParams.append('search', params.search);
    if (params?.status) searchParams.append('status', params.status);
    if (params?.type) searchParams.append('type', params.type);
    return apiCall(`/admin/submissions?${searchParams}`);
  },
  getDemoRequests: (params?: { page?: number; limit?: number; search?: string; status?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.search) searchParams.append('search', params.search);
    if (params?.status) searchParams.append('status', params.status);
    return apiCall(`/admin/submissions/demo?${searchParams}`);
  },
  getContactForms: (params?: { page?: number; limit?: number; search?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.search) searchParams.append('search', params.search);
    return apiCall(`/admin/submissions/contact?${searchParams}`);
  },
  getInTouchForms: (params?: { page?: number; limit?: number }) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    return apiCall(`/admin/submissions/get-in-touch?${searchParams}`);
  },
  getById: (id: string) => apiCall(`/admin/submission/${id}`),
  updateStatus: (id: string, status: string) => apiCall(`/admin/submission/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  }),
  delete: (id: string) => apiCall(`/admin/submission/${id}`, {
    method: 'DELETE',
  }),
  bulkDelete: (ids: string[]) => apiCall('/admin/bulk/delete-submissions', {
    method: 'POST',
    body: JSON.stringify({ ids }),
  }),
  bulkUpdateStatus: (ids: string[], status: string) => apiCall('/admin/bulk/update-status', {
    method: 'POST',
    body: JSON.stringify({ ids, status }),
  }),
  export: () => fetch(`${API_BASE}/admin/export/submissions`, {
    credentials: 'include',
  }),
};

// User APIs
export const userAPI = {
  getAll: (params?: { page?: number; limit?: number; search?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.search) searchParams.append('search', params.search);
    return apiCall(`/admin/users?${searchParams}`);
  },
  getById: (id: string) => apiCall(`/admin/users/${id}`),
  update: (id: string, data: Partial<User>) => apiCall(`/admin/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => apiCall(`/admin/users/${id}`, {
    method: 'DELETE',
  }),
  export: () => fetch(`${API_BASE}/admin/export/users`, {
    credentials: 'include',
  }),
};

// Analytics APIs
export const analyticsAPI = {
  getAnalytics: () => apiCall('/admin/analytics'),
  getStats: () => apiCall('/admin/api/stats'),
};

// Settings APIs
export const settingsAPI = {
  getSettings: () => apiCall('/admin/settings'),
  updateSettings: (data: any) => apiCall('/admin/settings', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

// Partner APIs
export const partnerAPI = {
  getAll: (params?: { page?: number; limit?: number; search?: string; status?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.search) searchParams.append('search', params.search);
    if (params?.status) searchParams.append('status', params.status);
    return apiCall(`/admin/partners?${searchParams}`);
  },
  getAllWithStatus: () => apiCall('/admin/partners/all-with-status'),
  getAllSimple: () => apiCall('/admin/partners/all'),
  create: async (data: FormData) => {
    try {
      console.log('Sending partner create request with data:', data);
      
      const response = await fetch(`${API_BASE}/admin/partners`, {
        method: 'POST',
        credentials: 'include',
        body: data,
      });

      console.log('Response status:', response.status);
      
      let result;
      try {
        result = await response.json();
      } catch (parseError) {
        console.error('Failed to parse response JSON:', parseError);
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }
      
      console.log('Response data:', result);

      if (!response.ok) {
        throw new Error(result.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      return result;
    } catch (error) {
      console.error('Create partner API error:', error);
      throw error;
    }
  },
  update: async (id: string, data: FormData) => {
    try {
      const response = await fetch(`${API_BASE}/admin/partners/${id}`, {
        method: 'PUT',
        credentials: 'include',
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || `HTTP ${response.status}`);
      }

      return result;
    } catch (error) {
      console.error('Update partner API error:', error);
      throw error;
    }
  },
  delete: (id: string) => apiCall(`/admin/partners/${id}`, {
    method: 'DELETE',
  }),
  updateStatus: (id: string, status: string) => apiCall(`/admin/partners/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  }),
};

// Category APIs
export const categoryAPI = {
  getAll: (params?: { page?: number; limit?: number; search?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.search) searchParams.append('search', params.search);
    return apiCall(`/admin/categories?${searchParams}`);
  },
  create: (data: { name: string; description?: string }) => apiCall('/admin/categories', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: { name: string; description?: string }) => apiCall(`/admin/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => apiCall(`/admin/categories/${id}`, {
    method: 'DELETE',
  }),
  getTypes: (categoryId: string) => apiCall(`/admin/categories/${categoryId}/types`),
  createType: (categoryId: string, data: { name: string }) => apiCall(`/admin/categories/${categoryId}/types`, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  updateType: (id: string, data: { name: string }) => apiCall(`/admin/category-types/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  deleteType: (id: string) => apiCall(`/admin/category-types/${id}`, {
    method: 'DELETE',
  }),
};

// Auth APIs
export const authAPI = {
  login: (email: string, password: string) => apiCall('/users/admin/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  }),
  logout: () => apiCall('/users/admin/logout', {
    method: 'POST',
  }),
  verify: () => apiCall('/users/admin/verify'),
};