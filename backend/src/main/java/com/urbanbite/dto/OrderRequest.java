package com.urbanbite.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * DTO for placing a subscription order from checkout.
 */
@Data
public class OrderRequest {

    @NotBlank(message = "Plan is required")
    private String plan;

    private String address;
}
