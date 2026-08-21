import { motion } from 'framer-motion';

// ==========================================
// 1. CÁNH HOA DẠI BAY (PETALS)
// ==========================================
const PETALS = [
  { id: 1, left: '4%', size: 14, color: '#FFB7C5', duration: 11, delay: 0, xOffset: 35, rotateDir: 1 },
  { id: 2, left: '11%', size: 12, color: '#FFFFFF', duration: 14, delay: 2.5, xOffset: -40, rotateDir: -1 },
  { id: 3, left: '19%', size: 16, color: '#FDE047', duration: 12, delay: 1.2, xOffset: 45, rotateDir: 1 },
  { id: 4, left: '27%', size: 13, color: '#E9D5FF', duration: 15, delay: 4.0, xOffset: -30, rotateDir: -1 },
  { id: 5, left: '36%', size: 15, color: '#FECDD3', duration: 13, delay: 0.8, xOffset: 50, rotateDir: 1 },
  { id: 6, left: '45%', size: 11, color: '#FFB6C1', duration: 16, delay: 3.2, xOffset: -35, rotateDir: -1 },
  { id: 7, left: '53%', size: 14, color: '#FFFFFF', duration: 12.5, delay: 1.7, xOffset: 40, rotateDir: 1 },
  { id: 8, left: '62%', size: 15, color: '#FBBF24', duration: 14.5, delay: 5.1, xOffset: -45, rotateDir: -1 },
  { id: 9, left: '71%', size: 13, color: '#DDD6FE', duration: 11.5, delay: 2.1, xOffset: 30, rotateDir: 1 },
  { id: 10, left: '79%', size: 16, color: '#FDA4AF', duration: 13.5, delay: 0.3, xOffset: -50, rotateDir: -1 },
  { id: 11, left: '87%', size: 12, color: '#FFFFFF', duration: 15.5, delay: 3.8, xOffset: 35, rotateDir: 1 },
  { id: 12, left: '94%', size: 14, color: '#FFD1DC', duration: 12.0, delay: 1.5, xOffset: -40, rotateDir: -1 },
  { id: 13, left: '15%', size: 15, color: '#FDE68A', duration: 14.0, delay: 6.2, xOffset: 40, rotateDir: 1 },
  { id: 14, left: '67%', size: 13, color: '#F472B6', duration: 13.0, delay: 4.8, xOffset: -35, rotateDir: -1 },
];

// ==========================================
// 2. LÁ CÂY THẢO NGUYÊN BAY (LEAVES)
// ==========================================
const LEAVES = [
  { id: 1, left: '7%', size: 18, color: '#86EFAC', duration: 13, delay: 1.0, xOffset: 55 },
  { id: 2, left: '23%', size: 15, color: '#4ADE80', duration: 16, delay: 4.2, xOffset: -45 },
  { id: 3, left: '39%', size: 20, color: '#A7F3D0', duration: 14, delay: 2.8, xOffset: 60 },
  { id: 4, left: '57%', size: 16, color: '#A3E635', duration: 17, delay: 0.5, xOffset: -50 },
  { id: 5, left: '72%', size: 17, color: '#86EFAC', duration: 15, delay: 3.5, xOffset: 50 },
  { id: 6, left: '86%', size: 19, color: '#6EE7B7', duration: 13.5, delay: 5.5, xOffset: -55 },
  { id: 7, left: '31%', size: 16, color: '#4ADE80', duration: 18, delay: 2.0, xOffset: 45 },
  { id: 8, left: '80%', size: 15, color: '#A7F3D0', duration: 14.5, delay: 6.0, xOffset: -40 },
];

