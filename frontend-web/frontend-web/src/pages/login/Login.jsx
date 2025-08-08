import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../../api/api";
import logo from "../../assets/Casa animada com sorriso amigável.png";
import "./Login.css";

export default function Login() {
    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const navigate = useNavigate();

    // Carregar preferência do tema do localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('darkMode');
        if (savedTheme) {
            setDarkMode(JSON.parse(savedTheme));
        }
    }, []);

    // Salvar preferência do tema no localStorage
    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin();
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`login-container ${darkMode ? 'dark' : ''}`}>
            <div className="login-form-section">
                <div className="login-form-wrapper">
                    <div className="theme-toggle-container">
                        <button
                            onClick={toggleDarkMode}
                            className="theme-toggle"
                            aria-label={darkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
                        >
                            {darkMode ? '☀️' : '🌙'}
                        </button>
                    </div>

                    <div className="logo-container">
                        <div className="logo">
                            <img
                                src={logo}
                                alt="Morando Bem Logo"
                                className="company-logo"
                            />
                        </div>
                    </div>

                    <h1 className="login-title">Login</h1>

                    <p className="signup-link">
                        Não tem uma conta? <Link to="/cadastro" className="create-account-link">Cadastre-se</Link>
                    </p>

                    {error && <div className="error-message">{error}</div>}

                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label htmlFor="login" className="form-label">Login</label>
                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    id="login"
                                    name="login"
                                    value={login}
                                    onChange={(e) => setLogin(e.target.value)}
                                    className="form-input"
                                    placeholder="Digite seu login"
                                    disabled={loading}
                                    required
                                />
                                <span className="input-icon">👤</span>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="senha" className="form-label">Senha</label>
                            <div className="input-wrapper">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="senha"
                                    name="senha"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    className="form-input"
                                    placeholder="Digite sua senha"
                                    disabled={loading}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="password-toggle"
                                    disabled={loading}
                                >
                                    {showPassword ? '👁️' : '👁️‍🗨️'}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="login-button" disabled={loading}>
                            {loading ? "Entrando..." : "Entrar"}
                        </button>
                    </form>
                </div>
            </div>

            <div className="marketing-section">
                <div className="marketing-content">
                    <h2 className="marketing-title">
                        Bem-vindo de volta ao Morando Bem!
                    </h2>

                    <div className="marketing-text">
                        <p>
                            <strong>Acesse sua conta e continue de onde parou.</strong>
                        </p>

                        <p>
                            Nossa plataforma te ajuda a listar habilidades adquiridas
                            nessa jornada que é morar sozinho pela primeira vez!
                        </p>

                        <p>
                            <em>Faça login para acessar todas as funcionalidades.</em>
                        </p>
                    </div>

                    <div className="illustration">
                        <div className="person person-left">
                            <div className="person-head"></div>
                            <div className="person-body"></div>
                        </div>

                        <div className="house-animation">
                            <div className="house-center">
                                🏠
                            </div>

                           
                            <div className="skill-icon">
                                🍳
                            </div>
                            <div className="skill-icon">
                                🔧
                            </div>
                            <div className="skill-icon">
                                👕
                            </div>
                            <div className="skill-icon">
                                💰
                            </div>
                            <div className="skill-icon">
                                ❤️
                            </div>
                            <div className="skill-icon">
                                🏠
                            </div>
                        </div>

                        <div className="person person-right">
                            <div className="person-head"></div>
                            <div className="person-body"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
