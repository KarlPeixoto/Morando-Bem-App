export const handleApiError = (error, navigate) => {
    if (error.response?.status === 401) {
        sessionStorage.clear();
        navigate('/login');
        return "Sessão expirada. Faça login novamente.";
    }
    
    if (error.response?.status === 403) {
        return "Acesso negado. Você não tem permissão para esta ação.";
    }
    
    if (error.response?.status === 404) {
        return "Recurso não encontrado.";
    }
    
    if (error.response?.status >= 500) {
        return "Erro interno do servidor. Tente novamente mais tarde.";
    }
    
    return error.response?.data?.error || "Ocorreu um erro inesperado.";
};

export const showNotification = (message, type = "error") => {
    if (type === "error" && message.includes("Sessão expirada")) {
        alert(`❌ ${message}`);
    } else if (type === "success") {
        alert(`✅ ${message}`);
    }
};
