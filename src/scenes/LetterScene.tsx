import { motion } from 'framer-motion';
import { Heart, ChevronDown, MapPin, ExternalLink, Sparkles, Gamepad2 } from 'lucide-react';
import { BRIDE, GROOM, BRIDE_FAMILY, GROOM_FAMILY } from '@/data/wedding';

interface LetterSceneProps {
  onContinue: () => void;
}

// Lịch tháng 10 năm 2026 (Ngày 1/10/2026 là Thứ 5, ngày 25/10/2026 là Chủ Nhật)
// Sắp xếp dạng lưới 7 cột thoáng đãng
const OCTOBER_2026_GRID = [
  [null, null, null, 1, 2, 3, 4],
  [5, 6, 7, 8, 9, 10, 11],
  [12, 13, 14, 15, 16, 17, 18],
  [19, 20, 21, 22, 23, 24, 25],
  [26, 27, 28, 29, 30, 31, null],
];

export function LetterScene({ onContinue }: LetterSceneProps) {
  return (
    <section id="letter-scene" className="min-h-[130vh] flex flex-col items-center justify-start relative overflow-hidden px-4 pt-20 pb-40 sm:pt-28 sm:pb-52 bg-transparent select-none">
      
      {/* Vầng sáng vàng dịu lan tỏa phía sau */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-amber-200/20 blur-3xl pointer-events-none -z-10" />

      <div className="w-full max-w-3xl mx-auto z-10 flex flex-col items-center">
        
        {/* ========================================================
            1. TIÊU ĐỀ: "CHÚNG MÌNH LÀ"
           ======================================================== */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-['Alex_Brush',cursive] text-5xl sm:text-7xl text-amber-950 drop-shadow-sm">
            Hai Đứa Mình
          </h2>
          
          <div className="flex items-center justify-center gap-3 mt-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            <span className="text-amber-500 text-xs">✦ ✦ ✦</span>
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          </div>
        </motion.div>


        {/* ========================================================
            2. THẺ ẢNH CÔ DÂU & CHÚ RỂ TÁCH BIỆT (ANIMATION KHI CUỘN ĐẾN)
           ======================================================== */}
        <div className="w-full flex flex-col items-center relative max-w-2xl px-2 mb-16 sm:mb-24">
          
          {/* 2.1 THẺ ẢNH CÔ DÂU (LỆCH TRÁI - TRƯỢT TỪ TRÁI VÀO KHI CUỘN) */}
          <motion.div
            className="w-full max-w-[320px] sm:max-w-[370px] aspect-[3/4.3] rounded-[32px] sm:rounded-[36px] overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] relative self-start ml-2 sm:ml-6 group border border-white/40"
            initial={{ opacity: 0, x: -70, y: 40, scale: 0.92, rotate: -2 }}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Ảnh cô dâu toàn khung sắc nét */}
            <img
              src="/images/bride.jpg"
              alt="Cô dâu"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />

            {/* Lớp phủ gradient chuyển sắc tối nhẹ ở góc dưới để tôn chữ */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Text thông tin cô dâu ở góc dưới bên trái */}
            <motion.div 
              className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 z-10 text-white select-none"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-['Alex_Brush',cursive] text-3xl sm:text-4xl text-rose-200 mb-0.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                Cô dâu
              </p>
              <h3 className="font-['Cinzel',serif] text-xl sm:text-2xl font-bold uppercase tracking-[0.14em] text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                {BRIDE.fullName}
              </h3>
              <p className="font-['Cormorant_Garamond',serif] text-sm sm:text-base font-semibold tracking-widest text-white/95 mt-0.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                {BRIDE.birthDate || '20.08.2001'}
              </p>
            </motion.div>
          </motion.div>


          {/* 2.2 KHOẢNG TRỐNG NỐI Ở GIỮA */}
          <div className="py-6 sm:py-8 flex flex-col items-center justify-center relative z-20" />


          {/* 2.3 THẺ ẢNH CHÚ RỂ (LỆCH PHẢI - TRƯỢT TỪ PHẢI VÀO KHI CUỘN) */}
          <motion.div
            className="w-full max-w-[320px] sm:max-w-[370px] aspect-[3/4.3] rounded-[32px] sm:rounded-[36px] overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] relative self-end mr-2 sm:mr-6 group border border-white/40"
            initial={{ opacity: 0, x: 70, y: 40, scale: 0.92, rotate: 2 }}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Ảnh chú rể toàn khung sắc nét */}
            <img
              src="/images/groom.jpg"
              alt="Chú rể"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />

            {/* Lớp phủ gradient chuyển sắc tối nhẹ ở góc dưới để tôn chữ */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Text thông tin chú rể ở góc dưới bên trái */}
            <motion.div 
              className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 z-10 text-white select-none"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-['Alex_Brush',cursive] text-3xl sm:text-4xl text-amber-200 mb-0.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                Chú rể
              </p>
              <h3 className="font-['Cinzel',serif] text-xl sm:text-2xl font-bold uppercase tracking-[0.14em] text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                {GROOM.fullName}
              </h3>
              <p className="font-['Cormorant_Garamond',serif] text-sm sm:text-base font-semibold tracking-widest text-white/95 mt-0.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                {GROOM.birthDate || '06.05.1998'}
              </p>
            </motion.div>
          </motion.div>

        </div>


        {/* ========================================================
            3. PHẦN LỊCH CƯỚI THÁNG 10/2026 (DƯỚI ẢNH CÔ DÂU CHÚ RỂ)
           ======================================================== */}
        <motion.div
          className="w-full max-w-sm sm:max-w-md mx-auto mb-16 sm:mb-20 px-2 sm:px-6 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Tiêu đề Tháng và Năm */}
          <div className="mb-6 sm:mb-8 flex flex-col items-center">
            <span className="font-['Cormorant_Garamond',serif] italic text-lg sm:text-xl text-amber-900/90 font-medium tracking-wide mb-1">
              Chúng mình có hẹn với nhau vào
            </span>
            <h3 className="font-['Playfair_Display',serif] text-2xl sm:text-3xl font-bold text-amber-950 tracking-wider">
              Tháng 10 · 2026
            </h3>
            <div className="h-0.5 w-12 bg-amber-400/70 mt-2 rounded-full" />
          </div>

          {/* Lưới ngày trong tháng (7 cột) */}
          <div className="w-full space-y-3 sm:space-y-4">
            {OCTOBER_2026_GRID.map((week, wIdx) => (
              <div key={`w-${wIdx}`} className="grid grid-cols-7 gap-2 sm:gap-4 text-center items-center">
                {week.map((day, dIdx) => {
                  if (day === null) {
                    return <div key={`empty-${wIdx}-${dIdx}`} className="h-10 sm:h-12" />;
                  }

                  const isWeddingDay = day === 25;

                  return (
                    <div
                      key={`day-${day}`}
                      className="h-10 sm:h-12 flex items-center justify-center relative"
                    >
                      {isWeddingDay ? (
                        /* Ngày cưới 25: Icon Trái tim cách điệu đỏ hồng ngọt ngào */
                        <motion.div
                          className="relative w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center cursor-pointer"
                          animate={{ scale: [1, 1.12, 1] }}
                          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                        >
                          <Heart className="w-full h-full text-rose-500 fill-rose-500 drop-shadow-[0_3px_10px_rgba(244,63,94,0.45)]" />
                          
                          <span className="absolute z-10 font-['Playfair_Display',serif] text-xs sm:text-sm font-bold text-white drop-shadow-sm pt-0.5">
                            25
                          </span>
                        </motion.div>
                      ) : (
                        /* Ngày thường: Số đen thanh lịch trên nền thoáng */
                        <span className="font-['Playfair_Display',serif] text-base sm:text-lg font-medium text-neutral-800/90">
                          {day}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </motion.div>


        {/* ========================================================
            4. THÔNG TIN NHÀ TRAI & NHÀ GÁI (CÓ LINK GOOGLE MAPS)
           ======================================================== */}
        <motion.div
          className="w-full max-w-2xl mb-14 sm:mb-18 flex flex-col items-center"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Tiêu đề phân đoạn gia đình từ lời giới thiệu của Cô Dâu & Chú Rể */}
          <div className="text-center mb-8">
            <h3 className="font-['Great_Vibes',cursive] text-3xl sm:text-4xl text-amber-950 mb-1.5 drop-shadow-sm">
              Gia Đình Của Chúng Mình
            </h3>
            {/* <p className="text-xs sm:text-sm text-amber-800/85 font-['Cormorant_Garamond',serif] italic max-w-md mx-auto leading-relaxed">
              “Chúng mình xin trân trọng giới thiệu hai bên gia đình – điểm tựa yêu thương và vững chắc nhất của chúng mình”
            </p> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 w-full">
            
            {/* THẺ NHÀ TRAI */}
            <div className="relative rounded-2xl bg-[#fffdf9]/90 backdrop-blur-md p-5 sm:p-6 border border-amber-300/60 shadow-[0_12px_30px_-8px_rgba(90,60,30,0.12)] flex flex-col justify-between text-center group">
              {/* Viền đôi mỏng hoàng gia */}
              <div className="absolute inset-2 rounded-xl border border-amber-200/40 pointer-events-none" />
              
              <div>
                <div className="inline-flex items-center gap-1.5 px-3.5 py-0.5 rounded-full bg-amber-100/70 border border-amber-300/50 text-amber-900 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase font-['Cinzel',serif] mb-3.5">
                  <Sparkles className="w-2.5 h-2.5 text-amber-600" />
                  <span>{GROOM_FAMILY.title}</span>
                  <Sparkles className="w-2.5 h-2.5 text-amber-600" />
                </div>

                <div className="space-y-1 mb-3.5 font-['Playfair_Display',serif]">
                  <p className="text-xs sm:text-sm text-amber-950 font-medium">
                    <span className="text-amber-800/70 text-[11px] mr-1">Ông:</span>
                    <span className="font-bold text-amber-950">{GROOM_FAMILY.father}</span>
                  </p>
                  <p className="text-xs sm:text-sm text-amber-950 font-medium">
                    <span className="text-amber-800/70 text-[11px] mr-1">Bà:</span>
                    <span className="font-bold text-amber-950">{GROOM_FAMILY.mother}</span>
                  </p>
                </div>

                <div className="h-px w-10 bg-amber-300/60 mx-auto my-2.5" />

                <p className="text-[11px] text-amber-700 tracking-wider font-semibold font-['Cinzel',serif] uppercase mb-0.5">
                  Chú Rể
                </p>
                <h4 className="font-['Alex_Brush',cursive] text-3xl sm:text-4xl text-amber-950 mb-3">
                  {GROOM.fullName}
                </h4>
              </div>

              {/* Địa chỉ & Link Google Maps */}
              <div className="pt-2 border-t border-amber-200/50 flex flex-col items-center gap-2">
                <p className="text-[11px] sm:text-xs text-amber-800/80 font-['Cormorant_Garamond',serif] leading-tight">
                  {GROOM_FAMILY.address}
                </p>

                <a
                  href={GROOM_FAMILY.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 hover:bg-amber-200 text-amber-900 text-[10px] sm:text-[11px] font-medium border border-amber-300/60 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <MapPin className="w-3 h-3 text-rose-500" />
                  <span>Xem trên Google Maps</span>
                  <ExternalLink className="w-2.5 h-2.5 text-amber-700 opacity-80" />
                </a>
              </div>
            </div>


            {/* THẺ NHÀ GÁI */}
            <div className="relative rounded-2xl bg-[#fffdf9]/90 backdrop-blur-md p-5 sm:p-6 border border-amber-300/60 shadow-[0_12px_30px_-8px_rgba(90,60,30,0.12)] flex flex-col justify-between text-center group">
              {/* Viền đôi mỏng hoàng gia */}
              <div className="absolute inset-2 rounded-xl border border-amber-200/40 pointer-events-none" />
              
              <div>
                <div className="inline-flex items-center gap-1.5 px-3.5 py-0.5 rounded-full bg-amber-100/70 border border-amber-300/50 text-amber-900 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase font-['Cinzel',serif] mb-3.5">
                  <Sparkles className="w-2.5 h-2.5 text-amber-600" />
                  <span>{BRIDE_FAMILY.title}</span>
                  <Sparkles className="w-2.5 h-2.5 text-amber-600" />
                </div>

                <div className="space-y-1 mb-3.5 font-['Playfair_Display',serif]">
                  <p className="text-xs sm:text-sm text-amber-950 font-medium">
                    <span className="text-amber-800/70 text-[11px] mr-1">Ông:</span>
                    <span className="font-bold text-amber-950">{BRIDE_FAMILY.father}</span>
                  </p>
                  <p className="text-xs sm:text-sm text-amber-950 font-medium">
                    <span className="text-amber-800/70 text-[11px] mr-1">Bà:</span>
                    <span className="font-bold text-amber-950">{BRIDE_FAMILY.mother}</span>
                  </p>
                </div>

                <div className="h-px w-10 bg-amber-300/60 mx-auto my-2.5" />

                <p className="text-[11px] text-amber-700 tracking-wider font-semibold font-['Cinzel',serif] uppercase mb-0.5">
                  Cô Dâu
                </p>
                <h4 className="font-['Alex_Brush',cursive] text-3xl sm:text-4xl text-amber-950 mb-3">
                  {BRIDE.fullName}
                </h4>
              </div>

              {/* Địa chỉ & Link Google Maps */}
              <div className="pt-2 border-t border-amber-200/50 flex flex-col items-center gap-2">
                <p className="text-[11px] sm:text-xs text-amber-800/80 font-['Cormorant_Garamond',serif] leading-tight">
                  {BRIDE_FAMILY.address}
                </p>

                <a
                  href={BRIDE_FAMILY.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 hover:bg-amber-200 text-amber-900 text-[10px] sm:text-[11px] font-medium border border-amber-300/60 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <MapPin className="w-3 h-3 text-rose-500" />
                  <span>Xem trên Google Maps</span>
                  <ExternalLink className="w-2.5 h-2.5 text-amber-700 opacity-80" />
                </a>
              </div>
            </div>

          </div>
        </motion.div>


        {/* ========================================================
            5. NÚT PHONG CÁCH GAME TIẾP TỤC VÀO GAME PIXEL
           ======================================================== */}
        <motion.div
          className="mt-6 sm:mt-8 z-10 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <button
            onClick={onContinue}
            className="group relative px-6 py-3.5 sm:px-8 sm:py-4 rounded-2xl bg-gradient-to-b from-[#e5b76c] via-[#d49f50] to-[#bd8235] text-white font-['Montserrat',sans-serif] text-xs sm:text-sm font-semibold border-2 border-amber-200/90 shadow-[0_5px_0_#9a6320,0_12px_24px_rgba(154,99,32,0.22)] hover:shadow-[0_3px_0_#9a6320,0_8px_16px_rgba(154,99,32,0.18)] hover:translate-y-[2px] active:shadow-[0_0px_0_#9a6320] active:translate-y-[5px] transition-all duration-150 flex flex-col items-center gap-1.5 cursor-pointer overflow-hidden select-none"
          >
            {/* Lớp ánh sáng phản chiếu bóng kính */}
            <div className="absolute inset-x-0 top-0 h-1/2 bg-white/20 rounded-t-xl pointer-events-none" />

            {/* Tag phong cách Game Pixel 8-bit */}
            <div className="flex items-center gap-2 font-['Press_Start_2P',monospace] text-[9px] sm:text-[10px] text-amber-100 tracking-wider">
              <Gamepad2 className="w-3.5 h-3.5 text-amber-200 animate-bounce" />
              <span>[ PRESS TO START ]</span>
              <span className="text-rose-300">♥</span>
            </div>

            {/* Dòng chữ chính */}
            <div className="flex items-center gap-2 text-white font-medium text-xs sm:text-[13px] tracking-wide pt-0.5">
              <span>Cùng nhìn lại hành trình với tụi mình nha</span>
            </div>
          </button>
        </motion.div>

      </div>
    </section>
  );
}