// ==========================================
// 3. HOA BỒ CÔNG ANH BAY THEO GIÓ (DANDELION SEEDS)
// ==========================================
const DANDELIONS = [
  { id: 1, left: '6%', size: 26, duration: 16, delay: 0.5, xOffset: 65, rotate: 25 },
  { id: 2, left: '14%', size: 22, duration: 20, delay: 4.2, xOffset: -45, rotate: -20 },
  { id: 3, left: '22%', size: 30, duration: 18, delay: 2.0, xOffset: 70, rotate: 30 },
  { id: 4, left: '33%', size: 24, duration: 22, delay: 6.5, xOffset: -55, rotate: -15 },
  { id: 5, left: '42%', size: 28, duration: 17, delay: 1.5, xOffset: 60, rotate: 20 },
  { id: 6, left: '51%', size: 20, duration: 19, delay: 5.0, xOffset: -40, rotate: -25 },
  { id: 7, left: '61%', size: 32, duration: 15, delay: 3.2, xOffset: 80, rotate: 35 },
  { id: 8, left: '70%', size: 25, duration: 21, delay: 7.8, xOffset: -60, rotate: -18 },
  { id: 9, left: '78%', size: 27, duration: 18, delay: 0.8, xOffset: 50, rotate: 22 },
  { id: 10, left: '88%', size: 23, duration: 23, delay: 4.5, xOffset: -50, rotate: -30 },
  { id: 11, left: '95%', size: 29, duration: 16, delay: 2.7, xOffset: 75, rotate: 28 },
  { id: 12, left: '18%', size: 21, duration: 24, delay: 8.5, xOffset: 45, rotate: 15 },
  { id: 13, left: '48%', size: 25, duration: 19, delay: 9.2, xOffset: -65, rotate: -22 },
  { id: 14, left: '83%', size: 28, duration: 17, delay: 6.0, xOffset: 55, rotate: 24 },
];

// ==========================================
// 4. HẠT PHẤN HOA LẤP LÁNH DƯỚI NẮNG (SUN POLLEN)
// ==========================================
const SUN_SPECKLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left: `${3 + (i * 4.5)}%`,
  top: `${8 + ((i * 19) % 85)}%`,
  size: 2 + (i % 3) * 1.5,
  duration: 4 + (i % 4) * 2,
  delay: (i * 0.35) % 3,
}));

// ==========================================
// 5. ĐÀN BƯỚM THẢO NGUYÊN ĐA SẮC (DREAMY BUTTERFLIES)
// ==========================================
const BUTTERFLIES = [
  // Bướm 1: Hồng phấn & Vàng kim (bay từ trái sang phải, uốn lượn trung tâm)
  {
    id: 'bf-1',
    size: 28,
    colorTop: '#F472B6',
    colorBottom: '#FBBF24',
    bodyColor: '#4B382A',
    startX: '-5vw',
    endX: '105vw',
    yKeyframes: ['30vh', '20vh', '38vh', '15vh', '28vh'],
    duration: 24,
    delay: 1,
    scale: 1,
    direction: 1,
  },
  // Bướm 2: Tím Lavender & Vàng chanh (bay từ phải sang trái, uốn lượn phía trên)
  {
    id: 'bf-2',
    size: 26,
    colorTop: '#A78BFA',
    colorBottom: '#FDE047',
    bodyColor: '#4B382A',
    startX: '105vw',
    endX: '-5vw',
    yKeyframes: ['65vh', '48vh', '70vh', '42vh', '60vh'],
    duration: 28,
    delay: 11,
    scale: 0.95,
    direction: -1,
  },
  // Bướm 3: Xanh ngọc lam Sky Blue & Cyan (bay chéo từ góc dưới trái lên góc trên phải)
  {
    id: 'bf-3',
    size: 25,
    colorTop: '#38BDF8',
    colorBottom: '#67E8F9',
    bodyColor: '#334155',
    startX: '-6vw',
    endX: '106vw',
    yKeyframes: ['75vh', '55vh', '40vh', '22vh', '10vh'],
    duration: 26,
    delay: 6,
    scale: 0.9,
    direction: 1,
  },
  // Bướm 4: Cam Hổ phách & Vàng ấm (bay từ phải sang trái tầng thấp)
  {
    id: 'bf-4',
    size: 30,
    colorTop: '#FB923C',
    colorBottom: '#FBBF24',
    bodyColor: '#4B382A',
    startX: '106vw',
    endX: '-6vw',
    yKeyframes: ['22vh', '35vh', '18vh', '45vh', '25vh'],
    duration: 22,
    delay: 17,
    scale: 1.05,
    direction: -1,
  },
  // Cặp đôi bướm tình nhân 5A & 5B (bay cùng nhau quấn quýt)
  {
    id: 'bf-5a',
    size: 20,
    colorTop: '#FDA4AF',
    colorBottom: '#FDE68A',
    bodyColor: '#5C3A21',
    startX: '-5vw',
    endX: '105vw',
    yKeyframes: ['48vh', '40vh', '52vh', '36vh', '44vh'],
    duration: 25,
    delay: 14,
    scale: 0.8,
    direction: 1,
  },
  {
    id: 'bf-5b',
    size: 18,
    colorTop: '#C084FC',
    colorBottom: '#FBCFE8',
    bodyColor: '#5C3A21',
    startX: '-7vw',
    endX: '103vw',
    yKeyframes: ['52vh', '43vh', '56vh', '39vh', '47vh'],
    duration: 25,
    delay: 14.3,
    scale: 0.75,
    direction: 1,
  },
  // Bướm 6: Xanh bạc hà Mint & Thảo mộc
  {
    id: 'bf-6',
    size: 24,
    colorTop: '#34D399',
    colorBottom: '#FEF08A',
    bodyColor: '#1E3A2F',
    startX: '105vw',
    endX: '-5vw',
    yKeyframes: ['80vh', '65vh', '85vh', '58vh', '72vh'],
    duration: 27,
    delay: 20,
    scale: 0.9,
    direction: -1,
  },
];

