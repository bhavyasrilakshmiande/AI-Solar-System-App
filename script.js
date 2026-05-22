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

camera.position.z = 8;

let currentPlanet;

const planetData = {

sun:{
color:0xffff00,
size:2,
title:"Sun",
info:"Sun is the center of the solar system.",
question:"What is at the center?",
options:["Sun","Earth"],
answer:0
},

mercury:{
color:0xaaaaaa,
size:0.5,
title:"Mercury",
info:"Mercury is closest to the Sun.",
question:"Closest planet to Sun?",
options:["Mercury","Mars"],
answer:0
},

venus:{
color:0xffcc99,
size:0.7,
title:"Venus",
info:"Venus is the hottest planet.",
question:"Hottest planet?",
options:["Venus","Earth"],
answer:0
},

earth:{
color:0x0000ff,
size:0.8,
title:"Earth",
info:"Earth supports life.",
question:"Planet with life?",
options:["Mars","Earth"],
answer:1
},

mars:{
color:0xff0000,
size:0.7,
title:"Mars",
info:"Mars is called Red Planet.",
question:"Red planet?",
options:["Mars","Venus"],
answer:0
},

jupiter:{
color:0xff9900,
size:1.5,
title:"Jupiter",
info:"Jupiter is the biggest planet.",
question:"Largest planet?",
options:["Earth","Jupiter"],
answer:1
},

saturn:{
color:0xffcc66,
size:1.3,
title:"Saturn",
info:"Saturn has beautiful rings.",
question:"Planet with rings?",
options:["Saturn","Mars"],
answer:0
},

uranus:{
color:0x66ffff,
size:1.1,
title:"Uranus",
info:"Uranus rotates sideways.",
question:"Which planet rotates sideways?",
options:["Uranus","Earth"],
answer:0
},

neptune:{
color:0x3333ff,
size:1.1,
title:"Neptune",
info:"Neptune is very cold.",
question:"Coldest planet?",
options:["Neptune","Venus"],
answer:0
},

pluto:{
color:0xffffff,
size:0.4,
title:"Pluto",
info:"Pluto is a dwarf planet.",
question:"Which is dwarf planet?",
options:["Pluto","Mars"],
answer:0
}

};

// SHOW PLANET
function showPlanet(name){

if(currentPlanet){
scene.remove(currentPlanet);
}

const data = planetData[name];

const geometry =
new THREE.SphereGeometry(
data.size,
32,
32
);

const material =
new THREE.MeshBasicMaterial({
color:data.color,
wireframe:true
});

currentPlanet =
new THREE.Mesh(
geometry,
material
);

// SATURN RING
if(name === "saturn"){

const ringGeometry =
new THREE.RingGeometry(1.8,2.5,32);

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

currentPlanet.add(ring);
}

scene.add(currentPlanet);

// TEXT
document.getElementById("planet-title")
.innerHTML = data.title;

document.getElementById("planet-info")
.innerHTML = data.info;

document.getElementById("question")
.innerHTML = data.question;

const buttons =
document.querySelectorAll(".quiz button");

buttons[0].innerHTML =
data.options[0];

buttons[1].innerHTML =
data.options[1];

window.correctAnswer =
data.answer;

}

// QUIZ
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

// ANIMATION
function animate(){

requestAnimationFrame(animate);

if(currentPlanet){
currentPlanet.rotation.y += 0.01;
}

renderer.render(scene,camera);

}

showPlanet("sun");

animate();
