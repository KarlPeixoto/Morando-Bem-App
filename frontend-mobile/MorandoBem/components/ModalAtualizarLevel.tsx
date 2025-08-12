import { useState, useEffect } from "react"
import { Modal, View, Text, TouchableOpacity, StyleSheet, useColorScheme, Alert } from "react-native"
import Slider from "@react-native-community/slider"
import api from "../services/api"

interface ModalAtualizarLevelProps {
  visible: boolean
  associacaoId: number | undefined
  levelAtual: number | undefined
  onUpdate: () => void
  onClose: () => void
}

export default function ModalAtualizarLevel({
  visible,
  associacaoId,
  levelAtual,
  onUpdate,
  onClose,
}: ModalAtualizarLevelProps) {
  const [level, setLevel] = useState(levelAtual || 1)
  const [loading, setLoading] = useState(false)
  const colorScheme = useColorScheme()
  const isDark = colorScheme === "dark"

  const styles = createStyles(isDark)

  useEffect(() => {
    setLevel(levelAtual || 1)
  }, [levelAtual])

  const handleAtualizar = async () => {
    if (level < 1 || level > 10) {
      Alert.alert("Erro", "Nível deve estar entre 1 e 10.")
      return
    }

    if (!associacaoId) {
      Alert.alert("Erro", "Associação não identificada")
      return
    }

    setLoading(true)

    try {
      await api.put(`/usuario-skills/${associacaoId}?level=${level}`)
      onUpdate()
      Alert.alert("Sucesso", "Nível atualizado com sucesso!")
    } catch (error) {
      Alert.alert("Erro", "Erro ao atualizar nível.")
    } finally {
      setLoading(false)
    }
  }

  const getLevelText = (level: number) => {
    if (level <= 2) return "Iniciante"
    if (level <= 4) return "Básico"
    if (level <= 7) return "Intermediário"
    return "Avançado"
  }

  const getLevelColor = (level: number) => {
    if (level <= 2) return isDark ? "#f87171" : "#dc2626"
    if (level <= 4) return isDark ? "#fbbf24" : "#d97706"
    if (level <= 7) return isDark ? "#60a5fa" : "#2563eb"
    return isDark ? "#4ade80" : "#16a34a"
  }

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.backdrop}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Atualizar Nível da Skill</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <View style={styles.levelContainer}>
              <Text style={styles.levelLabel}>Nível: {level}</Text>
              <Text style={[styles.levelBadge, { color: getLevelColor(level) }]}>{getLevelText(level)}</Text>
            </View>

            <View style={styles.sliderContainer}>
              <Slider
                style={styles.slider}
                minimumValue={1}
                maximumValue={10}
                step={1}
                value={level}
                onValueChange={setLevel}
                minimumTrackTintColor={isDark ? "#818cf8" : "#6366f1"}
                maximumTrackTintColor={isDark ? "#475569" : "#e2e8f0"}
                thumbTintColor={isDark ? "#a5b4fc" : "#6366f1"}
              />
            </View>

            <View style={styles.markers}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <Text key={num} style={[styles.marker, level === num && styles.markerActive]}>
                  {num}
                </Text>
              ))}
            </View>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose} disabled={loading}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.updateButton, loading && styles.updateButtonDisabled]}
              onPress={handleAtualizar}
              disabled={loading}
            >
              <Text style={styles.updateButtonText}>{loading ? "Atualizando..." : "Atualizar"}</Text>
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
      maxHeight: "70%",
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
    levelContainer: {
      alignItems: "center",
      marginBottom: 32,
    },
    levelLabel: {
      fontSize: 24,
      fontWeight: "bold",
      color: isDark ? "#f1f5f9" : "#111827",
      marginBottom: 8,
    },
    levelBadge: {
      fontSize: 16,
      fontWeight: "600",
    },
    sliderContainer: {
      marginBottom: 20,
    },
    slider: {
      width: "100%",
      height: 40,
    },
    markers: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 8,
    },
    marker: {
      fontSize: 12,
      color: isDark ? "#94a3b8" : "#64748b",
      fontWeight: "500",
      textAlign: "center",
      minWidth: 20,
    },
    markerActive: {
      color: isDark ? "#a5b4fc" : "#6366f1",
      fontWeight: "bold",
      transform: [{ scale: 1.2 }],
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
    updateButton: {
      flex: 1,
      backgroundColor: isDark ? "#818cf8" : "#6366f1",
      borderRadius: 12,
      padding: 16,
      alignItems: "center",
    },
    updateButtonDisabled: {
      backgroundColor: isDark ? "#4b5563" : "#d1d5db",
    },
    updateButtonText: {
      fontSize: 16,
      fontWeight: "600",
      color: "white",
    },
  })
