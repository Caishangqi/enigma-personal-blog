import { useState, useEffect, useCallback } from 'react';
import type { AboutSectionProps } from '../../types';

// Progress bar update interval (ms)
const PROGRESS_INTERVAL = 50;

// Pixel-style left arrow SVG
const LeftArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
    <path d="M18 22H14V18H18L18 22Z" />
    <path d="M10 14H14L14 18H10L10 14Z" />
    <path d="M10 10L10 14L6 14L6 10H10Z" />
    <path d="M14 6L10 6V10L14 10L14 6Z" />
    <path d="M14 6V2L18 2V6L14 6Z" />
  </svg>
);

// Pixel-style right arrow SVG
const RightArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
    <path d="M6 2H10V6H6V2Z" />
    <path d="M14 10H10V6H14V10Z" />
    <path d="M14 14V10H18V14H14Z" />
    <path d="M10 18H14V14H10V18Z" />
    <path d="M10 18V22H6V18H10Z" />
  </svg>
);

export default function AboutSection({
  title,
  subtitle,
  members,
  cycleDuration = 8000
}: AboutSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Current and previous members
  const currentMember = members[currentIndex];
  const previousMember = previousIndex !== null ? members[previousIndex] : null;

  // Avatar width constant for dynamic container sizing (w-8 = 32px + mr-2 = 8px gap)
  const AVATAR_WIDTH = 40; // 32px button + 8px margin

  // Handle member change with transition
  const changeMember = useCallback((newIndex: number) => {
    if (newIndex === currentIndex || isTransitioning) return;

    setPreviousIndex(currentIndex);
    setCurrentIndex(newIndex);
    setIsTransitioning(true);
    setProgress(0);

    // End transition after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
      setPreviousIndex(null);
    }, 300);
  }, [currentIndex, isTransitioning]);

  // Advance to next member
  const goToNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % members.length;
    changeMember(nextIndex);
  }, [currentIndex, members.length, changeMember]);

  // Go to previous member
  const goToPrev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + members.length) % members.length;
    changeMember(prevIndex);
  }, [currentIndex, members.length, changeMember]);

  // Progress bar animation
  useEffect(() => {
    if (isPaused || members.length <= 1 || isTransitioning) return;

    const progressStep = (PROGRESS_INTERVAL / cycleDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + progressStep;
        if (next >= 100) {
          goToNext();
          return 0;
        }
        return next;
      });
    }, PROGRESS_INTERVAL);

    return () => clearInterval(timer);
  }, [isPaused, cycleDuration, goToNext, members.length, isTransitioning]);

  // Pause on hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  if (members.length === 0) {
    return null;
  }

  return (
    <section
      className="bg-parchment text-black rounded-md relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="lg:grid lg:grid-cols-5">
        {/* Left side - Member info */}
        <div className="left lg:col-span-3 pt-8 px-6 md:pr-0 lg:pl-12">
          {/* Section title */}
          <div className="text-2xl font-bold">{title}</div>
          <p className="mb-6 text-[#603d25]">
            {subtitle}
          </p>

          {/* Member info container with transition */}
          <div className="relative md:h-[220px]">
            {/* Previous member (fading out) */}
            {isTransitioning && previousMember && (
              <div className="absolute inset-0 animate-fade-out">
                <div
                  className="font-bold mb-2 flex flex-col md:flex-row items-center"
                  style={{ color: previousMember.color }}
                >
                  <div className="text-xl mb-1 md:mb-0 sm:mr-3">
                    {previousMember.name}
                  </div>
                  <div className="font-bold uppercase px-3 py-1 leading-none bg-current rounded-md mb-2 md:mb-0">
                    <span className="text-white text-sm">{previousMember.role}</span>
                  </div>
                </div>
                <p className="text-lg pb-8 font-medium">
                  {previousMember.description}
                </p>
              </div>
            )}

            {/* Current member (fading in or static) */}
            <div className={isTransitioning ? 'animate-fade-in' : ''}>
              <div
                className="font-bold mb-2 flex flex-col md:flex-row items-center"
                style={{ color: currentMember.color }}
              >
                <div className="text-xl mb-1 md:mb-0 sm:mr-3">
                  {currentMember.name}
                </div>
                <div className="font-bold uppercase px-3 py-1 leading-none bg-current rounded-md mb-2 md:mb-0">
                  <span className="text-white text-sm">{currentMember.role}</span>
                </div>
              </div>
              <p className="text-lg pb-8 font-medium">
                {currentMember.description}
              </p>
            </div>
          </div>

          {/* Member selector with arrows - dynamic width based on member count */}
          <div className="flex h-20 pb-8 items-center">
            {/* Left arrow button */}
            <button
              onClick={goToPrev}
              className="p-1 mr-3 hover:text-orange-500 transition-colors"
              aria-label="Previous member"
            >
              <LeftArrowIcon />
            </button>

            {/* Avatar container - width calculated from member count */}
            <div
              className="flex items-center"
              style={{ width: `${members.length * AVATAR_WIDTH - 8}px` }}
            >
              {members.map((member, index) => (
                <button
                  key={index}
                  onClick={() => changeMember(index)}
                  className="w-8 h-8 relative flex-shrink-0 mr-2 last:mr-0"
                  aria-label={`Select ${member.name}`}
                >
                  <img
                    src={member.icon}
                    alt={member.name}
                    className={`rounded-sm w-8 h-8 transition-transform duration-150 ease-out ${
                      index === currentIndex ? '' : 'translate-y-2'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Right arrow button */}
            <button
              onClick={goToNext}
              className="p-1 ml-3 hover:text-orange-500 transition-colors"
              aria-label="Next member"
            >
              <RightArrowIcon />
            </button>
          </div>
        </div>

        {/* Right side - Portrait display (hidden on mobile via no height) */}
        <div className="right relative overflow-hidden lg:col-span-2">
          {/* Previous portrait (fading out) */}
          {isTransitioning && previousMember && (
            <div
              className="w-full h-full bg-[length:110%_auto] bg-[left_1.6rem_top_-3.5rem] absolute top-0 right-0 bottom-0 bg-no-repeat animate-fade-out"
              style={{
                backgroundImage: `url(${previousMember.portrait})`,
              }}
            />
          )}

          {/* Current portrait (fading in or static) */}
          <div
            className={`w-full h-full bg-[length:110%_auto] bg-[left_1.6rem_top_-3.5rem] absolute top-0 right-0 bottom-0 bg-no-repeat ${
              isTransitioning ? 'animate-fade-in' : ''
            }`}
            style={{
              backgroundImage: `url(${currentMember.portrait})`,
            }}
          />
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/10 rounded-b-md overflow-hidden">
        <div
          className="progress absolute z-10 left-0 h-1.5 bg-orange-500 rounded-lg transition-all"
          style={{
            width: `${progress}%`,
            transitionDuration: isPaused ? '0ms' : `${PROGRESS_INTERVAL}ms`
          }}
        />
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-fade-out {
          animation: fadeOut 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
