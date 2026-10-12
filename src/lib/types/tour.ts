export type TourPlacement = 'top' | 'bottom' | 'auto';

export interface TourStep {
  id: string;
  /** CSS selector string or function returning DOM element */
  target: string | (() => Element | null);
  /** Optional secondary target element selector or getter to union into the spotlight */
  includeTarget?: string | (() => Element | null);
  title: string;
  description: string;
  placement?: TourPlacement;
  /** Padding in px around spotlight hole (default: 8) */
  spotlightPadding?: number;
  /** Corner radius in px of spotlight hole (default: 16) */
  spotlightRadius?: number;
  /** Optional mascot / illustration image URL */
  illustration?: string;
  /** Optional gesture animation overlay (vd: swipe-horizontal cho flashcard) */
  gesture?: 'swipe-horizontal';
  /** Optional hook before navigating to step */
  onBeforeStep?: () => Promise<void> | void;
  /** Optional hook after completing/advancing from step */
  onAfterStep?: () => Promise<void> | void;
  /** Optional hook when going backward from step */
  onPrevStep?: () => Promise<void> | void;
}

export interface TourDefinition {
  id: string;
  storageKey?: string;
  steps: TourStep[];
  /** Optional callback when entire tour completes */
  onComplete?: () => Promise<void> | void;
  /** Optional callback when tour is skipped */
  onSkip?: () => Promise<void> | void;
}

export interface TargetRect {
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
}

export interface PopoverPosition {
  top: number;
  left: number;
  placement: 'top' | 'bottom';
}
