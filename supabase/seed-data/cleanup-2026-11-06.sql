-- Founder decision 8.3 (6 Nov 2026, default A): delete Knight Visa (Phuket, Udon Thani) and Visatogo Khon Kaen.
-- Off-audience listings. Unverified, 0 facts, no leads, no programs (checked 6 Nov 2026).
-- Run in the Supabase SQL Editor. Expected: "Success. No rows returned".
delete from public.providers where id = 'a7a5b426-04f7-4dda-a620-0b4fead08517' and slug = 'knight-visa-help-point-phuket' and status = 'unverified';
delete from public.providers where id = '2fc195ff-f1e2-4fd3-8ce5-b9ab15e7fe48' and slug = 'knight-visa-help-point-udonthani-udon-thani' and status = 'unverified';
delete from public.providers where id = 'd8a3aa26-f66b-48c8-a493-c9fb2f93f486' and slug = 'visatogo-khonkaen-khon-kaen' and status = 'unverified';
