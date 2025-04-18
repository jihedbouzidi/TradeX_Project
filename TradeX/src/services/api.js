export const api = {
  baseUrl: "http://localhost/Backend_TradeX",

  async request(endpoint, method = "GET", data = null) {
    const url = `${this.baseUrl}${endpoint}`;
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, options);
      const text = await response.text();

      // Try to parse JSON, fallback to text if it fails
      try {
        return JSON.parse(text);
      } catch {
        return text;
      }
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  },

  async get(endpoint) {
    return this.request(endpoint);
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
