-- ============================================================
-- MECHLY — SUPABASE DATABASE SCHEMA
-- MVP v1.0
-- PostgreSQL / Supabase
-- ============================================================

-- ============================================================
-- 0. EXTENSIONS
-- ============================================================

create extension if not exists "pgcrypto";


-- ============================================================
-- 1. ENUMS
-- ============================================================

do $$
begin

  if not exists (
    select 1 from pg_type where typname = 'user_role'
  ) then
    create type public.user_role as enum (
      'CUSTOMER',
      'MECHANIC',
      'ADMIN'
    );
  end if;

  if not exists (
    select 1 from pg_type where typname = 'verification_status'
  ) then
    create type public.verification_status as enum (
      'PENDING',
      'VERIFIED',
      'REJECTED',
      'SUSPENDED'
    );
  end if;

  if not exists (
    select 1 from pg_type where typname = 'vehicle_type'
  ) then
    create type public.vehicle_type as enum (
      'MOTORCYCLE',
      'SCOOTER',
      'CAR'
    );
  end if;

  if not exists (
    select 1 from pg_type where typname = 'booking_status'
  ) then
    create type public.booking_status as enum (
      'REQUESTED',
      'SEARCHING',
      'ACCEPTED',
      'ON_THE_WAY',
      'ARRIVED',
      'INSPECTION',
      'ESTIMATE_CREATED',
      'AWAITING_CUSTOMER_APPROVAL',
      'APPROVED',
      'IN_PROGRESS',
      'COMPLETED',
      'PAYMENT_PENDING',
      'PAID',
      'CLOSED',
      'DECLINED',
      'CANCELLED',
      'EXPIRED',
      'DISPUTED'
    );
  end if;

  if not exists (
    select 1 from pg_type where typname = 'estimate_status'
  ) then
    create type public.estimate_status as enum (
      'PENDING',
      'APPROVED',
      'REJECTED',
      'EXPIRED',
      'CANCELLED'
    );
  end if;

  if not exists (
    select 1 from pg_type where typname = 'estimate_item_type'
  ) then
    create type public.estimate_item_type as enum (
      'PART',
      'LABOUR',
      'SERVICE',
      'OTHER'
    );
  end if;

  if not exists (
    select 1 from pg_type where typname = 'photo_type'
  ) then
    create type public.photo_type as enum (
      'BEFORE',
      'INSPECTION',
      'PART',
      'AFTER',
      'OTHER'
    );
  end if;

  if not exists (
    select 1 from pg_type where typname = 'payment_method'
  ) then
    create type public.payment_method as enum (
      'UPI',
      'CARD',
      'CASH'
    );
  end if;

  if not exists (
    select 1 from pg_type where typname = 'payment_status'
  ) then
    create type public.payment_status as enum (
      'PENDING',
      'PROCESSING',
      'PAID',
      'FAILED',
      'REFUNDED',
      'CASH_PENDING',
      'CASH_CONFIRMED'
    );
  end if;

  if not exists (
    select 1 from pg_type where typname = 'settlement_status'
  ) then
    create type public.settlement_status as enum (
      'PENDING',
      'OWED',
      'PROCESSING',
      'SETTLED',
      'DISPUTED',
      'CANCELLED'
    );
  end if;

  if not exists (
    select 1 from pg_type where typname = 'dispute_category'
  ) then
    create type public.dispute_category as enum (
      'INCORRECT_CHARGE',
      'POOR_REPAIR',
      'INCOMPLETE_WORK',
      'VEHICLE_DAMAGE',
      'PAYMENT',
      'MECHANIC_CONDUCT',
      'CUSTOMER_CONDUCT',
      'OTHER'
    );
  end if;

  if not exists (
    select 1 from pg_type where typname = 'dispute_status'
  ) then
    create type public.dispute_status as enum (
      'OPEN',
      'UNDER_REVIEW',
      'RESOLVED',
      'REJECTED',
      'CANCELLED'
    );
  end if;

  if not exists (
    select 1 from pg_type where typname = 'ai_interaction_type'
  ) then
    create type public.ai_interaction_type as enum (
      'PROBLEM_TRIAGE',
      'VOICE_TO_JOB_CARD',
      'DOCUMENT_EXTRACTION'
    );
  end if;

end $$;


-- ============================================================
-- 2. HELPER FUNCTION — UPDATED_AT
-- ============================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;


-- ============================================================
-- 3. PROFILES
-- ============================================================

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,

  role public.user_role not null default 'CUSTOMER',

  full_name text not null,
  phone text,
  email text,
  avatar_url text,

  is_active boolean not null default true,
  is_demo boolean not null default false,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


