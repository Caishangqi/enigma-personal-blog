/**
 * DocumentCard component - Document card for Resume page
 * Structure matches Origin Realms store card exactly:
 * - rounded-lg p-6 pt-0 grid grid-rows-[1fr_auto] bg-[#f1ddca] text-black
 * - coin-image (square, bg-contain, -top-4)
 * - tag (category with custom color from frontmatter)
 * - title (text-3xl + text-2xl)
 * - button (bg-black, full width, with icon)
 *
 * Supports carousel animation via position prop:
 * - center: Main card, full opacity, z-index 3
 * - left: Left side card, scaled down, lower opacity
 * - right: Right side card, scaled down, lower opacity
 * - hidden: Off-screen, invisible
 */

import { DEFAULT_CATEGORY_COLOR } from '../../utils';

export interface DocumentCardData {
  id: string;
  title: string;
  subtitle?: string;
  category: string;           // e.g., "PDF", "VIDEO"
  categoryColor?: string;     // Custom color from frontmatter
  image?: string;
  link?: string;
}

// Position type for carousel animation
export type CardPosition = 'center' | 'left' | 'right' | 'hidden';

interface DocumentCardProps {
  data?: DocumentCardData;    // Optional - if undefined, shows placeholder
  variant?: 'small' | 'large';
  position?: CardPosition;    // Position in carousel for animation
  disabled?: boolean;         // If true, card is faded and non-interactive
  onClick?: () => void;
}

// Placeholder data for empty slots
const PLACEHOLDER_DATA: DocumentCardData = {
  id: 'placeholder',
  title: 'Coming Soon',
  subtitle: 'No Document',
  category: 'N/A',
  categoryColor: '#6b7280', // gray-500
};

// View icon SVG - similar to Origin Realms cart icon style
function ViewIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className="w-6 h-6 mr-2"
    >
      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
      <path
        fillRule="evenodd"
        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function DocumentCard({
  data,
  variant = 'small',
  position,
  disabled = false,
  onClick,
}: DocumentCardProps) {
  // Use placeholder if no data provided
  const cardData = data || PLACEHOLDER_DATA;
  const isPlaceholder = !data;
  const isDisabled = disabled || isPlaceholder;

  const { title, subtitle, category, categoryColor, image } = cardData;
  const isLarge = variant === 'large';

  // Use categoryColor from frontmatter, fallback to default
  const tagColor = categoryColor || DEFAULT_CATEGORY_COLOR;

  // Build class names
  const cardClasses = [
    'document-card',
    isLarge ? 'document-card-large' : 'document-card-small',
    isDisabled ? 'document-card-disabled' : '',
    // Position classes for carousel animation
    position ? `document-card-${position}` : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cardClasses}
      onClick={isDisabled ? undefined : onClick}
      role={!isDisabled && onClick ? 'button' : undefined}
      tabIndex={!isDisabled && onClick ? 0 : undefined}
      aria-disabled={isDisabled}
    >
      {/* Card Image - matches Origin Realms coin-image */}
      <div
        className="document-card-image"
        style={image ? { backgroundImage: `url(${image})` } : undefined}
      />

      {/* Tag - matches Origin Realms bonus tag, color from frontmatter */}
      <div
        className="document-card-tag"
        style={{ backgroundColor: tagColor }}
      >
        {category}
      </div>

      {/* Title - matches Origin Realms text-3xl */}
      <div className="document-card-title">{title}</div>

      {/* Subtitle - matches Origin Realms text-2xl */}
      {subtitle && <div className="document-card-subtitle">{subtitle}</div>}

      {/* Spacer for small cards */}
      {!isLarge && <div className="document-card-spacer" />}

      {/* View Detail Button - matches Origin Realms button exactly */}
      {isLarge && (
        <button className="document-card-button" disabled={isDisabled}>
          <ViewIcon />
          <div className="document-card-button-text">
            <span>View Detail</span>
          </div>
        </button>
      )}
    </div>
  );
}
