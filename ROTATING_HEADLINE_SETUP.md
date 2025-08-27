# Rotating Typewriter Headline Setup Guide

This guide explains how to set up and use the rotating typewriter headline component that integrates with Supabase for real-time updates.

## 🚀 Features

- **Smooth Typewriter Animation**: Typing and deleting effects with configurable speeds
- **Random Starting Point**: Starts from a random phrase each time for variety
- **Real-time Updates**: Live updates from Supabase without page refresh
- **Profile Photo Integration**: Displays your photo in Hero and About sections
- **Dynamic Favicon**: Automatically sets your photo as the browser tab icon
- **Accessible**: ARIA attributes for screen readers
- **Customizable**: Flexible styling and animation options
- **Production Ready**: Error handling and SSR-friendly

## 📋 Prerequisites

- Supabase project with database access
- React application (Vite or Next.js)
- Environment variables configured

## 🗄️ Database Setup

### 1. Create the `about` table

Run this SQL in your Supabase SQL editor:

```sql
-- Create the about table
CREATE TABLE IF NOT EXISTS public.about (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  headline TEXT NOT NULL,
  headline_current TEXT,
  photo_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data
INSERT INTO public.about (headline, photo_url)
VALUES ('Software Engineer, Full-Stack Developer, Problem Solver, Tech Enthusiast, Coffee Lover', 'https://your-photo-url.com/photo.jpg');

-- Enable Row Level Security (RLS)
ALTER TABLE public.about ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access" ON public.about
  FOR SELECT USING (true);

-- Create policy for authenticated users to update (optional)
CREATE POLICY "Allow authenticated users to update" ON public.about
  FOR UPDATE USING (auth.role() = 'authenticated');
```

### 2. Enable Realtime

In your Supabase dashboard:
1. Go to **Database** → **Replication**
2. Enable realtime for the `about` table
3. Select the events you want to listen to (UPDATE is required)

## 🔧 Environment Variables

Create a `.env` file in your project root:

```env
# For Vite
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# For Next.js (alternative)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📦 Installation

The component is already included in your project. The files are:

- `src/hooks/useTypewriter.js` - Typewriter animation hook
- `src/components/RotatingHeadline.jsx` - Main component
- `src/components/RotatingHeadlineDemo.jsx` - Demo component

## 🎯 Usage

### Basic Usage

```jsx
import RotatingHeadline from './components/RotatingHeadline'

function MyComponent() {
  return (
    <div>
      <RotatingHeadline />
    </div>
  )
}
```

### Profile Photo Integration

The component automatically displays your profile photo from the `photo_url` field:

```jsx
// Profile photo is automatically displayed in Hero and About sections
// The favicon is also automatically updated with your photo
```

### ProfilePhoto Component

You can also use the ProfilePhoto component directly:

```jsx
import ProfilePhoto from './components/ProfilePhoto'

function MyComponent() {
  return (
    <ProfilePhoto
      photoUrl="https://your-photo-url.com/photo.jpg"
      name="Michael de Beer"
      size="lg" // sm, md, lg, xl
      showBorder={true}
      showHover={true}
    />
  )
}
```

### Advanced Usage

```jsx
import RotatingHeadline from './components/RotatingHeadline'