-- ============================================================
-- 4. CUSTOMERS
-- ============================================================

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),

  profile_id uuid not null unique
    references public.profiles(id) on delete restrict,

  customer_code text not null unique,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


-- ============================================================
-- 5. SERVICES
-- ============================================================

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),

  name text not null unique,
  description text,
  icon text,

  is_active boolean not null default true,

  created_at timestamptz not null default now()
);


-- ============================================================
-- 6. MECHANICS
-- ============================================================

create table if not exists public.mechanics (
  id uuid primary key default gen_random_uuid(),

  profile_id uuid not null unique
    references public.profiles(id) on delete restrict,

  mechanic_code text not null unique,

  experience_years integer not null default 0
    check (experience_years >= 0),

  bio text,

  verification_status public.verification_status
    not null default 'PENDING',

  is_online boolean not null default false,
  is_available boolean not null default false,

  service_radius_km numeric(5,2) not null default 5
    check (service_radius_km > 0),

  rating_average numeric(3,2) not null default 0
    check (rating_average >= 0 and rating_average <= 5),

  completed_jobs_count integer not null default 0
    check (completed_jobs_count >= 0),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


-- ============================================================
-- 7. MECHANIC SKILLS
-- ============================================================

create table if not exists public.mechanic_skills (
  id uuid primary key default gen_random_uuid(),

  mechanic_id uuid not null
    references public.mechanics(id) on delete cascade,

  service_id uuid not null
    references public.services(id) on delete restrict,

  created_at timestamptz not null default now(),

  unique (mechanic_id, service_id)
);


-- ============================================================
-- 8. VEHICLES
-- ============================================================

create table if not exists public.vehicles (
  id uuid primary key default gen_random_uuid(),

  vehicle_code text not null unique,

  customer_id uuid not null
    references public.customers(id) on delete restrict,

  vehicle_type public.vehicle_type not null,

  brand text not null,
  model text not null,

  year integer
    check (year is null or year between 1950 and extract(year from now())::integer + 1),

  registration_number text,

  fuel_type text,

  nickname text,

  is_demo boolean not null default false,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


-- ============================================================
-- 9. SERVICE LOCATIONS
-- ============================================================

create table if not exists public.service_locations (
  id uuid primary key default gen_random_uuid(),

  customer_id uuid not null
    references public.customers(id) on delete restrict,

  label text,

  address text not null,

  area text,
  city text not null,

  latitude numeric(10,7),
  longitude numeric(10,7),

  created_at timestamptz not null default now()
);


-- ============================================================
-- 10. MECHANIC SERVICE AREAS
-- ============================================================

create table if not exists public.mechanic_service_areas (
  id uuid primary key default gen_random_uuid(),

  mechanic_id uuid not null
    references public.mechanics(id) on delete cascade,

  city text not null,
  area text not null,

  is_active boolean not null default true,

  created_at timestamptz not null default now(),

  unique (mechanic_id, city, area)
);


-- ============================================================
-- 11. MECHANIC AVAILABILITY
-- ============================================================

create table if not exists public.mechanic_availability (
  id uuid primary key default gen_random_uuid(),

  mechanic_id uuid not null
    references public.mechanics(id) on delete cascade,

  day_of_week integer not null
    check (day_of_week between 0 and 6),

  start_time time not null,
  end_time time not null,

  is_active boolean not null default true,

  created_at timestamptz not null default now(),

  check (start_time < end_time),

  unique (mechanic_id, day_of_week, start_time, end_time)
);


-- ============================================================
-- 12. BOOKINGS
-- ============================================================

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),

  booking_code text not null unique,

  customer_id uuid not null
    references public.customers(id) on delete restrict,

  vehicle_id uuid not null
    references public.vehicles(id) on delete restrict,

  service_id uuid not null
    references public.services(id) on delete restrict,

  mechanic_id uuid
    references public.mechanics(id) on delete restrict,

  service_location_id uuid not null
    references public.service_locations(id) on delete restrict,

  problem_description text,

  ai_classification text,
  ai_urgency text,

  scheduled_start timestamptz not null,
  scheduled_end timestamptz not null,

  visit_charge numeric(10,2) not null default 0
    check (visit_charge >= 0),

  estimated_total numeric(10,2) not null default 0
    check (estimated_total >= 0),

  final_amount numeric(10,2) not null default 0
    check (final_amount >= 0),

  status public.booking_status not null default 'REQUESTED',

  is_demo boolean not null default false,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  check (scheduled_end > scheduled_start)
);


