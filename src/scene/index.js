// Import required modules from Three.js library
import * as THREE from "three";
// Import OrbitControls for Camera Interaction
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// Import GLTFLoader for 3D Model Loading
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// Function to initialize and render the 3D scene
export function initScene() {
  // Get the canvas element from the DOM
  const canvas = document.querySelector("#my-canvas");

  // Create a WebGL renderer and set it to the canvas
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  });


  // Get the dimensions of the scene
  const sceneHeight = window.innerHeight;
  const sceneWidth = window.innerWidth;

  // Calculate the aspect ratio of the scene
  const sceneAspectRatio = sceneWidth / sceneHeight;

  // Set the renderer size to match the scene dimensions
  renderer.setSize(sceneWidth, sceneHeight);

  // Create a new Three.js scene
  const scene = new THREE.Scene();

  // create axes help to identify x y z

  // const axes = new THREE.AxesHelper(200);
  // scene.add(axes);

  // shadows enable
  renderer.shadowMap.enabled = true;

  //------------------------------camera

  // Arguments: field of view (FOV), aspect ratio, near clipping plane, far clipping plane
  const camera = new THREE.PerspectiveCamera(95, sceneAspectRatio, 1, 1000);

  // Set the camera's initial position
  camera.position.z = -15;
  camera.position.x = 8;
  camera.position.y = 15;

  // Set the camera's lookAt point
  camera.lookAt(new THREE.Vector3(4, 4, 4));

  //------------------------------sky box
  const cubeTextureLoader = new THREE.CubeTextureLoader();
  const skyBoxTexture = cubeTextureLoader.load([
    "space.png",
    "space.png",
    "space.png",
    "space.png",
    "space.png",
    "space.png",
  ]);
  scene.background = skyBoxTexture;

  //------------------------------sun

const sunGeometry = new THREE.SphereGeometry(15, 50, 50);
const sunTexture = new THREE.TextureLoader().load("sun.png");

// Load normal map texture for adding surface details [ vertex change]
const surfaceNormalTexture = new THREE.TextureLoader().load("surface-normal.jpg");

// Load bump map texture for adding bump effects to the surface [black and white change]
const surfaceBumpTexture = new THREE.TextureLoader().load("surface-bump.jpg");

// Create a material for the sun using the loaded textures
const sunMaterial = new THREE.MeshBasicMaterial({
  map: sunTexture,            // Apply the sun texture to the material
  normalMap: surfaceNormalTexture,   // Apply the normal map to the material for surface details
  bumpMap: surfaceBumpTexture,       // Apply the bump map to the material for bump effects
});

// Create a mesh (object) using the sun geometry and material
const sun = new THREE.Mesh(sunGeometry, sunMaterial);

// Set the sun's initial position
sun.position.x = 60;          
sun.rotation.x = Math.PI / 8; 

