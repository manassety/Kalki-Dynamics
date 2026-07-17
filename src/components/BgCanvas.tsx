'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  pulseSpeed: number;
}

interface EnergyLine {
  points: { x: number; y: number }[];
  color: string;
  width: number;
  speed: number;
  offset: number;
}

export default function BgCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Dynamic sizing helper
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Track mouse
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Initialize ambient crimson particles
    const particleCount = Math.min(60, Math.floor((width * height) / 25000));
    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.005,
    }));

    // Slow moving dragon energy paths
    const energyLines: EnergyLine[] = Array.from({ length: 4 }, (_, idx) => {
      const isRed = idx % 2 === 0;
      return {
        points: Array.from({ length: 8 }, (_, i) => ({
          x: (i / 7) * width,
          y: (0.3 + 0.4 * Math.random()) * height,
        })),
        color: isRed ? 'rgba(234, 6, 20, 0.08)' : 'rgba(255, 255, 255, 0.02)',
        width: Math.random() * 2 + 1,
        speed: 0.15 + Math.random() * 0.1,
        offset: Math.random() * Math.PI * 2,
      };
    });

    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(234, 6, 20, 0.025)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      const mouse = mouseRef.current;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        for (let y = 0; y < height; y += 40) {
          let drawX = x;

          if (mouse.active) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 220) {
              const force = (220 - dist) / 220;
              // Push mesh grid slightly away
              drawX += (dx / dist) * force * 12;
            }
          }
          if (y === 0) ctx.moveTo(drawX, y);
          else ctx.lineTo(drawX, y);
        }
        ctx.stroke();
      }

      ctx.strokeStyle = 'rgba(234, 6, 20, 0.02)';
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        for (let x = 0; x < width; x += 40) {
          let drawY = y;
          if (mouse.active) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 220) {
              const force = (220 - dist) / 220;
              drawY += (dy / dist) * force * 12;
            }
          }
          if (x === 0) ctx.moveTo(x, drawY);
          else ctx.lineTo(x, drawY);
        }
        ctx.stroke();
      }
    };

    const drawEnergyLines = (time: number) => {
      energyLines.forEach((line) => {
        ctx.beginPath();
        ctx.strokeStyle = line.color;
        ctx.lineWidth = line.width;

        ctx.moveTo(0, height / 2);

        // Render custom Bezier-like wave stringing across screens to represent "Dragon Energy"
        for (let i = 0; i < width; i += 25) {
          const relativeX = i / width;
          const sineOffset = Math.sin(relativeX * Math.PI * 2.5 + time * line.speed + line.offset) * 80;
          const cosOffset = Math.cos(relativeX * Math.PI * 1.2 - time * line.speed * 0.7 + line.offset) * 40;
          const y = (height / 2) + sineOffset + cosOffset;
          ctx.lineTo(i, y);
        }
        ctx.stroke();
      });
    };

    let tick = 0;
    const render = () => {
      tick += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Deep matte black base with micro dark vignette
      const grad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        10,
        width / 2,
        height / 2,
        Math.max(width, height)
      );
      grad.addColorStop(0, '#000000');
      grad.addColorStop(1, '#020202');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 1. Futuristic Grid
      drawGrid();

      // 2. Slow morphing red energy lines
      drawEnergyLines(tick);

      // 3. Mouse localized crimson glow
      const mouse = mouseRef.current;
      if (mouse.active) {
        const glowGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          250
        );
        glowGrad.addColorStop(0, 'rgba(234, 6, 20, 0.06)');
        glowGrad.addColorStop(0.5, 'rgba(18, 18, 18, 0.02)');
        glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 250, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4. Update and Drawing ambient particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        p.alpha += Math.sin(tick * p.pulseSpeed * 20) * 0.01;
        if (p.alpha < 0.1) p.alpha = 0.1;
        if (p.alpha > 0.7) p.alpha = 0.7;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(234, 6, 20, ${p.alpha})`;
        ctx.shadowColor = '#ea0614';
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-black"
    />
  );
}
