-- =========================================================
-- Portfolio setup (idempotent) with your real default data
-- =========================================================

-- Extensions (usually enabled by Supabase, kept for safety)
create extension if not exists pgcrypto;

-- ========== TABLES (align to your current schema) ==========
create table if not exists public.about (
  id            uuid primary key default gen_random_uuid(),
  name          text,
  headline      text not null,
  headline_current text,
  bio           text,
  photo_url     text,
  location      text,
  summary       text,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

create table if not exists public.site_settings (
  id              uuid primary key default gen_random_uuid(),
  site_title      text,
  site_description text,
  github_link     text,
  linkedin_link   text,
  email_address   text,
  cv_url          text,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

-- (Optional) dev_card if you still want it
create table if not exists public.dev_card (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  title      text not null,
  email      text not null,
  phone      text,
  location   text,
  website    text,
  github     text,
  linkedin   text,
  initials   text,
  note       text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ========== TRIGGER to keep updated_at fresh ==========
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists trg_about_updated_at on public.about;
create trigger trg_about_updated_at
before update on public.about
for each row execute procedure public.set_updated_at();

drop trigger if exists trg_site_settings_updated_at on public.site_settings;
create trigger trg_site_settings_updated_at
before update on public.site_settings
for each row execute procedure public.set_updated_at();

drop trigger if exists trg_dev_card_updated_at on public.dev_card;
create trigger trg_dev_card_updated_at
before update on public.dev_card
for each row execute procedure public.set_updated_at();

-- ========== SEED / UPSERT your current real values ==========
-- ABOUT (insert if empty, else update the first row)
with _about_defaults as (
  select
    'Michael de Beer'::text                                         as name,
    trim(trailing E'\n' from
      'Software Engineer, Full-Stack Developer, React + Supabase, FlutterFlow expert, Cloud Functions, TypeScript Wizard, Performance Tuner, Database Designer, API Crafter, Security-Minded, Clean Code, DevOps Curious, Lifelong Learner, Team Player, Problem Solver, Tech Enthusiast, Coffee Lover
    ')                                                              as headline,
    'Motivated and detail-oriented final year BSc Computer Science student with a robust foundation in software development, cloud computing, and project execution. Skilled in Python, Java, JavaScript, SQL, Dart, Flutter, and FlutterFlow, with practical experience delivering scalable, user-centric applications. Key contributor to the Inala platform, MyHomeLoans, JV Legal, and FAW Trucks service tracking system.'::text
                                                                    as bio,
    'https://asujlhtftnrwczvrgpfs.supabase.co/storage/v1/object/public/profile-photos/Headshot.png'::text
                                                                    as photo_url,
    'Centurion, Pretoria, South Africa'::text                        as location,
    'Dedicated BSc Computer Science student & Full-Stack Developer with modern frameworks and cloud skills.'::text
                                                                    as summary
)
insert into public.about (name, headline, bio, photo_url, location, summary)
select name, headline, bio, photo_url, location, summary
from _about_defaults
where not exists (select 1 from public.about)
;
-- if a row already exists, update it to the new defaults
update public.about a
set name     = d.name,
    headline = d.headline,
    bio      = d.bio,
    photo_url= d.photo_url,
    location = d.location,
    summary  = d.summary
from (select * from _about_defaults) d
where a.id = (select id from public.about limit 1)
;

-- SITE SETTINGS (insert if empty, else update first row)
with _settings as (
  select
    'Michael de Beer | Software Engineer'::text as site_title,
    'Portfolio of Michael de Beer — BSc Computer Science student, FlutterFlow developer, and full-stack engineer.'::text
                                               as site_description,
    'https://github.com/reebedmichael'::text   as github_link,
    'https://www.linkedin.com/in/michael-de-beer-06a473245'::text as linkedin_link,
    'your-email@gmail.com'::text          as email_address,
    'https://asujlhtftnrwczvrgpfs.supabase.co/storage/v1/object/public/resume-files/Michael%20de%20Beer%20Professional%20CV%20Resume.pdf'::text
                                               as cv_url
)
insert into public.site_settings (site_title, site_description, github_link, linkedin_link, email_address, cv_url)
select site_title, site_description, github_link, linkedin_link, email_address, cv_url
from _settings
where not exists (select 1 from public.site_settings)
;
update public.site_settings s
set site_title      = d.site_title,
    site_description= d.site_description,
    github_link     = d.github_link,
    linkedin_link   = d.linkedin_link,
    email_address   = d.email_address,
    cv_url          = d.cv_url
from (select * from _settings) d
where s.id = (select id from public.site_settings limit 1)
;

-- (Optional) DEV CARD sample content (insert if empty, else leave as-is)
insert into public.dev_card (name, title, email, phone, location, website, github, linkedin, initials, note)
select
  'Michael de Beer',
  'Software Engineer',
  'your-email@gmail.com',
  '+27 76 011 8914',
  'Centurion, Pretoria, South Africa',
  'michaeldevbear.com',
  'https://github.com/reebedmichael',
  'https://www.linkedin.com/in/michael-de-beer-06a473245',
  'MD',
  'Passionate about creating modern, scalable web apps.'
where not exists (select 1 from public.dev_card)
;

-- ========== RLS & POLICIES ==========
alter table public.about         enable row level security;
alter table public.site_settings enable row level security;
alter table public.dev_card      enable row level security;

-- Public read
drop policy if exists "public read about"         on public.about;
create policy "public read about"         on public.about         for select using (true);

drop policy if exists "public read site_settings" on public.site_settings;
create policy "public read site_settings" on public.site_settings for select using (true);

drop policy if exists "public read dev_card"      on public.dev_card;
create policy "public read dev_card"      on public.dev_card      for select using (true);

-- Authenticated can update (optional)
drop policy if exists "auth can update about"         on public.about;
create policy "auth can update about"         on public.about         for update using (auth.role() = 'authenticated');

drop policy if exists "auth can update site_settings" on public.site_settings;
create policy "auth can update site_settings" on public.site_settings for update using (auth.role() = 'authenticated');

drop policy if exists "auth can update dev_card"      on public.dev_card;
create policy "auth can update dev_card"      on public.dev_card      for update using (auth.role() = 'authenticated');

-- GRANTS (Supabase usually manages these; safe to keep)
grant select on public.about         to anon, authenticated;
grant select on public.site_settings to anon, authenticated;
grant select on public.dev_card      to anon, authenticated;

grant update on public.about         to authenticated;
grant update on public.site_settings to authenticated;
grant update on public.dev_card      to authenticated;

-- ========== INDEXES ==========
create index if not exists idx_about_updated_at         on public.about(updated_at);
create index if not exists idx_site_settings_updated_at on public.site_settings(updated_at);

-- ========== VERIFY ==========
-- Show current singleton rows after upsert
select id, name, headline, photo_url, location, summary, updated_at from public.about limit 1;
select id, site_title, site_description, github_link, linkedin_link, email_address, cv_url, updated_at from public.site_settings limit 1;
