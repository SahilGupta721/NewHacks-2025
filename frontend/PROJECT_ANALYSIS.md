# 📋 PHÂN TÍCH VÀ KẾ HOẠCH PHÁT TRIỂN DỰ ÁN CULTURACART

## 🎯 TỔNG QUAN DỰ ÁN

### Mô tả
**CulturaCart** là một nền tảng thương mại điện tử (e-commerce) chuyên về sản phẩm văn hóa thủ công, kết nối nghệ nhân với người tiêu dùng yêu thích sản phẩm thủ công có giá trị văn hóa.

### Giá trị cốt lõi
- **Kết nối trực tiếp**: Người mua kết nối trực tiếp với nghệ nhân
- **Bảo tồn văn hóa**: Lưu giữ và quảng bá nghề thủ công truyền thống
- **Câu chuyện đằng sau sản phẩm**: Mỗi sản phẩm đều có câu chuyện riêng
- **Tính xác thực**: Sản phẩm thủ công 100%, không hàng công nghiệp

### Tech Stack
- **Frontend**: React 19.1.1
- **Build Tool**: Vite (rolldown-vite)
- **Routing**: React Router DOM 7.9.4
- **Styling**: Tailwind CSS 4.1.16
- **Icons**: Lucide React
- **State Management**: (Cần bổ sung - đề xuất Context API hoặc Zustand)

---

## 🗺️ KIẾN TRÚC TỔNG QUAN

### Cấu trúc thư mục hiện tại
```
vite-project/
├── src/
│   ├── components/
│   │   ├── common/       # Navbar, Footer, Button, etc.
│   │   ├── home/         # Hero, FeaturedProducts, Categories
│   │   ├── discover/     # Filters, ProductCard, ProductGrid
│   │   ├── product/      # Gallery, Info, Reviews
│   │   ├── artisan/      # ProfileHeader, ProductGallery
│   │   └── cart/         # CartItem, CartSummary
│   ├── layouts/
│   │   └── MainLayout.jsx
│   ├── pages/            # ⚠️ TRỐNG - CẦN TẠO TẤT CẢ
│   ├── data/             # Mock data, constants
│   ├── utils/            # Helper functions
│   └── App.jsx
```

### User Flow
```
Landing Page → Discover Page → Product Detail → Cart → Checkout
      ↓              ↓              ↓
   Stories        Map View      Artisan Profile
```

---

## 📄 PHÂN TÍCH CHI TIẾT TỪNG PAGE

## 1. 🏠 LANDING PAGE (/)

### Mục đích
Trang chủ là điểm chạm đầu tiên, cần:
- Tạo ấn tượng mạnh về brand
- Giới thiệu giá trị cốt lõi
- Dẫn dắt user đến các trang khác
- Hiển thị sản phẩm nổi bật

### Layout & Sections

#### 1.1 Hero Section
**Mục đích**: Thu hút attention, truyền tải message chính

**Nội dung**:
- **Headline**: "Discover Authentic Handcrafted Treasures" (hoặc tương tự)
- **Subheadline**: Giải thích về platform (kết nối nghệ nhân & người mua)
- **Hero Image/Video**: Ảnh nghệ nhân đang làm việc hoặc video showcasing products
- **CTA Buttons**:
  - Primary: "Explore Products" → /discover
  - Secondary: "Meet Artisans" → /map hoặc artisan list

**Thiết kế**:
```jsx
// Structure suggestion
<section className="hero">
  <div className="hero-content">
    <h1>Discover Authentic Handcrafted Treasures</h1>
    <p>Connect directly with skilled artisans...</p>
    <div className="cta-buttons">
      <Button primary>Explore Products</Button>
      <Button secondary>Meet Artisans</Button>
    </div>
  </div>
  <div className="hero-media">
    <img src="hero-image.jpg" />
  </div>
</section>
```

**Components cần tạo**:
- `Hero.jsx` - Main hero component
- `CTAButton.jsx` - Reusable CTA button

---

#### 1.2 Value Propositions
**Mục đích**: Giải thích tại sao user nên chọn CulturaCart

**Nội dung** (4 cards):
1. **Authentic Craftsmanship**
   - Icon: ✓ hoặc badge icon
   - Text: "100% handmade by skilled artisans"

2. **Cultural Heritage**
   - Icon: 🏛️ monument/culture icon
   - Text: "Preserve traditional crafts & techniques"

3. **Direct Connection**
   - Icon: 🤝 handshake icon
   - Text: "Meet the artisans behind each piece"

4. **Unique Stories**
   - Icon: 📖 book icon
   - Text: "Every product has a story to tell"

**Components cần tạo**:
- `ValuePropCard.jsx` - Individual value prop card
- `ValuePropositions.jsx` - Container component

---

#### 1.3 Featured Categories
**Mục đích**: Giúp user nhanh chóng tìm loại sản phẩm quan tâm

**Nội dung**:
- Hiển thị 6-8 categories chính
- Mỗi category có:
  - Icon hoặc thumbnail image
  - Category name
  - Product count (optional)
  - Link to filtered discover page

**Danh sách categories đề xuất**:
- 🏺 Pottery & Ceramics
- 🧶 Textiles & Weaving
- 💎 Jewelry & Accessories
- 🪑 Furniture & Woodwork
- 🎨 Paintings & Art
- 🗿 Sculptures
- 👜 Bags & Leather Goods
- 🕯️ Home Decor

**Components cần tạo**:
- `CategoryCard.jsx`
- `FeaturedCategories.jsx`

**Data structure**:
```javascript
// src/data/categories.js
export const categories = [
  {
    id: 1,
    name: "Pottery & Ceramics",
    slug: "pottery-ceramics",
    icon: "pottery-icon",
    image: "/categories/pottery.jpg",
    productCount: 124
  },
  // ...
];
```

---

