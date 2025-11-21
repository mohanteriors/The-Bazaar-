# The Bazaar — Vendor Flow (End-to-End)

This is the authoritative operational flow for all vendor interactions inside the platform.

1. Vendor Onboarding

The platform treats onboarding as a friction-managed funnel that validates, verifies, and operationalizes new vendors.

1.1 Vendor Visits Vendor Portal

• The vendor lands on /vendor/register
• They see core value propositions and compliance requirements
• Registration begins

1.2 Account Creation

• They submit email, phone number, password
• System triggers email + SMS verification
• Vendor account enters Pending Verification state

1.3 Business Verification

The vendor provides:
• Business name, registration number, KRA PIN
• Business type (SME, individual seller, corporate)
• Physical address
• Fulfillment capability (self-fulfillment vs. Bazaar Fulfilled model)
• Bank details for payouts

System actions:
• Validate business info
• Trigger KYC/KYB checks
• Flag anomalies for manual review

Once validated, the account moves to Verified Vendor state.

2. Vendor Dashboard Initialization

After verification, the system auto-creates the vendor’s operational workspace:

• Product Catalog (initially empty)
• Orders Module
• Inventory Module
• Finance & Payout Module
• Storefront Settings
• Analytics Module

Each module is dormant until the vendor completes onboarding requirements.

3. Store Setup

Vendor completes store configurations:

3.1 Store Profile

• Logo
• Cover image
• Store bio
• Customer support contacts
• Fulfillment policy
• Return policy

System validates uploaded assets and activates the storefront at:
/store/<vendorSlug>

3.2 Compliance Setup

• Accept platform terms
• Accept commission structure
• Provide ID for owner identity verification

Once confirmed, vendor transitions to Store Ready state.

4. Product Listing

Vendor creates their inventory pipeline.

4.1 Add Product

Vendor provides:
• Title
• Category
• Description
• Images
• Variants (size, color, custom attributes)
• SKU
• Price
• Stock levels
• Fulfillment settings

System actions:
• Auto-compress images
• Auto-generate SEO metadata
• Run compliance checks (restricted items)
• Flag violations

Upon approval, product moves from Pending → Active status.

5. Inventory & Pricing Management

Vendor manages active catalog:

• Adjust stock
• Modify pricing
• Bulk import/export SKUs
• Enable/disable products
• Monitor low-stock alerts

System triggers:
• Real-time sync to main marketplace
• SKU-level analytics updates

6. Customer Orders

Vendor enters order lifecycle operations.

6.1 New Order Received

System sends:
• Email notification
• SMS notification
• Dashboard alert

Order status becomes Processing.

6.2 Vendor Confirms Order

Vendor chooses:
• Accept order
• Reject (with mandatory reason)

If accepted → order moves to Preparing
If rejected → system auto-refunds customer

6.3 Packaging & Fulfillment

Depending on model:

Self Fulfilled:
• Vendor packages item
• Prints shipping label
• Courier pickup scheduled

Bazaar Fulfilled:
• Vendor drops item at fulfillment center
• Bazaar handles packing, dispatch, tracking

6.4 Dispatch

Courier marks order as Shipped.

System:
• Updates customer
• Updates delivery ETA
• Activates tracking page

7. Delivery Lifecycle

Courier delivers the product →
Order becomes Delivered.

System triggers countdown for:
• Return window
• Payout eligibility

8. Returns & Disputes

If a customer initiates a return:

8.1 Return Request Processing

Customer chooses reason:
• Defective
• Not as described
• Wrong item
• Changed mind

Vendor receives ticket → Accept or challenge.
Platform mediates when needed.

8.2 Resolution

• If approved → product returned → refund processed
• If denied → case escalates

Vendor’s dispute resolution score updates automatically.

9. Finance & Payouts

Once order is outside the dispute window:

9.1 Earnings Settlement

Platform computes:
• Order value
• Commission
• Transaction fees
• Vendor net payout

Vendor receives:
• Detailed financial statement
• Payout schedule

9.2 Payout Release

Funds deposited into vendor’s bank/Mpesa.
System logs payout in Finance Module.

10. Analytics & Growth

Vendor accesses operational intelligence:

• Weekly sales
• SKU performance
• Abandoned carts related to their products
• Customer satisfaction trends
• Return rate analysis
• Benchmarking vs. category competitors

This data feeds into vendor success recommendations:
• Pricing optimizations
• Inventory forecasting
• Listing quality improvements

11. Vendor Support Lifecycle

Vendor can open tickets for:
• Technical issues
• Payout issues
• Product compliance questions
• Store suspension appeals

Support intake → Routing → Resolution SLAs.

12. Vendor Offboarding (If Needed)

Vendor requests account closure or system enforces compliance removal.

System steps:
• Freeze storefront
• Process pending orders
• Release final payouts
• Archive reports
• Revoke access