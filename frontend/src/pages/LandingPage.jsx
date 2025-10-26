import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { destinations } from '../data/destinations';
import { products } from '../data/products';

function LandingPage() {
  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem('wishlist')) || [];
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const featuredDestinations = destinations.filter(d => d.featured);
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);

  
  const toggleWishlist = (destinationId) => {
    setWishlist(prev =>
      prev.includes(destinationId)
        ? prev.filter(id => id !== destinationId)
        : [...prev, destinationId]
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 flex justify-center py-5">
          <div className="w-full max-w-[1280px]">
            <div
              className="p-4 min-h-[480px] flex flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-8 md:p-12"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1600")`
              }}
            >
              <div className="flex flex-col gap-4 text-center text-white max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-black-text">
                  Discover the Soul of Your Destination
                </h1>
                <h2 className="text-lg md:text-xl font-normal">
                  Bring Home a Piece of Culture
                </h2>
              </div>

              {/* Search Bar */}
              
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations Section */}
      <section className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 flex justify-center py-5">
        <div className="w-full max-w-[1280px]">
          <h2 className="text-gray-900 text-2xl font-bold px-4 pb-3 pt-5 header-title">
            Destinations to Inspire You
          </h2>
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex items-stretch p-4 gap-4">
              {featuredDestinations.map((destination) => (
                <div key={destination.id} className="relative flex-shrink-0 w-64 flex flex-col gap-4 rounded-lg">
                  <div className="relative">
                    <div
                      className="w-full aspect-video bg-center bg-no-repeat bg-cover rounded-lg"
                      style={{ backgroundImage: `url("${destination.image}")` }}
                    />
                  </div>

                  {/* Heart Icon */}
                  <button
                    onClick={() => toggleWishlist(destination.id)}
                    className="absolute top-2 right-2 p-1 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                  >
                    <Heart
                      className={`w-6 h-6 transition-colors ${
                        wishlist.includes(destination.id)
                          ? 'text-red-500'
                          : 'text-white'
                      }`}
                    />
                  </button>

                  <div>
                    <p className="text-gray-900">{destination.name}</p>
                    <p className="text-gray-500 text-sm">{destination.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Wishlist Display */}
          {wishlist.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-2">Your Wishlist</h3>
              <div className="flex gap-4 overflow-x-auto">
                {wishlist.map(id => {
                  const item = featuredDestinations.find(d => d.id === id);
                  return (
                    <div key={id} className="w-32 flex-shrink-0">
                      <div
                        className="w-full h-24 bg-cover bg-center rounded-lg"
                        style={{ backgroundImage: `url("${item.image}")` }}
                      />
                      <p className="text-sm text-gray-900">{item.name}</p>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={() => setWishlist([])}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Clear Wishlist
              </button>
            </div>
          )}
        </div>
      </section>

      {/*
      <section className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 flex justify-center py-5">
        <div className="w-full max-w-[1280px]">
          <h2 className="text-gray-900 text-2xl font-bold px-4 pb-3 pt-5">
            Authentic Finds from Around the World
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {featuredProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className="group flex flex-col gap-3">
                <div
                  className="w-full aspect-square bg-cover bg-center rounded-lg overflow-hidden transform transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundImage: `url("${product.thumbnail}")` }}
                />
                <div>
                  <p className="text-gray-900">{product.name}</p>
                  <p className="text-gray-500 text-sm">By Artisan {product.artisan.name}</p>
                  <p className="text-primary font-bold mt-1">${product.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      */}

    </div>
  );
}

export default LandingPage;
