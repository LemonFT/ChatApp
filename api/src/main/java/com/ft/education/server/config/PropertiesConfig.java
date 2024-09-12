package com.ft.education.server.config;

import org.springframework.context.annotation.Configuration;

import io.github.cdimascio.dotenv.Dotenv;
import jakarta.annotation.PostConstruct;

/**
 * @author lemonftdev
 */

@Configuration
public class PropertiesConfig {
    @PostConstruct
    public static void loadEnvVariables() {
        Dotenv dotenv = Dotenv.configure().load();
        String passwordMySqlDatabase = dotenv.get("PASSWORD_MYSQL_DATABASE");
        String nameMySqlDatabase = dotenv.get("NAME_MYSQL_DATABASE");
        String port = dotenv.get("APP_PORT");
        String emailHost = dotenv.get("EMAIL_HOST");
        String emailPort = dotenv.get("EMAIL_PORT");
        String emailAppName = dotenv.get("EMAIL_APP_NAME");
        String emailAppPassword = dotenv.get("EMAIL_APP_PASSWORD");
        System.setProperty("emailHost", emailHost);
        System.setProperty("emailPort", emailPort);
        System.setProperty("emailAppName", emailAppName);
        System.setProperty("emailAppPassword", emailAppPassword);
        System.setProperty("portApp", port);
        System.setProperty("passwordMysqlDatabase", passwordMySqlDatabase);
        System.setProperty("nameMySqlDatabase", nameMySqlDatabase);
    }
}
