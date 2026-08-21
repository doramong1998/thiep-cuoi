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
            {/* Image placeholder */}
            <div className="h-32 sm:h-40 bg-gradient-to-br from-pink-100 to-amber-100 flex items-center justify-center relative">
              <span className="text-5xl">{milestone.icon}</span>
              {/* Date badge */}
              <div className="absolute bottom-2 left-3 px-2 py-0.5 bg-amber-900/80 text-amber-50 text-[10px] font-mono rounded">
                {milestone.date}
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
