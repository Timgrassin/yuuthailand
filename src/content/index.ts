import type { Guide, VisaContent } from "./types";
import { guide as dtvVsEd } from "./guides/dtv-vs-ed-visa";

// Register every guide and visa content module here.
export const GUIDES: Guide[] = [dtvVsEd];
export const VISA_CONTENT: Record<string, VisaContent> = {};

export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);
export const guidesForTrack = (track: string) => GUIDES.filter((g) => g.tracks.includes(track));
