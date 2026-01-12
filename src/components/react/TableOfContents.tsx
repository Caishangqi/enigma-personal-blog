/**
 * Table of Contents (TOC) component
 * Matching Origin Realms blog post style exactly
 *
 * Features:
 * - Fixed position on left side (lg screens only)
 * - Shows/hides based on scroll position (when meta element leaves viewport)
 * - Highlights current section based on scroll position
 * - Supports h2 and h3 headings with indentation
 */

import { useState, useEffect, useCallback } from 'react';

export interface TocItem {
  id: string;
  text: string;
  level: number; // 2 for h2, 3 for h3
}

interface TableOfContentsProps {
  /** Selector for the element that triggers TOC visibility when scrolled out of view */
  triggerSelector?: string;
  /** Selector for the content container to extract headings from */
  contentSelector?: string;
}

export default function TableOfContents({
  triggerSelector = '.meta',
  contentSelector = '.prose',
}: TableOfContentsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeId, setActiveId] = useState<string>('');
  const [tocItems, setTocItems] = useState<TocItem[]>([]);

  // Extract headings from content on mount
  useEffect(() => {
    const contentElement = document.querySelector(contentSelector);
    if (!contentElement) return;

    const headings = contentElement.querySelectorAll('h2[id], h3[id]');
    const items: TocItem[] = Array.from(headings).map((heading) => ({
      id: heading.id,
      text: heading.textContent || '',
      level: heading.tagName === 'H2' ? 2 : 3,
    }));

    setTocItems(items);

    // Set initial active item
    if (items.length > 0) {
      setActiveId(items[0].id);
    }
  }, [contentSelector]);

  // Handle scroll for visibility and active section
  const handleScroll = useCallback(() => {
    // Check if trigger element is out of viewport
    const triggerElement = document.querySelector(triggerSelector);
    if (triggerElement) {
      const rect = triggerElement.getBoundingClientRect();
      setIsVisible(rect.bottom < 0);
    }

    // Find current active section
    const headings = document.querySelectorAll('.prose h2[id], .prose h3[id]');
    let currentActiveId = '';

    // Find the heading that is currently at or above the viewport top
    for (const heading of headings) {
      const rect = heading.getBoundingClientRect();
      // Consider a heading "active" when it's within the top 200px of viewport
      if (rect.top <= 200) {
        currentActiveId = heading.id;
      }
    }

    if (currentActiveId) {
      setActiveId(currentActiveId);
    }
  }, [triggerSelector]);

  // Set up scroll listener
  useEffect(() => {
    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Handle click on TOC item
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Smooth scroll to element with offset for fixed header
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
      setActiveId(id);
    }
  };

  // Don't render if no items
  if (tocItems.length === 0) {
    return null;
  }

  return (
    <div
      className={`toc-container fixed top-32 left-12 z-10 w-72 transition-opacity duration-200 hidden lg:block ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <nav className="toc-nav">
        <ul className="space-y-3">
          {tocItems.map((item) => (
            <li
              key={item.id}
              className={`toc-item level-${item.level}`}
            >
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={`block text-base font-proxima transition-colors duration-200 cursor-pointer hover:text-white ${
                  activeId === item.id ? 'text-white' : 'text-gray-500'
                }`}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
