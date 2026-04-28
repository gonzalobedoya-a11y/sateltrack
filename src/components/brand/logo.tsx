"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** Tamaño en pixeles del ícono. */
  iconSize?: number;
  /** Mostrar texto al costado. */
  showText?: boolean;
  /** Mostrar tagline "RASTREO SATELITAL" debajo. */
  showTagline?: boolean;
  /** Layout: horizontal (ícono al lado del texto) | vertical (ícono arriba, texto abajo) */
  layout?: "horizontal" | "vertical";
  /** Tamaño del texto (xs | sm | md | lg | xl). */
  textSize?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Clase CSS extra para el contenedor. */
  className?: string;
}

const TEXT_SIZES = {
  xs: { title: "text-xs", tagline: "text-[8px]" },
  sm: { title: "text-sm", tagline: "text-[9px]" },
  md: { title: "text-lg", tagline: "text-[10px]" },
  lg: { title: "text-2xl", tagline: "text-xs" },
  xl: { title: "text-4xl", tagline: "text-sm" },
};

/**
 * Logo SATELTRACK: combina ícono PNG (de /public/logo.png) con texto en código.
 *
 * Ventajas:
 * - El texto siempre se ve nítido (no es parte de la imagen)
 * - Puede ajustarse el tamaño del texto independientemente del ícono
 * - El ícono se mantiene en /public/logo.png como solo el pin GPS
 *
 * Ejemplos:
 * <Logo iconSize={40} showText showTagline />              → completo horizontal
 * <Logo iconSize={80} showText showTagline layout="vertical" textSize="xl" />  → grande vertical
 * <Logo iconSize={32} />                                    → solo ícono
 */
export function Logo({
  iconSize = 40,
  showText = true,
  showTagline = false,
  layout = "horizontal",
  textSize = "md",
  className,
}: LogoProps) {
  const sizes = TEXT_SIZES[textSize];

  return (
    <div
      className={cn(
        "flex items-center",
        layout === "vertical" ? "flex-col gap-2" : "gap-3",
        className
      )}
    >
      {/* Ícono del pin GPS (PNG) */}
      <Image
        src="/logo.png"
        alt="GPS SATELTRACK"
        width={iconSize * 2}
        height={iconSize * 2}
        className="object-contain shrink-0"
        style={{ width: iconSize, height: iconSize }}
        priority
      />

      {/* Texto */}
      {showText && (
        <div
          className={cn(
            "flex flex-col leading-none",
            layout === "vertical" && "items-center"
          )}
        >
          <span
            className={cn(
              "font-display font-bold tracking-wider text-text",
              sizes.title
            )}
            style={{ letterSpacing: "0.05em" }}
          >
            GPS <span className="text-brand-red">SATELTRACK</span>
          </span>
          {showTagline && (
            <span
              className={cn(
                "font-display tracking-cmd text-text-dim mt-1",
                sizes.tagline
              )}
            >
              RASTREO SATELITAL
            </span>
          )}
        </div>
      )}
    </div>
  );
}

/** Solo el ícono del logo, sin texto. */
export function LogoIcon({
  size = 40,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return <Logo iconSize={size} showText={false} className={className} />;
}
