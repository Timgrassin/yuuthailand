"use client";
// Header menus on base-ui: the desktop mega menu closes on link click, outside click, Esc and route change;
// the mobile menu is a full-screen modal dialog with focus trap and scroll lock.
import * as React from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { Dialog } from "@base-ui/react/dialog";
import { ChevronDown, Menu, X } from "lucide-react";

export type NavItem = { href: string; label: string; sub?: string };
export type NavGroup = { label: string; items: NavItem[]; footer?: { href: string; label: string } };

function MenuLink({ href, className, children }: { href: string; className: string; children: React.ReactNode }) {
  return <NavigationMenu.Link closeOnClick render={<NextLink href={href} />} className={className}>{children}</NavigationMenu.Link>;
}

export function DesktopNav({ groups, extra }: { groups: NavGroup[]; extra: NavItem }) {
  const pathname = usePathname();
  const [value, setValue] = React.useState<string | null>(null);
  React.useEffect(() => setValue(null), [pathname]);
  return (
    <NavigationMenu.Root value={value} onValueChange={setValue} aria-label="Main" className="hidden lg:block">
      <NavigationMenu.List className="flex items-center gap-1 text-[15px] font-medium text-ink-2">
        {groups.map((g) => (
          <NavigationMenu.Item key={g.label} value={g.label}>
            <NavigationMenu.Trigger className="flex h-9 items-center gap-1 rounded-full px-3 transition-colors hover:bg-sunken hover:text-ink data-popup-open:bg-sunken data-popup-open:text-ink focus-visible:outline-2 focus-visible:outline-primary">
              {g.label}
              <NavigationMenu.Icon className="transition-transform duration-200 data-popup-open:rotate-180"><ChevronDown className="size-4" aria-hidden /></NavigationMenu.Icon>
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="w-[34rem] p-3 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0">
              <ul className="grid grid-cols-2 gap-1">
                {g.items.map((i) => (
                  <li key={i.href}>
                    <MenuLink href={i.href} className="block rounded-sm px-3 py-2.5 hover:bg-sunken focus-visible:bg-sunken focus-visible:outline-none">
                      <span className="block text-[14px] font-semibold text-ink">{i.label}</span>
                      {i.sub ? <span className="mt-0.5 block text-xs text-muted">{i.sub}</span> : null}
                    </MenuLink>
                  </li>
                ))}
              </ul>
              {g.footer ? <MenuLink href={g.footer.href} className="mt-2 block rounded-sm bg-sunken px-3 py-2.5 text-sm font-semibold text-primary hover:bg-primary-soft">{g.footer.label}</MenuLink> : null}
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        ))}
        <NavigationMenu.Item>
          <NavigationMenu.Link render={<NextLink href={extra.href} />} className="flex h-9 items-center rounded-full px-3 transition-colors hover:bg-sunken hover:text-ink">{extra.label}</NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
      <NavigationMenu.Portal>
        <NavigationMenu.Positioner sideOffset={10} collisionPadding={16} className="z-50 h-[var(--positioner-height)] w-[var(--positioner-width)] max-w-[var(--available-width)] transition-[top,left] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] data-instant:transition-none">
          <NavigationMenu.Popup className="relative h-[var(--popup-height)] w-[var(--popup-width)] origin-[var(--transform-origin)] rounded-card border border-line bg-surface shadow-lift outline-none transition-[opacity,transform,width,height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] data-ending-style:scale-95 data-ending-style:opacity-0 data-ending-style:duration-150 data-starting-style:scale-95 data-starting-style:opacity-0">
            <NavigationMenu.Viewport className="relative h-full w-full overflow-hidden" />
          </NavigationMenu.Popup>
        </NavigationMenu.Positioner>
      </NavigationMenu.Portal>
    </NavigationMenu.Root>
  );
}

export function MobileNav({ groups, primary, extras, menuLabel, logo }: { groups: NavGroup[]; primary: NavItem; extras: NavItem[]; menuLabel: string; logo: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => setOpen(false), [pathname]);
  const close = () => setOpen(false);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger aria-label={menuLabel} className="flex size-10 items-center justify-center rounded-full border border-line-strong bg-surface lg:hidden">
        <Menu className="size-5" aria-hidden />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Popup className="fixed inset-0 z-50 flex flex-col bg-bg transition-[opacity,transform] duration-200 ease-out data-ending-style:translate-y-2 data-ending-style:opacity-0 data-starting-style:translate-y-2 data-starting-style:opacity-0 lg:hidden">
          <Dialog.Title className="sr-only">{menuLabel}</Dialog.Title>
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-line/70 px-4">
            <NextLink href="/" onClick={close} aria-label="Staylong home">{logo}</NextLink>
            <Dialog.Close aria-label="Close menu" className="flex size-10 items-center justify-center rounded-full border border-line-strong bg-surface"><X className="size-5" aria-hidden /></Dialog.Close>
          </div>
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto overscroll-contain px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4">
            <NextLink href={primary.href} onClick={close} className="flex h-12 items-center justify-center rounded-full bg-primary text-base font-semibold text-primary-ink">{primary.label}</NextLink>
            {groups.map((g) => (
              <section key={g.label} className="mt-6">
                <h2 className="px-1 text-xs font-semibold uppercase tracking-wider text-muted">{g.label}</h2>
                <ul className="mt-2 divide-y divide-line/70 rounded-card border border-line bg-surface">
                  {g.items.map((i) => (
                    <li key={i.href}><NextLink href={i.href} onClick={close} className="block px-4 py-3.5 active:bg-sunken"><span className="block text-[16px] font-semibold text-ink">{i.label}</span>{i.sub ? <span className="mt-0.5 block text-sm text-muted">{i.sub}</span> : null}</NextLink></li>
                  ))}
                  {g.footer ? <li><NextLink href={g.footer.href} onClick={close} className="block px-4 py-3.5 text-[15px] font-semibold text-primary active:bg-sunken">{g.footer.label}</NextLink></li> : null}
                </ul>
              </section>
            ))}
            <ul className="mt-6 divide-y divide-line/70 rounded-card border border-line bg-surface">
              {extras.map((i) => <li key={i.href}><NextLink href={i.href} onClick={close} className="block px-4 py-3.5 text-[16px] font-semibold text-ink active:bg-sunken">{i.label}</NextLink></li>)}
            </ul>
          </nav>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
