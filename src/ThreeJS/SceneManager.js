import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';
import SceneSubject from './Meteorite/SceneSubject';
import GeneralLights from './GeneralLights';

export default (canvas, speed, autoRotateSpeed, enableZoom) => {
	const clock = new THREE.Clock();
	let controls = null;

	const screenDimensions = {
		width: canvas.width,
		height: canvas.height,
	};

	const mousePosition = {
		x: 0,
		y: 0,
	};

	const buildScene = () => {
		const scene = new THREE.Scene();
		scene.background = new THREE.Color('#000000');

		return scene;
	};

	const buildRender = ({ width, height }) => {
		const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
		const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
		renderer.setPixelRatio(DPR);
		renderer.setSize(width, height);

		renderer.gammaInput = true;
		renderer.gammaOutput = true;

		return renderer;
	};

	const renderer = buildRender(screenDimensions);

	const buildCamera = ({ width, height }) => {
		const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 9000000);
		camera.position.set(-100, -50, -200);

		controls = new OrbitControls(camera, renderer.domElement);
		controls.autoRotate = !!autoRotateSpeed;
		controls.autoRotateSpeed = autoRotateSpeed;
		controls.enableZoom = enableZoom;
		controls.enableKeys = false;

		return camera;
	};

	const createSceneSubjects = scene => {
		const sceneSubjects = [new GeneralLights(scene), new SceneSubject(scene, speed)];

		return sceneSubjects;
	};

	const scene = buildScene();
	const camera = buildCamera(screenDimensions);
	const sceneSubjects = createSceneSubjects(scene);

	const update = () => {
		const elapsedTime = clock.getElapsedTime();

		for (let i = 0; i < sceneSubjects.length; i++) sceneSubjects[i].update(elapsedTime);

		controls.update();
		renderer.render(scene, camera);
	};

	const onWindowResize = () => {
		const { width, height } = canvas;

		screenDimensions.width = width;
		screenDimensions.height = height;

		camera.aspect = width / height;
		camera.updateProjectionMatrix();

		renderer.setSize(width, height);
	};

	const onMouseMove = (x, y) => {
		mousePosition.x = x;
		mousePosition.y = y;
	};

	return {
		update,
		onWindowResize,
		onMouseMove,
	};
};
