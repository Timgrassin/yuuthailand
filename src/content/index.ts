import type { Guide, VisaContent } from "./types";
import { guide as g_90_day_report_thailand } from "./guides/90-day-report-thailand";
import { guide as g_dtv_new_rules_august_2026 } from "./guides/dtv-new-rules-august-2026";
import { guide as g_dtv_rejected_reasons } from "./guides/dtv-rejected-reasons";
import { guide as g_dtv_vs_ed_visa } from "./guides/dtv-vs-ed-visa";
import { guide as g_dtv_with_family } from "./guides/dtv-with-family";
import { guide as g_how_to_stay_in_thailand_long_term } from "./guides/how-to-stay-in-thailand-long-term";
import { guide as g_ltr_vs_privilege_vs_dtv } from "./guides/ltr-vs-privilege-vs-dtv";
import { guide as g_non_o_vs_o_a_visa } from "./guides/non-o-vs-o-a-visa";
import { guide as g_retirement_visa_800k_bank_rules } from "./guides/retirement-visa-800k-bank-rules";
import { guide as g_thai_visa_agent_scams } from "./guides/thai-visa-agent-scams";
import { guide as g_thailand_privilege_bronze_deadline } from "./guides/thailand-privilege-bronze-deadline";
import { guide as g_thailand_tax_for_long_stay_foreigners } from "./guides/thailand-tax-for-long-stay-foreigners";
import { guide as g_thailand_visa_changes_2026 } from "./guides/thailand-visa-changes-2026";
import { guide as g_thailand_visa_exemption_30_days } from "./guides/thailand-visa-exemption-30-days";
import { guide as g_tm30_thailand } from "./guides/tm30-thailand";
import { content as v_dtv } from "./visas/dtv";
import { content as v_ed } from "./visas/ed";
import { content as v_ltr } from "./visas/ltr";
import { content as v_marriage } from "./visas/marriage";
import { content as v_privilege } from "./visas/privilege";
import { content as v_retirement } from "./visas/retirement";
import { content as v_retirement_oa } from "./visas/retirement_oa";
import { content as v_work } from "./visas/work";

// Register every guide and visa content module here.
export const GUIDES: Guide[] = [g_90_day_report_thailand, g_dtv_new_rules_august_2026, g_dtv_rejected_reasons, g_dtv_vs_ed_visa, g_dtv_with_family, g_how_to_stay_in_thailand_long_term, g_ltr_vs_privilege_vs_dtv, g_non_o_vs_o_a_visa, g_retirement_visa_800k_bank_rules, g_thai_visa_agent_scams, g_thailand_privilege_bronze_deadline, g_thailand_tax_for_long_stay_foreigners, g_thailand_visa_changes_2026, g_thailand_visa_exemption_30_days, g_tm30_thailand];
export const VISA_CONTENT: Record<string, VisaContent> = Object.fromEntries([v_dtv, v_ed, v_ltr, v_marriage, v_privilege, v_retirement, v_retirement_oa, v_work].map((c) => [c.track, c]));

export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);
export const guidesForTrack = (track: string) => GUIDES.filter((g) => g.tracks.includes(track));
