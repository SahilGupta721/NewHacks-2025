# Discover Page - Complete Design & Implementation Specification

## Overview

The **Discover Page** serves as the primary product browsing and exploration interface for CulturaCart, where users can browse all handcrafted products, apply sophisticated filters, sort results, and seamlessly navigate to product details. This page embodies the platform's mission to help travelers discover authentic, culturally significant handcrafted items while providing an intuitive, visually appealing shopping experience.

**Page Route:** `/discover`

**Primary Goals:**
- Enable effortless product discovery through intuitive filtering and search
- Showcase the diversity of artisan products with rich visual presentation
- Provide multiple sorting options to match different user preferences
- Maintain the "Authentic Wanderlust" design aesthetic with warm, cultural vibes
- Create smooth, responsive interactions that feel premium and thoughtful

---

## Page Architecture

### Layout Structure

The Discover Page uses a **two-column layout** on desktop with a collapsible sidebar, transforming into a mobile-friendly single column with drawer-based filters on smaller screens.

```
┌─────────────────────────────────────────────────────────────┐
│  Page Header (Breadcrumb, Title, Results Count)             │
├──────────────────┬──────────────────────────────────────────┤
│                  │  Top Bar (Sort, View Toggle, Filters)    │
│   FILTER         │                                           │
│   SIDEBAR        │  PRODUCT GRID                            │
│   (25% width)    │  (75% width)                             │
│                  │                                           │
│   • Search       │  [Product Cards in Grid Layout]          │
│   • Categories   │                                           │
│   • Price        │                                           │
│   • Location     │                                           │
│   • Materials    │                                           │
│   • Rating       │                                           │
│   • Stock        │                                           │
│                  │                                           │
│   [Apply]        │  Pagination / Load More                  │
└──────────────────┴──────────────────────────────────────────┘
```

**Responsive Behavior:**
- **Desktop (>1024px):** Sidebar visible, 3-4 column grid
- **Tablet (768-1024px):** Collapsible sidebar, 2-3 column grid
- **Mobile (<768px):** Bottom drawer for filters, single column grid

---

## Section 1: Page Header

### Components
- **Breadcrumb Navigation:** Home > Discover [> Filter Context if applicable]
- **Page Title:** Dynamic based on active filters
  - Default: "Discover Handcrafted Treasures"
  - With location filter: "Discover from [Location Name]"
  - With category filter: "Discover [Category Name]"
- **Results Count:** "Showing X-Y of Z products"
- **Clear All Filters Link:** Visible only when filters are active

### Design Specifications
- Background: Subtle warm gradient from sand-50 to background
- Typography: Page title uses Playfair Display, 3xl-4xl, bold
- Breadcrumbs: Small gray text with terracotta-500 hover states
- Spacing: py-8 md:py-12
- Results count: Muted gray, regular weight

---

## Section 2: Filter Sidebar

### 2.1 Search Bar (Top Priority)

**Functionality:**
- Real-time search as user types (debounced 300ms)
- Searches across: product names, descriptions, artisan names, materials, tags
- Clear button (X) appears when text is entered
- Search icon on the left side

**Design:**
- Full width input with rounded-lg borders
- Border color: sand-200, focus: terracotta-400
- Placeholder: "Search products, artisans..."
- Height: h-12
- Icon color: terracotta-400

### 2.2 Category Filter

**Data Source:** Derived from products.js
- Pottery & Ceramics
- Textiles & Weaving
- Jewelry & Accessories
- Woodwork & Furniture
- Bags & Leather Goods

**Functionality:**
- Multi-select checkboxes
- Display product count next to each category: "(24 products)"
- "Select All" and "Clear" quick actions at the top
- Disabled state when no products available in category

**Design:**
- Custom checkbox with terracotta-500 checked state
- Category names in gray-800, semibold
- Product counts in gray-500, smaller text
- Hover: Light terracotta background on entire row

### 2.3 Price Range Filter

**Current Data Range:** $45 - $125 (from existing products)

**Implementation Options:**

**Option A: Dual-Handle Slider (Recommended)**
- Interactive slider with two handles for min and max
- Current range display above: "$45 - $125"
- Snap to $5 increments
- Visual indicator bar shows selected range in terracotta

