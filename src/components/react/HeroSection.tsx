import type { HeroSectionProps } from '../../types';

/**
 * Hero section component - displays full-width hero image
 * Responsive height: 300px mobile, auto tablet, 700px desktop
 * Following originrealms.com pattern exactly
 */
export default function HeroSection({ imageSrc, imageAlt }: HeroSectionProps) {
  return (
    <header className="pageHero h-[300px] md:h-auto xl:h-[700px] relative mt-8">
      <img
        src={imageSrc}
        alt={imageAlt}
        className="absolute md:relative xl:absolute inset-0 object-cover xl:object-contain"
        style={{ width: '100%', height: '100%' }}
        loading="eager"
      />
    </header>
  );
}
