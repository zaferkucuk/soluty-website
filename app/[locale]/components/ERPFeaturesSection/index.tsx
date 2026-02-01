'use client';

import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { ModuleGrid } from '../ModuleGrid';
import { ModuleFeatureCard } from './ModuleFeatureCard';
import { useScrollLinkedHighlight } from './useScrollLinkedHighlight';
import { erpModules } from './erp-modules-data';

// ==========================================================================
// Hook: useMediaQuery
// ==========================================================================

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

// ==========================================================================
// Hook: useInViewOnce (for entry animations)
// ==========================================================================

function useInViewOnce(ref: React.RefObject<HTMLElement | null>): boolean {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return isVisible;
}

// ==========================================================================
// ERPFeaturesSection Component
// ==========================================================================

/**
 * ERP Features Section — Sticky two-column layout with scroll-linked
 * ModuleGrid highlighting.
 *
 * Desktop (≥1024px): Left scrollable card list + right sticky ModuleGrid
 * Tablet (768-1023px): Stacked — ModuleGrid above, 2-column card grid
 * Mobile (<768px): Stacked — ModuleGrid above, compact card stack
 *
 * Reference: docs/sections/erp-features-section-spec.md
 */
export function ERPFeaturesSection() {
  const t = useTranslations();
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  // Refs for section entry animation
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const gridContainerRef = useRef<HTMLDivElement | null>(null);

  const isSectionVisible = useInViewOnce(sectionRef);
  const isHeaderVisible = useInViewOnce(headerRef);
  const isGridVisible = useInViewOnce(gridContainerRef);

  // Card refs for IntersectionObserver
  const cardRefsArray = useRef<(HTMLElement | null)[]>([]);
  const setCardRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      cardRefsArray.current[index] = el;
    },
    []
  );

  // Module IDs for scroll hook
  const moduleIds = useMemo(() => erpModules.map((m) => m.id), []);

  // Scroll-linked highlight (desktop only)
  const { activeModuleId, isScrollLinked } = useScrollLinkedHighlight(
    cardRefsArray,
    moduleIds,
    isDesktop
  );

  // Compute highlight targets for ModuleGrid
  const highlightTargets = useMemo(() => {
    if (!activeModuleId) return [];
    const activeModule = erpModules.find((m) => m.id === activeModuleId);
    return activeModule ? activeModule.gridHighlightTargets : [];
  }, [activeModuleId]);

  // Cards visibility tracking (staggered entry)
  const [cardsVisible, setCardsVisible] = useState(false);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = cardsContainerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="erp-features"
      aria-labelledby="erp-features-heading"
      className="py-12 md:py-16 lg:py-24"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-16">

        {/* ---- Section Header ---- */}
        <div
          ref={headerRef}
          className={
            'text-center mx-auto mb-8 md:mb-12 lg:mb-16 ' +
            'transition-all duration-600 ease-out ' +
            (isHeaderVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6')
          }
          style={{ maxWidth: 720 }}
        >
          {/* Eyebrow */}
          <p
            className="caption mb-4"
            style={{
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-brand-primary)',
            }}
          >
            {t('erpFeatures.eyebrow')}
          </p>

          {/* Headline */}
          <h2
            id="erp-features-heading"
            className="heading-2"
          >
            {t('erpFeatures.headline')}
          </h2>

          {/* Subheadline */}
          <p
            className="body-lg mt-4 mx-auto"
            style={{ maxWidth: 640 }}
          >
            {t('erpFeatures.subheadline')}
          </p>
        </div>

        {/* ---- Two-Column Container ---- */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16">

          {/* ---- ModuleGrid (right on desktop, top on tablet/mobile) ---- */}
          <div
            ref={gridContainerRef}
            className={
              /* Mobile/Tablet: show above cards */
              'order-first lg:order-last ' +
              /* Desktop: sticky right column */
              'w-full lg:w-[520px] lg:flex-shrink-0 ' +
              'lg:sticky lg:top-24 lg:self-start ' +
              /* Centering for tablet/mobile */
              'flex justify-center ' +
              'mb-8 md:mb-12 lg:mb-0 ' +
              /* Entry animation */
              'transition-opacity duration-800 ease-out ' +
              (isGridVisible ? 'opacity-100' : 'opacity-0')
            }
            style={{ transitionDelay: '200ms' }}
          >
            <div
              className={
                /* Scale down on tablet */
                'md:scale-[0.85] md:origin-top ' +
                'lg:scale-100 lg:origin-top'
              }
            >
              <ModuleGrid
                highlightMode={isScrollLinked ? 'scroll-linked' : 'auto-cycle'}
                highlightTargets={highlightTargets}
              />
            </div>
          </div>

          {/* ---- Module Cards (left column) ---- */}
          <div
            ref={cardsContainerRef}
            role="list"
            aria-label={t('erpFeatures.eyebrow')}
            className={
              'flex-1 min-w-0 ' +
              /* Mobile: single column stack */
              'flex flex-col gap-3 ' +
              /* Tablet: 2-column grid */
              'md:grid md:grid-cols-2 md:gap-4 ' +
              /* Desktop: single column list */
              'lg:flex lg:flex-col lg:gap-4'
            }
          >
            {erpModules.map((module, index) => (
              <ModuleFeatureCard
                key={module.id}
                ref={setCardRef(index)}
                module={module}
                isActive={isDesktop && activeModuleId === module.id}
                isInactive={
                  isDesktop &&
                  isScrollLinked &&
                  activeModuleId !== null &&
                  activeModuleId !== module.id
                }
                index={index}
                isVisible={cardsVisible}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ERPFeaturesSection;
