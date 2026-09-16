import { useState, useEffect } from 'react';
import { DreamyMeadowAtmosphere } from '@/components/DreamyMeadowAtmosphere';
import { MusicFloatingButton } from '@/components/MusicFloatingButton';
import { MailboxScene } from '@/scenes/MailboxScene';
import { LetterScene } from '@/scenes/LetterScene';
import { CountdownScene } from '@/scenes/CountdownScene';
import { JourneyScene } from '@/scenes/JourneyScene';
import { GalleryScene } from '@/scenes/GalleryScene';
import { GiftScene } from '@/scenes/GiftScene';

function App() {
  const [scrollUnlocked, setScrollUnlocked] = useState(false);

  // Khóa cuộn trang cho đến khi người dùng lật xem mặt sau thiệp cưới
  useEffect(() => {
    if (!scrollUnlocked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [scrollUnlocked]);

  const handleCardFlipped = () => {
    setScrollUnlocked(true);
  };

  return (
    <div className="relative min-h-screen">
      {/* Background bức tranh thảo nguyên vườn hoa và animation hoa lá bay thơ mộng */}
      <DreamyMeadowAtmosphere />

      {/* Scene 1: Envelope & 3D Flip Card */}
      <MailboxScene onFlip={handleCardFlipped} />

      {/* Remaining sections — visible but scroll locked until envelope opens */}
      <LetterScene onContinue={() => {
        document.getElementById('journey-scene')?.scrollIntoView({ behavior: 'smooth' });
      }} />

      {/* Scene: Side-scrolling Love Story Journey (Game Pixel) */}
      <div id="journey-scene">
        <JourneyScene />
      </div>

      {/* Scene: Photo Gallery (Album ảnh cưới đặt sau game pixel) */}
      <div id="gallery-scene">
        <GalleryScene />
      </div>

      <div className="h-8 bg-gradient-to-b from-amber-50 to-amber-50" />

      {/* Scene 7: RSVP */}
      {/* <RSVPScene /> */}

      {/* Scene: Countdown to Wedding Day (Đếm ngược ngày cưới ở cuối trang) */}
      <div id="countdown-scene">
        <CountdownScene />
      </div>

      {/* Scene 8: Gift + Footer */}
      <GiftScene />

      {/* Floating Music Button */}
      <MusicFloatingButton />
    </div>
  );
}

export default App;
