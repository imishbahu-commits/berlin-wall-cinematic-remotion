import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';

const BG = '#102027';
const PAPER = '#f3ead7';
const INK = '#17252b';
const RED = '#e4572e';
const YELLOW = '#f2c14e';
const BLUE = '#3f88c5';

const clamp = { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };

const HandDrawnWall: React.FC<{ x: number; y: number; scale: number; opacity: number }> = ({ x, y, scale, opacity }) => (
  <div style={{ position: 'absolute', left: x, top: y, transform: `scale(${scale})`, transformOrigin: 'center', opacity }}>
    <div style={{ width: 920, height: 220, background: PAPER, border: `8px solid ${INK}`, boxShadow: '12px 14px 0 rgba(0,0,0,.2)', transform: 'rotate(-1deg)' }}>
      <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'space-around', padding: 30 }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} style={{ width: 42, height: 170 + (i % 3) * 15, background: i % 3 === 0 ? RED : i % 3 === 1 ? BLUE : YELLOW, border: `5px solid ${INK}`, transform: `rotate(${(i % 2 ? 1 : -1) * (i % 4)}deg)` }} />
        ))}
      </div>
    </div>
  </div>
);

const Crowd: React.FC<{ progress: number }> = ({ progress }) => (
  <div style={{ position: 'absolute', bottom: 50, left: 0, width: '100%', display: 'flex', justifyContent: 'center', gap: 18, transform: `translateY(${progress}px)` }}>
    {Array.from({ length: 15 }).map((_, i) => (
      <div key={i} style={{ width: 42, height: 110 + (i % 4) * 12, background: i % 2 ? BLUE : RED, border: `5px solid ${INK}`, borderRadius: '50% 50% 12px 12px' }} />
    ))}
  </div>
);

export const BerlinWall: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;

  const intro = interpolate(frame, [0, 60], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const camera = interpolate(frame, [0, 2160], [0, 1], { ...clamp });
  const wallShift = interpolate(frame, [600, 1100, 1500], [0, -30, -760], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const wallScale = interpolate(frame, [0, 2160], [1.08, 1.25], { ...clamp });
  const breakProgress = interpolate(frame, [1200, 1500, 1800], [0, 0.5, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const outro = interpolate(frame, [1950, 2160], [1, 0], { ...clamp });

  return (
    <AbsoluteFill style={{ background: BG, overflow: 'hidden', fontFamily: 'Arial, sans-serif', color: PAPER }}>
      <AbsoluteFill style={{ opacity: intro, transform: `scale(${1 + camera * 0.05}) translate(${camera * -30}px, ${camera * -15}px)` }}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 35%, #29434b 0%, ${BG} 65%)` }} />

        <div style={{ position: 'absolute', top: 70, left: 80, fontSize: 34, fontWeight: 800, letterSpacing: 6, opacity: interpolate(frame, [0, 90], [0, 1], clamp) }}>HISTORY IN MOTION</div>

        <div style={{ position: 'absolute', top: 155, left: 80, width: 1000, fontSize: 96, lineHeight: 0.95, fontWeight: 900, letterSpacing: -5, transform: `translateY(${interpolate(frame, [0, 90], [70, 0], clamp)}px)` }}>
          THE WALL<br />THAT FELL
        </div>

        <div style={{ position: 'absolute', top: 370, left: 85, width: 680, fontSize: 30, lineHeight: 1.35, opacity: interpolate(frame, [90, 150], [0, 1], clamp) }}>
          Berlin, 1989. A city divided by concrete — and a generation ready to cross it.
        </div>

        <HandDrawnWall x={-10 + wallShift * 0.25} y={500} scale={wallScale} opacity={1} />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'repeating-linear-gradient(0deg, rgba(255,255,255,.025) 0 2px, transparent 2px 6px)' }} />

        <div style={{ position: 'absolute', top: 420, left: 760, fontSize: 22, fontWeight: 700, letterSpacing: 3, transform: `rotate(-7deg)`, color: YELLOW }}>NOVEMBER 9, 1989</div>

        <Crowd progress={interpolate(frame, [0, 500], [100, 0], clamp)} />

        <div style={{ position: 'absolute', top: 0, left: `${50 - breakProgress * 18}%`, width: 8 + breakProgress * 60, height: '100%', background: PAPER, opacity: breakProgress, filter: 'blur(1px)' }} />

        <div style={{ position: 'absolute', bottom: 90, right: 80, fontSize: 44, fontWeight: 900, opacity: interpolate(frame, [1500, 1660], [0, 1], clamp), transform: `scale(${interpolate(frame, [1500, 1660], [.7, 1], clamp)})` }}>
          ONE NIGHT.<br />ONE OPENING.
        </div>

        <div style={{ position: 'absolute', inset: 0, opacity: outro, background: `linear-gradient(90deg, transparent 0%, rgba(16,32,39,.1) 50%, rgba(16,32,39,.85) 100%)` }} />
      </AbsoluteFill>

      <div style={{ position: 'absolute', bottom: 22, left: 40, fontSize: 16, letterSpacing: 2, opacity: 0.65 }}>BERLIN WALL • 1961 — 1989</div>
      <div style={{ position: 'absolute', bottom: 22, right: 40, fontSize: 16, letterSpacing: 2, opacity: 0.65 }}>{t.toFixed(1)}s</div>
    </AbsoluteFill>
  );
};
