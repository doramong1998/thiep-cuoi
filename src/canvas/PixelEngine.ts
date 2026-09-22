/**
 * PixelEngine — The core 2D side-scrolling renderer for the love story journey.
 * Driven by scroll progress (0→1). Renders parallax layers, motorcycle, milestones, seasons.
 */
import {
  drawSprite,
  MOTO_PALETTE,
  MOTO_FRAME1,
  MOTO_FRAME2,
  CLOUD_SPRITE,
  BIRD_PALETTE,
  BIRD_FRAME1,
  BIRD_FRAME2,
  BIRD_FRAME3,
  TREE_SPRING,
  TREE_PALETTE_SPRING,
  TREE_SUMMER,
  TREE_PALETTE_SUMMER,
  TREE_AUTUMN,
  TREE_PALETTE_AUTUMN,
  TREE_WINTER,
  TREE_PALETTE_WINTER,
  SIGN_SPRITE,
  SIGN_PALETTE,
  HOUSE_SPRITE,
  HOUSE_PALETTE,
  CHURCH_SPRITE,
  CHURCH_PALETTE,
  HEART_SPRITE,
  GUEST_SPRITE,
  GUEST_PALETTE,
} from './sprites';
import { lerpColor, clamp } from '@/lib/utils';
import type { Milestone } from '@/types';
import { getLucidePath2D } from './lucidePaths';

// Season color configurations
const SEASON_CONFIGS = {
  spring: {
    skyTop: '#87CEEB',
    skyBottom: '#E0F0FF',
    groundColor: '#90C46B',
    groundDark: '#6B9B4A',
    hillColor: '#A8D88A',
    mountainColor: '#C5D5C0',
    particles: ['#FFB7C5', '#FF91A4', '#FFFFFF', '#FFC0CB'],
  },
  summer: {
    // Biển cả & Bờ cát vàng (Distant Ocean + Golden Beach)
    skyTop: '#0288D1', // Tropical azure sky
    skyBottom: '#81D4FA', // Clear sunny horizon
    groundColor: '#F6E7C8', // Warm golden beach sand (bờ cát vàng chỗ cây dừa)
    groundDark: '#DFBE86', // Sand ripples / wet sand
    hillColor: '#F0D6A3', // Golden sand dunes (triền cát thoai thoải)
    mountainColor: '#00838F', // Nước biển ở ngoài (Distant turquoise ocean)
    particles: ['#E0F7FA', '#80DEEA', '#FFE082', '#FFFFFF', '#4DD0E1'], // Ocean spray, sunshine & sea breeze
  },
  autumn: {
    // Núi cao (Towering High Mountain Ranges)
    skyTop: '#D85A20', // Fiery alpine sunset sky
    skyBottom: '#FDD8A5', // Warm mountain glow
    groundColor: '#C48246', // High mountain trail earth
    groundDark: '#8F5322', // Deep mountain rock & soil
    hillColor: '#B85828', // Rugged autumn mountain ridge
    mountainColor: '#6E381A', // Majestic towering jagged alpine peaks
    particles: ['#E65100', '#FF8F00', '#FFB300', '#D84315', '#FF7043'], // Swirling autumn leaves
  },
  winter: {
    skyTop: '#708090',
    skyBottom: '#B0C4DE',
    groundColor: '#E8E8E8',
    groundDark: '#C0C0C0',
    hillColor: '#D0D8E0',
    mountainColor: '#A0A8B0',
    particles: ['#FFFFFF', '#E8F0FF', '#D0E0F0', '#F0F8FF'],
  },
};

type Season = keyof typeof SEASON_CONFIGS;

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  wobble: number;
  opacity: number;
  color: string;
  rotation: number;
}

