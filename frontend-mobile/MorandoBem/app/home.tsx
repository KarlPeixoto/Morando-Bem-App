import { useEffect, useState } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  useColorScheme,
  RefreshControl,
} from "react-native"
import { useRouter } from "expo-router"
import api from "../services/api"
import ModalAdicionarSkill from "../components/ModalAdicionarSkill"
import ModalAtualizarLevel from "../components/ModalAtualizarLevel"
import ThemeToggle from "../components/ThemeToggle"

interface Skill {
  id: number
  nome: string
  descricao?: string
}

interface UsuarioSkill {
  id: number
  level: number
  skill: Skill
}

export default function Home() {
  const [usuarioId, setUsuarioId] = useState<number | null>(null)
  const [skills, setSkills] = useState<UsuarioSkill[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [modalAdicionarVisivel, setModalAdicionarVisivel] = useState(false)
  const [modalAtualizarVisivel, setModalAtualizarVisivel] = useState(false)
  const [associacaoSelecionada, setAssociacaoSelecionada] = useState<UsuarioSkill | null>(null)
  const [userName, setUserName] = useState("")
  const router = useRouter()
  const colorScheme = useColorScheme()
  const isDark = colorScheme === "dark"

  const styles = createStyles(isDark)

  useEffect(() => {
    const login = global.userLogin
    if (!login) {
      router.replace("/login")
      return
    }
    carregarDadosUsuario(login)
  }, [])

  const carregarDadosUsuario = async (login: string) => {
    try {
      const res = await api.get(`/usuarios/${login}`)
      setUsuarioId(res.data.id)
      setUserName(res.data.nome || login)
      await carregarSkills(res.data.id)
    } catch (error: any) {
      Alert.alert("Erro", "Erro ao carregar dados do usuário")
      router.replace("/login")
    } finally {
      setLoading(false)
    }
  }

  const carregarSkills = async (idUsuario: number) => {
    try {
      const res = await api.get(`/usuario-skills/usuario/${idUsuario}`)
      setSkills(res.data)
    } catch (error: any) {
      Alert.alert("Erro", "Erro ao carregar skills")
    }
  }

  const onRefresh = async () => {
    if (!usuarioId) return
    setRefreshing(true)
    await carregarSkills(usuarioId)
    setRefreshing(false)
  }

  const abrirModalAtualizar = (associacao: UsuarioSkill) => {
    setAssociacaoSelecionada(associacao)
    setModalAtualizarVisivel(true)
  }

  const excluirSkill = async (associacaoId: number) => {
    Alert.alert("Confirmar Exclusão", "Deseja mesmo excluir essa skill?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await api.delete(`/usuario-skills/${associacaoId}`)
            if (usuarioId) {
              await carregarSkills(usuarioId)
            }
            Alert.alert("Sucesso", "Skill excluída com sucesso!")
          } catch (error: any) {
            Alert.alert("Erro", "Erro ao excluir skill")
          }
        },
      },
    ])
  }

  const handleLogout = () => {
    Alert.alert("Sair", "Deseja realmente sair da sua conta?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: () => {
          global.accessToken = undefined
          global.refreshToken = undefined
          global.userLogin = undefined
          router.replace("/login")
        },
      },
    ])
  }

  const getLevelClass = (level: number) => {
    if (level <= 2) return "beginner"
    if (level <= 4) return "basic"
    if (level <= 7) return "intermediate"
    return "advanced"
  }

  const getLevelText = (level: number) => {
    if (level <= 2) return "Iniciante"
    if (level <= 4) return "Básico"
    if (level <= 7) return "Intermediário"
    return "Avançado"
  }

  const getLevelColor = (level: number) => {
    const levelClass = getLevelClass(level)
    switch (levelClass) {
      case "beginner":
        return isDark ? "#f87171" : "#dc2626"
      case "basic":
        return isDark ? "#fbbf24" : "#d97706"
      case "intermediate":
        return isDark ? "#60a5fa" : "#2563eb"
      case "advanced":
        return isDark ? "#4ade80" : "#16a34a"
      default:
        return isDark ? "#94a3b8" : "#64748b"
    }
  }

  const getSkillIcon = (skillName: string) => {
    const normalizedName = skillName.toLowerCase()
    const iconMap: { [key: string]: string } = {
      "cozinhar básico": "🍳",
      "limpeza doméstica": "🧹",
      "gestão financeira": "💲",
      "manutenção básica": "🛠️",
      "organização pessoal": "🗂️",
      "compras inteligentes": "🛒",
      "segurança doméstica": "🔐",
      decoração: "🖼️",
      "planejamento de refeições": "🍽️",
      "economia de energia": "⚡",
      "cuidados com roupas": "👕",
      "gestão de resíduos": "🗑️",
      "primeiros socorros": "🤕",
      "relacionamento com vizinhos": "🤝",
      autocuidado: "❤️",
      "tecnologia doméstica": "💻",
      "culinária avançada": "🍣",
      "jardinagem básica": "🌱",
      "economia de água": "🚿",
      "planejamento de viagens": "🛫",
      "organização financeira avançada": "💰",
    }
    return iconMap[normalizedName] || "💡"
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando suas skills...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
          <View>
            <Text style={styles.userName}>Olá, {userName}!</Text>
            <Text style={styles.userSubtitle}>Gerencie suas habilidades</Text>
          </View>
        </View>
        <View style={styles.headerActions}>
          <ThemeToggle />
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>🚪</Text>
        </TouchableOpacity>
      </View>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{skills.length}</Text>
          <Text style={styles.statLabel}>Skills Cadastradas</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{skills.filter((s) => s.level >= 8).length}</Text>
          <Text style={styles.statLabel}>Nível Avançado</Text>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalAdicionarVisivel(true)}>
          <Text style={styles.addButtonText}>➕ Adicionar</Text>
        </TouchableOpacity>
      </View>

      {/* Skills List */}
      <ScrollView
        style={styles.skillsList}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {skills.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>💻</Text>
            <Text style={styles.emptyTitle}>Nenhuma skill cadastrada</Text>
            <Text style={styles.emptyDescription}>Adicione sua primeira skill para começar!</Text>
            <TouchableOpacity style={styles.addFirstButton} onPress={() => setModalAdicionarVisivel(true)}>
              <Text style={styles.addFirstButtonText}>➕ Adicionar Primeira Skill</Text>
            </TouchableOpacity>
          </View>
        ) : (
          skills.map((assoc) => (
            <View key={assoc.id} style={styles.skillCard}>
              <View style={styles.skillHeader}>
                <Text style={styles.skillIcon}>{getSkillIcon(assoc.skill.nome)}</Text>
                <View style={styles.skillInfo}>
                  <Text style={styles.skillName}>{assoc.skill.nome}</Text>
                  {assoc.skill.descricao && <Text style={styles.skillDescription}>{assoc.skill.descricao}</Text>}
                </View>
              </View>

              <View style={styles.levelContainer}>
                <View style={styles.levelInfo}>
                  <Text style={styles.levelText}>⭐ Nível {assoc.level}/10</Text>
                  <Text style={[styles.levelBadge, { color: getLevelColor(assoc.level) }]}>
                    {getLevelText(assoc.level)}
                  </Text>
                </View>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${(assoc.level / 10) * 100}%`,
                        backgroundColor: isDark ? "#818cf8" : "#6366f1",
                      },
                    ]}
                  />
                </View>
              </View>

              <View style={styles.skillActions}>
                <TouchableOpacity style={styles.updateButton} onPress={() => abrirModalAtualizar(assoc)}>
                  <Text style={styles.updateButtonText}>✏️ Atualizar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => excluirSkill(assoc.id)}>
                  <Text style={styles.deleteButtonText}>🗑️ Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Modals */}
      <ModalAdicionarSkill
        visible={modalAdicionarVisivel}
        usuarioId={usuarioId}
        onAdd={() => {
          if (usuarioId) carregarSkills(usuarioId)
          setModalAdicionarVisivel(false)
        }}
        onClose={() => setModalAdicionarVisivel(false)}
      />

      <ModalAtualizarLevel
        visible={modalAtualizarVisivel}
        associacaoId={associacaoSelecionada?.id}
        levelAtual={associacaoSelecionada?.level}
        onUpdate={() => {
          if (usuarioId) carregarSkills(usuarioId)
          setModalAtualizarVisivel(false)
        }}
        onClose={() => setModalAtualizarVisivel(false)}
      />
    </View>
  )
}

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? "#0f172a" : "#f8fafc",
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: isDark ? "#0f172a" : "#f8fafc",
    },
    loadingText: {
      fontSize: 16,
      color: isDark ? "#cbd5e1" : "#64748b",
    },
    header: {
      backgroundColor: isDark ? "#1e293b" : "#ffffff",
      padding: 20,
      paddingTop: 60,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: isDark ? "#475569" : "#e2e8f0",
    },
    userInfo: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    avatar: {
      width: 48,
      height: 48,
      backgroundColor: isDark ? "#374151" : "#f1f5f9",
      borderRadius: 24,
      justifyContent: "center",
      alignItems: "center",
    },
    avatarText: {
      fontSize: 24,
    },
    userName: {
      fontSize: 20,
      fontWeight: "bold",
      color: isDark ? "#f1f5f9" : "#111827",
    },
    userSubtitle: {
      fontSize: 14,
      color: isDark ? "#cbd5e1" : "#64748b",
    },
    logoutButton: {
      padding: 8,
      borderRadius: 8,
      backgroundColor: isDark ? "#374151" : "#f1f5f9",
    },
    logoutText: {
      fontSize: 20,
    },
    statsContainer: {
      flexDirection: "row",
      padding: 20,
      gap: 16,
      alignItems: "center",
    },
    statItem: {
      alignItems: "center",
      flex: 1,
    },
    statNumber: {
      fontSize: 24,
      fontWeight: "bold",
      color: isDark ? "#f1f5f9" : "#111827",
    },
    statLabel: {
      fontSize: 12,
      color: isDark ? "#cbd5e1" : "#64748b",
      textAlign: "center",
    },
    addButton: {
      backgroundColor: isDark ? "#818cf8" : "#6366f1",
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
    },
    addButtonText: {
      color: "white",
      fontWeight: "600",
      fontSize: 14,
    },
    skillsList: {
      flex: 1,
      padding: 20,
    },
    emptyState: {
      alignItems: "center",
      padding: 40,
      backgroundColor: isDark ? "#1e293b" : "#ffffff",
      borderRadius: 12,
      borderWidth: 1,
      borderColor: isDark ? "#475569" : "#e2e8f0",
    },
    emptyIcon: {
      fontSize: 48,
      marginBottom: 16,
    },
    emptyTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: isDark ? "#f1f5f9" : "#111827",
      marginBottom: 8,
    },
    emptyDescription: {
      fontSize: 14,
      color: isDark ? "#cbd5e1" : "#64748b",
      textAlign: "center",
      marginBottom: 24,
    },
    addFirstButton: {
      backgroundColor: isDark ? "#818cf8" : "#6366f1",
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 8,
    },
    addFirstButtonText: {
      color: "white",
      fontWeight: "600",
    },
    skillCard: {
      backgroundColor: isDark ? "#1e293b" : "#ffffff",
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: isDark ? "#475569" : "#e2e8f0",
    },
    skillHeader: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 12,
      gap: 12,
    },
    skillIcon: {
      fontSize: 24,
    },
    skillInfo: {
      flex: 1,
    },
    skillName: {
      fontSize: 16,
      fontWeight: "600",
      color: isDark ? "#f1f5f9" : "#111827",
      marginBottom: 4,
    },
    skillDescription: {
      fontSize: 14,
      color: isDark ? "#cbd5e1" : "#64748b",
      lineHeight: 18,
    },
    levelContainer: {
      marginBottom: 16,
    },
    levelInfo: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    levelText: {
      fontSize: 14,
      color: isDark ? "#cbd5e1" : "#64748b",
    },
    levelBadge: {
      fontSize: 12,
      fontWeight: "600",
    },
    progressBar: {
      height: 6,
      backgroundColor: isDark ? "#374151" : "#f1f5f9",
      borderRadius: 3,
      overflow: "hidden",
    },
    progressFill: {
      height: "100%",
      borderRadius: 3,
    },
    skillActions: {
      flexDirection: "row",
      gap: 8,
    },
    updateButton: {
      flex: 1,
      backgroundColor: isDark ? "rgba(56, 189, 248, 0.1)" : "rgba(14, 165, 233, 0.1)",
      borderWidth: 1,
      borderColor: isDark ? "#38bdf8" : "#0ea5e9",
      borderRadius: 8,
      padding: 12,
      alignItems: "center",
    },
    updateButtonText: {
      color: isDark ? "#38bdf8" : "#0ea5e9",
      fontWeight: "500",
      fontSize: 14,
    },
    deleteButton: {
      flex: 1,
      backgroundColor: isDark ? "rgba(220, 38, 38, 0.1)" : "#fef2f2",
      borderWidth: 1,
      borderColor: "#dc2626",
      borderRadius: 8,
      padding: 12,
      alignItems: "center",
    },
    deleteButtonText: {
      color: "#dc2626",
      fontWeight: "500",
      fontSize: 14,
    },
    headerActions: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
  })