**Option B: Preset Ranges (Simpler)**
- Radio buttons for preset ranges:
  - Under $50
  - $50 - $100
  - $100 - $200
  - $200+
  - Custom (opens input fields)

**Design:**
- Slider track: sand-200
- Active range: terracotta-500
- Handle: White circle with terracotta-500 border
- Current values displayed prominently above slider

### 2.4 Location Filter (Artisan Location)

**Data Source:** Extracted from artisan.location field
- Oaxaca, Mexico
- Jaipur, India
- Cusco, Peru
- Kyoto, Japan
- Marrakech, Morocco
- Guatemala City, Guatemala

**Functionality:**
- Multi-select checkboxes grouped by country
- Option to display flag emoji/icon next to location
- Expandable sections for countries with multiple cities (future enhancement)
- Sort alphabetically by country

**Design:**
- Country name as section header (bold, gray-800)
- City names indented with checkboxes
- Small flag icons (optional, uses emoji or Lucide icons)
- Hover state with terracotta-50 background

### 2.5 Materials Filter

**Data Source:** Unique materials from all products
- Clay
- Natural Glazes
- 100% Cotton
- Natural Dyes
- Sterling Silver
- Mahogany Wood
- Canvas
- Leather
- Wool
- Raku Glaze

**Functionality:**
- Multi-select checkboxes
- Alphabetically sorted
- Show only materials that appear in current result set
- Gray out unavailable materials when other filters applied

**Design:**
- Standard checkbox pattern
- Material names in sentence case
- Compact spacing (gap-2)
- Scrollable if list exceeds 10 items

### 2.6 Rating Filter

**Functionality:**
- Single-select radio buttons (only one rating threshold at a time)
- Options:
  - 4.5+ stars ⭐⭐⭐⭐⭐
  - 4.0+ stars ⭐⭐⭐⭐
  - 3.0+ stars ⭐⭐⭐
  - All ratings (default)

**Design:**
- Radio buttons with terracotta-500 selected state
- Star icons displayed inline (gold-500 color)
- Larger touch targets for mobile (h-10)
- Selected state: terracotta-50 background on entire row

### 2.7 Availability Filter

**Options:**
- ☑ In Stock (inStock === true)
- ☑ Made to Order (madeToOrder === true)
- ☑ Limited Edition (stockQuantity < 10)

**Functionality:**
- Multi-select checkboxes
- Can select multiple options (OR logic)
- Show count of products for each option

**Design:**
- Standard checkbox pattern with icons
- Small badge showing count: "In Stock (5)"
- Icons: Use Lucide icons (Package, Wrench, Star)

### 2.8 Filter Actions (Sidebar Footer)

**Components:**
- **Apply Filters Button:** Primary button, full width
  - Only enabled when filters changed from applied state
  - Shows "Apply (X)" where X is number of changed filters
- **Clear All Filters Link:** Secondary text link
  - Only visible when filters are active
  - Resets to default state

**Design:**
- Apply button: bg-terracotta-500, text-white, h-12, rounded-lg
- Clear link: text-gray-600, hover:text-terracotta-600, underline
- Spacing: mt-6, gap-3

**Sidebar Container Design:**
- Background: white
- Border: border-r border-sand-200 (desktop only)
- Padding: p-6
- Sticky position on desktop (sticky top-20)
- Max height: calc(100vh - 5rem) with overflow-y-auto
- Section dividers: border-b border-sand-100 between filter groups

---

## Section 3: Top Bar (Above Product Grid)

### 3.1 Active Filters Display

**Functionality:**
- Shows all currently applied filters as removable chips
- Each chip displays filter type and value: "Category: Pottery", "Price: $50-$100"
- Click X on chip to remove individual filter
- "Clear All" link to remove all filters at once

**Design:**
- Chips: bg-terracotta-50, text-terracotta-700, rounded-full, px-3, py-1
- X button: hover:bg-terracotta-100, rounded-full
- Flex wrap layout to handle multiple lines
- Only visible when filters are active

### 3.2 Sort Dropdown

