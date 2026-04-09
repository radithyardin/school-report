import axios from 'axios';

const API_URL = 'http://localhost/school-report/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth API
export const login = (data) => api.post('/auth/login.php', data);
export const register = (data) => api.post('/auth/register.php', data);
export const logout = () => api.post('/auth/logout.php');

// Report API
export const createReport = (data) => api.post('/reports/create.php', data);
export const getReports = () => api.get('/reports/list.php');
export const getMyReports = (userId) => api.get(`/reports/my-reports.php?user_id=${userId}`);
export const getReportById = (id) => api.get(`/reports/detail.php?id=${id}`);
export const updateReportStatus = (id, status) => api.put(`/reports/update-status.php`, { id, status });

// Admin API
export const getAllReports = () => api.get('/admin/reports.php');
export const getDashboardStats = () => api.get('/admin/stats.php');
export const getReportsByCategory = () => api.get('/admin/by-category.php');
export const getReportsByMonth = () => api.get('/admin/by-month.php');

export default api;
