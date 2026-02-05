/**
 * ERP Features Section — Module Data
 *
 * 13 module definitions for the ERP Features section.
 * Each module maps to highlight targets in the ModuleGrid component.
 *
 * Reference: docs/sections/erp-features-section-spec.md Section 2
 */

import {
  ClipboardList,
  BadgeDollarSign,
  CalendarDays,
  Route,
  Users,
  Warehouse,
  Package,
  Truck,
  Banknote,
  FileText,
  CreditCard,
  LayoutDashboard,
  TrendingDown,
  type LucideIcon,
} from 'lucide-react';

// ==========================================================================
// Types
// ==========================================================================

export type CategoryId =
  | 'order'
  | 'logistics'
  | 'sales'
  | 'inventory'
  | 'finance'
  | 'customer';

export interface ERPModule {
  /** Unique identifier */
  id: string;
  /** i18n key for title */
  titleKey: string;
  /** i18n key for category name */
  categoryKey: string;
  /** i18n key for description */
  descriptionKey: string;
  /** Lucide icon component */
  icon: LucideIcon;
  /** Category identifier for color mapping */
  categoryId: CategoryId;
  /** Module IDs to highlight in ModuleGrid */
  gridHighlightTargets: string[];
  /** Whether to highlight a single module or full group */
  gridHighlightType: 'single' | 'group';
  /** Group ID for full-group highlighting */
  gridGroupId?: number;
}

// ==========================================================================
// Category Colors
//
// Unified: all categories use neutral gray/black tones
// ==========================================================================

const NEUTRAL_GRAY = { color: '#4B5563', bg: 'rgba(107, 114, 128, 0.10)' };

export const CATEGORY_COLORS: Record<CategoryId, { color: string; bg: string }> = {
  order:     NEUTRAL_GRAY,
  logistics: NEUTRAL_GRAY,
  sales:     NEUTRAL_GRAY,
  inventory: NEUTRAL_GRAY,
  finance:   NEUTRAL_GRAY,
  customer:  NEUTRAL_GRAY,
};

// ==========================================================================
// 13 Module Definitions (from spec Section 2.1 + 2.3)
// ==========================================================================

export const erpModules: ERPModule[] = [
  {
    id: 'orders',
    titleKey: 'erpFeatures.modules.orders.title',
    categoryKey: 'erpFeatures.modules.orders.category',
    descriptionKey: 'erpFeatures.modules.orders.description',
    icon: ClipboardList,
    categoryId: 'order',
    gridHighlightTargets: ['orders', 'deals'],
    gridHighlightType: 'group',
    gridGroupId: 1,
  },
  {
    id: 'sales',
    titleKey: 'erpFeatures.modules.sales.title',
    categoryKey: 'erpFeatures.modules.sales.category',
    descriptionKey: 'erpFeatures.modules.sales.description',
    icon: BadgeDollarSign,
    categoryId: 'sales',
    gridHighlightTargets: ['sales', 'invoice', 'esignature'],
    gridHighlightType: 'group',
    gridGroupId: 3,
  },
  {
    id: 'planning',
    titleKey: 'erpFeatures.modules.planning.title',
    categoryKey: 'erpFeatures.modules.planning.category',
    descriptionKey: 'erpFeatures.modules.planning.description',
    icon: CalendarDays,
    categoryId: 'logistics',
    gridHighlightTargets: ['planning'],
    gridHighlightType: 'single',
  },
  {
    id: 'route',
    titleKey: 'erpFeatures.modules.route.title',
    categoryKey: 'erpFeatures.modules.route.category',
    descriptionKey: 'erpFeatures.modules.route.description',
    icon: Route,
    categoryId: 'logistics',
    gridHighlightTargets: ['route'],
    gridHighlightType: 'single',
  },
  {
    id: 'crm',
    titleKey: 'erpFeatures.modules.crm.title',
    categoryKey: 'erpFeatures.modules.crm.category',
    descriptionKey: 'erpFeatures.modules.crm.description',
    icon: Users,
    categoryId: 'customer',
    gridHighlightTargets: ['crm'],
    gridHighlightType: 'single',
  },
  {
    id: 'warehouse',
    titleKey: 'erpFeatures.modules.warehouse.title',
    categoryKey: 'erpFeatures.modules.warehouse.category',
    descriptionKey: 'erpFeatures.modules.warehouse.description',
    icon: Warehouse,
    categoryId: 'inventory',
    gridHighlightTargets: ['warehouse'],
    gridHighlightType: 'single',
  },
  {
    id: 'products',
    titleKey: 'erpFeatures.modules.products.title',
    categoryKey: 'erpFeatures.modules.products.category',
    descriptionKey: 'erpFeatures.modules.products.description',
    icon: Package,
    categoryId: 'inventory',
    gridHighlightTargets: ['products'],
    gridHighlightType: 'single',
  },
  {
    id: 'delivery',
    titleKey: 'erpFeatures.modules.delivery.title',
    categoryKey: 'erpFeatures.modules.delivery.category',
    descriptionKey: 'erpFeatures.modules.delivery.description',
    icon: Truck,
    categoryId: 'logistics',
    gridHighlightTargets: ['planning', 'route'],
    gridHighlightType: 'group',
    gridGroupId: 2,
  },
  {
    id: 'cashbox',
    titleKey: 'erpFeatures.modules.cashbox.title',
    categoryKey: 'erpFeatures.modules.cashbox.category',
    descriptionKey: 'erpFeatures.modules.cashbox.description',
    icon: Banknote,
    categoryId: 'finance',
    gridHighlightTargets: ['cashbox'],
    gridHighlightType: 'single',
  },
  {
    id: 'waybillInvoice',
    titleKey: 'erpFeatures.modules.waybillInvoice.title',
    categoryKey: 'erpFeatures.modules.waybillInvoice.category',
    descriptionKey: 'erpFeatures.modules.waybillInvoice.description',
    icon: FileText,
    categoryId: 'sales',
    gridHighlightTargets: ['invoice'],
    gridHighlightType: 'single',
  },
  {
    id: 'payments',
    titleKey: 'erpFeatures.modules.payments.title',
    categoryKey: 'erpFeatures.modules.payments.category',
    descriptionKey: 'erpFeatures.modules.payments.description',
    icon: CreditCard,
    categoryId: 'finance',
    gridHighlightTargets: ['payments'],
    gridHighlightType: 'single',
  },
  {
    id: 'reporting',
    titleKey: 'erpFeatures.modules.reporting.title',
    categoryKey: 'erpFeatures.modules.reporting.category',
    descriptionKey: 'erpFeatures.modules.reporting.description',
    icon: LayoutDashboard,
    categoryId: 'customer',
    gridHighlightTargets: ['dashboard'],
    gridHighlightType: 'single',
  },
  {
    id: 'expenses',
    titleKey: 'erpFeatures.modules.expenses.title',
    categoryKey: 'erpFeatures.modules.expenses.category',
    descriptionKey: 'erpFeatures.modules.expenses.description',
    icon: TrendingDown,
    categoryId: 'finance',
    gridHighlightTargets: ['expenses'],
    gridHighlightType: 'single',
  },
];