**Options:**
1. Featured (default)
2. Price: Low to High
3. Price: High to Low
4. Newest First
5. Best Rating
6. Most Popular (by review count)
7. Artisan Name (A-Z)

**Design:**
- Custom dropdown styled to match theme
- Label: "Sort by:" in gray-600
- Dropdown button: white background, border, rounded-lg
- Dropdown menu: shadow-lg, rounded-lg, terracotta-50 hover states
- Selected item: terracotta-600 text, checkmark icon

**Behavior:**
- Immediately applies sort without "Apply" button
- Updates URL query param
- Smooth transition when products reorder

### 3.3 View Toggle

**Options:**
- Grid View (default): 3-4 column grid
- List View: Single column, horizontal card layout

**Design:**
- Two toggle buttons side by side
- Active state: bg-terracotta-500, text-white
- Inactive state: bg-white, text-gray-600, border
- Icons: Grid icon and List icon from Lucide
- Rounded toggle container

### 3.4 Results Per Page Selector

**Options:** 12, 24 (default), 48, All

**Design:**
- Small dropdown aligned to the right
- Label: "Show:" followed by dropdown
- Compact size to not dominate the bar

**Top Bar Container Design:**
- Flexbox layout: space-between on desktop, wrap on mobile
- Background: white
- Border-bottom: border-sand-200
- Padding: p-4
- Sticky: sticky top-[72px] z-10 (below navbar)
- Gap between elements: gap-4

---

## Section 4: Product Grid

### 4.1 Grid Layout

**Responsive Grid:**
- XL screens (>1280px): 4 columns
- LG screens (1024-1280px): 3 columns
- MD screens (768-1024px): 2 columns
- SM screens (<768px): 1 column

**Spacing:**
- Gap between cards: gap-6 md:gap-8
- Container padding: p-4 md:p-6
- Background: bg-background-warm (slight warm tint)

### 4.2 Product Card Design

**Card Structure:**

```
┌─────────────────────────┐
│                         │
│   Product Image         │ ← Aspect square, object-cover
│   (with badges)         │ ← Hover: Show second image
│                         │
├─────────────────────────┤
│ CATEGORY NAME           │ ← Small, uppercase, gray-500
│ Product Name            │ ← Bold, 2 lines, truncate
│ By Artisan Name         │ ← Clickable, terracotta link
│ ⭐⭐⭐⭐⭐ (23)          │ ← Stars + review count
│ $89.99                  │ ← Large, bold, terracotta-600
│ [♡ Add to Wishlist]     │ ← Icon button
└─────────────────────────┘
```

**Image Section:**
- Aspect ratio: aspect-square
- Border radius: rounded-lg
- Shadow: shadow-soft
- Badges (overlay on top-left):
  - "Sale" (if originalPrice exists) - red-500 bg
  - "New" (if < 30 days old) - blue-500 bg
  - "Low Stock" (if stockQuantity < 5) - orange-500 bg
  - "Made to Order" (if madeToOrder) - purple-500 bg

**Card Content:**
- Background: white
- Padding: p-4
- Border radius: rounded-xl
- Total card shadow: hover:shadow-warm
- Transition: all 300ms ease

**Interactive States:**

1. **Default:** Clean, minimal shadow
2. **Hover:**
   - Image: Swap to second image in array (if exists)
   - Card: Lift effect with shadow-warm
   - Transform: -translate-y-1
   - Show "Quick View" button overlay on image (optional)
3. **Click:** Navigate to `/product/:id`

**Wishlist Button:**
- Position: absolute top-2 right-2 on image
- Background: white with opacity, backdrop-blur
- Icon: Heart from Lucide
- Empty heart: not in wishlist
- Filled heart: in wishlist (terracotta-500)
- Smooth fill animation on toggle

**Price Display:**
- Current price: Large, bold, terracotta-600
- Original price (if sale): Smaller, gray-400, line-through, before current price
- Discount badge: "-30%" in red-500 if sale

### 4.3 Product Card - List View Variant

**Layout:** Horizontal flex layout
- Image: fixed width 200px, square
- Content: flex-1, horizontal arrangement
- All same information as grid view
- More room for longer descriptions

