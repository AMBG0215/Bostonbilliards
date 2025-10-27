# PayMongo Integration Setup Guide

## 📋 Overview

This guide will help you set up PayMongo payment integration for Boston Billiards.

---

## 🔑 Step 1: Get Your PayMongo API Keys

1. **Sign up** for a PayMongo account:
   - Go to: https://dashboard.paymongo.com/signup
   - Complete business verification

2. **Get your API keys**:
   - Login to: https://dashboard.paymongo.com
   - Navigate to: **Developers** → **API Keys**
   - You'll see:
     - **Public Key** (starts with `pk_test_` for testing)
     - **Secret Key** (starts with `sk_test_` for testing)

3. **Save your keys** (you'll need them in Step 2)

---

## ⚙️ Step 2: Configure Environment Variables

### Option A: Using Environment Variables (Recommended for Production)

**Windows:**
```powershell
setx PAYMONGO_SECRET_KEY "sk_test_your_secret_key_here"
setx PAYMONGO_PUBLIC_KEY "pk_test_your_public_key_here"
setx PAYMONGO_WEBHOOK_SECRET "whsec_your_webhook_secret_here"
```

**Linux/Mac:**
```bash
export PAYMONGO_SECRET_KEY="sk_test_your_secret_key_here"
export PAYMONGO_PUBLIC_KEY="pk_test_your_public_key_here"
export PAYMONGO_WEBHOOK_SECRET="whsec_your_webhook_secret_here"
```

### Option B: Directly in Properties File (For Development Only)

Edit: `BostonBilliards/src/main/resources/application-paymongo.properties`

```properties
paymongo.secret.key=sk_test_your_actual_secret_key_here
paymongo.public.key=pk_test_your_actual_public_key_here
paymongo.webhook.secret=whsec_your_webhook_secret_here
```

⚠️ **Important:** Never commit actual API keys to Git! Add this file to `.gitignore`

---

## 🔗 Step 3: Register Webhook (After Deployment)

1. Go to: https://dashboard.paymongo.com/developers/webhooks
2. Click **"Create Webhook"**
3. Enter your webhook URL:
   ```
   https://yourdomain.com/api/webhooks/paymongo
   ```
   
   For local testing with ngrok:
   ```
   https://your-ngrok-url.ngrok.io/api/webhooks/paymongo
   ```

4. Select events to listen to:
   - ✅ `payment.paid`
   - ✅ `payment.failed`
   - ✅ `payment_intent.succeeded`

5. Copy the **Webhook Secret** and add it to your environment variables

---

## 🧪 Step 4: Testing

### Test with PayMongo Test Cards

PayMongo provides test card numbers for development:

| Card Number | CVC | Expiry | Result |
|-------------|-----|--------|--------|
| 4343434343434345 | 123 | 12/25 | Success |
| 4571736000000075 | 123 | 12/25 | Success with 3D Secure |
| 4571736000000083 | 123 | 12/25 | Failed |

### Test API Endpoints

**1. Create Payment Intent:**
```bash
POST http://localhost:8080/api/payment/create-intent
Authorization: Bearer YOUR_JWT_TOKEN

{
  "amount": 1500.50,
  "orderId": 1,
  "customerEmail": "customer@example.com",
  "items": [
    {
      "productId": 1,
      "productName": "Pool Cue",
      "quantity": 1,
      "price": 1500.50
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "paymentIntentId": "pi_xxx",
  "clientKey": "pi_xxx_client_yyy",
  "amount": 1500.50,
  "status": "awaiting_payment_method"
}
```

**2. Check Payment Status:**
```bash
GET http://localhost:8080/api/payment/status/{paymentIntentId}
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 🔄 Payment Flow

```
1. Customer adds items to cart
   ↓
2. Customer clicks "Proceed to Checkout"
   ↓
3. Frontend calls: POST /api/payment/create-intent
   ↓
4. Backend creates PayMongo Payment Intent
   ↓
5. Backend returns clientKey to frontend
   ↓
6. Frontend uses clientKey to show PayMongo payment form
   ↓
7. Customer completes payment
   ↓
8. PayMongo sends webhook to: /api/webhooks/paymongo
   ↓
9. Backend updates order status to "PAID"
   ↓
10. Customer sees confirmation
```

---

## 📱 Payment Methods Supported

- 💳 **Credit/Debit Cards** (Visa, Mastercard, JCB)
- 📱 **GCash**
- 📱 **Maya (PayMaya)**
- 📱 **GrabPay**
- 🏪 **Over-the-Counter** (7-Eleven, Cebuana, etc.)
- 🏦 **Online Banking**

---

## 🐛 Troubleshooting

### Issue: "Authentication failed"
- ✅ Check your API keys are correct
- ✅ Ensure you're using test keys for development (starts with `sk_test_`)
- ✅ Verify environment variables are set

### Issue: "Webhooks not received"
- ✅ Ensure webhook URL is publicly accessible
- ✅ For local testing, use ngrok: `ngrok http 8080`
- ✅ Verify webhook is registered in PayMongo dashboard
- ✅ Check webhook secret matches

### Issue: "Payment fails immediately"
- ✅ Verify amount is positive
- ✅ Check amount doesn't exceed limits
- ✅ Use test card numbers for testing

---

## 📚 Additional Resources

- **PayMongo Docs:** https://developers.paymongo.com/
- **Dashboard:** https://dashboard.paymongo.com/
- **Test Cards:** https://developers.paymongo.com/docs/testing
- **Support:** support@paymongo.com

---

## 🔒 Security Best Practices

1. ✅ **Never expose secret key** to frontend
2. ✅ **Verify webhook signatures** (already implemented)
3. ✅ **Use HTTPS** in production
4. ✅ **Store API keys** in environment variables
5. ✅ **Add `.env`** to `.gitignore`
6. ✅ **Use test keys** for development
7. ✅ **Switch to live keys** only in production

---

## 🚀 Going Live Checklist

Before deploying to production:

- [ ] Replace test keys with live keys
- [ ] Register production webhook URL
- [ ] Enable HTTPS
- [ ] Complete PayMongo business verification
- [ ] Test with real payment methods
- [ ] Set up proper error handling
- [ ] Configure success/failure URLs
- [ ] Test refund functionality
- [ ] Set up monitoring/logging

---

## 💰 Fees

PayMongo charges:
- **2.5% + ₱15** per successful card transaction
- **2.0% + ₱15** per successful e-wallet transaction

Check current pricing: https://www.paymongo.com/pricing

---

## 📞 Support

If you need help:
- Email: support@paymongo.com
- Developer Community: https://discord.gg/paymongo
- Documentation: https://developers.paymongo.com/

---

**Happy Coding! 🎱💳**

