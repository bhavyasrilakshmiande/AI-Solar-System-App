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

camera.position.z = 12;

let currentObject;
let orbitPlanet;

const light =
new THREE.PointLight(0xffffff,2);

light.position.set(10,10,10);

scene.add(light);

// ---------------- PAGES ----------------

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

// ---------------- SCENE ----------------

function clearScene(){

if(currentObject){

scene.remove(currentObject);

}

orbitPlanet = null;

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

// ---------------- SOLAR SYSTEM ----------------

function showPlanet(name){

clearScene();

currentObject =
new THREE.Group();

let size = 2;
let color = 0xffffff;

if(name === "sun"){
size = 3;
color = 0xffff00;
}

if(name === "mercury"){
size = 1;
color = 0x888888;
}

if(name === "venus"){
size = 1.4;
color = 0xffaa33;
}

if(name === "earth"){
size = 1.5;
color = 0x2233ff;
}

if(name === "mars"){
size = 1.2;
color = 0xff3300;
}

if(name === "jupiter"){
size = 2.8;
color = 0xff9966;
}

if(name === "saturn"){
size = 2.5;
color = 0xffdd99;
}

if(name === "uranus"){
size = 2;
color = 0x66ffff;
}

if(name === "neptune"){
size = 2;
color = 0x0000ff;
}

if(name === "pluto"){
size = 0.8;
color = 0xffffff;
}

const geometry =
new THREE.SphereGeometry(
size,
64,
64
);

const material =
new THREE.MeshStandardMaterial({
color:color
});

const planet =
new THREE.Mesh(
geometry,
material
);

currentObject.add(planet);

// SATURN RINGS
if(name === "saturn"){

const ringGeometry =
new THREE.RingGeometry(
3.2,
5,
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

planet.add(ring);

}

// EARTH MOON ORBIT
if(name === "earth"){

const moonGeometry =
new THREE.SphereGeometry(
0.3,
32,
32
);

const moonMaterial =
new THREE.MeshBasicMaterial({
color:0xffffff
});

orbitPlanet =
new THREE.Mesh(
moonGeometry,
moonMaterial
);

orbitPlanet.position.x = 3;

currentObject.add(orbitPlanet);

}

scene.add(currentObject);

updateQuiz(
name.toUpperCase(),
"Interactive 3D " + name + " model.",
"Select correct answer.",
["Correct","Wrong"],
0
);

}

// ---------------- PHYSICS ----------------

function showPhysics(type){

clearScene();

// GRAVITY
if(type === "gravity"){

const ball =
new THREE.Mesh(

new THREE.SphereGeometry(1.5,64,64),

new THREE.MeshStandardMaterial({
color:0x00ffff
})

);

currentObject = ball;

scene.add(currentObject);

updateQuiz(
"Gravity Simulation",
"Object falling due to gravity.",
"What force pulls objects down?",
["Gravity","Wind"],
0
);

}

// PENDULUM
if(type === "pendulum"){

currentObject =
new THREE.Group();

const ball =
new THREE.Mesh(

new THREE.SphereGeometry(0.7,32,32),

new THREE.MeshStandardMaterial({
color:0xffaa00
})

);

ball.position.y = -2;

const rod =
new THREE.Mesh(

new THREE.CylinderGeometry(
0.03,
0.03,
4,
32
),

new THREE.MeshBasicMaterial({
color:0xffffff
})

);

currentObject.add(ball);

currentObject.add(rod);

scene.add(currentObject);

updateQuiz(
"Pendulum",
"Pendulum swings continuously.",
"What motion does pendulum show?",
["Swing","Jump"],
0
);

}

// ORBIT
if(type === "orbit"){

currentObject =
new THREE.Group();

const sun =
new THREE.Mesh(

new THREE.SphereGeometry(1,32,32),

new THREE.MeshBasicMaterial({
color:0xffff00
})

);

currentObject.add(sun);

orbitPlanet =
new THREE.Mesh(

new THREE.SphereGeometry(0.5,32,32),

new THREE.MeshBasicMaterial({
color:0x0000ff
})

);

orbitPlanet.position.x = 4;

currentObject.add(orbitPlanet);

scene.add(currentObject);

updateQuiz(
"Orbit Simulation",
"Earth revolves around Sun.",
"What revolves around Sun?",
["Earth","Chair"],
0
);

}

}

// ---------------- BIOLOGY ----------------

function showBiology(type){

clearScene();

// HEART
if(type === "heart"){

const heart =
new THREE.Mesh(

new THREE.SphereGeometry(2,64,64),

new THREE.MeshStandardMaterial({
color:0xff0000
})

);

currentObject = heart;

scene.add(currentObject);

updateQuiz(
"Heart Beat",
"Heart beats continuously.",
"Which organ pumps blood?",
["Heart","Liver"],
0
);

}

// BRAIN
if(type === "brain"){

const brain =
new THREE.Mesh(

new THREE.IcosahedronGeometry(2,3),

new THREE.MeshStandardMaterial({
color:0xff99cc
})

);

currentObject = brain;

scene.add(currentObject);

updateQuiz(
"Brain",
"Brain controls body.",
"Which organ controls body?",
["Brain","Lungs"],
0
);

}

// LUNGS
if(type === "lungs"){

currentObject =
new THREE.Group();

const lung1 =
new THREE.Mesh(

new THREE.SphereGeometry(1.2,32,32),

new THREE.MeshStandardMaterial({
color:0xff6666
})

);

lung1.position.x = -1.2;

const lung2 =
new THREE.Mesh(

new THREE.SphereGeometry(1.2,32,32),

new THREE.MeshStandardMaterial({
color:0xff6666
})

);

lung2.position.x = 1.2;

currentObject.add(lung1);

currentObject.add(lung2);

scene.add(currentObject);

updateQuiz(
"Lungs",
"Lungs expand while breathing.",
"Which organ helps breathing?",
["Lungs","Heart"],
0
);

}

// CELLS
if(type === "cells"){

const cell =
new THREE.Mesh(

new THREE.TorusKnotGeometry(
1.5,
0.5,
100,
16
),

new THREE.MeshStandardMaterial({
color:0x00ff99
})

);

currentObject = cell;

scene.add(currentObject);

updateQuiz(
"Cells",
"Cells are basic unit of life.",
"Basic unit of life?",
["Cells","Bones"],
0
);

}

}

// ---------------- QUIZ ----------------

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

// ---------------- ANIMATION ----------------

function animate(){

requestAnimationFrame(animate);

const time = Date.now() * 0.002;

if(currentObject){

currentObject.rotation.y += 0.01;

// PENDULUM SWING
if(
document.getElementById("planet-title")
.innerHTML === "Pendulum"
){

currentObject.rotation.z =
Math.sin(time) * 0.7;

}

// HEART BEAT
if(
document.getElementById("planet-title")
.innerHTML === "Heart Beat"
){

const scale =
1 + Math.sin(time * 4) * 0.1;

currentObject.scale.set(
scale,
scale,
scale
);

}

// LUNGS BREATHING
if(
document.getElementById("planet-title")
.innerHTML === "Lungs"
){

const breathe =
1 + Math.sin(time * 2) * 0.15;

currentObject.scale.set(
breathe,
breathe,
breathe
);

}

}

// ORBIT ANIMATION
if(orbitPlanet){

orbitPlanet.position.x =
Math.cos(time) * 4;

orbitPlanet.position.z =
Math.sin(time) * 4;

}

renderer.render(scene,camera);

}

animate();