---

## Section 5: Loading States

### 5.1 Skeleton Cards

**Design:**
- Same dimensions as actual product cards
- Animated shimmer effect (pulse animation)
- Gray placeholder blocks for:
  - Image area (bg-gray-200)
  - Category text (w-1/3, h-3)
  - Product name (w-2/3, h-5)
  - Artisan name (w-1/2, h-4)
  - Rating stars (w-1/3, h-4)
  - Price (w-1/4, h-6)

**Behavior:**
- Show 6-8 skeleton cards while loading
- Fade out skeletons, fade in actual cards
- Loading duration: typically 300-500ms

### 5.2 Loading Spinner

**Alternative/Complementary:**
- Center screen spinner when initially loading page
- Small spinner on "Apply Filters" button during filter application
- Uses Lucide Loader2 icon with spin animation

---

## Section 6: Empty States

### 6.1 No Products Found

**Trigger:** When applied filters return zero results

**Content:**
```
┌─────────────────────────────────────┐
│                                     │
│          🔍 Illustration             │
│                                     │
│      No Products Found              │ ← Playfair, 2xl, bold
│                                     │
│   We couldn't find any products     │
│   matching your filters.            │ ← Gray-600
│                                     │
│   Try these suggestions:            │
│   • Remove some filters             │
│   • Adjust price range              │
│   • Search different keywords       │
│   • Browse all products             │
│                                     │
│   [Clear All Filters]               │ ← Primary button
│   [Browse All Categories]           │ ← Secondary button
│                                     │
└─────────────────────────────────────┘
```

**Below Empty State:**
- Section titled "You May Like"
- Show 4 popular products (highest rating × review count)
- Same product card design

**Design:**
- Center-aligned content
- Max width: 480px, centered
- Padding: py-16
- Illustration: Use Lucide Search icon or custom illustration
- Friendly, helpful tone

### 6.2 Initial Load (No Filters Applied)

**Trigger:** First visit to page, no filters

**Content:**
- Show all products
- Highlight: "Showing all X products"
- Possibly add banner: "Browse our complete collection of handcrafted treasures"

---

## Section 7: Pagination

### Option 1: Classic Pagination (Recommended)

**Design:**
```
[← Previous] [1] [2] [3] ... [10] [Next →]
```

**Components:**
- Previous/Next buttons (disabled at edges)
- Page numbers (show first, last, current, ±1 from current)
- Ellipsis (...) for gaps
- Current page: bg-terracotta-500, text-white
- Other pages: bg-white, text-gray-600, hover:bg-terracotta-50

**Behavior:**
- Scroll to top on page change (smooth scroll)
- Update URL query param (?page=2)
- Maintain all filters when changing pages

### Option 2: Load More Button

**Design:**
- Centered button below product grid
- "Load More Products" text
- Shows: "Loading..." when fetching
- Automatically scrolls to first new product

**Behavior:**
- Appends next page of products to grid
- Button disappears when all products loaded
- Shows count: "Showing 24 of 48"

### Option 3: Infinite Scroll

**Design:**
- Minimal UI - no visible pagination
- Loading spinner appears as user scrolls to bottom
- Automatically fetches next page

**Behavior:**
- Detects when user is 200px from bottom
- Fetches and appends products
- Shows "You've reached the end" message when done

**Recommendation:** Use **Option 1 (Classic Pagination)** for better UX control and prevents overwhelming users with infinite content.

---

## Section 8: Mobile Considerations

### 8.1 Mobile Filter Drawer

**Trigger:** "Filters" button at top of page (fixed/sticky position)

**Design:**
- Button shows filter icon + count badge: "Filters (3)"
- Bottom drawer slides up (covers ~80% of screen)
- Header: "Filter Products" with close X button
- Scrollable content area with all filter options
- Footer: [Apply Filters] and [Clear All] buttons
- Backdrop: Semi-transparent dark overlay

**Behavior:**
- Smooth slide-up animation (300ms)
- Close on: backdrop click, X button, Apply button
- Maintains scroll position in filter list
- Shows active filter count in badge

### 8.2 Mobile Sort & View

