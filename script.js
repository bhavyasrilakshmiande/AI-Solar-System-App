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

// LIGHT
const light = new THREE.PointLight(0xffffff,1);

light.position.set(10,10,10);

scene.add(light);

// PLANET DATA
const planetData = {

sun:{
color:0xffff00,
size:2.8,
title:"Sun",
info:"The Sun is the center of the solar system.",
question:"What is center of solar system?",
options:["Sun","Mars"],
answer:0
},

mercury:{
color:0xaaaaaa,
size:1.5,
title:"Mercury",
info:"Mercury is closest planet to Sun.",
question:"Closest planet to Sun?",
options:["Mercury","Earth"],
answer:0
},

venus:{
color:0xffcc99,
size:1.8,
title:"Venus",
info:"Venus is hottest planet.",
question:"Hottest planet?",
options:["Venus","Mars"],
answer:0
},

earth:{
color:0x0000ff,
size:2,
title:"Earth",
info:"Earth supports life.",
question:"Planet with life?",
options:["Mars","Earth"],
answer:1
},

mars:{
color:0xff0000,
size:1.7,
title:"Mars",
info:"Mars is Red Planet.",
question:"Which is Red Planet?",
options:["Mars","Venus"],
answer:0
},

jupiter:{
color:0xff9900,
size:2.8,
title:"Jupiter",
info:"Largest planet in solar system.",
question:"Largest planet?",
options:["Earth","Jupiter"],
answer:1
},

saturn:{
color:0xffcc66,
size:2.5,
title:"Saturn",
info:"Saturn has beautiful rings.",
question:"Planet with rings?",
options:["Saturn","Mars"],
answer:0
},

uranus:{
color:0x66ffff,
size:2.2,
title:"Uranus",
info:"Uranus rotates sideways.",
question:"Sideways rotating planet?",
options:["Uranus","Earth"],
answer:0
},

neptune:{
color:0x3333ff,
size:2.2,
title:"Neptune",
info:"Neptune is coldest planet.",
question:"Coldest planet?",
options:["Neptune","Venus"],
answer:0
},

pluto:{
color:0xffffff,
size:1.2,
title:"Pluto",
info:"Pluto is dwarf planet.",
question:"Which is dwarf planet?",
options:["Pluto","Mars"],
answer:0
}

};

// CLEAR OLD OBJECT
function clearScene(){

if(currentObject){
scene.remove(currentObject);
}

}

// SHOW PLANETS
function showPlanet(name){

clearScene();

const data = planetData[name];

const geometry =
new THREE.SphereGeometry(
data.size,
64,
64
);

const material =
new THREE.MeshStandardMaterial({
color:data.color,
wireframe:true
});

currentObject =
new THREE.Mesh(
geometry,
material
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

scene.add(currentObject);

updateQuiz(
data.title,
data.info,
data.question,
data.options,
data.answer
);

}

// PHYSICS LAB
function showPhysics(){

clearScene();

const geometry =
new THREE.SphereGeometry(
1.5,
64,
64
);

const material =
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
"Physics Lab",
"Explore gravity, pendulum and motion.",
"What force pulls objects down?",
["Gravity","Light"],
0
);

}

// BIOLOGY LAB
function showBiology(){

clearScene();

const geometry =
new THREE.TorusKnotGeometry(
1.2,
0.4,
100,
16
);

const material =
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
"Biology Lab",
"Explore heart, brain, lungs and cells.",
"Which organ pumps blood?",
["Heart","Liver"],
0
);

}

// UPDATE QUIZ
function updateQuiz(
title,
info,
question,
options,
answer
){

document.getElementById("planet-title")
.innerHTML = title;

document.getElementById("planet-info")
.innerHTML = info;

document.getElementById("question")
.innerHTML = question;

const buttons =
document.querySelectorAll(".quiz button");

buttons[0].innerHTML =
options[0];

buttons[1].innerHTML =
options[1];

document.getElementById("result")
.innerHTML = "";

window.correctAnswer = answer;

}

// CHECK ANSWER
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

if(currentObject){

currentObject.rotation.y += 0.01;

}

renderer.render(scene,camera);

}

showPlanet("sun");

animate();
