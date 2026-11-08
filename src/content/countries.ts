// Country data for "Thailand long-stay visa for <nationality>" pages.
// Researched 4 November 2026. Facts policy: docs/editorial-brief.md.
// Values not confirmed by a mission are null or "Check with your mission".
// "Reported" means the figure comes from a secondary source, not a Thai mission.

export type Mission = { name: string; city: string; url: string };
export type CountryData = {
  slug: string;
  name: string;
  demonym: string;
  iso2: string;
  exemptionDays: number | null;
  exemptionNote: string;
  missions: Mission[];
  usesThaiEvisa: boolean | null;
  dtv: {
    policeCertificate: string;
    certificateMaxAge: string | null;
    residenceProof: string;
    fee: string | null;
    quirks: string[];
  };
  retirement: { incomeProof: string; notes: string[] };
  taxTreaty: boolean | null;
  notes: string[];
  sources: { label: string; url: string }[];
  confidence: "high" | "medium" | "low";
  updated: string;
};

const UPDATED = "2026-11-04";
const CHECK = "Check with your mission";

const TAT_EXEMPTION = {
  label: "TAT Newsroom: new 30-day and 15-day visa exemption rules from 15 September 2026",
  url: "https://www.tatnews.org/2026/09/thailand-introduces-new-30-day-and-15-day-visa-exemption-rules-from-15-september/",
};
const LONDON_EXEMPTION = {
  label: "Royal Thai Embassy London: revision of visa exemption and VoA schemes",
  url: "https://london.thaiembassy.org/en/content/revision-of-thailand-s-visa-0926",
};
const MFA_OA_CHECKLIST = {
  label: "MFA O-A / O-X checklist",
  url: "https://image.mfa.go.th/mfa/0/qcuTAU8W4b/Visa_requirement/Non_Imm_O-A__O-X_2024-03-17.pdf",
};
const MFA_NON_O_RETIREMENT = {
  label: "MFA Non-O retirement checklist",
  url: "https://image.mfa.go.th/mfa/0/n3gTFT2TOE/Visa_Requirements/NON-O_for_Retirement_visa.pdf",
};
const BANGKOK_IMMIGRATION = {
  label: "Bangkok Immigration: extension of stay criteria",
  url: "https://bangkok.immigration.go.th/en/visa-extension/",
};
const RD_FOREIGN_COMPANY_GUIDE = {
  label: "Revenue Department: income tax guide (lists treaty partners)",
  url: "https://www.rd.go.th/english/20470.html",
};
const RD_MLI_POSITION = {
  label: "Revenue Department: Thailand's MLI position (lists covered tax agreements)",
  url: "https://www.rd.go.th/fileadmin/user_upload/porphor/03Thailands_MLI_Position.pdf",
};
const THAI_EVISA = { label: "Thai e-Visa portal", url: "https://www.thaievisa.go.th" };

const OA_POLICE_MEDICAL =
  "For the O-A, Thai missions generally ask for a police certificate and a medical certificate, each issued within 3 months, plus health insurance (3,000,000 THB or 100,000 USD cover is the current standard on several mission pages).";

const EXEMPTION_30 =
  "30 days for tourism on the visa exemption from 15 September 2026, down from 60. One extension of up to 30 days at immigration is possible at the officer's discretion.";

