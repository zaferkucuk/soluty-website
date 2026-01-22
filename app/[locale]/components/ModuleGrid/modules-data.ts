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

// Module group for group-based animation
export interface ModuleGroup {
  id: string;
  labelKey: string; // i18n key for group label
  moduleIds: string[];
}

// Card dimensions for reference
export const CARD_WIDTH = 80;
export const CARD_HEIGHT = 100;

// Organic layout - asymmetric, Stripe-inspired positioning
export const modules: Module[] = [
  {
    id: 'order',
    key: 'order',
    icon: Package,
    position: { x: 0, y: 20 },
    connectsTo: ['workPlan'],
  },
  {
    id: 'workPlan',
    key: 'workPlan',
    icon: ClipboardList,
    position: { x: 100, y: 0 },
    connectsTo: ['routeOptimization'],
  },
  {
    id: 'routeOptimization',
    key: 'routeOptimization',
    icon: Map,
    position: { x: 210, y: 30 },
    connectsTo: ['deliveryNote'],
  },
  {
    id: 'sales',
    key: 'sales',
    icon: TrendingUp,
    position: { x: 15, y: 130 },
    connectsTo: ['invoice'],
  },
  {
    id: 'crm',
    key: 'crm',
    icon: Users,
    position: { x: 115, y: 115 },
    connectsTo: ['sales'],
  },
  {
    id: 'deliveryNote',
    key: 'deliveryNote',
    icon: FileText,
    position: { x: 200, y: 140 },
    connectsTo: ['warehouse'],
  },
  {
    id: 'invoice',
    key: 'invoice',
    icon: Receipt,
    position: { x: 0, y: 250 },
    connectsTo: ['payments'],
  },
  {
    id: 'productManagement',
    key: 'productManagement',
    icon: Boxes,
    position: { x: 105, y: 235 },
    connectsTo: ['crm'],
  },
  {
    id: 'warehouse',
    key: 'warehouse',
    icon: Warehouse,
    position: { x: 215, y: 260 },
    connectsTo: ['productManagement'],
  },
  {
    id: 'payments',
    key: 'payments',
    icon: CreditCard,
    position: { x: 95, y: 365 },
    connectsTo: [],
  },
];

// Temporary groups - will be replaced with real business logic groups
// Each group highlights 2-3 related modules together
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

// Group animation order
export const groupAnimationOrder = [
  'orderIntake',
  'planning',
  'fulfillment',
  'customer',
  'finance',
];

// Legacy single-module animation order (kept for reference)
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

// Calculate grid bounds for SVG sizing
export function getGridBounds(): { width: number; height: number } {
  let maxX = 0;
  let maxY = 0;
  
  modules.forEach((m) => {
    maxX = Math.max(maxX, m.position.x + CARD_WIDTH);
    maxY = Math.max(maxY, m.position.y + CARD_HEIGHT);
  });
  
  return { width: maxX, height: maxY };
}
