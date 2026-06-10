/**
 * localDB.ts — localStorage-based database layer
 * 
 * Mimics json-server REST API for production builds.
 * Dev mode uses json-server; production builds use this.
 * 
 * Supports: /users, /projects (with nested resources)
 * Operations: GET, POST, PUT, PATCH, DELETE
 */

const DB_KEY = 'microsite_builder_db';

// Default seed data — matches db.json structure
const DEFAULT_DB: Record<string, any[]> = {
  users: [
    {
      id: '1',
      name: 'Vikram kumar',
      email: 'vikram@test.com',
      password: '12345',
      plan: 'Pro Plan',
      avatar: 'https://i.pravatar.cc/150?u=alex'
    },
    {
      id: '1773580019303',
      name: 'Test User',
      email: 'test@test.com',
      password: '12345',
      plan: 'Free Plan',
      avatar: 'https://i.pravatar.cc/150'
    }
  ],
  projects: []
};

/**
 * Get the full database from localStorage, or seed it with defaults
 */
function getDB(): Record<string, any[]> {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn('[localDB] Failed to parse localStorage DB, resetting...', e);
  }
  // First time: seed with defaults
  saveDB(DEFAULT_DB);
  return { ...DEFAULT_DB };
}

/**
 * Save the full database to localStorage
 */
function saveDB(db: Record<string, any[]>): void {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
  } catch (e: any) {
    // Handle QuotaExceededError gracefully
    if (e.name === 'QuotaExceededError' || e.code === 22) {
      console.error('[localDB] localStorage quota exceeded! Consider cleaning old projects.');
      throw new Error('Storage quota exceeded. Please delete unused projects to free space.');
    }
    throw e;
  }
}

/**
 * Parse a URL path like "/projects" or "/projects/123"
 * Returns { collection, id? }
 */
function parsePath(endpoint: string): { collection: string; id?: string } {
  // Remove leading slash and split
  const parts = endpoint.replace(/^\//, '').split('/').filter(Boolean);
  
  if (parts.length >= 2) {
    return { collection: parts[0], id: parts[1] };
  }
  return { collection: parts[0] };
}

/**
 * localDB — provides the same interface as json-server REST API
 * All operations are synchronous but return Promises for compatibility
 */
export const localDB = {
  async get(endpoint: string): Promise<any> {
    const db = getDB();
    const { collection, id } = parsePath(endpoint);
    
    const items = db[collection];
    if (!items) {
      throw new Error(`Collection "${collection}" not found`);
    }

    if (id) {
      const item = items.find((item: any) => String(item.id) === String(id));
      if (!item) {
        throw new Error(`Item with id "${id}" not found in "${collection}"`);
      }
      return structuredClone(item);
    }

    return structuredClone(items);
  },

  async post(endpoint: string, data: any): Promise<any> {
    const db = getDB();
    const { collection } = parsePath(endpoint);

    if (!db[collection]) {
      db[collection] = [];
    }

    // Ensure the item has an ID
    const newItem = { ...data };
    if (!newItem.id) {
      newItem.id = Date.now().toString() + Math.random().toString(36).substring(2, 9);
    }

    db[collection].push(newItem);
    saveDB(db);

    return structuredClone(newItem);
  },

  async put(endpoint: string, data: any): Promise<any> {
    const db = getDB();
    const { collection, id } = parsePath(endpoint);

    if (!id) throw new Error('PUT requires an id in the URL');
    if (!db[collection]) throw new Error(`Collection "${collection}" not found`);

    const index = db[collection].findIndex((item: any) => String(item.id) === String(id));
    if (index === -1) {
      throw new Error(`Item with id "${id}" not found in "${collection}"`);
    }

    // PUT replaces the entire item, preserving the id
    db[collection][index] = { ...data, id };
    saveDB(db);

    return structuredClone(db[collection][index]);
  },

  async patch(endpoint: string, data: any): Promise<any> {
    const db = getDB();
    const { collection, id } = parsePath(endpoint);

    if (!id) throw new Error('PATCH requires an id in the URL');
    if (!db[collection]) throw new Error(`Collection "${collection}" not found`);

    const index = db[collection].findIndex((item: any) => String(item.id) === String(id));
    if (index === -1) {
      throw new Error(`Item with id "${id}" not found in "${collection}"`);
    }

    // PATCH merges the data
    db[collection][index] = { ...db[collection][index], ...data };
    saveDB(db);

    return structuredClone(db[collection][index]);
  },

  async delete(endpoint: string): Promise<any> {
    const db = getDB();
    const { collection, id } = parsePath(endpoint);

    if (!id) throw new Error('DELETE requires an id in the URL');
    if (!db[collection]) throw new Error(`Collection "${collection}" not found`);

    const index = db[collection].findIndex((item: any) => String(item.id) === String(id));
    if (index === -1) {
      throw new Error(`Item with id "${id}" not found in "${collection}"`);
    }

    const [deleted] = db[collection].splice(index, 1);
    saveDB(db);

    return structuredClone(deleted);
  }
};
