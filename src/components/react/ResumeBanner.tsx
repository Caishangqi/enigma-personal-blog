/**
 * ResumeBanner component - Hero banner for Resume page
 * Matches Origin Realms store hero banner exactly:
 * - flex layout with responsive alignment
 * - background image with overlay
 * - text-shadow for readability
 */

interface ResumeBannerProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
}

export default function ResumeBanner({
  title = 'Resume and Documentation',
  subtitle = 'CHECK NOW!',
  backgroundImage = '',
}: ResumeBannerProps) {
  return (
    <div
      className="hero flex lg:items-center justify-between mb-10 mt-8 py-12 lg:py-16 px-6 lg:px-10 relative bg-cover bg-no-repeat bg-center md:bg-left overflow-hidden rounded-md"
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
    >
      {/* Overlay - visible on mobile, hidden on desktop */}
      <div className="absolute inset-0 bg-black/40 lg:opacity-0" />

      {/* Text content */}
      <div className="text text-shadow max-w-[320px] leading-none font-bold text-center lg:text-left relative">
        <div className="text-5xl text-white">{title}</div>
        <div className="text-xl font-bold tracking-wide uppercase text-yellow-100 mt-3">
          {subtitle}
        </div>
      </div>
    </div>
  );
}
