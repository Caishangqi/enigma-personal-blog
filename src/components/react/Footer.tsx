import type { FooterProps, SocialPlatform } from '../../types';

// Piston image URLs - these should be imported in the parent component
interface FooterWithPistonProps extends FooterProps {
  pistonImages?: {
    base: string;
    head: string;
    neck: string;
  };
}

// Social platform icons (inline SVG)
function SocialIcon({ platform }: { platform: SocialPlatform }) {
  switch (platform) {
    case 'github':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      );
    case 'twitter':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      );
    case 'linkedin':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      );
    case 'discord':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
      );
    default:
      return null;
  }
}

export default function Footer({ email, socialLinks, copyright, pistonImages }: FooterWithPistonProps) {
  return (
    <footer className="page-footer relative mt-16 mb-4 lg:mb-16 rounded-md" style={{ backgroundColor: 'rgb(250, 192, 33)' }}>
      {/* Piston decoration with hover animation - controlled by CSS */}
      {pistonImages && (
        <a
          href="#"
          className="hidden md:block piston"
        >
          {/* Piston head - moves down on hover via CSS */}
          <div className="head">
            <div
              className="top"
              style={{ backgroundImage: `url(${pistonImages.head})` }}
            />
            <div
              className="neck"
              style={{ backgroundImage: `url(${pistonImages.neck})` }}
            />
          </div>
          {/* Piston base - static */}
          <div
            className="base"
            style={{ backgroundImage: `url(${pistonImages.base})` }}
          />
        </a>
      )}

      {/* Top section - bg-yellow-500 like Origin Realms */}
      <div className="top rounded-t-md bg-yellow-500">
        <div className="md:ml-piston py-2 px-8 md:flex md:items-center md:justify-between">
          {/* Site name - text-orange-900 like Origin Realms */}
          <div className="server-wrap flex relative font-bold uppercase justify-center lg:items-stretch transition-opacity hover:opacity-80 text-orange-900 cursor-pointer">
            <span className="server bg-yellow-600 tracking-wide py-2 px-4 rounded-md mr-2">
              Enigma Blog
            </span>
          </div>

          {/* Social links - text-orange-900 with opacity like Origin Realms */}
          <div className="socials flex flex-wrap justify-center mt-4 md:mt-0 text-orange-900">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 transition-opacity opacity-50 hover:opacity-75"
                aria-label={link.label}
              >
                <SocialIcon platform={link.platform} />
                <span className="sr-only">{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom section with copyright - text colors like Origin Realms */}
      <div className="text md:ml-piston leading-tight py-6 px-8">
        {/* First line - text-black */}
        <div className="text-black">
          {copyright}{' '}
          <a
            href={`mailto:${email}`}
            className="hover:underline"
          >
            {email}
          </a>
        </div>
        {/* Second line - text-orange-900 */}
        <div className="text-orange-900">
          Built with Astro + React. Inspired by Origin Realms.
        </div>
      </div>
    </footer>
  );
}
