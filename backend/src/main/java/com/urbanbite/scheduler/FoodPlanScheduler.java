package com.urbanbite.scheduler;

import com.urbanbite.model.FoodPlan;
import com.urbanbite.model.User;
import com.urbanbite.repository.FoodPlanRepository;
import com.urbanbite.service.email.EmailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class FoodPlanScheduler {

    private static final Logger logger = LoggerFactory.getLogger(FoodPlanScheduler.class);

    private final FoodPlanRepository foodPlanRepository;
    private final EmailService emailService;

    public FoodPlanScheduler(FoodPlanRepository foodPlanRepository, EmailService emailService) {
        this.foodPlanRepository = foodPlanRepository;
        this.emailService = emailService;
    }

    /**
     * Runs daily at 9 AM.
     * Finds plans expiring in 1 day and sends a reminder.
     * Finds expired plans, notifies users, and marks them inactive.
     */
    @Scheduled(cron = "0 0 9 * * ?")
    public void checkExpiringPlans() {
        logger.info("Running FoodPlanScheduler...");

        LocalDate today = LocalDate.now();
        LocalDate tomorrow = today.plusDays(1);

        // Notify for plans expiring tomorrow
        List<FoodPlan> expiringPlans = foodPlanRepository.findByExpiryDateAndIsActiveTrue(tomorrow);
        for (FoodPlan plan : expiringPlans) {
            User user = plan.getUser();
            String subject = "Your Food Plan is Expiring Soon 🍽️";
            String body = "Hi " + user.getName() + ",\n\n" +
                    "Your " + plan.getPlan() + " food plan will expire tomorrow (" + tomorrow + ").\n" +
                    "Renew now to continue enjoying our meals.\n\n" +
                    "Thank you!";
            emailService.sendSimpleEmail(user.getEmail(), subject, body);
            logger.info("Sent expiry reminder to {}", user.getEmail());
        }

        // Notify for expired plans (expiry date is before today)
        // Note: if a plan expired exactly yesterday, we mark it inactive
        // We find all active plans that have an expiry date strictly before today.
        List<FoodPlan> expiredPlans = foodPlanRepository.findByExpiryDateBeforeAndIsActiveTrue(today);
        for (FoodPlan plan : expiredPlans) {
            User user = plan.getUser();
            String subject = "Your Food Plan has Expired ⚠️";
            String body = "Hi " + user.getName() + ",\n\n" +
                    "Your " + plan.getPlan() + " food plan has expired on " + plan.getExpiryDate() + ".\n" +
                    "Please renew your subscription to resume your meal deliveries.\n\n" +
                    "Thank you!";
            emailService.sendSimpleEmail(user.getEmail(), subject, body);
            
            // Mark as inactive
            plan.setActive(false);
            foodPlanRepository.save(plan);
            
            logger.info("Sent expired notification and deactivated plan for {}", user.getEmail());
        }
        
        logger.info("Finished FoodPlanScheduler.");
    }
}
