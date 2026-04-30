# UrbanBite — All Configuration Files

> Complete snapshot of every config file in the project (as of 1 May 2026)

---

## 📁 Project Structure Overview

```
REACT_BASED_VERSION/
├── backend/                          ← Spring Boot 3.4.4
│   ├── pom.xml
│   ├── src/main/resources/
│   │   └── application.properties
│   └── src/main/java/com/urbanbite/
│       ├── UrbanBiteApplication.java
│       ├── config/
│       │   ├── CorsConfig.java
│       │   ├── SecurityConfig.java
│       │   └── DataInitializer.java
│       └── security/
│           ├── JwtAuthFilter.java
│           └── JwtUtil.java
└── frontend/                         ← React 19 + Vite 8
    ├── .env
    ├── .env.development
    ├── vite.config.js
    └── package.json
```

---

## 🔧 BACKEND CONFIG FILES

---

### 1. `pom.xml` — Maven Build Config

> [!IMPORTANT]
> Key settings: `<packaging>war</packaging>`, `<release>21</release>`, `<finalName>ROOT</finalName>`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.4.4</version>
        <relativePath/>
    </parent>

    <groupId>com.urbanbite</groupId>
    <artifactId>urbanbite-backend</artifactId>
    <version>1.0.0</version>
    <name>UrbanBite Backend</name>
    <description>Spring Boot backend for UrbanBite tiffin service</description>
    <packaging>war</packaging>

    <properties>
        <java.version>21</java.version>
        <jjwt.version>0.12.6</jjwt.version>
        <lombok.version>1.18.44</lombok.version>
    </properties>

    <dependencies>
        <!-- External Tomcat (provided scope for WAR deployment) -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
            <scope>provided</scope>
        </dependency>
        <!-- Spring Boot Starters -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>

        <!-- MySQL Driver -->
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <scope>runtime</scope>
        </dependency>

        <!-- Lombok -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>${lombok.version}</version>
            <optional>true</optional>
        </dependency>

        <!-- JWT (io.jsonwebtoken) -->
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-api</artifactId>
            <version>${jjwt.version}</version>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-impl</artifactId>
            <version>${jjwt.version}</version>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-jackson</artifactId>
            <version>${jjwt.version}</version>
            <scope>runtime</scope>
        </dependency>

        <!-- Mail -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-mail</artifactId>
        </dependency>

        <!-- Test -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <finalName>ROOT</finalName>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <configuration>
                    <release>21</release>
                    <annotationProcessorPaths>
                        <path>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                            <version>${lombok.version}</version>
                        </path>
                    </annotationProcessorPaths>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

---

### 2. `application.properties` — Spring Boot Config

```properties
# ========================================
# UrbanBite — Application Configuration
# ========================================

# Server
server.port=${SERVER_PORT:8080}

# ----------------------------------------
# MySQL Database Configuration
# ----------------------------------------
spring.datasource.url=${DB_URL:jdbc:mysql://localhost:3306/urbanbite_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=Asia/Kolkata}
spring.datasource.username=${DB_USERNAME:urbanbite}
spring.datasource.password=${DB_PASSWORD:********}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# ----------------------------------------
# JPA / Hibernate
# ----------------------------------------
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# ----------------------------------------
# JWT Configuration
# ----------------------------------------
app.jwt.secret=${JWT_SECRET:********}
app.jwt.expiration-ms=${JWT_EXPIRATION:86400000}

# ----------------------------------------
# Logging
# ----------------------------------------
logging.level.com.urbanbite=DEBUG
logging.level.org.springframework.security=DEBUG

# ----------------------------------------
# Email Configuration
# ----------------------------------------
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=${EMAIL_USERNAME:********}
spring.mail.password=${EMAIL_PASSWORD:********}
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
spring.mail.properties.mail.smtp.starttls.required=true
```

---

### 3. `UrbanBiteApplication.java` — Main Entry Point

```java
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
```

---

### 4. `CorsConfig.java` — CORS Configuration

```java
package com.urbanbite.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

/**
 * CORS configuration — allows the React dev server and production to call backend APIs.
 */
@Configuration
public class CorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOrigins(Arrays.asList(
                "http://localhost:5173",
                "http://localhost:3000",
                "http://127.0.0.1:5173",
                "http://65.0.98.178"
        ));

        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setExposedHeaders(List.of("Authorization"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", config);
        return source;
    }
}
```

---

### 5. `SecurityConfig.java` — Spring Security Config

```java
package com.urbanbite.config;

import com.urbanbite.security.JwtAuthFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    public SecurityConfig(JwtAuthFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> {})
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // Public endpoints
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/menu/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/calories/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/reviews/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/reviews/**").permitAll()
                // Admin-only
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                // Everything else requires auth
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
```

