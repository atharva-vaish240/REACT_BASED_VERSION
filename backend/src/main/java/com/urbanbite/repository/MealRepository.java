package com.urbanbite.repository;

import com.urbanbite.model.Meal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MealRepository extends JpaRepository<Meal, Long> {

    List<Meal> findByScheduledDateAndReminderSentFalse(LocalDate date);
}
