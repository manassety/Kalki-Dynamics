'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Animate parts inside the 3D Scene
function SentinelCore() {
    const meshRef = useRef<THREE.Mesh>(null);
    const ringRef1 = useRef<THREE.Mesh>(null);
    const ringRef2 = useRef<THREE.Mesh>(null);
    const pointsRef = useRef<THREE.Points>(null);

    useFrame((state) => {
        const clock = state.clock;
        const time = clock.getElapsedTime();

        if (meshRef.current) {
            meshRef.current.rotation.y = time * 0.4;
            meshRef.current.rotation.x = time * 0.15;
        }
        if (ringRef1.current) {
            ringRef1.current.rotation.y = -time * 0.6;
            ringRef1.current.rotation.x = time * 0.3;
        }
        if (ringRef2.current) {
            ringRef2.current.rotation.z = time * 0.8;
            ringRef2.current.rotation.y = time * 0.2;
        }
        if (pointsRef.current) {
            pointsRef.current.rotation.y = time * 0.1;
        }
    });

    // Create cloud of vertices for AI holographic particles
    const particleCount = 180;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const r = 2.4; // Orbit radius
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
    }

    return (
        <group>
            {/* Central AI Processor Core - Geodesic wireframe */}
            <mesh ref={meshRef}>
                <icosahedronGeometry args={[1.2, 1]} />
                <meshBasicMaterial
                    color="#ea0614"
                    wireframe
                    transparent
                    opacity={0.65}
                />
            </mesh>

            {/* Internal Solid Pulsing Core */}
            <mesh>
                <sphereGeometry args={[0.4, 16, 16]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
            </mesh>

            {/* Orbiting Tech Ring 1 */}
            <mesh ref={ringRef1} rotation={[Math.PI / 4, 0, 0]}>
                <torusGeometry args={[2.0, 0.03, 8, 64]} />
                <meshBasicMaterial color="#ea0614" transparent opacity={0.5} />
            </mesh>

            {/* Orbiting Tech Ring 2 */}
            <mesh ref={ringRef2} rotation={[Math.PI / 2, Math.PI / 4, 0]}>
                <torusGeometry args={[2.2, 0.02, 6, 48]} />
                <meshBasicMaterial color="#c0c0c0" transparent opacity={0.3} />
            </mesh>

            {/* Node Cloud particles */}
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[positions, 3]}
                    />
                </bufferGeometry>
                <pointsMaterial
                    color="#ea0614"
                    size={0.06}
                    transparent
                    opacity={0.8}
                />
            </points>

            {/* Radar scanning cylinder ring */}
            <mesh position={[0, -0.1, 0]}>
                <cylinderGeometry args={[2.5, 2.5, 0.05, 32, 1, true]} />
                <meshBasicMaterial
                    color="#ea0614"
                    wireframe
                    transparent
                    opacity={0.12}
                />
            </mesh>
        </group>
    );
}

export default function ThreeDScene() {
    return (
        <div className="w-full h-full min-h-[300px] relative flex items-center justify-center">
            {/* Ambient background indicators */}
            <div className="absolute top-4 left-4 font-mono text-[8px] text-[#444] tracking-widest pointer-events-none">
                SENTINEL MODEL STATUS: SYS_CALIBRATED<br />
                FOV: 45deg | HD_HOLOGRAM
            </div>

            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#ea0614" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#c0c0c0" />
                <SentinelCore />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    );
}
