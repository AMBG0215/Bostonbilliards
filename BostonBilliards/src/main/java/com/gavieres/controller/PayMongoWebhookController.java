package com.gavieres.controller;

import com.gavieres.service.OrderItemService;
import com.gavieres.service.PayMongoService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/webhooks/paymongo")
@Slf4j
public class PayMongoWebhookController {

    @Autowired
    private PayMongoService payMongoService;

    @Autowired
    private OrderItemService orderItemService;

    @Autowired
    private ObjectMapper objectMapper;

    /**
     * PayMongo Webhook Endpoint
     * 
     * PayMongo will send POST requests to this endpoint when payment events occur:
     * - payment.paid (payment successful)
     * - payment.failed (payment failed)
     * - payment_intent.succeeded (payment intent succeeded)
     * 
     * Register this webhook URL in your PayMongo Dashboard:
     * https://dashboard.paymongo.com/developers/webhooks
     * 
     * Webhook URL: https://yourdomain.com/api/webhooks/paymongo
     */
    @PostMapping
    public ResponseEntity<?> handleWebhook(
            @RequestBody String payload,
            @RequestHeader(value = "Paymongo-Signature", required = false) String signature) {
        
        try {
            log.info("Received PayMongo webhook");

            // Verify webhook signature for security
            if (signature != null && !payMongoService.verifyWebhookSignature(signature, payload)) {
                log.warn("Invalid webhook signature!");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid signature");
            }

            // Parse webhook payload
            JsonNode webhookData = objectMapper.readTree(payload);
            JsonNode data = webhookData.get("data");
            
            if (data == null) {
                log.warn("Invalid webhook payload: no data field");
                return ResponseEntity.badRequest().body("Invalid payload");
            }

            String eventType = data.get("attributes").get("type").asText();
            log.info("Webhook event type: {}", eventType);

            // Handle different event types
            switch (eventType) {
                case "payment.paid":
                    handlePaymentPaid(data);
                    break;
                    
                case "payment.failed":
                    handlePaymentFailed(data);
                    break;
                    
                case "payment_intent.succeeded":
                    handlePaymentIntentSucceeded(data);
                    break;
                    
                default:
                    log.info("Unhandled event type: {}", eventType);
            }

            // Return 200 OK to acknowledge receipt
            Map<String, String> response = new HashMap<>();
            response.put("status", "received");
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Error processing webhook: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing webhook");
        }
    }

    /**
     * Handle successful payment
     */
    private void handlePaymentPaid(JsonNode data) {
        try {
            JsonNode attributes = data.get("attributes").get("data").get("attributes");
            JsonNode metadata = attributes.get("metadata");
            
            if (metadata != null && metadata.has("order_id")) {
                Long orderId = metadata.get("order_id").asLong();
                String paymentId = data.get("id").asText();
                
                log.info("Payment successful for Order ID: {}, Payment ID: {}", orderId, paymentId);
                
                // Update order status to ACCEPTED/PAID
                orderItemService.updateOrderStatus(orderId, "ACCEPTED", "Payment received via PayMongo");
                
                log.info("Order {} marked as PAID", orderId);
            }
            
        } catch (Exception e) {
            log.error("Error handling payment.paid event: {}", e.getMessage(), e);
        }
    }

    /**
     * Handle failed payment
     */
    private void handlePaymentFailed(JsonNode data) {
        try {
            JsonNode attributes = data.get("attributes").get("data").get("attributes");
            JsonNode metadata = attributes.get("metadata");
            
            if (metadata != null && metadata.has("order_id")) {
                Long orderId = metadata.get("order_id").asLong();
                String failureReason = attributes.has("last_payment_error") 
                        ? attributes.get("last_payment_error").asText() 
                        : "Unknown reason";
                
                log.warn("Payment failed for Order ID: {}, Reason: {}", orderId, failureReason);
                
                // You might want to update order status to PAYMENT_FAILED
                // or notify the customer
                
            }
            
        } catch (Exception e) {
            log.error("Error handling payment.failed event: {}", e.getMessage(), e);
        }
    }

    /**
     * Handle payment intent succeeded
     */
    private void handlePaymentIntentSucceeded(JsonNode data) {
        try {
            JsonNode attributes = data.get("attributes").get("data").get("attributes");
            JsonNode metadata = attributes.get("metadata");
            
            if (metadata != null && metadata.has("order_id")) {
                Long orderId = metadata.get("order_id").asLong();
                String paymentIntentId = data.get("id").asText();
                
                log.info("Payment Intent succeeded for Order ID: {}, Payment Intent ID: {}", 
                        orderId, paymentIntentId);
                
                // Payment intent succeeded - you can update order status here if needed
            }
            
        } catch (Exception e) {
            log.error("Error handling payment_intent.succeeded event: {}", e.getMessage(), e);
        }
    }
}

