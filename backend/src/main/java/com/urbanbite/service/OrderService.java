package com.urbanbite.service;

import com.urbanbite.dto.OrderRequest;
import com.urbanbite.model.Order;
import com.urbanbite.model.User;
import com.urbanbite.repository.OrderRepository;
import com.urbanbite.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

/**
 * Service for managing subscription orders.
 */
@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    public OrderService(OrderRepository orderRepository, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }

    /**
     * Create a new order for the authenticated user.
     * Calculates price based on plan type with a fixed ₹50 promo discount.
     */
    public Order createOrder(String email, OrderRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        BigDecimal price = getPrice(request.getPlan());
        BigDecimal discount = new BigDecimal("50");
        BigDecimal total = price.subtract(discount).max(BigDecimal.ZERO);

        Order order = Order.builder()
                .userId(user.getId())
                .plan(request.getPlan())
                .address(request.getAddress())
                .amount(price)
                .discount(discount)
                .total(total)
                .status("PENDING")
                .build();

        return orderRepository.save(order);
    }

    /**
     * Get order history for the authenticated user.
     */
    public List<Order> getUserOrders(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return orderRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
    }

    /**
     * Price lookup matching the frontend Checkout component logic.
     */
    private BigDecimal getPrice(String plan) {
        return switch (plan) {
            case "Daily" -> new BigDecimal("120");
            case "Weekly" -> new BigDecimal("800");
            case "Monthly" -> new BigDecimal("3000");
            default -> BigDecimal.ZERO;
        };
    }
}
