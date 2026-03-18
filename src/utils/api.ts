const API_URL = 'http://localhost:5001';

export const api = {
  async get(endpoint: string) {
    const res = await fetch(`${API_URL}${endpoint}`);
    if (!res.ok) throw new Error('API Error');
    return res.json();
  },

  async post(endpoint: string, data: any) {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('API Error');
    return res.json();
  },

  async put(endpoint: string, data: any) {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('API Error');
    return res.json();
  },

  async patch(endpoint: string, data: any) {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('API Error');
    return res.json();
  },

  async delete(endpoint: string) {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('API Error');
    return res.json();
  },
};