#### 1.4 Featured Products
**Mục đích**: Showcase sản phẩm nổi bật để kích thích mua hàng

**Nội dung**:
- 8-12 sản phẩm được chọn lọc
- Layout: Grid 4 columns (desktop), 2 columns (mobile)
- Mỗi product card hiển thị:
  - Product image (với hover effect)
  - Product name
  - Price
  - Artisan name (clickable)
  - Quick add to cart button (hover)
  - "View Details" link

**Components cần tạo**:
- `ProductCard.jsx` (reusable cho nhiều pages)
- `FeaturedProducts.jsx`
- `QuickViewModal.jsx` (optional - popup xem nhanh)

**Data structure**:
```javascript
// src/data/products.js
export const products = [
  {
    id: 1,
    name: "Handwoven Ceramic Vase",
    price: 89.99,
    images: ["/products/vase-1.jpg", "/products/vase-2.jpg"],
    artisan: {
      id: 1,
      name: "Maria Santos",
      location: "Oaxaca, Mexico"
    },
    category: "pottery-ceramics",
    description: "...",
    materials: ["clay", "natural glazes"],
    rating: 4.8,
    reviewCount: 23
  },
  // ...
];
```

---

#### 1.5 Featured Artisans
**Mục đích**: Humanize brand, tạo connection với nghệ nhân

**Nội dung**:
- 3-4 artisan profiles
- Mỗi card hiển thị:
  - Avatar/photo
  - Name
  - Location
  - Craft specialty
  - Short bio (1-2 câu)
  - "View Profile" button

**Components cần tạo**:
- `ArtisanCard.jsx`
- `FeaturedArtisans.jsx`

---

#### 1.6 Testimonials/Social Proof
**Mục đích**: Xây dựng trust qua reviews của customers

**Nội dung**:
- Carousel hoặc grid của testimonials
- Mỗi testimonial có:
  - Customer photo (optional)
  - Name
  - Rating (stars)
  - Review text
  - Product purchased (with link)

**Components cần tạo**:
- `TestimonialCard.jsx`
- `TestimonialsCarousel.jsx`

---

#### 1.7 Story Highlights
**Mục đích**: Link đến Stories page, showcase cultural content

**Nội dung**:
- 3 featured stories/blog posts
- Mỗi card:
  - Hero image
  - Title
  - Excerpt
  - "Read More" link
  - Category tag

**Components cần tạo**:
- `StoryCard.jsx`
- `StoryHighlights.jsx`

---

#### 1.8 Newsletter Signup
**Mục đích**: Capture emails cho marketing

**Nội dung**:
- Headline: "Stay Connected with Artisan Stories"
- Email input field
- Submit button
- Privacy note

**Components cần tạo**:
- `NewsletterForm.jsx`

---

#### 1.9 Stats Section
**Mục đích**: Showcase scale & impact

**Nội dung** (4 stats):
- Số lượng artisans
- Số lượng products
- Countries represented
- Happy customers

**Components cần tạo**:
- `StatItem.jsx`
- `StatsSection.jsx`

---

### Landing Page - Tổng kết Components

**Components cần tạo**:
```
src/components/home/
├── Hero.jsx
├── CTAButton.jsx
├── ValuePropCard.jsx
├── ValuePropositions.jsx
├── CategoryCard.jsx
├── FeaturedCategories.jsx
├── ProductCard.jsx (shared)
├── FeaturedProducts.jsx
├── ArtisanCard.jsx
├── FeaturedArtisans.jsx
├── TestimonialCard.jsx
├── TestimonialsCarousel.jsx
├── StoryCard.jsx
├── StoryHighlights.jsx
├── NewsletterForm.jsx
├── StatItem.jsx
└── StatsSection.jsx
```

**Data files cần tạo**:
```
src/data/
├── categories.js
├── products.js
├── artisans.js
├── testimonials.js
└── stories.js
```

---

## 2. 🔍 DISCOVER PAGE (/discover)

### Mục đích
Trang khám phá là nơi user:
- Browse toàn bộ products
- Filter theo nhiều tiêu chí
- Sort và tìm kiếm
- Xem quick preview

### Layout

#### 2.1 Page Header
**Nội dung**:
- Page title: "Discover Handcrafted Treasures"
- Breadcrumb navigation
- Result count: "Showing 1-24 of 256 products"

---

#### 2.2 Filters Sidebar (Desktop) / Drawer (Mobile)

**Filter categories**:

1. **Search Bar**
   - Free text search
   - Search trong: product name, description, artisan name

2. **Category Filter**
   - Checkboxes cho các categories
   - Show product count per category
   - "Clear all" option

3. **Price Range**
   - Slider với min/max
   - Hoặc input fields
   - Preset ranges: Under $50, $50-$100, $100-$200, $200+

4. **Artisan Location**
   - Dropdown hoặc checkboxes
   - Group by country/region
   - Example: Mexico, Peru, India, Morocco, Vietnam

5. **Materials**
   - Checkboxes
   - Examples: Wood, Ceramic, Textile, Leather, Metal, Glass

6. **Rating**
   - Star rating filter (4+ stars, 3+ stars, etc.)

7. **Availability**
   - In Stock
   - Made to Order
   - Limited Edition

**Components cần tạo**:
```
src/components/discover/
├── FilterSidebar.jsx
├── SearchBar.jsx
├── CategoryFilter.jsx
├── PriceRangeFilter.jsx
├── LocationFilter.jsx
├── MaterialFilter.jsx
├── RatingFilter.jsx
├── AvailabilityFilter.jsx
└── FilterChips.jsx (active filters display)
```

---

#### 2.3 Products Grid Area

**Top Bar**:
- Sort dropdown:
  - Featured
  - Price: Low to High
  - Price: High to Low
  - Newest First
  - Most Popular
  - Best Rating

- View toggle: Grid / List view
- Results per page: 24, 48, 96

