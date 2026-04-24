package com.urbanbite.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

/**
 * User entity — stores registered UrbanBite subscribers.
 */
@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(length = 20)
    private String phone;

    @Column(nullable = false)
    private String password;

    /** Subscription plan: Daily, Weekly, or Monthly */
    @Column(length = 20)
    private String plan;

    /** Food preference: Veg, Non-Veg, or Both */
    @Column(name = "food_type", length = 20)
    private String foodType;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    @Builder.Default
    private Role role = Role.USER;

    @Column(name = "created_at", updatable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
