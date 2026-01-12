import { useState } from 'react';
import type { HeaderProps } from '../../types';

// Discord icon (larger version for nav)
const DiscordIcon = () => (
  <svg
    className="w-6 h-7"
    fill="currentColor"
    viewBox="0 0 245 240"
    aria-hidden="true"
  >
    <path d="M214.5,54.1c-30.1-22.6-58.8-22-58.8-22l-2.9,3.3c35.5,10.9,52.1,26.6,52.1,26.6
      c-21.7-11.9-43.1-17.8-62.9-20.1c-15.1-1.7-29.5-1.3-42.2,0.4c-1.3,0-2.3,0.2-3.6,0.4c-7.3,0.6-25.1,3.3-47.5,13.2
      c-7.7,3.6-12.3,6.1-12.3,6.1s17.4-16.5,55-27.4l-2.1-2.5c0,0-28.6-0.6-58.8,22c0,0-30.1,54.6-30.1,121.9c0,0,17.6,30.3,63.8,31.8
      c0,0,7.7-9.4,14-17.4c-26.6-7.9-36.6-24.7-36.6-24.7s2.1,1.5,5.9,3.6c0.2,0.2,0.4,0.4,0.8,0.6c0.6,0.4,1.3,0.6,1.9,1
      c5.2,2.9,10.5,5.2,15.3,7.1c8.6,3.3,18.8,6.7,30.7,9c15.7,2.9,34.1,4,54.2,0.2c9.8-1.7,19.9-4.6,30.3-9c7.3-2.7,15.5-6.7,24-12.3
      c0,0-10.5,17.1-37.8,24.9c6.3,7.9,13.8,16.9,13.8,16.9c46.2-1.5,64-31.8,64-31.8C244.6,108.7,214.5,54.1,214.5,54.1z M83.3,157
      c-11.7,0-21.4-10.5-21.4-23.3c0-12.8,9.4-23.3,21.4-23.3c12,0,21.6,10.5,21.4,23.3C104.7,146.5,95.2,157,83.3,157z M159.8,157
      c-11.7,0-21.4-10.5-21.4-23.3c0-12.8,9.4-23.3,21.4-23.3c12,0,21.4,10.5,21.4,23.3C181.2,146.5,171.8,157,159.8,157z" />
  </svg>
);

// Social icon component
const SocialIcon = ({ platform }: { platform: string }) => {
  switch (platform) {
    case 'github':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      );
    case 'twitter':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case 'discord':
      return <DiscordIcon />;
    default:
      return null;
  }
};

export default function Header({ siteTitle, navLinks, socialLinks, currentPath = '/' }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Base link styles from originrealms.com
  const linkBaseClasses =
    'flex items-center p-6 text-xl lg:text-lg lg:px-4 md:py-2 rounded-md transition-colors font-bold text-white hover:bg-blue-500';
  
  // Active link styles (current page) - adds bg-blue-500 like originrealms.com
  const linkActiveClasses =
    'flex items-center p-6 text-xl lg:text-lg lg:px-4 md:py-2 rounded-md transition-colors font-bold text-white bg-blue-500 hover:bg-blue-500';

  // Check if a link is active (matches current path)
  const isLinkActive = (href: string): boolean => {
    // Normalize paths for comparison
    const normalizedHref = href === '/' ? '/' : href.replace(/\/$/, '');
    const normalizedPath = currentPath === '/' ? '/' : currentPath.replace(/\/$/, '');
    
    // Exact match for home page
    if (normalizedHref === '/') {
      return normalizedPath === '/';
    }
    
    // For other pages, check if current path starts with href (for nested routes)
    return normalizedPath === normalizedHref || normalizedPath.startsWith(normalizedHref + '/');
  };

  return (
    <header className="lg:pt-6 flex items-center relative">
      <nav className="nav z-40 container mx-auto">
        {/* Mobile toggle button - Origin Realms style with animated bars */}
        <div
          className={`mobile-toggle cursor-pointer flex items-center ml-auto lg:hidden py-8 px-4 ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          role="button"
          tabIndex={0}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          onKeyDown={(e) => e.key === 'Enter' && toggleMenu()}
        >
          {/* Three bars that animate to X */}
          <div>
            <div className="bar" />
            <div className="bar" />
            <div className="bar" />
          </div>
          <span className="font-bold ml-4 text-white text-xl">Toggle Menu</span>
        </div>

        {/* Navigation menu - overlay style on mobile */}
        <div
          className={`menu-collapse flex md:items-center justify-between flex-col md:flex-row uppercase tracking-wide ${isMenuOpen ? 'open' : ''}`}
        >
          {/* Main nav links */}
          <ul className="md:flex md:justify-center md:items-center">
            {navLinks.map((link, index) => (
              <li key={index} className="mb-4 lg:mr-4 md:mb-0 last:mr-0 relative">
                <a
                  href={link.href}
                  className={isLinkActive(link.href) ? linkActiveClasses : linkBaseClasses}
                >
                  <span className="block">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>

          {/* Social links */}
          <ul className="md:flex md:justify-center md:items-center">
            {socialLinks.map((link, index) => (
              <li key={index} className="mb-4 lg:mr-4 md:mb-0 last:mr-0 relative">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className={
                    link.platform === 'discord'
                      ? 'flex items-center p-6 text-xl lg:text-lg lg:px-4 md:py-2 rounded-md transition-colors font-bold bg-discord text-white hover:bg-discord-light'
                      : linkBaseClasses
                  }
                >
                  <SocialIcon platform={link.platform} />
                  <span className="md:hidden ml-2">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* CSS for mobile menu animations - matching Origin Realms exactly */}
      <style>{`
        /* Hide mobile toggle on desktop */
        @media (min-width: 1024px) {
          .nav .mobile-toggle {
            display: none;
          }
        }

        /* Hamburger bar styles */
        .nav .mobile-toggle .bar {
          background: rgb(255, 255, 255);
          height: 4px;
          width: 30px;
          border-radius: 100px;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          top: 0;
        }

        .nav .mobile-toggle .bar:nth-of-type(2) {
          margin: 6px 0;
        }

        /* Open state - transform to X */
        .nav .mobile-toggle.open {
          cursor: pointer;
        }

        .nav .mobile-toggle.open .bar {
          background: rgb(255, 255, 255);
        }

        .nav .mobile-toggle.open .bar:nth-of-type(1) {
          transform: rotate(45deg);
          top: 10px;
        }

        .nav .mobile-toggle.open .bar:nth-of-type(2) {
          transform: rotate(180deg);
          opacity: 0;
        }

        .nav .mobile-toggle.open .bar:nth-of-type(3) {
          transform: rotate(-45deg);
          top: -10px;
        }

        .nav .mobile-toggle:hover .bar {
          background: rgb(255, 255, 255);
        }

        /* Mobile menu collapse - overlay style */
        @media (max-width: 1023px) {
          .nav .menu-collapse {
            pointer-events: none;
            visibility: hidden;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            background-color: rgb(0, 0, 0);
            padding: 0.75rem 1.5rem;
            opacity: 0;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 99999;
          }

          .nav .menu-collapse.open {
            pointer-events: auto;
            visibility: visible;
            top: 100%;
            opacity: 1;
          }
        }
      `}</style>
    </header>
  );
}
