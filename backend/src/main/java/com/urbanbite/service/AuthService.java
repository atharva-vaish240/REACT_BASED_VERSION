package com.urbanbite.service;

import com.urbanbite.dto.AuthResponse;
import com.urbanbite.dto.LoginRequest;
import com.urbanbite.dto.RegisterRequest;
import com.urbanbite.model.Role;
import com.urbanbite.model.User;
import com.urbanbite.repository.UserRepository;
import com.urbanbite.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Service handling user registration, login, and profile retrieval.
 */
@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    /**
     * Register a new user (subscriber) and return JWT + user info.
     */
    public AuthResponse register(RegisterRequest request) {
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered. Please login instead.");
        }

        // Create and save user
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .password(passwordEncoder.encode(request.getPassword()))
                .plan(request.getPlan())
                .foodType(request.getFoodType())
                .role(Role.USER)
                .build();

        user = userRepository.save(user);

        // Generate JWT
        String token = jwtUtil.generateToken(user.getEmail());

        return buildAuthResponse(user, token);
    }

    /**
     * Authenticate user with email/password and return JWT.
     */
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getEmail());

        return buildAuthResponse(user, token);
    }

    /**
     * Get user profile by email (used by authenticated endpoints).
     */
    public AuthResponse getProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return buildAuthResponse(user, null);
    }

    /**
     * Build the AuthResponse DTO from a User entity.
     */
    private AuthResponse buildAuthResponse(User user, String token) {
        return AuthResponse.builder()
                .token(token)
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .plan(user.getPlan())
                .phone(user.getPhone())
                .foodType(user.getFoodType())
                .role(user.getRole().name())
                .build();
    }
}
