create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  identifiant text not null unique,
  role text not null default 'eleve' check (role in ('eleve', 'professeur')),
  created_at timestamptz not null default now()
);

create table public.progress (
  user_id uuid not null references public.profiles(id) on delete cascade,
  lesson_slug text not null,
  completed boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (user_id, lesson_slug)
);

alter table public.profiles enable row level security;
alter table public.progress enable row level security;

create policy "Users can read their profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can read their progress"
  on public.progress for select
  using (auth.uid() = user_id);

create policy "Users can write their progress"
  on public.progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update their progress"
  on public.progress for update
  using (auth.uid() = user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, identifiant)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'identifiant', 'eleve-' || substr(new.id::text, 1, 8))
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
