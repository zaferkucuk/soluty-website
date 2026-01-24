import { useState, useEffect, useCallback, useRef } from 'react';
import { getActiveModuleIdsForGroup, getNextGroupId, getRandomStartGroup } from '../modules-data';

// ==========================================================================
// Sequential Card Activation Hook
// ==========================================================================

/**
 * Configuration for sequential activation timing
 */
export interface SequentialActivationConfig {
  /** Delay between each card activation within a group (ms) */
  cardActivationDelay: number;
  /** Duration each card stays active after all cards are shown (ms) */
  groupDisplayDuration: number;
  /** Delay between last card deactivation and next group start (ms) */
  groupTransitionDelay: number;
  /** Delay between each card deactivation (ms) */
  cardDeactivationDelay: number;
}

/**
 * Default timing configuration
 * - Cards appear one by one with 200ms delay
 * - Group stays fully visible for 2 seconds
 * - 1 second pause before next group starts
 */
export const DEFAULT_SEQUENTIAL_CONFIG: SequentialActivationConfig = {
  cardActivationDelay: 200,      // 200ms between each card appearing
  groupDisplayDuration: 2000,    // 2s all cards visible
  groupTransitionDelay: 1000,    // 1s pause between groups
  cardDeactivationDelay: 150,    // 150ms between each card disappearing
};

/**
 * Hook return type
 */
export interface SequentialActivationState {
  /** Currently visible module IDs (subset of active group) */
  visibleModuleIds: string[];
  /** Current active group ID */
  activeGroupId: number;
  /** Whether animation is currently running */
  isAnimating: boolean;
}

/**
 * Hook for sequential card activation within groups.
 * Cards appear one by one, stay visible, then disappear one by one.
 * After a pause, the next group starts its sequence.
 */
export function useSequentialActivation(
  config: Partial<SequentialActivationConfig> = {},
  shouldReduceMotion: boolean = false
): SequentialActivationState {
  const {
    cardActivationDelay,
    groupDisplayDuration,
    groupTransitionDelay,
    cardDeactivationDelay,
  } = { ...DEFAULT_SEQUENTIAL_CONFIG, ...config };

  // State
  const [activeGroupId, setActiveGroupId] = useState(1);
  const [visibleModuleIds, setVisibleModuleIds] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Refs for cleanup
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const isMountedRef = useRef(true);

  // Clear all pending timeouts
  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  // Add timeout with tracking
  const addTimeout = useCallback((callback: () => void, delay: number) => {
    const timeout = setTimeout(() => {
      if (isMountedRef.current) {
        callback();
      }
    }, delay);
    timeoutsRef.current.push(timeout);
    return timeout;
  }, []);

  // Animate a single group sequence
  const animateGroup = useCallback((groupId: number) => {
    if (!isMountedRef.current) return;
    
    const moduleIds = getActiveModuleIdsForGroup(groupId);
    setIsAnimating(true);
    
    // If reduced motion, show all at once
    if (shouldReduceMotion) {
      setVisibleModuleIds(moduleIds);
      addTimeout(() => {
        setVisibleModuleIds([]);
        addTimeout(() => {
          const nextGroup = getNextGroupId(groupId);
          setActiveGroupId(nextGroup);
          animateGroup(nextGroup);
        }, groupTransitionDelay);
      }, groupDisplayDuration);
      return;
    }

    // Phase 1: Sequential activation
    let activationTime = 0;
    moduleIds.forEach((moduleId, index) => {
      addTimeout(() => {
        setVisibleModuleIds(prev => [...prev, moduleId]);
      }, activationTime);
      activationTime += cardActivationDelay;
    });

    // Phase 2: Hold all cards visible
    const holdStartTime = activationTime;
    const deactivationStartTime = holdStartTime + groupDisplayDuration;

    // Phase 3: Sequential deactivation (reverse order for visual effect)
    const reversedIds = [...moduleIds].reverse();
    let deactivationTime = deactivationStartTime;
    reversedIds.forEach((moduleId, index) => {
      addTimeout(() => {
        setVisibleModuleIds(prev => prev.filter(id => id !== moduleId));
      }, deactivationTime);
      deactivationTime += cardDeactivationDelay;
    });

    // Phase 4: Transition to next group after pause
    const nextGroupStartTime = deactivationTime + groupTransitionDelay;
    addTimeout(() => {
      setIsAnimating(false);
      const nextGroup = getNextGroupId(groupId);
      setActiveGroupId(nextGroup);
      animateGroup(nextGroup);
    }, nextGroupStartTime);

  }, [shouldReduceMotion, cardActivationDelay, groupDisplayDuration, groupTransitionDelay, cardDeactivationDelay, addTimeout]);

  // Initialize on mount
  useEffect(() => {
    isMountedRef.current = true;
    
    // Start with random group
    const startGroup = getRandomStartGroup();
    setActiveGroupId(startGroup);
    
    // Small delay before starting animation
    const initTimeout = setTimeout(() => {
      if (isMountedRef.current) {
        animateGroup(startGroup);
      }
    }, 500);

    return () => {
      isMountedRef.current = false;
      clearTimeout(initTimeout);
      clearAllTimeouts();
    };
  }, [animateGroup, clearAllTimeouts]);

  return {
    visibleModuleIds,
    activeGroupId,
    isAnimating,
  };
}
