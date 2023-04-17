import * as THREE from 'three';
import myBufferGeo from './javaScript/bufferGeo.js';
import Land from './javaScript/land.js';
import {GLTFLoader} from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from './node_modules/three/examples/jsm/controls/OrbitControls.js';
import {FontLoader} from './node_modules/three/examples/jsm/loaders/FontLoader.js';
import {TextGeometry} from './node_modules/three/examples/jsm/geometries/TextGeometry.js'
import PlaneMarker from './javaScript/planeMarker.js';
import MouseControls from './javaScript/MouseControls.js';

const scene = new THREE.Scene();
const cam = new THREE.PerspectiveCamera(
    45, window.innerWidth/window.innerHeight,1,100);
cam.position.z = 10;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color(0xdec8ba));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
document.body.appendChild(renderer.domElement);

//INISIAL J
const custombuffer = new myBufferGeo();
custombuffer.mesh.position.x = 1.5;
custombuffer.mesh.position.y = 0.75;
custombuffer.mesh.position.z = -1;
scene.add(custombuffer.mesh);

//MODEL 3D
const loader = new GLTFLoader().load('./model/cool_man.glb',(result)=>{
    let model = result.scene.children[0];
    scene.add(result.scene.children[0]);
    model.position.z = 2;
    model.position.x = -0.1;
    model.position.y = -1.9;
    model.castShadow = true;
    
    const mixer = new THREE.AnimationMixer(model);
    mixer.clipAction(result.animations[1]).play();
    scene.add(result.animations[1]);
});
const loader2 = new GLTFLoader().load('./model/meteors.glb',(awan)=>{
    let model2 = awan.scene.children[0];
    scene.add(awan.scene.children[0]);
    model2.position.y = 10;
    model2.position.x = 10;
    model2.position.z = -30;
    model2.rotation.z = 2;
});
const loader3 = new GLTFLoader().load('./model/castle.glb',(castle)=>{
    let model3 = castle.scene.children[0];
    scene.add(castle.scene.children[0]);
    model3.position.y = -6;
    model3.rotation.z = 1;
});
const loader4 = new GLTFLoader().load('./model/dragon.glb',(dragon)=>{
    let model4 = dragon.scene.children[0];
    scene.add(dragon.scene.children[0]);
    model4.position.x = 1.75;
    model4.position.y = -1.5;
    model4.position.z = 2.5;
    model4.rotation.z = 0.75;
});

//CAMERA CONTROL
const orbitControl = new OrbitControls(cam, renderer.domElement);
scene.add(orbitControl);

//PLANE
// const plane = new PlaneMarker(new THREE.Vector3(1.5,1,0));
// scene.add(plane.plane);
// plane.castShadow = true;

//LAND
// const land = Land();
// scene.add(land);

//LIGHTING
const light = new THREE.SpotLight(0xFFFFFF,1,100,Math.PI/25);

//SHADOW
// model.castShadow = true;
light.position.set(1,30,15);
scene.add(light);
scene.add(light.target);

const light2 = new THREE.AmbientLight(0xFFFFFF);
scene.add(light2);

//TEXT
const fontLoader = new FontLoader().load('./node_modules/three/src/fonts/Cadisone.json',(font)=>{
    const textGeometry = new TextGeometry('Juan Kenny Filemon',{
        height:1,
        width:5,
        font:font
    });
    const textMaterial = new THREE.MeshNormalMaterial();
    const textMesh = new THREE.Mesh(textGeometry,textMaterial);
    scene.add(textMesh);
});

//MOUSE
let mouse = new MouseControls(cam,scene);

//DRAW
const draw = ()=>{
    orbitControl.update();
    renderer.render(scene,cam);
    if(mouse.selected != undefined){
        mouse.selected.rotation.y = mouse.selected.rotation.y + 0.01;
    }
    requestAnimationFrame(draw);
}
draw();