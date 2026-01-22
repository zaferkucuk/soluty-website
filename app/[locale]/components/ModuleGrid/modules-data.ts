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

export interface GridPosition {
  row: number;
  col: number;
}

export interface Module {
  id: string;
  key: string;
  icon: LucideIcon;
  gridPosition: GridPosition;
  connectsTo: string[];
}

export const modules: Module[] = [
  {
    id: 'order',
    key: 'order',
    icon: Package,
    gridPosition: { row: 1, col: 1 },
    connectsTo: ['workPlan'],
  },
  {
    id: 'workPlan',
    key: 'workPlan',
    icon: ClipboardList,
    gridPosition: { row: 1, col: 2 },
    connectsTo: ['routeOptimization'],
  },
  {
    id: 'routeOptimization',
    key: 'routeOptimization',
    icon: Map,
    gridPosition: { row: 1, col: 3 },
    connectsTo: ['deliveryNote'],
  },
  {
    id: 'deliveryNote',
    key: 'deliveryNote',
    icon: FileText,
    gridPosition: { row: 2, col: 3 },
    connectsTo: ['warehouse'],
  },
  {
    id: 'warehouse',
    key: 'warehouse',
    icon: Warehouse,
    gridPosition: { row: 3, col: 3 },
    connectsTo: ['productManagement'],
  },
  {
    id: 'productManagement',
    key: 'productManagement',
    icon: Boxes,
    gridPosition: { row: 3, col: 2 },
    connectsTo: ['crm'],
  },
  {
    id: 'crm',
    key: 'crm',
    icon: Users,
    gridPosition: { row: 2, col: 2 },
    connectsTo: ['sales'],
  },
  {
    id: 'sales',
    key: 'sales',
    icon: TrendingUp,
    gridPosition: { row: 2, col: 1 },
    connectsTo: ['invoice'],
  },
  {
    id: 'invoice',
    key: 'invoice',
    icon: Receipt,
    gridPosition: { row: 3, col: 1 },
    connectsTo: ['payments'],
  },
  {
    id: 'payments',
    key: 'payments',
    icon: CreditCard,
    gridPosition: { row: 4, col: 2 },
    connectsTo: [],
  },
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
