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

/**
 * Calculate relative time from a date to now
 * Returns format like "4 Months ago", "1 Year ago", "2 Days ago"
 */
export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffYears > 0) {
    return diffYears === 1 ? '1 Year ago' : `${diffYears} Years ago`;
  }
  if (diffMonths > 0) {
    return diffMonths === 1 ? '1 Month ago' : `${diffMonths} Months ago`;
  }
  if (diffWeeks > 0) {
    return diffWeeks === 1 ? '1 Week ago' : `${diffWeeks} Weeks ago`;
  }
  if (diffDays > 0) {
    return diffDays === 1 ? '1 Day ago' : `${diffDays} Days ago`;
  }
  if (diffHours > 0) {
    return diffHours === 1 ? '1 Hour ago' : `${diffHours} Hours ago`;
  }
  if (diffMinutes > 0) {
    return diffMinutes === 1 ? '1 Minute ago' : `${diffMinutes} Minutes ago`;
  }
  return 'Just now';
}
