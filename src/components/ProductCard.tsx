import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { SmartImage } from './SmartImage';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { selectedCity, getCityPrice, wishlistIds, toggleWishlist } = useStore();

  const cityDiscountedPrice = getCityPrice(product.discountedPrice, selectedCity);
  const cityOriginalPrice = getCityPrice(product.originalPrice, selectedCity);
  const savingsPercent =
    cityOriginalPrice > cityDiscountedPrice
      ? Math.round(((cityOriginalPrice - cityDiscountedPrice) / cityOriginalPrice) * 100)
      : 0;

  const isWishlisted = wishlistIds.includes(product.id);

  return (
    <article className="group flex flex-col">
      {/* Rounded Square/4:3 Product Image Container */}
      <div className="relative aspect-square w-full bg-[#F7F3EE] rounded-2xl overflow-hidden border border-[#1C1618]/6">
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          <SmartImage
            src={product.primaryImage}
            alt={product.title}
            fallbackTitle={product.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* TRENDING Pill Badge (Matches Video 00:21) */}
        {product.isTrending && (
          <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/95 text-[#1C1618] text-[10px] font-bold tracking-wider uppercase shadow-xs pointer-events-none">
            TRENDING
          </span>
        )}

        {/* Wishlist Interactive Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#1C1618] hover:text-[#D8315B] transition-colors shadow-xs"
        >
          <Heart
            className={`w-4 h-4 ${
              isWishlisted ? 'fill-[#D8315B] text-[#D8315B]' : 'text-[#1C1618]'
            }`}
          />
        </button>
      </div>

      {/* Card Body: Exact BalloonDekor Title, Green Rating Badge & Price Row */}
      <div className="pt-2.5 flex flex-col flex-1 justify-between space-y-1.5">
        <Link
          to={`/product/${product.slug}`}
          className="block text-sm sm:text-[15px] font-bold text-[#1C1618] group-hover:text-[#D8315B] transition-colors line-clamp-2 leading-snug"
        >
          {product.title}
        </Link>

        <div className="space-y-1">
          {/* Green Rating Badge + Dotted-Underline Review Count */}
          <div className="flex items-center gap-2 pt-0.5">
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-[#1B8E3E] text-white text-[11px] font-bold tabular-nums leading-none">
              <span>★</span>
              <span>{product.rating.toFixed(1)}</span>
            </span>
            <span className="text-xs text-[#555555] border-b border-dashed border-[#555555]/50 leading-tight tabular-nums">
              {product.reviewsCount} reviews
            </span>
          </div>

          {/* Price Row: Current Price + Strikethrough + Green % Off */}
          <div className="flex items-baseline gap-1.5 flex-wrap pt-0.5">
            <span className="text-base sm:text-[17px] font-extrabold text-[#1C1618] tabular-nums">
              ₹{cityDiscountedPrice.toLocaleString('en-IN')}
            </span>
            {cityOriginalPrice > cityDiscountedPrice && (
              <>
                <span className="text-xs text-[#8C7E80] line-through tabular-nums">
                  ₹{cityOriginalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs font-bold text-[#1B8E3E] tabular-nums">
                  {savingsPercent}% off
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
