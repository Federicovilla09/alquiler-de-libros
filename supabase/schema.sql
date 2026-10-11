-- ════════════════════════════════════════════════════════════
-- Biblioteca de Letrita · Esquema de la base de datos
-- Ejecutar completo en el SQL Editor de un proyecto nuevo de Supabase.
-- Crea las tablas, la seguridad, la vista pública del catálogo
-- y el almacenamiento de portadas. No incluye datos.
-- ════════════════════════════════════════════════════════════


-- ─── Tablas ───

-- Libros
create table books (
  id bigint generated always as identity primary key,
  title text not null,
  author text not null,
  genre text,
  tropes text[] not null default '{}',
  synopsis text,
  quote text,
  rating int not null default 0,
  recommended boolean not null default false,
  series text,
  volume int,
  audience text not null default 'Todo público',
  price15 int not null,
  price30 int not null,
  cover_url text,
  cover_color text,
  created_at timestamptz not null default now()
);

-- Ejemplares de cada libro
create table copies (
  id bigint generated always as identity primary key,
  book_id bigint not null references books (id) on delete cascade,
  number int not null,
  condition text not null default 'Nuevo'
    check (condition in ('Nuevo', 'Usado', 'Usado/Subrayado')),
  state text not null default 'available'
    check (state in ('available', 'reserved', 'rented')),
  borrower text,
  reserved_at date,
  return_date date,
  days int,
  unique (book_id, number)
);

-- Historial de alquileres
create table rentals (
  id bigint generated always as identity primary key,
  book_id bigint not null references books (id) on delete cascade,
  copy_number int not null,
  who text not null,
  price int not null,
  days int not null,
  start_date date not null,
  end_date date not null,
  status text not null default 'current'
    check (status in ('current', 'on-time', 'late')),
  late_days int not null default 0,
  renewed boolean not null default false,
  created_at timestamptz not null default now()
);


-- ─── Seguridad: solo la cuenta con sesión iniciada accede a las tablas ───

alter table books enable row level security;
alter table copies enable row level security;
alter table rentals enable row level security;

create policy "La dueña gestiona los libros"
  on books for all to authenticated
  using (true) with check (true);

create policy "La dueña gestiona los ejemplares"
  on copies for all to authenticated
  using (true) with check (true);

create policy "La dueña gestiona los alquileres"
  on rentals for all to authenticated
  using (true) with check (true);


-- ─── Catálogo público ───
-- Muestra los datos de los libros y las condiciones de los ejemplares
-- disponibles. Nunca muestra quién tiene cada ejemplar ni el historial.

create view catalog_books as
select
  b.id, b.title, b.author, b.genre, b.tropes, b.synopsis, b.quote,
  b.rating, b.recommended, b.series, b.volume, b.audience,
  b.price15, b.price30, b.cover_url, b.cover_color, b.created_at,
  coalesce(
    array_agg(c.condition) filter (where c.state = 'available'),
    '{}'
  ) as available_conditions
from books b
left join copies c on c.book_id = b.id
group by b.id;

grant select on catalog_books to anon, authenticated;


-- ─── Portadas ───
-- Bucket público para ver; solo la cuenta con sesión sube, cambia o borra.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('covers', 'covers', true, 2097152, array['image/jpeg']);

create policy "La dueña sube portadas"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'covers');

create policy "La dueña cambia portadas"
  on storage.objects for update to authenticated
  using (bucket_id = 'covers');

create policy "La dueña borra portadas"
  on storage.objects for delete to authenticated
  using (bucket_id = 'covers');