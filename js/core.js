var core = {};
core.map = {};
core.childrenWithId = {};
core.charactor = {};
core.createLevelWorld = function() {
	let world = new $$.SubWorld({}, {
		type: "OrthographicCamera"
	});
	core.loadMapResource(function() {
		core.initMapMaterials(world);
		core.initMapBlocks(world);
		core.initMapLights(world);
		core.initMapCamera(world);
		core.initLevelBoard(world);
		core.initPathGraph(world);
		core.createCharacter(world);
	});

	world.actionInjections.push(TWEEN.update);
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
	cube.scale.x=item.sx||1;
	cube.scale.z=item.sx||1;
	container.add(cube);
	return cube;
};

core.createGround = function(item, g, m, container) {
	let STEP = game.settings.blockSize;
	let cube = new THREE.Mesh(g, m);
	cube.position.set(item.x * STEP || 0, (item.y + 5 / 12) * STEP || 0, item.z * STEP || 0);
	cube.rotation.set(item.rx || 0, item.ry || 0, item.rz || 0);
	cube.scale.x = item.width;
	cube.scale.y = item.height;
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
	let group = new THREE.Group();
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

core.createCharacter = function(gameWorld) {
	let STEP = game.settings.blockSize;
	var geometry = new THREE.CylinderBufferGeometry(STEP / 3, 1, STEP, 16);
	var material = new THREE.MeshLambertMaterial({
		color: 0xffff00
	});
	var cylinder = new THREE.Mesh(geometry, material);
	gameWorld.scene.add(cylinder);
	var sp = core.map["path" + core.map.currentPath][core.map.startPoint];
	//	cylinder.isPenetrated=true;
	cylinder.position.set(sp.x * STEP, sp.y * STEP, sp.z * STEP);
	cylinder.isWalking = false;
	cylinder.walkingPath = [];
	cylinder.currentPath = core.map.startPoint;
	core.charactor = cylinder;
};

core.Obj = {};
core.Obj.Turntable = function(options) {
	let that = this;
	let STEP = game.settings.blockSize;
	let group = new THREE.Group();
	group.position.set(options.x * STEP || 0, options.y * STEP || 0, options.z * STEP || 0);
	group.rotation.set(options.rx || 0, options.ry || 0, options.rz || 0);
	this.object = group;
	group.owner=that;
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
	if(options.hoopMaterial) {
		hoopM = core.map.materials[options.hoopMaterial];
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
	if(options.rodMaterial) {
		rodM = core.map.materials[options.rodMaterial];
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
	if(options.poleMaterial) {
		poleM = core.map.materials[options.poleMaterial];
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
		if(that.disable){
			return;
		}
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
	
	this.disable=false;
	
	this.becomeDisable=function(){
		if(that.disable){
			return;
		}
		that.disable=true;
		new TWEEN.Tween(rod1.scale).to({
			y:0.5
		},350).start();
		new TWEEN.Tween(rod2.scale).to({
			y:0.5
		},350).start();
		new TWEEN.Tween(pole1.position).to({
			y:pole1.position.y/2
		},350).start();
		new TWEEN.Tween(pole2.position).to({
			y:pole2.position.y/2
		},350).start();
		new TWEEN.Tween(pole3.position).to({
			z:pole3.position.z/2
		},350).start();
		new TWEEN.Tween(pole4.position).to({
			z:pole4.position.z/2
		},350).start();
	};
	
	this.becomeAble=function(){
		if(!that.disable){
			return;
		}
		that.disable=false;
		new TWEEN.Tween(rod1.scale).to({
			y:1
		},350).start();
		new TWEEN.Tween(rod2.scale).to({
			y:1
		},350).start();
		new TWEEN.Tween(pole1.position).to({
			y:pole1.position.y*2
		},350).start();
		new TWEEN.Tween(pole2.position).to({
			y:pole2.position.y*2
		},350).start();
		new TWEEN.Tween(pole3.position).to({
			z:pole3.position.z*2
		},350).start();
		new TWEEN.Tween(pole4.position).to({
			z:pole4.position.z*2
		},350).start();
	};

	function dragEnd(e) {
		that.isDown = false;
		$$.global.canvasDom.removeEventListener("mousemove", dragMove, false);
		$$.global.canvasDom.removeEventListener("touchmove", dragMove, false);
		$$.global.canvasDom.removeEventListener("mouseup", dragEnd, false);
		$$.global.canvasDom.removeEventListener("touchend", dragEnd, false);
		var tmp = group.rotation.x;
		while(tmp < 0) {
			tmp += 2 * Math.PI;
		}
		group.rotation.x = tmp;
		if(group.rotation.x > Math.PI / 4 * 7) {
			group.rotation.x -= 2 * Math.PI;
		}
		tmp -= Math.PI / 4;
		var quaro = 0;
		while(tmp > 0) {
			quaro++;
			tmp -= Math.PI / 2;
		}

		quaro = quaro % 4;
		if(quaro === 0) {
			tmp = 0;
		} else if(quaro === 1) {
			tmp = Math.PI / 2;
		} else if(quaro === 2) {
			tmp = Math.PI;
		} else if(quaro === 3) {
			tmp = Math.PI * 1.5;
		}
		var time = Math.abs(group.rotation.x - tmp) * 400;
		new TWEEN.Tween(group.rotation)
			.to({
				x: tmp
			}, time)
			.easing(TWEEN.Easing.Back.Out)
			.start();
		if(options.funcEnd) {
			options.funcEnd(e, group.rotation.x);
		}
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
		} else if(item.type == "ground") {
			core.createGround(item, cubeGeometry, material, group);
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

core.initLevelBoard = function(gameWorld) {
	if(!core.map.levelBoard) {
		return;
	}
	let w = $$.getWorldWidth();
	let h = $$.getWorldHeight();
	let canvas = document.createElement("canvas");
	canvas.width = w;
	canvas.height = h;
	let ctx = canvas.getContext("2d");
	ctx.fillStyle = core.map.levelBoard.backgroundColor;
	ctx.fillRect(0, 0, w, h);
	ctx.textAlign = "center";
	for(let item of core.map.levelBoard.info) {
		if(item.type == "text") {
			ctx.font = item.size * h + "px " + item.family + " " + item.weight;
			ctx.fillStyle = item.color;
			let width = ctx.measureText(item.text).width;
			ctx.fillText(item.text, w / 2, h * item.y);
		} else if(item.type == "pic") {
			let imgWidth = $$.Loader.RESOURCE.textures[item.src].image.naturalWidth;
			let imgHeight = $$.Loader.RESOURCE.textures[item.src].image.naturalHeight;
			let newHeight = item.height * h;
			let newWidth = newHeight / imgHeight * imgWidth;
			ctx.drawImage($$.Loader.RESOURCE.textures[item.src].image, (w - newWidth) / 2, h * item.y - newHeight / 2, newWidth, newHeight);

		}
	}

	let texture = new THREE.CanvasTexture(canvas);
	let geometry = new THREE.PlaneBufferGeometry(w, h, 2);
	let material = new THREE.MeshBasicMaterial({
		color: 0xffffff,
		map: texture,
		transparent: true,
	});
	let plane = new THREE.Mesh(geometry, material);

	plane.position.set(gameWorld.camera.position.x - 100, gameWorld.camera.position.y - 100, gameWorld.camera.position.z - 100);
	plane.lookAt(gameWorld.camera.position);
	gameWorld.scene.add(plane);
	new TWEEN.Tween(plane.material)
		.to({
			opacity: 0
		}, core.map.levelBoard.duration)
		.delay(core.map.levelBoard.life)
		.onComplete(function() {
			gameWorld.scene.remove(plane);
		})
		.start();

};

core.initMapBlocks = function(gameWorld) {
	let STEP = game.settings.blockSize;
	let cubeGeometry = new THREE.BoxBufferGeometry(STEP, STEP, STEP);
	let triangleGeometry = new THREE.BoxGeometry(STEP, STEP, STEP);
	let stickGeomerty = new THREE.BoxBufferGeometry(STEP / 10, STEP, STEP / 10);
	let groundGeometry = new THREE.PlaneBufferGeometry(STEP, STEP);
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
		} else if(item.type == "ground") {
			obj = core.createGround(item, groundGeometry, material, gameWorld.scene);
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
			core.childrenWithId[item.id] = obj;
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
					transparent:true,
					opacity:core.map.materials[i].opacity==null?1:core.map.materials[i],
					map: $$.Loader.RESOURCE.textures[item.mapId]
				});
			} else {
				core.map.materials[i] = new THREE.MeshLambertMaterial({
					transparent:true,
					opacity:core.map.materials[i].opacity==null?1:core.map.materials[i],
					color: item.color
				});
			}
		} else if(item.type == "B") {
			if(item.mapId) {
				core.map.materials[i] = new THREE.MeshBasicMaterial({
					color: item.color,
					opacity:core.map.materials[i].opacity==null?1:core.map.materials[i],
					transparent:true,
					map: $$.Loader.RESOURCE.textures[core.map.textures[item.mapId]]
				});
			} else {
				core.map.materials[i] = new THREE.MeshBasicMaterial({
					transparent:true,
					opacity:core.map.materials[i].opacity==null?1:core.map.materials[i],
					color: item.color
				});
			}
		}
	}
};

core.initMapCamera = function(gameWorld) {
	let STEP = game.settings.blockSize;
	let c = core.map.camera;
	if(core.map.currentPath === 0) {
		gameWorld.camera.position.set((c.lookAt.x + c.distance) * STEP, (c.lookAt.y + c.distance) * STEP, (c.lookAt.z + c.distance) * STEP);
	}
	gameWorld.camera.lookAt(new THREE.Vector3(c.lookAt.x * STEP, c.lookAt.y * STEP, c.lookAt.z * STEP));
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

core.showEndBoard=function(){
	var info=core.map.endBoard;
	let w = $$.getWorldWidth();
	let h = $$.getWorldHeight();
	let canvas = document.createElement("canvas");
	canvas.width = w;
	canvas.height = h;
	let ctx = canvas.getContext("2d");
	ctx.fillStyle = core.map.levelBoard.backgroundColor;
	ctx.fillRect(0, 0, w, h);
	ctx.textAlign = "center";
	for(let item of info.info) {
		if(item.type == "text") {
			ctx.font = item.size * h + "px " + item.family + " " + item.weight;
			ctx.fillStyle = item.color;
			let width = ctx.measureText(item.text).width;
			ctx.fillText(item.text, w / 2, h * item.y);
		} else if(item.type == "pic") {
			let imgWidth = $$.Loader.RESOURCE.textures[item.src].image.naturalWidth;
			let imgHeight = $$.Loader.RESOURCE.textures[item.src].image.naturalHeight;
			let newHeight = item.height * h;
			let newWidth = newHeight / imgHeight * imgWidth;
			ctx.drawImage($$.Loader.RESOURCE.textures[item.src].image, (w - newWidth) / 2, h * item.y - newHeight / 2, newWidth, newHeight);

		}
	}

	let texture = new THREE.CanvasTexture(canvas);
	let geometry = new THREE.PlaneBufferGeometry(w, h, 2);
	let material = new THREE.MeshBasicMaterial({
		color: 0xffffff,
		map: texture,
		transparent: true,
	});
	let plane = new THREE.Mesh(geometry, material);

	plane.position.set(gameWorld.camera.position.x - 100, gameWorld.camera.position.y - 100, gameWorld.camera.position.z - 100);
	plane.lookAt(gameWorld.camera.position);
	gameWorld.scene.add(plane);
	plane.material.opacity=0;
	new TWEEN.Tween(plane.material)
		.to({
			opacity: 1
		}, core.map.levelBoard.duration)
		.onComplete(function() {
//			gameWorld.scene.remove(plane);
		})
		.start();
}

core.initPathGraph = function(gameWorld) {
	let STEP = game.settings.blockSize;
	var pathInfo = core.map["path" + core.map.currentPath];
	var graph = new core.PathGraph(pathInfo);
	for(var i in pathInfo) {
		let cubeGeometry = new THREE.PlaneBufferGeometry(STEP, STEP);
		if(pathInfo[i].parentId) {
			var contain = core.childrenWithId[pathInfo[i].parentId];
		} else {
			var contain = gameWorld.scene;
		}
		var m;
		if(pathInfo[i].materialId) {
			m = core.map.materials[pathInfo[i].materialId];
		} else {
			for(let i in core.map.materials) {
				m = core.map.materials[i];
				break;
			}
		}
		var obj = core.createCube(pathInfo[i], cubeGeometry, m, contain);
		obj.pathId = pathInfo[i].id;
		pathInfo[i].obj = obj;
		if(pathInfo[i].face === 0) {
			obj.rotation.x = -Math.PI / 2;
			obj.position.y -= STEP * 0.49;
		} else if(pathInfo[i].face == 2) {
			obj.position.z -= STEP * 0.49;
		} else if(pathInfo[i].face == 4) {
			obj.rotation.x = Math.PI;
			obj.position.z += STEP * 0.49;
		} else if(pathInfo[i].face == 5) {
			obj.rotation.x = Math.PI / 2;
			obj.position.y += STEP * 0.49;
		}
		if(pathInfo[i].rx) {
			obj.rotation.x += pathInfo[i].rx;
		}
		if(pathInfo[i].ry) {
			obj.rotation.y += pathInfo[i].ry;
		}
		if(pathInfo[i].rz) {
			obj.rotation.z += pathInfo[i].rz;
		}
		if(pathInfo[i].sx) {
			obj.scale.x = pathInfo[i].rx;
		}
		if(pathInfo[i].sy) {
			obj.scale.y = pathInfo[i].sy;
		}
		if(pathInfo[i].cannotClick) {
			obj.isPenetrated = true;
		} else {
			obj.onClick = function(obj) {
				console.log(obj.object.pathId,core.charactor.currentPath)
				if(core.charactor.isWalking == false) {
					var path = graph.findPath(core.charactor.currentPath, obj.object.pathId);
					if(path === false) {
						core.charactor.walkingPath = [core.charactor.walkingPath[0]];
						return;
					}
					path = path.splice(1);
					core.moveCharacter(path);
				}else{
					var path = graph.findPath(core.charactor.walkingPath[0], obj.object.pathId);
					if(path === false) {
						core.charactor.walkingPath = [core.charactor.walkingPath[0]];
						return;
					}
					core.charactor.walkingPath=path;
				}

			}
		}

	}
};

core.moveCharacter = function(arr) {
	let STEP = game.settings.blockSize;
	if(!arr || arr.length == 0) {
		core.charactor.isWalking = false;
		return;
	}
	core.charactor.walkingPath = arr;
	core.charactor.isWalking = true;
	nextP = core.map["path" + core.map.currentPath][arr[0]];
	var vec = new THREE.Vector3(nextP.x * STEP, nextP.y * STEP, nextP.z * STEP);
	if(nextP.parentId) {
		vec = core.childrenWithId[nextP.parentId].localToWorld(vec);
	}
	var time = game.settings.moveSpeed;

	var prevP = core.map["path" + core.map.currentPath][core.charactor.currentPath];

	if(prevP.changeSpeed && prevP.changeSpeed[nextP.id]) {
		var str = prevP.changeSpeed[nextP.id];
		if(typeof str == "number") {
			time = str;
		} else if(str == "auto") {
			time = time / STEP * core.charactor.position.distanceTo(vec);
		}
	}
	
	var canMove=false;
	for(var item of prevP.neighbors){
		if(item==nextP.id){
			canMove=true;
		}
	}
	if(prevP.onLeaving){
		prevP.onLeaving();
	}
	if(!canMove){
		core.charactor.isWalking = false;
		return;
	}
	if(nextP.onComing){
		nextP.onComing();
	}
	
	new TWEEN.Tween(core.charactor.position)
		.to(vec, time)
//		.onComplete(function() {
//			gameWorld.scene.remove(plane);
//		})
		.start()
		.onComplete(function() {
			if(nextP.hasCome){
				nextP.hasCome();
			}
			if(prevP.hasLeft){
				prevP.hasLeft();
			}
			core.charactor.currentPath = core.charactor.walkingPath[0];
			arr = core.charactor.walkingPath.splice(1);
			core.charactor.walkingPath = [];
			core.moveCharacter(arr);
		});

}

core.loadMapResource = function(callback) {
	$$.Loader.loadTexture(core.map.textures);
	$$.Loader.onLoadComplete = callback;
};

core.PathGraph = function(path) {
	var that = this;
	this.neighbors = path; //this.neighbors = {}; // Key = vertex, value = array of neighbors.
	this.addEdge = function(u, v) {
		if(neighbors[u] === undefined) { // Add the edge u -> v.
			neighbors[u] = [];
		}
		neighbors[u].push(v);
		if(neighbors[v] === undefined) { // Also add the edge v -> u in order
			neighbors[v] = []; // to implement an undirected graph.
		} // For a directed graph, delete
		neighbors[v].push(u); // these four lines.
	};

	function shortestPath(graph, source, target) {
		if(source == target) { // Delete these four lines if
			return [source]; // when the source is equal to
		}
		// the target.
		var queue = [source],
			visited = {
				source: true
			},
			predecessor = {},
			tail = 0;
		while(tail < queue.length) {
			var u = queue[tail++]; // Pop a vertex off the queue.
			var neighbors = graph[u].neighbors;
			for(var i = 0; i < neighbors.length; ++i) {
				var v = neighbors[i];
				if(visited[v]) {
					continue;
				}
				visited[v] = true;
				if(v === target) { // Check if the path is complete.
					var path = [v]; // If so, backtrack through the path.
					while(u !== source) {
						path.push(u);
						u = predecessor[u];
					}
					path.push(u);
					path.reverse();
					return path;
				}
				predecessor[v] = u;
				queue.push(v);
			}
		}
		return false;
	}

	this.findPath = function(start, end) {
		return shortestPath(that.neighbors, start, end);
	}

	return this;
}