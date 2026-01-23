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
// Grid Configuration - Stripe-inspired spacious layout
// ==========================================================================

export const GRID_CONFIG = {
  // Card dimensions (enlarged from 80x100)
  cardWidth: 140,
  cardHeight: 160,
  
  // Spacing corridors for connection lines
  horizontalCorridor: 48,  // Minimum horizontal gap between cards
  verticalCorridor: 40,    // Minimum vertical gap between cards
  diagonalClearance: 56,   // Clearance for diagonal connections
  
  // Container padding
  edgePadding: 16,
  
  // Calculated grid dimensions (updated based on new positions)
  width: 520,
  height: 680,
} as const;

// Legacy exports for backward compatibility
export const CARD_WIDTH = GRID_CONFIG.cardWidth;
export const CARD_HEIGHT = GRID_CONFIG.cardHeight;

// ==========================================================================
// Module Definitions with Spacious Positioning
// ==========================================================================

// Positions calculated with corridor spacing in mind
// Each card needs breathing room for connection lines
export const modules: Module[] = [
  {
    id: 'order',
    key: 'order',
    icon: Package,
    position: { x: 0, y: 24 },  // Top-left
    connectsTo: ['workPlan'],
  },
  {
    id: 'workPlan',
    key: 'workPlan',
    icon: ClipboardList,
    position: { x: 188, y: 0 },  // Top-right (140 + 48 corridor)
    connectsTo: ['routeOptimization'],
  },
  {
    id: 'routeOptimization',
    key: 'routeOptimization',
    icon: Map,
    position: { x: 376, y: 36 },  // Far right (188 + 188)
    connectsTo: ['deliveryNote'],
  },
  {
    id: 'sales',
    key: 'sales',
    icon: TrendingUp,
    position: { x: 12, y: 224 },  // Left column, row 2 (160 + 40 + 24)
    connectsTo: ['invoice'],
  },
  {
    id: 'crm',
    key: 'crm',
    icon: Users,
    position: { x: 188, y: 200 },  // Center column, row 2
    connectsTo: ['sales'],
  },
  {
    id: 'deliveryNote',
    key: 'deliveryNote',
    icon: FileText,
    position: { x: 364, y: 236 },  // Right column, row 2
    connectsTo: ['warehouse'],
  },
  {
    id: 'invoice',
    key: 'invoice',
    icon: Receipt,
    position: { x: 0, y: 424 },  // Left column, row 3 (224 + 160 + 40)
    connectsTo: ['payments'],
  },
  {
    id: 'productManagement',
    key: 'productManagement',
    icon: Boxes,
    position: { x: 176, y: 400 },  // Center column, row 3
    connectsTo: ['crm'],
  },
  {
    id: 'warehouse',
    key: 'warehouse',
    icon: Warehouse,
    position: { x: 370, y: 436 },  // Right column, row 3
    connectsTo: ['productManagement'],
  },
  {
    id: 'payments',
    key: 'payments',
    icon: CreditCard,
    position: { x: 164, y: 600 },  // Bottom center
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
  
  // Add padding
  return { 
    width: maxX + GRID_CONFIG.edgePadding, 
    height: maxY + GRID_CONFIG.edgePadding 
  };
}

// ==========================================================================
// Grid Validation (Development utility)
// ==========================================================================

interface ValidationResult {
  valid: boolean;
  issues: string[];
}

export function validateModulePositions(): ValidationResult {
  const issues: string[] = [];
  const { cardWidth, cardHeight, horizontalCorridor, verticalCorridor } = GRID_CONFIG;
  
  for (let i = 0; i < modules.length; i++) {
    for (let j = i + 1; j < modules.length; j++) {
      const m1 = modules[i];
      const m2 = modules[j];
      
      const dx = Math.abs(m1.position.x - m2.position.x);
      const dy = Math.abs(m1.position.y - m2.position.y);
      
      // Check horizontal neighbors
      if (dy < cardHeight * 0.7) {
        const horizontalGap = dx - cardWidth;
        if (horizontalGap > 0 && horizontalGap < horizontalCorridor) {
          issues.push(
            `"${m1.id}" and "${m2.id}" horizontal gap: ${horizontalGap}px (min: ${horizontalCorridor}px)`
          );
        }
      }
      
      // Check vertical neighbors
      if (dx < cardWidth * 0.7) {
        const verticalGap = dy - cardHeight;
        if (verticalGap > 0 && verticalGap < verticalCorridor) {
          issues.push(
            `"${m1.id}" and "${m2.id}" vertical gap: ${verticalGap}px (min: ${verticalCorridor}px)`
          );
        }
      }
    }
  }
  
  return { valid: issues.length === 0, issues };
}
