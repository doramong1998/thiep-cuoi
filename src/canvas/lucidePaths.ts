/**
 * Lucide SVG Path definitions for Canvas rendering
 * ViewBox 24x24, compiled to Path2D with caching for 60fps performance.
 */

const LUCIDE_ICON_DATA: Record<string, string[]> = {
  // ☕ 'coffee': Buổi hẹn hò đầu tiên
  coffee: [
    'M10 2v2',
    'M14 2v2',
    'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1',
    'M6 2v2',
  ],
  // 🏞️ 'mountain': Chuyến đi Cao Bằng
  mountain: [
    'm8 3 4 8 5-5 5 15H2L8 3z',
  ],
  // 🌲 'trees': Đà Lạt
  trees: [
    'M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z',
    'M7 16v6',
    'M13 19v3',
    'M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5',
  ],
  // 🎆 'sparkles': Năm mới / Giao thừa
  sparkles: [
    'M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z',
    'M20 2v4',
    'M22 4h-4',
    'M4 18a2 2 0 1 0 0 4 2 2 0 1 0 0-4',
  ],
  // 🎂 'cake': Sinh nhật
  cake: [
    'M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8',
    'M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1',
    'M2 21h20',
    'M7 8v3',
    'M12 8v3',
    'M17 8v3',
    'M7 4h.01',
    'M12 4h.01',
    'M17 4h.01',
  ],
  // 🌊 'waves': Biển Lý Sơn
  waves: [
    'M2 6c3 0 4.5 2 7 2s4-2 7-2 4 2 6 2',
    'M2 12c3 0 4.5 2 7 2s4-2 7-2 4 2 6 2',
    'M2 18c3 0 4.5 2 7 2s4-2 7-2 4 2 6 2',
  ],
  // 🎵 'music': Concert thanh xuân
  music: [
    'M9 18V5l12-2v13',
    'M6 15a3 3 0 1 0 0 6 3 3 0 1 0 0-6',
    'M18 13a3 3 0 1 0 0 6 3 3 0 1 0 0-6',
  ],
  // 💕 'heart': 365 ngày yêu thương
  heart: [
    'M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z',
  ],
  // 🏔️ 'mountain-snow': Sa Pa tuyết sương
  'mountain-snow': [
    'm8 3 4 8 5-5 5 15H2L8 3z',
    'M4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74 1.94 5.49 2 8.23.19',
  ],
  // 🏖️ 'palmtree': Nha Trang
  palmtree: [
    'M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2l1-1 1 1h4',
    'M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-3l-1-1-1 1h-3',
    'M5.89 9.71c-2.15 2.15-2.3 5.47-.35 7.43l4.24-4.25.7-.7.71-.71 2.12-2.12c-1.95-1.96-5.27-1.8-7.42.35',
    'M11 15.5c.5 2.5-.17 4.5-1 6.5h4c2-5.5-.5-12-1-14',
  ],
  // 💍 'gem': Cầu hôn
  gem: [
    'M10.5 3 8 9l4 13 4-13-2.5-6',
    'M17 3a2 2 0 0 1 1.6.8l3 4a2 2 0 0 1 .013 2.382l-7.99 10.986a2 2 0 0 1-3.247 0l-7.99-10.986A2 2 0 0 1 2.4 7.8l2.998-3.997A2 2 0 0 1 7 3z',
    'M2 9h20',
  ],
  // 💒 'church': Về chung một nhà
  church: [
    'M10 9h4',
    'M12 7v5',
    'M14 21v-3a2 2 0 0 0-4 0v3',
    'm18 9 3.52 2.147a1 1 0 0 1 .48.854V19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6.999a1 1 0 0 1 .48-.854L6 9',
    'M6 21V7a1 1 0 0 1 .376-.782l5-3.999a1 1 0 0 1 1.249.001l5 4A1 1 0 0 1 18 7v14',
  ],
};

// Mapping cả emoji và tên text sang key của Lucide icon
const ICON_ALIAS_MAP: Record<string, string> = {
  // Emoji
  '☕': 'coffee',
  '🏞️': 'mountain',
  '🌲': 'trees',
  '🎆': 'sparkles',
  '🎂': 'cake',
  '🌊': 'waves',
  '🎵': 'music',
  '💕': 'heart',
  '❤️': 'heart',
  '🏔️': 'mountain-snow',
  '🏖️': 'palmtree',
  '💍': 'gem',
  '💒': 'church',
  // Tên tiếng Anh thông dụng
  coffee: 'coffee',
  mountain: 'mountain',
  trees: 'trees',
  sparkles: 'sparkles',
  cake: 'cake',
  waves: 'waves',
  music: 'music',
  heart: 'heart',
  'mountain-snow': 'mountain-snow',
  palmtree: 'palmtree',
  gem: 'gem',
  ring: 'gem',
  church: 'church',
};

// Cache Path2D đã compile để không tốn tài nguyên tạo mới ở mỗi frame (60 FPS)
const CACHED_PATHS = new Map<string, Path2D[]>();

/**
 * Lấy danh sách Path2D của icon Lucide tương ứng.
 * Trả về null nếu không tìm thấy để fallback về emoji.
 */
export function getLucidePath2D(icon: string): Path2D[] | null {
  const normalizedKey = ICON_ALIAS_MAP[icon] || icon.toLowerCase();
  if (CACHED_PATHS.has(normalizedKey)) {
    return CACHED_PATHS.get(normalizedKey)!;
  }

  const pathStrings = LUCIDE_ICON_DATA[normalizedKey];
  if (!pathStrings) return null;

  try {
    const compiled = pathStrings.map((d) => new Path2D(d));
    CACHED_PATHS.set(normalizedKey, compiled);
    return compiled;
  } catch (err) {
    console.warn(`Lỗi compile Path2D cho icon: ${icon}`, err);
    return null;
  }
}
