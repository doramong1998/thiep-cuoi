import { motion, AnimatePresence } from 'framer-motion';
import type { Milestone } from '@/types';

interface MilestoneCardProps {
  milestone: Milestone | null;
}

export function MilestoneCard({ milestone }: MilestoneCardProps) {
  return (
    <AnimatePresence>
      {milestone && (
        <motion.div
          key={milestone.id}
          className="fixed top-8 right-4 sm:right-8 z-30 max-w-sm w-[calc(100vw-2rem)] sm:w-96"
          initial={{ opacity: 0, x: 60, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 60, scale: 0.9 }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        >
          <div className="bg-amber-50/95 backdrop-blur-md rounded-xl border-2 border-amber-200 shadow-xl shadow-amber-900/10 overflow-hidden">
            {/* Milestone image */}
            <div className="h-80 sm:h-80 relative overflow-hidden">
              <img
                src={milestone.image}
                alt={milestone.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              {/* Date badge */}
              <div className="absolute bottom-2 left-3 px-2 py-0.5 bg-amber-900/80 text-amber-50 text-[10px] font-mono rounded">
                {milestone.date}
              </div>
              {/* Chapter badge */}
              <div className="absolute top-2 right-3 px-2 py-0.5 bg-white/90 text-amber-900 text-[10px] font-bold font-mono rounded">
                {milestone.chapter}
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-5">
              <h3 className="font-['Playfair_Display',serif] text-lg sm:text-xl font-bold text-amber-900 mb-2">
                {milestone.title}
              </h3>
              <p className="font-['Cormorant_Garamond',serif] text-sm sm:text-base text-amber-800/80 leading-relaxed">
                {milestone.description}
              </p>
            </div>

            {/* Pixel border accent */}
            <div className="h-1 bg-gradient-to-r from-pink-300 via-amber-300 to-pink-300" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
