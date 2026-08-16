# MECHLY
# DATABASE SCHEMA — MVP

Version: 1.0
Database: PostgreSQL
Backend: Supabase

==================================================
1. DATABASE OBJECTIVE
==================================================

The database must support the complete Mechly MVP lifecycle:

Customer
→ Vehicle
→ Service Request
→ Booking
→ Mechanic Assignment
→ Mechanic Arrival
→ Inspection
→ Estimate
→ Customer Approval
→ Repair
→ Job Completion
→ Payment
→ Commission
→ Rating
→ Service History

The schema must also support:

- Customer role
- Mechanic role
- Admin role
- Demo mode
- Mumbai + Navi Mumbai locations
- Multiple vehicles per customer
- Multiple bookings per vehicle
- Multiple mechanics
- Mechanic availability
- Estimates with multiple line items
- Customer approval of additional work
- Online/cash payment states
- Commission ledger
- Ratings
- Notifications
- Disputes
- Job photos
- Booking status history

==================================================
2. DATABASE DESIGN PRINCIPLES
==================================================

1. PostgreSQL is the source of truth.

2. All important relationships use foreign keys.

3. Important identifiers are generated server-side.

4. Customer data must be isolated from other customers.

5. Mechanic private information must not be exposed to customers.

6. Completed transactions must preserve historical information.

7. Financial records must not be silently overwritten.

8. Demo data must be distinguishable from real data.

9. Booking state changes must be recorded.

10. The schema should remain simple enough for an MVP.

==================================================
3. HIGH-LEVEL ENTITY RELATIONSHIP
==================================================

AUTH USER
    │
    └── PROFILE
          │
          ├── CUSTOMER
          │      │
          │      └── VEHICLES
          │              │
          │              └── BOOKINGS
          │                     │
          │                     ├── MECHANIC
          │                     ├── ESTIMATES
          │                     │      └── ESTIMATE ITEMS
          │                     │
          │                     ├── JOB CARD
          │                     │      └── JOB PHOTOS
          │                     │
          │                     ├── PAYMENT
          │                     ├── COMMISSION LEDGER
          │                     ├── RATING
          │                     ├── DISPUTE
          │                     └── STATUS HISTORY
          │
          └── MECHANIC
                 │
                 ├── SKILLS
                 ├── AVAILABILITY
                 └── BOOKINGS

==================================================
4. TABLE: PROFILES
==================================================

Purpose:

Central user profile linked to Supabase Auth.

Table:

profiles

Columns:

id
UUID
PRIMARY KEY
References auth.users(id)

role
ENUM:
CUSTOMER
MECHANIC
ADMIN

full_name
TEXT
NOT NULL

phone
TEXT

email
TEXT

avatar_url
TEXT

is_active
BOOLEAN
DEFAULT TRUE

is_demo
BOOLEAN
DEFAULT FALSE

created_at
TIMESTAMPTZ
DEFAULT NOW()

updated_at
TIMESTAMPTZ
DEFAULT NOW()

Rules:

- One profile per authenticated user.
- Role must be controlled server-side.
- Customer and mechanic-specific information belongs in their respective tables.
- Do not store passwords.

==================================================
5. TABLE: CUSTOMERS
==================================================

Purpose:

Customer-specific information.

Table:

customers

Columns:

id
UUID
PRIMARY KEY

profile_id
UUID
UNIQUE
FOREIGN KEY → profiles.id

customer_code
TEXT
UNIQUE
NOT NULL

created_at
TIMESTAMPTZ
DEFAULT NOW()

updated_at
TIMESTAMPTZ
DEFAULT NOW()

Example:

CUS-000001

Rules:

- One customer profile corresponds to one customer record.
- customer_code is generated server-side.

==================================================
6. TABLE: MECHANICS
==================================================

Purpose:

Mechanic-specific information.

Table:

mechanics

Columns:

id
UUID
PRIMARY KEY

profile_id
UUID
UNIQUE
FOREIGN KEY → profiles.id

mechanic_code
TEXT
UNIQUE
NOT NULL

experience_years
INTEGER
DEFAULT 0

bio
TEXT

verification_status
ENUM:

