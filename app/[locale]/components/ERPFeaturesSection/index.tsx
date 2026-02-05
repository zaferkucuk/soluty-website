'use client';

import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { ModuleGrid } from '../ModuleGrid';
import { ERPFeaturesHeader } from './ERPFeaturesHeader';
import { ERPStackingCardList } from './ERPStackingCardList';
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
 * ERP Features Section — Stacking cards v2.0
 *
 * Left column: Sticky stacking cards (CSS position: sticky)
 * Right column: Sticky ModuleGrid with scroll-linked highlighting
 *
 * Desktop (>=1024px): Two columns, left stacking cards + right sticky ModuleGrid
 * Tablet (768-1023px): Single column, ModuleGrid above, stacking cards below
 * Mobile (<768px): Single column, ModuleGrid above, stacking cards below
 *
 * Reference: erp-features-stacking-cards-v2 spec
 */
export function ERPFeaturesSection() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  // Refs for section entry animation
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const gridContainerRef = useRef<HTMLDivElement | null>(null);

  const isHeaderVisible = useInViewOnce(headerRef);
  const isGridVisible = useInViewOnce(gridContainerRef);

  // Card refs for IntersectionObserver (scroll-linked grid highlight)
  const cardRefsArray = useRef<(HTMLElement | null)[]>([]);
  const setCardRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      cardRefsArray.current[index] = el;
    },
    []
  );

  // Module IDs for scroll hook
  const moduleIds = useMemo(() => erpModules.map((m) => m.id), []);

  // Scroll-linked highlight (desktop only) — for ModuleGrid
  const { activeModuleId } = useScrollLinkedHighlight(
    cardRefsArray,
    moduleIds,
    isDesktop
  );

  // Compute highlight targets for ModuleGrid (prepared for future use)
  const _highlightTargets = useMemo(() => {
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
        <div ref={headerRef}>
          <ERPFeaturesHeader isVisible={isHeaderVisible} />
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
              'lg:sticky lg:top-[96px] lg:self-start ' +
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
              {/* TODO: Add highlightMode and highlightTargets props
                        when ModuleGrid prop support is implemented */}
              <ModuleGrid />
            </div>
          </div>

          {/* ---- Stacking Cards (left column) ---- */}
          <div ref={cardsContainerRef} className="flex-1 min-w-0">
            <ERPStackingCardList
              setCardRef={setCardRef}
              cardsVisible={cardsVisible}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ERPFeaturesSection;
