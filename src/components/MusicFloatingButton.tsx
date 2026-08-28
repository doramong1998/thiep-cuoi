import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VolumeX } from 'lucide-react';

interface FloatingNote {
  id: number;
  symbol: string;
  xOffset: number;
}

export function MusicFloatingButton() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [floatingNotes, setFloatingNotes] = useState<FloatingNote[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const manualStopRef = useRef(false);

  // Tự động phát nhạc khi vào trang & xử lý chính sách Autoplay của trình duyệt
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.6;

    // Cố gắng phát nhạc ngay khi load trang
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Trình duyệt chặn autoplay chưa có tương tác -> Lắng nghe cử chỉ đầu tiên của người dùng
          const handleFirstInteraction = () => {
            if (manualStopRef.current) return;
            audio
              .play()
              .then(() => {
                setIsPlaying(true);
              })
              .catch((e) => {
                console.warn('Autoplay sau tương tác không thành công:', e);
              });
            removeInteractionListeners();
          };

          const removeInteractionListeners = () => {
            window.removeEventListener('click', handleFirstInteraction);
            window.removeEventListener('touchstart', handleFirstInteraction);
            window.removeEventListener('scroll', handleFirstInteraction);
            window.removeEventListener('keydown', handleFirstInteraction);
          };

          window.addEventListener('click', handleFirstInteraction, { once: true });
          window.addEventListener('touchstart', handleFirstInteraction, { once: true });
          window.addEventListener('scroll', handleFirstInteraction, { once: true });
          window.addEventListener('keydown', handleFirstInteraction, { once: true });
        });
    }

    return () => {
      audio.pause();
    };
  }, []);

  // Hiệu ứng nốt nhạc bay lên khi đang quay đĩa CD phát nhạc
  useEffect(() => {
    if (!isPlaying) {
      setFloatingNotes([]);
      return;
    }

    const symbols = ['♪', '♫', '♩', '♬'];
    const interval = setInterval(() => {
      const newNote: FloatingNote = {
        id: Date.now() + Math.random(),
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        xOffset: (Math.random() - 0.5) * 44,
      };

      setFloatingNotes((prev) => [...prev.slice(-4), newNote]);
    }, 1500);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Xử lý bật / tắt âm thanh khi bấm vào đĩa CD
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      manualStopRef.current = true;
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          manualStopRef.current = false;
        })
        .catch((err) => {
          console.error('Không thể phát nhạc:', err);
        });
    }
  };

  return (
    <>
      {/* Audio element phát nhạc nền lặp lại */}
      <audio
        ref={audioRef}
        src="/sounds/nhac.mp3"
        loop
        preload="auto"
      />

      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 select-none">
        {/* Nốt nhạc bay lơ lửng khi đĩa CD đang quay */}
        <div className="absolute inset-0 pointer-events-none overflow-visible">
          <AnimatePresence>
            {floatingNotes.map((note) => (
              <motion.span
                key={note.id}
                initial={{ opacity: 0, y: 0, x: note.xOffset, scale: 0.5 }}
                animate={{
                  opacity: [0, 0.95, 0.85, 0],
                  y: -70,
                  x: note.xOffset + Math.sin(note.id) * 22,
                  scale: [0.5, 1.25, 1],
                  rotate: [0, note.xOffset > 0 ? 30 : -30],
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.3, ease: 'easeOut' }}
                className="absolute left-1/2 top-0 text-amber-500 font-serif font-bold text-sm sm:text-base pointer-events-none drop-shadow-[0_2px_6px_rgba(212,175,55,0.6)]"
              >
                {note.symbol}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>

        {/* Nút bấm đĩa CD / Vinyl Record */}
        <motion.button
          onClick={togglePlay}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          aria-label={isPlaying ? 'Tắt nhạc nền' : 'Bật nhạc nền'}
          className="relative group flex items-center justify-center cursor-pointer"
        >
          {/* Hiệu ứng sóng lan tỏa hoàng kim khi đang phát nhạc */}
          {isPlaying && (
            <>
              {/* <span className="absolute -inset-2 rounded-full bg-[#D4AF37]/25 animate-ping opacity-50 pointer-events-none" /> */}
              <span className="absolute -inset-3.5 rounded-full bg-[#D4AF37]/15 animate-pulse pointer-events-none" />
            </>
          )}

          {/* Viền ngoài đĩa CD kim loại mạ vàng */}
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-[0_8px_25px_rgba(0,0,0,0.3),0_0_15px_rgba(212,175,55,0.35)] p-0.5 bg-gradient-to-tr from-[#292524] via-[#1C1917] to-[#44403C] border-2 border-[#D4AF37]/90">
            {/* Đĩa than / CD xoay tròn */}
            <motion.div
              animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
              transition={
                isPlaying
                  ? { duration: 4, repeat: Infinity, ease: 'linear' }
                  : { duration: 0.5, ease: 'easeOut' }
              }
              className="relative w-full h-full rounded-full flex items-center justify-center overflow-hidden"
              style={{
                background: isPlaying
                  ? 'conic-gradient(from 0deg, #181512 0deg, #3d2f1d 45deg, #825f30 90deg, #241c15 135deg, #4d3e2b 180deg, #8a6838 225deg, #181512 270deg, #3d2f20 315deg, #181512 360deg)'
                  : 'conic-gradient(from 0deg, #292524, #1c1917, #3d3835, #1c1917, #292524)',
              }}
            >
              {/* Các rãnh đĩa than (Grooves) */}
              <div className="absolute inset-1 rounded-full border border-amber-200/15 pointer-events-none" />
              <div className="absolute inset-2.5 rounded-full border border-dashed border-amber-300/20 pointer-events-none" />
              <div className="absolute inset-4 rounded-full border border-amber-100/15 pointer-events-none" />

              {/* Vệt sáng lấp lánh trên mặt đĩa CD (Specular sheen) */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none opacity-45"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(255,255,255,0.45) 0%, transparent 40%, rgba(255,235,180,0.35) 60%, transparent 100%)',
                }}
              />

              {/* Nhãn đĩa ở tâm (Center Label) */}
              <div className="relative z-10 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-[#FFF9F2] via-[#FAF0DC] to-[#F5DFBA] border border-[#D4AF37] flex items-center justify-center shadow-inner">
                {/* Lỗ tâm đĩa CD (Spindle Hole) */}
                <div className="w-2.5 h-2.5 rounded-full bg-[#1C1917] border border-[#D4AF37] flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-[#D4AF37]" />
                </div>
              </div>
            </motion.div>

            {/* Cần kim đĩa than (Tonearm / Stylus) */}
            <motion.div
              initial={false}
              animate={
                isPlaying
                  ? { rotate: 24, x: 0, y: 0 }
                  : { rotate: -15, x: 3, y: -3 }
              }
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              className="absolute -top-1.5 -right-1.5 z-20 origin-top-right pointer-events-none"
            >
              <div className="relative flex flex-col items-center">
                {/* Trục đỡ cần kim gạt */}
                <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-b from-[#FAF0DC] to-[#B8860B] border border-[#D4AF37] shadow-sm flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#5A3A1A]" />
                </div>
                {/* Thanh kim mạ vàng */}
                <div className="w-0.5 h-6 bg-gradient-to-b from-[#D4AF37] via-[#FFF8DC] to-[#9A6B2F] shadow-[0_1px_3px_rgba(0,0,0,0.5)] -mt-0.5" />
                {/* Đầu kim đọc đĩa */}
                <div className="w-2 h-2.5 bg-[#451A03] border border-[#D4AF37] rounded-[1px] shadow-sm" />
              </div>
            </motion.div>

            {/* Lớp phủ & icon TẮT khi tạm dừng */}
            {!isPlaying && (
              <div className="absolute inset-0 rounded-full bg-black/45 backdrop-blur-[1px] flex items-center justify-center z-30">
                <VolumeX className="w-5 h-5 text-amber-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]" />
              </div>
            )}
          </div>
        </motion.button>

        {/* Tooltip hiển thị trạng thái khi hover trên Desktop */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className="hidden sm:block absolute right-full mr-3 px-3.5 py-1.5 rounded-full bg-[#2C1A0E]/90 border border-[#D4AF37]/40 backdrop-blur-sm text-[#FDE68A] text-xs font-serif tracking-wide shadow-xl whitespace-nowrap pointer-events-none"
            >
              {isPlaying ? 'Tắt nhạc' : 'Bật nhạc'}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
