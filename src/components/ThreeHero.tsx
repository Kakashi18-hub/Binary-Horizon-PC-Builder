'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Float, useCursor, Text } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { IPart } from '@/models';

interface ComponentProps {
    position: [number, number, number];
    color: string;
    name: string;
    visible: boolean;
    type: string;
}

function Component({ position, color, name, visible, type }: ComponentProps) {
    const meshRef = useRef<THREE.Mesh>(null!);
    const [hovered, setHovered] = useState(false);
    const [currentPos, setCurrentPos] = useState<THREE.Vector3>(new THREE.Vector3(position[0] + 5, position[1], position[2]));
    const targetPos = new THREE.Vector3(...position);

    useCursor(hovered);

    useFrame((state, delta) => {
        if (visible) {
            // Magnetic snapping effect using lerp
            currentPos.lerp(targetPos, 0.1);
            if (meshRef.current) {
                meshRef.current.position.copy(currentPos);
                meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
            }
        } else {
            // Reset position when not visible so it can "fly in" again
            currentPos.set(position[0] + 5, position[1], position[2]);
            if (meshRef.current) {
                meshRef.current.scale.set(0, 0, 0);
            }
        }
    });

    return (
        <group>
            <mesh
                ref={meshRef}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                scale={[0, 0, 0]}
            >
                {type === 'cpu' && <boxGeometry args={[0.4, 0.4, 0.1]} />}
                {type === 'gpu' && <boxGeometry args={[1.5, 0.7, 0.4]} />}
                {type === 'motherboard' && <boxGeometry args={[2.0, 2.6, 0.1]} />}
                {type === 'ram' && <boxGeometry args={[0.1, 0.9, 0.3]} />}
                {type === 'psu' && <boxGeometry args={[1.0, 0.8, 1.0]} />}
                {type === 'storage' && <boxGeometry args={[0.4, 0.7, 0.05]} />}

                <meshStandardMaterial
                    color={color}
                    metalness={0.8}
                    roughness={0.2}
                    emissive={hovered ? color : '#000'}
                    emissiveIntensity={0.5}
                />
            </mesh>

            {hovered && visible && (
                <Text
                    position={[currentPos.x, currentPos.y + 1, currentPos.z]}
                    fontSize={0.2}
                    color="black"
                    anchorX="center"
                    anchorY="middle"
                >
                    {name}
                </Text>
            )}
        </group>
    );
}

function Chassis({ selectedParts }: { selectedParts: Record<string, IPart | null> }) {
    return (
        <group>
            {/* Case Shell */}
            <mesh>
                <boxGeometry args={[2.4, 3.4, 1.4]} />
                <meshStandardMaterial
                    color="#111"
                    transparent
                    opacity={0.1}
                    roughness={0}
                    metalness={1}
                    side={THREE.BackSide}
                />
            </mesh>

            {/* Internal Frame */}
            <mesh>
                <boxGeometry args={[2.3, 3.3, 1.3]} />
                <meshStandardMaterial color="#222" wireframe opacity={0.05} transparent />
            </mesh>

            <Component
                type="motherboard"
                position={[0, 0, -0.5]}
                color="#222"
                name={selectedParts.motherboard?.name || ''}
                visible={!!selectedParts.motherboard}
            />

            <Component
                type="cpu"
                position={[0, 0.5, -0.4]}
                color="#444"
                name={selectedParts.cpu?.name || ''}
                visible={!!selectedParts.cpu}
            />

            <Component
                type="gpu"
                position={[0, -0.3, 0]}
                color="#333"
                name={selectedParts.gpu?.name || ''}
                visible={!!selectedParts.gpu}
            />

            <Component
                type="ram"
                position={[0.5, 0.5, -0.4]}
                color="#555"
                name={selectedParts.ram?.name || ''}
                visible={!!selectedParts.ram}
            />

            <Component
                type="psu"
                position={[0, -1.3, 0]}
                color="#111"
                name={selectedParts.psu?.name || ''}
                visible={!!selectedParts.psu}
            />
        </group>
    );
}

export default function ThreeHero({ selectedParts = {} }: { selectedParts?: Record<string, IPart | null> }) {
    return (
        <div className="w-full h-[500px] bg-neutral-50 rounded-3xl overflow-hidden shadow-soft border border-neutral-100 relative group">
            <div className="absolute top-6 left-6 z-10 pointer-events-none">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">Real-time Visualizer</h4>
                <p className="text-xs font-bold text-neutral-900">Magnetic Attachment Engine</p>
            </div>

            <Canvas shadows dpr={[1, 2]} camera={{ position: [4, 2, 6], fov: 35 }}>
                <OrbitControls
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 1.8}
                    minPolarAngle={Math.PI / 3}
                    autoRotate={Object.values(selectedParts).every(p => p === null)}
                    autoRotateSpeed={0.5}
                />
                <ambientLight intensity={1} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2000} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={500} color="#fff" />

                <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                    <Chassis selectedParts={selectedParts} />
                </Float>

                <gridHelper args={[20, 20, 0x444444, 0xdddddd]} position={[0, -2, 0]} />
            </Canvas>

            <div className="absolute bottom-6 right-6 text-right pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-[10px] text-neutral-400 uppercase font-black">Controls</p>
                <p className="text-[10px] text-neutral-500">Drag to Rotate • Select Parts to Install</p>
            </div>
        </div>
    );
}
