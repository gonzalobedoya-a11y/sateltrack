# GPS SATELTRACK — Sistema de Monitoreo Satelital

Sistema SaaS profesional para gestión de clientes, unidades GPS, planes y alertas WhatsApp.

**Stack:** Next.js 15 · Supabase · Tailwind CSS · TypeScript

---

## 🚀 Instalación paso a paso

### Requisitos previos

Necesitas tener instalado:
- **Node.js 18.18 o superior** → descargar de https://nodejs.org (versión LTS)
- **VS Code** (recomendado) → https://code.visualstudio.com
- **Git** (opcional pero recomendado) → https://git-scm.com

Verifica que Node esté instalado abriendo PowerShell y escribiendo:
```bash
node --version
# debe mostrar algo como v20.x.x
```

---

### Paso 1 — Copiar el proyecto a tu PC

1. Descomprime/copia esta carpeta `sateltrack-app` en:
   ```
   C:\Users\User\Desktop\proyectos\sateltrack
   ```

2. Abre la carpeta con VS Code:
   - Click derecho en la carpeta → **"Abrir con Code"**
   - O desde VS Code: `File → Open Folder → seleccionar la carpeta`

---

### Paso 2 — Configurar variables de entorno

1. En la raíz del proyecto, encontrarás un archivo llamado `.env.local.example`.

2. **Copia ese archivo** y renómbralo a `.env.local` (sin el `.example`).

3. Abre `.env.local` con VS Code y reemplaza los valores con los reales:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://vnewexrbjbsxxlmtdhtg.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_TU_KEY_NUEVA_AQUI
   SUPABASE_SERVICE_ROLE_KEY=sb_secret_TU_KEY_NUEVA_AQUI
   NEXT_PUBLIC_APP_NAME=GPS SATELTRACK
   ```

   ⚠️ **Importante:** Usa las keys NUEVAS que rotaste. Y confirma que `.env.local` está en tu `.gitignore` (ya lo está).

---

### Paso 3 — Instalar dependencias

1. En VS Code, abre la terminal: `Terminal → New Terminal` (o `` Ctrl + ` ``).

2. Asegúrate que la terminal está dentro de la carpeta del proyecto. Debe verse algo como:
   ```
   PS C:\Users\User\Desktop\proyectos\sateltrack>
   ```

3. Ejecuta:
   ```bash
   npm install
   ```

   Esto descarga todas las dependencias (~2-3 minutos la primera vez). Vas a ver una carpeta `node_modules` aparecer.

   Si te da algún error, copia el mensaje y mándamelo.

---

### Paso 4 — Correr el proyecto en local

En la misma terminal:

```bash
npm run dev
```

Vas a ver algo como:
```
  ▲ Next.js 15.0.3
  - Local:        http://localhost:3000
  - Ready in 2.5s
```

**Abre tu navegador en:** http://localhost:3000

Te debe redirigir automáticamente a la pantalla de login con la estética **command center** (fondo oscuro, acentos rojos, tipografía técnica).

---

### Paso 5 — Logearte por primera vez

Usa las credenciales del usuario admin que creaste en Supabase:

- **Email:** `gonzalobedoya47@gmail.com`
- **Password:** la que pusiste al crear el usuario

Si todo está bien configurado, te debe redirigir al **Centro de mando** mostrando:
- Total clientes: 5
- Activos: 3
- Por vencer: 1
- Vencidos: 1
- Unidades GPS: 6
- Ingresos del mes: S/. 100.00
- Lista de últimas alertas WhatsApp
- Lista de la flota

---

## 📁 Estructura del proyecto

```
sateltrack/
├── src/
│   ├── app/                    # Rutas (App Router de Next.js)
│   │   ├── login/              # Página de login
│   │   ├── dashboard/          # Área protegida
│   │   │   ├── layout.tsx      # Sidebar + header
│   │   │   ├── page.tsx        # Centro de mando (KPIs)
│   │   │   ├── clientes/
│   │   │   ├── vehiculos/
│   │   │   ├── planes/
│   │   │   ├── pagos/
│   │   │   ├── alertas/
│   │   │   └── mapa/
│   │   ├── globals.css
│   │   ├── layout.tsx          # Layout raíz
│   │   └── page.tsx            # Redirect inicial
│   ├── components/
│   │   ├── layout/             # Sidebar, Header
│   │   └── dashboard/          # Cards, paneles
│   ├── lib/
│   │   ├── supabase/           # Clientes Supabase (browser, server, middleware)
│   │   └── utils.ts            # Helpers (formatCurrency, formatDate, cn)
│   └── middleware.ts           # Protección de rutas
├── .env.local                  # Variables de entorno (NO subir a Git)
├── .env.local.example          # Plantilla
├── .gitignore
├── package.json
├── tailwind.config.ts          # Paleta SATELTRACK
├── tsconfig.json
└── next.config.mjs
```

---

## 🎨 Paleta de colores SATELTRACK

| Color | Hex | Uso |
|-------|-----|-----|
| Negro principal | `#0a0d12` | Fondo |
| Negro tarjeta | `#0f1419` | Tarjetas, panels |
| Rojo brand | `#dc2626` | Acentos, CTAs |
| Verde activo | `#10b981` | Estado activo |
| Amarillo warning | `#f59e0b` | Por vencer |
| Rojo danger | `#dc2626` | Vencido / error |
| Texto principal | `#e5e7eb` | Body |
| Texto muted | `#9ca3af` | Secundario |

---

## 🛠️ Comandos disponibles

```bash
npm run dev        # Desarrollo (localhost:3000)
npm run build      # Build de producción
npm start          # Servir el build
npm run lint       # Verificar código
```

---

## 🚧 Estado del MVP

✅ **Implementado:**
- Schema completo de Supabase (12 tablas, RLS, triggers, funciones)
- Datos demo (5 clientes, 8 vehículos, suscripciones, pagos, alertas)
- Login con email/password
- Middleware de protección de rutas
- Layout dashboard con sidebar y header
- Centro de mando con 8 KPIs en vivo
- Listado de últimas alertas WhatsApp
- Listado de flota monitoreada

🔜 **Próximas fases:**
- CRUD completo de clientes
- CRUD completo de vehículos
- Gestión de planes y renovaciones
- Registro de pagos
- Mapa GPS con Mapbox
- Integración WhatsApp Cloud API
- Cron job de vencimientos automáticos
- Portal del cliente (vista limitada)

---

## ❓ Solución de problemas

### "Module not found" o errores de imports
```bash
rm -rf node_modules .next
npm install
npm run dev
```

### "Invalid API key" al hacer login
Revisa que las keys en `.env.local` estén correctas y no tengan espacios al inicio o final.

### "RLS policy violation" al cargar el dashboard
Asegúrate de que tu usuario tiene rol `admin` en la tabla `profiles` de Supabase.

### El servidor no levanta
Verifica que el puerto 3000 esté libre. Si no, Next.js usará otro puerto automáticamente.

---

## 📞 Soporte

Para dudas técnicas durante el desarrollo, este proyecto fue diseñado por:
**Safety Support S.A.C.** — Arequipa, Perú
