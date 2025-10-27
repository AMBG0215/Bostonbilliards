package com.gavieres.dto.paymongo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentIntentRequest {

    @JsonProperty("data")
    private PaymentIntentData data;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PaymentIntentData {
        @JsonProperty("attributes")
        private PaymentIntentAttributes attributes;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PaymentIntentAttributes {
        
        @JsonProperty("amount")
        private Long amount; // Amount in centavos (e.g., 10000 = ₱100.00)
        
        @JsonProperty("payment_method_allowed")
        private List<String> paymentMethodAllowed; // e.g., ["card", "gcash", "paymaya"]
        
        @JsonProperty("payment_method_options")
        private PaymentMethodOptions paymentMethodOptions;
        
        @JsonProperty("currency")
        private String currency; // "PHP"
        
        @JsonProperty("description")
        private String description;
        
        @JsonProperty("statement_descriptor")
        private String statementDescriptor; // Max 22 characters
        
        @JsonProperty("metadata")
        private java.util.Map<String, String> metadata; // Custom data (e.g., order_id, customer_email)
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PaymentMethodOptions {
        @JsonProperty("card")
        private CardOptions card;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CardOptions {
        @JsonProperty("request_three_d_secure")
        private String requestThreeDSecure; // "automatic" or "any"
    }
}

