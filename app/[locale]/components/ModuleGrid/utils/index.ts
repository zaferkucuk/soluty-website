/**
 * ModuleGrid Utility Functions
 */

export {
  // Path types
  type Point,
  type PathType,
  type PathResult,
  type ConnectionBounds,
  
  // Path functions
  determinePathType,
  createStraightPath,
  getStraightPathLength,
  createLShapedPath,
  getLShapedPathLength,
  createSmoothBezierPath,
  createPath,
  calculateConnectionBounds,
  getModuleCenter,
} from './pathCalculation';
