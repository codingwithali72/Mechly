# MECHLY
# ENGINEERING RULES

Version: 1.0

These rules are mandatory for all AI-assisted development.

==================================================
1. GENERAL RULE
==================================================

Build the simplest implementation that satisfies the PRD.

Do not invent features.

Do not expand scope without approval.

Do not optimize for code volume.

Optimize for:

Correctness
Reliability
Maintainability
Security
UX

==================================================
2. TECHNOLOGY
==================================================

Use:

Next.js
TypeScript
Tailwind CSS
shadcn/ui where useful
Supabase
PostgreSQL
Supabase Auth
Supabase Storage
Supabase Realtime when required
Google Maps where required
Razorpay where required
OpenAI API for approved AI features

Do not introduce additional frameworks without justification.

==================================================
3. ONE APPLICATION
==================================================

MVP uses one application.

Roles:

CUSTOMER
MECHANIC
ADMIN

The frontend experience changes based on role.

Backend architecture must remain role-independent.

Future applications may split:

Customer App
Mechanic App
Admin App

==================================================
4. TYPESCRIPT
==================================================

Use TypeScript.

Avoid:

any

unless absolutely necessary.

Do not use:

@ts-ignore

without documented reason.

Do not suppress TypeScript errors to make builds pass.

==================================================
5. DATABASE SOURCE OF TRUTH
==================================================

The database is authoritative for:

Users
Vehicles
Bookings
Statuses
Estimates
Approvals
Payments
Ratings
Service history

Frontend state is never authoritative.

==================================================
6. SERVER-SIDE AUTHORITY
==================================================

Never trust:

price
commission
role
booking ownership
payment success
approval
mechanic assignment

from the frontend.

Critical values must be validated server-side.

==================================================
7. USER ROLES
==================================================

CUSTOMER

Can:

Manage own profile
Manage own vehicles
Create bookings
View own bookings
Approve own estimates
Pay own bookings
Rate completed jobs

MECHANIC

Can:

Manage own profile
Set availability
Receive eligible jobs
Accept/decline jobs
Update assigned jobs
Create estimates
Upload job photos
Complete jobs
View own earnings

ADMIN

Can:

Manage users
Manage mechanics
Manage bookings
Review disputes
View platform metrics
Manage demo data

==================================================
8. AUTHENTICATION
==================================================

Use Supabase Auth.

Preferred customer authentication:

Phone + OTP.

Do not manually implement password storage.

Do not expose authentication secrets.

==================================================
9. AUTHORIZATION
==================================================

Authentication:

Who are you?

Authorization:

What are you allowed to do?

Both must be enforced.

Never trust:

role = "admin"

sent by the browser.

Verify the role server-side.

==================================================
10. ROW LEVEL SECURITY
==================================================

Use Supabase/PostgreSQL Row Level Security.

Customer:

Only own data.

Mechanic:

Only own permitted data.

Admin:

Privileged access.

Do not disable RLS merely because development is difficult.

==================================================
11. CUSTOMER PRIVACY
==================================================

Do not expose unnecessary:

Phone numbers
Exact addresses
Vehicle information
Private records

Only reveal required information for an active booking.

==================================================
12. MECHANIC PRIVACY
==================================================

Never expose to customers:

KYC
Bank details
Private documents
Private earnings

Customer may see:

Name
Photo
Rating
Experience
Skills
Verification status
Relevant service information

==================================================
13. VEHICLE ONBOARDING
==================================================

Required:

Vehicle type
Brand
Model

Optional:

Year
Registration number
Fuel type

Do not force optional vehicle data.

Do not prevent booking because fuel type is unknown.

==================================================
14. CUSTOMER FRICTION
==================================================

Before making a field required ask:

"Can the customer complete the booking without this?"

If yes:

Make optional.

==================================================
15. IDS
==================================================

Server generates:

CUS-XXXXXX
MEC-XXXXXX
VEH-XXXXXX
BOOK-YYYYMMDD-XXXX

Never use frontend-generated IDs as authoritative IDs.

==================================================
16. BOOKING STATE MACHINE
==================================================

Allowed:

REQUESTED
SEARCHING
ACCEPTED
ON_THE_WAY
ARRIVED
INSPECTION
ESTIMATE_CREATED
AWAITING_CUSTOMER_APPROVAL
APPROVED
IN_PROGRESS
COMPLETED
PAYMENT_PENDING
PAID
CLOSED

Alternative:

DECLINED
CANCELLED
EXPIRED
DISPUTED

No arbitrary transitions.

==================================================
17. BOOKING CONCURRENCY
==================================================

Two mechanics must never successfully accept the same job.

Use server/database-level protection.

The first valid assignment wins.

All subsequent attempts receive:

"Job no longer available."

==================================================
18. MATCHING
==================================================

MVP:

verified
online
available
skill compatible
within radius
not busy

Rank:

distance
skill
rating
completed jobs

Do not build advanced AI dispatch for MVP.

==================================================
19. DEMO MATCHING
==================================================

If DEMO_MODE=true:

Seeded demo mechanics may be returned.

The system must still follow:

location
service
availability
rating

logic.

Demo records must contain:

is_demo=true

==================================================
20. LOCATION
==================================================

Validate latitude and longitude.

Do not blindly trust client coordinates.

Do not store location unnecessarily.

==================================================
21. ETA
==================================================

Production:

Use maps/distance APIs.

Demo:

May simulate ETA.

Never present simulated ETA as actual GPS data.

==================================================
22. PRICE
==================================================

Prices are calculated server-side.

Frontend cannot decide the final price.

Example:

Visit charge
+
approved additional work
=
final amount

==================================================
23. ESTIMATES
==================================================

Every estimate contains:

estimate_id
booking_id
items
labour
parts
total
status
created_at

==================================================
24. ADDITIONAL WORK
==================================================

Additional work requires customer approval.

Mechanic cannot silently add charges.

Every additional item must be recorded.

==================================================
25. APPROVAL
==================================================

Store:

approved_by
approved_at
approved_amount
approval_status

Never infer approval from:

button click
frontend state
screen navigation

The backend must record it.

==================================================
26. PAYMENT
==================================================

Possible statuses:

PENDING
PROCESSING
PAID
FAILED
REFUNDED
CASH_PENDING
CASH_CONFIRMED

Do not mark payment successful without valid confirmation.

==================================================
27. DEMO PAYMENT
==================================================

Demo payments may use:

test mode
mock payment state

Demo payments must not accidentally process real money.

Demo transaction records should contain:

is_demo=true

==================================================
28. COMMISSION
==================================================

Commission calculated server-side.

Example:

Amount:
₹750

Commission:
15%

Platform:
₹112.50

Provider:
₹637.50

Store the calculated values in a ledger.

Historical transactions must not change when commission settings change.

==================================================
29. CASH
==================================================

Cash is not automatically settled.

Record:

amount
payment method
cash status
provider confirmation
commission owed

Do not claim automated cash reconciliation exists unless actually implemented.

==================================================
30. JOB CARD
==================================================

Job cards must preserve historical information.

Do not silently rewrite completed work.

Changes must be recorded.

==================================================
31. SERVICE HISTORY
==================================================

Completed jobs create service history.

Service history remains available after completion.

==================================================
32. RATINGS
==================================================

Only completed bookings can be rated.

Prevent:

duplicate ratings
ratings on another user's booking
ratings before completion

==================================================
33. NOTIFICATIONS
==================================================

Notifications correspond to actual events.

Do not create fake status notifications for real transactions.

Demo mode may simulate events.

==================================================
34. AI
==================================================

AI assists.

AI does not control the business.

AI may:

classify
summarize
extract
transcribe
suggest

AI must NOT:

finalize diagnosis
set final price
approve repairs
approve payments
override mechanic
override customer

==================================================
35. AI FALLBACK
==================================================

Every AI feature requires manual fallback.

AI unavailable:

Manual input.

Voice transcription fails:

Text input.

==================================================
36. API KEYS
==================================================

Never expose:

Supabase service key
OpenAI secret key
Razorpay secret key
private Google credentials

to the client.

Use environment variables.

==================================================
37. ENVIRONMENT VARIABLES
==================================================

Use:

.env.local

Never commit secrets.

Provide:

.env.example

with variable names only.

==================================================
38. DATABASE MIGRATIONS
==================================================

Database changes must be reproducible.

Use migrations.

Do not make undocumented manual schema changes.

==================================================
39. CODE ORGANIZATION
==================================================

Separate:

UI
business logic
database access
validation
API handlers
types

Do not put all logic inside React components.

==================================================
40. COMPONENTS
==================================================

Build reusable components.

Examples:

Button
Input
Modal
Card
StatusBadge
BookingCard
MechanicCard
VehicleCard
EstimateCard

Do not duplicate identical UI logic.

==================================================
41. DESIGN SYSTEM
==================================================

Use consistent:

Typography
Spacing
Buttons
Inputs
Cards
Badges
Modals
Icons

Do not invent a new style on every page.

==================================================
42. RESPONSIVE DESIGN
==================================================

Test:

360
390
414
768
1024
1440

Mobile-first.

==================================================
43. ACCESSIBILITY
==================================================

Use:

Semantic HTML
Labels
Keyboard accessibility
Focus states
Proper contrast

Do not rely solely on color.

==================================================
44. LOADING STATES
==================================================

Every async operation needs loading feedback.

Examples:

Booking
Payment
Upload
Estimate
Assignment

Prevent duplicate actions.

==================================================
45. ERROR STATES
==================================================

Every async operation needs error handling.

Provide:

Clear message
Retry
Recovery action

Never expose stack traces.

==================================================
46. EMPTY STATES
==================================================

Every list needs a meaningful empty state.

Example:

"No active bookings."

"No mechanics available."

"No service history yet."

==================================================
47. NETWORK FAILURE
==================================================

Handle temporary failures.

Never assume:

"button clicked = operation succeeded."

Wait for server response.

==================================================
48. DUPLICATE ACTIONS
==================================================

Prevent:

Double booking
Double payment
Double approval
Double rating
Double job completion

Use backend idempotency where appropriate.

==================================================
49. SECURITY
==================================================

Test:

Customer cannot access another customer.

Mechanic cannot access another mechanic's private data.

Customer cannot modify payment.

Mechanic cannot modify commission.

Customer cannot complete mechanic operations.

==================================================
50. DEMO DATA
==================================================

Demo data is allowed.

Every demo record must have:

is_demo=true

Do not mix demo and production data.

Admin must be able to identify demo records.

==================================================
51. DEMO MODE
==================================================

DEMO_MODE=true

may enable:

Seeded mechanics
Seeded customers
Seeded bookings
Seeded ratings
Simulated ETA
Test payment
Simulated availability

Do not represent demo data as genuine users.

==================================================
52. DEMO DATA QUALITY
==================================================

Seed realistic data.

Examples:

Mechanic ratings:
4.6–4.9

Completed jobs:
20–500

Service categories:
appropriate

Locations:
real Mumbai/Navi Mumbai areas

But names should be clearly fictional/demo identities.

==================================================
53. ADMIN DEMO CONTROLS
==================================================

Admin may:

Reset demo state
Seed demo data
Clear demo bookings
Simulate mechanic acceptance
Simulate arrival
Simulate completion
Reset payment

This makes the competition demo reliable.

==================================================
54. NO FAKE BACKEND
==================================================

Do not create UI-only flows where buttons simply navigate to another screen.

Important operations must persist to the database.

Example:

Confirm booking

