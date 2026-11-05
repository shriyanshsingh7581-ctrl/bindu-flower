import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { SmartImage } from '../components/SmartImage';
import { ASSET_MANIFEST } from '../data/seedData';

export const HomePage: React.FC = () => {
  const { products, reviews, websiteSettings } = useStore();
  const [reviewIndex, setReviewIndex] = useState(0);

  const enabledProducts = products.filter((p) => p.isEnabled);

  // Exact product slices matching every section in the BalloonDekor video
  const birthdayProducts = enabledProducts
    .filter((p) => p.categoryId === 'birthday')
    .slice(0, 4);

  const halloweenProducts = enabledProducts
    .filter((p) => p.subcategoryId === 'halloween')
    .slice(0, 4);

  const anniversaryProducts = enabledProducts
    .filter((p) => p.categoryId === 'anniversary' || p.categoryId === 'romantic')
    .slice(0, 4);

  const welcomeBabyProducts = enabledProducts
    .filter((p) => p.subcategoryId === 'newborn-welcome')
    .slice(0, 4);

  const babyShowerProducts = enabledProducts
    .filter((p) => p.subcategoryId === 'baby-shower')
    .slice(0, 4);

  const balloonHamperProducts = enabledProducts
    .filter((p) => p.subcategoryId === 'balloon-bouquets')
    .slice(0, 4);

  const bacheloretteProducts = enabledProducts
    .filter((p) => p.subcategoryId === 'bachelorette')
    .slice(0, 4);

  const weddingCarProducts = enabledProducts
    .filter((p) => p.subcategoryId === 'wedding-car' || p.subcategoryId === 'car-boot')
    .slice(0, 4);

  const shopAndOfficeProducts = enabledProducts
    .filter((p) => p.subcategoryId === 'shop-opening' || p.subcategoryId === 'corporate')
    .slice(0, 4);

  const diwaliAndBinduProducts = enabledProducts
    .filter(
      (p) =>
        p.subcategoryId === 'diwali' ||
        p.subcategoryId === 'bindu-flower-decor' ||
        p.subcategoryId === 'haldi'
    )
    .slice(0, 4);

  // 8 Main Service Cards (Video 00:03 - 00:04)
  const topServiceCards = [
    {
      label: 'Birthday Decoration',
      to: '/collections/birthday',
      bg: 'bg-[#FDEBF0]',
      img: ASSET_MANIFEST.birthdayRoseGold,
    },
    {
      label: 'Kids Party Decoration',
      to: '/collections/kids-themes',
      bg: 'bg-[#E6F4FE]',
      img: ASSET_MANIFEST.kidsTheme,
    },
    {
      label: 'Newborn Welcome',
      to: '/collections/baby-kids?sub=newborn-welcome',
      bg: 'bg-[#FCEEE9]',
      img: ASSET_MANIFEST.welcomeBabyRing,
    },
    {
      label: 'Baby Shower Decor',
      to: '/collections/baby-kids?sub=baby-shower',
      bg: 'bg-[#F3EDFC]',
      img: ASSET_MANIFEST.babyShower,
    },
    {
      label: 'Wedding Decorations',
      to: '/collections/wedding',
      bg: 'bg-[#FEF7E0]',
      img: ASSET_MANIFEST.weddingHaldi,
    },
    {
      label: 'Corporate Events',
      to: '/collections/other?sub=shop-opening',
      bg: 'bg-[#E8F4FE]',
      img: ASSET_MANIFEST.blackGoldMilestone,
    },
    {
      label: 'Halloween Decor',
      to: '/collections/other?sub=halloween',
      bg: 'bg-[#FDF0E6]',
      img: ASSET_MANIFEST.blackGoldMilestone,
    },
    {
      label: 'Diwali Decor',
      to: '/collections/other?sub=diwali',
      bg: 'bg-[#FEF4DC]',
      img: ASSET_MANIFEST.weddingHaldi,
    },
  ];

  // 6 Kids Birthday Theme Cards (Video 00:19, 00:26 - 00:27)
  const kidsThemeCards = [
    {
      label: 'Cocomelon',
      to: '/product/cocomelon-kids-birthday-decoration',
      bg: 'bg-[#FFF5F5]',
      img: ASSET_MANIFEST.kidsTheme,
    },
    {
      label: 'Baby Shark',
      to: '/product/baby-shark-kids-birthday-decoration',
      bg: 'bg-[#F0F8FF]',
      img: ASSET_MANIFEST.welcomeBabyRing,
    },
    {
      label: 'Boss Baby',
      to: '/product/boss-baby-kids-birthday-decoration',
      bg: 'bg-[#F4F6F9]',
      img: ASSET_MANIFEST.blackGoldMilestone,
    },
    {
      label: 'Jungle Theme',
      to: '/product/wild-one-jungle-safari-theme-kids-birthday-decor',
      bg: 'bg-[#F1F8E9]',
      img: ASSET_MANIFEST.jungleSafariKids,
    },
    {
      label: 'Frozen Theme',
      to: '/product/frozen-theme-kids-birthday-decoration',
      bg: 'bg-[#EBF8FF]',
      img: ASSET_MANIFEST.kidsTheme,
    },
    {
      label: 'Mermaid Theme',
      to: '/product/mermaid-and-unicorn-pastel-theme-decor',
      bg: 'bg-[#FDF2F8]',
      img: ASSET_MANIFEST.babyShower,
    },
  ];

  // 6 Wedding Collection Cards: "From Haldi to Honeymoon" (Video 00:29 - 00:30)
  const weddingCollectionCards = [
    {
      label: 'Bridal Shower',
      to: '/collections/wedding?sub=bachelorette',
      bg: 'bg-[#FFF0F3]',
      img: ASSET_MANIFEST.blackGoldMilestone,
    },
    {
      label: 'Haldi Decor',
      to: '/collections/wedding?sub=haldi',
      bg: 'bg-[#FFF3F5]',
      img: ASSET_MANIFEST.weddingHaldi,
    },
    {
      label: 'Mehndi Decor',
      to: '/collections/wedding?sub=mehndi',
      bg: 'bg-[#FFF0F3]',
      img: ASSET_MANIFEST.weddingHaldi,
    },
    {
      label: 'Wedding Car',
      to: '/collections/wedding?sub=wedding-car',
      bg: 'bg-[#FFF0F3]',
      img: ASSET_MANIFEST.carBootSurprise,
    },
    {
      label: 'Bride Welcome',
      to: '/collections/wedding?sub=bride-welcome',
      bg: 'bg-[#FFF0F3]',
      img: ASSET_MANIFEST.romanticRedRoom,
    },
    {
      label: 'First Night',
      to: '/collections/wedding?sub=first-night',
      bg: 'bg-[#FFF0F3]',
      img: ASSET_MANIFEST.romanticAnniversary,
    },
  ];

  const SectionHeading: React.FC<{
    title: string;
    subtitle?: string;
    viewAllLink?: string;
  }> = ({ title, subtitle, viewAllLink }) => (
    <div className="flex items-center justify-between gap-3 mb-4">
      <div className="flex items-start gap-2.5">
        <span className="w-1 h-6 sm:h-7 rounded-full bg-[#D8315B] shrink-0 mt-0.5" />
        <div>
          <h2 className="text-lg sm:text-2xl font-extrabold text-[#1C1618] leading-tight">
            {title}
          </h2>
          {subtitle && <p className="text-xs text-[#6E5D5F] mt-0.5">{subtitle}</p>}
        </div>
      </div>

      {viewAllLink && (
        <Link
          to={viewAllLink}
          className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[#FFF0F3] text-[#D8315B] text-xs font-bold hover:bg-[#fde0e6] transition-colors shrink-0"
        >
          <span>View all</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-4 space-y-9">
      {/* 1. Festive Diwali Hero Banner Card (Exact Match to Video 00:01 - 00:03) */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#FDF5E6] via-[#FCEBD2] to-[#FAD8B4] border border-[#E6C594]/60 shadow-xs">
        {/* Decorative Marigold Garland Toran Strip at Top */}
        <div
          aria-hidden="true"
          className="w-full py-1.5 px-2 bg-[#FDF5E6]/60 flex items-center justify-between overflow-hidden select-none text-sm sm:text-base border-b border-[#E6C594]/40"
        >
          {Array.from({ length: 18 }).map((_, i) => (
            <span key={i} className="shrink-0">
              {i % 2 === 0 ? '🌼' : '🏵️'}
            </span>
          ))}
        </div>

        <div className="p-5 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-3">
            <p className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-[#8C3B2B]">
              THE FESTIVE EDIT <span className="text-[#D97706] mx-1">✦</span> DIWALI
            </p>
            <h1 className="text-2xl sm:text-5xl font-extrabold leading-[1.15] text-[#4A1C17]">
              A little light.
              <br />
              <span className="text-[#C82333]">A lot of celebration.</span>
            </h1>
            <p className="text-xs sm:text-base text-[#6E473B] max-w-md leading-relaxed">
              Make your home glow with love, light & beautiful decor.
            </p>
            <div className="pt-2">
              <Link
                to="/collections/other?sub=diwali"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#C82333] text-white text-xs sm:text-sm font-bold hover:bg-[#a71d2a] transition-colors shadow-sm"
              >
                <span>Explore Diwali decor</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Festive Diyas & Marigold Visual */}
          <div className="lg:col-span-5 flex items-center justify-end">
            <div className="relative w-full max-w-xs sm:max-w-sm aspect-[16/10] rounded-2xl overflow-hidden border-2 border-[#D97706]/30 shadow-md">
              <SmartImage
                src={ASSET_MANIFEST.weddingHaldi}
                alt="Festive Diwali Marigold & Diya Decoration"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3A1618]/70 via-transparent to-transparent flex items-end p-3">
                <span className="text-white text-xs font-bold">
                  🪔 Marigold, Rangoli & Fairy Lights · Starting ₹1,499
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. "Professional Balloon Decoration Services..." + 8-Item Pastel Category Grid (Video 00:03 - 00:04) */}
      <section className="space-y-4">
        <div className="flex items-start gap-2.5">
          <span className="w-1 h-10 sm:h-11 rounded-full bg-[#D8315B] shrink-0 mt-0.5" />
          <div>
            <h2 className="text-base sm:text-2xl font-extrabold text-[#1C1618] leading-snug">
              Professional Balloon Decoration Services for Birthdays, Anniversaries and Baby Showers
            </h2>
            <p className="text-xs text-[#6E5D5F] mt-0.5">
              Trusted by 5 Lacs+ Clients Across India
            </p>
          </div>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 sm:gap-4">
          {topServiceCards.map((card) => (
            <Link
              key={card.label}
              to={card.to}
              className="group flex flex-col items-center text-center"
            >
              <div
                className={`w-full aspect-square rounded-2xl ${card.bg} p-1.5 sm:p-2 overflow-hidden border border-[#1C1618]/6 group-hover:border-[#D8315B] transition-all`}
              >
                <SmartImage
                  src={card.img}
                  alt={card.label}
                  className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <span className="text-[11px] sm:text-xs font-semibold text-[#1C1618] mt-1.5 leading-tight group-hover:text-[#D8315B]">
                {card.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Promotional Banner: "Kids' Birthday Decorations - Starts at ₹1,499" (Video 00:04 - 00:05) */}
      <section className="rounded-3xl overflow-hidden bg-gradient-to-r from-[#FFF0F3] via-[#FDE2E8] to-[#FAD1DC] border border-[#D8315B]/15 p-5 sm:p-8 grid grid-cols-12 gap-4 items-center">
        <div className="col-span-7 sm:col-span-7 space-y-1.5 sm:space-y-2.5">
          <span className="text-xs font-extrabold text-[#D8315B] lowercase">
            {websiteSettings.brandName}
          </span>
          <h3 className="text-lg sm:text-3xl font-extrabold text-[#1C1618] leading-tight">
            Kids’ Birthday
            <br />
            Decorations
          </h3>
          <p className="text-xs sm:text-sm font-bold text-[#1C1618]">Starts at ₹1,499</p>
          <div className="pt-1">
            <Link
              to="/collections/kids-themes"
              className="inline-block px-4 py-2 rounded-lg bg-[#D8315B] text-white text-xs font-bold hover:bg-[#b8254a] transition-colors"
            >
              Explore Now
            </Link>
          </div>
        </div>
        <div className="col-span-5 sm:col-span-5">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/60 shadow-sm">
            <SmartImage
              src={ASSET_MANIFEST.kidsTheme}
              alt="Kids Birthday Decorations Starts at ₹1,499"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 4. Birthday Decoration Section (Video 00:05 - 00:08) */}
      <section>
        <SectionHeading title="Birthday Decoration" viewAllLink="/collections/birthday" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6">
          {birthdayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Promotional Banner: "Diwali, beautifully decorated." (Video 00:06 - 00:08) */}
      <section className="rounded-3xl overflow-hidden bg-gradient-to-r from-[#FFF8EB] via-[#FCEBD2] to-[#F7D7A8] border border-[#D97706]/25 p-5 sm:p-8 grid grid-cols-12 gap-4 items-center">
        <div className="col-span-7 space-y-1.5 sm:space-y-2.5">
          <span className="text-xs font-extrabold text-[#D8315B] lowercase">
            {websiteSettings.brandName}
          </span>
          <h3 className="text-lg sm:text-3xl font-extrabold text-[#1C1618] leading-tight">
            <span className="text-[#C82333] italic font-serif-display">Diwali,</span>
            <br />
            beautifully
            <br />
            decorated.
          </h3>
          <p className="text-[11px] sm:text-xs text-[#555555]">
            Festive setups for homes & offices
          </p>
          <div className="pt-1">
            <Link
              to="/collections/other?sub=diwali"
              className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-[#C82333] text-white text-[11px] sm:text-xs font-bold hover:bg-[#a71d2a] transition-colors"
            >
              <span>Explore Diwali Decor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
        <div className="col-span-5">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#D97706]/30 shadow-sm">
            <SmartImage
              src={ASSET_MANIFEST.weddingHaldi}
              alt="Diwali beautifully decorated"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 6. Kids Birthday Decorations: 6 Character Themes Grid (Video 00:19, 00:26 - 00:27) */}
      <section>
        <SectionHeading
          title="Kids Birthday Decorations"
          subtitle="Fun-Filled Themes for Every Celebration!"
          viewAllLink="/collections/kids-themes"
        />
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
          {kidsThemeCards.map((theme) => (
            <Link
              key={theme.label}
              to={theme.to}
              className="group flex flex-col items-center text-center bg-white rounded-2xl p-2 border border-[#1C1618]/8 hover:border-[#D8315B] transition-all shadow-2xs"
            >
              <div className={`w-full aspect-square rounded-xl ${theme.bg} overflow-hidden mb-2`}>
                <SmartImage
                  src={theme.img}
                  alt={theme.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <span className="text-xs font-bold text-[#1C1618] group-hover:text-[#D8315B]">
                {theme.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. Spooky Halloween Decorations (Video 00:27) */}
      <section>
        <SectionHeading
          title="Spooky Halloween Decorations"
          subtitle="Decor to Die For"
          viewAllLink="/collections/other?sub=halloween"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6">
          {halloweenProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 8. Romantic Anniversary Decoration (Video 00:28 - 00:29) */}
      <section>
        <SectionHeading
          title="Romantic Anniversary Decoration"
          viewAllLink="/collections/anniversary"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6">
          {anniversaryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 9. The Wedding Collection: "From Haldi to Honeymoon" 6-Card Grid (Video 00:29 - 00:30) */}
      <section>
        <SectionHeading
          title="The Wedding Collection"
          subtitle="From Haldi to Honeymoon"
          viewAllLink="/collections/wedding"
        />
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
          {weddingCollectionCards.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="group flex flex-col items-center text-center rounded-2xl bg-[#FFF0F3] p-2 border border-[#D8315B]/15 hover:border-[#D8315B] transition-all"
            >
              <div className="w-full aspect-square rounded-xl overflow-hidden bg-white mb-2">
                <SmartImage
                  src={item.img}
                  alt={item.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <span className="text-xs font-bold text-[#1C1618] group-hover:text-[#D8315B] pb-0.5">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 10. Welcome Baby Decoration (Video 00:30 - 00:31) */}
      <section>
        <SectionHeading
          title="Welcome Baby Decoration"
          viewAllLink="/collections/baby-kids?sub=newborn-welcome"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6">
          {welcomeBabyProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 11. Baby Shower Decoration (Video 00:31 - 00:32) */}
      <section>
        <SectionHeading
          title="Baby Shower Decoration"
          viewAllLink="/collections/baby-kids?sub=baby-shower"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6">
          {babyShowerProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 12. Balloon Hampers (Video 00:32) */}
      <section>
        <SectionHeading
          title="Balloon Hampers"
          viewAllLink="/collections/other?sub=balloon-bouquets"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6">
          {balloonHamperProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 13. Bachelorette Party (Video 00:33) */}
      <section>
        <SectionHeading
          title="Bachelorette Party"
          viewAllLink="/collections/wedding?sub=bachelorette"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6">
          {bacheloretteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 14. Corporate Event Planner Banner (Video 00:33) */}
      <section className="rounded-3xl overflow-hidden bg-gradient-to-r from-[#EBF4FA] via-[#DCEBFA] to-[#C7E0F8] border border-[#1E40AF]/15 p-5 sm:p-8 grid grid-cols-12 gap-4 items-center">
        <div className="col-span-7 space-y-1.5 sm:space-y-2">
          <h3 className="text-lg sm:text-3xl font-extrabold text-[#1E3A8A] leading-tight">
            CORPORATE{' '}
            <span className="italic font-serif-display font-normal text-[#1C1618]">
              Event Planner
            </span>
          </h3>
          <p className="text-xs sm:text-sm font-medium text-[#334155]">
            Get Your <strong className="text-[#1E3A8A]">Decoration</strong> Done in Just{' '}
            <strong className="text-[#1E3A8A]">2 Hours</strong>
          </p>
          <div className="pt-1.5">
            <Link
              to="/collections/other?sub=shop-opening"
              className="inline-block px-4 py-2 rounded-lg bg-[#1E3A8A] text-white text-[11px] sm:text-xs font-extrabold uppercase tracking-wider hover:bg-[#172554] transition-colors"
            >
              ORDER NOW
            </Link>
          </div>
        </div>
        <div className="col-span-5">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/60 shadow-sm">
            <SmartImage
              src={ASSET_MANIFEST.blackGoldMilestone}
              alt="Corporate Event Planner"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 15. Car Decoration for Wedding (Video 00:34) */}
      <section>
        <SectionHeading
          title="Car Decoration for Wedding"
          viewAllLink="/collections/wedding?sub=wedding-car"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6">
          {weddingCarProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 16. Shop and Office Decor (Video 00:34 - 00:35) */}
      <section>
        <SectionHeading
          title="Shop and Office Decor"
          viewAllLink="/collections/other?sub=shop-opening"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6">
          {shopAndOfficeProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 17. Diwali, Haldi & Bindu Flower Collection (Video 00:21) */}
      <section>
        <SectionHeading
          title="Diwali, Haldi & Bindu Flower Decor"
          viewAllLink="/collections/other?sub=diwali"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6">
          {diwaliAndBinduProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 18. Customer Reviews Section (Exact Match to Video 00:35 - 00:36) */}
      <section className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-1 h-6 rounded-full bg-[#D8315B]" />
            <h2 className="text-lg sm:text-2xl font-extrabold text-[#1C1618]">
              Customer Reviews
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setReviewIndex((i) => Math.max(0, i - 1))}
              aria-label="Previous review"
              className="w-9 h-9 rounded-full border border-[#1C1618]/15 flex items-center justify-center text-[#1C1618] hover:border-[#D8315B]"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() =>
                setReviewIndex((i) => (i + 1 < reviews.length ? i + 1 : 0))
              }
              aria-label="Next review"
              className="w-9 h-9 rounded-full border border-[#1C1618]/15 flex items-center justify-center text-[#1C1618] hover:border-[#D8315B]"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Aggregate Score Header (4.7 ★★★★★) */}
        <div className="flex items-center gap-2.5">
          <span className="text-3xl font-extrabold text-[#1C1618] tabular-nums">4.7</span>
          <div>
            <div className="text-sm text-[#F59E0B] tracking-wider">★★★★★</div>
            <p className="text-xs text-[#6E5D5F]">{reviews.length + 5} reviews</p>
          </div>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reviews.map((rev, idx) => {
            const initials = rev.userName
              .split(' ')
              .map((n) => n[0])
              .join('')
              .slice(0, 2)
              .toUpperCase();
            return (
              <div
                key={rev.id}
                className={`rounded-2xl border p-5 flex flex-col justify-between min-h-[190px] transition-all ${
                  idx === reviewIndex
                    ? 'border-[#D8315B]/30 bg-white shadow-xs'
                    : 'border-[#1C1618]/10 bg-white'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FDE2E8] text-[#D8315B] font-extrabold text-xs flex items-center justify-center shrink-0">
                      {initials}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#1C1618]">{rev.userName}</p>
                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="font-bold text-[#1C1618] tabular-nums">
                          {rev.rating.toFixed(1)}
                        </span>
                        <span className="text-[#F59E0B]">★★★★★</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-[#444444] leading-relaxed">
                    {rev.comment}
                  </p>
                </div>

                <p className="text-xs text-[#6E5D5F] pt-4 mt-4 border-t border-[#1C1618]/6">
                  {rev.city}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 19. Exact BalloonDekor Editorial Content Block (Matches Video 00:36 - 00:38 Word-for-Word) */}
      <section className="pt-6 border-t border-[#1C1618]/10 space-y-6 text-xs sm:text-sm text-[#444444] leading-relaxed">
        <div className="space-y-2.5">
          <h2 className="text-base sm:text-xl font-extrabold text-[#1C1618]">
            Balloon Decoration at Home, Booked Online in Two Minutes
          </h2>
          <p>
            Somewhere in India right now, someone is calling their fourth decorator of the day. The
            first one did not pick up. The second quoted a price and then changed it. The third sent
            photos that clearly belonged to someone else’s work. The event is tomorrow.
          </p>
          <p>This is the problem {websiteSettings.brandName} was built to solve.</p>
          <p>
            We turned decoration booking into something you can finish during a tea break. Browse
            real photos of real setups, pick the one you want, select your city and time slot, and
            pay online. On the day of your event, a verified decorator shows up with every balloon,
            backdrop, light, and prop included in your package. They set it up, clean up after
            themselves, and leave you with a room that looks exactly like the photo you booked.
          </p>
          <p>
            No haggling. No follow-up calls. No last-minute disappointments. Packages start at ₹999,
            and same-day slots are open in most cities if you book before noon.
          </p>
        </div>

        <div className="space-y-2.5">
          <h2 className="text-base sm:text-xl font-extrabold text-[#1C1618]">
            Birthday Decoration That Actually Matches the Photos
          </h2>
          <p>
            Birthdays drive more bookings on {websiteSettings.brandName} than any other occasion,
            and the reason is simple - people have been burned before. They have paid for a
            “premium setup” and received twelve balloons taped to a wall.
          </p>
          <p>
            Every design in our{' '}
            <Link to="/collections/birthday" className="text-[#D8315B] underline font-medium">
              birthday decorations
            </Link>{' '}
            collection is photographed from an actual home setup. Simple ring arches with foil
            numbers start under Rs 1,500. Full theme setups with backdrops, fairy lights, and custom
            name boards go up from there. You see the finished result before you pay a rupee, and
            the decorator recreates that exact design in your space.
          </p>
          <p>
            Celebrating a child? Our{' '}
            <Link to="/collections/kids-themes" className="text-[#D8315B] underline font-medium">
              kids theme decorations
            </Link>{' '}
            cover the characters kids actually ask for - Cocomelon, Baby Shark, Frozen, Jungle,
            Mermaid, Boss Baby. A five-year-old walking into a room full of their favourite
            characters is a reaction worth every rupee.
          </p>
        </div>

        <div className="space-y-2.5">
          <h2 className="text-base sm:text-xl font-extrabold text-[#1C1618]">
            Anniversary and Romantic Setups Done Right
          </h2>
          <p>
            Surprise decorations have zero margin for error. The timing has to be exact - you need
            the room ready before your partner walks in, and you need the setup crew gone by then.
          </p>
          <p>
            Our{' '}
            <Link to="/collections/anniversary" className="text-[#D8315B] underline font-medium">
              anniversary decorations
            </Link>{' '}
            are planned around exactly this. Decorators arrive at your chosen slot, work fast, and
            finish before the moment arrives. Heart foils, rose gold palettes, candle pathways,
            photo strings - the designs range from simple and sweet to full room transformations.
          </p>
          <p>
            Planning something bigger than an anniversary? Our{' '}
            <Link
              to="/collections/romantic?sub=proposal"
              className="text-[#D8315B] underline font-medium"
            >
              proposal decorations
            </Link>{' '}
            create the kind of setting where the question feels as big as it is. And for occasions
            that deserve a more intimate touch, our{' '}
            <Link
              to="/collections/romantic?sub=canopy"
              className="text-[#D8315B] underline font-medium"
            >
              room decorations
            </Link>{' '}
            convert bedrooms and living rooms into spaces that feel nothing like everyday life.
          </p>
        </div>

        <div className="space-y-2.5">
          <h2 className="text-base sm:text-xl font-extrabold text-[#1C1618]">
            Baby Showers and Newborn Welcomes
          </h2>
          <p>
            There is a short window in life when a family celebrates a baby who has not arrived yet,
            and another when they welcome one home. Both deserve more than a rushed banner.
          </p>
          <p>
            Our{' '}
            <Link
              to="/collections/baby-kids?sub=baby-shower"
              className="text-[#D8315B] underline font-medium"
            >
              baby shower decorations
            </Link>{' '}
            lean into soft pastels, Oh Baby wall setups, floral backdrops, and gender reveal
            arrangements. Everything is designed around the mother-to-be, because the photos from
            this day get looked at for decades.
          </p>
          <p>
            When the baby comes home, our{' '}
            <Link
              to="/collections/baby-kids?sub=newborn-welcome"
              className="text-[#D8315B] underline font-medium"
            >
              newborn welcome decoration
            </Link>{' '}
            service makes the homecoming feel like the milestone it is. Families often book this
            from the hospital itself - the setup is ready before the car pulls in, and the first
            photos at home are ones worth framing.
          </p>
        </div>

        <div className="space-y-2.5">
          <h2 className="text-base sm:text-xl font-extrabold text-[#1C1618]">
            Wedding Functions, From Haldi to First Night
          </h2>
          <p>
            Indian weddings are five events wrapped into one week, and not every function needs a
            five-lakh decorator. Our{' '}
            <Link to="/collections/wedding" className="text-[#D8315B] underline font-medium">
              Haldi, Mehndi, Bride Welcome, Wedding Car, and First Night decorations
            </Link>{' '}
            deliver marigold arches, Bindu Flower floral backdrops, and floor seating arrangements
            that photograph beautifully in homes and banquet halls alike.
          </p>
        </div>
      </section>
    </div>
  );
};
