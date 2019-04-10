import * as THREE from 'three';
import OBJLoader from 'three-react-obj-loader';
import earth000001 from '../../static/images/earth000001.png';
import earth000002 from '../../static/images/earth000002.png';
import earth000003 from '../../static/images/earth000003.png';
import earth000004 from '../../static/images/earth000004.png';
import earth000005 from '../../static/images/earth000005.png';
import earth000006 from '../../static/images/earth000006.png';
import ledaMeteorite from '../../static/models/leda_meteorite.obj';

/* eslint-disable no-console */
export default (scene, speed) => {
	let ob;
	const loadComplete = false;
	const manager = new THREE.LoadingManager();
	const loader = new OBJLoader(manager);

	let event;
	if (document.createEvent) {
		event = document.createEvent('HTMLEvents');
		event.initEvent('threeJsLoadCompleted', true, true);
	} else {
		event = document.createEventObject();
		event.eventType = 'threeJsLoadCompleted';
	}

	loader.load(ledaMeteorite, object => {
		object.traverse(child => {
			const material = new THREE.MeshLambertMaterial({
				color: 0xfffffff,
				wireframe: true,
			});
			child.material = material;
		});
		object.rotation.x = (20 * Math.PI) / 180;
		object.rotation.z = (20 * Math.PI) / 180;
		object.position.y = 15;
		object.scale.set(80, 80, 80);
		ob = object;
		scene.add(object);
	});

	const back = new THREE.Mesh(new THREE.CubeGeometry(10000000, 10000000, 10000000), [
		new THREE.MeshBasicMaterial({
			map: new THREE.TextureLoader(manager).load(earth000001), // FRONT
			side: THREE.BackSide,
		}),
		new THREE.MeshBasicMaterial({
			map: new THREE.TextureLoader(manager).load(earth000003), // BACK
			side: THREE.BackSide,
		}),
		new THREE.MeshBasicMaterial({
			map: new THREE.TextureLoader(manager).load(earth000006), // UP
			side: THREE.BackSide,
		}),
		new THREE.MeshBasicMaterial({
			map: new THREE.TextureLoader(manager).load(earth000005), // DOWN
			side: THREE.BackSide,
		}),
		new THREE.MeshBasicMaterial({
			map: new THREE.TextureLoader(manager).load(earth000004), // RIGHT
			side: THREE.BackSide,
		}),
		new THREE.MeshBasicMaterial({
			map: new THREE.TextureLoader(manager).load(earth000002), // LFET
			side: THREE.BackSide,
		}),
	]);
	scene.add(back);
	const SPEED = speed;

	const rotateCube = () => {
		if (ob) {
			ob.rotation.x -= SPEED;
			ob.rotation.y -= SPEED * 3;
			ob.rotation.z -= SPEED * 2;
		}
	};

	const update = _ => rotateCube();

	const loadCompleted = () => loadComplete;

	manager.onStart = (url, itemsLoaded, itemsTotal) => {
		console.log(`Started loading file: ${url} \nLoaded ${itemsLoaded} of ${itemsTotal} files.`);
	};

	manager.onLoad = () => {
		console.log('Loading complete!');
		event.eventName = 'threeJsLoadCompleted';
		document.dispatchEvent(event);
	};

	manager.onProgress = (url, itemsLoaded, itemsTotal) => {
		console.log(`Loading file: ${url}.\nLoaded ${itemsLoaded} of ${itemsTotal} files.`);
	};

	manager.onError = url => {
		console.log(`There was an error loading ${url}`);
	};

	return {
		update,
		loadCompleted,
	};
};
