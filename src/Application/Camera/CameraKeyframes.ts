import * as THREE from 'three';
import { CameraKey } from './Camera';
import Time from '../Utils/Time';
import Application from '../Application';
import Mouse from '../Utils/Mouse';
import Sizes from '../Utils/Sizes';

export class CameraKeyframeInstance {
    position: THREE.Vector3;
    focalPoint: THREE.Vector3;

    constructor(keyframe: CameraKeyframe) {
        this.position = keyframe.position;
        this.focalPoint = keyframe.focalPoint;
    }

    update() {}
}

const keys: { [key in CameraKey]: CameraKeyframe } = {
    idle: {
        position: new THREE.Vector3(-20000, 9000, 20000),
        focalPoint: new THREE.Vector3(0, -1000, 0),
    },
    monitor: {
        position: new THREE.Vector3(0, 900, 2200),
        focalPoint: new THREE.Vector3(0, 900, 0),
    },
    desk: {
        position: new THREE.Vector3(0, 1500, 5000),
        focalPoint: new THREE.Vector3(0, 500, 0),
    },
    loading: {
        position: new THREE.Vector3(-30000, 30000, 30000),
        focalPoint: new THREE.Vector3(0, -5000, 0),
    },
    coffee: {
        position: new THREE.Vector3(2000, 900, 2000),
        focalPoint: new THREE.Vector3(1650, 0, 950),
    },
};

export class MonitorKeyframe extends CameraKeyframeInstance {
    constructor() {
        const keyframe = keys.monitor;
        super(keyframe);
    }

    update() {}
}

export class LoadingKeyframe extends CameraKeyframeInstance {
    constructor() {
        const keyframe = keys.loading;
        super(keyframe);
    }

    update() {}
}

export class DeskKeyframe extends CameraKeyframeInstance {
    origin: THREE.Vector3;
    application: Application;
    mouse: Mouse;
    sizes: Sizes;
    targetFoc: THREE.Vector3;
    targetPos: THREE.Vector3;

    constructor() {
        const keyframe = keys.desk;
        super(keyframe);
        this.application = new Application();
        this.mouse = this.application.mouse;
        this.sizes = this.application.sizes;
        // this.origin = new THREE.Vector3().copy(keyframe.position);
        this.targetFoc = new THREE.Vector3().copy(keyframe.focalPoint);
        this.targetPos = new THREE.Vector3().copy(keyframe.position);
    }

    update() {
        this.targetFoc.x +=
            (this.mouse.x - this.sizes.width / 2 - this.targetFoc.x) * 0.05;
        this.targetFoc.y +=
            (-(this.mouse.y - this.sizes.height) - this.targetFoc.y) * 0.05;

        this.targetPos.x +=
            (this.mouse.x - this.sizes.width / 2 - this.targetPos.x) * 0.025;
        this.targetPos.y +=
            (-(this.mouse.y - this.sizes.height * 2) - this.targetPos.y) *
            0.025;

        this.focalPoint.copy(this.targetFoc);
        this.position.copy(this.targetPos);
    }
}

export class IdleKeyframe extends CameraKeyframeInstance {
    time: Time;
    origin: THREE.Vector3;

    constructor() {
        const keyframe = keys.idle;
        super(keyframe);
        this.origin = new THREE.Vector3().copy(keyframe.position);
        this.time = new Time();
    }

    update() {
        this.position.x =
            // Offset with the 1000000
            Math.sin((this.time.elapsed + 1000000) * 0.00004) * this.origin.x;
        this.position.x = this.position.x;
        this.position.y =
            Math.sin(this.time.elapsed * 0.00002) * 4000 + this.origin.y - 3000;
        this.position.z = this.position.z;
    }
}

export class CoffeeKeyframe extends CameraKeyframeInstance {
    time: Time;
    origin: THREE.Vector3;

    constructor() {
        const keyframe = keys.coffee;
        super(keyframe);
        this.origin = new THREE.Vector3().copy(keyframe.position);
        this.time = new Time();
    }

    update() {
        const s = Math.sin(this.time.elapsed * 0.002) * 1000;
        const c = Math.cos(this.time.elapsed * 0.002) * 1000;

        // let p = new THREE.Vector2();

        // // translate point back to origin:
        // p.x -= this.origin.x;
        // p.y -= this.origin.z;

        // // rotate point
        // const xnew = p.x * c - p.y * s;
        // const ynew = p.x * s + p.y * c;

        // // translate point back:
        // p.x = xnew + this.origin.x;
        // p.y = ynew + this.origin.z;

        this.position.x = s + this.origin.x / 2;
        this.position.z = c + this.origin.z;
        // this.position.z = s + this.origin.z;
        // this.position.y = this.origin.y;
    }
}
