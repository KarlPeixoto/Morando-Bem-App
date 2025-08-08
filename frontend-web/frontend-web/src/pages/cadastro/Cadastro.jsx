import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import ModalConfirmacao from "../../components/modalConfirmacao/ModalConfirmacao";
import logo from "../../assets/Casa animada com sorriso amigável.png"
import "./Cadastro.css";

export default function Cadastro() {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [modalVisivel, setModalVisivel] = useState(false);
  const [usuarioLogin, setUsuarioLogin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCadastro();
  };

  async function handleCadastro() {
    if (!login.trim() || !email.trim() || !senha.trim()) {
      setError("Todos os campos são obrigatórios");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await api.post("/usuarios/cadastrar", { login, email, senha });
      setUsuarioLogin(res.data.login);
      setModalVisivel(true);
      // Limpar campos após sucesso
      setLogin("");
      setEmail("");
      setSenha("");
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Erro ao cadastrar usuário";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  async function confirmarEmail(codigoConfirmacao) {
    try {
      await api.post(`/usuarios/confirmar-email?login=${usuarioLogin}`, {
        codigo: codigoConfirmacao,
      });
      alert("Email confirmado com sucesso!");
      setModalVisivel(false);
      navigate("/login");
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert("Código inválido ou erro na confirmação");
    }
  }

  return (
    <div className={`cadastro-container ${darkMode ? 'dark' : ''}`}>
      {/* Seção do Formulário */}
      <div className="cadastro-form-section">
        <div className="cadastro-form-wrapper">
          {/* Toggle do Tema */}
          <div className="theme-toggle-container">
            <button
              onClick={toggleDarkMode}
              className="theme-toggle"
              aria-label={darkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>

          {/* Logo */}
          <div className="logo-container">
            <div className="logo">
              <img
                src={logo}
                alt="Morando Bem Logo"
                className="company-logo"
              />
            </div>
          </div>

          <h1 className="cadastro-title">Cadastro</h1>

          <p className="login-link">
            Já tem uma conta? <a href="/login" className="login-account-link">Faça login</a>
          </p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="cadastro-form">
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
              <label htmlFor="email" className="form-label">Email</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  placeholder="Digite seu email"
                  disabled={loading}
                  required
                />
                <span className="input-icon">📧</span>
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

            <button type="submit" className="cadastro-button" disabled={loading}>
              {loading ? "Cadastrando..." : "Cadastrar"}
            </button>
          </form>
        </div>
      </div>

      <div className="marketing-section">
        <div className="marketing-content">
          <h2 className="marketing-title">
            Junte-se ao Morando Bem!
          </h2>

          <div className="marketing-text">
            <p>
              <strong>Crie sua conta e comece sua jornada!</strong>
            </p>

            <p>
              Desenvolva suas habilidades para morar sozinho de forma
              organizada e divertida. Acompanhe seu progresso e conquiste
              sua independência!
            </p>

            <p>
              <em>Cadastre-se gratuitamente e transforme sua experiência de morar sozinho.</em>
            </p>
          </div>

          <div className="illustration">
            <div className="person person-left">
              <div className="person-head"></div>
              <div className="person-body"></div>
            </div>

            <div className="house-animation">
              <div className="house-center">🏠</div>
              <div className="skill-icon">🍳</div>
              <div className="skill-icon">🔧</div>
              <div className="skill-icon">👕</div>
              <div className="skill-icon">💰</div>
              <div className="skill-icon">❤️</div>
              <div className="skill-icon">🏠</div>
            </div>

            <div className="person person-right">
              <div className="person-head"></div>
              <div className="person-body"></div>
            </div>
          </div>
        </div>
      </div>

      <ModalConfirmacao
        visible={modalVisivel}
        login={usuarioLogin}
        onConfirm={confirmarEmail}
        onClose={() => setModalVisivel(false)}
      />
    </div>
  );
}
