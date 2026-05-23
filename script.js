const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / 420,
  0.1,
  1000,
);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});

renderer.setSize(window.innerWidth * 0.9, 420);

document.getElementById("scene-container").appendChild(renderer.domElement);

camera.position.z = 12;

let currentObject;
let orbitPlanet;

const light = new THREE.PointLight(0xffffff, 2);

light.position.set(10, 10, 10);

scene.add(light);

function hideAllPages() {
  document.getElementById("home-page").classList.add("hidden");

  document.getElementById("solar-page").classList.add("hidden");

  document.getElementById("physics-page").classList.add("hidden");

  document.getElementById("biology-page").classList.add("hidden");
}

function goHome() {
  hideAllPages();

  closeViewer();

  document.getElementById("home-page").classList.remove("hidden");
}

function openSolarSystem() {
  hideAllPages();

  closeViewer();

  document.getElementById("solar-page").classList.remove("hidden");
}

function openPhysicsLab() {
  hideAllPages();

  closeViewer();

  document.getElementById("physics-page").classList.remove("hidden");
}

function openBiologyLab() {
  hideAllPages();

  closeViewer();

  document.getElementById("biology-page").classList.remove("hidden");
}

function openViewer() {
  document.getElementById("viewer-section").classList.remove("hidden");
}

function closeViewer() {
  document.getElementById("viewer-section").classList.add("hidden");
}

function clearScene() {
  if (currentObject) {
    scene.remove(currentObject);
  }

  orbitPlanet = null;
}

function updateQuiz(title, info, question, options, answer) {
  openViewer();

  document.getElementById("planet-title").innerHTML = title;

  document.getElementById("planet-info").innerHTML = info;

  document.getElementById("question").innerHTML = question;

  const buttons = document.querySelectorAll(".quiz button");

  buttons[0].innerHTML = options[0];

  buttons[1].innerHTML = options[1];

  window.correctAnswer = answer;

  document.getElementById("result").innerHTML = "";
}

