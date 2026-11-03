-- 0021 launch cities. Codes are the ref-code suffix and follow the nearest IATA code.
insert into public.cities (slug, code, name_en, name_th, province_en, province_th, lat, lng, sort_order) values
  ('bangkok', 'BKK', 'Bangkok', 'กรุงเทพมหานคร', 'Bangkok', 'กรุงเทพมหานคร', 13.756300, 100.501800, 1),
  ('chiang-mai', 'CNX', 'Chiang Mai', 'เชียงใหม่', 'Chiang Mai', 'เชียงใหม่', 18.788300, 98.985300, 2),
  ('phuket', 'HKT', 'Phuket', 'ภูเก็ต', 'Phuket', 'ภูเก็ต', 7.880400, 98.392300, 3),
  ('pattaya', 'UTP', 'Pattaya', 'พัทยา', 'Chonburi', 'ชลบุรี', 12.923600, 100.882500, 4),
  ('hua-hin', 'HHQ', 'Hua Hin', 'หัวหิน', 'Prachuap Khiri Khan', 'ประจวบคีรีขันธ์', 12.570400, 99.958000, 5),
  ('koh-samui', 'USM', 'Koh Samui', 'เกาะสมุย', 'Surat Thani', 'สุราษฎร์ธานี', 9.512000, 100.013600, 6),
  ('krabi', 'KBV', 'Krabi', 'กระบี่', 'Krabi', 'กระบี่', 8.086300, 98.906300, 7),
  ('khon-kaen', 'KKC', 'Khon Kaen', 'ขอนแก่น', 'Khon Kaen', 'ขอนแก่น', 16.441900, 102.836000, 8),
  ('chiang-rai', 'CEI', 'Chiang Rai', 'เชียงราย', 'Chiang Rai', 'เชียงราย', 19.910500, 99.840600, 9),
  ('udon-thani', 'UTH', 'Udon Thani', 'อุดรธานี', 'Udon Thani', 'อุดรธานี', 17.415600, 102.787200, 10)
on conflict (slug) do nothing;
