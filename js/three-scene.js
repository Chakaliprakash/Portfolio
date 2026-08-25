/**
 * THREE.JS 3D BACKEND ARCHITECTURE & CONSTELLATION SCENE
 * Represents a 3D Java / Spring Backend Architecture environment:
 * - Glowing Java Core
 * - Database Cylinder (MySQL)
 * - Spring Service & API Gateway Nodes
 * - Animated Data Stream Connections & Request Packets
 * - Mouse Parallax & Scroll Reactivity
 */

(function () {
  'use strict';

  if (typeof THREE === 'undefined') {
    console.warn('Three.js is not loaded.');
    return;
  }

  const canvas = document.getElementById('webgl-canvas');
  if (!canvas) return;

  // Scene & Camera setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 85);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Mouse & Scroll Tracking
  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  let scrollY = 0;

  // -------------------------------------------------------------
  // 1. JAVA BACKEND ARCHITECTURE 3D NODES
  // -------------------------------------------------------------
  const backendSceneGroup = new THREE.Group();

  // (A) Java Core (Centerpiece)
  const coreGroup = new THREE.Group();
  
  // Outer Wireframe Box
  const outerBoxGeo = new THREE.BoxGeometry(10, 10, 10);
  const outerBoxMat = new THREE.MeshStandardMaterial({
    color: 0x6366f1,
    wireframe: true,
    transparent: true,
    opacity: 0.45,
    emissive: 0x6366f1,
    emissiveIntensity: 0.5
  });
  const outerBox = new THREE.Mesh(outerBoxGeo, outerBoxMat);
  coreGroup.add(outerBox);

  // Inner Glowing Core Sphere
  const innerSphereGeo = new THREE.SphereGeometry(4, 24, 24);
  const innerSphereMat = new THREE.MeshStandardMaterial({
    color: 0x00f2fe,
    emissive: 0x00f2fe,
    emissiveIntensity: 0.6,
    roughness: 0.2,
    metalness: 0.8
  });
  const innerSphere = new THREE.Mesh(innerSphereGeo, innerSphereMat);
  coreGroup.add(innerSphere);

  coreGroup.position.set(38, 12, -15);
  backendSceneGroup.add(coreGroup);

  // (B) Database Cylinder Node (MySQL / PostgreSQL)
  const dbGeo = new THREE.CylinderGeometry(5, 5, 8, 20);
  const dbMat = new THREE.MeshStandardMaterial({
    color: 0x10b981,
    wireframe: true,
    transparent: true,
    opacity: 0.4,
    emissive: 0x10b981,
    emissiveIntensity: 0.4
  });
  const dbNode = new THREE.Mesh(dbGeo, dbMat);
  dbNode.position.set(52, -18, -25);
  backendSceneGroup.add(dbNode);

  // (C) Spring AI & Agent Node (Icosahedron)
  const aiNodeGeo = new THREE.IcosahedronGeometry(6, 1);
  const aiNodeMat = new THREE.MeshStandardMaterial({
    color: 0xa855f7,
    wireframe: true,
    transparent: true,
    opacity: 0.45,
    emissive: 0xa855f7,
    emissiveIntensity: 0.5
  });
  const aiNode = new THREE.Mesh(aiNodeGeo, aiNodeMat);
  aiNode.position.set(-42, 20, -20);
  backendSceneGroup.add(aiNode);

  // (D) REST API Gateway / Microservice Ring (Torus)
  const gatewayGeo = new THREE.TorusGeometry(8, 0.5, 16, 50);
  const gatewayMat = new THREE.MeshStandardMaterial({
    color: 0x00f2fe,
    wireframe: true,
    transparent: true,
    opacity: 0.35,
    emissive: 0x00f2fe,
    emissiveIntensity: 0.3
  });
  const gatewayNode = new THREE.Mesh(gatewayGeo, gatewayMat);
  gatewayNode.position.set(-45, -16, -10);
  backendSceneGroup.add(gatewayNode);

  scene.add(backendSceneGroup);

  // -------------------------------------------------------------
  // 2. NETWORK DATA CONSTELLATION & STREAM PARTICLES
  // -------------------------------------------------------------
  const particleCount = window.innerWidth < 768 ? 95 : 190;
  const particleGeometry = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  const particleVelocities = [];

  const spread = 130;
  for (let i = 0; i < particleCount; i++) {
    particlePositions[i * 3] = (Math.random() - 0.5) * spread * 2;
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * spread * 1.6;
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * spread;

    particleVelocities.push({
      x: (Math.random() - 0.5) * 0.07,
      y: (Math.random() - 0.5) * 0.07,
      z: (Math.random() - 0.5) * 0.05
    });
  }

  particleGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(particlePositions, 3)
  );

  const particleMaterial = new THREE.PointsMaterial({
    color: 0x6366f1,
    size: 2.3,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending
  });

  const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particleSystem);

  // Dynamic Connecting Stream Lines
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x00f2fe,
    transparent: true,
    opacity: 0.16,
    blending: THREE.AdditiveBlending
  });

  let lineGeometry = new THREE.BufferGeometry();
  const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
  scene.add(lineMesh);

  // -------------------------------------------------------------
  // 3. LIGHTING
  // -------------------------------------------------------------
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
  scene.add(ambientLight);

  const cyanLight = new THREE.PointLight(0x00f2fe, 2.2, 180);
  cyanLight.position.set(40, 30, 40);
  scene.add(cyanLight);

  const violetLight = new THREE.PointLight(0xa855f7, 2.2, 180);
  violetLight.position.set(-40, -30, 40);
  scene.add(violetLight);

  // -------------------------------------------------------------
  // 4. EVENT LISTENERS
  // -------------------------------------------------------------
  window.addEventListener('mousemove', function (e) {
    mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
  });

  window.addEventListener('scroll', function () {
    scrollY = window.scrollY;
  });

  window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  // -------------------------------------------------------------
  // 5. ANIMATION LOOP
  // -------------------------------------------------------------
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Smooth Mouse Interpolation
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    // Camera Parallax & Scroll reaction
    camera.position.x = mouse.x * 12;
    camera.position.y = mouse.y * 12 - (scrollY * 0.018);
    camera.lookAt(0, -scrollY * 0.018, 0);

    // Rotate Java Backend Objects
    coreGroup.rotation.x = elapsedTime * 0.25;
    coreGroup.rotation.y = elapsedTime * 0.35;
    
    dbNode.rotation.y = elapsedTime * 0.25;
    aiNode.rotation.y = elapsedTime * 0.3;
    aiNode.rotation.z = elapsedTime * 0.15;
    
    gatewayNode.rotation.x = elapsedTime * 0.2;
    gatewayNode.rotation.y = elapsedTime * 0.15;

    // Pulse core scale
    const pulse = 1 + Math.sin(elapsedTime * 2.5) * 0.08;
    innerSphere.scale.set(pulse, pulse, pulse);

    // Update Particle Stream
    const positions = particleGeometry.attributes.position.array;
    const linePositions = [];
    const maxDistance = 24;

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] += particleVelocities[i].x;
      positions[i * 3 + 1] += particleVelocities[i].y;
      positions[i * 3 + 2] += particleVelocities[i].z;

      if (Math.abs(positions[i * 3]) > spread) particleVelocities[i].x *= -1;
      if (Math.abs(positions[i * 3 + 1]) > spread * 0.8) particleVelocities[i].y *= -1;
      if (Math.abs(positions[i * 3 + 2]) > spread * 0.6) particleVelocities[i].z *= -1;

      for (let j = i + 1; j < particleCount; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDistance) {
          linePositions.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          );
        }
      }
    }

    particleGeometry.attributes.position.needsUpdate = true;

    // Update Connecting Lines
    lineGeometry.dispose();
    lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    lineMesh.geometry = lineGeometry;

    renderer.render(scene, camera);
  }

  animate();
})();
