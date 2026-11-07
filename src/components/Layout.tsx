import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  MapPin,
  Search,
  ShoppingBag,
  User,
  X,
  ChevronDown,
  PhoneCall,
  Download,
  Sparkles,
  Home,
  LayoutGrid,
  MessageCircle,
  Menu,
  Store,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { usePWAInstall, useOnlineStatus } from '../hooks/usePWAInstall';
import { ASSET_MANIFEST } from '../data/seedData';
import { SmartImage } from './SmartImage';
import { SubcategoryItem } from '../types';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    categories,
    products,
    cities,
    selectedCity,
    setSelectedCityById,
    cart,
    currentUser,
    isAdmin,
    websiteSettings,
    toasts,
    dismissToast,
  } = useStore();

  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const isOnline = useOnlineStatus();
  const navigate = useNavigate();
  const location = useLocation();

  const [cityModalOpen, setCityModalOpen] = useState(false);
  const [categorySheetOpen, setCategorySheetOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMegaCategory, setActiveMegaCategory] = useState<string | null>(null);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const isFranchisePage =
    location.pathname === '/franchise' || location.pathname === '/partner-with-us';

  const searchSuggestions =
    searchQuery.trim().length > 1
      ? products
          .filter(
            (p) =>
              p.isEnabled &&
              (p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.subcategoryId.toLowerCase().includes(searchQuery.toLowerCase()))
          )
          .slice(0, 6)
      : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchOpen(false);
    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  // Exact 18 Categories for the "Browse by Category" Bottom Sheet (Real BalloonDekor CDN Images)
  const browseSheetItems = [
    {
      label: 'Birthday',
      to: '/collections/birthday',
      bg: 'bg-[#FDEBF0]',
      img: 'https://cdn.balloondekor.com/14/1783495663745-250562.webp',
    },
    {
      label: 'Kids Theme',
      to: '/collections/kids-themes',
      bg: 'bg-[#E6F4FE]',
      img: 'https://cdn.balloondekor.com/28/1783496201847-869620.webp',
    },
    {
      label: 'Baby Shower',
      to: '/collections/baby-shower',
      bg: 'bg-[#FDEBF0]',
      img: 'https://cdn.balloondekor.com/26/1783497454656-860123.webp',
    },
    {
      label: 'Welcome Baby',
      to: '/collections/newborn-welcome',
      bg: 'bg-[#FCEEE9]',
      img: 'https://cdn.balloondekor.com/20/1783496718581-460460.webp',
    },
    {
      label: 'Naming Ceremony',
      to: '/collections/newborn-welcome?sub=naming-ceremony',
      bg: 'bg-[#FEF7E0]',
      img: 'https://cdn.balloondekor.com/60/1783499200860-468520.webp',
    },
    {
      label: 'Annaprashan',
      to: '/collections/festive-special?sub=annaprashan-decor',
      bg: 'bg-[#FDF0E6]',
      img: 'https://cdn.balloondekor.com/46/1783495041838-587763.webp',
    },
    {
      label: 'Corporate Event',
      to: '/collections/corporate-events',
      bg: 'bg-[#EAFBF0]',
      img: 'https://cdn.balloondekor.com/22/1783500025210-352976.webp',
    },
    {
      label: 'Car Boot Decoration',
      to: '/collections/car-decoration?sub=car-boot-decor',
      bg: 'bg-[#E8F2FC]',
      img: 'https://cdn.balloondekor.com/22/1783500678436-422519.webp',
    },
    {
      label: 'Canopy Decoration',
      to: '/collections/romantic-surprises?sub=canopy-setup',
      bg: 'bg-[#FDECEB]',
      img: 'https://cdn.balloondekor.com/22/1783500843904-747603.webp',
    },
    {
      label: 'Proposal Decoration',
      to: '/collections/romantic-surprises?sub=marry-me-proposal',
      bg: 'bg-[#FDEBF0]',
      img: 'https://cdn.balloondekor.com/24/1783499548047-113043.webp',
    },
    {
      label: 'Bachelorette Decoration',
      to: '/collections/bachelorette',
      bg: 'bg-[#F4EDFC]',
      img: 'https://cdn.balloondekor.com/22/1783502003537-46026.webp',
    },
    {
      label: 'Wedding Decoration',
      to: '/collections/wedding-suit',
      bg: 'bg-[#FDECEB]',
      img: 'https://cdn.balloondekor.com/43/1783498211378-409579.webp',
    },
    {
      label: 'First Night',
      to: '/collections/wedding-suit?sub=first-night',
      bg: 'bg-[#FDF2EA]',
      img: 'https://cdn.balloondekor.com/22/1783501549308-261786.webp',
    },
    {
      label: 'Anniversary Decoration',
      to: '/collections/anniversary',
      bg: 'bg-[#FDECEB]',
      img: 'https://cdn.balloondekor.com/22/1783502314282-483479.webp',
    },
    {
      label: 'Aqiqah Decoration',
      to: '/collections/newborn-welcome',
      bg: 'bg-[#FDF4EB]',
      img: 'https://cdn.balloondekor.com/22/1783501156590-854997.webp',
    },
    {
      label: 'Diwali Decoration',
      to: '/collections/festive-special?sub=diwali-decor',
      bg: 'bg-[#FEF6E0]',
      img: 'https://cdn.balloondekor.com/22/diwali-decor.webp',
    },
    {
      label: 'Halloween Decor',
      to: '/collections/halloween-decor',
      bg: 'bg-[#FDF0E6]',
      img: 'https://cdn.balloondekor.com/22/haloween-category-image.webp',
    },
    {
      label: 'Balloon Hampers',
      to: '/collections/balloon-bouquets',
      bg: 'bg-[#FDEBF0]',
      img: 'https://cdn.balloondekor.com/48/cute-happy-birthday-balloon-bouquet.webp',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1C1618]">
      {/* 1. Official Festive Diwali Ribbon with SVG Marigold Sprigs & Glowing Diya Lamp */}
      {isFranchisePage ? (
        <div className="bg-[#0F172A] text-white text-[11px] sm:text-xs px-3 py-1.5 text-center font-medium">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-1.5 flex-wrap">
            <span>Franchise applications are now open for selected cities across India.</span>
            <a href="#franchise-form" className="text-[#FBBF24] underline font-bold">
              Apply Now
            </a>
          </div>
        </div>
      ) : (
        <div className="bd-diwali-ribbon">
          <svg
            className="bd-diwali-ribbon-flower"
            viewBox="0 0 100 30"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <radialGradient id="bd-header-marigold" cx=".3" cy=".25" r=".8">
                <stop stopColor="#ffe9a1" />
                <stop offset=".55" stopColor="#ffc34f" />
                <stop offset="1" stopColor="#df8824" />
              </radialGradient>
              <g id="bd-header-bloom" fill="url(#bd-header-marigold)">
                <ellipse rx="4" ry="10" />
                <ellipse rx="4" ry="10" transform="rotate(45)" />
                <ellipse rx="4" ry="10" transform="rotate(90)" />
                <ellipse rx="4" ry="10" transform="rotate(135)" />
                <circle r="4" fill="#efaa36" />
              </g>
              <g id="bd-header-sprig">
                <path d="M1 13Q35 28 88 9" stroke="#c69b57" strokeWidth="1" />
                <path
                  d="M22 18q-1-14 16-15-1 12-16 15Zm39-1q13-8 20 0-9 10-20 0Z"
                  fill="#6f8b4f"
                />
                <use href="#bd-header-bloom" x="7" y="13" />
                <use href="#bd-header-bloom" x="43" y="18" />
                <use href="#bd-header-bloom" x="90" y="9" />
              </g>
            </defs>
            <use href="#bd-header-sprig" />
          </svg>

          <div className="bd-diwali-ribbon-copy">
            <svg width="19" height="22" viewBox="0 0 26 28" fill="none" aria-hidden="true">
              <defs>
                <linearGradient id="bd-header-lamp" x2="0" y2="1">
                  <stop stopColor="#e88462" />
                  <stop offset="1" stopColor="#a42e48" />
                </linearGradient>
              </defs>
              <path d="M13 15c-8-4-3-9 1-14 1 6 7 11-1 14Z" fill="#f7bf52" />
              <path d="M13 15c-3-2-1-5 1-7 2 4 3 6-1 7Z" fill="#fff4c3" />
              <path d="M2 17h22c-2 8-20 10-22 0Z" fill="url(#bd-header-lamp)" />
              <ellipse cx="13" cy="17" rx="11" ry="3" fill="#edb16e" />
              <ellipse cx="13" cy="17" rx="8" ry="1.7" fill="#c87538" />
              <path d="M13 17v-3" stroke="#824630" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <strong>Happy Diwali</strong>
            <span className="bd-diwali-ribbon-detail">
              <span aria-hidden="true">✦</span> A little light, a lot of love
            </span>
          </div>

          <svg
            className="bd-diwali-ribbon-flower end"
            viewBox="0 0 100 30"
            fill="none"
            aria-hidden="true"
          >
            <use href="#bd-header-sprig" />
          </svg>
        </div>
      )}

      {/* 2. Main Header Bar with Festive Diwali Golden Scalloped Trim */}
      <header
        data-diwali-header="true"
        onMouseLeave={() => setActiveMegaCategory(null)}
        className="sticky top-0 z-40 bg-white border-b border-[#efd6b5]"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 h-14 sm:h-16">
          {/* Left: Hamburger + Brand Logo with "Rajasthan ka event expert" in small letters above "Bindu flower" */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setCategorySheetOpen(true)}
              aria-label="Open categories menu"
              className="p-1.5 -ml-1.5 text-[#1C1618] hover:text-[#D8315B] transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link to="/" className="flex flex-col leading-none">
              <span className="text-[10px] sm:text-[11px] font-medium text-[#555555] tracking-normal mb-0.5">
                Rajasthan ka event expert
              </span>
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#D8315B]">
                {websiteSettings.brandName}
              </span>
            </Link>
          </div>

          {/* Center Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-[#333333]">
            <Link
              to="/collections/birthday"
              onMouseEnter={() => setActiveMegaCategory('birthday')}
              className="hover:text-[#D8315B] transition-colors py-2"
            >
              Birthday
            </Link>
            <Link
              to="/collections/kids-themes"
              onMouseEnter={() => setActiveMegaCategory('kids-themes')}
              className="hover:text-[#D8315B] transition-colors py-2"
            >
              Kids Themes
            </Link>
            <Link
              to="/collections/anniversary"
              onMouseEnter={() => setActiveMegaCategory('anniversary')}
              className="hover:text-[#D8315B] transition-colors py-2"
            >
              Anniversary
            </Link>
            <Link
              to="/collections/baby-shower"
              onMouseEnter={() => setActiveMegaCategory('baby-shower')}
              className="hover:text-[#D8315B] transition-colors py-2"
            >
              Baby Shower
            </Link>
            <Link
              to="/collections/wedding-suit"
              onMouseEnter={() => setActiveMegaCategory('wedding-suit')}
              className="hover:text-[#D8315B] transition-colors py-2"
            >
              Wedding & Haldi
            </Link>
            <Link
              to="/collections/festive-special"
              className="hover:text-[#D8315B] transition-colors py-2"
            >
              Diwali & Floral
            </Link>
          </nav>

          {/* Right: Search Icon, Bag Icon, User Icon, Admin Panel Button */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Search decorations"
              className="p-1.5 text-[#1C1618] hover:text-[#D8315B] transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              to="/cart"
              aria-label="Shopping bag"
              className="relative p-1.5 text-[#1C1618] hover:text-[#D8315B] transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#D8315B] text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
                  {totalCartItems}
                </span>
              )}
            </Link>

            <Link
              to={currentUser ? '/account' : '/login'}
              aria-label="Customer account"
              className="p-1.5 text-[#1C1618] hover:text-[#D8315B] transition-colors"
            >
              <User className="w-5 h-5" />
            </Link>

            {!isInstalled && isInstallable && (
              <button
                type="button"
                onClick={install}
                className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#1B8E3E] text-white text-xs font-semibold"
              >
                <Download className="w-3.5 h-3.5" />
                <span>App</span>
              </button>
            )}
          </div>
        </div>

        {/* Desktop Mega Menu Dropdown */}
        {activeMegaCategory && (
          <div
            onMouseLeave={() => setActiveMegaCategory(null)}
            className="hidden lg:block absolute left-0 right-0 top-full bg-white border-b border-[#1C1618]/10 shadow-xl z-50"
          >
            <div className="max-w-7xl mx-auto px-8 py-6 grid grid-cols-4 gap-8">
              {categories
                .filter((c) => c.id === activeMegaCategory)
                .map((cat) => {
                  let subs: SubcategoryItem[] = [];
                  try {
                    subs = JSON.parse(cat.subcategoriesJson || '[]');
                  } catch {
                    subs = [];
                  }
                  return (
                    <div key={cat.id}>
                      <Link
                        to={`/collections/${cat.slug}`}
                        onClick={() => setActiveMegaCategory(null)}
                        className="text-base font-bold text-[#1C1618] hover:text-[#D8315B] block mb-2.5"
                      >
                        {cat.name}
                      </Link>
                      <ul className="space-y-1.5 text-xs text-[#555555]">
                        {subs.map((sub) => (
                          <li key={sub.id}>
                            <Link
                              to={`/collections/${cat.slug}?sub=${sub.slug}`}
                              onClick={() => setActiveMegaCategory(null)}
                              className="hover:text-[#D8315B] transition-colors block py-0.5"
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              <div className="col-span-3 grid grid-cols-3 gap-6 border-l border-[#1C1618]/8 pl-8">
                {products
                  .filter((p) => p.categoryId === activeMegaCategory && p.isEnabled)
                  .slice(0, 3)
                  .map((prod) => (
                    <Link
                      key={prod.id}
                      to={`/product/${prod.slug}`}
                      onClick={() => setActiveMegaCategory(null)}
                      className="group block"
                    >
                      <div className="aspect-square rounded-xl overflow-hidden bg-[#F7F3EE] mb-2">
                        <SmartImage
                          src={prod.primaryImage}
                          alt={prod.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <p className="text-xs font-bold text-[#1C1618] group-hover:text-[#D8315B] line-clamp-1">
                        {prod.title}
                      </p>
                      <p className="text-xs font-bold text-[#1C1618] tabular-nums">
                        ₹{prod.discountedPrice.toLocaleString('en-IN')}
                      </p>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* 3. Festive Warm Sub-Header Bar: "Deliver to: Select your city" + "Partner with us" */}
      {!isFranchisePage && (
        <div data-diwali-city="true" className="bg-[#FFF0F3] border-b border-[#f0dece]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setCityModalOpen(true)}
              className="flex items-center gap-2 text-left group"
            >
              <div className="w-7 h-7 rounded-full bg-[#D8315B]/12 flex items-center justify-center text-[#D8315B] shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="leading-tight">
                <span className="block text-[10px] text-[#6E5D5F]">Deliver to</span>
                <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#D8315B]">
                  <span>{selectedCity ? selectedCity.name : 'Select your city'}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </span>
              </div>
            </button>

            <Link
              to="/franchise"
              className="px-3.5 py-1.5 rounded-full bg-white border border-[#D8315B]/25 text-xs font-semibold text-[#1C1618] hover:border-[#D8315B] transition-colors shadow-2xs whitespace-nowrap"
            >
              Partner with us
            </Link>
          </div>
        </div>
      )}

      {/* Expandable Search Drawer */}
      {searchOpen && (
        <div className="border-b border-[#1C1618]/10 bg-white px-4 py-3 shadow-md z-30">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center gap-2">
              <Search className="w-4 h-4 text-[#6E5D5F] absolute left-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Simple Balloon Decor, Rose Gold, Cocomelon, Diwali, Welcome Baby..."
                autoFocus
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#1C1618]/15 text-xs sm:text-sm focus:outline-none focus:border-[#D8315B]"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-[#D8315B] text-white text-xs font-bold hover:bg-[#b8254a] whitespace-nowrap"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-2 text-[#6E5D5F] hover:text-[#1C1618]"
              >
                <X className="w-4 h-4" />
              </button>
            </form>

            {searchSuggestions.length > 0 && (
              <div className="mt-2.5 divide-y divide-[#1C1618]/8 border border-[#1C1618]/10 rounded-xl overflow-hidden bg-white">
                {searchSuggestions.map((item) => (
                  <Link
                    key={item.id}
                    to={`/product/${item.slug}`}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center justify-between p-2.5 hover:bg-[#FFF0F3]/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <SmartImage
                        src={item.primaryImage}
                        alt={item.title}
                        className="w-11 h-11 object-cover rounded-lg"
                      />
                      <div>
                        <p className="text-xs font-bold text-[#1C1618]">{item.title}</p>
                        <p className="text-[11px] text-[#6E5D5F]">
                          ★ {item.rating.toFixed(1)} · {item.reviewsCount} reviews
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-[#D8315B] tabular-nums">
                      ₹{item.discountedPrice.toLocaleString('en-IN')}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 pb-24">{children}</main>

      {/* 4. Exact BalloonDekor White Card Footer with Festive Diwali Marigold Toran Trim */}
      <footer className="px-3 sm:px-6 lg:px-8 pb-24 pt-6 bg-[#FAF7F5]">
        <div className="relative overflow-hidden max-w-7xl mx-auto bg-white rounded-3xl border border-[#f5dccd] p-6 sm:p-10 pt-14 sm:pt-16 shadow-xs">
          <div
            aria-hidden="true"
            className="bd-diwali-garland opacity-85"
          />
          <div className="space-y-4 pb-6 border-b border-[#1C1618]/10">
            <Link to="/" className="inline-flex flex-col leading-none">
              <span className="text-[10px] sm:text-[11px] font-medium text-[#555555] mb-0.5">
                Rajasthan ka event expert
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#D8315B]">
                {websiteSettings.brandName}
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-[#555555] max-w-md leading-relaxed">
              Premium balloon decorations & party setups delivered across India with love.
            </p>

            <p className="text-base sm:text-lg font-extrabold text-[#1C1618] tabular-nums">
              <a
                href={`tel:${(websiteSettings.supportPhone || '+919983562406').replace(/\s+/g, '')}`}
                className="hover:text-[#D8315B] transition-colors"
              >
                {websiteSettings.supportPhone || '+91 99835 62406'}
              </a>
            </p>

            {/* Social Media Circles (Matches Video 00:39) */}
            <div className="flex items-center gap-3 pt-1">
              {[
                { label: 'Instagram', text: 'IG' },
                { label: 'Facebook', text: 'f' },
                { label: 'Pinterest', text: 'P' },
                { label: 'LinkedIn', text: 'in' },
                { label: 'X', text: '𝕏' },
              ].map((soc) => (
                <a
                  key={soc.label}
                  href="#top"
                  aria-label={soc.label}
                  className="w-9 h-9 rounded-full border border-[#1C1618]/15 flex items-center justify-center text-xs font-bold text-[#1C1618] hover:border-[#D8315B] hover:text-[#D8315B] transition-colors"
                >
                  {soc.text}
                </a>
              ))}
            </div>
          </div>

          {/* 2-Column Links Grid: IMPORTANT LINKS & INFO (Matches Video 00:39) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 py-6 border-b border-[#1C1618]/10 text-xs sm:text-sm">
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#1C1618] mb-3.5">
                IMPORTANT LINKS
              </h3>
              <ul className="space-y-2.5 text-[#444444]">
                <li>
                  <Link to="/terms-and-conditions" className="hover:text-[#D8315B]">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/about-us" className="hover:text-[#D8315B]">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/payment-info" className="hover:text-[#D8315B]">
                    Disclaimer & Payment Info
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy" className="hover:text-[#D8315B]">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/cancellation-policy" className="hover:text-[#D8315B]">
                    Cancellation Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#1C1618] mb-3.5">
                INFO
              </h3>
              <ul className="space-y-2.5 text-[#444444]">
                <li>
                  <Link to="/contact-us" className="hover:text-[#D8315B]">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/collections" className="hover:text-[#D8315B]">
                    Sitemap
                  </Link>
                </li>
                <li>
                  <Link to="/our-work" className="hover:text-[#D8315B]">
                    Our Recent Work
                  </Link>
                </li>
                <li>
                  <Link to="/franchise" className="hover:text-[#D8315B]">
                    International Presence & Franchise
                  </Link>
                </li>
                <li>
                  <Link to="/blogs" className="hover:text-[#D8315B]">
                    Read Blogs
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#1C1618] mb-3.5">
                POPULAR CATEGORIES
              </h3>
              <ul className="space-y-2 text-xs text-[#444444]">
                <li>
                  <Link to="/collections/birthday" className="hover:text-[#D8315B]">
                    Birthday Decoration at Home
                  </Link>
                </li>
                <li>
                  <Link to="/collections/kids-themes" className="hover:text-[#D8315B]">
                    Kids Birthday Themes
                  </Link>
                </li>
                <li>
                  <Link to="/collections/anniversary" className="hover:text-[#D8315B]">
                    Romantic Anniversary Decor
                  </Link>
                </li>
                <li>
                  <Link to="/collections/baby-shower" className="hover:text-[#D8315B]">
                    Baby Shower & Welcome Baby
                  </Link>
                </li>
                <li>
                  <Link to="/collections/festive-special" className="hover:text-[#D8315B]">
                    Diwali & Bindu Flower Special
                  </Link>
                </li>
                <li>
                  <Link to="/collections/corporate-events" className="hover:text-[#D8315B]">
                    Shop & Office Opening Decor
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-5 text-center space-y-2 text-xs text-[#6E5D5F]">
            <p>© 2026 {websiteSettings.brandName.toLowerCase().replace(/\s+/g, '')}.com · All Rights Reserved</p>
            <div className="flex items-center justify-center gap-4">
              <Link to="/privacy-policy" className="hover:text-[#1C1618]">
                Privacy
              </Link>
              <Link to="/terms-and-conditions" className="hover:text-[#1C1618]">
                Terms
              </Link>
              <Link to="/payment-info" className="hover:text-[#1C1618]">
                Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* 5. "Browse by Category" Bottom Sheet Drawer (Exact Match to Video 00:40 - 00:43) */}
      {categorySheetOpen && (
        <div
          onClick={() => setCategorySheetOpen(false)}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-2xl rounded-t-3xl p-5 sm:p-6 max-h-[82vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom duration-200"
          >
            {/* Top Drag Handle Bar */}
            <div className="w-12 h-1.5 bg-[#E0DCD8] rounded-full mx-auto mb-4" />

            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg sm:text-xl font-extrabold text-[#1C1618]">
                Browse by Category
              </h2>
              <button
                type="button"
                onClick={() => setCategorySheetOpen(false)}
                className="p-1.5 rounded-full bg-[#F5F5F5] text-[#555555] hover:text-[#1C1618]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 pb-6">
              {browseSheetItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setCategorySheetOpen(false)}
                  className="flex flex-col items-center text-center group"
                >
                  <div
                    className={`w-full aspect-square rounded-2xl ${item.bg} p-2 flex items-center justify-center overflow-hidden border border-[#1C1618]/6 group-hover:border-[#D8315B] transition-all`}
                  >
                    <SmartImage
                      src={item.img}
                      alt={item.label}
                      className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-xs font-semibold text-[#1C1618] mt-1.5 leading-tight group-hover:text-[#D8315B]">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. City Selection Modal */}
      {cityModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-xl border border-[#1C1618]/10">
            <div className="flex items-center justify-between pb-4 border-b border-[#1C1618]/8">
              <div>
                <h2 className="text-xl font-extrabold text-[#1C1618]">
                  Select Your Celebration City
                </h2>
                <p className="text-xs text-[#6E5D5F]">
                  Same-day doorstep decoration across 72+ cities in India
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCityModalOpen(false)}
                className="p-1.5 rounded-lg text-[#6E5D5F] hover:text-[#1C1618]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 my-5 max-h-[60vh] overflow-y-auto">
              {cities
                .filter((c) => c.isEnabled)
                .map((city) => {
                  const active = city.id === selectedCity.id;
                  return (
                    <button
                      key={city.id}
                      type="button"
                      onClick={() => {
                        setSelectedCityById(city.id);
                        setCityModalOpen(false);
                      }}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        active
                          ? 'border-[#D8315B] bg-[#FFF0F3] text-[#D8315B]'
                          : 'border-[#1C1618]/12 hover:border-[#D8315B]/40 text-[#1C1618]'
                      }`}
                    >
                      <p className="text-xs sm:text-sm font-bold">{city.name}</p>
                      <p className="text-[10px] text-[#6E5D5F] truncate">{city.state}</p>
                    </button>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* iOS PWA Install Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-bold text-[#1C1618]">
              Install {websiteSettings.brandName} App
            </h3>
            <p className="mt-2 text-xs text-[#6E5D5F] leading-relaxed">
              1. Tap the <strong>Share</strong> icon in Safari.
              <br />
              2. Select <strong>Add to Home Screen</strong>.
            </p>
            <button
              type="button"
              onClick={() => setShowIOSGuide(false)}
              className="mt-4 w-full rounded-xl bg-[#D8315B] py-2.5 text-xs font-semibold text-white"
            >
              Got It
            </button>
          </div>
        </div>
      )}

      {/* Offline Banner */}
      {!isOnline && (
        <div className="fixed bottom-20 left-4 z-50 flex items-center gap-2 rounded-xl bg-[#D97706] px-4 py-2 text-xs font-semibold text-white shadow-lg">
          <span>Offline Mode — Showing cached catalog</span>
        </div>
      )}

      {/* Toast Notifications */}
      <div className="fixed bottom-20 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-xl shadow-lg text-xs font-medium border ${
              t.type === 'error'
                ? 'bg-[#C93B2B] text-white border-[#C93B2B]'
                : t.type === 'info'
                ? 'bg-[#1C1618] text-white border-[#1C1618]'
                : 'bg-[#1B8E3E] text-white border-[#1B8E3E]'
            }`}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>{t.title}</span>
            </div>
            <button type="button" onClick={() => dismissToast(t.id)}>
              <X className="w-3.5 h-3.5 opacity-80 hover:opacity-100" />
            </button>
          </div>
        ))}
      </div>

      {/* 7. Exact 5-Tab Bottom Navigation Bar (Matches Video 00:01 - 00:54: Home | Categories | WhatsApp | Call | Get Franchise) */}
      {!isFranchisePage && (
        <nav
          aria-label="Bottom Navigation"
          className="fixed bottom-0 left-0 right-0 z-40 h-16 bg-white border-t border-[#1C1618]/10 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2"
        >
          <div className="max-w-xl mx-auto h-full grid grid-cols-5 items-center text-[11px] font-semibold text-[#444444]">
            {/* Tab 1: Home */}
            <Link
              to="/"
              onClick={() => setCategorySheetOpen(false)}
              className={`flex flex-col items-center justify-center gap-0.5 py-1 rounded-xl mx-1 transition-colors ${
                location.pathname === '/' && !categorySheetOpen
                  ? 'bg-[#FFF0F3] text-[#D8315B] font-bold'
                  : 'hover:text-[#D8315B]'
              }`}
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>

            {/* Tab 2: Categories (Opens Browse by Category Sheet - Video 00:40) */}
            <button
              type="button"
              onClick={() => setCategorySheetOpen((prev) => !prev)}
              className={`flex flex-col items-center justify-center gap-0.5 py-1 rounded-xl mx-1 transition-colors ${
                categorySheetOpen || location.pathname.startsWith('/collections')
                  ? 'bg-[#FFF0F3] text-[#D8315B] font-bold'
                  : 'hover:text-[#D8315B]'
              }`}
            >
              <LayoutGrid className="w-5 h-5" />
              <span>Categories</span>
            </button>

            {/* Tab 3: WhatsApp (Elevated Green Circle) */}
            <a
              href={`https://wa.me/${websiteSettings.whatsappNumber || '919983562406'}?text=${encodeURIComponent(
                `Hi ${websiteSettings.brandName}! I want to book a decoration setup in ${selectedCity.name}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-0.5 -mt-3"
            >
              <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-md ring-4 ring-white">
                <MessageCircle className="w-5 h-5 fill-white" />
              </div>
              <span className="text-[#1C1618] font-semibold">WhatsApp</span>
            </a>

            {/* Tab 4: Call (Dials +91 99835 62406) */}
            <a
              href={`tel:${(websiteSettings.supportPhone || '+919983562406').replace(/\s+/g, '')}`}
              className="flex flex-col items-center justify-center gap-0.5 py-1 rounded-xl mx-1 hover:text-[#D8315B] transition-colors"
            >
              <PhoneCall className="w-5 h-5" />
              <span>Call</span>
            </a>

            {/* Tab 5: Get Franchise with NEW Badge (Video 00:01 & 00:55) */}
            <Link
              to="/franchise"
              onClick={() => setCategorySheetOpen(false)}
              className="relative flex flex-col items-center justify-center gap-0.5 py-1 rounded-xl mx-0.5 bg-[#FFF4E5] text-[#D97706] font-bold"
            >
              <span className="absolute -top-1.5 right-1 px-1.5 py-0.2 rounded-full bg-[#FBBF24] text-[#1C1618] text-[8px] font-extrabold uppercase">
                NEW
              </span>
              <Store className="w-5 h-5 text-[#EA580C]" />
              <span className="text-[10px] text-[#9A3412] whitespace-nowrap">Get Franchise</span>
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
};
