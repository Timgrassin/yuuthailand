// Place pages: POIs from OpenStreetMap (src/content/data/pois.json, refreshed by .github/workflows/pois.yml),
// editorial places (src/content/places.ts) and immigration offices (src/content/immigration-offices.ts).
import poisData from "@/content/data/pois.json";
import { IMMIGRATION_OFFICES, type ImmigrationOffice } from "@/content/immigration-offices";
import { PLACES, type Place } from "@/content/places";
import type { MapCategory, MapPoint } from "@/components/map/poi-map";

export type PoiCat = "bank" | "hospital" | "coworking" | "gym" | "muay_thai" | "language_school" | "international_school" | "supermarket";
type Row = [PoiCat, string, number, number, string, string, string];
const DATA = poisData as unknown as { source: string; license: string; fetchedAt: string | null; places: Record<string, Row[]> };

export const POI_META: Record<PoiCat | "immigration" | "place", { label: string; plural: string; color: string }> = {
  immigration: { label: "Immigration office", plural: "Immigration", color: "#b4232c" },
  bank: { label: "Bank", plural: "Banks", color: "#0b5e4f" },
  hospital: { label: "Hospital", plural: "Hospitals", color: "#d9480f" },
  coworking: { label: "Coworking", plural: "Coworking", color: "#5f3dc4" },
  language_school: { label: "Language school", plural: "Language schools", color: "#c08a06" },
  muay_thai: { label: "Muay Thai", plural: "Muay Thai", color: "#1c1917" },
  gym: { label: "Gym", plural: "Gyms", color: "#1971c2" },
  international_school: { label: "International school", plural: "Int'l schools", color: "#0c8599" },
  supermarket: { label: "Supermarket", plural: "Supermarkets", color: "#868e96" },
  place: { label: "Place", plural: "Places", color: "#0b5e4f" },
};
export const POI_ORDER: PoiCat[] = ["bank", "hospital", "coworking", "language_school", "muay_thai", "gym", "international_school", "supermarket"];

export const poiSource = { label: `Map data: ${DATA.source} (${DATA.license})`, url: "https://www.openstreetmap.org/copyright", fetchedAt: DATA.fetchedAt };

export type Poi = { id: string; cat: PoiCat; name: string; lat: number; lng: number; street: string; website: string };
export function poisFor(slug: string): Poi[] {
  return (DATA.places[slug] ?? []).map(([cat, name, lat, lng, street, website, ref]) => ({ id: ref, cat, name, lat, lng, street, website }));
}

export const getPlace = (slug: string) => PLACES.find((p) => p.slug === slug);
export const getOffice = (slug: string) => IMMIGRATION_OFFICES.find((o) => o.slug === slug);
export const placesInCity = (citySlug: string) => PLACES.filter((p) => p.citySlug === citySlug);
export const officesInCity = (citySlug: string) => IMMIGRATION_OFFICES.filter((o) => o.citySlug === citySlug);

// Research (4 Nov 2026) took coordinates from a map listing only for these offices. Every other pin is an
// estimate near the sourced address and is labelled approximate until checked in Google Maps.
const GEO_CONFIRMED = new Set(["hua-hin-thap-tai", "chiang-mai-airport-road"]);
export const geoConfirmed = (o: ImmigrationOffice) => GEO_CONFIRMED.has(o.slug);
export const officePinNote = (o: ImmigrationOffice) => (geoConfirmed(o) ? o.address : `Approximate pin. ${o.address}`);

export function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const r = Math.PI / 180, dLat = (b.lat - a.lat) * r, dLng = (b.lng - a.lng) * r;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(h));
}

// Offices that serve a place: same city first, then the nearest one.
export function officesForPlace(p: Place): ImmigrationOffice[] {
  const same = officesInCity(p.citySlug);
  if (same.length) return same;
  return [...IMMIGRATION_OFFICES].sort((a, b) => distanceKm(p, a) - distanceKm(p, b)).slice(0, 1);
}

export function placeMap(p: Place) {
  const pois = poisFor(p.slug);
  const offices = officesForPlace(p);
  const points: MapPoint[] = [
    ...offices.map((o) => ({ id: `imm-${o.slug}`, name: o.name, lat: o.lat, lng: o.lng, cat: "immigration", sub: officePinNote(o), href: `/immigration-offices/${o.slug}` })),
    ...pois.map((x) => ({ id: x.id, name: x.name, lat: x.lat, lng: x.lng, cat: x.cat, sub: x.street || undefined, href: x.website || undefined })),
  ];
  const cats: MapCategory[] = (["immigration", ...POI_ORDER] as const).map((id) => ({ id, label: POI_META[id].plural, color: POI_META[id].color }));
  return { pois, offices, points, cats };
}

// Turns bare site paths ("/visa-rules/education-visa") inside editorial text into links.
export function splitPaths(text: string): (string | { href: string })[] {
  return text.split(/(\/(?:visa-rules|guides|tools|faq|visas-for|providers|checker)(?:[a-z0-9/-]*[a-z0-9])?)/g).map((s, i) => (i % 2 ? { href: s } : s));
}

export { PLACES, IMMIGRATION_OFFICES };
export type { Place, ImmigrationOffice };
