import * as THREE from 'three';

class MouseControls{
    constructor(cam,scene,objects){
        this.mouse = new THREE.Vector2();
        this.caster = new THREE.Raycaster();
        this.selected;
        document.body.addEventListener('mousedown',ev =>{
            this.mouse.x = ev.clientX/window.innerWidth *2 - 1;
            this.mouse.y = ev.clientY/window.innerHeight * -2 + 1;
            this.caster.setFromCamera(this.mouse,cam);
            let results = this.caster.intersectObjects(scene.children);
            results.forEach(benda =>{
                console.log(benda.object);
                this.selected = benda.object;
            });
        });
    }
}

export default MouseControls;