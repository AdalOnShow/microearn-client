const API_URL = "/api/proxy";

class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

async function fetchApi(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        data.message || "An error occurred",
        response.status,
        data
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      "Network error. Please check your connection.",
      0,
      null
    );
  }
}

export const api = {
  // Auth
  login: (data) => fetchApi("/auth/login", { method: "POST", body: JSON.stringify(data) }),
  register: (data) => fetchApi("/auth/register", { method: "POST", body: JSON.stringify(data) }),
  getMe: () => fetchApi("/auth/me"),

  // Users
  getUsers: (params) => fetchApi(`/users?${new URLSearchParams(params)}`),
  getTopWorkers: (limit = 6) => fetchApi(`/users/top-workers?limit=${limit}`),
  getBuyerStats: () => fetchApi("/users/buyer/stats"),
  getWorkerStats: () => fetchApi("/users/worker/stats"),
  getUser: (id) => fetchApi(`/users/${id}`),
  updateProfile: (data) => fetchApi("/users/profile", { method: "PATCH", body: JSON.stringify(data) }),
  updateUserRole: (id, role) => fetchApi(`/users/${id}/role`, { method: "PATCH", body: JSON.stringify({ role }) }),
  deleteUser: (id) => fetchApi(`/users/${id}`, { method: "DELETE" }),

  // Tasks
  getTasks: (params) => fetchApi(`/tasks?${new URLSearchParams(params)}`),
  getAvailableTasks: () => fetchApi("/tasks/available"),
  getTask: (id) => fetchApi(`/tasks/${id}`),
  createTask: (data) => fetchApi("/tasks", { method: "POST", body: JSON.stringify(data) }),
  updateTask: (id, data) => fetchApi(`/tasks/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  deleteTask: (id) => fetchApi(`/tasks/${id}`, { method: "DELETE" }),

  // Submissions
  getSubmissions: (params) => fetchApi(`/submissions?${new URLSearchParams(params)}`),
  createSubmission: (data) => fetchApi("/submissions", { method: "POST", body: JSON.stringify(data) }),
  reviewSubmission: (id, data) => fetchApi(`/submissions/${id}/review`, { method: "PATCH", body: JSON.stringify(data) }),

  // Withdrawals
  getWithdrawals: (params) => fetchApi(`/withdrawals?${new URLSearchParams(params)}`),
  createWithdrawal: (data) => fetchApi("/withdrawals", { method: "POST", body: JSON.stringify(data) }),
  processWithdrawal: (id, data) => fetchApi(`/withdrawals/${id}`, { method: "PATCH", body: JSON.stringify(data) }),

  // Reports
  getReports: (params) => fetchApi(`/reports?${new URLSearchParams(params)}`),
  createReport: (data) => fetchApi("/reports", { method: "POST", body: JSON.stringify(data) }),
  updateReport: (id, data) => fetchApi(`/reports/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
};

export { ApiError };