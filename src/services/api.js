const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getRecords = async () => {
  const res = await fetch(`${API_BASE_URL}/records`);
  if (!res.ok) throw new Error('Error al obtener récords');
  return res.json();
};

export const createRecord = async (payload) => {
  const res = await fetch(`${API_BASE_URL}/records`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Error al crear récord');
  return res.json();
};

export const updateRecord = async (id, payload) => {
  const res = await fetch(`${API_BASE_URL}/records/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Error al actualizar récord');
  return res.json();
};

export const deleteRecord = async (id) => {
  const res = await fetch(`${API_BASE_URL}/records/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || 'Error al eliminar récord');
  }
  return res.json();
};

export const checkHealth = async () => {
  const res = await fetch(`${API_BASE_URL}/health`);
  if (!res.ok) throw new Error('Backend no disponible');
  return res.json();
};

export const register = async (payload) => {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Error al crear cuenta');
  return data;
};

export const login = async (payload) => {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Error al iniciar sesión');
  return data;
};
