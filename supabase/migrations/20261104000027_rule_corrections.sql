-- 0027 Rule corrections from the 4 Nov 2026 editorial research (D13). Each update is logged in rule_changes.
update public.rules set effective_from = date '2025-02-04', source_date = date '2025-02-04'
  where track = 'ltr' and effective_from = date '2025-01-13';
update public.rules set note_en = note_en || ' Some missions ask for more: Budapest is reported to require 6 months.'
  where track = 'dtv' and key = 'eligibility.funds_hold_days' and note_en not like '%Budapest%';
update public.rules set note_en = 'Bronze costs 650,000 THB for 5 years. It is a promotion, reported to be open until 31 December 2026 after several extensions. Confirm with the operator before paying.'
  where track = 'privilege' and key = 'fee.membership.bronze';

update public.rule_changes set summary_en = 'LTR 2025 relaxations dated to 4 Feb 2025, when BOI gave them effect'
  where summary_en is null and rule_key like 'eligibility.%' and track = 'ltr' and action = 'update';
update public.rule_changes set summary_en = 'DTV funds note: some missions ask for 6 months of statements'
  where summary_en is null and rule_key = 'eligibility.funds_hold_days' and track = 'dtv' and action = 'update';
update public.rule_changes set summary_en = 'Privilege Bronze: reported open until 31 Dec 2026'
  where summary_en is null and rule_key = 'fee.membership.bronze' and action = 'update';
update public.rule_changes set summary_en = 'Rule record updated' where summary_en is null and action = 'update' and changed_at > now() - interval '1 minute';
