# The Bazaar — Admin Flow (End-to-End)

This defines how administrators, moderators, and platform operators manage the entire multi-portal ecosystem.

1. Admin Authentication & Role Control

Admin enters the Admin Portal /admin.

1.1 Login

• Email + password
• MFA code required
• Device fingerprint check
• Admin session starts with higher-security token

1.2 Role-Based Access View

Based on assigned role:
• Super Admin
• Compliance Officer
• Vendor Manager
• Operations Manager
• Finance Admin
• Support Lead
• Content Moderator
• DevOps/Tech Ops

Each role unlocks only the relevant control panels.

2. System Dashboard Overview

Dashboard broadcasts global status indicators:

• Live users
• Active vendors
• Orders in pipelines
• System health
• Fraud alerts
• Compliance flags
• Revenue for the day
• Support ticket backlog
• Marketplace performance metrics

This is the command center.

3. Vendor Management

Admins manage the vendor ecosystem.

3.1 Vendor Review & Approval

When vendors submit onboarding documents:

System flags for review:
• Business registration
• KRA PIN verification
• Bank details
• High-risk category compliance

Admin actions:
• Approve
• Reject with reason
• Request more documents

3.2 Vendor Monitoring

Admins track:
• SKU count
• Return rate
• Dispute rate
• Performance score
• Policy violations
• Fake product flags

Actions include warnings, suspensions, and permanent bans.

4. User Management

Admins maintain safe customer activity.

• Review suspicious accounts
• Enforce ban or unban
• Reset user accounts
• Fraud investigation (multi-accounting, chargebacks)
• View purchase history only when needed (compliance rules apply)

5. Product & Content Moderation

Admin reviews all new product listings and edits.

5.1 Product Approval Workflow

AI + human hybrid moderation checks for:
• Restricted items
• Counterfeit risks
• Nudity/violence rules
• Inaccurate descriptions
• Misleading pricing

Admin actions:
• Approve
• Reject
• Disable existing listing
• Send compliance warnings

5.2 Content Audits

For images, bios, store descriptions, reviews.
Admins moderate:
• Fake reviews
• Abusive content
• Vendor misrepresentation

6. Order & Fulfillment Oversight

Admin monitors end-to-end commerce operations.

6.1 Order Pipelines

Track all states:
• Pending
• Processing
• Preparing
• Shipped
• Delivered
• Returned
• Refunded

Admins can intervene to:
• Force refunds
• Adjust orders
• Reverse dispatch errors
• Override stuck orders

7. Returns & Dispute Arbitration

Admins serve as final arbiters.

7.1 Return Requests

Admin reviews:
• Return reason
• Images provided
• Vendor’s response
• Customer history

Admin actions:
• Approve refund
• Reject refund
• Escalate to senior compliance
• Penalize vendor if at fault

7.2 Dispute Adjudication

Admins resolve disputes involving:
• Wrong item sent
• Fake items
• Non-delivery
• Conflicting evidence

8. Financial Operations

Admins run the financial engine of the marketplace.

8.1 Vendor Payout Management

Admins validate:
• Completed orders
• Chargebacks
• Commission rates
• Vendor earnings
• Tax compliance

They can:
• Trigger payouts
• Block payouts
• Adjust statements
• Audit anomalies

8.2 Platform Financial Reporting

• Daily revenue
• Transaction fees
• Commissions
• Vendor earnings
• Refund liabilities
• Operational cost breakdown

9. Platform Compliance & Risk Management

Admins uphold marketplace integrity.

9.1 Compliance Enforcement

• Detect illegal items
• Track suspicious vendor activity
• Validate KYC/KYB
• Policy violation handling
• Country regulations compliance

9.2 Fraud Detection

Admin investigates automated AI alerts for:
• Card fraud
• Multi-account fraud
• Stolen goods
• Price manipulation
• Review farming

Actions:
• Freeze vendor account
• Escalate case
• Blacklist user/vendor

10. Support Management

Admins oversee customer and vendor support tickets.

10.1 Support Ticket Routing

Tickets categorized into:
• Orders
• Payments
• Returns
• Technical
• Vendor issues
• Account issues

10.2 Ticket Resolution

Admin actions:
• Respond
• Escalate
• Close
• Refund or adjust order

11. Campaigns & Marketplace Operations

Admins drive platform growth.

11.1 Promotions

Configure marketplace-wide promotions:
• Discount campaigns
• Seasonal sales
• Vendor-specific promotions

11.2 Merchandising

Admins update:
• Homepage banners
• Featured vendor slots
• Trending product sections
• Algorithm feed overrides

12. System Configurations & Tech Ops

Super Admin and Tech Ops manage underlying systems.

12.1 Feature Toggles

Enable/disable platform modules without redeployments.

12.2 Environment Settings

• Payment gateway keys
• Email/SMS configurations
• CDN endpoints
• Fulfillment center configurations

12.3 Logs & Monitoring

Admins access:
• Error logs
• API logs
• Performance dashboards
• System alerts

13. Audit Logs

Every admin action is logged:
• Who performed it
• What changed
• Timestamp
• IP/device metadata

Mandatory for compliance and internal investigations.

14. Admin Offboarding

When an admin leaves:
• Revoke access
• Transfer responsibilities
• Archive admin history
• Lock account