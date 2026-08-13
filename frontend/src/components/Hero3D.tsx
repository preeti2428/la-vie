import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, PhoneCall, RefreshCw, Sun, Moon, Flower2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface Hero3DProps {
  currentLang: Language;
  onOpenBooking: () => void;
  onOpenChat: () => void;
  onOpenStaging: () => void;
}

type LightingMood = 'lavender' | 'golden' | 'daylight';

export const Hero3D: React.FC<Hero3DProps> = ({ currentLang, onOpenBooking, onOpenChat, onOpenStaging }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [lightingMood, setLightingMood] = useState<LightingMood>('lavender');

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const roomGroupRef = useRef<THREE.Group | null>(null);
  const energyParticlesRef = useRef<THREE.Points | null>(null);
  const particleMatRef = useRef<THREE.PointsMaterial | null>(null);
  const mainSunRef = useRef<THREE.DirectionalLight | null>(null);
  const fillLightRef = useRef<THREE.DirectionalLight | null>(null);
  const moodPointLightRef = useRef<THREE.PointLight | null>(null);
  const lampSpotLightRef = useRef<THREE.SpotLight | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    const initialBgColor = new THREE.Color(0xF3EFF8);
    scene.background = initialBgColor;
    scene.fog = new THREE.FogExp2(0xF3EFF8, 0.022);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 2.7, 7.8);
    camera.lookAt(0, 0.4, 0);
    cameraRef.current = camera;

    // 3. Renderer with high-end tone mapping
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;

    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lights & Visible Ray Beams
    const ambientLight = new THREE.AmbientLight(0xFFF8FC, 1.8);
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    // Main Sun Directional Light (Key Light for realistic directional shadows)
    const mainSun = new THREE.DirectionalLight(0xFDF4E3, 3.2);
    mainSun.position.set(5.0, 7.5, 4.0);
    mainSun.castShadow = true;
    mainSun.shadow.mapSize.width = 2048;
    mainSun.shadow.mapSize.height = 2048;
    mainSun.shadow.camera.near = 0.5;
    mainSun.shadow.camera.far = 20;
    mainSun.shadow.camera.left = -5.5;
    mainSun.shadow.camera.right = 5.5;
    mainSun.shadow.camera.top = 5.5;
    mainSun.shadow.camera.bottom = -5.5;
    mainSun.shadow.bias = -0.0002;
    mainSun.shadow.radius = 3;
    scene.add(mainSun);
    mainSunRef.current = mainSun;

    // Fill Light (Soft cool ambient counter-light)
    const fillLight = new THREE.DirectionalLight(0xE2D8EE, 1.2);
    fillLight.position.set(-5, 4, 3);
    scene.add(fillLight);
    fillLightRef.current = fillLight;

    // Mood Point Light
    const moodPointLight = new THREE.PointLight(0xD8B4FE, 3.8, 12);
    moodPointLight.position.set(0, 3.2, 0.5);
    moodPointLight.castShadow = true;
    scene.add(moodPointLight);
    moodPointLightRef.current = moodPointLight;

    // Lamp Spotlight (visible light cone on floor & sofa)
    const lampSpotLight = new THREE.SpotLight(0xFFFBEB, 3.5, 10, Math.PI / 4, 0.4, 1);
    lampSpotLight.position.set(2.8, 2.8, -1.6);
    lampSpotLight.target.position.set(1.5, 0, 0.2);
    lampSpotLight.castShadow = true;
    scene.add(lampSpotLight);
    scene.add(lampSpotLight.target);
    lampSpotLightRef.current = lampSpotLight;

    // 5. Build Architectural Luxury Room Group
    const roomGroup = new THREE.Group();
    scene.add(roomGroup);
    roomGroupRef.current = roomGroup;

    // Light Honey Oak Parquet Floor
    const floorGeo = new THREE.PlaneGeometry(10, 10, 16, 16);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xCBB398,
      roughness: 0.35,
      metalness: 0.05,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    roomGroup.add(floor);

    // --- HIGH CONTRAST CHARCOAL / DEEP SLATE WOOL RUG ---
    const rugGeo = new THREE.CylinderGeometry(2.7, 2.7, 0.02, 48);
    const rugMat = new THREE.MeshStandardMaterial({
      color: 0x33302E,
      roughness: 0.9,
    });
    const rug = new THREE.Mesh(rugGeo, rugMat);
    rug.position.set(0, 0.01, 0.1);
    rug.receiveShadow = true;
    roomGroup.add(rug);

    // Back Architectural Wall
    const wallGeo = new THREE.BoxGeometry(10, 4.6, 0.2);
    const wallMat = new THREE.MeshStandardMaterial({ color: 0xF3EEE8, roughness: 0.6 });
    const wall = new THREE.Mesh(wallGeo, wallMat);
    wall.position.set(0, 2.3, -4);
    wall.receiveShadow = true;
    roomGroup.add(wall);

    // Vertical Ribbed Wood Slat Accent Panel behind Sofa
    const slatPanelMat = new THREE.MeshStandardMaterial({ color: 0x8C7862, roughness: 0.4 });
    for (let i = -2.8; i <= 2.8; i += 0.28) {
      const slatGeo = new THREE.BoxGeometry(0.12, 3.8, 0.05);
      const slat = new THREE.Mesh(slatGeo, slatPanelMat);
      slat.position.set(i, 2.1, -3.88);
      slat.castShadow = true;
      roomGroup.add(slat);
    }

    // Common Gold Brass Material
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xD97706, metalness: 0.9, roughness: 0.1 });

    // =========================================================
    // --- 3-PIECE GALLERY WALL TRIPTYCH (FENG SHUI & BOTANICAL ART) ---
    // =========================================================
    const galleryGroup = new THREE.Group();
    galleryGroup.position.set(0, 2.7, -3.82);

    const frameGoldBorderMat = new THREE.MeshStandardMaterial({ color: 0xB4823B, metalness: 0.85, roughness: 0.2 });
    const matBoardMat = new THREE.MeshStandardMaterial({ color: 0xF9F7F2, roughness: 0.9 });

    // 1. Center Frame (Large Abstract Feng Shui Wave)
    const centerFrameOuter = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.5, 0.05), frameGoldBorderMat);
    galleryGroup.add(centerFrameOuter);

    const centerMatBoard = new THREE.Mesh(new THREE.PlaneGeometry(2.08, 1.38), matBoardMat);
    centerMatBoard.position.z = 0.028;
    galleryGroup.add(centerMatBoard);

    // Center Art Canvas
    const centerCanvasMat = new THREE.MeshStandardMaterial({ color: 0xEADFD0, roughness: 0.7 });
    const centerCanvas = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 1.05), centerCanvasMat);
    centerCanvas.position.z = 0.032;
    galleryGroup.add(centerCanvas);

    // Gold foil arch & wave lines in center art
    const archGeo = new THREE.TorusGeometry(0.38, 0.018, 16, 32, Math.PI);
    const goldArtMat = new THREE.MeshStandardMaterial({ color: 0xD97706, metalness: 0.9, roughness: 0.1 });
    const archArt = new THREE.Mesh(archGeo, goldArtMat);
    archArt.position.set(0, 0, 0.038);
    galleryGroup.add(archArt);

    const waveLine = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.012, 16, 32, Math.PI * 0.75), goldArtMat);
    waveLine.rotation.z = Math.PI * 0.8;
    waveLine.position.set(-0.2, -0.1, 0.038);
    galleryGroup.add(waveLine);

    // 2. Left Frame (Botanical Leaf Outline Art)
    const leftFrameOuter = new THREE.Mesh(new THREE.BoxGeometry(1.05, 1.5, 0.05), frameGoldBorderMat);
    leftFrameOuter.position.set(-1.8, 0, 0);
    galleryGroup.add(leftFrameOuter);

    const leftMatBoard = new THREE.Mesh(new THREE.PlaneGeometry(0.95, 1.38), matBoardMat);
    leftMatBoard.position.set(-1.8, 0, 0.028);
    galleryGroup.add(leftMatBoard);

    const leftCanvasMat = new THREE.MeshStandardMaterial({ color: 0xE2DDD5, roughness: 0.7 });
    const leftCanvas = new THREE.Mesh(new THREE.PlaneGeometry(0.75, 1.18), leftCanvasMat);
    leftCanvas.position.set(-1.8, 0, 0.032);
    galleryGroup.add(leftCanvas);

    // Leaf line art on left frame
    const leafArtMat = new THREE.MeshStandardMaterial({ color: 0x4D5842, roughness: 0.4 });
    const leafStemArt = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.8, 12), leafArtMat);
    leafStemArt.position.set(-1.8, -0.05, 0.038);
    leafStemArt.rotation.z = -0.2;
    galleryGroup.add(leafStemArt);

    for (let l = -0.25; l <= 0.25; l += 0.15) {
      const leafCircle = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16), leafArtMat);
      leafCircle.scale.set(1.4, 0.5, 0.1);
      leafCircle.position.set(-1.8 + l * 0.6, l + 0.05, 0.038);
      leafCircle.rotation.z = l * 1.2;
      galleryGroup.add(leafCircle);
    }

    // 3. Right Frame (Minimalist Sacred Geometry Circle)
    const rightFrameOuter = new THREE.Mesh(new THREE.BoxGeometry(1.05, 1.5, 0.05), frameGoldBorderMat);
    rightFrameOuter.position.set(1.8, 0, 0);
    galleryGroup.add(rightFrameOuter);

    const rightMatBoard = new THREE.Mesh(new THREE.PlaneGeometry(0.95, 1.38), matBoardMat);
    rightMatBoard.position.set(1.8, 0, 0.028);
    galleryGroup.add(rightMatBoard);

    const rightCanvasMat = new THREE.MeshStandardMaterial({ color: 0xEDE7DF, roughness: 0.7 });
    const rightCanvas = new THREE.Mesh(new THREE.PlaneGeometry(0.75, 1.18), rightCanvasMat);
    rightCanvas.position.set(1.8, 0, 0.032);
    galleryGroup.add(rightCanvas);

    // Gold geometric circles art
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(0.25, 0.012, 16, 32), goldArtMat);
    ring1.position.set(1.8, 0.1, 0.038);
    galleryGroup.add(ring1);

    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.01, 16, 32), goldArtMat);
    ring2.position.set(1.8, -0.15, 0.038);
    galleryGroup.add(ring2);

    roomGroup.add(galleryGroup);

    // =========================================================
    // --- CURVED LUXURY PLUSH BOUCLÉ SOFA WITH VISIBLE FOLDS & SEAMS ---
    // =========================================================
    const sofaGroup = new THREE.Group();
    sofaGroup.position.set(0, 0, -0.6);

    const boucleMat = new THREE.MeshStandardMaterial({
      color: 0xFFFAF4, // Pure Warm Ivory Cream
      roughness: 0.65,
      metalness: 0.02
    });

    const seamDarkMat = new THREE.MeshStandardMaterial({
      color: 0x4A443F, // Dark seam accent for cushion divisions & piping folds
      roughness: 0.9
    });

    // 1. Base Support Plinth
    const plinthGeo = new THREE.BoxGeometry(4.4, 0.12, 1.4);
    const plinthMat = new THREE.MeshStandardMaterial({ color: 0x2A2624, roughness: 0.5 });
    const plinth = new THREE.Mesh(plinthGeo, plinthMat);
    plinth.position.set(0, 0.06, -0.1);
    plinth.receiveShadow = true;
    sofaGroup.add(plinth);

    // 2. Individual Seat Cushion Modules with Indented Foldings & Piping Seams
    const createSeatCushionModule = (xPos: number, rotY: number, width: number) => {
      const moduleGroup = new THREE.Group();
      moduleGroup.position.set(xPos, 0.28, 0);
      moduleGroup.rotation.y = rotY;

      // Main cushion pad
      const padGeo = new THREE.BoxGeometry(width, 0.38, 1.25, 12, 4, 12);
      const pad = new THREE.Mesh(padGeo, boucleMat);
      pad.castShadow = true;
      pad.receiveShadow = true;
      moduleGroup.add(pad);

      // Top Seam Line / Tufting Crease
      const seamGeo = new THREE.CylinderGeometry(0.012, 0.012, width * 0.95, 16);
      const seam1 = new THREE.Mesh(seamGeo, seamDarkMat);
      seam1.rotation.z = Math.PI / 2;
      seam1.position.set(0, 0.191, -0.2);
      moduleGroup.add(seam1);

      const seam2 = new THREE.Mesh(seamGeo, seamDarkMat);
      seam2.rotation.z = Math.PI / 2;
      seam2.position.set(0, 0.191, 0.25);
      moduleGroup.add(seam2);

      // Tufting Buttons / Stitch Indentations
      for (let b = -width * 0.3; b <= width * 0.3; b += width * 0.3) {
        const buttonGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.02, 12);
        const button = new THREE.Mesh(buttonGeo, seamDarkMat);
        button.position.set(b, 0.185, 0);
        moduleGroup.add(button);
      }

      return moduleGroup;
    };

    // Left, Center, Right Modular Seat Blocks
    sofaGroup.add(createSeatCushionModule(-1.45, 0.15, 1.4));
    sofaGroup.add(createSeatCushionModule(0, 0, 1.5));
    sofaGroup.add(createSeatCushionModule(1.45, -0.15, 1.4));

    // 3. Curved Backrest with Segmented Vertical Fold Segments
    const backrestGroup = new THREE.Group();
    backrestGroup.position.set(0, 0.88, -0.58);

    const backrestSegmentCount = 9;
    for (let s = 0; s < backrestSegmentCount; s++) {
      const frac = (s / (backrestSegmentCount - 1)) - 0.5;
      const xPos = frac * 4.2;
      const curveZ = -Math.pow(frac, 2) * 0.3;

      const segGeo = new THREE.CylinderGeometry(0.24, 0.26, 0.85, 16);
      const seg = new THREE.Mesh(segGeo, boucleMat);
      seg.position.set(xPos, 0, curveZ);
      seg.scale.set(1.1, 1.0, 0.8);
      seg.castShadow = true;
      backrestGroup.add(seg);

      // Vertical fold groove between backrest segments
      if (s < backrestSegmentCount - 1) {
        const grooveGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.82, 12);
        const groove = new THREE.Mesh(grooveGeo, seamDarkMat);
        groove.position.set(xPos + 0.26, 0, curveZ + 0.12);
        backrestGroup.add(groove);
      }
    }
    sofaGroup.add(backrestGroup);

    // 4. Plush Curved Armrests with Piping Trim
    const createArmrest = (isLeft: boolean) => {
      const armGroup = new THREE.Group();
      const xSign = isLeft ? -1 : 1;
      armGroup.position.set(xSign * 2.25, 0.65, 0);

      const armMain = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 1.15, 24), boucleMat);
      armMain.rotation.x = Math.PI / 2;
      armMain.rotation.z = xSign * -0.15;
      armMain.castShadow = true;
      armGroup.add(armMain);

      // Piping trim curve around armrest
      const pipingRing = new THREE.Mesh(new THREE.TorusGeometry(0.322, 0.012, 12, 32), seamDarkMat);
      pipingRing.position.set(0, 0, 0.45);
      armGroup.add(pipingRing);

      return armGroup;
    };

    sofaGroup.add(createArmrest(true));
    sofaGroup.add(createArmrest(false));

    // LUXURY ACCENT CUSHIONS & BLANKETS
    const lilacVelvetMat = new THREE.MeshStandardMaterial({ color: 0x8B5CF6, roughness: 0.35 });
    const sageMat = new THREE.MeshStandardMaterial({ color: 0x7D8471, roughness: 0.45 });
    const goldSilkMat = new THREE.MeshStandardMaterial({ color: 0xEAB308, roughness: 0.2, metalness: 0.3 });

    // Cushion 1 (Lilac)
    const c1 = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.48, 0.22), lilacVelvetMat);
    c1.position.set(-1.5, 0.82, -0.35);
    c1.rotation.set(0.1, 0.3, -0.1);
    c1.castShadow = true;
    sofaGroup.add(c1);

    // Cushion 2 (Sage Green)
    const c2 = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.42, 0.2), sageMat);
    c2.position.set(-1.1, 0.78, -0.3);
    c2.rotation.set(0.05, -0.2, 0);
    c2.castShadow = true;
    sofaGroup.add(c2);

    // Cushion 3 (Gold Silk)
    const c3 = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.46, 0.22), goldSilkMat);
    c3.position.set(1.4, 0.82, -0.35);
    c3.rotation.set(0.1, -0.3, 0.1);
    c3.castShadow = true;
    sofaGroup.add(c3);

    // Draped Soft Cashmere Throw Blanket on Right Armrest
    const blanketGeo = new THREE.BoxGeometry(0.7, 0.08, 0.9);
    const blanketMat = new THREE.MeshStandardMaterial({ color: 0xD8B4FE, roughness: 0.6 });
    const blanket = new THREE.Mesh(blanketGeo, blanketMat);
    blanket.position.set(1.8, 0.58, 0.1);
    blanket.rotation.z = -0.25;
    blanket.castShadow = true;
    sofaGroup.add(blanket);

    roomGroup.add(sofaGroup);

    // --- DARK SMOKED ESPRESSO / OBSIDIAN COFFEE TABLE ---
    const tableGroup = new THREE.Group();
    tableGroup.position.set(0, 0, 0.85);

    // Table Top
    const tableTopGeo = new THREE.CylinderGeometry(1.1, 1.1, 0.08, 48);
    const darkWoodMat = new THREE.MeshStandardMaterial({
      color: 0x1C1917,
      roughness: 0.2,
      metalness: 0.1
    });
    const tableTop = new THREE.Mesh(tableTopGeo, darkWoodMat);
    tableTop.position.y = 0.35;
    tableTop.castShadow = true;
    tableTop.receiveShadow = true;
    tableGroup.add(tableTop);

    // Gold Brass Rim
    const rimGeo = new THREE.TorusGeometry(1.11, 0.015, 16, 64);
    const rim = new THREE.Mesh(rimGeo, goldMat);
    rim.rotation.x = Math.PI / 2;
    rim.position.y = 0.35;
    tableGroup.add(rim);

    // Brass Fluted Base
    const tableBaseGeo = new THREE.CylinderGeometry(0.45, 0.55, 0.35, 32);
    const tableBase = new THREE.Mesh(tableBaseGeo, goldMat);
    tableBase.position.y = 0.175;
    tableBase.castShadow = true;
    tableGroup.add(tableBase);

    // =========================================================
    // --- REALISTIC HIGH-DETAIL TULIP BOUQUET IN CRYSTAL VASE ---
    // =========================================================
    const vaseGeo = new THREE.CylinderGeometry(0.18, 0.24, 0.52, 32);
    const crystalGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0xFFFFFF,
      transmission: 0.95,
      opacity: 1,
      transparent: true,
      roughness: 0.02,
      ior: 1.5,
      thickness: 0.25
    });
    const vase = new THREE.Mesh(vaseGeo, crystalGlassMat);
    vase.position.set(-0.35, 0.65, 0.1);
    vase.castShadow = true;
    tableGroup.add(vase);

    // Water level inside vase
    const waterGeo = new THREE.CylinderGeometry(0.19, 0.21, 0.28, 32);
    const waterMat = new THREE.MeshStandardMaterial({ color: 0xE0F2FE, roughness: 0.1, transparent: true, opacity: 0.5 });
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.position.set(-0.35, 0.52, 0.1);
    tableGroup.add(water);

    const bouquetGroup = new THREE.Group();
    bouquetGroup.position.set(-0.35, 0.9, 0.1);

    const stemMat = new THREE.MeshStandardMaterial({ color: 0x3F6212, roughness: 0.35 });
    const tulipLeafMat = new THREE.MeshStandardMaterial({ color: 0x4D7C0F, roughness: 0.28, side: THREE.DoubleSide });

    const yellowTulipMat = new THREE.MeshStandardMaterial({
      color: 0xFACC15,
      roughness: 0.2,
      emissive: 0xCA8A04,
      emissiveIntensity: 0.18
    });

    const purpleTulipMat = new THREE.MeshStandardMaterial({
      color: 0x8B5CF6,
      roughness: 0.2,
      emissive: 0x581C87,
      emissiveIntensity: 0.22
    });

    // Realistic 6-petal Tulip Flower Head with inner/outer petal layers & stamen
    const createTulipHead = (isYellow: boolean) => {
      const headGroup = new THREE.Group();
      const petalMat = isYellow ? yellowTulipMat : purpleTulipMat;

      // Outer Petal Layer (3 petals)
      for (let p = 0; p < 3; p++) {
        const angle = (p / 3) * Math.PI * 2;
        const petalGeo = new THREE.SphereGeometry(0.068, 16, 16, 0, Math.PI * 1.1, 0, Math.PI * 0.85);
        const petal = new THREE.Mesh(petalGeo, petalMat);
        petal.rotation.y = angle;
        petal.rotation.z = 0.22;
        petal.position.set(Math.cos(angle) * 0.025, 0, Math.sin(angle) * 0.025);
        petal.scale.set(0.65, 1.25, 0.65);
        headGroup.add(petal);
      }

      // Inner Petal Layer (3 petals shifted 60 degrees)
      for (let p = 0; p < 3; p++) {
        const angle = (p / 3) * Math.PI * 2 + Math.PI / 3;
        const petalGeo = new THREE.SphereGeometry(0.06, 16, 16, 0, Math.PI * 1.1, 0, Math.PI * 0.85);
        const petal = new THREE.Mesh(petalGeo, petalMat);
        petal.rotation.y = angle;
        petal.rotation.z = 0.12;
        petal.position.set(Math.cos(angle) * 0.015, 0.01, Math.sin(angle) * 0.015);
        petal.scale.set(0.6, 1.2, 0.6);
        headGroup.add(petal);
      }

      // Stamen Core
      const stamenCoreMat = new THREE.MeshStandardMaterial({ color: 0x1A1817 });
      const stamenAntherMat = new THREE.MeshStandardMaterial({ color: 0xEAB308 });
      for (let s = 0; s < 4; s++) {
        const angle = (s / 4) * Math.PI * 2;
        const stamen = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.05, 8), stamenCoreMat);
        stamen.position.set(Math.cos(angle) * 0.01, 0.02, Math.sin(angle) * 0.01);
        headGroup.add(stamen);

        const anther = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.015, 0.008), stamenAntherMat);
        anther.position.set(Math.cos(angle) * 0.01, 0.045, Math.sin(angle) * 0.01);
        headGroup.add(anther);
      }

      return headGroup;
    };

    // Populate 16 Yellow & Purple Tulips
    const tulipCount = 16;
    for (let i = 0; i < tulipCount; i++) {
      const isYellow = i % 2 === 0;
      const angle = (i / tulipCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.15;
      const radius = 0.035 + (i % 3) * 0.045;
      const stemHeight = 0.48 + (i % 4) * 0.08;

      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.009, stemHeight, 12), stemMat);
      const xPos = Math.cos(angle) * radius;
      const zPos = Math.sin(angle) * radius;
      stem.position.set(xPos, stemHeight / 2, zPos);
      stem.rotation.z = (Math.random() - 0.5) * 0.35;
      stem.rotation.x = (Math.random() - 0.5) * 0.35;
      bouquetGroup.add(stem);

      // Organic Curved Tulip Leaf
      const leafGeo = new THREE.BoxGeometry(0.055, 0.008, 0.24);
      const leaf = new THREE.Mesh(leafGeo, tulipLeafMat);
      leaf.position.set(xPos * 1.25, stemHeight * 0.35, zPos * 1.25);
      leaf.rotation.y = angle;
      leaf.rotation.x = 0.45;
      bouquetGroup.add(leaf);

      // Tulip Head Cup
      const tulipHead = createTulipHead(isYellow);
      tulipHead.position.set(xPos * 1.15, stemHeight + 0.04, zPos * 1.15);
      tulipHead.rotation.y = Math.random() * Math.PI;
      tulipHead.rotation.z = (Math.random() - 0.5) * 0.2;
      bouquetGroup.add(tulipHead);
    }

    tableGroup.add(bouquetGroup);

    // Shining Gold Geometric Sculpture
    const knotGeo = new THREE.TorusKnotGeometry(0.14, 0.04, 80, 16);
    const sculpture = new THREE.Mesh(knotGeo, goldMat);
    sculpture.position.set(0.4, 0.58, -0.15);
    sculpture.castShadow = true;
    tableGroup.add(sculpture);

    // Hardcover Book & Cup
    const bookGeo = new THREE.BoxGeometry(0.42, 0.04, 0.32);
    const bookMat = new THREE.MeshStandardMaterial({ color: 0x1C1917, roughness: 0.3 });
    const book = new THREE.Mesh(bookGeo, bookMat);
    book.position.set(0.1, 0.42, 0.25);
    book.rotation.y = 0.2;
    tableGroup.add(book);

    const cupGeo = new THREE.CylinderGeometry(0.06, 0.05, 0.08, 16);
    const marbleMat = new THREE.MeshStandardMaterial({ color: 0xF5F2EB, roughness: 0.1 });
    const cup = new THREE.Mesh(cupGeo, marbleMat);
    cup.position.set(0.12, 0.48, 0.23);
    tableGroup.add(cup);

    roomGroup.add(tableGroup);

    // =========================================================
    // --- REALISTIC CONTACT SHADOWS & AMBIENT OCCLUSION PLANES ---
    // =========================================================
    const contactShadowMat = new THREE.MeshBasicMaterial({
      color: 0x0A0807,
      transparent: true,
      opacity: 0.32,
      depthWrite: false
    });

    // 1. Sofa Contact Shadow Plane
    const sofaShadowGeo = new THREE.PlaneGeometry(4.6, 1.8);
    const sofaShadow = new THREE.Mesh(sofaShadowGeo, contactShadowMat);
    sofaShadow.rotation.x = -Math.PI / 2;
    sofaShadow.position.set(0, 0.012, -0.6);
    roomGroup.add(sofaShadow);

    // 2. Coffee Table Contact Shadow Plane
    const tableShadowGeo = new THREE.CylinderGeometry(1.15, 1.15, 0.001, 32);
    const tableShadow = new THREE.Mesh(tableShadowGeo, contactShadowMat);
    tableShadow.position.set(0, 0.015, 0.85);
    roomGroup.add(tableShadow);

    // 3. Arc Lamp Marble Base Contact Shadow Plane
    const lampShadowGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.001, 24);
    const lampShadow = new THREE.Mesh(lampShadowGeo, contactShadowMat);
    lampShadow.position.set(3.2, 0.011, -1.6);
    roomGroup.add(lampShadow);

    // =========================================================
    // --- LUXURY ARCHITECTURAL ARC FLOOR LAMP WITH MARBLE BASE ---
    // =========================================================
    const lampGroup = new THREE.Group();
    lampGroup.position.set(3.2, 0, -1.6);

    // Heavy White Carrara Marble Cylinder Base
    const marbleBaseMat = new THREE.MeshStandardMaterial({
      color: 0xF7F5F2,
      roughness: 0.15,
      metalness: 0.05
    });
    const marbleBase = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.16, 32), marbleBaseMat);
    marbleBase.position.y = 0.08;
    marbleBase.castShadow = true;
    marbleBase.receiveShadow = true;
    lampGroup.add(marbleBase);

    // Gold Brass Base Collar & Foot Switch Button
    const baseCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.08, 24), goldMat);
    baseCollar.position.y = 0.2;
    lampGroup.add(baseCollar);

    const footSwitch = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.03, 16), goldMat);
    footSwitch.position.set(0.18, 0.17, 0.1);
    lampGroup.add(footSwitch);

    // Sweeping Curved Brass Arc Arm
    const arcPoints = [];
    const arcSegmentCount = 20;
    for (let i = 0; i <= arcSegmentCount; i++) {
      const tFrac = i / arcSegmentCount;
      const height = 0.24 + Math.sin(tFrac * Math.PI * 0.8) * 2.9 + tFrac * 0.4;
      const xOffset = -Math.pow(tFrac, 1.8) * 1.5;
      const zOffset = Math.sin(tFrac * Math.PI) * 0.4;
      arcPoints.push(new THREE.Vector3(xOffset, height, zOffset));
    }

    const arcCurve = new THREE.CatmullRomCurve3(arcPoints);
    const arcGeo = new THREE.TubeGeometry(arcCurve, 32, 0.022, 16, false);
    const arcMesh = new THREE.Mesh(arcGeo, goldMat);
    arcMesh.castShadow = true;
    lampGroup.add(arcMesh);

    // Dual Opal Glass Lampshades at the tip of the Arc
    const tipPos = arcPoints[arcPoints.length - 1];

    const globe1Mat = new THREE.MeshStandardMaterial({
      color: 0xFFFBEB,
      roughness: 0.1,
      emissive: 0xFEF3C7,
      emissiveIntensity: 0.85
    });

    // Primary Globe Shade
    const globe1 = new THREE.Mesh(new THREE.SphereGeometry(0.28, 32, 32), globe1Mat);
    globe1.position.set(tipPos.x, tipPos.y - 0.15, tipPos.z);
    lampGroup.add(globe1);

    // Gold Brass Cap above globe
    const cap1 = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.26, 0.06, 24), goldMat);
    cap1.position.set(tipPos.x, tipPos.y + 0.08, tipPos.z);
    lampGroup.add(cap1);

    // Secondary Accent Globe
    const globe2 = new THREE.Mesh(new THREE.SphereGeometry(0.2, 32, 32), globe1Mat);
    globe2.position.set(tipPos.x + 0.3, tipPos.y - 0.4, tipPos.z + 0.2);
    lampGroup.add(globe2);

    const cap2 = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.18, 0.05, 24), goldMat);
    cap2.position.set(tipPos.x + 0.3, tipPos.y - 0.22, tipPos.z + 0.2);
    lampGroup.add(cap2);

    roomGroup.add(lampGroup);

    // 6. Floating Energy Particles
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 8.0;
      particlePositions[i + 1] = Math.random() * 4.2;
      particlePositions[i + 2] = (Math.random() - 0.5) * 8.0;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xC084FC,
      size: 0.065,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    particleMatRef.current = particleMat;

    const energyParticles = new THREE.Points(particleGeo, particleMat);
    scene.add(energyParticles);
    energyParticlesRef.current = energyParticles;

    // Mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouseRef.current = { x, y };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const now = performance.now();

      // Mouse parallax camera motion
      const targetX = mouseRef.current.x * 0.75;
      const targetY = 2.7 + mouseRef.current.y * 0.35;

      if (cameraRef.current) {
        cameraRef.current.position.x += (targetX - cameraRef.current.position.x) * 0.04;
        cameraRef.current.position.y += (targetY - cameraRef.current.position.y) * 0.04;
        cameraRef.current.lookAt(0, 0.4, 0);
      }

      // Smooth subtle room panning
      if (roomGroupRef.current) {
        roomGroupRef.current.rotation.y = Math.sin(now * 0.0002) * 0.12;
      }

      // Rotate gold sculpture
      sculpture.rotation.x += 0.008;
      sculpture.rotation.y += 0.012;

      // Float particles
      if (energyParticlesRef.current) {
        const positions = energyParticlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 1; i < particleCount * 3; i += 3) {
          positions[i] += 0.002;
          if (positions[i] > 4.2) positions[i] = 0;
        }
        energyParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      cameraRef.current.aspect = newW / newH;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newW, newH);
      rendererRef.current.setPixelRatio(window.devicePixelRatio);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // --- LIGHTING MOOD SWITCHER ---
  useEffect(() => {
    if (
      !sceneRef.current ||
      !ambientLightRef.current ||
      !mainSunRef.current ||
      !fillLightRef.current ||
      !moodPointLightRef.current ||
      !particleMatRef.current
    )
      return;

    if (lightingMood === 'lavender') {
      sceneRef.current.background = new THREE.Color(0xF3EFF8);
      sceneRef.current.fog = new THREE.FogExp2(0xF3EFF8, 0.02);

      ambientLightRef.current.color.setHex(0xFFF8FC);
      ambientLightRef.current.intensity = 2.0;

      mainSunRef.current.color.setHex(0xE9D5FF);
      mainSunRef.current.intensity = 3.5;

      fillLightRef.current.color.setHex(0xC084FC);
      fillLightRef.current.intensity = 1.5;

      moodPointLightRef.current.color.setHex(0xD8B4FE);
      moodPointLightRef.current.intensity = 3.8;

      if (lampSpotLightRef.current) {
        lampSpotLightRef.current.color.setHex(0xF3E8FF);
        lampSpotLightRef.current.intensity = 5.0;
      }

      particleMatRef.current.color.setHex(0xA855F7);

    } else if (lightingMood === 'golden') {
      sceneRef.current.background = new THREE.Color(0xFDF8EE);
      sceneRef.current.fog = new THREE.FogExp2(0xFDF8EE, 0.02);

      ambientLightRef.current.color.setHex(0xFFFBEB);
      ambientLightRef.current.intensity = 2.2;

      mainSunRef.current.color.setHex(0xF59E0B);
      mainSunRef.current.intensity = 4.5;

      fillLightRef.current.color.setHex(0xFDE68A);
      fillLightRef.current.intensity = 1.8;

      moodPointLightRef.current.color.setHex(0xD97706);
      moodPointLightRef.current.intensity = 4.0;

      if (lampSpotLightRef.current) {
        lampSpotLightRef.current.color.setHex(0xFEF3C7);
        lampSpotLightRef.current.intensity = 6.0;
      }

      particleMatRef.current.color.setHex(0xF59E0B);

    } else {
      sceneRef.current.background = new THREE.Color(0xF8F8F8);
      sceneRef.current.fog = new THREE.FogExp2(0xF8F8F8, 0.015);

      ambientLightRef.current.color.setHex(0xFFFFFF);
      ambientLightRef.current.intensity = 2.5;

      mainSunRef.current.color.setHex(0xFFFFFF);
      mainSunRef.current.intensity = 4.8;

      fillLightRef.current.color.setHex(0xE2E8F0);
      fillLightRef.current.intensity = 1.6;

      moodPointLightRef.current.color.setHex(0xF8FAFC);
      moodPointLightRef.current.intensity = 2.5;

      if (lampSpotLightRef.current) {
        lampSpotLightRef.current.color.setHex(0xFFFFFF);
        lampSpotLightRef.current.intensity = 4.0;
      }

      particleMatRef.current.color.setHex(0x38BDF8);
    }
  }, [lightingMood]);

  const t = translations[currentLang].hero;

  return (
    <section id="showroom-3d" className="relative h-[85vh] min-h-[620px] bg-[#F4EFEA] flex flex-col justify-between overflow-hidden border-b border-[#2D2926]/10 transition-colors duration-700">
      
      {/* 3D Canvas Element */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full z-0 cursor-grab active:cursor-grabbing" />

      {/* Floating Interactive Controls */}
      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-16 xl:px-24 pt-6 pb-6 h-full flex flex-col justify-between pointer-events-none">
        
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
          


          {/* Lighting Mood Controls - Cyclical Toggle */}
          <button
            onClick={() => {
              if (lightingMood === 'lavender') setLightingMood('golden');
              else if (lightingMood === 'golden') setLightingMood('daylight');
              else setLightingMood('lavender');
            }}
            className="flex items-center gap-2 bg-white/85 backdrop-blur-md px-4 py-2  border border-[#2D2926]/15 shadow-lg hover:bg-white hover:scale-105 transition-all text-[10px] uppercase tracking-widest font-bold text-[#2D2926]"
            title="Toggle Lighting Mood"
          >
            {lightingMood === 'lavender' && (
              <>
                <Flower2 className="w-3.5 h-3.5 text-[#8A7B9B]" />
                <span className="text-[#8A7B9B]">Lavender Sanctuary</span>
              </>
            )}
            {lightingMood === 'golden' && (
              <>
                <Sun className="w-3.5 h-3.5 text-[#D97706]" />
                <span className="text-[#D97706]">Golden Hour</span>
              </>
            )}
            {lightingMood === 'daylight' && (
              <>
                <Moon className="w-3.5 h-3.5" />
                <span>Pure Daylight</span>
              </>
            )}
          </button>

        </div>

        {/* Compact, Sleek Side Floating Hero Overlay Box */}
        <div className="pointer-events-auto self-start max-w-sm bg-white/85 backdrop-blur-md p-6 rounded-3xl border border-[#2D2926]/15 shadow-2xl mt-auto mb-2 text-[#2D2926]">
          
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] uppercase tracking-[0.2em] bg-[#8A7B9B] text-white px-2.5 py-0.5  font-bold">
              {t.tagline}
            </span>
            <span className="text-[10px] text-[#2D2926]/60 uppercase tracking-widest font-medium">
              Cornelia Schmid
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl text-[#2D2926] font-light leading-tight tracking-tight mb-2">
            {t.titleLine1} <span className="italic text-[#8A7B9B]">{t.titleLine2}</span>
          </h1>

          <p className="text-xs text-[#2D2926]/80 leading-relaxed font-light mb-4">
            {t.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <button
              onClick={onOpenBooking}
              className="px-4 py-2.5  bg-[#2D2926] hover:bg-[#3D3834] text-white font-medium text-[10px] uppercase tracking-widest flex items-center gap-1.5 shadow-sm transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{t.callBtn}</span>
            </button>
          </div>

        </div>



      </div>

    </section>
  );
};

