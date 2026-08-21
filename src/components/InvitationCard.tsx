import { Heart, Calendar, Clock, MapPin } from 'lucide-react';
import { BRIDE, GROOM, WEDDING_INFO } from '@/data/wedding';

export function InvitationCard() {
  return (
    <div className="max-w-md mx-auto bg-[#fffdf9]/95 backdrop-blur-md rounded-2xl border border-amber-200/80 shadow-2xl shadow-amber-950/15 overflow-hidden relative">
      {/* Gold Foil Double Border */}
      <div className="absolute inset-2.5 rounded-xl border border-amber-300/60 pointer-events-none z-20" />
      <div className="absolute inset-3.5 rounded-lg border border-amber-200/40 pointer-events-none z-20" />

      {/* Ornaments */}
      <div className="absolute top-4 left-4 text-amber-500/50 text-xs pointer-events-none z-20">✤</div>
      <div className="absolute top-4 right-4 text-amber-500/50 text-xs pointer-events-none z-20">✤</div>
      <div className="absolute bottom-4 left-4 text-amber-500/50 text-xs pointer-events-none z-20">✤</div>
      <div className="absolute bottom-4 right-4 text-amber-500/50 text-xs pointer-events-none z-20">✤</div>

      {/* Photo banner */}
      <div className="relative h-60 sm:h-72 overflow-hidden">
        <img
          src="/images/couple.jpg"
          alt="Ảnh cưới Nghĩa & Huy"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fffdf9] via-black/20 to-black/30" />
        
        <div className="absolute top-4 left-0 right-0 text-center">
          <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm text-[10px] tracking-[0.25em] uppercase text-amber-200 font-semibold border border-amber-300/30">
            Wedding Invitation
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8 text-center relative z-10 -mt-6">
        {/* Ornament */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="h-px w-10 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          <span className="text-amber-500 text-xs">✦ ✦ ✦</span>
          <div className="h-px w-10 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        </div>

        <p className="text-xs text-amber-700/80 font-['Montserrat',sans-serif] uppercase tracking-[0.25em] font-medium mb-2">
          Trân trọng kính mời
        </p>

        {/* Lời mời chân thành từ cặp đôi */}
        <p className="text-xs sm:text-[13px] text-amber-900/90 font-['Cormorant_Garamond',serif] italic leading-relaxed max-w-sm mx-auto mb-3 px-2">
          “Chúng mình sắp bắt đầu một hành trình mới cùng nhau.<br className="hidden sm:inline" />
          {' '}Niềm vui này sẽ trọn vẹn hơn khi có bạn bên cạnh.<br className="hidden sm:inline" />
          {' '}Cuộc sống quý giá không chỉ ở đích đến, mà còn ở những khoảnh khắc chia sẻ cùng nhau.<br className="hidden sm:inline" />
          {' '}Vì vậy, chúng mình mong được bạn chung vui trong ngày hạnh phúc này.”
        </p>

        {/* Names */}
        <h2 className="font-['Great_Vibes',cursive] text-3xl sm:text-4xl text-amber-950 mb-1 drop-shadow-sm">
          {BRIDE.fullName}
        </h2>
        <div className="my-1.5 flex items-center justify-center gap-3">
          <div className="h-px w-8 bg-amber-300" />
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500 inline-block" />
          <div className="h-px w-8 bg-amber-300" />
        </div>
        <h2 className="font-['Great_Vibes',cursive] text-3xl sm:text-4xl text-amber-950 mb-4 drop-shadow-sm">
          {GROOM.fullName}
        </h2>

        {/* Details */}
        <div className="space-y-2.5 mb-4">
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-gradient-to-r from-amber-50 via-amber-100/60 to-amber-50 rounded-full border border-amber-300/60 shadow-sm">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-amber-800" />
              <span className="font-['Playfair_Display',serif] text-xs sm:text-sm font-semibold text-amber-800">
                Chủ Nhật
              </span>
            </div>
            <div className="w-px h-4 bg-amber-300" />
            <span className="font-['Playfair_Display',serif] text-base sm:text-lg font-bold text-amber-950">
              {WEDDING_INFO.date}
            </span>
            <div className="w-px h-4 bg-amber-300" />
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-800" />
              <span className="font-['Playfair_Display',serif] text-xs sm:text-sm font-semibold text-amber-800">
                {WEDDING_INFO.time}
              </span>
            </div>
          </div>

          <p className="font-['Playfair_Display',serif] text-sm text-amber-900 font-medium pt-1 flex items-center justify-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
            <span>{WEDDING_INFO.venue}</span>
          </p>
          <p className="font-['Cormorant_Garamond',serif] text-xs sm:text-sm text-amber-700/80">
            {WEDDING_INFO.address}
          </p>
        </div>

        {/* Ornament Bottom */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          <span className="text-amber-500 text-xs">✦ ✦ ✦</span>
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        </div>
      </div>
    </div>
  );
}


