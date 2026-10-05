import { useState } from 'react';
import { Copy, Check, Link2, Sparkles, Users } from 'lucide-react';

const BASE_URL = 'https://huynghiawedding.vercel.app';

// Chỉ encode các ký tự đặc biệt của URL (giữ nguyên tiếng Việt cho dễ đọc)
// Ví dụ: "Bạn Hiếu và Gia đình" -> "Bạn%20Hiếu%20và%20Gia%20đình"
function encodeName(name: string): string {
  return name.trim().replace(/[\s%&#?+=/\\]/g, (c) => (c === ' ' ? '%20' : encodeURIComponent(c)));
}

function getInitialGuestMode(): boolean {
  if (typeof window === 'undefined') return false;
  return new URLSearchParams(window.location.search).get('type') === 'khachmoi';
}

interface GeneratedLink {
  name: string;
  url: string;
}

export function GenLinkPage() {
  const [input, setInput] = useState('');
  const [isGuest, setIsGuest] = useState<boolean>(getInitialGuestMode);
  const [links, setLinks] = useState<GeneratedLink[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | 'all' | null>(null);

  const toggleGuest = () => {
    const next = !isGuest;
    setIsGuest(next);
    // Đồng bộ trạng thái switch lên URL (?type=khachmoi)
    const url = new URL(window.location.href);
    if (next) url.searchParams.set('type', 'khachmoi');
    else url.searchParams.delete('type');
    window.history.replaceState(null, '', url.toString());
    // Re-gen nếu đã có kết quả
    if (links.length) setLinks(buildLinks(input, next));
  };

  const buildLinks = (text: string, guest: boolean): GeneratedLink[] => {
    const path = guest ? '/khachmoi' : '/';
    return text
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
      .map((name) => ({ name, url: `${BASE_URL}${path}?name=${encodeName(name)}` }));
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setLinks(buildLinks(input, isGuest));
    setCopiedIndex(null);
  };

  const copy = async (text: string, key: number | 'all') => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopiedIndex(key);
    setTimeout(() => setCopiedIndex((cur) => (cur === key ? null : cur)), 1500);
  };

  const lineCount = input.split('\n').filter((l) => l.trim()).length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FFF8F0] via-[#FDEFE6] to-[#F7E1D7] px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white/70 shadow-md ring-1 ring-[#E8D4B0]">
            <Link2 className="h-6 w-6 text-[#B8960F]" />
          </div>
          <h1 className="text-4xl font-semibold tracking-wide text-[#5B3A1A] sm:text-5xl">Tạo link mời cưới</h1>
          <p className="mt-2 text-lg text-[#8B6B4A]">Mỗi dòng là một tên khách mời</p>
        </header>

        <form
          onSubmit={handleGenerate}
          className="rounded-2xl bg-white/70 p-5 shadow-xl ring-1 ring-[#E8D4B0] backdrop-blur-md sm:p-7"
        >
          {/* Switch khách mời */}
          <div className="mb-5 flex items-center justify-between rounded-xl bg-[#FFF8F0] px-4 py-3 ring-1 ring-[#F0E0C8]">
            <label htmlFor="guest-switch" className="flex cursor-pointer items-center gap-2 text-lg text-[#5B3A1A]">
              <Users className="h-5 w-5 text-[#B8960F]" />
              Khách mời
              <span className="text-sm text-[#A08060]">({isGuest ? '/khachmoi' : '/'})</span>
            </label>
            <button
              id="guest-switch"
              type="button"
              role="switch"
              aria-checked={isGuest}
              onClick={toggleGuest}
              className={`relative h-7 w-12 rounded-full transition-colors duration-300 ${
                isGuest ? 'bg-[#D4AF37]' : 'bg-[#E0D2BF]'
              }`}
            >
              <span
                className={`absolute top-1 left-1 h-5 w-5 rounded-full bg-white shadow transition-transform duration-300 ${
                  isGuest ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <textarea
            id="names-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={8}
            placeholder={'Bạn Hiếu và Gia đình\nAnh Nam và Người thương\n...'}
            className="pixel-input min-h-[180px] resize-y text-lg leading-relaxed"
          />

          <div className="mt-4 flex items-center justify-between gap-3">
            <span className="text-sm text-[#A08060]">{lineCount} tên</span>
            <button
              id="generate-btn"
              type="submit"
              disabled={!lineCount}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C9925E] px-6 py-2.5 text-lg font-semibold text-white shadow-lg transition hover:scale-[1.03] hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
            >
              <Sparkles className="h-5 w-5" />
              Gen link
            </button>
          </div>
        </form>

        {links.length > 0 && (
          <section className="mt-8 rounded-2xl bg-white/70 p-5 shadow-xl ring-1 ring-[#E8D4B0] backdrop-blur-md sm:p-7">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-[#5B3A1A]">Kết quả ({links.length})</h2>
              <button
                id="copy-all-btn"
                type="button"
                onClick={() => copy(links.map((l) => `${l.name}: ${l.url}`).join('\n'), 'all')}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF8F0] px-4 py-1.5 text-sm font-semibold text-[#8B6B4A] ring-1 ring-[#E8D4B0] transition hover:bg-[#FDEFE6]"
              >
                {copiedIndex === 'all' ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                Copy tất cả
              </button>
            </div>

            <ul className="space-y-3">
              {links.map((l, i) => (
                <li key={i} className="flex items-center gap-3 rounded-xl bg-[#FFF8F0] p-3 ring-1 ring-[#F0E0C8]">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-lg font-semibold text-[#5B3A1A]">{l.name}</p>
                    <a
                      href={l.url}
                      target="_blank"
                      rel="noreferrer"
                      className="block truncate font-mono text-xs text-[#B8960F] hover:underline"
                    >
                      {l.url}
                    </a>
                  </div>
                  <button
                    id={`copy-btn-${i}`}
                    type="button"
                    onClick={() => copy(l.url, i)}
                    className="shrink-0 rounded-lg p-2 text-[#8B6B4A] transition hover:bg-white"
                    aria-label={`Copy link cho ${l.name}`}
                  >
                    {copiedIndex === i ? <Check className="h-5 w-5 text-green-600" /> : <Copy className="h-5 w-5" />}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
