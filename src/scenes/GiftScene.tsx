import { motion } from 'framer-motion';
// import { GiftCard } from '@/components/GiftCard';
import { BRIDE, GROOM } from '@/data/wedding';
import { Heart } from 'lucide-react';

export function GiftScene() {
  return (
    <>
      {/* TẠM ẨN PHẦN MỪNG CƯỚI
      <section className="py-16 sm:py-20 bg-gradient-to-b from-amber-50/20 to-rose-50/25 backdrop-blur-[0.5px] px-4">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-['Great_Vibes',cursive] text-2xl text-amber-600 mb-1">Wedding Gift</p>
          <h2 className="font-['Playfair_Display',serif] text-2xl sm:text-4xl font-bold text-amber-900 mb-3">
            Mừng Cưới
          </h2>
          <p className="font-['Cormorant_Garamond',serif] text-base text-amber-600 max-w-md mx-auto">
            Sự hiện diện của bạn là món quà lớn nhất
          </p>
        </motion.div>
        <GiftCard />
      </section>
      */}

      {/* Footer tông màu sáng lãng mạn, thanh thoát và hài hòa với trang */}
      <footer className="relative py-16 sm:py-24 bg-gradient-to-b from-amber-50/80 via-[#fffcf6] to-amber-100/80 text-amber-950 text-center px-4 overflow-hidden border-t border-amber-300/40 select-none">
        {/* Ánh sáng vàng hồng dịu dàng lan tỏa */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-40 bg-gradient-to-r from-amber-200/20 via-rose-200/20 to-amber-200/20 pointer-events-none -z-10" />

        <motion.div
          className="relative z-10 max-w-xl mx-auto flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Tên cặp đôi */}
          <h3 className="font-['Alex_Brush',cursive] text-5xl sm:text-7xl text-amber-950 mb-3 drop-shadow-sm">
            {GROOM.firstName} & {BRIDE.firstName}
          </h3>

          {/* Ngày cưới */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-300/80 text-amber-900 font-['Cinzel',serif] text-xs sm:text-sm tracking-[0.2em] font-bold mb-5 shadow-sm">
            <span>25 · 10 · 2026</span>
          </div>

          {/* Lời cảm ơn chân thành */}
          <p className="font-['Cormorant_Garamond',serif] italic text-lg sm:text-2xl text-amber-900/90 mb-6 leading-relaxed max-w-lg px-2">
            “Cảm ơn bạn đã luôn yêu thương, đồng hành và là một phần tuyệt vời nhất trong ngày hạnh phúc của chúng mình!”
          </p>

          {/* Họa tiết phân cách */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-14 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500/80 animate-pulse" />
            <div className="h-px w-14 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          </div>

          {/* Dòng bản quyền sắc nét, tươi sáng */}
          <p className="font-['Montserrat',sans-serif] text-xs sm:text-sm text-amber-800/80 tracking-wider font-medium">
            {GROOM.fullName} ❤️ {BRIDE.fullName} · Forever & Always
          </p>
        </motion.div>
      </footer>
    </>
  );
}