---

### 6. `DataInitializer.java` — Database Seeder

```java
package com.urbanbite.config;

import com.urbanbite.model.*;
import com.urbanbite.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final MenuItemRepository menuItemRepo;
    private final CalorieInfoRepository calorieInfoRepo;
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;

    // Constructor injection ...

    @Override
    public void run(String... args) {
        seedMenuItems();      // 12 menu items (Mon–Sat, Lunch+Dinner)
        seedCalorieInfo();     // 10 calorie entries
        seedAdminUser();       // admin@urbanbite.com / admin123
    }
}
```

---

### 7. `JwtAuthFilter.java` — JWT Authentication Filter

```java
package com.urbanbite.security;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService userDetailsService;

    // Constructor ...

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ... {
        String token = extractToken(request);

        if (token != null && jwtUtil.validateToken(token)) {
            String email = jwtUtil.getEmailFromToken(token);
            UserDetails userDetails = userDetailsService.loadUserByUsername(email);
            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authToken);
        }

        filterChain.doFilter(request, response);
    }

    private String extractToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (StringUtils.hasText(header) && header.startsWith("Bearer ")) {
            return header.substring(7);
        }
        return null;
    }
}
```

---

### 8. `JwtUtil.java` — JWT Token Utility

```java
package com.urbanbite.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {

    private final SecretKey key;
    private final long expirationMs;

    public JwtUtil(@Value("${app.jwt.secret}") String secret,
                   @Value("${app.jwt.expiration-ms}") long expirationMs) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.expirationMs = expirationMs;
    }

    public String generateToken(String email) {
        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(key)
                .compact();
    }

    public String getEmailFromToken(String token) {
        return Jwts.parser().verifyWith(key).build()
                .parseSignedClaims(token).getPayload().getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().verifyWith(key).build().parseSignedClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}
```

---

## 🎨 FRONTEND CONFIG FILES

---

### 9. `.env` — Production Environment (used by `npm run build`)

```env
# UrbanBite — Frontend Environment Configuration
# This URL is baked into the build at compile time (Vite).
VITE_API_URL=http://65.0.98.178:8080/api
```

---

### 10. `.env.development` — Dev Environment (used by `npm run dev`)

```env
# UrbanBite — Local Development (overrides .env when running `npm run dev`)
VITE_API_URL=http://localhost:8080/api
```

---

### 11. `vite.config.js` — Vite Build Config

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
```

---

### 12. `package.json` — NPM Config

```json
{
  "name": "urbanbite-react",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/dom": "^10.4.1",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.0",
    "@testing-library/user-event": "^13.5.0",
    "bootstrap": "^5.3.8",
    "react": "^19.2.1",
    "react-dom": "^19.2.1",
    "react-router-dom": "^7.10.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^6.0.1",
    "vite": "^8.0.10"
  }
}
```

---

### 13. `api.js` — Frontend API Service (Centralized Fetch Layer)

```js
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

async function authFetch(endpoint, options = {}) {
  const token = localStorage.getItem('urbanbite_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });

  if (response.status === 401 || response.status === 403) {
    if (!endpoint.includes('/auth/')) {
      localStorage.removeItem('urbanbite_token');
      localStorage.removeItem('urbanbite_user');
    }
  }
  return response;
}

// Auth API
export async function registerUser(data) { ... }
export async function loginUser(email, password) { ... }
export async function getProfile() { ... }

// Menu API
export async function getMenuByDay(day) { ... }
export async function getFullMenu() { ... }

// Calories API
export async function getCalories() { ... }

// Reviews API
export async function getReviews() { ... }
export async function postReview(data) { ... }

// Orders API (authenticated)
export async function createOrder(data) { ... }
export async function getOrders() { ... }
```

---

## 🖥️ AWS Server Details

| Component | Location |
|-----------|----------|
| **Tomcat 10** | `/var/lib/tomcat10/` |
| **WAR file** | `/var/lib/tomcat10/webapps/ROOT.war` |
| **Tomcat logs** | `/var/lib/tomcat10/logs/catalina.out` |
| **Nginx root** | `/var/www/html/` |
| **MySQL DB** | `urbanbite_db` on `localhost:3306` |
| **MySQL user** | `urbanbite` / `********` |
| **Java version** | OpenJDK 21 (`/usr/lib/jvm/java-21-openjdk-amd64`) |
| **Public IP** | `65.0.98.178` |
| **Frontend** | `http://65.0.98.178` (port 80, Nginx) |
| **Backend API** | `http://65.0.98.178:8080/api` (port 8080, Tomcat) |
