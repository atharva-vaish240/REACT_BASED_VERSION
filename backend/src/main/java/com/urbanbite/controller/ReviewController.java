package com.urbanbite.controller;

import com.urbanbite.dto.ApiResponse;
import com.urbanbite.dto.ReviewRequest;
import com.urbanbite.model.Review;
import com.urbanbite.service.ReviewService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for customer reviews.
 * GET is public, POST is public (guests can leave reviews).
 */
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    /**
     * GET /api/reviews — Get all reviews (newest first).
     */
    @GetMapping
    public ResponseEntity<List<Review>> getAllReviews() {
        return ResponseEntity.ok(reviewService.getAllReviews());
    }

    /**
     * POST /api/reviews — Submit a new review.
     */
    @PostMapping
    public ResponseEntity<?> createReview(@Valid @RequestBody ReviewRequest request) {
        try {
            Review review = reviewService.createReview(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(review);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, "Failed to submit review: " + e.getMessage()));
        }
    }
}