PENDING
VERIFIED
REJECTED
SUSPENDED

is_online
BOOLEAN
DEFAULT FALSE

is_available
BOOLEAN
DEFAULT FALSE

service_radius_km
NUMERIC(5,2)
DEFAULT 5

rating_average
NUMERIC(3,2)
DEFAULT 0

completed_jobs_count
INTEGER
DEFAULT 0

created_at
TIMESTAMPTZ
DEFAULT NOW()

updated_at
TIMESTAMPTZ
DEFAULT NOW()

Example:

MEC-000001

Rules:

- Only VERIFIED mechanics can receive real jobs.
- SUSPENDED mechanics cannot receive jobs.
- is_online controls whether the mechanic is accepting requests.
- is_available controls whether the mechanic is currently free.

==================================================
7. TABLE: MECHANIC_SKILLS
==================================================

Purpose:

Stores mechanic capabilities.

Table:

mechanic_skills

Columns:

id
UUID
PRIMARY KEY

mechanic_id
UUID
FOREIGN KEY → mechanics.id

service_id
UUID
FOREIGN KEY → services.id

created_at
TIMESTAMPTZ
DEFAULT NOW()

Constraints:

UNIQUE(mechanic_id, service_id)

Example:

Mechanic:
MEC-000001

Skills:

Battery
Brake
Electrical
General Repair

==================================================
8. TABLE: SERVICES
==================================================

Purpose:

Master list of Mechly service categories.

Table:

services

Columns:

id
UUID
PRIMARY KEY

name
TEXT
UNIQUE
NOT NULL

description
TEXT

icon
TEXT

is_active
BOOLEAN
DEFAULT TRUE

created_at
TIMESTAMPTZ
DEFAULT NOW()

MVP services:

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

==================================================
9. TABLE: VEHICLES
==================================================

Purpose:

Customer vehicles.

Table:

vehicles

Columns:

id
UUID
PRIMARY KEY

vehicle_code
TEXT
UNIQUE
NOT NULL

customer_id
UUID
FOREIGN KEY → customers.id

vehicle_type
ENUM:

MOTORCYCLE
SCOOTER
CAR

brand
TEXT
NOT NULL

model
TEXT
NOT NULL

year
INTEGER
NULLABLE

registration_number
TEXT
NULLABLE

fuel_type
TEXT
NULLABLE

nickname
TEXT
NULLABLE

is_demo
BOOLEAN
DEFAULT FALSE

created_at
TIMESTAMPTZ
DEFAULT NOW()

updated_at
TIMESTAMPTZ
DEFAULT NOW()

Example:

VEH-000001

Important:

Only these are required during initial onboarding:

vehicle_type
brand
model

Do not force:

year
registration_number
fuel_type

==================================================
10. TABLE: SERVICE_LOCATIONS
==================================================

Purpose:

Stores customer service location for a booking.

Table:

service_locations

Columns:

id
UUID
PRIMARY KEY

customer_id
UUID
FOREIGN KEY → customers.id

label
TEXT

address
TEXT
NOT NULL

area
TEXT

city
TEXT
NOT NULL

latitude
NUMERIC(10,7)

longitude
NUMERIC(10,7)

created_at
TIMESTAMPTZ
DEFAULT NOW()

Rules:

A customer can save multiple locations.

Example:

Home
Kharghar
Navi Mumbai

Office
Vashi
Navi Mumbai

For MVP, the booking stores a snapshot of the location.

==================================================
11. TABLE: BOOKINGS
==================================================

Purpose:

Central transaction table.

Table:

bookings

Columns:

id
UUID
PRIMARY KEY

booking_code
TEXT
UNIQUE
NOT NULL

customer_id
UUID
FOREIGN KEY → customers.id

vehicle_id
UUID
FOREIGN KEY → vehicles.id

service_id
UUID
FOREIGN KEY → services.id

mechanic_id
UUID
NULLABLE
FOREIGN KEY → mechanics.id

service_location_id
UUID
FOREIGN KEY → service_locations.id

problem_description
TEXT

ai_classification
TEXT
NULLABLE

ai_urgency
TEXT
NULLABLE