-- ============================================================
-- 13. BOOKING STATUS HISTORY
-- ============================================================

create table if not exists public.booking_status_history (
  id uuid primary key default gen_random_uuid(),

  booking_id uuid not null
    references public.bookings(id) on delete cascade,

  old_status public.booking_status,

  new_status public.booking_status not null,

  changed_by_profile_id uuid
    references public.profiles(id) on delete set null,

  note text,

  created_at timestamptz not null default now()
);


-- ============================================================
-- 14. ESTIMATES
-- ============================================================

create table if not exists public.estimates (
  id uuid primary key default gen_random_uuid(),

  booking_id uuid not null
    references public.bookings(id) on delete restrict,

  created_by_mechanic_id uuid not null
    references public.mechanics(id) on delete restrict,

  status public.estimate_status not null default 'PENDING',

  subtotal numeric(10,2) not null default 0
    check (subtotal >= 0),

  labour_total numeric(10,2) not null default 0
    check (labour_total >= 0),

  parts_total numeric(10,2) not null default 0
    check (parts_total >= 0),

  total numeric(10,2) not null default 0
    check (total >= 0),

  customer_approved_amount numeric(10,2)
    check (
      customer_approved_amount is null
      or customer_approved_amount >= 0
    ),

  approved_at timestamptz,
  rejected_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


-- ============================================================
-- 15. ESTIMATE ITEMS
-- ============================================================

create table if not exists public.estimate_items (
  id uuid primary key default gen_random_uuid(),

  estimate_id uuid not null
    references public.estimates(id) on delete cascade,

  item_type public.estimate_item_type not null,

  name text not null,
  description text,

  quantity numeric(10,2) not null default 1
    check (quantity > 0),

  unit_price numeric(10,2) not null
    check (unit_price >= 0),

  total_price numeric(10,2) not null
    check (total_price >= 0),

  is_additional boolean not null default false,

  created_at timestamptz not null default now()
);


-- ============================================================
-- 16. JOB CARDS
-- ============================================================

create table if not exists public.job_cards (
  id uuid primary key default gen_random_uuid(),

  booking_id uuid not null unique
    references public.bookings(id) on delete restrict,

  mechanic_id uuid not null
    references public.mechanics(id) on delete restrict,

  problem_found text,
  work_performed text,
  mechanic_notes text,

  parts_summary text,
  labour_summary text,

  final_amount numeric(10,2) not null default 0
    check (final_amount >= 0),

  completed_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


-- ============================================================
-- 17. JOB PHOTOS
-- ============================================================

create table if not exists public.job_photos (
  id uuid primary key default gen_random_uuid(),

  booking_id uuid not null
    references public.bookings(id) on delete cascade,

  uploaded_by_profile_id uuid
    references public.profiles(id) on delete set null,

  photo_type public.photo_type not null,

  storage_path text not null,

  caption text,

  created_at timestamptz not null default now()
);


-- ============================================================
-- 18. PAYMENTS
-- ============================================================

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),

  booking_id uuid not null
    references public.bookings(id) on delete restrict,

  customer_id uuid not null
    references public.customers(id) on delete restrict,

  amount numeric(10,2) not null
    check (amount >= 0),

  payment_method public.payment_method not null,

  status public.payment_status not null default 'PENDING',

  provider_reference text,

  paid_at timestamptz,

  is_demo boolean not null default false,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


-- ============================================================
-- 19. COMMISSION LEDGER
-- ============================================================

create table if not exists public.commission_ledger (
  id uuid primary key default gen_random_uuid(),

  booking_id uuid not null unique
    references public.bookings(id) on delete restrict,

  mechanic_id uuid not null
    references public.mechanics(id) on delete restrict,

  gross_amount numeric(10,2) not null
    check (gross_amount >= 0),

  commission_rate numeric(5,2) not null
    check (commission_rate >= 0 and commission_rate <= 100),

  platform_commission numeric(10,2) not null
    check (platform_commission >= 0),

  mechanic_amount numeric(10,2) not null
    check (mechanic_amount >= 0),

  settlement_status public.settlement_status
    not null default 'PENDING',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


-- ============================================================
-- 20. RATINGS
-- ============================================================

create table if not exists public.ratings (
  id uuid primary key default gen_random_uuid(),

  booking_id uuid not null
    references public.bookings(id) on delete restrict,

  reviewer_profile_id uuid not null
    references public.profiles(id) on delete restrict,

  reviewee_profile_id uuid not null
    references public.profiles(id) on delete restrict,

  rating integer not null
    check (rating between 1 and 5),

  review text,

  created_at timestamptz not null default now(),

  unique (booking_id, reviewer_profile_id)
);


-- ============================================================
-- 21. NOTIFICATIONS
-- ============================================================

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),

  profile_id uuid not null
    references public.profiles(id) on delete cascade,

  booking_id uuid
    references public.bookings(id) on delete cascade,

  type text not null,

  title text not null,
  message text not null,

  is_read boolean not null default false,

  created_at timestamptz not null default now()
);


