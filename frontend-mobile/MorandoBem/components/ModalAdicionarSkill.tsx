import { useEffect, useState } from "react"
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  Alert,
  ScrollView,
} from "react-native"
import { Picker } from "@react-native-picker/picker"
import api from "../services/api"

interface Skill {
  id: number
  nome: string
}

interface ModalAdicionarSkillProps {
  visible: boolean
  usuarioId: number | null
  onAdd: () => void
  onClose: () => void
}

export default function ModalAdicionarSkill({ visible, usuarioId, onAdd, onClose }: ModalAdicionarSkillProps) {
  const [skills, setSkills] = useState<Skill[]>([])
  const [skillSelecionada, setSkillSelecionada] = useState("")
  const [skillPersonalizada, setSkillPersonalizada] = useState("")
  const [loading, setLoading] = useState(false)
  const colorScheme = useColorScheme()
  const isDark = colorScheme === "dark"

  const styles = createStyles(isDark)

  useEffect(() => {
    if (visible) {
      carregarSkills()
    }
  }, [visible])

  const carregarSkills = async () => {
    try {
      const res = await api.get("/skills")
      setSkills(res.data)
    } catch (error) {
      Alert.alert("Erro", "Erro ao carregar skills disponíveis")
    }
  }

  const handleAdicionar = async () => {
    if (skillSelecionada === "" && skillPersonalizada.trim() === "") {
      Alert.alert("Erro", "Selecione uma skill ou crie uma personalizada.")
      return
    }

    if (!usuarioId) {
      Alert.alert("Erro", "Usuário não identificado")
      return
    }

    setLoading(true)

    try {
      if (skillPersonalizada.trim() !== "") {
        const res = await api.post("/skills", { nome: skillPersonalizada })
        await associarSkill(res.data.id)
      } else {
        await associarSkill(Number.parseInt(skillSelecionada))
      }
    } catch (error) {
      Alert.alert("Erro", "Erro ao adicionar skill")
    } finally {
      setLoading(false)
    }
  }

  const associarSkill = async (skillId: number) => {
    try {
      await api.post(`/usuario-skills/usuario/${usuarioId}`, {
        skillId,
        level: 1,
      })
      onAdd()
      setSkillSelecionada("")
      setSkillPersonalizada("")
      Alert.alert("Sucesso", "Skill adicionada com sucesso!")
    } catch (error) {
      Alert.alert("Erro", "Erro ao associar skill ao usuário")
    }
  }

  const handleClose = () => {
    setSkillSelecionada("")
    setSkillPersonalizada("")
    onClose()
  }

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.backdrop}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Adicionar Skill</Text>
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            <View style={styles.section}>
              <Text style={styles.label}>Selecione uma skill:</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={skillSelecionada}
                  onValueChange={setSkillSelecionada}
                  style={styles.picker}
                  dropdownIconColor={isDark ? "#94a3b8" : "#64748b"}
                >
                  <Picker.Item label="-- Selecione uma skill --" value="" color={isDark ? "#94a3b8" : "#64748b"} />
                  {skills.map((skill) => (
                    <Picker.Item
                      key={skill.id}
                      label={skill.nome}
                      value={skill.id.toString()}
                      color={isDark ? "#111827" : "#111827"}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OU</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Crie uma skill personalizada:</Text>
              <TextInput
                style={styles.input}
                value={skillPersonalizada}
                onChangeText={setSkillPersonalizada}
                placeholder="Nome da skill personalizada"
                placeholderTextColor={isDark ? "#94a3b8" : "#64748b"}
                editable={!loading}
              />
            </View>
          </ScrollView>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleClose} disabled={loading}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.addButton, loading && styles.addButtonDisabled]}
              onPress={handleAdicionar}
              disabled={loading}
            >
              <Text style={styles.addButtonText}>{loading ? "Adicionando..." : "Adicionar"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      justifyContent: "flex-end",
    },
    modal: {
      backgroundColor: isDark ? "#1f2937" : "#ffffff",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      maxHeight: "80%",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? "#475569" : "#e2e8f0",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: isDark ? "#a5b4fc" : "#6366f1",
    },
    closeButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: isDark ? "rgba(100, 116, 139, 0.2)" : "rgba(100, 116, 139, 0.1)",
      justifyContent: "center",
      alignItems: "center",
    },
    closeButtonText: {
      fontSize: 16,
      color: isDark ? "#94a3b8" : "#64748b",
    },
    content: {
      padding: 20,
    },
    section: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      fontWeight: "600",
      color: isDark ? "#f1f5f9" : "#111827",
      marginBottom: 8,
    },
    pickerContainer: {
      backgroundColor: isDark ? "#374151" : "#f8fafc",
      borderWidth: 2,
      borderColor: isDark ? "#475569" : "#e2e8f0",
      borderRadius: 12,
      overflow: "hidden",
    },
    picker: {
      color: isDark ? "#f1f5f9" : "#111827",
    },
    divider: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 20,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: isDark ? "#475569" : "#e2e8f0",
    },
    dividerText: {
      marginHorizontal: 16,
      fontSize: 14,
      color: isDark ? "#94a3b8" : "#64748b",
      fontWeight: "500",
    },
    input: {
      backgroundColor: isDark ? "#374151" : "#ffffff",
      borderWidth: 2,
      borderColor: isDark ? "#475569" : "#e2e8f0",
      borderRadius: 12,
      padding: 16,
      fontSize: 16,
      color: isDark ? "#f1f5f9" : "#111827",
    },
    actions: {
      flexDirection: "row",
      padding: 20,
      gap: 12,
      borderTopWidth: 1,
      borderTopColor: isDark ? "#475569" : "#e2e8f0",
    },
    cancelButton: {
      flex: 1,
      backgroundColor: "transparent",
      borderWidth: 2,
      borderColor: isDark ? "#4b5563" : "#e2e8f0",
      borderRadius: 12,
      padding: 16,
      alignItems: "center",
    },
    cancelButtonText: {
      fontSize: 16,
      fontWeight: "600",
      color: isDark ? "#94a3b8" : "#64748b",
    },
    addButton: {
      flex: 1,
      backgroundColor: isDark ? "#818cf8" : "#6366f1",
      borderRadius: 12,
      padding: 16,
      alignItems: "center",
    },
    addButtonDisabled: {
      backgroundColor: isDark ? "#4b5563" : "#d1d5db",
    },
    addButtonText: {
      fontSize: 16,
      fontWeight: "600",
      color: "white",
    },
  })
