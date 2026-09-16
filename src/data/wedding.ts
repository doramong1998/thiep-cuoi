import type { Milestone, BankAccount, GalleryImage } from '@/types';

export const WEDDING_DATE = '2026-10-25T10:00:00+07:00';

export const BRIDE = {
  firstName: 'Nghĩa',
  fullName: 'Vũ Thị Nghĩa',
  displayName: 'VŨ THỊ NGHĨA', // or VŨ THỊ NGHĨA
  rank: 'Ái Nữ',
  birthDate: '18.01.1999',
};

export const GROOM = {
  firstName: 'Huy',
  fullName: 'Trần Quang Huy',
  displayName: 'TRẦN QUANG HUY', // or TRẦN QUANG HUY
  rank: 'Trưởng Nam',
  birthDate: '30.04.1998',
};

export const GROOM_FAMILY = {
  title: 'NHÀ TRAI',
  father: 'Trần Thanh Thản',
  mother: 'Nguyễn Thị Xuân Mai',
  groom: 'Trần Quang Huy',
  rank: 'Trưởng Nam',
  address: 'Số 12 Ngõ 155 Đường 32, Xã Vật Lại, TP. Hà Nội',
  phone: '0978727524',
  mapUrl: 'https://maps.app.goo.gl/z2aQin6N1gAjdFbU9',
};

export const BRIDE_FAMILY = {
  title: 'NHÀ GÁI',
  father: 'Vũ Song Hào',
  mother: 'Nguyễn Thị Yến',
  bride: 'Vũ Thị Nghĩa',
  rank: 'Ái Nữ',
  address: 'Thôn Tân Thể, xã Ngọc Thiện, Bắc Ninh',
  phone: '0981384115',
  mapUrl: 'https://maps.app.goo.gl/3jSpHTNjVX5Rv4je6',
};

export const WEDDING_INFO = {
  date: '25.10.2026',
  time: '15:30',
  venue: 'Tư gia nhà trai',
  address: 'Đường 32, Xã Vật Lại, TP. Hà Nội',
  mapUrl: 'https://maps.app.goo.gl/pTBEyKMNEPoEXAsM7',
};

