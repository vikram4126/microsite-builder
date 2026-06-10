/**
 * api.ts — Dual-mode API layer
 * 
 * DEV mode (npm run dev)  → fetch calls to json-server (localhost:5001)
 * PROD mode (npm run build) → localStorage via localDB
 * 
 * Same interface for both modes — consumers don't need any changes.
 */

import { localDB } from './localDB';

const API_URL = 'http://localhost:5001';

// Use json-server in dev, localStorage in production
const USE_LOCAL_DB = import.meta.env.PROD;

// json-server fetch-based implementation
const fetchAPI = {
  async get(endpoint: string) {
    const res = await fetch(`${API_URL}${endpoint}`);
    if (!res.ok) throw new Error(`API Error: ${res.status} ${res.statusText}`);
    return res.json();
  },

  async post(endpoint: string, data: any) {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`API Error: ${res.status} ${res.statusText}`);
    return res.json();
  },

  async put(endpoint: string, data: any) {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`API Error: ${res.status} ${res.statusText}`);
    return res.json();
  },

  async patch(endpoint: string, data: any) {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`API Error: ${res.status} ${res.statusText}`);
    return res.json();
  },

  async delete(endpoint: string) {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error(`API Error: ${res.status} ${res.statusText}`);
    return res.json();
  },
};

// Export the appropriate implementation based on environment
export const api = USE_LOCAL_DB ? localDB : fetchAPI;
