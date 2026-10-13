import { motion } from 'framer-motion';
import { CountdownDisplay } from '@/components/CountdownDisplay';
import { Heart } from 'lucide-react';

export function CountdownScene() {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-b from-amber-50/20 via-rose-50/15 to-amber-50/25 relative overflow-hidden px-4 py-16 sm:py-20">
      {/* Decorative dots */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle, #D4AF37 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center z-10 max-w-xl mx-auto flex flex-col items-center"
      >
        <h2 className="font-['Alex_Brush',cursive] text-4xl sm:text-6xl text-amber-950 mb-3 drop-shadow-sm font-normal">
          Cùng đếm ngược nha
        </h2>

        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          <span className="text-amber-500 text-xs">✦ ✦ ✦</span>
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        </div>

        <CountdownDisplay />
      </motion.div>
    </section>
  );
}
