"use client";
import * as THREE from "three";
import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Environment, ContactShadows, PerspectiveCamera, RoundedBox } from "@react-three/drei";

function LaptopModel({ scrollProgress, videoSrc }: { scrollProgress: number, videoSrc?: string }) {
    const group = useRef<THREE.Group>(null);
    const lid = useRef<THREE.Group>(null);

    // High-performance Three.js frame loop
    useFrame((state) => {
        if (!lid.current || !group.current) return;

        // Animation sequence:
        // 1. Laptop starts closed - screen flat on keyboard (towards viewer)
        // 2. As user scrolls DOWN, screen lifts UP towards viewer
        // 3. Laptop scales up and comes into view

        // Acceleration factor for "extremely fast" unfolding
        const t = Math.min(1, Math.max(0, scrollProgress * 4.0)); // 4x speed

        // Lid opening: Start CLOSED (standing up, +100°), end OPEN (flat, 0°)
        // As user scrolls DOWN, laptop opens (angle decreases from 100° to 0°)
        const closedAngle = 1.75; // ~100 degrees - laptop closed/standing
        const openAngle = 0; // 0 degrees - laptop open/flat
        const lidRotation = closedAngle + (t * (openAngle - closedAngle));
        lid.current.rotation.x = lidRotation;

        // Scale and Position
        const scale = 0.6 + t * 0.45;
        group.current.scale.set(scale, scale, scale);

        // Perspective rotation for 3D depth - reduced for better view when closed
        group.current.rotation.y = Math.sin(t * Math.PI) * 0.1;
        group.current.rotation.x = 0.15 - (t * 0.15);

        // Subtle float
        group.current.position.y = -0.4 + Math.sin(state.clock.elapsedTime * 0.5) * 0.03;
    });

    return (
        <group ref={group} position={[0, -0.4, 0]}>
            {/* Base / Keyboard Section */}
            <group position={[0, 0, 0]}>
                {/* Main base body */}
                <RoundedBox args={[4.2, 0.15, 2.8]} radius={0.05} smoothness={4} castShadow receiveShadow>
                    <meshStandardMaterial
                        color="#2a2a2a"
                        metalness={0.9}
                        roughness={0.1}
                        envMapIntensity={1.5}
                    />
                </RoundedBox>

                {/* Keyboard area (darker inset) */}
                <mesh position={[0, 0.08, -0.1]} receiveShadow>
                    <boxGeometry args={[3.8, 0.01, 2.2]} />
                    <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.2} />
                </mesh>

                {/* Trackpad */}
                <mesh position={[0, 0.08, 0.85]} receiveShadow>
                    <boxGeometry args={[1.2, 0.01, 0.8]} />
                    <meshStandardMaterial color="#252525" roughness={0.3} metalness={0.7} />
                </mesh>

                {/* Keyboard keys simulation (grid of small rectangles) */}
                {Array.from({ length: 60 }).map((_, i) => {
                    const row = Math.floor(i / 12);
                    const col = i % 12;
                    const x = -1.7 + col * 0.3;
                    const z = -1.0 + row * 0.3;
                    return (
                        <mesh key={i} position={[x, 0.09, z]}>
                            <boxGeometry args={[0.25, 0.02, 0.25]} />
                            <meshStandardMaterial color="#333" roughness={0.6} />
                        </mesh>
                    );
                })}
            </group>

            {/* Lid Group (contains screen) - pivot at BACK edge */}
            <group ref={lid} position={[0, 0.075, -1.45]}>
                {/* Lid back (outer shell) - offset to create gap */}
                <RoundedBox args={[4.2, 2.8, 0.12]} radius={0.05} smoothness={4} position={[0, 1.45, -0.06]} castShadow>
                    <meshStandardMaterial
                        color="#1a1a1a"
                        metalness={1}
                        roughness={0.05}
                        envMapIntensity={2}
                    />
                </RoundedBox>

                {/* Screen bezel */}
                <RoundedBox args={[4.0, 2.6, 0.08]} radius={0.03} smoothness={4} position={[0, 1.45, 0.02]} castShadow>
                    <meshStandardMaterial color="#0a0a0a" metalness={0.8} roughness={0.2} />
                </RoundedBox>

                {/* Actual screen (glossy black when off) */}
                <mesh position={[0, 1.45, 0.065]}>
                    <boxGeometry args={[3.7, 2.3, 0.01]} />
                    <meshStandardMaterial
                        color="#000000"
                        metalness={0.1}
                        roughness={0.1}
                        emissive="#000000"
                        emissiveIntensity={0.1}
                    />
                </mesh>

                {/* Video/Content overlay */}
                <Html
                    transform
                    distanceFactor={2.4}
                    position={[0, 1.45, 0.07]}
                    rotation-x={0}
                    rotation-y={0}
                    rotation-z={0}
                    center
                    className="bg-black overflow-hidden"
                    style={{
                        width: '740px',
                        height: '460px',
                        borderRadius: '4px'
                    }}
                >
                    {videoSrc ? (
                        <video
                            src={videoSrc}
                            autoPlay
                            muted
                            loop
                            playsInline
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '4px'
                            }}
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-900 via-black to-indigo-900 flex items-center justify-center">
                            <h1 className="text-white text-4xl font-bold">TechVision AI</h1>
                        </div>
                    )}
                </Html>

                {/* Camera notch (optional, for realism) */}
                <mesh position={[0, 2.7, 0.065]}>
                    <sphereGeometry args={[0.02, 16, 16]} />
                    <meshStandardMaterial color="#0a0a0a" emissive="#001a00" emissiveIntensity={0.2} />
                </mesh>
            </group>
        </group>
    );
}

export default function ThreeLaptopReveal({ scrollProgress, videoSrc }: { scrollProgress: number, videoSrc?: string }) {
    return (
        <div className="w-full h-full">
            <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
                <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={40} />

                {/* Enhanced lighting for premium look */}
                <ambientLight intensity={0.8} />
                <pointLight position={[10, 10, 10]} intensity={2} castShadow shadow-mapSize={[2048, 2048]} />
                <pointLight position={[-10, 5, 5]} intensity={1.5} color="#4080ff" />
                <spotLight
                    position={[0, 10, 0]}
                    angle={0.3}
                    penumbra={1}
                    intensity={1.5}
                    castShadow
                    shadow-mapSize={[2048, 2048]}
                />

                {/* Rim light for edge definition */}
                <pointLight position={[0, 0, -5]} intensity={0.5} color="#6090ff" />

                <Suspense fallback={null}>
                    <LaptopModel scrollProgress={scrollProgress} videoSrc={videoSrc} />
                    <Environment preset="city" />
                    <ContactShadows
                        position={[0, -0.65, 0]}
                        opacity={0.5}
                        scale={12}
                        blur={2.5}
                        far={4}
                        resolution={256}
                        color="#000000"
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}
