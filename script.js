const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / 420,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer({
antialias:true
});

renderer.setSize(window.innerWidth * 0.9,420);

document.getElementById("scene-container")
.appendChild(renderer.domElement);

camera.position.z = 7;

let currentObject;

const light =
new THREE.PointLight(0xffffff,1);

light.position.set(10,10,10);

scene.add(light);

function hideAllPages(){

document.getElementById("home-page")
.classList.add("hidden");

document.getElementById("solar-page")
.classList.add("hidden");

document.getElementById("physics-page")
.classList.add("hidden");

document.getElementById("biology-page")
.classList.add("hidden");

}

function goHome(){

hideAllPages();

closeViewer();

document.getElementById("home-page")
.classList.remove("hidden");

}

function openSolarSystem(){

hideAllPages();

closeViewer();

document.getElementById("solar-page")
.classList.remove("hidden");

}

function openPhysicsLab(){

hideAllPages();

closeViewer();

document.getElementById("physics-page")
.classList.remove("hidden");

}

function openBiologyLab(){

hideAllPages();

closeViewer();

document.getElementById("biology-page")
.classList.remove("hidden");

}

function openViewer(){

document.getElementById("viewer-section")
.classList.remove("hidden");

}

function closeViewer(){

document.getElementById("viewer-section")
.classList.add("hidden");

}

function clearScene(){

if(currentObject){
scene.remove(currentObject);
}

}

function updateQuiz(
title,
info,
question,
options,
answer
){

openViewer();

document.getElementById("planet-title")
.innerHTML = title;

document.getElementById("planet-info")
.innerHTML = info;

document.getElementById("question")
.innerHTML = question;

const buttons =
document.querySelectorAll(".quiz button");

buttons[0].innerHTML = options[0];
buttons[1].innerHTML = options[1];

window.correctAnswer = answer;

document.getElementById("result")
.innerHTML = "";

}

function createSphere(size,color){

const geometry =
new THREE.SphereGeometry(
size,
64,
64
);

const material =
new THREE.MeshStandardMaterial({
color:color,
wireframe:true
});

currentObject =
new THREE.Mesh(
geometry,
material
);

scene.add(currentObject);

}

function showPlanet(name){

clearScene();

const planets = {

sun:[
0xffff00,
2.8,
"Sun",
"Sun is the center of solar system.",
"What is center of solar system?",
["Sun","Mars"],
0
],

mercury:[
0xaaaaaa,
1.7,
"Mercury",
"Mercury is closest to Sun.",
"Closest planet to Sun?",
["Mercury","Earth"],
0
],

venus:[
0xffcc99,
2,
"Venus",
"Venus is hottest planet.",
"Hottest planet?",
["Venus","Mars"],
0
],

earth:[
0x0000ff,
2.2,
"Earth",
"Earth supports life.",
"Planet with life?",
["Earth","Mars"],
0
],

mars:[
0xff0000,
2,
"Mars",
"Mars is Red Planet.",
"Which is Red Planet?",
["Mars","Venus"],
0
],

jupiter:[
0xff9900,
3,
"Jupiter",
"Largest planet.",
"Largest planet?",
["Earth","Jupiter"],
1
],

saturn:[
0xffcc66,
2.8,
"Saturn",
"Saturn has rings.",
"Planet with rings?",
["Saturn","Mars"],
0
],

uranus:[
0x66ffff,
2.5,
"Uranus",
"Ice giant planet.",
"Ice giant planet?",
["Uranus","Earth"],
0
],

neptune:[
0x3333ff,
2.5,
"Neptune",
"Farthest planet.",
"Farthest planet?",
["Neptune","Mars"],
0
],

pluto:[
0xffffff,
1.5,
"Pluto",
"Dwarf planet.",
"Which is dwarf planet?",
["Pluto","Earth"],
0
]

};

const p = planets[name];

createSphere(
p[1],
p[0]
);

if(name === "saturn"){

const ringGeometry =
new THREE.RingGeometry(
3.2,
4.5,
64
);

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

currentObject.add(ring);

}

updateQuiz(
p[2],
p[3],
p[4],
p[5],
p[6]
);

}

