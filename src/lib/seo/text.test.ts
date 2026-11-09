import { strict as assert } from "node:assert";
import { test } from "node:test";
import { DESC_MAX, DESC_MIN, TITLE_MAX, districtFromAddress, firstFit, fitDescription, listingDescription, listingTitle, withBrand } from "./text";

const listing = (name: string, city = "Bangkok", type = "language_school", slug = "x") => listingTitle({ name, city, type, slug });

test("listing titles fit, with the type added only when there is room and it adds something", () => {
  assert.equal(listing("Fairtex", "Pattaya", "muay_thai_camp"), "Fairtex, Pattaya: Muay Thai camp");
  assert.equal(listing("AAA Thai Language School"), "AAA Thai Language School, Bangkok");
  for (const n of ["SIAM PRO KITE (SPK) - Koh Phangan Kitesurf Center (School, Lessons, Rent)", "Old Medicine Hospital Thai Massage School Shivagakomarpaj", "School of Professional Carrier Extension & Thai Cultural Spa"]) {
    assert.ok(listing(n, "Koh Phangan").length <= TITLE_MAX, n);
  }
});

test("a city already in the name is not repeated, and a bracketed city label is dropped", () => {
  assert.equal(listing("Tiger Muay Thai Bangkok", "Bangkok", "muay_thai_camp"), "Tiger Muay Thai Bangkok");
  assert.equal(listing("Saranya School", "Korat (Nakhon Ratchasima)", "massage_school"), "Saranya School, Korat: massage school");
});

test("branches sharing a name get their district", () => {
  const address = "Ambassador Hotel, 171 Sukhumvit 11 Aly, Khwaeng Khlong Toei Nuea, Watthana, Bangkok 10110, Thailand";
  assert.equal(districtFromAddress(address, "Bangkok"), "Watthana");
  assert.equal(listingTitle({ name: "Thailand Elite Visa", city: "Bangkok", type: "visa_agent", slug: "thailand-elite-visa-bangkok-dfb4", address }), "Thailand Elite Visa, Watthana");
});

test("the brand is added only when it fits and is not already there", () => {
  assert.equal(withBrand("Short title", "Staylong"), "Short title | Staylong");
  assert.equal(withBrand("Staylong: a title", "Staylong"), "Staylong: a title");
  assert.equal(withBrand("x".repeat(55), "Staylong"), "x".repeat(55));
});

test("firstFit picks the longest wording that fits", () => {
  assert.equal(firstFit("x".repeat(61), "fits"), "fits");
});

test("long descriptions keep whole sentences, then fall back to a word boundary", () => {
  const two = `${"A first sentence about a visa school in Bangkok that runs for a while and has detail".padEnd(120, " x")}. And a second sentence that pushes it over the limit by a lot.`;
  const fitted = fitDescription(two);
  assert.ok(fitted.length <= DESC_MAX && fitted.endsWith("."), fitted);
  const one = fitDescription(`${"word ".repeat(60)}end`);
  assert.ok(one.length <= DESC_MAX && one.endsWith("…"), one);
});

test("short listing summaries are extended", () => {
  const d = listingDescription("Small-group Thai cooking classes in Thonburi, Bangkok.");
  assert.ok(d.length >= DESC_MIN && d.length <= DESC_MAX, d);
});