-- ============================================================
-- 22. DISPUTES
-- ============================================================

create table if not exists public.disputes (
  id uuid primary key default gen_random_uuid(),

  booking_id uuid not null
    references public.bookings(id) on delete restrict,

  raised_by_profile_id uuid not null
    references public.profiles(id) on delete restrict,

  category public.dispute_category not null,

  description text not null,

  status public.dispute_status not null default 'OPEN',

  admin_notes text,
  resolution text,

  resolved_by_profile_id uuid
    references public.profiles(id) on delete set null,

  resolved_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


-- ============================================================
-- 23. AI INTERACTIONS
-- ============================================================

create table if not exists public.ai_interactions (
  id uuid primary key default gen_random_uuid(),

  booking_id uuid
    references public.bookings(id) on delete set null,

  profile_id uuid not null
    references public.profiles(id) on delete cascade,

  interaction_type public.ai_interaction_type not null,

  input_text text,
  output_text text,

  structured_result jsonb,

  created_at timestamptz not null default now()
);


-- ============================================================
-- 24. DEMO SESSIONS
-- ============================================================

create table if not exists public.demo_sessions (
  id uuid primary key default gen_random_uuid(),

  name text not null,

  is_active boolean not null default false,

  created_by uuid
    references public.profiles(id) on delete set null,

  created_at timestamptz not null default now()
);


-- ============================================================
-- 25. INDEXES
-- ============================================================

create index if not exists idx_profiles_role
  on public.profiles(role);

create index if not exists idx_customers_profile
  on public.customers(profile_id);

create index if not exists idx_mechanics_profile
  on public.mechanics(profile_id);

create index if not exists idx_mechanics_verification
  on public.mechanics(verification_status);

create index if not exists idx_mechanics_availability
  on public.mechanics(is_online, is_available);

create index if not exists idx_vehicles_customer
  on public.vehicles(customer_id);

create index if not exists idx_bookings_customer
  on public.bookings(customer_id);

create index if not exists idx_bookings_mechanic
  on public.bookings(mechanic_id);

create index if not exists idx_bookings_vehicle
  on public.bookings(vehicle_id);

create index if not exists idx_bookings_status
  on public.bookings(status);

create index if not exists idx_bookings_schedule
  on public.bookings(scheduled_start);

create index if not exists idx_booking_history_booking
  on public.booking_status_history(booking_id);

create index if not exists idx_estimates_booking
  on public.estimates(booking_id);

create index if not exists idx_estimate_items_estimate
  on public.estimate_items(estimate_id);

create index if not exists idx_payments_booking
  on public.payments(booking_id);

create index if not exists idx_payments_status
  on public.payments(status);

create index if not exists idx_commission_mechanic
  on public.commission_ledger(mechanic_id);

create index if not exists idx_ratings_reviewee
  on public.ratings(reviewee_profile_id);

create index if not exists idx_notifications_profile_read
  on public.notifications(profile_id, is_read);

create index if not exists idx_disputes_booking
  on public.disputes(booking_id);

create index if not exists idx_mechanic_service_area
  on public.mechanic_service_areas(city, area);


-- ============================================================
-- 26. UPDATED_AT TRIGGERS
-- ============================================================

drop trigger if exists set_profiles_updated_at
on public.profiles;

create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();


drop trigger if exists set_customers_updated_at
on public.customers;

create trigger set_customers_updated_at
before update on public.customers
for each row
execute function public.set_updated_at();


drop trigger if exists set_mechanics_updated_at
on public.mechanics;

create trigger set_mechanics_updated_at
before update on public.mechanics
for each row
execute function public.set_updated_at();


drop trigger if exists set_vehicles_updated_at
on public.vehicles;

create trigger set_vehicles_updated_at
before update on public.vehicles
for each row
execute function public.set_updated_at();


drop trigger if exists set_bookings_updated_at
on public.bookings;

create trigger set_bookings_updated_at
before update on public.bookings
for each row
execute function public.set_updated_at();


drop trigger if exists set_estimates_updated_at
on public.estimates;

create trigger set_estimates_updated_at
before update on public.estimates
for each row
execute function public.set_updated_at();


drop trigger if exists set_job_cards_updated_at
on public.job_cards;

create trigger set_job_cards_updated_at
before update on public.job_cards
for each row
execute function public.set_updated_at();


drop trigger if exists set_payments_updated_at
on public.payments;

create trigger set_payments_updated_at
before update on public.payments
for each row
execute function public.set_updated_at();


drop trigger if exists set_commission_updated_at
on public.commission_ledger;

create trigger set_commission_updated_at
before update on public.commission_ledger
for each row
execute function public.set_updated_at();


drop trigger if exists set_disputes_updated_at
on public.disputes;

create trigger set_disputes_updated_at
before update on public.disputes
for each row
execute function public.set_updated_at();


-- ============================================================
-- 27. BASIC BOOKING STATE VALIDATION
-- ============================================================

create or replace function public.validate_booking_status_transition(
  old_status public.booking_status,
  new_status public.booking_status
)
returns boolean
language plpgsql
immutable
as $$
begin

  if old_status = new_status then
    return true;
  end if;

  return
    (old_status = 'REQUESTED' and new_status in ('SEARCHING', 'CANCELLED')) or
    (old_status = 'SEARCHING' and new_status in ('ACCEPTED', 'DECLINED', 'EXPIRED', 'CANCELLED')) or
    (old_status = 'ACCEPTED' and new_status in ('ON_THE_WAY', 'CANCELLED')) or
    (old_status = 'ON_THE_WAY' and new_status in ('ARRIVED', 'CANCELLED')) or
    (old_status = 'ARRIVED' and new_status = 'INSPECTION') or
    (old_status = 'INSPECTION' and new_status = 'ESTIMATE_CREATED') or
    (old_status = 'ESTIMATE_CREATED' and new_status = 'AWAITING_CUSTOMER_APPROVAL') or
    (old_status = 'AWAITING_CUSTOMER_APPROVAL' and new_status in ('APPROVED', 'CANCELLED')) or
    (old_status = 'APPROVED' and new_status = 'IN_PROGRESS') or
    (old_status = 'IN_PROGRESS' and new_status = 'COMPLETED') or
    (old_status = 'COMPLETED' and new_status = 'PAYMENT_PENDING') or
    (old_status = 'PAYMENT_PENDING' and new_status = 'PAID') or
    (old_status = 'PAID' and new_status = 'CLOSED') or
    (
      old_status in (
        'REQUESTED',
        'SEARCHING',
        'ACCEPTED',
        'ON_THE_WAY',
        'ARRIVED',
        'INSPECTION',
        'ESTIMATE_CREATED',
        'AWAITING_CUSTOMER_APPROVAL',
        'APPROVED',
        'IN_PROGRESS'
      )
      and new_status = 'DISPUTED'
    );

end;
$$;


-- ============================================================
-- 28. SEED SERVICES
-- ============================================================

insert into public.services
  (name, description, icon)
values
  ('General Repair', 'General vehicle repair and troubleshooting', 'wrench'),
  ('Bike Service', 'Routine two-wheeler service', 'bike'),
  ('Car Service', 'Routine car service', 'car'),
  ('Battery', 'Battery diagnosis, replacement and related issues', 'battery'),
  ('Puncture', 'Puncture and tyre-related assistance', 'circle-dot'),
  ('Brake', 'Brake inspection and repair', 'disc'),
  ('Tyre', 'Tyre inspection, repair and replacement', 'circle'),
  ('Electrical', 'Vehicle electrical troubleshooting', 'zap'),
  ('Engine', 'Engine-related diagnosis and repair', 'cog'),
  ('Oil Change', 'Engine oil replacement and related service', 'droplets'),
  ('Chain / Transmission', 'Chain, clutch and transmission-related service', 'settings'),
  ('Emergency Assistance', 'Urgent roadside assistance', 'siren'),
  ('Other', 'Other vehicle-related assistance', 'ellipsis')
on conflict (name) do nothing;


-- ============================================================
-- 29. IMPORTANT NOTE
-- ============================================================

-- DEMO USERS SHOULD NOT BE CREATED HERE.
--
-- Supabase Auth users must exist in auth.users first.
--
-- Demo customers/mechanics should be created through:
--
-- 1. Supabase Auth
-- 2. Application seed script
-- 3. Admin/demo setup process
--
-- This prevents fake authentication records from being
-- accidentally treated as real users.


-- ============================================================
-- END OF MECHLY MVP DATABASE SCHEMA
-- ============================================================