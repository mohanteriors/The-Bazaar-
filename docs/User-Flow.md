# The Bazaar – User Flow (End-to-End)
1. Overview

This document outlines the complete end-to-end flow for a consumer using The Bazaar. It covers onboarding, browsing, purchasing, wallet interactions, order lifecycle, dispute management, and account management.

The goal is to provide a structured, implementation-ready blueprint for both frontend and backend teams.

2. Global Flow Structure

Entry → Landing Page

Onboarding → Sign Up / Login

User Identity → Profile Completion

Discovery → Home Feed → Category → Product Page

Conversion → Cart → Checkout → Payment

Post-Purchase → Order Tracking → Delivery Confirmation

Post-Delivery → Rating, Review, Refund Request (if applicable)

Retention → Notifications → Saved Items → Referral Program

Account Management → Settings, Security, Wallet, Addresses

3. Detailed User Flow
3.1. Entry Flow

User types URL / opens app → Landing Page

The landing page provides:

Search bar

Featured products

Categories

Login / Sign Up CTA

App overview

Decision Point:

User browses anonymously

User creates an account or logs in

3.2. Onboarding Flow
A. Sign Up

User selects “Sign Up”

Provides:

Email or phone

Password

Receives verification code

Verification completes

System redirects to profile completion

B. Login

User enters existing credentials

Optional: Two-step verification

User enters dashboard/home

3.3. Profile Setup Flow

User asked to complete profile:

Full name

Gender (optional)

Address

Phone number

Optional:

Add profile photo

Add default delivery address

Enable notifications

User redirected to Home

3.4. Discovery & Browsing Flow
Home Page

Personalized product feed

Categories

Trending / recommended items

Featured vendors

Promotional banners

Possible actions:

Use search

Open category

Open product page

Save item

Add to cart

Category Flow

User clicks category

Views list of products

Can filter/sort by:

Price

Rating

Delivery speed

Vendor score

Selects a product

Product Page Flow

User enters product page

Views:

Images

Description

Specifications

Price

Stock

Vendor rating

Return policy

Possible actions:

Add to cart

Buy now

Save for later

Ask vendor question

View similar items

3.5. Cart → Checkout Flow
A. Cart

User reviews cart items

Edits quantity

Removes items

Proceeds to checkout

B. Checkout

Delivery address selection

Delivery method selection

Order summary shown

Choose payment method:

Wallet

Card

Transfer

Confirmation screen

3.6. Payment Flow

User selects payment method

System verifies payment

If payment fails:

User returns to checkout to retry

If payment succeeds:

System generates order

Notification sent

Vendor notified

User redirected to Order Details page

3.7. Order Lifecycle Flow
Order Statuses

Pending Vendor Confirmation

Vendor Accepted

Processing

Ready for Dispatch

In Transit

Out for Delivery

Delivered

Completed

User Interactions

Real-time tracking

Chat with vendor (if enabled)

Cancel order (limited to early stages)

Raise complaint

3.8. Delivery Confirmation Flow

Courier marks delivered

User receives delivery confirmation request

User confirms delivery

Order marked “Completed”

User prompted to:

Rate product

Rate vendor

Write review

3.9. Refund & Dispute Flow
Refund / Return

User opens order

Selects “Request Refund” or “Open Dispute”

Uploads evidence (photos/video)

System reviews rules:

Eligibility window

Product category rules

Case is forwarded to vendor

Vendor responds

If unresolved:

Admin arbitration

Refund approved or rejected

User receives wallet refund

3.10. Wallet Flow
Wallet Funding

User adds money via card/transfer

Wallet Spending

User pays for order

System deducts wallet balance

Wallet Refunds

Refunds returned to wallet

User can withdraw balance

3.11. Notifications Flow

User receives:

Order status updates

Promotions

Delivery updates

Refund decisions

Security alerts

Channels:

In-app

SMS

Email

3.12. Saved Items / Wishlist Flow

User clicks “Save item”

Item added to “Saved Items” page

User can:

Move to cart

Remove

View price change alerts

3.13. Account Management Flow

User can manage:

Profile

Addresses

Payment methods

Wallet

Security (password, 2FA)

Notification settings

Order history

4. End-to-End Summary

The user flow moves through a predictable and structured lifecycle:

Entering → Browsing → Purchasing → Receiving → Reviewing → Returning (optional) → Managing Account

This document provides the core blueprint required to build the user-facing portal of The Bazaar in a consistent and predictable manner.