export const MILESTONES: Milestone[] = [
  {
    id: 'first-date',
    title: 'Buổi Hẹn Hò Đầu Tiên',
    date: '22/06/2024',
    description:
      'Một cuộc hẹn tưởng như bình thường nhưng lại mở đầu cho câu chuyện đặc biệt của chúng mình. Từ những câu chuyện không hồi kết đến những nụ cười ngại ngùng, mọi thứ bắt đầu từ đây.',
    icon: '☕',
    season: 'summer',
    scrollStart: 0,
    scrollEnd: 0.083,
    chapter: 'CHƯƠNG 01',
    year: '2024',
    image: '/images/timeline/1.jpg',
    aspectText: '1200 × 1500 px',
  },
  {
    id: 'cao-bang',
    title: 'Cao Bằng – Chuyến Đi Đầu Tiên',
    date: '02/09/2024',
    description:
      'Chuyến đi xa đầu tiên cùng nhau. Những cung đường đẹp, những khung cảnh hùng vĩ và những bức ảnh đầu tiên đã trở thành ký ức đáng nhớ của tuổi trẻ.',
    icon: '🏞️',
    season: 'autumn',
    scrollStart: 0.083,
    scrollEnd: 0.166,
    chapter: 'CHƯƠNG 02',
    year: '2024',
    image: '/images/timeline/2.jpg',
    aspectText: '1200 × 1500 px',
  },
  {
    id: 'da-lat',
    title: 'Đà Lạt Mộng Mơ',
    date: '14/12/2024',
    description:
      'Giữa tiết trời se lạnh của Đà Lạt, chúng mình cùng dạo bước qua những con dốc nhỏ, thưởng thức ly cà phê nóng và lưu giữ thật nhiều khoảnh khắc đẹp bên nhau.',
    icon: '🌲',
    season: 'winter',
    scrollStart: 0.166,
    scrollEnd: 0.249,
    chapter: 'CHƯƠNG 03',
    year: '2024',
    image: '/images/timeline/3.jpg',
    aspectText: '1200 × 1500 px',
  },
  {
    id: 'new-year',
    title: 'Đón Giao Thừa Cùng Nhau',
    date: '01/01/2025',
    description:
      'Lần đầu tiên cùng nhau bước sang một năm mới. Dưới ánh đèn và pháo hoa, chúng mình trao nhau những lời chúc và những hy vọng cho tương lai.',
    icon: '🎆',
    season: 'winter',
    scrollStart: 0.249,
    scrollEnd: 0.332,
    chapter: 'CHƯƠNG 04',
    year: '2025',
    image: '/images/timeline/4.jpg',
    aspectText: '1200 × 1500 px',
  },
  {
    id: 'birthdays',
    title: 'Sinh Nhật Của Chúng Mình',
    date: '18/01 & 30/04',
    description:
      'Từ những người xa lạ trở thành người luôn xuất hiện trong những dịp đặc biệt nhất của nhau. Hai ngày sinh nhật, hai kỷ niệm ngọt ngào và thật nhiều yêu thương.',
    icon: '🎂',
    season: 'spring',
    scrollStart: 0.332,
    scrollEnd: 0.415,
    chapter: 'CHƯƠNG 05',
    year: '2025',
    image: '/images/timeline/5.jpg',
    aspectText: '1200 × 1500 px',
  },
  {
    id: 'ly-son',
    title: 'Hội An & Lý Sơn',
    date: '28/06/2025',
    description:
      'Biển xanh, nắng vàng và những ngày rong ruổi bên nhau. Chuyến đi giúp chúng mình hiểu nhau hơn và có thêm thật nhiều câu chuyện để kể.',
    icon: '🌊',
    season: 'summer',
    scrollStart: 0.415,
    scrollEnd: 0.498,
    chapter: 'CHƯƠNG 06',
    year: '2025',
    image: '/images/timeline/6.jpg',
    aspectText: '1200 × 1500 px',
  },
  {
    id: 'concert',
    title: 'Đu Concert Cùng Nhau',
    date: '06/08/2025',
    description:
      'Giữa hàng ngàn người xa lạ, chúng mình vẫn tìm thấy nhau. Một đêm đầy âm nhạc, cảm xúc và những ký ức thanh xuân không thể nào quên.',
    icon: '🎵',
    season: 'summer',
    scrollStart: 0.498,
    scrollEnd: 0.581,
    chapter: 'CHƯƠNG 07',
    year: '2025',
    image: '/images/timeline/7.jpg',
    aspectText: '1200 × 1500 px',
  },
  {
    id: 'one-year',
    title: 'Tròn Một Năm Yêu Nhau',
    date: '12/08/2025',
    description:
      '365 ngày bên nhau với biết bao niềm vui, kỷ niệm và những lần cùng vượt qua khó khăn. Một năm không dài nhưng đủ để chúng mình hiểu rằng đây là người mình muốn đồng hành cả đời.',
    icon: '💕',
    season: 'autumn',
    scrollStart: 0.581,
    scrollEnd: 0.664,
    chapter: 'CHƯƠNG 08',
    year: '2025',
    image: '/images/timeline/8.jpg',
    aspectText: '1200 × 1500 px',
  },
  {
    id: 'sapa',
    title: 'Mùa Đông Sa Pa',
    date: '06/12/2025',
    description:
      'Những con đường mờ sương, cái lạnh vùng cao và đôi bàn tay luôn nắm chặt. Một chuyến đi khép lại năm cũ bằng những ký ức thật ấm áp.',
    icon: '🏔️',
    season: 'winter',
    scrollStart: 0.664,
    scrollEnd: 0.747,
    chapter: 'CHƯƠNG 09',
    year: '2025',
    image: '/images/timeline/9.jpg',
    aspectText: '1200 × 1500 px',
  },
  {
    id: 'nha-trang',
    title: 'Nha Trang Mùa Hè',
    date: '01/06/2026',
    description:
      'Biển xanh, cát trắng và những ngày ngập tràn tiếng cười. Chúng mình tiếp tục viết thêm những chương đẹp nhất cho câu chuyện tình yêu của mình.',
    icon: '🏖️',
    season: 'summer',
    scrollStart: 0.747,
    scrollEnd: 0.83,
    chapter: 'CHƯƠNG 10',
    year: '2026',
    image: '/images/timeline/10.jpg',
    aspectText: '1200 × 1500 px',
  },
  {
    id: 'proposal',
    title: 'Lời Cầu Hôn',
    date: '01/08/2026',
    description:
      'Sau tất cả những chuyến đi, những kỷ niệm và những tháng ngày đồng hành, anh đã hỏi câu hỏi quan trọng nhất. Và em đã mỉm cười gật đầu.',
    icon: '💍',
    season: 'summer',
    scrollStart: 0.83,
    scrollEnd: 0.913,
    chapter: 'CHƯƠNG 11',
    year: '2026',
    image: '/images/timeline/11.jpg',
    aspectText: '1200 × 1500 px',
  },
  {
    id: 'forever',
    title: 'Ngày Chúng Mình Về Chung Một Nhà',
    date: '25/10/2026',
    description:
      'Hành trình yêu thương vẫn đang tiếp tục. Và chương đẹp nhất của câu chuyện này sẽ được viết nên trong ngày trọng đại của chúng mình.',
    icon: '💒',
    season: 'spring',
    scrollStart: 0.913,
    scrollEnd: 1,
    chapter: 'CHƯƠNG 12',
    year: '2026',
    image: '/images/timeline/12.jpg',
    aspectText: '1200 × 1500 px',
  },
];

export const BANK_ACCOUNTS: BankAccount[] = [
  {
    bank: 'Vietcombank',
    accountName: 'TRAN QUANG HUY',
    accountNumber: '1234567890',
    label: 'Chú Rể',
  },
  {
    bank: 'Techcombank',
    accountName: 'VU THI NGHIA',
    accountNumber: '0987654321',
    label: 'Cô Dâu',
  },
];

export const GALLERY_IMAGES: GalleryImage[] = Array.from(
  { length: 12 },
  (_, i) => ({
    id: `gallery-${i + 1}`,
    aspectClass: [
      'aspect-[3/4]',
      'aspect-square',
      'aspect-[4/3]',
      'aspect-[3/4]',
      'aspect-square',
    ][i % 5],
    bgGradient: [
      'from-rose-200 to-amber-100',
      'from-amber-100 to-pink-100',
      'from-sky-100 to-rose-100',
      'from-pink-100 to-amber-50',
      'from-amber-50 to-rose-200',
    ][i % 5],
  }),
);

export const SOCIAL = {
  facebook: 'https://facebook.com',
  instagram: 'https://instagram.com',
  tiktok: 'https://tiktok.com',
};
