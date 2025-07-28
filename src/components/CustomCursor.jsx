import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorRef = useRef(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const scale = useSpring(1, { stiffness: 300, damping: 20 });

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX - 10); // centers the cursor
      y.set(e.clientY - 10);
    };

    const handleMouseOver = (e) => {
      if (e.target instanceof HTMLElement && e.target.closest('a, button, input, textarea, select')) {
        scale.set(1.5);
      }
    };

    const handleMouseOut = (e) => {
      if (e.target instanceof HTMLElement && e.target.closest('a, button, input, textarea, select')) {
        scale.set(1);
      }
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [x, y, scale]);

  return (
    <motion.div
      ref={cursorRef}
      className="pointer-events-none fixed z-[9999] w-5 h-5 rounded-full border border-blue-400 bg-blue-400/10 mix-blend-difference"
      style={{ translateX: x, translateY: y, scale }}
    />
  );
}
