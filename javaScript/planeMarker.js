import * as THREE from 'three';

class PlaneMarker{
    constructor(localposition){
        this.plane = new THREE.Mesh(
            new THREE.PlaneGeometry(1,1),
            new THREE.MeshLambertMaterial({side:THREE.DoubleSide,color:0xa27d60})
        );
        this.plane.position.copy(localposition);
    }
}

export default PlaneMarker;