function showPlanet(name) {
  updateProgress();
  clearScene();

  currentObject = new THREE.Group();

  let size = 2;
  let color = 0xffffff;

  if (name === "sun") {
    size = 3;
    color = 0xffff00;
  }

  if (name === "mercury") {
    size = 1;
    color = 0x888888;
  }

  if (name === "venus") {
    size = 1.4;
    color = 0xffaa33;
  }

  if (name === "earth") {
    size = 1.5;
    color = 0x2233ff;
  }

  if (name === "mars") {
    size = 1.2;
    color = 0xff3300;
  }

  if (name === "jupiter") {
    size = 2.8;
    color = 0xff9966;
  }

  if (name === "saturn") {
    size = 2.5;
    color = 0xffdd99;
  }

  if (name === "uranus") {
    size = 2;
    color = 0x66ffff;
  }

  if (name === "neptune") {
    size = 2;
    color = 0x0000ff;
  }

  if (name === "pluto") {
    size = 0.8;
    color = 0xffffff;
  }

  const geometry = new THREE.SphereGeometry(size, 64, 64);

  const material = new THREE.MeshStandardMaterial({
    color: color,
  });

  const planet = new THREE.Mesh(geometry, material);

  currentObject.add(planet);

  if (name === "saturn") {
    const ringGeometry = new THREE.RingGeometry(3.2, 5, 64);

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
    });

    const ring = new THREE.Mesh(ringGeometry, ringMaterial);

    ring.rotation.x = Math.PI / 2;

    planet.add(ring);
  }

  if (name === "earth") {
    const moonGeometry = new THREE.SphereGeometry(0.3, 32, 32);

    const moonMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });

    orbitPlanet = new THREE.Mesh(moonGeometry, moonMaterial);

    orbitPlanet.position.x = 3;

    currentObject.add(orbitPlanet);
  }

  scene.add(currentObject);

  const data = {
    sun: [
      "Sun",
      "The Sun is a massive star located at the center of the solar system. It provides light, heat, and energy that support life on Earth. The Sun is made mostly of hydrogen and helium gases. Nuclear reactions inside the Sun produce enormous amounts of energy. All planets revolve around the Sun because of its strong gravitational force. Without the Sun, life on Earth would not exist.",
      "What gives light to planets?",
      ["Sun", "Moon"],
      0,
    ],

    mercury: [
      "Mercury",
      "Mercury is the closest planet to the Sun. It is very hot during the day and very cold at night. Mercury is the smallest planet in the solar system.",
      "Closest planet?",
      ["Mercury", "Earth"],
      0,
    ],

    venus: [
      "Venus",
      "Venus is the hottest planet in the solar system. It has thick clouds and a very dense atmosphere. Venus is sometimes called Earth’s sister planet.",
      "Hottest planet?",
      ["Venus", "Mars"],
      0,
    ],

    earth: [
      "Earth",
      "Earth is the only known planet that supports life. It has water, oxygen, plants, animals, and humans. Earth has one moon",
      "Planet with life?",
      ["Earth", "Mars"],
      0,
    ],

    mars: [
      "Mars",
      "Mars is known as the Red Planet because of its red color. Scientists believe Mars may have had water long ago. Mars has two small moons.",
      "Red planet?",
      ["Mars", "Venus"],
      0,
    ],

    jupiter: [
      "Jupiter",
      "Jupiter is the largest planet in the solar system. It is a gas giant with many moons. Jupiter has a huge storm called the Great Red Spot.",
      "Largest planet?",
      ["Earth", "Jupiter"],
      1,
    ],

    saturn: [
      "Saturn",
      "Saturn is famous for its bright and beautiful ring system made of ice and rock particles. It is the second-largest planet in the solar system. Saturn is a gas giant with many moons, including Titan, one of the largest moons in the solar system. Despite its huge size, Saturn is very light and could float in water if a large enough ocean existed.",
      "Planet with rings?",
      ["Saturn", "Mars"],
      0,
    ],

    uranus: [
      "Uranus",
      "Uranus is an ice giant planet with a pale blue-green color caused by methane gas in its atmosphere. Unlike most planets, Uranus rotates on its side, making its seasons very unusual. It has faint rings and many moons. Uranus is extremely cold because it is very far from the Sun.",
      "Ice giant planet?",
      ["Uranus", "Earth"],
      0,
    ],

    neptune: [
      "Neptune",
      "Neptune is the farthest major planet from the Sun. It is very cold and windy. Neptune has deep blue color and strong storms.",
      "Blue planet?",
      ["Neptune", "Mars"],
      0,
    ],

    pluto: [
      "Pluto",
      "Pluto is a dwarf planet. It is smaller than the major planets and is located far from the Sun. Pluto was once considered the ninth planet.",
      "Dwarf planet?",
      ["Pluto", "Earth"],
      0,
    ],
  };

  const p = data[name];

  updateQuiz(p[0], p[1], p[2], p[3], p[4]);
}

