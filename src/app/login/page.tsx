import { LoginForm } from "./login-form";
import { Radio } from "lucide-react";
import { Logo } from "@/components/brand/logo";

export default function LoginPage() {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4">
      {/* Fondo: grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-40" />

      {/* Fondo: glow radial rojo */}
      <div className="absolute inset-0 bg-radar-gradient" />

      {/* Fondo: ruido sutil */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Esquinas decorativas tipo HUD */}
      <CornerDecorations />

      {/* Banner superior con logo pequeño */}
      <div className="absolute top-0 left-0 right-0 border-b border-border bg-bg-card/60 backdrop-blur z-10">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Logo iconSize={28} showText textSize="sm" />
          <div className="flex items-center gap-2 text-[10px] font-mono tracking-wider text-text-dim">
            <Radio className="size-3 text-status-active animate-pulse" />
            <span>SECURE LINK · TLS 1.3</span>
          </div>
        </div>
      </div>

      {/* Card principal */}
      <div className="relative z-10 w-full max-w-md">
        {/* Tag superior */}
        <div className="flex items-center justify-between mb-4 px-1">
          <span className="text-[10px] font-mono tracking-cmd text-text-dim">
            [ AUTH-01 ]
          </span>
          <span className="text-[10px] font-mono tracking-cmd text-text-dim">
            v1.0 · MVP
          </span>
        </div>

        {/* Card */}
        <div className="relative bg-bg-card border border-border scan-border">
          {/* Header de la card con LOGO grande */}
          <div className="border-b border-border px-8 pt-8 pb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-1 rounded-full bg-brand-red" />
              <span className="text-[10px] font-mono tracking-cmd text-brand-red">
                IDENTIFICACIÓN REQUERIDA
              </span>
            </div>

            {/* Logo vertical grande centrado: ícono + texto + tagline */}
            <div className="flex justify-center my-4">
              <Logo
                iconSize={88}
                showText
                showTagline
                layout="vertical"
                textSize="xl"
              />
            </div>

            <p className="text-xs text-text-muted text-center font-mono mt-4">
              Acceso al sistema de monitoreo satelital
            </p>
          </div>

          {/* Form */}
          <div className="px-8 py-6">
            <LoginForm />
          </div>

          {/* Footer técnico */}
          <div className="border-t border-border px-8 py-3 flex items-center justify-between text-[10px] font-mono tracking-wider text-text-dim">
            <span>NODE: AQP-001</span>
            <span className="flex items-center gap-1.5">
              <span className="led led-active" />
              CONNECTED
            </span>
          </div>
        </div>

        {/* Texto inferior */}
        <p className="text-[10px] text-center font-mono tracking-wider text-text-dim mt-6">
          © 2026 SAFETY SUPPORT S.A.C. · AREQUIPA · PERÚ
        </p>
      </div>
    </div>
  );
}

function CornerDecorations() {
  const corner = (
    <svg viewBox="0 0 32 32" className="size-8 text-brand-red/40">
      <path d="M0 0 L32 0 M0 0 L0 32" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>
  );

  return (
    <>
      <div className="absolute top-16 left-6">{corner}</div>
      <div className="absolute top-16 right-6 rotate-90">{corner}</div>
      <div className="absolute bottom-6 left-6 -rotate-90">{corner}</div>
      <div className="absolute bottom-6 right-6 rotate-180">{corner}</div>
    </>
  );
}
