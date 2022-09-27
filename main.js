import "./assets/scss/style.scss";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "dat.gui";

const gui = new GUI();
const canvas = document.querySelector("canvas");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.z = 16;

const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const controls = new OrbitControls(camera, renderer.domElement);

// #region Shapes
const planeGeometry = new THREE.BoxGeometry(30, 0.1, 30);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
planeMesh.receiveShadow = true;
planeMesh.castShadow = false;
planeMesh.position.y = -3;
scene.add(planeMesh);

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphereMesh.castShadow = true;
sphereMesh.receiveShadow = true;
scene.add(sphereMesh);

// #endregion

// #region Ambient light
const al = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(al);

const alFolder = gui.addFolder("Ambient light");
const alSettings = { color: al.color.getHex() };
alFolder.add(al, "visible");
alFolder.add(al, "intensity", 0, 1, 0.01);
alFolder.addColor(alSettings, "color").onChange((value) => al.color.set(value));
alFolder.open();

// #endregion

// #region Hemisphere light
const hl = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.5);
hl.visible = false;
scene.add(hl);

const hlFolder = gui.addFolder("hemisphere light");
const skyColor = { color: hl.color.getHex() };
const groundColor = { color: hl.groundColor.getHex() };
hlFolder.add(hl, "visible");
hlFolder.addColor(skyColor, "color").onChange((value) => hl.color.set(value));
hlFolder
  .addColor(groundColor, "color")
  .onChange((value) => hl.groundColor.set(value));

// #endregion


function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
  controls.update();
}

animate();