**Products Grid**:
- Responsive grid: 4 cols (xl), 3 cols (lg), 2 cols (md), 1 col (sm)
- Product cards với same structure như Landing Page
- Hover effects:
  - Show second image
  - Show "Quick View" button
  - Show "Add to Cart" button

**Pagination**:
- Classic pagination hoặc Infinite scroll
- "Load More" button option

**Empty State**:
- Khi không có results
- Suggestions để adjust filters
- Popular products recommendation

**Components cần tạo**:
```
src/components/discover/
├── SortBar.jsx
├── ViewToggle.jsx
├── ProductGrid.jsx
├── ProductCard.jsx (reuse)
├── Pagination.jsx
├── EmptyState.jsx
└── QuickViewModal.jsx
```

---

#### 2.4 Quick View Modal

**Nội dung**:
- Product images carousel
- Product name & price
- Brief description
- Size/variant selector (nếu có)
- Quantity selector
- "Add to Cart" button
- "View Full Details" link

**Component**:
- `QuickViewModal.jsx`

---

### Discover Page - State Management

**States cần manage**:
```javascript
// Suggested state structure
const [filters, setFilters] = useState({
  search: "",
  categories: [],
  priceRange: [0, 500],
  locations: [],
  materials: [],
  rating: null,
  availability: []
});

const [sortBy, setSortBy] = useState("featured");
const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(24);
```

**Functions cần implement**:
- `applyFilters()` - Apply all filters to products
- `clearFilters()` - Reset all filters
- `sortProducts()` - Sort based on selected option
- `handlePageChange()` - Pagination
- `toggleViewMode()` - Switch grid/list view

---

### Discover Page - API Integration (Future)

**Endpoints sẽ cần**:
```
GET /api/products
  ?category=pottery
  &minPrice=50
  &maxPrice=200
  &location=mexico
  &sort=price_asc
  &page=1
  &limit=24
```

---

## 3. 📦 PRODUCT DETAIL PAGE (/product/:id)

### Mục đích
Trang chi tiết sản phẩm cần:
- Hiển thị đầy đủ thông tin sản phẩm
- Build trust qua reviews và artisan info
- Encourage purchase với clear CTAs
- Show related products để cross-sell

### Layout

#### 3.1 Product Images Gallery (Left Side - 50%)

**Features**:
- Main large image display
- Thumbnail navigation (4-6 images)
- Zoom on hover/click
- Fullscreen gallery modal
- 360° view (optional, advanced)
- Video (nếu có)

**Components**:
```
src/components/product/
├── ProductGallery.jsx
├── ImageThumbnails.jsx
├── ZoomableImage.jsx
└── FullscreenGallery.jsx
```

---

#### 3.2 Product Info (Right Side - 50%)

**Nội dung theo thứ tự**:

1. **Breadcrumb Navigation**
   - Home > Category > Product Name

2. **Product Name**
   - Large, prominent heading

3. **Rating & Reviews**
   - Star rating (e.g., 4.8/5)
   - Review count link (scroll to reviews)
   - "Write a review" link

4. **Price**
   - Large, clear price display
   - Original price (nếu có sale)
   - Discount badge

5. **Short Description**
   - 2-3 câu tóm tắt
   - Highlight unique features

6. **Artisan Info Card**
   - Small card với:
     - Avatar
     - Name (clickable → artisan profile)
     - Location
     - "View Profile" button

7. **Product Options**
   - Size (nếu có): S, M, L
   - Color/Variant (nếu có)
   - Customization options

8. **Quantity Selector**
   - +/- buttons
   - Input field
   - Stock availability indicator

9. **Action Buttons**
   - **Primary**: "Add to Cart" (large, prominent)
   - **Secondary**: "Add to Wishlist" (icon button)
   - **Social Share**: Share icons

10. **Product Details Accordion**
    - **Description Tab**
      - Full product description
      - Story behind the product
      - Cultural significance

    - **Materials & Care Tab**
      - Materials used
      - Care instructions
      - Sustainability info

    - **Shipping & Returns Tab**
      - Estimated delivery time
      - Shipping cost info
      - Return policy

    - **Artisan Story Tab**
      - About the artisan
      - Their craft journey
      - Other products

**Components**:
```
src/components/product/
├── ProductInfo.jsx
├── ProductRating.jsx
├── PriceDisplay.jsx
├── ArtisanInfoCard.jsx
├── ProductOptions.jsx
├── QuantitySelector.jsx
├── AddToCartButton.jsx
├── WishlistButton.jsx
├── ShareButtons.jsx
└── ProductDetailsAccordion.jsx
```

---

#### 3.3 Key Features Section

**Nội dung**:
- 4-6 key features/benefits
- Icon + title + description
- Example features:
  - ✓ Handmade with Love
  - ✓ Eco-Friendly Materials
  - ✓ Fair Trade Certified
  - ✓ Unique One-of-a-Kind
  - ✓ Ships Worldwide
  - ✓ Gift Ready Packaging

**Component**:
- `KeyFeatures.jsx`

---

#### 3.4 Customer Reviews Section

**Nội dung**:

1. **Reviews Summary**
   - Overall rating (large)
   - Rating distribution bar chart (5★, 4★, 3★, 2★, 1★)
   - Total reviews count
   - "Write a Review" button

2. **Sort/Filter Reviews**
   - Sort: Most Recent, Highest Rating, Lowest Rating, Most Helpful
   - Filter: With Photos, Verified Purchase

3. **Individual Reviews**
   - Reviewer name & avatar
   - Rating stars
   - Date
   - Verified purchase badge
   - Review text
   - Photos (nếu có)
   - Helpful counter ("23 found this helpful")
   - "Report" link

4. **Pagination**
   - Show 5-10 reviews per page

