# Build stage
FROM openjdk:17-jdk-alpine as builder

WORKDIR /app

# Install Maven (since we can't use the wrapper without .mvn folder)
RUN apk add --no-cache maven

# Copy only the files needed for dependency resolution first
COPY pom.xml .

# Download dependencies (this layer gets cached unless pom.xml changes)
RUN mvn dependency:go-offline -B

# Copy source code
COPY src ./src

# Build the application (skip tests for Docker build)
RUN mvn clean package -DskipTests

# Runtime stage
FROM openjdk:17-jdk-alpine

WORKDIR /app

# Create necessary directories
RUN mkdir -p ./logs

# Copy the built JAR from the builder stage
COPY --from=builder /app/target/*.jar ./app.jar

# Expose the port your app runs on
EXPOSE $PORT

# Use ENTRYPOINT for better signal handling
ENTRYPOINT ["java", "-jar", "app.jar"]
