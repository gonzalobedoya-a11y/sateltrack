"use client";

import { useState, useTransition } from "react";
import { signIn } from "./actions";
import { Loader2, Lock, Mail, AlertCircle } from "lucide-react";

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await signIn(formData);
      if (result?.error) setError(result.error);
    });
  }

  return (
    <form action={handleSubmit} className="space-y-5">
      {/* Email */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-[11px] font-mono tracking-cmd text-text-muted"
        >
          Operador / Correo
        </label>
        <div className="relative group">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-dim group-focus-within:text-brand-red transition-colors" />
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            disabled={isPending}
            placeholder="operador@empresa.com"
            className="w-full bg-bg pl-10 pr-3 py-3 text-sm font-mono border border-border focus:border-brand-red focus:outline-none transition-colors disabled:opacity-50"
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="text-[11px] font-mono tracking-cmd text-text-muted"
        >
          Clave de acceso
        </label>
        <div className="relative group">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-dim group-focus-within:text-brand-red transition-colors" />
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            disabled={isPending}
            placeholder="••••••••"
            className="w-full bg-bg pl-10 pr-3 py-3 text-sm font-mono border border-border focus:border-brand-red focus:outline-none transition-colors disabled:opacity-50"
          />
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="flex items-start gap-2 p-3 border border-status-danger/40 bg-status-danger/10">
          <AlertCircle className="size-4 text-status-danger shrink-0 mt-0.5" />
          <p className="text-xs text-status-danger font-mono leading-relaxed">
            {error}
          </p>
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-brand-red hover:bg-brand-red-glow text-white py-3 text-sm font-mono tracking-cmd font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group relative overflow-hidden"
      >
        {isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Autenticando...
          </>
        ) : (
          <>
            <span className="relative z-10">Iniciar sesión</span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </>
        )}
      </button>

      <p className="text-[10px] text-center font-mono text-text-dim tracking-wider pt-2">
        ACCESO RESTRINGIDO · OPERADORES AUTORIZADOS
      </p>
    </form>
  );
}
