"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface SmartImageProps {
  src: string;
  alt: string;
  fallbackLabel?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  onLoad?: () => void;
}

export function SmartImage({
  src,
  alt,
  fallbackLabel,
  className,
  priority = false,
  sizes,
  fill = false,
  width,
  height,
  onLoad,
}: SmartImageProps) {
  const [hasError, setHasError] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  const handleLoad = useCallback(() => {
    setHasLoaded(true);
    onLoad?.();
  }, [onLoad]);

  if (hasError || !src) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gradient-to-br from-navy-100 via-navy-50 to-navy-100",
          className
        )}
        aria-label={alt}
        role="img"
      >
        <div className="flex flex-col items-center gap-2 px-4 text-center">
          <svg
            className="h-10 w-10 text-navy-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
            />
          </svg>
          {fallbackLabel && (
            <span className="text-sm font-medium text-navy-400">
              {fallbackLabel}
            </span>
          )}
        </div>
      </div>
    );
  }

  const imageProps = fill
    ? { fill: true }
    : { width: width || 800, height: height || 600 };

  return (
    <Image
      src={src}
      alt={alt}
      className={cn(
        className,
        hasLoaded ? "opacity-100" : "opacity-0",
        "transition-opacity duration-500"
      )}
      onError={handleError}
      onLoad={handleLoad}
      priority={priority}
      sizes={sizes}
      unoptimized={process.env.NODE_ENV === "development"}
      {...imageProps}
    />
  );
}
