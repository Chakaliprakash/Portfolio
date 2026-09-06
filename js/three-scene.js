/**
 * ==========================================================================
 * PRAKASH CHAKALI — THREE.JS 3D SCENE & INTERACTIVE HERO CENTERPIECE
 * Features:
 * 1. Background Constellation Scene (#webgl-canvas)
 * 2. Dedicated Interactive 3D Hero Centerpiece (#hero-canvas-3d)
 *    - Rotating multifaceted polyhedral core with inner energy sphere
 *    - Intersecting orbital rings and orbiting satellite data nodes
 *    - Mouse drag orbit controls with smooth damping & inertia
 *    - Theme responsiveness & performance optimization
 * ==========================================================================
 */

(function () {
  'use strict';

  if (typeof THREE === 'undefined') {
    console.warn('Three.js library is required for 3D graphics.');
    return;
  }

  /* --------------------------------------------------------------------------
     1. BACKGROUND CONSTELLATION SCENE (#webgl-canvas)
     -------------------------------------------------------------------------- */
  const bgCanvas = document.getElementById('webgl-canvas');
  if (bgCanvas) {
    initBackgroundScene(bgCanvas);
  }

  function initBackgroundScene(canvas) {
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07090e, 0.008);

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
      console.warn('WebGL initialization failed for background:', e);
      return;
    }

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x0d1527, 2.0);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00f2fe, 3.2, 140, 1.8);
    cyanLight.position.set(35, 25, 30);
    scene.add(cyanLight);

    const purpleLight = new THREE.PointLight(0xa855f7, 3.2, 140, 1.8);
    purpleLight.position.set(-35, -20, 25);
    scene.add(purpleLight);

    const mouseLight = new THREE.PointLight(0x6366f1, 2.2, 90, 2.0);
    mouseLight.position.set(0, 0, 40);
    scene.add(mouseLight);

    // Particle Constellation
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 100 : 180;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const particleVelocities = [];

    const spreadX = 140;
    const spreadY = 120;
    const spreadZ = 90;

    const colorPalette = [
      new THREE.Color(0x6366f1),
      new THREE.Color(0x00f2fe),
      new THREE.Color(0xa855f7),
      new THREE.Color(0x10b981)
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
        x: (Math.random() - 0.5) * 0.04,
        y: (Math.random() - 0.5) * 0.04,
        z: (Math.random() - 0.5) * 0.03
      });
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: isMobile ? 2.0 : 2.6,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    const constellationParticles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(constellationParticles);

    // Dynamic Connecting Lines
    let lineGeometry = new THREE.BufferGeometry();
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending
    });
    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    // Mouse & Scroll Parallax
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

    const clock = new THREE.Clock();

    function animateBg() {
      requestAnimationFrame(animateBg);

      const elapsedTime = clock.getElapsedTime();
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;
      scrollY += (targetScrollY - scrollY) * 0.08;

      const scrollNormalized = scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1);

      mouseLight.position.x = mouse.x * 40;
      mouseLight.position.y = mouse.y * 30;

      camera.position.x = mouse.x * 10;
      camera.position.y = mouse.y * 8 - scrollNormalized * 35;
      camera.lookAt(0, -scrollNormalized * 35, 0);

      // Particle update
      const positions = particleGeometry.attributes.position.array;
      const linePositions = [];
      const maxConnectionDist = isMobile ? 16 : 22;

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += particleVelocities[i].x;
        positions[i * 3 + 1] += particleVelocities[i].y;
        positions[i * 3 + 2] += particleVelocities[i].z;

        if (Math.abs(positions[i * 3]) > spreadX) particleVelocities[i].x *= -1;
        if (Math.abs(positions[i * 3 + 1]) > spreadY) particleVelocities[i].y *= -1;
        if (Math.abs(positions[i * 3 + 2]) > spreadZ) particleVelocities[i].z *= -1;

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
      lineGeometry.dispose();
      lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      lineMesh.geometry = lineGeometry;

      renderer.render(scene, camera);
    }

    animateBg();
  }


  /* --------------------------------------------------------------------------
     2. DEDICATED INTERACTIVE 3D HERO CENTERPIECE (#hero-canvas-3d)
     -------------------------------------------------------------------------- */
  const heroCanvas = document.getElementById('hero-canvas-3d');
  const heroStage = document.getElementById('hero-3d-stage');

  if (heroCanvas && heroStage) {
    initHeroCenterpiece(heroCanvas, heroStage);
  }

  function initHeroCenterpiece(canvas, stage) {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      stage.clientWidth / stage.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 24);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
    } catch (e) {
      console.warn('WebGL initialization failed for hero centerpiece:', e);
      return;
    }

    renderer.setSize(stage.clientWidth, stage.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    // Centerpiece Root Group
    const coreRoot = new THREE.Group();
    scene.add(coreRoot);

    // Studio Lighting
    const centerAmbient = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(centerAmbient);

    const keyLight = new THREE.PointLight(0x00f2fe, 3.5, 50, 1.5);
    keyLight.position.set(12, 14, 15);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0xa855f7, 3.0, 50, 1.5);
    fillLight.position.set(-14, -10, 12);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0x6366f1, 2.5, 40, 2);
    rimLight.position.set(0, -12, -10);
    scene.add(rimLight);

    // Outer Faceted Polyhedron Wireframe Mesh
    const outerGeo = new THREE.IcosahedronGeometry(5.2, 1);
    const outerMat = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
      emissive: 0x4f46e5,
      emissiveIntensity: 0.5,
      roughness: 0.1,
      metalness: 0.8
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    coreRoot.add(outerMesh);

    // Secondary Nested Octahedron Shell
    const shellGeo = new THREE.OctahedronGeometry(4.2, 0);
    const shellMat = new THREE.MeshStandardMaterial({
      color: 0x00f2fe,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
      emissive: 0x0284c7,
      emissiveIntensity: 0.6
    });
    const shellMesh = new THREE.Mesh(shellGeo, shellMat);
    coreRoot.add(shellMesh);

    // Glowing Inner Energy Sphere
    const innerGeo = new THREE.SphereGeometry(2.4, 32, 32);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x00f2fe,
      emissive: 0x00f2fe,
      emissiveIntensity: 0.85,
      roughness: 0.2,
      metalness: 0.9,
      transparent: true,
      opacity: 0.92
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    coreRoot.add(innerCore);

    // Intersecting Torus Orbit Rings
    const ringGeo1 = new THREE.TorusGeometry(7.2, 0.08, 16, 80);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x00f2fe,
      emissive: 0x00f2fe,
      emissiveIntensity: 0.75,
      transparent: true,
      opacity: 0.7
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    coreRoot.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(8.2, 0.07, 16, 80);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      emissive: 0xa855f7,
      emissiveIntensity: 0.75,
      transparent: true,
      opacity: 0.65
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 3.5;
    ring2.rotation.z = -Math.PI / 6;
    coreRoot.add(ring2);

    // Orbiting Satellite Data Nodes
    const satelliteGroup = new THREE.Group();
    coreRoot.add(satelliteGroup);

    const satCount = 4;
    const satellites = [];
    for (let i = 0; i < satCount; i++) {
      const satGeo = new THREE.BoxGeometry(0.55, 0.55, 0.55);
      const satMat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0x00f2fe : 0x10b981,
        emissive: i % 2 === 0 ? 0x00f2fe : 0x10b981,
        emissiveIntensity: 0.9
      });
      const satMesh = new THREE.Mesh(satGeo, satMat);
      satelliteGroup.add(satMesh);
      satellites.push({
        mesh: satMesh,
        angle: (i / satCount) * Math.PI * 2,
        radius: 7.2 + (i % 2) * 1.0,
        speed: 0.9 + i * 0.25
      });
    }

    // Floating Data Particles around Centerpiece
    const centerParticleCount = 45;
    const centerParticleGeo = new THREE.BufferGeometry();
    const centerParticlePos = new Float32Array(centerParticleCount * 3);

    for (let i = 0; i < centerParticleCount; i++) {
      const radius = 6.5 + Math.random() * 5.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      centerParticlePos[i * 3] = radius * Math.cos(phi) * Math.cos(theta);
      centerParticlePos[i * 3 + 1] = radius * Math.sin(phi);
      centerParticlePos[i * 3 + 2] = radius * Math.cos(phi) * Math.sin(theta);
    }

    centerParticleGeo.setAttribute('position', new THREE.BufferAttribute(centerParticlePos, 3));
    const centerParticleMat = new THREE.PointsMaterial({
      color: 0x00f2fe,
      size: 1.8,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    const centerParticles = new THREE.Points(centerParticleGeo, centerParticleMat);
    coreRoot.add(centerParticles);

    // Interactive Drag / Orbit Mechanics
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    let velocity = { x: 0.004, y: 0.007 };
    let isHovered = false;

    stage.addEventListener('mousedown', (e) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
      stage.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;

      velocity.y = deltaX * 0.005;
      velocity.x = deltaY * 0.005;

      coreRoot.rotation.y += velocity.y;
      coreRoot.rotation.x += velocity.x;

      prevMousePos = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
      stage.style.cursor = 'grab';
    });

    // Touch support for mobile/tablet drag
    stage.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMousePos.x;
      const deltaY = e.touches[0].clientY - prevMousePos.y;

      velocity.y = deltaX * 0.006;
      velocity.x = deltaY * 0.006;

      coreRoot.rotation.y += velocity.y;
      coreRoot.rotation.x += velocity.x;

      prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    stage.addEventListener('mouseenter', () => {
      isHovered = true;
    });

    stage.addEventListener('mouseleave', () => {
      isHovered = false;
      isDragging = false;
      stage.style.cursor = 'grab';
    });

    // Handle Stage Resize
    function onStageResize() {
      const width = stage.clientWidth;
      const height = stage.clientHeight;
      if (width === 0 || height === 0) return;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    }

    window.addEventListener('resize', onStageResize);

    const centerpieceClock = new THREE.Clock();

    function animateHero() {
      requestAnimationFrame(animateHero);

      const delta = centerpieceClock.getDelta();
      const elapsed = centerpieceClock.getElapsedTime();

      // Damping / inertia when not dragging
      if (!isDragging) {
        const targetVelY = isHovered ? 0.012 : 0.005;
        const targetVelX = 0.002;

        velocity.y += (targetVelY - velocity.y) * 0.03;
        velocity.x += (targetVelX - velocity.x) * 0.03;

        coreRoot.rotation.y += velocity.y;
        coreRoot.rotation.x += velocity.x;
      }

      // Internal sub-element rotations
      outerMesh.rotation.z = elapsed * 0.18;
      shellMesh.rotation.z = -elapsed * 0.22;
      shellMesh.rotation.y = elapsed * 0.15;

      ring1.rotation.z = elapsed * 0.4;
      ring2.rotation.z = -elapsed * 0.35;

      // Energy sphere heartbeat pulsation
      const pulseScale = 1.0 + Math.sin(elapsed * 3.2) * 0.07;
      innerCore.scale.set(pulseScale, pulseScale, pulseScale);

      // Orbiting satellite data nodes
      satellites.forEach((sat) => {
        sat.angle += sat.speed * delta;
        sat.mesh.position.x = Math.cos(sat.angle) * sat.radius;
        sat.mesh.position.z = Math.sin(sat.angle) * sat.radius;
        sat.mesh.position.y = Math.sin(sat.angle * 2.5) * 1.8;

        sat.mesh.rotation.x += delta * 2.5;
        sat.mesh.rotation.y += delta * 2.5;
      });

      // Floating data dust rotation
      centerParticles.rotation.y = -elapsed * 0.08;

      renderer.render(scene, camera);
    }

    animateHero();
  }
})();
