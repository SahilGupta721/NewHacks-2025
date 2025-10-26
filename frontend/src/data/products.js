export const products = [
  {
    id: 1,
    name: "Handwoven Ceramic Vase",
    slug: "handwoven-ceramic-vase",
    description: "Beautiful handcrafted ceramic vase with traditional Zapotec patterns. Each piece is unique, featuring intricate designs that tell the story of ancient Mexican pottery traditions.",
    price: 89.99,
    originalPrice: null,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800",
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800",
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800"
    ],
    thumbnail: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400",
    categoryId: 1,
    category: {
      id: 1,
      name: "Pottery & Ceramics",
      slug: "pottery-ceramics"
    },
    artisanId: 1,
    artisan: {
      id: 1,
      name: "Maria Santos",
      slug: "maria-santos",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
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
    inStock: true,
    stockQuantity: 5,
    madeToOrder: false,
    estimatedDelivery: "3-5 business days",
    rating: 4.8,
    reviewCount: 23,
    featured: true,
    tags: ["handmade", "ceramic", "traditional", "home-decor"],
    story: "This vase is crafted using techniques passed down through generations in Maria's family. Each piece takes 3-4 days to complete, from shaping the clay to the final glazing.",
    careInstructions: "Hand wash only. Avoid harsh chemicals. Display away from direct sunlight."
  },
  {
    id: 2,
    name: "Block Printed Cotton Scarf",
    slug: "block-printed-cotton-scarf",
    description: "Luxurious hand-block printed cotton scarf featuring traditional Indian motifs. Made with natural dyes and eco-friendly materials.",
    price: 45.00,
    originalPrice: 65.00,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800",
      "https://images.unsplash.com/photo-1590330297626-d7aff25a0431?w=800"
    ],
    thumbnail: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400",
    categoryId: 2,
    category: {
      id: 2,
      name: "Textiles & Weaving",
      slug: "textiles-weaving"
    },
    artisanId: 2,
    artisan: {
      id: 2,
      name: "Rajesh Kumar",
      slug: "rajesh-kumar",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      location: "Jaipur, India"
    },
    materials: ["100% Cotton", "Natural Dyes"],
    dimensions: {
      length: 72,
      width: 28,
      unit: "inches"
    },
    inStock: true,
    stockQuantity: 12,
    madeToOrder: false,
    estimatedDelivery: "5-7 business days",
    rating: 4.9,
    reviewCount: 45,
    featured: true,
    tags: ["textile", "scarf", "block-print", "natural-dye"],
    story: "Each scarf is hand-printed using carved wooden blocks that are over 50 years old. The natural dyes are made from flowers, leaves, and minerals.",
    careInstructions: "Hand wash in cold water. Dry in shade. Iron on low heat."
  },
  {
    id: 3,
    name: "Silver Incan Sun Necklace",
    slug: "silver-incan-sun-necklace",
    description: "Exquisite sterling silver necklace featuring the Incan sun god Inti. Handcrafted using traditional metalworking techniques.",
    price: 125.00,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800"
    ],
    thumbnail: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400",
    categoryId: 3,
    category: {
      id: 3,
      name: "Jewelry & Accessories",
      slug: "jewelry-accessories"
    },
    artisanId: 3,
    artisan: {
      id: 3,
      name: "Elena Rodriguez",
      slug: "elena-rodriguez",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      location: "Cusco, Peru"
    },
    materials: ["Sterling Silver 925"],
    inStock: true,
    stockQuantity: 8,
    madeToOrder: true,
    estimatedDelivery: "2-3 weeks",
    rating: 4.9,
    reviewCount: 67,
    featured: true,
    tags: ["jewelry", "silver", "incan", "handcrafted"],
    story: "This design is inspired by ancient Incan sun worship symbolism. Elena handcrafts each piece using the lost-wax casting method.",
    careInstructions: "Clean with silver polish cloth. Store in airtight bag to prevent tarnishing."
  },
  {
    id: 4,
    name: "Raku Pottery Tea Bowl",
    slug: "raku-pottery-tea-bowl",
    description: "Traditional Japanese raku-fired tea bowl (chawan) perfect for tea ceremonies. Each bowl is one-of-a-kind with unique crackle patterns.",
    price: 95.00,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800",
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800"
    ],
    thumbnail: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400",
    categoryId: 1,
    category: {
      id: 1,
      name: "Pottery & Ceramics",
      slug: "pottery-ceramics"
    },
    artisanId: 4,
    artisan: {
      id: 4,
      name: "Yuki Tanaka",
      slug: "yuki-tanaka",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      location: "Kyoto, Japan"
    },
    materials: ["Clay", "Raku Glaze"],
    inStock: true,
    stockQuantity: 3,
    madeToOrder: false,
    estimatedDelivery: "4-6 business days",
    rating: 4.9,
    reviewCount: 34,
    featured: true,
    tags: ["pottery", "raku", "tea-ceremony", "japanese"],
    story: "Raku firing is an ancient Japanese technique where the pottery is removed from the kiln while red-hot, creating unique crackle patterns.",
    careInstructions: "Hand wash gently. Not dishwasher safe. Handle with care."
  },
  {
    id: 5,
    name: "Berber Wool Throw Pillow",
    slug: "berber-wool-throw-pillow",
    description: "Handwoven throw pillow featuring traditional Berber patterns. Made with natural wool from Atlas Mountain sheep.",
    price: 68.00,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800"
    ],
    thumbnail: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400",
    categoryId: 2,
    category: {
      id: 2,
      name: "Textiles & Weaving",
      slug: "textiles-weaving"
    },
    artisanId: 5,
    artisan: {
      id: 5,
      name: "Fatima El-Amin",
      slug: "fatima-el-amin",
      avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400",
      location: "Marrakech, Morocco"
    },
    materials: ["100% Natural Wool"],
    dimensions: {
      length: 18,
      width: 18,
      unit: "inches"
    },
    inStock: true,
    stockQuantity: 15,
    madeToOrder: false,
    estimatedDelivery: "5-7 business days",
    rating: 4.7,
    reviewCount: 28,
    featured: false,
    tags: ["pillow", "berber", "wool", "home-decor"],
    story: "Each pillow is handwoven on a traditional loom. The geometric patterns have been passed down for generations in Berber culture.",
    careInstructions: "Dry clean only. Spot clean with mild detergent if needed."
  },
  {
    id: 6,
    name: "Hand-Carved Wooden Bowl",
    slug: "hand-carved-wooden-bowl",
    description: "Beautiful wooden bowl carved from sustainably harvested mahogany. Features smooth curves and natural wood grain.",
    price: 78.00,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
      "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800"
    ],
    thumbnail: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
    categoryId: 4,
    category: {
      id: 4,
      name: "Woodwork & Furniture",
      slug: "woodwork-furniture"
    },
    artisanId: 6,
    artisan: {
      id: 6,
      name: "Carlos Mendez",
      slug: "carlos-mendez",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      location: "Guatemala City, Guatemala"
    },
    materials: ["Mahogany Wood", "Natural Oil Finish"],
    dimensions: {
      diameter: 10,
      height: 4,
      unit: "inches"
    },
    inStock: true,
    stockQuantity: 7,
    madeToOrder: false,
    estimatedDelivery: "4-6 business days",
    rating: 4.8,
    reviewCount: 19,
    featured: false,
    tags: ["wood", "bowl", "handcarved", "kitchen"],
    story: "Carlos carves each bowl by hand using traditional tools. The wood is sustainably harvested from managed forests in Guatemala.",
    careInstructions: "Hand wash and dry immediately. Treat with food-safe mineral oil monthly."
  },
  {
    id: 7,
    name: "Embroidered Tote Bag",
    slug: "embroidered-tote-bag",
    description: "Vibrant hand-embroidered tote bag featuring traditional floral motifs. Made from durable canvas with leather handles.",
    price: 55.00,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800",
      "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800"
    ],
    thumbnail: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400",
    categoryId: 6,
    category: {
      id: 6,
      name: "Bags & Leather Goods",
      slug: "bags-leather"
    },
    artisanId: 1,
    artisan: {
      id: 1,
      name: "Maria Santos",
      slug: "maria-santos",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
      location: "Oaxaca, Mexico"
    },
    materials: ["Canvas", "Leather", "Cotton Thread"],
    dimensions: {
      height: 15,
      width: 18,
      depth: 6,
      unit: "inches"
    },
    inStock: true,
    stockQuantity: 20,
    madeToOrder: false,
    estimatedDelivery: "3-5 business days",
    rating: 4.6,
    reviewCount: 52,
    featured: false,
    tags: ["bag", "tote", "embroidered", "canvas"],
    story: "Each flower is hand-embroidered with colorful threads. This design is inspired by traditional Mexican Otomi art.",
    careInstructions: "Spot clean only. Avoid machine washing to preserve embroidery."
  },
  {
    id: 8,
    name: "Ceramic Dinner Plate Set",
    slug: "ceramic-dinner-plate-set",
    description: "Set of 4 handcrafted ceramic dinner plates with earthy tones and organic shapes. Microwave and dishwasher safe.",
    price: 120.00,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=800",
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800"
    ],
    thumbnail: "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=400",
    categoryId: 1,
    category: {
      id: 1,
      name: "Pottery & Ceramics",
      slug: "pottery-ceramics"
    },
    artisanId: 4,
    artisan: {
      id: 4,
      name: "Yuki Tanaka",
      slug: "yuki-tanaka",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      location: "Kyoto, Japan"
    },
    materials: ["Stoneware Clay", "Food-Safe Glaze"],
    inStock: true,
    stockQuantity: 10,
    madeToOrder: false,
    estimatedDelivery: "5-7 business days",
    rating: 4.9,
    reviewCount: 41,
    featured: true,
    tags: ["plates", "dinnerware", "ceramic", "set"],
    story: "These plates are wheel-thrown and hand-glazed. Each set is slightly unique, celebrating the beauty of handmade ceramics.",
    careInstructions: "Dishwasher and microwave safe. Handle with care to avoid chipping."
  },
];
