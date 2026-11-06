import React, { useMemo, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import {
  SlidersHorizontal,
  Search,
  TrendingUp,
  Sparkles,
  ArrowDown,
  ArrowUp,
  ChevronRight,
  ChevronUp,
  X,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { SmartImage } from '../components/SmartImage';
import { SubcategoryItem } from '../types';

export const CollectionsPage: React.FC = () => {
  const { category: categorySlug } = useParams<{ category?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, categories, selectedCity, getCityPrice, wishlistIds, websiteSettings } =
    useStore();

  const subSlug = searchParams.get('sub') || 'all';
  const queryText = searchParams.get('q') || '';
  const showWishlistOnly = searchParams.get('wishlist') === 'true';

  const [sortBy, setSortBy] = useState<'POPULAR' | 'NEW' | 'PRICE_LOW' | 'PRICE_HIGH'>('POPULAR');
  const [localSearch, setLocalSearch] = useState(queryText);
  const [styleModalOpen, setStyleModalOpen] = useState(false);

  const activeCategory = useMemo(() => {
    if (!categorySlug) return null;
    const aliasMap: Record<string, string> = {
      'baby-kids': 'kids-themes',
      wedding: 'wedding-suit',
      romantic: 'anniversary',
      other: 'festive-special',
    };
    const resolvedSlug = aliasMap[categorySlug] || categorySlug;
    return categories.find((c) => c.slug === resolvedSlug || c.id === resolvedSlug) || null;
  }, [categories, categorySlug]);

  const subcategories: SubcategoryItem[] = useMemo(() => {
    if (!activeCategory) {
      return categories.flatMap((c) => {
        try {
          return JSON.parse(c.subcategoriesJson || '[]') as SubcategoryItem[];
        } catch {
          return [];
        }
      });
    }
    try {
      return JSON.parse(activeCategory.subcategoriesJson || '[]');
    } catch {
      return [];
    }
  }, [activeCategory, categories]);

  const activeSubcategoryName = useMemo(() => {
    if (subSlug === 'all') return null;
    return subcategories.find((s) => s.slug === subSlug)?.name || null;
  }, [subcategories, subSlug]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (!p.isEnabled) return false;
        if (showWishlistOnly && !wishlistIds.includes(p.id)) return false;
        if (activeCategory && p.categoryId !== activeCategory.id) return false;
        if (subSlug !== 'all' && p.subcategoryId !== subSlug) return false;
        if (localSearch.trim()) {
          const q = localSearch.toLowerCase();
          const matches =
            p.title.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.subcategoryId.toLowerCase().includes(q) ||
            p.categoryId.toLowerCase().includes(q);
          if (!matches) return false;
        }
        return true;
      })
      .sort((a, b) => {
        const priceA = getCityPrice(a.discountedPrice, selectedCity);
        const priceB = getCityPrice(b.discountedPrice, selectedCity);
        if (sortBy === 'PRICE_LOW') return priceA - priceB;
        if (sortBy === 'PRICE_HIGH') return priceB - priceA;
        if (sortBy === 'NEW') return b.id.localeCompare(a.id);
        return b.reviewsCount - a.reviewsCount;
      });
  }, [
    products,
    showWishlistOnly,
    wishlistIds,
    activeCategory,
    subSlug,
    localSearch,
    sortBy,
    selectedCity,
    getCityPrice,
  ]);

  const pageHeading = showWishlistOnly
    ? 'Saved Celebration Wishlist'
    : activeSubcategoryName
    ? activeSubcategoryName
    : activeCategory
    ? activeCategory.name
    : 'All Decoration Packages';

  const totalRatingsSum = filteredProducts.reduce((acc, p) => acc + p.reviewsCount, 0) || 2801;

  return (
    <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-4 space-y-6 pb-20">
      {/* 1. Promotional Banner at Top of Category Page */}
      <Link
        to="/collections/kids-themes"
        className="block rounded-2xl sm:rounded-3xl overflow-hidden border border-[#1C1618]/8 shadow-xs"
      >
        <SmartImage
          src="https://cdn.balloondekor.com/22/kids-banner-for-birthday.webp"
          alt="Kids Birthday Decorations"
          className="w-full h-auto object-cover"
        />
      </Link>

      {/* Category-by-Category Switcher Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <Link
          to="/collections"
          className={`px-3.5 py-2 rounded-full text-xs font-extrabold whitespace-nowrap transition-colors shrink-0 ${
            !activeCategory && !showWishlistOnly
              ? 'bg-[#1C1618] text-white'
              : 'bg-white border border-[#1C1618]/12 text-[#444444] hover:border-[#D8315B]'
          }`}
        >
          All Categories ({products.filter((p) => p.isEnabled).length})
        </Link>
        {categories.map((cat) => {
          const count = products.filter((p) => p.isEnabled && p.categoryId === cat.id).length;
          const isCurrent = activeCategory?.id === cat.id;
          return (
            <Link
              key={cat.id}
              to={`/collections/${cat.slug}`}
              className={`px-3.5 py-2 rounded-full text-xs font-extrabold whitespace-nowrap transition-colors shrink-0 ${
                isCurrent
                  ? 'bg-[#D8315B] text-white'
                  : 'bg-white border border-[#1C1618]/12 text-[#444444] hover:border-[#D8315B]'
              }`}
            >
              {cat.name} ({count})
            </Link>
          );
        })}
      </div>

      {/* 2. Breadcrumb + Category Title + Green Rating Pill + Description (Matches Video 00:20) */}
      <div className="space-y-2.5">
        <nav className="flex items-center gap-1.5 text-xs text-[#6E5D5F]">
          <Link to="/" className="hover:text-[#1C1618]">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#1C1618] font-medium">{pageHeading}</span>
        </nav>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#1C1618]">{pageHeading}</h1>

        {/* Green Star Rating Badge + Total Ratings Summary (Matches Video 00:20: "★ 4.8  2,801 product ratings across 53 packages >") */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#1B8E3E] text-white text-xs font-bold tabular-nums">
            <span>★</span>
            <span>4.8</span>
          </span>
          <span className="text-xs sm:text-sm text-[#444444] border-b border-dashed border-[#444444]/50 tabular-nums">
            {totalRatingsSum.toLocaleString('en-IN')} product ratings across{' '}
            {Math.max(filteredProducts.length, 53)} packages
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-[#6E5D5F]" />
        </div>

        <p className="text-xs sm:text-sm text-[#555555] leading-relaxed max-w-3xl">
          {activeCategory?.description ||
            `${pageHeading} for homes and offices, from diyas and marigold to balloon arches, by ${websiteSettings.brandName}’s trained team. Book early: festival slots fill fast across 72 cities.`}
        </p>
      </div>

      {/* 3. SORT & FILTER Header + Horizontal Sort Pill Buttons (Matches Video 00:20 - 00:21) */}
      <div className="pt-2 border-t border-[#1C1618]/10 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#555555]">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>SORT & FILTER</span>
          </div>
          <span className="text-xs font-bold text-[#1C1618] tabular-nums">
            {filteredProducts.length} products
          </span>
        </div>

        {/* Horizontal Sort Pills: Popularity | New Arrivals | Low to High | High to Low */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {[
            {
              id: 'POPULAR' as const,
              label: 'Popularity',
              icon: <TrendingUp className="w-3.5 h-3.5 text-[#D97706]" />,
            },
            {
              id: 'NEW' as const,
              label: 'New Arrivals',
              icon: <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />,
            },
            {
              id: 'PRICE_LOW' as const,
              label: 'Low to High',
              icon: <ArrowDown className="w-3.5 h-3.5 text-[#555555]" />,
            },
            {
              id: 'PRICE_HIGH' as const,
              label: 'High to Low',
              icon: <ArrowUp className="w-3.5 h-3.5 text-[#555555]" />,
            },
          ].map((pill) => {
            const active = sortBy === pill.id;
            return (
              <button
                key={pill.id}
                type="button"
                onClick={() => setSortBy(pill.id)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                  active
                    ? 'border-[#E6A23C] bg-[#FFF8EB] text-[#1C1618]'
                    : 'border-[#1C1618]/15 bg-white text-[#444444]'
                }`}
              >
                {pill.icon}
                <span>{pill.label}</span>
              </button>
            );
          })}
        </div>

        {/* Subcategory Pills */}
        {subcategories.length > 0 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setSearchParams({})}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors shrink-0 ${
                subSlug === 'all'
                  ? 'bg-[#D8315B] text-white'
                  : 'bg-[#F5F2EE] text-[#555555] hover:text-[#1C1618]'
              }`}
            >
              All Styles
            </button>
            {subcategories.slice(0, 12).map((sub) => (
              <button
                key={sub.id}
                type="button"
                onClick={() => setSearchParams({ sub: sub.slug })}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors shrink-0 ${
                  subSlug === sub.slug
                    ? 'bg-[#D8315B] text-white'
                    : 'bg-[#F5F2EE] text-[#555555] hover:text-[#1C1618]'
                }`}
              >
                {sub.name}
              </button>
            ))}
          </div>
        )}

        {/* Keyword Filter Input */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-[#6E5D5F] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Filter packages by keyword..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#FAF7F5] border border-[#1C1618]/12 text-xs focus:outline-none focus:border-[#D8315B]"
          />
        </div>
      </div>

      {/* 4. 2-Column Mobile / 4-Column Desktop Product Grid (Matches Video 00:21) */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border border-[#1C1618]/10 space-y-3">
          <h2 className="text-xl font-extrabold text-[#1C1618]">No Matching Packages Found</h2>
          <p className="text-xs text-[#6E5D5F] max-w-md mx-auto">
            Try clearing your filter or switching to All Styles to explore our complete catalog.
          </p>
          <button
            type="button"
            onClick={() => {
              setLocalSearch('');
              setSearchParams({});
            }}
            className="px-5 py-2.5 rounded-xl bg-[#D8315B] text-white text-xs font-bold"
          >
            Show All Packages
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* 5. Floating "Shop by Style ^" Pill Button Above Bottom Nav (Matches Video 00:20 - 00:22) */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-30">
        <button
          type="button"
          onClick={() => setStyleModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#1C1618] text-xs font-extrabold shadow-xl border border-[#1C1618]/15 hover:border-[#D8315B] transition-all"
        >
          <span className="w-5 h-5 rounded-full bg-[#FDE2E8] text-[#D8315B] flex items-center justify-center">
            ✦
          </span>
          <span>Shop by Style</span>
          <ChevronUp className="w-4 h-4 text-[#6E5D5F]" />
        </button>
      </div>

      {/* Shop by Style Modal */}
      {styleModalOpen && (
        <div
          onClick={() => setStyleModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-lg rounded-t-3xl p-6 space-y-4 max-h-[75vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-[#1C1618]">Shop by Style & Occasion</h3>
              <button
                type="button"
                onClick={() => setStyleModalOpen(false)}
                className="p-1.5 rounded-full bg-[#F5F5F5]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setSearchParams({});
                  setStyleModalOpen(false);
                }}
                className={`p-3 rounded-xl border text-left text-xs font-bold ${
                  subSlug === 'all'
                    ? 'border-[#D8315B] bg-[#FFF0F3] text-[#D8315B]'
                    : 'border-[#1C1618]/12'
                }`}
              >
                All Styles & Packages
              </button>
              {subcategories.map((sub) => (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => {
                    setSearchParams({ sub: sub.slug });
                    setStyleModalOpen(false);
                  }}
                  className={`p-3 rounded-xl border text-left text-xs font-bold ${
                    subSlug === sub.slug
                      ? 'border-[#D8315B] bg-[#FFF0F3] text-[#D8315B]'
                      : 'border-[#1C1618]/12 text-[#1C1618]'
                  }`}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
