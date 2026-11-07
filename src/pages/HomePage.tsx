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

  // Strict category-by-category deduplication so no product or photo ever appears twice on the homepage
  const usedIds = new Set<string>();
  const usedImages = new Set<string>();
  const takeUniqueByCategory = (categoryId: string, limit = 5) => {
    const result = [];
    for (const p of enabledProducts) {
      if (p.categoryId !== categoryId) continue;
      if (usedIds.has(p.id) || usedImages.has(p.primaryImage)) continue;
      usedIds.add(p.id);
      usedImages.add(p.primaryImage);
      result.push(p);
      if (result.length >= limit) break;
    }
    return result;
  };

  const birthdayProducts = takeUniqueByCategory('birthday', 5);
  const kidsThemeProducts = takeUniqueByCategory('kids-themes', 8);
  const halloweenProducts = takeUniqueByCategory('halloween-decor', 8);
  const anniversaryProducts = takeUniqueByCategory('anniversary', 5);
  const welcomeBabyProducts = takeUniqueByCategory('newborn-welcome', 5);
  const babyShowerProducts = takeUniqueByCategory('baby-shower', 5);
  const balloonHamperProducts = takeUniqueByCategory('balloon-bouquets', 5);
  const bacheloretteProducts = takeUniqueByCategory('bachelorette', 5);
  const weddingCarProducts = takeUniqueByCategory('car-decoration', 6);
  const shopAndOfficeProducts = takeUniqueByCategory('corporate-events', 5);
  const weddingHaldiProducts = takeUniqueByCategory('wedding-suit', 8);
  const diwaliAndBinduProducts = takeUniqueByCategory('festive-special', 5);
  const canopyProposalProducts = takeUniqueByCategory('romantic-surprises', 4);

  // 8 Main Service Cards (Exact BalloonDekor CDN Images)
  const topServiceCards = [
    {
      label: 'Birthday Decoration',
      to: '/collections/birthday',
      bg: 'bg-[#FDEBF0]',
      img: 'https://cdn.balloondekor.com/33/birthday-decoration-d67f374a-0151-409d-96ea-36e9527e0ffc.webp',
    },
    {
      label: 'Kids Party Decoration',
      to: '/collections/kids-themes',
      bg: 'bg-[#E6F4FE]',
      img: 'https://cdn.balloondekor.com/33/kids-birthday-decoration-4b6bce2b-e65d-40fa-bdea-3f1367688305.webp',
    },
    {
      label: 'Newborn Welcome',
      to: '/collections/newborn-welcome',
      bg: 'bg-[#FCEEE9]',
      img: 'https://cdn.balloondekor.com/33/newborn-welcome.webp',
    },
    {
      label: 'Baby Shower Decor',
      to: '/collections/baby-shower',
      bg: 'bg-[#F3EDFC]',
      img: 'https://cdn.balloondekor.com/33/baby-shower-decoration-1ba3a3a3-d2eb-40e6-98bd-aed4eb907984.webp',
    },
    {
      label: 'Wedding Decorations',
      to: '/collections/wedding-suit',
      bg: 'bg-[#FEF7E0]',
      img: 'https://cdn.balloondekor.com/33/wedding-decoration-0c8b0952-fe10-44cb-ac91-8f640239beaf.webp',
    },
    {
      label: 'Corporate Events',
      to: '/collections/corporate-events',
      bg: 'bg-[#E8F4FE]',
      img: 'https://cdn.balloondekor.com/33/office-decoration-b84c3312-f4cd-4baf-8d1f-b03d28c61242.webp',
    },
    {
      label: 'Halloween Decor',
      to: '/collections/halloween-decor',
      bg: 'bg-[#FDF0E6]',
      img: 'https://cdn.balloondekor.com/22/haloween-category-image.webp',
    },
    {
      label: 'Diwali Decor',
      to: '/collections/festive-special',
      bg: 'bg-[#FEF4DC]',
      img: 'https://cdn.balloondekor.com/22/diwali-decor.webp',
    },
  ];

  // 6 Kids Birthday Theme Cards (Exact BalloonDekor CDN Images)
  const kidsThemeCards = [
    {
      label: 'Cocomelon',
      to: '/collections/kids-themes?sub=cocomelon-theme',
      bg: 'bg-[#FFF5F5]',
      img: 'https://cdn.balloondekor.com/images/33/dbe87a70-56bc-42bc-ad96-2847b88c00dd.webp',
    },
    {
      label: 'Baby Shark',
      to: '/collections/kids-themes?sub=baby-shark',
      bg: 'bg-[#F0F8FF]',
      img: 'https://cdn.balloondekor.com/images/33/63f93c9c-e24f-483c-88bb-b7352cfd564b.webp',
    },
    {
      label: 'Boss Baby',
      to: '/collections/kids-themes?sub=boss-baby',
      bg: 'bg-[#F4F6F9]',
      img: 'https://cdn.balloondekor.com/images/33/509c9e90-fa70-4e5b-bfa0-dd873fc0919e.webp',
    },
    {
      label: 'Jungle Theme',
      to: '/collections/kids-themes?sub=jungle-safari',
      bg: 'bg-[#F1F8E9]',
      img: 'https://cdn.balloondekor.com/images/33/c9f48859-63fc-4ba5-93b9-63349a3097b0.webp',
    },
    {
      label: 'Frozen Theme',
      to: '/collections/kids-themes?sub=frozen-princess',
      bg: 'bg-[#EBF8FF]',
      img: 'https://cdn.balloondekor.com/images/33/06dd1bb3-1a5a-470c-9d5f-7936b7b46dd4.webp',
    },
    {
      label: 'Mermaid Theme',
      to: '/collections/kids-themes?sub=mermaid-theme',
      bg: 'bg-[#FDF2F8]',
      img: 'https://cdn.balloondekor.com/images/33/38815dea-d5cd-4fca-b521-4d4b4574a2a9.webp',
    },
  ];

  // 6 Wedding Collection Cards: "From Haldi to Honeymoon" (Exact BalloonDekor CDN Images)
  const weddingCollectionCards = [
    {
      label: 'Bridal Shower',
      to: '/collections/bachelorette',
      bg: 'bg-[#FFF0F3]',
      img: 'https://cdn.balloondekor.com/33/bachelorette-decoration-83f7bd3a-a52d-4755-b8a5-4b6d3126f5e0.webp',
    },
    {
      label: 'Haldi Decor',
      to: '/collections/wedding-suit?sub=haldi-mehndi',
      bg: 'bg-[#FFF3F5]',
      img: 'https://cdn.balloondekor.com/33/haldi-decoration-92abeb45-8776-4485-8300-d177622d3c40.webp',
    },
    {
      label: 'Mehndi Decor',
      to: '/collections/wedding-suit?sub=haldi-mehndi',
      bg: 'bg-[#FFF0F3]',
      img: 'https://cdn.balloondekor.com/33/mehndi-decoration-fe86e95f-b9dc-4653-ad7c-239e4d71d5b2.webp',
    },
    {
      label: 'Wedding Car',
      to: '/collections/car-decoration',
      bg: 'bg-[#FFF0F3]',
      img: 'https://cdn.balloondekor.com/33/wedding-car-decoration-f5faedd9-d4b3-4072-8633-ab69c9522db0.webp',
    },
    {
      label: 'Bride Welcome',
      to: '/collections/wedding-suit?sub=bride-welcome',
      bg: 'bg-[#FFF0F3]',
      img: 'https://cdn.balloondekor.com/33/bride-welcome-decoration-771ccd3d-934d-4ff6-a85c-cadd6ff3abbb.webp',
    },
    {
      label: 'First Night',
      to: '/collections/wedding-suit?sub=first-night',
      bg: 'bg-[#FFF0F3]',
      img: 'https://cdn.balloondekor.com/33/first-night-decoration-a5cbe99a-b753-48ea-944f-3df3018988e0.webp',
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
      {/* 1. Official Festive Diwali Hero Card with SVG Marigold Toran Garland & Glowing Diyas */}
      <section className="bd-diwali-card" aria-labelledby="diwali-welcome-title">
        <div className="bd-diwali-garland" aria-hidden="true" />
        <div className="bd-diwali-copy">
          <p className="bd-diwali-eyebrow">
            The festive edit <span aria-hidden="true">✦</span> Diwali
          </p>
          <h2 id="diwali-welcome-title" className="bd-diwali-title">
            A little light.
            <br /> A lot of <span>celebration.</span>
          </h2>
          <p className="bd-diwali-description">
            Make your home glow with love, light &amp; beautiful decor.
          </p>
          <Link to="/collections/festive-special" className="bd-diwali-cta">
            <span>Explore Diwali decor</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M5 12h14m-5-5 5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
        <div className="bd-diwali-art" aria-hidden="true" />
        <span className="bd-diwali-wish" aria-hidden="true">
          Little details. Brighter celebrations.
        </span>
      </section>

      {/* 2. "Professional Balloon Decoration Services..." + 8-Item Pastel Category Grid */}
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

      {/* 3. Official Promotional Banner: Kids' Birthday Decorations */}
      <section>
        <Link
          to="/collections/kids-themes"
          className="block rounded-3xl overflow-hidden border border-[#1C1618]/8 shadow-xs hover:shadow-md transition-shadow"
        >
          <SmartImage
            src={ASSET_MANIFEST.kidsBirthdayBanner}
            alt="Kids' Birthday Decorations — Starts at ₹1,499"
            className="w-full h-auto object-cover"
          />
        </Link>
      </section>

      {/* 4. Birthday Decoration Section (Category: birthday) */}
      <section>
        <SectionHeading title="Birthday Decoration" viewAllLink="/collections/birthday" />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5 sm:gap-5">
          {birthdayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Official Promotional Banner: Diwali, beautifully decorated. */}
      <section>
        <Link
          to="/collections/festive-special"
          className="block rounded-3xl overflow-hidden border border-[#1C1618]/8 shadow-xs hover:shadow-md transition-shadow"
        >
          <SmartImage
            src={ASSET_MANIFEST.diwaliFestiveBanner}
            alt="Diwali, beautifully decorated — Explore Diwali Decor"
            className="w-full h-auto object-cover"
          />
        </Link>
      </section>

      {/* 6. Kids Birthday Decorations: 6 Character Themes Grid + Unique Kids Theme Products */}
      <section className="space-y-5">
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6 pt-2">
          {kidsThemeProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. Spooky Halloween Decorations (Category: halloween-decor) */}
      <section>
        <SectionHeading
          title="Spooky Halloween Decorations"
          subtitle="Decor to Die For"
          viewAllLink="/collections/halloween-decor"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6">
          {halloweenProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 8. Romantic Anniversary Decoration (Category: anniversary) */}
      <section>
        <SectionHeading
          title="Romantic Anniversary Decoration"
          viewAllLink="/collections/anniversary"
        />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5 sm:gap-5">
          {anniversaryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 9. The Wedding Collection: "From Haldi to Honeymoon" 6-Card Grid + Haldi/Wedding Setups */}
      <section className="space-y-5">
        <SectionHeading
          title="The Wedding Collection"
          subtitle="From Haldi to Honeymoon"
          viewAllLink="/collections/wedding-suit"
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6 pt-2">
          {weddingHaldiProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 10. Welcome Baby Decoration (Category: newborn-welcome) */}
      <section>
        <SectionHeading
          title="Welcome Baby Decoration"
          viewAllLink="/collections/newborn-welcome"
        />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5 sm:gap-5">
          {welcomeBabyProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 11. Baby Shower Decoration (Category: baby-shower) */}
      <section>
        <SectionHeading
          title="Baby Shower Decoration"
          viewAllLink="/collections/baby-shower"
        />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5 sm:gap-5">
          {babyShowerProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 12. Balloon Hampers (Category: balloon-bouquets) */}
      <section>
        <SectionHeading
          title="Balloon Hampers"
          viewAllLink="/collections/balloon-bouquets"
        />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5 sm:gap-5">
          {balloonHamperProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 13. Bachelorette Party (Category: bachelorette) */}
      <section>
        <SectionHeading
          title="Bachelorette Party"
          viewAllLink="/collections/bachelorette"
        />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5 sm:gap-5">
          {bacheloretteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 14. Official Corporate Event Planner Banner */}
      <section>
        <Link
          to="/collections/corporate-events"
          className="block rounded-3xl overflow-hidden border border-[#1C1618]/8 shadow-xs hover:shadow-md transition-shadow"
        >
          <SmartImage
            src={ASSET_MANIFEST.corporateBanner}
            alt="Corporate Event Planner — Get Your Decoration Done in Just 2 Hours"
            className="w-full h-auto object-cover"
          />
        </Link>
      </section>

      {/* 15. Car Decoration for Wedding (Category: car-decoration) */}
      <section>
        <SectionHeading
          title="Car Decoration for Wedding"
          viewAllLink="/collections/car-decoration"
        />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5 sm:gap-5">
          {weddingCarProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 16. Shop and Office Decor (Category: corporate-events) */}
      <section>
        <SectionHeading
          title="Shop and Office Decor"
          viewAllLink="/collections/corporate-events"
        />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5 sm:gap-5">
          {shopAndOfficeProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 17. Diwali, Annaprashan & Bindu Flower Decor (Category: festive-special) */}
      <section>
        <SectionHeading
          title="Diwali, Annaprashan & Bindu Flower Decor"
          viewAllLink="/collections/festive-special"
        />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5 sm:gap-5">
          {diwaliAndBinduProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 18. Canopy & Proposal Decorations (Category: romantic-surprises) */}
      <section>
        <SectionHeading
          title="Canopy & Proposal Decorations"
          viewAllLink="/collections/romantic-surprises"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6">
          {canopyProposalProducts.map((product) => (
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
              to="/collections/romantic-surprises?sub=marry-me-proposal"
              className="text-[#D8315B] underline font-medium"
            >
              proposal decorations
            </Link>{' '}
            create the kind of setting where the question feels as big as it is. And for occasions
            that deserve a more intimate touch, our{' '}
            <Link
              to="/collections/romantic-surprises?sub=canopy-setup"
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
              to="/collections/baby-shower"
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
              to="/collections/newborn-welcome"
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
            <Link to="/collections/wedding-suit" className="text-[#D8315B] underline font-medium">
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
