package com.urbanbite.controller;

import com.urbanbite.service.CalorieService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * REST controller for calorie/nutrition information.
 * Public access — no authentication required.
 */
@RestController
@RequestMapping("/api/calories")
public class CalorieController {

    private final CalorieService calorieService;

    public CalorieController(CalorieService calorieService) {
        this.calorieService = calorieService;
    }

    /**
     * GET /api/calories — Get all calorie data.
     * Returns: { "Rajma Chawal": { "calories": 350, "recommendedFor": [...] }, ... }
     */
    @GetMapping
    public ResponseEntity<Map<String, Map<String, Object>>> getAllCalories() {
        return ResponseEntity.ok(calorieService.getAllCalorieInfo());
    }
}