// Add the sun to the scene
scene.add(sun);


  //------------------------------saturn
  const saturnGeometry = new THREE.SphereGeometry(4, 100, 100);
  const saturnTexture = new THREE.TextureLoader().load("saturn.jpg");
  const saturnMaterial = new THREE.MeshStandardMaterial({
    map: saturnTexture,
    normalMap: surfaceNormalTexture,
    bumpMap: surfaceBumpTexture,
  });

  const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
  saturn.rotation.x = Math.PI / 8;
  scene.add(saturn);

  //------------------------------saturn rings
  const ring1Geometry = new THREE.RingGeometry(5, 11, 32); 
  const ring1Texture = new THREE.TextureLoader().load("rings.png");
  const ring1Material = new THREE.MeshStandardMaterial({
    map: ring1Texture,
    side: THREE.DoubleSide,
  });

  const ring1 = new THREE.Mesh(ring1Geometry, ring1Material);
  ring1.rotation.x = Math.PI / 2;
  saturn.add(ring1);

  //------------------------------saturn moon - 1
  const moon1Geometry = new THREE.SphereGeometry(0.5, 50, 50);
  const moon1Texture = new THREE.TextureLoader().load("moon1.jpg");
  const moon1Material = new THREE.MeshStandardMaterial({
    map: moon1Texture,
    normalMap: surfaceNormalTexture,
    bumpMap: surfaceBumpTexture,
  });

  const moon1 = new THREE.Mesh(moon1Geometry, moon1Material);
  moon1.castShadow =true;
  moon1.receiveShadow =true;
  const moon1Obj = new THREE.Object3D();
  moon1Obj.add(moon1);
  scene.add(moon1Obj);
  moon1.position.x = 11.5;

  //------------------------------saturn moon - 2
  const moon2Geometry = new THREE.SphereGeometry(0.3, 50, 50);
  const moon2Texture = new THREE.TextureLoader().load("moon2.jpg");
  const moon2Material = new THREE.MeshStandardMaterial({
    map: moon2Texture,
    normalMap: surfaceNormalTexture,
    bumpMap: surfaceBumpTexture,
  });

  const moon2 = new THREE.Mesh(moon2Geometry, moon2Material);
  moon1.castShadow =true;
  moon1.receiveShadow =true;
  const moon2Obj = new THREE.Object3D();
  moon2Obj.add(moon2);
  scene.add(moon2Obj);
  moon2.position.x = 12;

  //------------------------------saturn moon - 3
  const moon3Geometry = new THREE.SphereGeometry(0.25, 50, 50);
  const moon3Texture = new THREE.TextureLoader().load("moon3.jpg");
  const moon3Material = new THREE.MeshStandardMaterial({
    map: moon3Texture,
    normalMap: surfaceNormalTexture,
    bumpMap: surfaceBumpTexture,
  });

  const moon3 = new THREE.Mesh(moon3Geometry, moon3Material);
  moon1.castShadow =true;
  moon1.receiveShadow =true;
  const moon3Obj = new THREE.Object3D();
  moon3Obj.add(moon3);
  scene.add(moon3Obj);
  moon3.position.x = 12.5;

  //------------------------------saturn moon - 4
  const moon4Geometry = new THREE.SphereGeometry(0.6, 60, 50);
  const moon4Texture = new THREE.TextureLoader().load("moon2.jpg");
  const moon4Material = new THREE.MeshStandardMaterial({
    map: moon4Texture,
    normalMap: surfaceNormalTexture,
    bumpMap: surfaceBumpTexture,
  });

  const moon4 = new THREE.Mesh(moon4Geometry, moon4Material);
  moon1.castShadow =true;
  moon1.receiveShadow =true;
  const moon4Obj = new THREE.Object3D();
  moon4Obj.add(moon4);
  scene.add(moon4Obj);
  moon4.position.x = 13;

  //------------------------------saturn moon - 5
  const moon5Geometry = new THREE.SphereGeometry(0.3, 50, 50);
  const moon5Texture = new THREE.TextureLoader().load("moon1.jpg");
  const moon5Material = new THREE.MeshStandardMaterial({
    map: moon5Texture,
    normalMap: surfaceNormalTexture,
    bumpMap: surfaceBumpTexture,
  });

  const moon5 = new THREE.Mesh(moon5Geometry, moon5Material);
  moon1.castShadow =true;
  moon1.receiveShadow =true;
  const moon5Obj = new THREE.Object3D();
  moon5Obj.add(moon5);
  scene.add(moon5Obj);
  moon5.position.x = 13.5;

//------------------------------asteroid

 // Define the number of asteroids
const asteroidCount = 100;

// Create geometry for each asteroid (using SphereGeometry)
const asteroidGeometry = new THREE.SphereGeometry(0.3, 2, 2);

// Load texture for the asteroid's surface
const asteroidTexture = new THREE.TextureLoader().load("asteroid.jpg");

// Create material for the asteroid using the loaded texture
const asteroidMaterial = new THREE.MeshBasicMaterial({
  map: asteroidTexture,
});

// Create an instance of Mesh using the asteroid geometry and material3
const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);


// Loop to create and add asteroids to the scene
for (let i = 0; i < asteroidCount; i++) {
  //clone the created asteroid
  const asteroidcopy = asteroid.clone();

  // Set random positions for each asteroid within the scene
  asteroidcopy.position.set(
    THREE.MathUtils.randFloatSpread(100),
    THREE.MathUtils.randFloatSpread(100),
    THREE.MathUtils.randFloatSpread(100)
  );

  // Set random scales for each asteroid
  asteroidcopy.scale.set(
    THREE.MathUtils.randFloat(0.5, 1.5),
    THREE.MathUtils.randFloat(0.5, 1.5),
    THREE.MathUtils.randFloat(0.5, 1.5)
  );

  // Add the asteroid to the scene
  scene.add(asteroidcopy);
}


