// Long-stay destination data for neighbourhood, town and island pages.
// Researched 4 November 2026. Facts policy: docs/editorial-brief.md.
// No prices, rents or statistics. "Reported" means a secondary source, not an Immigration Bureau page.
// Office locations move. Every immigration note tells the reader to confirm before visiting.

export type PlaceKind = "neighbourhood" | "town" | "island";
export type Place = {
  slug: string;
  name: string;
  city: string;
  citySlug: string;
  kind: PlaceKind;
  lat: number;
  lng: number;
  zoom: number;
  bbox: [number, number, number, number]; // [minLng, minLat, maxLng, maxLat]
  tagline: string;
  answer: string;
  bestFor: string[];
  notIdealFor: string[];
  vibe: string;
  gettingAround: string;
  immigrationOffice: { name: string; note: string };
  visaNotes: string[];
  costLevel: "lower" | "mid" | "higher";
  climateNote: string;
  faqs: { question: string; answer: string }[];
  sources: { label: string; url: string }[];
  updated: "2026-11-04";
};

const UPDATED = "2026-11-04" as const;

// Shared sources
const TM30 = {
  label: "Immigration Bureau: notification of residence for foreigners (TM30)",
  url: "https://www.immigration.go.th/en/?p=14721",
};
const IMM_DIVISIONS = {
  label: "Bangkok Immigration FAQ: regional immigration divisions",
  url: "https://bangkok.immigration.go.th/en/faq_en/",
};
const BKK_IMM = {
  label: "Bangkok Immigration: extension of stay",
  url: "https://bangkok.immigration.go.th/en/visa-extension/",
};
const BKK_CW = {
  label: "Thai Visa Services: Bangkok Immigration, Chaeng Wattana (secondary)",
  url: "https://www.thai-visa-services.com/immigration-offices/bangkok-chaeng-wattana",
};
const CM_IMM = {
  label: "Chiang Mai Immigration (official): 71 Airport Road",
  url: "https://chiangmai.immigration.go.th/en/front-page-english/",
};
const CM_LOCALS = {
  label: "CM Locals: Airport Road vs Central Festival counters (secondary)",
  url: "https://cmlocals.com/immigration/chiang-mai-office/",
};
const CM_PROPERTY = {
  label: "Chiang Mai Property: Chiang Mai immigration office locations (secondary)",
  url: "https://chiangmai-property.com/chiang-mai/blog/chiang-mai-immigration-office",
};
const PKT_IMM = {
  label: "Phuket immigration for long-stayers, October 2026 (secondary)",
  url: "https://www.patong-thailand.com/2026/10/phuket-immigration-sorted-tm30-90-day.html",
};
const PKT_IMM2 = {
  label: "Thai Visa Services: Phuket Immigration Office (secondary)",
  url: "https://www.thai-visa-services.com/immigration-offices/phuket-immigration",
};
const JOMTIEN_IMM = {
  label: "Pattaya Visa Help: Jomtien (Chonburi) Immigration Office (secondary)",
  url: "https://pattayavisahelp.com/guides/jomtien-immigration-office/",
};
const HH_IMM = {
  label: "Next Step Hua Hin: Thap Tai and BluPort immigration offices (secondary)",
  url: "https://nextstephuahin.com/hua-hin-immigration-office-guide/",
};
const HH_BLUPORT = {
  label: "Hua Hin Today: BluPort immigration counter moves to 3rd floor (July 2025)",
  url: "https://huahintoday.com/hua-hin-news/immigration-office-at-bluport-hua-hin-relocates-to-3rd-floor/",
};
const SAMUI_IMM = {
  label: "KohPlanner: Immigration Office Koh Samui, Mae Nam (secondary)",
  url: "https://kohplanner.com/immigration-office-koh-samui/",
};
const PHANGAN_IMM = {
  label: "Phanganist: immigration office opening on Koh Phangan (secondary, archived)",
  url: "https://web.archive.org/web/20260122170539/https://phanganist.com/koh-phangan-news-visa-koh-phangan-life-article/immigration-office-opening-koh-phangan",
};
const KRABI_IMM = {
  label: "Thai Visa Services: Krabi Immigration Office, Sai Thai (secondary)",
  url: "https://www.thai-visa-services.com/immigration-offices/krabi-immigration",
};
const LANTA_VISA = {
  label: "Lanta Island Property: staying longer on Koh Lanta (secondary)",
  url: "https://lantaislandproperty.com/stay-longer-koh-lanta-thai-visas/",
};
const CR_IMM = {
  label: "Chiang Rai Immigration (official)",
  url: "https://chiangrai.immigration.go.th/en/frontpage-english/",
};
const CR_TIMES = {
  label: "Chiang Rai Times: Chiang Rai immigration queues (secondary)",
  url: "https://www.chiangraitimes.com/visas-immigration/chiang-rai-immigration-lines/",
};
const MHS_IMM = {
  label: "Mae Hong Son Immigration (official): address and maps",
  url: "https://maehongson.immigration.go.th/en/address-and-maps-2/",
};
const PAI_POST = {
  label: "Bangkok Post: immigration checks in Pai (February 2025)",
  url: "https://www.bangkokpost.com/thailand/general/2964833/israelis-under-immigration-microscope-in-pai",
};
const KK_IMM = {
  label: "Khon Kaen Immigration (official)",
  url: "https://khonkaen.immigration.go.th/index.php/en/",
};
const KK_IMM2 = {
  label: "Thai Visa Services: Khon Kaen Immigration (secondary)",
  url: "https://www.thai-visa-services.com/immigration-offices/khon-kaen-immigration",
};
const UDON_IMM = {
  label: "Move2Thailand: Udon Thani Immigration Office (secondary)",
  url: "https://move2thailand.com/udon-thani-immigration-office-thailand/",
};
const MONSOON = {
  label: "Thailand.go.th: monsoon winds and the climate of Thailand",
  url: "https://thailand.go.th/event-detail/099_143",
};
const HAZE = {
  label: "IQAir: Chiang Mai during Thailand's burning season (March 2026)",
  url: "https://www.iqair.cn/cn-en/newsroom/chiang-mai-ranks-among-the-top-10-most-polluted-cities-during-thailand-s-burning-season-3-4-2026",
};
const DTV_MFA = {
  label: "MFA: DTV checklist",
  url: "https://image.mfa.go.th/mfa/0/n3gTFT2TOE/Visa_Requirements/Checklist_DTV.pdf",
};
const MUAY_DTV = {
  label: "The Thaiger: securing a Muay Thai DTV (secondary)",
  url: "https://thethaiger.com/guides/visa-information/how-to-secure-your-muay-thai-dtv-visa-without-the-risk",
};

// Shared notes
const NOTE_TM30 =
  "Your landlord or hotel must file a TM30 residence notification. Ask for a copy, because offices often want it for 90-day reports and extensions.";
const NOTE_90_ONLINE =
  "90-day reports can reportedly be filed online after your first in-person report. Keep a paper backup in case the system refers you to the office.";
const NOTE_PROVINCE =
  "File at the immigration office for the province where your address is registered, not simply the nearest one.";

const NORTH_CLIMATE =
  "Burning season haze typically runs January to April and peaks in March, so many residents leave or buy air purifiers.";
const ANDAMAN_CLIMATE =
  "The southwest monsoon usually brings the wettest weather from mid-May to mid-October, with rough seas on west-facing beaches.";
const GULF_CLIMATE =
  "The Gulf islands follow a different pattern: rain can persist into December, so the late-year months are often the wettest.";
const CENTRAL_CLIMATE =
  "The rainy season usually runs from mid-May to mid-October, with heavy afternoon storms and occasional street flooding.";

