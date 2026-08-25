/**
 * THREE.JS 3D AESTHETIC BACKEND ARCHITECTURE & CONSTELLATION SCENE
 * Designed for Prakash Chakali — Java Software Engineer & Backend Developer
 * 
 * Features:
 * - 3D Holographic Java Core with pulsing inner energy and orbital rings
 * - Autonomous Spring AI Agent Neural Node with revolving data satellites
 * - Layered MySQL Database Vault with luminous tier indicators
 * - Microservices & REST API Gateway Torus Knot
 * - Atmospheric Cyber Constellation & Starfield with dynamic filament connections
 * - Interactive Cursor Point Light (flashlight effect on 3D geometry)
 * - Smooth Scroll-Choreographed Camera Positioning & Parallax
 * - High-performance WebGL rendering with devicePixelRatio capping
 */

(function () {
  'use strict';

  if (typeof THREE === 'undefined') {
    console.warn('Three.js library is required for the 3D background.');
    return;
  }

  const canvas = document.getElementById('webgl-canvas');
  if (!canvas) return;

  // -----------------------------------------------------------------
  // 1. SCENE, CAMERA & RENDERER SETUP
  // -----------------------------------------------------------------
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x060813, 0.0075);

  const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 75);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
  } catch (e) {
    console.warn('WebGL initialization failed:', e);
    return;
  }

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  // Master Scene Group
  const masterGroup = new THREE.Group();
  scene.add(masterGroup);

  // -----------------------------------------------------------------
  // 2. LIGHTING RIG (Cinematic Cyber Lighting)
  // -----------------------------------------------------------------
  const ambientLight = new THREE.AmbientLight(0x0d1527, 2.0);
  scene.add(ambientLight);

  // Key Cyan Light
  const cyanLight = new THREE.PointLight(0x00f2fe, 3.5, 140, 1.8);
  cyanLight.position.set(35, 25, 30);
  scene.add(cyanLight);

  // Accent Violet / Purple Light
  const purpleLight = new THREE.PointLight(0xa855f7, 3.5, 140, 1.8);
  purpleLight.position.set(-35, -20, 25);
  scene.add(purpleLight);

  // Accent Emerald Light (Database node glow)
  const emeraldLight = new THREE.PointLight(0x10b981, 2.8, 110, 2.0);
  emeraldLight.position.set(40, -35, 20);
  scene.add(emeraldLight);

  // Interactive Cursor Point Light (Follows mouse in 3D)
  const mouseLight = new THREE.PointLight(0x6366f1, 2.5, 90, 2.0);
  mouseLight.position.set(0, 0, 40);
  scene.add(mouseLight);

  // -----------------------------------------------------------------
  // 3. ARCHITECTURAL 3D NODES
  // -----------------------------------------------------------------

  // --- (A) JAVA CORE CRYSTAL (Hero Right) ---
  const javaCoreGroup = new THREE.Group();

  // 1. Outer Geodesic Wireframe Icosahedron
  const outerIcosaGeo = new THREE.IcosahedronGeometry(7.2, 1);
  const outerIcosaMat = new THREE.MeshStandardMaterial({
    color: 0x6366f1,
    wireframe: true,
    transparent: true,
    opacity: 0.55,
    emissive: 0x4338ca,
    emissiveIntensity: 0.65,
    roughness: 0.2,
    metalness: 0.8
  });
  const outerIcosa = new THREE.Mesh(outerIcosaGeo, outerIcosaMat);
  javaCoreGroup.add(outerIcosa);

  // 2. Inner Glowing Energy Core
  const innerCoreGeo = new THREE.SphereGeometry(3.6, 32, 32);
  const innerCoreMat = new THREE.MeshStandardMaterial({
    color: 0x00f2fe,
    emissive: 0x00f2fe,
    emissiveIntensity: 0.9,
    roughness: 0.1,
    metalness: 0.9,
    transparent: true,
    opacity: 0.92
  });
  const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat);
  javaCoreGroup.add(innerCore);

  // 3. Floating Orbital Rings
  const ringGeo1 = new THREE.TorusGeometry(10.5, 0.15, 16, 64);
  const ringMat1 = new THREE.MeshStandardMaterial({
    color: 0x00f2fe,
    emissive: 0x00f2fe,
    emissiveIntensity: 0.8,
    transparent: true,
    opacity: 0.7
  });
  const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
  ring1.rotation.x = Math.PI / 3;
  javaCoreGroup.add(ring1);

  const ringGeo2 = new THREE.TorusGeometry(12, 0.12, 16, 64);
  const ringMat2 = new THREE.MeshStandardMaterial({
    color: 0xa855f7,
    emissive: 0xa855f7,
    emissiveIntensity: 0.8,
    transparent: true,
    opacity: 0.6
  });
  const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
  ring2.rotation.y = Math.PI / 4;
  ring2.rotation.x = -Math.PI / 5;
  javaCoreGroup.add(ring2);

  // Orbiting Energy Pulses on Rings
  const orbitSatelliteGeo = new THREE.SphereGeometry(0.55, 16, 16);
  const orbitSatelliteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const orbitSatellite1 = new THREE.Mesh(orbitSatelliteGeo, orbitSatelliteMat);
  const orbitSatellite2 = new THREE.Mesh(orbitSatelliteGeo, orbitSatelliteMat);
  javaCoreGroup.add(orbitSatellite1);
  javaCoreGroup.add(orbitSatellite2);

  javaCoreGroup.position.set(34, 8, -10);
  masterGroup.add(javaCoreGroup);

  // --- (B) SPRING AI AGENT NEURAL NODE (Left Upper) ---
  const aiAgentGroup = new THREE.Group();

  const aiNodeGeo = new THREE.OctahedronGeometry(5.2, 1);
  const aiNodeMat = new THREE.MeshStandardMaterial({
    color: 0xa855f7,
    wireframe: true,
    transparent: true,
    opacity: 0.6,
    emissive: 0x9333ea,
    emissiveIntensity: 0.7
  });
  const aiNodeMesh = new THREE.Mesh(aiNodeGeo, aiNodeMat);
  aiAgentGroup.add(aiNodeMesh);

  // AI Center Glowing Orb
  const aiCoreGeo = new THREE.SphereGeometry(2.4, 24, 24);
  const aiCoreMat = new THREE.MeshStandardMaterial({
    color: 0xf43f5e,
    emissive: 0xf43f5e,
    emissiveIntensity: 0.85,
    roughness: 0.2
  });
  const aiCoreMesh = new THREE.Mesh(aiCoreGeo, aiCoreMat);
  aiAgentGroup.add(aiCoreMesh);

  // Small Satellite Function-Calling Nodes
  const satelliteCount = 4;
  const aiSatellites = [];
  for (let i = 0; i < satelliteCount; i++) {
    const satGeo = new THREE.BoxGeometry(0.9, 0.9, 0.9);
    const satMat = new THREE.MeshStandardMaterial({
      color: 0x00f2fe,
      emissive: 0x00f2fe,
      emissiveIntensity: 0.9
    });
    const sat = new THREE.Mesh(satGeo, satMat);
    aiSatellites.push({
      mesh: sat,
      angle: (i / satelliteCount) * Math.PI * 2,
      radius: 7.5 + (i % 2) * 1.5,
      speed: 0.8 + i * 0.2
    });
    aiAgentGroup.add(sat);
  }

  aiAgentGroup.position.set(-36, 18, -18);
  masterGroup.add(aiAgentGroup);

  // --- (C) MYSQL DATABASE VAULT TOWER (Right Lower) ---
  const dbGroup = new THREE.Group();

  const platterCount = 3;
  for (let i = 0; i < platterCount; i++) {
    const platterGeo = new THREE.CylinderGeometry(4.2, 4.2, 1.6, 24);
    const platterMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
      emissive: 0x059669,
      emissiveIntensity: 0.6
    });
    const platter = new THREE.Mesh(platterGeo, platterMat);
    platter.position.y = (i - 1) * 2.5;
    dbGroup.add(platter);

    // Inner Glowing Tier Core
    const tierCoreGeo = new THREE.CylinderGeometry(2.8, 2.8, 1.2, 20);
    const tierCoreMat = new THREE.MeshStandardMaterial({
      color: 0x34d399,
      emissive: 0x10b981,
      emissiveIntensity: 0.7,
      transparent: true,
      opacity: 0.75
    });
    const tierCore = new THREE.Mesh(tierCoreGeo, tierCoreMat);
    tierCore.position.y = (i - 1) * 2.5;
    dbGroup.add(tierCore);
  }

  dbGroup.position.set(38, -26, -20);
  masterGroup.add(dbGroup);

  // --- (D) REST API GATEWAY & MICROSERVICES TORUS (Left Lower) ---
  const gatewayGroup = new THREE.Group();

  const gatewayGeo = new THREE.TorusKnotGeometry(4.5, 0.7, 64, 16);
  const gatewayMat = new THREE.MeshStandardMaterial({
    color: 0x00f2fe,
    wireframe: true,
    transparent: true,
    opacity: 0.45,
    emissive: 0x0284c7,
    emissiveIntensity: 0.6
  });
  const gatewayMesh = new THREE.Mesh(gatewayGeo, gatewayMat);
  gatewayGroup.add(gatewayMesh);

  gatewayGroup.position.set(-38, -22, -12);
  masterGroup.add(gatewayGroup);

  // -----------------------------------------------------------------
  // 4. ATMOSPHERIC CYBER CONSTELLATION & DYNAMIC DATA STREAM
  // -----------------------------------------------------------------
  const isMobile = window.innerWidth < 768;
  const particleCount = isMobile ? 110 : 230;
  const particleGeometry = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  const particleColors = new Float32Array(particleCount * 3);
  const particleVelocities = [];

  const spreadX = 140;
  const spreadY = 120;
  const spreadZ = 90;

  const colorPalette = [
    new THREE.Color(0x6366f1), // Indigo
    new THREE.Color(0x00f2fe), // Cyan
    new THREE.Color(0xa855f7), // Violet
    new THREE.Color(0x10b981)  // Emerald
  ];

  for (let i = 0; i < particleCount; i++) {
    particlePositions[i * 3] = (Math.random() - 0.5) * spreadX * 2;
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * spreadY * 2;
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * spreadZ * 2;

    const chosenColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    particleColors[i * 3] = chosenColor.r;
    particleColors[i * 3 + 1] = chosenColor.g;
    particleColors[i * 3 + 2] = chosenColor.b;

    particleVelocities.push({
      x: (Math.random() - 0.5) * 0.05,
      y: (Math.random() - 0.5) * 0.05,
      z: (Math.random() - 0.5) * 0.04
    });
  }

  particleGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(particlePositions, 3)
  );
  particleGeometry.setAttribute(
    'color',
    new THREE.BufferAttribute(particleColors, 3)
  );

  const particleMaterial = new THREE.PointsMaterial({
    size: isMobile ? 2.2 : 2.8,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending
  });

  const constellationParticles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(constellationParticles);

  // Dynamic Connecting Light Filaments
  let lineGeometry = new THREE.BufferGeometry();
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x6366f1,
    transparent: true,
    opacity: 0.18,
    blending: THREE.AdditiveBlending
  });
  const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
  scene.add(lineMesh);

  // --- (E) DEEP PERSPECTIVE CYBER GRID FLOOR ---
  const gridHelper = new THREE.GridHelper(260, 45, 0x6366f1, 0x1e293b);
  gridHelper.position.y = -65;
  gridHelper.material.transparent = true;
  gridHelper.material.opacity = 0.15;
  scene.add(gridHelper);

  // -----------------------------------------------------------------
  // 5. INTERACTIVITY & SCROLL CHOREOGRAPHY
  // -----------------------------------------------------------------
  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  let scrollY = 0;
  let targetScrollY = 0;

  window.addEventListener('mousemove', (e) => {
    mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
  });

  window.addEventListener('scroll', () => {
    targetScrollY = window.scrollY || window.pageYOffset;
  }, { passive: true });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  });

  // -----------------------------------------------------------------
  // 6. ANIMATION LOOP & RENDER LIFECYCLE
  // -----------------------------------------------------------------
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    // Smooth Interpolation for Mouse & Scroll
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;
    scrollY += (targetScrollY - scrollY) * 0.08;

    const scrollNormalized = scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1);

    // Mouse interactive point light positioning
    mouseLight.position.x = mouse.x * 45;
    mouseLight.position.y = mouse.y * 35;
    mouseLight.position.z = 30 + Math.sin(elapsedTime * 2) * 5;

    // Smooth Camera Choreography based on Scroll & Mouse
    camera.position.x = mouse.x * 12 + Math.sin(scrollNormalized * Math.PI * 2) * 6;
    camera.position.y = mouse.y * 10 - scrollNormalized * 40;
    camera.position.z = 75 - Math.cos(scrollNormalized * Math.PI * 2) * 10;
    camera.lookAt(0, -scrollNormalized * 40, 0);

    // Rotate Master Architecture Objects
    javaCoreGroup.rotation.y = elapsedTime * 0.28;
    javaCoreGroup.rotation.x = Math.sin(elapsedTime * 0.3) * 0.15;
    outerIcosa.rotation.z = elapsedTime * 0.2;
    ring1.rotation.z = elapsedTime * 0.45;
    ring2.rotation.z = -elapsedTime * 0.35;

    // Orbit pulses on Java Core rings
    const r1 = 10.5;
    orbitSatellite1.position.set(
      Math.cos(elapsedTime * 1.8) * r1,
      Math.sin(elapsedTime * 1.8) * r1 * Math.cos(Math.PI / 3),
      Math.sin(elapsedTime * 1.8) * r1 * Math.sin(Math.PI / 3)
    );

    const r2 = 12;
    orbitSatellite2.position.set(
      Math.cos(-elapsedTime * 1.4) * r2,
      Math.sin(-elapsedTime * 1.4) * r2 * 0.7,
      Math.cos(-elapsedTime * 1.4) * r2 * 0.7
    );

    // Pulsing inner energy core
    const corePulse = 1 + Math.sin(elapsedTime * 3.0) * 0.09;
    innerCore.scale.set(corePulse, corePulse, corePulse);

    // AI Agent Node Rotation & Satellites
    aiAgentGroup.rotation.y = -elapsedTime * 0.35;
    aiAgentGroup.rotation.x = Math.cos(elapsedTime * 0.4) * 0.2;
    aiSatellites.forEach((sat) => {
      sat.angle += sat.speed * delta;
      sat.mesh.position.x = Math.cos(sat.angle) * sat.radius;
      sat.mesh.position.z = Math.sin(sat.angle) * sat.radius;
      sat.mesh.position.y = Math.sin(sat.angle * 2) * 2;
      sat.mesh.rotation.x += delta * 2;
      sat.mesh.rotation.y += delta * 2;
    });

    // Database Vault Rotation & Wave
    dbGroup.rotation.y = elapsedTime * 0.22;
    dbGroup.position.y = -26 + Math.sin(elapsedTime * 1.5) * 1.2;

    // API Gateway Knot Rotation
    gatewayGroup.rotation.x = elapsedTime * 0.3;
    gatewayGroup.rotation.y = elapsedTime * 0.25;

    // Update Particle Stream Positions & Connecting Lines
    const positions = particleGeometry.attributes.position.array;
    const linePositions = [];
    const maxConnectionDist = isMobile ? 18 : 24;

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] += particleVelocities[i].x;
      positions[i * 3 + 1] += particleVelocities[i].y;
      positions[i * 3 + 2] += particleVelocities[i].z;

      // Wrap around bounds
      if (Math.abs(positions[i * 3]) > spreadX) particleVelocities[i].x *= -1;
      if (Math.abs(positions[i * 3 + 1]) > spreadY) particleVelocities[i].y *= -1;
      if (Math.abs(positions[i * 3 + 2]) > spreadZ) particleVelocities[i].z *= -1;

      // Proximity filaments
      for (let j = i + 1; j < particleCount; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxConnectionDist) {
          linePositions.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          );
        }
      }
    }

    particleGeometry.attributes.position.needsUpdate = true;

    // Refresh Line Segment Geometry
    lineGeometry.dispose();
    lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    lineMesh.geometry = lineGeometry;

    // Render Scene
    renderer.render(scene, camera);
  }

  animate();
})();
