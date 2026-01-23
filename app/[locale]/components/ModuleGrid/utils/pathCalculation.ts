/**
 * Path Calculation Utilities for Connection Lines
 * 
 * Handles path generation, bounding box calculation, and path type detection
 * for Stripe-style animated connection lines.
 */

// ==========================================================================
// Types
// ==========================================================================

export interface Point {
  x: number;
  y: number;
}

export type PathType = 'straight' | 'lShaped';

export interface PathResult {
  /** SVG path d attribute */
  path: string;
  /** Approximate path length in pixels */
  pathLength: number;
  /** Type of path */
  pathType: PathType;
}

export interface ConnectionBounds {
  /** SVG left position */
  x: number;
  /** SVG top position */
  y: number;
  /** SVG width */
  width: number;
  /** SVG height */
  height: number;
  /** Path relative to SVG origin (0,0) */
  localPath: string;
  /** Total path length */
  pathLength: number;
  /** Type of path */
  pathType: PathType;
}

// ==========================================================================
// Constants
// ==========================================================================

/** Default corner radius for L-shaped paths (matches Stripe) */
const DEFAULT_CORNER_RADIUS = 20;

/** Padding around path for SVG bounds */
const SVG_PADDING = 4;

/** Threshold for determining if path should be L-shaped */
const L_SHAPE_THRESHOLD = 50;

// ==========================================================================
// Path Type Detection
// ==========================================================================

/**
 * Determines whether to use a straight or L-shaped path.
 * 
 * @param from - Start point
 * @param to - End point
 * @returns Path type to use
 */
export function determinePathType(from: Point, to: Point): PathType {
  const dx = Math.abs(to.x - from.x);
  const dy = Math.abs(to.y - from.y);
  
  // If nearly aligned horizontally or vertically → straight line
  if (dx < L_SHAPE_THRESHOLD || dy < L_SHAPE_THRESHOLD) {
    return 'straight';
  }
  
  // Otherwise → L-shaped with rounded corner
  return 'lShaped';
}

// ==========================================================================
// Straight Path Generation
// ==========================================================================

/**
 * Creates a straight line path between two points.
 * 
 * @param from - Start point
 * @param to - End point
 * @returns SVG path string
 */
export function createStraightPath(from: Point, to: Point): string {
  return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
}

/**
 * Calculates the length of a straight line.
 */
export function getStraightPathLength(from: Point, to: Point): number {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  return Math.sqrt(dx * dx + dy * dy);
}

// ==========================================================================
// L-Shaped Path Generation (Stripe-style)
// ==========================================================================

/**
 * Creates an L-shaped path with a rounded corner.
 * Uses Quadratic Bezier curve for smooth corner.
 * 
 * Stripe uses this pattern:
 * M start L corner-approach Q corner corner-exit L end
 * 
 * @param from - Start point
 * @param to - End point
 * @param options - Configuration options
 * @returns SVG path string
 */
export function createLShapedPath(
  from: Point,
  to: Point,
  options: {
    preferredDirection?: 'horizontal-first' | 'vertical-first' | 'auto';
    cornerRadius?: number;
  } = {}
): string {
  const { 
    preferredDirection = 'auto', 
    cornerRadius = DEFAULT_CORNER_RADIUS 
  } = options;
  
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  
  // Determine direction: horizontal-first or vertical-first
  let goHorizontalFirst: boolean;
  
  if (preferredDirection === 'auto') {
    // Auto-detect based on which delta is larger
    goHorizontalFirst = Math.abs(dx) >= Math.abs(dy);
  } else {
    goHorizontalFirst = preferredDirection === 'horizontal-first';
  }
  
  // Clamp corner radius to half the smaller dimension
  const maxRadius = Math.min(Math.abs(dx), Math.abs(dy)) / 2;
  const radius = Math.min(cornerRadius, maxRadius);
  
  if (goHorizontalFirst) {
    // Horizontal first, then vertical
    // Corner is at (to.x, from.y)
    const corner: Point = { x: to.x, y: from.y };
    
    // Approach corner from start (horizontal)
    const cornerApproach: Point = {
      x: corner.x - Math.sign(dx) * radius,
      y: corner.y,
    };
    
    // Exit corner towards end (vertical)
    const cornerExit: Point = {
      x: corner.x,
      y: corner.y + Math.sign(dy) * radius,
    };
    
    return `M ${from.x} ${from.y} L ${cornerApproach.x} ${cornerApproach.y} Q ${corner.x} ${corner.y} ${cornerExit.x} ${cornerExit.y} L ${to.x} ${to.y}`;
  } else {
    // Vertical first, then horizontal
    // Corner is at (from.x, to.y)
    const corner: Point = { x: from.x, y: to.y };
    
    // Approach corner from start (vertical)
    const cornerApproach: Point = {
      x: corner.x,
      y: corner.y - Math.sign(dy) * radius,
    };
    
    // Exit corner towards end (horizontal)
    const cornerExit: Point = {
      x: corner.x + Math.sign(dx) * radius,
      y: corner.y,
    };
    
    return `M ${from.x} ${from.y} L ${cornerApproach.x} ${cornerApproach.y} Q ${corner.x} ${corner.y} ${cornerExit.x} ${cornerExit.y} L ${to.x} ${to.y}`;
  }
}

