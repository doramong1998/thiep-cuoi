import type { Milestone, BankAccount, GalleryImage } from '@/types';

export const WEDDING_DATE = '2026-10-25T10:00:00+07:00';

export const BRIDE = {
  firstName: 'Nghĩa',
  fullName: 'Vũ Thị Nghĩa',
  displayName: 'THANH HẰNG', // or VŨ THỊ NGHĨA
  rank: 'Ái Nữ',
  birthDate: '20.08.2001',
};

export const GROOM = {
  firstName: 'Huy',
  fullName: 'Trần Quang Huy',
  displayName: 'MINH TRÍ', // or TRẦN QUANG HUY
  rank: 'Trưởng Nam',
  birthDate: '06.05.1998',
};

export const GROOM_FAMILY = {
  title: 'NHÀ TRAI',
  father: 'Trần Văn Cường',
  mother: 'Nguyễn Thị Lan',
  groom: 'Trần Quang Huy',
  rank: 'Trưởng Nam',
  address: 'Số 123, Đường ABC, Quận Cầu Giấy, TP. Hà Nội',
  phone: '0912 345 678',
  mapUrl: 'https://maps.google.com/?q=Hà+Nội',
};

export const BRIDE_FAMILY = {
  title: 'NHÀ GÁI',
  father: 'Vũ Văn Hùng',
  mother: 'Phạm Thị Mai',
  bride: 'Vũ Thị Nghĩa',
  rank: 'Ái Nữ',
  address: 'Số 456, Đường DEF, Quận Ba Đình, TP. Hà Nội',
  phone: '0987 654 321',
  mapUrl: 'https://maps.google.com/?q=Hà+Nội',
};

export const WEDDING_INFO = {
  date: '25.10.2026',
  time: '10:00',
  venue: 'Tư gia nhà trai',
  address: 'Số 123, Đường ABC, Quận Cầu Giấy, TP. Hà Nội',
  mapUrl: 'https://maps.google.com/?q=Hà+Nội',
};

export const MILESTONES: Milestone[] = [
  {
    id: 'first-meet',
    title: 'Lần Đầu Gặp Nhau',
    date: 'Tháng 3, 2020',
    description: 'Chúng mình gặp nhau lần đầu tại buổi tiệc sinh nhật bạn chung. Một ánh mắt, một nụ cười — và mọi thứ bắt đầu từ đây.',
    icon: '✨',
    season: 'spring',
    scrollStart: 0,
    scrollEnd: 0.17,
  },
  {
    id: 'first-date',
    title: 'Buổi Hẹn Đầu Tiên',
    date: 'Tháng 5, 2020',
    description: 'Quán cà phê nhỏ góc phố, hai ly cappuccino, và một buổi chiều không muốn kết thúc. Anh biết em là người đặc biệt.',
    icon: '☕',
    season: 'spring',
    scrollStart: 0.17,
    scrollEnd: 0.33,
  },
  {
    id: 'first-trip',
    title: 'Chuyến Du Lịch Đầu Tiên',
    date: 'Tháng 7, 2021',
    description: 'Đà Lạt — thành phố mộng mơ. Cùng nhau đạp xe dưới hàng thông, chia nhau ly sữa đậu nành nóng buổi sáng sớm.',
    icon: '🌄',
    season: 'summer',
    scrollStart: 0.33,
    scrollEnd: 0.50,
  },
  {
    id: 'confession',
    title: 'Tỏ Tình',
    date: 'Tháng 10, 2021',
    description: '"Em có muốn làm người yêu anh không?" — Dưới tán lá vàng mùa thu, em gật đầu và nước mắt hạnh phúc rơi.',
    icon: '💕',
    season: 'autumn',
    scrollStart: 0.50,
    scrollEnd: 0.67,
  },
  {
    id: 'proposal',
    title: 'Cầu Hôn',
    date: 'Tháng 12, 2025',
    description: 'Đêm Giáng sinh, tuyết rơi nhẹ. Anh quỳ gối, mở chiếc hộp nhỏ: "Anh muốn ở bên em cả đời." Em nói: "Có!"',
    icon: '💍',
    season: 'winter',
    scrollStart: 0.67,
    scrollEnd: 0.83,
  },
  {
    id: 'wedding-prep',
    title: 'Chuẩn Bị Đám Cưới',
    date: 'Tháng 6, 2026',
    description: 'Chọn áo cưới, trang trí hoa, viết thiệp mời... Mỗi chi tiết nhỏ đều chứa đựng tình yêu lớn lao dành cho nhau.',
    icon: '💒',
    season: 'spring',
    scrollStart: 0.83,
    scrollEnd: 1.0,
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

export const GALLERY_IMAGES: GalleryImage[] = Array.from({ length: 12 }, (_, i) => ({
  id: `gallery-${i + 1}`,
  aspectClass: ['aspect-[3/4]', 'aspect-square', 'aspect-[4/3]', 'aspect-[3/4]', 'aspect-square'][i % 5],
  bgGradient: [
    'from-rose-200 to-amber-100',
    'from-amber-100 to-pink-100',
    'from-sky-100 to-rose-100',
    'from-pink-100 to-amber-50',
    'from-amber-50 to-rose-200',
  ][i % 5],
}));

export const SOCIAL = {
  facebook: 'https://facebook.com',
  instagram: 'https://instagram.com',
  tiktok: 'https://tiktok.com',
};
