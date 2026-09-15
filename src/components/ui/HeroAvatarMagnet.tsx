import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

type HeroAvatarMagnetProps = {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
};

export default function HeroAvatarMagnet({ 
  children, 
  padding = 300, 
  strength = 3
}: HeroAvatarMagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Motion values to bypass React state
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs to handle active/inactive transitions naturally
  const smoothX = useSpring(x, { damping: 25, stiffness: 150, mass: 0.5 });
  const smoothY = useSpring(y, { damping: 25, stiffness: 150, mass: 0.5 });

  const prefersReducedMotion = useReducedMotion();

  // Drag tracking refs for mobile
  const isDraggingRef = useRef(false);
  const startTouchRef = useRef({ x: 0, y: 0 });
  const startPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (prefersReducedMotion) return;
    const el = ref.current;
    if (!el) return;

    // Desktop cursor magnet implementation (unchanged)
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 640) return;
      if (!ref.current) return;

      const avatarRect = ref.current.getBoundingClientRect();
      const centerX = avatarRect.left + avatarRect.width / 2;
      const centerY = avatarRect.top + avatarRect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      if (distance < padding) {
        x.set(distanceX / strength);
        y.set(distanceY / strength);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    const handleMouseLeave = () => {
      if (window.innerWidth >= 640) {
        x.set(0);
        y.set(0);
      }
    };

    // Mobile drag bounds helper
    const getMobileBounds = () => {
      // Clamped horizontal movement so avatar never overflows viewport edges
      const maxMoveX = Math.max(20, Math.min(45, (window.innerWidth - 280) / 2 - 8));
      // Safe vertical movement within upper Hero area (below navbar, resting near heading)
      const minY = -35;
      const maxY = 45;
      return { maxMoveX, minY, maxY };
    };

    const applyClampedDrag = (clientX: number, clientY: number) => {
      const deltaX = clientX - startTouchRef.current.x;
      const deltaY = clientY - startTouchRef.current.y;

      const targetX = startPosRef.current.x + deltaX;
      const targetY = startPosRef.current.y + deltaY;

      const { maxMoveX, minY, maxY } = getMobileBounds();
      const clampedX = Math.max(-maxMoveX, Math.min(maxMoveX, targetX));
      const clampedY = Math.max(minY, Math.min(maxY, targetY));

      x.set(clampedX);
      y.set(clampedY);
    };

    // Mobile touch handlers
    const handleTouchStart = (e: TouchEvent) => {
      if (window.innerWidth >= 640) return;
      const isMenuOpen = document.querySelector('button[aria-expanded="true"]');
      if (isMenuOpen) return;

      if (e.touches.length > 0) {
        isDraggingRef.current = true;
        const touch = e.touches[0];
        startTouchRef.current = { x: touch.clientX, y: touch.clientY };
        startPosRef.current = { x: x.get(), y: y.get() };
        document.body.style.userSelect = 'none';
        document.body.style.webkitUserSelect = 'none';
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || window.innerWidth >= 640) return;
      if (e.touches.length === 0) return;

      if (e.cancelable) {
        e.preventDefault();
      }

      applyClampedDrag(e.touches[0].clientX, e.touches[0].clientY);
    };

    const handleTouchEnd = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        document.body.style.userSelect = '';
        document.body.style.webkitUserSelect = '';
        // Preserve position on touch end - do not reset x/y
      }
    };

    // Mobile pointer handlers (for touch/pointer support and capture)
    const handlePointerDown = (e: PointerEvent) => {
      if (window.innerWidth >= 640) return;
      const isMenuOpen = document.querySelector('button[aria-expanded="true"]');
      if (isMenuOpen) return;

      isDraggingRef.current = true;
      startTouchRef.current = { x: e.clientX, y: e.clientY };
      startPosRef.current = { x: x.get(), y: y.get() };
      document.body.style.userSelect = 'none';
      document.body.style.webkitUserSelect = 'none';

      if (el.setPointerCapture) {
        try {
          el.setPointerCapture(e.pointerId);
        } catch {
          // Ignore
        }
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current || window.innerWidth >= 640) return;
      if (e.cancelable) {
        e.preventDefault();
      }
      applyClampedDrag(e.clientX, e.clientY);
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        document.body.style.userSelect = '';
        document.body.style.webkitUserSelect = '';
        if (el.releasePointerCapture) {
          try {
            el.releasePointerCapture(e.pointerId);
          } catch {
            // Ignore
          }
        }
        // Preserve position on touch end - do not reset x/y
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 640) {
        isDraggingRef.current = false;
        document.body.style.userSelect = '';
        document.body.style.webkitUserSelect = '';
        x.set(0);
        y.set(0);
      }
    };

    // Attach listeners
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    // Touch/pointer listeners initiated directly on the avatar element
    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('pointerdown', handlePointerDown);

    // Global drag tracking while dragging
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('touchcancel', handleTouchEnd, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    window.addEventListener('pointercancel', handlePointerUp, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);

      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('pointerdown', handlePointerDown);

      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [x, y, padding, strength, prefersReducedMotion]);

  return (
    <div 
      ref={ref} 
      className="relative inline-block w-full h-full pointer-events-auto touch-none select-none cursor-grab active:cursor-grabbing"
    >
      <motion.div
        style={{ 
          x: prefersReducedMotion ? 0 : smoothX, 
          y: prefersReducedMotion ? 0 : smoothY,
          willChange: 'transform'
        }}
        className="w-full h-full flex justify-center items-center relative"
      >
        {children}
      </motion.div>
    </div>
  );
}

