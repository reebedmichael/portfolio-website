# Supabase Setup Guide

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## Database Schema

Create the following tables in your Supabase database:

### 1. `about` table
```sql
CREATE TABLE about (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  headline TEXT,
  bio TEXT,
  photo_url TEXT,
  location TEXT,
  summary TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. `skills` table
```sql
CREATE TABLE skills (
  id SERIAL PRIMARY KEY,
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  icon_url TEXT,
  proficiency INTEGER NOT NULL CHECK (proficiency >= 0 AND proficiency <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. `projects` table
```sql
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  long_description TEXT,
  tech_stack TEXT[],
  demo_url TEXT,
  github_url TEXT,
  cover_image_url TEXT,
  year INTEGER,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 4. `experience` table
```sql
CREATE TABLE experience (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  start_year INTEGER,
  end_year INTEGER,
  type TEXT DEFAULT 'work',
  institution TEXT,
  location TEXT,
  skills TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 5. `messages` table (for contact form)
```sql
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 6. `site_settings` table
```sql
CREATE TABLE site_settings (
  id SERIAL PRIMARY KEY,
  site_title TEXT,
  site_description TEXT,
  github_link TEXT,
  linkedin_link TEXT,
  email_address TEXT,
  other_socials JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 7. `downloads` table (optional)
```sql
CREATE TABLE downloads (
  id SERIAL PRIMARY KEY,
  file_name TEXT NOT NULL UNIQUE,
  download_count INTEGER DEFAULT 0,
  last_downloaded TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Sample Data

### Insert sample about data:
```sql
INSERT INTO about (name, headline, bio, location, summary) VALUES (
  'Michael de Beer',
  'Software Developer, React Specialist, Full-Stack Engineer, Problem Solver, Tech Enthusiast',
  'I''m a motivated and detail-oriented final-year BSc Computer Science student specializing in software engineering, cloud computing, and robust application development.\n\nWith over 2 years of experience building modern web applications, I''ve developed a passion for creating user-focused solutions that solve real-world problems. I specialize in React, TypeScript, and cloud technologies.\n\nWhen I''m not coding, you''ll find me exploring the outdoors, reading tech books, or watching Formula 1 races. I believe in continuous learning and pushing the boundaries of what''s possible with technology.',
  'Centurion, Pretoria, South Africa',
  'Passionate software developer with 2+ years of experience building modern web applications. Specialized in React, TypeScript, and cloud technologies. Let''s create something amazing together.'
);
```

### Insert sample skills data:
```sql
INSERT INTO skills (category, name, proficiency) VALUES
('Frontend Development', 'React', 90),
('Frontend Development', 'TypeScript', 85),
('Frontend Development', 'JavaScript', 95),
('Frontend Development', 'HTML/CSS', 90),
('Frontend Development', 'Tailwind CSS', 88),
('Backend & Database', 'Python', 85),
('Backend & Database', 'SQL', 80),
('Backend & Database', 'Supabase', 88),
('Backend & Database', 'Firebase', 82),
('Backend & Database', 'Node.js', 75),
('Cloud & DevOps', 'Google Cloud', 78),
('Cloud & DevOps', 'Docker', 70),
('Cloud & DevOps', 'Git/GitHub', 90),
('Cloud & DevOps', 'CI/CD', 75),
('Cloud & DevOps', 'AWS', 65),
('Mobile & Cross-Platform', 'Flutter', 80),
('Mobile & Cross-Platform', 'React Native', 75),
('Mobile & Cross-Platform', 'Dart', 78),
('Mobile & Cross-Platform', 'Mobile UI/UX', 82),
('Mobile & Cross-Platform', 'PWA', 70);
```

### Insert sample projects data:
```sql
INSERT INTO projects (name, description, long_description, tech_stack, demo_url, github_url, year, featured) VALUES
('Inala Education Platform', 'A comprehensive education platform connecting learners with providers. Features include course management, progress tracking, and interactive learning tools.', 'Built a full-stack education platform that serves thousands of students and educators. Implemented real-time collaboration features, progress analytics, and a robust content management system. The platform supports multiple learning formats including video courses, interactive quizzes, and live sessions.', ARRAY['React', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Framer Motion'], 'https://demo.inala.com', 'https://github.com/michaeldebeer/inala', 2024, true),
('MyHomeLoans', 'Modern mortgage application web app with real-time calculations, document upload, and application tracking.', 'Developed a comprehensive mortgage application system that streamlines the entire loan process. Features include real-time interest calculations, document management, credit score integration, and automated approval workflows. The system processes thousands of applications monthly.', ARRAY['React', 'Node.js', 'PostgreSQL', 'AWS', 'Stripe'], 'https://myhomeloans.com', 'https://github.com/michaeldebeer/myhomeloans', 2023, true);
```

### Insert sample experience data:
```sql
INSERT INTO experience (title, description, start_year, end_year, type, institution, location) VALUES
('BSc Computer Science', 'Final year student specializing in software engineering, cloud computing, and application development. Focused on modern web technologies and scalable systems.', 2021, 2024, 'education', 'University of Pretoria', 'Pretoria, South Africa'),
('Software Developer', 'Building modern web applications for various clients. Specialized in React, TypeScript, and cloud-based solutions. Delivered multiple successful projects across different industries.', 2022, NULL, 'work', 'Freelance & Contract Work', 'Remote'),
('Full-Stack Developer', 'Developed comprehensive solutions including education platforms, mortgage applications, legal services portals, and fleet management systems.', 2021, 2022, 'work', 'Various Projects', 'South Africa');
```

### Insert sample site settings:
```sql
INSERT INTO site_settings (site_title, site_description, github_link, linkedin_link, email_address) VALUES
('Michael de Beer - Portfolio', 'Software Developer Portfolio', 'https://github.com/michaeldebeer', 'https://linkedin.com/in/michaeldebeer', 'michael@example.com');
```

## Row Level Security (RLS)

Enable RLS and create policies:

```sql
-- Enable RLS on all tables
ALTER TABLE about ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;

-- Allow public read access to portfolio data
CREATE POLICY "Allow public read access" ON about FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON skills FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON experience FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON downloads FOR SELECT USING (true);

-- Allow public insert access to messages (contact form)
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert access" ON messages FOR INSERT WITH CHECK (true);

-- Allow authenticated users to update downloads
CREATE POLICY "Allow authenticated users to update downloads" ON downloads FOR UPDATE USING (auth.role() = 'authenticated');
```

## Storage Setup (Optional)

Create storage buckets for images and files:

```sql
-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio-images', 'portfolio-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('resume-files', 'resume-files', true);

-- Set up storage policies
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-images');
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'resume-files');
```

## Next Steps

1. Replace the placeholder URLs and data with your actual information
2. Upload profile photos and project images to Supabase Storage
3. Test the contact form functionality
4. Deploy your portfolio website

## Troubleshooting

- Make sure your Supabase project is active and the API keys are correct
- Check the browser console for any CORS or authentication errors
- Verify that RLS policies are correctly configured
- Ensure all required tables exist and have the correct schema 