# Phase M3 Implementation Plan - Cart, Checkout, Payments

**Date:** November 22, 2025
**Phase:** M3 – Cart, Checkout, Payments
**Portal:** Main App (Shopper Portal)

---

## Overview

Phase M3 focuses on implementing the complete purchase flow, from cart management to payment processing. This is a critical phase that requires careful attention to security, user experience, and payment gateway integration.

---

## M3.1 - Cart State (Session Persistence, Edge Cases)

### Current State
We already have a basic cart store implemented with Zustand and localStorage persistence. However, it needs enhancements for production use.

### Enhancements Needed

**1. Cart Page UI**
- Full cart view with product details
- Quantity adjustment controls
- Remove item functionality
- Continue shopping link
- Proceed to checkout button
- Empty cart state
- Cart summary (subtotal, estimated tax, total)

**2. Edge Case Handling**
- Stock validation (check if product still has stock)
- Price updates (detect if price changed since adding to cart)
- Product availability (check if product is still active)
- Variant validation (ensure selected variant still exists)
- Maximum quantity limits
- Duplicate item prevention (same product + variant)

**3. Session Persistence**
- Already implemented with Zustand persist
- Add cart expiration (7 days)
- Sync cart with user account (future: merge guest cart on login)

**4. Cart Notifications**
- Toast notifications for add/remove/update
- Warning for stock issues
- Price change alerts

---

## M3.2 - Checkout Flow (Shipping Address/Method, Review)

### Checkout Steps

**Step 1: Shipping Information**
- Shipping address form (or select from saved addresses)
- Fields: Full name, phone, street, city, state, postal code, country
- Save address option (for logged-in users)
- Address validation
- Default address selection

**Step 2: Shipping Method**
- Display available shipping options
- Standard shipping (5-7 days) - Free over KES 5,000
- Express shipping (2-3 days) - KES 500
- Same-day delivery (Nairobi only) - KES 1,000
- Calculate shipping cost based on address and cart total

**Step 3: Order Review**
- Display all cart items with quantities
- Show shipping address
- Show shipping method and cost
- Display order summary:
  - Subtotal
  - Shipping cost
  - Tax (16% VAT in Kenya)
  - Total
- Edit buttons to go back to previous steps
- Terms & conditions checkbox
- Proceed to payment button

### Implementation Details

**Components:**
- `CheckoutPage` - Main checkout container
- `CheckoutStepper` - Progress indicator (1/3, 2/3, 3/3)
- `ShippingForm` - Address input form
- `ShippingMethodSelector` - Shipping options
- `OrderReview` - Final review before payment
- `OrderSummary` - Reusable summary component

**State Management:**
- Use React state or Zustand for checkout state
- Store: shipping address, shipping method, order notes
- Validate each step before proceeding
- Persist checkout state in sessionStorage

**Database:**
- Save addresses to `addresses` table (for logged-in users)
- Create draft order in `orders` table with status PENDING

---

## M3.3 - Payment Integrations (Stripe + Pesapal/M-Pesa, Escrow, Webhooks)

### Payment Methods

**1. Stripe (International Cards)**
- Stripe Checkout integration
- Support for Visa, Mastercard, Amex
- 3D Secure authentication
- Webhook for payment confirmation

**2. Pesapal (Kenyan Payments)**
- Pesapal IPN integration
- Support for M-Pesa, Airtel Money, cards
- Redirect flow
- IPN callback for payment confirmation

**3. M-Pesa Direct (Future Enhancement)**
- Daraja API integration
- STK Push for seamless payments
- Callback handling

### Payment Flow

**Step 1: Payment Method Selection**
- Display payment options:
  - Credit/Debit Card (Stripe)
  - M-Pesa (Pesapal)
  - Other mobile money (Pesapal)
- Show payment method logos
- Security badges

**Step 2: Payment Processing**
- **Stripe:**
  - Create Stripe Checkout session
  - Redirect to Stripe hosted page
  - Handle success/cancel redirects
- **Pesapal:**
  - Create Pesapal transaction
  - Redirect to Pesapal payment page
  - Handle IPN callback

**Step 3: Payment Confirmation**
- Webhook receives payment status
- Update order status to CONFIRMED
- Update payment record
- Release escrow (after delivery confirmation in future phase)
- Send confirmation email
- Clear cart
- Redirect to order confirmation page

### Escrow Implementation

**Escrow Flow:**
1. Payment received → Held in escrow (`isEscrow = true`)
2. Order shipped → Escrow still held
3. Order delivered → Release escrow after 7 days or customer confirmation
4. Vendor receives payout

