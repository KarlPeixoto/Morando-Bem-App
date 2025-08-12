import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useColorScheme } from "react-native"

export default function RootLayout() {
  const colorScheme = useColorScheme()

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colorScheme === "dark" ? "#0f172a" : "#f8fafc" },
        }}
      />
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </>
  )
}