scheduled_start
TIMESTAMPTZ
NOT NULL

scheduled_end
TIMESTAMPTZ
NOT NULL

visit_charge
NUMERIC(10,2)
DEFAULT 0

estimated_total
NUMERIC(10,2)
DEFAULT 0

final_amount
NUMERIC(10,2)
DEFAULT 0

status
BOOKING_STATUS
NOT NULL
DEFAULT REQUESTED

is_demo
BOOLEAN
DEFAULT FALSE

created_at
TIMESTAMPTZ
DEFAULT NOW()

updated_at
TIMESTAMPTZ
DEFAULT NOW()

Example:

BOOK-20260816-0001

==================================================
12. BOOKING STATUS ENUM
==================================================

BOOKING_STATUS:

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
DECLINED
CANCELLED
EXPIRED
DISPUTED

Do not add arbitrary statuses.

==================================================
13. TABLE: BOOKING_STATUS_HISTORY
==================================================

Purpose:

Permanent timeline of booking state changes.

Table:

booking_status_history

Columns:

id
UUID
PRIMARY KEY

booking_id
UUID
FOREIGN KEY → bookings.id

old_status
BOOKING_STATUS
NULLABLE

new_status
BOOKING_STATUS
NOT NULL

changed_by_profile_id
UUID
FOREIGN KEY → profiles.id

note
TEXT
NULLABLE

created_at
TIMESTAMPTZ
DEFAULT NOW()

Example:

REQUESTED
→ SEARCHING

SEARCHING
→ ACCEPTED

ACCEPTED
→ ON_THE_WAY

This table is important for:

Debugging
Customer support
Admin
Disputes
Analytics

==================================================
14. TABLE: ESTIMATES
==================================================

Purpose:

Stores repair estimates.

Table:

estimates

Columns:

id
UUID
PRIMARY KEY

booking_id
UUID
FOREIGN KEY → bookings.id

created_by_mechanic_id
UUID
FOREIGN KEY → mechanics.id

status
ESTIMATE_STATUS
DEFAULT PENDING

subtotal
NUMERIC(10,2)
DEFAULT 0

labour_total
NUMERIC(10,2)
DEFAULT 0

parts_total
NUMERIC(10,2)
DEFAULT 0

total
NUMERIC(10,2)
DEFAULT 0

customer_approved_amount
NUMERIC(10,2)
NULLABLE

approved_at
TIMESTAMPTZ
NULLABLE

rejected_at
TIMESTAMPTZ
NULLABLE

created_at
TIMESTAMPTZ
DEFAULT NOW()

updated_at
TIMESTAMPTZ
DEFAULT NOW()

==================================================
15. ESTIMATE STATUS
==================================================

ESTIMATE_STATUS:

PENDING
APPROVED
REJECTED
EXPIRED
CANCELLED

==================================================
16. TABLE: ESTIMATE_ITEMS
==================================================

Purpose:

Individual charges inside an estimate.

Table:

estimate_items

Columns:

id
UUID
PRIMARY KEY

estimate_id
UUID
FOREIGN KEY → estimates.id

item_type
ENUM:

PART
LABOUR
SERVICE
OTHER

name
TEXT
NOT NULL

description
TEXT

quantity
NUMERIC(10,2)
DEFAULT 1

unit_price
NUMERIC(10,2)
NOT NULL

total_price
NUMERIC(10,2)
NOT NULL

is_additional
BOOLEAN
DEFAULT FALSE

created_at
TIMESTAMPTZ
DEFAULT NOW()

Example:

PART
Brake Pad
₹150

LABOUR
Brake Pad Replacement
₹100

==================================================
17. CUSTOMER APPROVAL MODEL
==================================================

Customer approval belongs to the estimate.

Approval information:

estimate.status
estimate.customer_approved_amount
estimate.approved_at

A customer can only approve an estimate belonging to their own booking.

Additional work cannot be included in final payment without approval.

==================================================
18. TABLE: JOB_CARDS
==================================================

Purpose:

Digital record of completed service.

Table:

job_cards

Columns:

id
UUID
PRIMARY KEY

booking_id
UUID
UNIQUE
FOREIGN KEY → bookings.id

