import {
  Package,
  ClipboardList,
  Map,
  TrendingUp,
  FileText,
  Warehouse,
  Boxes,
  Users,
  Receipt,
  CreditCard,
  type LucideIcon,
} from 'lucide-react';

export interface Position {
  x: number;
  y: number;
}

export interface Module {
  id: string;
  key: string;
  icon: LucideIcon;
  position: Position;
  connectsTo: string[];
}

export interface ModuleGroup {
  id: string;
  labelKey: string;
  moduleIds: string[];
}

// ==========================================================================
// Grid Configuration
// ==========================================================================

export const GRID_CONFIG = {
  cardWidth: 95,
  cardHeight: 95,
  horizontalGap: 24,
  verticalGap: 24,
  edgePadding: 8,
} as const;

export const CARD_WIDTH = GRID_CONFIG.cardWidth;
export const CARD_HEIGHT = GRID_CONFIG.cardHeight;

// ==========================================================================
// Module Definitions - Staggered layout like Stripe
// ==========================================================================

// Base column: 0, 119, 238 (95 + 24 gap)
// Base row: 0, 119, 238, 357 (95 + 24 gap)
// Offset: ±15-25px for organic feel

export const modules: Module[] = [
  // Row 1: Order (left-low), WorkPlan (center-high), RouteOpt (right-low)
  {
    id: 'order',
    key: 'order',
    icon: Package,
    position: { x: 0, y: 25 },
    connectsTo: ['workPlan'],
  },
  {
    id: 'workPlan',
    key: 'workPlan',
    icon: ClipboardList,
    position: { x: 119, y: 0 },
    connectsTo: ['routeOptimization'],
  },
  {
    id: 'routeOptimization',
    key: 'routeOptimization',
    icon: Map,
    position: { x: 238, y: 20 },
    connectsTo: ['deliveryNote'],
  },
  
  // Row 2: Sales (left-high), CRM (center-low), DeliveryNote (right-high)
  {
    id: 'sales',
    key: 'sales',
    icon: TrendingUp,
    position: { x: 5, y: 134 },
    connectsTo: ['invoice'],
  },
  {
    id: 'crm',
    key: 'crm',
    icon: Users,
    position: { x: 119, y: 149 },
    connectsTo: ['sales'],
  },
  {
    id: 'deliveryNote',
    key: 'deliveryNote',
    icon: FileText,
    position: { x: 233, y: 139 },
    connectsTo: ['warehouse'],
  },
  
  // Row 3: Invoice (left-low), ProductMgmt (center-high), Warehouse (right-low)
  {
    id: 'invoice',
    key: 'invoice',
    icon: Receipt,
    position: { x: 10, y: 273 },
    connectsTo: ['payments'],
  },
  {
    id: 'productManagement',
    key: 'productManagement',
    icon: Boxes,
    position: { x: 119, y: 258 },
    connectsTo: ['crm'],
  },
  {
    id: 'warehouse',
    key: 'warehouse',
    icon: Warehouse,
    position: { x: 228, y: 278 },
    connectsTo: ['productManagement'],
  },
  
  // Row 4: Payments (center)
  {
    id: 'payments',
    key: 'payments',
    icon: CreditCard,
    position: { x: 119, y: 387 },
    connectsTo: [],
  },
];

// ==========================================================================
// Module Groups for Animation
// ==========================================================================

export const moduleGroups: ModuleGroup[] = [
  {
    id: 'orderIntake',
    labelKey: 'groups.orderIntake',
    moduleIds: ['order', 'workPlan'],
  },
  {
    id: 'planning',
    labelKey: 'groups.planning',
    moduleIds: ['routeOptimization', 'deliveryNote'],
  },
  {
    id: 'fulfillment',
    labelKey: 'groups.fulfillment',
    moduleIds: ['warehouse', 'productManagement'],
  },
  {
    id: 'customer',
    labelKey: 'groups.customer',
    moduleIds: ['crm', 'sales'],
  },
  {
    id: 'finance',
    labelKey: 'groups.finance',
    moduleIds: ['invoice', 'payments'],
  },
];

export const groupAnimationOrder = [
  'orderIntake',
  'planning',
  'fulfillment',
  'customer',
  'finance',
];

export const animationOrder = [
  'order',
  'workPlan',
  'routeOptimization',
  'deliveryNote',
  'warehouse',
  'productManagement',
  'crm',
  'sales',
  'invoice',
  'payments',
];

// ==========================================================================
// Utility Functions
// ==========================================================================

export function getModuleById(id: string): Module | undefined {
  return modules.find((m) => m.id === id);
}

export function getGroupById(id: string): ModuleGroup | undefined {
  return moduleGroups.find((g) => g.id === id);
}

export function getNextModuleId(currentId: string): string | null {
  const currentIndex = animationOrder.indexOf(currentId);
  if (currentIndex === -1 || currentIndex === animationOrder.length - 1) {
    return null;
  }
  return animationOrder[currentIndex + 1];
}

export function getGridBounds(): { width: number; height: number } {
  let maxX = 0;
  let maxY = 0;
  
  modules.forEach((m) => {
    maxX = Math.max(maxX, m.position.x + GRID_CONFIG.cardWidth);
    maxY = Math.max(maxY, m.position.y + GRID_CONFIG.cardHeight);
  });
  
  return { 
    width: maxX + GRID_CONFIG.edgePadding, 
    height: maxY + GRID_CONFIG.edgePadding 
  };
}
