"use client";
import { useEffect, useRef } from 'react';
import { createNoise3D } from 'simplex-noise';

function Vortex({ 
  backgroundColor = "black",
  rangeY = 800,
  particleCount = 300,
  baseHue = 120,
  children 
}) {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const noise3D = createNoise3D();
    
    let particles = [];
    let animationFrameId;
    let time = 0;
    
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    class Particle {
      constructor() {
        this.reset();
      }
      
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = 0;
        this.vy = 0;
        this.radius = Math.random() * 2 + 1;
        this.alpha = Math.random() * 0.3 + 0.2;
        this.hue = baseHue + Math.random() * 30 - 15;
      }
      
      update() {
        const noise = noise3D(this.x * 0.0005, this.y * 0.0005, time * 0.0002) * 2;
        
        this.vx += Math.cos(noise) * 0.05;
        this.vy += Math.sin(noise) * 0.05;
        
        this.x += this.vx;
        this.y += this.vy;
        
        this.vx *= 0.99;
        this.vy *= 0.99;
        
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset();
        }
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 70%, 60%, ${this.alpha})`;
        ctx.fill();
      }
    }
    
    const init = () => {
      particles = Array.from({ length: particleCount }, () => new Particle());
    };
    
    const animate = () => {
      ctx.fillStyle = `${backgroundColor}`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      time++;
      animationFrameId = requestAnimationFrame(animate);
    };
    
    resize();
    init();
    animate();
    
    window.addEventListener('resize', resize);
    
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [backgroundColor, rangeY, particleCount, baseHue]);
  
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor
        }}
      />
      {children}
    </div>
  );
}

export default Vortex; 