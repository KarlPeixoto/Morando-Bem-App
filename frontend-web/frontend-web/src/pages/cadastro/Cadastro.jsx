import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import ModalConfirmacao from "../../components/modalConfirmacao/ModalConfirmacao";
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
    <div className="cadastro-container">
      <h1>Cadastro</h1>
      {error && <div className="error-message">{error}</div>}
      <input
        placeholder="Login"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        disabled={loading}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        disabled={loading}
      />
      <button onClick={handleCadastro} disabled={loading}>
        {loading ? "Cadastrando..." : "Cadastrar"}
      </button>

      <ModalConfirmacao
        visible={modalVisivel}
        login={usuarioLogin}
        onConfirm={confirmarEmail}
        onClose={() => setModalVisivel(false)}
      />
    </div>
  );
}