//------------------------------ Load spaceship model

  // Create an instance of GLTFLoader to load 3D models
const loader = new GLTFLoader();

// Declare a variable to store the loaded spaceship model
let spaceship1;
let spaceship2;

// Load the "star_wars_battle_spaceship.glb" model using the GLTFLoader
loader.load("spaceship.glb", (gltf) => {
  console.log(gltf); 
  spaceship1 = gltf.scene; 
  scene.add(spaceship1); 
  spaceship1.position.set(-10, -2, -2); 
  spaceship1.scale.set(2, 2, 2); 
});

// Load the second spaceship model using the GLTFLoader
loader.load("spaceship.glb", (gltf) => {
  console.log(gltf); 
  spaceship2 = gltf.scene; 
  scene.add(spaceship2); 
  spaceship2.position.set(7, 5, 9); 
  spaceship2.scale.set(2, 2, 2); 
});

// Create an instance of OrbitControls for camera interaction
const orbitControls = new OrbitControls(camera, document.body);

orbitControls.enableDamping = true;
orbitControls.dampingFactor = 0.05;
orbitControls.enableZoom = true;
OrbitControls.zoomSpeed = 1;
orbitControls.enableRotate = true;
orbitControls.rotateSpeed = 1;
orbitControls.enablePan = true;

// Resize event listener to adjust the scene when the window is resized
window.addEventListener("resize", () => {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;

  // Update camera aspect ratio and projection matrix
  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();
  
  // Update orbit controls to reflect the new dimensions
  orbitControls.update();
  
  // Resize the renderer to match the new dimensions
  renderer.setSize(newWidth, newHeight);
});

// Create a directional light (main light) and add it to the scene
const mainLight = new THREE.DirectionalLight(0xffffff, 3.0);
mainLight.position.set(60, 0, 0);
// object set to put shadow to another
mainLight.castShadow = true;
scene.add(mainLight);

// Create an ambient light and add it to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);




//---------------------------------------------- Animation loop function
function animate(time) {

  // Define rotation rates for different celestial bodies
  const EARTH_DAY = 2 * Math.PI * (1 / 60) * (1 / 60);

  // Update rotations of celestial bodies over time
  sun.rotation.y += EARTH_DAY * 0.04;
  saturn.rotation.y += EARTH_DAY * 5;
  moon1.rotation.y += 5;
  moon2.rotation.y += 8;
  moon3.rotation.y += 4;
  moon4.rotation.y += 4;
  moon5.rotation.y += 4;

  // Update rotations of moon objects
  moon1Obj.rotation.y += 0.005;
  moon2Obj.rotation.y += 0.003;
  moon3Obj.rotation.y += 0.002;
  moon4Obj.rotation.y += 0.001;
  moon5Obj.rotation.y += 0.004;

  // Update spaceship 1's position and rotation if it's loaded
  if (spaceship1) {
    const angle = 0.0001 * time;
    const radius = 14;
    spaceship1.position.x = -radius * Math.cos(angle);
    spaceship1.position.z = -radius * Math.sin(angle);
    spaceship1.rotation.y =
      -Math.atan2(-spaceship1.position.z, -spaceship1.position.x) +
      Math.PI / 2;
  }

  // Update spaceship 2's position and rotation if it's loaded
  if (spaceship2) {
    const angle = 0.0002 * time;
    const radius = 18;
    spaceship2.position.x = -radius * Math.cos(angle);
    spaceship2.position.z = -radius * Math.sin(angle);
    spaceship2.rotation.y =
      -Math.atan2(-spaceship2.position.z, -spaceship2.position.x) +
      Math.PI / 2;
  }

  orbitControls.update(); // Update the orbit controls
  
  renderer.render(scene, camera); // Render the scene with the camera view

}

// Start the animation loop
renderer.setAnimationLoop(animate);

}
