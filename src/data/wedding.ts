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
  address: 'Số 12 Ngõ 155 Đường 32, Xã Vật Lại, TP.Hà Nội',
  phone: '0978727524',
  mapUrl: 'https://maps.app.goo.gl/z2aQin6N1gAjdFbU9',
};

export const BRIDE_FAMILY = {
  title: 'NHÀ GÁI',
  father: 'Vũ Song Hào',
  mother: 'Nguyễn Thị Yến',
  bride: 'Vũ Thị Nghĩa',
  rank: 'Ái Nữ',
  address: 'Thôn Trung Tiến, xã Ngọc Thiện, TP.Bắc Ninh',
  phone: '0981384115',
  mapUrl: 'https://maps.app.goo.gl/3jSpHTNjVX5Rv4je6',
};

export const WEDDING_INFO = {
  date: '25.10.2026',
  time: '15:30',
  venue: 'Tư gia nhà trai',
  address: 'Thôn Đồng Bảng, xã Vật Lại, TP.Hà Nội',
  mapUrl: 'https://maps.app.goo.gl/pTBEyKMNEPoEXAsM7',
};

export const INVITATION_INFO = {
  groom: {
    title: 'TIỆC CƯỚI NHÀ TRAI',
    time: 'Thứ bảy - 15:30',
    date: '24 . 10 . 2026',
    lunarDate: 'Tức Ngày 15 tháng 09 năm Bính Ngọ',
    venue: 'TẠI NHÀ HÀNG PHƯỢNG ỚT',
    address: 'Thôn Đồng Bảng, xã Vật Lại, TP.Hà Nội',
    mapUrl: 'https://maps.app.goo.gl/pTBEyKMNEPoEXAsM7',
  },
  bride: {
    title: 'TIỆC CƯỚI NHÀ GÁI',
    time: 'Thứ bảy - 16:00',
    date: '24 . 10 . 2026',
    lunarDate: 'Tức Ngày 15 tháng 09 năm Bính Ngọ',
    venue: 'TẠI TƯ GIA NHÀ GÁI',
    address: BRIDE_FAMILY.address,
    mapUrl: BRIDE_FAMILY.mapUrl,
  },
};

