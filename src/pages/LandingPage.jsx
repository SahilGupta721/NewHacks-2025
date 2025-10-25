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
      <section className="relative">
        <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 flex justify-center py-5">
          <div className="w-full max-w-[1280px]">
            <div className="p-4">
              <div
                className="min-h-[520px] flex flex-col gap-8 bg-cover bg-center bg-no-repeat rounded-2xl items-center justify-center p-10 md:p-16"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.5) 100%), url("https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1600")`
                }}
              >
                <div className="flex flex-col gap-5 text-center max-w-3xl">
                  <h1 className="font-heading text-5xl md:text-6xl font-bold leading-tight tracking-tight text-white drop-shadow-lg">
                    Discover the Soul of Your
                    <br />
                    Destination
                  </h1>
                  <p className="text-xl md:text-2xl font-light leading-relaxed text-white drop-shadow-md">
                    Bring Home a Piece of Culture
                  </p>
                </div>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="w-full max-w-[540px] mt-2">
                  <div className="flex h-16 md:h-[70px] items-stretch rounded-xl shadow-warm overflow-hidden backdrop-blur-sm">
                    <div className="flex bg-white/95 items-center justify-center pl-5">
                      <Search className="text-terracotta-400" size={22} />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for a city or country..."
                      className="flex-1 bg-white/95 text-gray-900 px-4 text-base placeholder:text-gray-400 focus:outline-none"
                    />
                    <div className="flex items-center bg-white/95 pr-3">
                      <button
                        type="submit"
                        className="h-12 md:h-14 px-6 md:px-8 bg-terracotta-500 hover:bg-terracotta-600 text-gray-900 cursor-pointer font-semibold rounded-lg text-base transition-all duration-200 shadow-md hover:shadow-lg"
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
        <div className="w-full max-w-[1280px] flex flex-col items-center text-center bg-gradient-to-br from-terracotta-50 via-sand-50 to-terracotta-100/30 rounded-2xl p-10 md:p-16 shadow-soft-lg border border-terracotta-100">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Support Local Artisans, Preserve Culture
          </h2>
          <p className="mt-6 max-w-2xl text-gray-800 text-lg md:text-xl leading-relaxed font-medium">
            Every purchase on CulturaCart directly supports the talented artisans who keep
            their cultural heritage alive. Travel with purpose and bring home a story.
          </p>
          <Link
            to="/discover"
            className="mt-10 inline-flex items-center justify-center px-8 h-14 bg-terracotta-500 hover:bg-terracotta-600 text-gray-900 font-semibold rounded-xl text-lg transition-all duration-200 shadow-md hover:shadow-warm hover:-translate-y-0.5"
          >
            Explore All Destinations
          </Link>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
