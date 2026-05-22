const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / 400,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  antialias: true
});

renderer.setSize(window.innerWidth, 400);

document.getElementById("scene-container")
.appendChild(renderer.domElement);

camera.position.z = 40;

// SUN
const sunGeometry = new THREE.SphereGeometry(3, 32, 32);

const sunMaterial = new THREE.MeshBasicMaterial({
  color: 0xffff00
});

const sun = new THREE.Mesh(sunGeometry, sunMaterial);

scene.add(sun);

// PLANETS ARRAY
const planets = [];

// CREATE PLANET FUNCTION
function createPlanet(size, color, distance, speed) {

  const geometry = new THREE.SphereGeometry(size, 32, 32);

  const material = new THREE.MeshBasicMaterial({
    color: color,
    wireframe: true
  });

  const planet = new THREE.Mesh(geometry, material);

  scene.add(planet);

  planets.push({
    mesh: planet,
    distance: distance,
    speed: speed
  });

  return planet;
}

// PLANETS
createPlanet(0.4, 0xaaaaaa, 5, 0.02);   // Mercury
createPlanet(0.7, 0xffcc99, 8, 0.015);  // Venus
createPlanet(0.8, 0x0000ff, 11, 0.01);  // Earth
createPlanet(0.6, 0xff0000, 14, 0.008); // Mars
createPlanet(1.8, 0xff9900, 18, 0.006); // Jupiter

// SATURN
const saturn = createPlanet(
  1.5,
  0xffcc66,
  23,
  0.005
);

// SATURN RING
const ringGeometry = new THREE.RingGeometry(
  2,
  3,
  32
);

const ringMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide
});

const ring = new THREE.Mesh(
  ringGeometry,
  ringMaterial
);

ring.rotation.x = Math.PI / 2;

saturn.add(ring);

createPlanet(1.1, 0x66ffff, 28, 0.004); // Uranus
createPlanet(1.0, 0x3333ff, 33, 0.003); // Neptune
createPlanet(0.3, 0xffffff, 37, 0.002); // Pluto

// ANIMATION
function animate() {

  requestAnimationFrame(animate);

  sun.rotation.y += 0.005;

  planets.forEach((planet, index) => {

    planet.mesh.rotation.y += 0.02;

    const angle =
      Date.now() * 0.001 * planet.speed * 100;

    planet.mesh.position.x =
      Math.cos(angle) * planet.distance;

    planet.mesh.position.z =
      Math.sin(angle) * planet.distance;
  });

  renderer.render(scene, camera);
}

animate();
