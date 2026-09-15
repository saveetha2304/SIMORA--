const API_URL = "https://simora-backend-53kc.onrender.com/api";

export const getProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products`);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();

    return data.products || [];
  } catch (error) {
    console.error("Product API Error:", error);
    return [];
  }
};

export const searchProducts = async (query) => {
  try {
    const response = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`);

    if (!response.ok) {
      throw new Error("Failed to search products");
    }

    const data = await response.json();

    return data.products || [];
  } catch (error) {
    console.error("Search API Error:", error);
    return [];
  }
};

export const signupUser = async (email, password, name) => {
  try {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Signup failed");
    }

    return data;
  } catch (error) {
    console.error("Signup API Error:", error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Login failed");
    }

    return data;
  } catch (error) {
    console.error("Login API Error:", error);
    throw error;
  }
};

export const getSimilarProducts = async (categoryId, excludeId) => {
  try {
    const response = await fetch(`${API_URL}/products/category/${categoryId}/${excludeId}`);
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error("Similar Products API Error:", error);
    return [];
  }
};