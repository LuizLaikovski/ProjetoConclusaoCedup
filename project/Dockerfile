FROM ubuntu:22.04 AS build

RUN apt-get update && \
    apt-get install -y openjdk-21-jdk maven && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:21-jre-slim

WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]