**Components**:
```
src/components/product/
├── ReviewsSummary.jsx
├── RatingDistribution.jsx
├── ReviewFilters.jsx
├── ReviewCard.jsx
├── ReviewForm.jsx (for writing reviews)
└── HelpfulButton.jsx
```

---

#### 3.5 Related Products

**Mục đích**: Cross-selling, keep users browsing

**Nội dung**:
- Section title: "You May Also Like" hoặc "Similar Handcrafted Items"
- 4-8 related products
- Horizontal scrollable carousel
- Same product card format

**Logic cho related products**:
- Same category
- Same artisan
- Similar price range
- Similar materials

**Component**:
- `RelatedProducts.jsx`

---

#### 3.6 Recently Viewed Products

**Mục đích**: Help users return to products they viewed

**Nội dung**:
- Track products viewed in session/localStorage
- Display 4-6 products
- Carousel format

**Component**:
- `RecentlyViewed.jsx`

---

### Product Detail Page - State Management

```javascript
// Suggested state structure
const [product, setProduct] = useState(null);
const [selectedVariant, setSelectedVariant] = useState(null);
const [selectedSize, setSelectedSize] = useState(null);
const [quantity, setQuantity] = useState(1);
const [reviews, setReviews] = useState([]);
const [relatedProducts, setRelatedProducts] = useState([]);
```

---

## 4. 👤 ARTISAN PROFILE PAGE (/artisan/:id)

### Mục đích
- Showcase nghệ nhân và craftsmanship của họ
- Build personal connection & trust
- Display toàn bộ products của artisan
- Share their story & background

### Layout

#### 4.1 Profile Header Section

**Nội dung**:

1. **Cover Photo**
   - Large banner image (workshop, craft process, etc.)
   - Overlay gradient for text readability

2. **Profile Info Card** (overlapping cover)
   - Large avatar/photo
   - Artisan name
   - Craft specialty
   - Location (with map pin icon)
   - Member since (date)
   - Verified badge (nếu có)

3. **Action Buttons**
   - "Follow" button
   - "Message" button
   - "Share Profile" button

4. **Key Stats Row**
   - Number of products
   - Average rating
   - Total reviews
   - Years of experience

**Components**:
```
src/components/artisan/
├── ProfileHeader.jsx
├── CoverPhoto.jsx
├── ArtisanAvatar.jsx
├── ArtisanStats.jsx
└── FollowButton.jsx
```

---

#### 4.2 About Section

**Nội dung**:

1. **Bio/Introduction**
   - 2-3 paragraphs about the artisan
   - Their background
   - How they learned their craft
   - Philosophy/approach

2. **Craft Specialties**
   - List of techniques they master
   - Tags or badges

3. **Awards & Certifications**
   - Fair Trade certification
   - Awards received
   - Featured in media

**Components**:
- `ArtisanBio.jsx`
- `Specialties.jsx`
- `Awards.jsx`

---

#### 4.3 Story Section (Timeline/Journey)

**Mục đích**: Emotional storytelling

**Nội dung**:
- Visual timeline của craft journey
- Key milestones
- Photos from different years
- Quotes from artisan

**Format options**:
- Vertical timeline với photos
- Photo gallery với captions
- Video interview (nếu có)

**Components**:
- `ArtisanStory.jsx`
- `Timeline.jsx`
- `StoryMilestone.jsx`

---

#### 4.4 Products Section

**Nội dung**:

1. **Filter/Sort Bar**
   - Sort: Newest, Price, Popular
   - Filter by category
   - View toggle (grid/list)

2. **Products Grid**
   - All products from this artisan
   - Same product card format
   - Pagination or infinite scroll

3. **Product Count**
   - "Showing 12 of 48 products"

**Components**:
- `ArtisanProducts.jsx`
- Reuse `ProductGrid.jsx` và `ProductCard.jsx`

---

#### 4.5 Reviews Section

**Nội dung**:
- Reviews about the artisan (not specific products)
- Overall rating
- Review cards
- "Leave a Review" button

**Components**:
- `ArtisanReviews.jsx`
- Reuse review components

---

#### 4.6 Featured In / Press

**Nội dung**:
- Media mentions
- Blog features
- Press logos
- Links to articles

**Component**:
- `PressFeatures.jsx`

---

#### 4.7 Contact / Workshop Info

**Nội dung**:
- Workshop address (nếu có physical location)
- Map embed
- Contact options
- Workshop visit info (nếu available)

**Component**:
- `ContactInfo.jsx`
- `WorkshopMap.jsx`

---

## 5. 🛒 CART PAGE (/cart)

### Mục đích
- Display toàn bộ items trong cart
- Allow quantity adjustments
- Show pricing breakdown
- Smooth path to checkout

### Layout

#### 5.1 Page Header
- Title: "Your Shopping Cart"
- Item count: "(3 items)"
- "Continue Shopping" link

---

#### 5.2 Cart Items Section (Left - 65%)

**Nội dung**:

Mỗi cart item hiển thị:
- Product thumbnail (clickable)
- Product name (clickable)
- Artisan name (clickable)
- Selected variant/size
- Price per unit
- Quantity selector
  - +/- buttons
  - Update on change
- Subtotal (price × quantity)
- Remove button (X icon)
- "Save for Later" link (optional)

**Additional features**:
- Select all checkbox
- Remove selected items
- Move selected to wishlist

**Components**:
```
src/components/cart/
├── CartItemsList.jsx
├── CartItem.jsx
├── QuantityControls.jsx
└── RemoveButton.jsx
```

---

#### 5.3 Order Summary (Right - 35% Sticky)

**Nội dung**:

1. **Summary Header**
   - "Order Summary"

2. **Price Breakdown**
   - Subtotal: $XXX.XX
   - Shipping: $XX.XX (or "Calculated at checkout")
   - Tax: $XX.XX
   - Discount: -$XX.XX (nếu có)
   - **Total: $XXX.XX** (large, bold)

