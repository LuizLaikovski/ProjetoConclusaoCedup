FROM maven:3.9.9-eclipse-temurin-21-alpine AS build
COPY . .
RUN mvn clean install -DskipTests

FROM eclipse-temurin:21-jdk
COPY --from=build /target/*.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]