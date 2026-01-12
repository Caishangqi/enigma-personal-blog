/**
 * Shared utility functions for React components
 * Following DRY principle - extract common logic
 */

/**
 * Format date to "Jan 5th, 2026" format (matches Origin Realms)
 */
export function formatDate(date: Date): string {
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

/**
 * Truncate text with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum characters before truncation
 * @returns Truncated text with "..." if exceeded
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Default category color (yellow like Origin Realms "Update")
 */
export const DEFAULT_CATEGORY_COLOR = '#F5B72B';

/**
 * Default max description length (Origin Realms uses ~200 characters)
 */
export const DEFAULT_MAX_DESCRIPTION_LENGTH = 200;
