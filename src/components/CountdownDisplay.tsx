import { useCountdown } from '@/hooks/useCountdown';
import { WEDDING_DATE } from '@/data/wedding';

export function CountdownDisplay() {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(WEDDING_DATE);

  if (isExpired) {
    return (
      <div className="text-center">
        <p className="font-['Playfair_Display',serif] text-2xl sm:text-4xl text-amber-800 italic">
          Today is our wedding day
        </p>
        <span className="text-4xl inline-block mt-2 animate-bounce">❤️</span>
      </div>
    );
  }

  const units = [
    { value: days, label: 'Ngày' },
    { value: hours, label: 'Giờ' },
    { value: minutes, label: 'Phút' },
    { value: seconds, label: 'Giây' },
  ];

  return (
    <div className="flex justify-center gap-3 sm:gap-5">
      {units.map(({ value, label }) => (
        <div key={label} className="text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-white/80 backdrop-blur-md border border-amber-300/80 rounded-2xl shadow-[0_8px_20px_-5px_rgba(140,90,40,0.12)]">
            <span className="font-['Playfair_Display',serif] text-2xl sm:text-3xl font-bold text-amber-950">
              {String(value).padStart(2, '0')}
            </span>
          </div>
          <span className="block mt-2 text-xs font-['Montserrat',sans-serif] font-medium text-amber-800 tracking-wider">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
