// Central API client for the ALUGRIDX frontend.
// All admin + public pages should import helpers from here so the base URL
// and JWT handling live in one place.

const BASE =
  (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_API_URL) ||
  'http://localhost:5001';

const TOKEN_KEY = 'alugridx_token';

// ── Token store ──────────────────────────────────────────────
export const auth = {
  get token() {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem(TOKEN_KEY);
  },
  set(token) {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(TOKEN_KEY, token);
  },
  clear() {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(TOKEN_KEY);
  },
  isAuthenticated() {
    return Boolean(this.token);
  },
};

// ── Core request helper ──────────────────────────────────────
async function request(path, { method = 'GET', body, authed = false } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (authed && auth.token) headers.Authorization = `Bearer ${auth.token}`;

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  let json = null;
  try {
    json = await res.json();
  } catch {
    json = {};
  }

  if (!res.ok || json.success === false) {
    const message = json?.message || json?.error || `Request failed (${res.status})`;
    if (res.status === 401 && authed) auth.clear();
    throw new Error(message);
  }
  return json;
}

// ── Health ───────────────────────────────────────────────────
export const checkHealth = () => request('/health');

// ── Auth ─────────────────────────────────────────────────────
export async function login(username, password) {
  const json = await request('/api/auth/login', {
    method: 'POST',
    body: { username, password },
  });
  if (json.token) auth.set(json.token);
  return json;
}

export function logout() {
  auth.clear();
}

// ── Enquiries ────────────────────────────────────────────────
export const submitEnquiry = (data) =>
  request('/api/enquiry', { method: 'POST', body: data });

export const fetchEnquiries = ({ page = 1, limit = 25, status = '' } = {}) => {
  const params = new URLSearchParams({ page, limit });
  if (status) params.set('status', status);
  return request(`/api/enquiry?${params.toString()}`, { authed: true });
};

export const updateEnquiryStatus = (id, status) =>
  request(`/api/enquiry/${id}/status`, {
    method: 'PATCH',
    body: { status },
    authed: true,
  });

// ── Dashboard ────────────────────────────────────────────────
export const fetchStats = () => request('/api/dashboard/stats', { authed: true });

// ── Products ─────────────────────────────────────────────────
export const fetchProducts = () => request('/api/products');
export const fetchProductBySlug = (slug) =>
  request(`/api/products/slug/${encodeURIComponent(slug)}`);
export const createProduct = (data) =>
  request('/api/products', { method: 'POST', body: data, authed: true });
export const updateProduct = (id, data) =>
  request(`/api/products/${id}`, { method: 'PUT', body: data, authed: true });
export const deleteProduct = (id) =>
  request(`/api/products/${id}`, { method: 'DELETE', authed: true });

// ── Projects ─────────────────────────────────────────────────
export const fetchProjects = () => request('/api/projects');
export const createProject = (data) =>
  request('/api/projects', { method: 'POST', body: data, authed: true });
export const updateProject = (id, data) =>
  request(`/api/projects/${id}`, { method: 'PUT', body: data, authed: true });
export const deleteProject = (id) =>
  request(`/api/projects/${id}`, { method: 'DELETE', authed: true });

// ── Blogs ────────────────────────────────────────────────────
export const fetchBlogs = () => request('/api/blogs');
export const createBlog = (data) =>
  request('/api/blogs', { method: 'POST', body: data, authed: true });
export const updateBlog = (id, data) =>
  request(`/api/blogs/${id}`, { method: 'PUT', body: data, authed: true });
export const deleteBlog = (id) =>
  request(`/api/blogs/${id}`, { method: 'DELETE', authed: true });

// ── FAQs ─────────────────────────────────────────────────────
export const fetchFaqs = () => request('/api/faqs');
export const createFaq = (data) =>
  request('/api/faqs', { method: 'POST', body: data, authed: true });
export const updateFaq = (id, data) =>
  request(`/api/faqs/${id}`, { method: 'PUT', body: data, authed: true });
export const deleteFaq = (id) =>
  request(`/api/faqs/${id}`, { method: 'DELETE', authed: true });

// ── Image upload (Cloudinary via /api/upload) ────────────────
async function uploadRequest(path, formData) {
  const headers = {};
  if (auth.token) headers.Authorization = `Bearer ${auth.token}`;

  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers,
    body: formData,
  });

  let json = null;
  try { json = await res.json(); } catch { json = {}; }

  if (!res.ok || json.success === false) {
    const message = json?.message || json?.error || `Upload failed (${res.status})`;
    if (res.status === 401) auth.clear();
    throw new Error(message);
  }
  return json;
}

export async function uploadImage(file, { folder } = {}) {
  const fd = new FormData();
  fd.append('image', file);
  if (folder) fd.append('folder', folder);
  const json = await uploadRequest('/api/upload/image', fd);
  return json.data; // { url, publicId, width, height, ... }
}

export async function uploadImages(files, { folder } = {}) {
  const fd = new FormData();
  Array.from(files).forEach((f) => fd.append('images', f));
  if (folder) fd.append('folder', folder);
  const json = await uploadRequest('/api/upload/images', fd);
  return json.data;
}

export async function uploadDatasheet(file, { folder } = {}) {
  const fd = new FormData();
  fd.append('file', file);
  if (folder) fd.append('folder', folder);
  const json = await uploadRequest('/api/upload/datasheet', fd);
  return json.data; // { url, publicId, originalName, bytes, ... }
}

export const deleteUploadedImage = (publicId) =>
  request(`/api/upload/${encodeURIComponent(publicId)}`, {
    method: 'DELETE',
    authed: true,
  });

export const deleteUploadedDatasheet = (publicId) =>
  request(`/api/upload/${encodeURIComponent(publicId)}?resourceType=raw`, {
    method: 'DELETE',
    authed: true,
  });
