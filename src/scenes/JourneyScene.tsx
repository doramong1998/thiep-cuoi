import { useRef, useState, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PixelEngine } from '@/canvas/PixelEngine';
import { MilestoneCard } from '@/components/MilestoneCard';
import { MILESTONES } from '@/data/wedding';
import type { Milestone } from '@/types';

gsap.registerPlugin(ScrollTrigger);

export function JourneyScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<PixelEngine | null>(null);
  const [activeMilestone, setActiveMilestone] = useState<Milestone | null>(null);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Create pixel engine
    const engine = new PixelEngine(canvas, MILESTONES, (m) => {
      setActiveMilestone(m);
    });
    engineRef.current = engine;
    engine.start();

    // GSAP ScrollTrigger — pin canvas and drive progress
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        pin: true,
        start: 'top top',
        end: '+=3500',
        scrub: 1,
        onUpdate: (self) => {
          engine.setProgress(self.progress);
        },
      });
      // Refresh ScrollTrigger calculations after DOM layout settles
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
    }, container);

    // Resize handler
    const handleResize = () => engine.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      ctx.revert();
      engine.destroy();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div ref={containerRef} className="relative w-full h-screen overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
          style={{ imageRendering: 'pixelated' }}
        />

        {/* Milestone Card Overlay */}
        <MilestoneCard milestone={activeMilestone} />

        {/* Scroll hint at start */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none">
          <p className="font-mono text-[10px] text-amber-700/60 tracking-wider animate-pulse">
            ↓ Cuộn để khám phá ↓
          </p>
        </div>
      </div>
    </>
  );
}
