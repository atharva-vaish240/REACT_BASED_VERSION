package com.urbanbite.controller;

import com.urbanbite.model.Order;
import com.urbanbite.model.Review;
import com.urbanbite.model.User;
import com.urbanbite.repository.OrderRepository;
import com.urbanbite.repository.ReviewRepository;
import com.urbanbite.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for admin-only operations.
 * Requires ROLE_ADMIN.
 */
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final ReviewRepository reviewRepository;

    public AdminController(UserRepository userRepository,
                           OrderRepository orderRepository,
                           ReviewRepository reviewRepository) {
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
        this.reviewRepository = reviewRepository;
    }

    /**
     * GET /api/admin/users — List all registered users.
     */
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    /**
     * GET /api/admin/orders — List all orders.
     */
    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderRepository.findAll());
    }

    /**
     * GET /api/admin/reviews — List all reviews.
     */
    @GetMapping("/reviews")
    public ResponseEntity<List<Review>> getAllReviews() {
        return ResponseEntity.ok(reviewRepository.findAll());
    }
}
