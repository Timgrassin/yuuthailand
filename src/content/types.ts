// Editorial content model. Every page answers first, cites sources and carries a review date.
// Bodies are Markdown (GFM tables allowed). Never put a number in a body that contradicts the rules table;
// for thresholds, link to the visa page instead of restating, or use {{rule:track:key}} tokens.

export type Source = { label: string; url: string };

export type Section = {
  id: string; // anchor, kebab-case
  heading: string; // H2, phrased like the search query where possible
  body: string; // Markdown
};

export type GuideKind = "guide" | "comparison" | "change" | "checklist";

export type Guide = {
  slug: string; // URL: /guides/<slug>
  kind: GuideKind;
  title: string; // H1
  metaTitle: string; // <= 60 chars
  description: string; // <= 155 chars
  eyebrow?: string;
  answer: string; // 40-60 word self-contained answer, first thing on the page
  tracks: string[]; // related visa tracks (keys from src/lib/tracks.ts)
  published: string; // YYYY-MM-DD
  updated: string; // YYYY-MM-DD, last editorial check
  keyFacts?: { label: string; value: string; note?: string }[];
  sections: Section[];
  faqs: { question: string; answer: string }[];
  sources: Source[];
  related?: string[]; // other guide slugs
  confidence?: "high" | "medium" | "low"; // overall; low shows a caution banner
};

// Long-form editorial layer that sits on top of the data-driven visa pages.
export type VisaContent = {
  track: string;
  intro: string; // 2-3 sentences under the H1
  whoFor: string[]; // bullet list
  notFor: string[]; // bullet list
  steps: { title: string; body: string }[]; // how to apply, in order
  costs?: { item: string; amount: string; note?: string }[];
  mistakes: string[];
  sections: Section[]; // extra deep-dive sections
  faqs: { question: string; answer: string }[];
  sources: Source[];
  updated: string;
  related?: string[]; // guide slugs
};
