const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / 400,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, 400);

document.getElementById("scene-container")
.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(1, 32, 32);

const material = new THREE.MeshBasicMaterial({
  color: 0x0000ff,
  wireframe: true
});

const earth = new THREE.Mesh(geometry, material);

scene.add(earth);

camera.position.z = 3;

function animate() {
  requestAnimationFrame(animate);

  earth.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
