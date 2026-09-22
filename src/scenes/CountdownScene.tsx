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

        <motion.div
          className="mt-8 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-100/70 border border-amber-300/60 text-amber-900 font-['Cinzel',serif] text-xs sm:text-sm tracking-wider font-semibold">
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            <span>Chủ Nhật · 25 Tháng 10, 2026</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