3. **Promo Code**
   - Input field: "Enter promo code"
   - Apply button
   - Success/error message

4. **Checkout Button**
   - Large, prominent
   - "Proceed to Checkout"
   - Disabled nếu cart empty

5. **Security Badges**
   - SSL secure
   - Payment methods accepted
   - Money-back guarantee

6. **Additional Info**
   - Free shipping on orders over $X
   - Estimated delivery

**Components**:
```
src/components/cart/
├── OrderSummary.jsx
├── PromoCode.jsx
├── PricingBreakdown.jsx
└── CheckoutButton.jsx
```

---

#### 5.4 Recommendations Section

**Mục đích**: Upselling

**Nội dung**:
- "Complete Your Collection"
- "Frequently Bought Together"
- 4-6 product cards
- Horizontal scroll

**Component**:
- `CartRecommendations.jsx`

---

#### 5.5 Empty Cart State

**Nội dung khi cart empty**:
- Illustration/icon
- Message: "Your cart is empty"
- "Start Shopping" button
- Popular/trending products

**Component**:
- `EmptyCart.jsx`

---

### Cart - State Management

```javascript
// Suggested state
const [cartItems, setCartItems] = useState([]);
const [promoCode, setPromoCode] = useState("");
const [discount, setDiscount] = useState(0);

// Functions
const updateQuantity = (itemId, newQuantity) => {};
const removeItem = (itemId) => {};
const applyPromoCode = (code) => {};
const calculateSubtotal = () => {};
const calculateTotal = () => {};
```

---

## 6. 🗺️ MAP PAGE (/map)

### Mục đích
- Visualize vị trí nghệ nhân trên bản đồ
- Discover artisans by location
- Interactive, engaging experience
- Filter by region/craft type

### Layout

#### 6.1 Page Header
- Title: "Artisan Map"
- Subtitle: "Discover talented artisans around the world"

---

#### 6.2 Map Interface (Main Area)

**Map Features**:

1. **Interactive Map**
   - Sử dụng library: Leaflet.js hoặc Mapbox GL
   - Clustered markers cho areas có nhiều artisans
   - Different marker colors cho different craft types

2. **Marker Info**
   - On click: Show info card
   - Artisan photo
   - Name
   - Craft type
   - Number of products
   - "View Profile" button

3. **Map Controls**
   - Zoom in/out
   - Reset view
   - Toggle fullscreen
   - Search location

**Libraries để consider**:
- `react-leaflet` (free, open-source)
- `react-map-gl` (Mapbox-based)

**Components**:
```
src/components/map/
├── ArtisanMap.jsx
├── MapControls.jsx
├── ArtisanMarker.jsx
├── MarkerCluster.jsx
└── ArtisanPopup.jsx
```

---

#### 6.3 Filters Sidebar/Panel

**Nội dung**:

1. **Search by Location**
   - Input field
   - Autocomplete suggestions

2. **Filter by Craft Type**
   - Checkboxes
   - Pottery, Textiles, Jewelry, etc.
   - Update markers on map

3. **Filter by Region**
   - Dropdown
   - Continents → Countries

4. **Active Filters Display**
   - Chips showing active filters
   - Clear individual or all

**Components**:
```
src/components/map/
├── MapFilters.jsx
├── LocationSearch.jsx
└── CraftTypeFilter.jsx
```

---

#### 6.4 Artisan List View (Toggle Option)

**Nội dung**:
- Toggle between Map View & List View
- List view shows all artisans as cards
- Clicking card highlights on map (nếu split view)

**Component**:
- `ArtisanListView.jsx`

---

#### 6.5 Map Legend

**Nội dung**:
- Explain marker colors/icons
- Example:
  - 🔵 Pottery
  - 🟢 Textiles
  - 🟡 Jewelry
  - 🔴 Woodwork

**Component**:
- `MapLegend.jsx`

---

### Map Page - Data Structure

```javascript
// src/data/artisanLocations.js
export const artisanLocations = [
  {
    id: 1,
    name: "Maria Santos",
    craftType: "pottery",
    coordinates: [19.4326, -99.1332], // [lat, lng]
    location: "Oaxaca, Mexico",
    productCount: 24,
    rating: 4.8,
    avatar: "/artisans/maria.jpg"
  },
  // ...
];
```

---

## 7. 📖 STORIES PAGE (/stories)

### Mục đích
- Content marketing: share cultural stories
- Build brand narrative
- SEO benefits
- Engage users emotionally
- Educate about crafts & cultures

### Layout

#### 7.1 Page Header
- Title: "Stories & Culture"
- Subtitle: "Discover the rich heritage behind each craft"

---

#### 7.2 Featured Story (Hero)

**Nội dung**:
- Large hero image
- Category tag
- Story title
- Excerpt
- Author & date
- "Read Full Story" CTA

**Component**:
- `FeaturedStory.jsx`

---

#### 7.3 Story Categories Filter

**Categories**:
- All Stories
- Artisan Spotlights
- Craft Techniques
- Cultural Heritage
- Behind the Scenes
- Sustainability
- Community Impact

**Component**:
- `StoryCategoryFilter.jsx`

---

#### 7.4 Stories Grid

**Nội dung**:

Mỗi story card:
- Thumbnail image
- Category badge
- Title
- Excerpt (2-3 lines)
- Author name
- Date published
- Read time (e.g., "5 min read")
- "Read More" link

**Layout**:
- Grid: 3 columns (desktop), 2 (tablet), 1 (mobile)
- Pagination or infinite scroll

**Components**:
```
src/components/stories/
├── StoryGrid.jsx
├── StoryCard.jsx
└── StoryPagination.jsx
```

---

#### 7.5 Story Detail View (Modal or Separate Route)

**Option 1**: Separate route `/stories/:slug`