must actually create:

booking record
booking ID
status
customer relationship
vehicle relationship

==================================================
55. NO PLACEHOLDER SUCCESS
==================================================

Do not display:

"Payment successful"

unless payment state actually indicates success.

Do not display:

"Mechanic accepted"

unless the mechanic assignment exists.

Demo mode is the exception,
but demo state must be explicitly controlled.

==================================================
56. MAPS
==================================================

Do not build navigation.

Use map service for:

Location selection
Distance
ETA where available

Mechanic can open external navigation.

==================================================
57. REALTIME
==================================================

Use realtime only where useful.

Good candidates:

Booking status
Mechanic assignment
Estimate approval
Availability

Do not make every database table realtime.

==================================================
58. PERFORMANCE
==================================================

Avoid:

Unnecessary API calls
Repeated queries
Large client bundles
Unoptimized images
Unnecessary realtime connections

==================================================
59. DATABASE QUERIES
==================================================

Fetch only necessary fields.

Use indexes for:

booking_id
customer_id
mechanic_id
vehicle_id
status
location-related queries where appropriate

==================================================
60. NO UNNECESSARY LIBRARIES
==================================================

Before adding a library ask:

"Can the existing stack solve this?"

If yes:

Do not add another dependency.

==================================================
61. NO UNNECESSARY REFACTORING
==================================================

When adding a feature:

Modify only necessary code.

Do not rewrite unrelated functionality.

==================================================
62. EXISTING CODE FIRST
==================================================

Before changing a file:

Inspect it.

Understand dependencies.

Understand current behavior.

Then modify.

==================================================
63. TESTING
==================================================

Every major feature must be tested.

Test:

Happy path
Invalid input
Unauthorized access
Network failure
Duplicate action
Mobile layout
Empty state

==================================================
64. END-TO-END TEST
==================================================

The complete test:

Customer login
→ vehicle
→ service
→ problem
→ location
→ schedule
→ booking
→ mechanic receives
→ mechanic accepts
→ customer sees
→ mechanic arrives
→ inspection
→ estimate
→ customer approval
→ repair
→ completion
→ payment
→ rating
→ history
→ rebook

This is the primary MVP acceptance test.

==================================================
65. GIT
==================================================

Use Git.

Small commits.

Examples:

feat: add customer authentication

feat: add vehicle management

feat: implement booking state machine

feat: add mechanic job acceptance

fix: prevent duplicate booking assignment

==================================================
66. DOCUMENTATION
==================================================

Maintain:

README.md
MECHLY_PRD.md
MECHLY_ENGINEERING_RULES.md
database migrations
.env.example

==================================================
67. AI CODING WORKFLOW
==================================================

Antigravity must NOT be instructed:

"Build the entire Mechly app."

Instead:

Understand PRD
→ inspect repository
→ plan feature
→ implement feature
→ run tests
→ inspect result
→ fix errors
→ report changes

One feature at a time.

==================================================
68. FEATURE ACCEPTANCE CRITERIA
==================================================

Every feature must define:

What it does
What data it creates
Who can access it
What happens on failure
How it is tested

==================================================
69. SCOPE CONTROL
==================================================

If a requested feature is outside the PRD:

Do not automatically implement it.

Report:

Feature requested:
X

PRD status:
Outside current MVP

Reason:
Y

Recommendation:
Build now / defer

Wait for explicit approval.

==================================================
70. FINAL ENGINEERING PRINCIPLE
==================================================

The goal is not:

"Build the biggest app."

The goal is:

"Build a believable, polished, functional demonstration of the Mechly marketplace."

The complete core transaction must work.

Customer:
"I need my vehicle repaired."

Mechly:
"Here is a suitable mechanic."

Mechanic:
"I'll take the job."

Customer:
"Approve this repair."

Mechanic:
"Repair completed."

Customer:
"Pay."

Mechly:
"Transaction recorded."

That is the MVP.