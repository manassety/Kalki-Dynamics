'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hidden, setHidden] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setHidden(false);
    };

    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    // Event delegation on document (extremely fast, zero thread-blocking)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.closest) {
        if (target.closest('a, button, [role="button"], input, select, textarea, .hover-target')) {
          setHovered(true);
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.closest) {
        if (target.closest('a, button, [role="button"], input, select, textarea, .hover-target')) {
          setHovered(false);
        }
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [cursorX, cursorY]);

  if (hidden) return null;

  return (
    <>
      {/* Outer Ring with spring delay */}
      <motion.div
        className="cursor-ring"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: hovered ? 60 : 36,
          height: hovered ? 60 : 36,
          borderColor: clicked ? '#ea0614' : hovered ? '#ea0614' : 'rgba(255, 255, 255, 0.4)',
          backgroundColor: clicked ? 'rgba(234, 6, 20, 0.15)' : hovered ? 'rgba(234, 6, 20, 0.05)' : 'rgba(0, 0, 0, 0)',
        }}
      />
      {/* Inner Pinpoint (Instaneous follow) */}
      <motion.div
        className="cursor-dot"
        style={{
          x: cursorX,
          y: cursorY,
          backgroundColor: hovered ? '#ffffff' : '#ea0614',
          scale: clicked ? 0.7 : hovered ? 1.5 : 1,
        }}
      />
    </>
  );
}
