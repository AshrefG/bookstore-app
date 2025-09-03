# Build stage
FROM maven:3.8.6-openjdk-11 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src /app/src
RUN mvn package -DskipTests

# Run stage
FROM openjdk:11-jre-slim
WORKDIR /app
COPY --from=build /app/target/bookstore-backend-*.jar /app/bookstore-backend.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "bookstore-backend.jar", "--spring.profiles.active=prod"]