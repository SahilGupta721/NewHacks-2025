import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart } from 'lucide-react';
import { destinations } from '../data/destinations';
import { products } from '../data/products';
import { useEffect } from 'react';

const countries = [
  { name: 'United States', code: 'US' },
  { name: 'Canada', code: 'CA' },
  { name: 'France', code: 'FR' },
  { name: 'Italy', code: 'IT' },
  { name: 'Japan', code: 'JP' },
  { name: 'India', code: 'IN' },
  { name: 'Mexico', code: 'MX' },
  { name: 'United Kingdom', code: 'GB' },
  { name: 'Germany', code: 'DE' },
  { name: 'Spain', code: 'ES' },
  { name: 'Australia', code: 'AU' },
  { name: 'Brazil', code: 'BR' },
  { name: 'China', code: 'CN' },
  { name: 'South Korea', code: 'KR' },
  { name: 'Russia', code: 'RU' },
  { name: 'South Africa', code: 'ZA' },
  { name: 'New Zealand', code: 'NZ' },
  { name: 'Argentina', code: 'AR' },
  { name: 'Netherlands', code: 'NL' },
  { name: 'Sweden', code: 'SE' },
  { name: 'Switzerland', code: 'CH' },
  { name: 'Turkey', code: 'TR' },
  { name: 'Saudi Arabia', code: 'SA' },
  { name: 'United Arab Emirates', code: 'AE' },
  { name: 'Singapore', code: 'SG' },
  { name: 'Thailand', code: 'TH' },
  { name: 'Malaysia', code: 'MY' },
  { name: 'Philippines', code: 'PH' },
  { name: 'Vietnam', code: 'VN' },
  { name: 'Egypt', code: 'EG' },
  { name: 'Nigeria', code: 'NG' },
  { name: 'Pakistan', code: 'PK' },
  { name: 'Bangladesh', code: 'BD' },
  { name: 'Indonesia', code: 'ID' },
  { name: 'Colombia', code: 'CO' },
  { name: 'Chile', code: 'CL' },
  { name: 'Portugal', code: 'PT' },
  { name: 'Ireland', code: 'IE' },
  { name: 'Norway', code: 'NO' },
  { name: 'Finland', code: 'FI' },
];

function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  //const [wishlist, setWishlist] = useState([]);
  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem('wishlist')) || [];
  });

  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const featuredDestinations = destinations.filter(d => d.featured);
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.length > 0) {
      const filtered = countries.filter(c =>
        c.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectCountry = (countryCode) => {
    setSearchQuery('');
    setSuggestions([]);
    navigate(`/discover?location=${countryCode}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const country = countries.find(c =>
        c.name.toLowerCase() === searchQuery.trim().toLowerCase()
      );
      if (country) {
        navigate(`/discover?location=${country.code}`);
      } else {
        alert('Please select a valid country from the suggestions.');
      }
    }
  };

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
                <h1 className="text-4xl md:text-5xl font-black">
                  Discover the Soul of Your Destination
                </h1>
                <h2 className="text-lg md:text-xl font-normal">
                  Bring Home a Piece of Culture
                </h2>
              </div>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="w-full max-w-[480px] mt-4 relative">
                <div className="flex h-14 md:h-16 items-stretch rounded-lg shadow-lg overflow-hidden">
                  <div className="flex bg-white items-center justify-center pl-4">
                    <Search className="text-gray-500" size={20} />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search for a country..."
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

                {suggestions.length > 0 && (
                  <ul className="absolute top-full left-0 right-0 bg-white shadow-md border mt-1 max-h-60 overflow-y-auto z-10 rounded-md">
                    {suggestions.map(c => (
                      <li
                        key={c.code}
                        onClick={() => handleSelectCountry(c.code)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {c.name}
                      </li>
                    ))}
                  </ul>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations Section */}
      <section className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 flex justify-center py-5">
        <div className="w-full max-w-[1280px]">
          <h2 className="text-gray-900 text-2xl font-bold px-4 pb-3 pt-5">
            Destinations to Inspire You
          </h2>
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex items-stretch p-4 gap-4">
              {featuredDestinations.map((destination) => (
                <div key={destination.id} className="relative flex-shrink-0 w-64 flex flex-col gap-4 rounded-lg">
                  <Link to={`/discover?location=${destination.slug}`} className="relative">
                    <div
                      className="w-full aspect-video bg-center bg-no-repeat bg-cover rounded-lg"
                      style={{ backgroundImage: `url("${destination.image}")` }}
                    />
                  </Link>

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
