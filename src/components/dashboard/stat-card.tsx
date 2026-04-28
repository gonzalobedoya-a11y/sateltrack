import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  code: string;
  icon: LucideIcon;
  variant?: "default" | "active" | "warning" | "danger" | "info";
  hint?: string;
}

const variantStyles = {
  default: "border-border text-text",
  active: "border-status-active/40 text-status-active",
  warning: "border-status-warning/40 text-status-warning",
  danger: "border-status-danger/40 text-status-danger",
  info: "border-status-info/40 text-status-info",
};

export function StatCard({
  label,
  value,
  code,
  icon: Icon,
  variant = "default",
  hint,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "relative bg-bg-card border p-5 transition-all hover:bg-bg-hover group overflow-hidden",
        variantStyles[variant]
      )}
    >
      {/* Esquina superior derecha decorativa */}
      <div className="absolute top-0 right-0 w-8 h-8 border-l border-b border-current opacity-30" />

      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-[10px] font-mono tracking-cmd text-text-dim mb-1">
            [{code}] {label}
          </div>
        </div>
        <Icon className={cn("size-4 opacity-60", variant !== "default" && "")} />
      </div>

      <div className="font-display text-3xl font-bold tracking-tight">
        {value}
      </div>

      {hint && (
        <div className="text-[10px] font-mono tracking-wider text-text-dim mt-2">
          {hint}
        </div>
      )}

      {/* Línea inferior decorativa */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-current/0 via-current/20 to-current/0 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}
