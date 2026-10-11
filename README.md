# Biblioteca de Letrita

App web para gestionar una biblioteca de alquiler de libros y compartir su catálogo con las clientas por WhatsApp.

**En producción:** [alquiler-de-libros.vercel.app](https://alquiler-de-libros.vercel.app)

---

## Qué hace

La app tiene dos partes:

**La gestión** (privada, con login)

- Cargar libros con portada, género, tropos, sinopsis, puntaje, serie, precios y ejemplares.
- Llevar el ciclo de cada ejemplar: reservar, alquilar, renovar y devolver, con las fechas y los atrasos calculados.
- **Para hoy:** un resumen de lo que vence hoy, lo atrasado y las reservas que se liberan.
- **Seguimiento:** todos los alquileres y reservas en curso, ordenados por urgencia.
- Historial de alquileres por libro.
- Detección de libros duplicados al cargar.

**El catálogo** (público, sin login)

- Recomendados, recién llegados, mejor valorados y todos los libros.
- Búsqueda, filtros por género y por tropo.
- Ficha de cada libro con precios, disponibilidad, estado del ejemplar y los tomos de la saga.
- Botones de WhatsApp con mensajes armados: consultar, lista de espera y búsqueda sin resultados.
- El catálogo nunca muestra quién tiene cada libro.

La app es **instalable** en el celular (PWA): se abre a pantalla completa, con su propio ícono.

## Tecnologías

| | |
| --- | --- |
| Interfaz | [React](https://react.dev) + [Vite](https://vite.dev), CSS con variables (tokens del sistema de diseño) |
| Rutas | [React Router](https://reactrouter.com) |
| Base de datos, login y archivos | [Supabase](https://supabase.com) (Postgres, Auth y Storage) |
| Publicación | [Vercel](https://vercel.com) |
| Tareas programadas | GitHub Actions |

El diseño y la librería de componentes están en Figma.

## Estructura

```
src/
├── components/      Componentes de la librería (Button, TextField, BookCopyCard…)
├── pages/           Pantallas de la gestión
│   └── catalog/     Pantallas del catálogo público
├── store/           Contextos: sesión, biblioteca y notificaciones
├── lib/             Conexión con Supabase (lectura y escritura de datos)
├── utils/           Fechas, textos, imágenes, alquileres y avisos
├── data/            Listas fijas: géneros, tropos y condiciones
├── tokens.css       Variables de color, gap, radio, sombra y layout
├── index.css        Estilos base, microinteracciones y accesibilidad
└── layout.css       Estructura de las pantallas y notificaciones
public/
├── icons/           Íconos de la app instalable
├── illustrations/   Ilustraciones (Storyset)
├── brand/           Logo
├── manifest.webmanifest
└── robots.txt
supabase/
└── schema.sql       Tablas, vista, reglas de seguridad y almacenamiento
```

## Ponerla en marcha en tu computadora

Necesitás [Node.js](https://nodejs.org) (versión 20 o más nueva) y un proyecto de Supabase.

1. **Instalá las dependencias:**

   ```bash
   npm install
   ```

2. **Prepará la base de datos:** en el SQL Editor de Supabase, ejecutá el contenido de [`supabase/schema.sql`](supabase/schema.sql).

3. **Creá el archivo `.env.local`** en la raíz del proyecto, con los datos de tu proyecto de Supabase (en Project Settings > API Keys) y el número de WhatsApp en formato internacional:

   ```
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_KEY=tu-clave-publicable
   VITE_WHATSAPP_NUMBER=549XXXXXXXXXX
   ```

   Usá siempre la clave **publicable**, nunca la secreta: la app corre en el navegador.

4. **Creá la cuenta de la gestión:** en Supabase, Authentication > Users > Add user, con Auto Confirm. El registro desde la app está cerrado (Authentication > Sign In / Providers > Allow new users to sign up, desactivado).

5. **Arrancá la app:**

   ```bash
   npm run dev
   ```

## Comandos

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Arranca la app en modo desarrollo |
| `npm run build` | Arma la versión para publicar en `dist/` |
| `npm run preview` | Abre la versión armada, para revisarla antes de publicar |

## Publicación

Cada push a `main` se publica solo en Vercel. Las tres variables de `.env.local` tienen que estar cargadas también en Vercel (Settings > Environments > Production > Environment Variables).

El archivo `vercel.json` hace que cualquier dirección abra la app, para que React Router muestre la pantalla correcta.

## Mantenimiento

- **Base de datos activa:** el plan gratuito de Supabase pausa los proyectos sin actividad durante una semana. La tarea `.github/workflows/keep-alive.yml` consulta el catálogo todos los días para evitarlo. Necesita los secretos `SUPABASE_URL` y `SUPABASE_KEY` en el repositorio (Settings > Secrets and variables > Actions).
- **Copias de seguridad:** el plan gratuito no las incluye. Una vez por mes, exportar las tablas `books`, `copies` y `rentals` a CSV desde el Table Editor de Supabase.

## Seguridad y privacidad

- Todas las tablas tienen Row Level Security: solo la cuenta con sesión iniciada puede leer y modificar los datos.
- El catálogo público lee la vista `catalog_books`, que muestra los datos de los libros y la disponibilidad, pero nunca los nombres de quienes alquilan ni el historial.
- Las portadas están en un bucket público de Storage; solo la cuenta con sesión puede subirlas, cambiarlas o borrarlas.

## Créditos

- **Diseño y desarrollo:** Federico Villanueva
- **Cliente:** Micaela Unrein
- **Ilustraciones:** [Storyset](https://storyset.com)

Proyecto privado. Todos los derechos reservados.