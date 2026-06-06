import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function Product3DViewer() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);

    const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(2.5, 2, 3);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1.4, 1.4, 1.4);
    const texture = new THREE.CanvasTexture(createTexture());
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.45,
      metalness: 0.12
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(4, 5, 3);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x38bdf8, 1.3);
    fillLight.position.set(-3, 1.5, 2);
    scene.add(fillLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;

    let frameId;
    const animate = () => {
      cube.rotation.x += 0.006;
      cube.rotation.y += 0.01;
      controls.update();
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const resizeObserver = new ResizeObserver(() => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    resizeObserver.observe(mount);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      controls.dispose();
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="viewer-canvas" ref={mountRef} aria-label="Rotating textured cube product preview" />;
}

function createTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const context = canvas.getContext('2d');

  context.fillStyle = '#0f172a';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = '#14b8a6';
  context.fillRect(0, 0, 256, 256);
  context.fillStyle = '#f59e0b';
  context.fillRect(256, 256, 256, 256);
  context.strokeStyle = '#ffffff';
  context.lineWidth = 18;
  context.strokeRect(42, 42, 428, 428);
  context.fillStyle = '#ffffff';
  context.font = 'bold 76px Arial';
  context.textAlign = 'center';
  context.fillText('3D', 256, 286);

  return canvas;
}

export default Product3DViewer;
