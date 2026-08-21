// Countdown
export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

// Love story milestone
export interface Milestone {
  id: string;
  title: string;
  date: string;
  description: string;
  icon: string;
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  scrollStart: number; // 0-1 progress
  scrollEnd: number;
}

// Guest message
export interface GuestMessage {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

// RSVP
export interface RSVPRecord {
  id: string;
  name: string;
  phone: string;
  guests: number;
  message: string;
  submittedAt: string;
}

// Bank account
export interface BankAccount {
  bank: string;
  accountName: string;
  accountNumber: string;
  label: string;
}

// Gallery image
export interface GalleryImage {
  id: string;
  aspectClass: string;
  bgGradient: string;
}

// Season color palette
export interface SeasonPalette {
  sky: string[];
  ground: string;
  trees: string[];
  particles: string[];
  particleType: 'blossom' | 'sun' | 'leaf' | 'snow';
}

// Pixel sprite (2D array of palette indices, 0 = transparent)
export type PixelSprite = number[][];

// Layer render context
export interface LayerContext {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  progress: number; // 0-1 scroll progress
  scale: number; // pixel scale factor
  time: number; // animation time
}
