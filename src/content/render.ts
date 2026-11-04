import { marked } from "marked";

// Trusted, authored Markdown only (src/content). External links open safely.
marked.use({
  gfm: true,
  renderer: {
    link({ href, text }) {
      const ext = /^https?:\/\//.test(href);
      return `<a href="${href}"${ext ? ' rel="noopener nofollow" target="_blank"' : ""}>${text}</a>`;
    },
    table(token) {
      const html = marked.Renderer.prototype.table.call(this, token);
      return `<div class="overflow-x-auto rounded-[14px] border border-[var(--sl-line)]">${html}</div>`;
    },
  },
});

export function md(src: string): string {
  return marked.parse(src.trim(), { async: false }) as string;
}
