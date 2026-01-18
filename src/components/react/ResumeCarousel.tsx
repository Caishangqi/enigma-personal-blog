/**
 * ResumeCarousel component - Carousel/wheel for Resume document cards
 * Uses CSS transform-based animation for smooth card sliding effect
 *
 * Animation mechanism:
 * - All cards are rendered with position: absolute
 * - Cards are positioned via CSS classes: center, left, right, hidden
 * - CSS transition handles smooth animation between states
 *
 * Edge cases:
 * - 0 items: Shows empty message
 * - 1 item: Shows center card only
 * - 2 items: Shows center + left card
 * - 3+ items: Normal circular rotation with all positions
 */

import { useState, useCallback } from 'react';
import DocumentCard, { type DocumentCardData } from './DocumentCard';
import CarouselPagination from './CarouselPagination';

interface ResumeCarouselProps {
  items: DocumentCardData[];
}

// Position type for card placement
type CardPosition = 'center' | 'left' | 'right' | 'hidden';

export default function ResumeCarousel({ items }: ResumeCarouselProps) {
  // Current center item index
  const [centerIndex, setCenterIndex] = useState(0);

  const totalItems = items.length;

  // Get circular index with wrapping
  const getCircularIndex = useCallback((index: number): number => {
    if (totalItems === 0) return 0;
    return ((index % totalItems) + totalItems) % totalItems;
  }, [totalItems]);

  // Calculate position for each card based on its index relative to center
  const getCardPosition = useCallback((cardIndex: number): CardPosition => {
    if (totalItems === 0) return 'hidden';

    let diff = cardIndex - centerIndex;

    // Handle circular wrapping
    if (diff > totalItems / 2) diff -= totalItems;
    if (diff < -totalItems / 2) diff += totalItems;

    if (diff === 0) return 'center';
    if (diff === -1) return 'left';
    if (diff === 1) return 'right';
    return 'hidden';
  }, [centerIndex, totalItems]);

  // Navigate to previous item (rotate left)
  const goToPrev = useCallback(() => {
    if (totalItems > 1) {
      setCenterIndex(prev => getCircularIndex(prev - 1));
    }
  }, [totalItems, getCircularIndex]);

  // Navigate to next item (rotate right)
  const goToNext = useCallback(() => {
    if (totalItems > 1) {
      setCenterIndex(prev => getCircularIndex(prev + 1));
    }
  }, [totalItems, getCircularIndex]);

  // Handle card click based on position
  const handleCardClick = useCallback((cardIndex: number) => {
    const position = getCardPosition(cardIndex);

    if (position === 'left') {
      goToPrev();
    } else if (position === 'right') {
      goToNext();
    } else if (position === 'center') {
      // Navigate to detail page
      const item = items[cardIndex];
      if (item?.link) {
        window.location.href = item.link;
      }
    }
  }, [getCardPosition, goToPrev, goToNext, items]);

  // Don't render if no items
  if (totalItems === 0) {
    return (
      <div className="resume-carousel-empty">
        <p>No documents available</p>
      </div>
    );
  }

  return (
    <div className="resume-carousel">
      {/* Viewport - clips overflow */}
      <div className="resume-carousel-viewport">
        {/* Track - contains all cards */}
        <div className="resume-carousel-track">
          {items.map((item, index) => {
            const position = getCardPosition(index);
            const isCenter = position === 'center';

            return (
              <DocumentCard
                key={item.id}
                data={item}
                variant={isCenter ? 'large' : 'small'}
                position={position}
                onClick={() => handleCardClick(index)}
              />
            );
          })}
        </div>
      </div>

      {/* Pagination controls */}
      <CarouselPagination
        currentIndex={centerIndex}
        totalItems={totalItems}
        onPrev={goToPrev}
        onNext={goToNext}
      />
    </div>
  );
}