**Option 2**: Modal overlay (Medium.com style)

**Nội dung**:

1. **Story Header**
   - Featured image
   - Category
   - Title
   - Author info (avatar, name, bio)
   - Date published
   - Read time
   - Share buttons

2. **Story Content**
   - Rich text content
   - Inline images
   - Pull quotes
   - Embedded videos (optional)

3. **Story Footer**
   - Tags
   - Share buttons
   - Author bio
   - Related stories

4. **Comments Section** (optional)
   - User comments
   - Comment form

**Components**:
```
src/components/stories/
├── StoryDetail.jsx
├── StoryHeader.jsx
├── StoryContent.jsx
├── AuthorBio.jsx
├── ShareButtons.jsx
└── RelatedStories.jsx
```

---

#### 7.6 Newsletter Signup

**Nội dung**:
- "Get Stories Delivered to Your Inbox"
- Email input
- Subscribe button

**Component**:
- Reuse `NewsletterForm.jsx`

---

### Stories - Data Structure

```javascript
// src/data/stories.js
export const stories = [
  {
    id: 1,
    slug: "art-of-mexican-pottery",
    title: "The Ancient Art of Mexican Pottery",
    excerpt: "Discover how María preserves 500-year-old techniques...",
    content: "Full article content here...",
    featuredImage: "/stories/pottery-story.jpg",
    category: "craft-techniques",
    author: {
      name: "Elena Rodriguez",
      avatar: "/authors/elena.jpg",
      bio: "Cultural anthropologist and writer"
    },
    publishedDate: "2025-01-15",
    readTime: 7,
    tags: ["pottery", "mexico", "tradition"]
  },
  // ...
];
```

---

## 🎨 DESIGN SYSTEM & COMPONENTS CHUNG

### Colors (Tailwind Config)

```javascript
// tailwind.config.js suggestion
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef7ee',
          100: '#fdecd3',
          200: '#fad6a5',
          300: '#f7b96d',
          400: '#f39333',
          500: '#ef750c',  // Main brand color
          600: '#e05907',
          700: '#b94309',
          800: '#93350e',
          900: '#772d0f',
        },
        secondary: {
          // Teal/turquoise for accent
          500: '#14b8a6',
        },
        neutral: {
          // Warm grays
        }
      }
    }
  }
}
```

---

### Typography

```css
/* Suggested font pairing */
--font-heading: 'Playfair Display', serif;  /* Elegant, cultural feel */
--font-body: 'Inter', sans-serif;           /* Clean, readable */
```

---

### Common Components (Reusable)

```
src/components/common/
├── Navbar.jsx ✅ (đã có)
├── Footer.jsx ✅ (đã có)
├── Button.jsx
├── Input.jsx
├── Select.jsx
├── Checkbox.jsx
├── Radio.jsx
├── Modal.jsx
├── Dropdown.jsx
├── Tooltip.jsx
├── Badge.jsx
├── Tag.jsx
├── Breadcrumb.jsx
├── Pagination.jsx
├── Tabs.jsx
├── Accordion.jsx
├── Card.jsx
├── Avatar.jsx
├── Spinner.jsx
├── Alert.jsx
├── Toast.jsx
├── SearchBar.jsx
├── RatingStars.jsx
└── Skeleton.jsx (loading states)
```

---

## 🔄 STATE MANAGEMENT STRATEGY

### Recommended Approach

**Option 1: Context API** (Đủ cho MVP)
```
src/context/
├── CartContext.jsx
├── WishlistContext.jsx
├── UserContext.jsx
└── FiltersContext.jsx
```

**Option 2: Zustand** (Nếu scale lớn hơn)
```
src/store/
├── cartStore.js
├── wishlistStore.js
├── userStore.js
└── filtersStore.js
```

---

### Cart State (Ví dụ với Context)

```javascript
// src/context/CartContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    // Load from localStorage
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    // Save to localStorage whenever cart changes
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
```

---

## 📊 DATA STRUCTURE & MOCK DATA

### Products Data

```javascript
// src/data/products.js
export const products = [
  {
    id: 1,
    name: "Handwoven Ceramic Vase",
    slug: "handwoven-ceramic-vase",
    description: "Beautiful handcrafted ceramic vase with traditional patterns...",
    price: 89.99,
    originalPrice: 109.99, // optional, for sales
    currency: "USD",
    images: [
      "/products/vase-1.jpg",
      "/products/vase-2.jpg",
      "/products/vase-3.jpg"
    ],
    thumbnail: "/products/vase-thumb.jpg",
    category: {
      id: 1,
      name: "Pottery & Ceramics",
      slug: "pottery-ceramics"
    },
    artisan: {
      id: 1,
      name: "Maria Santos",
      slug: "maria-santos",
      avatar: "/artisans/maria.jpg",
      location: "Oaxaca, Mexico"
    },
    materials: ["Clay", "Natural Glazes"],
    dimensions: {
      height: 12,
      width: 8,
      depth: 8,
      unit: "inches"
    },
    weight: {
      value: 2.5,
      unit: "lbs"
    },
    colors: ["Terracotta", "Blue", "White"],
    inStock: true,
    stockQuantity: 5,
    madeToOrder: false,
    estimatedDelivery: "3-5 business days",
    rating: 4.8,
    reviewCount: 23,
    featured: true,
    tags: ["handmade", "ceramic", "traditional", "home-decor"],
    story: "This vase is crafted using techniques passed down through generations...",
    careInstructions: "Hand wash only. Avoid harsh chemicals.",
    shippingInfo: "Ships worldwide. Free shipping on orders over $100.",
    returnPolicy: "30-day return policy",
    createdAt: "2025-01-10T10:00:00Z",
    updatedAt: "2025-01-15T14:30:00Z"
  },
  // ... more products
];
```

---

### Artisans Data