mechanic_id
UUID
FOREIGN KEY → mechanics.id

problem_found
TEXT

work_performed
TEXT

mechanic_notes
TEXT

parts_summary
TEXT

labour_summary
TEXT

final_amount
NUMERIC(10,2)

completed_at
TIMESTAMPTZ

created_at
TIMESTAMPTZ
DEFAULT NOW()

updated_at
TIMESTAMPTZ
DEFAULT NOW()

==================================================
19. TABLE: JOB_PHOTOS
==================================================

Purpose:

Stores photos associated with inspection or completed work.

Table:

job_photos

Columns:

id
UUID
PRIMARY KEY

booking_id
UUID
FOREIGN KEY → bookings.id

uploaded_by_profile_id
UUID
FOREIGN KEY → profiles.id

photo_type
ENUM:

BEFORE
INSPECTION
PART
AFTER
OTHER

storage_path
TEXT
NOT NULL

caption
TEXT

created_at
TIMESTAMPTZ
DEFAULT NOW()

Photos should be stored in Supabase Storage.

Do not store image binaries directly inside PostgreSQL.

==================================================
20. TABLE: PAYMENTS
==================================================

Purpose:

Payment record for a booking.

Table:

payments

Columns:

id
UUID
PRIMARY KEY

booking_id
UUID
FOREIGN KEY → bookings.id

customer_id
UUID
FOREIGN KEY → customers.id

amount
NUMERIC(10,2)
NOT NULL

payment_method
PAYMENT_METHOD
NOT NULL

status
PAYMENT_STATUS
NOT NULL

provider_reference
TEXT
NULLABLE

paid_at
TIMESTAMPTZ
NULLABLE

is_demo
BOOLEAN
DEFAULT FALSE

created_at
TIMESTAMPTZ
DEFAULT NOW()

updated_at
TIMESTAMPTZ
DEFAULT NOW()

==================================================
21. PAYMENT METHOD
==================================================

PAYMENT_METHOD:

UPI
CARD
CASH

==================================================
22. PAYMENT STATUS
==================================================

PAYMENT_STATUS:

PENDING
PROCESSING
PAID
FAILED
REFUNDED
CASH_PENDING
CASH_CONFIRMED

==================================================
23. TABLE: COMMISSION_LEDGER
==================================================

Purpose:

Records Mechly's financial share of each completed job.

Table:

commission_ledger

Columns:

id
UUID
PRIMARY KEY

booking_id
UUID
UNIQUE
FOREIGN KEY → bookings.id

mechanic_id
UUID
FOREIGN KEY → mechanics.id

gross_amount
NUMERIC(10,2)
NOT NULL

commission_rate
NUMERIC(5,2)
NOT NULL

platform_commission
NUMERIC(10,2)
NOT NULL

mechanic_amount
NUMERIC(10,2)
NOT NULL

settlement_status
SETTLEMENT_STATUS

created_at
TIMESTAMPTZ
DEFAULT NOW()

updated_at
TIMESTAMPTZ
DEFAULT NOW()

Example:

Gross:
₹750

Commission rate:
15%

Platform:
₹112.50

Mechanic:
₹637.50

Important:

Store the actual commission amount.

Do not rely only on the current commission setting.

==================================================
24. SETTLEMENT STATUS
==================================================

SETTLEMENT_STATUS:

PENDING
OWED
PROCESSING
SETTLED
DISPUTED
CANCELLED

For cash bookings:

commission may remain:

OWED

until settled.

==================================================
25. TABLE: RATINGS
==================================================

Purpose:

Customer and mechanic ratings after completed jobs.

Table:

ratings

Columns:

id
UUID
PRIMARY KEY

booking_id
UUID
FOREIGN KEY → bookings.id

reviewer_profile_id
UUID
FOREIGN KEY → profiles.id

reviewee_profile_id
UUID
FOREIGN KEY → profiles.id

rating
INTEGER
NOT NULL

review
TEXT
NULLABLE

created_at
TIMESTAMPTZ
DEFAULT NOW()

Constraints:

rating BETWEEN 1 AND 5

One reviewer should only be able to rate the same completed booking once.

