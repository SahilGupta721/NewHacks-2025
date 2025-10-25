import { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Heart } from 'lucide-react';
import axios from 'axios';
import { products as localProducts } from '../data/products';
import { categories } from '../data/categories';
import { artisans } from '../data/artisans';
import { useCart } from '../context/CartContext';

function DiscoverPage() {
  const [searchParams] = useSearchParams();
  const locationParam = searchParams.get('location'); // Country code (like 'US', 'IN')

  const { toggleWishlist, isInWishlist } = useCart();

  // State for filters
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedArtisan, setSelectedArtisan] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [activeTab, setActiveTab] = useState('all');

  // New: API data
  const [apiProducts, setApiProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Fetch country-specific products using SerpApi
  useEffect(() => {
    if (!locationParam) return; // Only run when user selects a country

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://serpapi.com/search', {
          params: {
          api_key: import.meta.env.VITE_SERPAPI_KEY,
             // replace with your SerpApi key
            engine: 'google_shopping',
            q: 'local handcrafted products',
            gl: locationParam.toLowerCase(),
            hl: 'en',
          },
        });

        const serpResults = response.data.shopping_results || [];

        const mappedProducts = serpResults.map((item, index) => ({
          id: item.product_id || `api-${index}`,
          name: item.title || 'Unknown Product',
          price:
            parseFloat(item.extracted_price) ||
            parseFloat(item.price?.replace(/[^\d.]/g, '')) ||
            0,
          thumbnail: item.thumbnail,
          countryCode: locationParam.toUpperCase(),
          artisan: {
            name: item.source || 'Local Artisan',
            verified: false,
          },
          rating: item.rating || 0,
          reviewCount: item.reviews || 0,
          categoryId: 0,
          featured: false,
        }));

        setApiProducts(mappedProducts);
      } catch (err) {
        console.error('API fetch failed:', err);
        setError('Failed to fetch country-specific products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [locationParam]);

  // ✅ Combine API data + local data
  const allProducts = useMemo(() => {
    if (locationParam && apiProducts.length > 0) {
      return apiProducts;
    } else if (locationParam && apiProducts.length === 0 && !loading) {
      // If API failed or empty, fallback to local ones for that country
      return localProducts.filter(
        (p) => p.countryCode === locationParam.toUpperCase()
      );
    } else {
      return localProducts;
    }
  }, [locationParam, apiProducts, loading]);

  // ✅ Keep your same filtering logic, just applied on allProducts
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.categoryId));
    }

    // Tab filter
    if (activeTab !== 'all') {
      const tabCategory = categories.find((c) => c.slug === activeTab);
      if (tabCategory) {
        result = result.filter((p) => p.categoryId === tabCategory.id);
      }
    }

    // Price range filter
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Artisan filter
    if (selectedArtisan !== 'all') {
      result = result.filter((p) => p.artisanId === parseInt(selectedArtisan));
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'popularity':
      default:
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return result;
  }, [
    allProducts,
    selectedCategories,
    priceRange,
    selectedArtisan,
    sortBy,
    activeTab,
  ]);

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-8">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex gap-8">
            {/* Filter Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              {/* ... your sidebar code unchanged ... */}
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <Link to="/" className="hover:text-terracotta-600">
                  Home
                </Link>
                <span>/</span>
                {locationParam && (
                  <>
                    <span className="text-gray-900">{locationParam}</span>
                    <span>/</span>
                  </>
                )}
                <span className="text-gray-900">
                  {activeTab !== 'all'
                    ? categories.find((c) => c.slug === activeTab)?.name ||
                      'All'
                    : 'All Products'}
                </span>
              </nav>

              {/* Page Title */}
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {locationParam
                  ? `Discover Authentic Crafts in ${locationParam}`
                  : 'Discover Handcrafted Treasures'}
              </h1>

              {/* Loading / Error States */}
              {loading && (
                <div className="text-center py-16">
                  <p className="text-gray-600 text-lg">Loading products...</p>
                </div>
              )}
              {error && (
                <div className="text-center py-16">
                  <p className="text-red-600 text-lg">{error}</p>
                </div>
              )}

              {/* Product Grid */}
              {!loading && !error && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isInWishlist={isInWishlist(product.id)}
                      onToggleWishlist={() => toggleWishlist(product)}
                    />
                  ))}
                </div>
              )}

              {/* Empty State */}
              {!loading && filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-gray-600 text-lg mb-4">
                    No products found
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategories([]);
                      setPriceRange([0, 500]);
                      setSelectedArtisan('all');
                      setActiveTab('all');
                    }}
                    className="px-6 py-3 bg-terracotta-500 text-white rounded-lg hover:bg-terracotta-600 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

// Product Card (unchanged)
function ProductCard({ product, isInWishlist, onToggleWishlist }) {
  const topArtisan = product.artisan?.verified || product.featured;

  return (
    <Link
      to={`/product/${product.id}`}
      className="group bg-white rounded-xl overflow-hidden shadow-soft hover:shadow-warm transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-square overflow-hidden bg-sand-100">
        <img
          src={product.thumbnail}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {topArtisan && (
          <div className="absolute top-3 left-3 bg-gold-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            Top Artisan
          </div>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            onToggleWishlist();
          }}
          className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-md"
        >
          <Heart
            size={18}
            className={
              isInWishlist
                ? 'fill-terracotta-500 text-terracotta-500'
                : 'text-gray-600'
            }
          />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-terracotta-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-terracotta-600 mb-2">
          By {product.artisan?.name || 'Unknown'}
        </p>
        <p className="text-lg font-bold text-terracotta-600">
          ${product.price?.toFixed(2) || 'N/A'}
        </p>
      </div>
    </Link>
  );
}

export default DiscoverPage;
