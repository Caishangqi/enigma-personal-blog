/**
 * ProjectCard component - matches design specification
 * Layout: Top heroImage (banner) + Bottom content area
 * Content area: Left icon + Right info (title, category, description, tags + last update)
 */
import type { ProjectCardProps } from '../../types';
import {
  truncateText,
  getRelativeTime,
  DEFAULT_CATEGORY_COLOR,
  DEFAULT_MAX_DESCRIPTION_LENGTH,
} from '../../utils';

export default function ProjectCard({
  slug,
  title,
  description,
  updatedDate,
  category,
  categoryColor = DEFAULT_CATEGORY_COLOR,
  heroImage,
  iconImage,
  tags = [],
  maxDescriptionLength = DEFAULT_MAX_DESCRIPTION_LENGTH,
}: ProjectCardProps) {
  const displayDescription = description
    ? truncateText(description, maxDescriptionLength)
    : '';

  const lastUpdateText = updatedDate
    ? `Last Update - ${getRelativeTime(updatedDate)}`
    : '';

  return (
    <a href={`/project/${slug}/`} className="project-card">
      {/* Hero Section: Banner + Icon (mobile only) */}
      <div className="hero-section">
        <div
          className="card-hero"
          style={{
            backgroundImage: heroImage ? `url("${heroImage}")` : undefined,
          }}
        />
        {/* Icon for mobile - overlays on banner bottom-left */}
        {iconImage && (
          <div className="icon-wrapper icon-mobile">
            <div
              className="card-icon"
              style={{
                backgroundImage: `url("${iconImage}")`,
              }}
            />
          </div>
        )}
      </div>

      {/* Content Section: Icon (desktop only) + Info */}
      <div className="content-section">
        {/* Icon for desktop - left side of content */}
        {iconImage && (
          <div className="icon-wrapper icon-desktop">
            <div
              className="card-icon"
              style={{
                backgroundImage: `url("${iconImage}")`,
              }}
            />
          </div>
        )}

        <div className="info-wrapper">
          {/* Title Row: Title (left) + Category (right) on mobile */}
          <div className="title-row">
            <h2 className="project-title">{title}</h2>
            {category && (
              <p className="project-category" style={{ color: categoryColor }}>
                {category}
              </p>
            )}
          </div>

          {/* Description */}
          {displayDescription && (
            <p className="project-description">{displayDescription}</p>
          )}

          {/* Footer Row: Tags + Last Update */}
          <div className="footer-row">
            {/* Tags */}
            {tags.length > 0 && (
              <div className="tags-group">
                {tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Last Update */}
            {lastUpdateText && (
              <div className="update-info">
                <span className="update-label">Last Update</span>
                <span className="separator">–</span>
                <span className="update-time">{getRelativeTime(updatedDate!)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </a>
  );
}
