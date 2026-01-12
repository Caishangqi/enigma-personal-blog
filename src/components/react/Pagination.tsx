/**
 * Pagination component - matches Origin Realms pagination exactly
 * Structure: prev button | "Page X of Y" | next button
 * Uses Astro View Transitions for smooth page navigation
 */

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl?: string; // e.g., "/blog" -> /blog/1, /blog/2
}

// Left arrow SVG (previous) - from Origin Realms
function PrevIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
      <path d="M18 22H14V18H18L18 22Z" />
      <path d="M10 14H14L14 18H10L10 14Z" />
      <path d="M10 10L10 14L6 14L6 10H10Z" />
      <path d="M14 6L10 6V10L14 10L14 6Z" />
      <path d="M14 6V2L18 2V6L14 6Z" />
    </svg>
  );
}

// Right arrow SVG (next) - from Origin Realms
function NextIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
      <path d="M6 2H10V6H6V2Z" />
      <path d="M14 10H10V6H14V10Z" />
      <path d="M14 14V10H18V14H14Z" />
      <path d="M10 18H14V14H10V18Z" />
      <path d="M10 18V22H6V18H10Z" />
    </svg>
  );
}

export default function Pagination({
  currentPage,
  totalPages,
  baseUrl = '/blog',
}: PaginationProps) {
  // Don't render if only one page
  if (totalPages <= 1) {
    return null;
  }

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const prevUrl = hasPrev ? `${baseUrl}/${currentPage - 1}` : undefined;
  const nextUrl = hasNext ? `${baseUrl}/${currentPage + 1}` : undefined;

  return (
    <div className="pagination">
      {/* Previous button */}
      {hasPrev ? (
        <a href={prevUrl} className="pagination-btn">
          <PrevIcon />
        </a>
      ) : (
        <button className="pagination-btn" disabled>
          <PrevIcon />
        </button>
      )}

      {/* Page indicator */}
      <div className="pagination-pages">
        Page <b className="pagination-current">{currentPage}</b> of {totalPages}
      </div>

      {/* Next button */}
      {hasNext ? (
        <a href={nextUrl} className="pagination-btn">
          <NextIcon />
        </a>
      ) : (
        <button className="pagination-btn" disabled>
          <NextIcon />
        </button>
      )}
    </div>
  );
}
