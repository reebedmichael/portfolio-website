# 🚀 Portfolio Website Setup Guide

This guide will help you set up and deploy Michael de Beer's portfolio website.

## 📋 Prerequisites

- Node.js 18+ installed
- Git installed
- A Supabase account (free tier works)
- An EmailJS account (free tier works)

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Michael-de-Beer-portfolio-website
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. EmailJS Configuration

Copy the EmailJS configuration template:

```bash
cp src/config/emailjs.example.js src/config/emailjs.js
```

Edit `src/config/emailjs.js` with your actual EmailJS credentials:

```javascript
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'your_service_id_here',
  TEMPLATE_ID: 'your_template_id_here', 
  USER_ID: 'your_user_id_here',
};
```

### 4. Database Setup

1. Create a new Supabase project
2. Run the SQL script: `supabase_setup.sql`
3. Update your personal information in the database
4. Replace placeholder emails with your actual email

### 5. Update Personal Information

Replace the following placeholders with your information:

- `your-email@gmail.com` → Your actual email
- Update social media links in the database
- Replace CV/resume links
- Update project information

### 6. Development

```bash
npm run dev
```

### 7. Production Build

```bash
npm run build
npm run preview
```

## 🔐 Security Notes

- Never commit the actual `src/config/emailjs.js` file
- Keep your `.env` file private
- Update all placeholder emails and URLs
- Review all personal information before deploying

## 📁 Important Files

- `src/config/emailjs.example.js` - EmailJS configuration template
- `supabase_setup.sql` - Database schema and sample data
- `.env.example` - Environment variables template
- `SUPABASE_SETUP.md` - Detailed Supabase setup guide

## 🚀 Deployment

The website can be deployed to:
- Vercel (recommended)
- Netlify
- GitHub Pages
- Any static hosting service

Make sure to set your environment variables in your hosting platform.

## 📞 Support

If you need help setting up the portfolio, please check the documentation files or create an issue.
