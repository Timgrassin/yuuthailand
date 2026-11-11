// Analytics helpers (D30). Events carry names and coarse labels only, never what someone typed.
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

export const CONSENT_KEY = "staylong_analytics_consent";
export const CONSENT_OPEN_EVENT = "staylong:open-cookie-settings";

// These URLs hold email tokens or a private checker result id, so they never reach an analytics vendor.
export const isPrivatePath = (path: string) => /^\/(subscribe|unsubscribe|checker\/r|lead)(\/|$)/.test(path);

export function track(name: string, params: Record<string, string> = {}) {
  try {
    window.gtag?.("event", name, params);
    window.clarity?.("event", name);
  } catch {
    /* analytics must never break a form */
  }
}
