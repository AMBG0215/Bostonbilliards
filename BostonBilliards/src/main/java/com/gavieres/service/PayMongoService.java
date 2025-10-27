package com.gavieres.service;

import com.gavieres.config.PayMongoConfig;
import com.gavieres.dto.paymongo.PaymentIntentRequest;
import com.gavieres.dto.paymongo.PaymentIntentResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
@Slf4j
public class PayMongoService {

    @Autowired
    private PayMongoConfig payMongoConfig;

    @Autowired
    private RestTemplate restTemplate;

    /**
     * Create a Payment Intent
     * 
     * @param amount Amount in Philippine Pesos (will be converted to centavos)
     * @param description Payment description
     * @param metadata Additional data (order ID, customer email, etc.)
     * @return PaymentIntentResponse with client_key for frontend
     */
    public PaymentIntentResponse createPaymentIntent(Double amount, String description, Map<String, String> metadata) {
        try {
            // Convert PHP to centavos (multiply by 100)
            Long amountInCentavos = Math.round(amount * 100);

            // Build request
            PaymentIntentRequest.PaymentIntentAttributes attributes = new PaymentIntentRequest.PaymentIntentAttributes();
            attributes.setAmount(amountInCentavos);
            attributes.setCurrency("PHP");
            attributes.setDescription(description);
            attributes.setStatementDescriptor("Boston Billiards"); // Max 22 chars
            attributes.setMetadata(metadata);

            // Payment methods to allow
            List<String> paymentMethods = Arrays.asList("card", "gcash", "paymaya", "grab_pay");
            attributes.setPaymentMethodAllowed(paymentMethods);

            // 3D Secure options for cards
            PaymentIntentRequest.CardOptions cardOptions = new PaymentIntentRequest.CardOptions();
            cardOptions.setRequestThreeDSecure("automatic");
            
            PaymentIntentRequest.PaymentMethodOptions paymentMethodOptions = new PaymentIntentRequest.PaymentMethodOptions();
            paymentMethodOptions.setCard(cardOptions);
            attributes.setPaymentMethodOptions(paymentMethodOptions);

            PaymentIntentRequest.PaymentIntentData data = new PaymentIntentRequest.PaymentIntentData();
            data.setAttributes(attributes);

            PaymentIntentRequest request = new PaymentIntentRequest();
            request.setData(data);

            // Make API call
            String url = payMongoConfig.getApiUrl() + "/payment_intents";
            HttpHeaders headers = createHeaders();
            HttpEntity<PaymentIntentRequest> entity = new HttpEntity<>(request, headers);

            log.info("Creating PayMongo Payment Intent for amount: ₱{}", amount);
            ResponseEntity<PaymentIntentResponse> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    entity,
                    PaymentIntentResponse.class
            );

            PaymentIntentResponse paymentIntent = response.getBody();
            log.info("Payment Intent created successfully. ID: {}", paymentIntent.getData().getId());
            
            return paymentIntent;

        } catch (Exception e) {
            log.error("Error creating Payment Intent: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to create payment intent: " + e.getMessage());
        }
    }

    /**
     * Retrieve a Payment Intent by ID
     * 
     * @param paymentIntentId Payment Intent ID
     * @return PaymentIntentResponse
     */
    public PaymentIntentResponse getPaymentIntent(String paymentIntentId) {
        try {
            String url = payMongoConfig.getApiUrl() + "/payment_intents/" + paymentIntentId;
            HttpHeaders headers = createHeaders();
            HttpEntity<?> entity = new HttpEntity<>(headers);

            log.info("Retrieving Payment Intent: {}", paymentIntentId);
            ResponseEntity<PaymentIntentResponse> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    PaymentIntentResponse.class
            );

            return response.getBody();

        } catch (Exception e) {
            log.error("Error retrieving Payment Intent {}: {}", paymentIntentId, e.getMessage(), e);
            throw new RuntimeException("Failed to retrieve payment intent: " + e.getMessage());
        }
    }

    /**
     * Create HTTP headers with PayMongo authentication
     */
    private HttpHeaders createHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", payMongoConfig.getAuthHeader());
        return headers;
    }

    /**
     * Verify webhook signature (for security)
     * Call this in your webhook controller to ensure the request is from PayMongo
     */
    public boolean verifyWebhookSignature(String signature, String payload) {
        try {
            // PayMongo uses HMAC SHA256 for webhook signatures
            String webhookSecret = payMongoConfig.getWebhookSecret();
            
            javax.crypto.Mac mac = javax.crypto.Mac.getInstance("HmacSHA256");
            javax.crypto.spec.SecretKeySpec secretKeySpec = new javax.crypto.spec.SecretKeySpec(
                    webhookSecret.getBytes(), "HmacSHA256");
            mac.init(secretKeySpec);
            
            byte[] hash = mac.doFinal(payload.getBytes());
            String expectedSignature = bytesToHex(hash);
            
            return expectedSignature.equals(signature);
        } catch (Exception e) {
            log.error("Error verifying webhook signature: {}", e.getMessage(), e);
            return false;
        }
    }

    private String bytesToHex(byte[] bytes) {
        StringBuilder result = new StringBuilder();
        for (byte b : bytes) {
            result.append(String.format("%02x", b));
        }
        return result.toString();
    }
}