export const COUNTRIES: CountryData[] = [
  {
    slug: "united-states",
    name: "United States",
    demonym: "American",
    iso2: "US",
    exemptionDays: 30,
    exemptionNote: EXEMPTION_30,
    missions: [
      { name: "Royal Thai Embassy", city: "Washington, D.C.", url: "https://washingtondc.thaiembassy.org/en/page/visa-information" },
      { name: "Royal Thai Consulate-General", city: "New York", url: "https://newyork.thaiembassy.org/en/page/thailand-e-visa-service" },
      { name: "Royal Thai Consulate-General", city: "Chicago", url: "https://cgchicago.thaiembassy.org/en/page/about-us-consulate-s-jurisdiction?menu=62173ba1f56eef030778dfc3" },
      { name: "Royal Thai Consulate-General", city: "Los Angeles", url: "https://thaiconsulatela.thaiembassy.org/en/page/visa-information" },
    ],
    usesThaiEvisa: true,
    dtv: {
      policeCertificate: "FBI Identity History Summary. State police checks are reported not to qualify.",
      certificateMaxAge: "Issued within 3 months (Washington and Los Angeles)",
      residenceProof:
        "US citizens: passport. Los Angeles is reported to accept a permanent resident card or a valid US visa with at least 6 months left. Apply at the mission covering your state.",
      fee: "USD 400 (reported)",
      quirks: [
        "Washington asks for the last 3 months of bank statements with an ending balance of at least 500,000 THB each month.",
        "Jurisdiction is by state. Ohio is covered by New York, not Chicago.",
        "Thailand is not in the Apostille Convention, so documents for use in Thailand are reported to need US federal authentication plus Thai embassy legalisation, not an apostille.",
      ],
    },
    retirement: {
      incomeProof:
        "The US Embassy in Bangkok and Consulate in Chiang Mai do not notarise income affidavits (since 1 January 2019). In Thailand, use the 800,000 THB deposit or show monthly transfers of at least 65,000 THB into a Thai account. For an O-A from the US, check your mission's financial evidence list.",
      notes: [
        OA_POLICE_MEDICAL,
        "Washington says an online criminal record without an authorised signature is not accepted for the O-A, and asks for its own medical form.",
      ],
    },
    taxTreaty: true,
    notes: [
      "Order the FBI check early. It must be under 3 months old when you submit a DTV.",
      "Pick the mission by your state of residence, not by where you fly from.",
      "The 30-day exemption leaves little time to apply for anything else once you land.",
    ],
    sources: [
      TAT_EXEMPTION,
      { label: "Royal Thai Embassy Washington: DTV", url: "https://washingtondc.thaiembassy.org/en/page/dtv-visa" },
      { label: "Royal Thai Embassy Washington: Long-Stay (O-A)", url: "https://washingtondc.thaiembassy.org/en/page/non-oa" },
      { label: "Royal Thai Consulate-General Los Angeles: DTV", url: "https://thaiconsulatela.thaiembassy.org/en/publicservice/dtv-visa" },
      { label: "Royal Thai Consulate-General Los Angeles: jurisdiction", url: "https://thaiconsulatela.thaiembassy.org/en/page/jurisdiction" },
      { label: "US Embassy Bangkok: notarial services", url: "https://th.usembassy.gov/services/notarials/" },
      { label: "Revenue Department: Thailand-US tax convention", url: "https://www.rd.go.th/fileadmin/download/nation/america_e.pdf" },
      { label: "Reported: ASEAN NOW, DTV rules vary between embassies", url: "https://aseannow.com/thailand-news/thailand-dtv-rules-vary-between-thai-embassies-r3793" },
      { label: "Reported: Federal Apostille, FBI check legalisation for Thailand", url: "https://www.federalapostille.org/2026/10/10/fbi-background-check-thailand-legalization-apostille-2026/" },
      THAI_EVISA,
    ],
    confidence: "high",
    updated: UPDATED,
  },
  {
    slug: "united-kingdom",
    name: "United Kingdom",
    demonym: "British",
    iso2: "GB",
    exemptionDays: 30,
    exemptionNote: EXEMPTION_30,
    missions: [
      { name: "Royal Thai Embassy", city: "London", url: "https://london.thaiembassy.org/en/page/destination-thailand-visa" },
    ],
    usesThaiEvisa: true,
    dtv: {
      policeCertificate: "ACRO Police Certificate (an Irish police certificate is also accepted)",
      certificateMaxAge: "Issued within 6 months of submission",
      residenceProof:
        "Permanent status in the UK, Ireland or a British Overseas Territory, such as indefinite leave to remain. British citizens use their passport.",
      fee: "GBP 300",
      quirks: [
        "London states a funds figure of no less than GBP 12,000 (500,000 THB).",
        "Bank statements for the last 3 months are the common requirement.",
        "Dependants under 16 may submit the main applicant's police certificate, as reported from the London notice.",
      ],
    },
    retirement: {
      incomeProof:
        "The British Embassy in Bangkok stopped certifying income letters from 1 January 2019. It advised using the 800,000 THB deposit held at least 3 months, or monthly income of at least 65,000 THB transferred into a Thai account, shown by bank statements.",
      notes: [
        OA_POLICE_MEDICAL,
        "Some newer commercial sites say an embassy letter is available again. We found no current official source for that.",
      ],
    },
    taxTreaty: true,
    notes: [
      "Irish residents are covered by the London embassy for the DTV.",
      "ACRO certificates take time. Apply for one before you book anything.",
    ],
    sources: [
      TAT_EXEMPTION,
      LONDON_EXEMPTION,
      { label: "Royal Thai Embassy London: DTV", url: "https://london.thaiembassy.org/en/page/destination-thailand-visa" },
      { label: "Royal Thai Embassy London: adjustment of DTV supporting documents", url: "https://london.thaiembassy.org/en/content/adjustment-of-supporting-docdtv" },
      { label: "GOV.UK: British Embassy Bangkok stopping pension letters service", url: "https://assets.publishing.service.gov.uk/media/5bbaf38f40f0b664c1d219b2/SPP01.pdf" },
      { label: "GOV.UK: Thailand tax treaties", url: "https://www.gov.uk/government/publications/thailand-tax-treaties" },
      THAI_EVISA,
    ],
    confidence: "high",
    updated: UPDATED,
  },
  {
    slug: "australia",
    name: "Australia",
    demonym: "Australian",
    iso2: "AU",
    exemptionDays: 30,
    exemptionNote: EXEMPTION_30,
    missions: [
      { name: "Royal Thai Embassy", city: "Canberra", url: "https://canberra.thaiembassy.org/en/content/visa" },
      { name: "Royal Thai Consulate-General", city: "Sydney", url: "https://sydney.thaiembassy.org/en/page/enquiries" },
    ],
    usesThaiEvisa: true,
    dtv: {
      policeCertificate:
        "AFP National Police Check is the national certificate. Canberra has not been confirmed to name a type for the DTV.",
      certificateMaxAge: null,
      residenceProof: CHECK,
      fee: null,
      quirks: [
        "New South Wales residents apply to the Consulate-General in Sydney. Other states go to Canberra.",
        "Secondary sources disagree on the DTV fee in AUD, so check the mission page before paying.",
      ],
    },
    retirement: {
      incomeProof:
        "The Australian Embassy in Bangkok says it cannot verify income for Thai Immigration, and the Phuket consulate does not witness income declarations. Use the 800,000 THB deposit or monthly income of at least 65,000 THB paid into a Thai account.",
      notes: [
        OA_POLICE_MEDICAL,
        "Thai authorities have advised that certified copies of Australian income statements do not meet their evidence rules, per the Phuket consulate.",
      ],
    },
    taxTreaty: true,
    notes: [
      "Confirm the police certificate type and age limit with Canberra or Sydney before you order it.",
      "Plan to move pension income into a Thai account each month if you use the income route.",
    ],
    sources: [
      TAT_EXEMPTION,
      { label: "Royal Thai Embassy Canberra: DTV", url: "https://canberra.thaiembassy.org/destination-thailand-visa-dtv" },
      { label: "Royal Thai Embassy Canberra: visa (NSW residents to Sydney)", url: "https://canberra.thaiembassy.org/en/content/visa" },
      { label: "Australian Embassy Thailand: consular FAQs", url: "https://thailand.embassy.gov.au/bkok/Consular_FAQs.html" },
      { label: "Australian Consulate-General Phuket: notarial services", url: "https://phuket.consulate.gov.au/pket/Notarialservices.html" },
      { label: "Australian Embassy Thailand: police clearance", url: "https://thailand.embassy.gov.au/bkok/Police_Clearance.html" },
      { label: "Revenue Department: Thailand-Australia agreement", url: "https://www.rd.go.th/english/809.html" },
      THAI_EVISA,
    ],
    confidence: "medium",
    updated: UPDATED,
  },
  {
    slug: "canada",
    name: "Canada",
    demonym: "Canadian",
    iso2: "CA",
    exemptionDays: 30,
    exemptionNote: EXEMPTION_30,
    missions: [
      { name: "Royal Thai Embassy", city: "Ottawa", url: "https://ottawa.thaiembassy.org/en/page/types-of-visas-periods-of-stay-and-fees" },
      { name: "Royal Thai Consulate-General", city: "Vancouver", url: "https://www.thaiembassy.ca" },
    ],
    usesThaiEvisa: true,
    dtv: {
      policeCertificate: CHECK,
      certificateMaxAge: null,
      residenceProof: "Proof of permanent residence in Canada is reported. Canadian citizens use their passport.",
      fee: "CAD 650 (reported)",
      quirks: [
        "Vancouver is reported to cover British Columbia, Alberta and Yukon. Ottawa covers the rest of Canada.",
      ],
    },
    retirement: {
      incomeProof:
        "The Canadian Embassy in Bangkok is reported to have stopped income affidavits from 1 April 2025. Plan on the 800,000 THB deposit or 12 months of monthly transfers of at least 65,000 THB.",
      notes: [
        OA_POLICE_MEDICAL,
        "Ottawa says the O-A criminal record must be certified by a Notary Public, and the policy must cover COVID-19 treatment.",
      ],
    },
    taxTreaty: true,
    notes: [
      "Honorary consulates in Toronto, Montreal, Edmonton and Calgary are reported closed, so do not plan on them for visas.",
      "Get the police check notarised if you apply for an O-A through Ottawa.",
    ],
    sources: [
      TAT_EXEMPTION,
      { label: "Royal Thai Embassy Ottawa: types of visas and fees", url: "https://ottawa.thaiembassy.org/en/page/types-of-visas-periods-of-stay-and-fees" },
      { label: "Royal Thai Embassy Ottawa: O-A visa", url: "https://ottawa.thaiembassy.org/en/publicservice/non-immigrant-visa-o-a-for-temporary-residents-1-y?page=5f22345fc9f293258979a013&menu=5f223691ebdbb920f334d002" },
      { label: "Reported: ASEAN NOW, Canadian Embassy ends income affidavits 1 April 2025", url: "https://aseannow.com/topic/1352107-canadian-embassy-to-discontinue-income-affidavit-notary-service-april-1st-2025/" },
      { label: "Reported: dtv.in.th, DTV from Canada", url: "https://dtv.in.th/country/canada" },
      RD_FOREIGN_COMPANY_GUIDE,
      THAI_EVISA,
    ],
    confidence: "low",
    updated: UPDATED,
  },
  {
    slug: "germany",
    name: "Germany",
    demonym: "German",
    iso2: "DE",
    exemptionDays: 30,
    exemptionNote: EXEMPTION_30,
    missions: [
      { name: "Royal Thai Embassy", city: "Berlin", url: "https://berlin.thaiembassy.org/de/page/visaarten-und-die-erforderlichen-unterlagen?menu=624aee6e6d28e96cd62b9392" },
      { name: "Royal Thai Consulate-General", city: "Frankfurt", url: "https://frankfurt.thaiembassy.org/de/page/destination-thailand-visa" },
      { name: "Royal Thai Consulate-General", city: "Munich", url: "https://munich.thaiembassy.org/de/page/dtv1?menu=6697e07c038b2174e64a1733" },
    ],
    usesThaiEvisa: true,
    dtv: {
      policeCertificate: "Führungszeugnis from the Bundesamt für Justiz (digital version preferred in Frankfurt)",
      certificateMaxAge: "Frankfurt: not older than 6 months. Munich: not older than 3 months. Berlin: check with the embassy.",
      residenceProof:
        "Meldebescheinigung not older than 6 months. Non-German nationals also submit both sides of their residence permit card.",
      fee: null,
      quirks: [
        "Jurisdiction is split by federal state between Berlin, Frankfurt and Munich.",
        "Frankfurt is reported to require the address on your ID card to match the Meldebescheinigung.",
      ],
    },
    retirement: {
      incomeProof:
        "The German Embassy in Bangkok offers pension and income certificates (Renten- und Einkommensbescheinigungen) by appointment. Whether a local immigration office accepts one varies, so many people also keep the 800,000 THB deposit route ready.",
      notes: [OA_POLICE_MEDICAL],
    },
    taxTreaty: true,
    notes: [
      "Check which consulate covers your state before you open an e-Visa application.",
      "Age limits differ between German missions. Order the Führungszeugnis close to your filing date.",
    ],
    sources: [
      TAT_EXEMPTION,
      { label: "Royal Thai Consulate-General Frankfurt: DTV", url: "https://frankfurt.thaiembassy.org/de/page/destination-thailand-visa" },
      { label: "Royal Thai Consulate-General Munich: DTV workcation", url: "https://munich.thaiembassy.org/de/page/dtv1?menu=6697e07c038b2174e64a1733" },
      { label: "Royal Thai Embassy Berlin: visa types and documents", url: "https://berlin.thaiembassy.org/de/page/visaarten-und-die-erforderlichen-unterlagen?menu=624aee6e6d28e96cd62b9392" },
      { label: "German Foreign Office Bangkok: appointment system (income certificates)", url: "https://service2.diplo.de/rktermin/extern/choose_category.do?locationCode=bangk&realmId=1017&categoryId=2115&request_locale=en" },
      { label: "Revenue Department: Thailand-Germany agreement", url: "https://www.rd.go.th/english/797.html" },
      THAI_EVISA,
    ],
    confidence: "medium",
    updated: UPDATED,
  },
  {
    slug: "france",
    name: "France",
    demonym: "French",
    iso2: "FR",
    exemptionDays: 30,
    exemptionNote: EXEMPTION_30,
    missions: [
      { name: "Royal Thai Embassy", city: "Paris", url: "http://www.thaiembassy.fr/fr/visa-rdv/les-types-de-visa-et-les-documents-necessaires/dtv/" },
    ],
    usesThaiEvisa: true,
    dtv: {
      policeCertificate: "Extrait de casier judiciaire, bulletin n°3",
      certificateMaxAge: "Less than 3 months (reported from the Paris page; one source says 6 months)",
      residenceProof: "Proof of permanent residence: your most recent tax return (déclaration d'impôt).",
      fee: "EUR 350",
      quirks: [
        "Bank statements for the last 3 months. Paris is reported to state a minimum balance of EUR 15,000.",
        "Paris is reported to quote about 4 weeks processing, longer if the file is incomplete.",
      ],
    },
    retirement: {
      incomeProof:
        "The French Embassy in Bangkok certifies a sworn income statement (attestation sur l'honneur), not a verified income letter. You sign it in person, by appointment, at the embassy or a consular agency.",
      notes: [
        OA_POLICE_MEDICAL,
        "For an O-A from France, Paris is reported to ask for monthly income of at least EUR 2,000 or a balance of EUR 24,000. Check the embassy page.",
      ],
    },
    taxTreaty: true,
    notes: [
      "Keep your latest tax return handy. Paris uses it as DTV residence proof.",
      "Request the bulletin n°3 online shortly before you apply so it stays under 3 months old.",
    ],
    sources: [
      TAT_EXEMPTION,
      { label: "Royal Thai Embassy Paris: DTV", url: "http://www.thaiembassy.fr/fr/visa-rdv/les-types-de-visa-et-les-documents-necessaires/dtv/" },
      { label: "Royal Thai Embassy Paris: O-A long stay", url: "http://www.thaiembassy.fr/fr/visa-rdv/les-types-de-visa-et-les-documents-necessaires/visa-o-long-stay/" },
      { label: "French Embassy Bangkok: attestation de revenus", url: "https://th.diplomatie.gouv.fr/fr/vivre-venir/attestation-de-revenus-destination-des-autorites-thailandaises-pour-le-renouvellement" },
      { label: "Reported: Toute la Thaïlande, new DTV rules", url: "https://toutelathailande.fr/les-nouvelles-regles-du-visa-destination-thailande-creent-la-confusion/" },
      RD_FOREIGN_COMPANY_GUIDE,
      THAI_EVISA,
    ],
    confidence: "medium",
    updated: UPDATED,
  },
  {
    slug: "netherlands",
    name: "Netherlands",
    demonym: "Dutch",
    iso2: "NL",
    exemptionDays: 30,
    exemptionNote: EXEMPTION_30,
    missions: [
      { name: "Royal Thai Embassy", city: "The Hague", url: "https://hague.thaiembassy.org/th/publicservice/applying-for-visas-with-the-royal-thai-embassy-the-hague" },
    ],
    usesThaiEvisa: true,
    dtv: {
      policeCertificate: CHECK,
      certificateMaxAge: null,
      residenceProof: CHECK,
      fee: null,
      quirks: [
        "The Hague serves only applicants who are in the Netherlands for the whole process.",
        "The Amsterdam consulate no longer issues visas.",
        "The embassy advises applying at least 1 month, but no more than 2 months, before travel.",
      ],
    },
    retirement: {
      incomeProof:
        "The Dutch Embassy in Bangkok issues a visa support letter confirming declared monthly income from the Netherlands, backed by your documents. It is requested by post.",
      notes: [
        OA_POLICE_MEDICAL,
        "Some immigration offices are reported to want the letter under 6 months old.",
      ],
    },
    taxTreaty: true,
    notes: [
      "You cannot apply through The Hague while you are already in Thailand.",
      "Check The Hague's DTV page for its police certificate and residence rules before ordering documents.",
    ],
    sources: [
      TAT_EXEMPTION,
      { label: "Royal Thai Embassy The Hague: applying for e-Visas", url: "https://hague.thaiembassy.org/th/publicservice/applying-for-visas-with-the-royal-thai-embassy-the-hague" },
      { label: "Royal Thai Embassy The Hague: e-Visa categories and documents", url: "https://hague.thaiembassy.org/th/publicservice/e-visa-categories-required-documents" },
      { label: "Royal Thai Embassy The Hague: Amsterdam consulate stops visas", url: "https://hague.thaiembassy.org/th/content/discontinuation-visa-issuance-by-consulate-ams" },
      { label: "Netherlands Worldwide: visa support letter Thailand", url: "https://www.netherlandsworldwide.nl/declaration/visa-support-letter-thailand" },
      RD_FOREIGN_COMPANY_GUIDE,
      THAI_EVISA,
    ],
    confidence: "low",
    updated: UPDATED,
  },
  {
    slug: "sweden",
    name: "Sweden",
    demonym: "Swedish",
    iso2: "SE",
    exemptionDays: 30,
    exemptionNote: EXEMPTION_30,
    missions: [
      { name: "Royal Thai Embassy", city: "Stockholm", url: "https://thaiembassy.se/en/visa/announcement-from-visa-section/" },
    ],
    usesThaiEvisa: true,
    dtv: {
      policeCertificate: CHECK,
      certificateMaxAge: null,
      residenceProof: CHECK,
      fee: "SEK 3,700 (reported)",
      quirks: ["Stockholm is reported to handle e-Visas for residents of Sweden and Latvia."],
    },
    retirement: {
      incomeProof: "Check with the Swedish Embassy in Bangkok whether it issues an income letter. The 800,000 THB deposit route does not need one.",
      notes: [OA_POLICE_MEDICAL],
    },
    taxTreaty: true,
    notes: [
      "Sweden signed Thailand's first tax treaty, in 1963.",
      "Confirm the police certificate type and age limit with Stockholm before you order it.",
    ],
    sources: [
      TAT_EXEMPTION,
      { label: "Royal Thai Embassy Stockholm: visa section", url: "https://thaiembassy.se/en/visa/announcement-from-visa-section/" },
      { label: "Reported: thai-visa-services.com, Thai Embassy Stockholm", url: "https://www.thai-visa-services.com/embassy-consulates/thai-embassy-stockholm" },
      { label: "Revenue Department: Thailand-Sweden convention", url: "https://www.rd.go.th/fileadmin/download/nation/sweden_e.pdf" },
      THAI_EVISA,
    ],
    confidence: "low",
    updated: UPDATED,
  },
  {
    slug: "switzerland",
    name: "Switzerland",
    demonym: "Swiss",
    iso2: "CH",
    exemptionDays: 30,
    exemptionNote: EXEMPTION_30,
    missions: [
      { name: "Royal Thai Embassy", city: "Bern", url: "https://www.thaiembassy.ch" },
    ],
    usesThaiEvisa: true,
    dtv: {
      policeCertificate: CHECK,
      certificateMaxAge: null,
      residenceProof: CHECK,
      fee: "CHF 350 (reported)",
      quirks: ["Bern publishes its own DTV document list as a PDF on thaiembassy.ch."],
    },
    retirement: {
      incomeProof:
        "The Swiss Embassy in Bangkok lists a confirmation of pension among its online services. Users report it is accepted for extensions, but check with your immigration office.",
      notes: [OA_POLICE_MEDICAL],
    },
    taxTreaty: true,
    notes: [
      "Confirm with Bern whether Geneva or Zurich honorary offices handle any visa steps. We found no source.",
      "Swiss residents who are not Swiss nationals should check Bern's residence wording carefully.",
    ],
    sources: [
      TAT_EXEMPTION,
      { label: "Royal Thai Embassy Bern", url: "https://www.thaiembassy.ch" },
      { label: "Embassy of Switzerland in Thailand", url: "http://www.eda.admin.ch/bangkok" },
      { label: "Reported: dtv.in.th, DTV from Switzerland", url: "https://dtv.in.th/country/switzerland" },
      RD_MLI_POSITION,
      THAI_EVISA,
    ],
    confidence: "low",
    updated: UPDATED,
  },
  {
    slug: "ireland",
    name: "Ireland",
    demonym: "Irish",
    iso2: "IE",
    exemptionDays: 30,
    exemptionNote: EXEMPTION_30,
    missions: [
      { name: "Royal Thai Embassy (covers Ireland for the DTV)", city: "London", url: "https://london.thaiembassy.org/en/page/destination-thailand-visa" },
    ],
    usesThaiEvisa: true,
    dtv: {
      policeCertificate: "Irish Police Certificate from An Garda Síochána (not Garda vetting). London accepts it.",
      certificateMaxAge: "Issued within 6 months of submission (London)",
      residenceProof: "London accepts permanent residence in the UK, Ireland or a British Overseas Territory. Irish citizens use their passport.",
      fee: "GBP 300 (London)",
      quirks: [
        "The Garda certificate is free and usually takes about 3 weeks. Apply by post to your District Superintendent.",
        "The status of the Thai honorary consulate in Dublin is unclear. Plan on applying through London.",
      ],
    },
    retirement: {
      incomeProof: "Check with the Irish Embassy in Bangkok whether it issues an income letter. The 800,000 THB deposit route does not need one.",
      notes: [OA_POLICE_MEDICAL],
    },
    taxTreaty: true,
    notes: [
      "Ask for a Police Certificate, not Garda vetting. They are different products.",
      "Your DTV is decided by the London embassy, so follow London's rules.",
    ],
    sources: [
      TAT_EXEMPTION,
      LONDON_EXEMPTION,
      { label: "Royal Thai Embassy London: DTV", url: "https://london.thaiembassy.org/en/page/destination-thailand-visa" },
      { label: "Royal Thai Embassy London: adjustment of DTV supporting documents", url: "https://london.thaiembassy.org/en/content/adjustment-of-supporting-docdtv" },
      { label: "Citizens Information: police certificate", url: "https://www.citizensinformation.ie/en/moving-country/moving-abroad/leaving-ireland/police-certificate/" },
      RD_MLI_POSITION,
      THAI_EVISA,
    ],
    confidence: "medium",
    updated: UPDATED,
  },
  {
    slug: "new-zealand",
    name: "New Zealand",
    demonym: "New Zealander",
    iso2: "NZ",
    exemptionDays: 30,
    exemptionNote: EXEMPTION_30,
    missions: [
      { name: "Royal Thai Embassy", city: "Wellington", url: "https://wellington.thaiembassy.org" },
    ],
    usesThaiEvisa: true,
    dtv: {
      policeCertificate: CHECK,
      certificateMaxAge: null,
      residenceProof: CHECK,
      fee: null,
      quirks: [],
    },
    retirement: {
      incomeProof:
        "The New Zealand Embassy in Bangkok takes statutory declarations in person only. Its July 2025 marriage guide lists a 2,000 THB fee for a statutory declaration. Confirm it covers income before you rely on it.",
      notes: [OA_POLICE_MEDICAL],
    },
    taxTreaty: true,
    notes: [
      "Wellington's current DTV checklist was not found in our search. Check it before ordering a police certificate.",
      "Book the statutory declaration in person in Bangkok if you use the income route.",
    ],
    sources: [
      TAT_EXEMPTION,
      { label: "Royal Thai Embassy Wellington", url: "https://wellington.thaiembassy.org" },
      { label: "MFAT: New Zealand Embassy Bangkok, marriage in Thailand (statutory declaration fee)", url: "https://www.mfat.govt.nz/assets/NZ-Embassies/Thailand-BANGKOK/Marriage-in-Thailand.pdf" },
      { label: "MFAT: living in Thailand", url: "https://www.mfat.govt.nz/en/countries-and-regions/asia/thailand/new-zealand-embassy/living-in-thailand" },
      { label: "NZ Inland Revenue: Thailand tax treaty", url: "https://taxpolicy.ird.govt.nz/tax-treaties/thailand" },
      THAI_EVISA,
    ],
    confidence: "low",
    updated: UPDATED,
  },
  {
    slug: "singapore",
    name: "Singapore",
    demonym: "Singaporean",
    iso2: "SG",
    exemptionDays: 30,
    exemptionNote:
      "30 days on the visa exemption from 15 September 2026 (reported list). The two-land-entries-a-year limit is reported not to apply to Singapore passports.",
    missions: [
      { name: "Royal Thai Embassy", city: "Singapore", url: "https://singapore.thaiembassy.org/en/page/dtv-visa-workcation" },
    ],
    usesThaiEvisa: true,
    dtv: {
      policeCertificate: CHECK,
      certificateMaxAge: null,
      residenceProof:
        "DTV is granted only to Singapore citizens and permanent residents. PRs submit both sides of the blue identity card and a Re-entry Permit (Form 7).",
      fee: null,
      quirks: [
        "Only Singapore and Thai bank savings accounts are accepted. Investment and CPF accounts are not.",
        "Employment Pass holders are not listed as eligible on the embassy page.",
      ],
    },
    retirement: {
      incomeProof: "Check with your mission. The embassy publishes an O-A page with its own financial and insurance rules.",
      notes: [OA_POLICE_MEDICAL],
    },
    taxTreaty: true,
    notes: [
      "Foreigners working in Singapore on a pass cannot use the Singapore embassy for a DTV unless they hold PR.",
      "CPF balances do not count as DTV funds.",
    ],
    sources: [
      { label: "Reported: Thailand Elite, 30-day visa exemption 2026", url: "https://www.thailandelite.net/thailand-30-day-visa-exemption-2026" },
      { label: "Royal Thai Embassy Singapore: DTV workcation", url: "https://singapore.thaiembassy.org/en/page/dtv-visa-workcation" },
      { label: "Royal Thai Embassy Singapore: DTV spouse and children", url: "https://singapore.thaiembassy.org/en/page/dtv-visa-spouse-and-children-under-20-years-old" },
      { label: "Royal Thai Embassy Singapore: O-A long stay", url: "https://singapore.thaiembassy.org/en/page/non-immigrant-visa-o-a-long-stay" },
      RD_MLI_POSITION,
      THAI_EVISA,
    ],
    confidence: "medium",
    updated: UPDATED,
  },
  {
    slug: "india",
    name: "India",
    demonym: "Indian",
    iso2: "IN",
    exemptionDays: 30,
    exemptionNote:
      "Indian passport holders are on the 30-day exemption for tourism from 15 September 2026, per the Royal Thai Embassy in New Delhi. Visa on arrival is no longer offered to Indians, as reported.",
    missions: [
      { name: "Royal Thai Embassy", city: "New Delhi", url: "https://newdelhi.thaiembassy.org/en/content/the-revision-of-thailand-s-visa-exemption-and-voa" },
      { name: "Royal Thai Consulate-General", city: "Mumbai", url: "https://www.vfsglobal.com/one-pager/thailand/india/english/" },
      { name: "Royal Thai Consulate-General", city: "Chennai", url: "https://www.thaiconsulategeneralchennai.com/aboutus.php?id=5" },
      { name: "Royal Thai Consulate-General", city: "Kolkata", url: "https://kolkata.thaiembassy.org/en/content/the-implementation-of-the-electronic-visa-system-e" },
    ],
    usesThaiEvisa: true,
    dtv: {
      policeCertificate: CHECK,
      certificateMaxAge: null,
      residenceProof: "Indian citizens use their passport. Apply at the mission covering your state.",
      fee: "INR 30,000 (reported)",
      quirks: [
        "Applications must go through thaievisa.go.th only. Agencies stopped filing ordinary passport applications from 16 December 2024.",
        "Jurisdiction is by state: Mumbai, Chennai and Kolkata each cover a list of states, New Delhi the rest.",
      ],
    },
    retirement: {
      incomeProof: "Check with your mission. The 800,000 THB deposit route does not need an embassy letter.",
      notes: [OA_POLICE_MEDICAL],
    },
    taxTreaty: true,
    notes: [
      "Indian nationals can no longer use Vientiane, Dhaka or other nearby missions for a DTV unless they live there permanently.",
      "Check your state's consulate on the e-Visa portal before you pay.",
    ],
    sources: [
      { label: "Royal Thai Embassy New Delhi: revision for Indian passport holders", url: "https://newdelhi.thaiembassy.org/en/content/the-revision-of-thailand-s-visa-exemption-and-voa" },
      { label: "Royal Thai Consulate-General Kolkata: e-Visa in India", url: "https://kolkata.thaiembassy.org/en/content/the-implementation-of-the-electronic-visa-system-e" },
      { label: "VFS Global: Thailand visa information in India (jurisdictions)", url: "https://www.vfsglobal.com/one-pager/thailand/india/english/" },
      { label: "Reported: visarun.ai, Thailand visa exemption for Indians 2026", url: "https://visarun.ai/blog/thailand-visa-on-arrival-for-indians-2026" },
      { label: "Reported: travelmantoday.com, DTV rules 2026", url: "https://travelmantoday.com/thailand-dtv-visa-rules-2026/" },
      { label: "Revenue Department: Thailand-India agreement", url: "https://www.rd.go.th/fileadmin/download/nation/india_e_revised.pdf" },
      THAI_EVISA,
    ],
    confidence: "medium",
    updated: UPDATED,
  },
  {
    slug: "japan",
    name: "Japan",
    demonym: "Japanese",
    iso2: "JP",
    exemptionDays: 30,
    exemptionNote: EXEMPTION_30,
    missions: [
      { name: "Royal Thai Embassy", city: "Tokyo", url: "https://site.thaiembassy.jp/en/" },
      { name: "Royal Thai Consulate-General", city: "Osaka", url: "https://osaka.thaiembassy.org/en/content/announcement-updated-requirements-dtv?cate=68ba81bef5a86e0c40362e03" },
      { name: "Royal Thai Consulate-General", city: "Fukuoka", url: "https://fukuoka.thaiembassy.org/en/page/endtvvisa" },
    ],
    usesThaiEvisa: true,
    dtv: {
      policeCertificate: "Criminal record certificate from your country of nationality or permanent residence",
      certificateMaxAge: "3 months is reported for missions in Japan. Fukuoka accepts proof you are too young to get one.",
      residenceProof:
        "Tokyo is reported to accept a My Number Card or driving licence for Japanese nationals, and a My Number Card or Residence Card for others.",
      fee: null,
      quirks: [
        "Bank statements for 3 months are reported for Japan.",
        "Tokyo is reported to require an apostille on civil documents. Unconfirmed.",
      ],
    },
    retirement: {
      incomeProof: "Check with your mission. The 800,000 THB deposit route does not need an embassy letter.",
      notes: [OA_POLICE_MEDICAL],
    },
    taxTreaty: true,
    notes: [
      "Apply at the mission covering your registered prefecture.",
      "Ask Tokyo whether a preliminary DTV consultation is needed. Users report one.",
    ],
    sources: [
      TAT_EXEMPTION,
      { label: "Royal Thai Consulate-General Osaka: updated DTV requirements", url: "https://osaka.thaiembassy.org/en/content/announcement-updated-requirements-dtv?cate=68ba81bef5a86e0c40362e03" },
      { label: "Royal Thai Consulate-General Fukuoka: DTV", url: "https://fukuoka.thaiembassy.org/en/page/endtvvisa" },
      { label: "MFA: Royal Thai Embassy Tokyo e-Visa information (Jan 2025)", url: "https://image.mfa.go.th/mfa/0/YLjhuT4Hho/Consular_Service/EN_Info_for_e-VISA_20250110.pdf" },
      { label: "Reported: Shelter Global, DTV requirements updated September 2026", url: "https://shelter.global/thailand-dtv-requirements-updated-september-2026/" },
      { label: "Revenue Department: Thailand-Japan convention", url: "https://www.rd.go.th/fileadmin/download/nation/japan_e.pdf" },
      THAI_EVISA,
    ],
    confidence: "medium",
    updated: UPDATED,
  },
];

// Shared sources used by every country page.
export const COUNTRY_SHARED_SOURCES = [MFA_OA_CHECKLIST, MFA_NON_O_RETIREMENT, BANGKOK_IMMIGRATION, RD_FOREIGN_COMPANY_GUIDE];

// Plural for headings and anchors: "Americans", but "British citizens", not "Britishs".
const PEOPLE: Record<string, string> = { British: "British citizens", French: "French citizens", Dutch: "Dutch citizens", Swedish: "Swedes", Swiss: "Swiss citizens", Irish: "Irish citizens", Japanese: "Japanese citizens" };
export const people = (c: Pick<CountryData, "demonym">) => PEOPLE[c.demonym] ?? `${c.demonym}s`;