function showPhysics(type) {
  updateProgress();
  clearScene();

  if (type === "gravity") {
    const geometry = new THREE.SphereGeometry(2, 64, 64);

    const material = new THREE.MeshStandardMaterial({
      color: 0x00ffff,
    });

    currentObject = new THREE.Mesh(geometry, material);

    scene.add(currentObject);

    updateQuiz(
      "Gravity Simulation",
      "Gravity is a force that pulls objects toward each other. Earth’s gravity keeps people, oceans, and the atmosphere from floating into space. Gravity is also responsible for keeping planets in orbit around the Sun. The stronger an object’s mass, the stronger its gravity.",
      "What force pulls objects down?",
      ["Gravity", "Light"],
      0,
    );
  }

  if (type === "pendulum") {
    currentObject = new THREE.Group();

    const ball = new THREE.Mesh(
      new THREE.SphereGeometry(0.7, 32, 32),

      new THREE.MeshStandardMaterial({
        color: 0xffaa00,
      }),
    );

    ball.position.y = -2;

    const rod = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.03, 4, 32),

      new THREE.MeshBasicMaterial({
        color: 0xffffff,
      }),
    );

    currentObject.add(ball);

    currentObject.add(rod);

    scene.add(currentObject);

    updateQuiz(
      "Pendulum",
      "A pendulum is a weight suspended from a fixed point that swings back and forth due to gravity. Pendulums are used in clocks and scientific experiments. The speed of a pendulum depends on its length and gravity.",
      "What motion does pendulum show?",
      ["Swing", "Jump"],
      0,
    );
  }

  if (type === "orbit") {
    currentObject = new THREE.Group();

    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 32),

      new THREE.MeshBasicMaterial({
        color: 0xffff00,
      }),
    );

    currentObject.add(sun);

    orbitPlanet = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 32, 32),

      new THREE.MeshBasicMaterial({
        color: 0x0000ff,
      }),
    );

    orbitPlanet.position.x = 4;

    currentObject.add(orbitPlanet);

    scene.add(currentObject);

    updateQuiz(
      "Orbit Simulation",
      "An orbit is the curved path followed by planets, moons, and satellites around another object because of gravity. Earth orbits the Sun, while the Moon orbits Earth. Orbits help maintain balance in the solar system.",
      "What revolves around Sun?",
      ["Earth", "Chair"],
      0,
    );
  }
}

function showBiology(type) {
  updateProgress();
  clearScene();

  if (type === "heart") {
    const geometry = new THREE.SphereGeometry(2, 64, 64);

    const material = new THREE.MeshStandardMaterial({
      color: 0xff0000,
    });

    currentObject = new THREE.Mesh(geometry, material);

    scene.add(currentObject);

    updateQuiz(
      "Heart Beat",
      "The heart is a muscular organ that pumps blood throughout the body. It supplies oxygen and nutrients to tissues and removes waste products. The human heart beats around 100,000 times per day.",
      "Which organ pumps blood?",
      ["Heart", "Liver"],
      0,
    );
  }

  if (type === "brain") {
    const geometry = new THREE.IcosahedronGeometry(2, 3);

    const material = new THREE.MeshStandardMaterial({
      color: 0xff99cc,
    });

    currentObject = new THREE.Mesh(geometry, material);

    scene.add(currentObject);

    updateQuiz(
      "Brain",
      "The brain is the control center of the body. It processes information, controls movement, stores memories, and manages emotions. The brain works together with the nervous system to control body functions.",
      "Which organ controls body?",
      ["Brain", "Lungs"],
      0,
    );
  }

  if (type === "lungs") {
    currentObject = new THREE.Group();

    const lung1 = new THREE.Mesh(
      new THREE.SphereGeometry(1.2, 32, 32),

      new THREE.MeshStandardMaterial({
        color: 0xff6666,
      }),
    );

    lung1.position.x = -1.2;

    const lung2 = new THREE.Mesh(
      new THREE.SphereGeometry(1.2, 32, 32),

      new THREE.MeshStandardMaterial({
        color: 0xff6666,
      }),
    );

    lung2.position.x = 1.2;

    currentObject.add(lung1);

    currentObject.add(lung2);

    scene.add(currentObject);

    updateQuiz(
      "Lungs",
      "Lungs are organs that help humans breathe by taking in oxygen and removing carbon dioxide. During breathing, lungs expand and contract. Healthy lungs are essential for survival.",
      "Which organ helps breathing?",
      ["Lungs", "Heart"],
      0,
    );
  }

  if (type === "cells") {
    const geometry = new THREE.TorusKnotGeometry(1.5, 0.5, 100, 16);

    const material = new THREE.MeshStandardMaterial({
      color: 0x00ff99,
    });

    currentObject = new THREE.Mesh(geometry, material);

    scene.add(currentObject);

    updateQuiz(
      "Cells",
      "Cells are the smallest structural and functional units of life. All living organisms are made of cells. Cells perform important activities such as producing energy, removing waste, and reproducing.",
      "Basic unit of life?",
      ["Cells", "Bones"],
      0,
    );
  }
}

