import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, Award, Calendar, Package, Heart, MessageCircle, Instagram, Facebook, Droplet, Scissors, Leaf, Gem, Palette, Hammer, Flame, Sparkles, Users } from 'lucide-react';
import { artisans } from '../data/artisans';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

// Map specialties to icons
const getSpecialtyIcon = (specialty) => {
  const iconMap = {
    'Natural Dyes': Droplet,
    'Hand-Loom Weaving': Scissors,
    'Organic Wool': Leaf,
    'Block Printing': Palette,
    'Natural Wool': Leaf,
    'Traditional Patterns': Palette,
    'Berber Weaving': Scissors,
    'Hand Weaving': Scissors,
    'Silver Work': Gem,
    'Stone Setting': Gem,
    'Traditional Designs': Palette,
    'Decorative Art': Palette,
    'Wood Carving': Hammer,
    'Furniture Making': Hammer,
    'Traditional Tools': Hammer,
    'Raku Pottery': Flame,
    'Kintsugi': Sparkles,
    'Traditional Glazing': Flame,
    'Glazing Techniques': Flame,
    'Traditional Pottery': Flame,
  };

  const IconComponent = iconMap[specialty] || Sparkles;
  return IconComponent;
};

function ArtisanProfilePage() {
  const { id } = useParams();
  const artisan = artisans.find(a => a.id === parseInt(id) || a.slug === id);
  const { toggleWishlist, isInWishlist } = useCart();

  const [isFollowing, setIsFollowing] = useState(false);

  if (!artisan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold text-gray-900 mb-4">Artisan Not Found</h1>
          <Link to="/discover" className="text-terracotta-600 hover:text-terracotta-700">
            ← Back to Discover
          </Link>
        </div>
      </div>
    );
  }

  // Filter products by this artisan
  const artisanProducts = products.filter(p => p.artisanId === artisan.id);
  const featuredProducts = artisanProducts.slice(0, 6);

  // Mock testimonials (in real app, would come from reviews data)
  const testimonials = [
    {
      id: 1,
      name: "Sarah L.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      rating: 5,
      text: `The quality of the ${artisanProducts[0]?.name || 'product'} I bought is just incredible. The colors are so vibrant, and you can feel the love and history woven into it. A true masterpiece.`
    },
    {
      id: 2,
      name: "Mark C.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      rating: 5,
      text: `I messaged ${artisan.name} to ask about a custom piece and they were so kind and helpful. The final product exceeded all my expectations. Highly recommend!`
    }
  ];

  // Calculate member duration
  const memberDate = new Date(artisan.memberSince);
  const yearsSince = new Date().getFullYear() - memberDate.getFullYear();

  return (
    <div className="min-h-screen bg-background">
      {/* Cover Photo with Avatar Overlay */}
      <div className="relative">
        {/* Cover Photo */}
        <div className="h-64 md:h-80 w-full overflow-hidden bg-sand-200">
          <img
            src={artisan.coverPhoto}
            alt={`${artisan.name} cover`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
        </div>

        {/* Content Container */}
        <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40">
          <div className="max-w-[1280px] mx-auto">
            {/* Avatar and Info Section */}
            <div className="relative -mt-16 md:-mt-20 mb-8">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                {/* Left: Avatar + Info */}
                <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">
                  {/* Avatar */}
                  <div className="relative">
                    <img
                      src={artisan.avatar}
                      alt={artisan.name}
                      className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover ring-4 ring-background shadow-warm"
                    />
                    {artisan.verified && (
                      <div className="absolute bottom-2 right-2 w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center ring-4 ring-background">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Name & Location */}
                  <div className="text-center sm:text-left mb-4 sm:mb-2">
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                      {artisan.name}
                    </h1>
                    <p className="text-lg text-gray-600 flex items-center gap-2 justify-center sm:justify-start mb-1">
                      <MapPin size={18} className="text-terracotta-500" />
                      {artisan.location.city}, {artisan.location.country}
                    </p>
                    <p className="text-md text-terracotta-600 font-semibold">
                      {artisan.craftSpecialty}
                    </p>
                  </div>
                </div>

                {/* Right: Action Buttons */}
                <div className="flex gap-3 justify-center md:justify-end">
                  <button
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                      isFollowing
                        ? 'bg-terracotta-500 text-white hover:bg-terracotta-600'
                        : 'border-2 border-terracotta-500 text-terracotta-600 hover:bg-terracotta-50'
                    }`}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </button>
                  <button className="px-6 py-3 bg-terracotta-500 text-white rounded-xl font-semibold hover:bg-terracotta-600 transition-all shadow-md hover:shadow-warm flex items-center gap-2">
                    <MessageCircle size={18} />
                    Message
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <div className="bg-white rounded-xl p-6 text-center shadow-soft">
                <div className="flex justify-center mb-2">
                  <Calendar size={24} className="text-terracotta-500" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{artisan.yearsOfExperience}</p>
                <p className="text-sm text-gray-600">Years Experience</p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-soft">
                <div className="flex justify-center mb-2">
                  <Package size={24} className="text-terracotta-500" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{artisan.productCount}</p>
                <p className="text-sm text-gray-600">Products</p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-soft">
                <div className="flex justify-center mb-2">
                  <Star size={24} className="text-gold-500 fill-gold-500" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{artisan.rating}</p>
                <p className="text-sm text-gray-600">Average Rating</p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-soft">
                <div className="flex justify-center mb-2">
                  <Users size={24} className="text-terracotta-500" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{artisan.reviewCount}</p>
                <p className="text-sm text-gray-600">Reviews</p>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
              {/* Left Column: About & Story */}
              <div className="lg:col-span-2 space-y-12">
                {/* About Section */}
                <section>
                  <h2 className="font-heading text-3xl font-bold text-gray-900 mb-6">
                    About {artisan.name.split(' ')[0]}
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-lg mb-6">
                    {artisan.bio}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {artisan.story}
                  </p>
                </section>

                {/* Their Craft Section */}
                <section>
                  <h2 className="font-heading text-3xl font-bold text-gray-900 mb-6">
                    Their Craft
                  </h2>

                  {/* Specialties Icons */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {artisan.specialties.map((specialty, index) => {
                      const IconComponent = getSpecialtyIcon(specialty);
                      return (
                        <div key={index} className="flex flex-col items-center text-center p-4 bg-terracotta-50 rounded-xl">
                          <IconComponent size={32} className="text-terracotta-600 mb-2" />
                          <p className="text-sm font-semibold text-gray-900">{specialty}</p>
                        </div>
                      );
                    })}
                  </div>

                  <p className="text-gray-700 leading-relaxed">
                    {artisan.name.split(' ')[0]}'s craft is a testament to the enduring legacy of {artisan.craftSpecialty.toLowerCase()}.
                    Every piece is created by hand using traditional techniques passed down through generations.
                    The dedication to preserving cultural heritage while creating functional art has been the cornerstone of their work for over {artisan.yearsOfExperience} years.
                  </p>
                </section>

                {/* Workshop/Behind the Scenes */}
                <section>
                  <h2 className="font-heading text-3xl font-bold text-gray-900 mb-6">
                    Behind the Scenes
                  </h2>
                  <div className="relative aspect-video bg-sand-100 rounded-2xl overflow-hidden shadow-soft group">
                    <img
                      src={artisan.coverPhoto}
                      alt={`${artisan.name} at work`}
                      className="w-full h-full object-cover"
                    />
                    {/* Optional play button overlay for video */}
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                        <svg className="w-8 h-8 text-terracotta-600 ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-3 italic">
                    {artisan.name} at work in their studio in {artisan.location.city}
                  </p>
                </section>

                {/* Featured Products */}
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-heading text-3xl font-bold text-gray-900">
                      Featured Products
                    </h2>
                    {artisanProducts.length > 6 && (
                      <Link
                        to={`/discover?artisan=${artisan.id}`}
                        className="text-terracotta-600 hover:text-terracotta-700 font-semibold"
                      >
                        View All →
                      </Link>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredProducts.map(product => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        isInWishlist={isInWishlist(product.id)}
                        onToggleWishlist={() => toggleWishlist(product)}
                      />
                    ))}
                  </div>

                  {artisanProducts.length === 0 && (
                    <div className="text-center py-12 bg-sand-50 rounded-xl">
                      <p className="text-gray-600">No products available yet.</p>
                    </div>
                  )}
                </section>
              </div>

              {/* Right Column: Awards, Social, Testimonials */}
              <div className="space-y-8">
                {/* Awards & Recognition */}
                {artisan.awards && artisan.awards.length > 0 && (
                  <section className="bg-white rounded-xl p-6 shadow-soft">
                    <h3 className="font-heading text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Award size={24} className="text-gold-500" />
                      Awards & Recognition
                    </h3>
                    <ul className="space-y-3">
                      {artisan.awards.map((award, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-gold-500 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-700 text-sm">{award}</p>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Member Since */}
                <section className="bg-sand-50 rounded-xl p-6 border border-sand-200">
                  <h3 className="font-heading text-lg font-bold text-gray-900 mb-3">
                    Member Since
                  </h3>
                  <p className="text-gray-700">
                    {memberDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {yearsSince} {yearsSince === 1 ? 'year' : 'years'} on CulturaCart
                  </p>
                </section>

                {/* Social Media */}
                {artisan.socialMedia && (
                  <section className="bg-white rounded-xl p-6 shadow-soft">
                    <h3 className="font-heading text-lg font-bold text-gray-900 mb-4">
                      Connect
                    </h3>
                    <div className="space-y-3">
                      {artisan.socialMedia.instagram && (
                        <a
                          href={`https://instagram.com/${artisan.socialMedia.instagram.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 text-gray-700 hover:text-terracotta-600 transition-colors"
                        >
                          <Instagram size={20} />
                          <span>{artisan.socialMedia.instagram}</span>
                        </a>
                      )}
                      {artisan.socialMedia.facebook && (
                        <a
                          href={`https://facebook.com/${artisan.socialMedia.facebook}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 text-gray-700 hover:text-terracotta-600 transition-colors"
                        >
                          <Facebook size={20} />
                          <span>{artisan.socialMedia.facebook}</span>
                        </a>
                      )}
                    </div>
                  </section>
                )}

                {/* Press Features */}
                {artisan.pressFeatures && artisan.pressFeatures.length > 0 && (
                  <section className="bg-white rounded-xl p-6 shadow-soft">
                    <h3 className="font-heading text-lg font-bold text-gray-900 mb-4">
                      Featured In
                    </h3>
                    <ul className="space-y-3">
                      {artisan.pressFeatures.map((feature, index) => (
                        <li key={index}>
                          <a
                            href={feature.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-terracotta-600 hover:text-terracotta-700 text-sm font-semibold"
                          >
                            {feature.publication}
                          </a>
                          <p className="text-xs text-gray-600 mt-1">{feature.title}</p>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>
            </div>

            {/* From Our Community (Testimonials) */}
            <section className="mb-16">
              <h2 className="font-heading text-3xl font-bold text-gray-900 mb-8">
                From Our Community
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.map(testimonial => (
                  <div key={testimonial.id} className="bg-white rounded-xl p-6 shadow-soft">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        <div className="flex items-center gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} size={14} className="text-gold-500 fill-gold-500" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">"{testimonial.text}"</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

// Product Card Component
function ProductCard({ product, isInWishlist, onToggleWishlist }) {
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
        <p className="text-lg font-bold text-terracotta-600">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}

export default ArtisanProfilePage;
