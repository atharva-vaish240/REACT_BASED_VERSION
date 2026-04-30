package com.urbanbite;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * Main entry point for the UrbanBite Spring Boot application.
 */
@SpringBootApplication
@EnableScheduling
public class UrbanBiteApplication {

    public static void main(String[] args) {
        SpringApplication.run(UrbanBiteApplication.class, args);
    }
}
