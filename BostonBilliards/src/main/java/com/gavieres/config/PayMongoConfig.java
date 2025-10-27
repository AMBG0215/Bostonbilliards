package com.gavieres.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.client.RestTemplate;

@Configuration
@PropertySource("classpath:application-paymongo.properties")
public class PayMongoConfig {

    @Value("${paymongo.secret.key}")
    private String secretKey;

    @Value("${paymongo.public.key}")
    private String publicKey;

    @Value("${paymongo.api.url}")
    private String apiUrl;

    @Value("${paymongo.webhook.secret}")
    private String webhookSecret;

    @Value("${paymongo.success.url}")
    private String successUrl;

    @Value("${paymongo.cancel.url}")
    private String cancelUrl;

    public String getSecretKey() {
        return secretKey;
    }

    public String getPublicKey() {
        return publicKey;
    }

    public String getApiUrl() {
        return apiUrl;
    }

    public String getWebhookSecret() {
        return webhookSecret;
    }

    public String getSuccessUrl() {
        return successUrl;
    }

    public String getCancelUrl() {
        return cancelUrl;
    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    /**
     * Get Basic Auth header value
     * PayMongo uses the secret key as username and empty password
     */
    public String getAuthHeader() {
        String auth = secretKey + ":";
        return "Basic " + java.util.Base64.getEncoder().encodeToString(auth.getBytes());
    }
}

