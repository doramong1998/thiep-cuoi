import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, MapPin, ExternalLink, Sparkles, Gamepad2, Clock } from 'lucide-react';
import { BRIDE, GROOM, BRIDE_FAMILY, GROOM_FAMILY, WEDDING_INFO } from '@/data/wedding';

interface LetterSceneProps {
  onContinue: () => void;
  guestName?: string;
}

// Lấy tham số tên khách mời từ URL param ?name=... (hoặc qua hash param)
function getGuestNameFromUrl(): string {
  if (typeof window === 'undefined') return '';
  try {
    const searchParams = new URLSearchParams(window.location.search);
    const param = searchParams.get('name');
    if (param) return param.trim();

    if (window.location.hash.includes('?')) {
      const hashQuery = window.location.hash.split('?')[1];
      const hashParam = new URLSearchParams(hashQuery).get('name');
      if (hashParam) return hashParam.trim();
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

export function LetterScene({ onContinue, guestName: propGuestName }: LetterSceneProps) {
  const [guestName, setGuestName] = useState<string>(() => propGuestName || getGuestNameFromUrl());

  useEffect(() => {
    if (propGuestName) {
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
    <section id="letter-scene" className="min-h-[130vh] flex flex-col items-center justify-start relative overflow-hidden px-4 pt-20 pb-40 sm:pt-28 sm:pb-52 bg-transparent select-none">
      
      {/* Vầng sáng vàng dịu lan tỏa phía sau */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-amber-200/20 blur-3xl pointer-events-none -z-10" />

      <div className="w-full max-w-6xl mx-auto z-10 flex flex-col items-center">
        
        {/* ========================================================
            1. TIÊU ĐỀ: "CHÚNG MÌNH LÀ"
           ======================================================== */}
        <motion.div
          className="text-center mb-12 sm:mb-16 max-w-3xl"
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
            2. KHUNG ẢNH CÔ DÂU & CHÚ RỂ (NẰM NGANG HÀNG TRÊN WEB - TỈ LỆ 900x1200)
           ======================================================== */}
        <div className="w-full max-w-5xl lg:max-w-6xl mx-auto px-2 sm:px-6 mb-16 sm:mb-24 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 items-start justify-items-center">
          
          {/* 2.1 KHUNG ẢNH CÔ DÂU (ANIMATION ZOOM TO & LỆCH LÊN) */}
          <motion.div
            className="w-full max-w-[380px] sm:max-w-[440px] md:max-w-[470px] lg:max-w-[500px] p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EC] to-[#F5ECE0] border-2 border-[#D4AF37]/70 shadow-[0_20px_50px_-15px_rgba(90,55,20,0.22),0_0_20px_rgba(212,175,55,0.15)] relative group"
            initial={{ opacity: 0, scale: 0.88, y: 60 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Viền chỉ vàng kép nghệ thuật chạy quanh khung */}
            <div className="absolute inset-1.5 sm:inset-2 rounded-lg sm:rounded-xl border border-[#D4AF37]/45 pointer-events-none" />

            {/* 4 Họa tiết góc khung mạ vàng hoàng gia */}
            <div className="absolute top-2 left-2 text-[#B8860B]/70 text-[9px] sm:text-[11px] select-none pointer-events-none">✦</div>
            <div className="absolute top-2 right-2 text-[#B8860B]/70 text-[9px] sm:text-[11px] select-none pointer-events-none">✦</div>
            <div className="absolute bottom-2 left-2 text-[#B8860B]/70 text-[9px] sm:text-[11px] select-none pointer-events-none">✦</div>
            <div className="absolute bottom-2 right-2 text-[#B8860B]/70 text-[9px] sm:text-[11px] select-none pointer-events-none">✦</div>

            {/* Khung chứa ảnh tỉ lệ chuẩn 900x1200 (aspect 3/4) */}
            <div className="w-full aspect-[3/4] rounded-md sm:rounded-lg overflow-hidden relative shadow-[inset_0_2px_10px_rgba(0,0,0,0.25)] bg-stone-200 border border-amber-900/10">
              {/* Ảnh cô dâu toàn khung sắc nét */}
              <img
                src="/images/bride.jpg"
                alt="Cô dâu"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />

              {/* Lớp phủ gradient chuyển sắc tối nhẹ ở góc dưới để tôn chữ */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

              {/* Text thông tin cô dâu ở góc dưới bên trái */}
              <motion.div 
                className="absolute bottom-5 sm:bottom-7 left-5 sm:left-7 z-10 text-white select-none"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.25, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="font-['Alex_Brush',cursive] text-3xl sm:text-4xl lg:text-5xl text-rose-200 mb-0.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  Cô dâu
                </p>
                <h3 className="font-['Cinzel',serif] text-xl sm:text-2xl lg:text-3xl font-bold uppercase tracking-[0.14em] text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                  {BRIDE.fullName}
                </h3>
                <p className="font-['Cormorant_Garamond',serif] text-sm sm:text-base font-semibold tracking-widest text-white/95 mt-0.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  {BRIDE.birthDate || '20.08.2001'}
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* 2.2 KHUNG ẢNH CHÚ RỂ (ANIMATION ZOOM TO & LỆCH LÊN - ĐẶT THẤP HƠN TRÊN WEB) */}
          <motion.div
            className="w-full max-w-[380px] sm:max-w-[440px] md:max-w-[470px] lg:max-w-[500px] md:mt-10 lg:mt-14 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EC] to-[#F5ECE0] border-2 border-[#D4AF37]/70 shadow-[0_20px_50px_-15px_rgba(90,55,20,0.22),0_0_20px_rgba(212,175,55,0.15)] relative group"
            initial={{ opacity: 0, scale: 0.88, y: 60 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            {/* Viền chỉ vàng kép nghệ thuật chạy quanh khung */}
            <div className="absolute inset-1.5 sm:inset-2 rounded-lg sm:rounded-xl border border-[#D4AF37]/45 pointer-events-none" />

            {/* 4 Họa tiết góc khung mạ vàng hoàng gia */}
            <div className="absolute top-2 left-2 text-[#B8860B]/70 text-[9px] sm:text-[11px] select-none pointer-events-none">✦</div>
            <div className="absolute top-2 right-2 text-[#B8860B]/70 text-[9px] sm:text-[11px] select-none pointer-events-none">✦</div>
            <div className="absolute bottom-2 left-2 text-[#B8860B]/70 text-[9px] sm:text-[11px] select-none pointer-events-none">✦</div>
            <div className="absolute bottom-2 right-2 text-[#B8860B]/70 text-[9px] sm:text-[11px] select-none pointer-events-none">✦</div>

            {/* Khung chứa ảnh tỉ lệ chuẩn 900x1200 (aspect 3/4) */}
            <div className="w-full aspect-[3/4] rounded-md sm:rounded-lg overflow-hidden relative shadow-[inset_0_2px_10px_rgba(0,0,0,0.25)] bg-stone-200 border border-amber-900/10">
              {/* Ảnh chú rể toàn khung sắc nét */}
              <img
                src="/images/groom.jpg"
                alt="Chú rể"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />

              {/* Lớp phủ gradient chuyển sắc tối nhẹ ở góc dưới để tôn chữ */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

              {/* Text thông tin chú rể ở góc dưới bên trái */}
              <motion.div 
                className="absolute bottom-5 sm:bottom-7 left-5 sm:left-7 z-10 text-white select-none"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.35, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="font-['Alex_Brush',cursive] text-3xl sm:text-4xl lg:text-5xl text-amber-200 mb-0.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  Chú rể
                </p>
                <h3 className="font-['Cinzel',serif] text-xl sm:text-2xl lg:text-3xl font-bold uppercase tracking-[0.14em] text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                  {GROOM.fullName}
                </h3>
                <p className="font-['Cormorant_Garamond',serif] text-sm sm:text-base font-semibold tracking-widest text-white/95 mt-0.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  {GROOM.birthDate || '06.05.1998'}
                </p>
              </motion.div>
            </div>
          </motion.div>

        </div>


        {/* ========================================================
            TRÂN TRỌNG KÍNH MỜI (LẤY TỪ PARAMS name="")
           ======================================================== */}
        <motion.div
          className="w-full max-w-lg sm:max-w-xl mx-auto mb-2 sm:mb-18 px-3 sm:px-6"
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
            <p className="font-['Cormorant_Garamond',serif] italic text-lg sm:text-2xl text-amber-900/90 font-semibold tracking-wide">
              Trân trọng kính mời
            </p>

            {/* Tên khách mời (lấy từ URL param ?name=...) */}
            <h3 className="font-['Alex_Brush',cursive] text-3xl sm:text-4xl lg:text-5xl text-amber-950 my-2 drop-shadow-xs px-2 break-words">
              {guestName || 'Quý khách'}
            </h3>

            {/* Đường phân cách với icon trái tim */}
            <div className="flex items-center justify-center gap-3 my-3">
              <div className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <div className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            </div>

            {/* Lời chúc & lời mời tham dự */}
            <p className="font-['Cormorant_Garamond',serif] text-sm sm:text-base text-amber-900/85 max-w-md mx-auto mb-4 leading-relaxed">
              Tới tham dự lễ thành hôn và chung vui cùng gia đình chúng mình vào
            </p>
                 <div className="mb-6 sm:mb-8 flex flex-col items-center">
            <h3 className="font-['Playfair_Display',serif] text-2xl sm:text-3xl font-bold text-amber-950 tracking-wider">
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
          </div>
        </motion.div>


        {/* ========================================================
            3. PHẦN LỊCH CƯỚI THÁNG 10/2026 (ANIMATION ZOOM TO & LỆCH LÊN)
           ======================================================== */}
        <motion.div
          className="w-full max-w-md sm:max-w-lg mx-auto mb-16 sm:mb-20 px-2 sm:px-6 flex flex-col items-center text-center"
          initial={{ opacity: 0, scale: 0.88, y: 55 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Tiêu đề Tháng và Năm */}
     

          {/* ========================================================
              TIMELINE TRỤC THỜI GIAN NGÀY CƯỚI (25.10.2026)
             ======================================================== */}
          <div className="w-full flex flex-col items-center">
            {/* Header Lịch Trình */}
            <div className="flex flex-col items-center text-center mb-8">
              <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-gradient-to-r from-amber-100/90 via-rose-50/90 to-amber-100/90 border border-amber-300/70 text-amber-900 text-xs font-bold tracking-[0.2em] uppercase font-['Cinzel',serif] shadow-xs mb-2">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>Lịch Trình Hôn Lễ</span>
              </div>
              <p className="font-['Cormorant_Garamond',serif] italic text-xs sm:text-sm text-amber-900/80">
                Chủ Nhật, ngày 25 tháng 10 năm 2026
              </p>
            </div>

            {/* Trục đường thời gian (Timeline Track with Milestones) */}
            <div className="relative w-full pl-6 sm:pl-8 text-left">
              {/* MỐC 1: 10:00 - LỄ VU QUY (NHÀ GÁI) (ANIMATION ZOOM TO & LỆCH LÊN) */}
              <motion.div 
                className="relative mb-8 group"
                initial={{ opacity: 0, scale: 0.9, y: 35 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Đường timeline nối từ tâm Mốc 1 xuống chạm tâm Mốc 2 */}
                <div className="absolute -left-[7px] sm:-left-[9px] top-5 -bottom-14 w-0.5 bg-gradient-to-b from-rose-400 via-amber-400 to-amber-500 rounded-full pointer-events-none z-0" />

                {/* Nút mốc thời gian (Milestone Node 1) */}
                <div className="absolute -left-[24px] sm:-left-[28px] top-1.5 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#FFF5F7] to-[#FED7AA] border-2 border-rose-400 flex items-center justify-center shadow-[0_0_12px_rgba(244,63,94,0.3)] z-10">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  <span className="absolute -inset-1 rounded-full bg-rose-400/20 animate-ping pointer-events-none" />
                </div>

                {/* Thẻ nội dung mốc 1 */}
                <div className="ml-4 sm:ml-5 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#FFFDF9]/95 via-[#FAF6EE]/90 to-[#FFF7ED]/95 border border-amber-300/70 shadow-[0_10px_25px_-5px_rgba(90,60,30,0.12)] relative transition-all group-hover:border-amber-400/90 group-hover:shadow-[0_12px_30px_-5px_rgba(90,60,30,0.18)]">
                  {/* Viền đôi mỏng */}
                  <div className="absolute inset-1.5 rounded-xl border border-amber-200/45 pointer-events-none" />

                  {/* Header: Giờ & Tên Lễ */}
                  <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-rose-100/80 border border-rose-300/70 text-rose-700 font-['Cinzel',serif] text-xs sm:text-sm font-bold shadow-2xs">
                        10:00
                      </span>
                      <span className="text-[11px] font-semibold text-rose-600/90 font-['Cormorant_Garamond',serif] uppercase tracking-wider">
                        Buổi Sáng
                      </span>
                    </div>

                    <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700/85 px-2 py-0.5 rounded-md bg-rose-50/80 border border-rose-200/60 font-['Cinzel',serif]">
                      Nhà Gái
                    </span>
                  </div>

                  <h4 className="font-['Cinzel',serif] text-base sm:text-lg font-bold text-amber-950 tracking-wide uppercase">
                    Lễ Vu Quy
                  </h4>

                  <p className="text-xs sm:text-sm text-amber-900 font-semibold font-['Playfair_Display',serif] mt-0.5">
                    Tư gia Nhà Gái
                  </p>

                  <p className="text-[11px] sm:text-xs text-amber-800/80 font-['Cormorant_Garamond',serif] leading-relaxed mt-1 flex items-start gap-1">
                    <MapPin className="w-3 h-3 text-rose-500 shrink-0 mt-0.5" />
                    <span>{BRIDE_FAMILY.address}</span>
                  </p>
                </div>
              </motion.div>

              {/* MỐC 2: 15:30 - LỄ THÀNH HÔN (NHÀ TRAI) (ANIMATION ZOOM TO & LỆCH LÊN) */}
              <motion.div 
                className="relative group"
                initial={{ opacity: 0, scale: 0.9, y: 35 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Nút mốc thời gian (Milestone Node) */}
                <div className="absolute -left-[24px] sm:-left-[28px] top-1.5 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#FFFBEB] to-[#FEF3C7] border-2 border-amber-500 flex items-center justify-center shadow-[0_0_12px_rgba(217,119,6,0.3)] z-10">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span className="absolute -inset-1 rounded-full bg-amber-400/20 animate-pulse pointer-events-none" />
                </div>

                {/* Thẻ nội dung mốc 2 */}
                <div className="ml-4 sm:ml-5 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#FFFDF9]/95 via-[#FAF6EE]/90 to-[#FFF7ED]/95 border border-amber-300/70 shadow-[0_10px_25px_-5px_rgba(90,60,30,0.12)] relative transition-all group-hover:border-amber-400/90 group-hover:shadow-[0_12px_30px_-5px_rgba(90,60,30,0.18)]">
                  {/* Viền đôi mỏng */}
                  <div className="absolute inset-1.5 rounded-xl border border-amber-200/45 pointer-events-none" />

                  {/* Header: Giờ & Tên Lễ */}
                  <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-100/80 border border-amber-300/70 text-amber-800 font-['Cinzel',serif] text-xs sm:text-sm font-bold shadow-2xs">
                        15:30
                      </span>
                      <span className="text-[11px] font-semibold text-amber-700/90 font-['Cormorant_Garamond',serif] uppercase tracking-wider">
                        Buổi Chiều
                      </span>
                    </div>

                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800/85 px-2 py-0.5 rounded-md bg-amber-50/80 border border-amber-200/60 font-['Cinzel',serif]">
                      Nhà Trai
                    </span>
                  </div>

                  <h4 className="font-['Cinzel',serif] text-base sm:text-lg font-bold text-amber-950 tracking-wide uppercase">
                    Lễ Thành Hôn
                  </h4>

                  <p className="text-xs sm:text-sm text-amber-900 font-semibold font-['Playfair_Display',serif] mt-0.5">
                    Nhà hàng Phượng Ớt
                  </p>

                  <p className="text-[11px] sm:text-xs text-amber-800/80 font-['Cormorant_Garamond',serif] leading-relaxed mt-1 flex items-start gap-1">
                    <MapPin className="w-3 h-3 text-amber-600 shrink-0 mt-0.5" />
                    <span>{WEDDING_INFO.address}</span>
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>


        {/* ========================================================
            4. THÔNG TIN NHÀ TRAI & NHÀ GÁI (GIAO DIỆN TO RÕ TRÊN WEB)
           ======================================================== */}
        <motion.div
          className="w-full max-w-4xl lg:max-w-5xl mb-16 sm:mb-24 flex flex-col items-center px-2 sm:px-4"
          initial={{ opacity: 0, scale: 0.88, y: 55 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Tiêu đề phân đoạn gia đình */}
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="font-['Great_Vibes',cursive] text-4xl sm:text-5xl lg:text-6xl text-amber-950 mb-2 drop-shadow-sm">
              Gia Đình Của Chúng Mình
            </h3>
            <div className="flex items-center justify-center gap-3 mt-1">
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
              <span className="text-amber-500 text-xs">✦ ✦ ✦</span>
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 w-full">
            
            {/* THẺ NHÀ TRAI (ANIMATION ZOOM TO & LỆCH LÊN - KÍCH THƯỚC TO NỔI BẬT) */}
            <motion.div 
              className="relative rounded-2xl sm:rounded-3xl bg-[#fffdf9]/95 p-6 sm:p-8 lg:p-10 border-2 border-amber-300/70 shadow-[0_16px_36px_-10px_rgba(90,60,30,0.14),0_0_20px_rgba(212,175,55,0.1)] flex flex-col justify-between text-center group"
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Viền đôi mỏng hoàng gia */}
              <div className="absolute inset-2 sm:inset-3 rounded-xl sm:rounded-2xl border border-amber-200/50 pointer-events-none" />
              
              {/* 4 Họa tiết góc mạ vàng hoàng gia */}
              <div className="absolute top-2.5 left-2.5 text-amber-600/70 text-[10px] sm:text-xs pointer-events-none select-none">✦</div>
              <div className="absolute top-2.5 right-2.5 text-amber-600/70 text-[10px] sm:text-xs pointer-events-none select-none">✦</div>
              <div className="absolute bottom-2.5 left-2.5 text-amber-600/70 text-[10px] sm:text-xs pointer-events-none select-none">✦</div>
              <div className="absolute bottom-2.5 right-2.5 text-amber-600/70 text-[10px] sm:text-xs pointer-events-none select-none">✦</div>

              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1 sm:px-5 sm:py-1.5 rounded-full bg-amber-100/80 border border-amber-300/60 text-amber-900 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase font-['Cinzel',serif] mb-5 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>{GROOM_FAMILY.title}</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                </div>

                <div className="space-y-1.5 mb-5 font-['Playfair_Display',serif]">
                  <p className="text-sm sm:text-base lg:text-lg text-amber-950 font-medium">
                    <span className="text-amber-800/80 text-xs sm:text-sm font-['Cinzel',serif] uppercase font-semibold mr-1.5">Ông:</span>
                    <span className="font-bold text-amber-950">{GROOM_FAMILY.father}</span>
                  </p>
                  <p className="text-sm sm:text-base lg:text-lg text-amber-950 font-medium">
                    <span className="text-amber-800/80 text-xs sm:text-sm font-['Cinzel',serif] uppercase font-semibold mr-1.5">Bà:</span>
                    <span className="font-bold text-amber-950">{GROOM_FAMILY.mother}</span>
                  </p>
                </div>

                <div className="h-px w-16 bg-amber-300/70 mx-auto my-4" />

                <p className="text-xs sm:text-sm text-amber-800 tracking-[0.2em] font-bold font-['Cinzel',serif] uppercase mb-1">
                  Chú Rể
                </p>
                <h4 className="font-['Alex_Brush',cursive] text-4xl sm:text-5xl lg:text-6xl text-amber-950 mb-4 drop-shadow-xs">
                  {GROOM.fullName}
                </h4>
              </div>

              {/* Địa chỉ & Link Google Maps */}
              <div className="pt-4 border-t border-amber-200/60 flex flex-col items-center gap-3">
                <p className="text-xs sm:text-sm lg:text-base text-amber-900/90 font-['Cormorant_Garamond',serif] leading-relaxed max-w-sm">
                  {GROOM_FAMILY.address}
                </p>

                <a
                  href={GROOM_FAMILY.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-amber-100/90 hover:bg-amber-200 text-amber-950 text-xs sm:text-sm font-semibold border border-amber-300/70 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span>Xem trên Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-amber-700 opacity-80" />
                </a>
              </div>
            </motion.div>


            {/* THẺ NHÀ GÁI (ANIMATION ZOOM TO & LỆCH LÊN - KÍCH THƯỚC TO NỔI BẬT) */}
            <motion.div 
              className="relative rounded-2xl sm:rounded-3xl bg-[#fffdf9]/95 p-6 sm:p-8 lg:p-10 border-2 border-amber-300/70 shadow-[0_16px_36px_-10px_rgba(90,60,30,0.14),0_0_20px_rgba(212,175,55,0.1)] flex flex-col justify-between text-center group"
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Viền đôi mỏng hoàng gia */}
              <div className="absolute inset-2 sm:inset-3 rounded-xl sm:rounded-2xl border border-amber-200/50 pointer-events-none" />
              
              {/* 4 Họa tiết góc mạ vàng hoàng gia */}
              <div className="absolute top-2.5 left-2.5 text-amber-600/70 text-[10px] sm:text-xs pointer-events-none select-none">✦</div>
              <div className="absolute top-2.5 right-2.5 text-amber-600/70 text-[10px] sm:text-xs pointer-events-none select-none">✦</div>
              <div className="absolute bottom-2.5 left-2.5 text-amber-600/70 text-[10px] sm:text-xs pointer-events-none select-none">✦</div>
              <div className="absolute bottom-2.5 right-2.5 text-amber-600/70 text-[10px] sm:text-xs pointer-events-none select-none">✦</div>

              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1 sm:px-5 sm:py-1.5 rounded-full bg-amber-100/80 border border-amber-300/60 text-amber-900 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase font-['Cinzel',serif] mb-5 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>{BRIDE_FAMILY.title}</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                </div>

                <div className="space-y-1.5 mb-5 font-['Playfair_Display',serif]">
                  <p className="text-sm sm:text-base lg:text-lg text-amber-950 font-medium">
                    <span className="text-amber-800/80 text-xs sm:text-sm font-['Cinzel',serif] uppercase font-semibold mr-1.5">Ông:</span>
                    <span className="font-bold text-amber-950">{BRIDE_FAMILY.father}</span>
                  </p>
                  <p className="text-sm sm:text-base lg:text-lg text-amber-950 font-medium">
                    <span className="text-amber-800/80 text-xs sm:text-sm font-['Cinzel',serif] uppercase font-semibold mr-1.5">Bà:</span>
                    <span className="font-bold text-amber-950">{BRIDE_FAMILY.mother}</span>
                  </p>
                </div>

                <div className="h-px w-16 bg-amber-300/70 mx-auto my-4" />

                <p className="text-xs sm:text-sm text-amber-800 tracking-[0.2em] font-bold font-['Cinzel',serif] uppercase mb-1">
                  Cô Dâu
                </p>
                <h4 className="font-['Alex_Brush',cursive] text-4xl sm:text-5xl lg:text-6xl text-amber-950 mb-4 drop-shadow-xs">
                  {BRIDE.fullName}
                </h4>
              </div>

              {/* Địa chỉ & Link Google Maps */}
              <div className="pt-4 border-t border-amber-200/60 flex flex-col items-center gap-3">
                <p className="text-xs sm:text-sm lg:text-base text-amber-900/90 font-['Cormorant_Garamond',serif] leading-relaxed max-w-sm">
                  {BRIDE_FAMILY.address}
                </p>

                <a
                  href={BRIDE_FAMILY.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-amber-100/90 hover:bg-amber-200 text-amber-950 text-xs sm:text-sm font-semibold border border-amber-300/70 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span>Xem trên Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-amber-700 opacity-80" />
                </a>
              </div>
            </motion.div>

          </div>
        </motion.div>


        {/* ========================================================
            5. NÚT PHONG CÁCH GAME TIẾP TỤC VÀO GAME PIXEL (CHỈ DESKTOP)
           ======================================================== */}
        <motion.div
          className="hidden md:flex mt-6 sm:mt-8 z-10 flex-col items-center"
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
