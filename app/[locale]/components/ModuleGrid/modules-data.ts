import {
  ClipboardList,
  Handshake,
  CalendarDays,
  Route,
  BadgeDollarSign,
  FileText,
  PenTool,
  Warehouse,
  Package,
  Landmark,
  CreditCard,
  Banknote,
  TrendingDown,
  Users,
  LayoutDashboard,
  Bell,
  type LucideIcon,
} from 'lucide-react';

// ==========================================================================
// Types
// ==========================================================================

export type GridColumn = 1 | 2 | 3 | 4 | 5 | 6;
export type GridRow = 'a' | 'b' | 'c' | 'd' | 'e' | 'f';

export interface GridPosition {
  col: GridColumn;
  row: GridRow;
}

export interface Module {
  id: string;
  key: string;
  icon: LucideIcon;
  gridPosition: GridPosition;
  groupId: number;
}

export interface ModuleGroup {
  id: number;
  name: string;
  sourceModuleId: string;
  targetModuleIds: string[];
}

// ==========================================================================
// Design Tokens (from v4 spec)
// Sizes reduced ~10% to ensure full grid visibility within scroll area
// ==========================================================================

export const DESIGN_TOKENS = {
  // Card dimensions (~10% smaller)
  card: {
    desktop: { width: 72, height: 72, radius: 14, iconSize: 28, fontSize: 10, gap: 22 },
    tablet: { width: 65, height: 65, radius: 13, iconSize: 26, fontSize: 9, gap: 18 },
    mobile: { width: 58, height: 58, radius: 11, iconSize: 22, fontSize: 9, gap: 14 },
  },

  // Animation
  animation: {
    groupDuration: 3500, // ms
    transitionDuration: 400, // ms
    flowParticleDuration: 2000, // ms
  },

  // Colors
  colors: {
    inactiveIcon: '#9CA3AF',
    inactiveIconOpacity: 0.35,
    hoverIconOpacity: 0.55,
    activeLabel: '#1F2937',
    inactiveLabel: '#9CA3AF',
  },

  // Connection lines
  lines: {
    widthInactive: 2.5,
    widthActive: 3.5,
    glowBlur: 8,
    glowOpacity: 0.4,
  },
} as const;

// ==========================================================================
// Grid Configuration
// ==========================================================================

export const GRID_CONFIG = {
  desktop: {
    columns: 6,
    rows: 6,
    cardSize: DESIGN_TOKENS.card.desktop.width,
    gap: DESIGN_TOKENS.card.desktop.gap,
  },
  mobile: {
    columns: 4,
    rows: 6,
    cardSize: DESIGN_TOKENS.card.mobile.width,
    gap: DESIGN_TOKENS.card.mobile.gap,
  },
} as const;

// ==========================================================================
// Icon Gradient System (per group)
//
// Derived from Soluty brand palette:
//   #4DB6A0  (brand teal)
//   #332436  (deep plum)
//   #be95c2  (soft lavender)
//   #363439  (charcoal)
// ==========================================================================

export const GROUP_GRADIENTS: Record<number, {
  start: string;
  end: string;
  glow: string;
}> = {
  1: { start: '#4DB6A0', end: '#be95c2', glow: 'rgba(133, 166, 177, 0.3)' },  // Order – Teal → Lavender
  2: { start: '#4DB6A0', end: '#be95c2', glow: 'rgba(133, 166, 177, 0.3)' },  // Logistics – Teal → Lavender
  3: { start: '#4DB6A0', end: '#be95c2', glow: 'rgba(133, 166, 177, 0.3)' },  // Sales – Teal → Lavender
  4: { start: '#4DB6A0', end: '#be95c2', glow: 'rgba(133, 166, 177, 0.3)' },  // Inventory – Teal → Lavender
  5: { start: '#4DB6A0', end: '#be95c2', glow: 'rgba(133, 166, 177, 0.3)' },  // Finance – Teal → Lavender
  6: { start: '#4DB6A0', end: '#be95c2', glow: 'rgba(133, 166, 177, 0.3)' },  // Customer – Teal → Lavender
};

// ==========================================================================
// Module Definitions (16 modules)
// ==========================================================================

/*
Grid Position Map:
        Col 1    Col 2    Col 3    Col 4    Col 5    Col 6
Row a  |        |        |WAREHOU |        |        |        |
Row b  | ORDERS |        |        | DEALS  | SALES  |DASHBRD |
Row c  |        |        |PRODUCTS|  CRM   |        |E-SIGN  |
Row d  |PLANNING|        |        |DEPOSITS| NOTIFS |        |
Row e  |        |        | ROUTE  |CASHBOX |INVOICE |        |
Row f  |        |PAYMENTS|        |        |        |EXPENSES|
*/

