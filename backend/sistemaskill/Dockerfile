# Build stage
FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Runtime stage
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

# Instalar curl para health checks (opcional)
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Porta dinâmica do Render
EXPOSE $PORT

# Comando para executar a aplicação
CMD ["java", "-jar", "-Dserver.port=${PORT:-8080}", "app.jar"]
