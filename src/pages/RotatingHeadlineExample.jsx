import RotatingHeadline from '../components/RotatingHeadline'
import RotatingHeadlineDemo from '../components/RotatingHeadlineDemo'

export default function RotatingHeadlineExample() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="py-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Rotating Typewriter Headline
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
          A dynamic, real-time updating typewriter effect that pulls data from Supabase and animates through comma-separated phrases.
        </p>
      </header>

      {/* Main Demo */}
      <main className="max-w-6xl mx-auto px-4">
        <RotatingHeadlineDemo />
      </main>

      {/* Additional Examples */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Integration Examples
          </h2>
          
          <div className="space-y-16">
            {/* Hero Section Example */}
            <div className="text-center space-y-6">
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                Hero Section
              </h3>
              <div className="space-y-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Available for new opportunities
                </p>
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                    Michael de Beer
                  </span>
                </h1>
                <RotatingHeadline
                  as="h2"
                  className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 font-medium"
                  speed={{
                    typingMsPerChar: 60,
                    deletingMsPerChar: 40,
                    holdOnTypedMs: 1000,
                    holdOnDeletedMs: 300
                  }}
                />
              </div>
            </div>

            {/* About Section Example */}
            <div className="text-center space-y-6">
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                About Section
              </h3>
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400">
                  About me
                </p>
                <RotatingHeadline
                  as="h2"
                  className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
                  speed={{
                    typingMsPerChar: 80,
                    deletingMsPerChar: 50,
                    holdOnTypedMs: 1500,
                    holdOnDeletedMs: 500
                  }}
                />
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  I build performant full-stack apps with React, Supabase, and cloud functions.
                </p>
              </div>
            </div>

            {/* Card Example */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
                Card Component
              </h3>
              <div className="space-y-4">
                <RotatingHeadline
                  as="h3"
                  className="text-xl font-medium text-blue-600 dark:text-blue-400"
                  speed={{
                    typingMsPerChar: 40,
                    deletingMsPerChar: 30,
                    holdOnTypedMs: 800,
                    holdOnDeletedMs: 200
                  }}
                />
                <p className="text-gray-600 dark:text-gray-400">
                  This shows how the component looks in a card or container with different styling.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Features
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Real-time Updates</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Automatically updates when data changes in Supabase without page refresh.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Accessible</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Built with proper ARIA attributes and semantic HTML for screen readers.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Customizable</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Flexible styling and animation speed options to match your design.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
