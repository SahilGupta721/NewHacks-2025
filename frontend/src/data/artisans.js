export const artisans = [
  {
    id: 1,
    name: "Maria Santos",
    slug: "maria-santos",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
    coverPhoto: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1200",
    bio: "Maria has been practicing the traditional art of pottery for over 30 years, learning the craft from her grandmother in the mountains of Oaxaca. Her pieces blend ancient Zapotec designs with contemporary aesthetics.",
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
    story: "Growing up in a family of potters, Maria learned to shape clay before she could read. Her grandmother taught her the sacred techniques passed down for generations. Today, Maria combines traditional Zapotec patterns with modern forms, creating pieces that honor her heritage while speaking to contemporary tastes.",
    awards: [
      "National Craft Award 2018",
      "Fair Trade Certified 2019",
      "UNESCO Cultural Heritage Keeper 2021"
    ],
    pressFeatures: [
      {
        publication: "Craft Magazine",
        title: "Master Potter of Oaxaca",
        url: "https://example.com/maria-santos"
      }
    ],
    socialMedia: {
      instagram: "@maria_pottery",
      facebook: "mariasantospottery"
    }
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    slug: "rajesh-kumar",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    coverPhoto: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1200",
    bio: "Rajesh is a third-generation textile artisan from Jaipur, specializing in block printing and natural dyeing techniques that have been used in India for centuries.",
    location: {
      city: "Jaipur",
      country: "India",
      coordinates: [26.9124, 75.7873]
    },
    craftSpecialty: "Textiles & Weaving",
    specialties: ["Block Printing", "Natural Dyes", "Hand Weaving"],
    yearsOfExperience: 25,
    memberSince: "2020-06-20",
    verified: true,
    rating: 4.8,
    reviewCount: 134,
    productCount: 32,
    story: "Rajesh learned the art of block printing from his father and grandfather. Each textile he creates is a labor of love, using wooden blocks carved by hand and natural dyes made from plants, flowers, and minerals.",
    awards: [
      "National Textile Award 2019",
      "Fair Trade Certified 2020"
    ]
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    slug: "elena-rodriguez",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    coverPhoto: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1200",
    bio: "Elena crafts exquisite silver jewelry inspired by ancient Incan designs, using traditional metalworking techniques passed down through generations in her family.",
    location: {
      city: "Cusco",
      country: "Peru",
      coordinates: [-13.5319, -71.9675]
    },
    craftSpecialty: "Jewelry & Accessories",
    specialties: ["Silver Work", "Stone Setting", "Traditional Designs"],
    yearsOfExperience: 18,
    memberSince: "2020-08-10",
    verified: true,
    rating: 4.9,
    reviewCount: 189,
    productCount: 45,
    story: "Growing up near Machu Picchu, Elena was surrounded by the rich history of Incan metalwork. She studied traditional techniques and now creates contemporary jewelry that honors her ancestors.",
    awards: [
      "Peruvian Artisan Excellence Award 2020",
      "Fair Trade Certified 2019"
    ]
  },
  {
    id: 4,
    name: "Yuki Tanaka",
    slug: "yuki-tanaka",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    coverPhoto: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1200",
    bio: "Yuki is a master ceramicist specializing in traditional Japanese pottery techniques including raku and kintsugi, the art of repairing broken pottery with gold.",
    location: {
      city: "Kyoto",
      country: "Japan",
      coordinates: [35.0116, 135.7681]
    },
    craftSpecialty: "Pottery & Ceramics",
    specialties: ["Raku Pottery", "Kintsugi", "Traditional Glazing"],
    yearsOfExperience: 22,
    memberSince: "2020-04-25",
    verified: true,
    rating: 4.9,
    reviewCount: 167,
    productCount: 28,
    story: "Yuki studied under a renowned pottery master in Kyoto for 10 years before opening her own studio. Her work celebrates the beauty of imperfection through the ancient art of kintsugi.",
    awards: [
      "Japanese Traditional Crafts Award 2019",
      "Kyoto Artisan of the Year 2021"
    ]
  },
  {
    id: 5,
    name: "Fatima El-Amin",
    slug: "fatima-el-amin",
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400",
    coverPhoto: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1200",
    bio: "Fatima creates stunning handwoven rugs and textiles using traditional Berber weaving techniques and natural wool from local sheep.",
    location: {
      city: "Marrakech",
      country: "Morocco",
      coordinates: [31.6295, -7.9811]
    },
    craftSpecialty: "Textiles & Weaving",
    specialties: ["Berber Weaving", "Natural Wool", "Traditional Patterns"],
    yearsOfExperience: 28,
    memberSince: "2020-05-18",
    verified: true,
    rating: 4.8,
    reviewCount: 142,
    productCount: 19,
    story: "Fatima learned to weave from her mother and grandmother in the Atlas Mountains. Each rug tells a story through its patterns and colors, preserving Berber cultural heritage.",
    awards: [
      "Moroccan Craft Heritage Award 2018",
      "Fair Trade Certified 2020"
    ]
  },
  {
    id: 6,
    name: "Carlos Mendez",
    slug: "carlos-mendez",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    coverPhoto: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1200",
    bio: "Carlos is a master woodcarver creating intricate sculptures and furniture using traditional tools and sustainably harvested wood from local forests.",
    location: {
      city: "Guatemala City",
      country: "Guatemala",
      coordinates: [14.6349, -90.5069]
    },
    craftSpecialty: "Woodwork & Furniture",
    specialties: ["Wood Carving", "Furniture Making", "Traditional Tools"],
    yearsOfExperience: 32,
    memberSince: "2020-07-12",
    verified: true,
    rating: 4.9,
    reviewCount: 98,
    productCount: 16,
    story: "Carlos grew up in a family of carpenters and learned the craft from his father. He uses only hand tools and sustainably harvested wood, creating pieces that showcase the natural beauty of the material.",
    awards: [
      "Guatemala Artisan Award 2019",
      "Sustainable Craft Certification 2020"
    ]
  },
];
