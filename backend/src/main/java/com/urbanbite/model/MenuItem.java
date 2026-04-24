package com.urbanbite.model;

import jakarta.persistence.*;
import lombok.*;

/**
 * MenuItem entity — stores the weekly tiffin menu (lunch/dinner per day).
 */
@Entity
@Table(name = "menu_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Day of week: Monday, Tuesday, etc. */
    @Column(name = "day_of_week", nullable = false, length = 20)
    private String dayOfWeek;

    /** Meal type: LUNCH or DINNER */
    @Column(name = "meal_type", nullable = false, length = 10)
    private String mealType;

    /** Description of the meal */
    @Column(nullable = false, length = 500)
    private String description;
}