function checkAnswer(index) {
  const result = document.getElementById("result");

  if (index === window.correctAnswer) {
    result.innerHTML = "Correct!";
  } else {
    result.innerHTML = "Wrong!";
  }
}

function animate() {
  requestAnimationFrame(animate);

  if (currentObject) {
    currentObject.rotation.y += 0.01;
  }

  if (orbitPlanet) {
    orbitPlanet.position.x = Math.cos(Date.now() * 0.001) * 4;

    orbitPlanet.position.z = Math.sin(Date.now() * 0.001) * 4;
  }

  renderer.render(scene, camera);
}
function sendMessage() {
  const input = document.getElementById("user-input");

  const messages = document.getElementById("chat-messages");

  const userText = input.value.toLowerCase();

  messages.innerHTML += `
<p><b>You:</b> ${userText}</p>
`;

  let aiReply =
    "Sorry, I don't understand. Ask about planets, biology, physics or AI.";

  // SOLAR SYSTEM

  if (userText.includes("sun")) {
    aiReply =
      "The Sun is the center of the solar system. It gives light, heat, and energy to all planets. The Sun is a giant star made of hot gases.";
  } else if (userText.includes("earth")) {
    aiReply = "Earth is the only known planet with life.";
  } else if (userText.includes("mars")) {
    aiReply = "Mars is known as the Red Planet.";
  } else if (userText.includes("saturn")) {
    aiReply = "Saturn is famous for its rings.";
  } else if (userText.includes("jupiter")) {
    aiReply = "Jupiter is the largest planet.";
  } else if (userText.includes("planet")) {
    aiReply = "There are 8 major planets in the solar system.";
  }

  // BIOLOGY
  else if (userText.includes("heart")) {
    aiReply = "The heart pumps blood throughout the body.";
  } else if (userText.includes("brain")) {
    aiReply = "The brain controls the nervous system.";
  } else if (userText.includes("lungs")) {
    aiReply = "Lungs help humans breathe oxygen.";
  } else if (userText.includes("cell")) {
    aiReply = "Cells are the basic unit of life.";
  } else if (userText.includes("blood")) {
    aiReply = "Blood carries oxygen and nutrients.";
  }

  // PHYSICS
  else if (userText.includes("gravity")) {
    aiReply = "Gravity pulls objects toward Earth.";
  } else if (userText.includes("orbit")) {
    aiReply = "Planets move around the Sun in orbit.";
  } else if (userText.includes("pendulum")) {
    aiReply = "A pendulum swings because of gravity.";
  } else if (userText.includes("force")) {
    aiReply = "Force is a push or pull acting on an object.";
  }

  // AI
  else if (userText.includes("ai")) {
    aiReply = "Artificial Intelligence helps machines learn and think.";
  } else if (userText.includes("robot")) {
    aiReply = "Robots can perform tasks automatically.";
  } else if (userText.includes("machine learning")) {
    aiReply = "Machine learning allows systems to learn from data.";
  }

  // GREETINGS
  else if (userText.includes("hello") || userText.includes("hi")) {
    aiReply = "Hello! Ask me about science, planets, biology or AI.";
  }

  messages.innerHTML += `
<p><b>AI:</b> ${aiReply}</p>
`;

  messages.scrollTop = messages.scrollHeight;

  input.value = "";
}
function speakInfo() {
  const text = document.getElementById("planet-info").innerText;

  const speech = new SpeechSynthesisUtterance(text);

  speech.lang = "en-US";

  window.speechSynthesis.speak(speech);
}
function stopVoice() {
  window.speechSynthesis.cancel();
}
let progress = 0;

function updateProgress() {
  progress += 10;

  if (progress > 100) {
    progress = 100;
  }

  document.getElementById("progress-fill").style.width = progress + "%";

  document.getElementById("progress-text").innerHTML = progress + "% Completed";
}
animate();
