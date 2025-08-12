// Configuração da API para diferentes ambientes
export const API_CONFIG = {
  development: {
    baseURL: "http://192.168.15.7:8080/api",
    timeout: 10000,
  },
  production: {
    baseURL: "https://your-production-server.com/api",
    timeout: 15000,
  },
}

// Função para obter configuração baseada no ambiente
export const getApiConfig = () => {
  if (__DEV__) {
    return API_CONFIG.development
  }
  return API_CONFIG.production
}

// Configuração de CORS para desenvolvimento
export const CORS_CONFIG = {
  development: [
    "http://localhost:5173",
    "http://localhost:3000", 
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000"
  ],
  production: [
    "https://your-production-domain.com"
  ]
}
