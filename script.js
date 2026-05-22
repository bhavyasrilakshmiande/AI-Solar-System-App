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

camera.position.z = 6;

let currentPlanet;

const planetData = {

sun:{
color:0xffff00,
size:2.8,
title:"Sun",
info:"Sun is the center of the solar system.",
question:"What is at the center?",
options:["Sun","Earth"],
answer:0
},

mercury:{
color:0xaaaaaa,
size:1.5,
title:"Mercury",
info:"Mercury is closest to the Sun.",
question:"Closest planet to Sun?",
options:["Mercury","Mars"],
answer:0
},

venus:{
color:0xffcc99,
size:1.8,
title:"Venus",
info:"Venus is the hottest planet.",
question:"Hottest planet?",
options:["Venus","Earth"],
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
info:"Mars is called Red Planet.",
question:"Red planet?",
options:["Mars","Venus"],
answer:0
},

jupiter:{
color:0xff9900,
size:2.8,
title:"Jupiter",
info:"Jupiter is the biggest planet.",
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
question:"Which planet rotates sideways?",
options:["Uranus","Earth"],
answer:0
},

neptune:{
color:0x3333ff,
size:2.2,
title:"Neptune",
info:"Neptune is very cold.",
question:"Coldest planet?",
options:["Neptune","Venus"],
answer:0
},

pluto:{
color:0xffffff,
size:1.2,
title:"Pluto",
info:"Pluto is a dwarf planet.",
question:"Which is dwarf planet?",
options:["Pluto","Mars"],
answer:0
}

};

function showPlanet(name){

if(currentPlanet){
scene.remove(currentPlanet);
}

const data = planetData[name];

const geometry =
new THREE.SphereGeometry(
data.size,
64,
64
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

currentPlanet.add(ring);
}

scene.add(currentPlanet);

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

document.getElementById("result")
.innerHTML = "";

window.correctAnswer =
data.answer;

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

if(currentPlanet){

currentPlanet.rotation.y += 0.01;

}

renderer.render(scene,camera);

}

showPlanet("sun");

animate();
