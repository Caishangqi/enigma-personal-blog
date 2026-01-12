/**
 * NewsSection component - matches Origin Realms news section exactly
 * Structure: section header + featured blog card (grid layout) + view all button
 * Key difference from BlogCard: entire grid wrapped in single <a> tag
 */

import type { NewsSectionProps } from '../../types';

// Format date to "Jan 5th, 2026" format (same as BlogCard)
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

// Category color mapping (same as BlogCard default)
const DEFAULT_CATEGORY_COLOR = '#F5B72B'; // yellow like Origin Realms "Update"

// Default max description length (Origin Realms uses ~200 characters)
const DEFAULT_MAX_LENGTH = 200;

// Truncate text with ellipsis (same as BlogCard)
function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export default function NewsSection({ posts, viewAllLink }: NewsSectionProps) {
  // Only show the first (latest) post like Origin Realms
  const latestPost = posts[0];

  if (!latestPost) {
    return null;
  }

  return (
    <section className="news-section">
      {/* Section header */}
      <div className="section-header">
        <div className="section-title">Origin Realms News</div>
        <p className="section-subtitle">Stay up to date with the latest blogs &amp; updates!</p>
      </div>

      {/* News card container */}
      <div className="news-container">
        {/* Entire grid wrapped in single <a> - matches Origin Realms exactly */}
        <a href={`/blog/${latestPost.slug}`} className="news-card">
          {/* Hero image */}
          <div
            className="card-image"
            style={{
              backgroundImage: latestPost.heroImage ? `url(${latestPost.heroImage})` : undefined,
            }}
          />

          {/* Content */}
          <div className="card-content">
            {/* Title */}
            <div className="card-title">{latestPost.title}</div>

            {/* Meta: category + date */}
            <div className="meta">
              {latestPost.category && (
                <>
                  <div
                    className="category"
                    style={{ color: latestPost.categoryColor || DEFAULT_CATEGORY_COLOR }}
                  >
                    {latestPost.category}
                  </div>
                  <div className="separator">–</div>
                </>
              )}
              <time dateTime={latestPost.pubDate.toISOString()}>
                {formatDate(latestPost.pubDate)}
              </time>
            </div>

            {/* Description with truncation */}
            <p className="description">
              {latestPost.description ? truncateText(latestPost.description, DEFAULT_MAX_LENGTH) : ''}
            </p>
          </div>
        </a>
      </div>

      {/* View all button */}
      <div className="view-all-container">
        <a href={viewAllLink} className="view-all-btn bg-yellow-500 text-orange-900 hover:bg-yellow-400">
          View All Blogs
        </a>
      </div>
    </section>
  );
}
