'use client';

import { useEffect, useState } from 'react';

// Design tokens
const COLORS = {
  textSecondary: '#5C5A58',
  brandPrimary: '#4DB6A0',
};

const FONTS = {
  sans: "'DM Sans', system-ui, 'Helvetica Neue', Arial, sans-serif",
};

interface Category {
  id: string;
  navLabel: string;
}

interface FAQSideNavProps {
  categories: Category[];
  ariaLabel: string;
}

/**
 * FAQSideNav — Desktop sticky side navigation
 *
 * Uses IntersectionObserver to highlight current category.
 * Hidden on mobile (< 1024px).
 */
export function FAQSideNav({ categories, ariaLabel }: FAQSideNavProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || '');

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
        rootMargin: '-20% 0px -60% 0px',
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

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, categoryId: string) => {
    e.preventDefault();
    const element = document.getElementById(categoryId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveCategory(categoryId);
    }
  };

  return (
    <nav
      aria-label={ariaLabel}
      className="hidden lg:block sticky top-24 w-56 flex-shrink-0"
    >
      <ul className="space-y-2">
        {categories.map((category) => {
          const isActive = activeCategory === category.id;
          return (
            <li key={category.id}>
              <a
                href={`#${category.id}`}
                onClick={(e) => handleClick(e, category.id)}
                aria-current={isActive ? 'true' : undefined}
                className="block py-2 px-3 text-[15px] transition-colors duration-150"
                style={{
                  fontFamily: FONTS.sans,
                  color: isActive ? COLORS.brandPrimary : COLORS.textSecondary,
                  fontWeight: isActive ? 600 : 400,
                  borderLeft: isActive
                    ? `2px solid ${COLORS.brandPrimary}`
                    : '2px solid transparent',
                }}
              >
                {category.navLabel}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
