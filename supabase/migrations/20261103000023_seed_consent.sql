-- 0023 v1 consent texts (PDPA). Thai needs native and legal review; publish v2 to change.
insert into public.consent_texts (key, locale, version, body, published_at) values
  ('lead_form', 'en', 1, 'I agree that Yuu may share my name, contact details and request with up to three verified providers so they can reply to this request. Yuu keeps this data for 24 months and deletes it sooner if I ask by replying to any Yuu email. I can withdraw consent at any time.', now()),
  ('lead_form', 'th', 1, 'ฉันยินยอมให้ Yuu ส่งชื่อ ข้อมูลติดต่อ และคำขอของฉันให้ผู้ให้บริการที่ผ่านการตรวจสอบไม่เกินสามราย เพื่อตอบกลับคำขอนี้ Yuu เก็บข้อมูลนี้ไว้ 24 เดือน และจะลบให้เร็วกว่านั้นเมื่อฉันร้องขอโดยตอบกลับอีเมลใดก็ได้จาก Yuu ฉันสามารถถอนความยินยอมได้ทุกเมื่อ', now()),
  ('subscribe', 'en', 1, 'Email me when Thailand long-stay visa rules change. I can unsubscribe with one click in any email.', now()),
  ('subscribe', 'th', 1, 'ส่งอีเมลแจ้งฉันเมื่อกฎวีซ่าพำนักระยะยาวของไทยเปลี่ยนแปลง ฉันสามารถยกเลิกได้ด้วยคลิกเดียวในทุกอีเมล', now())
on conflict (key, locale, version) do nothing;
