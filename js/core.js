var core = {};
core.map = {};
core.childrenWithId = {};
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
	return cube;
};
core.createPlane = function(item, g, m, container) {
	let STEP = game.settings.blockSize;
	let cube = new THREE.Mesh(g, m);
	cube.position.set(item.x * STEP || 0, (item.y + 5 / 12) * STEP || 0, item.z * STEP || 0);
	cube.rotation.set(item.rx || 0, item.ry || 0, item.rz || 0);
	cube.scale.y = 1 / 6;
	container.add(cube);
	return cube;
};
core.createTri = function(item, g, m, container) {
	let STEP = game.settings.blockSize;
	let cube = new THREE.Mesh(g, m);
	cube.position.set(item.x * STEP || 0, item.y * STEP || 0, item.z * STEP || 0);
	cube.rotation.set(item.rx || 0, item.ry || 0, item.rz || 0);
	container.add(cube);
	return cube;
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
	return cube;
};
core.createStair = function(item, g, m, container) {
	let STEP = game.settings.blockSize;
	let cube = new THREE.Mesh(g, m);
	cube.position.set(item.x * STEP || 0, item.y * STEP || 0, item.z * STEP || 0);
	cube.rotation.set(item.rx || 0, item.ry || 0, item.rz || 0);
	if(!item.height) {
		item.height = 1;
	}
	let group=new THREE.Group();
	for(let ii = 0; ii < item.height * 6; ii++) {
		var c = cube.clone();
		c.position.y += (ii + 1) * STEP / 6 + STEP / 4;
		if(item.d === 0) {
			c.position.z -= (ii) * STEP / 6 - STEP / 4;
			c.rotation.y = Math.PI / 2;
		} else if(item.d === 1) {
			c.position.x += (ii) * STEP / 6 - STEP / 4;
		} else if(item.d === 2) {
			c.position.z += (ii) * STEP / 6 - STEP / 4;
			c.rotation.y = -Math.PI / 2;
		} else if(item.d === 3) {
			c.position.x -= (ii) * STEP / 6 - STEP / 4;
			c.rotation.y = Math.PI;
		} else {
			c.position.z -= (ii) * STEP / 6 - STEP / 4;
			c.rotation.y = Math.PI / 2;
		}
		c.scale.x = 0.5;
		c.scale.y = 0.5;
		group.add(c);
	}
	container.add(group);
	return group;
};
core.Obj = {};
core.Obj.Turntable = function(options, funcMove) {
	let that = this;
	let STEP = game.settings.blockSize;
	let group = new THREE.Group();
	group.position.set(options.x * STEP || 0, options.y * STEP || 0, options.z * STEP || 0);
	group.rotation.set(options.rx || 0, options.ry || 0, options.rz || 0);
	this.object = group;
	let axisG = new THREE.BoxBufferGeometry(STEP, STEP / 4, STEP / 4);
	let axisM;
	if(options.axisMaterial) {
		axisM = options.axisMaterial;
	} else {
		for(let i in core.map.materials) {
			axisM = core.map.materials[i];
			break;
		}
	}
	let axis = new THREE.Mesh(axisG, axisM);
	axis.position.x = -STEP;
	group.add(axis);

	let hoopG = new THREE.CylinderBufferGeometry(STEP / 2.3, STEP / 2.3, STEP, 32);
	let hoopM;
	if(options.axisMaterial) {
		hoopM = options.hoopMaterial;
	} else {
		for(let i in core.map.materials) {
			hoopM = core.map.materials[i];
			break;
		}
	}
	var hoop = new THREE.Mesh(hoopG, hoopM);
	hoop.rotation.z = Math.PI / 2;
	group.add(hoop);

	let rodG = new THREE.CylinderBufferGeometry(STEP / 6, STEP / 6, STEP * 2.5, 32);
	let rodM;
	if(options.axisMaterial) {
		rodM = options.rodMaterial;
	} else {
		for(let i in core.map.materials) {
			rodM = core.map.materials[i];
			break;
		}
	}
	var rod1 = new THREE.Mesh(rodG, rodM);
	group.add(rod1);

	var rod2 = rod1.clone();
	rod2.rotation.x = Math.PI / 2;
	group.add(rod2);

	let poleG = new THREE.CylinderBufferGeometry(STEP / 4, STEP / 4, STEP * 0.5, 32);
	let poleM;
	if(options.axisMaterial) {
		poleM = options.poleMaterial;
	} else {
		for(let i in core.map.materials) {
			poleM = core.map.materials[i];
			break;
		}
	}
	var pole1 = new THREE.Mesh(poleG, poleM);
	pole1.position.y = STEP * 1.5;
	group.add(pole1);
	var pole2 = pole1.clone();
	pole2.position.y = -STEP * 1.5;
	group.add(pole2);
	var pole3 = pole1.clone();
	pole3.position.y = 0;
	pole3.position.z = STEP * 1.5;
	pole3.rotation.x = Math.PI / 2;
	group.add(pole3);
	var pole4 = pole1.clone();
	pole4.position.y = 0;
	pole4.position.z = -STEP * 1.5;
	pole4.rotation.x = Math.PI / 2;
	group.add(pole4);

	hoop.onDown = axis.onDown = rod1.onDown = rod2.onDown = pole1.onDown = pole2.onDown = pole3.onDown = pole4.onDown = function() {
		that.isDown = true;
		var canvasXY = $$.sceneCoordinateToCanvasCoordinate(group);
		if(event.touches) {
			var e = event.touches[0];
		} else {
			var e = event;
		}
		var distance = Math.sqrt((e.clientX - canvasXY.x) * (e.clientX - canvasXY.x) + (e.clientY - canvasXY.y) * (e.clientY - canvasXY.y));
		if(distance > 0) {
			that.clickAngle = 0;
			if(e.clientY > canvasXY.y) {
				that.clickAngle = 2 * Math.PI - Math.acos((e.clientX - canvasXY.x) / distance);
			} else {
				that.clickAngle = Math.acos((e.clientX - canvasXY.x) / distance);
			}
		} else {
			that.clickAngle = 0;
		}
		that.preAngle = that.clickAngle;
		$$.global.canvasDom.addEventListener("mouseup", dragEnd, false);
		$$.global.canvasDom.addEventListener("touchend", dragEnd, false);
		$$.global.canvasDom.addEventListener("mousemove", dragMove, false);
		$$.global.canvasDom.addEventListener("touchmove", dragMove, false);
	}
	hoop.onUp = axis.onUp = rod1.onUp = rod2.onUp = pole1.onUp = pole2.onUp = pole3.onUp = pole4.onUp = function() {
		dragEnd();
	}
	hoop.onClick = axis.onClick = rod1.onClick = rod2.onClick = pole1.onClick = pole2.onClick = pole3.onClick = pole4.onClick = function() {
		dragEnd();
	}

	function dragEnd() {
		that.isDown = false;
		$$.global.canvasDom.removeEventListener("mousemove", dragMove, false);
		$$.global.canvasDom.removeEventListener("touchmove", dragMove, false);
		$$.global.canvasDom.removeEventListener("mouseup", dragEnd, false);
		$$.global.canvasDom.removeEventListener("touchend", dragEnd, false);
	}

	function dragMove(event) {
		if(that.isDown) {
			if(event.touches) {
				var e = event.touches[0];
			} else {
				var e = event;
			}
			var canvasXY = $$.sceneCoordinateToCanvasCoordinate(group);
			var distance = Math.sqrt((e.clientX - canvasXY.x) * (e.clientX - canvasXY.x) + (e.clientY - canvasXY.y) * (e.clientY - canvasXY.y));
			if(distance > 0) {
				that.clickAngle = 0;
				if(e.clientY > canvasXY.y) {
					that.clickAngle = 2 * Math.PI - Math.acos((e.clientX - canvasXY.x) / distance);
				} else {
					that.clickAngle = Math.acos((e.clientX - canvasXY.x) / distance);
				}
			} else {
				that.clickAngle = 0;
			}
			group.rotation.x += that.clickAngle - that.preAngle;
			that.preAngle = that.clickAngle;
			if(options.funcMove) {
				options.funcMove(e, group.rotation.x);
			}
		}
	}
}

