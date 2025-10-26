function StoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="isolate">
        <div className="relative bg-white pt-24 pb-20 sm:pt-32 sm:pb-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="inline-flex items-center gap-2 text-sm font-medium text-terracotta-600 bg-terracotta-50 px-4 py-1.5 rounded-full">
                Our Story
              </p>
              <h1 className="mt-8 text-5xl font-heading font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl leading-tight">
                Connecting Cultures,<br />One Journey at a Time
              </h1>
              <p className="mt-8 text-xl leading-8 text-gray-600 max-w-2xl mx-auto">
                We believe travel is about more than just seeing new places. It's about experiencing the heart of a culture,
                and nothing expresses that more than discovering authentic destinations. SophoTravel was born from a passion
                for authentic travel and a desire to help travelers create meaningful connections.
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center lg:gap-x-16">
              <div className="lg:pr-4">
                <div className="lg:max-w-lg">
                  <p className="inline-flex items-center gap-2 text-sm font-medium text-terracotta-600 bg-terracotta-50 px-4 py-1.5 rounded-full mb-6">
                    Our Vision
                  </p>
                  <h2 className="text-4xl font-heading font-bold tracking-tight text-gray-900 sm:text-5xl">
                    A World Connected by Culture
                  </h2>
                  <p className="mt-6 text-lg leading-8 text-gray-600">
                    Our vision is to build a global community where travelers can easily discover and experience authentic
                    destinations directly from local cultures. We aim to create a platform that not only offers beautiful
                    places but also shares the stories behind them, fostering a deeper appreciation for cultural heritage
                    and creating meaningful travel experiences.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="relative overflow-hidden rounded-2xl bg-gray-50">
                  <img
                    src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop"
                    alt="Cultural travel destinations and local experiences"
                    className="w-full h-full object-cover aspect-[4/3]"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-terracotta-100 to-ocean-100 rounded-2xl -z-10"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-b from-gray-50 to-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="inline-flex items-center gap-2 text-sm font-medium text-terracotta-600 bg-terracotta-50 px-4 py-1.5 rounded-full mb-6">
                Our Values
              </p>
              <h2 className="text-4xl font-heading font-bold tracking-tight text-gray-900 sm:text-5xl">
                The Principles That Guide Us
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                We are committed to building a platform that is ethical, transparent, and respectful of the cultures we feature.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-5xl sm:mt-20 lg:mt-24">
              <dl className="grid max-w-xl grid-cols-1 gap-6 lg:max-w-none lg:grid-cols-2">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <dt className="flex items-center gap-4 text-lg font-semibold leading-7 text-gray-900">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-terracotta-100">
                      <svg className="h-6 w-6 text-terracotta-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                      </svg>
                    </div>
                    Authenticity
                  </dt>
                  <dd className="mt-4 text-base leading-7 text-gray-600">
                    We guarantee that every destination on SophoTravel is genuinely curated from local cultures, offering a true piece of their heritage.
                  </dd>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <dt className="flex items-center gap-4 text-lg font-semibold leading-7 text-gray-900">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ocean-100">
                      <svg className="h-6 w-6 text-ocean-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                      </svg>
                    </div>
                    Responsible Travel
                  </dt>
                  <dd className="mt-4 text-base leading-7 text-gray-600">
                    We are dedicated to promoting sustainable tourism practices that respect local communities and preserve cultural integrity.
                  </dd>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <dt className="flex items-center gap-4 text-lg font-semibold leading-7 text-gray-900">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-100">
                      <svg className="h-6 w-6 text-gold-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                      </svg>
                    </div>
                    Cultural Preservation
                  </dt>
                  <dd className="mt-4 text-base leading-7 text-gray-600">
                    By supporting authentic travel experiences, we help preserve cultural heritage for future generations to appreciate and enjoy.
                  </dd>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <dt className="flex items-center gap-4 text-lg font-semibold leading-7 text-gray-900">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-olive-100">
                      <svg className="h-6 w-6 text-olive-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                      </svg>
                    </div>
                    Community
                  </dt>
                  <dd className="mt-4 text-base leading-7 text-gray-600">
                    We are building a community of conscious travelers, connected by a shared love for culture and meaningful exploration.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="relative isolate overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-8 py-12 shadow-2xl rounded-3xl sm:px-16 sm:py-16 md:py-14">
              <div className="absolute inset-0 bg-gradient-to-br from-terracotta-500/5 to-ocean-500/5"></div>

              <div className="relative mx-auto max-w-3xl text-center flex flex-col items-center justify-center">
                <div className="relative inline-block mb-6">
                  <h2 className="text-3xl font-heading font-bold tracking-tight !text-white sm:text-4xl md:text-5xl relative z-10" style={{ color: '#ffffff' }}>
                    Join Our Journey
                  </h2>
                  <div className="absolute inset-0 bg-gradient-to-r from-terracotta-400/20 via-ocean-400/20 to-gold-400/20 blur-xl -z-10"></div>
                </div>
                <p className="mx-auto max-w-2xl text-base leading-7 !text-gray-300 sm:text-lg sm:leading-8 mb-8" style={{ color: '#d1d5db' }}>
                  Become part of the SophoTravel community. Explore unique destinations, create meaningful memories, and travel with purpose.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                  <a
                    href="/"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-gray-900 shadow-lg hover:bg-gray-50 transition-all hover:scale-105"
                  >
                    Get Started
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base font-semibold text-white hover:text-gray-200 transition-colors"
                    style={{ color: '#ffffff' }}
                  >
                    Learn more
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>

              <div className="absolute -top-20 -right-20 w-80 h-80 bg-terracotta-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-ocean-500/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default StoriesPage;
