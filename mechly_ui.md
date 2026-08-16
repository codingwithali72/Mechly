# MECHLY
# UI / UX SCREEN MAP — MVP

Version: 1.0
Platform: Responsive Web App / PWA
Primary focus: Mobile-first
Demo geography: Mumbai + Navi Mumbai

==================================================
1. UI/UX OBJECTIVE
==================================================

The Mechly MVP should feel like a real consumer marketplace.

The experience should be:

Fast
Simple
Trustworthy
Professional
Mobile-first
Easy to understand

The customer should be able to request a mechanic with minimal friction.

The mechanic should be able to accept and manage jobs quickly.

The admin should be able to monitor the marketplace.

Do not overload screens with unnecessary information.

==================================================
2. APPLICATION STRUCTURE
==================================================

One application.

Role-based experience:

CUSTOMER
MECHANIC
ADMIN

After authentication, the user is routed according to role.

Customer:
Customer Home

Mechanic:
Mechanic Dashboard

Admin:
Admin Dashboard

==================================================
3. GLOBAL DESIGN LANGUAGE
==================================================

Visual direction:

Clean
Modern
Professional
Trustworthy
Automotive
Minimal

Avoid:

Excessive gradients
Excessive animations
Overly futuristic AI styling
Cluttered cards
Too many colors
Unnecessary decorative elements

Primary UI should prioritize:

CTA clarity
Readable typography
Strong spacing
Clear status
Trust indicators

==================================================
4. CUSTOMER NAVIGATION
==================================================

Bottom navigation:

Home
Bookings
Vehicles
Profile

Primary CTA:

Get a Mechanic

Customer navigation:

Home
→ Get a Mechanic
→ Select Vehicle
→ Select Service
→ Describe Problem
→ Location
→ Time
→ Mechanic Selection
→ Booking Confirmation
→ Booking Tracking
→ Inspection
→ Estimate
→ Approval
→ Repair
→ Payment
→ Rating
→ Service History

==================================================
5. CUSTOMER — AUTHENTICATION
==================================================

SCREEN:

Customer Login

Elements:

Mechly logo

Phone number

[ Continue ]

OTP screen:

Enter OTP

[ Verify ]

Optional:

Resend OTP

Keep authentication simple.

Do not ask for vehicle information during login.

==================================================
6. CUSTOMER — HOME
==================================================

SCREEN:

Home

Header:

"Hi, [Name]"

Location:

Mumbai / Navi Mumbai area

Main CTA:

[ Get a Mechanic ]

Headline:

"Vehicle trouble?
We'll bring the mechanic to you."

Service shortcuts:

General Repair
Battery
Puncture
Brake
Tyre
Electrical

Vehicle section:

"My Vehicles"

Vehicle cards:

Honda Activa 6G
Honda City

Recent booking:

"Your recent service"

Bottom navigation:

Home
Bookings
Vehicles
Profile

==================================================
7. CUSTOMER — VEHICLE LIST
==================================================

SCREEN:

My Vehicles

Show:

Vehicle cards

Each card:

Vehicle type icon
Brand
Model
Year if available
Nickname if available

CTA:

[ + Add Vehicle ]

==================================================
8. CUSTOMER — ADD VEHICLE
==================================================

SCREEN:

Add Vehicle

Step 1:

"What do you drive?"

Motorcycle
Scooter
Car

Step 2:

"Select brand"

Step 3:

"Select model"

Optional:

Year
Registration number
Fuel type

CTA:

[ Save Vehicle ]

Important:

Do not force registration number.

Do not force fuel type.

Do not create unnecessary friction.

==================================================
9. CUSTOMER — SERVICE SELECTION
==================================================

SCREEN:

What do you need help with?

Service cards:

General Repair
Bike Service
Car Service
Battery
Puncture
Brake
Tyre
Electrical
Engine
Oil Change
Chain / Transmission
Emergency Assistance
Other

Each card:

Icon
Name
Short description

==================================================
10. CUSTOMER — PROBLEM DESCRIPTION
==================================================

SCREEN:

Tell us what's wrong.

Text input:

"Describe the problem..."

Quick selections:

Bike won't start
Battery dead
Flat tyre
Strange noise
Brake problem
Engine issue
Other

Optional:

[ 🎤 Describe by voice ]

AI assistance:

"Mechly can help categorize the issue."

CTA:

[ Continue ]

==================================================
11. CUSTOMER — AI TRIAGE
==================================================

SCREEN:

Understanding your problem

AI displays:

Likely category
Suggested mechanic skill

Example:

"Your description sounds like a battery/electrical issue."

"Recommended mechanic:

Battery + Electrical"

CTA:

[ Continue ]

Secondary:

[ Change manually ]

AI must not claim final diagnosis.

==================================================
12. CUSTOMER — LOCATION
==================================================

SCREEN:

Where should the mechanic come?

Options:

[ Use Current Location ]

[ Search Location ]

[ Select on Map ]

Display:

Address
Area
City

CTA:

[ Confirm Location ]

==================================================
13. CUSTOMER — TIME
==================================================

SCREEN:

When do you need help?

Options:

Today

10–12
12–2
2–4
4–6
6–8

Tomorrow

10–12
12–2
2–4
4–6
6–8

CTA:

[ Continue ]

==================================================
14. CUSTOMER — BOOKING SUMMARY
==================================================

SCREEN:

Review your request

Vehicle:
Honda Activa 6G

Problem:
Bike won't start

Service:
Battery

Location:
Kharghar

Time:
Today, 4–6 PM

Visit charge:

₹500

Information:

"Final repair cost may change after inspection."

"Additional work requires your approval."

CTA:

[ Confirm Booking ]

==================================================
15. CUSTOMER — SEARCHING
==================================================

SCREEN:

Finding a mechanic...

Animation:

Searching nearby mechanics

Display:

Service
Location
Time

Possible message:

"Finding the best available mechanic near you."

==================================================
16. CUSTOMER — MECHANIC SELECTION
==================================================

SCREEN:

Choose your mechanic

Mechanic cards:

Photo
Name
Verified badge
Rating
Completed jobs
Experience
Distance
ETA
Skills
Visit charge

Examples:

Ahmed
✓ Verified
4.8 ★
127 jobs
1.2 km
18 min

Ravi
✓ Verified
4.7 ★
84 jobs
2.1 km
24 min

Filters:

Fastest
Top Rated
Closest

CTA:

[ Select ]

Optional:

[ Let Mechly Choose ]

==================================================
17. CUSTOMER — BOOKING CONFIRMED
==================================================

SCREEN:

Booking confirmed

Success state.

Display:

Mechanic
Name
Rating
ETA

Booking ID:

BOOK-20260816-0001

Vehicle

Service

Location

Time

CTA:

[ Track Mechanic ]

==================================================
18. CUSTOMER — ACTIVE BOOKING
==================================================

SCREEN:

Track Booking

Top:

Booking status

Example:

"Ahmed is on the way"

ETA:

18 min

Mechanic card:

Photo
Name
Rating
Verified
Skills

Location section:

Map

Booking details:

Booking ID
Vehicle
Problem
Service

Actions:

[ Call ]
[ Message ]

For MVP:

ETA may be simulated.

==================================================
19. CUSTOMER — MECHANIC ARRIVED
==================================================

Status:

"Your mechanic has arrived."

Display:

Mechanic information

CTA:

[ Start Inspection ]

This action may be controlled by mechanic status.

==================================================
20. CUSTOMER — INSPECTION
==================================================

SCREEN:

Vehicle inspection

Display:

"Mechanic is checking your vehicle."

Possible information:

Inspection notes
Photos
Current status

Wait state:

"Your mechanic will provide an estimate shortly."

==================================================
21. CUSTOMER — ESTIMATE
==================================================

SCREEN:

Repair estimate

Example:

Inspection:

Battery issue

Recommended work:

Battery replacement

Parts:
₹1,200

Labour:
₹200

Total:
₹1,400

If additional work:

"Additional work requested"

CTA:

[ Review & Approve ]

==================================================
22. CUSTOMER — ADDITIONAL WORK APPROVAL
==================================================

SCREEN:

Additional work

Example:

Brake pad replacement

Part:
₹150

Labour:
₹100

Additional:
₹250

Photo:

[ View ]

Message:

"This work was not included in your original request."

Actions:

[ Approve ₹250 ]

[ Reject ]

Customer must explicitly approve.

==================================================
23. CUSTOMER — REPAIR IN PROGRESS
==================================================

SCREEN:

Repair in progress

