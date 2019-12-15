// import * as Tone from "tone";
// import { html, render } from "lit-html";
// import { ui } from "@tonejs/gui";

// const greenSphere = new Tone.Panner3D().toDestination();
// const drone = new Tone.Player({
// 	url: "./audio/loop/drone.[mp3|ogg]",
// 	loop: true,
// }).connect(greenSphere).sync().start(0);

// const blueSphere = new Tone.Panner3D().toDestination();
// const repeat = new Tone.Player({
// 	url: "./audio/loop/bass.[mp3|ogg]",
// 	loop: true,
// }).connect(blueSphere).sync().start(0);

// const whiteSphere = new Tone.Panner3D().toDestination();
// const chords = new Tone.Player({
// 	url: "./audio/loop/chords.[mp3|ogg]",
// 	loop: true,
// }).connect(whiteSphere).sync().start(0);

// // bind the interface
// document.querySelector("tone-play-toggle").bind(Tone.Transport);
				
// // THREE.JS //
		
// if (Detector.webgl) {

// 	let SCREEN_WIDTH = document.querySelector("#three").clientWidth;
// 	let SCREEN_HEIGHT = document.querySelector("#three").clientHeight;
// 	let aspect = SCREEN_WIDTH / SCREEN_HEIGHT;

// 	console.log(SCREEN_WIDTH, SCREEN_HEIGHT, aspect);

// 	const scene = new THREE.Scene();
// 	const camera = new THREE.PerspectiveCamera(50, aspect, 1, 10000);
// 	camera.position.z = 1;
// 	camera.updateMatrixWorld();

// 	const bassMesh = new THREE.Mesh(
// 		new THREE.SphereBufferGeometry(2, 16, 8),
// 		new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
// 	);
// 	scene.add(bassMesh);
// 	bassMesh.position.z = -10;

// 	const dronMesh = new THREE.Mesh(
// 		new THREE.SphereBufferGeometry(1, 16, 8),
// 		new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
// 	);
// 	scene.add(dronMesh);

// 	const chordMesh = new THREE.Mesh(
// 		new THREE.SphereBufferGeometry(1, 16, 8),
// 		new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: true })
// 	);
// 	scene.add(chordMesh);

// 	const renderer = new THREE.WebGLRenderer({ antialias: true });
// 	renderer.setPixelRatio(window.devicePixelRatio);
// 	onWindowResize();
// 	renderer.domElement.style.position = "relative";
// 	document.querySelector("#three").appendChild(renderer.domElement);

// 	controls = new THREE.OrbitControls(camera, renderer.domElement);
// 	controls.addEventListener("change", () => {
// 		Tone.Listener.updatePosition(camera);
// 	});
// 	// set the camer initially
// 	Tone.Listener.updatePosition(camera);

// 	function onWindowResize(event) {
// 		SCREEN_WIDTH = document.querySelector("#three").clientWidth;
// 		SCREEN_HEIGHT = document.querySelector("#three").clientHeight;
// 		aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
// 		camera.aspect = aspect;
// 		renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
// 		camera.updateProjectionMatrix();
// 	}

// 	window.addEventListener("resize", onWindowResize);

// 	function animate() {
// 		requestAnimationFrame(animate);
// 		const r = Date.now() * 0.0005;
// 		chordMesh.position.x = 3 * Math.cos(r);
// 		chordMesh.position.z = 3 * Math.cos(r);
// 		chordMesh.position.y = 3 * Math.sin(r);
// 		dronMesh.position.x = 4 * Math.cos(2 * r);
// 		dronMesh.position.z = 4 * Math.sin(2 * r);
// 		renderer.render(scene, camera);
// 		controls.update();

// 		greenSphere.updatePosition(dronMesh);
// 		blueSphere.updatePosition(bassMesh);
// 		whiteSphere.updatePosition(chordMesh);
// 	}

// 	animate();
// }
