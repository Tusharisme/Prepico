-- Create table for storing blogs
create table if not exists posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  thumbnail_url text, -- URL to the cover image
  description text, -- Short summary
  content jsonb default '[]'::jsonb, -- Stores the complex block structure (rows, cols, items)
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table posts enable row level security;

-- Create policy to allow public read access
create policy "Public posts are viewable by everyone"
  on posts for select
  using (true);

-- Create policy to allow all access (since Auth is not required/mocked for this demo admin)
-- ideally we'd restrict this, but for "Auth: Not required" requirement, we leave it open or simple.
create policy "Enable insert for everyone"
  on posts for insert
  with check (true);

create policy "Enable update for everyone"
  on posts for update
  using (true);

create policy "Enable delete for everyone"
  on posts for delete
  using (true);

-- Storage buckets
insert into storage.buckets (id, name, public) 
values ('images', 'images', true)
on conflict (id) do nothing;

-- Storage Policies
create policy "Images are publicly accessible"
  on storage.objects for select
  using ( bucket_id = 'images' );

create policy "Anyone can upload images"
  on storage.objects for insert
  with check ( bucket_id = 'images' );

create policy "Anyone can update images"
  on storage.objects for update
  using ( bucket_id = 'images' );
