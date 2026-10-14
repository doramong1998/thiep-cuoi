import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { MILESTONES } from '@/data/wedding';

export function MobileJourney() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeMilestone = MILESTONES[activeIndex];

  // Tự động chuyển ảnh tiếp theo sau mỗi 6 giây (tự reset thời gian 6s khi người dùng tự bấm chuyển)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev < MILESTONES.length - 1 ? prev + 1 : 0));
    }, 6000);

    return () => clearInterval(timer);
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
         
             <h2 className="font-['1FTV-Carlytte',sans-serif] text-5xl sm:text-7xl text-amber-950 drop-shadow-sm font-normal">
          Hành Trình Gắn Bó
        </h2>
          </div>
          <div className="h-0.5 w-10 bg-[#B8860B]/50 rounded-full mt-0.5" />
        </div>

        {/* ========================================================
            1. KHUNG ẢNH DẤU MỐC NGHỆ THUẬT (PHOTO CARD)
           ======================================================== */}
        <motion.div 
          className="w-full max-w-[350px] mb-6 relative"
          initial={{ opacity: 0, scale: 0.88, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Khung thẻ ảnh kèm hiệu ứng giấy xếp lớp */}
          <div className="relative">
            {/* Lớp nền thẻ giấy xếp lớp phía sau */}
            <div className="absolute -inset-1.5 rounded-2xl bg-[#F5EBE1] border border-[#E2D4C3] rotate-1 shadow-sm pointer-events-none" />
            <div className="absolute -inset-1 rounded-2xl bg-[#FAF5EE] border border-[#EAE0D2] -rotate-1 shadow-sm pointer-events-none" />

            {/* Thẻ chính hiển thị ảnh */}
            <div className="relative rounded-2xl bg-white p-3 sm:p-3.5 border border-[#E5D7C3] shadow-[0_15px_35px_rgba(100,60,30,0.12)] overflow-hidden mt-2" >
              {/* Khung ảnh chính */}
              <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-gradient-to-br from-[#FAF0E6] via-[#FDF5E6] to-[#F5E6D3] border border-[#E8DAC8] shadow-inner">
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
                    {/* <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent pointer-events-none" /> */}

                    {/* Watermark số chương lớn nghệ thuật ở góc dưới phải */}
                    {/* <div className="absolute bottom-1.5 right-2.5 font-serif font-bold text-6xl sm:text-7xl text-white/40 select-none pointer-events-none drop-shadow-sm">
                      {String(activeIndex + 1).padStart(2, '0')}
                    </div> */}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Dòng chú thích dưới ảnh: Năm ✦ Tiêu đề */}
              <div className="pt-2.5 pb-0.5 px-1 flex items-center justify-start gap-1.5 text-[#5C3A1E]">
                <span className="font-['1FTV-Carlytte',sans-serif] text-3xl sm:text-4xl font-bold text-[#8B2635]">
                  {activeMilestone.year}
                </span>
                <span className="text-[#8B2635] text-xs">✦</span>
                <span className="font-['1FTV-Carlytte',sans-serif] text-2xl sm:text-4xl font-bold text-[#8B2635] truncate">
                  {activeMilestone.title}
                </span>
              </div>
            </div>
          </div>

          {/* Thanh điều hướng trang (Pagination Bar) bên dưới ảnh */}
          <div className="relative z-10 mt-4 flex items-center justify-between px-1">
            {/* Nút Prev */}
            <button
              onClick={handlePrev}
              aria-label="Dấu mốc trước"
              className="w-10 h-10 rounded-full bg-white border border-[#D4AF37]/60 shadow-xs flex items-center justify-center text-[#6E1C24] hover:bg-rose-50 active:scale-95 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
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
            <div className="font-['1FTV-Carlytte',sans-serif] text-2xl font-bold text-[#6E1C24] tracking-wider mr-2">
              {String(activeIndex + 1).padStart(2, '0')} / {String(MILESTONES.length).padStart(2, '0')}
            </div>

            {/* Nút Next */}
            <button
              onClick={handleNext}
              aria-label="Dấu mốc tiếp theo"
              className="w-10 h-10 rounded-full bg-white border border-[#D4AF37]/60 shadow-xs flex items-center justify-center text-[#6E1C24] hover:bg-rose-50 active:scale-95 transition-all cursor-pointer"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* ========================================================
            2. TRỤC DẤU MỐC SỐ & DANH SÁCH THẺ CUỘN NGANG
           ======================================================== */}
  
      </div>
    </section>
  );
}