==================================================
26. TABLE: NOTIFICATIONS
==================================================

Purpose:

In-app notifications.

Table:

notifications

Columns:

id
UUID
PRIMARY KEY

profile_id
UUID
FOREIGN KEY → profiles.id

booking_id
UUID
NULLABLE
FOREIGN KEY → bookings.id

type
TEXT
NOT NULL

title
TEXT
NOT NULL

message
TEXT
NOT NULL

is_read
BOOLEAN
DEFAULT FALSE

created_at
TIMESTAMPTZ
DEFAULT NOW()

Examples:

BOOKING_CONFIRMED
MECHANIC_ACCEPTED
MECHANIC_ON_THE_WAY
MECHANIC_ARRIVED
ESTIMATE_CREATED
APPROVAL_REQUIRED
JOB_COMPLETED
PAYMENT_REQUIRED
PAYMENT_SUCCESSFUL
RATING_REQUEST

==================================================
27. TABLE: DISPUTES
==================================================

Purpose:

Customer/mechanic dispute management.

Table:

disputes

Columns:

id
UUID
PRIMARY KEY

booking_id
UUID
FOREIGN KEY → bookings.id

raised_by_profile_id
UUID
FOREIGN KEY → profiles.id

category
DISPUTE_CATEGORY

description
TEXT
NOT NULL

status
DISPUTE_STATUS
DEFAULT OPEN

admin_notes
TEXT
NULLABLE

resolution
TEXT
NULLABLE

resolved_by_profile_id
UUID
NULLABLE
FOREIGN KEY → profiles.id

resolved_at
TIMESTAMPTZ
NULLABLE

created_at
TIMESTAMPTZ
DEFAULT NOW()

updated_at
TIMESTAMPTZ
DEFAULT NOW()

==================================================
28. DISPUTE CATEGORY
==================================================

DISPUTE_CATEGORY:

INCORRECT_CHARGE
POOR_REPAIR
INCOMPLETE_WORK
VEHICLE_DAMAGE
PAYMENT
MECHANIC_CONDUCT
CUSTOMER_CONDUCT
OTHER

==================================================
29. DISPUTE STATUS
==================================================

DISPUTE_STATUS:

OPEN
UNDER_REVIEW
RESOLVED
REJECTED
CANCELLED

==================================================
30. TABLE: MECHANIC_AVAILABILITY
==================================================

Purpose:

Stores mechanic availability.

Table:

mechanic_availability

Columns:

id
UUID
PRIMARY KEY

mechanic_id
UUID
FOREIGN KEY → mechanics.id

day_of_week
INTEGER

start_time
TIME

end_time
TIME

is_active
BOOLEAN
DEFAULT TRUE

created_at
TIMESTAMPTZ
DEFAULT NOW()

day_of_week:

0 = Sunday
1 = Monday
2 = Tuesday
3 = Wednesday
4 = Thursday
5 = Friday
6 = Saturday

This is useful for future scheduled booking logic.

For MVP, mechanic is_online and is_available remain the primary live controls.

==================================================
31. TABLE: MECHANIC_SERVICE_AREAS
==================================================

Purpose:

Stores areas where a mechanic operates.

Table:

mechanic_service_areas

Columns:

id
UUID
PRIMARY KEY

mechanic_id
UUID
FOREIGN KEY → mechanics.id

city
TEXT
NOT NULL

area
TEXT
NOT NULL

is_active
BOOLEAN
DEFAULT TRUE

created_at
TIMESTAMPTZ
DEFAULT NOW()

Example:

Mechanic:
Ahmed

City:
Navi Mumbai

Area:
Kharghar

==================================================
32. TABLE: AI_INTERACTIONS
==================================================

Purpose:

Optional record of AI assistance.

Table:

ai_interactions

Columns:

id
UUID
PRIMARY KEY

booking_id
UUID
NULLABLE
FOREIGN KEY → bookings.id

profile_id
UUID
FOREIGN KEY → profiles.id

interaction_type
AI_INTERACTION_TYPE

input_text
TEXT

output_text
TEXT

structured_result
JSONB

created_at
TIMESTAMPTZ
DEFAULT NOW()