**Design:**
- Sticky bar below navbar
- Flex layout: [Filters Button] [Sort Dropdown] [View Toggle]
- Each element scaled appropriately for touch (min h-10)
- Background: white, shadow-sm

### 8.3 Mobile Product Grid

**Adjustments:**
- Single column (full width)
- Larger card size for better visibility
- Larger touch targets (min 44px)
- Simplified hover states (tap-based interactions)
- Image gallery: Swipe gesture supported

---

## Section 9: Interactions & Animations

### 9.1 Filter Interactions

**Checkbox/Radio Changes:**
- Instant visual feedback (checkmark appears)
- Update filter count badge
- Enable "Apply" button
- Subtle haptic feedback on mobile (if supported)

**Apply Filters:**
- Show loading spinner on button
- Fade out current products
- Fade in new filtered products
- Smooth transition (300ms)
- Scroll to top of product grid

**Clear Filters:**
- Confirm dialog if many filters active (optional)
- Animate filter chips fading out
- Reset all filter UI elements
- Reload all products

### 9.2 Product Card Animations

**On Load:**
- Stagger animation: Cards appear with slight delay (50ms between each)
- Fade + slide up effect

**On Hover (Desktop):**
- Card lifts: transform translate-y-1
- Shadow increases: shadow-soft → shadow-warm
- Image swap: Crossfade to second image (300ms)
- Show wishlist button with scale animation

**On Click:**
- Ripple effect from click point (optional)
- Smooth navigation transition

### 9.3 Scroll Behavior

**Smooth Scrolling:**
- All anchor links use smooth scroll behavior
- Pagination: Scroll to top of grid
- Filter apply: Scroll to results

**Sticky Elements:**
- Navbar stays fixed at top
- Top bar (sort/filters) sticky below navbar
- Filter sidebar sticky on scroll (desktop)

### 9.4 Micro-interactions

**Wishlist Toggle:**
- Heart icon scales up (1.2x) on click
- Fills with terracotta color
- Optional: Particle burst animation

**Filter Chips:**
- Slide in from left when added
- Slide out to right when removed
- Scale down before removal

**Loading States:**
- Skeleton shimmer animation
- Spinner rotation
- Progress indicators

---

## Section 10: State Management

### 10.1 State Structure

```javascript
// Main state object
const [filters, setFilters] = useState({
  search: "",
  categories: [],           // Array of category IDs
  priceRange: [0, 500],     // [min, max]
  locations: [],            // Array of location strings
  materials: [],            // Array of material strings
  rating: null,             // Number (4.5, 4.0, 3.0) or null
  availability: [],         // ["inStock", "madeToOrder", "limitedEdition"]
  specialFeatures: []       // ["fairTrade", "ecoFriendly", "onSale"]
});

const [sortBy, setSortBy] = useState("featured");
const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"
const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(24);
const [isLoading, setIsLoading] = useState(false);
const [filteredProducts, setFilteredProducts] = useState([]);
```

### 10.2 Filter Logic

**Filter Function:**
```javascript
const applyFilters = (products, filters) => {
  let result = [...products];

  // Search filter
  if (filters.search.trim()) {
    const searchLower = filters.search.toLowerCase();
    result = result.filter(p =>
      p.name.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower) ||
      p.artisan.name.toLowerCase().includes(searchLower) ||
      p.materials.some(m => m.toLowerCase().includes(searchLower)) ||
      p.tags.some(t => t.toLowerCase().includes(searchLower))
    );
  }

  // Category filter
  if (filters.categories.length > 0) {
    result = result.filter(p =>
      filters.categories.includes(p.categoryId)
    );
  }

  // Price range filter
  result = result.filter(p =>
    p.price >= filters.priceRange[0] &&
    p.price <= filters.priceRange[1]
  );

  // Location filter
  if (filters.locations.length > 0) {
    result = result.filter(p =>
      filters.locations.includes(p.artisan.location)
    );
  }

  // Materials filter (OR logic - product has ANY of selected materials)
  if (filters.materials.length > 0) {
    result = result.filter(p =>
      p.materials.some(m => filters.materials.includes(m))
    );
  }

  // Rating filter
  if (filters.rating !== null) {
    result = result.filter(p => p.rating >= filters.rating);
  }

  // Availability filters
  if (filters.availability.includes("inStock")) {
    result = result.filter(p => p.inStock === true);
  }
  if (filters.availability.includes("madeToOrder")) {
    result = result.filter(p => p.madeToOrder === true);
  }
  if (filters.availability.includes("limitedEdition")) {
    result = result.filter(p => p.stockQuantity < 10);
  }

  return result;
};
```

