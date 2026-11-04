"use client";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Map as MlMap, Marker } from "maplibre-gl";

export type MapPoint = { id: string; name: string; lat: number; lng: number; cat: string; sub?: string; href?: string };
export type MapCategory = { id: string; label: string; color: string };

// OpenFreeMap tiles (D7): free, no key, OSM attribution.
const STYLE = "https://tiles.openfreemap.org/styles/liberty";

type Props = {
  points: MapPoint[];
  categories: MapCategory[];
  center: [number, number]; // [lng, lat]
  zoom: number;
  height?: number;
  initialOff?: string[];
  showList?: boolean;
};

export function PoiMap({ points, categories, center, zoom, height = 520, initialOff = [], showList = true }: Props) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<MlMap | null>(null);
  const markers = useRef<Map<string, Marker>>(new Map());
  const [on, setOn] = useState<Set<string>>(() => new Set(categories.map((c) => c.id).filter((c) => !initialOff.includes(c))));
  const [active, setActive] = useState<string | null>(null);
  const color = useMemo(() => Object.fromEntries(categories.map((c) => [c.id, c.color])), [categories]);
  const visible = points.filter((p) => on.has(p.cat));

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const ml = await import("maplibre-gl");
      if (cancelled || !el.current || map.current) return;
      const m = new ml.Map({ container: el.current, style: STYLE, center, zoom, attributionControl: { compact: true }, cooperativeGestures: true });
      m.addControl(new ml.NavigationControl({ showCompass: false }), "top-right");
      map.current = m;
      for (const p of points) {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.setAttribute("aria-label", p.name);
        dot.className = "sl-pin";
        dot.style.background = color[p.cat] ?? "#0b5e4f";
        const popup = new ml.Popup({ offset: 14, closeButton: false }).setHTML(
          `<div class="sl-pop"><strong>${escapeHtml(p.name)}</strong>${p.sub ? `<span>${escapeHtml(p.sub)}</span>` : ""}${safeHref(p.href) ? `<a href="${escapeHtml(p.href!)}"${p.href!.startsWith("/") ? "" : ' rel="noopener nofollow" target="_blank"'}>${p.href!.startsWith("/") ? "View page" : "Website"}</a>` : ""}</div>`,
        );
        const mk = new ml.Marker({ element: dot }).setLngLat([p.lng, p.lat]).setPopup(popup).addTo(m);
        dot.addEventListener("click", () => setActive(p.id));
        markers.current.set(p.id, mk);
      }
    })();
    const mks = markers.current;
    return () => { cancelled = true; map.current?.remove(); map.current = null; mks.clear(); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    for (const p of points) {
      const mk = markers.current.get(p.id);
      if (mk) mk.getElement().style.display = on.has(p.cat) ? "" : "none";
    }
  }, [on, points]);

  const focus = (p: MapPoint) => {
    setActive(p.id);
    map.current?.flyTo({ center: [p.lng, p.lat], zoom: Math.max(map.current.getZoom(), 15) });
    const mk = markers.current.get(p.id);
    if (mk && !mk.getPopup()?.isOpen()) mk.togglePopup();
  };

  return (
    <div className="overflow-hidden rounded-card border border-line bg-surface shadow-card">
      <div className="flex flex-wrap gap-2 border-b border-line p-3" role="group" aria-label="Map layers">
        {categories.map((c) => {
          const n = points.filter((p) => p.cat === c.id).length;
          if (!n) return null;
          const isOn = on.has(c.id);
          return (
            <button key={c.id} type="button" aria-pressed={isOn} onClick={() => setOn((s) => { const x = new Set(s); if (x.has(c.id)) x.delete(c.id); else x.add(c.id); return x; })}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${isOn ? "border-ink/20 bg-sunken text-ink" : "border-line text-muted opacity-60"}`}>
              <span className="size-2.5 rounded-full" style={{ background: c.color }} aria-hidden />{c.label}<span className="text-xs text-muted">{n}</span>
            </button>
          );
        })}
      </div>
      <div className={showList ? "grid min-w-0 lg:grid-cols-[minmax(0,1fr)_20rem]" : "min-w-0"}>
        <div ref={el} style={{ height }} className="relative w-full min-w-0 overflow-hidden bg-sunken" />
        {showList ? (
          <ul className="max-h-[520px] divide-y divide-line overflow-y-auto border-t border-line text-sm lg:border-l lg:border-t-0" style={{ maxHeight: height }}>
            {visible.slice(0, 300).map((p) => (
              <li key={p.id}>
                <button type="button" onClick={() => focus(p)} className={`flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-sunken/60 ${active === p.id ? "bg-primary-soft/60" : ""}`}>
                  <span className="mt-1.5 size-2.5 shrink-0 rounded-full" style={{ background: color[p.cat] }} aria-hidden />
                  <span className="min-w-0"><span className="block truncate font-semibold text-ink">{p.name}</span>{p.sub ? <span className="block truncate text-xs text-muted">{p.sub}</span> : null}</span>
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

function safeHref(h?: string) {
  return !!h && (/^https?:\/\//.test(h) || /^\/[^/]/.test(h));
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}
