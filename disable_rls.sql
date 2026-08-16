-- Run this in your Supabase SQL Editor to disable RLS for the MVP

alter table public.profiles disable row level security;
alter table public.customers disable row level security;
alter table public.vehicles disable row level security;
alter table public.bookings disable row level security;
alter table public.services disable row level security;
alter table public.mechanics disable row level security;
alter table public.service_locations disable row level security;
