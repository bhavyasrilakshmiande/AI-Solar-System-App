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
// =========================
// BIOLOGY MODELS
// =========================

function loadBiology(type) {

    clearScene();

    if (type === "heart") {

        const geometry = new THREE.TorusKnotGeometry(2, 0.7, 120, 16);

        const material = new THREE.MeshStandardMaterial({
            color: 0xff3355,
            metalness: 0.3,
            roughness: 0.4
        });

        currentObject = new THREE.Mesh(geometry, material);

        scene.add(currentObject);

        animateObject = () => {
            currentObject.rotation.y += 0.02;
            currentObject.scale.x = 1 + Math.sin(Date.now() * 0.005) * 0.1;
            currentObject.scale.y = 1 + Math.sin(Date.now() * 0.005) * 0.1;
        };

        setInfo(
            "Heart",
            "The heart pumps blood through the body.",
            "Which organ pumps blood?",
            "Heart",
            "Liver"
        );
    }

    // =========================
    // LUNGS
    // =========================

    if (type === "lungs") {

        const leftGeometry = new THREE.SphereGeometry(1.8, 64, 64);
        const rightGeometry = new THREE.SphereGeometry(1.8, 64, 64);

        const material = new THREE.MeshStandardMaterial({
            color: 0xffc0cb,
            transparent: true,
            opacity: 0.9
        });

        const leftLung = new THREE.Mesh(leftGeometry, material);
        const rightLung = new THREE.Mesh(rightGeometry, material);

        leftLung.position.x = -1.5;
        rightLung.position.x = 1.5;

        const lungGroup = new THREE.Group();

        lungGroup.add(leftLung);
        lungGroup.add(rightLung);

        currentObject = lungGroup;

        scene.add(currentObject);

        animateObject = () => {

            const breath = 1 + Math.sin(Date.now() * 0.003) * 0.08;

            leftLung.scale.set(breath, breath, breath);
            rightLung.scale.set(breath, breath, breath);

            lungGroup.rotation.y += 0.01;
        };

        setInfo(
            "Lungs",
            "Lungs help humans breathe oxygen.",
            "Which organ helps breathing?",
            "Lungs",
            "Kidney"
        );
    }

    // =========================
    // BRAIN
    // =========================

    if (type === "brain") {

        const geometry = new THREE.IcosahedronGeometry(2.2, 8);

        const material = new THREE.MeshStandardMaterial({
            color: 0xffaa88,
            wireframe: false
        });

        currentObject = new THREE.Mesh(geometry, material);

        scene.add(currentObject);

        animateObject = () => {
            currentObject.rotation.y += 0.01;
            currentObject.rotation.x += 0.005;
        };

        setInfo(
            "Brain",
            "The brain controls the body and thoughts.",
            "Which organ controls the body?",
            "Brain",
            "Heart"
        );
    }

    // =========================
    // CELLS
    // =========================

    if (type === "cells") {

        const geometry = new THREE.OctahedronGeometry(2.2, 4);

        const material = new THREE.MeshStandardMaterial({
            color: 0x44ff99,
            wireframe: false
        });

        currentObject = new THREE.Mesh(geometry, material);

        scene.add(currentObject);

        animateObject = () => {
            currentObject.rotation.x += 0.01;
            currentObject.rotation.y += 0.02;
        };

        setInfo(
            "Cells",
            "Cells are the building blocks of life.",
            "What is the basic unit of life?",
            "Cell",
            "Rock"
        );
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