core.createTurntable = function(item, container) {
	var turntable = new core.Obj.Turntable(item);
	container.add(turntable.object);
	return turntable.object;
}

core.createGroup = function(item, container) {
	let STEP = game.settings.blockSize;
	let group = new THREE.Group();
	group.position.set(item.x * STEP || 0, item.y * STEP || 0, item.z * STEP || 0);
	group.rotation.set(item.rx || 0, item.ry || 0, item.rz || 0);
	container.add(group);
	let cubeGeometry = new THREE.BoxBufferGeometry(STEP, STEP, STEP);
	let triangleGeometry = new THREE.BoxGeometry(STEP, STEP, STEP);
	let stickGeomerty = new THREE.BoxBufferGeometry(STEP / 10, STEP, STEP / 10);
	triangleGeometry.vertices = [new THREE.Vector3(STEP >> 1, STEP >> 1, STEP >> 1), new THREE.Vector3(STEP >> 1, STEP >> 1, -STEP >> 1), new THREE.Vector3(-STEP >> 1, -STEP >> 1, STEP >> 1), new THREE.Vector3(-STEP >> 1, -STEP >> 1, -STEP >> 1), new THREE.Vector3(-STEP >> 1, STEP >> 1, -STEP >> 1), new THREE.Vector3(-STEP >> 1, STEP >> 1, STEP >> 1), new THREE.Vector3(-STEP >> 1, -STEP >> 1, -STEP >> 1), new THREE.Vector3(-STEP >> 1, -STEP >> 1, STEP >> 1)];
	triangleGeometry.mergeVertices();

	for(let child of item.children) {
		let material;
		if(child.materialId) {
			material = core.map.materials[child.materialId];
		} else {
			for(let i in core.map.materials) {
				material = core.map.materials[i];
				break;
			}
		}
		if(child.type == "cube") {
			core.createCube(child, cubeGeometry, material, group);
		} else if(child.type == "plane") {
			core.createPlane(child, cubeGeometry, material, group);
		} else if(child.type == "tri") {
			core.createTri(child, triangleGeometry, material, group);
		} else if(child.type == "stick") {
			core.createStick(child, stickGeomerty, material, group);
		} else if(child.type == "stair") {
			core.createStair(child, triangleGeometry, material, group);
		} else if(child.type == "turntable") {
			core.createTurntable(child, group);
		} else if(child.type == "group") {
			core.createGroup(child, group);
		} else {
			core.createCube(child, cubeGeometry, material, group);
		}
	}
	return group;
};
core.initMapBlocks = function(gameWorld) {
	let STEP = game.settings.blockSize;
	let cubeGeometry = new THREE.BoxBufferGeometry(STEP, STEP, STEP);
	let triangleGeometry = new THREE.BoxGeometry(STEP, STEP, STEP);
	let stickGeomerty = new THREE.BoxBufferGeometry(STEP / 10, STEP, STEP / 10);
	triangleGeometry.vertices = [new THREE.Vector3(STEP >> 1, STEP >> 1, STEP >> 1), new THREE.Vector3(STEP >> 1, STEP >> 1, -STEP >> 1), new THREE.Vector3(-STEP >> 1, -STEP >> 1, STEP >> 1), new THREE.Vector3(-STEP >> 1, -STEP >> 1, -STEP >> 1), new THREE.Vector3(-STEP >> 1, STEP >> 1, -STEP >> 1), new THREE.Vector3(-STEP >> 1, STEP >> 1, STEP >> 1), new THREE.Vector3(-STEP >> 1, -STEP >> 1, -STEP >> 1), new THREE.Vector3(-STEP >> 1, -STEP >> 1, STEP >> 1)];
	triangleGeometry.mergeVertices();
	for(let item of core.map.blocks) {
		//let item = core.map.blocks[i];
		let material;
		if(item.materialId) {
			material = core.map.materials[item.materialId];
		} else {
			for(let i in core.map.materials) {
				material = core.map.materials[i];
				break;
			}
		}
		var obj;
		if(item.type == "cube") {
			obj = core.createCube(item, cubeGeometry, material, gameWorld.scene);
		} else if(item.type == "plane") {
			obj = core.createPlane(item, cubeGeometry, material, gameWorld.scene);
		} else if(item.type == "tri") {
			obj = core.createTri(item, triangleGeometry, material, gameWorld.scene);
		} else if(item.type == "stick") {
			obj = core.createStick(item, stickGeomerty, material, gameWorld.scene);
		} else if(item.type == "stair") {
			obj = core.createStair(item, triangleGeometry, material, gameWorld.scene);
		} else if(item.type == "turntable") {
			obj = core.createTurntable(item, gameWorld.scene);
		} else if(item.type == "group") {
			obj = core.createGroup(item, gameWorld.scene);
		} else {
			obj = core.createCube(item, cubeGeometry, material, gameWorld.scene);
		}
		if(item.id) {
			core.childrenWithId[item.id]=obj;
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