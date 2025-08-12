import { useState } from "react"
import { View, TouchableOpacity, Text, StyleSheet, useColorScheme, Modal, Pressable, Appearance } from "react-native"

type ThemeMode = "light" | "dark" | "system"

export default function ThemeToggle() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState<ThemeMode>("system")
  const systemColorScheme = useColorScheme()

  // Determina o tema atual baseado na seleção do usuário
  const currentTheme = selectedTheme === "system" ? systemColorScheme : selectedTheme
  const isDark = currentTheme === "dark"

  const styles = createStyles(isDark)

  const handleThemeChange = (theme: ThemeMode) => {
    setSelectedTheme(theme)

    // Força a mudança do tema do sistema se necessário
    if (theme !== "system") {
      Appearance.setColorScheme(theme)
    } else {
      Appearance.setColorScheme(null) // Volta para o tema do sistema
    }

    setIsOpen(false)
  }

  const getThemeIcon = () => {
    switch (selectedTheme) {
      case "light":
        return "☀️"
      case "dark":
        return "🌙"
      case "system":
        return isDark ? "🌙" : "☀️"
      default:
        return "☀️"
    }
  }

  const getThemeLabel = (theme: ThemeMode) => {
    switch (theme) {
      case "light":
        return "Claro"
      case "dark":
        return "Escuro"
      case "system":
        return "Sistema"
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.toggleButton} onPress={() => setIsOpen(!isOpen)}>
        <Text style={styles.icon}>{getThemeIcon()}</Text>
      </TouchableOpacity>

      <Modal visible={isOpen} transparent animationType="fade">
        <Pressable style={styles.backdrop} onPress={() => setIsOpen(false)}>
          <View style={styles.dropdown}>
            {(["light", "dark", "system"] as ThemeMode[]).map((theme) => (
              <TouchableOpacity
                key={theme}
                style={[styles.option, selectedTheme === theme && styles.selectedOption]}
                onPress={() => handleThemeChange(theme)}
              >
                <Text style={styles.optionIcon}>{theme === "light" ? "☀️" : theme === "dark" ? "🌙" : "💻"}</Text>
                <Text style={[styles.optionText, selectedTheme === theme && styles.selectedOptionText]}>
                  {getThemeLabel(theme)}
                </Text>
                {selectedTheme === theme && <Text style={styles.checkIcon}>✓</Text>}
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  )
}

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      position: "relative",
    },
    toggleButton: {
      width: 40,
      height: 40,
      borderRadius: 8,
      backgroundColor: isDark ? "#374151" : "#f1f5f9",
      borderWidth: 1,
      borderColor: isDark ? "#475569" : "#e2e8f0",
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    icon: {
      fontSize: 18,
    },
    backdrop: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    dropdown: {
      backgroundColor: isDark ? "#1e293b" : "#ffffff",
      borderRadius: 12,
      padding: 8,
      minWidth: 160,
      borderWidth: 1,
      borderColor: isDark ? "#475569" : "#e2e8f0",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 8,
    },
    option: {
      flexDirection: "row",
      alignItems: "center",
      padding: 12,
      borderRadius: 8,
      gap: 12,
      minHeight: 44,
    },
    selectedOption: {
      backgroundColor: isDark ? "#374151" : "#f1f5f9",
    },
    optionIcon: {
      fontSize: 16,
      width: 20,
      textAlign: "center",
    },
    optionText: {
      fontSize: 14,
      color: isDark ? "#d1d5db" : "#374151",
      flex: 1,
    },
    selectedOptionText: {
      color: isDark ? "#f1f5f9" : "#111827",
      fontWeight: "600",
    },
    checkIcon: {
      fontSize: 14,
      color: isDark ? "#10b981" : "#059669",
      fontWeight: "bold",
    },
  })