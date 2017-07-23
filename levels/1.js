var map = {
	blocks: [{
		type: "cube",
		x: 0,
		y: 0,
		z: 0,
		rx: 0,
		ry: 0,
		rz: 0,
		materialId: "m0"
	}, {
		x: 1
	}, {
		x: 2
	}, {
		x: 3
	}, {
		x: 4
	}, {
		x: 5
	}, {
		x: 6
	}, {
		x: 6,
		y: 1
	}, {
		x: 6,
		y: 2
	}, {
		x: 6,
		y: 3
	}, {
		x: 6,
		y: 4
	}, {
		x: 6,
		y: 8,
		z: 4
	}, {
		x: 6,
		y: 8,
		z: 5
	}, {
		x: 6,
		y: 8,
		z: 6
	}, {
		x: 6,
		y: 8,
		z: 7
	}, {
		x: 6,
		y: 8,
		z: 8
	}, {
		type: "tri",
		x: 7,
		y: 8,
		z: 8
	}, {
		type: "tri",
		x: -1,
		rz: Math.PI
	}, {
		x: 2,
		y: 8,
		z: 0
	}, {
		x: 1,
		y: 8,
		z: 0
	}, {
		type: "tri",
		x: 0,
		y: 8,
		z: 0,
		rz: Math.PI
	}, {
		type: "stick",
		x: 6,
		y: 12,
		z: 8,
		d: 0,
		height: 7
	}, {
		type: "stick",
		x: 6,
		y: 12,
		z: 8,
		d: 1,
		height: 7
	}, {
		type: "stick",
		x: 6,
		y: 12,
		z: 8,
		d: 2,
		height: 7
	}, {
		type: "stick",
		x: 6,
		y: 12,
		z: 8,
		d: 3,
		height: 7
	}, {
		x: 6,
		y: 16,
		z: 8
	}, {
		x: 7,
		y: 16,
		z: 8
	}, {
		type: "tri",
		x: 8,
		y: 16,
		z: 8
	}, {
		type: "stair",
		x: 6,
		y: 16,
		z: 7,
		height: 4
	}, {
		type: "plane",
		x: 6,
		y: 20,
		z: 3,
		height: 4
	}, {
		type: "turntable",
		x: 8,
		y: 8,
		z: 0,
		funcMove: function(e, angle) {
			core.childrenWithId["bridge"].rotation.x = angle;
		},
		funcEnd: function(e, angle) {
			var tmp = angle;
			while(tmp < 0) {
				tmp += 2 * Math.PI;
			}
			core.childrenWithId["bridge"].rotation.x = tmp;
			if(core.childrenWithId["bridge"].rotation.x > Math.PI / 4 * 7) {
				core.childrenWithId["bridge"].rotation.x -= 2 * Math.PI;
			}
			console.log(core.childrenWithId["bridge"].rotation.x)
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
			var time = Math.abs(core.childrenWithId["bridge"].rotation.x - tmp) * 200;
			var tween = new TWEEN.Tween(core.childrenWithId["bridge"].rotation)
				.to({
					x: tmp
				}, time)
				.start();
		}
	}, {
		type: "group",
		id: "bridge",
		x: 3,
		y: 8,
		z: 0,
		children: [{
			materialId: "m1"
		}, {
			x: 1,
			materialId: "m1"
		}, {
			x: 2,
			materialId: "m1"
		}, {
			x: 3,
			materialId: "m1"
		}, {
			x: 3,
			y: -1,
			materialId: "m1"
		}, {
			x: 3,
			y: -2,
			materialId: "m1"
		}, {
			x: 3,
			y: -3,
			materialId: "m1"
		}]
	}],
	materials: {
		m0: {
			type: "L",
			color: 0x818b89,
			mapId: 0
		},
		m1: {
			type: "L",
			color: 0x9ba4a3,
			mapId: 0
		}
	},
	textures: ["img/path/texture0.jpg"],
	lights: {
		areaLight: {
			color: 0x444444,
			type: "A"
		},
		directionLight: {
			color: 0xffffff,
			type: "D",
			intensity: 1,
			position: {
				x: 100,
				y: 400,
				z: 200
			}
		},
		directionLight2: {
			color: 0x555555,
			type: "D",
			intensity: 1,
			position: {
				x: -100,
				y: -400,
				z: -200
			}
		}
	},
	camera: {
		position: {
			x: 1000,
			z: 940,
			y: 1150,
		},
		lookAt: {
			x: 0,
			y: 150,
			z: -60
		}
	}
}