export function DreamyMeadowAtmosphere() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 1. BỨC TRANH THẢO NGUYÊN NẮNG MAI TRỮ TÌNH (FIXED MEADOW CANVAS) */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/images/meadow-bg.jpg"
          alt="Bức tranh thảo nguyên vườn hoa thơ mộng"
          className="w-full h-full object-cover object-center scale-105 opacity-[0.52] filter saturate-[1.1] contrast-[0.98]"
        />

        {/* Lớp phủ chuyển sắc mềm mại kết hợp ánh nắng vàng rực rỡ */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF4EB]/65 via-[#FAF4EB]/40 to-[#FAF4EB]/75" />
        
        {/* Vầng sáng thái dương tỏa rạng */}
        <div 
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 15%, rgba(255, 235, 180, 0.45) 0%, rgba(255, 215, 120, 0.15) 45%, transparent 75%)',
          }}
        />

        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FAF4EB] via-[#FAF4EB]/60 to-transparent" />
      </div>

      {/* 2. HIỆU ỨNG CÁNH HOA BAY ĐA SẮC MÀU (FLOWER PETALS) */}
      <div className="absolute inset-0 overflow-hidden">
        {PETALS.map((petal) => (
          <motion.div
            key={`petal-${petal.id}`}
            className="absolute top-0"
            style={{
              left: petal.left,
              width: petal.size,
              height: petal.size * 1.3,
            }}
            initial={{
              y: '-8vh',
              x: 0,
              opacity: 0,
              rotateZ: 0,
              rotateX: 0,
              rotateY: 0,
            }}
            animate={{
              y: ['-8vh', '108vh'],
              x: [0, petal.xOffset, -petal.xOffset * 0.5, petal.xOffset * 0.7],
              opacity: [0, 0.85, 0.85, 0.2, 0],
              rotateZ: [0, petal.rotateDir * 360, petal.rotateDir * 720],
              rotateX: [0, 180, 360],
              rotateY: [0, 180, 360],
            }}
            transition={{
              duration: petal.duration,
              delay: petal.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <svg viewBox="0 0 24 32" className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.08)]">
              <path
                d="M12,2 C18,8 22,16 20,24 C18,30 14,32 12,32 C10,32 6,30 4,24 C2,16 6,8 12,2 Z"
                fill={petal.color}
                opacity="0.9"
              />
              <path
                d="M12,4 C15,9 18,17 16,23 C14,27 12,28 12,28"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="0.8"
                fill="none"
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* 3. HIỆU ỨNG HOA BỒ CÔNG ANH BAY THEO GIÓ (DANDELION SEEDS) */}
      <div className="absolute inset-0 overflow-hidden">
        {DANDELIONS.map((dan) => (
          <motion.div
            key={`dan-${dan.id}`}
            className="absolute"
            style={{
              left: dan.left,
              width: dan.size,
              height: dan.size * 1.4,
              bottom: '-12vh',
            }}
            initial={{
              y: '0vh',
              x: 0,
              opacity: 0,
              rotate: 0,
            }}
            animate={{
              y: ['0vh', '-120vh'],
              x: [0, dan.xOffset, -dan.xOffset * 0.4, dan.xOffset * 0.8],
              opacity: [0, 0.85, 0.9, 0.4, 0],
              rotate: [0, dan.rotate, dan.rotate * -0.5, dan.rotate],
            }}
            transition={{
              duration: dan.duration,
              delay: dan.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* Cấu trúc dù lông tơ hoa bồ công anh thanh thoát */}
            <svg viewBox="0 0 40 56" className="w-full h-full drop-shadow-[0_2px_4px_rgba(255,255,255,0.4)]">
              {/* Cuống hạt */}
              <line x1="20" y1="18" x2="20" y2="48" stroke="rgba(120, 100, 70, 0.5)" strokeWidth="1.2" strokeLinecap="round" />
              {/* Hạt giống hình bầu dục ở đáy */}
              <ellipse cx="20" cy="48" rx="2.2" ry="4" fill="#6B4F36" opacity="0.85" />
              <ellipse cx="19.5" cy="47" rx="0.8" ry="2" fill="rgba(255,255,255,0.4)" />
              
              {/* Tán tơ bồ công anh tỏa tròn hình chiếc dù */}
              <g stroke="rgba(255, 255, 255, 0.9)" strokeWidth="0.9" strokeLinecap="round">
                <line x1="20" y1="18" x2="20" y2="2" />
                <line x1="20" y1="18" x2="10" y2="5" />
                <line x1="20" y1="18" x2="30" y2="5" />
                <line x1="20" y1="18" x2="3" y2="12" />
                <line x1="20" y1="18" x2="37" y2="12" />
                <line x1="20" y1="18" x2="6" y2="20" />
                <line x1="20" y1="18" x2="34" y2="20" />
                <line x1="20" y1="18" x2="14" y2="8" />
                <line x1="20" y1="18" x2="26" y2="8" />
              </g>

              {/* Các chùm lông tơ li ti ở đầu sợi dù */}
              <circle cx="20" cy="2" r="1.2" fill="#FFFFFF" opacity="0.9" />
              <circle cx="10" cy="5" r="1.1" fill="#FFFFFF" opacity="0.9" />
              <circle cx="30" cy="5" r="1.1" fill="#FFFFFF" opacity="0.9" />
              <circle cx="3" cy="12" r="1" fill="#FFFFFF" opacity="0.85" />
              <circle cx="37" cy="12" r="1" fill="#FFFFFF" opacity="0.85" />
              <circle cx="6" cy="20" r="0.9" fill="#FFFFFF" opacity="0.8" />
              <circle cx="34" cy="20" r="0.9" fill="#FFFFFF" opacity="0.8" />
              <circle cx="14" cy="8" r="1" fill="#FFFFFF" opacity="0.9" />
              <circle cx="26" cy="8" r="1" fill="#FFFFFF" opacity="0.9" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* 4. HIỆU ỨNG LÁ CÂY BAY (LEAVES) */}
      <div className="absolute inset-0 overflow-hidden">
        {LEAVES.map((leaf) => (
          <motion.div
            key={`leaf-${leaf.id}`}
            className="absolute top-0"
            style={{
              left: leaf.left,
              width: leaf.size,
              height: leaf.size * 1.5,
            }}
            initial={{
              y: '-10vh',
              x: 0,
              opacity: 0,
              rotateZ: 0,
            }}
            animate={{
              y: ['-10vh', '110vh'],
              x: [0, leaf.xOffset, leaf.xOffset * -0.6, leaf.xOffset * 0.8],
              opacity: [0, 0.75, 0.8, 0.3, 0],
              rotateZ: [0, 180, 360, 540],
              rotateX: [0, 360],
              rotateY: [0, 180, 360],
            }}
            transition={{
              duration: leaf.duration,
              delay: leaf.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <svg viewBox="0 0 20 30" className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
              <path
                d="M10,0 C17,7 20,17 17,25 C14,29 11,30 10,30 C9,30 6,29 3,25 C0,17 3,7 10,0 Z"
                fill={leaf.color}
                opacity="0.85"
              />
              <line x1="10" y1="3" x2="10" y2="28" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
              <line x1="10" y1="12" x2="14" y2="8" stroke="rgba(255,255,255,0.3)" strokeWidth="0.6" />
              <line x1="10" y1="18" x2="6" y2="14" stroke="rgba(255,255,255,0.3)" strokeWidth="0.6" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* 5. ĐỐM PHẤN HOA LẤP LÁNH TRONG NẮNG (SUN POLLEN) */}
      <div className="absolute inset-0 overflow-hidden">
        {SUN_SPECKLES.map((dot) => (
          <motion.div
            key={`dot-${dot.id}`}
            className="absolute rounded-full"
            style={{
              left: dot.left,
              top: dot.top,
              width: dot.size,
              height: dot.size,
              backgroundColor: ['#FDE047', '#FFD700', '#F3E5AB', '#FFB7C5'][dot.id % 4],
              boxShadow: '0 0 8px rgba(253, 224, 71, 0.8)',
            }}
            animate={{
              y: [0, -25, 0],
              x: [0, 12 * Math.sin(dot.id), 0],
              opacity: [0.2, 0.85, 0.2],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: dot.duration,
              delay: dot.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* 6. ĐÀN BƯỚM THẢO NGUYÊN BAY LƯỢN ĐA SẮC MÀU (DREAMY BUTTERFLIES) */}
      {BUTTERFLIES.map((bf) => (
        <motion.div
          key={bf.id}
          className="absolute pointer-events-none"
          style={{
            width: bf.size,
            height: bf.size,
          }}
          initial={{
            x: bf.startX,
            y: bf.yKeyframes[0],
            opacity: 0,
          }}
          animate={{
            x: [bf.startX, bf.endX],
            y: bf.yKeyframes,
            opacity: [0, 0.85, 0.95, 0.9, 0],
          }}
          transition={{
            duration: bf.duration,
            repeat: Infinity,
            delay: bf.delay,
            ease: 'linear',
          }}
        >
          {/* Cánh bướm vỗ nhịp nhàng sinh động */}
          <motion.div
            animate={{
              scaleX: [1, 0.22, 1],
              rotate: bf.direction === 1 ? [15, 0, 22, 5] : [-15, 0, -22, -5],
            }}
            transition={{
              scaleX: { duration: 0.26 + (bf.size % 4) * 0.03, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
            }}
            className={`w-full h-full ${bf.direction === -1 ? 'scale-x-[-1]' : ''}`}
          >
            <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-[0_2px_6px_rgba(0,0,0,0.15)]">
              {/* Cánh trên trái & phải */}
              <path
                d="M16 16 C12 5, 2 7, 3 16 C5 22, 13 20, 16 16 Z"
                fill={bf.colorTop}
                opacity="0.9"
              />
              <path
                d="M16 16 C20 5, 30 7, 29 16 C27 22, 19 20, 16 16 Z"
                fill={bf.colorTop}
                opacity="0.9"
              />
              
              {/* Cánh dưới trái & phải */}
              <path
                d="M16 16 C11 23, 5 25, 7 28 C10 30, 15 23, 16 16 Z"
                fill={bf.colorBottom}
                opacity="0.85"
              />
              <path
                d="M16 16 C21 23, 27 25, 25 28 C22 30, 17 23, 16 16 Z"
                fill={bf.colorBottom}
                opacity="0.85"
              />
              
              {/* Đốm họa tiết cánh bướm */}
              <circle cx="10" cy="13" r="1.8" fill="rgba(255,255,255,0.7)" />
              <circle cx="22" cy="13" r="1.8" fill="rgba(255,255,255,0.7)" />
              <circle cx="11" cy="23" r="1.2" fill="rgba(255,255,255,0.6)" />
              <circle cx="21" cy="23" r="1.2" fill="rgba(255,255,255,0.6)" />

              {/* Thân bướm & râu */}
              <ellipse cx="16" cy="16" rx="1.2" ry="7" fill={bf.bodyColor} />
              <line x1="16" y1="10" x2="13" y2="5" stroke={bf.bodyColor} strokeWidth="0.8" strokeLinecap="round" />
              <line x1="16" y1="10" x2="19" y2="5" stroke={bf.bodyColor} strokeWidth="0.8" strokeLinecap="round" />
            </svg>
          </motion.div>
        </motion.div>
      ))}

    </div>
  );
}
