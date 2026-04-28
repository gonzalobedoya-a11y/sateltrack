"use client";

import { signOut } from "@/app/login/actions";
import { LogOut, User, Bell } from "lucide-react";
import { useState, useTransition, useRef, useEffect } from "react";

interface HeaderProps {
  email: string;
  role: string;
  fullName?: string | null;
}

export function Header({ email, role, fullName }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [, startTransition] = useTransition();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials = (fullName || email).slice(0, 2).toUpperCase();
  const now = new Date();
  const dateStr = now.toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).toUpperCase();

  return (
    <header className="sticky top-0 z-30 h-14 bg-bg-card/80 backdrop-blur border-b border-border flex items-center justify-between px-6">
      {/* Info del sistema */}
      <div className="flex items-center gap-6">
        <div className="text-[10px] font-mono tracking-cmd text-text-dim">
          <span className="text-status-active mr-2">●</span>
          SESIÓN ACTIVA · {dateStr}
        </div>
      </div>

      {/* Acciones */}
      <div className="flex items-center gap-3">
        {/* Notificaciones */}
        <button
          className="relative p-2 hover:bg-bg-hover transition-colors group"
          aria-label="Notificaciones"
        >
          <Bell className="size-4 text-text-muted group-hover:text-text" />
          <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-brand-red animate-pulse" />
        </button>

        {/* Perfil dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-3 px-3 py-1.5 hover:bg-bg-hover border border-transparent hover:border-border transition-all"
          >
            <div className="size-8 bg-brand-red/20 border border-brand-red/40 flex items-center justify-center text-xs font-mono font-semibold text-brand-red">
              {initials}
            </div>
            <div className="text-left">
              <div className="text-xs font-medium leading-tight">
                {fullName || email.split("@")[0]}
              </div>
              <div className="text-[10px] font-mono tracking-cmd text-text-dim leading-tight">
                {role}
              </div>
            </div>
          </button>

          {isOpen && (
            <div className="absolute right-0 top-full mt-1 w-64 bg-bg-elevated border border-border shadow-2xl">
              <div className="px-4 py-3 border-b border-border">
                <div className="text-xs font-mono text-text-muted truncate">
                  {email}
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="led led-active" />
                  <span className="text-[10px] font-mono tracking-cmd text-text-dim">
                    ROL: {role.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="py-1">
                <button
                  onClick={() => startTransition(() => signOut())}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-text-muted hover:bg-status-danger/10 hover:text-status-danger transition-colors"
                >
                  <LogOut className="size-4" />
                  Cerrar sesión
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
