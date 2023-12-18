// File: Endpoints.ts

// Base URL for API requests
const url = "http://localhost:5071";

// Authentication-specific endpoint URL
const urlAuth = `${url}/api/Auth`;

// User-related endpoint URL
const urlUser = `${url}/api/Users`;

/**
 * Endpoints for the API
 */
const Endpoints = {
  url,        // Base URL for general API requests
  urlAuth,    // Authentication-specific endpoint URL
  urlUser,    // User-related endpoint URL
};

/**
 * Export the endpoints
 */
export default Endpoints;
