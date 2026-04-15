export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  category: string;
  store: string;
  storeLogo: string;
  badge?: string;
  dealScore: number;
  inStock: boolean;
  features?: string[];
  priceComparison?: { store: string; price: number; url: string }[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  productCount: number;
  image: string;
}

export interface Store {
  id: string;
  name: string;
  logo: string;
  description: string;
  productCount: number;
  url: string;
}

export const categories: Category[] = [
  { id: "electronics", name: "Electronics", icon: "💻", productCount: 1240, image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400" },
  { id: "fashion", name: "Fashion", icon: "👗", productCount: 3400, image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400" },
  { id: "home", name: "Home & Living", icon: "🏠", productCount: 890, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400" },
  { id: "beauty", name: "Beauty", icon: "✨", productCount: 2100, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400" },
  { id: "sports", name: "Sports", icon: "⚽", productCount: 670, image: "https://images.unsplash.com/photo-1461896836934-bd45ba7a7e73?w=400" },
  { id: "books", name: "Books", icon: "📚", productCount: 1500, image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400" },
  { id: "gaming", name: "Gaming", icon: "🎮", productCount: 430, image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400" },
  { id: "groceries", name: "Groceries", icon: "🛒", productCount: 950, image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400" },
];

export const stores: Store[] = [
  { id: "amazon", name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", description: "World's largest online marketplace with millions of products.", productCount: 5000, url: "https://amazon.in" },
  { id: "flipkart", name: "Flipkart", logo: "https://upload.wikimedia.org/wikipedia/en/7/7a/Flipkart_logo.svg", description: "India's leading e-commerce platform with great deals.", productCount: 4200, url: "https://flipkart.com" },
  { id: "myntra", name: "Myntra", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/Myntra_logo.png", description: "India's fashion destination for top brands.", productCount: 3100, url: "https://myntra.com" },
  { id: "ajio", name: "AJIO", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/AJIO_logo.svg", description: "Curated fashion from premium brands.", productCount: 1800, url: "https://ajio.com" },
  { id: "croma", name: "Croma", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Croma_logo.svg", description: "Electronics and gadgets at best prices.", productCount: 900, url: "https://croma.com" },
  { id: "nykaa", name: "Nykaa", logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/Nykaa_logo.svg", description: "Beauty, wellness, and fashion products.", productCount: 2500, url: "https://nykaa.com" },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Sony WH-1000XM5 Wireless Headphones",
    description: "Industry-leading noise cancellation with exceptional sound quality. 30-hour battery life, multipoint connection, and ultra-comfortable design.",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600",
    price: 22990,
    originalPrice: 34990,
    discount: 34,
    rating: 4.7,
    reviews: 12400,
    category: "electronics",
    store: "Amazon",
    storeLogo: "🛒",
    badge: "Best Seller",
    dealScore: 9.2,
    inStock: true,
    features: ["Active Noise Cancellation", "30hr Battery", "Multipoint", "Hi-Res Audio"],
    priceComparison: [
      { store: "Amazon", price: 22990, url: "#" },
      { store: "Flipkart", price: 23499, url: "#" },
      { store: "Croma", price: 24990, url: "#" },
    ],
  },
  {
    id: "2",
    name: "Nike Air Max 270 React Running Shoes",
    description: "Lightweight and breathable with React foam cushioning for incredible comfort on the run.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    price: 8995,
    originalPrice: 14995,
    discount: 40,
    rating: 4.5,
    reviews: 8900,
    category: "fashion",
    store: "Myntra",
    storeLogo: "👟",
    badge: "Trending",
    dealScore: 8.8,
    inStock: true,
    features: ["React Foam", "Breathable Mesh", "Durable Outsole"],
    priceComparison: [
      { store: "Myntra", price: 8995, url: "#" },
      { store: "Amazon", price: 9499, url: "#" },
      { store: "AJIO", price: 9299, url: "#" },
    ],
  },
  {
    id: "3",
    name: "Samsung Galaxy S24 Ultra 256GB",
    description: "The ultimate smartphone with Galaxy AI, 200MP camera, and S Pen built in.",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600",
    price: 109999,
    originalPrice: 134999,
    discount: 19,
    rating: 4.8,
    reviews: 25600,
    category: "electronics",
    store: "Flipkart",
    storeLogo: "📱",
    badge: "Premium Pick",
    dealScore: 8.5,
    inStock: true,
    features: ["Galaxy AI", "200MP Camera", "S Pen", "Titanium Frame"],
    priceComparison: [
      { store: "Flipkart", price: 109999, url: "#" },
      { store: "Amazon", price: 112999, url: "#" },
      { store: "Croma", price: 114999, url: "#" },
    ],
  },
  {
    id: "4",
    name: "Dyson V15 Detect Cordless Vacuum",
    description: "Reveals microscopic dust with laser technology. Most powerful suction of any cordless vacuum.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600",
    price: 52900,
    originalPrice: 62900,
    discount: 16,
    rating: 4.6,
    reviews: 4300,
    category: "home",
    store: "Amazon",
    storeLogo: "🏠",
    dealScore: 7.8,
    inStock: true,
    features: ["Laser Dust Detection", "60min Battery", "HEPA Filtration"],
    priceComparison: [
      { store: "Amazon", price: 52900, url: "#" },
      { store: "Croma", price: 54900, url: "#" },
    ],
  },
  {
    id: "5",
    name: "Levi's 501 Original Fit Jeans",
    description: "The original blue jean since 1873. Straight leg, button fly, iconic fit.",
    image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=600",
    price: 2799,
    originalPrice: 5599,
    discount: 50,
    rating: 4.4,
    reviews: 15600,
    category: "fashion",
    store: "Myntra",
    storeLogo: "👖",
    badge: "Limited Deal",
    dealScore: 9.0,
    inStock: true,
    features: ["100% Cotton", "Button Fly", "Straight Fit"],
    priceComparison: [
      { store: "Myntra", price: 2799, url: "#" },
      { store: "AJIO", price: 3199, url: "#" },
      { store: "Amazon", price: 3499, url: "#" },
    ],
  },
  {
    id: "6",
    name: "Apple MacBook Air M3 13-inch",
    description: "Supercharged by M3 chip. Up to 18 hours of battery life, fanless design.",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600",
    price: 104900,
    originalPrice: 114900,
    discount: 9,
    rating: 4.9,
    reviews: 18200,
    category: "electronics",
    store: "Amazon",
    storeLogo: "💻",
    badge: "Top Pick",
    dealScore: 8.2,
    inStock: true,
    features: ["M3 Chip", "18hr Battery", "Liquid Retina Display", "Fanless"],
    priceComparison: [
      { store: "Amazon", price: 104900, url: "#" },
      { store: "Flipkart", price: 105900, url: "#" },
      { store: "Croma", price: 109900, url: "#" },
    ],
  },
  {
    id: "7",
    name: "boAt Airdopes 141 TWS Earbuds",
    description: "42 hours playback, ENx noise cancellation, low latency mode for gaming.",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=600",
    price: 1099,
    originalPrice: 4490,
    discount: 76,
    rating: 4.1,
    reviews: 89000,
    category: "electronics",
    store: "Amazon",
    storeLogo: "🎧",
    badge: "Best Value",
    dealScore: 9.5,
    inStock: true,
    features: ["42hr Playback", "ENx™ Tech", "IPX4 Water Resistant"],
    priceComparison: [
      { store: "Amazon", price: 1099, url: "#" },
      { store: "Flipkart", price: 1199, url: "#" },
    ],
  },
  {
    id: "8",
    name: "The Ordinary Niacinamide 10% + Zinc 1%",
    description: "High-strength vitamin and mineral blemish formula for oily skin.",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600",
    price: 590,
    originalPrice: 850,
    discount: 31,
    rating: 4.3,
    reviews: 34000,
    category: "beauty",
    store: "Nykaa",
    storeLogo: "✨",
    badge: "Trending",
    dealScore: 8.7,
    inStock: true,
    features: ["For Oily Skin", "Reduces Blemishes", "Cruelty Free"],
    priceComparison: [
      { store: "Nykaa", price: 590, url: "#" },
      { store: "Amazon", price: 650, url: "#" },
    ],
  },
  {
    id: "9",
    name: "PlayStation 5 Slim Console",
    description: "Experience lightning-fast loading, haptic feedback, and stunning 4K gaming.",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600",
    price: 44990,
    originalPrice: 54990,
    discount: 18,
    rating: 4.8,
    reviews: 9200,
    category: "gaming",
    store: "Flipkart",
    storeLogo: "🎮",
    badge: "Hot",
    dealScore: 8.9,
    inStock: true,
    features: ["4K Gaming", "DualSense Controller", "825GB SSD", "Ray Tracing"],
    priceComparison: [
      { store: "Flipkart", price: 44990, url: "#" },
      { store: "Amazon", price: 46990, url: "#" },
      { store: "Croma", price: 49990, url: "#" },
    ],
  },
  {
    id: "10",
    name: "IKEA KALLAX Shelf Unit",
    description: "Versatile shelving unit that works as room divider, display, or storage.",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600",
    price: 6990,
    originalPrice: 9990,
    discount: 30,
    rating: 4.2,
    reviews: 5600,
    category: "home",
    store: "Amazon",
    storeLogo: "🏠",
    dealScore: 8.1,
    inStock: true,
    features: ["Modular Design", "Easy Assembly", "Multiple Colors"],
    priceComparison: [
      { store: "Amazon", price: 6990, url: "#" },
      { store: "Flipkart", price: 7490, url: "#" },
    ],
  },
  {
    id: "11",
    name: "Adidas Ultraboost Light Running Shoes",
    description: "The lightest Ultraboost ever. 30% lighter with responsive BOOST cushioning.",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600",
    price: 11999,
    originalPrice: 16999,
    discount: 29,
    rating: 4.6,
    reviews: 6700,
    category: "sports",
    store: "AJIO",
    storeLogo: "👟",
    badge: "New Arrival",
    dealScore: 8.4,
    inStock: true,
    features: ["BOOST Cushioning", "Primeknit Upper", "Continental Outsole"],
    priceComparison: [
      { store: "AJIO", price: 11999, url: "#" },
      { store: "Myntra", price: 12499, url: "#" },
      { store: "Amazon", price: 13499, url: "#" },
    ],
  },
  {
    id: "12",
    name: "Atomic Habits by James Clear",
    description: "Tiny changes, remarkable results. The #1 New York Times bestseller.",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600",
    price: 350,
    originalPrice: 799,
    discount: 56,
    rating: 4.7,
    reviews: 120000,
    category: "books",
    store: "Amazon",
    storeLogo: "📚",
    badge: "Best Seller",
    dealScore: 9.3,
    inStock: true,
    features: ["Paperback", "320 Pages", "Self-Help"],
    priceComparison: [
      { store: "Amazon", price: 350, url: "#" },
      { store: "Flipkart", price: 375, url: "#" },
    ],
  },
];

export const bannerSlides = [
  {
    id: 1,
    title: "Mega Electronics Sale",
    subtitle: "Up to 70% off on headphones, laptops & more",
    cta: "Shop Now",
    gradient: "from-primary to-blue-700",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
  },
  {
    id: 2,
    title: "Fashion Fiesta",
    subtitle: "Trending styles at unbeatable prices",
    cta: "Explore Deals",
    gradient: "from-secondary to-orange-600",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800",
  },
  {
    id: 3,
    title: "Smart Home Essentials",
    subtitle: "Transform your living space with top picks",
    cta: "View Collection",
    gradient: "from-emerald-600 to-teal-700",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800",
  },
];
