-- Listings reviewed by hand against government open data on data.go.th, 8 Nov 2026 (D29).
-- A match is the register name, province and, where the register has one, the address.
-- SAT: เพชรยินดี กรุงเทพมหานคร | 36/36 ซอย 36 ถนนจรัญสนิทวงศ์ 10700 => Petchyindee | Large camp, 5 stars, certified 2020. List published May 2022.
-- SAT: ศศิประภายิมส์ | 401 ซอยลาดพร้าว 130 ถนนลาดพร้าว 10240 => Sasiprapa Muay Thai Gym, by Thakoon | Medium camp, 4 stars, certified 2020. List published May 2022.
-- SAT: แก้วสัมฤทธิ์ | 104/50 หมู่บ้านบูรพาวิลล่า 3 ถนนทุ่งมังกร 10170 => Kaewsamrit Gym | Large camp, 5 stars, certified 2021. List published May 2022.
-- SAT: ครูดามยิม | 67 ซอยสุขุมวิท 36 ถนนสุขุมวิท 10110 => Krudam Muay Thai School | Medium camp, 5 stars, certified 2021. List published May 2022.
-- SAT: เอ็นแอนด์พีบ๊อกซิ่งยิมส์ | 5 ซอยเทียนทะเล 7 10150 => N&P Boxing GYM & P.Pao-In Muay Thai Camp | Medium camp, 4 stars, certified 2021. List published May 2022.
-- SAT: ส.นิลทัย | 60 21130 => Sor.Ninthai Muay Thai Gym | Small camp, 3 stars, certified 2021. List published May 2022.
-- SAT: อโยธยาไฟท์ยิมส์ | 109 ม.1 ภูเขาทองซอย 9 13000 => Ayothaya Fight Gym | Small camp, 5 stars, certified 2020. List published May 2022.
-- SAT: ค่ายมวยคลองสวนพลูรีสอร์ทยิม | 99/9 หมู่ 4 13000 => Klongsuanplu Resort Gym | Large camp, 5 stars, certified 2021. List published May 2022.
-- SAT: ค่ายมวยไกรศิระภพ บ็อกซิ่งยิม | 182 หมู่7 71260 => Kraisirapob Boxing Gym | Small camp, 5 stars, certified 2021. List published May 2022.
-- SAT: แฟร์เท็กซ์ |  20150 => Fairtex | Large camp, 5 stars, certified 2021. List published May 2022.
-- DHSS: โรงเรียนบันยันทรี สปา อคาเดมี่ => Banyan Spa & Wellbeing Academy
-- DHSS: โรงเรียนสอนนวดเรือนไม้สปา => Ruenmai massage school
-- DHSS: โรงเรียนสิริลดานวดไทยและสปา => Sirilada massage and spa School
-- DHSS: โรงเรียนดอกแก้วหัตถเวช => Dokkaw thai traditional massage school
-- DHSS: โรงเรียนเชียงของนวดแผนไทย => Chiang Khong Thai Massage School
-- DHSS: โรงเรียนโอเอ็มดีนวดไทย และสปา => OMD Thai Massage & Spa School
-- DHSS: โรงเรียนนวดไทยสปา สุรนารี => Suranaree Thai Massage Spa School
-- DHSS: โรงเรียนสอนนวดสรัญญา => Saranya Massage School Korat (Training Center)
-- DHSS: โรงเรียนนวดแผนไทยบ้านดอน => Bandon Thai Traditional massage school
-- DHSS: โรงเรียนสอนนวดและสปายกทิพ ภาคใต้ => Yokthip Southern Massage and Spa School (Samui spa school)
-- DHSS: โรงเรียนสปาหัตถามณีกร => Hattamaneekorn Spa School
-- DHSS: โรงเรียนส่งเสริมวิชาชีพและวัฒนธรรมไทยสปา => School of Professional Carrier Extension & Thai Cultural Spa
-- DHSS: โรงเรียนกรุงเทพความงามและสปา => Bangkok School of Beauty and Spa.
-- DHSS: โรงเรียนนวดแผนโบราณเชตวัน => Watpo & Chetawan Thai Traditional Medical and Massage School
-- DHSS: โรงเรียนนวดแผนโบราณเชตวัน แจ้งวัฒนะ => Wat Pho & Chetawan
-- DHSS: โรงเรียนเอ็ม เอส ไอ นวดไทย แอนด์ สปา => MSI thai massage and spa school
-- DHSS: โรงเรียนไอทีเอ็มนวดไทยโบราณ => ITM - International Training Massage School
-- DHSS: โรงเรียนลานนานวดแพทย์แผนไทย => Lanna Thai Massage Traditional Medical School
-- DHSS: โรงเรียนสอนคนตาบอดภาคเหนือในพระบรมราชินูปถัมภ์ จังหวัดเชียงใหม่ => Blind Massage-Northern School for the Blind
-- DHSS: โรงเรียนพราวิเนียความงามสปา ราชพฤกษ์ => Pravinia Spa Academy
insert into public.provider_accreditations (provider_id, body_en, reference, is_checked, checked_at)
select p.id, v.body, v.ref, true, now()
from (values
  ('petchyindee-bangkok', 'Sports Authority of Thailand list of certified boxing camps', 'Large camp, 5 stars, certified 2020. List published May 2022.'),
  ('sasiprapa-muay-thai-gym-by-thakoon-bangkok', 'Sports Authority of Thailand list of certified boxing camps', 'Medium camp, 4 stars, certified 2020. List published May 2022.'),
  ('kaewsamrit-gym-bangkok', 'Sports Authority of Thailand list of certified boxing camps', 'Large camp, 5 stars, certified 2021. List published May 2022.'),
  ('krudam-muay-thai-school-bangkok', 'Sports Authority of Thailand list of certified boxing camps', 'Medium camp, 5 stars, certified 2021. List published May 2022.'),
  ('n-p-boxing-gym-p-pao-in-muay-thai-camp-bangkok', 'Sports Authority of Thailand list of certified boxing camps', 'Medium camp, 4 stars, certified 2021. List published May 2022.'),
  ('sor-ninthai-muay-thai-gym-rayong', 'Sports Authority of Thailand list of certified boxing camps', 'Small camp, 3 stars, certified 2021. List published May 2022.'),
  ('ayothaya-fight-gym-ayutthaya', 'Sports Authority of Thailand list of certified boxing camps', 'Small camp, 5 stars, certified 2020. List published May 2022.'),
  ('klongsuanplu-resort-gym-ayutthaya', 'Sports Authority of Thailand list of certified boxing camps', 'Large camp, 5 stars, certified 2021. List published May 2022.'),
  ('kraisirapob-boxing-gym-kanchanaburi', 'Sports Authority of Thailand list of certified boxing camps', 'Small camp, 5 stars, certified 2021. List published May 2022.'),
  ('fairtex-pattaya', 'Sports Authority of Thailand list of certified boxing camps', 'Large camp, 5 stars, certified 2021. List published May 2022.'),
  ('banyan-spa-wellbeing-academy-phuket', 'Department of Health Service Support list of institutions with certified courses', 'Spa and massage courses. List published April 2024.'),
  ('ruenmai-massage-school-pattaya', 'Department of Health Service Support list of institutions with certified courses', 'Spa and massage courses. List published April 2024.'),
  ('sirilada-massage-and-spa-school-pattaya', 'Department of Health Service Support list of institutions with certified courses', 'Spa and massage courses. List published April 2024.'),
  ('dokkaw-thai-traditional-massage-school-chiang-rai', 'Department of Health Service Support list of institutions with certified courses', 'Spa and massage courses. List published April 2024.'),
  ('chiang-khong-thai-massage-school-chiang-rai', 'Department of Health Service Support list of institutions with certified courses', 'Spa and massage courses. List published April 2024.'),
  ('omd-thai-massage-spa-school-udon-thani', 'Department of Health Service Support list of institutions with certified courses', 'Spa and massage courses. List published April 2024.'),
  ('suranaree-thai-massage-spa-school-korat', 'Department of Health Service Support list of institutions with certified courses', 'Spa and massage courses. List published April 2024.'),
  ('saranya-massage-school-korat-training-center', 'Department of Health Service Support list of institutions with certified courses', 'Spa and massage courses. List published April 2024.'),
  ('bandon-thai-traditional-massage-school-rayong', 'Department of Health Service Support list of institutions with certified courses', 'Spa and massage courses. List published April 2024.'),
  ('yokthip-southern-massage-and-spa-school-samui-spa-school-koh-samui', 'Department of Health Service Support list of institutions with certified courses', 'Spa and massage courses. List published April 2024.'),
  ('hattamaneekorn-spa-school-krabi', 'Department of Health Service Support list of institutions with certified courses', 'Spa and massage courses. List published April 2024.'),
  ('school-of-professional-carrier-extension-thai-cultural-spa-khon-kaen', 'Department of Health Service Support list of institutions with certified courses', 'Spa and massage courses. List published April 2024.'),
  ('bangkok-school-of-beauty-and-spa', 'Department of Health Service Support list of institutions with certified courses', 'Spa and massage courses. List published April 2024.'),
  ('watpo-chetawan-thai-traditional-medical-and-massage-school-bangkok', 'Department of Health Service Support list of institutions with certified courses', 'Spa and massage courses. List published April 2024.'),
  ('wat-pho-chetawan-bangkok', 'Department of Health Service Support list of institutions with certified courses', 'Spa and massage courses. List published April 2024.'),
  ('msi-thai-massage-and-spa-school-chiang-mai', 'Department of Health Service Support list of institutions with certified courses', 'Spa and massage courses. List published April 2024.'),
  ('itm-international-training-massage-school-chiang-mai', 'Department of Health Service Support list of institutions with certified courses', 'Spa and massage courses. List published April 2024.'),
  ('lanna-thai-massage-traditional-medical-school-chiang-mai', 'Department of Health Service Support list of institutions with certified courses', 'Spa and massage courses. List published April 2024.'),
  ('blind-massage-northern-school-for-the-blind-chiang-mai', 'Department of Health Service Support list of institutions with certified courses', 'Spa and massage courses. List published April 2024.'),
  ('pravinia-spa-academy-bangkok', 'Department of Health Service Support list of institutions with certified courses', 'Spa and massage courses. List published April 2024.')
) as v(slug, body, ref)
join public.providers p on p.slug = v.slug
where not exists (select 1 from public.provider_accreditations a where a.provider_id = p.id and a.body_en = v.body);