**Database:**
- `payments` table tracks escrow status
- `releasedAt` field for escrow release timestamp
- `payouts` table for vendor payouts (Phase M4)

### Webhook Handling

**Stripe Webhook:**
- Endpoint: `/api/webhooks/stripe`
- Events: `checkout.session.completed`, `payment_intent.succeeded`
- Verify signature
- Update order and payment status

**Pesapal IPN:**
- Endpoint: `/api/webhooks/pesapal`
- Verify transaction status
- Update order and payment status

### Security Considerations

- Store API keys in environment variables
- Verify webhook signatures
- Use HTTPS for all payment pages
- PCI DSS compliance (Stripe handles this)
- Never store card details
- Implement CSRF protection
- Rate limiting on payment endpoints

---

## Database Schema Usage

### Orders Table
```typescript
{
  id, orderNumber, userId, vendorId,
  shippingAddressId, shippingMethod, shippingCost, trackingNumber,
  subtotal, tax, discount, total, currency,
  status: PENDING → CONFIRMED → PROCESSING → SHIPPED → DELIVERED,
  notes, createdAt, updatedAt, confirmedAt
}
```

### OrderItems Table
```typescript
{
  id, orderId, productId,
  quantity, price, variant
}
```

### Payments Table
```typescript
{
  id, orderId,
  amount, currency, method, status,
  transactionId, gatewayResponse,
  isEscrow, releasedAt,
  createdAt, updatedAt, completedAt
}
```

### Addresses Table
```typescript
{
  id, userId,
  label, street, city, state, country, postalCode, isDefault
}
```

---

## API Endpoints to Create

### Cart
- Already handled client-side with Zustand

### Checkout
- `POST /api/checkout/validate-cart` - Validate cart items (stock, prices)
- `POST /api/checkout/create-order` - Create pending order
- `POST /api/checkout/calculate-shipping` - Calculate shipping cost

### Payments
- `POST /api/payments/stripe/create-session` - Create Stripe Checkout session
- `POST /api/payments/pesapal/initiate` - Initiate Pesapal payment
- `POST /api/webhooks/stripe` - Stripe webhook handler
- `POST /api/webhooks/pesapal` - Pesapal IPN handler

---

## Environment Variables Needed

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Pesapal
PESAPAL_CONSUMER_KEY=...
PESAPAL_CONSUMER_SECRET=...
PESAPAL_IPN_URL=https://yourdomain.com/api/webhooks/pesapal

# App URLs
NEXT_PUBLIC_MAIN_APP_URL=http://localhost:3000
```

---

## Success Criteria

**M3.1:**
- [ ] Cart page displays all items correctly
- [ ] Quantity updates work
- [ ] Remove items works
- [ ] Cart persists across sessions
- [ ] Stock validation implemented
- [ ] Price change detection works

**M3.2:**
- [ ] Shipping form validates correctly
- [ ] Saved addresses load (for logged-in users)
- [ ] Shipping methods display with costs
- [ ] Order review shows all details
- [ ] Order created in database with PENDING status
- [ ] Checkout state persists across page refreshes

**M3.3:**
- [ ] Stripe Checkout integration works
- [ ] Pesapal integration works
- [ ] Webhooks update order status
- [ ] Payment records created correctly
- [ ] Escrow flag set on payments
- [ ] Success page shows order confirmation
- [ ] Cart clears after successful payment
- [ ] Email confirmation sent (future)

---

## Testing Plan

1. **Cart Testing:**
   - Add products to cart
   - Update quantities
   - Remove items
   - Verify persistence

2. **Checkout Testing:**
   - Complete shipping form
   - Select shipping method
   - Review order details
   - Verify order creation

3. **Payment Testing:**
   - **Stripe:** Use test card `4242 4242 4242 4242`
   - **Pesapal:** Use sandbox environment
   - Test successful payments
   - Test failed payments
   - Test webhook handling

4. **Edge Cases:**
   - Out of stock products
   - Price changes
   - Expired sessions
   - Network failures
   - Webhook retries

---

## Timeline Estimate

- **M3.1:** 3-4 hours
- **M3.2:** 4-5 hours
- **M3.3:** 6-8 hours (payment integrations are complex)
- **Testing:** 3-4 hours
- **Total:** 16-21 hours

---

## Next Steps

1. Enhance cart store and build cart page
2. Implement checkout flow (3 steps)
3. Integrate Stripe Checkout
4. Integrate Pesapal
5. Set up webhook handlers
6. Test end-to-end payment flows
7. Update documentation
8. Commit to main branch
