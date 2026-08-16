# MECHLY
# PRODUCT REQUIREMENTS DOCUMENT — MVP

Version: 1.0
Status: Development Specification
Product: Mechly
Platform: Responsive Web Application / PWA
Primary Demo Geography: Mumbai + Navi Mumbai
Initial Vehicle Focus: Two-wheelers, expandable to cars
Development Environment: Google Antigravity
Development Team: 1–2 developers

==================================================
1. PRODUCT OVERVIEW
==================================================

Mechly is a vehicle repair and roadside-service marketplace.

The core concept:

Vehicle owner has a repair/service problem
        ↓
Customer opens Mechly
        ↓
Customer selects vehicle + problem + location + time
        ↓
Mechly finds suitable available mechanics
        ↓
Mechanic accepts the job
        ↓
Mechanic travels to customer
        ↓
Mechanic inspects vehicle
        ↓
Mechanic provides estimate
        ↓
Customer approves/rejects additional work
        ↓
Mechanic performs repair
        ↓
Customer pays
        ↓
Digital job card is generated
        ↓
Customer rates mechanic
        ↓
Customer can book same mechanic again

Mechly does NOT initially employ its own mechanics.

The intended marketplace model is to enable existing mechanics/garages to use their available capacity to earn additional income through Mechly.

==================================================
2. MVP PURPOSE
==================================================

The MVP is primarily intended for:

1. Shark Tank-style college competition demonstration.
2. Demonstrating the marketplace concept.
3. Demonstrating customer value.
4. Demonstrating mechanic value.
5. Demonstrating the complete transaction lifecycle.
6. Demonstrating transparent pricing.
7. Demonstrating additional-work approval.
8. Demonstrating digital service history.
9. Demonstrating the potential business model.
10. Creating a technical foundation that can later become a real product.

The MVP does NOT need to represent actual live Mumbai-wide supply.

Demo/seed data is permitted.

However:

DEMO DATA MUST NEVER BE PRESENTED AS REAL CUSTOMERS,
REAL MECHANICS, OR REAL TRANSACTIONS.

The interface should clearly support a DEMO MODE.

==================================================
3. MVP PRINCIPLE
==================================================

Build a realistic product experience.

Do not build unnecessary production complexity.

The MVP should feel like:

A real consumer marketplace
+
A real mechanic workflow
+
A real admin operation system.

It should NOT feel like:

A static website
+
fake buttons
+
screenshots pretending to be functionality.

Important actions must actually work within the MVP.

==================================================
4. MVP GEOGRAPHY
==================================================

The interface should support:

Mumbai
Navi Mumbai

Example areas:

MUMBAI:
Andheri
Bandra
Borivali
Goregaon
Malad
Powai
Kurla
Ghatkopar
Dadar
Thane
Mulund

NAVI MUMBAI:
Kharghar
Belapur
Nerul
Seawoods
Vashi
Airoli
Panvel
Sanpada
Kopar Khairane

The architecture must support adding additional cities/areas later.

The MVP may use seeded mechanics in these locations for demonstration.

Demo availability must be clearly marked internally as DEMO DATA.

==================================================
5. USER TYPES
==================================================

There are three logical roles.

1. CUSTOMER
2. MECHANIC
3. ADMIN

The MVP uses one application with role-based experiences.

Future production architecture may split:

Customer App
Mechanic App
Admin/Garage Dashboard

The backend should not depend on having separate frontend applications.

==================================================
6. CUSTOMER VALUE PROPOSITION
==================================================

Customer does not need to:

Visit a garage
Wait for hours
Call multiple mechanics
Explain the problem repeatedly
Negotiate blindly
Guess the final price

Instead:

"Tell Mechly what's wrong.
We'll connect you with a nearby mechanic who can come to you."

==================================================
7. MECHANIC VALUE PROPOSITION
==================================================

Existing mechanics can:

Register on Mechly
Choose when they are available
Choose their service area
Receive nearby jobs
Accept jobs they want
Earn additional income
Build ratings
Track completed work

