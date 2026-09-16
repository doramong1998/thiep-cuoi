import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { MILESTONES } from '@/data/wedding';

export function MobileJourney() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const milestoneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isFirstMount = useRef(true);

  const activeMilestone = MILESTONES[activeIndex];

  // Chỉ cuộn ngang NỘI BỘ container khi người dùng đổi activeIndex, tuyệt đối không làm trôi scroll của toàn trang web
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    const container = scrollContainerRef.current;
    const activeEl = milestoneRefs.current[activeIndex];
    if (container && activeEl) {
      const containerWidth = container.offsetWidth;
      const cardLeft = activeEl.offsetLeft;
      const cardWidth = activeEl.offsetWidth;
      const targetScrollLeft = cardLeft - (containerWidth / 2) + (cardWidth / 2);

      container.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth',
      });
    }
  }, [activeIndex]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : MILESTONES.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < MILESTONES.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="relative w-full py-10 px-3 sm:px-6 bg-transparent overflow-hidden select-none">
      <div className="max-w-md mx-auto relative z-10 flex flex-col items-center">
        {/* Tiêu đề trên cùng */}
        <div className="text-center mb-6 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-px w-6 bg-gradient-to-r from-transparent to-[#9A6B2F]" />
            <span className="text-[#8B2635] text-xs sm:text-sm font-bold tracking-[0.25em] uppercase font-['Cinzel',serif]">
              CHỌN MỘT DẤU MỐC
            </span>
            <div className="h-px w-6 bg-gradient-to-l from-transparent to-[#9A6B2F]" />
          </div>
          <div className="h-0.5 w-10 bg-[#B8860B]/50 rounded-full mt-0.5" />
        </div>

        {/* ========================================================
            1. KHUNG ẢNH DẤU MỐC NGHỆ THUẬT (PHOTO CARD)
           ======================================================== */}
        <motion.div 
          className="w-full max-w-[320px] sm:max-w-[350px] mb-6 relative"
          initial={{ opacity: 0, scale: 0.88, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Lớp nền thẻ giấy xếp lớp phía sau */}
          <div className="absolute -inset-1.5 rounded-2xl bg-[#F5EBE1] border border-[#E2D4C3] rotate-1 shadow-sm pointer-events-none" />
          <div className="absolute -inset-1 rounded-2xl bg-[#FAF5EE] border border-[#EAE0D2] -rotate-1 shadow-sm pointer-events-none" />

          {/* Thẻ chính hiển thị ảnh */}
          <div className="relative rounded-2xl bg-white p-3 sm:p-3.5 border border-[#E5D7C3] shadow-[0_15px_35px_rgba(100,60,30,0.12)] overflow-hidden mt-2" >
            {/* Tag Chương ở góc trên bên trái */}
            <div className="absolute top-0 left-4 z-20">
              <div className="px-3 py-0.5 bg-[#6E1C24] text-white text-[10px] font-bold tracking-widest font-['Cinzel',serif] rounded-b-md shadow-md uppercase">
                {activeMilestone.chapter}
              </div>
            </div>

            {/* Khung ảnh chính */}
            <div className="relative aspect-[3/3.8] rounded-xl overflow-hidden bg-gradient-to-br from-[#FAF0E6] via-[#FDF5E6] to-[#F5E6D3] border border-[#E8DAC8] shadow-inner mt-3.5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMilestone.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="w-full h-full relative"
                >
                  {/* Ảnh dấu mốc */}
                  <img
                    src={activeMilestone.image}
                    alt={activeMilestone.title}
                    className="w-full h-full object-cover object-top"
                    loading="eager"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      if (target.parentElement) {
                        target.parentElement.classList.add('flex', 'items-center', 'justify-center');
                        const fallback = document.createElement('span');
                        fallback.textContent = activeMilestone.icon;
                        fallback.className = 'text-5xl';
                        target.parentElement.appendChild(fallback);
                      }
                    }}
                  />

                  {/* Lớp phủ chuyển sắc tối nhẹ */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent pointer-events-none" />

                  {/* Watermark số chương lớn nghệ thuật ở góc dưới phải */}
                  <div className="absolute bottom-1.5 right-2.5 font-serif font-bold text-6xl sm:text-7xl text-white/40 select-none pointer-events-none drop-shadow-sm">
                    {String(activeIndex + 1).padStart(2, '0')}
                  </div>


                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dòng chú thích dưới ảnh: Năm ✦ Tiêu đề */}
            <div className="pt-2.5 pb-0.5 px-1 flex items-center justify-start gap-1.5 text-[#5C3A1E]">
              <span className="font-['Cinzel',serif] text-xs sm:text-sm font-bold text-[#8B2635]">
                {activeMilestone.year}
              </span>
              <span className="text-[#8B2635] text-xs">✦</span>
              <span className="font-['Playfair_Display',serif] text-xs sm:text-sm font-semibold text-[#4A2E16] truncate">
                {activeMilestone.title}
              </span>
            </div>
          </div>

          {/* Thanh điều hướng trang (Pagination Bar) bên dưới ảnh */}
          <div className="mt-3.5 flex items-center justify-between px-1">
            {/* Nút Prev */}
            <button
              onClick={handlePrev}
              aria-label="Dấu mốc trước"
              className="w-8 h-8 rounded-full bg-white border border-[#D4AF37]/60 shadow-xs flex items-center justify-center text-[#6E1C24] hover:bg-rose-50 active:scale-95 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>

            {/* Thanh tiến trình (Progress Bar) */}
            <div className="flex-1 mx-3.5 h-1 bg-[#EAE0D2] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#6E1C24]"
                initial={false}
                animate={{
                  width: `${((activeIndex + 1) / MILESTONES.length) * 100}%`,
                }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              />
            </div>

            {/* Số trang 03 / 04 */}
            <div className="font-['Cinzel',serif] text-xs font-bold text-[#6E1C24] tracking-wider mr-2">
              {String(activeIndex + 1).padStart(2, '0')} / {String(MILESTONES.length).padStart(2, '0')}
            </div>

            {/* Nút Next */}
            <button
              onClick={handleNext}
              aria-label="Dấu mốc tiếp theo"
              className="w-8 h-8 rounded-full bg-white border border-[#D4AF37]/60 shadow-xs flex items-center justify-center text-[#6E1C24] hover:bg-rose-50 active:scale-95 transition-all cursor-pointer"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

        {/* ========================================================
            2. TRỤC DẤU MỐC SỐ & DANH SÁCH THẺ CUỘN NGANG
           ======================================================== */}
        <motion.div 
          className="w-full flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
        {/* ========================================================
            3. DANH SÁCH THẺ DẤU MỐC CUỘN NGANG (HORIZONTAL SCROLL TIMELINE)
           ======================================================== */}
        <div
          ref={scrollContainerRef}
          className="w-full overflow-x-auto flex gap-3 py-2 px-1 snap-x snap-mandatory scroll-smooth no-scrollbar"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {MILESTONES.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={item.id}
                ref={(el) => {
                  milestoneRefs.current[index] = el;
                }}
                onClick={() => setActiveIndex(index)}
                className={`w-[260px] sm:w-[280px] shrink-0 snap-center rounded-xl p-4 transition-all duration-300 cursor-pointer text-left flex flex-col justify-between ${
                  isActive
                    ? 'bg-white border-2 border-[#8B2635] shadow-[0_10px_25px_rgba(110,28,36,0.12)] scale-[1.01]'
                    : 'bg-white/80 border border-[#E5D7C3] hover:bg-white shadow-xs'
                }`}
              >
                <div>
                  {/* Header thẻ: Số mốc & Năm */}
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`font-['Cinzel',serif] text-xs font-bold tracking-wider ${
                        isActive ? 'text-[#8B2635]' : 'text-[#8B2635]/80'
                      }`}
                    >
                      {item.year}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-['Cinzel',serif] ${
                        isActive
                          ? 'bg-[#6E1C24] text-white'
                          : 'bg-[#FAF0E6] text-[#78350F] border border-[#E8DAC8]'
                      }`}
                    >
                      {item.chapter}
                    </span>
                  </div>

                  {/* Tiêu đề */}
                  <h3
                    className={`font-['Playfair_Display',serif] text-base font-bold leading-snug transition-colors ${
                      isActive ? 'text-[#3E2410]' : 'text-[#5C3A1E]'
                    }`}
                  >
                    {item.title}
                  </h3>

                  {/* Mô tả ngắn */}
                  <p className="font-['Cormorant_Garamond',serif] text-xs text-stone-600 leading-relaxed mt-1 line-clamp-5">
                    {item.description}
                  </p>
                </div>

                {/* Dấu chỉ thị đang xem */}
                {isActive && (
                  <div className="mt-2.5 pt-1.5 border-t border-rose-100 flex items-center gap-1 text-[11px] font-semibold text-[#8B2635] font-['Cormorant_Garamond',serif]">
                    <Sparkles className="w-3 h-3 text-[#8B2635]" />
                    <span>Đang xem dấu mốc này</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        </motion.div>
      </div>
    </section>
  );
}
