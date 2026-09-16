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
      'Một buổi hẹn hò tưởng chừng rất bình thường, nhưng lại là khoảnh khắc cuộc sống của hai người bắt đầu giao nhau. Từ những câu chuyện còn ngập ngừng đến những nụ cười chẳng muốn kết thúc, chúng mình đã vô tình bước vào câu chuyện đẹp nhất của tuổi trẻ.',
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
    title: 'Chuyến Đi Đầu Tiên Của Hai Đứa',
    date: '02/09/2024',
    description:
      'Lần đầu cùng nhau đi xa, cùng ngắm những cung đường mới và những khung cảnh chưa từng thấy. Cao Bằng không chỉ là một chuyến du lịch, mà còn là nơi lưu giữ những ký ức đầu tiên của hai đứa trên hành trình yêu thương.',
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
    title: 'Có Một Đà Lạt Của Riêng Chúng Mình',
    date: '14/12/2024',
    description:
      'Giữa những cơn mưa lất phất và tiết trời se lạnh của Đà Lạt, chúng mình cùng đi qua những con dốc nhỏ, cùng chia sẻ những câu chuyện rất dài và những khoảnh khắc rất yên bình. Đó là lần đầu tiên cảm nhận rõ rằng chỉ cần ở cạnh nhau, nơi nào cũng trở nên đặc biệt.',
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
    title: 'Khoảnh Khắc Bước Sang Năm Mới',
    date: '01/01/2025',
    description:
      'Giữa ánh đèn rực rỡ và những chùm pháo hoa trên bầu trời, chúng mình cùng đếm ngược những giây cuối cùng của năm cũ. Lần đầu tiên đón giao thừa cùng nhau, và cũng là lần đầu tiên mong rằng mọi năm sau đều sẽ có đối phương bên cạnh.',
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
    title: 'Những Ngày Đặc Biệt Của Chúng Mình',
    date: '18/01 & 30/04',
    description:
      'Từ người xa lạ trở thành người đầu tiên muốn gặp trong ngày sinh nhật. Những món quà, những lời chúc và cả sự hiện diện của nhau đã khiến những ngày đặc biệt ấy trở nên ý nghĩa hơn bao giờ hết.',
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
    title: 'Nắng Gió Hội An & Lý Sơn',
    date: '28/06/2025',
    description:
      'Những con phố vàng, những bãi biển xanh và những ngày rong ruổi không cần vội vã. Chúng mình đã cùng nhau lưu giữ thêm thật nhiều kỷ niệm, để rồi nhận ra rằng điều đẹp nhất trong mỗi chuyến đi không phải là điểm đến, mà là người đồng hành.',
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
    title: 'Thanh Xuân Rực Rỡ',
    date: '06/08/2025',
    description:
      'Giữa hàng ngàn người xa lạ và những giai điệu vang lên trong đêm, chúng mình vẫn nắm chặt tay nhau. Một đêm của âm nhạc, của cảm xúc và của những ký ức mà sau này nhắc lại, cả hai sẽ luôn mỉm cười.',
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
    title: '365 Ngày Yêu Thương',
    date: '12/08/2025',
    description:
      'Một năm không quá dài, nhưng đủ để chúng mình đi qua rất nhiều điều cùng nhau. Có những ngày vui vẻ, có những lúc giận hờn, nhưng sau tất cả, điều quý giá nhất vẫn là chúng mình chưa từng buông tay nhau.',
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
    title: 'Mùa Đông Và Những Cái Nắm Tay',
    date: '06/12/2025',
    description:
      'Giữa màn sương của Sa Pa và cái lạnh vùng cao, đôi bàn tay vẫn tìm thấy nhau giữa dòng người. Một chuyến đi cuối năm không chỉ lưu giữ những khung hình đẹp, mà còn lưu giữ thật nhiều cảm xúc ấm áp.',
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
    title: 'Mùa Hè Của Chúng Mình',
    date: '01/06/2026',
    description:
      'Biển xanh, cát trắng và những tiếng cười không ngớt. Thêm một chuyến đi, thêm một mùa hè cùng nhau, và thêm một chương thật đẹp được viết tiếp trong cuốn nhật ký tình yêu của hai đứa.',
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
    title: 'Lời Hứa Cho Cả Một Đời',
    date: '01/08/2026',
    description:
      'Sau tất cả những chuyến đi, những kỷ niệm và những tháng ngày đồng hành, anh đã lấy hết can đảm để hỏi câu hỏi quan trọng nhất cuộc đời. Và trong khoảnh khắc em mỉm cười gật đầu, tương lai của chúng mình đã chính thức bắt đầu.',
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
    title: 'Về Chung Một Nhà',
    date: '25/10/2026',
    description:
      'Từ hai người xa lạ trở thành một phần không thể thiếu trong cuộc sống của nhau. Hôm nay không phải là điểm kết thúc của hành trình yêu thương, mà là ngày chúng mình cùng mở ra chương mới đẹp nhất — chương mang tên gia đình.',
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