export const PLACES: Place[] = [
  // ---------------- Bangkok ----------------
  {
    slug: "bangkok-sukhumvit",
    name: "Sukhumvit (Asok to Phrom Phong)",
    city: "Bangkok",
    citySlug: "bangkok",
    kind: "neighbourhood",
    lat: 13.7338,
    lng: 100.565,
    zoom: 15,
    bbox: [100.552, 13.725, 100.577, 13.744],
    tagline: "Bangkok's busiest expat strip, built around the BTS and MRT.",
    answer:
      "Sukhumvit between Asok and Phrom Phong suits remote workers and newcomers who want everything within walking distance of the BTS. It is dense, busy and international, with malls, clinics and co-working spaces. Rents sit at the top of the Bangkok range. Residents handle 90-day reports and extensions at Bangkok Immigration, Chaeng Wattana.",
    bestFor: [
      "Remote workers on a DTV who want BTS and MRT access",
      "First-time arrivals who want an easy landing",
      "People who want international hospitals and supermarkets nearby",
      "Students at central Bangkok language schools",
    ],
    notIdealFor: ["Budget-focused long-stayers", "Anyone who wants quiet streets or green space"],
    vibe:
      "High-rise condos, malls and side sois packed with restaurants. It is one of the most international parts of Bangkok, so English is widely used. Costs are higher because demand from expats and business travellers is strong.",
    gettingAround:
      "Asok BTS connects to Sukhumvit MRT, and Phrom Phong BTS sits next to the malls. Most errands are walkable or one stop away.",
    immigrationOffice: {
      name: "Bangkok Immigration, Chaeng Wattana Government Complex (Building B)",
      note: "One office serves every Bangkok address. It is in Lak Si in the north of the city, so allow a long trip by taxi or MRT Pink Line.",
    },
    visaNotes: [
      "Many Bangkok residents file 90-day reports online or by post to avoid the trip to Chaeng Wattana.",
      NOTE_TM30,
      "Language schools for the ED visa are common in this area. Check that a school is licensed before you pay. See /visa-rules/education-visa.",
    ],
    costLevel: "higher",
    climateNote: CENTRAL_CLIMATE,
    faqs: [
      {
        question: "Is Sukhumvit a good base for a long stay in Bangkok?",
        answer:
          "Yes, if you value convenience over cost. Two train lines meet at Asok, and most daily needs are walkable. The trade-off is noise, traffic and higher rents.",
      },
      {
        question: "Where do Sukhumvit residents do their 90-day report?",
        answer:
          "At Bangkok Immigration in the Chaeng Wattana Government Complex, Building B. You can also file online after your first report, or by post.",
      },
      {
        question: "Do I need a car in Sukhumvit?",
        answer:
          "No. The BTS, MRT, taxis and ride-hailing apps cover most trips. A car often slows you down in Sukhumvit traffic.",
      },
      {
        question: "Is Sukhumvit good for families?",
        answer:
          "It works for families who want short commutes to international schools and hospitals. Outdoor space is limited, so many families prefer areas further east.",
      },
    ],
    sources: [BKK_IMM, BKK_CW, TM30, MONSOON],
    updated: UPDATED,
  },
  {
    slug: "bangkok-thonglor-ekkamai",
    name: "Thonglor and Ekkamai",
    city: "Bangkok",
    citySlug: "bangkok",
    kind: "neighbourhood",
    lat: 13.729,
    lng: 100.584,
    zoom: 15,
    bbox: [100.572, 13.714, 100.595, 13.745],
    tagline: "Bangkok's upscale dining and nightlife district, a little calmer than Asok.",
    answer:
      "Thonglor and Ekkamai suit remote workers, couples and families who want a polished, food-focused neighbourhood with BTS access. Long sois run north from Sukhumvit, lined with cafes, bars and serviced apartments. Costs are among the highest in Bangkok. Residents use Bangkok Immigration at Chaeng Wattana for 90-day reports and extensions.",
    bestFor: [
      "Remote workers who want cafes and co-working nearby",
      "Couples and families with a higher housing budget",
      "People who want nightlife without the Nana and Asok crowds",
    ],
    notIdealFor: ["Budget long-stayers", "People who want to walk everywhere, since the sois are long"],
    vibe:
      "A trendy, mostly Thai and Japanese upscale area with a strong food and bar scene. Streets are quieter than Asok but the sois are long. Costs are higher because the area targets well-off Thais and expats.",
    gettingAround:
      "Thong Lo and Ekkamai BTS stations sit on Sukhumvit Road. Motorbike taxis at the mouth of each soi cover the long walk north.",
    immigrationOffice: {
      name: "Bangkok Immigration, Chaeng Wattana Government Complex (Building B)",
      note: "One office serves every Bangkok address. Book ahead where the online queue system is offered, and confirm hours before you go.",
    },
    visaNotes: [
      NOTE_TM30,
      "Serviced apartments usually file TM30 for you. Private condo owners sometimes forget, so ask before move-in.",
      NOTE_90_ONLINE,
    ],
    costLevel: "higher",
    climateNote: CENTRAL_CLIMATE,
    faqs: [
      {
        question: "Is Thonglor better than Sukhumvit Asok for expats?",
        answer:
          "Thonglor is calmer and more food-focused, while Asok is better connected. Both are expensive. Choose Thonglor if you work from cafes and do not need two train lines.",
      },
      {
        question: "Where is the nearest immigration office to Thonglor?",
        answer:
          "Bangkok has one main office for residents, at the Chaeng Wattana Government Complex in Lak Si. It is a long trip from Thonglor, so many people file 90-day reports online.",
      },
      {
        question: "Is Ekkamai good for families?",
        answer:
          "Many families like Ekkamai for its quieter sois and larger apartments. Check school commutes at rush hour before you sign a lease.",
      },
      {
        question: "Can I live in Thonglor on a DTV?",
        answer:
          "Yes. The DTV does not limit where you live. You still need TM30 from your landlord and 90-day reports. See /visa-rules/dtv.",
      },
    ],
    sources: [BKK_IMM, BKK_CW, TM30, MONSOON],
    updated: UPDATED,
  },
  {
    slug: "bangkok-ari",
    name: "Ari",
    city: "Bangkok",
    citySlug: "bangkok",
    kind: "neighbourhood",
    lat: 13.781,
    lng: 100.544,
    zoom: 15,
    bbox: [100.535, 13.772, 100.553, 13.79],
    tagline: "Leafy, local and cafe-heavy, on the BTS north of the centre.",
    answer:
      "Ari suits remote workers and creatives who want a calmer, more local Bangkok with BTS access. It has low-rise lanes, independent cafes and fewer tourists than Sukhumvit. Costs are mid-range for Bangkok. It is also the closest of the central neighbourhoods to Bangkok Immigration at Chaeng Wattana, where residents file reports and extensions.",
    bestFor: [
      "Remote workers who want a quieter, local feel",
      "People who want a shorter trip to Chaeng Wattana immigration",
      "Long-stayers who want BTS access without Sukhumvit prices",
    ],
    notIdealFor: ["People who want beach-style nightlife", "Families who need international schools nearby"],
    vibe:
      "A residential area with many Thai office workers, government buildings and small cafes. It feels slower than downtown. Costs tend to be mid-range because it is less aimed at short-term expats.",
    gettingAround:
      "Ari BTS on the Sukhumvit Line runs south to Siam in a few stops. Taxis to Chaeng Wattana are shorter from here than from downtown.",
    immigrationOffice: {
      name: "Bangkok Immigration, Chaeng Wattana Government Complex (Building B)",
      note: "One office serves every Bangkok address. From Ari the trip north is shorter than from Sukhumvit or Silom.",
    },
    visaNotes: [NOTE_TM30, NOTE_90_ONLINE, "If you study in central Bangkok on an ED visa, check the commute to your school, since attendance is checked."],
    costLevel: "mid",
    climateNote: CENTRAL_CLIMATE,
    faqs: [
      {
        question: "Is Ari a good area for digital nomads in Bangkok?",
        answer:
          "Many remote workers choose Ari for its cafes and quieter streets. It is on the BTS, so the centre is easy to reach.",
      },
      {
        question: "Is Ari close to Bangkok Immigration?",
        answer:
          "It is closer than most central neighbourhoods. Bangkok Immigration is at the Chaeng Wattana Government Complex in Lak Si, north of Ari.",
      },
      {
        question: "Is Ari cheaper than Sukhumvit?",
        answer:
          "It is usually seen as more affordable than prime Sukhumvit. Prices vary by building, so compare listings before you commit.",
      },
      {
        question: "Do people speak English in Ari?",
        answer:
          "Less than in Sukhumvit. Basic Thai helps, and many long-stayers in Ari take Thai classes.",
      },
    ],
    sources: [BKK_IMM, BKK_CW, TM30, MONSOON],
    updated: UPDATED,
  },
  {
    slug: "bangkok-silom-sathorn",
    name: "Silom and Sathorn",
    city: "Bangkok",
    citySlug: "bangkok",
    kind: "neighbourhood",
    lat: 13.725,
    lng: 100.53,
    zoom: 15,
    bbox: [100.515, 13.715, 100.545, 13.735],
    tagline: "Bangkok's business district, next to Lumphini Park.",
    answer:
      "Silom and Sathorn suit professionals, families and retirees who want a central base near Lumphini Park, embassies and hospitals. It is Bangkok's main business district, busy on weekdays and quieter at weekends. Costs are higher than average. Residents file 90-day reports and extensions at Bangkok Immigration, Chaeng Wattana Government Complex.",
    bestFor: [
      "Professionals working in the central business district",
      "Retirees who want hospitals and a large park nearby",
      "People who need regular embassy visits",
    ],
    notIdealFor: ["Budget long-stayers", "People who want a village feel"],
    vibe:
      "Office towers, embassies and older shophouse streets sit side by side. Lumphini Park gives rare green space. Costs are higher because of the central location and corporate demand.",
    gettingAround:
      "Sala Daeng BTS links to Silom MRT, and Chong Nonsi BTS serves Sathorn. The BTS also reaches the river at Saphan Taksin.",
    immigrationOffice: {
      name: "Bangkok Immigration, Chaeng Wattana Government Complex (Building B)",
      note: "One office serves every Bangkok address. Silom MRT connects towards the north, but allow plenty of time.",
    },
    visaNotes: [NOTE_TM30, NOTE_90_ONLINE, "Retirees on a Non-O extension must meet the funds rules at each renewal. See /visa-rules/retirement-visa."],
    costLevel: "higher",
    climateNote: CENTRAL_CLIMATE,
    faqs: [
      {
        question: "Is Silom a good place for retirees in Bangkok?",
        answer:
          "It suits retirees who want walkable access to hospitals, the park and transit. It is busy and urban, so it is not for those who want calm.",
      },
      {
        question: "Where do Sathorn residents renew their visa?",
        answer:
          "At Bangkok Immigration in the Chaeng Wattana Government Complex. All Bangkok addresses use this office.",
      },
      {
        question: "Is Silom safe at night?",
        answer:
          "Main roads are busy late into the evening. As anywhere, use the usual care around nightlife streets.",
      },
      {
        question: "Can families live in Sathorn?",
        answer:
          "Yes. Sathorn has larger condos and quieter side streets. Check school commute times in rush hour.",
      },
    ],
    sources: [BKK_IMM, BKK_CW, TM30, MONSOON],
    updated: UPDATED,
  },
  {
    slug: "bangkok-riverside",
    name: "Riverside (Charoen Krung)",
    city: "Bangkok",
    citySlug: "bangkok",
    kind: "neighbourhood",
    lat: 13.725,
    lng: 100.514,
    zoom: 15,
    bbox: [100.505, 13.712, 100.522, 13.74],
    tagline: "Old Bangkok by the Chao Phraya, with galleries and river boats.",
    answer:
      "Riverside along Charoen Krung suits writers, creatives and retirees who want old Bangkok character by the Chao Phraya. Expect heritage shophouses, galleries, riverside condos and boat commutes. Costs range from mid to high, depending on river views. Residents use Bangkok Immigration at the Chaeng Wattana Government Complex for 90-day reports and extensions.",
    bestFor: [
      "Creatives and writers who want character over convenience",
      "Retirees who like river views and slower streets",
      "Remote workers who are happy to commute by boat",
    ],
    notIdealFor: ["People who need fast BTS access everywhere", "Night owls who want a big bar scene"],
    vibe:
      "One of Bangkok's oldest roads, with Chinese shophouses, churches and a growing arts scene. It feels slower than Sukhumvit. Riverside condos with views cost more, while older buildings inland are cheaper, which puts the area in the middle overall.",
    gettingAround:
      "Saphan Taksin BTS meets the Chao Phraya Express Boat pier. Boats and the MRT at Hua Lamphong cover the northern end.",
    immigrationOffice: {
      name: "Bangkok Immigration, Chaeng Wattana Government Complex (Building B)",
      note: "One office serves every Bangkok address. The trip from the river is long, so most residents file 90-day reports online.",
    },
    visaNotes: [NOTE_TM30, NOTE_90_ONLINE, "If you rent a shophouse from a private owner, agree in writing who files TM30."],
    costLevel: "mid",
    climateNote: CENTRAL_CLIMATE,
    faqs: [
      {
        question: "Is Charoen Krung a good place to live long term?",
        answer:
          "It suits people who value character and the river. Transit is thinner than in Sukhumvit, so expect more boat and taxi trips.",
      },
      {
        question: "Which immigration office serves Riverside?",
        answer:
          "Bangkok Immigration at the Chaeng Wattana Government Complex. Every Bangkok address uses this office for extensions and reports.",
      },
      {
        question: "Does the river flood?",
        answer:
          "Low streets near the river can flood in heavy storms in the rainy season. Ask about past flooding before you rent a ground-floor unit.",
      },
      {
        question: "Is Riverside good for retirees?",
        answer:
          "Many retirees like the views and slower pace. Check the distance to your preferred hospital and how you will get there.",
      },
    ],
    sources: [BKK_IMM, BKK_CW, TM30, MONSOON],
    updated: UPDATED,
  },
  {
    slug: "bangkok-on-nut-bang-chak",
    name: "On Nut and Bang Chak",
    city: "Bangkok",
    citySlug: "bangkok",
    kind: "neighbourhood",
    lat: 13.701,
    lng: 100.603,
    zoom: 15,
    bbox: [100.592, 13.69, 100.615, 13.712],
    tagline: "Value Bangkok living on the BTS, east of the centre.",
    answer:
      "On Nut and Bang Chak suit budget-conscious remote workers, students and teachers who still want BTS access. It is residential and local, with markets, newer condos and fewer tourists. Costs are lower than central Sukhumvit. Residents file 90-day reports and extensions at Bangkok Immigration, Chaeng Wattana Government Complex.",
    bestFor: [
      "Remote workers on a budget who want BTS access",
      "ED visa students commuting into central Bangkok",
      "Teachers and long-stayers who want a local feel",
    ],
    notIdealFor: ["People who want nightlife on the doorstep", "Anyone who needs a short trip to Chaeng Wattana"],
    vibe:
      "A practical, everyday neighbourhood with street food, markets and large condo blocks. It feels more Thai than downtown Sukhumvit. Costs are lower because it is further from the business districts.",
    gettingAround:
      "On Nut and Bang Chak BTS stations are on the Sukhumvit Line, which runs straight to Asok and Siam.",
    immigrationOffice: {
      name: "Bangkok Immigration, Chaeng Wattana Government Complex (Building B)",
      note: "One office serves every Bangkok address. The trip from On Nut is long, so plan a full morning.",
    },
    visaNotes: [NOTE_TM30, NOTE_90_ONLINE, "Students on an ED visa should check travel time to class, since schools track attendance. See /visa-rules/education-visa."],
    costLevel: "lower",
    climateNote: CENTRAL_CLIMATE,
    faqs: [
      {
        question: "Is On Nut a good area for expats in Bangkok?",
        answer:
          "Yes, for those who want value and BTS access. It is less polished than Thonglor but has everything for daily life.",
      },
      {
        question: "How far is On Nut from the centre?",
        answer:
          "It is a direct BTS ride to Asok and Siam on the Sukhumvit Line. Travel time depends on the time of day.",
      },
      {
        question: "Where do On Nut residents do immigration?",
        answer:
          "At Bangkok Immigration in the Chaeng Wattana Government Complex. You can file later 90-day reports online.",
      },
      {
        question: "Is On Nut good for families?",
        answer:
          "Some families choose it for larger units and lower costs. Check school transport, since many international schools are elsewhere.",
      },
    ],
    sources: [BKK_IMM, BKK_CW, TM30, MONSOON],
    updated: UPDATED,
  },

  // ---------------- Chiang Mai ----------------
  {
    slug: "chiang-mai-nimman",
    name: "Nimman",
    city: "Chiang Mai",
    citySlug: "chiang-mai",
    kind: "neighbourhood",
    lat: 18.798,
    lng: 98.968,
    zoom: 15,
    bbox: [98.962, 18.79, 98.975, 18.806],
    tagline: "Chiang Mai's cafe and co-working hub, beside the university.",
    answer:
      "Nimman suits remote workers and first-time Chiang Mai residents who want cafes, co-working and condos within walking distance. It sits next to Chiang Mai University and is the city's most international area. Costs are higher than the rest of Chiang Mai. Residents use Chiang Mai Immigration on Airport Road for reports and extensions.",
    bestFor: [
      "Remote workers on a DTV who want co-working nearby",
      "Newcomers who want an easy, English-friendly start",
      "Students at Chiang Mai University",
    ],
    notIdealFor: ["People sensitive to burning season haze", "Budget long-stayers who want local prices"],
    vibe:
      "Modern condos, malls and cafes along Nimmanhaemin Road and its sois. It is busy with students, tourists and nomads. Costs are higher than elsewhere in Chiang Mai because of strong demand for condos.",
    gettingAround:
      "There is no metro. Most people walk, use ride-hailing apps, red songthaews or rent a scooter.",
    immigrationOffice: {
      name: "Chiang Mai Immigration, 71 Airport Road",
      note: "The official office is beside the airport. A smaller counter at Central Festival is reported for some tasks. Confirm which counter handles your case before you go.",
    },
    visaNotes: [
      "A Promenada mall counter closed in 2022. Ignore old guides that send you there.",
      NOTE_TM30,
      NOTE_90_ONLINE,
    ],
    costLevel: "mid",
    climateNote: NORTH_CLIMATE,
    faqs: [
      {
        question: "Is Nimman the best area for digital nomads in Chiang Mai?",
        answer:
          "It is the most popular, thanks to cafes and co-working spaces. It is also the busiest and priciest part of the city.",
      },
      {
        question: "Where is the immigration office for Nimman residents?",
        answer:
          "Chiang Mai Immigration is at 71 Airport Road, close to Nimman. A counter at Central Festival is reported to handle some services.",
      },
      {
        question: "How bad is burning season in Nimman?",
        answer:
          "Haze affects the whole city, typically from January to April. Many residents travel south in March or use air purifiers.",
      },
      {
        question: "Do I need a scooter in Nimman?",
        answer:
          "Not for daily life, since most things are walkable. A scooter or ride-hailing app helps for trips across the city.",
      },
    ],
    sources: [CM_IMM, CM_LOCALS, CM_PROPERTY, TM30, HAZE],
    updated: UPDATED,
  },
  {
    slug: "chiang-mai-old-city",
    name: "Old City",
    city: "Chiang Mai",
    citySlug: "chiang-mai",
    kind: "neighbourhood",
    lat: 18.7883,
    lng: 98.9853,
    zoom: 15,
    bbox: [98.977, 18.78, 98.995, 18.797],
    tagline: "Temples, moats and guesthouses inside Chiang Mai's walled square.",
    answer:
      "The Old City suits retirees, language students and slow travellers who want walkable streets, temples and markets. It sits inside a square moat and is quieter at night than Nimman. Costs range from lower to mid. Residents file 90-day reports and extensions at Chiang Mai Immigration on Airport Road.",
    bestFor: [
      "Retirees who want walkable streets and markets",
      "ED visa students at language or Muay Thai schools in the city",
      "Long-stayers who like a traditional atmosphere",
    ],
    notIdealFor: ["People who want modern condos with gyms and pools", "Those sensitive to haze"],
    vibe:
      "Low-rise guesthouses, temples and small shops inside the old walls. Weekend markets bring crowds. Costs are often lower than Nimman because housing is older and smaller.",
    gettingAround:
      "Walking and cycling work well inside the moat. Songthaews and ride-hailing apps cover the rest of the city.",
    immigrationOffice: {
      name: "Chiang Mai Immigration, 71 Airport Road",
      note: "The office is a short ride south-west of the Old City. A counter at Central Festival is reported for some services. Confirm before you go.",
    },
    visaNotes: [
      "Small guesthouses do not always file TM30. Check before you book a monthly room.",
      NOTE_90_ONLINE,
      "Thai language schools for ED visas are common in Chiang Mai. Check the course meets current attendance rules. See /visa-rules/education-visa.",
    ],
    costLevel: "lower",
    climateNote: NORTH_CLIMATE,
    faqs: [
      {
        question: "Is the Old City a good place to live in Chiang Mai?",
        answer:
          "Yes, if you want walkable streets and temples. Housing is older, and some streets are busy with tourists.",
      },
      {
        question: "Which immigration office serves the Old City?",
        answer:
          "Chiang Mai Immigration at 71 Airport Road serves all of Chiang Mai province. It is a short ride from the moat.",
      },
      {
        question: "Can I live in the Old City without a scooter?",
        answer:
          "Yes. Most daily needs are walkable, and songthaews run across the city.",
      },
      {
        question: "Is the Old City good for retirees?",
        answer:
          "Many retirees like the pace and markets. Check the distance to your hospital and plan for burning season.",
      },
    ],
    sources: [CM_IMM, CM_LOCALS, CM_PROPERTY, TM30, HAZE],
    updated: UPDATED,
  },
  {
    slug: "chiang-mai-santitham",
    name: "Santitham",
    city: "Chiang Mai",
    citySlug: "chiang-mai",
    kind: "neighbourhood",
    lat: 18.803,
    lng: 98.98,
    zoom: 15,
    bbox: [98.974, 18.797, 98.987, 18.811],
    tagline: "A local, affordable pocket between Nimman and the Old City.",
    answer:
      "Santitham suits budget-minded remote workers and long-stay students who want to be close to Nimman without Nimman prices. It is a local residential area with apartment blocks, street food and small cafes. Costs are lower than Nimman. Residents use Chiang Mai Immigration on Airport Road for 90-day reports and extensions.",
    bestFor: [
      "Remote workers on a budget",
      "Students who want a local neighbourhood",
      "Long-stayers who want to be near Nimman and the Old City",
    ],
    notIdealFor: ["People who want new condos with full facilities", "Families who need space"],
    vibe:
      "A mostly Thai area of low-rise apartments and shophouses. It is quieter than Nimman but still close to it. Costs are lower because the housing stock is older and simpler.",
    gettingAround:
      "Nimman and the Old City are a short scooter or songthaew ride away. Some residents cycle.",
    immigrationOffice: {
      name: "Chiang Mai Immigration, 71 Airport Road",
      note: "Serves all of Chiang Mai province. A Central Festival counter is reported for some services. Confirm before you go.",
    },
    visaNotes: [
      "Monthly apartment buildings vary on TM30. Ask the office to file it and give you a copy.",
      NOTE_90_ONLINE,
      NOTE_PROVINCE,
    ],
    costLevel: "lower",
    climateNote: NORTH_CLIMATE,
    faqs: [
      {
        question: "Is Santitham cheaper than Nimman?",
        answer:
          "It is generally seen as cheaper, with older apartment buildings. Compare listings yourself, since prices change.",
      },
      {
        question: "Is Santitham safe?",
        answer:
          "It is a normal residential area. Use the usual care with scooters and late-night traffic.",
      },
      {
        question: "Where do Santitham residents do immigration?",
        answer:
          "At Chiang Mai Immigration, 71 Airport Road. All Chiang Mai province addresses use this office.",
      },
      {
        question: "Can I walk to Nimman from Santitham?",
        answer:
          "Parts of Santitham are close enough to walk. Distances vary, so check your exact street on a map.",
      },
    ],
    sources: [CM_IMM, CM_LOCALS, TM30, HAZE],
    updated: UPDATED,
  },
  {
    slug: "chiang-mai-hang-dong",
    name: "Hang Dong",
    city: "Chiang Mai",
    citySlug: "chiang-mai",
    kind: "town",
    lat: 18.687,
    lng: 98.919,
    zoom: 13,
    bbox: [98.88, 18.65, 98.96, 18.73],
    tagline: "Houses with gardens south of Chiang Mai, popular with families.",
    answer:
      "Hang Dong suits families and retirees who want a house with a garden rather than a condo. It is a district south of Chiang Mai city, with housing estates and several international schools nearby. Costs are lower to mid for the space you get. Residents use Chiang Mai Immigration on Airport Road.",
    bestFor: [
      "Families who want a house and garden",
      "Retirees who want quiet and space",
      "People with pets",
    ],
    notIdealFor: ["People without a car or scooter", "Remote workers who want a cafe scene on foot"],
    vibe:
      "Suburban housing estates, rice fields and craft villages. Life is car-based and quiet. Costs are moderate because you get more space for your money than in the city.",
    gettingAround:
      "You need a car or scooter. The drive into Chiang Mai city depends on traffic on the main roads south.",
    immigrationOffice: {
      name: "Chiang Mai Immigration, 71 Airport Road",
      note: "Hang Dong is in Chiang Mai province, so the same office applies. The airport side of the city is the closest part for Hang Dong.",
    },
    visaNotes: [
      "House owners often do not know about TM30. Agree in writing who files it, or file it yourself as the householder.",
      NOTE_90_ONLINE,
      "Families can look at dependant options on the DTV. See /visa-rules/dtv.",
    ],
    costLevel: "mid",
    climateNote: NORTH_CLIMATE,
    faqs: [
      {
        question: "Is Hang Dong good for families?",
        answer:
          "Many families choose it for houses with gardens and access to international schools. You will need a car.",
      },
      {
        question: "Which immigration office do Hang Dong residents use?",
        answer:
          "Chiang Mai Immigration at 71 Airport Road. Hang Dong is part of Chiang Mai province.",
      },
      {
        question: "Can I live in Hang Dong without a car?",
        answer:
          "It is hard. Public transport is limited, so most residents drive or ride a scooter.",
      },
      {
        question: "Is burning season worse in Hang Dong?",
        answer:
          "Haze affects the whole Chiang Mai valley. Houses are harder to seal than condos, so plan for air purifiers.",
      },
    ],
    sources: [CM_IMM, CM_LOCALS, TM30, HAZE],
    updated: UPDATED,
  },

  // ---------------- Phuket ----------------
  {
    slug: "phuket-rawai-nai-harn",
    name: "Rawai and Nai Harn",
    city: "Phuket",
    citySlug: "phuket",
    kind: "neighbourhood",
    lat: 7.78,
    lng: 98.318,
    zoom: 14,
    bbox: [98.295, 7.76, 98.34, 7.8],
    tagline: "Phuket's laid-back southern tip, home to many long-term expats.",
    answer:
      "Rawai and Nai Harn suit retirees, families and Muay Thai trainees who want a relaxed, residential side of Phuket. Nai Harn has one of the island's calmer beaches, and gyms are close by. Costs are mid-range for Phuket. Residents use Phuket Immigration on Phuket Road in Phuket Town for 90-day reports and extensions.",
    bestFor: [
      "Retirees who want a settled expat community",
      "Muay Thai trainees on a DTV near Rawai and Chalong camps",
      "Families who want villas and beaches",
    ],
    notIdealFor: ["People without a scooter or car", "Anyone who wants big-city nightlife"],
    vibe:
      "Villas, small resorts, seafood markets and a long-established expat community. It is quieter than Patong. Costs sit in the middle for Phuket because housing is mostly villas and low-rise rather than luxury beachfront.",
    gettingAround:
      "A scooter or car is close to essential. Taxis and ride-hailing apps work but add up on longer trips.",
    immigrationOffice: {
      name: "Phuket Immigration, Phuket Road, Phuket Town",
      note: "Most sources place the main office on Phuket Road near Saphan Hin. One 2026 guide reports a different location, so confirm before you go.",
    },
    visaNotes: [
      "Muay Thai camps that support DTV applications are common in Rawai and Chalong. Check the documents with your embassy before you pay. See /visa-rules/dtv.",
      NOTE_TM30,
      NOTE_90_ONLINE,
    ],
    costLevel: "mid",
    climateNote: ANDAMAN_CLIMATE,
    faqs: [
      {
        question: "Is Rawai good for retirees?",
        answer:
          "Rawai has a large retiree community and a slower pace. You will need transport, and hospitals are a drive away.",
      },
      {
        question: "Where do Rawai residents renew their visa?",
        answer:
          "At Phuket Immigration in Phuket Town, on Phuket Road. Check the current location before your visit.",
      },
      {
        question: "Can I swim at Nai Harn all year?",
        answer:
          "Sea conditions are rougher in the southwest monsoon, roughly mid-May to mid-October. Follow lifeguard flags.",
      },
      {
        question: "Is Rawai good for Muay Thai training?",
        answer:
          "Yes. Rawai and nearby Chalong have many gyms. Some offer paperwork for the DTV soft-power route.",
      },
    ],
    sources: [PKT_IMM, PKT_IMM2, TM30, MONSOON, DTV_MFA, MUAY_DTV],
    updated: UPDATED,
  },
  {
    slug: "phuket-chalong",
    name: "Chalong",
    city: "Phuket",
    citySlug: "phuket",
    kind: "neighbourhood",
    lat: 7.846,
    lng: 98.338,
    zoom: 14,
    bbox: [98.32, 7.82, 98.365, 7.875],
    tagline: "Phuket's Muay Thai heartland, with a working pier and local life.",
    answer:
      "Chalong suits Muay Thai trainees, fitness-focused long-stayers and families who want central southern Phuket. Soi Ta-iad is lined with training camps, and the pier serves island day trips. Costs are mid-range. Residents use Phuket Immigration on Phuket Road in Phuket Town, a shorter drive from here than from the west coast.",
    bestFor: [
      "Muay Thai trainees on a DTV soft-power route",
      "Fitness-focused long-stayers",
      "Families who want a central base in the south",
    ],
    notIdealFor: ["People who want to walk to a beach", "Those who want a quiet village feel"],
    vibe:
      "A busy, practical area with gyms, health food cafes, supermarkets and the Chalong roundabout. It is not a beach town. Costs are mid-range because it is residential and away from the main tourist beaches.",
    gettingAround:
      "A scooter is the norm. Roads around the Chalong roundabout are busy, so ride with care.",
    immigrationOffice: {
      name: "Phuket Immigration, Phuket Road, Phuket Town",
      note: "Most sources place the main office on Phuket Road near Saphan Hin. Confirm the location and hours before you go.",
    },
    visaNotes: [
      "Many Soi Ta-iad gyms advertise DTV support. Ask exactly what documents they issue, and check them with your embassy first.",
      "Reports of course-length rules for Muay Thai DTVs vary by embassy. Ask your mission before you book a long programme.",
      NOTE_TM30,
    ],
    costLevel: "mid",
    climateNote: ANDAMAN_CLIMATE,
    faqs: [
      {
        question: "Can I get a DTV for Muay Thai training in Chalong?",
        answer:
          "Muay Thai is one of the DTV soft-power activities. You apply at a Thai embassy with enrolment proof and funds evidence. See /visa-rules/dtv.",
      },
      {
        question: "Where is the immigration office for Chalong?",
        answer:
          "Phuket Immigration is on Phuket Road in Phuket Town. It is a short drive north from Chalong.",
      },
      {
        question: "Is Chalong near a beach?",
        answer:
          "Chalong Bay has a pier rather than a swimming beach. Rawai, Nai Harn and Kata are a short drive away.",
      },
      {
        question: "How do I check a Muay Thai gym's DTV paperwork?",
        answer:
          "Ask for the exact letters and receipts they provide and compare them with your embassy's DTV checklist. Avoid paying large sums before you see the documents.",
      },
    ],
    sources: [PKT_IMM, PKT_IMM2, DTV_MFA, MUAY_DTV, TM30, MONSOON],
    updated: UPDATED,
  },
  {
    slug: "phuket-kata-karon",
    name: "Kata and Karon",
    city: "Phuket",
    citySlug: "phuket",
    kind: "neighbourhood",
    lat: 7.833,
    lng: 98.299,
    zoom: 14,
    bbox: [98.288, 7.81, 98.312, 7.86],
    tagline: "Two family-friendly west coast beaches, busy in high season.",
    answer:
      "Kata and Karon suit families, surfers and remote workers who want to live by a west coast beach without Patong's nightlife. Both are resort areas with restaurants and small shops. Costs are mid to higher, rising in high season. Residents use Phuket Immigration on Phuket Road in Phuket Town for reports and extensions.",
    bestFor: [
      "Families who want a walkable beach",
      "Surfers in the monsoon season",
      "Remote workers who want beach life with fewer crowds than Patong",
    ],
    notIdealFor: ["People who want local prices", "Those who dislike seasonal tourist crowds"],
    vibe:
      "Resort hotels, beach bars and family restaurants. It is lively in high season and quieter in the monsoon. Costs lean higher because much of the housing is aimed at tourists.",
    gettingAround:
      "You can walk along each beach, but a scooter or taxi is needed for errands and the trip to Phuket Town.",
    immigrationOffice: {
      name: "Phuket Immigration, Phuket Road, Phuket Town",
      note: "Most sources place the main office on Phuket Road near Saphan Hin. A Patong branch is also reported. Confirm which handles your case.",
    },
    visaNotes: [NOTE_TM30, "Holiday rentals may not file TM30 for long stays. Ask the owner before you sign.", NOTE_90_ONLINE],
    costLevel: "higher",
    climateNote: ANDAMAN_CLIMATE,
    faqs: [
      {
        question: "Is Kata good for families living in Phuket?",
        answer:
          "Many families like Kata's walkable beach and calmer evenings. Check school commutes, since most international schools are elsewhere on the island.",
      },
      {
        question: "Where do Karon residents renew their visa?",
        answer:
          "At Phuket Immigration in Phuket Town. Some services may also be offered at a reported Patong branch.",
      },
      {
        question: "Is Kata quiet in the rainy season?",
        answer:
          "Yes. Visitor numbers fall in the southwest monsoon, roughly mid-May to mid-October, and some businesses close.",
      },
      {
        question: "Can I surf in Kata?",
        answer:
          "Kata is known for surf during the monsoon swell. Conditions can be dangerous, so follow lifeguard flags.",
      },
    ],
    sources: [PKT_IMM, PKT_IMM2, TM30, MONSOON],
    updated: UPDATED,
  },
  {
    slug: "phuket-patong",
    name: "Patong",
    city: "Phuket",
    citySlug: "phuket",
    kind: "neighbourhood",
    lat: 7.896,
    lng: 98.297,
    zoom: 14,
    bbox: [98.285, 7.88, 98.31, 7.912],
    tagline: "Phuket's party beach, loud, central and always open.",
    answer:
      "Patong suits long-stayers who want nightlife, restaurants and everything open late. It is Phuket's busiest tourist beach, centred on Bangla Road. Costs range from mid to higher. Residents use Phuket Immigration on Phuket Road in Phuket Town, and a Patong branch is reported for some services. Confirm the counter before you go.",
    bestFor: [
      "People who want nightlife and late dining",
      "Hospitality workers with a valid work permit",
      "Long-stayers who want to walk everywhere",
    ],
    notIdealFor: ["Families who want calm evenings", "Retirees who want quiet", "Light sleepers"],
    vibe:
      "Hotels, malls, bars and a crowded beach. It is loud at night and busy all year. Costs vary widely, with beachfront condos high and back-street rooms cheaper.",
    gettingAround:
      "Patong is walkable. The hill roads to Kathu and Phuket Town are steep, so ride carefully.",
    immigrationOffice: {
      name: "Phuket Immigration, Phuket Road, Phuket Town (Patong branch reported)",
      note: "The main office is reported on Phuket Road near Saphan Hin. A Patong branch is reported to handle some services, including residence certificates.",
    },
    visaNotes: [
      "Working in bars or hotels needs a work visa and work permit. A DTV does not allow work for a Thai employer. See /visa-rules/work-visa.",
      NOTE_TM30,
      NOTE_90_ONLINE,
    ],
    costLevel: "higher",
    climateNote: ANDAMAN_CLIMATE,
    faqs: [
      {
        question: "Is Patong a good place to live long term?",
        answer:
          "It suits people who want nightlife and convenience. Many long-stayers find it too loud and move to quieter areas later.",
      },
      {
        question: "Is there an immigration office in Patong?",
        answer:
          "A Patong branch is reported to handle some services. The main Phuket office is on Phuket Road in Phuket Town.",
      },
      {
        question: "Can I work in Patong on a DTV?",
        answer:
          "No. The DTV covers remote work for employers outside Thailand. Local jobs need a work visa and permit.",
      },
      {
        question: "Is Patong quieter in the rainy season?",
        answer:
          "It is less crowded from mid-May to mid-October, but bars stay open all year.",
      },
    ],
    sources: [PKT_IMM, PKT_IMM2, TM30, MONSOON],
    updated: UPDATED,
  },
  {
    slug: "phuket-bang-tao-cherng-talay",
    name: "Bang Tao and Cherng Talay",
    city: "Phuket",
    citySlug: "phuket",
    kind: "neighbourhood",
    lat: 7.995,
    lng: 98.3,
    zoom: 14,
    bbox: [98.285, 7.97, 98.32, 8.02],
    tagline: "Upscale villas, beach clubs and schools on Phuket's north-west coast.",
    answer:
      "Bang Tao and Cherng Talay suit high earners, families and LTR or Privilege holders who want villas, beach clubs and international schools nearby. The area is built around a long beach and the Laguna resort complex. Costs are among the highest in Phuket. Residents use Phuket Immigration in Phuket Town; a private service counter in Cherng Talay is also reported.",
    bestFor: [
      "High earners on an LTR or Thailand Privilege visa",
      "Families who want villas and international schools",
      "Remote workers with a larger budget",
    ],
    notIdealFor: ["Budget long-stayers", "People who want a local Thai neighbourhood"],
    vibe:
      "Gated villa estates, beach clubs and new condo projects. It feels polished and spread out. Costs are high because the area targets wealthy buyers and renters.",
    gettingAround:
      "A car is the norm. Phuket International Airport is to the north, a shorter drive from here than from the south of the island.",
    immigrationOffice: {
      name: "Phuket Immigration, Phuket Road, Phuket Town",
      note: "The main office is reported on Phuket Road. A private counter in Cherng Talay is reported to offer extensions and 90-day reports. Confirm what it can process for you.",
    },
    visaNotes: [
      "LTR holders report annually instead of every 90 days. See /visa-rules/ltr-visa.",
      "Thailand Privilege members can ask their liaison to file 90-day reports. See /visa-rules/thailand-privilege.",
      NOTE_TM30,
    ],
    costLevel: "higher",
    climateNote: ANDAMAN_CLIMATE,
    faqs: [
      {
        question: "Is Bang Tao good for families?",
        answer:
          "Many families choose Bang Tao for villas and nearby international schools. Daily life needs a car.",
      },
      {
        question: "Is there an immigration office in Cherng Talay?",
        answer:
          "A private service counter is reported in Cherng Talay. The official main office is Phuket Immigration in Phuket Town.",
      },
      {
        question: "Which visa do people in Bang Tao use?",
        answer:
          "It varies. High earners often use the LTR or Thailand Privilege, while remote workers use the DTV. Use /checker to compare.",
      },
      {
        question: "Is Bang Tao close to the airport?",
        answer:
          "It is in the north-west, closer to the airport than southern areas like Rawai. Check drive times at your hour of travel.",
      },
    ],
    sources: [PKT_IMM, PKT_IMM2, TM30, MONSOON],
    updated: UPDATED,
  },

  // ---------------- Pattaya ----------------
  {
    slug: "pattaya-jomtien",
    name: "Jomtien",
    city: "Pattaya",
    citySlug: "pattaya",
    kind: "neighbourhood",
    lat: 12.887,
    lng: 100.873,
    zoom: 14,
    bbox: [100.862, 12.855, 100.885, 12.905],
    tagline: "Pattaya's calmer beach, a long-time favourite with retirees.",
    answer:
      "Jomtien suits retirees and families who want beach living near Pattaya without the nightlife at its door. It has a long beach road, condos and a large expat community. Costs are lower to mid compared with Phuket or Bangkok. Residents use Chonburi Immigration on Jomtien Beach Road Soi 5, inside the neighbourhood itself.",
    bestFor: [
      "Retirees on a Non-O or O-A extension",
      "Families who want a quieter beach base",
      "Long-stayers who want an immigration office nearby",
    ],
    notIdealFor: ["People who want island scenery", "Anyone seeking a strong co-working scene"],
    vibe:
      "Beachfront condos, seafood restaurants and a relaxed promenade. It is calmer than central Pattaya but still busy at weekends. Costs tend to be lower than other beach areas because condo supply is large.",
    gettingAround:
      "Baht buses run along the beach road and into Pattaya. Many residents ride scooters.",
    immigrationOffice: {
      name: "Chonburi Immigration (Pattaya), Jomtien Beach Road Soi 5",
      note: "The office sits in Jomtien. A forum rumour of a future move is unconfirmed. Check hours before you go.",
    },
    visaNotes: [
      "Retirees renew one-year extensions at the Jomtien office. Funds rules apply at each renewal. See /visa-rules/retirement-visa.",
      NOTE_90_ONLINE,
      NOTE_TM30,
    ],
    costLevel: "lower",
    climateNote: CENTRAL_CLIMATE,
    faqs: [
      {
        question: "Is Jomtien good for retirees?",
        answer:
          "It has a large retiree community, a beach promenade and an immigration office in the neighbourhood. Many retirees choose it for those reasons.",
      },
      {
        question: "Where is Pattaya immigration?",
        answer:
          "Chonburi Immigration is on Jomtien Beach Road Soi 5. It handles extensions and 90-day reports for Pattaya residents.",
      },
      {
        question: "Is Jomtien quieter than Pattaya?",
        answer:
          "Yes. Jomtien has less nightlife than central Pattaya, though it is busy at weekends and holidays.",
      },
      {
        question: "Can I get around Jomtien without a scooter?",
        answer:
          "Yes. Baht buses run along the beach road. A scooter helps for trips inland.",
      },
    ],
    sources: [JOMTIEN_IMM, IMM_DIVISIONS, TM30, MONSOON],
    updated: UPDATED,
  },
  {
    slug: "pattaya-pratumnak",
    name: "Pratumnak",
    city: "Pattaya",
    citySlug: "pattaya",
    kind: "neighbourhood",
    lat: 12.915,
    lng: 100.865,
    zoom: 15,
    bbox: [100.858, 12.905, 100.875, 12.925],
    tagline: "A quiet hill between Pattaya and Jomtien, with small beaches.",
    answer:
      "Pratumnak suits retirees, couples and remote workers who want a quiet, green base between Pattaya and Jomtien. The hill has condos, small coves and little nightlife. Costs are mid-range for Pattaya. Residents use Chonburi Immigration on Jomtien Beach Road Soi 5, a short ride away.",
    bestFor: [
      "Retirees who want quiet near the beach",
      "Couples who want calm evenings",
      "Remote workers who want sea views",
    ],
    notIdealFor: ["People who want nightlife on foot", "Those who dislike hills"],
    vibe:
      "Leafy streets, condo towers and small beaches. It feels residential and calm. Costs are mid-range for Pattaya because of the location and sea views.",
    gettingAround:
      "A scooter or baht bus links Pratumnak to Pattaya and Jomtien. The hill streets are steep for walking.",
    immigrationOffice: {
      name: "Chonburi Immigration (Pattaya), Jomtien Beach Road Soi 5",
      note: "A short ride south from Pratumnak. Check hours before you go.",
    },
    visaNotes: [NOTE_TM30, NOTE_90_ONLINE, "Condo juristic offices sometimes file TM30 for tenants. Ask your landlord who is responsible."],
    costLevel: "mid",
    climateNote: CENTRAL_CLIMATE,
    faqs: [
      {
        question: "Is Pratumnak a good place to live in Pattaya?",
        answer:
          "It suits people who want quiet and sea views close to town. It has little nightlife of its own.",
      },
      {
        question: "Which immigration office serves Pratumnak?",
        answer:
          "Chonburi Immigration on Jomtien Beach Road Soi 5. It is close by.",
      },
      {
        question: "Is Pratumnak walkable?",
        answer:
          "Parts are walkable, but the hill is steep. Most residents use scooters or baht buses.",
      },
      {
        question: "Is Pratumnak good for retirees?",
        answer:
          "Many retirees choose it for calm streets and its location between Pattaya and Jomtien.",
      },
    ],
    sources: [JOMTIEN_IMM, IMM_DIVISIONS, TM30, MONSOON],
    updated: UPDATED,
  },

  // ---------------- Hua Hin ----------------
  {
    slug: "hua-hin",
    name: "Hua Hin",
    city: "Hua Hin",
    citySlug: "hua-hin",
    kind: "town",
    lat: 12.57,
    lng: 99.958,
    zoom: 13,
    bbox: [99.92, 12.5, 99.99, 12.64],
    tagline: "A royal seaside town with golf and a relaxed retiree scene.",
    answer:
      "Hua Hin suits retirees, golfers and families who want a calm Gulf beach town within driving distance of Bangkok. It has a long beach, night markets, golf courses and malls. Costs are lower to mid. The main Prachuap Khiri Khan immigration office is reported in Thap Tai, with a BluPort mall counter for 90-day reports.",
    bestFor: [
      "Retirees who want a calm, established community",
      "Golfers",
      "Families who want a beach town near Bangkok",
    ],
    notIdealFor: ["Remote workers who want a big co-working scene", "Nightlife seekers"],
    vibe:
      "A long-standing royal resort town with a mix of Thai weekenders and expat retirees. It is quieter than Pattaya. Costs tend to be lower than Phuket because demand is steadier and less tourist-driven.",
    gettingAround:
      "Songthaews run along Phetkasem Road. A car or scooter helps for golf courses and villa estates inland.",
    immigrationOffice: {
      name: "Prachuap Khiri Khan Immigration, Hua Hin (Thap Tai main office, BluPort counter)",
      note: "The Thap Tai office is reported to handle annual extensions. The BluPort counter moved to the 3rd floor in July 2025 and handles 90-day reports and other short tasks.",
    },
    visaNotes: [
      "Annual retirement extensions go to the Thap Tai office, not BluPort. See /visa-rules/retirement-visa.",
      NOTE_90_ONLINE,
      NOTE_TM30,
    ],
    costLevel: "lower",
    climateNote:
      "The rainy season usually runs mid-May to mid-October, and the Gulf coast can stay wet into late in the year.",
    faqs: [
      {
        question: "Is Hua Hin good for retirees?",
        answer:
          "Yes. It is one of Thailand's best-known retiree towns, with hospitals, golf and a calm pace.",
      },
      {
        question: "Where is the immigration office in Hua Hin?",
        answer:
          "The main office is reported in Thap Tai, with a smaller counter on the 3rd floor of BluPort mall. Check which one handles your task before you go.",
      },
      {
        question: "Can I do my 90-day report at BluPort?",
        answer:
          "Reports say the BluPort counter handles 90-day reports, re-entry permits and short extensions. Annual extensions go to Thap Tai.",
      },
      {
        question: "Is Hua Hin good for families?",
        answer:
          "Many families like the calm beaches and space. Check school options and commutes before you move.",
      },
    ],
    sources: [HH_IMM, HH_BLUPORT, IMM_DIVISIONS, TM30, MONSOON],
    updated: UPDATED,
  },

  // ---------------- Koh Samui ----------------
  {
    slug: "koh-samui-lamai",
    name: "Lamai",
    city: "Koh Samui",
    citySlug: "koh-samui",
    kind: "neighbourhood",
    lat: 9.471,
    lng: 100.046,
    zoom: 14,
    bbox: [100.03, 9.445, 100.065, 9.495],
    tagline: "Samui's relaxed second beach, popular with long-stayers and fitness fans.",
    answer:
      "Lamai suits long-stayers, fitness fans and couples who want a relaxed Koh Samui beach with local prices nearby. It has a long beach, gyms, Muay Thai camps and a weekend market. Costs are mid-range for Samui. Residents use Samui Immigration in Mae Nam, on the north coast, for reports and extensions.",
    bestFor: [
      "Long-stayers who want a calmer beach than Chaweng",
      "Fitness and Muay Thai trainees",
      "Couples and remote workers",
    ],
    notIdealFor: ["People who want big nightlife", "Anyone who needs a short trip to immigration"],
    vibe:
      "A mix of guesthouses, villas, gyms and local restaurants. It is quieter than Chaweng. Costs sit in the middle for Samui, which as an island is pricier than most mainland towns.",
    gettingAround:
      "A scooter or car is the norm. Songthaews run on the ring road but are irregular.",
    immigrationOffice: {
      name: "Samui Immigration, Mae Nam",
      note: "The office is reported in Mae Nam since 2016 to 2018. Old guides that say Nathon are out of date. Confirm hours before you go.",
    },
    visaNotes: [
      "Muay Thai DTV routes exist on Samui too. Check gym paperwork with your embassy first. See /visa-rules/dtv.",
      NOTE_TM30,
      "Reports conflict on whether Samui accepts online 90-day reports for every case. Keep the in-person option in mind.",
    ],
    costLevel: "mid",
    climateNote: GULF_CLIMATE,
    faqs: [
      {
        question: "Is Lamai a good place to live on Koh Samui?",
        answer:
          "It suits people who want a calmer beach with gyms and local food. Most residents need a scooter.",
      },
      {
        question: "Where is the immigration office on Koh Samui?",
        answer:
          "Samui Immigration is reported in Mae Nam on the north coast. It moved from Nathon years ago.",
      },
      {
        question: "When is the rainy season on Koh Samui?",
        answer:
          "Samui follows the Gulf pattern. Rain can persist into December, so late in the year is often wettest.",
      },
      {
        question: "Is Lamai good for Muay Thai?",
        answer:
          "Lamai has several gyms. If you want a DTV for training, check the gym's documents with your embassy.",
      },
    ],
    sources: [SAMUI_IMM, IMM_DIVISIONS, TM30, MONSOON, DTV_MFA],
    updated: UPDATED,
  },
  {
    slug: "koh-samui-bophut",
    name: "Bophut and Fisherman's Village",
    city: "Koh Samui",
    citySlug: "koh-samui",
    kind: "neighbourhood",
    lat: 9.56,
    lng: 100.027,
    zoom: 14,
    bbox: [100.005, 9.545, 100.05, 9.575],
    tagline: "Charming north coast village with families and villa living.",
    answer:
      "Bophut and Fisherman's Village suit families, couples and remote workers who want a charming, calmer base on Koh Samui. The old village has wooden shophouses, a walking street and calm water. Costs are mid to higher. Residents use Samui Immigration in Mae Nam, a short drive west along the north coast.",
    bestFor: [
      "Families who want calm water and villas",
      "Remote workers who want a village feel",
      "Couples who want dining without loud nightlife",
    ],
    notIdealFor: ["Budget long-stayers", "People who want surf or big waves"],
    vibe:
      "A restored fishing village with restaurants, boutique hotels and a weekly walking street. Villas spread up the hills behind. Costs lean higher because of demand from families and holiday renters.",
    gettingAround:
      "A scooter or car is needed. Samui airport is close to Bophut.",
    immigrationOffice: {
      name: "Samui Immigration, Mae Nam",
      note: "Mae Nam is the next bay west of Bophut. Confirm hours before you go.",
    },
    visaNotes: [
      "Villa owners do not always file TM30. Agree in writing who files it.",
      "Families on a DTV can bring dependants. See /visa-rules/dtv.",
      NOTE_PROVINCE,
    ],
    costLevel: "higher",
    climateNote: GULF_CLIMATE,
    faqs: [
      {
        question: "Is Bophut good for families?",
        answer:
          "Many families like its calm water and village feel. You will need a car for school runs.",
      },
      {
        question: "Which immigration office serves Bophut?",
        answer:
          "Samui Immigration in Mae Nam, the next bay west. It handles extensions and reports for Samui residents.",
      },
      {
        question: "Is Fisherman's Village quiet?",
        answer:
          "It is calm most nights but busy on walking street evenings. Side streets are quieter.",
      },
      {
        question: "Is Bophut close to Samui airport?",
        answer:
          "Yes, it is one of the closest residential areas to the airport.",
      },
    ],
    sources: [SAMUI_IMM, IMM_DIVISIONS, TM30, MONSOON],
    updated: UPDATED,
  },
  {
    slug: "koh-samui-chaweng",
    name: "Chaweng",
    city: "Koh Samui",
    citySlug: "koh-samui",
    kind: "neighbourhood",
    lat: 9.53,
    lng: 100.062,
    zoom: 14,
    bbox: [100.045, 9.5, 100.075, 9.56],
    tagline: "Samui's busiest beach, with nightlife, malls and hospitals.",
    answer:
      "Chaweng suits long-stayers who want convenience, nightlife and hospitals close by on Koh Samui. It is the island's busiest beach, with malls, bars and resorts. Costs are mid to higher. Residents use Samui Immigration in Mae Nam on the north coast for 90-day reports and extensions.",
    bestFor: [
      "Long-stayers who want convenience and nightlife",
      "People who want hospitals and malls nearby",
      "Remote workers who want everything within reach",
    ],
    notIdealFor: ["People who want quiet", "Families who want a village feel"],
    vibe:
      "A long, lively beach with resorts, bars and shopping. It is the most tourist-focused part of Samui. Costs lean higher close to the beach and drop inland.",
    gettingAround:
      "Parts are walkable. A scooter or taxi is needed for the rest of the island.",
    immigrationOffice: {
      name: "Samui Immigration, Mae Nam",
      note: "Mae Nam is on the north coast. Confirm hours before you go.",
    },
    visaNotes: [NOTE_TM30, "Working in bars or resorts needs a work visa and permit. See /visa-rules/work-visa.", NOTE_PROVINCE],
    costLevel: "higher",
    climateNote: GULF_CLIMATE,
    faqs: [
      {
        question: "Is Chaweng a good place to live long term?",
        answer:
          "It suits people who want convenience. Many long-stayers prefer quieter Lamai or Bophut after a while.",
      },
      {
        question: "Where do Chaweng residents do immigration?",
        answer:
          "At Samui Immigration in Mae Nam on the north coast.",
      },
      {
        question: "Are there hospitals in Chaweng?",
        answer:
          "Chaweng is close to several of the island's hospitals. Check which ones your insurance covers.",
      },
      {
        question: "Is Chaweng loud at night?",
        answer:
          "The central strip is loud. Northern and southern ends, and streets inland, are quieter.",
      },
    ],
    sources: [SAMUI_IMM, IMM_DIVISIONS, TM30, MONSOON],
    updated: UPDATED,
  },

  // ---------------- Islands and towns ----------------
  {
    slug: "koh-phangan",
    name: "Koh Phangan",
    city: "Koh Phangan",
    citySlug: "koh-samui",
    kind: "island",
    lat: 9.74,
    lng: 100.015,
    zoom: 12,
    bbox: [99.95, 9.66, 100.09, 9.81],
    tagline: "Wellness, yoga and Full Moon parties on Samui's northern neighbour.",
    answer:
      "Koh Phangan suits remote workers, yoga and wellness students and people who want a slower island life. Beyond the Full Moon party beach, it has quiet bays and a strong wellness scene. Costs are mid-range. An immigration office opened on the island in 2021, reportedly near the police station. Samui Immigration remains the fallback.",
    bestFor: [
      "Remote workers who want island life",
      "Yoga and wellness long-stayers",
      "People who want a community-focused island",
    ],
    notIdealFor: ["People who need hospitals close by", "Families who need international schools"],
    vibe:
      "Jungle hills, quiet beaches and a large wellness and yoga community. Haad Rin is busy at party times. Costs are mid-range, but everything shipped to the island costs more.",
    gettingAround:
      "A scooter is the norm. Ferries run from Thong Sala to Koh Samui and the mainland.",
    immigrationOffice: {
      name: "Koh Phangan Immigration (reported near the police station), with Samui Immigration in Mae Nam as fallback",
      note: "The island office reportedly opened in 2021. Forum reports say it may ask for more paperwork than Samui and may not handle every extension. Check before you go.",
    },
    visaNotes: [
      "Phangan is in Surat Thani province, so Samui Immigration is the fallback if the island office cannot help.",
      "Bring a TM47 form and copies to the Phangan office, as forum users report it asks for them.",
      "Yoga or wellness courses may support a DTV soft-power application. Check the course with your embassy. See /visa-rules/dtv.",
    ],
    costLevel: "mid",
    climateNote: GULF_CLIMATE,
    faqs: [
      {
        question: "Is there an immigration office on Koh Phangan?",
        answer:
          "Yes, reportedly since 2021, near the police station. It handles 90-day reports and some extensions. Samui Immigration in Mae Nam is the fallback.",
      },
      {
        question: "Is Koh Phangan good for remote work?",
        answer:
          "Many remote workers live there. Internet is generally reliable in main areas, but test it before you sign a long lease.",
      },
      {
        question: "Is Koh Phangan only about parties?",
        answer:
          "No. The Full Moon party is on one beach. Most of the island is quiet, with a large wellness community.",
      },
      {
        question: "What about hospitals on Koh Phangan?",
        answer:
          "Serious cases usually go to Koh Samui by boat. Check your insurance covers evacuation.",
      },
    ],
    sources: [PHANGAN_IMM, SAMUI_IMM, IMM_DIVISIONS, TM30, MONSOON, DTV_MFA],
    updated: UPDATED,
  },
  {
    slug: "krabi-ao-nang",
    name: "Ao Nang",
    city: "Krabi",
    citySlug: "krabi",
    kind: "town",
    lat: 8.032,
    lng: 98.822,
    zoom: 14,
    bbox: [98.8, 8.01, 98.845, 8.055],
    tagline: "Krabi's beach town, framed by limestone cliffs and island trips.",
    answer:
      "Ao Nang suits retirees, climbers and families who want a scenic Andaman beach town that is smaller than Phuket. It has limestone cliffs, boat trips to Railay and a relaxed pace. Costs are lower to mid. Residents use Krabi Immigration, reported in Sai Thai subdistrict between Ao Nang and Krabi Town.",
    bestFor: [
      "Retirees who want scenery and a slower pace",
      "Climbers and outdoor lovers",
      "Families who want a smaller beach town",
    ],
    notIdealFor: ["People who want big-city services", "Remote workers who need a large co-working scene"],
    vibe:
      "A compact beach town with resorts, restaurants and longtail boats. It is quieter than Patong. Costs tend to be lower than Phuket because demand is smaller.",
    gettingAround:
      "Songthaews run between Ao Nang and Krabi Town. A scooter helps for everyday errands.",
    immigrationOffice: {
      name: "Krabi Immigration, Sai Thai subdistrict, Mueang Krabi",
      note: "Reported at 382 Moo 7, Sai Thai. Older listings show a Krabi Town address. Confirm before you go.",
    },
    visaNotes: [NOTE_TM30, NOTE_90_ONLINE, NOTE_PROVINCE],
    costLevel: "lower",
    climateNote: ANDAMAN_CLIMATE,
    faqs: [
      {
        question: "Is Ao Nang a good place to live long term?",
        answer:
          "It suits people who want scenery and calm. Services are more limited than in Phuket.",
      },
      {
        question: "Where do Ao Nang residents do immigration?",
        answer:
          "At Krabi Immigration, reported in Sai Thai subdistrict. It serves all of Krabi province.",
      },
      {
        question: "Is Ao Nang quiet in the rainy season?",
        answer:
          "Yes. The southwest monsoon, roughly mid-May to mid-October, brings fewer visitors and rougher seas.",
      },
      {
        question: "Is Ao Nang good for families?",
        answer:
          "Many families like its size and beaches. Check school options in Krabi before you move.",
      },
    ],
    sources: [KRABI_IMM, IMM_DIVISIONS, TM30, MONSOON],
    updated: UPDATED,
  },
  {
    slug: "koh-lanta",
    name: "Koh Lanta",
    city: "Koh Lanta",
    citySlug: "krabi",
    kind: "island",
    lat: 7.58,
    lng: 99.06,
    zoom: 11,
    bbox: [99.0, 7.46, 99.13, 7.69],
    tagline: "A long, quiet island for families, divers and slow living.",
    answer:
      "Koh Lanta suits families, divers and remote workers who want a quiet island with long beaches. It is laid-back, with a small but steady long-stay community. Costs are lower to mid. There is no immigration office on the island, so residents use Krabi Immigration on the mainland, reached by car ferry.",
    bestFor: [
      "Families who want a quiet island",
      "Divers",
      "Remote workers who want slow living",
    ],
    notIdealFor: ["People who need a hospital close by", "Nightlife seekers"],
    vibe:
      "Long west coast beaches, small resorts and a mix of Thai Muslim and Buddhist villages. Many businesses close in the monsoon. Costs are moderate, though island supplies cost more.",
    gettingAround:
      "A scooter or car is needed. Car ferries link the island to the mainland road to Krabi.",
    immigrationOffice: {
      name: "Krabi Immigration, Sai Thai subdistrict, Mueang Krabi",
      note: "Koh Lanta is in Krabi province. Reports say there is no immigration office on the island, so plan a full day for the trip.",
    },
    visaNotes: [
      "Plan the mainland trip for extensions. File later 90-day reports online to save trips.",
      NOTE_TM30,
      NOTE_PROVINCE,
    ],
    costLevel: "lower",
    climateNote: ANDAMAN_CLIMATE,
    faqs: [
      {
        question: "Is there an immigration office on Koh Lanta?",
        answer:
          "Reports say no. Residents use Krabi Immigration on the mainland, reached by car ferry.",
      },
      {
        question: "Is Koh Lanta good for families?",
        answer:
          "Many families choose Lanta for its quiet beaches. Check school options and medical access first.",
      },
      {
        question: "Is Koh Lanta open in the rainy season?",
        answer:
          "Many resorts and restaurants close in the southwest monsoon. Long-stayers find it very quiet then.",
      },
      {
        question: "Can I work remotely from Koh Lanta?",
        answer:
          "Yes, many people do. Test the internet at your home before you commit to a long lease.",
      },
    ],
    sources: [KRABI_IMM, LANTA_VISA, TM30, MONSOON],
    updated: UPDATED,
  },
  {
    slug: "chiang-rai",
    name: "Chiang Rai",
    city: "Chiang Rai",
    citySlug: "chiang-rai",
    kind: "town",
    lat: 19.91,
    lng: 99.84,
    zoom: 13,
    bbox: [99.8, 19.87, 99.88, 19.95],
    tagline: "A calm northern city of temples, mountains and tea.",
    answer:
      "Chiang Rai suits retirees and slow-living long-stayers who want a calmer, cheaper northern city than Chiang Mai. It has temples, mountains and a small expat community. Costs are lower. Chiang Rai Immigration's main office is in Mae Sai, and a service point in Central Chiangrai is reported for city residents.",
    bestFor: [
      "Retirees who want calm and lower costs",
      "Long-stayers who like mountains and nature",
      "People married to Thais from the north",
    ],
    notIdealFor: ["People sensitive to haze", "Remote workers who want a big nomad scene"],
    vibe:
      "A small, relaxed city with a night bazaar and nearby hill country. It is quieter than Chiang Mai. Costs are lower because demand from foreigners is smaller.",
    gettingAround:
      "A scooter or car is needed. Local buses and songthaews link nearby towns.",
    immigrationOffice: {
      name: "Chiang Rai Immigration (main office in Mae Sai; service point at Central Chiangrai reported)",
      note: "The official address is in Mae Sai on the border. Check which services the city counter offers before you go.",
    },
    visaNotes: [
      "Ask whether your extension must go to Mae Sai or can be done at the city counter.",
      "Marriage extensions need local paperwork too. See /visa-rules/marriage-visa.",
      NOTE_TM30,
    ],
    costLevel: "lower",
    climateNote: NORTH_CLIMATE,
    faqs: [
      {
        question: "Is Chiang Rai good for retirees?",
        answer:
          "Many retirees like its calm and lower costs. Plan for haze in the burning season.",
      },
      {
        question: "Where is Chiang Rai immigration?",
        answer:
          "The main office is in Mae Sai. A service point at Central Chiangrai in the city is reported for some tasks.",
      },
      {
        question: "Is Chiang Rai cheaper than Chiang Mai?",
        answer:
          "It is generally seen as cheaper, with less demand from foreigners. Compare listings yourself.",
      },
      {
        question: "How bad is the haze in Chiang Rai?",
        answer:
          "Haze affects the whole north, typically from January to April. Some residents leave during the worst weeks.",
      },
    ],
    sources: [CR_IMM, CR_TIMES, TM30, HAZE],
    updated: UPDATED,
  },
  {
    slug: "pai",
    name: "Pai",
    city: "Pai",
    citySlug: "chiang-mai",
    kind: "town",
    lat: 19.359,
    lng: 98.44,
    zoom: 13,
    bbox: [98.41, 19.33, 98.47, 19.39],
    tagline: "A small mountain valley town for slow, creative living.",
    answer:
      "Pai suits creatives, yoga students and slow travellers who want a small mountain town. It is relaxed, walkable in the centre and surrounded by valleys. Costs are lower. Pai is in Mae Hong Son province, so Mae Hong Son Immigration applies. A Pai service point is reported, but some cases are referred to Mae Hong Son town.",
    bestFor: [
      "Creatives and slow travellers",
      "Yoga and wellness students",
      "People who want nature on the doorstep",
    ],
    notIdealFor: ["People who need hospitals nearby", "Families who need schools", "Anyone sensitive to haze"],
    vibe:
      "A backpacker town with a walking street, cafes and hot springs nearby. It is small, so community matters. Costs are lower, but choice is limited.",
    gettingAround:
      "The centre is walkable. A scooter is needed beyond town. The mountain road to Chiang Mai has many curves.",
    immigrationOffice: {
      name: "Mae Hong Son Immigration (Pai service point reported)",
      note: "The official office is in Mae Hong Son town. Reports say the Pai counter may refer extensions there. Call before you travel.",
    },
    visaNotes: [
      "Immigration said in February 2025 it would check visa and work permit status in Pai. Keep your paperwork in order.",
      NOTE_TM30,
      NOTE_PROVINCE,
    ],
    costLevel: "lower",
    climateNote: NORTH_CLIMATE,
    faqs: [
      {
        question: "Is there an immigration office in Pai?",
        answer:
          "A Pai service point is reported. Some cases go to Mae Hong Son Immigration in Mae Hong Son town.",
      },
      {
        question: "Can I live in Pai long term?",
        answer:
          "Yes, on a suitable visa such as the DTV or ED. Medical care is limited, so plan for trips to Chiang Mai.",
      },
      {
        question: "Is Pai good for remote work?",
        answer:
          "Some remote workers live there. Internet varies, so test it before a long stay.",
      },
      {
        question: "How bad is burning season in Pai?",
        answer:
          "The north is affected by haze, typically from January to April. Many residents leave in March.",
      },
    ],
    sources: [MHS_IMM, PAI_POST, TM30, HAZE],
    updated: UPDATED,
  },
  {
    slug: "khon-kaen",
    name: "Khon Kaen",
    city: "Khon Kaen",
    citySlug: "khon-kaen",
    kind: "town",
    lat: 16.432,
    lng: 102.836,
    zoom: 13,
    bbox: [102.79, 16.39, 102.88, 16.48],
    tagline: "Isaan's university city, practical and affordable.",
    answer:
      "Khon Kaen suits retirees, people married to Thais and students who want an affordable, practical city in Isaan. It is a university and hospital hub with malls and a growing food scene. Costs are lower. Residents use Khon Kaen Immigration, reported on Mittraphap Road, for 90-day reports and extensions.",
    bestFor: [
      "People married to Thais from Isaan",
      "Retirees who want lower costs and good hospitals",
      "Students at Khon Kaen University",
    ],
    notIdealFor: ["Beach lovers", "People who want a large English-speaking community"],
    vibe:
      "A busy regional city with a large university, hospitals and malls. Few tourists come. Costs are lower because demand from foreigners is small.",
    gettingAround:
      "A car or scooter is the norm. Songthaews run on set routes.",
    immigrationOffice: {
      name: "Khon Kaen Immigration, Mittraphap Road",
      note: "Reported at 197 Moo 13 Mittraphap Road, Non Thon. It covers Khon Kaen province only. Call before you go.",
    },
    visaNotes: [
      "Marriage extensions are common here. See /visa-rules/marriage-visa.",
      "Forum users report that the office expects a local TM30 before it accepts a 90-day report.",
      NOTE_PROVINCE,
    ],
    costLevel: "lower",
    climateNote: CENTRAL_CLIMATE,
    faqs: [
      {
        question: "Is Khon Kaen good for expats?",
        answer:
          "It suits those who want a practical city with hospitals and lower costs. English is less common than in tourist areas.",
      },
      {
        question: "Where is Khon Kaen immigration?",
        answer:
          "It is reported on Mittraphap Road in Non Thon. Call before your visit to confirm hours.",
      },
      {
        question: "Can I do my 90-day report in Khon Kaen if I live elsewhere?",
        answer:
          "Usually not. Reports go to the office for your registered address. Change your address with TM28 and TM30 first.",
      },
      {
        question: "Is Khon Kaen good for retirees?",
        answer:
          "Many retirees with Thai family live there. Check which hospital suits your needs.",
      },
    ],
    sources: [KK_IMM, KK_IMM2, IMM_DIVISIONS, TM30, MONSOON],
    updated: UPDATED,
  },
  {
    slug: "udon-thani",
    name: "Udon Thani",
    city: "Udon Thani",
    citySlug: "udon-thani",
    kind: "town",
    lat: 17.415,
    lng: 102.787,
    zoom: 13,
    bbox: [102.74, 17.37, 102.83, 17.46],
    tagline: "A northeastern hub with a long-standing expat community.",
    answer:
      "Udon Thani suits retirees and people married to Thais who want an affordable Isaan city with an established expat community. It has malls, hospitals and an international airport. Costs are lower. Residents use Udon Thani Immigration, reported on Phosi Road, for reports and extensions.",
    bestFor: [
      "People married to Thais from Isaan",
      "Retirees who want lower costs",
      "Long-stayers who want an airport nearby",
    ],
    notIdealFor: ["Beach lovers", "Remote workers who want a big cafe scene"],
    vibe:
      "A busy regional city with a central lake park and a large market. It has a settled expat community. Costs are lower because it is away from tourist areas.",
    gettingAround:
      "A car or scooter is the norm. Songthaews and tuk-tuks run in the centre.",
    immigrationOffice: {
      name: "Udon Thani Immigration, Phosi Road",
      note: "Reported at Phosi Road in Mak Khaeng. Older guides mention the airport. Confirm before you go.",
    },
    visaNotes: [
      "Marriage and retirement extensions are common here. See /visa-rules/marriage-visa and /visa-rules/retirement-visa.",
      NOTE_90_ONLINE,
      NOTE_TM30,
    ],
    costLevel: "lower",
    climateNote: CENTRAL_CLIMATE,
    faqs: [
      {
        question: "Is Udon Thani good for retirees?",
        answer:
          "Many retirees live there, often with Thai family. It offers lower costs and good hospitals.",
      },
      {
        question: "Where is Udon Thani immigration?",
        answer:
          "It is reported on Phosi Road in the city. Older guides mention the airport, so check before your visit.",
      },
      {
        question: "Does Udon Thani have an airport?",
        answer:
          "Yes. Udon Thani International Airport has domestic flights to Bangkok.",
      },
      {
        question: "Is Udon Thani good for families?",
        answer:
          "Some families live there. Check international school options before you move.",
      },
    ],
    sources: [UDON_IMM, TM30, MONSOON],
    updated: UPDATED,
  },
];
