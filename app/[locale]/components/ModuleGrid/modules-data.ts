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
  position: Position; // Organic absolute positioning
  connectsTo: string[];
}

// Card dimensions for reference
export const CARD_WIDTH = 80;
export const CARD_HEIGHT = 100;

// Organic layout - asymmetric, Stripe-inspired positioning
// Total grid area: ~320x450px
export const modules: Module[] = [
  {
    id: 'order',
    key: 'order',
    icon: Package,
    position: { x: 0, y: 20 },      // Top left, slight offset
    connectsTo: ['workPlan'],
  },
  {
    id: 'workPlan',
    key: 'workPlan',
    icon: ClipboardList,
    position: { x: 100, y: 0 },     // Top center, aligned top
    connectsTo: ['routeOptimization'],
  },
  {
    id: 'routeOptimization',
    key: 'routeOptimization',
    icon: Map,
    position: { x: 210, y: 30 },    // Top right, offset down
    connectsTo: ['deliveryNote'],
  },
  {
    id: 'sales',
    key: 'sales',
    icon: TrendingUp,
    position: { x: 15, y: 130 },    // Left side, second row
    connectsTo: ['invoice'],
  },
  {
    id: 'crm',
    key: 'crm',
    icon: Users,
    position: { x: 115, y: 115 },   // Center, offset
    connectsTo: ['sales'],
  },
  {
    id: 'deliveryNote',
    key: 'deliveryNote',
    icon: FileText,
    position: { x: 200, y: 140 },   // Right side, second row
    connectsTo: ['warehouse'],
  },
  {
    id: 'invoice',
    key: 'invoice',
    icon: Receipt,
    position: { x: 0, y: 250 },     // Left side, third row
    connectsTo: ['payments'],
  },
  {
    id: 'productManagement',
    key: 'productManagement',
    icon: Boxes,
    position: { x: 105, y: 235 },   // Center, third row
    connectsTo: ['crm'],
  },
  {
    id: 'warehouse',
    key: 'warehouse',
    icon: Warehouse,
    position: { x: 215, y: 260 },   // Right side, third row
    connectsTo: ['productManagement'],
  },
  {
    id: 'payments',
    key: 'payments',
    icon: CreditCard,
    position: { x: 95, y: 365 },    // Bottom center
    connectsTo: [],
  },
];

// Animation follows the ERP workflow flow
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