Do not store unnecessary sensitive information.

==================================================
33. AI INTERACTION TYPE
==================================================

AI_INTERACTION_TYPE:

PROBLEM_TRIAGE
VOICE_TO_JOB_CARD
DOCUMENT_EXTRACTION

==================================================
34. TABLE: DEMO_SESSIONS
==================================================

Purpose:

Controls competition/demo state.

Table:

demo_sessions

Columns:

id
UUID
PRIMARY KEY

name
TEXT

is_active
BOOLEAN
DEFAULT FALSE

created_by
UUID
FOREIGN KEY → profiles.id

created_at
TIMESTAMPTZ
DEFAULT NOW()

This is optional.

The main demo-data indicator remains:

is_demo = TRUE

==================================================
35. DEMO DATA
==================================================

The following tables should support:

is_demo

where appropriate:

profiles
vehicles
bookings
payments

Mechanic demo records are identifiable through:

profiles.is_demo
mechanic.is_demo indirectly through profile

Customer demo records:

profiles.is_demo

Do not create fake real-world identities that appear verified.

==================================================
36. RELATIONSHIP SUMMARY
==================================================

profiles
    │
    ├── customers
    │      │
    │      └── vehicles
    │             │
    │             └── bookings
    │
    └── mechanics
           │
           ├── mechanic_skills
           ├── mechanic_availability
           └── mechanic_service_areas


bookings
    │
    ├── booking_status_history
    ├── estimates
    │      └── estimate_items
    ├── job_cards
    ├── job_photos
    ├── payments
    ├── commission_ledger
    ├── ratings
    ├── notifications
    └── disputes

==================================================
37. IMPORTANT FOREIGN KEY RULES
==================================================

Customer deletion:

Do NOT blindly cascade-delete completed bookings.

Historical transactions must be preserved.

Vehicle deletion:

Prefer soft deletion if the vehicle has booking history.

Mechanic deletion:

Prefer suspension/deactivation rather than deleting historical mechanic records.

Booking deletion:

Do not physically delete completed bookings.

Use status:

CANCELLED

when appropriate.

==================================================
38. SOFT DELETE
==================================================

For important entities, prefer:

is_active

rather than physical deletion.

Relevant entities:

profiles
mechanics
services
vehicles
service areas

Historical financial and booking records should remain.

==================================================
39. INDEXES
==================================================

Create indexes for frequently queried fields.

Required indexes:

profiles(role)

customers(profile_id)

mechanics(profile_id)

mechanics(verification_status)

mechanics(is_online, is_available)

vehicles(customer_id)

bookings(customer_id)

bookings(mechanic_id)

bookings(vehicle_id)

bookings(status)

bookings(scheduled_start)

booking_status_history(booking_id)

estimates(booking_id)

estimate_items(estimate_id)

payments(booking_id)

payments(status)

commission_ledger(mechanic_id)

ratings(reviewee_profile_id)

notifications(profile_id, is_read)

disputes(booking_id)

mechanic_service_areas(city, area)

==================================================
40. UNIQUE CONSTRAINTS
==================================================

Required:

profiles.id

customers.profile_id

customers.customer_code

mechanics.profile_id

mechanics.mechanic_code

vehicles.vehicle_code

bookings.booking_code

job_cards.booking_id

commission_ledger.booking_id

==================================================
41. FINANCIAL DATA RULE
==================================================

Financial records must preserve historical values.

Example:

Booking completed with:

commission_rate = 15%

Later Mechly changes commission to:

12%

The historical booking remains:

15%

Never dynamically recalculate old transactions using the current rate.

==================================================
42. BOOKING DATA SNAPSHOT
==================================================

Completed bookings should preserve important information from the time of service.

For example:

Final address
Final amount
Mechanic
Vehicle
Service
Estimate
Approval

must remain historically understandable even if the customer's profile changes later.

==================================================
43. SECURITY / RLS OVERVIEW
==================================================

CUSTOMER:

Can SELECT/UPDATE own profile.

Can SELECT/INSERT/UPDATE own vehicles.

Can SELECT own bookings.

Can create bookings for own vehicles.

Can view estimates belonging to own bookings.