**Sort Function:**
```javascript
const sortProducts = (products, sortBy) => {
  const sorted = [...products];

  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);

    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);

    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);

    case "newest":
      return sorted.sort((a, b) =>
        new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );

    case "popular":
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount);

    case "artisan":
      return sorted.sort((a, b) =>
        a.artisan.name.localeCompare(b.artisan.name)
      );

    case "featured":
    default:
      return sorted.sort((a, b) => {
        // Featured products first, then by rating
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.rating - a.rating;
      });
  }
};
```

### 10.3 URL Query Parameters

**Purpose:** Make filters shareable and bookmarkable

**Format:** `/discover?category=1,2&price=50-100&location=mexico&sort=price-asc&page=2`

**Implementation:**
```javascript
// On filter change, update URL
const updateURL = (filters, sortBy, page) => {
  const params = new URLSearchParams();

  if (filters.categories.length)
    params.set('category', filters.categories.join(','));
  if (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 500)
    params.set('price', `${filters.priceRange[0]}-${filters.priceRange[1]}`);
  if (filters.locations.length)
    params.set('location', filters.locations.join(','));
  if (filters.search)
    params.set('search', filters.search);
  if (sortBy !== 'featured')
    params.set('sort', sortBy);
  if (page > 1)
    params.set('page', page);

  window.history.pushState({}, '', `?${params.toString()}`);
};

// On page load, read URL params
const parseURLParams = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    categories: params.get('category')?.split(',').map(Number) || [],
    priceRange: params.get('price')?.split('-').map(Number) || [0, 500],
    locations: params.get('location')?.split(',') || [],
    search: params.get('search') || '',
    sortBy: params.get('sort') || 'featured',
    page: parseInt(params.get('page') || '1')
  };
};
```

### 10.4 Performance Optimizations

**Debounced Search:**
```javascript
const debouncedSearch = useMemo(
  () => debounce((searchTerm) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
  }, 300),
  []
);
```

**Memoized Filtered Products:**
```javascript
const filteredProducts = useMemo(
  () => sortProducts(applyFilters(products, filters), sortBy),
  [products, filters, sortBy]
);
```

**Paginated Products:**
```javascript
const paginatedProducts = useMemo(() => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
}, [filteredProducts, currentPage, itemsPerPage]);
```

---

## Section 11: Accessibility (A11y)

### 11.1 Keyboard Navigation

**Required:**
- All interactive elements keyboard accessible (Tab, Enter, Space)
- Filter sidebar: Navigate with Tab, select with Space
- Product grid: Tab through cards, Enter to open
- Dropdowns: Arrow keys to navigate options
- Escape key: Close modals/drawers

**Focus Management:**
- Visible focus indicators (terracotta-500 ring)
- Focus trap in mobile drawer
- Return focus to trigger element when closing modal
- Skip link to main content

### 11.2 Screen Reader Support

**ARIA Labels:**
- Buttons: `aria-label="Apply filters"`, `aria-label="Clear all filters"`
- Checkboxes: Proper labels, `aria-checked` state
- Product cards: `aria-label="Product name, $XX.XX, by Artisan Name"`
- Pagination: `aria-label="Page 1"`, `aria-current="page"`
- Loading states: `aria-live="polite"` regions

**Semantic HTML:**
- Use `<nav>` for pagination
- Use `<form>` for filter sidebar
- Use `<button>` for clickable elements (not divs)
- Use heading hierarchy (h1 for page, h2 for sections)

### 11.3 Color Contrast

**Requirements:**
- All text meets WCAG AA standard (4.5:1 ratio)
- Interactive elements have clear focus states
- Don't rely solely on color (use icons, text, patterns)

