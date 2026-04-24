package com.urbanbite.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * Generic API response wrapper for success/error messages.
 */
@Data
@AllArgsConstructor
public class ApiResponse {

    private boolean success;
    private String message;
    private Object data;

    /** Convenience constructor without data payload */
    public ApiResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
        this.data = null;
    }
}
