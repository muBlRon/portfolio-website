import AudioManager from './AudioManager';
import * as THREE from 'three';
import UIEventBus from '../UI/EventBus';
export class ComputerAudio {
    constructor(audio: AudioManager) {
        document.addEventListener('mousedown', (event) => {
            // @ts-ignore
            if (event.inComputer) {
                audio.playAudio('mouseDown', {
                    volume: 0.5,
                    position: new THREE.Vector3(800, -300, 1200),
                });
            }
        });

        document.addEventListener('mouseup', (event) => {
            // @ts-ignore
            if (event.inComputer) {
                audio.playAudio('mouseUp', {
                    volume: 0.5,
                    position: new THREE.Vector3(800, -300, 1200),
                });
            }
        });

        document.addEventListener('keydown', (event) => {
            // @ts-ignore
            if (event.inComputer) {
                audio.playAudio('keyboardKeydown', {
                    volume: 0.5,
                    position: new THREE.Vector3(-300, -400, 1200),
                });
            }
        });
        UIEventBus.on('loadingScreenDone', () => {
            audio.playAudio('computerIdle', {
                volume: 1,
                position: new THREE.Vector3(0, -500, 0),
                loop: true,
            });
        });
    }
}

export class RadioAudio {
    constructor(audio: AudioManager) {
        // audio.playAudio('radioSong', {
        //     volume: 1,
        //     position: new THREE.Vector3(0, 0, 0),
        //     randDetuneScale: 0,
        //     loop: true,
        // });
    }
}