/**
 * Calculates the approximate length of an L-shaped path.
 */
export function getLShapedPathLength(
  from: Point,
  to: Point,
  cornerRadius: number = DEFAULT_CORNER_RADIUS
): number {
  const dx = Math.abs(to.x - from.x);
  const dy = Math.abs(to.y - from.y);
  
  // L-shape = horizontal + vertical - (2 * radius) + (quarter circle arc)
  // Quarter circle arc ≈ radius * π/2
  const arcLength = cornerRadius * Math.PI / 2;
  
  return dx + dy - 2 * cornerRadius + arcLength;
}

// ==========================================================================
// Smooth Bezier Path (Original - for backwards compatibility)
// ==========================================================================

/**
 * Creates a smooth bezier curve path between two points.
 * Used as fallback or for diagonal connections.
 * 
 * @param from - Start point
 * @param to - End point
 * @returns SVG path string
 */
export function createSmoothBezierPath(from: Point, to: Point): string {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const tension = 0.4;
  
  // Horizontal dominant - smooth S-curve
  if (Math.abs(dx) > Math.abs(dy) * 1.2) {
    const cpOffset = Math.abs(dx) * tension;
    return `M ${from.x} ${from.y} C ${from.x + cpOffset} ${from.y}, ${to.x - cpOffset} ${to.y}, ${to.x} ${to.y}`;
  }
  
  // Vertical dominant - smooth S-curve
  if (Math.abs(dy) > Math.abs(dx) * 1.2) {
    const cpOffset = Math.abs(dy) * tension;
    return `M ${from.x} ${from.y} C ${from.x} ${from.y + cpOffset}, ${to.x} ${to.y - cpOffset}, ${to.x} ${to.y}`;
  }
  
  // Diagonal - quadratic curve
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;
  return `M ${from.x} ${from.y} Q ${midX} ${from.y}, ${midX} ${midY} T ${to.x} ${to.y}`;
}

// ==========================================================================
// Main Path Generation Function
// ==========================================================================

/**
 * Creates the optimal path between two points.
 * Automatically selects between straight and L-shaped based on geometry.
 * 
 * @param from - Start point
 * @param to - End point
 * @param options - Configuration options
 * @returns PathResult with path, length, and type
 */
export function createPath(
  from: Point,
  to: Point,
  options: {
    forceType?: PathType;
    cornerRadius?: number;
    preferredDirection?: 'horizontal-first' | 'vertical-first' | 'auto';
  } = {}
): PathResult {
  const { forceType, cornerRadius = DEFAULT_CORNER_RADIUS, preferredDirection = 'auto' } = options;
  
  const pathType = forceType ?? determinePathType(from, to);
  
  if (pathType === 'straight') {
    return {
      path: createStraightPath(from, to),
      pathLength: getStraightPathLength(from, to),
      pathType: 'straight',
    };
  }
  
  return {
    path: createLShapedPath(from, to, { cornerRadius, preferredDirection }),
    pathLength: getLShapedPathLength(from, to, cornerRadius),
    pathType: 'lShaped',
  };
}

// ==========================================================================
// Bounding Box Calculation (for per-connection SVG positioning)
// ==========================================================================

/**
 * Calculates the bounding box and local path for a connection.
 * This enables Stripe-style per-connection SVG elements.
 * 
 * @param from - Start point (absolute coordinates)
 * @param to - End point (absolute coordinates)
 * @param options - Configuration options
 * @returns ConnectionBounds with position, size, and local path
 */
export function calculateConnectionBounds(
  from: Point,
  to: Point,
  options: {
    padding?: number;
    cornerRadius?: number;
    preferredDirection?: 'horizontal-first' | 'vertical-first' | 'auto';
  } = {}
): ConnectionBounds {
  const { 
    padding = SVG_PADDING, 
    cornerRadius = DEFAULT_CORNER_RADIUS,
    preferredDirection = 'auto'
  } = options;
  
  // Calculate bounding box
  const minX = Math.min(from.x, to.x) - padding;
  const minY = Math.min(from.y, to.y) - padding;
  const maxX = Math.max(from.x, to.x) + padding;
  const maxY = Math.max(from.y, to.y) + padding;
  
  const width = maxX - minX;
  const height = maxY - minY;
  
  // Convert points to local coordinates (relative to SVG origin)
  const localFrom: Point = {
    x: from.x - minX,
    y: from.y - minY,
  };
  
  const localTo: Point = {
    x: to.x - minX,
    y: to.y - minY,
  };
  
  // Generate path in local coordinates
  const pathResult = createPath(localFrom, localTo, { cornerRadius, preferredDirection });
  
  return {
    x: minX,
    y: minY,
    width,
    height,
    localPath: pathResult.path,
    pathLength: pathResult.pathLength,
    pathType: pathResult.pathType,
  };
}

// ==========================================================================
// Module Center Calculation
// ==========================================================================

/**
 * Calculates the center point of a module card.
 * 
 * @param pixelPosition - Top-left position of the card
 * @param cardSize - Size of the card (width = height)
 * @returns Center point
 */
export function getModuleCenter(pixelPosition: Point, cardSize: number): Point {
  return {
    x: pixelPosition.x + cardSize / 2,
    y: pixelPosition.y + cardSize / 2,
  };
}