Can approve own estimates.

Can view own payments.

Can create ratings for completed own bookings.

Can create disputes for own bookings.

MECHANIC:

Can SELECT/UPDATE own profile.

Can manage own availability.

Can view jobs assigned/eligible to them according to server-side matching.

Can update their assigned booking.

Can create estimates for assigned bookings.

Can upload photos for assigned bookings.

Can create job cards for assigned bookings.

Can view own payments/earnings.

ADMIN:

Full authorized access.

==================================================
44. SERVER-SIDE OPERATIONS
==================================================

The following should use protected server-side operations:

Create booking

Assign mechanic

Accept booking

Change booking status

Create estimate

Approve estimate

Complete job

Create payment

Confirm payment

Calculate commission

Create rating

Resolve dispute

Do not allow arbitrary direct client updates to sensitive fields.

==================================================
45. BOOKING STATE VALIDATION
==================================================

Valid transitions:

REQUESTED
→ SEARCHING

SEARCHING
→ ACCEPTED

SEARCHING
→ DECLINED

SEARCHING
→ EXPIRED

ACCEPTED
→ ON_THE_WAY

ACCEPTED
→ CANCELLED

ON_THE_WAY
→ ARRIVED

ON_THE_WAY
→ CANCELLED

ARRIVED
→ INSPECTION

INSPECTION
→ ESTIMATE_CREATED

ESTIMATE_CREATED
→ AWAITING_CUSTOMER_APPROVAL

AWAITING_CUSTOMER_APPROVAL
→ APPROVED

AWAITING_CUSTOMER_APPROVAL
→ CANCELLED

APPROVED
→ IN_PROGRESS

IN_PROGRESS
→ COMPLETED

COMPLETED
→ PAYMENT_PENDING

PAYMENT_PENDING
→ PAID

PAID
→ CLOSED

Any relevant active state
→ DISPUTED

The backend must enforce these transitions.

==================================================
46. MVP SIMPLIFICATION
==================================================

Do NOT create unnecessary tables for:

wallets
subscriptions
loyalty
coupons
referrals
fleet management
inventory
garage CRM
advanced dispatch
dynamic pricing

These may be added later.

==================================================
47. FUTURE EXTENSION
==================================================

The schema should eventually support:

GARAGES

GARAGE_MEMBERS

GARAGE_CUSTOMERS

INVENTORY

SPARE_PARTS

SERVICE_PACKAGES

FLEET_ACCOUNTS

SUBSCRIPTIONS

REFERRALS

COUPONS

PAYOUTS

WARRANTIES

But these are outside MVP.

==================================================
48. DATABASE SEED DATA
==================================================

Create separate seed scripts for:

Services

Mumbai areas

Navi Mumbai areas

Demo mechanics

Demo customers

Demo vehicles

Demo bookings

Demo ratings

Demo payments

Demo service histories

Demo data must never be inserted into production unintentionally.

==================================================
49. SEED LOCATIONS
==================================================

Mumbai examples:

Andheri
Bandra
Borivali
Goregaon
Malad
Powai
Kurla
Ghatkopar
Dadar
Mulund
Thane

Navi Mumbai examples:

Kharghar
Belapur
Nerul
Seawoods
Vashi
Airoli
Sanpada
Kopar Khairane
Panvel

==================================================
50. DATABASE IMPLEMENTATION ORDER
==================================================

Create tables in dependency order:

1. profiles
2. customers
3. mechanics
4. services
5. mechanic_skills
6. vehicles
7. service_locations
8. mechanic_service_areas
9. mechanic_availability
10. bookings
11. booking_status_history
12. estimates
13. estimate_items
14. job_cards
15. job_photos
16. payments
17. commission_ledger
18. ratings
19. notifications
20. disputes
21. ai_interactions
22. demo_sessions

==================================================
51. FINAL DATABASE PRINCIPLE
==================================================

The database must support one complete real transaction:

Customer
→ Vehicle
→ Booking
→ Mechanic
→ Estimate
→ Approval
→ Job
→ Payment
→ Commission
→ Rating
→ Service History

If the database can reliably represent this lifecycle,
the foundation of the Mechly MVP is correct.