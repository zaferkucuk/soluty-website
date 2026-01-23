'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useReducedMotion } from 'framer-motion';

// ==========================================================================
// Types
// ==========================================================================

export interface RotatingGradientConfig {
  /** Initial rotation angle in degrees (0, 90, 180, -30, etc.) */
  startRotation?: number;
  /** Rotation speed in degrees per second (default: 30) */
  speed?: number;
  /** Whether the gradient should animate */
  isActive: boolean;
}

export interface GradientCoordinates {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

// ==========================================================================
// Constants
// ==========================================================================

/** Default rotation speed (degrees per second) - matches Stripe's smooth flow */
const DEFAULT_SPEED = 30;

/** Center point for rotation calculations */
const CENTER = 50;

/** Radius for gradient endpoint calculations */
const RADIUS = 50;

// ==========================================================================
// Hook: useRotatingGradient
// ==========================================================================

/**
 * Creates an animated rotating gradient effect similar to Stripe's connection lines.
 * 
 * The gradient coordinates (x1, y1, x2, y2) rotate around a center point,
 * creating a flowing light effect along connection lines.
 * 
 * @param config - Configuration object
 * @returns GradientCoordinates that update on each animation frame
 * 
 * @example
 * ```tsx
 * const gradient = useRotatingGradient({
 *   startRotation: 0,
 *   speed: 30,
 *   isActive: true
 * });
 * 
 * <linearGradient
 *   x1={`${gradient.x1}%`}
 *   y1={`${gradient.y1}%`}
 *   x2={`${gradient.x2}%`}
 *   y2={`${gradient.y2}%`}
 * >
 *   ...
 * </linearGradient>
 * ```
 */
export function useRotatingGradient(config: RotatingGradientConfig): GradientCoordinates {
  const { startRotation = 0, speed = DEFAULT_SPEED, isActive } = config;
  const shouldReduceMotion = useReducedMotion();
  
  // Track current angle
  const angleRef = useRef(startRotation);
  const lastTimeRef = useRef<number | null>(null);
  const rafIdRef = useRef<number | null>(null);
  
  // Calculate initial coordinates
  const calculateCoordinates = useCallback((angleDegrees: number): GradientCoordinates => {
    const radians = (angleDegrees * Math.PI) / 180;
    
    // Gradient start point (rotates clockwise)
    const x1 = CENTER + RADIUS * Math.cos(radians);
    const y1 = CENTER + RADIUS * Math.sin(radians);
    
    // Gradient end point (opposite side)
    const x2 = CENTER - RADIUS * Math.cos(radians);
    const y2 = CENTER - RADIUS * Math.sin(radians);
    
    return { x1, y1, x2, y2 };
  }, []);
  
  // Initialize state with starting position
  const [coordinates, setCoordinates] = useState<GradientCoordinates>(() => 
    calculateCoordinates(startRotation)
  );
  
  // Animation loop
  useEffect(() => {
    // Don't animate if reduced motion is preferred or not active
    if (shouldReduceMotion || !isActive) {
      // Reset to start position when not active
      if (!isActive) {
        angleRef.current = startRotation;
        setCoordinates(calculateCoordinates(startRotation));
      }
      return;
    }
    
    const animate = (timestamp: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp;
      }
      
      // Calculate time delta in seconds
      const deltaTime = (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;
      
      // Update angle based on speed (degrees per second)
      angleRef.current = (angleRef.current + speed * deltaTime) % 360;
      
      // Calculate new coordinates
      const newCoords = calculateCoordinates(angleRef.current);
      setCoordinates(newCoords);
      
      // Continue animation loop
      rafIdRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    rafIdRef.current = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      lastTimeRef.current = null;
    };
  }, [isActive, speed, startRotation, shouldReduceMotion, calculateCoordinates]);
  
  // Reset angle when startRotation changes
  useEffect(() => {
    if (!isActive) {
      angleRef.current = startRotation;
      setCoordinates(calculateCoordinates(startRotation));
    }
  }, [startRotation, isActive, calculateCoordinates]);
  
  return coordinates;
}

// ==========================================================================
// Utility: Multiple Gradient Manager
// ==========================================================================

/**
 * Configuration for a single gradient in a batch
 */
export interface BatchGradientConfig {
  id: string;
  startRotation?: number;
  speed?: number;
}

/**
 * Hook for managing multiple rotating gradients efficiently.
 * Uses a single animation frame for all gradients.
 * 
 * @param configs - Array of gradient configurations
 * @param isActive - Whether gradients should animate
 * @returns Map of gradient IDs to their current coordinates
 */
export function useRotatingGradients(
  configs: BatchGradientConfig[],
  isActive: boolean
): Map<string, GradientCoordinates> {
  const shouldReduceMotion = useReducedMotion();
  
  // Track angles for each gradient
  const anglesRef = useRef<Map<string, number>>(new Map());
  const lastTimeRef = useRef<number | null>(null);
  const rafIdRef = useRef<number | null>(null);
  
  // Initialize angles
  useEffect(() => {
    configs.forEach(config => {
      if (!anglesRef.current.has(config.id)) {
        anglesRef.current.set(config.id, config.startRotation ?? 0);
      }
    });
  }, [configs]);
  
  // Calculate coordinates for an angle
  const calculateCoordinates = useCallback((angleDegrees: number): GradientCoordinates => {
    const radians = (angleDegrees * Math.PI) / 180;
    return {
      x1: CENTER + RADIUS * Math.cos(radians),
      y1: CENTER + RADIUS * Math.sin(radians),
      x2: CENTER - RADIUS * Math.cos(radians),
      y2: CENTER - RADIUS * Math.sin(radians),
    };
  }, []);
  
  // Initialize state
  const [coordinatesMap, setCoordinatesMap] = useState<Map<string, GradientCoordinates>>(() => {
    const map = new Map<string, GradientCoordinates>();
    configs.forEach(config => {
      map.set(config.id, calculateCoordinates(config.startRotation ?? 0));
    });
    return map;
  });
  
  // Animation loop for all gradients
  useEffect(() => {
    if (shouldReduceMotion || !isActive || configs.length === 0) {
      return;
    }
    
    const animate = (timestamp: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp;
      }
      
      const deltaTime = (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;
      
      const newMap = new Map<string, GradientCoordinates>();
      
      configs.forEach(config => {
        const currentAngle = anglesRef.current.get(config.id) ?? config.startRotation ?? 0;
        const speed = config.speed ?? DEFAULT_SPEED;
        const newAngle = (currentAngle + speed * deltaTime) % 360;
        
        anglesRef.current.set(config.id, newAngle);
        newMap.set(config.id, calculateCoordinates(newAngle));
      });
      
      setCoordinatesMap(newMap);
      rafIdRef.current = requestAnimationFrame(animate);
    };
    
    rafIdRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      lastTimeRef.current = null;
    };
  }, [isActive, configs, shouldReduceMotion, calculateCoordinates]);
  
  return coordinatesMap;
}
