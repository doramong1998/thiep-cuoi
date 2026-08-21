import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Heart, User, Phone, Users, MessageSquare } from 'lucide-react';
import { generateId, saveToStorage } from '@/lib/utils';

export function RSVPForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState('1');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Vui lòng nhập họ và tên';
    if (!phone.trim()) e.phone = 'Vui lòng nhập số điện thoại';
    else if (!/^[0-9]{9,11}$/.test(phone.replace(/\s/g, ''))) e.phone = 'Số điện thoại không hợp lệ';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const record = {
      id: generateId(),
      name: name.trim(),
      phone: phone.trim(),
      guests: parseInt(guests),
      message: message.trim(),
      submittedAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem('wedding-rsvp') || '[]');
    saveToStorage('wedding-rsvp', [...existing, record]);
    setSubmitted(true);
  };

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-6 sm:py-8 flex flex-col items-center"
        >
          <div className="w-16 h-16 rounded-full bg-amber-100/90 border border-amber-300 flex items-center justify-center text-rose-500 shadow-md mb-4">
            <Heart className="w-8 h-8 fill-rose-500 animate-pulse" />
          </div>
          
          <h3 className="font-['Alex_Brush',cursive] text-4xl sm:text-5xl text-amber-950 mb-2">
            Cảm Ơn Bạn Rất Nhiều!
          </h3>
          
          <p className="font-['Cormorant_Garamond',serif] italic text-lg sm:text-xl text-amber-900/90 max-w-sm leading-relaxed mb-4">
            Lời chúc và thông tin xác nhận của bạn đã được gửi đến cô dâu & chú rể.
          </p>

          <div className="px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-['Montserrat',sans-serif]">
            Hẹn gặp bạn tại ngày vui của chúng mình nhé! ❤️
          </div>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          className="space-y-4 sm:space-y-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* Họ và tên */}
          <Field label="Họ và tên *" icon={<User className="w-3.5 h-3.5 text-amber-600" />} error={errors.name}>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors((prev) => ({ ...prev, name: '' }));
              }}
              className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white/80 border border-amber-300/70 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-300/20 text-sm text-neutral-800 placeholder:text-neutral-400 outline-none transition-all shadow-sm font-['Montserrat',sans-serif]"
              placeholder="VD: Nguyễn Văn A"
            />
          </Field>

          {/* Số điện thoại */}
          <Field label="Số điện thoại *" icon={<Phone className="w-3.5 h-3.5 text-amber-600" />} error={errors.phone}>
            <input
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setErrors((prev) => ({ ...prev, phone: '' }));
              }}
              className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white/80 border border-amber-300/70 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-300/20 text-sm text-neutral-800 placeholder:text-neutral-400 outline-none transition-all shadow-sm font-['Montserrat',sans-serif]"
              type="tel"
              placeholder="0912 345 678"
            />
          </Field>

          {/* Số người đi cùng */}
          <Field label="Số người tham dự" icon={<Users className="w-3.5 h-3.5 text-amber-600" />}>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white/80 border border-amber-300/70 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-300/20 text-sm text-neutral-800 outline-none transition-all shadow-sm font-['Montserrat',sans-serif] cursor-pointer"
            >
              <option value="1">Đi 1 mình</option>
              <option value="2">Đi 2 người</option>
              <option value="3">Đi 3 người</option>
              <option value="4">Đi cả gia đình (4+ người)</option>
            </select>
          </Field>

          {/* Lời chúc */}
          <Field label="Gửi lời chúc đến cặp đôi" icon={<MessageSquare className="w-3.5 h-3.5 text-amber-600" />}>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white/80 border border-amber-300/70 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-300/20 text-sm text-neutral-800 placeholder:text-neutral-400 outline-none transition-all shadow-sm font-['Montserrat',sans-serif] min-h-[90px] resize-none"
              placeholder="Gửi lời chúc phúc yêu thương đến hai bạn..."
            />
          </Field>

          {/* Nút gửi màu vàng kim nhẹ nhàng, thanh thoát */}
          <button
            type="submit"
            className="w-full py-3.5 sm:py-4 px-6 rounded-full bg-gradient-to-r from-[#dfad5b] via-[#cd9542] to-[#b87c2f] hover:brightness-105 text-white font-['Montserrat',sans-serif] font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg shadow-amber-700/15 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border border-amber-200/70 mt-3"
          >
            <Send className="w-4 h-4 text-amber-100" />
            <span>Gửi Xác Nhận Tham Dự</span>
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  icon,
  error,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 mb-1.5 text-xs font-semibold text-amber-900 font-['Montserrat',sans-serif]">
        {icon}
        <span>{label}</span>
      </label>
      {children}
      {error && (
        <p className="mt-1 text-xs text-rose-500 font-['Montserrat',sans-serif] font-medium pl-1">
          {error}
        </p>
      )}
    </div>
  );
}

