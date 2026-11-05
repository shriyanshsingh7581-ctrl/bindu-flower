import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

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
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F3ECE3] via-[#FAF7F2] to-[#E8DEC8] text-[#6E5D5F] p-6 text-center ${className}`}
        role="img"
        aria-label={alt || fallbackTitle || 'Celebration Decoration'}
      >
        <Sparkles className="w-8 h-8 text-[#C83E5B] mb-2 opacity-80" />
        <span className="font-serif-display text-base font-semibold text-[#1C1618] line-clamp-2">
          {fallbackTitle || alt || 'Bindu flower Curated Setup'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || fallbackTitle || 'Bindu flower Celebration'}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      {...rest}
    />
  );
};
