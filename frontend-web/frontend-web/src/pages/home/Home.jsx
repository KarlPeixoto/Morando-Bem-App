import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../api/api"
import { handleApiError, showNotification } from "../../services/errorHandler"
import ModalAdicionarSkill from "../../components/adicionarSkill/ModalAdicionarSkill"
import ModalAtualizarLevel from "../../components/atualizarLevel/ModalAtualizarLevel"
import ThemeToggle from "../../components/tema/ThemeToggle"
import "./Home.css"

export default function Home() {
  const [usuarioId, setUsuarioId] = useState(null)
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalAdicionarVisivel, setModalAdicionarVisivel] = useState(false)
  const [modalAtualizarVisivel, setModalAtualizarVisivel] = useState(false)
  const [associacaoSelecionada, setAssociacaoSelecionada] = useState(null)
  const [userName, setUserName] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const login = sessionStorage.getItem("login")
    if (!login) {
      navigate("/login")
      return
    }
    carregarDadosUsuario(login)
  }, [navigate])

  async function carregarDadosUsuario(login) {
    try {
      const res = await api.get(`/usuarios/${login}`)
      setUsuarioId(res.data.id)
      setUserName(res.data.nome || login)
      await carregarSkills(res.data.id)
    } catch (error) {
      const errorMessage = handleApiError(error, navigate)
      showNotification(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  async function carregarSkills(idUsuario) {
    try {
      const res = await api.get(`/usuario-skills/usuario/${idUsuario}`)
      setSkills(res.data)
    } catch (error) {
      const errorMessage = handleApiError(error, navigate)
      showNotification(errorMessage)
    }
  }

  function abrirModalAtualizar(associacao) {
    setAssociacaoSelecionada(associacao)
    setModalAtualizarVisivel(true)
  }

  async function excluirSkill(associacaoId) {
    if (!window.confirm("Deseja mesmo excluir essa skill?")) return
    try {
      await api.delete(`/usuario-skills/${associacaoId}`)
      await carregarSkills(usuarioId)
      showNotification("Skill excluída com sucesso!", "success")
    } catch (error) {
      const errorMessage = handleApiError(error, navigate)
      showNotification(errorMessage)
    }
  }

  function handleLogout() {
    sessionStorage.clear()
    navigate("/login")
  }

  function getLevelClass(level) {
    if (level <= 2) return "level-beginner"
    if (level <= 4) return "level-basic"
    if (level <= 7) return "level-intermediate"
    return "level-advanced"
  }

  function getLevelText(level) {
    if (level <= 2) return "Iniciante"
    if (level <= 4) return "Básico"
    if (level <= 7) return "Intermediário"
    return "Avançado"
  }

  function getSkillIcon(skillName) {
    const normalizedName = skillName.toLowerCase()
    switch (normalizedName) {
      case "cozinhar básico":
        return "🍳"
      case "limpeza doméstica":
        return "🧹"
      case "gestão financeira":
        return "💲"
      case "manutenção básica":
        return "🛠️"
      case "organização pessoal":
        return "🗂️"
      case "compras inteligentes":
        return "🛒"
      case "segurança doméstica":
        return "🔐"
      case "decoração":
        return "🖼️"
      case "planejamento de refeições":
        return "🍽️"
      case "economia de energia":
        return "⚡"
      case "cuidados com roupas":
        return "👕"
      case "gestão de resíduos":
        return "🗑️"
      case "primeiros socorros":
        return "🤕"
      case "relacionamento com vizinhos":
        return "🤝"
      case "autocuidado":
        return "❤️"
      case "tecnologia doméstica":
        return "💻"
      case "culinária avançada":
        return "🍣"
      case "jardinagem básica":
        return "🌱"
      case "economia de água":
        return "🚿"
      case "planejamento de viagens":
        return "🛫"
      case "organização financeira avançada":
        return "💰"
      
      default:
        return "💡" 
    }
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="spinner"></div>
          <p>Carregando suas skills...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="home-container">
      <div className="header">
        <div className="header-content">
          <div className="user-info">
            <div className="avatar">
              <span className="avatar-icon">👤</span>
            </div>
            <div className="user-details">
              <h1>Olá, {userName}!</h1>
              <p>Gerencie suas habilidades técnicas</p>
            </div>
          </div>
          <div className="header-actions">
            <ThemeToggle />
            <button className="logout-btn" onClick={handleLogout}>
              <span className="logout-icon">🚪</span>
              Sair
            </button>
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="stats-section">
          <div className="stats">
            <div className="stat-item">
              <div className="stat-number">{skills.length}</div>
              <div className="stat-label">Skills Cadastradas</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{skills.filter((s) => s.level >= 8).length}</div>
              <div className="stat-label">Nível Avançado</div>
            </div>
          </div>
          <button className="add-skill-btn" onClick={() => setModalAdicionarVisivel(true)}>
            <span className="add-icon">➕</span>
            Adicionar Skill
          </button>
        </div>

        {skills.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">💻</div>
            <h3>Nenhuma skill cadastrada</h3>
            <p>Clique em "Adicionar Skill" para começar a adicionar habilidades ao seu perfil.</p>
            <button className="add-first-skill-btn" onClick={() => setModalAdicionarVisivel(true)}>
              <span className="add-icon">➕</span>
              Adicionar Primeira Skill
            </button>
          </div>
        ) : (
          <div className="skills-grid">
            {skills.map((assoc) => (
              <div key={assoc.id} className="skill-card">
                <div className="skill-header">
                  <div className="skill-info">
                    <div className="skill-icon">{getSkillIcon(assoc.skill.nome)}</div>
                    <h3 className="skill-name">{assoc.skill.nome}</h3>
                  </div>
                </div>
                <div className="skill-content">
                  <div className="level-info">
                    <div className="level-display">
                      <span className="star-icon">⭐</span>
                      <span className="level-text">Nível {assoc.level}/10</span>
                    </div>
                    <span className={`level-badge ${getLevelClass(assoc.level)}`}>{getLevelText(assoc.level)}</span>
                  </div>

                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${(assoc.level / 10) * 100}%` }}></div>
                  </div>

                  <div className="skill-actions">
                    <button className="update-btn" onClick={() => abrirModalAtualizar(assoc)}>
                      <span className="edit-icon">✏️</span>
                      Atualizar
                    </button>
                    <button className="delete-btn" onClick={() => excluirSkill(assoc.id)}>
                      <span className="delete-icon">🗑️</span>
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ModalAdicionarSkill
        visible={modalAdicionarVisivel}
        usuarioId={usuarioId}
        onAdd={() => {
          carregarSkills(usuarioId)
          setModalAdicionarVisivel(false)
        }}
        onClose={() => setModalAdicionarVisivel(false)}
        api={api}
      />

      <ModalAtualizarLevel
        visible={modalAtualizarVisivel}
        associacaoId={associacaoSelecionada?.id}
        levelAtual={associacaoSelecionada?.level}
        onUpdate={() => {
          carregarSkills(usuarioId)
          setModalAtualizarVisivel(false)
        }}
        onClose={() => setModalAtualizarVisivel(false)}
        api={api}
      />
    </div>
  )
}
