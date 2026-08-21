import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GALLERY_IMAGES } from '@/data/wedding';

export function GalleryScene() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState(0);

  const close = useCallback(() => {
    setSelectedIndex(null);
    document.body.style.overflow = '';
  }, []);

  const open = useCallback((i: number) => {
    setSelectedIndex(i);
    document.body.style.overflow = 'hidden';
  }, []);

  const next = useCallback(() => setSelectedIndex(p => p !== null ? (p + 1) % GALLERY_IMAGES.length : null), []);
  const prev = useCallback(() => setSelectedIndex(p => p !== null ? (p - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length : null), []);

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-amber-50/20 via-rose-50/15 to-amber-50/25 px-4">
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-['Alex_Brush',cursive] text-4xl sm:text-6xl text-amber-950 drop-shadow-sm font-normal">
          Album Ảnh Cưới Của Chúng Mình
        </h2>
        <p className="font-['Cormorant_Garamond',serif] italic text-sm sm:text-base text-amber-800/80 mt-1">
          Những khoảnh khắc ngọt ngào được lưu giữ
        </p>
        <div className="flex items-center justify-center gap-2 mt-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          <span className="text-amber-500 text-xs">✦ ✦ ✦</span>
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        </div>
      </motion.div>

      {/* Masonry Grid */}
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 max-w-5xl mx-auto">
        {GALLERY_IMAGES.map((img, i) => (
          <motion.button
            key={img.id}
            className={`w-full ${img.aspectClass} rounded-lg overflow-hidden cursor-pointer group relative block mb-3 border-2 border-amber-100 hover:border-amber-300 transition-colors`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            onClick={() => open(i)}
          >
            <div className={`w-full h-full bg-gradient-to-br ${img.bgGradient} transition-transform duration-300 group-hover:scale-110 flex items-center justify-center`}>
              <span className="text-3xl opacity-20">📷</span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-amber-950/90 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            onKeyDown={(e) => { if (e.key === 'Escape') close(); if (e.key === 'ArrowRight') next(); if (e.key === 'ArrowLeft') prev(); }}
            tabIndex={0}
            role="dialog"
          >
            <button className="absolute top-4 right-4 w-10 h-10 text-white/80 hover:text-white text-2xl cursor-pointer z-10" onClick={close}>✕</button>
            <button className="absolute left-4 w-10 h-10 text-white/80 hover:text-white text-2xl cursor-pointer z-10" onClick={(e) => { e.stopPropagation(); prev(); }}>‹</button>
            <button className="absolute right-4 w-10 h-10 text-white/80 hover:text-white text-2xl cursor-pointer z-10" onClick={(e) => { e.stopPropagation(); next(); }}>›</button>

            <motion.div
              key={selectedIndex}
              className="max-w-3xl w-full mx-4 aspect-[4/3] rounded-xl overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
              onTouchEnd={(e) => {
                const diff = touchStart - e.changedTouches[0].clientX;
                if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
              }}
            >
              <div className={`w-full h-full bg-gradient-to-br ${GALLERY_IMAGES[selectedIndex].bgGradient} flex items-center justify-center`}>
                <span className="text-6xl opacity-30">📷</span>
              </div>
            </motion.div>

            <p className="absolute bottom-4 text-white/50 font-mono text-xs">
              {selectedIndex + 1} / {GALLERY_IMAGES.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