export const MILESTONES: Milestone[] = [
  {
    id: 'ba-vi-picnic',
    title: 'Ba Vì',
    date: '2024',
    description:
      'Một buổi picnic giản dị ở Ba Vì, giữa gió trời và cỏ xanh. Ngập ngừng một chút, rồi bàn tay tìm thấy nhau. Hành trình của chúng mình bắt đầu từ đó.',
    icon: '🧺',
    season: 'summer',
    scrollStart: 0,
    scrollEnd: 0.067,
    year: '2024',
    image: '/images/timeline/1.jpg',
    aspectText: '1200 × 1500 px',
  },
  {
    id: 'cao-bang',
    title: 'Cao Bằng',
    date: '2024',
    description:
      'Ngày 2/9, lá cờ đỏ sao vàng trên mũ bảo hiểm theo chúng mình suốt cung đường. Những con đường đèo quanh co, thác Bản Giốc nước tung trắng xoá, suối Lênin êm đềm trôi, đồi cỏ xanh mướt trải dài tít tắp. Lần đầu đi xa cùng nhau và hành trình thật đẹp khi có em phía sau.',
    icon: '🏍️',
    season: 'autumn',
    scrollStart: 0.067,
    scrollEnd: 0.133,
    year: '2024',
    image: '/images/timeline/2.jpg',
    aspectText: '1200 × 1500 px',
  },
  {
    id: 'hoa-binh',
    title: 'Hoà Bình',
    date: '2024',
    description:
      'Không khí trong lành, tiếng suối róc rách, tiếng chim hót líu lo. Một chuyến đi healing giữa thiên nhiên, chỉ có em và anh và những giây phút bình yên.',
    icon: '🌿',
    season: 'autumn',
    scrollStart: 0.133,
    scrollEnd: 0.2,
    year: '2024',
    image: '/images/timeline/3.jpg',
    aspectText: '1200 × 1500 px',
  },
  {
    id: 'da-lat',
    title: 'Đà Lạt',
    date: '2024',
    description:
      'Cái se lạnh, ly cà phê nóng, chiều lượn hồ Xuân Hương, đêm dạo chợ đêm. Đồi cỏ hồng, đoàn tàu chầm chậm lướt qua. Đà Lạt dạy mình rằng bên nhau thì nơi nào cũng nên thơ.',
    icon: '🌲',
    season: 'winter',
    scrollStart: 0.2,
    scrollEnd: 0.267,
    year: '2024',
    image: '/images/timeline/4.jpg',
    aspectText: '1200 × 1500 px',
  },
  {
    id: 'bac-giang',
    title: 'Bắc Giang',
    date: '2025',
    description:
      'Một chuyến về Bắc Giang với chút hồi hộp, một buổi cà phê chill chill và những nụ cười được đón nhận. Từ đây, chúng mình không chỉ là của nhau mà còn là một phần của hai gia đình.',
    icon: '🏡',
    season: 'spring',
    scrollStart: 0.267,
    scrollEnd: 0.333,
    year: '2025',
    image: '/images/timeline/5.jpg',
    aspectText: '1200 × 1500 px',
  },
  {
    id: 'tam-dao',
    title: 'Tam Đảo',
    date: '2025',
    description:
      'Ăn uống, cà phê, BBQ và những ván ma sói thâu đêm. Em hòa vào hội bạn của anh như đã quen từ lâu, và cả nhóm cười không ngớt.',
    icon: '🔥',
    season: 'summer',
    scrollStart: 0.333,
    scrollEnd: 0.4,
    year: '2025',
    image: '/images/timeline/6.jpg',
    aspectText: '1200 × 1500 px',
  },
  {
    id: 'soc-son',
    title: 'Sóc Sơn',
    date: '2025',
    description:
      'Đến lượt anh bước vào thế giới bạn bè của em. Một villa đầy tiếng cười, thịt nướng thơm lừng và những buổi chèo SUP lênh đênh. Được bạn bè em quý mến, anh thấy mình thật may mắn.',
    icon: '🏊',
    season: 'summer',
    scrollStart: 0.4,
    scrollEnd: 0.467,
    year: '2025',
    image: '/images/timeline/7.jpg',
    aspectText: '1200 × 1500 px',
  },
  {
    id: 'da-nang',
    title: 'Đà Nẵng',
    date: '2025',
    description:
      'Một chuyến đi ngắn nhưng đầy ắp kỷ niệm. Chúng mình cùng nhau đi dọc con phố, ngắm cầu Rồng, thưởng thức những món đặc sản Đà Nẵng và khóa lại chiếc móc khóa tình yêu trên cầu Tình Yêu. Tất cả những khoảnh khắc ấy sẽ mãi là dấu ấn khó phai trong trái tim chúng mình.',
    icon: '🔒',
    season: 'summer',
    scrollStart: 0.467,
    scrollEnd: 0.533,
    year: '2025',
    image: '/images/timeline/8.jpg',
    aspectText: '1200 × 1500 px',
  },
  {
    id: 'hoi-an',
    title: 'Hội An',
    date: '2025',
    description:
      'Chẳng có trong lịch trình, nhưng Hội An đẹp quá nên chúng mình ở lại thêm một ngày. Một chiếc bánh mỳ chia đôi, một đĩa cơm gà ú nụ đủ lấp đi chiếc bụng đói sau một ngày lang thang. Về đêm, ngồi trên thuyền, thả hoa đăng trôi nhẹ theo dòng sông, đem theo những mong ước của chúng mình. Đôi khi những quyết định bất ngờ lại là điều tuyệt vời nhất.',
    icon: '🏮',
    season: 'summer',
    scrollStart: 0.533,
    scrollEnd: 0.6,
    year: '2025',
    image: '/images/timeline/9.jpg',
    aspectText: '1200 × 1500 px',
  },
  {
    id: 'ly-son',
    title: 'Lý Sơn',
    date: '2025',
    description:
      'Cát trắng, nắng vàng, biển xanh. Chúng mình cùng nhau ngắm bình minh trên đỉnh núi Thới Lới, nhặt vỏ ốc và đi săn đêm cùng lũ trẻ trên đảo. Một Lý Sơn hoang sơ và đẹp đến mức chỉ muốn ở lại mãi.',
    icon: '🌅',
    season: 'summer',
    scrollStart: 0.6,
    scrollEnd: 0.667,
    year: '2025',
    image: '/images/timeline/10.jpg',
    aspectText: '1200 × 1500 px',
  },
  {
    id: 'ha-long',
    title: 'Hạ Long',
    date: '2025',
    description:
      'Trời hơi mưa, nhịp chân cũng chậm lại. Nhưng chúng mình vẫn đứng cạnh nhau ngắm pháo hoa trên vịnh. Một chuyến đi chill và dịu dàng.',
    icon: '🎆',
    season: 'autumn',
    scrollStart: 0.667,
    scrollEnd: 0.733,
    year: '2025',
    image: '/images/timeline/11.jpg',
    aspectText: '1200 × 1500 px',
  },
  {
    id: 'ba-vi-wedding',
    title: 'Ba Vì Lần Thứ N',
    date: '2025',
    description:
      'Lại là Ba Vì, nhưng lần này là đám cưới của người bạn thân. Mâm cỗ quê rôm rả, những lần ra mắt bạn bè, và tiếng chúc mừng đôi uyên ương. Chút vía hạnh phúc của ngày vui ấy, chúng mình xin mang về nhà.',
    icon: '💐',
    season: 'autumn',
    scrollStart: 0.733,
    scrollEnd: 0.8,
    year: '2025',
    image: '/images/timeline/12.jpg',
    aspectText: '1200 × 1500 px',
  },
  {
    id: 'sapa',
    title: 'Sa Pa',
    date: '2025',
    description:
      'Một chuyến đi giữa thời tiết mưa lất phất, hai trái tim ấm áp bên nhau, chẳng còn ai thấy lạnh. Chỉ vì em muốn đi, nên mình đi: qua phố núi mờ sương, hoa anh đào hồng rực một góc trời, bản Cát Cát lặng lẽ bên dòng suối, đèo Ô Quy Hồ hùng vĩ. Hóa ra mùa đông đẹp nhất là mùa đông có nhau.',
    icon: '🌸',
    season: 'winter',
    scrollStart: 0.8,
    scrollEnd: 0.867,
    year: '2025',
    image: '/images/timeline/13.jpg',
    aspectText: '1200 × 1500 px',
  },
  {
    id: 'nha-trang',
    title: 'Nha Trang',
    date: '2026',
    description:
      'Trên chiếc cano phóng ra đảo giữa mưa gió, hai đứa ướt sũng mà vẫn cười. Cùng lặn ngắm san hô, cùng hét thật to trên những trò cảm giác mạnh ở VinWonders, cùng chạy ra biển như hai đứa trẻ. Có em bên cạnh, mưa gió cũng thành kỷ niệm.',
    icon: '🤿',
    season: 'summer',
    scrollStart: 0.867,
    scrollEnd: 0.933,
    year: '2026',
    image: '/images/timeline/14.jpg',
    aspectText: '1200 × 1500 px',
  },
  {
    id: 'ta-xua',
    title: 'Tà Xùa',
    date: '2026',
    description:
      'Giữa núi rừng bao la và gió trời Tà Xùa, anh nắm tay em và hỏi câu anh đã giữ trong lòng từ lâu. Em mỉm cười, nói đồng ý. Khoảnh khắc ấy, đất trời như lặng đi để chứng kiến, và hành trình của chúng mình sang một trang mới.',
    icon: '💍',
    season: 'autumn',
    scrollStart: 0.933,
    scrollEnd: 1,
    year: '2026',
    image: '/images/timeline/15.jpg',
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

export const GALLERY_IMAGES: GalleryImage[] = [
  // --- Hong Kong series ---
  {
    id: 'gallery-1',
    src: '/images/album/hongkong1.jpg',
    aspectClass: 'aspect-[3/4]',
    bgGradient: 'from-rose-200 to-amber-100',
  },
  {
    id: 'gallery-2',
    src: '/images/album/hongkong2.jpg',
    aspectClass: 'aspect-[3/4]',
    bgGradient: 'from-amber-100 to-pink-100',
  },
  {
    id: 'gallery-3',
    src: '/images/album/hongkong3.jpg',
    aspectClass: 'aspect-[3/4]',
    bgGradient: 'from-sky-100 to-rose-100',
  },
  {
    id: 'gallery-4',
    src: '/images/album/hongkong4.jpg',
    aspectClass: 'aspect-[3/4]',
    bgGradient: 'from-pink-100 to-amber-50',
  },
  {
    id: 'gallery-5',
    src: '/images/album/hongkong5.jpg',
    aspectClass: 'aspect-[3/4]',
    bgGradient: 'from-amber-50 to-rose-200',
  },
  // --- Áo dài series ---
  {
    id: 'gallery-6',
    src: '/images/album/aodai1.jpg',
    aspectClass: 'aspect-[4/3]', // ngang
    bgGradient: 'from-rose-200 to-amber-100',
  },
  {
    id: 'gallery-7',
    src: '/images/album/aodai2.jpg',
    aspectClass: 'aspect-[3/4]',
    bgGradient: 'from-amber-100 to-pink-100',
  },
  {
    id: 'gallery-8',
    src: '/images/album/aodai3.jpg',
    aspectClass: 'aspect-[3/4]',
    bgGradient: 'from-sky-100 to-rose-100',
  },
  {
    id: 'gallery-9',
    src: '/images/album/aodai4.jpg',
    aspectClass: 'aspect-[3/4]',
    bgGradient: 'from-pink-100 to-amber-50',
  },
  {
    id: 'gallery-10',
    src: '/images/album/aodai5.jpg',
    aspectClass: 'aspect-[3/4]',
    bgGradient: 'from-amber-50 to-rose-200',
  },
  {
    id: 'gallery-11',
    src: '/images/album/aodai6.jpg',
    aspectClass: 'aspect-[4/3]', // ngang
    bgGradient: 'from-rose-200 to-amber-100',
  },
  {
    id: 'gallery-12',
    src: '/images/album/aodai7.jpg',
    aspectClass: 'aspect-[4/3]', // ngang
    bgGradient: 'from-amber-100 to-pink-100',
  },
  {
    id: 'gallery-13',
    src: '/images/album/aodai8.jpg',
    aspectClass: 'aspect-[3/4]',
    bgGradient: 'from-sky-100 to-rose-100',
  },
  {
    id: 'gallery-14',
    src: '/images/album/aodai9.jpg',
    aspectClass: 'aspect-[3/4]',
    bgGradient: 'from-pink-100 to-amber-50',
  },
  {
    id: 'gallery-15',
    src: '/images/album/aodai10.jpg',
    aspectClass: 'aspect-[3/4]',
    bgGradient: 'from-amber-50 to-rose-200',
  },
  // --- Studio series ---
  {
    id: 'gallery-16',
    src: '/images/album/stu1.jpg',
    aspectClass: 'aspect-[3/4]',
    bgGradient: 'from-rose-200 to-amber-100',
  },
  {
    id: 'gallery-17',
    src: '/images/album/stu2.jpg',
    aspectClass: 'aspect-[3/4]',
    bgGradient: 'from-amber-100 to-pink-100',
  },
  {
    id: 'gallery-18',
    src: '/images/album/stu3.jpg',
    aspectClass: 'aspect-[3/4]',
    bgGradient: 'from-sky-100 to-rose-100',
  },
  {
    id: 'gallery-19',
    src: '/images/album/stu4.jpg',
    aspectClass: 'aspect-[3/4]',
    bgGradient: 'from-pink-100 to-amber-50',
  },
  {
    id: 'gallery-20',
    src: '/images/album/stu5.jpg',
    aspectClass: 'aspect-[4/3]', // ngang
    bgGradient: 'from-amber-50 to-rose-200',
  },
  {
    id: 'gallery-21',
    src: '/images/album/stu6.jpg',
    aspectClass: 'aspect-[3/4]',
    bgGradient: 'from-rose-200 to-amber-100',
  },
];

export const SOCIAL = {
  facebook: 'https://facebook.com',
  instagram: 'https://instagram.com',
  tiktok: 'https://tiktok.com',
};
