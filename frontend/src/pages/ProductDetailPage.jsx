import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ChevronLeft } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('story');

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link to="/" className="text-terracotta-600 hover:text-terracotta-700">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // TODO: Show toast notification
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-8">
        <div className="max-w-[1280px] mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <Link to="/" className="hover:text-terracotta-600">Home</Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>

          {/* Main Content - Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Left: Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square bg-sand-100 rounded-2xl overflow-hidden shadow-soft">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden transition-all ${
                      selectedImage === index
                        ? 'ring-4 ring-terracotta-500 shadow-md'
                        : 'ring-2 ring-sand-200 hover:ring-terracotta-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="space-y-6">
              {/* Product Name & Location */}
              <div>
                <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                  {product.name}
                </h1>
                <p className="text-lg text-gray-600">
                  {product.artisan.location}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={i < Math.floor(product.rating) ? 'text-gold-500' : 'text-gray-300'}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="py-4 border-y border-sand-200">
                <div className="flex items-baseline gap-3">
                  {product.originalPrice && (
                    <span className="text-2xl text-gray-400 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-4xl font-bold text-terracotta-600">
                    ${product.price.toFixed(2)} USD
                  </span>
                </div>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                {product.inStock ? (
                  <>
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-sm font-medium text-green-700">
                      In Stock ({product.stockQuantity} available)
                    </span>
                  </>
                ) : (
                  <>
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    <span className="text-sm font-medium text-red-700">Out of Stock</span>
                  </>
                )}
                {product.madeToOrder && (
                  <span className="ml-2 px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                    Made to Order
                  </span>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <label className="font-semibold text-gray-900">Quantity:</label>
                <div className="flex items-center border-2 border-sand-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-sand-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                    className="px-4 py-2 hover:bg-sand-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock && !product.madeToOrder}
                  className="flex-1 h-14 bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-warm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className="w-14 h-14 border-2 border-sand-200 rounded-xl flex items-center justify-center hover:border-terracotta-400 hover:bg-terracotta-50 transition-colors"
                >
                  <Heart
                    size={24}
                    className={isInWishlist(product.id) ? 'fill-terracotta-500 text-terracotta-500' : 'text-gray-600'}
                  />
                </button>
              </div>

              {/* Artisan Card */}
              <div className="bg-sand-50 rounded-xl p-6 border border-sand-200">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-3">
                  About the Artisan
                </h3>
                <Link
                  to={`/artisan/${product.artisan.id}`}
                  className="flex items-center gap-4 group"
                >
                  <img
                    src={product.artisan.avatar}
                    alt={product.artisan.name}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-sand-200 group-hover:ring-terracotta-400 transition-all"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 group-hover:text-terracotta-600 transition-colors">
                      {product.artisan.name}
                    </p>
                    <p className="text-sm text-gray-600">{product.artisan.location}</p>
                  </div>
                </Link>
              </div>

              {/* Delivery Info */}
              <div className="text-sm text-gray-600 space-y-1">
                <p>📦 Estimated Delivery: {product.estimatedDelivery}</p>
                <p>🚚 Free shipping on orders over $100</p>
                <p>↩️ 30-day return policy</p>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mb-16">
            {/* Tab Navigation */}
            <div className="border-b border-sand-200 mb-8">
              <div className="flex gap-8">
                {[
                  { id: 'story', label: 'Cultural Story' },
                  { id: 'details', label: 'Product Details' },
                  { id: 'reviews', label: 'Reviews' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-4 font-semibold transition-all relative ${
                      activeTab === tab.id
                        ? 'text-terracotta-600'
                        : 'text-gray-600 hover:text-terracotta-500'
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-terracotta-500"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="prose max-w-none">
              {activeTab === 'story' && (
                <div className="space-y-6">
                  <h2 className="font-heading text-2xl font-bold text-gray-900">
                    The Story Behind This Piece
                  </h2>
                  <p className="text-gray-700 leading-relaxed">{product.story}</p>
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>
              )}

              {activeTab === 'details' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-gray-900 mb-3">
                      Materials
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.materials.map((material, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-terracotta-50 text-terracotta-700 rounded-full text-sm font-medium"
                        >
                          {material}
                        </span>
                      ))}
                    </div>
                  </div>

                  {product.dimensions && (
                    <div>
                      <h3 className="font-heading text-xl font-bold text-gray-900 mb-3">
                        Dimensions
                      </h3>
                      <p className="text-gray-700">
                        {product.dimensions.height && `Height: ${product.dimensions.height}${product.dimensions.unit}`}
                        {product.dimensions.width && ` × Width: ${product.dimensions.width}${product.dimensions.unit}`}
                        {product.dimensions.depth && ` × Depth: ${product.dimensions.depth}${product.dimensions.unit}`}
                        {product.dimensions.diameter && `Diameter: ${product.dimensions.diameter}${product.dimensions.unit}`}
                      </p>
                    </div>
                  )}

                  <div>
                    <h3 className="font-heading text-xl font-bold text-gray-900 mb-3">
                      Care Instructions
                    </h3>
                    <p className="text-gray-700">{product.careInstructions}</p>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <div className="text-center py-8">
                    <p className="text-gray-600">Reviews coming soon!</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {product.reviewCount} customers have reviewed this product
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="font-heading text-3xl font-bold text-gray-900 mb-8">
                You May Also Like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map(relatedProduct => (
                  <Link
                    key={relatedProduct.id}
                    to={`/product/${relatedProduct.id}`}
                    className="group bg-white rounded-xl overflow-hidden shadow-soft hover:shadow-warm transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative aspect-square overflow-hidden bg-sand-100">
                      <img
                        src={relatedProduct.thumbnail}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-sm text-terracotta-600 mb-2">
                        By {relatedProduct.artisan.name}
                      </p>
                      <p className="text-lg font-bold text-terracotta-600">
                        ${relatedProduct.price.toFixed(2)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
