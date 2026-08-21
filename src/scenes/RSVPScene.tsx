import { motion } from 'framer-motion';
import { RSVPForm } from '@/components/RSVPForm';

export function RSVPScene() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-amber-50/20 via-rose-50/15 to-amber-50/25 px-4">
      <motion.div
        className="text-center mb-10 sm:mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-['Alex_Brush',cursive] text-4xl sm:text-6xl text-amber-950 mb-2 drop-shadow-sm font-normal">
          Xác Nhận Tham Dự
        </h2>
        <p className="font-['Cormorant_Garamond',serif] italic text-base sm:text-lg text-amber-800/85 max-w-md mx-auto leading-relaxed">
          “Sự hiện diện của bạn là niềm vinh hạnh và hạnh phúc trọn vẹn nhất của chúng mình”
        </p>
        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          <span className="text-amber-500 text-xs">✦ ✦ ✦</span>
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, duration: 0.7 }}
        className="max-w-lg mx-auto bg-[#fffdf9]/95 rounded-3xl border border-amber-200/80 p-6 sm:p-9 shadow-[0_20px_50px_-10px_rgba(140,90,40,0.12)] relative"
      >
        {/* Viền đôi mỏng hoàng gia */}
        <div className="absolute inset-2.5 rounded-2xl border border-amber-200/40 pointer-events-none" />

        <div className="relative z-10">
          <RSVPForm />
        </div>
      </motion.div>
    </section>
  );
}
