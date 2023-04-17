import * as THREE from 'three';
import { DoubleSide } from 'three';

class myBufferGeo{
    constructor(){
        let vertices = new Float32Array([
            -1,-1,0, //0
            -0.5,-0.5,0, //1
            1,-1.5,0, //2
            0.5,-1,0, //3
            0.5,1,0, //4
            1,1.5,0, //5
            -1,1.5,0, //6
            -0.5,1,0, //7
        ]);

        let customgeo = new THREE.BufferGeometry();
        customgeo.setAttribute('position', new THREE.BufferAttribute(vertices,3));
        customgeo.setIndex([
            0,2,1,
            3,1,2,
            3,2,4,
            5,4,2,
            6,7,4,
            4,5,6,
        ]);

        let color = new Float32Array([
            1,0.5,0,
            1,0.5,0,
            1,0.5,0,
            1,0.5,0,
            1,0.5,0,
            1,0.5,0,
            1,0.5,0,
            1,0.5,0,
        ]);
        customgeo.setAttribute('color', new THREE.BufferAttribute(color,3));
        customgeo.computeVertexNormals();
        let custommat = new THREE.MeshBasicMaterial({vertexColors:true,side:DoubleSide});
        this.mesh = new THREE.Mesh(customgeo,custommat);
    }
}

export default myBufferGeo;