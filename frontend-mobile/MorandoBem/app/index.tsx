import { useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import { useRouter } from "expo-router"

export default function Index() {
  const router = useRouter()

  useEffect(() => {
    // Verificar se o usuário já está logado
    const checkAuth = () => {
      const token = global.accessToken
      const userLogin = global.userLogin

      if (token && userLogin) {
        // Usuário já está logado, redirecionar para home
        router.replace("/home")
      } else {
        // Usuário não está logado, redirecionar para login
        router.replace("/login")
      }
    }

    // Pequeno delay para evitar flash
    const timer = setTimeout(checkAuth, 100)
    return () => clearTimeout(timer)
  }, [router])

  // Tela de loading enquanto verifica autenticação
  return (
    <View style={styles.container}>
      <Text style={styles.loadingText}>🏠</Text>
      <Text style={styles.appName}>Morando Bem</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },
  loadingText: {
    fontSize: 48,
    marginBottom: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6366f1",
  },
})
