'use client';

import { AnimatePresence } from 'framer-motion';
import {
  moduleGroups,
  getModuleById,
  gridToPixel,
  mobileGridPositions,
  type GridPosition,
} from './modules-data';
import { ConnectionSVG } from './ConnectionSVG';
import { GROUP_COLOR_MAP } from './constants';
import {
  calculateConnectionBounds,
  getModuleCenter,
} from './utils';

// ==========================================================================
// Types
// ==========================================================================

interface ConnectionLinesProps {
  activeGroupId: number;
  visibleModuleIds: string[];
  gridWidth: number;
  gridHeight: number;
  cardSize: number;
  gap: number;
  isMobile: boolean;
}

interface Connection {
  id: string;
  sourceId: string;
  targetId: string;
  bounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  path: string;
  pathLength: number;
  groupId: number;
  isActive: boolean;
  startRotation: number;
}

// ==========================================================================
// Rotation Presets (Stripe-style variation)
// ==========================================================================

/**
 * Different starting rotations for visual variety.
 * Stripe uses values like 0, 180, -30 for different connections.
 */
const ROTATION_PRESETS = [0, 45, 90, 135, 180, -30, -45, -90];

function getRotationForConnection(index: number): number {
  return ROTATION_PRESETS[index % ROTATION_PRESETS.length];
}

// ==========================================================================
// Connection Building
// ==========================================================================

function buildConnections(
  activeGroupId: number,
  visibleModuleIds: string[],
  cardSize: number,
  gap: number,
  isMobile: boolean
): Connection[] {
  const connections: Connection[] = [];
  let connectionIndex = 0;

  moduleGroups.forEach((group) => {
    // Only build connections for the active group
    if (group.id !== activeGroupId) return;

    const sourceModule = getModuleById(group.sourceModuleId);
    if (!sourceModule) return;

    const sourcePosition: GridPosition = isMobile
      ? mobileGridPositions[sourceModule.id]
      : sourceModule.gridPosition;

    const sourcePixel = gridToPixel(sourcePosition, cardSize, gap);
    const sourceCenter = getModuleCenter(sourcePixel, cardSize);

    group.targetModuleIds.forEach((targetId) => {
      const targetModule = getModuleById(targetId);
      if (!targetModule) return;

      const targetPosition: GridPosition = isMobile
        ? mobileGridPositions[targetModule.id]
        : targetModule.gridPosition;

      const targetPixel = gridToPixel(targetPosition, cardSize, gap);
      const targetCenter = getModuleCenter(targetPixel, cardSize);

      // Calculate bounds and local path
      const bounds = calculateConnectionBounds(sourceCenter, targetCenter, {
        padding: 8, // Extra padding for glow effect
        cornerRadius: 20,
        preferredDirection: 'auto',
      });

      // Check if both source and target modules are visible
      const isSourceVisible = visibleModuleIds.includes(group.sourceModuleId);
      const isTargetVisible = visibleModuleIds.includes(targetId);
      const isConnectionActive = isSourceVisible && isTargetVisible;

      connections.push({
        id: `${group.sourceModuleId}-${targetId}`,
        sourceId: group.sourceModuleId,
        targetId,
        bounds: {
          x: bounds.x,
          y: bounds.y,
          width: bounds.width,
          height: bounds.height,
        },
        path: bounds.localPath,
        pathLength: bounds.pathLength,
        groupId: group.id,
        isActive: isConnectionActive,
        startRotation: getRotationForConnection(connectionIndex),
      });

      connectionIndex++;
    });
  });

  return connections;
}

// ==========================================================================
// Main ConnectionLines Component
// ==========================================================================

/**
 * Renders connection lines only for the active group.
 * Lines are only visible when both connected cards are visible.
 * 
 * Uses AnimatePresence to enable exit animations for the
 * Stripe-style draw/erase effect on connection lines.
 */
export function ConnectionLines({
  activeGroupId,
  visibleModuleIds,
  gridWidth,
  gridHeight,
  cardSize,
  gap,
  isMobile,
}: ConnectionLinesProps) {
  const connections = buildConnections(
    activeGroupId,
    visibleModuleIds,
    cardSize,
    gap,
    isMobile
  );

  // Filter to only active connections for AnimatePresence
  const activeConnections = connections.filter(conn => conn.isActive);

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        width: gridWidth,
        height: gridHeight,
        zIndex: 0,
      }}
    >
      <AnimatePresence mode="sync">
        {activeConnections.map((conn) => {
          const colors = GROUP_COLOR_MAP[conn.groupId] || GROUP_COLOR_MAP[1];

          return (
            <ConnectionSVG
              key={conn.id}
              id={conn.id}
              x={conn.bounds.x}
              y={conn.bounds.y}
              width={conn.bounds.width}
              height={conn.bounds.height}
              path={conn.path}
              pathLength={conn.pathLength}
              colors={colors}
              isActive={conn.isActive}
              startRotation={conn.startRotation}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}
