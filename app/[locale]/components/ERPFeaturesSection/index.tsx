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

export function ERPFeaturesSection() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const gridContainerRef = useRef<HTMLDivElement | null>(null);

  const isHeaderVisible = useInViewOnce(headerRef);
  const isGridVisible = useInViewOnce(gridContainerRef);

  const cardRefsArray = useRef<(HTMLElement | null)[]>([]);
  const setCardRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      cardRefsArray.current[index] = el;
    },
    []
  );

  const moduleIds = useMemo(() => erpModules.map((m) => m.id), []);

  const { activeModuleId } = useScrollLinkedHighlight(
    cardRefsArray,
    moduleIds,
    isDesktop
  );

  const _highlightTargets = useMemo(() => {
    if (!activeModuleId) return [];
    const activeModule = erpModules.find((m) => m.id === activeModuleId);
    return activeModule ? activeModule.gridHighlightTargets : [];
  }, [activeModuleId]);

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
      <div className="mx-auto max-w-[1200px] 2xl:max-w-[1400px] px-6 md:px-10">

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
              'order-first lg:order-last ' +
              'w-full lg:w-[470px] lg:flex-shrink-0 ' +
              'lg:sticky lg:top-[24vh] lg:self-start ' +
              'flex justify-center ' +
              'mb-8 md:mb-12 lg:mb-0 ' +
              'transition-opacity duration-800 ease-out ' +
              (isGridVisible ? 'opacity-100' : 'opacity-0')
            }
            style={{ transitionDelay: '200ms' }}
          >
            <div
              className={
                'md:scale-[0.85] md:origin-top ' +
                'lg:scale-100 lg:origin-top'
              }
            >
              <ModuleGrid />
            </div>
          </div>

          {/* ---- Stacking Cards (left column) ----
               lg:pb-[200px] adds extra scroll runway so the sticky
               ModuleGrid remains in view long enough for all bottom
               cards (row e-f) to be visible before the section ends. */}
          <div ref={cardsContainerRef} className="flex-1 min-w-0 lg:pb-[200px]">
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
