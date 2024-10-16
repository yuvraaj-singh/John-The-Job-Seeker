FROM openjdk:21

ARG JAR_FILE=target/*.jar

COPY ${JAR_FILE} app.jar

# Expose port 8080
EXPOSE 8000

ENTRYPOINT ["java","-jar","/app.jar"]

