import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { handleApiError, showNotification } from "../../services/errorHandler";
import ModalAdicionarSkill from "../../components/adicionarSkill/ModalAdicionarSkill";
import ModalAtualizarLevel from "../../components/atualizarLevel/ModalAtualizarLevel";
import "./Home.css";

export default function Home() {
  const [usuarioId, setUsuarioId] = useState(null);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalAdicionarVisivel, setModalAdicionarVisivel] = useState(false);
  const [modalAtualizarVisivel, setModalAtualizarVisivel] = useState(false);
  const [associacaoSelecionada, setAssociacaoSelecionada] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const login = sessionStorage.getItem("login");
    if (!login) {
      navigate("/login");
      return;
    }

    carregarDadosUsuario(login);
  }, [navigate]);

  async function carregarDadosUsuario(login) {
    try {
      const res = await api.get(`/usuarios/${login}`);
      setUsuarioId(res.data.id);
      await carregarSkills(res.data.id);
    } catch (error) {
      const errorMessage = handleApiError(error, navigate);
      showNotification(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  async function carregarSkills(idUsuario) {
    try {
      const res = await api.get(`/usuario-skills/usuario/${idUsuario}`);
      setSkills(res.data);
    } catch (error) {
      const errorMessage = handleApiError(error, navigate);
      showNotification(errorMessage);
    }
  }

  function abrirModalAtualizar(associacao) {
    setAssociacaoSelecionada(associacao);
    setModalAtualizarVisivel(true);
  }

  async function excluirSkill(associacaoId) {
    if (!window.confirm("Deseja mesmo excluir essa skill?")) return;

    try {
      await api.delete(`/usuario-skills/${associacaoId}`);
      await carregarSkills(usuarioId);
      showNotification("Skill excluída com sucesso!", "success");
    } catch (error) {
      const errorMessage = handleApiError(error, navigate);
      showNotification(errorMessage);
    }
  }

  function handleLogout() {
    sessionStorage.clear();
    navigate("/login");
  }

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="home-container">
      <div className="header">
        <h1>Minhas Skills</h1>
        <button onClick={handleLogout} className="logout-btn">
          Sair
        </button>
      </div>
      
      <button onClick={() => setModalAdicionarVisivel(true)}>
        Adicionar Skill
      </button>

      <ul className="skill-list">
        {skills.map((assoc) => (
          <li key={assoc.id}>
            <span>{assoc.skill.nome} (Nível: {assoc.level})</span>
            <div>
              <button
                className="update-btn"
                onClick={() => abrirModalAtualizar(assoc)}
              >
                Atualizar Nível
              </button>
              <button
                className="delete-btn"
                onClick={() => excluirSkill(assoc.id)}
              >
                Deletar
              </button>
            </div>
          </li>
        ))}
      </ul>

      <ModalAdicionarSkill
        visible={modalAdicionarVisivel}
        usuarioId={usuarioId}
        onAdd={() => {
          carregarSkills(usuarioId);
          setModalAdicionarVisivel(false);
        }}
        onClose={() => setModalAdicionarVisivel(false)}
        api={api}
      />

      <ModalAtualizarLevel
        visible={modalAtualizarVisivel}
        associacaoId={associacaoSelecionada?.id}
        levelAtual={associacaoSelecionada?.level}
        onUpdate={() => {
          carregarSkills(usuarioId);
          setModalAtualizarVisivel(false);
        }}
        onClose={() => setModalAtualizarVisivel(false)}
        api={api}
      />
    </div>
  );
}