function MyComponent() {
  return (
    <div>
      <RotatingHeadline
        as="h1"
        className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        speed={{
          typingMsPerChar: 80,
          deletingMsPerChar: 50,
          holdOnTypedMs: 1500,
          holdOnDeletedMs: 500
        }}
      />
    </div>
  )
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `aboutId` | `string` | `undefined` | Specific about record ID to fetch |
| `as` | `string` | `'h1'` | HTML element to render (`h1`, `h2`, `h3`, etc.) |
| `className` | `string` | `'text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight'` | CSS classes |
| `speed` | `object` | `{}` | Animation speed configuration |

### Speed Configuration

```jsx
speed={{
  typingMsPerChar: 70,      // Milliseconds per character when typing
  deletingMsPerChar: 40,    // Milliseconds per character when deleting
  holdOnTypedMs: 1200,      // Milliseconds to hold when fully typed
  holdOnDeletedMs: 300      // Milliseconds to hold when fully deleted
}}
```

### Animation Behavior

- **Random Start**: The animation starts from a random phrase each time the component mounts
- **Initial Display**: Shows the first phrase while waiting for the random delay
- **Random Delay**: Adds a 500-1500ms random delay before starting the animation
- **Smooth Transitions**: Seamlessly cycles through all phrases in the comma-separated list

## 🎨 Styling Examples

### Hero Style
```jsx
<RotatingHeadline
  as="h1"
  className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
/>
```

### Subtitle Style
```jsx
<RotatingHeadline
  as="h2"
  className="text-xl md:text-2xl font-medium text-gray-600 dark:text-gray-400"
/>
```

### Fast Animation
```jsx
<RotatingHeadline
  speed={{
    typingMsPerChar: 30,
    deletingMsPerChar: 20,
    holdOnTypedMs: 500,
    holdOnDeletedMs: 100
  }}
/>
```

## 🔄 Real-time Updates

The component automatically subscribes to changes in the `about` table. When you update the `headline` field in Supabase, the component will:

1. Receive the update via realtime subscription
2. Parse the new comma-separated string into phrases
3. Continue the typewriter animation with the new phrases

### Testing Real-time Updates

1. Go to your Supabase dashboard
2. Navigate to **Table Editor** → **about**
3. Edit the `headline` field
4. Save the changes
5. Watch your component update in real-time!

## 🛠️ Customization

### Custom Phrase Parsing

If you need custom parsing logic, you can modify the `phrases` useMemo in `RotatingHeadline.jsx`:

```jsx
const phrases = useMemo(
  () => rawHeadline
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)
    .map(phrase => phrase.toUpperCase()), // Example: convert to uppercase
  [rawHeadline]
)
```

### Custom Animation Logic

The `useTypewriter` hook is reusable and can be used for other typewriter effects:

```jsx
import { useTypewriter } from './hooks/useTypewriter'

function MyCustomTypewriter() {
  const phrases = ['Hello', 'World', 'Welcome']
  const { text, phraseIndex, isDeleting } = useTypewriter(phrases, {
    typingMsPerChar: 100,
    loop: false // Only run once
  })
  
  return <div>{text}</div>
}
```

## 🐛 Troubleshooting

### Component not animating
- Check that your `headline` field contains comma-separated phrases
- Verify environment variables are set correctly
- Check browser console for errors

### Real-time updates not working
- Ensure realtime is enabled for the `about` table in Supabase
- Check that RLS policies allow SELECT access
- Verify your Supabase URL and key are correct

### Animation too fast/slow
- Adjust the `speed` prop values
- Lower values = faster animation
- Higher values = slower animation

## 📱 Accessibility

The component includes proper accessibility features:

- `aria-live="polite"` - Announces changes to screen readers
- `aria-atomic="true"` - Reads the entire element when it changes
- Semantic HTML elements (`h1`, `h2`, etc.)
- Cursor animation is hidden from screen readers

## 🔒 Security

- Uses Supabase's built-in security features
- RLS policies control access to data
- Environment variables keep credentials secure
- No sensitive data exposed in client-side code

## 📈 Performance

- Efficient animation using `requestAnimationFrame`
- Proper cleanup of timers and subscriptions
- Memoized phrase parsing
- SSR-friendly (no window access during server render)

## 🎯 Integration with Existing Code

The component is already integrated into your Hero component. To use it elsewhere:

1. Import the component
2. Add it to your JSX
3. Customize styling and speed as needed

Example integration in a new component:

```jsx
import RotatingHeadline from './components/RotatingHeadline'

export default function AboutSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm uppercase tracking-widest text-gray-500">
          About me
        </p>
        <RotatingHeadline className="mt-2 text-4xl md:text-6xl font-extrabold" />
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          I build performant full-stack apps with React, Supabase, and cloud functions.
        </p>
      </div>
    </section>
  )
}
```

## 🚀 Next Steps

1. Test the component with your data
2. Customize styling to match your design
3. Adjust animation speeds to your preference
4. Consider adding more phrases to your headline
5. Test real-time updates by editing data in Supabase

The component is production-ready and will enhance your portfolio with an engaging, dynamic headline that updates in real-time!
