package com.ft.education.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

import com.ft.education.server.config.PropertiesConfig;

/**
 * @author lemonftdev
 */
@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class ApiApplication {
	public static void main(String[] args) {
		PropertiesConfig.loadEnvVariables();
		SpringApplication.run(ApiApplication.class, args);
	}

}
