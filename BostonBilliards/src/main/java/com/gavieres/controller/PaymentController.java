package com.gavieres.controller;

import com.gavieres.dto.paymongo.PaymentIntentResponse;
import com.gavieres.service.PayMongoService;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "*")
@Slf4j
public class PaymentController {

    @Autowired
    private PayMongoService payMongoService;

    /**
     * Create a payment intent for checkout
     * 
     * POST /api/payment/create-intent
     * 
     * Request Body:
     * {
     *   "amount": 1500.50,
     *   "orderId": 123,
     *   "customerEmail": "customer@example.com",
     *   "items": [...]
     * }
     */
    @PostMapping("/create-intent")
    public ResponseEntity<?> createPaymentIntent(@RequestBody PaymentRequest request) {
        try {
            log.info("Creating payment intent for Order ID: {}, Amount: ₱{}", 
                    request.getOrderId(), request.getAmount());

            // Prepare metadata
            Map<String, String> metadata = new HashMap<>();
            metadata.put("order_id", String.valueOf(request.getOrderId()));
            metadata.put("customer_email", request.getCustomerEmail());
            metadata.put("items_count", String.valueOf(request.getItems().size()));

            // Create description
            String description = String.format("Boston Billiards Order #%d - %d item(s)", 
                    request.getOrderId(), request.getItems().size());

            // Call PayMongo API
            PaymentIntentResponse paymentIntent = payMongoService.createPaymentIntent(
                    request.getAmount(),
                    description,
                    metadata
            );

            // Return response with client_key for frontend
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("paymentIntentId", paymentIntent.getData().getId());
            response.put("clientKey", paymentIntent.getData().getAttributes().getClientKey());
            response.put("amount", request.getAmount());
            response.put("status", paymentIntent.getData().getAttributes().getStatus());

            log.info("Payment Intent created successfully. Client Key: {}", 
                    paymentIntent.getData().getAttributes().getClientKey());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Error creating payment intent: {}", e.getMessage(), e);
            
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("error", e.getMessage());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    /**
     * Check payment status
     * 
     * GET /api/payment/status/{paymentIntentId}
     */
    @GetMapping("/status/{paymentIntentId}")
    public ResponseEntity<?> getPaymentStatus(@PathVariable String paymentIntentId) {
        try {
            log.info("Checking payment status for: {}", paymentIntentId);

            PaymentIntentResponse paymentIntent = payMongoService.getPaymentIntent(paymentIntentId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("paymentIntentId", paymentIntent.getData().getId());
            response.put("status", paymentIntent.getData().getAttributes().getStatus());
            response.put("amount", paymentIntent.getData().getAttributes().getAmount() / 100.0);
            response.put("metadata", paymentIntent.getData().getAttributes().getMetadata());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Error checking payment status: {}", e.getMessage(), e);
            
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("error", e.getMessage());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    // Request DTO
    @Data
    public static class PaymentRequest {
        private Double amount;
        private Long orderId;
        private String customerEmail;
        private List<OrderItem> items;
    }

    @Data
    public static class OrderItem {
        private Long productId;
        private String productName;
        private Integer quantity;
        private Double price;
    }
}

