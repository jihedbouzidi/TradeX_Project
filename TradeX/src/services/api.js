export const api = {
  baseUrl: "http://localhost/Backend_TradeX",

  async request(endpoint, method = "GET", data = null, params = null) {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          url.searchParams.append(key, params[key]);
        }
      });
    }

    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (data && (method === "POST" || method === "PUT")) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  },

  async get(endpoint, params = null) {
    return this.request(endpoint, "GET", null, params);
  },

  async post(endpoint, data) {
    return this.request(endpoint, "POST", data);
  },

  async put(endpoint, data) {
    return this.request(endpoint, "PUT", data);
  },

  async delete(endpoint) {
    return this.request(endpoint, "DELETE");
  },
};