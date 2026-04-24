package com.urbanbite.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * DTO for user registration (subscription) requests.
 * Maps to the "Join UrbanBite" form on the Home page.
 */
@Data
public class RegisterRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    private String phone;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    /** Subscription plan: Daily, Weekly, Monthly */
    @NotBlank(message = "Plan is required")
    private String plan;

    /** Food preference: Veg, Non-Veg, Both */
    private String foodType;
}
