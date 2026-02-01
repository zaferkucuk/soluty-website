'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * useScrollLinkedHighlight
 *
 * IntersectionObserver-based hook that detects which module card
 * is currently in the viewport center band and reports the active module ID.
 *
 * Desktop only — returns null activeModuleId on tablet/mobile.
 *
 * Reference: docs/sections/erp-features-section-spec.md Section 6.2
 */

export interface ScrollLinkedState {
  /** Currently active module ID (null if none in center) */
  activeModuleId: string | null;
  /** Whether scroll-linked mode is engaged */
  isScrollLinked: boolean;
}

export function useScrollLinkedHighlight(
  cardRefs: React.RefObject<(HTMLElement | null)[]>,
  moduleIds: string[],
  enabled: boolean = true
): ScrollLinkedState {
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [isScrollLinked, setIsScrollLinked] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const visibilityMap = useRef<Map<string, number>>(new Map());

  // Debounced update: pick the most-visible card
  const updateActiveModule = useCallback(() => {
    let bestId: string | null = null;
    let bestRatio = 0;

    visibilityMap.current.forEach((ratio, id) => {
      if (ratio > bestRatio) {
        bestRatio = ratio;
        bestId = id;
      }
    });

    if (bestRatio >= 0.4) {
      setActiveModuleId(bestId);
      setIsScrollLinked(true);
    } else {
      setActiveModuleId(null);
      setIsScrollLinked(false);
    }
  }, []);

  useEffect(() => {
    if (!enabled) {
      setActiveModuleId(null);
      setIsScrollLinked(false);
      return;
    }

    const cards = cardRefs.current;
    if (!cards || cards.length === 0) return;

    // Disconnect previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Spec: rootMargin '-40% 0px -40% 0px' → center ~20% band
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const moduleId = (entry.target as HTMLElement).dataset.moduleId;
          if (!moduleId) return;

          if (entry.isIntersecting) {
            visibilityMap.current.set(moduleId, entry.intersectionRatio);
          } else {
            visibilityMap.current.delete(moduleId);
          }
        });

        updateActiveModule();
      },
      {
        root: null,
        rootMargin: '-40% 0px -40% 0px',
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
      }
    );

    // Observe all card elements
    cards.forEach((card) => {
      if (card) {
        observerRef.current!.observe(card);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      visibilityMap.current.clear();
    };
  }, [enabled, cardRefs, moduleIds, updateActiveModule]);

  return { activeModuleId, isScrollLinked };
}
