package com.gavieres.dto.paymongo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class PaymentIntentResponse {

    @JsonProperty("data")
    private PaymentIntentData data;

    @Data
    public static class PaymentIntentData {
        @JsonProperty("id")
        private String id;

        @JsonProperty("type")
        private String type;

        @JsonProperty("attributes")
        private PaymentIntentAttributes attributes;
    }

    @Data
    public static class PaymentIntentAttributes {
        @JsonProperty("amount")
        private Long amount;

        @JsonProperty("currency")
        private String currency;

        @JsonProperty("description")
        private String description;

        @JsonProperty("statement_descriptor")
        private String statementDescriptor;

        @JsonProperty("status")
        private String status; // awaiting_payment_method, awaiting_next_action, processing, succeeded, canceled

        @JsonProperty("client_key")
        private String clientKey; // Use this on frontend

        @JsonProperty("created_at")
        private Long createdAt;

        @JsonProperty("updated_at")
        private Long updatedAt;

        @JsonProperty("last_payment_error")
        private Object lastPaymentError;

        @JsonProperty("payment_method_allowed")
        private List<String> paymentMethodAllowed;

        @JsonProperty("payments")
        private List<Object> payments;

        @JsonProperty("next_action")
        private NextAction nextAction;

        @JsonProperty("payment_method_options")
        private Map<String, Object> paymentMethodOptions;

        @JsonProperty("metadata")
        private Map<String, String> metadata;
    }

    @Data
    public static class NextAction {
        @JsonProperty("type")
        private String type;

        @JsonProperty("redirect")
        private RedirectInfo redirect;
    }

    @Data
    public static class RedirectInfo {
        @JsonProperty("url")
        private String url;

        @JsonProperty("return_url")
        private String returnUrl;
    }
}

