import { useState, useRef, useEffect } from "react"
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, useColorScheme, Alert } from "react-native"

interface ModalConfirmacaoProps {
  visible: boolean
  login: string
  onConfirm: (codigo: string) => Promise<void>
  onClose: () => void
}

export default function ModalConfirmacao({ visible, login, onConfirm, onClose }: ModalConfirmacaoProps) {
  const [codigo, setCodigo] = useState(["", "", "", "", "", ""])
  const [loading, setLoading] = useState(false)
  const inputRefs = useRef<TextInput[]>([])
  const colorScheme = useColorScheme()
  const isDark = colorScheme === "dark"

  const styles = createStyles(isDark)

  useEffect(() => {
    if (visible) {
      setCodigo(["", "", "", "", "", ""])
    }
  }, [visible])

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return

    const newCodigo = [...codigo]
    newCodigo[index] = value.slice(-1)
    setCodigo(newCodigo)

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleConfirm = async () => {
    const codigoCompleto = codigo.join("")

    if (codigoCompleto.length !== 6) {
      Alert.alert("Erro", "Por favor, insira o código de confirmação completo.")
      return
    }

    setLoading(true)

    try {
      await onConfirm(codigoCompleto)
      setCodigo(["", "", "", "", "", ""])
    } catch (error) {
      // Erro será tratado pelo componente pai
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setCodigo(["", "", "", "", "", ""])
    onClose()
  }

  const isCodeComplete = codigo.every((digit) => digit !== "")

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.modal}>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.icon}>📧</Text>
            <Text style={styles.title}>Confirmação de Email</Text>
            <Text style={styles.description}>
              Enviamos um código de 6 dígitos para o email do usuário <Text style={styles.loginText}>{login}</Text>.
              Digite o código abaixo:
            </Text>
          </View>

          <View style={styles.codigoContainer}>
            <Text style={styles.codigoLabel}>Digite o código de confirmação:</Text>

            <View style={styles.codigoInputs}>
              {codigo.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(el) => {
                    if (el) inputRefs.current[index] = el
                  }}
                  style={[styles.codigoInput, digit ? styles.codigoInputFilled : {}]}
                  value={digit}
                  onChangeText={(value) => handleInputChange(index, value)}
                  keyboardType="numeric"
                  maxLength={1}
                  editable={!loading}
                  textAlign="center"
                />
              ))}
            </View>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleClose} disabled={loading}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.confirmButton, (!isCodeComplete || loading) && styles.confirmButtonDisabled]}
              onPress={handleConfirm}
              disabled={!isCodeComplete || loading}
            >
              <Text style={styles.confirmButtonText}>{loading ? "⏳ Confirmando..." : "✅ Confirmar"}</Text>
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
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    modal: {
      backgroundColor: isDark ? "#1f2937" : "#ffffff",
      borderRadius: 20,
      padding: 24,
      width: "100%",
      maxWidth: 400,
      position: "relative",
    },
    closeButton: {
      position: "absolute",
      top: 16,
      right: 16,
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: isDark ? "rgba(100, 116, 139, 0.2)" : "rgba(100, 116, 139, 0.1)",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1,
    },
    closeButtonText: {
      fontSize: 16,
      color: isDark ? "#94a3b8" : "#64748b",
    },
    header: {
      alignItems: "center",
      marginBottom: 24,
    },
    icon: {
      fontSize: 48,
      marginBottom: 16,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: isDark ? "#a5b4fc" : "#6366f1",
      marginBottom: 12,
      textAlign: "center",
    },
    description: {
      fontSize: 14,
      color: isDark ? "#94a3b8" : "#64748b",
      textAlign: "center",
      lineHeight: 20,
    },
    loginText: {
      color: isDark ? "#a5b4fc" : "#6366f1",
      fontWeight: "600",
    },
    codigoContainer: {
      marginBottom: 24,
    },
    codigoLabel: {
      fontSize: 16,
      fontWeight: "600",
      color: isDark ? "#f3f4f6" : "#374151",
      textAlign: "center",
      marginBottom: 16,
    },
    codigoInputs: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 8,
    },
    codigoInput: {
      width: 48,
      height: 48,
      borderWidth: 2,
      borderColor: isDark ? "#4b5563" : "#e2e8f0",
      borderRadius: 12,
      fontSize: 18,
      fontWeight: "bold",
      color: isDark ? "#f9fafb" : "#111827",
      backgroundColor: isDark ? "#374151" : "#ffffff",
    },
    codigoInputFilled: {
      borderColor: isDark ? "#a5b4fc" : "#6366f1",
      backgroundColor: isDark ? "rgba(165, 180, 252, 0.1)" : "rgba(99, 102, 241, 0.05)",
    },
    actions: {
      flexDirection: "row",
      gap: 12,
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
    confirmButton: {
      flex: 1,
      backgroundColor: isDark ? "#a5b4fc" : "#6366f1",
      borderRadius: 12,
      padding: 16,
      alignItems: "center",
    },
    confirmButtonDisabled: {
      backgroundColor: isDark ? "#4b5563" : "#d1d5db",
    },
    confirmButtonText: {
      fontSize: 16,
      fontWeight: "600",
      color: isDark ? "#111827" : "#ffffff",
    },
  })