export class PixelEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private width = 0;
  private height = 0;
  private progress = 0;
  private time = 0;
  private animFrame = 0;
  private scale = 3;
  private particles: Particle[] = [];
  private milestones: Milestone[] = [];
  private activeMilestone: Milestone | null = null;
  private onMilestoneChange?: (m: Milestone | null) => void;

  // Road total virtual width (pixels at scale=1)
  private readonly ROAD_LENGTH = 12000;

  constructor(
    canvas: HTMLCanvasElement,
    milestones: Milestone[],
    onMilestoneChange?: (m: Milestone | null) => void,
  ) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.milestones = milestones;
    this.onMilestoneChange = onMilestoneChange;
    this.resize();
    this.initParticles();
  }

  resize(): void {
    const dpr = Math.min(window.devicePixelRatio, 2);
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.ctx.scale(dpr, dpr);
    this.ctx.imageSmoothingEnabled = false;
    this.scale = Math.max(2, Math.floor(this.width / 400));
  }

  setProgress(p: number): void {
    this.progress = clamp(p, 0, 1);
    this.checkMilestone();
  }

  private checkMilestone(): void {
    let found: Milestone | null = null;
    for (const m of this.milestones) {
      if (this.progress >= m.scrollStart && this.progress < m.scrollEnd) {
        found = m;
        break;
      }
    }
    // Edge case: progress === 1.0 should match the last milestone
    if (!found && this.progress >= 1.0 && this.milestones.length > 0) {
      found = this.milestones[this.milestones.length - 1];
    }
    if (found !== this.activeMilestone) {
      this.activeMilestone = found;
      this.onMilestoneChange?.(found);
    }
  }

  private getCurrentSeason(): {
    season: Season;
    blend: number;
    nextSeason: Season;
  } {
    // Build season map dynamically from milestones
    const seasonMap: { start: number; end: number; season: Season }[] =
      this.milestones.map((m) => ({
        start: m.scrollStart,
        end: m.scrollEnd,
        season: m.season,
      }));

    for (let i = 0; i < seasonMap.length; i++) {
      const seg = seasonMap[i];
      if (this.progress >= seg.start && this.progress < seg.end) {
        const nextSeg = seasonMap[Math.min(i + 1, seasonMap.length - 1)];
        const localProgress =
          (this.progress - seg.start) / (seg.end - seg.start);
        // Blend near the edges
        const blend = localProgress > 0.8 ? (localProgress - 0.8) / 0.2 : 0;
        return { season: seg.season, blend, nextSeason: nextSeg.season };
      }
    }
    return { season: 'spring', blend: 0, nextSeason: 'spring' };
  }

  private getSeasonColor(key: keyof typeof SEASON_CONFIGS.spring): string {
    const { season, blend, nextSeason } = this.getCurrentSeason();
    const c1 = SEASON_CONFIGS[season][key] as string;
    const c2 = SEASON_CONFIGS[nextSeason][key] as string;
    if (blend === 0) return c1;
    return lerpColor(c1, c2, blend);
  }

  private getTreeSprite(): { sprite: number[][]; palette: string[] } {
    const { season } = this.getCurrentSeason();
    switch (season) {
      case 'summer':
        return { sprite: TREE_SUMMER, palette: TREE_PALETTE_SUMMER };
      case 'autumn':
        return { sprite: TREE_AUTUMN, palette: TREE_PALETTE_AUTUMN };
      case 'winter':
        return { sprite: TREE_WINTER, palette: TREE_PALETTE_WINTER };
      default:
        return { sprite: TREE_SPRING, palette: TREE_PALETTE_SPRING };
    }
  }

  private initParticles(): void {
    this.particles = Array.from({ length: 30 }, () => this.createParticle());
  }

  private createParticle(): Particle {
    const { season } = this.getCurrentSeason();
    const colors = SEASON_CONFIGS[season].particles;
    return {
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 1.5 + 0.5,
      wobble: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.7 + 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
    };
  }

  // =============== RENDER LAYERS ===============

  private drawSky(): void {
    const skyTop = this.getSeasonColor('skyTop');
    const skyBottom = this.getSeasonColor('skyBottom');
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height * 0.6);
    gradient.addColorStop(0, skyTop);
    gradient.addColorStop(1, skyBottom);
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.width, this.height * 0.6);
  }

  private drawSun(): void {
    const { season } = this.getCurrentSeason();
    const sunX = this.width * 0.8 - this.progress * 100;
    const sunY = season === 'winter' ? 80 : 60;
    const sunSize = season === 'winter' ? 20 : 28;

    // Glow
    const glow = this.ctx.createRadialGradient(
      sunX,
      sunY,
      sunSize * 0.5,
      sunX,
      sunY,
      sunSize * 3,
    );
    glow.addColorStop(
      0,
      season === 'winter' ? 'rgba(200,200,220,0.3)' : 'rgba(255,223,100,0.3)',
    );
    glow.addColorStop(1, 'rgba(255,223,100,0)');
    this.ctx.fillStyle = glow;
    this.ctx.fillRect(
      sunX - sunSize * 3,
      sunY - sunSize * 3,
      sunSize * 6,
      sunSize * 6,
    );

    // Sun body
    this.ctx.fillStyle = season === 'winter' ? '#C0C8D0' : '#FFD93D';
    this.ctx.beginPath();
    this.ctx.arc(sunX, sunY, sunSize, 0, Math.PI * 2);
    this.ctx.fill();
  }

  private drawClouds(): void {
    const cloudPalette = ['', 'rgba(255,255,255,0.7)'];
    const cloudY = this.height * 0.08;
    const baseOffset = this.progress * this.ROAD_LENGTH * 0.1;

    for (let i = 0; i < 6; i++) {
      const cx = ((i * 350 - baseOffset) % (this.width + 200)) - 100;
      const cy = cloudY + Math.sin(i * 1.5 + this.time * 0.3) * 15 + i * 20;
      const cloudScale = this.scale * (0.8 + (i % 3) * 0.3);
      drawSprite(this.ctx, CLOUD_SPRITE, cloudPalette, cx, cy, cloudScale);
    }
  }

  private drawBirds(): void {
    // 4-phase wing flap animation cycle (Cánh nâng -> Lượn -> Đập xuống -> Lượn)
    const frames = [BIRD_FRAME1, BIRD_FRAME2, BIRD_FRAME3, BIRD_FRAME2];

    for (let i = 0; i < 3; i++) {
      const animSpeed = 4; // Tốc độ vỗ cánh tự nhiên
      const frameIndex = Math.floor(this.time * animSpeed + i * 1.3) % 4;
      const currentFrame = frames[frameIndex];

      // Quỹ đạo bay lượn mềm mại nhấp nhô theo nhịp đập cánh
      const bx = ((i * 380 + this.time * 50) % (this.width + 140)) - 70;
      const flapLift = frameIndex === 0 ? -2.5 : frameIndex === 2 ? 2.5 : 0;
      const by = 35 + i * 28 + Math.sin(this.time * 1.6 + i * 2) * 8 + flapLift;

      const birdScale = this.scale * (0.8 + (i % 2) * 0.2);
      drawSprite(this.ctx, currentFrame, BIRD_PALETTE, bx, by, birdScale);
    }
  }

  private drawMountains(): void {
    const mountainColor = this.getSeasonColor('mountainColor');
    const { season } = this.getCurrentSeason();
    const baseOffset = this.progress * this.ROAD_LENGTH * 0.15;
    const mY =
      season === 'autumn'
        ? this.height * 0.28
        : season === 'summer'
          ? this.height * 0.36
          : this.height * 0.38;

    if (season === 'summer') {
      // In summer, draw the distant Ocean (Nước ở ngoài)
      const oceanGrad = this.ctx.createLinearGradient(
        0,
        mY,
        0,
        this.height * 0.54,
      );
      oceanGrad.addColorStop(0, '#00796B'); // Deep teal ocean horizon
      oceanGrad.addColorStop(0.5, '#0097A7'); // Turquoise sea
      oceanGrad.addColorStop(1, '#00BCD4'); // Bright shallow waters
      this.ctx.fillStyle = oceanGrad;

      this.ctx.beginPath();
      this.ctx.moveTo(0, this.height);

      for (let x = 0; x <= this.width; x += 2) {
        const worldX = x + baseOffset;
        // Distant island silhouettes and calm sea horizon
        const i1 = Math.sin(worldX * 0.003) * 14;
        const i2 = Math.sin(worldX * 0.007 + 2) * 8;
        this.ctx.lineTo(x, mY + i1 + i2);
      }

      this.ctx.lineTo(this.width, this.height);
      this.ctx.lineTo(0, this.height);
      this.ctx.closePath();
      this.ctx.fill();

      // Sparkling sea water highlights
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      for (let x = 0; x <= this.width; x += 30) {
        const worldX = x + baseOffset;
        const wy = mY + 20 + Math.sin(worldX * 0.02 + this.time * 2) * 6;
        if (wy < this.height * 0.52) {
          this.ctx.fillRect(x, wy, 10, 2);
        }
      }
    } else {
      this.ctx.fillStyle = mountainColor;
      this.ctx.beginPath();
      this.ctx.moveTo(0, this.height);

      for (let x = 0; x <= this.width; x += 2) {
        const worldX = x + baseOffset;
        let h: number;
        if (season === 'autumn') {
          // Towering sharp jagged alpine peaks for Autumn (Núi cao)
          const p1 = Math.abs(Math.sin(worldX * 0.0035)) * -85;
          const p2 = Math.abs(Math.sin(worldX * 0.008 + 1.2)) * -50;
          const p3 = Math.sin(worldX * 0.0015 + 2.5) * 35;
          h = p1 + p2 + p3 + 30;
        } else {
          const h1 = Math.sin(worldX * 0.003) * 40;
          const h2 = Math.sin(worldX * 0.007 + 1) * 25;
          const h3 = Math.sin(worldX * 0.001 + 2) * 55;
          h = h1 + h2 + h3;
        }
        this.ctx.lineTo(x, mY + h);
      }

      this.ctx.lineTo(this.width, this.height);
      this.ctx.lineTo(0, this.height);
      this.ctx.closePath();
      this.ctx.fill();
    }
  }

  private drawHills(): void {
    const hillColor = this.getSeasonColor('hillColor');
    const { season } = this.getCurrentSeason();
    const baseOffset = this.progress * this.ROAD_LENGTH * 0.3;
    const hY = season === 'summer' ? this.height * 0.48 : this.height * 0.5;

    this.ctx.fillStyle = hillColor;
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.height);

    for (let x = 0; x <= this.width; x += 2) {
      const worldX = x + baseOffset;
      let h: number;
      if (season === 'summer') {
        // Smooth golden beach sand dunes (Cát vàng)
        const dune1 = Math.sin(worldX * 0.004) * 16;
        const dune2 = Math.sin(worldX * 0.009 + 1) * 8;
        h = dune1 + dune2;
      } else if (season === 'autumn') {
        // Rugged mountain foothills & slopes for Autumn (Núi cao)
        const r1 = Math.abs(Math.sin(worldX * 0.006 + 1)) * -32;
        const r2 = Math.sin(worldX * 0.01) * 16;
        h = r1 + r2 + 15;
      } else {
        const h1 = Math.sin(worldX * 0.005) * 25;
        const h2 = Math.sin(worldX * 0.01 + 3) * 15;
        h = h1 + h2;
      }
      this.ctx.lineTo(x, hY + h);
    }

    this.ctx.lineTo(this.width, this.height);
    this.ctx.lineTo(0, this.height);
    this.ctx.closePath();
    this.ctx.fill();

    // In summer, draw white foam wave surf where ocean meets the golden beach!
    if (season === 'summer') {
      this.ctx.fillStyle = '#FFFFFF';
      for (let x = 0; x <= this.width; x += 2) {
        const worldX = x + baseOffset;
        const shoreY =
          hY + Math.sin(worldX * 0.004) * 16 + Math.sin(worldX * 0.009 + 1) * 8;
        // Wave foam pulsation
        const foamH = 2 + Math.sin(worldX * 0.03 + this.time * 4) * 1.5;
        this.ctx.fillRect(x, shoreY - foamH, 3, foamH + 1);
      }
    }
  }

  private drawTrees(): void {
    const { sprite, palette } = this.getTreeSprite();
    const baseOffset = this.progress * this.ROAD_LENGTH * 0.6;
    const groundY = this.height * 0.62;
    const treeScale = this.scale * 1.2;

    for (let i = 0; i < 15; i++) {
      const rawX = (i * 220 - baseOffset) % (this.width + 400);
      const tx = rawX < -100 ? rawX + this.width + 500 : rawX;
      if (tx < -100 || tx > this.width + 100) continue;
      const ty = groundY - sprite.length * treeScale + Math.sin(i * 2.5) * 8;
      drawSprite(this.ctx, sprite, palette, tx, ty, treeScale);
    }
  }

  private drawHouses(): void {
    const baseOffset = this.progress * this.ROAD_LENGTH * 0.55;
    const groundY = this.height * 0.62;
    const houseScale = this.scale * 1;

    for (let i = 0; i < 4; i++) {
      const rawX = (i * 700 + 300 - baseOffset) % (this.width + 800);
      const hx = rawX < -200 ? rawX + this.width + 1000 : rawX;
      if (hx < -200 || hx > this.width + 200) continue;
      const hy = groundY - HOUSE_SPRITE.length * houseScale;
      drawSprite(this.ctx, HOUSE_SPRITE, HOUSE_PALETTE, hx, hy, houseScale);
    }
  }

  private drawRoad(): void {
    const groundColor = this.getSeasonColor('groundColor');
    const groundDark = this.getSeasonColor('groundDark');
    const roadY = this.height * 0.65;

    // Ground
    this.ctx.fillStyle = groundColor;
    this.ctx.fillRect(0, roadY - 10, this.width, this.height - roadY + 10);

    // Road surface
    this.ctx.fillStyle = '#8B8680';
    this.ctx.fillRect(0, roadY, this.width, 28);

    // Road center line (dashed)
    this.ctx.fillStyle = '#FFD93D';
    const dashOffset = (this.progress * this.ROAD_LENGTH * 1.0) % 40;
    for (let x = -dashOffset; x < this.width + 40; x += 40) {
      this.ctx.fillRect(x, roadY + 12, 20, 3);
    }

    // Road edges
    this.ctx.fillStyle = groundDark;
    this.ctx.fillRect(0, roadY - 2, this.width, 3);
    this.ctx.fillRect(0, roadY + 27, this.width, 3);

    // Small grass details
    const grassOffset = this.progress * this.ROAD_LENGTH * 0.8;
    this.ctx.fillStyle = groundDark;
    for (let i = 0; i < 20; i++) {
      const gx = (i * 100 - grassOffset) % (this.width + 100);
      if (gx < -10 || gx > this.width + 10) continue;
      this.ctx.fillRect(gx, roadY + 33 + Math.sin(i) * 3, 2, 4);
      this.ctx.fillRect(gx + 4, roadY + 35 + Math.cos(i) * 2, 2, 3);
    }
  }

  private drawMilestones(): void {
    const baseOffset = this.progress * this.ROAD_LENGTH;
    const roadY = this.height * 0.65;
    const signScale = this.scale * 1.3;

    for (const m of this.milestones) {
      const worldX =
        m.scrollStart * this.ROAD_LENGTH +
        (m.scrollEnd - m.scrollStart) * this.ROAD_LENGTH * 0.5;
      const screenX = worldX - baseOffset + this.width * 0.35;

      if (screenX < -100 || screenX > this.width + 100) continue;

      // Sign post
      const sy = roadY - SIGN_SPRITE.length * signScale - 5;
      drawSprite(this.ctx, SIGN_SPRITE, SIGN_PALETTE, screenX, sy, signScale);

      // Milestone icon on sign: Sử dụng Lucide vector icon sắc nét, đồng bộ trên mọi thiết bị
      const lucidePaths = getLucidePath2D(m.icon);
      const centerX = screenX + (SIGN_SPRITE[0].length * signScale) / 2;
      const centerY = sy + signScale * 3.8;

      if (lucidePaths && lucidePaths.length > 0) {
        const iconSize = signScale * 5.2;
        const s = iconSize / 24;

        this.ctx.save();
        this.ctx.translate(centerX, centerY);
        this.ctx.scale(s, s);
        this.ctx.translate(-12, -12);

        this.ctx.strokeStyle = '#5C3A1E'; // Màu nâu gỗ vintage hòa cùng biển báo
        this.ctx.lineWidth = 2.4;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';

        for (const path of lucidePaths) {
          this.ctx.stroke(path);
        }

        this.ctx.restore();
      } else {
        // Fallback về emoji nếu không tìm thấy Lucide path
        this.ctx.font = `${this.scale * 4}px serif`;
        this.ctx.textAlign = 'center';
        this.ctx.fillText(m.icon, centerX, sy + signScale * 3.5);
      }
    }
  }

  private drawMotorcycle(): void {
    const roadY = this.height * 0.65;
    const isAtDestination = this.progress >= 0.93;
    const motoScale = this.scale * 1.1;

    // Khi đến đích: nhảy tưng bừng ăn mừng hạnh phúc (Joyful celebratory hopping jump)
    const joyJump = isAtDestination
      ? -Math.abs(Math.sin(this.time * 7)) * 22
      : Math.sin(this.time * 8) * 1.5;

    const frame = isAtDestination
      ? joyJump < -8
        ? MOTO_FRAME2
        : MOTO_FRAME1
      : Math.floor(this.time * 6) % 2 === 0
        ? MOTO_FRAME1
        : MOTO_FRAME2;

    const motoX = this.width * 0.32;
    const motoY = roadY - MOTO_FRAME1.length * motoScale + 4 + joyJump;

    drawSprite(this.ctx, frame, MOTO_PALETTE, motoX, motoY, motoScale);

    // Hiệu ứng pháo hoa / trái tim tung bay khi đến đích
    if (isAtDestination) {
      // Trái tim & hoa giấy tung bay quanh cặp đôi khi đến đích
      const heartPalette = ['', '#FF4D6D', '#FFB703', '#FFFFFF'];
      for (let i = 0; i < 4; i++) {
        const hx = motoX - 10 + i * 20 + Math.sin(this.time * 3 + i) * 10;
        const hy = motoY - 25 - ((this.time * 35 + i * 15) % 45);
        drawSprite(this.ctx, HEART_SPRITE, heartPalette, hx, hy, 1.2);
      }
    } else {
      // Romantic walking sparkle particles
      if (Math.floor(this.time * 8) % 2 === 0) {
        this.ctx.fillStyle = [
          'rgba(255,183,197,0.7)',
          'rgba(255,215,0,0.6)',
          'rgba(255,107,138,0.7)',
        ][Math.floor(this.time * 4) % 3];
        const px = motoX - 2 - Math.random() * 8;
        const py =
          motoY +
          MOTO_FRAME1.length * motoScale * 0.4 +
          Math.sin(this.time * 5) * 6;
        this.ctx.fillRect(px, py, 2.5, 2.5);
      }
    }
  }

  private drawWeddingVenue(): void {
    // Only draw when near the end
    if (this.progress < 0.9) return;

    const baseOffset = this.progress * this.ROAD_LENGTH;
    const worldX = 0.96 * this.ROAD_LENGTH;
    const screenX = worldX - baseOffset + this.width * 0.35;
    const roadY = this.height * 0.65;
    const churchScale = this.scale * 3.0; // To lớn uy nghi, nổi bật làm điểm đích
    const cy = roadY - CHURCH_SPRITE.length * churchScale + 4;

    drawSprite(
      this.ctx,
      CHURCH_SPRITE,
      CHURCH_PALETTE,
      screenX,
      cy,
      churchScale,
    );

    // Hearts above church
    const heartPalette = ['', '#FF6B8A', '#FFD700', '#FF1493'];
    for (let i = 0; i < 5; i++) {
      const hx = screenX + 15 + i * 32;
      const hy = cy - 25 + Math.sin(this.time * 2.5 + i) * 12;
      drawSprite(
        this.ctx,
        HEART_SPRITE,
        heartPalette,
        hx,
        hy,
        this.scale * 0.6,
      );
    }

    // Guests đón chào chúc phúc hai bạn
    const guestScale = this.scale * 1.0;
    for (let i = 0; i < 6; i++) {
      const gx = screenX - 45 + i * 26;
      const gy = roadY - GUEST_SPRITE.length * guestScale;
      const guestColors = [...GUEST_PALETTE];
      guestColors[3] = [
        '#4A90D9',
        '#D9534F',
        '#5CB85C',
        '#F0AD4E',
        '#9B59B6',
        '#E83E8C',
      ][i % 6];
      const guestHop = Math.sin(this.time * 5 + i) * 3;
      drawSprite(
        this.ctx,
        GUEST_SPRITE,
        guestColors,
        gx,
        gy + guestHop,
        guestScale,
      );
    }
  }

  private drawParticles(): void {
    const { season } = this.getCurrentSeason();
    const colors = SEASON_CONFIGS[season].particles;

    for (const p of this.particles) {
      p.y += p.speed;
      p.x += Math.sin(this.time * 1.5 + p.wobble) * 0.6;
      p.rotation += p.speed * 2;

      if (p.y > this.height + 10) {
        p.y = -10;
        p.x = Math.random() * this.width;
        p.color = colors[Math.floor(Math.random() * colors.length)];
      }

      this.ctx.save();
      this.ctx.globalAlpha = p.opacity;
      this.ctx.fillStyle = p.color;

      if (season === 'winter') {
        // Snowflake (circle)
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
        this.ctx.fill();
      } else if (season === 'autumn') {
        // Leaf (rotated rect)
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        this.ctx.fillRect(-p.size / 4, -p.size / 2, p.size / 2, p.size);
      } else {
        // Petal / sparkle
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, p.size * 0.5, p.size * 0.3, 0, 0, Math.PI * 2);
        this.ctx.fill();
      }

      this.ctx.restore();
    }
  }

  private drawTitle(): void {
    // "Hành Trình Tình Yêu" tiêu đề mở đầu
    if (this.progress < 0.08) {
      const alpha = 1 - this.progress / 0.08;
      this.ctx.save();
      this.ctx.globalAlpha = alpha;
      this.ctx.fillStyle = '#5B3A1A';
      this.ctx.font = `bold ${this.scale * 6}px "Playfair Display", Georgia, serif`;
      this.ctx.textAlign = 'center';
      this.ctx.fillText(
        'Hành trình từ yêu thương đến trọn đời',
        this.width / 2,
        this.height * 0.18,
      );
      this.ctx.font = `${this.scale * 3}px "Cormorant Garamond", Georgia, serif`;
      this.ctx.fillStyle = '#8B5E2B';
      this.ctx.fillText(
        'Cùng nhìn lại những khoảnh khắc đáng nhớ...',
        this.width / 2,
        this.height * 0.24,
      );
      this.ctx.restore();
    }

    // "Và từ đây, hạnh phúc mãi mãi bắt đầu ❤️" khi kết thúc hành trình
    if (this.progress > 0.95) {
      const alpha = (this.progress - 0.95) / 0.05;
      this.ctx.save();
      this.ctx.globalAlpha = alpha;
      this.ctx.fillStyle = '#5B3A1A';
      this.ctx.font = `italic ${this.scale * 5}px "Playfair Display", Georgia, serif`;
      this.ctx.textAlign = 'center';
      this.ctx.fillText(
        'Và từ đây, hạnh phúc mãi mãi bắt đầu ❤️',
        this.width / 2,
        this.height * 0.2,
      );

      // Tooltip nhỏ ở dưới
      this.ctx.font = `${this.scale * 3}px "Cormorant Garamond", Georgia, serif`;
      this.ctx.fillStyle = '#8B5E2B';
      const bounceY = Math.sin(this.time * 4) * 3;
      this.ctx.fillText(
        '↓ Cuộn tiếp để khám phá ↓',
        this.width / 2,
        this.height * 0.26 + bounceY,
      );
      this.ctx.restore();
    }
  }

  private drawProgressBar(): void {
    const barW = this.width * 0.3;
    const barH = 4;
    const barX = (this.width - barW) / 2;
    const barY = this.height - 30;

    // Track
    this.ctx.fillStyle = 'rgba(139,94,43,0.2)';
    this.ctx.fillRect(barX, barY, barW, barH);

    // Fill
    this.ctx.fillStyle = '#D4AF37';
    this.ctx.fillRect(barX, barY, barW * this.progress, barH);

    // Heart marker
    const heartPalette = ['', '#D4AF37'];
    const hx = barX + barW * this.progress - 8;
    drawSprite(this.ctx, HEART_SPRITE, heartPalette, hx, barY - 10, 2);
  }

  // =============== MAIN RENDER ===============

  render(timestamp: number): void {
    this.time = timestamp / 1000;
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Layer order (back to front):
    this.drawSky();
    this.drawSun();
    this.drawClouds();
    this.drawBirds();
    this.drawMountains();
    this.drawHills();
    this.drawTrees();
    this.drawHouses();
    this.drawRoad();
    this.drawMilestones();
    this.drawWeddingVenue();
    this.drawMotorcycle();
    this.drawParticles();
    this.drawTitle();
    this.drawProgressBar();
  }

  start(): void {
    const loop = (ts: number) => {
      this.render(ts);
      this.animFrame = requestAnimationFrame(loop);
    };
    this.animFrame = requestAnimationFrame(loop);
  }

  stop(): void {
    cancelAnimationFrame(this.animFrame);
  }

  destroy(): void {
    this.stop();
  }
}
