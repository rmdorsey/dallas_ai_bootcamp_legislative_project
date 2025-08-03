// src/config/environment.ts

// Safely access Vite environment variables with fallbacks
const getEnvVar = (key: string, defaultValue: string = ''): string => {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return (import.meta.env as any)[key] || defaultValue;
  }
  return defaultValue;
};

const isProd = (): boolean => {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return (import.meta.env as any).PROD === true;
  }
  return false;
};

const getMode = (): string => {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return (import.meta.env as any).MODE || 'development';
  }
  return 'development';
};

export const environment = {
  development: {
    FASTAPI_BASE_URL: 'http://localhost:8000',
    FASTAPI_AGENT_ENDPOINT: '/agent/invoke'
  },
  docker: {
    FASTAPI_BASE_URL: 'http://fastapi:8000',
    FASTAPI_AGENT_ENDPOINT: '/agent/invoke'
  },
  production: {
    FASTAPI_BASE_URL: getEnvVar('VITE_FASTAPI_URL', 'http://localhost:8000'),
    FASTAPI_AGENT_ENDPOINT: '/agent/invoke'
  }
};

// Detect environment
const getEnvironment = () => {
  // Check if running in Docker
  if (getEnvVar('VITE_DOCKER') === 'true') {
    return environment.docker;
  }

  // Check if production
  if (isProd()) {
    return environment.production;
  }

  // Default to development
  return environment.development;
};

export const config = getEnvironment();

// API endpoint helpers
export const getAgentStreamUrl = () => {
  return `${config.FASTAPI_BASE_URL}${config.FASTAPI_AGENT_ENDPOINT}`;
};

// Optional: Health check function
export const checkFastAPIHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${config.FASTAPI_BASE_URL}/healthz`);
    return response.ok;
  } catch (error) {
    console.warn('FastAPI health check failed:', error);
    return false;
  }
};

// Debug helper
export const getEnvironmentInfo = () => {
  return {
    mode: getMode(),
    isProd: isProd(),
    config: config,
    envVars: {
      VITE_FASTAPI_URL: getEnvVar('VITE_FASTAPI_URL'),
      VITE_DOCKER: getEnvVar('VITE_DOCKER'),
      VITE_APP_ENV: getEnvVar('VITE_APP_ENV')
    }
  };
};