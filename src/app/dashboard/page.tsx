import { createClient } from "@/lib/supabase/server";
import { StatCard } from "@/components/dashboard/stat-card";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import {
  Users,
  UserCheck,
  Clock,
  AlertOctagon,
  Truck,
  Wallet,
  BellRing,
  Satellite,
  Activity,
  Radio,
} from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();

  // KPIs desde la vista
  const { data: stats } = await supabase
    .from("v_dashboard_stats")
    .select("*")
    .single();

  // Últimas alertas
  const { data: alerts } = await supabase
    .from("whatsapp_alerts")
    .select(
      "id, alert_type, status, message, created_at, clients(full_name), vehicles(plate)"
    )
    .order("created_at", { ascending: false })
    .limit(5);

  // Vehículos con última posición (los más recientes)
  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("id, plate, brand, model, gps_status, clients(full_name)")
    .limit(5);

  return (
    <div className="space-y-6">
      {/* Header de la página */}
      <div className="flex items-end justify-between border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono tracking-cmd text-brand-red">
              [ DASHBOARD-01 ]
            </span>
            <span className="led led-active" />
          </div>
          <h1 className="text-2xl font-display font-bold tracking-wide">
            Centro de Mando
          </h1>
          <p className="text-xs text-text-muted font-mono mt-1">
            Monitoreo en tiempo real · Última actualización:{" "}
            {formatDateTime(new Date())}
          </p>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-mono tracking-cmd text-text-dim">
          <div className="flex items-center gap-1.5">
            <Radio className="size-3 text-status-active" />
            UPLINK OK
          </div>
          <div className="flex items-center gap-1.5">
            <Satellite className="size-3 text-status-active" />
            {stats?.active_vehicles ?? 0} UNIDADES
          </div>
        </div>
      </div>

      {/* Grid de KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Clientes totales"
          value={stats?.total_clients ?? 0}
          code="CLI-01"
          icon={Users}
          hint="Total registrado en el sistema"
        />
        <StatCard
          label="Clientes activos"
          value={stats?.active_clients ?? 0}
          code="CLI-02"
          icon={UserCheck}
          variant="active"
          hint="Servicio operativo"
        />
        <StatCard
          label="Por vencer"
          value={stats?.expiring_clients ?? 0}
          code="CLI-03"
          icon={Clock}
          variant="warning"
          hint="Vencen en ≤ 5 días"
        />
        <StatCard
          label="Vencidos"
          value={stats?.expired_clients ?? 0}
          code="CLI-04"
          icon={AlertOctagon}
          variant="danger"
          hint="Requiere acción inmediata"
        />
        <StatCard
          label="Unidades GPS activas"
          value={stats?.active_vehicles ?? 0}
          code="UNT-01"
          icon={Truck}
          variant="info"
          hint="Reportando ubicación"
        />
        <StatCard
          label="Suscripciones activas"
          value={stats?.active_subscriptions ?? 0}
          code="SUB-01"
          icon={Activity}
          hint="Planes vigentes"
        />
        <StatCard
          label="Ingresos del mes"
          value={formatCurrency(Number(stats?.monthly_revenue ?? 0))}
          code="FIN-01"
          icon={Wallet}
          variant="active"
          hint="Mes en curso"
        />
        <StatCard
          label="Alertas pendientes"
          value={stats?.pending_alerts ?? 0}
          code="ALR-01"
          icon={BellRing}
          variant="warning"
          hint="Por enviar"
        />
      </div>

      {/* Dos columnas: alertas + flota */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Últimas alertas */}
        <Panel title="Últimas alertas WhatsApp" code="LOG-ALR">
          {alerts && alerts.length > 0 ? (
            <div className="divide-y divide-border">
              {alerts.map((a) => (
                <div key={a.id} className="px-4 py-3 hover:bg-bg-hover transition-colors">
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <div className="flex items-center gap-2">
                      <AlertBadge status={a.status} />
                      <span className="text-xs font-mono text-text-muted">
                        {a.alert_type.replace("_", " ").toUpperCase()}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-text-dim">
                      {formatDateTime(a.created_at)}
                    </span>
                  </div>
                  <div className="text-sm">
                    {/* @ts-expect-error supabase nested type */}
                    {a.clients?.full_name ?? "—"}{" "}
                    <span className="text-text-dim">·</span>{" "}
                    <span className="font-mono text-text-muted">
                      {/* @ts-expect-error supabase nested type */}
                      {a.vehicles?.plate ?? "—"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState message="Sin alertas registradas" />
          )}
        </Panel>

        {/* Flota */}
        <Panel title="Flota monitoreada" code="LOG-UNT">
          {vehicles && vehicles.length > 0 ? (
            <div className="divide-y divide-border">
              {vehicles.map((v) => (
                <div
                  key={v.id}
                  className="px-4 py-3 flex items-center justify-between hover:bg-bg-hover transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <GpsStatusLed status={v.gps_status} />
                    <div>
                      <div className="text-sm font-mono font-semibold tracking-wide">
                        {v.plate}
                      </div>
                      <div className="text-[11px] text-text-dim">
                        {v.brand} {v.model}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-text-muted">
                      {/* @ts-expect-error supabase nested type */}
                      {v.clients?.full_name ?? "—"}
                    </div>
                    <div className="text-[10px] font-mono tracking-cmd text-text-dim">
                      {v.gps_status.toUpperCase()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState message="Sin vehículos registrados" />
          )}
        </Panel>
      </div>
    </div>
  );
}

// Componentes auxiliares de la página

function Panel({
  title,
  code,
  children,
}: {
  title: string;
  code: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-bg-card border border-border">
      <div className="border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-1 rounded-full bg-brand-red" />
          <span className="text-sm font-display font-semibold tracking-wide">
            {title}
          </span>
        </div>
        <span className="text-[10px] font-mono tracking-cmd text-text-dim">
          [ {code} ]
        </span>
      </div>
      {children}
    </div>
  );
}

function AlertBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    enviado: "led-active",
    pendiente: "led-warning",
    error: "led-danger",
    leido: "led-active",
    respondido: "led-active",
  };
  return <span className={`led ${map[status] ?? "led-inactive"}`} />;
}

function GpsStatusLed({ status }: { status: string }) {
  const map: Record<string, string> = {
    activo: "led-active",
    sin_senal: "led-danger",
    inactivo: "led-inactive",
    mantenimiento: "led-warning",
  };
  return <span className={`led ${map[status] ?? "led-inactive"}`} />;
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="px-4 py-8 text-center">
      <p className="text-xs font-mono text-text-dim tracking-wider">
        {message}
      </p>
    </div>
  );
}
