import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, TransformControls, useTexture, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { ItemType, PlacedItem, THEMES } from './FengShuiGame';

const THEME_COLORS = {
  lightWood: '#d1a783',
  darkWood: '#4a3b32',
  concrete: '#9e9e9e',
  carpet: '#e3dfd8'
};

// Convert 2D 0-100 coordinates to 3D world coordinates (-5 to 5)
const to3D = (val: number) => (val / 100) * 10 - 5;
const to2D = (val: number) => ((val + 5) / 10) * 100;

const DraggableItem = ({ 
  item, 
  onUpdate 
}: { 
  item: PlacedItem; 
  onUpdate: (type: ItemType, pos: {x: number, y: number}, rot: number) => void 
}) => {
  const meshRef = useRef<THREE.Group>(null);
  
  // We use TransformControls from drei for easy translation
  return (
    <TransformControls 
      mode="translate" 
      showY={false} // Only move on X and Z floor
      // @ts-ignore - type missing in some versions of drei
      onDraggingChanged={(e) => {
        if (!e?.value && meshRef.current) {
          // Finished dragging, update parent state
          const newX = to2D(meshRef.current.position.x);
          const newZ = to2D(meshRef.current.position.z);
          onUpdate(item.type, { x: newX, y: newZ }, item.rotation);
        }
      }}
    >
      <group 
        ref={meshRef} 
        position={[to3D(item.x), 0, to3D(item.y)]} 
        rotation={[0, -item.rotation * (Math.PI / 180), 0]} // Convert deg to rad
        scale={item.scale}
      >
        <ItemModel type={item.type} customImage={item.customImage} />
      </group>
    </TransformControls>
  );
};

const ItemModel = ({ type, customImage }: { type: ItemType, customImage?: string }) => {
  // Simple primitives based on type
  if (type === 'bed') {
    return (
      <group>
        <mesh position={[0, 0.4, 0]} castShadow>
          <boxGeometry args={[1.6, 0.8, 2.2]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.8} />
        </mesh>
        {/* Pillow */}
        <mesh position={[0, 0.85, -0.8]} castShadow>
          <boxGeometry args={[1.2, 0.15, 0.4]} />
          <meshStandardMaterial color="#E2E8F0" />
        </mesh>
      </group>
    );
  }
  if (type === 'desk') {
    return (
      <group>
        <mesh position={[0, 0.75, 0]} castShadow>
          <boxGeometry args={[1.5, 0.05, 0.8]} />
          <meshStandardMaterial color="#8C7862" />
        </mesh>
        <mesh position={[-0.7, 0.375, 0]} castShadow>
          <boxGeometry args={[0.05, 0.75, 0.7]} />
          <meshStandardMaterial color="#1C1917" />
        </mesh>
        <mesh position={[0.7, 0.375, 0]} castShadow>
          <boxGeometry args={[0.05, 0.75, 0.7]} />
          <meshStandardMaterial color="#1C1917" />
        </mesh>
      </group>
    );
  }
  if (type === 'sofa') {
    return (
      <group>
        <mesh position={[0, 0.25, 0]} castShadow>
          <boxGeometry args={[2.2, 0.5, 0.9]} />
          <meshStandardMaterial color="#D8B4FE" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.6, -0.35]} castShadow>
          <boxGeometry args={[2.2, 0.7, 0.2]} />
          <meshStandardMaterial color="#D8B4FE" roughness={0.9} />
        </mesh>
      </group>
    );
  }
  if (type === 'rug') {
    return (
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2.5, 3.5]} />
        <meshStandardMaterial color="#33302E" roughness={1} />
      </mesh>
    );
  }
  if (type === 'plant') {
    return (
      <group>
        <mesh position={[0, 0.3, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.15, 0.6, 16]} />
          <meshStandardMaterial color="#E5E7EB" />
        </mesh>
        <mesh position={[0, 0.9, 0]} castShadow>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshStandardMaterial color="#4ade80" roughness={0.6} />
        </mesh>
      </group>
    );
  }
  if (type === 'custom' && customImage) {
    return <CustomImageBillboard url={customImage} />;
  }
  return null;
};

const CustomImageBillboard = ({ url }: { url: string }) => {
  const texture = useTexture(url);
  // Standing upright like a billboard
  return (
    <mesh position={[0, 1, 0]} castShadow>
      <planeGeometry args={[2, 2]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} transparent />
    </mesh>
  );
};

const ApartmentModel = () => {
  const { scene } = useGLTF('/assets/game/appartement.glb');
  return <primitive object={scene} position={[0, -0.01, 0]} receiveShadow castShadow />;
};

export const FengShuiGame3DCanvas = ({ 
  placedItems, 
  theme,
  onUpdateItem 
}: { 
  placedItems: PlacedItem[], 
  theme: keyof typeof THEME_COLORS,
  onUpdateItem: (type: ItemType, pos: {x: number, y: number}, rot: number) => void 
}) => {
  return (
    <div className="absolute inset-0 z-10 w-full h-full bg-black">
      <Canvas shadows camera={{ position: [0, 8, 8], fov: 45 }}>
        <color attach="background" args={['#000000']} />
        
        <ambientLight intensity={1.2} />
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={2} 
          castShadow 
          shadow-mapSize-width={1024} 
          shadow-mapSize-height={1024} 
          shadow-camera-far={20}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-5, 5, -5]} intensity={1} color="#D8B4FE" />

        {/* The 3D Apartment Model */}
        <ApartmentModel />

        {placedItems.map(item => (
          <DraggableItem key={item.type} item={item} onUpdate={onUpdateItem} />
        ))}

        <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2.1} />
      </Canvas>
    </div>
  );
};
