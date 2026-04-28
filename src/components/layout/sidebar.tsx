"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Truck,
  ClipboardList,
  CreditCard,
  BellRing,
  Map,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/logo";

const navItems = [
  { href: "/dashboard", label: "Centro de mando", icon: LayoutDashboard, code: "CMD" },
  { href: "/dashboard/clientes", label: "Clientes", icon: Users, code: "CLI" },
  { href: "/dashboard/vehiculos", label: "Unidades", icon: Truck, code: "UNT" },
  { href: "/dashboard/planes", label: "Planes", icon: ClipboardList, code: "PLN" },
  { href: "/dashboard/pagos", label: "Pagos", icon: CreditCard, code: "PAY" },
  { href: "/dashboard/alertas", label: "Alertas WhatsApp", icon: BellRing, code: "ALR" },
  { href: "/dashboard/mapa", label: "Mapa GPS", icon: Map, code: "MAP" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 bg-bg-card border-r border-border flex flex-col h-screen sticky top-0">
      {/* Logo header */}
      <div className="px-5 py-5 border-b border-border bg-gradient-to-b from-bg-elevated to-bg-card">
        <Link
          href="/dashboard"
          className="flex items-center group"
        >
          <Logo
            iconSize={36}
            showText
            showTagline
            textSize="md"
            className="group-hover:opacity-90 transition-opacity"
          />
        </Link>
      </div>

      {/* Indicador de sistema */}
      <div className="px-6 py-3 border-b border-border bg-bg/50">
        <div className="flex items-center justify-between text-[10px] font-mono tracking-wider">
          <span className="text-text-dim">SISTEMA</span>
          <span className="flex items-center gap-1.5 text-status-active">
            <span className="led led-active" />
            ONLINE
          </span>
        </div>
      </div>

      {/* Navegación */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 py-2 text-[10px] font-mono tracking-cmd text-text-dim">
          Navegación
        </div>
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 text-sm transition-all group relative",
                isActive
                  ? "bg-brand-red/10 text-text border-l-2 border-brand-red"
                  : "text-text-muted hover:bg-bg-hover hover:text-text border-l-2 border-transparent"
              )}
            >
              <Icon
                className={cn(
                  "size-4 transition-colors",
                  isActive ? "text-brand-red" : "text-text-dim group-hover:text-text-muted"
                )}
              />
              <span className="flex-1">{item.label}</span>
              <span className="text-[9px] font-mono tracking-cmd text-text-dim">
                {item.code}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-border px-3 py-3 space-y-1">
        <Link
          href="/dashboard/configuracion"
          className="flex items-center gap-3 px-3 py-2 text-sm text-text-muted hover:bg-bg-hover hover:text-text transition-colors"
        >
          <Settings className="size-4" />
          <span>Configuración</span>
        </Link>
        <div className="px-3 py-2 text-[9px] font-mono tracking-wider text-text-dim flex justify-between">
          <span>v1.0.0-mvp</span>
          <span>AQP-001</span>
        </div>
      </div>
    </aside>
  );
}