```javascript
// src/data/artisans.js
export const artisans = [
  {
    id: 1,
    name: "Maria Santos",
    slug: "maria-santos",
    avatar: "/artisans/maria-avatar.jpg",
    coverPhoto: "/artisans/maria-cover.jpg",
    bio: "Maria has been practicing the traditional art of pottery for over 30 years...",
    location: {
      city: "Oaxaca",
      country: "Mexico",
      coordinates: [17.0732, -96.7266]
    },
    craftSpecialty: "Pottery & Ceramics",
    specialties: ["Traditional Pottery", "Glazing Techniques", "Decorative Art"],
    yearsOfExperience: 30,
    memberSince: "2020-03-15",
    verified: true,
    rating: 4.9,
    reviewCount: 156,
    productCount: 24,
    story: "Maria learned pottery from her grandmother at age 12...",
    awards: [
      "National Craft Award 2018",
      "Fair Trade Certified"
    ],
    pressFeatures: [
      {
        publication: "Craft Magazine",
        title: "Master Potter of Oaxaca",
        url: "https://example.com/article"
      }
    ],
    socialMedia: {
      instagram: "@maria_pottery",
      facebook: "mariasantospottery"
    },
    contactEmail: "maria@example.com",
    workshopVisits: true,
    workshopAddress: "123 Craft Street, Oaxaca"
  },
  // ... more artisans
];
```

---

### Categories Data

```javascript
// src/data/categories.js
export const categories = [
  {
    id: 1,
    name: "Pottery & Ceramics",
    slug: "pottery-ceramics",
    description: "Handcrafted pottery, ceramic vases, bowls, and decorative pieces",
    icon: "pottery", // lucide icon name
    image: "/categories/pottery.jpg",
    productCount: 124,
    color: "#e97451" // for UI accents
  },
  {
    id: 2,
    name: "Textiles & Weaving",
    slug: "textiles-weaving",
    description: "Traditional woven textiles, blankets, rugs, and fabric art",
    icon: "wind",
    image: "/categories/textiles.jpg",
    productCount: 98,
    color: "#3b82f6"
  },
  // ... more categories
];
```

---

## 🚀 IMPLEMENTATION ROADMAP

### Phase 1: Foundation (Week 1-2)
**Ưu tiên**: Core structure & navigation

✅ Tasks:
1. Setup data files (products, artisans, categories)
2. Create common components (Button, Card, Modal, etc.)
3. Implement CartContext
4. Build Navigation & Footer (✅ partial done)

---

### Phase 2: Core Pages (Week 3-4)
**Ưu tiên**: Main user flows

✅ Tasks:
1. **Landing Page**
   - Hero, FeaturedProducts, Categories
   - Basic layout only, refine later

2. **Discover Page**
   - Product grid
   - Basic filters (category, price)
   - Sort functionality

3. **Product Detail Page**
   - Product info & gallery
   - Add to cart functionality
   - Basic reviews display

---

### Phase 3: User Features (Week 5-6)

✅ Tasks:
1. **Cart Page**
   - Full cart functionality
   - Quantity adjustments
   - Order summary

2. **Artisan Profile Page**
   - Profile header
   - Products grid
   - Basic bio

---

### Phase 4: Enhanced Features (Week 7-8)

✅ Tasks:
1. **Map Page**
   - Integrate map library
   - Artisan markers
   - Basic filters

2. **Stories Page**
   - Story grid
   - Story detail view
   - Category filters

3. **Search Functionality**
   - Global search
   - Search results page

---

### Phase 5: Polish & Optimization (Week 9-10)

✅ Tasks:
1. Reviews system
2. Wishlist functionality
3. Animations & transitions
4. Loading states & skeletons
5. Error handling
6. Responsive refinements
7. Performance optimization
8. SEO meta tags

---

### Phase 6: Advanced Features (Future)

Ideas for expansion:
- User authentication & profiles
- Order history
- Wishlists that persist
- Advanced filters
- Real-time inventory
- Payment integration
- Multi-language support
- Dark mode
- Artisan dashboard
- Analytics

---

## 🎯 SUCCESS METRICS

### Key Performance Indicators

**User Engagement**:
- Average session duration
- Pages per session
- Bounce rate
- Return visitor rate

**E-commerce**:
- Conversion rate
- Average order value
- Cart abandonment rate
- Product views to purchases

**Content**:
- Story read rate
- Story shares
- Time on stories page
- Newsletter signups

**Technical**:
- Page load time (< 3s)
- Lighthouse score (> 90)
- Mobile usability
- Accessibility score

---

## 🛠️ TECHNICAL CONSIDERATIONS

### Performance Optimization

1. **Image Optimization**
   - Use WebP format
   - Lazy loading
   - Responsive images (srcset)
   - CDN delivery

2. **Code Splitting**
   - Route-based splitting
   - Lazy load components
   - Dynamic imports

3. **Caching Strategy**
   - Service worker
   - Browser caching
   - API caching

---

### SEO Strategy

1. **Meta Tags**
   - Dynamic titles & descriptions per page
   - Open Graph tags
   - Twitter cards

2. **Structured Data**
   - Product schema
   - Review schema
   - Breadcrumb schema
   - Organization schema

3. **URLs**
   - Clean, descriptive URLs
   - Proper slugs
   - Canonical tags

---

### Accessibility (A11y)

✅ Requirements:
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation
- Focus indicators
- Alt text for images
- Color contrast (WCAG AA)
- Screen reader testing

---

### Testing Strategy

**Unit Tests**:
- Component logic
- Helper functions
- Cart calculations

**Integration Tests**:
- User flows
- Form submissions
- Cart operations

**E2E Tests**:
- Critical user journeys
- Purchase flow
- Navigation

**Tools**:
- Vitest (unit tests)
- Testing Library (component tests)
- Cypress/Playwright (E2E)

---

