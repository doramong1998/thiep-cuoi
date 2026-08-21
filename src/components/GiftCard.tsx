import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, QrCode, User } from 'lucide-react';
import { BANK_ACCOUNTS } from '@/data/wedding';
import { copyToClipboard } from '@/lib/utils';
import { PixelButton } from './PixelButton';

export function GiftCard() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (accountNumber: string) => {
    const ok = await copyToClipboard(accountNumber);
    if (ok) {
      setCopiedId(accountNumber);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto">
      {BANK_ACCOUNTS.map((account, i) => (
        <motion.div
          key={account.accountNumber}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.15 }}
          viewport={{ once: true }}
          className="bg-amber-50/90 backdrop-blur-sm rounded-xl border-2 border-amber-200 p-5 text-center shadow-lg"
        >
          <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800">
            <User className="w-5 h-5" />
          </div>
          <p className="text-xs font-mono text-amber-500 uppercase tracking-wider mb-3">
            {account.label}
          </p>

          {/* QR Placeholder */}
          <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-amber-100 to-pink-50 rounded-lg border-2 border-dashed border-amber-300 flex flex-col items-center justify-center text-amber-600 gap-1">
            <QrCode className="w-10 h-10" />
            <span className="text-[10px] font-mono">Mã QR</span>
          </div>

          <p className="font-mono text-xs text-amber-600">{account.bank}</p>
          <p className="font-['Playfair_Display',serif] text-sm font-bold text-amber-900 mt-1">
            {account.accountName}
          </p>
          <p className="font-mono text-lg font-bold text-amber-800 tracking-wider mt-1 mb-3">
            {account.accountNumber}
          </p>

          <PixelButton
            variant="secondary"
            className="text-[10px] w-full"
            onClick={() => handleCopy(account.accountNumber)}
          >
            <span className="flex items-center justify-center gap-1.5">
              {copiedId === account.accountNumber ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Đã copy STK!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy STK</span>
                </>
              )}
            </span>
          </PixelButton>
        </motion.div>
      ))}
    </div>
  );
}

