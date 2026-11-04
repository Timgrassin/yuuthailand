# Fact extraction brief (schools, camps, agents)

For each `data/schools/sites/<place_id>.txt`, write `data/schools/facts/<place_id>.json`:

```json
{ "summary": "One neutral sentence on what the provider offers, from the page.", "price_from_thb": 12000,
  "facts": [{ "key": "class_size", "label": "Class size", "value": "Up to 8 students", "quote": "maximum of 8 students per class" }] }
```

Rules:

1. Every fact needs `quote`: an exact, contiguous substring of the page text, at least 8 characters. `apply-facts.ts` drops any fact whose quote it cannot find.
2. Only extract facts a long-stayer cares about. Keys: `ed_visa` (offers ED visa support), `licence` (Ministry of Education or other licence named), `course_length`, `hours_per_week`, `class_size`, `levels`, `languages_taught`, `price_course`, `price_month`, `price_session`, `accommodation`, `dtv_support` (DTV soft-power letter or Muay Thai course for DTV), `training_sessions`, `trainers`, `location_note`, `founded`.
3. Copy numbers as written. Convert nothing. `price_from_thb` only if a `price_*` fact quotes that THB number.
4. Never infer. If the page does not say it, leave it out. No reviews, no marketing claims ("best school in Thailand").
5. English output only. If the page is Thai only, write `{ "facts": [] }`.
