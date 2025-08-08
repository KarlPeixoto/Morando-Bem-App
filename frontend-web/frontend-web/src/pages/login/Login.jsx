import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../../api/api";
import "./Login.css";

export default function Login() {
    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleLogin() {
        if (!login.trim() || !senha.trim()) {
            setError("Login e senha são obrigatórios");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = await api.post("/auth/login", { login, senha });
            const { accessToken, refreshToken } = res.data;
            
            sessionStorage.setItem("accessToken", accessToken);
            sessionStorage.setItem("refreshToken", refreshToken);
            sessionStorage.setItem("login", login);
            
            navigate("/home");
        } catch (error) {
            const errorMessage = error.response?.data?.error || "Login ou senha incorretos";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-container">
            <h1>Login</h1>
            {error && <div className="error-message">{error}</div>}
            <input
                placeholder="Login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                disabled={loading}
            />
            <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                disabled={loading}
            />
            <button onClick={handleLogin} disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
            </button>
            <Link to="/cadastro" className="cadastro-link">
                Cadastre-se
            </Link>
        </div>
    );
}