function showPhysics(type){

clearScene();

let geometry;
let material;

if(type === "gravity"){

geometry =
new THREE.SphereGeometry(
2,
64,
64
);

material =
new THREE.MeshStandardMaterial({
color:0x00ffff,
wireframe:true
});

currentObject =
new THREE.Mesh(
geometry,
material
);

scene.add(currentObject);

updateQuiz(
"Gravity Simulation",
"Gravity pulls objects downward.",
"What force pulls objects down?",
["Gravity","Light"],
0
);

}

if(type === "pendulum"){

geometry =
new THREE.ConeGeometry(
1,
3,
32
);

material =
new THREE.MeshStandardMaterial({
color:0xffaa00,
wireframe:true
});

currentObject =
new THREE.Mesh(
geometry,
material
);

scene.add(currentObject);

updateQuiz(
"Pendulum",
"Pendulum swings back and forth.",
"What motion does pendulum show?",
["Swing","Jump"],
0
);

}

if(type === "orbit"){

geometry =
new THREE.TorusGeometry(
2,
0.5,
32,
100
);

material =
new THREE.MeshStandardMaterial({
color:0x00ff99,
wireframe:true
});

currentObject =
new THREE.Mesh(
geometry,
material
);

scene.add(currentObject);

updateQuiz(
"Orbit Simulation",
"Objects move around planets in orbit.",
"What do planets follow?",
["Orbit","Road"],
0
);

}

}

function showBiology(type){

clearScene();

let geometry;
let material;

if(type === "heart"){

geometry =
new THREE.TorusKnotGeometry(
1.5,
0.5,
100,
16
);

material =
new THREE.MeshStandardMaterial({
color:0xff0055,
wireframe:true
});

currentObject =
new THREE.Mesh(
geometry,
material
);

scene.add(currentObject);

updateQuiz(
"Heart",
"Heart pumps blood.",
"Which organ pumps blood?",
["Heart","Liver"],
0
);

}

if(type === "brain"){

geometry =
new THREE.IcosahedronGeometry(
2,
1
);

material =
new THREE.MeshStandardMaterial({
color:0xff99cc,
wireframe:true
});

currentObject =
new THREE.Mesh(
geometry,
material
);

scene.add(currentObject);

updateQuiz(
"Brain",
"Brain controls body functions.",
"Which organ controls body?",
["Brain","Lungs"],
0
);

}

if(type === "lungs"){

geometry =
new THREE.CylinderGeometry(
1,
1,
3,
32
);

material =
new THREE.MeshStandardMaterial({
color:0xff6666,
wireframe:true
});

currentObject =
new THREE.Mesh(
geometry,
material
);

scene.add(currentObject);

updateQuiz(
"Lungs",
"Lungs help breathing.",
"Which organ helps breathing?",
["Lungs","Heart"],
0
);

}

if(type === "cells"){

geometry =
new THREE.OctahedronGeometry(
2
);

material =
new THREE.MeshStandardMaterial({
color:0x66ffcc,
wireframe:true
});

currentObject =
new THREE.Mesh(
geometry,
material
);

scene.add(currentObject);

updateQuiz(
"Cells",
"Cells are basic unit of life.",
"What is basic unit of life?",
["Cells","Bones"],
0
);

}

}

function checkAnswer(index){

const result =
document.getElementById("result");

if(index === window.correctAnswer){

result.innerHTML = "Correct!";

}
else{

result.innerHTML = "Wrong!";

}

}

function animate(){

requestAnimationFrame(animate);

if(currentObject){

currentObject.rotation.y += 0.01;

}

renderer.render(scene,camera);

}

animate();
