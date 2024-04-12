import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import { OBJLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/MTLLoader.js';


let targetQuaternion = new THREE.Quaternion();

const container = document.getElementById('cansatContainer');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, container.offsetWidth / container.offsetHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(container.offsetWidth, container.offsetHeight);
container.appendChild(renderer.domElement);

updateCanvasSize();

function updateCanvasSize() {
    if (window.innerWidth <= 768) {
        camera.position.set(0, 0, 500);
        const canvasWidth = window.innerWidth * 0.8; // 90vw
        const canvasHeight = (window.innerWidth * 0.9 * 2); // 3:2 aspect ratio
        renderer.setSize(canvasWidth, canvasHeight);
    } else {
        camera.position.set(0, 0, 300);
        renderer.setSize(container.offsetWidth, container.offsetHeight);
    }
}

window.addEventListener('resize', () => {
    updateCanvasSize();
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
});


// Look at the center of the scene
camera.lookAt(new THREE.Vector3(0, 0, 0));


const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);
renderer.setClearColor(0xABB8C3);

let cansatModel;

// Load MTL file
const mtlLoader = new MTLLoader();
mtlLoader.load('models/obj.mtl', function (materials) {
    materials.preload();

    // Load OBJ file
    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('models/demo.obj', function (obj) {
        cansatModel = obj;
        scene.add(cansatModel);
        //cansatModel.position.set(-4.5, -10, 0);
    });
});

function animate() {
    requestAnimationFrame(animate);

    if (cansatModel) {
        // Use slerp (Spherical Linear Interpolation) for a smoother animation
        cansatModel.quaternion.slerp(targetQuaternion, 0.05);
    }

    renderer.render(scene, camera);
}

    animate();


export function onDataFetched(data) {
    console.log("data fetched");
    
    if ("graphData" in data && "latestValues" in data) {
        var graphData = data.graphData;
        console.log('Graph Data:', graphData);

        var latestValues = data.latestValues;
        console.log('Latest Values:', latestValues);

        let gyro_x = latestValues.gyro_x;
        let gyro_y = latestValues.gyro_y;
        let gyro_z = latestValues.gyro_z;
        let gyro_acc_x = latestValues.gyro_acc_x;
        let gyro_acc_y = latestValues.gyro_acc_y;
        let gyro_acc_z = latestValues.gyro_acc_z;
        let gyro_temp = latestValues.gyro_temp;

        targetQuaternion.setFromEuler(new THREE.Euler(
            THREE.MathUtils.degToRad(Number(latestValues.gyro_z)),
            THREE.MathUtils.degToRad(Number(latestValues.gyro_x)),
            THREE.MathUtils.degToRad(Number(latestValues.gyro_y)),
            'ZXY'
        ));
        
        document.getElementById("gyroX").innerHTML = "X: " + gyro_x;
        document.getElementById("gyroY").innerHTML = "Y: " + gyro_y;
        document.getElementById("gyroZ").innerHTML = "Z: " + gyro_z;

        document.getElementById("acceX").innerHTML = "X: " + gyro_acc_x;
        document.getElementById("acceY").innerHTML = "Y: " + gyro_acc_y;
        document.getElementById("acceZ").innerHTML = "Z: " + gyro_acc_z;

        document.getElementById("gyroTemp").innerHTML = "Tempreature: " + gyro_temp;
        console.log(cansatModel.rotation);
        console.log("Target rotation updated"); // Debug
    }
}