## 📦 DEPENDENCIES TO ADD

### Recommendations

```json
{
  "dependencies": {
    // Already have these ✅
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-router-dom": "^7.9.4",
    "lucide-react": "^0.548.0",

    // Recommended additions
    "zustand": "^5.0.0",           // State management (optional, or use Context)
    "react-leaflet": "^4.2.1",     // For map page
    "leaflet": "^1.9.4",
    "swiper": "^11.0.5",           // For carousels
    "react-hook-form": "^7.49.2",  // Form handling
    "zod": "^3.22.4",              // Form validation
    "clsx": "^2.1.0",              // Classname utilities
    "date-fns": "^3.0.6",          // Date formatting
    "react-hot-toast": "^2.4.1"    // Toast notifications
  },
  "devDependencies": {
    "vitest": "^1.2.0",            // Testing
    "@testing-library/react": "^14.1.2",
    "@testing-library/jest-dom": "^6.1.5"
  }
}
```

---

## 🎨 UI/UX BEST PRACTICES

### Visual Hierarchy
- Clear CTAs with high contrast
- F-pattern layout for content
- Whitespace for breathing room
- Consistent spacing scale

### Mobile-First Approach
- Touch-friendly targets (min 44px)
- Simplified navigation
- Sticky headers
- Bottom navigation option

### Microinteractions
- Button hover states
- Loading animations
- Success confirmations
- Error shake animations
- Smooth transitions

### Trust Signals
- Reviews & ratings prominent
- Security badges
- Return policy visible
- Artisan verification badges
- SSL indicators

---

## 📝 CONTENT STRATEGY

### Product Descriptions
- Focus on craftsmanship
- Tell the story
- Highlight uniqueness
- Include care instructions
- Mention cultural significance

### Photography Guidelines
- High-quality images
- Multiple angles
- Lifestyle shots
- Process/making-of photos
- Consistent style

### Storytelling
- Humanize artisans
- Cultural context
- Behind-the-scenes
- Impact stories
- Video content when possible

---

## 🔐 SECURITY CONSIDERATIONS

### Client-Side Security
- Input sanitization
- XSS prevention
- HTTPS only
- Secure localStorage usage
- Content Security Policy

### Future Backend Considerations
- Authentication (JWT)
- Rate limiting
- SQL injection prevention
- Data encryption
- Payment security (PCI DSS)

---

## 🌍 INTERNATIONALIZATION (Future)

### i18n Strategy
- Multi-language support
- Currency conversion
- Date/time formats
- RTL support
- Regional shipping

---

## 📊 ANALYTICS & TRACKING

### Recommended Tools
- Google Analytics 4
- Hotjar (heatmaps)
- Facebook Pixel
- Custom events:
  - Product views
  - Add to cart
  - Checkout started
  - Purchase completed
  - Story reads

---

## 🎓 LEARNING RESOURCES

### For Team Members

**React Advanced Patterns**:
- Compound components
- Render props
- Custom hooks

**Performance**:
- React.memo
- useMemo, useCallback
- Code splitting
- Image optimization

**Testing**:
- Testing Library best practices
- E2E test strategies

---

## ✅ DEFINITION OF DONE

### Per Component
- ✅ Functional implementation
- ✅ Responsive (mobile, tablet, desktop)
- ✅ Accessible (keyboard, screen reader)
- ✅ Loading states
- ✅ Error states
- ✅ Empty states
- ✅ PropTypes or TypeScript types
- ✅ Storybook entry (optional)

### Per Page
- ✅ All sections implemented
- ✅ Data integration
- ✅ Navigation works
- ✅ SEO meta tags
- ✅ Performance optimized
- ✅ Cross-browser tested

---

## 🚨 POTENTIAL CHALLENGES & SOLUTIONS

### Challenge 1: Image Loading Performance
**Solution**:
- Progressive image loading
- Blurhash placeholders
- CDN usage
- Lazy loading

### Challenge 2: Cart State Persistence
**Solution**:
- LocalStorage with sync
- Context + localStorage
- Consider Redux Persist

### Challenge 3: Search Functionality
**Solution**:
- Client-side search (small catalog)
- Debounced search
- Fuzzy matching library
- Future: Backend search API

### Challenge 4: Map Performance
**Solution**:
- Marker clustering
- Lazy load map
- Optimize marker icons
- Cache coordinates

---

## 🎯 NEXT IMMEDIATE STEPS

### Ready to Start Coding

1. ✅ **Create mock data files**
   - `src/data/products.js`
   - `src/data/artisans.js`
   - `src/data/categories.js`

2. ✅ **Build common components**
   - Button, Card, Modal components
   - Layout components

3. ✅ **Implement CartContext**
   - Full cart functionality
   - localStorage persistence

4. ✅ **Create page files**
   - Start with LandingPage
   - Basic structure for all pages

---

## 📞 QUESTIONS TO CLARIFY

### Business Logic
1. Real-time inventory tracking needed?
2. Multiple variants per product (size, color)?
3. International shipping?
4. Return/refund process?
5. Artisan onboarding process?

### Technical
1. Backend API ready? Timeline?
2. Payment gateway preference?
3. Hosting platform?
4. Analytics requirements?
5. Third-party integrations?

---

## 🎉 CONCLUSION

This document provides a comprehensive blueprint for building CulturaCart. The platform will:

✨ **Connect artisans with customers** through a beautiful, intuitive interface

✨ **Tell compelling stories** about craftsmanship and culture

✨ **Provide seamless shopping experience** from discovery to purchase

✨ **Build trust** through transparency and artisan profiles

✨ **Scale gracefully** with modular architecture and best practices

---

### Document Version
- **Version**: 1.0
- **Last Updated**: 2025-10-25
- **Author**: Claude (AI Assistant)
- **Status**: Ready for Implementation

---

**Happy Coding! 🚀**
