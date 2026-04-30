package com.urbanbite.repository;

import com.urbanbite.model.FoodPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface FoodPlanRepository extends JpaRepository<FoodPlan, Long> {

    List<FoodPlan> findByExpiryDateAndIsActiveTrue(LocalDate expiryDate);
    
    List<FoodPlan> findByExpiryDateAndIsActiveTrueAndExpiryReminderSentFalse(LocalDate expiryDate);

    List<FoodPlan> findByExpiryDateBeforeAndIsActiveTrue(LocalDate date);
    
    Optional<FoodPlan> findByUserIdAndIsActiveTrue(Long userId);
}
