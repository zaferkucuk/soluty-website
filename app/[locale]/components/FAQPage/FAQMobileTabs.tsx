'use client';

import { useEffect, useState, useRef } from 'react';

// Design tokens
const COLORS = {
  textSecondary: '#5C5A58',
  brandPrimary: '#4DB6A0',
  bgPrimary: '#FCFCFC',
};

const FONTS = {
  sans: "'DM Sans', system-ui, 'Helvetica Neue', Arial, sans-serif",
};

interface Category {
  id: string;
  navLabel: string;
}

interface FAQMobileTabsProps {
  categories: Category[];
}

/**
 * FAQMobileTabs — Mobile sticky category tabs
 *
 * Horizontal scrollable tabs that stick below header.
 * Hidden on desktop (>= 1024px).
 */
export function FAQMobileTabs({ categories }: FAQMobileTabsProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || '');
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-30% 0px -50% 0px',
        threshold: 0,
      }
    );

    categories.forEach((category) => {
      const element = document.getElementById(category.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      categories.forEach((category) => {
        const element = document.getElementById(category.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [categories]);

  // Scroll active tab into view
  useEffect(() => {
    const activeIndex = categories.findIndex((c) => c.id === activeCategory);
    const activeTab = tabRefs.current[activeIndex];
    if (activeTab && tabsRef.current) {
      activeTab.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeCategory, categories]);

  const handleClick = (categoryId: string) => {
    const element = document.getElementById(categoryId);
    if (element) {
      // Account for sticky header and tabs
      const yOffset = -120;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveCategory(categoryId);
    }
  };

  return (
    <div
      className="lg:hidden sticky top-16 z-10 -mx-6 px-6 py-3"
      style={{ backgroundColor: COLORS.bgPrimary }}
    >
      <div
        ref={tabsRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((category, index) => {
          const isActive = activeCategory === category.id;
          return (
            <button
              key={category.id}
              ref={(el) => { tabRefs.current[index] = el; }}
              onClick={() => handleClick(category.id)}
              className="flex-shrink-0 pb-2 text-sm font-medium transition-colors duration-150 whitespace-nowrap"
              style={{
                fontFamily: FONTS.sans,
                color: isActive ? COLORS.brandPrimary : COLORS.textSecondary,
                borderBottom: isActive
                  ? `2px solid ${COLORS.brandPrimary}`
                  : '2px solid transparent',
              }}
            >
              {category.navLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
}
