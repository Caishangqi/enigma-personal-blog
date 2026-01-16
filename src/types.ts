/**
 * Shared TypeScript type definitions for React components
 */

// Navigation link for header menu
export interface NavLink {
  label: string;
  href: string;
}

// Social media platform types
export type SocialPlatform = 'github' | 'twitter' | 'linkedin' | 'discord';

// Social link for footer and social section
export interface SocialLink {
  platform: SocialPlatform;
  url: string;
  label: string;
}

// Tech stack item for about section slider (from Content Collection)
export interface TechMember {
  name: string;
  role: string;
  color: string;       // roleColor from frontmatter
  description: string;
  icon: string;        // Small icon for selector (32x32)
  portrait: string;    // Large portrait image for display
}

// Blog post preview for news section
export interface BlogPostPreview {
  slug: string;
  title: string;
  description?: string;
  pubDate: Date;
  category?: string;
  categoryColor?: string;
  heroImage?: string;
  // Raw body content for excerpt generation when no description
  body?: string;
}

// BlogCard component props (matches Origin Realms structure)
export interface BlogCardProps {
  slug: string;
  title: string;
  description?: string;
  pubDate: Date;
  category?: string;
  categoryColor?: string;
  backgroundImage?: string;
  // Maximum characters for description truncation (Origin Realms uses ~200)
  maxDescriptionLength?: number;
}

// Header component props
export interface HeaderProps {
  siteTitle: string;
  navLinks: NavLink[];
  socialLinks: SocialLink[];
  currentPath?: string; // Current page path for active state highlighting
}

// Hero section props
export interface HeroSectionProps {
  imageSrc: string;
  imageAlt: string;
}

// News section props
export interface NewsSectionProps {
  posts: BlogPostPreview[];
  viewAllLink: string;
}

// About section props
export interface AboutSectionProps {
  title: string;
  subtitle: string;
  members: TechMember[];
  cycleDuration?: number;
}

// Social section props
export interface SocialSectionProps {
  title: string;
  description: string;
  links: SocialLink[];
  decorationImage: string;
}

// Footer props
export interface FooterProps {
  email: string;
  socialLinks: SocialLink[];
  copyright: string;
}

// Page loader props
export interface PageLoaderProps {
  isLoading: boolean;
  loadingImage: string;
}

// Blog post for LookingForMore component (simplified version of BlogPostPreview)
export interface BlogPost {
  slug: string;
  title: string;
  pubDate: Date;
  category?: string;
  heroImage?: string;
}

// LookingForMore component props
export interface LookingForMoreProps {
  posts: BlogPost[];
}

// Project link item
export interface ProjectLink {
  name: string;
  url: string;
}

// ProjectCard component props (matches design specification)
export interface ProjectCardProps {
  slug: string;
  title: string;
  description?: string;
  updatedDate?: Date;
  category?: string;
  categoryColor?: string;
  heroImage?: string;
  iconImage?: string;
  tags?: string[];
  // Maximum characters for description truncation
  maxDescriptionLength?: number;
}
