import React, { useEffect, useRef, useState } from 'react';
import { Mesh, Program, Renderer, Triangle } from 'ogl';
import { useReducedMotion } from 'framer-motion';
import './GlowCursor.css';

const MAX_POINTS = 32;

const VERTEX_SHADER = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

#define MAX_POINTS 32

uniform vec2 uResolution;
uniform vec2 uPoints[MAX_POINTS];
uniform float uPointCount;
uniform vec3 uColor;
uniform vec3 uSecondaryColor;
uniform float uTrailWidth;
uniform float uTaper;
uniform float uGlowIntensity;
uniform float uGlowSpread;
uniform float uHotspot;
uniform float uBrightness;
uniform float uOpacity;
uniform float uPulseSpeed;
uniform float uNormalBlend;
uniform float uTime;
uniform float uFade;

varying vec2 vUv;

float sRGB(float x) {
  if (x <= 0.00031308) return 12.92 * x;
  return 1.055 * pow(x, 1.0 / 2.4) - 0.055;
}

void main() {
  if (uFade <= 0.0005) {
    discard;
  }

  vec2 pixel = vUv * uResolution;
  float denominator = max(uPointCount - 1.0, 1.0);
  float strongest = 0.0;
  float strongestCore = 0.0;
  float colorWeight = 0.0;
  vec3 colorSum = vec3(0.0);
  float pulseAmount = min(abs(uPulseSpeed), 1.0);

  for (int i = 0; i < MAX_POINTS - 1; i++) {
    float index = float(i);
    float active = 1.0 - step(uPointCount - 1.0, index);
    
    vec2 start = uPoints[i];
    vec2 end = uPoints[i + 1];
    vec2 toPixel = pixel - start;
    vec2 segment = end - start;
    float segLenSq = max(dot(segment, segment), 0.0001);
    float along = clamp(dot(toPixel, segment) / segLenSq, 0.0, 1.0);
    float progress = clamp((index + along) / denominator, 0.0, 1.0);
    float life = pow(max(1.0 - progress, 0.0), mix(0.55, 1.25, uTaper));
    float width = uTrailWidth * mix(1.0, 0.25, pow(progress, mix(0.55, 1.6, uTaper)));
    float distanceToTrail = length(toPixel - segment * along);
    
    float falloff = max(width * (0.8 + uGlowSpread * 1.4), 0.5);
    float falloffSq = falloff * falloff;
    float distSq = distanceToTrail * distanceToTrail;
    float beam = min(1.0, falloffSq / (distSq + falloffSq));
    float core = exp(-pow(distanceToTrail / max(width, 0.5), 2.0) * 2.5);
    float pulse = 1.0 + sin(uTime * uPulseSpeed * 3.0 - progress * 11.0) * 0.16 * pulseAmount;
    float intensity = (core + beam * uGlowIntensity * 0.55) * life * pulse * active;
    vec3 segmentColor = mix(uColor, uSecondaryColor, progress);

    strongest = max(strongest, intensity);
    strongestCore = max(strongestCore, core * life * active);
    colorSum += segmentColor * intensity;
    colorWeight += intensity;
  }

  float alpha = clamp(strongest * uOpacity * uFade, 0.0, 1.0);
  if (alpha < 0.001) discard;

  vec3 color = colorSum / max(colorWeight, 0.0001);
  color = mix(color, vec3(1.0), smoothstep(0.25, 0.95, strongestCore) * uHotspot);
  float luminance = sRGB(clamp(strongest * uBrightness, 0.0, 1.0));
  vec3 additiveColor = color * luminance;
  float normalAlpha = clamp(strongest * uBrightness * uOpacity * uFade, 0.0, 1.0);
  vec3 normalColor = mix(color, vec3(1.0), smoothstep(0.45, 1.0, strongestCore) * uHotspot * 0.35);
  gl_FragColor = vec4(mix(additiveColor, normalColor, uNormalBlend), mix(alpha, normalAlpha, uNormalBlend));
}
`;

const hexToRgb = (hex: string) => {
  let value = (hex || '').replace('#', '').trim();
  if (value.length === 3)
    value = value
      .split('')
      .map(char => char + char)
      .join('');
  const parsed = Number.parseInt(value || '000000', 16);
  return [((parsed >> 16) & 255) / 255, ((parsed >> 8) & 255) / 255, (parsed & 255) / 255];
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

type GlowCursorProps = {
  color?: string;
  secondaryColor?: string;
  trailLength?: number;
  trailWidth?: number;
  trailTaper?: number;
  followSpeed?: number;
  glowIntensity?: number;
  glowSpread?: number;
  hotspot?: number;
  brightness?: number;
  opacity?: number;
  pulseSpeed?: number;
  noiseStrength?: number;
  idleFade?: boolean;
  idleTimeout?: number;
  fadeDuration?: number;
  blendMode?: 'normal' | 'screen' | 'plus-lighter';
  maxDevicePixelRatio?: number;
  enabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

const GlowCursor = ({
  color = '#67E8F9',
  secondaryColor = '#A78BFA',
  trailLength = 20,
  trailWidth = 5,
  trailTaper = 0.85,
  followSpeed = 0.2,
  glowIntensity = 1.4,
  glowSpread = 0.9,
  hotspot = 0.5,
  brightness = 1.1,
  opacity = 0.75,
  pulseSpeed = 0.8,
  noiseStrength = 0,
  idleFade = true,
  idleTimeout = 500,
  fadeDuration = 600,
  blendMode = 'screen',
  maxDevicePixelRatio = 1.0,
  enabled = true,
  children,
  className = '',
  style,
  ...rest
}: GlowCursorProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const propsRef = useRef<any>({});
  
  const prefersReducedMotion = useReducedMotion();
  const [isTouchOrMobile, setIsTouchOrMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const isCoarse = window.matchMedia('(pointer: coarse)').matches;
      const isSmallScreen = window.innerWidth < 1024;
      setIsTouchOrMobile(isCoarse || isSmallScreen);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  propsRef.current = {
    color,
    secondaryColor,
    trailLength,
    trailWidth,
    trailTaper,
    followSpeed,
    glowIntensity,
    glowSpread,
    hotspot,
    brightness,
    opacity,
    pulseSpeed,
    noiseStrength,
    idleFade,
    idleTimeout,
    fadeDuration,
    maxDevicePixelRatio,
    blendMode,
    enabled
  };

  useEffect(() => {
    // If mobile or reduced motion is true, do not mount WebGL loop.
    if (isTouchOrMobile || prefersReducedMotion || !enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const initialConfig = propsRef.current;
    const targetDpr = Math.min(window.devicePixelRatio || 1, initialConfig.maxDevicePixelRatio, 1.25);
    
    const renderer = new Renderer({
      canvas,
      alpha: true,
      dpr: targetDpr,
      powerPreference: 'high-performance'
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    const pointData = Array(MAX_POINTS * 2).fill(0);
    const points = Array.from({ length: MAX_POINTS }, () => ({ x: 0, y: 0 }));
    const target = { x: 0, y: 0 };
    const head = { x: 0, y: 0 };

    const program = new Program(gl, {
      vertex: VERTEX_SHADER,
      fragment: FRAGMENT_SHADER,
      uniforms: {
        uResolution: { value: [1, 1] },
        uPoints: { value: pointData },
        uPointCount: { value: initialConfig.trailLength },
        uColor: { value: hexToRgb(initialConfig.color) },
        uSecondaryColor: { value: hexToRgb(initialConfig.secondaryColor) },
        uTrailWidth: { value: initialConfig.trailWidth },
        uTaper: { value: initialConfig.trailTaper },
        uGlowIntensity: { value: initialConfig.glowIntensity },
        uGlowSpread: { value: initialConfig.glowSpread },
        uHotspot: { value: initialConfig.hotspot },
        uBrightness: { value: initialConfig.brightness },
        uOpacity: { value: initialConfig.opacity },
        uPulseSpeed: { value: initialConfig.pulseSpeed },
        uNormalBlend: { value: initialConfig.blendMode === 'normal' ? 1 : 0 },
        uTime: { value: 0 },
        uFade: { value: 0 }
      },
      transparent: true,
      depthTest: false,
      depthWrite: false
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    let width = 1;
    let height = 1;
    let initialized = false;
    let pointerInside = false;
    let fade = 0;
    let lastInputTime = performance.now();
    let lastFrameTime = performance.now();
    let raf = 0;
    let isLoopRunning = false;
    let destroyed = false;

    const resize = () => {
      width = Math.max(window.innerWidth, 1);
      height = Math.max(window.innerHeight, 1);
      renderer.setSize(width, height);
      program.uniforms.uResolution.value = [width, height];
    };

    const initializeTrail = (x: number, y: number) => {
      target.x = x;
      target.y = y;
      head.x = x;
      head.y = y;
      for (const point of points) {
        point.x = x;
        point.y = y;
      }
      initialized = true;
      fade = 1;
    };

    const updatePointer = (event: MouseEvent | PointerEvent) => {
      const x = event.clientX;
      const y = height - event.clientY; // WebGL origin is bottom-left
      if (!initialized) initializeTrail(x, y);
      target.x = x;
      target.y = y;
      pointerInside = true;
      lastInputTime = performance.now();

      if (!isLoopRunning && initialized && !destroyed) {
        isLoopRunning = true;
        lastFrameTime = performance.now();
        raf = requestAnimationFrame(render);
      }
    };

    const onPointerLeave = () => {
      pointerInside = false;
      lastInputTime = performance.now();
    };

    const render = (now: number) => {
      if (destroyed) {
        isLoopRunning = false;
        return;
      }

      const config = propsRef.current;
      const delta = Math.min((now - lastFrameTime) / 16.667, 3);
      lastFrameTime = now;

      if (initialized) {
        const headEase = 1 - Math.pow(1 - clamp(config.followSpeed, 0.01, 0.99), delta);
        const chainBase = clamp(0.28 + config.followSpeed * 0.35, 0.08, 0.92);
        const chainEase = 1 - Math.pow(1 - chainBase, delta);
        head.x += (target.x - head.x) * headEase;
        head.y += (target.y - head.y) * headEase;
        points[0].x = head.x;
        points[0].y = head.y;

        for (let i = 1; i < MAX_POINTS; i++) {
          points[i].x += (points[i - 1].x - points[i].x) * chainEase;
          points[i].y += (points[i - 1].y - points[i].y) * chainEase;
        }

        for (let i = 0; i < MAX_POINTS; i++) {
          pointData[i * 2] = points[i].x;
          pointData[i * 2 + 1] = points[i].y;
        }
      }

      const idleFor = now - lastInputTime;
      const shouldFade = config.idleFade && (!pointerInside || idleFor > config.idleTimeout);
      const fadeStep = (16.667 * delta) / Math.max(config.fadeDuration, 16);
      const fadeTarget = initialized && config.enabled && !shouldFade ? 1 : 0;
      fade += (fadeTarget - fade) * Math.min(1, fadeStep * 7);

      // Idle optimization: Stop animation loop when fully faded out
      if (fade <= 0.001 && fadeTarget === 0) {
        fade = 0;
        gl.clear(gl.COLOR_BUFFER_BIT);
        isLoopRunning = false;
        return; // Halt RAF until user moves pointer again
      }

      program.uniforms.uPointCount.value = clamp(Math.round(config.trailLength), 2, MAX_POINTS);
      program.uniforms.uColor.value = hexToRgb(config.color);
      program.uniforms.uSecondaryColor.value = hexToRgb(config.secondaryColor);
      program.uniforms.uTrailWidth.value = Math.max(config.trailWidth, 0.1);
      program.uniforms.uTaper.value = clamp(config.trailTaper, 0, 1);
      program.uniforms.uGlowIntensity.value = Math.max(config.glowIntensity, 0);
      program.uniforms.uGlowSpread.value = Math.max(config.glowSpread, 0);
      program.uniforms.uHotspot.value = clamp(config.hotspot, 0, 1);
      program.uniforms.uBrightness.value = Math.max(config.brightness, 0);
      program.uniforms.uOpacity.value = clamp(config.opacity, 0, 1);
      program.uniforms.uPulseSpeed.value = config.pulseSpeed;
      program.uniforms.uNormalBlend.value = config.blendMode === 'normal' ? 1 : 0;
      program.uniforms.uTime.value = now * 0.001;
      program.uniforms.uFade.value = fade;

      renderer.render({ scene: mesh });
      if (!destroyed) {
        raf = requestAnimationFrame(render);
        isLoopRunning = true;
      }
    };

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', updatePointer, { passive: true });
    window.addEventListener('pointerdown', updatePointer, { passive: true });
    document.addEventListener('mouseleave', onPointerLeave);
    window.addEventListener('blur', onPointerLeave);

    resize();
    isLoopRunning = true;
    raf = requestAnimationFrame(render);

    return () => {
      destroyed = true;
      isLoopRunning = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', updatePointer);
      window.removeEventListener('pointerdown', updatePointer);
      document.removeEventListener('mouseleave', onPointerLeave);
      window.removeEventListener('blur', onPointerLeave);
      mesh.geometry.remove();
      program.remove();
    };
  }, [maxDevicePixelRatio, isTouchOrMobile, prefersReducedMotion, enabled]);

  if (isTouchOrMobile || prefersReducedMotion || !enabled) {
    return <>{children}</>;
  }

  return (
    <div ref={containerRef} className={`glow-cursor${className ? ` ${className}` : ''}`} style={style} {...rest}>
      <canvas ref={canvasRef} className="glow-cursor__canvas" style={{ mixBlendMode: blendMode }} aria-hidden="true" />
      <div className="glow-cursor__content">{children}</div>
    </div>
  );
};

export default GlowCursor;
