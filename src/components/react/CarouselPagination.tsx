/**
 * CarouselPagination component - Pagination controls for Resume carousel
 * Based on Figma design: left/right arrows + "Item X of Y" text
 * Similar to Origin Realms blog pagination but with "Item" instead of "Page"
 */

interface CarouselPaginationProps {
  currentIndex: number;
  totalItems: number;
  onPrev: () => void;
  onNext: () => void;
}

// Left arrow SVG - reusing from Pagination.tsx
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

// Right arrow SVG - reusing from Pagination.tsx
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

export default function CarouselPagination({
  currentIndex,
  totalItems,
  onPrev,
  onNext,
}: CarouselPaginationProps) {
  // Don't render if only one item
  if (totalItems <= 1) {
    return null;
  }

  // Display is 1-based for users
  const displayIndex = currentIndex + 1;

  return (
    <div className="carousel-pagination">
      {/* Previous button */}
      <button
        className="carousel-pagination-btn"
        onClick={onPrev}
        aria-label="Previous item"
      >
        <PrevIcon />
      </button>

      {/* Item indicator */}
      <div className="carousel-pagination-info">
        Item <span className="carousel-pagination-current">{displayIndex}</span> of {totalItems}
      </div>

      {/* Next button */}
      <button
        className="carousel-pagination-btn"
        onClick={onNext}
        aria-label="Next item"
      >
        <NextIcon />
      </button>
    </div>
  );
}
