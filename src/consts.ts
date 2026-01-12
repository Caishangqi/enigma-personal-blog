/**
 * Site constants and configuration
 * Import this data from anywhere in your site
 */

import type { NavLink, SocialLink } from './types';

// Site metadata
export const SITE_TITLE = 'Enigma Blog';
export const SITE_DESCRIPTION = 'Personal blog and portfolio - sharing thoughts on development, projects, and more.';

// Navigation links (following originrealms.com structure)
export const NAV_LINKS: NavLink[] = [
  { label: 'HOME', href: '/' },
  { label: 'BLOG', href: '/blog' },
  { label: 'PROJECT', href: '/project' },
  { label: 'RESUME', href: '/resume' },
];

// Social media links
export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'github', url: 'https://github.com/username', label: 'GitHub' },
  { platform: 'twitter', url: 'https://twitter.com/username', label: 'Twitter' },
  { platform: 'linkedin', url: 'https://linkedin.com/in/username', label: 'LinkedIn' },
  { platform: 'discord', url: 'https://discord.gg/username', label: 'Discord' },
];

// Author information
export const AUTHOR = {
  name: 'Your Name',
  email: 'your@email.com',
  avatar: '/images/avatar.png',
};

// Footer configuration
export const FOOTER_CONFIG = {
  copyright: `© ${new Date().getFullYear()} ${AUTHOR.name}. All rights reserved.`,
  email: AUTHOR.email,
};
