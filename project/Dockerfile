FROM maven:3.9-eclipse-temurin-21 AS build

WORKDIR /app
COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre

WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

# Com flags para limpar warnings
ENTRYPOINT ["java", \
    "-XX:+IgnoreUnrecognizedVMOptions", \
    "--add-opens=java.base/java.lang=ALL-UNNAMED", \
    "--add-opens=java.base/sun.misc=ALL-UNNAMED", \
    "-jar", "app.jar"]