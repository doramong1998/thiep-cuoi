import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Gamepad2, MapPin, ExternalLink, Clock } from 'lucide-react';
import { BRIDE, GROOM, INVITATION_INFO, BRIDE_FAMILY, WEDDING_INFO } from '@/data/wedding';

interface LetterSceneProps {
  onContinue: () => void;
  guestName?: string;
  isGuestRoute?: boolean;
}

// Lấy tham số tên khách mời từ URL param ?name=... (hoặc qua hash param)
function getGuestNameFromUrl(): string {
  if (typeof window === 'undefined') return '';
  try {
    const searchParams = new URLSearchParams(window.location.search);
    const param = searchParams.get('name');
    if (param) return decodeURIComponent(param).trim();

    if (window.location.hash.includes('?')) {
      const hashQuery = window.location.hash.split('?')[1];
      const hashParam = new URLSearchParams(hashQuery).get('name');
      if (hashParam) return decodeURIComponent(hashParam).trim();
    }
  } catch {
    // Trình duyệt không hỗ trợ hoặc parse lỗi
  }
  return '';
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

export function LetterScene({ onContinue, guestName: propGuestName, isGuestRoute }: LetterSceneProps) {
  const [guestName, setGuestName] = useState<string>(() => propGuestName || getGuestNameFromUrl());

  useEffect(() => {
    if (propGuestName) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setGuestName(propGuestName);
      return;
    }
     
    setGuestName(getGuestNameFromUrl());

    const handleUrlChange = () => {
      setGuestName(getGuestNameFromUrl());
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, [propGuestName]);
  return (
    <section id="letter-scene" className="min-h-[130vh] flex flex-col items-center justify-start relative overflow-hidden px-4 pt-20 pb-10 md:pb-20 lg:pb-40 sm:pt-28 sm:pb-52 bg-transparent select-none">
      
      {/* Vầng sáng vàng dịu lan tỏa phía sau */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-amber-200/20 blur-3xl pointer-events-none -z-10" />

      <div className="w-full max-w-6xl mx-auto z-10 flex flex-col items-center">
        
        {/* ========================================================
            1. TIÊU ĐỀ: "CHÚNG MÌNH LÀ"
           ======================================================== */}
        <motion.div
          className="text-center mb-12 sm:mb-16 max-w-5xl px-4"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-['ganhtype',sans-serif] text-3xl sm:text-7xl text-amber-950 drop-shadow-sm font-normal">
          Có một ngày thật đặc biệt đang đến...
          </h2>
          
          <div className="flex items-center justify-center gap-3 mt-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            <span className="text-amber-500 text-xs">✦ ✦ ✦</span>
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          </div>
        </motion.div>


        {/* ========================================================
            2. KHUNG ẢNH CÔ DÂU & CHÚ RỂ
            - Mobile: Ảnh bỏ khung, cô dâu sát lề trái + text phải, chú rể sát lề phải + text trái
            - Desktop (md+): Giữ nguyên khung ảnh hoàng gia nằm ngang hàng
           ======================================================== */}

        {/* === MOBILE LAYOUT (< md) === */}
        <div className="w-full md:hidden mb-16 flex flex-col gap-10">
          
          {/* Cô dâu: ảnh sát trái, tên đè trên ảnh */}
          <motion.div
            className="w-full pr-10"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Khung viền hoàng gia */}
            <div className="relative p-2.5 rounded-xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EC] to-[#F5ECE0] border-2 border-[#D4AF37]/60 shadow-[4px_6px_16px_rgba(90,55,20,0.10)]">
              {/* Viền chỉ vàng kép bên trong */}
              <div className="absolute inset-1.5 rounded-lg border border-[#D4AF37]/35 pointer-events-none" />
              {/* Họa tiết góc mạ vàng */}
              <div className="absolute top-1.5 left-1.5 text-[#B8860B]/60 text-[8px] select-none pointer-events-none">✦</div>
              <div className="absolute top-1.5 right-1.5 text-[#B8860B]/60 text-[8px] select-none pointer-events-none">✦</div>
              <div className="absolute bottom-1.5 left-1.5 text-[#B8860B]/60 text-[8px] select-none pointer-events-none">✦</div>
              <div className="absolute bottom-1.5 right-1.5 text-[#B8860B]/60 text-[8px] select-none pointer-events-none">✦</div>

              <div className="aspect-[3/4] overflow-hidden rounded-md rounded-l-sm relative">
                <img
                  src="/images/bride.jpg"
                  alt="Cô dâu"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute bottom-0 px-4 py-4 left-0 w-full z-10 text-white select-none px-3.5 py-2 bg-gradient-to-b from-white/0 via-black/20 to-black/40  shadow-[0_6px_18px_rgba(0,0,0,0.00)]">
                  <p className="font-['1FTV-Carlytte',sans-serif] text-3xl sm:text-5xl text-rose-300 mb-0.5 font-semibold tracking-wide">
                    Cô dâu
                  </p>
                  <h3 className="font-['ganhtype',sans-serif] text-2xl sm:text-5xl font-bold uppercase tracking-wider text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] leading-snug">
                    {BRIDE.fullName}
                  </h3>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Chú rể: ảnh sát phải, tên đè trên ảnh */}
          <motion.div
            className="w-full pl-10"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            {/* Khung viền hoàng gia */}
            <div className="relative p-2.5 rounded-xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EC] to-[#F5ECE0] border-2 border-[#D4AF37]/60 shadow-[-4px_6px_16px_rgba(90,55,20,0.10)]">
              {/* Viền chỉ vàng kép bên trong */}
              <div className="absolute inset-1.5 rounded-lg border border-[#D4AF37]/35 pointer-events-none" />
              {/* Họa tiết góc mạ vàng */}
              <div className="absolute top-1.5 left-1.5 text-[#B8860B]/60 text-[8px] select-none pointer-events-none">✦</div>
              <div className="absolute top-1.5 right-1.5 text-[#B8860B]/60 text-[8px] select-none pointer-events-none">✦</div>
              <div className="absolute bottom-1.5 left-1.5 text-[#B8860B]/60 text-[8px] select-none pointer-events-none">✦</div>
              <div className="absolute bottom-1.5 right-1.5 text-[#B8860B]/60 text-[8px] select-none pointer-events-none">✦</div>

              <div className="aspect-[3/4] overflow-hidden rounded-md rounded-r-sm relative">
                <img
                  src="/images/groom.jpg"
                  alt="Chú rể"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute bottom-0 px-4 py-4 left-0 w-full z-10 text-white select-none text-right bg-gradient-to-b from-white/0 via-black/20 to-black/40  shadow-[0_6px_18px_rgba(0,0,0,0.00)]">
                  <p className="font-['1FTV-Carlytte',sans-serif] text-3xl sm:text-5xl text-amber-300 font-bold mb-0.5 tracking-wide">
                    Chú rể
                  </p>
                  <h3 className="font-['ganhtype',sans-serif] text-2xl sm:text-5xl font-bold uppercase tracking-wider text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] leading-snug">
                    {GROOM.fullName}
                  </h3>
                </div>              </div>
            </div>
          </motion.div>
        </div>

        {/* === DESKTOP LAYOUT (md+) — Khung ảnh hoàng gia nằm ngang hàng === */}
        <div className="hidden md:grid w-full max-w-5xl lg:max-w-6xl mx-auto px-2 sm:px-6 mb-16 sm:mb-24 grid-cols-2 gap-10 lg:gap-14 items-start justify-items-center">
          
          {/* 2.1 KHUNG ẢNH CÔ DÂU */}
          <motion.div
            className="w-full max-w-[470px] lg:max-w-[500px] p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EC] to-[#F5ECE0] border-2 border-[#D4AF37]/70 shadow-[0_20px_50px_-15px_rgba(90,55,20,0.22),0_0_20px_rgba(212,175,55,0.15)] relative group"
            initial={{ opacity: 0, scale: 0.88, y: 60 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute inset-1.5 sm:inset-2 rounded-lg sm:rounded-xl border border-[#D4AF37]/45 pointer-events-none" />
            <div className="absolute top-2 left-2 text-[#B8860B]/70 text-[9px] sm:text-[11px] select-none pointer-events-none">✦</div>
            <div className="absolute top-2 right-2 text-[#B8860B]/70 text-[9px] sm:text-[11px] select-none pointer-events-none">✦</div>
            <div className="absolute bottom-2 left-2 text-[#B8860B]/70 text-[9px] sm:text-[11px] select-none pointer-events-none">✦</div>
            <div className="absolute bottom-2 right-2 text-[#B8860B]/70 text-[9px] sm:text-[11px] select-none pointer-events-none">✦</div>

            <div className="w-full aspect-[3/4] rounded-md sm:rounded-lg overflow-hidden relative shadow-[inset_0_2px_10px_rgba(0,0,0,0.25)] bg-stone-200 border border-amber-900/10">
              <img
                src="/images/bride.jpg"
                alt="Cô dâu"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <motion.div 
                className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 z-10 text-white select-none px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl sm:rounded-2xl bg-gradient-to-b from-white/0 via-black/20 to-black/40 backdrop-blur-sm border border-white/10 shadow-[0_8px_22px_rgba(0,0,0,0.4)]"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.25, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="font-['ganhtype',sans-serif] text-2xl sm:text-3xl lg:text-4xl text-rose-200 mb-0.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] tracking-wide">
                  Cô dâu
                </p>
                <h3 className="font-['ganhtype',sans-serif] text-xl sm:text-2xl lg:text-3xl font-bold uppercase tracking-[0.14em] text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                  {BRIDE.fullName}
                </h3>
              
              </motion.div>
            </div>
          </motion.div>

          {/* 2.2 KHUNG ẢNH CHÚ RỂ */}
          <motion.div
            className="w-full max-w-[470px] lg:max-w-[500px] md:mt-10 lg:mt-14 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EC] to-[#F5ECE0] border-2 border-[#D4AF37]/70 shadow-[0_20px_50px_-15px_rgba(90,55,20,0.22),0_0_20px_rgba(212,175,55,0.15)] relative group"
            initial={{ opacity: 0, scale: 0.88, y: 60 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            <div className="absolute inset-1.5 sm:inset-2 rounded-lg sm:rounded-xl border border-[#D4AF37]/45 pointer-events-none" />
            <div className="absolute top-2 left-2 text-[#B8860B]/70 text-[9px] sm:text-[11px] select-none pointer-events-none">✦</div>
            <div className="absolute top-2 right-2 text-[#B8860B]/70 text-[9px] sm:text-[11px] select-none pointer-events-none">✦</div>
            <div className="absolute bottom-2 left-2 text-[#B8860B]/70 text-[9px] sm:text-[11px] select-none pointer-events-none">✦</div>
            <div className="absolute bottom-2 right-2 text-[#B8860B]/70 text-[9px] sm:text-[11px] select-none pointer-events-none">✦</div>

            <div className="w-full aspect-[3/4] rounded-md sm:rounded-lg overflow-hidden relative shadow-[inset_0_2px_10px_rgba(0,0,0,0.25)] bg-stone-200 border border-amber-900/10">
              <img
                src="/images/groom.jpg"
                alt="Chú rể"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <motion.div 
                className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 z-10 text-white select-none px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl sm:rounded-2xl bg-gradient-to-b from-black/25 via-black/40 to-black/60 backdrop-blur-sm border border-white/10 shadow-[0_8px_22px_rgba(0,0,0,0.4)]"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.35, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="font-['ganhtype',sans-serif] text-2xl sm:text-3xl lg:text-4xl text-amber-200 mb-0.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] tracking-wide">
                  Chú rể
                </p>
                <h3 className="font-['ganhtype',sans-serif] text-xl sm:text-2xl lg:text-3xl font-bold uppercase tracking-[0.14em] text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                  {GROOM.fullName}
                </h3>
               
              </motion.div>
            </div>
          </motion.div>
        </div>


        {/* ========================================================
            TRÂN TRỌNG KÍNH MỜI (LẤY TỪ PARAMS name="")
           ======================================================== */}
        <motion.div
          className="w-full max-w-lg sm:max-w-xl mx-auto mb-2 sm:mb-18 sm:px-6"
          initial={{ opacity: 0, scale: 0.88, y: 45 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#FFFDF9]/95 via-[#FAF6EE]/90 to-[#FFF7ED]/95 p-6 sm:p-8 border-2 border-amber-300/70 shadow-[0_16px_36px_-10px_rgba(90,60,30,0.12),0_0_20px_rgba(212,175,55,0.1)] text-center">
            {/* Viền đôi mỏng hoàng gia */}
            <div className="absolute inset-2 sm:inset-2.5 rounded-xl sm:rounded-2xl border border-amber-200/50 pointer-events-none" />

            {/* 4 Họa tiết góc mạ vàng hoàng gia */}
            <div className="absolute top-2.5 left-2.5 text-amber-600/70 text-[10px] sm:text-xs pointer-events-none select-none">✦</div>
            <div className="absolute top-2.5 right-2.5 text-amber-600/70 text-[10px] sm:text-xs pointer-events-none select-none">✦</div>
            <div className="absolute bottom-2.5 left-2.5 text-amber-600/70 text-[10px] sm:text-xs pointer-events-none select-none">✦</div>
            <div className="absolute bottom-2.5 right-2.5 text-amber-600/70 text-[10px] sm:text-xs pointer-events-none select-none">✦</div>
          
            {/* Dòng chữ: Trân trọng kính mời */}
            <p className="font-['ganhtype',sans-serif] italic text-lg sm:text-2xl text-amber-900/90 tracking-wide mb-6">
              Trân trọng kính mời
            </p>

            {/* Tên khách mời (lấy từ URL param ?name=...) */}
            <h3 className="font-['jacklane',sans-serif] text-3xl sm:text-3xl text-amber-950 my-4 drop-shadow-xs px-2 break-words">
              {guestName || 'Quý khách'}
            </h3>

            {/* Đường phân cách với icon trái tim */}
            <div className="flex items-center justify-center gap-3 my-3">
              <div className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <div className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            </div>

            {/* Lời chúc & lời mời tham dự */}
            <p className="font-['ganhtype',sans-serif] text-lg sm:text-xl text-amber-900/85 max-w-md mx-auto mb-4 leading-relaxed">
              Tới tham dự và chung vui cùng gia đình {isGuestRoute ? 'chúng tôi ' : ''}vào 
            </p>
                 <div className="mb-6 sm:mb-8 flex flex-col items-center">
            <h3 className="font-['ganhtype',sans-serif] text-2xl sm:text-4xl font-bold text-amber-950 tracking-wider">
              Tháng 10 · 2026
            </h3>
            <div className="h-0.5 w-32 bg-amber-400/70 mt-2 rounded-full" />
          </div>

          {/* Lưới ngày trong tháng (7 cột) */}
          <div className="w-full space-y-3 sm:space-y-4">
            {OCTOBER_2026_GRID.map((week, wIdx) => (
              <div key={`w-${wIdx}`} className="grid grid-cols-7 gap-2 sm:gap-4 text-center items-center">
                {week.map((day, dIdx) => {
                  if (day === null) {
                    return <div key={`empty-${wIdx}-${dIdx}`} className="h-10 sm:h-12" />;
                  }

                  const isWeddingDay = day === 24 || day === 25;

                  return (
                    <div
                      key={`day-${day}`}
                      className="h-6 sm:h-12 flex items-center justify-center relative"
                    >
                      {isWeddingDay ? (
                        /* Ngày cưới: Icon Trái tim cách điệu đỏ hồng ngọt ngào */
                        <motion.div
                          className="relative w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center cursor-pointer"
                          animate={{ scale: [1, 1.12, 1] }}
                          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                        >
                          <Heart className="w-full h-full text-rose-500 fill-rose-500 drop-shadow-[0_3px_10px_rgba(244,63,94,0.45)]" />
                          
                          <span className="absolute z-10 font-['ganhtype',sans-serif] text-xs sm:text-sm font-bold text-white drop-shadow-sm pt-0.5">
                            {day}
                          </span>
                        </motion.div>
                      ) : (
                        /* Ngày thường: Số đen thanh lịch trên nền thoáng */
                        <span className="font-['ganhtype',sans-serif] text-sm sm:text-lg font-medium text-neutral-800/90">
                          {day}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          </div>
        </motion.div>


        {/* ========================================================
            3. THƯ MỜI THAM DỰ (TIỆC CƯỚI NHÀ TRAI & NHÀ GÁI)
           ======================================================== */}
        <section className="w-full max-w-md md:max-w-4xl mt-32 mx-auto sm:px-6 mb-32 sm:mb-24">
          {/* Tiêu đề phân đoạn: Thư mời tham dự */}
          <div className="text-center mb-8 sm:mb-10 flex flex-col items-center">
            <h2 className="font-['ganhtype',sans-serif] text-3xl sm:text-5xl text-amber-950 drop-shadow-sm font-normal">
              Thư mời tham dự
            </h2>
            <div className="flex items-center justify-center gap-2 mt-2">
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
              <span className="text-amber-500 text-xs">✦ ✦ ✦</span>
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            {/* THẺ TIỆC CƯỚI NHÀ TRAI */}
            <motion.div
              className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#FFFDF9]/95 via-[#FAF6EE]/90 to-[#FFF7ED]/95 p-6 sm:p-8 border-2 border-amber-300/70 shadow-[0_16px_36px_-10px_rgba(90,60,30,0.12),0_0_20px_rgba(212,175,55,0.1)] text-center flex flex-col justify-between group"
              initial={{ opacity: 0, scale: 0.92, y: 35 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Viền đôi mỏng hoàng gia */}
              <div className="absolute inset-2 sm:inset-2.5 rounded-xl sm:rounded-2xl border border-amber-200/50 pointer-events-none" />

              {/* 4 Họa tiết góc mạ vàng hoàng gia */}
              <div className="absolute top-2.5 left-2.5 text-amber-600/70 text-[10px] sm:text-xs pointer-events-none select-none">✦</div>
              <div className="absolute top-2.5 right-2.5 text-amber-600/70 text-[10px] sm:text-xs pointer-events-none select-none">✦</div>
              <div className="absolute bottom-2.5 left-2.5 text-amber-600/70 text-[10px] sm:text-xs pointer-events-none select-none">✦</div>
              <div className="absolute bottom-2.5 right-2.5 text-amber-600/70 text-[10px] sm:text-xs pointer-events-none select-none">✦</div>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-amber-100/80 border border-amber-300/60 text-amber-900 text-xs sm:text-sm font-bold tracking-[0.16em] uppercase font-['ganhtype',sans-serif] mb-4">
                  <span>{INVITATION_INFO.groom.title}</span>
                </div>

                <p className="font-['ganhtype',sans-serif] text-base sm:text-lg text-amber-900/90 font-semibold mb-3 sm:mb-3">
                  {INVITATION_INFO.groom.time}
                </p>

                <div className="my-1 sm:my-2">
                  <p className="font-['ganhtype',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#8B2635] tracking-[0.08em] drop-shadow-xs">
                    {INVITATION_INFO.groom.date}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-amber-800/80 font-['ganhtype',sans-serif] italic mb-5 sm:mb-6">
                  {INVITATION_INFO.groom.lunarDate}
                </p>

                <h5 className="font-['ganhtype',sans-serif] text-lg sm:text-xl font-bold uppercase tracking-[0.08em] text-amber-950 mb-2">
                  {INVITATION_INFO.groom.venue}
                </h5>

                <p className="text-sm sm:text-base text-amber-900/85 max-w-xs sm:max-w-sm mx-auto leading-relaxed mb-6 font-['ganhtype',sans-serif] font-medium">
                  {INVITATION_INFO.groom.address}
                </p>
              </div>

              <div className="relative z-10">
                <a
                  href={INVITATION_INFO.groom.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#8B2635] hover:bg-[#701C27] text-amber-50 font-semibold font-['ganhtype',sans-serif] text-sm sm:text-base px-6 sm:px-7 py-2.5 rounded-full shadow-md shadow-[#8B2635]/25 transition-all hover:scale-105 active:scale-95 cursor-pointer tracking-wide"
                >
                  <MapPin className="w-3.5 h-3.5 text-rose-300" />
                  <span>Xem chỉ đường</span>
                  <ExternalLink className="w-3 h-3 text-rose-300/80" />
                </a>
              </div>
            </motion.div>

            {/* THẺ TIỆC CƯỚI NHÀ GÁI */}
            <motion.div
              className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#FFFDF9]/95 via-[#FAF6EE]/90 to-[#FFF7ED]/95 p-6 sm:p-8 border-2 border-amber-300/70 shadow-[0_16px_36px_-10px_rgba(90,60,30,0.12),0_0_20px_rgba(212,175,55,0.1)] text-center flex flex-col justify-between group"
              initial={{ opacity: 0, scale: 0.92, y: 35 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Viền đôi mỏng hoàng gia */}
              <div className="absolute inset-2 sm:inset-2.5 rounded-xl sm:rounded-2xl border border-amber-200/50 pointer-events-none" />

              {/* 4 Họa tiết góc mạ vàng hoàng gia */}
              <div className="absolute top-2.5 left-2.5 text-amber-600/70 text-[10px] sm:text-xs pointer-events-none select-none">✦</div>
              <div className="absolute top-2.5 right-2.5 text-amber-600/70 text-[10px] sm:text-xs pointer-events-none select-none">✦</div>
              <div className="absolute bottom-2.5 left-2.5 text-amber-600/70 text-[10px] sm:text-xs pointer-events-none select-none">✦</div>
              <div className="absolute bottom-2.5 right-2.5 text-amber-600/70 text-[10px] sm:text-xs pointer-events-none select-none">✦</div>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-amber-100/80 border border-amber-300/60 text-amber-900 text-xs sm:text-sm font-bold tracking-[0.16em] uppercase font-['ganhtype',sans-serif] mb-3 shadow-2xs">
                  <span>{INVITATION_INFO.bride.title}</span>
                </div>

                <p className="font-['ganhtype',sans-serif] text-base sm:text-lg text-amber-900/90 font-semibold mb-3 sm:mb-3">
                  {INVITATION_INFO.bride.time}
                </p>

                <div className="my-1 sm:my-2">
                  <p className="font-['ganhtype',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#8B2635] tracking-[0.08em] drop-shadow-xs">
                    {INVITATION_INFO.bride.date}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-amber-800/80 font-['ganhtype',sans-serif] italic mb-5 sm:mb-6">
                  {INVITATION_INFO.bride.lunarDate}
                </p>

                <h5 className="font-['ganhtype',sans-serif] text-lg sm:text-xl font-bold uppercase tracking-[0.08em] text-amber-950 mb-2">
                  {INVITATION_INFO.bride.venue}
                </h5>

                <p className="text-sm sm:text-base text-amber-900/85 max-w-xs sm:max-w-sm mx-auto leading-relaxed mb-1 font-['ganhtype',sans-serif] font-medium">
                  {INVITATION_INFO.bride.address}
                </p>
                 <p className="text-sm sm:text-base text-amber-900/85 max-w-xs sm:max-w-sm mx-auto leading-relaxed mb-6 font-['ganhtype',sans-serif] font-medium">
                  (Đ/c cũ: thôn Tân Thể, Việt Ngọc, Tân Yên, Bắc Giang)
                </p>
              </div>

              <div className="relative z-10">
                <a
                  href={INVITATION_INFO.bride.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#8B2635] hover:bg-[#701C27] text-amber-50 font-semibold font-['ganhtype',sans-serif] text-sm sm:text-base px-6 sm:px-7 py-2.5 rounded-full shadow-md shadow-[#8B2635]/25 transition-all hover:scale-105 active:scale-95 cursor-pointer tracking-wide"
                >
                  <MapPin className="w-3.5 h-3.5 text-rose-300" />
                  <span>Xem chỉ đường</span>
                  <ExternalLink className="w-3 h-3 text-rose-300/80" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ========================================================
            4. TIMELINE CHƯƠNG TRÌNH HÔN LỄ (NGÀY 25/10/2026)
           ======================================================== */}
        <section className="w-full max-w-md md:max-w-3xl mx-auto px-4 sm:px-6 mb-16 sm:mb-20">
          <div className="text-center mb-8 sm:mb-10 flex flex-col items-center">
            <h2 className="font-['ganhtype',sans-serif] text-3xl sm:text-5xl text-amber-950 drop-shadow-sm font-normal">
              Chương trình hôn lễ
            </h2>
            <div className=" items-center gap-2 px-4 py-1.5 rounded-2xl bg-amber-100/90 border border-amber-300/80 text-amber-900 font-['ganhtype',sans-serif] text-xs sm:text-sm font-semibold tracking-wider mt-3 shadow-2xs">
              <div className='text-sm mb-1'>Chủ Nhật · 25 · 10 · 2026</div>
              <div className="text-amber-800/70">16 tháng 09 năm Bính Ngọ</div>
            </div>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
              <span className="text-amber-500 text-xs">✦ ✦ ✦</span>
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            </div>
          </div>

          <div className="relative">
            {/* Đường trục timeline vàng kim giữa các mốc */}
            <div className="hidden sm:block absolute left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-300 border-l border-dashed border-amber-500/50 pointer-events-none" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8 items-stretch">
              {/* MỐC 1: LỄ VU QUY 10h00 */}
              <motion.div
                className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#FFFDF9]/95 via-[#FAF6EE]/90 to-[#FFF7ED]/95 p-5 sm:p-6 border-2 border-amber-300/70 shadow-[0_12px_30px_-8px_rgba(90,60,30,0.1)] text-center flex flex-col justify-between"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
              >
                <div className="absolute inset-2 rounded-xl sm:rounded-2xl border border-amber-200/50 pointer-events-none" />
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100/80 border border-rose-300/60 text-[#8B2635] text-xs sm:text-sm font-bold tracking-wider uppercase font-['ganhtype',sans-serif] mb-3">
                    <Clock className="w-3.5 h-3.5" />
                    <span>10:00 · Sáng</span>
                  </div>

                  <h3 className="font-['ganhtype',sans-serif] text-2xl sm:text-3xl font-bold text-[#8B2635] uppercase tracking-wider mb-2">
                    Lễ Vu Quy
                  </h3>

                  <p className="font-['ganhtype',sans-serif] text-sm sm:text-base font-semibold text-amber-950 mb-1">
                    Tại Tư gia Nhà gái
                  </p>

                  <p className="font-['ganhtype',sans-serif] text-xs sm:text-sm text-amber-900/80 leading-relaxed mb-1">
                    {BRIDE_FAMILY.address}
                  </p>
                   <p className="font-['ganhtype',sans-serif] text-xs sm:text-sm text-amber-900/80 leading-relaxed mb-4">
                    (Thôn Tân Thể, Việt Ngọc, Tân Yên, Bắc Giang)
                  </p>
                </div>

                <div className="relative z-10 pt-1">
                  <a
                    href={BRIDE_FAMILY.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#8B2635] hover:bg-[#701C27] text-amber-50 font-semibold font-['ganhtype',sans-serif] text-xs sm:text-sm px-5 py-2 rounded-full shadow-md shadow-[#8B2635]/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <MapPin className="w-3 h-3 text-rose-300" />
                    <span>Xem chỉ đường</span>
                    <ExternalLink className="w-3 h-3 text-rose-300/80" />
                  </a>
                </div>
              </motion.div>

              {/* MỐC 2: LỄ THÀNH HÔN 15h30 */}
              <motion.div
                className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#FFFDF9]/95 via-[#FAF6EE]/90 to-[#FFF7ED]/95 p-5 sm:p-6 border-2 border-amber-300/70 shadow-[0_12px_30px_-8px_rgba(90,60,30,0.1)] text-center flex flex-col justify-between"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <div className="absolute inset-2 rounded-xl sm:rounded-2xl border border-amber-200/50 pointer-events-none" />
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100/90 border border-amber-300/60 text-amber-950 text-xs sm:text-sm font-bold tracking-wider uppercase font-['ganhtype',sans-serif] mb-3">
                    <Clock className="w-3.5 h-3.5 text-amber-700" />
                    <span>15:30 · Chiều</span>
                  </div>

                  <h3 className="font-['ganhtype',sans-serif] text-2xl sm:text-3xl font-bold text-[#8B2635] uppercase tracking-wider mb-2">
                    Lễ Thành Hôn
                  </h3>

                  <p className="font-['ganhtype',sans-serif] text-sm sm:text-base font-semibold text-amber-950 mb-1">
                    Tại Nhà Hàng Phượng Ớt
                  </p>

                  <p className="font-['ganhtype',sans-serif] text-xs sm:text-sm text-amber-900/80 leading-relaxed mb-4">
                    {WEDDING_INFO.address}
                  </p>
                </div>

                <div className="relative z-10 pt-1">
                  <a
                    href={WEDDING_INFO.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#8B2635] hover:bg-[#701C27] text-amber-50 font-semibold font-['ganhtype',sans-serif] text-xs sm:text-sm px-5 py-2 rounded-full shadow-md shadow-[#8B2635]/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <MapPin className="w-3 h-3 text-rose-300" />
                    <span>Xem chỉ đường</span>
                    <ExternalLink className="w-3 h-3 text-rose-300/80" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>


        {/* ========================================================
            5. NÚT PHONG CÁCH GAME TIẾP TỤC VÀO GAME PIXEL (CHỈ DESKTOP)
           ======================================================== */}
        {!isGuestRoute && (
          <motion.div
            className="hidden md:flex mt-6 sm:mt-8 z-10 flex-col items-center px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <button
              onClick={onContinue}
              className="group relative px-6 py-3.5 sm:px-8 sm:py-4 rounded-2xl bg-gradient-to-b from-[#e5b76c] via-[#d49f50] to-[#bd8235] text-white font-['Panton-Regular',sans-serif] text-sm sm:text-base font-semibold border-2 border-amber-200/90 shadow-[0_5px_0_#9a6320,0_12px_24px_rgba(154,99,32,0.22)] hover:shadow-[0_3px_0_#9a6320,0_8px_16px_rgba(154,99,32,0.18)] hover:translate-y-[2px] active:shadow-[0_0px_0_#9a6320] active:translate-y-[5px] transition-all duration-150 flex flex-col items-center gap-1.5 cursor-pointer overflow-hidden select-none"
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
              <div className="flex items-center gap-2 text-white font-['Panton-Regular',sans-serif] font-medium text-xs sm:text-[13px] tracking-wide pt-0.5">
                <span>Nhìn lại một hành trình mang tên yêu thương</span>
              </div>
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
}
