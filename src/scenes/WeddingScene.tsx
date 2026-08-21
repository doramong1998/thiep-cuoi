import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  drawSprite,
  CHURCH_SPRITE, CHURCH_PALETTE,
  HEART_SPRITE,
  GUEST_SPRITE, GUEST_PALETTE,
} from '@/canvas/sprites';

export function WeddingScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = 400 * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = '400px';
      ctx.scale(dpr, dpr);
      ctx.imageSmoothingEnabled = false;
    };
    resize();
    window.addEventListener('resize', resize);

    const w = () => window.innerWidth;
    let time = 0;

    const draw = () => {
      time += 0.016;
      const width = w();
      ctx.clearRect(0, 0, width, 400);

      // Sky
      const sky = ctx.createLinearGradient(0, 0, 0, 200);
      sky.addColorStop(0, '#87CEEB');
      sky.addColorStop(1, '#E0F0FF');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, width, 200);

      // Ground
      ctx.fillStyle = '#90C46B';
      ctx.fillRect(0, 200, width, 200);

      // Road
      ctx.fillStyle = '#8B8680';
      ctx.fillRect(0, 230, width, 25);
      ctx.fillStyle = '#FFD93D';
      for (let x = 0; x < width; x += 40) {
        ctx.fillRect(x, 241, 20, 3);
      }

      // Church
      const scale = Math.max(3, Math.floor(width / 300));
      const churchX = width / 2 - (CHURCH_SPRITE[0].length * scale * 2) / 2;
      const churchY = 230 - CHURCH_SPRITE.length * scale * 2;
      drawSprite(ctx, CHURCH_SPRITE, CHURCH_PALETTE, churchX, churchY, scale * 2);

      // Guests
      for (let i = 0; i < 8; i++) {
        const gx = width / 2 - 100 + i * 28;
        const gy = 230 - GUEST_SPRITE.length * scale * 0.7;
        const colors = [...GUEST_PALETTE];
        colors[3] = ['#4A90D9', '#D9534F', '#5CB85C', '#F0AD4E', '#9B59B6', '#E91E63', '#00BCD4', '#FF5722'][i % 8];
        drawSprite(ctx, GUEST_SPRITE, colors, gx, gy, scale * 0.7);
      }

      // Hearts floating
      const heartPalette = ['', '#FF6B8A'];
      for (let i = 0; i < 6; i++) {
        const hx = width / 2 - 60 + i * 25 + Math.sin(time * 1.5 + i) * 10;
        const hy = churchY - 30 + Math.sin(time * 2 + i * 0.8) * 15;
        drawSprite(ctx, HEART_SPRITE, heartPalette, hx, hy, scale * 0.4);
      }

      // Confetti
      for (let i = 0; i < 20; i++) {
        const cx = (width / 2 - 150 + Math.sin(time * 0.5 + i * 0.7) * 200 + i * 18) % width;
        const cy = 50 + ((time * 30 + i * 20) % 200);
        const ca = 1 - cy / 250;
        ctx.globalAlpha = Math.max(0, ca * 0.7);
        ctx.fillStyle = ['#FF6B8A', '#D4AF37', '#87CEEB', '#FFB7C5', '#FFD700'][i % 5];
        ctx.fillRect(cx, cy, 4, 4);
      }
      ctx.globalAlpha = 1;

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-sky-100 to-amber-50 py-16 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <canvas
          ref={canvasRef}
          style={{ imageRendering: 'pixelated' }}
          className="w-full"
        />
      </motion.div>

      {/* Text overlay */}
      <motion.div
        className="text-center mt-8 px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <p className="font-['Great_Vibes',cursive] text-3xl sm:text-5xl text-amber-800">
          And finally, our forever begins
        </p>
        <span className="text-3xl inline-block mt-3 animate-bounce">❤️</span>
      </motion.div>
    </section>
  );
}