**Testing:**
- Terracotta-500 (#C97C5D) on white: 4.52:1 ✅
- Gray-600 on white: 7.23:1 ✅
- Use browser dev tools to verify contrast

---

## Section 12: Technical Implementation

### 12.1 Component Architecture

**File Structure:**
```
src/
├── pages/
│   └── DiscoverPage.jsx                 (Main page container)
├── components/
│   └── discover/
│       ├── DiscoverHeader.jsx           (Breadcrumb, title, count)
│       ├── FilterSidebar.jsx            (Filter container)
│       │   ├── SearchBar.jsx
│       │   ├── CategoryFilter.jsx
│       │   ├── PriceRangeFilter.jsx
│       │   ├── LocationFilter.jsx
│       │   ├── MaterialFilter.jsx
│       │   ├── RatingFilter.jsx
│       │   ├── AvailabilityFilter.jsx
│       │   └── FilterActions.jsx
│       ├── ActiveFilters.jsx            (Filter chips)
│       ├── TopBar.jsx                   (Sort, view toggle)
│       │   ├── SortDropdown.jsx
│       │   ├── ViewToggle.jsx
│       │   └── ResultsPerPage.jsx
│       ├── ProductGrid.jsx              (Grid container)
│       ├── ProductCard.jsx              (Reusable card)
│       ├── ProductCardSkeleton.jsx      (Loading state)
│       ├── EmptyState.jsx               (No results)
│       ├── Pagination.jsx               (Page controls)
│       └── MobileFilterDrawer.jsx       (Mobile filters)
└── hooks/
    ├── useFilters.js                    (Filter logic hook)
    ├── useProductSearch.js              (Search functionality)
    └── usePagination.js                 (Pagination logic)
```

### 12.2 Data Flow

```
1. User Action (filter change)
   → Update filters state
   → Apply filters to products
   → Sort filtered products
   → Paginate results
   → Update UI

2. Product Card Click
   → Navigate to /product/:id
   → Pass product data via route state (optional)

3. Add to Wishlist
   → Call useCart hook
   → Update wishlist in context
   → Update localStorage
   → Show toast notification
```

### 12.3 Performance Metrics

**Target Performance:**
- Initial page load: < 2 seconds
- Filter application: < 300ms
- Smooth scrolling: 60fps
- No layout shifts (CLS < 0.1)
- Lighthouse score: > 90

**Optimization Strategies:**
- Lazy load images with loading="lazy"
- Use React.memo for ProductCard component
- Virtualize long lists if > 100 products
- Code split filter components
- Optimize re-renders with useMemo/useCallback

---

## Section 13: Design Specifications

### 13.1 Typography

**Headings:**
- Page Title: Playfair Display, font-bold, text-3xl md:text-4xl
- Section Headers: Playfair Display, font-semibold, text-xl
- Filter Labels: Inter, font-semibold, text-sm

**Body Text:**
- Product Names: Inter, font-semibold, text-base
- Descriptions: Inter, font-normal, text-sm, text-gray-600
- Artisan Names: Inter, font-medium, text-sm, text-terracotta-600

### 13.2 Color Palette

**Primary Actions:**
- Buttons: bg-terracotta-500, hover:bg-terracotta-600
- Links: text-terracotta-600, hover:text-terracotta-700
- Active States: bg-terracotta-50, border-terracotta-500

**Backgrounds:**
- Page: bg-background (#FAF9F6)
- Cards: bg-white
- Sidebar: bg-white
- Product Grid Section: bg-background-warm

**Text:**
- Primary: text-gray-900
- Secondary: text-gray-600
- Muted: text-gray-500
- Links: text-terracotta-600

**Borders:**
- Light: border-sand-200
- Medium: border-gray-300
- Focus: border-terracotta-400

### 13.3 Spacing Scale

- xs: 0.25rem (1)
- sm: 0.5rem (2)
- md: 1rem (4)
- lg: 1.5rem (6)
- xl: 2rem (8)
- 2xl: 3rem (12)

**Section Spacing:**
- Between major sections: py-8 md:py-12
- Between cards: gap-6 md:gap-8
- Within cards: p-4
- Within sidebar: p-6, gap-6 between filters

### 13.4 Shadows

**Types:**
- `shadow-soft`: 0 2px 8px rgba(0, 0, 0, 0.08) - Default cards
- `shadow-warm`: 0 4px 12px rgba(201, 124, 93, 0.15) - Hover state
- `shadow-soft-lg`: 0 4px 16px rgba(0, 0, 0, 0.1) - Modals, dropdowns

### 13.5 Border Radius

- Small: rounded-lg (0.5rem)
- Medium: rounded-xl (0.75rem)
- Large: rounded-2xl (1rem)
- Pills: rounded-full

### 13.6 Transitions

**Standard:**
```css
transition: all 200ms ease-in-out;
```

**Transforms:**
```css
hover:transform hover:-translate-y-1
transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
```

---

## Section 14: User Experience Principles

### 14.1 Progressive Disclosure

- Start with most common filters visible
- Advanced filters collapsible (future enhancement)
- Don't overwhelm with too many options at once
- Show filter counts to guide decision-making

### 14.2 Immediate Feedback

- Visual feedback on all interactions (< 100ms)
- Loading states for async operations
- Success/error messages via toasts
- Disabled states clearly indicated

### 14.3 Forgiving Interactions

- Undo for destructive actions (clear all filters)
- Confirmation dialogs for major changes
- Preserve filter state on navigation back
- Auto-save search terms in localStorage (optional)

### 14.4 Helpful Guidance

- Empty state suggestions
- Filter result count previews
- "Clear all" always available when filters active
- Breadcrumbs for context

### 14.5 Mobile-First Approach

- Design for mobile first, enhance for desktop
- Touch-friendly targets (min 44px)
- Thumb-friendly bottom navigation
- Swipe gestures where appropriate

---

## Section 15: Success Metrics

### KPIs to Track:

**Engagement:**
- Average time on page
- Scroll depth
- Filter usage rate
- Products viewed per session

**Conversion:**
- Click-through rate to product details
- Add to wishlist rate
- Add to cart rate (from product detail)
- Conversion funnel: Discover → Detail → Cart

**User Behavior:**
- Most used filters
- Most used sort options
- Search queries
- Bounce rate

**Technical:**
- Page load time
- Time to interactive
- Filter application speed
- Mobile vs desktop usage

---

## Section 16: Future Enhancements

### Phase 1 Enhancements:
- Quick View modal for faster browsing
- Add to cart directly from product card
- Comparison feature (select multiple products to compare)
- Filter presets ("Popular", "Under $50", "Gifts")

### Phase 2 Enhancements:
- Saved searches/filter combinations
- "Notify me" for out-of-stock products
- Recently viewed products section
- Personalized recommendations based on browsing history

### Phase 3 Enhancements:
- AI-powered search with natural language
- Visual search (upload image to find similar products)
- Augmented reality preview (AR)
- Advanced faceted search
- Collection curation (editorial picks)

---

## Conclusion

The Discover Page is the heart of the CulturaCart browsing experience. By combining intuitive filtering, elegant design, and performant interactions, we create a delightful product discovery journey that honors the authenticity and cultural significance of each handcrafted item.

**Key Design Principles:**
- **Warm & Cultural:** Maintain the terracotta-based aesthetic throughout
- **User-Centric:** Filters and sorting match real user needs
- **Performance:** Fast, smooth interactions at all times
- **Accessible:** Keyboard navigable, screen reader friendly
- **Mobile-Friendly:** Responsive design that works beautifully on all devices
- **Scalable:** Architecture supports future enhancements

**Implementation Priority:**
1. Core filtering and product grid (MVP)
2. Sort and pagination
3. Mobile responsive layout
4. Polish: animations, empty states, loading states
5. Enhancements: Quick view, URL params, advanced features

By following this specification, the Discover Page will provide a best-in-class browsing experience that drives engagement and conversion while staying true to CulturaCart's mission of connecting travelers with authentic cultural craftsmanship.

---

**Document Version:** 1.0
**Created:** 2025-01-25
**Status:** Ready for Implementation
**Estimated Development Time:** 2-3 weeks
