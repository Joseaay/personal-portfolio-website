import * as THREE from 'three';

export default scene => {
	const directionalLight = new THREE.DirectionalLight(0xffffff);
	directionalLight.position.set(-5000, 1000, -10000).normalize();
	scene.add(directionalLight);

	const directionalLight2 = new THREE.DirectionalLight(0x40404040);
	directionalLight2.position.set(10000, 10000, 10000).normalize();
	scene.add(directionalLight2);

	const update = time => null;

	return {
		update,
	};
};
