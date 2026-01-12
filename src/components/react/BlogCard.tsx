/**
 * BlogCard component - matches Origin Realms blog card structure exactly
 * Structure: <a> -> background div -> h3 -> meta (category + date) -> description
 */
import type { BlogCardProps } from '../../types';

// Default max description length (Origin Realms uses ~200 characters)
const DEFAULT_MAX_LENGTH = 200;

// Format date to "Jan 5th, 2026" format
function formatDate(date: Date): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  // Add ordinal suffix (st, nd, rd, th)
  const getOrdinal = (n: number): string => {
    if (n > 3 && n < 21) return 'th';
    switch (n % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  return `${month} ${day}${getOrdinal(day)}, ${year}`;
}

// Truncate text with ellipsis
function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export default function BlogCard({
  slug,
  title,
  description,
  pubDate,
  category,
  categoryColor = '#F5B72B', // Default yellow like Origin Realms "Update"
  backgroundImage,
  maxDescriptionLength = DEFAULT_MAX_LENGTH,
}: BlogCardProps) {
  const displayDescription = description
    ? truncateText(description, maxDescriptionLength)
    : '';

  return (
    <a href={`/blog/${slug}/`} className="blog-card">
      {/* Background image with hover scale effect */}
      <div
        className="card-image"
        style={{
          backgroundImage: backgroundImage ? `url("${backgroundImage}")` : undefined,
        }}
      />

      {/* Title */}
      <h3>{title}</h3>

      {/* Meta: category + date */}
      <div className="meta">
        {category && (
          <>
            <div style={{ color: categoryColor }}>{category}</div>
            <div className="separator">–</div>
          </>
        )}
        <time>{formatDate(pubDate)}</time>
      </div>

      {/* Description */}
      {displayDescription && (
        <div className="description">{displayDescription}</div>
      )}
    </a>
  );
}
