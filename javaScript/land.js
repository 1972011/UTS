import * as THREE from 'three';

function Land(){
    const geometry = new THREE.BoxGeometry(4,3,3);
    const material = new THREE.MeshStandardMaterial({
        color:0xbd937d
    });
    const mesh = new THREE.Mesh(geometry,material);
    mesh.position.set(0,-3,0);
    return mesh;
}

export default Land;