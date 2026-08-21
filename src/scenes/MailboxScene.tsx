import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, RotateCw } from 'lucide-react';
import { BRIDE, GROOM } from '@/data/wedding';

interface MailboxSceneProps {
  onOpen?: () => void;
  onFlip?: () => void;
}

// Cấu trúc dữ liệu cho hạt bụi vàng phát sáng khi con dấu sáp bung mở
interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
}

export function MailboxScene({ onOpen, onFlip }: MailboxSceneProps) {
  // Trạng thái phong bì đã được chạm mở hay chưa
  const [isOpen, setIsOpen] = useState(false);
  // Trạng thái thiệp cưới đã vươn lên hoàn toàn ở vị trí tiền cảnh
  const [cardEmerged, setCardEmerged] = useState(false);
  // Trạng thái lật mặt 180 độ của thiệp cưới
  const [isFlipped, setIsFlipped] = useState(false);
  // Trạng thái hiển thị tooltip gợi ý lật thiệp sau 3s mở thư
  const [showFlipHint, setShowFlipHint] = useState(false);
  // Trạng thái di chuột qua phong bì
  const [isHovered, setIsHovered] = useState(false);
  // Danh sách các hạt bụi vàng kim tuyến bung tỏa
  const [particles, setParticles] = useState<SparkleParticle[]>([]);

  // Tự động hiển thị tooltip gợi ý sau 3 giây mở thư nếu người dùng chưa lật thiệp
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isOpen && !isFlipped) {
      timer = setTimeout(() => {
        setShowFlipHint(true);
      }, 3000);
    } else {
      setShowFlipHint(false);
    }
    return () => clearTimeout(timer);
  }, [isOpen, isFlipped]);

  // Hàm xử lý mở thiệp cưới
  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);

    // Tạo 22 hạt bụi vàng tỏa tròn 360 độ từ tâm con dấu sáp
    const newParticles: SparkleParticle[] = Array.from({ length: 22 }, (_, i) => {
      const angle = (i / 22) * 2 * Math.PI + (Math.random() - 0.5) * 0.35;
      const distance = 45 + Math.random() * 85;
      return {
        id: i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        size: 3 + Math.random() * 5,
        color: ['#D4AF37', '#F3E5AB', '#FFD700', '#FFF8DC', '#E6C280', '#FFB7C5'][i % 6],
        delay: Math.random() * 0.1,
      };
    });
    setParticles(newParticles);

    // Thiệp cưới trượt vươn lên tiền cảnh trung tâm êm ái
    setTimeout(() => {
      setCardEmerged(true);
      onOpen?.();
    }, 250);
  };

  // Hàm cuộn mượt màn hình xuống phần nội dung tiếp theo
  const handleScrollDown = () => {
    const nextSection = document.getElementById('letter-scene') || document.getElementById('countdown-scene');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth',
      });
    }
  };

  // Xử lý khi nhấn vào thiệp:
  // - Nếu chưa mở: Mở phong bì
  // - Nếu đã mở: Lật 180 độ giữa mặt bìa ảnh và mặt sau thông tin chi tiết
  const handleCardFlip = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!isOpen) {
      handleOpen();
    } else {
      setIsFlipped((prev) => {
        const next = !prev;
        if (next && onFlip) {
          onFlip();
        }
        return next;
      });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden select-none px-4 py-8 bg-transparent">
      {/* 1. Nền chuyển sắc dịu nhẹ hòa quyện cùng thảo nguyên */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50/20 via-transparent to-amber-50/30 pointer-events-none" />
      
      <div 
        className="absolute w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] rounded-full pointer-events-none opacity-35 transition-opacity duration-1000"
        style={{
          background: isOpen 
            ? 'radial-gradient(circle, rgba(212,175,55,0.18) 0%, rgba(255,215,0,0.06) 50%, transparent 70%)'
            : 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, rgba(232,212,176,0.04) 50%, transparent 70%)',
        }}
      />

      {/* 2. Họa tiết hoa lá trang trí góc trên bên trái */}
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-10 pointer-events-none opacity-70">
        <svg width="90" height="90" viewBox="0 0 90 90" className="sm:w-[130px] sm:h-[130px]">
          <g fill="none" stroke="#8a9e7b" strokeWidth="1.2" strokeLinecap="round">
            <path d="M10 80 Q25 45 12 15" />
            <path d="M10 80 Q35 55 30 22" />
            <path d="M10 80 Q45 60 50 35" />
            <path d="M10 80 Q60 65 65 48" />
          </g>
          <circle cx="12" cy="15" r="4.5" fill="#e5b85a" opacity="0.9" />
          <circle cx="9" cy="12" r="2.5" fill="#fff" opacity="0.8" />
          <circle cx="30" cy="22" r="4" fill="#e8a3a0" opacity="0.85" />
          <circle cx="50" cy="35" r="3.5" fill="#e5b85a" opacity="0.9" />
          <circle cx="65" cy="48" r="3" fill="#e8a3a0" opacity="0.8" />
          <ellipse cx="22" cy="48" rx="6.5" ry="3" fill="#8a9e7b" transform="rotate(-35 22 48)" opacity="0.85" />
          <ellipse cx="32" cy="54" rx="6" ry="2.8" fill="#6d865d" transform="rotate(-20 32 54)" opacity="0.85" />
          <ellipse cx="44" cy="62" rx="5.5" ry="2.5" fill="#8a9e7b" transform="rotate(-15 44 62)" opacity="0.85" />
        </svg>
      </div>

      {/* 3. Họa tiết hoa lá trang trí góc trên bên phải (lật đối xứng) */}
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-10 pointer-events-none opacity-70 scale-x-[-1]">
        <svg width="90" height="90" viewBox="0 0 90 90" className="sm:w-[130px] sm:h-[130px]">
          <g fill="none" stroke="#8a9e7b" strokeWidth="1.2" strokeLinecap="round">
            <path d="M10 80 Q25 45 12 15" />
            <path d="M10 80 Q35 55 30 22" />
            <path d="M10 80 Q45 60 50 35" />
          </g>
          <circle cx="12" cy="15" r="4.5" fill="#e5b85a" opacity="0.9" />
          <circle cx="9" cy="12" r="2.5" fill="#fff" opacity="0.8" />
          <circle cx="30" cy="22" r="4" fill="#e8a3a0" opacity="0.85" />
          <circle cx="50" cy="35" r="3.5" fill="#e5b85a" opacity="0.9" />
          <ellipse cx="22" cy="48" rx="6.5" ry="3" fill="#8a9e7b" transform="rotate(-35 22 48)" opacity="0.85" />
          <ellipse cx="32" cy="54" rx="6" ry="2.8" fill="#6d865d" transform="rotate(-20 32 54)" opacity="0.85" />
        </svg>
      </div>

      {/* 4. Đốm sáng lơ lửng nhẹ nhàng — Giảm từ 10 xuống 5, dùng CSS animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              width: 5 + (i % 3) * 3,
              height: 5 + (i % 3) * 3,
              left: `${10 + i * 18}%`,
              top: `${15 + ((i * 23) % 60)}%`,
              backgroundColor: ['#FFD1DC', '#D4AF37', '#FFB7C5', '#F5E6CC'][i % 4],
              opacity: 0.3,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i}s`,
            }}
          />
        ))}
      </div>

      {/* 5. Tiêu đề thiệp cưới ở trạng thái ban đầu */}
      <motion.div
        className="relative z-10 text-center mb-6 sm:mb-8"
        animate={{
          opacity: isOpen ? 0 : 1,
          y: isOpen ? -30 : 0,
          scale: isOpen ? 0.9 : 1,
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-[11px] sm:text-xs tracking-[0.3em] uppercase text-amber-800/80 font-medium mb-1.5 font-['Montserrat',sans-serif]">
          Wedding Invitation
        </p>
        <h1 className="font-['Great_Vibes',cursive] text-3xl sm:text-5xl text-[#6d4c2a] drop-shadow-sm">
          {BRIDE.firstName} &amp; {GROOM.firstName}
        </h1>
        <div className="flex items-center justify-center gap-2 mt-2">
          <div className="h-px w-10 bg-amber-300" />
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <div className="h-px w-10 bg-amber-300" />
        </div>
      </motion.div>

      {/* ========================================================
          6. SÂN KHẤU PHONG BÌ & THIỆP MỜI (ENVELOPE STAGE)
         ======================================================== */}
      <div
        className="relative z-20 flex items-center justify-center min-h-[530px] sm:min-h-[620px]"
        style={{ perspective: '1600px' }}
      >
        <div className="relative flex items-center justify-center">
          
          {/* KHỐI 1: THÂN TÚI PHONG BÌ (Mặt lưng + Túi mặt trước) */}
          <motion.div
            className="relative cursor-pointer"
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{
              scale: cardEmerged ? 0.92 : 1,
              opacity: 1,
              y: cardEmerged ? 130 : (isOpen ? 35 : 0),
            }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleOpen}
            whileHover={!isOpen ? { y: -4 } : undefined}
            whileTap={!isOpen ? { scale: 0.98 } : undefined}
          >
            {/* Kích thước chuẩn của phong bì (Mobile: 335x225px, Desktop: 450x300px) */}
            <div className="relative w-[335px] h-[225px] sm:w-[450px] sm:h-[300px]">
              
              {/* 1.1 Lớp lưng phong bì (Z-Index 10: Nằm ở đáy) */}
              <div
                className="absolute inset-0 rounded-2xl overflow-hidden"
                style={{
                  zIndex: 10,
                  background: 'linear-gradient(155deg, #f5ebd9 0%, #e8d7be 50%, #d8c3a5 100%)',
                  boxShadow: isOpen
                    ? '0 20px 45px -15px rgba(90, 65, 40, 0.2)'
                    : isHovered
                      ? '0 30px 65px -10px rgba(110, 75, 40, 0.3), 0 12px 30px -5px rgba(110, 75, 40, 0.2)'
                      : '0 20px 50px -10px rgba(110, 75, 40, 0.22), 0 8px 20px -5px rgba(110, 75, 40, 0.12)',
                  transition: 'box-shadow 0.4s ease',
                }}
              >
                {/* Đổ bóng nhẹ bên trong lòng phong bì */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* 1.2 Thân túi đựng mặt trước vector SVG (Z-Index 30) */}
              <div 
                className="absolute inset-0 rounded-2xl overflow-hidden cursor-pointer" 
                style={{ 
                  zIndex: 30,
                  opacity: cardEmerged ? 0.75 : 1,
                  transition: 'opacity 0.6s ease',
                }}
                onClick={handleOpen}
              >
                <svg
                  viewBox="0 0 400 270"
                  className="w-full h-full drop-shadow-[0_-3px_8px_rgba(90,60,30,0.15)]"
                  preserveAspectRatio="none"
                >
                  <defs>
                    {/* Gradient màu túi mặt trước */}
                    <linearGradient id="pocketGradFixed" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#e8dac6" />
                      <stop offset="40%" stopColor="#dfceb8" />
                      <stop offset="100%" stopColor="#cfbda4" />
                    </linearGradient>

                    {/* Gradient đổ bóng nếp gấp cánh trái */}
                    <linearGradient id="leftFoldGradFixed" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
                      <stop offset="70%" stopColor="transparent" />
                      <stop offset="100%" stopColor="rgba(0,0,0,0.06)" />
                    </linearGradient>

                    {/* Gradient đổ bóng nếp gấp cánh phải */}
                    <linearGradient id="rightFoldGradFixed" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
                      <stop offset="70%" stopColor="transparent" />
                      <stop offset="100%" stopColor="rgba(0,0,0,0.06)" />
                    </linearGradient>
                  </defs>

                  {/* Khối thân trước liền mạch */}
                  <path
                    d="M 0,80 L 200,165 L 400,80 L 400,270 L 0,270 Z"
                    fill="url(#pocketGradFixed)"
                  />

                  {/* Nếp bóng gấp tam giác bên trái */}
                  <path
                    d="M 0,0 L 200,165 L 0,270 Z"
                    fill="url(#leftFoldGradFixed)"
                  />

                  {/* Nếp bóng gấp tam giác bên phải */}
                  <path
                    d="M 400,0 L 200,165 L 400,270 Z"
                    fill="url(#rightFoldGradFixed)"
                  />

                  {/* Đường gân gập giấy tinh tế từ hai góc đáy lên tâm chữ V */}
                  <line x1="0" y1="270" x2="200" y2="165" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
                  <line x1="0" y1="270" x2="200" y2="165" stroke="rgba(100,70,40,0.12)" strokeWidth="0.8" />
                  
                  <line x1="400" y1="270" x2="200" y2="165" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
                  <line x1="400" y1="270" x2="200" y2="165" stroke="rgba(100,70,40,0.12)" strokeWidth="0.8" />

                  {/* Viền vàng kim tuyến chạy dọc đường cắt miệng túi */}
                  <path
                    d="M 0,80 L 200,165 L 400,80"
                    fill="none"
                    stroke="rgba(212,175,55,0.4)"
                    strokeWidth="1.2"
                  />
                </svg>
              </div>

              {/* 1.3 Con dấu sáp niêm phong Ruby (Z-Index 45: Nằm giữa miệng túi khi đóng) */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 cursor-pointer"
                style={{
                  top: '52%',
                  zIndex: 45,
                }}
                animate={
                  isOpen
                    ? {
                        scale: [1, 1.25, 0.4],
                        opacity: [1, 0.8, 0],
                        y: [0, -10, 20],
                      }
                    : isHovered
                      ? {
                          scale: 1.08,
                          y: -2,
                        }
                      : {
                          scale: 1,
                          y: 0,
                        }
                }
                transition={{
                  duration: isOpen ? 0.45 : 0.25,
                  ease: 'easeOut',
                }}
                onClick={handleOpen}
              >
                <div className="relative flex items-center justify-center">
                  {/* Vòng sáng phát ra nhịp thở nhẹ khi chưa mở */}
                  {!isOpen && (
                    <div className="absolute -inset-2 rounded-full seal-glow opacity-75" />
                  )}

                  {/* Khối con dấu dập nổi màu đỏ ruby */}
                  <div
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:scale-105 transition-transform"
                    style={{
                      background: 'radial-gradient(circle at 35% 30%, #d84a56 0%, #b32a39 45%, #7a1520 85%, #560a12 100%)',
                      boxShadow: '0 6px 16px rgba(100, 20, 30, 0.5), inset 0 2px 4px rgba(255, 200, 200, 0.5), inset 0 -3px 6px rgba(0, 0, 0, 0.6)',
                      border: '1.5px solid rgba(255, 215, 0, 0.45)',
                    }}
                  >
                    <div className="flex items-center justify-center pointer-events-none">
                      <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-amber-200 fill-amber-300 drop-shadow-md" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 1.4 Hiệu ứng nổ hạt bụi vàng kim tuyến khi phá vỡ niêm phong sáp */}
              <AnimatePresence>
                {isOpen &&
                  particles.map((p) => (
                    <motion.div
                      key={p.id}
                      className="absolute pointer-events-none"
                      style={{
                        left: '50%',
                        top: '50%',
                        zIndex: 60,
                      }}
                      initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                      animate={{
                        x: p.x,
                        y: p.y,
                        scale: [0, 1.4, 0],
                        opacity: [1, 1, 0],
                      }}
                      transition={{
                        duration: 0.85,
                        delay: p.delay,
                        ease: [0.2, 0.8, 0.4, 1],
                      }}
                    >
                      <svg width={p.size * 2} height={p.size * 2} viewBox="0 0 24 24">
                        <path
                          d="M12 0L14 9L23 12L14 15L12 24L10 15L1 12L10 9Z"
                          fill={p.color}
                        />
                      </svg>
                    </motion.div>
                  ))}
              </AnimatePresence>

            </div>
          </motion.div>


          {/* KHỐI 2: TẤM THIỆP CƯỚI 3D FLIP (MẶT TRƯỚC: ẢNH BÌA | MẶT SAU: ẢNH VÀ LỜI CHIA SẺ Ý NGHĨA) */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 pointer-events-auto cursor-pointer"
            style={{
              zIndex: cardEmerged ? 50 : 20,
              transformOrigin: 'bottom center',
              perspective: '1200px',
            }}
            onClick={handleCardFlip}
            initial={{
              y: 20,
              scale: 0.92,
              opacity: 0,
            }}
            animate={{
              y: cardEmerged ? (window.innerWidth < 640 ? -95 : -120) : 20,
              scale: cardEmerged ? 1 : 0.92,
              opacity: cardEmerged ? 1 : (isOpen ? 1 : 0),
            }}
            transition={{
              duration: 1.0,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={cardEmerged ? { y: window.innerWidth < 640 ? -100 : -125 } : undefined}
          >
            {/* Vỏ lật 3D 180 độ */}
            <motion.div
              className="relative w-[325px] sm:w-[410px] md:w-[440px] h-[485px] sm:h-[550px] md:h-[580px]"
              style={{
                transformStyle: 'preserve-3d',
                WebkitTransformStyle: 'preserve-3d',
                WebkitFontSmoothing: 'antialiased',
              }}
              animate={{
                rotateY: isFlipped ? 180 : 0,
              }}
              transition={{
                duration: 0.8,
                ease: [0.34, 1.25, 0.64, 1],
              }}
            >
              
              {/* ========================================================
                  2.1 MẶT TRƯỚC: BÌA ẢNH CƯỚI NGHỆ THUẬT (FRONT FACE)
                 ======================================================== */}
              <div
                className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden border border-[#e8d7be]"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(0deg)',
                  zIndex: isFlipped ? 0 : 2,
                  WebkitFontSmoothing: 'antialiased',
                  boxShadow: cardEmerged
                    ? '0 30px 70px -15px rgba(80, 50, 20, 0.4), 0 12px 25px -8px rgba(80, 50, 20, 0.25), 0 0 0 1px rgba(212,175,55,0.5)'
                    : '0 8px 25px rgba(90, 65, 40, 0.18)',
                }}
              >
                {/* Ảnh cưới nền tràn khung */}
                <img
                  src="/images/couple.jpg"
                  alt="Ảnh bìa thiệp cưới Nghĩa & Huy"
                  className="w-full h-full object-cover object-center brightness-105"
                />

                {/* Lớp phủ chuyển sắc dịu nhẹ toàn màn hình */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/35" />
                
                {/* Lớp tỏa sáng tâm radial tinh tế tăng tương phản chữ */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.3)_0%,_transparent_75%)] pointer-events-none" />

                {/* Viền đôi nhũ vàng hoàng gia */}
                <div className="absolute inset-3 sm:inset-4 rounded-xl border border-amber-300/85 pointer-events-none z-20" />
                <div className="absolute inset-4 sm:inset-5 rounded-lg border border-amber-200/45 pointer-events-none z-20" />

                {/* Hoa văn góc viền kim loại vàng */}
                <div className="absolute top-5 left-5 text-amber-300 text-xs pointer-events-none z-20 drop-shadow">✤</div>
                <div className="absolute top-5 right-5 text-amber-300 text-xs pointer-events-none z-20 drop-shadow">✤</div>
                <div className="absolute bottom-5 left-5 text-amber-300 text-xs pointer-events-none z-20 drop-shadow">✤</div>
                <div className="absolute bottom-5 right-5 text-amber-300 text-xs pointer-events-none z-20 drop-shadow">✤</div>

                {/* Nội dung trên nền ảnh */}
                <div className="absolute inset-0 flex flex-col items-center justify-between p-6 sm:p-8 text-center z-20 select-none">
                  {/* Phần trên: Huy hiệu Save The Date */}
                  <div className="pt-2">
                    <span className="px-3.5 py-1 rounded-full bg-black/35 backdrop-blur-md text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-amber-100 font-semibold border border-amber-300/50 shadow-md">
                      Save The Date
                    </span>
                  </div>

                  {/* Phần giữa: Tiêu đề WEDDING INVITATION & Tên cặp đôi */}
                  <div className="flex flex-col items-center my-auto">
                    <p className="font-['Montserrat',sans-serif] text-xs sm:text-sm uppercase tracking-[0.35em] text-amber-100 font-semibold mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                      Wedding Invitation
                    </p>
                    
                    <div className="flex items-center justify-center gap-2 my-1">
                      <div className="h-px w-8 bg-amber-300/80 drop-shadow" />
                      <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 drop-shadow-md" />
                      <div className="h-px w-8 bg-amber-300/80 drop-shadow" />
                    </div>

                    <h2 className="font-['Great_Vibes',cursive] text-3xl sm:text-4xl text-amber-50 drop-shadow-[0_3px_8px_rgba(0,0,0,0.9)]">
                      {BRIDE.firstName} &amp; {GROOM.firstName}
                    </h2>
                  </div>

                  {/* Khoảng trống đáy thoáng đãng */}
                  <div className="pb-1" />
                </div>

              </div>

              {/* ========================================================
                  2.2 MẶT SAU: ẢNH VÀ LỜI CHIA SẺ Ý NGHĨA (BACK FACE)
                 ======================================================== */}
              <div
                className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden bg-[#fffdf9] border border-[#e8d7be] flex flex-col justify-between"
                style={{
                  transform: 'rotateY(180deg)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  zIndex: isFlipped ? 2 : 0,
                  WebkitFontSmoothing: 'antialiased',
                  boxShadow: cardEmerged
                    ? '0 30px 70px -15px rgba(80, 50, 20, 0.4), 0 12px 25px -8px rgba(80, 50, 20, 0.25), 0 0 0 1px rgba(212,175,55,0.5)'
                    : '0 8px 25px rgba(90, 65, 40, 0.18)',
                }}
              >
                {/* Viền đôi nhũ vàng hoàng gia */}
                <div className="absolute inset-2.5 rounded-xl border border-amber-300/60 pointer-events-none z-20" />
                <div className="absolute inset-3.5 rounded-lg border border-amber-200/40 pointer-events-none z-20" />

                {/* Hoa văn góc viền kim loại vàng */}
                <div className="absolute top-4 left-4 text-amber-500/50 text-xs pointer-events-none z-20">✤</div>
                <div className="absolute top-4 right-4 text-amber-500/50 text-xs pointer-events-none z-20">✤</div>
                <div className="absolute bottom-4 left-4 text-amber-500/50 text-xs pointer-events-none z-20">✤</div>
                <div className="absolute bottom-4 right-4 text-amber-500/50 text-xs pointer-events-none z-20">✤</div>

                {/* Phần banner ảnh kỷ niệm phía trên */}
                <div className="relative h-48 sm:h-56 overflow-hidden shrink-0">
                  <img
                    src="/images/couple.jpg"
                    alt="Ảnh kỷ niệm Nghĩa & Huy"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#fffdf9] via-black/15 to-transparent" />
                </div>

                {/* Phần nội dung lời nhắn gửi ý nghĩa */}
                <div className="p-6 sm:p-8 text-center relative z-10 -mt-2 flex flex-col items-center justify-center my-auto">
                  {/* Họa tiết ba ngôi sao */}
                  <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                    <div className="h-px w-10 sm:w-12 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
                    <span className="text-amber-500 text-xs sm:text-sm">✦ ✦ ✦</span>
                    <div className="h-px w-10 sm:w-12 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
                  </div>

                  {/* Đoạn thông điệp từ cặp đôi */}
                  <p className="font-['Cormorant_Garamond',serif] italic text-sm sm:text-[17px] text-amber-950/90 leading-relaxed max-w-[320px] sm:max-w-[360px] mx-auto px-1 drop-shadow-sm">
                    “Chúng mình sắp bắt đầu một hành trình mới cùng nhau.<br className="hidden sm:inline" />
                    {' '}Niềm vui này sẽ trọn vẹn hơn khi có bạn bên cạnh.<br className="hidden sm:inline" />
                    {' '}Cuộc sống quý giá không chỉ ở đích đến, mà còn ở những khoảnh khắc chia sẻ cùng nhau.<br className="hidden sm:inline" />
                    {' '}Vì vậy, chúng mình mong được bạn chung vui trong ngày hạnh phúc này.”
                  </p>

                  {/* Trái tim hồng cách điệu ở đáy */}
                  <div className="flex items-center justify-center gap-2 mt-4 sm:mt-5">
                    <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-400" />
                    <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
                  </div>
                </div>

              </div>

            </motion.div>

            {/* Tooltip gợi ý chạm lật thiệp sau 3s nếu chưa lật */}
            <AnimatePresence>
              {showFlipHint && !isFlipped && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute -bottom-8 sm:-bottom-9 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
                >
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-amber-300/60 shadow-xl shadow-amber-950/40 flex items-center gap-2 text-amber-200 text-[11px] sm:text-xs font-['Playfair_Display',serif] whitespace-nowrap"
                  >
                    <RotateCw className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
                    <span>Chạm vào thiệp ✦</span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>



      {/* ========================================================
          7. NÚT KHÁM PHÁ CÂU CHUYỆN KHI ĐÃ LẬT XEM THIỆP
         ======================================================== */}
      <div className="relative z-30 mt-6 sm:mt-8 flex flex-col items-center">
        <motion.div
          animate={{
            opacity: isOpen && isFlipped ? 1 : 0,
            y: isOpen && isFlipped ? 0 : 12,
            scale: isOpen && isFlipped ? 1 : 0.96,
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`flex flex-col items-center gap-2 ${
            isOpen && isFlipped ? 'pointer-events-auto' : 'pointer-events-none select-none'
          }`}
        >
          <motion.button
            onClick={handleScrollDown}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#dfad5b] via-[#cd9542] to-[#b87c2f] hover:brightness-105 text-white font-['Playfair_Display',serif] text-xs sm:text-sm font-medium shadow-md hover:shadow-lg shadow-amber-700/15 transition-all duration-300 flex items-center gap-2 cursor-pointer border border-amber-200/70"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            <span>Khám phá câu chuyện tình yêu</span>
            <motion.div
              animate={{ scale: [1, 1.25, 1, 1.15, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Heart className="w-4 h-4 text-rose-300 fill-rose-400" />
            </motion.div>
          </motion.button>
          
          <p className="text-[11px] text-amber-800/70 font-['Cormorant_Garamond',serif] animate-pulse">
            Cuộn xuống để xem câu chuyện &amp; gửi lời chúc
          </p>
        </motion.div>
      </div>
    </section>
  );
}

