package com.urbanbite;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
/**
 * Main entry point for the UrbanBite Spring Boot application.
 */
@SpringBootApplication
public class UrbanBiteApplication extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(UrbanBiteApplication.class);
    }

    public static void main(String[] args) {
        SpringApplication.run(UrbanBiteApplication.class, args);
    }
}