The mechanic is not required to remain online continuously.

Availability is controlled by the mechanic.

==================================================
8. CUSTOMER REGISTRATION
==================================================

Customer registration must have minimal friction.

Required:

Phone number
OTP
Name

Optional:

Email
Profile photo

Do NOT require:

Vehicle registration number
Fuel type
Full address
Aadhaar
Unnecessary demographic information

The user should be able to reach the booking flow quickly.

==================================================
9. CUSTOMER ID
==================================================

Customer ID is generated server-side.

Example:

CUS-000001

Customer never manually enters the ID.

The ID is used internally for database relationships.

==================================================
10. VEHICLE REGISTRATION
==================================================

Vehicle onboarding must be extremely low friction.

Step 1:

"What do you drive?"

Options:

Motorcycle
Scooter
Car

Step 2:

Select brand.

Step 3:

Select model.

Required:

Vehicle type
Brand
Model

Optional:

Year
Registration number
Fuel type

The user must be able to continue without knowing:

Fuel type
Registration number
Exact year

The purpose is to get the customer to the booking flow quickly.

==================================================
11. VEHICLE ID
==================================================

Each vehicle receives:

VEH-000001

Relationship:

Customer
   ↓
Vehicle

A customer may have multiple vehicles.

==================================================
12. CUSTOMER HOME
==================================================

Home screen should immediately show:

MECHLY

"Vehicle repair, at your doorstep."

Primary CTA:

[ GET A MECHANIC ]

Secondary service categories:

Repair
Service
Battery
Puncture
Electrical
Brake
Tyre
Oil Change
Other

Vehicle section:

"My Vehicles"

Recent booking section:

"Your Activity"

==================================================
13. SERVICE CATEGORIES
==================================================

MVP categories:

1. General Repair
2. Bike Service
3. Car Service
4. Battery
5. Puncture
6. Brake
7. Tyre
8. Electrical
9. Engine
10. Oil Change
11. Chain / Transmission
12. Emergency Assistance
13. Other

Emergency Assistance may be displayed for the demo,
but the MVP's primary flow should demonstrate scheduled service.

==================================================
14. PROBLEM DESCRIPTION
==================================================

Customer can describe the issue.

Example:

"My bike is not starting."

Input methods:

Text
Optional voice

The customer should also see common problem selections.

Example:

[ Bike won't start ]

[ Strange noise ]

[ Battery dead ]

[ Flat tyre ]

[ Brake issue ]

[ Other ]

==================================================
15. AI TRIAGE
==================================================

AI is an assistant.

AI is NOT the mechanic.

AI may:

Classify problem
Ask basic clarification questions
Suggest likely service category
Suggest mechanic skill requirement
Structure the customer's description

Example:

Customer:

"My Activa starts but switches off after a few minutes."

AI:

"Does it restart immediately after switching off?"

Customer:

"No."

AI classification:

Category:
Engine / Electrical

Required skill:

General mechanic

The final diagnosis belongs to the mechanic.

If AI fails:

Customer can manually select the category.

==================================================
16. CUSTOMER LOCATION
==================================================

Customer can:

1. Use current location.
2. Search for location.
3. Select location on map.
4. Enter address manually.

Booking stores:

latitude
longitude
address
area
city

For the MVP, Google Maps may be used.

==================================================
17. CUSTOMER SERVICE TIME
==================================================

MVP prioritizes scheduled services.

Available demo slots:

Today:
10–12
12–2
2–4
4–6
6–8

Tomorrow:
10–12
12–2
2–4
4–6
6–8

Future production may add real-time emergency dispatch.

==================================================
18. BOOKING SUMMARY
==================================================

Before confirmation:

Vehicle:
Honda Activa 6G

Problem:
Bike won't start

Location:
Kharghar

Time:
Today, 4–6 PM

Estimated visit/service charge:
₹500

Important message:

"Final repair cost may change after inspection.
Additional work requires your approval."

CTA:

[ CONFIRM BOOKING ]

==================================================
19. BOOKING ID
==================================================

Every booking receives a unique server-generated ID.

Example:

BOOK-20260816-0001

Booking ID is displayed in:

Booking confirmation
Booking details
Job card
Invoice
Admin dashboard
Customer service history

==================================================
20. MECHANIC REGISTRATION
==================================================

Mechanic selects:

"I am a mechanic"

Required:

Name
Phone
Experience
Skills
Service categories
Service radius
Availability

For the competition MVP:

Admin verification can be manually approved.

Future production:

Identity/KYC/business verification must be implemented appropriately.

==================================================
21. MECHANIC ID
==================================================

Server-generated:

MEC-000001

==================================================
22. MECHANIC PROFILE
==================================================

Display:

Profile photo
Name
Verification status
Rating
Completed jobs
Experience
Skills
Service area
Availability

Example:

Ahmed

✓ Verified

4.8 ★

127 completed jobs

4 years experience

Two-wheeler
Battery
Electrical
Brake

If using demo data:

"Demo mechanic" must be identifiable internally and not represented as a real individual.

==================================================
23. MECHANIC AVAILABILITY
==================================================

Mechanic controls:

ONLINE
OFFLINE

When ONLINE:

Eligible for matching.

When OFFLINE:

No new requests.

Mechanic can optionally specify:

Working hours
Service radius
Preferred categories

==================================================
24. MATCHING
==================================================

MVP matching algorithm:

Filter:

verified
online
available
skill compatible
within service radius
not currently assigned

Rank:

1. Distance
2. Skill compatibility
3. Rating
4. Completed jobs

For demo mode:

Seeded mechanics can be returned based on the selected area.

Example:

Customer selects:

Kharghar

System shows:

Ahmed
1.2 km
4.8 ★
ETA 18 min

Ravi
2.1 km
4.7 ★
ETA 24 min

Demo data may be used.

==================================================
25. CUSTOMER MECHANIC SELECTION
==================================================

Customer may:

Choose a mechanic

OR

Allow Mechly to automatically assign one.

MVP should support both.

Customer-facing text:

"Recommended mechanic"

"Fastest arrival"

"Top rated"

==================================================
26. MECHANIC JOB REQUEST
==================================================

Mechanic sees:

NEW JOB

Vehicle:
Honda Activa 6G

Problem:
Bike won't start

Distance:
1.2 km

Location:
Kharghar

Scheduled:
4–6 PM

Visit charge:
₹500

Buttons:

[ ACCEPT ]
[ DECLINE ]

==================================================
27. BOOKING LIFECYCLE
==================================================

Valid states:

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

Alternative states:

DECLINED
CANCELLED
EXPIRED
DISPUTED

The backend controls valid transitions.

==================================================
28. CUSTOMER TRACKING
==================================================

After acceptance:

Customer sees:

Mechanic name
Photo
Rating
Verification
ETA
Status
Booking ID

Example:

"Ahmed is on the way."

ETA:
18 minutes

MVP may use simulated/demo ETA.

Production will use real location services.

==================================================
29. MECHANIC ARRIVAL
==================================================

Mechanic action:

[ ARRIVED ]

Customer receives:

"Your mechanic has arrived."

Booking:

ARRIVED

==================================================
30. INSPECTION
==================================================

Mechanic starts:

[ START INSPECTION ]

Mechanic records:

Problem found
Notes
Photos
Recommended work
Parts
Labour

==================================================
31. DIGITAL JOB CARD
==================================================

Job card contains:

Booking ID
Customer
Vehicle
Mechanic
Problem
Inspection notes
Photos
Recommended work
Approved work
Parts
Labour
Final amount
Payment
Date

==================================================
32. ESTIMATE
==================================================

Initial booking amount:

₹500

After inspection:

Brake pad:
Parts ₹150
Labour ₹100

Additional:
₹250

Final estimated total:

₹750

==================================================
33. ADDITIONAL WORK APPROVAL
==================================================

Additional work MUST NOT be silently added.

Mechanic submits:

Additional work request

Customer sees:

Brake pad replacement

Part:
₹150

Labour:
₹100

Additional:
₹250

Photos:

[ VIEW PHOTOS ]

Actions:

[ APPROVE ₹250 ]

[ REJECT ]

==================================================
34. APPROVAL RECORD
==================================================

Backend stores:

estimate_id
booking_id
approved_by
approved_at
approved_amount
approval_status

Possible statuses:

PENDING
APPROVED
REJECTED
EXPIRED

==================================================
35. REPAIR
==================================================

Once approved:

Booking:

IN_PROGRESS

Mechanic performs work.

Mechanic may update:

Work performed
Parts used
Photos

==================================================
36. JOB COMPLETION
==================================================

Mechanic selects:

[ COMPLETE JOB ]

Required:

Final work summary
Final amount
Parts
Labour

Optional:

Final photos

Booking:

COMPLETED

==================================================
37. CUSTOMER PAYMENT
==================================================

Customer sees:

SERVICE SUMMARY

Visit:
₹500

Brake pad:
₹150

Labour:
₹100

TOTAL:
₹750

CTA:

[ PAY ₹750 ]

MVP may use test payment/sandbox integration.

==================================================
38. PAYMENT METHODS
==================================================

MVP UI can support:

UPI
Card
Cash

For competition:

Online payment may operate in sandbox/test mode.

Cash may be represented as:

CASH PAYMENT

The system must distinguish:

PAID ONLINE
CASH PENDING
CASH CONFIRMED

==================================================
39. COMMISSION
==================================================

Example:

Final job:
₹750

Platform commission:
15%

Mechly:
₹112.50

Mechanic/provider:
₹637.50

Commission must be calculated server-side.

The UI should display commission in the mechanic/admin experience,
not necessarily to the customer.

==================================================
40. PAYMENT LEDGER
==================================================

Each transaction records:

payment_id
booking_id
amount
payment_method
payment_status
commission
provider_amount
created_at

Future production integration can use a marketplace payment system.

==================================================
41. CASH LEAKAGE
==================================================

MVP cannot completely prevent cash leakage.

The system should record:

cash collected
provider amount
commission owed

Future production strategy may include:

digital-first payments
provider wallet
commission settlement
marketplace payment splitting
incentives

Do not pretend the MVP has solved this completely.

==================================================
42. CUSTOMER SERVICE HISTORY
==================================================

Customer sees:

Vehicle

Service history:

Date
Service
Mechanic
Amount
Job card
Invoice

Example:

12 Aug
Brake Service
Ahmed
₹750

==================================================
43. BOOK AGAIN
==================================================

Customer sees:

"Need help again?"

Previous mechanic:

Ahmed
4.8 ★

Actions:

[ BOOK AGAIN ]

[ FIND ANOTHER MECHANIC ]

This supports retention.

==================================================
44. RATINGS
==================================================

Customer rates mechanic:

1–5 stars

Optional review.

Mechanic can rate customer.

Ratings only allowed for completed bookings.

==================================================
45. NOTIFICATIONS
==================================================

Events:

Booking confirmed
Mechanic assigned
Mechanic accepted
Mechanic on the way
Mechanic arrived
Estimate created
Approval required
Approval received
Job completed
Payment required
Payment successful
Rating requested

==================================================
46. ADMIN DASHBOARD
==================================================

Admin dashboard should show:

Customers
Mechanics
Bookings
Active jobs
Completed jobs
Payments
Revenue
Commission
Disputes
Ratings

Demo dashboard may contain seeded demo metrics.

Example:

Customers:
1,248

Mechanics:
86

Active bookings:
17

Completed:
932

GMV:
₹8,42,500

Platform earnings:
₹1,26,375

All seeded data must be clearly demo data.

==================================================
47. ADMIN BOOKING MANAGEMENT
==================================================

Admin can:

View booking
View customer
View mechanic
View vehicle
View status timeline
View estimate
View payment
View commission
View job photos
View dispute

==================================================
48. ADMIN MECHANIC MANAGEMENT
==================================================

Admin can:

View mechanic
Approve
Reject
Suspend
View rating
View jobs
View earnings
View service areas

==================================================
49. ADMIN CUSTOMER MANAGEMENT
==================================================

Admin can:

View customer
View vehicles
View bookings
View service history
View disputes

==================================================
50. DISPUTES
==================================================

Customer can raise:

Incorrect charge
Poor repair
Incomplete work
Vehicle damage
Other

Admin sees:

Booking
Customer
Mechanic
Estimate
Job card
Photos
Payment
Timeline

MVP uses manual dispute handling.

==================================================
51. AI FEATURES
==================================================

Only useful AI features.

AI 1:
Customer problem triage.

AI 2:
Mechanic voice-to-job-card.

AI 3:
Optional invoice/receipt extraction.

AI must not:

Make final diagnosis
Set final repair price
Approve repairs
Approve payments
Override mechanic decisions

==================================================
52. DEMO DATA SYSTEM
==================================================

The MVP may contain seeded data.

Example mechanic records:

Demo Mechanic 01
Demo Mechanic 02
Demo Mechanic 03

Example customer records:

Demo Customer 01

Example bookings:

Demo Booking 001

The database should contain:

is_demo = true

for seeded demo records.

The application must never represent demo records as actual verified people.

==================================================
53. DEMO MODE
==================================================

Admin may enable:

DEMO_MODE

Demo mode can provide:

Seeded mechanics
Seeded ratings
Seeded bookings
Seeded service history
Simulated ETA
Simulated availability
Test payments

The interface may show:

"Demo Mode"

where appropriate.

==================================================
54. REAL-WORLD EXTENSION
==================================================

The architecture must later support:

Real mechanics
Real availability
Real GPS
Real payments
Real payment splitting
Real KYC
Real customer accounts
Real notifications
Real service history
Real cities
Real garages

But these are not required for the competition MVP.

==================================================
55. CUSTOMER EXPERIENCE PRINCIPLE
==================================================

Minimize friction.

Ideal flow:

Login
→ Vehicle
→ Problem
→ Location
→ Time
→ Confirm

Do not force:

registration number
fuel type
full address
email
unnecessary profile information

before booking.

==================================================
56. MECHANIC EXPERIENCE PRINCIPLE
==================================================

Mechanic workflow must be optimized for speed.

Mechanic should be able to:

Go online
→ receive request
→ accept
→ navigate
→ arrive
→ inspect
→ create estimate
→ complete
→ view earnings

Avoid unnecessary typing.

Voice input can be used for job cards.

==================================================
57. DESIGN PRINCIPLE
==================================================

Visual style:

Professional
Modern
Clean
Trustworthy
Mobile-first

Avoid:

Excessive gradients
Excessive animations
Over-designed dashboards
Fake futuristic AI visuals
Too many colors
Unnecessary cards

The product should feel like a serious service marketplace.

==================================================
58. RESPONSIVE DESIGN
==================================================

Must work on:

360px
390px
414px
768px
1024px
1440px+

Primary design target:

Mobile.

==================================================
59. MVP NON-GOALS
==================================================

Do NOT build:

Full Garage OS
Garage inventory
Advanced fleet management
Subscription
Loyalty
Advanced AI diagnostics
AI mechanic
EV diagnostics
Dynamic pricing
Advanced dispatch AI
Internal navigation
Multi-city backend optimization
Native iOS
Native Android
Complex wallet
Automated cash recovery
Spare-parts marketplace

==================================================
60. FINAL MVP TEST
==================================================

The following complete journey must work:

Customer login
→ add vehicle
→ select service
→ describe problem
→ select location
→ select time
→ create booking
→ mechanic receives request
→ mechanic accepts
→ customer sees mechanic
→ mechanic arrives
→ inspection
→ estimate
→ customer approval
→ additional work
→ completion
→ payment
→ rating
→ service history
→ rebooking

If this journey works reliably,
the MVP is considered functionally complete.