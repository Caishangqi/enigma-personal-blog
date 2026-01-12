import { useEffect, useState } from 'react';
import type { PageLoaderProps } from '../../types';

/**
 * Full-screen loading overlay with fade transition
 * Automatically shows during Astro View Transitions navigation
 */
export default function PageLoader({ loadingImage }: Omit<PageLoaderProps, 'isLoading'>) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Listen for Astro View Transitions events
    // https://docs.astro.build/en/guides/view-transitions/#lifecycle-events
    
    const handleBeforePreparation = () => {
      setIsLoading(true);
    };

    const handleAfterSwap = () => {
      setIsLoading(false);
    };

    // Also handle page load complete as fallback
    const handlePageLoad = () => {
      setIsLoading(false);
    };

    // Astro View Transitions events
    document.addEventListener('astro:before-preparation', handleBeforePreparation);
    document.addEventListener('astro:after-swap', handleAfterSwap);
    document.addEventListener('astro:page-load', handlePageLoad);

    return () => {
      document.removeEventListener('astro:before-preparation', handleBeforePreparation);
      document.removeEventListener('astro:after-swap', handleAfterSwap);
      document.removeEventListener('astro:page-load', handlePageLoad);
    };
  }, []);

  return (
    <div
      className={`loading fixed inset-0 z-50 transition-opacity duration-300 flex flex-col items-center justify-center bg-black/80 ${
        isLoading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <img src={loadingImage} alt="Loading" className="w-28" />
    </div>
  );
}
