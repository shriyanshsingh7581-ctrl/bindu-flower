import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { resolveAssetUrl, ASSET_MANIFEST } from '../data/seedData';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  fallbackTitle,
  className = '',
  ...rest
}) => {
  const initialResolved = src ? resolveAssetUrl(src) : '';
  const [currentSrc, setCurrentSrc] = useState<string>(initialResolved);
  const [retryStage, setRetryStage] = useState<number>(0);

  useEffect(() => {
    const resolved = src ? resolveAssetUrl(src) : '';
    setCurrentSrc(resolved);
    setRetryStage(0);
  }, [src]);

  const handleError = () => {
    // Stage 0: If CloudFront / CDN returned 403 due to CORS or referer, try image-proxy endpoint (wsrv.nl / images.weserv.nl)
    if (retryStage === 0 && currentSrc && currentSrc.startsWith('https://cdn.balloondekor.com/')) {
      const cleanUrl = currentSrc.replace(/^https?:\/\//, '');
      const proxied = `https://wsrv.nl/?url=${encodeURIComponent(cleanUrl)}&output=webp`;
      setRetryStage(1);
      setCurrentSrc(proxied);
      return;
    }

    // Stage 1: Try local bundled image fallback
    if (retryStage <= 1) {
      setRetryStage(2);
      setCurrentSrc(ASSET_MANIFEST.localBirthdayFallback || ASSET_MANIFEST.birthdayRoseGold);
      return;
    }

    // Stage 2: Failed both CDN and proxy, show clean styled brand placeholder
    setRetryStage(3);
  };

  if (!currentSrc || retryStage === 3) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F3ECE3] via-[#FAF7F2] to-[#E8DEC8] text-[#6E5D5F] p-4 text-center ${className}`}
        role="img"
        aria-label={alt || fallbackTitle || 'Celebration Decoration'}
      >
        <Sparkles className="w-7 h-7 text-[#C83E5B] mb-1.5 opacity-80" />
        <span className="font-serif-display text-sm font-semibold text-[#1C1618] line-clamp-2">
          {fallbackTitle || alt || 'Bindu flower Setup'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt || fallbackTitle || 'Bindu flower Celebration'}
      referrerPolicy="no-referrer"
      crossOrigin="anonymous"
      loading="lazy"
      onError={handleError}
      className={className}
      {...rest}
    />
  );
};
