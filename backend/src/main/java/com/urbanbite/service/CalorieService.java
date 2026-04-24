package com.urbanbite.service;

import com.urbanbite.model.CalorieInfo;
import com.urbanbite.repository.CalorieInfoRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Service for managing calorie/nutrition information.
 */
@Service
public class CalorieService {

    private final CalorieInfoRepository calorieInfoRepository;

    public CalorieService(CalorieInfoRepository calorieInfoRepository) {
        this.calorieInfoRepository = calorieInfoRepository;
    }

    /**
     * Get all calorie info, formatted for the frontend.
     * Returns a map: { "itemName": { "calories": 350, "recommendedFor": ["Diabetes", ...] } }
     */
    public Map<String, Map<String, Object>> getAllCalorieInfo() {
        List<CalorieInfo> items = calorieInfoRepository.findAll();

        Map<String, Map<String, Object>> result = new LinkedHashMap<>();
        for (CalorieInfo item : items) {
            Map<String, Object> info = new HashMap<>();
            info.put("calories", item.getCalories());

            // Convert comma-separated string to list
            List<String> recommendations = item.getRecommendedFor() != null
                    ? Arrays.stream(item.getRecommendedFor().split(","))
                            .map(String::trim)
                            .collect(Collectors.toList())
                    : List.of();
            info.put("recommendedFor", recommendations);

            result.put(item.getItemName(), info);
        }

        return result;
    }
}
