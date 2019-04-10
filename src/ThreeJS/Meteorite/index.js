import SceneManager from '../SceneManager';

export default (container, speed, autoRotateSpeed, enableZoom) => {
	const createCanvas = (document, myContainer) => {
		const canvas = document.createElement('canvas');
		myContainer.appendChild(canvas);
		return canvas;
	};

	const canvas = createCanvas(document, container);
	const sceneManager = new SceneManager(canvas, speed, autoRotateSpeed, enableZoom);

	let canvasHalfWidth;
	let canvasHalfHeight;

	const resizeCanvas = () => {
		canvas.style.width = '100%';
		canvas.style.height = '100%';

		canvas.width = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;

		canvasHalfWidth = Math.round(canvas.offsetWidth / 2);
		canvasHalfHeight = Math.round(canvas.offsetHeight / 2);

		sceneManager.onWindowResize();
	};

	const mouseMove = ({ screenX, screenY }) => {
		sceneManager.onMouseMove(screenX - canvasHalfWidth, screenY - canvasHalfHeight);
	};

	const bindEventListeners = () => {
		window.onresize = resizeCanvas;
		window.onmousemove = mouseMove;
		resizeCanvas();
	};

	const render = _ => {
		requestAnimationFrame(render);
		sceneManager.update();
	};

	bindEventListeners();
	render();
};
