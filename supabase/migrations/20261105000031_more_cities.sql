-- 0031 More long-stay areas for the school scrape (scripts/apify/lib.ts AREAS) and the place and office pages.
-- Codes are the ref-code suffix and follow the nearest IATA code where one exists.
insert into public.cities (slug, code, name_en, province_en, lat, lng, sort_order) values
  ('koh-phangan', 'KPG', 'Koh Phangan', 'Surat Thani', 9.731900, 100.025000, 11),
  ('koh-tao', 'KTO', 'Koh Tao', 'Surat Thani', 10.095600, 99.840400, 12),
  ('koh-lanta', 'LNT', 'Koh Lanta', 'Krabi', 7.624500, 99.079000, 13),
  ('pai', 'PYY', 'Pai', 'Mae Hong Son', 19.358300, 98.440500, 14),
  ('hat-yai', 'HDY', 'Hat Yai', 'Songkhla', 7.008400, 100.474700, 15),
  ('korat', 'NAK', 'Korat (Nakhon Ratchasima)', 'Nakhon Ratchasima', 14.979900, 102.097700, 16),
  ('nong-khai', 'NKH', 'Nong Khai', 'Nong Khai', 17.878300, 102.741300, 17),
  ('rayong', 'RYG', 'Rayong', 'Rayong', 12.681400, 101.281600, 18),
  ('surat-thani', 'URT', 'Surat Thani', 'Surat Thani', 9.138200, 99.321500, 19),
  ('kanchanaburi', 'KCB', 'Kanchanaburi', 'Kanchanaburi', 14.022800, 99.532800, 20),
  ('ayutthaya', 'AYU', 'Ayutthaya', 'Phra Nakhon Si Ayutthaya', 14.353200, 100.568900, 21),
  ('lampang', 'LPT', 'Lampang', 'Lampang', 18.288800, 99.490900, 22),
  ('ubon-ratchathani', 'UBP', 'Ubon Ratchathani', 'Ubon Ratchathani', 15.244800, 104.847300, 23),
  ('nakhon-si-thammarat', 'NST', 'Nakhon Si Thammarat', 'Nakhon Si Thammarat', 8.430400, 99.963100, 24),
  ('trang', 'TST', 'Trang', 'Trang', 7.556300, 99.611400, 25),
  ('koh-chang', 'TDX', 'Koh Chang', 'Trat', 12.059000, 102.327000, 26),
  ('phitsanulok', 'PHS', 'Phitsanulok', 'Phitsanulok', 16.821100, 100.265900, 27)
on conflict (slug) do nothing;
