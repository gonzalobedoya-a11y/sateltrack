import { Construction } from "lucide-react";

interface ComingSoonProps {
  title: string;
  code: string;
  description: string;
}

export function ComingSoon({ title, code, description }: ComingSoonProps) {
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-mono tracking-cmd text-brand-red">
            [ {code} ]
          </span>
        </div>
        <h1 className="text-2xl font-display font-bold tracking-wide">{title}</h1>
        <p className="text-xs text-text-muted font-mono mt-1">{description}</p>
      </div>

      <div className="bg-bg-card border border-border p-12 text-center">
        <Construction className="size-12 text-brand-red/40 mx-auto mb-4" />
        <h2 className="text-lg font-display font-semibold mb-2">
          Módulo en construcción
        </h2>
        <p className="text-sm text-text-muted font-mono max-w-md mx-auto">
          Esta sección estará disponible en la siguiente fase del MVP.
        </p>
      </div>
    </div>
  );
}