export const modules: Module[] = [
  // Group 1: Order Management
  { id: 'orders', key: 'orders', icon: ClipboardList, gridPosition: { col: 1, row: 'b' }, groupId: 1 },
  { id: 'deals', key: 'deals', icon: Handshake, gridPosition: { col: 4, row: 'b' }, groupId: 1 },

  // Group 2: Logistics
  { id: 'planning', key: 'planning', icon: CalendarDays, gridPosition: { col: 1, row: 'd' }, groupId: 2 },
  { id: 'route', key: 'route', icon: Route, gridPosition: { col: 3, row: 'e' }, groupId: 2 },

  // Group 3: Sales & Billing
  { id: 'sales', key: 'sales', icon: BadgeDollarSign, gridPosition: { col: 5, row: 'b' }, groupId: 3 },
  { id: 'invoice', key: 'invoice', icon: FileText, gridPosition: { col: 5, row: 'e' }, groupId: 3 },
  { id: 'esignature', key: 'esignature', icon: PenTool, gridPosition: { col: 6, row: 'c' }, groupId: 3 },

  // Group 4: Inventory
  { id: 'warehouse', key: 'warehouse', icon: Warehouse, gridPosition: { col: 3, row: 'a' }, groupId: 4 },
  { id: 'products', key: 'products', icon: Package, gridPosition: { col: 3, row: 'c' }, groupId: 4 },
  { id: 'deposits', key: 'deposits', icon: Landmark, gridPosition: { col: 4, row: 'd' }, groupId: 4 },

  // Group 5: Finance
  { id: 'payments', key: 'payments', icon: CreditCard, gridPosition: { col: 2, row: 'f' }, groupId: 5 },
  { id: 'cashbox', key: 'cashbox', icon: Banknote, gridPosition: { col: 4, row: 'e' }, groupId: 5 },
  { id: 'expenses', key: 'expenses', icon: TrendingDown, gridPosition: { col: 6, row: 'f' }, groupId: 5 },

  // Group 6: Customer
  { id: 'crm', key: 'crm', icon: Users, gridPosition: { col: 4, row: 'c' }, groupId: 6 },
  { id: 'dashboard', key: 'dashboard', icon: LayoutDashboard, gridPosition: { col: 6, row: 'b' }, groupId: 6 },
  { id: 'notifications', key: 'notifications', icon: Bell, gridPosition: { col: 5, row: 'd' }, groupId: 6 },
];

// ==========================================================================
// Group Definitions (6 groups with parallel branching)
// ==========================================================================

export const moduleGroups: ModuleGroup[] = [
  {
    id: 1,
    name: 'Order Management',
    sourceModuleId: 'orders',
    targetModuleIds: ['deals'],
  },
  {
    id: 2,
    name: 'Logistics',
    sourceModuleId: 'planning',
    targetModuleIds: ['route'],
  },
  {
    id: 3,
    name: 'Sales & Billing',
    sourceModuleId: 'sales',
    targetModuleIds: ['esignature', 'invoice'],
  },
  {
    id: 4,
    name: 'Inventory',
    sourceModuleId: 'products',
    targetModuleIds: ['warehouse', 'deposits'],
  },
  {
    id: 5,
    name: 'Finance',
    sourceModuleId: 'payments',
    targetModuleIds: ['cashbox', 'expenses'],
  },
  {
    id: 6,
    name: 'Customer',
    sourceModuleId: 'crm',
    targetModuleIds: ['dashboard', 'notifications'],
  },
];

export const GROUP_COUNT = moduleGroups.length;

// ==========================================================================
// Mobile Grid Positions (4x6)
// ==========================================================================

export const mobileGridPositions: Record<string, GridPosition> = {
  orders: { col: 1, row: 'b' },
  deals: { col: 2, row: 'b' },
  planning: { col: 1, row: 'd' },
  route: { col: 1, row: 'e' },
  sales: { col: 3, row: 'b' },
  invoice: { col: 3, row: 'e' },
  esignature: { col: 4, row: 'c' },
  warehouse: { col: 2, row: 'a' },
  products: { col: 1, row: 'c' },
  deposits: { col: 2, row: 'd' },
  payments: { col: 1, row: 'f' },
  cashbox: { col: 2, row: 'e' },
  expenses: { col: 4, row: 'f' },
  crm: { col: 2, row: 'c' },
  dashboard: { col: 4, row: 'b' },
  notifications: { col: 3, row: 'd' },
};

// ==========================================================================
// Utility Functions
// ==========================================================================

export function rowToIndex(row: GridRow): number {
  return row.charCodeAt(0) - 'a'.charCodeAt(0);
}

export function gridToPixel(
  position: GridPosition,
  cardSize: number,
  gap: number
): { x: number; y: number } {
  const colIndex = position.col - 1;
  const rowIndex = rowToIndex(position.row);

  return {
    x: colIndex * (cardSize + gap),
    y: rowIndex * (cardSize + gap),
  };
}

export function getModuleById(id: string): Module | undefined {
  return modules.find((m) => m.id === id);
}

export function getGroupById(id: number): ModuleGroup | undefined {
  return moduleGroups.find((g) => g.id === id);
}

export function getModulesInGroup(groupId: number): Module[] {
  return modules.filter((m) => m.groupId === groupId);
}

export function getActiveModuleIdsForGroup(groupId: number): string[] {
  const group = getGroupById(groupId);
  if (!group) return [];
  return [group.sourceModuleId, ...group.targetModuleIds];
}

export function getGridDimensions(
  columns: number,
  rows: number,
  cardSize: number,
  gap: number
): { width: number; height: number } {
  return {
    width: columns * cardSize + (columns - 1) * gap,
    height: rows * cardSize + (rows - 1) * gap,
  };
}

export function getRandomStartGroup(): number {
  return Math.floor(Math.random() * GROUP_COUNT) + 1;
}

export function getNextGroupId(currentId: number): number {
  return currentId >= GROUP_COUNT ? 1 : currentId + 1;
}