Status:

"Ahmed is working on your vehicle."

Display:

Approved work

Current work

Possible progress indicator.

==================================================
24. CUSTOMER — JOB COMPLETED
==================================================

SCREEN:

Service completed

Display:

Work completed

Parts

Labour

Final amount

Job summary

CTA:

[ View Job Card ]

CTA:

[ Pay ₹750 ]

==================================================
25. CUSTOMER — PAYMENT
==================================================

SCREEN:

Payment

Service:

₹500

Additional work:

₹250

Total:

₹750

Payment methods:

UPI
Card
Cash

CTA:

[ Pay ₹750 ]

If cash:

"Pay the mechanic directly."

MVP may use test/sandbox payment.

==================================================
26. CUSTOMER — PAYMENT SUCCESS
==================================================

SCREEN:

Payment successful

Display:

Amount
Payment method
Booking ID

CTA:

[ View Invoice ]

CTA:

[ View Job Card ]

==================================================
27. CUSTOMER — RATING
==================================================

SCREEN:

How was your experience?

Mechanic:

Ahmed

Rating:

☆ ☆ ☆ ☆ ☆

Optional review:

"Tell us about your experience."

CTA:

[ Submit Rating ]

==================================================
28. CUSTOMER — BOOKING HISTORY
==================================================

SCREEN:

My Bookings

Tabs:

Active
Completed
Cancelled

Booking card:

Vehicle
Service
Mechanic
Date
Amount
Status

CTA:

[ View Details ]

==================================================
29. CUSTOMER — SERVICE HISTORY
==================================================

SCREEN:

Vehicle History

Vehicle:

Honda Activa 6G

Timeline:

12 Aug
Battery replacement
Ahmed
₹1,400

04 Jul
General service
Ravi
₹700

Actions:

[ View Job Card ]

[ Book Again ]

==================================================
30. CUSTOMER — REBOOK
==================================================

SCREEN:

Book again

Previous mechanic:

Ahmed
4.8 ★

Actions:

[ Book Ahmed ]

[ Find another mechanic ]

==================================================
31. CUSTOMER — PROFILE
==================================================

SCREEN:

Profile

Name
Phone
Email

Sections:

My Vehicles
My Bookings
Service History
Payments
Help
Terms
Privacy
Logout

==================================================
32. MECHANIC NAVIGATION
==================================================

Bottom navigation:

Dashboard
Jobs
Availability
Earnings
Profile

==================================================
33. MECHANIC — LOGIN
==================================================

SCREEN:

Mechanic Login

Phone

OTP

[ Continue ]

After authentication:

Mechanic Dashboard

==================================================
34. MECHANIC — DASHBOARD
==================================================

Header:

"Good morning, Ahmed"

Availability toggle:

OFFLINE / ONLINE

When ONLINE:

"You're available for new jobs."

Statistics:

Today's Jobs
Today's Earnings
Rating

Incoming job preview.

==================================================
35. MECHANIC — ONLINE STATE
==================================================

Large toggle:

ONLINE

Message:

"You are available to receive nearby jobs."

Display:

Service area
Current status
Jobs today

==================================================
36. MECHANIC — OFFLINE STATE
==================================================

Toggle:

OFFLINE

Message:

"You won't receive new job requests."

==================================================
37. MECHANIC — JOB REQUEST
==================================================

SCREEN:

New job request

Vehicle:
Honda Activa 6G

Problem:
Bike won't start

Service:
Battery

Location:
Kharghar

Distance:
1.2 km

Scheduled:
4–6 PM

Visit charge:
₹500

Buttons:

[ ACCEPT ]
[ DECLINE ]

==================================================
38. MECHANIC — JOB DETAILS
==================================================

SCREEN:

Job details

Customer:
Demo Customer

Vehicle:
Honda Activa 6G

Problem:

"Bike won't start."

Location:

Kharghar

Service:

Battery

Booking ID:

BOOK-20260816-0001

CTA:

[ Accept Job ]

==================================================
39. MECHANIC — ACCEPTED JOB
==================================================

Status:

ACCEPTED

Actions:

[ Start Journey ]

[ Call Customer ]

[ Message Customer ]

==================================================
40. MECHANIC — ON THE WAY
==================================================

Status:

ON THE WAY

Display:

Customer location
Distance
ETA

CTA:

[ I've Arrived ]

MVP may use external navigation.

==================================================
41. MECHANIC — ARRIVED
==================================================

Status:

ARRIVED

CTA:

[ Start Inspection ]

==================================================
42. MECHANIC — INSPECTION
==================================================

SCREEN:

Vehicle inspection

Fields:

Problem found
Notes

Photo upload:

Before
Inspection

Voice input:

[ 🎤 Add notes ]

CTA:

[ Create Estimate ]

==================================================
43. MECHANIC — CREATE ESTIMATE
==================================================

SCREEN:

Create estimate

Items:

Part
Quantity
Price

Labour
Price

Service
Price

Buttons:

[ + Add Item ]

Total:

₹750

CTA:

[ Send Estimate ]

==================================================
44. MECHANIC — WAITING FOR APPROVAL
==================================================

SCREEN:

Waiting for customer

Message:

"Estimate sent to customer."

Status:

Awaiting approval

Estimate:

₹750

Do not allow mechanic to perform additional unapproved work.

==================================================
45. MECHANIC — APPROVAL RECEIVED
==================================================

SCREEN:

Approved

Display:

Customer approved:

₹750

CTA:

[ Start Repair ]

==================================================
46. MECHANIC — REPAIR IN PROGRESS
==================================================

SCREEN:

Repair in progress

Display:

Approved work

Parts

Labour

Actions:

[ Add Work Note ]

[ Upload Photo ]

[ Complete Job ]

==================================================
47. MECHANIC — COMPLETE JOB
==================================================

SCREEN:

Complete job

Required:

Problem found
Work performed

Parts used

Labour

Final amount

Optional:

After photos

CTA:

[ Complete Job ]

==================================================
48. MECHANIC — JOB COMPLETED
==================================================

Display:

Job completed

Booking ID

Final amount

Customer payment status

CTA:

[ View Job Card ]

==================================================
49. MECHANIC — JOB HISTORY
==================================================

SCREEN:

Jobs

Tabs:

Today
Upcoming
Completed

Each card:

Customer
Vehicle
Service
Date
Amount
Status

==================================================
50. MECHANIC — EARNINGS
==================================================

SCREEN:

Earnings

Today

Jobs:
4

Gross:
₹3,000

Mechly commission:
₹450

Estimated earnings:
₹2,550

This is demo data in MVP.

==================================================
51. MECHANIC — AVAILABILITY
==================================================

SCREEN:

Availability

Online/offline

Service radius:

5 km

Service areas:

Kharghar
Belapur
Nerul

Working hours:

10 AM – 8 PM

==================================================
52. MECHANIC — PROFILE
==================================================

SCREEN:

Profile

Photo

Name

Experience

Skills

Rating

Completed jobs

Verification:

✓ Verified

Sections:

Skills
Service Areas
Availability
Earnings
Help
Logout

==================================================
53. ADMIN NAVIGATION
==================================================

Sidebar:

Dashboard
Bookings
Customers
Mechanics
Services
Payments
Disputes
Demo Data
Settings

==================================================
54. ADMIN — DASHBOARD
==================================================

SCREEN:

Overview

Metrics:

Customers
Mechanics
Active Bookings
Completed Jobs
GMV
Platform Revenue

Charts:

Bookings
Revenue
Services

All demo metrics must be identified as demo data.

==================================================
55. ADMIN — BOOKINGS
==================================================

SCREEN:

Bookings

Filters:

Status
Date
City
Service
Mechanic

Table:

Booking ID
Customer
Vehicle
Mechanic
Service
Amount
Status
Date

Click:

[ View ]

==================================================
56. ADMIN — BOOKING DETAILS
==================================================

Display:

Booking information

Customer

Vehicle

Mechanic

Location

Timeline

Estimate

Approval

Job card

Payment

Commission

Dispute

==================================================
57. ADMIN — MECHANICS
==================================================

SCREEN:

Mechanics

Filters:

Verified
Pending
Suspended
Online
Offline

Mechanic card/table:

Name
Rating
Jobs
Area
Status
Verification

Actions:

View
Verify
Suspend

==================================================
58. ADMIN — CUSTOMERS
==================================================

SCREEN:

Customers

Display:

Name
Phone
Vehicles
Bookings
Status
Created date

==================================================
59. ADMIN — PAYMENTS
==================================================

SCREEN:

Payments

Display:

Booking
Customer
Mechanic
Amount
Method
Status
Platform commission

Filters:

UPI
Card
Cash
Pending
Paid
Failed

==================================================
60. ADMIN — DISPUTES
==================================================

SCREEN:

Disputes

Display:

Booking
Raised by
Category
Status
Date

Actions:

View
Review
Resolve

==================================================
61. ADMIN — DEMO DATA
==================================================

SCREEN:

Demo Control

Actions:

Seed Demo Data
Reset Demo Data
Clear Demo Bookings
Simulate Mechanic Acceptance
Simulate Arrival
Simulate Completion

Display:

DEMO MODE

This section exists to make the competition demonstration reliable.

==================================================
62. GLOBAL STATES
==================================================

Every major screen must support:

Loading
Success
Error
Empty
Unauthorized

Examples:

Loading:

"Finding mechanics..."

Empty:

"No mechanics are currently available."

Error:

"Something went wrong. Try again."

==================================================
63. CUSTOMER CORE FLOW
==================================================

LOGIN
↓
HOME
↓
SELECT VEHICLE
↓
SELECT SERVICE
↓
DESCRIBE PROBLEM
↓
AI TRIAGE
↓
LOCATION
↓
TIME
↓
BOOKING SUMMARY
↓
SEARCHING
↓
MECHANIC SELECTION
↓
BOOKING CONFIRMED
↓
TRACKING
↓
ARRIVAL
↓
INSPECTION
↓
ESTIMATE
↓
APPROVAL
↓
REPAIR
↓
COMPLETION
↓
PAYMENT
↓
RATING
↓
SERVICE HISTORY

==================================================
64. MECHANIC CORE FLOW
==================================================

LOGIN
↓
DASHBOARD
↓
ONLINE
↓
JOB REQUEST
↓
ACCEPT
↓
JOB DETAILS
↓
ON THE WAY
↓
ARRIVED
↓
INSPECTION
↓
CREATE ESTIMATE
↓
WAIT FOR APPROVAL
↓
APPROVED
↓
REPAIR
↓
COMPLETE
↓
PAYMENT STATUS
↓
JOB HISTORY
↓
EARNINGS

==================================================
65. ADMIN CORE FLOW
==================================================

LOGIN
↓
DASHBOARD
↓
BOOKINGS
↓
BOOKING DETAILS
↓
CUSTOMER / MECHANIC
↓
PAYMENT
↓
COMMISSION
↓
DISPUTE

==================================================
66. RESPONSIVE BEHAVIOR
==================================================

Mobile:

Bottom navigation.

Tablet:

Expanded navigation.

Desktop:

Sidebar navigation.

Customer booking flow remains mobile-first.

Mechanic workflow remains mobile-first.

Admin dashboard is desktop-first but must remain responsive.

==================================================
67. COMPONENTS
==================================================

Create reusable components:

AppShell
BottomNavigation
Sidebar
Header
Button
Input
Select
Modal
Toast
StatusBadge
VehicleCard
ServiceCard
MechanicCard
BookingCard
BookingTimeline
EstimateCard
EstimateItem
PaymentCard
RatingCard
NotificationItem
EmptyState
LoadingState
ErrorState
MapPanel
PhotoUploader

==================================================
68. DESIGN PRIORITY
==================================================

Priority order:

1. Usability
2. Clarity
3. Trust
4. Speed
5. Visual polish
6. Animation

Never sacrifice usability for visual effects.

==================================================
69. MVP DEMO PRIORITY
==================================================

The most important demo journey is:

Customer:

"I need my bike repaired."

↓
Select vehicle

↓
Describe problem

↓
Find mechanic

↓
Select mechanic

↓
Book

↓
Mechanic accepts

↓
Mechanic arrives

↓
Inspection

↓
Additional work

↓
Customer approves

↓
Repair completed

↓
Payment

↓
Rating

This journey must be extremely polished.

==================================================
70. FINAL UI/UX PRINCIPLE
==================================================

The application should make the value proposition obvious within seconds:

"I have a vehicle problem."

↓

"Mechly finds a mechanic."

↓

"The mechanic comes to me."

↓

"I know what I'm approving."

↓

"The repair is documented."

↓

"I pay."

↓

"I can book again."

That is the core Mechly experience.