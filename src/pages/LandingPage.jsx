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
                className="min-h-[480px] flex flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-8 md:p-12"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url("https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1600")`
                }}
              >
                <div className="flex flex-col gap-4 text-center text-white max-w-3xl">
                  <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight">
                    Discover the Soul of Your Destination
                  </h1>
                  <h2 className="text-lg md:text-xl font-normal leading-normal">
                    Bring Home a Piece of Culture
                  </h2>
                </div>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="w-full max-w-[480px] mt-4">
                  <div className="flex h-14 md:h-16 items-stretch rounded-lg shadow-lg overflow-hidden">
                    <div className="flex bg-white items-center justify-center pl-4">
                      <Search className="text-gray-500" size={20} />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for a city or country..."
                      className="flex-1 bg-white text-gray-900 px-4 text-sm md:text-base focus:outline-none"
                    />
                    <div className="flex items-center bg-white pr-2">
                      <button
                        type="submit"
                        className="h-10 md:h-12 px-4 md:px-5 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg text-sm md:text-base transition-colors"
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
      <section className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 flex justify-center py-5">
        <div className="w-full max-w-[1280px]">
          <h2 className="text-gray-900 text-2xl font-bold leading-tight tracking-tight px-4 pb-3 pt-5">
            Destinations to Inspire You
          </h2>

          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex items-stretch p-4 gap-4">
              {featuredDestinations.map((destination) => (
                <Link
                  key={destination.id}
                  to={`/discover?location=${destination.slug}`}
                  className="flex-shrink-0 w-64 flex flex-col gap-4 rounded-lg transform transition-transform duration-300 hover:-translate-y-1"
                >
                  <div
                    className="w-full aspect-video bg-center bg-no-repeat bg-cover rounded-lg"
                    style={{ backgroundImage: `url("${destination.image}")` }}
                  />
                  <div>
                    <p className="text-gray-900 text-base font-medium leading-normal">
                      {destination.name}
                    </p>
                    <p className="text-gray-500 text-sm font-normal leading-normal">
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
      <section className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 flex justify-center py-5">
        <div className="w-full max-w-[1280px]">
          <h2 className="text-gray-900 text-2xl font-bold leading-tight tracking-tight px-4 pb-3 pt-5">
            Authentic Finds from Around the World
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group flex flex-col gap-3"
              >
                <div
                  className="w-full aspect-square bg-cover bg-center rounded-lg overflow-hidden transform transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundImage: `url("${product.thumbnail}")` }}
                />
                <div>
                  <p className="text-gray-900 text-base font-medium leading-normal">
                    {product.name}
                  </p>
                  <p className="text-gray-500 text-sm font-normal leading-normal">
                    By Artisan {product.artisan.name}
                  </p>
                  <p className="text-primary font-bold text-base mt-1">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 flex justify-center py-10">
        <div className="w-full max-w-[1280px] flex flex-col items-center text-center bg-primary/10 rounded-xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Support Local Artisans, Preserve Culture
          </h2>
          <p className="mt-4 max-w-2xl text-gray-700 text-base md:text-lg">
            Every purchase on CulturaCart directly supports the talented artisans who keep
            their cultural heritage alive. Travel with purpose and bring home a story.
          </p>
          <Link
            to="/discover"
            className="mt-8 inline-flex items-center justify-center px-6 h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg text-base transition-colors"
          >
            Explore All Destinations
          </Link>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
