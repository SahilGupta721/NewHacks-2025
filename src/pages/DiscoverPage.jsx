import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { artisans } from '../data/artisans';
import { useCart } from '../context/CartContext';

function DiscoverPage() {
  const [searchParams] = useSearchParams();
  const locationParam = searchParams.get('location');

  const { toggleWishlist, isInWishlist } = useCart();

  // State for filters
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedArtisan, setSelectedArtisan] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [activeTab, setActiveTab] = useState('all');

  // Filter products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.categoryId));
    }

    // Tab filter (same as category but from tabs)
    if (activeTab !== 'all') {
      const tabCategory = categories.find(c => c.slug === activeTab);
      if (tabCategory) {
        result = result.filter(p => p.categoryId === tabCategory.id);
      }
    }

    // Price range filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Artisan filter
    if (selectedArtisan !== 'all') {
      result = result.filter(p => p.artisanId === parseInt(selectedArtisan));
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
  }, [selectedCategories, priceRange, selectedArtisan, sortBy, activeTab]);

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
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
              <div className="bg-white rounded-xl p-6 shadow-soft sticky top-24">
                {/* Categories */}
                <div className="mb-8">
                  <h3 className="font-heading text-lg font-bold text-gray-900 mb-4">
                    Categories
                  </h3>
                  <div className="space-y-3">
                    {categories.map(category => (
                      <label
                        key={category.id}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category.id)}
                          onChange={() => handleCategoryToggle(category.id)}
                          className="w-4 h-4 rounded border-gray-300 text-terracotta-500 focus:ring-terracotta-400"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-terracotta-600">
                          {category.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-8 pb-8 border-b border-sand-200">
                  <h3 className="font-heading text-lg font-bold text-gray-900 mb-4">
                    Price Range
                  </h3>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-sand-200 rounded-lg appearance-none cursor-pointer accent-terracotta-500"
                    />
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Artisans */}
                <div>
                  <h3 className="font-heading text-lg font-bold text-gray-900 mb-4">
                    Artisans
                  </h3>
                  <select
                    value={selectedArtisan}
                    onChange={(e) => setSelectedArtisan(e.target.value)}
                    className="w-full px-4 py-2 border border-sand-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta-400 text-sm"
                  >
                    <option value="all">All Artisans</option>
                    {artisans.map(artisan => (
                      <option key={artisan.id} value={artisan.id}>
                        {artisan.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <Link to="/" className="hover:text-terracotta-600">Home</Link>
                <span>/</span>
                {locationParam && (
                  <>
                    <span className="text-gray-900">{locationParam}</span>
                    <span>/</span>
                  </>
                )}
                <span className="text-gray-900">
                  {activeTab !== 'all'
                    ? categories.find(c => c.slug === activeTab)?.name || 'All'
                    : 'All Products'}
                </span>
              </nav>

              {/* Page Title */}
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {locationParam
                  ? `Discover Authentic Crafts in ${locationParam}`
                  : 'Discover Handcrafted Treasures'}
              </h1>

              {/* Category Tabs */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                      activeTab === 'all'
                        ? 'bg-terracotta-500 text-white shadow-md'
                        : 'bg-white text-gray-700 hover:bg-terracotta-50'
                    }`}
                  >
                    All
                  </button>
                  {categories.slice(0, 3).map(category => (
                    <button
                      key={category.id}
                      onClick={() => setActiveTab(category.slug)}
                      className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                        activeTab === category.slug
                          ? 'bg-terracotta-500 text-white shadow-md'
                          : 'bg-white text-gray-700 hover:bg-terracotta-50'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-sand-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta-400 text-sm bg-white"
                  >
                    <option value="popularity">Popularity</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isInWishlist={isInWishlist(product.id)}
                    onToggleWishlist={() => toggleWishlist(product)}
                  />
                ))}
              </div>

              {/* Empty State */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-gray-600 text-lg mb-4">No products found</p>
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

// Product Card Component
function ProductCard({ product, isInWishlist, onToggleWishlist }) {
  const topArtisan = product.artisan.verified || product.featured;

  return (
    <Link
      to={`/product/${product.id}`}
      className="group bg-white rounded-xl overflow-hidden shadow-soft hover:shadow-warm transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-sand-100">
        <img
          src={product.thumbnail}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Top Artisan Badge */}
        {topArtisan && (
          <div className="absolute top-3 left-3 bg-gold-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            Top Artisan
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            onToggleWishlist();
          }}
          className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-md"
        >
          <Heart
            size={18}
            className={isInWishlist ? 'fill-terracotta-500 text-terracotta-500' : 'text-gray-600'}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-terracotta-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-terracotta-600 mb-2">
          By {product.artisan.name}
        </p>
        <p className="text-lg font-bold text-terracotta-600">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}

export default DiscoverPage;
