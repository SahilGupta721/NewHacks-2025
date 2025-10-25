import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { destinations } from '../data/destinations';
import { products } from '../data/products';

function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const featuredDestinations = destinations.filter(d => d.featured);
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: Implement search functionality or redirect to discover page with search query
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 flex justify-center py-5">
          <div className="w-full max-w-[1280px]">
            <div className="p-4">
              <div
                className="min-h-[580px] flex flex-col gap-10 bg-cover bg-center bg-no-repeat rounded-3xl items-center justify-center p-10 md:p-16 relative overflow-hidden"
                style={{
                  backgroundImage: `linear-gradient(135deg, rgba(201, 124, 93, 0.3) 0%, rgba(0, 0, 0, 0.7) 100%), url("https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1600")`
                }}
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                  <div className="absolute top-10 left-10 w-32 h-32 bg-terracotta-400/10 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-10 right-10 w-40 h-40 bg-sand-300/10 rounded-full blur-3xl"></div>
                </div>

                <div className="flex flex-col gap-6 text-center max-w-4xl relative z-10">
                  <h1 className="font-heading text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
                    <span className="text-white drop-shadow-2xl">Discover the </span>
                    <span className="bg-gradient-to-r from-terracotta-300 via-terracotta-400 to-sand-300 bg-clip-text text-transparent drop-shadow-2xl">
                      Soul
                    </span>
                    <span className="text-white drop-shadow-2xl"> of Your</span>
                    <br />
                    <span className="inline-block mt-2 px-8 py-2 bg-terracotta-500/90 backdrop-blur-sm text-white rounded-2xl shadow-2xl transform -rotate-1">
                      Destination
                    </span>
                  </h1>
                  <p className="text-2xl md:text-3xl font-medium leading-relaxed text-white drop-shadow-2xl mt-2">
                    ✨ Bring Home a Piece of <span className="text-terracotta-200 font-bold">Culture</span>
                  </p>
                </div>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="w-full max-w-[600px] mt-4 relative z-10">
                  <div className="flex h-16 md:h-[72px] items-stretch rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md border-2 border-white/20">
                    <div className="flex bg-white items-center justify-center pl-6">
                      <Search className="text-terracotta-500" size={24} />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for a city or country..."
                      className="flex-1 bg-white text-gray-900 px-5 text-base font-medium placeholder:text-gray-400 focus:outline-none"
                    />
                    <div className="flex items-center bg-white pr-3">
                      <button
                        type="submit"
                        className="h-12 md:h-14 px-8 md:px-10 bg-terracotta-500 hover:bg-terracotta-600 text-white cursor-pointer font-bold rounded-xl text-base transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 flex justify-center py-8 md:py-12">
        <div className="w-full max-w-[1280px]">
          <h2 className="font-heading text-3xl md:text-4xl font-bold leading-tight tracking-tight px-4 pb-6 pt-2 text-gray-900">
            Destinations to Inspire You
          </h2>

          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex items-stretch p-4 gap-5 md:gap-6">
              {featuredDestinations.map((destination) => (
                <Link
                  key={destination.id}
                  to={`/discover?location=${destination.slug}`}
                  className="flex-shrink-0 w-72 flex flex-col gap-4 rounded-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-warm"
                >
                  <div
                    className="w-full aspect-video bg-center bg-no-repeat bg-cover rounded-xl shadow-soft"
                    style={{ backgroundImage: `url("${destination.image}")` }}
                  />
                  <div className="px-1">
                    <p className="font-heading text-lg font-semibold leading-snug text-gray-900 mb-1">
                      {destination.name}
                    </p>
                    <p className="text-gray-600 text-sm font-normal leading-relaxed">
                      {destination.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 flex justify-center py-8 md:py-12 bg-background-warm">
        <div className="w-full max-w-[1280px]">
          <h2 className="font-heading text-3xl md:text-4xl font-bold leading-tight tracking-tight px-4 pb-6 pt-2 text-gray-900">
            Authentic Finds from Around the World
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 p-4">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group flex flex-col gap-4 bg-white rounded-xl p-3 transition-all duration-300 hover:shadow-warm hover:-translate-y-1"
              >
                <div
                  className="w-full aspect-square bg-cover bg-center rounded-lg overflow-hidden shadow-soft transform transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundImage: `url("${product.thumbnail}")` }}
                />
                <div className="px-1">
                  <p className="font-heading text-base font-semibold leading-snug text-gray-900 mb-1">
                    {product.name}
                  </p>
                  <p className="text-gray-500 text-sm font-normal leading-relaxed mb-2">
                    By Artisan {product.artisan.name}
                  </p>
                  <p className="text-terracotta-600 font-bold text-lg">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 flex justify-center py-12 md:py-16">
        <div className="w-full max-w-[1280px] relative overflow-hidden rounded-3xl">
          {/* Background with Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-terracotta-600 via-terracotta-500 to-terracotta-700"></div>
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>

          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-terracotta-900/20 rounded-full blur-3xl"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center p-12 md:p-20">
            <div className="inline-block mb-6 px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
              <p className="text-white/90 text-sm font-semibold tracking-wide uppercase">Our Mission</p>
            </div>

            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-4xl">
              Support Local Artisans,
              <br />
              <span className="inline-block mt-2 bg-white text-terracotta-600 px-6 py-1 rounded-2xl transform -rotate-1 shadow-2xl">
                Preserve Culture
              </span>
            </h2>

            <p className="mt-8 max-w-3xl text-white/95 text-xl md:text-2xl leading-relaxed font-medium">
              Every purchase on CulturaCart directly supports the talented artisans who keep
              their cultural heritage alive. <span className="font-bold">Travel with purpose</span> and bring home a story.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row gap-4 items-center">
              <Link
                to="/discover"
                className="group inline-flex items-center justify-center px-10 h-16 bg-white hover:bg-sand-50 text-terracotta-600 font-bold rounded-2xl text-lg transition-all duration-300 shadow-2xl hover:shadow-xl hover:scale-105"
              >
                Explore All Destinations
                <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>

              <Link
                to="/map"
                className="inline-flex items-center justify-center px-10 h-16 bg-transparent hover:bg-white/10 text-white font-semibold rounded-2xl text-lg transition-all duration-200 border-2 border-white/50 hover:border-white"
              >
                Meet the Artisans
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 md:gap-12 w-full max-w-3xl">
              <div className="flex flex-col items-center">
                <p className="text-4xl md:text-5xl font-bold text-white">1000+</p>
                <p className="mt-2 text-white/80 text-sm md:text-base font-medium">Artisans</p>
              </div>
              <div className="flex flex-col items-center border-l border-r border-white/30">
                <p className="text-4xl md:text-5xl font-bold text-white">50+</p>
                <p className="mt-2 text-white/80 text-sm md:text-base font-medium">Countries</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-4xl md:text-5xl font-bold text-white">10k+</p>
                <p className="mt-2 text-white/80 text-sm md:text-base font-medium">Products</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
