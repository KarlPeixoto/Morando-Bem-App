import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useColorScheme,
} from "react-native"
import api from "../services/api"
import ModalConfirmacao from "../components/ModalConfirmacao"
import { Image } from "expo-image"
import { useRouter } from "expo-router"
import ThemeToggle from "../components/ThemeToggle"

export default function Cadastro() {
  const [login, setLogin] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [modalVisivel, setModalVisivel] = useState(false)
  const [usuarioLogin, setUsuarioLogin] = useState("")
  const router = useRouter()
  const colorScheme = useColorScheme()
  const isDark = colorScheme === "dark"

  const styles = createStyles(isDark)

  const handleCadastro = async () => {
    if (!login.trim() || !email.trim() || !senha.trim()) {
      Alert.alert("Erro", "Todos os campos são obrigatórios")
      return
    }

    setLoading(true)

    try {
      const res = await api.post("/usuarios/cadastrar", { login, email, senha })
      setUsuarioLogin(res.data.login)
      setModalVisivel(true)
      // Limpar campos após sucesso
      setLogin("")
      setEmail("")
      setSenha("")
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "Erro ao cadastrar usuário"
      Alert.alert("Erro", errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const confirmarEmail = async (codigoConfirmacao: string) => {
    try {
      await api.post(`/usuarios/confirmar-email?login=${usuarioLogin}`, {
        codigo: codigoConfirmacao,
      })
      Alert.alert("Sucesso", "Email confirmado com sucesso!")
      setModalVisivel(false)
      router.replace("/login")
    } catch (error) {
      Alert.alert("Erro", "Código inválido ou erro na confirmação")
    }
  }

  const navigateToLogin = () => {
    router.push("/login")
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.themeToggleContainer}>
          <ThemeToggle />
        </View>

        <Text style={styles.title}>Cadastro</Text>
        <Text style={styles.subtitle}>
          Já tem uma conta?{" "}
          <TouchableOpacity onPress={navigateToLogin}>
            <Text style={styles.link}>Faça login</Text>
          </TouchableOpacity>
        </Text>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Login</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={login}
                onChangeText={setLogin}
                placeholder="Digite seu login"
                placeholderTextColor={isDark ? "#94a3b8" : "#64748b"}
                editable={!loading}
                autoCapitalize="none"
              />
              <Text style={styles.inputIcon}>👤</Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Digite seu email"
                placeholderTextColor={isDark ? "#94a3b8" : "#64748b"}
                keyboardType="email-address"
                editable={!loading}
                autoCapitalize="none"
              />
              <Text style={styles.inputIcon}>📧</Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Senha</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={senha}
                onChangeText={setSenha}
                placeholder="Digite sua senha"
                placeholderTextColor={isDark ? "#94a3b8" : "#64748b"}
                secureTextEntry={!showPassword}
                editable={!loading}
              />
              <TouchableOpacity
                style={styles.passwordToggle}
                onPress={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                <Text style={styles.inputIconP}>{showPassword ? "👁️" : "👁️‍🗨️"}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleCadastro}
            disabled={loading}
          >
            <Text style={styles.buttonText}>{loading ? "Cadastrando..." : "Cadastrar"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.illustration}>
          <Image source={require("../assets/images/Casa animada com sorriso amigável.png")} style={styles.logo1} contentFit="contain" />
          <Text style={styles.welcomeText}>Junte-se ao Morando Bem!</Text>
          <Text style={styles.descriptionText}>
            Desenvolva suas habilidades para morar sozinho de forma organizada e divertida.
          </Text>
        </View>
      </ScrollView>

      <ModalConfirmacao
        visible={modalVisivel}
        login={usuarioLogin}
        onConfirm={confirmarEmail}
        onClose={() => setModalVisivel(false)}
      />
    </KeyboardAvoidingView>
  )
}

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? "#0f172a" : "#f8fafc",
    },
    scrollContainer: {
      flexGrow: 1,
      padding: 24,
      justifyContent: "center",
    },
    logoContainer: {
      alignItems: "center",
      marginBottom: 32,
    },
    logo: {
      fontSize: 48,
      color: isDark ? "#f1f5f9" : "#111827",
    },
    logo1: {
      width: 80,
      height: 80,
      borderRadius: 40,
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      color: isDark ? "#f1f5f9" : "#111827",
      textAlign: "center",
      marginBottom: 8,
    },
    themeToggleContainer: {
      alignItems: "center",
      marginBottom: 16,
    },
    subtitle: {
      fontSize: 16,
      color: isDark ? "#cbd5e1" : "#64748b",
      textAlign: "center",
      marginBottom: 32,
    },
    link: {
      color: isDark ? "#38bdf8" : "#0ea5e9",
      fontWeight: "500",
    },
    form: {
      gap: 20,
      marginBottom: 32,
    },
    inputGroup: {
      gap: 8,
    },
    label: {
      fontSize: 16,
      fontWeight: "500",
      color: isDark ? "#f1f5f9" : "#111827",
    },
    inputWrapper: {
      position: "relative",
    },
    input: {
      backgroundColor: isDark ? "#1e293b" : "#ffffff",
      borderWidth: 2,
      borderColor: isDark ? "#475569" : "#e2e8f0",
      borderRadius: 8,
      padding: 16,
      paddingRight: 48,
      fontSize: 16,
      color: isDark ? "#f1f5f9" : "#111827",
    },
    inputIcon: {
      position: "absolute",
      right: 16,
      top: 16,
      fontSize: 18,
    },
    inputIconP: {
      position: "absolute",
      right: 2,
      top: 2,
      fontSize: 18,
    },
    passwordToggle: {
      position: "absolute",
      right: 16,
      top: 16,
    },
    button: {
      backgroundColor: isDark ? "#818cf8" : "#6366f1",
      borderRadius: 8,
      padding: 16,
      alignItems: "center",
      marginTop: 16,
    },
    buttonDisabled: {
      backgroundColor: isDark ? "#4b5563" : "#94a3b8",
    },
    buttonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "600",
    },
    illustration: {
      alignItems: "center",
      gap: 16,
    },
    illustrationText: {
      fontSize: 48,
    },
    welcomeText: {
      fontSize: 18,
      fontWeight: "600",
      color: isDark ? "#f1f5f9" : "#111827",
      textAlign: "center",
    },
    descriptionText: {
      fontSize: 14,
      color: isDark ? "#cbd5e1" : "#64748b",
      textAlign: "center",
      lineHeight: 20,
    },
  })
