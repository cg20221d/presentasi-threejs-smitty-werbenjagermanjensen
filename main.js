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
const planeMaterial = new THREE.MeshPhongMaterial({
  color: 0xaaaaaa,
  shininess: 100,
  specular: 0x050505,
});
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

// #region Directional Light
const dl = new THREE.DirectionalLight(0xffffff, 0.5);
const dlHelper = new THREE.DirectionalLightHelper(dl, 3);

dl.position.set(0, 2, 0);
dl.visible = false;
dl.castShadow = true;
dlHelper.visible = false;

scene.add(dl);
scene.add(dlHelper);

const dlSettings = {
  visible: false,
  color: dl.color.getHex(),
};
const dlFolder = gui.addFolder("directional light");
dlFolder.add(dlSettings, "visible").onChange((value) => {
  dl.visible = value;
  dlHelper.visible = value;
});
dlFolder.add(dl, "intensity", 0, 1, 0.01);
dlFolder.add(dl.position, "y", 1, 4, 0.5);
dlFolder.add(dl, "castShadow");
dlFolder.addColor(dlSettings, "color").onChange((value) => dl.color.set(value));

// #endregion

// #region Spot Light
const sl = new THREE.SpotLight(0xffffff, 1, 12, Math.PI / 8, 0.5);
const slHelper = new THREE.SpotLightHelper(sl);

sl.visible = false;
sl.position.set(0, 6, 0);
sl.target.position.set(0, 0, 0);
slHelper.visible = false;

scene.add(sl, slHelper);

const slSettings = {
  visible: false,
};
const slFolder = gui.addFolder("spot light");
slFolder.add(slSettings, "visible").onChange((value) => {
  sl.visible = value;
  slHelper.visible = value;
});
slFolder.add(sl, "intensity", 0, 4, 0.1);
slFolder.add(sl, "penumbra", 0, 1, 0.1);
slFolder.add(sl, "angle", Math.PI / 16, Math.PI / 2, 0.01);
slFolder.add(sl, "castShadow");

// #endregion

// #region Point Light
const pl = new THREE.PointLight(0xffffff, 1, 8, 2);
const plHelper = new THREE.PointLightHelper(pl, 0.5);

pl.position.set(2, 2, 2);
pl.visible = false;
plHelper.visible = false;

scene.add(pl, plHelper);

const plSettings = {
  visible: false,
  color: pl.color.getHex(),
};
const plFolder = gui.addFolder("point light");
plFolder.add(plSettings, "visible").onChange((value) => {
  pl.visible = value;
  plHelper.visible = value;
});
plFolder.add(pl, "intensity", 0, 2, 0.01);
plFolder.add(pl.position, "x", -2, 4, 0.1);
plFolder.add(pl.position, "y", -2, 4, 0.1);
plFolder.add(pl.position, "z", -2, 4, 0.1);
plFolder.add(pl, "castShadow");
plFolder.addColor(plSettings, "color").onChange((value) => pl.color.set(value));

// #endregion

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
  controls.update();
}

animate();
