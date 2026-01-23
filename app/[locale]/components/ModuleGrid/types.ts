/**
 * ModuleGrid Type Definitions
 * 
 * Centralized type definitions for the ModuleGrid component system.
 */

import type { LucideIcon } from 'lucide-react';

// ==========================================================================
// Grid Types
// ==========================================================================

/** Valid grid column numbers (1-6) */
export type GridColumn = 1 | 2 | 3 | 4 | 5 | 6;

/** Valid grid row letters (a-f) */
export type GridRow = 'a' | 'b' | 'c' | 'd' | 'e' | 'f';

/** Position in the grid */
export interface GridPosition {
  col: GridColumn;
  row: GridRow;
}

/** Pixel position */
export interface PixelPosition {
  x: number;
  y: number;
}

// ==========================================================================
// Module Types
// ==========================================================================

/** Module definition */
export interface Module {
  /** Unique identifier */
  id: string;
  /** i18n translation key */
  key: string;
  /** Lucide icon component */
  icon: LucideIcon;
  /** Desktop grid position */
  gridPosition: GridPosition;
  /** Group this module belongs to */
  groupId: number;
}

/** Module group definition */
export interface ModuleGroup {
  /** Unique group identifier (1-6) */
  id: number;
  /** Group name for debugging */
  name: string;
  /** Module ID that starts the connection */
  sourceModuleId: string;
  /** Module IDs that receive connections */
  targetModuleIds: string[];
}

// ==========================================================================
// Connection Types
// ==========================================================================

/** Path type for connection lines */
export type PathType = 'straight' | 'lShaped';

/** Color pair for gradients */
export interface ColorPair {
  /** Gradient start color */
  start: string;
  /** Gradient end color */
  end: string;
  /** Glow effect color (with alpha) */
  glow: string;
}

/** Connection between two modules */
export interface Connection {
  /** Unique connection identifier */
  id: string;
  /** Source module ID */
  sourceId: string;
  /** Target module ID */
  targetId: string;
  /** SVG bounding box */
  bounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  /** SVG path in local coordinates */
  path: string;
  /** Path length in pixels */
  pathLength: number;
  /** Group this connection belongs to */
  groupId: number;
  /** Whether connection is currently active */
  isActive: boolean;
  /** Starting rotation for gradient animation */
  startRotation: number;
}

// ==========================================================================
// Animation Types
// ==========================================================================

/** Gradient coordinates for rotating animation */
export interface GradientCoordinates {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

/** Configuration for rotating gradient hook */
export interface RotatingGradientConfig {
  /** Initial rotation angle in degrees */
  startRotation?: number;
  /** Rotation speed in degrees per second */
  speed?: number;
  /** Whether the gradient should animate */
  isActive: boolean;
}

// ==========================================================================
// Component Props Types
// ==========================================================================

/** Props for ConnectionLines component */
export interface ConnectionLinesProps {
  /** Currently active group ID */
  activeGroupId: number;
  /** Total grid width in pixels */
  gridWidth: number;
  /** Total grid height in pixels */
  gridHeight: number;
  /** Card size in pixels */
  cardSize: number;
  /** Gap between cards in pixels */
  gap: number;
  /** Whether in mobile view */
  isMobile: boolean;
}

/** Props for ModuleCard component */
export interface ModuleCardProps {
  /** Module data */
  module: Module;
  /** Whether module is active */
  isActive: boolean;
  /** Translated module name */
  moduleName: string;
  /** Card size in pixels */
  cardSize: number;
  /** Mouse enter handler */
  onMouseEnter: () => void;
  /** Mouse leave handler */
  onMouseLeave: () => void;
}

/** Props for ConnectionSVG component */
export interface ConnectionSVGProps {
  /** Unique identifier */
  id: string;
  /** SVG left position */
  x: number;
  /** SVG top position */
  y: number;
  /** SVG width */
  width: number;
  /** SVG height */
  height: number;
  /** Path in local coordinates */
  path: string;
  /** Path length for animations */
  pathLength: number;
  /** Color pair for gradient */
  colors: ColorPair;
  /** Whether connection is active */
  isActive: boolean;
  /** Initial rotation angle */
  startRotation?: number;
}
