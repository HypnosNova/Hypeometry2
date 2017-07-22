var core = {};
core.map = {};
core.createLevelWorld = function() {
	let world = new $$.SubWorld({}, {
		type: "OrthographicCamera"
	});
	core.loadMapResource(function() {
		core.initMapMaterials(world);
		core.initMapBlocks(world);
		core.initMapLights(world);
		core.initMapCamera(world);
	});
	return world;
};
core.createCube = function(item, g, m, container) {
	let STEP = game.settings.blockSize;
	let cube = new THREE.Mesh(g, m);
	cube.position.set(item.x * STEP || 0, item.y * STEP || 0, item.z * STEP || 0);
	cube.rotation.set(item.rx || 0, item.ry || 0, item.rz || 0);
	container.add(cube);
};
core.createPlane = function(item, g, m, container) {
	let STEP = game.settings.blockSize;
	let cube = new THREE.Mesh(g, m);
	cube.position.set(item.x * STEP || 0, (item.y + 5 / 12) * STEP || 0, item.z * STEP || 0);
	cube.rotation.set(item.rx || 0, item.ry || 0, item.rz || 0);
	cube.scale.y = 1 / 6;
	container.add(cube);
};
core.createTri = function(item, g, m, container) {
	let STEP = game.settings.blockSize;
	let cube = new THREE.Mesh(g, m);
	cube.position.set(item.x * STEP || 0, item.y * STEP || 0, item.z * STEP || 0);
	cube.rotation.set(item.rx || 0, item.ry || 0, item.rz || 0);
	container.add(cube);
};
core.createStick = function(item, g, m, container) {
	let STEP = game.settings.blockSize;
	let cube = new THREE.Mesh(g, m);
	cube.position.set(item.x * STEP || 0, item.y * STEP || 0, item.z * STEP || 0);
	cube.rotation.set(item.rx || 0, item.ry || 0, item.rz || 0);
	if(item.height) {
		cube.scale.y = item.height;
	}
	if(item.d === 0) {
		cube.position.x -= STEP * 0.45;
		cube.position.z -= STEP * 0.45;
	} else if(item.d === 1) {
		cube.position.x += STEP * 0.45;
		cube.position.z -= STEP * 0.45;
	} else if(item.d === 2) {
		cube.position.x += STEP * 0.45;
		cube.position.z += STEP * 0.45;
	} else if(item.d === 3) {
		cube.position.x -= STEP * 0.45;
		cube.position.z += STEP * 0.45;
	}
	container.add(cube);
};
core.createStair = function(item, g, m, container) {
	let STEP = game.settings.blockSize;
	let cube = new THREE.Mesh(g, m);
	cube.position.set(item.x * STEP || 0, item.y * STEP || 0, item.z * STEP || 0);
	cube.rotation.set(item.rx || 0, item.ry || 0, item.rz || 0);
	if(!item.height) {
		item.height = 1;
	}
	for(let ii = 0; ii < item.height * 6; ii++) {
		var c = cube.clone();
		c.position.y += (ii + 1) * STEP / 6;
		if(item.d === 0) {
			c.position.z -= (ii) * STEP / 6;
			c.rotation.y = Math.PI / 2;
		} else if(item.d === 1) {
			c.position.x += (ii) * STEP / 6;
		} else if(item.d === 2) {
			c.position.z += (ii) * STEP / 6;
			c.rotation.y = -Math.PI / 2;
		} else if(item.d === 3) {
			c.position.x -= (ii) * STEP / 6;
			c.rotation.y = Math.PI;
		} else {
			c.position.z -= (ii) * STEP / 6;
			c.rotation.y = Math.PI / 2;
		}
		container.add(c);
	}
};
core.initMapBlocks = function(gameWorld) {
	let STEP = game.settings.blockSize;
	let cubeGeometry = new THREE.BoxBufferGeometry(STEP, STEP, STEP);
	let triangleGeometry = new THREE.BoxGeometry(STEP, STEP, STEP);
	let stickGeomerty = new THREE.BoxBufferGeometry(STEP / 10, STEP, STEP / 10);
	triangleGeometry.vertices = [new THREE.Vector3(STEP >> 1, STEP >> 1, STEP >> 1), new THREE.Vector3(STEP >> 1, STEP >> 1, -STEP >> 1), new THREE.Vector3(-STEP >> 1, -STEP >> 1, STEP >> 1), new THREE.Vector3(-STEP >> 1, -STEP >> 1, -STEP >> 1), new THREE.Vector3(-STEP >> 1, STEP >> 1, -STEP >> 1), new THREE.Vector3(-STEP >> 1, STEP >> 1, STEP >> 1), new THREE.Vector3(-STEP >> 1, -STEP >> 1, -STEP >> 1), new THREE.Vector3(-STEP >> 1, -STEP >> 1, STEP >> 1)];
	triangleGeometry.mergeVertices();
	for(let i in core.map.blocks) {
		let item = core.map.blocks[i];
		let material;
		if(item.materialId) {
			material = core.map.materials[item.materialId];
		} else {
			for(let i in core.map.materials) {
				material = core.map.materials[i];
				break;
			}
		}

		if(item.type == "cube") {
			core.createCube(item, cubeGeometry, material);
		} else if(item.type == "plane") {
			core.createPlane(item, cubeGeometry, material);
		} else if(item.type == "tri") {
			core.createTri(item, triangleGeometry, material);
		} else if(item.type == "stick") {
			core.createStick(item, stickGeomerty, material);
		} else if(item.type == "stair") {
			core.createStair(item, triangleGeometry, material);
		} else {
			core.createCube(item, cubeGeometry, material);
		}
	}
};

core.initMapMaterials = function(gameWorld) {
	for(let i in core.map.materials) {
		let item = core.map.materials[i];
		if(item.type == "L") {
			if(item.mapId != null) {
				core.map.materials[i] = new THREE.MeshLambertMaterial({
					color: item.color,
					map: $$.Loader.RESOURCE.textures["img/path/texture0.jpg"]
				});
			} else {
				core.map.materials[i] = new THREE.MeshLambertMaterial({
					color: item.color
				});
			}
		} else if(item.type == "B") {
			if(item.mapId) {
				core.map.materials[i] = new THREE.MeshBasicMaterial({
					color: item.color,
					map: $$.Loader.RESOURCE.textures[core.map.textures[item.mapId]]
				});
			} else {
				core.map.materials[i] = new THREE.MeshBasicMaterial({
					color: item.color
				});
			}
		}
	}
};

core.initMapCamera = function(gameWorld) {
	let c = core.map.camera;
	gameWorld.camera.position.set(c.position.x, c.position.y, c.position.z);
	gameWorld.camera.lookAt(new THREE.Vector3(c.lookAt.x, c.lookAt.y, c.lookAt.z));
};

core.initMapLights = function(gameWorld) {
	for(let i in core.map.lights) {
		let item = core.map.lights[i];
		if(item.type == "A") {
			core.map.lights[i] = new THREE.AmbientLight(item.color);
			gameWorld.scene.add(core.map.lights[i]);
		} else if(item.type == "D") {
			core.map.lights[i] = new THREE.DirectionalLight(item.color, item.intensity);
			gameWorld.scene.add(core.map.lights[i]);
			core.map.lights[i].position.set(item.position.x, item.position.y, item.position.z);
		}
	}
};

core.loadMapResource = function(callback) {
	$$.Loader.loadTexture(core.map.textures);
	$$.Loader.onLoadComplete = callback;
};