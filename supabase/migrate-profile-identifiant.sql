-- À exécuter une seule fois si la table profiles existe déjà.
alter table public.profiles
  rename column display_name to identifiant;

alter table public.profiles
  drop column email;

update public.profiles
set identifiant = coalesce(identifiant, 'eleve-' || substr(id::text, 1, 8));

alter table public.profiles
  alter column identifiant set not null;

alter table public.profiles
  add constraint profiles_identifiant_key unique (identifiant);

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
