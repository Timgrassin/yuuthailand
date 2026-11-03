// The real root layout lives in [locale]/layout.tsx so <html lang> matches the locale.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
