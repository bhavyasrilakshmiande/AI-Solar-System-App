const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / 400,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer({
antialias:true
});

renderer.setSize(window.innerWidth,400);

document.getElementById("scene-container")
.appendChild(renderer.domElement);

camera.position.z = 45;

// SUN
const sunGeometry = new THREE.SphereGeometry(3,32,32);

const sunMaterial = new THREE.MeshBasicMaterial({
color:0xffff00
});

const sun = new THREE.Mesh(
sunGeometry,
sunMaterial
);

scene.add(sun);

// PLANETS
const planets = [];

function addPlanet(size,color,distance,speed){

const geometry =
new THREE.SphereGeometry(size,32,32);

const material =
new THREE.MeshBasicMaterial({
color:color,
wireframe:true
});

const planet =
new THREE.Mesh(geometry,material);

scene.add(planet);

planets.push({
planet,
distance,
speed
});

return planet;
}

// ALL PLANETS
addPlanet(0.4,0xaaaaaa,6,0.04); // Mercury
addPlanet(0.7,0xffcc99,9,0.03); // Venus
addPlanet(0.8,0x0000ff,12,0.025); // Earth
addPlanet(0.6,0xff0000,15,0.02); // Mars
addPlanet(1.8,0xff9900,20,0.015); // Jupiter

const saturn =
addPlanet(1.5,0xffcc66,25,0.012);

// SATURN RING
const ringGeometry =
new THREE.RingGeometry(2,3,32);

const ringMaterial =
new THREE.MeshBasicMaterial({
color:0xffffff,
side:THREE.DoubleSide
});

const ring =
new THREE.Mesh(
ringGeometry,
ringMaterial
);

ring.rotation.x = Math.PI/2;

saturn.add(ring);

addPlanet(1.2,0x66ffff,30,0.01); // Uranus
addPlanet(1.1,0x3333ff,35,0.008); // Neptune
addPlanet(0.3,0xffffff,40,0.006); // Pluto

function animate(){

requestAnimationFrame(animate);

sun.rotation.y += 0.01;

planets.forEach((obj,index)=>{

obj.planet.rotation.y += 0.02;

const angle =
Date.now()*0.001*obj.speed*50;

obj.planet.position.x =
Math.cos(angle+index)*obj.distance;

obj.planet.position.z =
Math.sin(angle+index)*obj.distance;

});

renderer.render(scene,camera);

}

animate();
