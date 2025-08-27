import RotatingHeadline from './RotatingHeadline'

export default function RotatingHeadlineDemo() {
  return (
    <div className="space-y-16 p-8">
      {/* Hero Style */}
      <section className="text-center space-y-4">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-8">
          Rotating Headline Demo
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          Each component starts from a random phrase and has a random delay before animation begins
        </p>
        
        <div className="space-y-8">
          {/* Large Hero Style */}
          <div className="space-y-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">Large Hero Style</p>
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

          {/* Medium Style */}
          <div className="space-y-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">Medium Style</p>
            <RotatingHeadline
              as="h2"
              className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300"
              speed={{
                typingMsPerChar: 60,
                deletingMsPerChar: 40,
                holdOnTypedMs: 1000,
                holdOnDeletedMs: 300
              }}
            />
          </div>

          {/* Small Style */}
          <div className="space-y-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">Small Style</p>
            <RotatingHeadline
              as="h3"
              className="text-lg md:text-xl font-medium text-gray-600 dark:text-gray-400"
              speed={{
                typingMsPerChar: 40,
                deletingMsPerChar: 30,
                holdOnTypedMs: 800,
                holdOnDeletedMs: 200
              }}
            />
          </div>

          {/* Fast Animation */}
          <div className="space-y-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">Fast Animation</p>
            <RotatingHeadline
              as="h3"
              className="text-xl font-medium text-green-600 dark:text-green-400"
              speed={{
                typingMsPerChar: 30,
                deletingMsPerChar: 20,
                holdOnTypedMs: 500,
                holdOnDeletedMs: 100
              }}
            />
          </div>

          {/* Slow Animation */}
          <div className="space-y-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">Slow Animation</p>
            <RotatingHeadline
              as="h3"
              className="text-xl font-medium text-purple-600 dark:text-purple-400"
              speed={{
                typingMsPerChar: 120,
                deletingMsPerChar: 80,
                holdOnTypedMs: 2000,
                holdOnDeletedMs: 800
              }}
            />
          </div>
        </div>
      </section>

      {/* Usage Instructions */}
      <section className="max-w-2xl mx-auto bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
          How to Use
        </h3>
        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
          <p>
            <strong>1. Database Setup:</strong> Ensure your Supabase <code>about</code> table has a <code>headline</code> column with comma-separated phrases.
          </p>
          <p>
            <strong>2. Environment Variables:</strong> Set <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> in your <code>.env</code> file.
          </p>
          <p>
            <strong>3. Realtime:</strong> Enable realtime subscriptions for the <code>about</code> table in your Supabase dashboard.
          </p>
          <p>
            <strong>4. Usage:</strong> Simply import and use the component with your desired styling and speed options.
          </p>
        </div>
      </section>
    </div>
  )
}
