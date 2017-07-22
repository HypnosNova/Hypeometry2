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
		x: 7
	}, {
		x: 7,
		y: 1
	}, {
		x: 7,
		y: 2
	}, {
		x: 7,
		y: 3
	}, {
		x: 7,
		y: 4
	}, {
		x: 7,
		y: 5
	}, {
		x: 7,
		y: 6
	}, {
		x: 7,
		y: 7
	}, {
		x: 7,
		y: 8
	}, {
		x: 7,
		y: 9
	}, {
		x: 7,
		y: 9,
		z: 1
	}, {
		x: 7,
		y: 9,
		z: 2
	}, {
		x: 7,
		y: 9,
		z: 3
	}, {
		x: 7,
		y: 9,
		z: 4
	}, {
		x: 7,
		y: 9,
		z: 5
	}, {
		x: 7,
		y: 9,
		z: 6
	}, {
		x: 7,
		y: 9,
		z: 7
	}, {
		x: 7,
		y: 9,
		z: 8
	}, {
		x: 7,
		y: 9,
		z: 9
	}, {
		type: "tri",
		x: 8,
		y: 9,
		z: 9
	}, {
		type: "tri",
		x: -1,
		rz: Math.PI
	}, {
		x: 6,
		y: 9,
		z: 0
	}, {
		x: 5,
		y: 9,
		z: 0
	}, {
		x: 4,
		y: 9,
		z: 0
	}, {
		x: 3,
		y: 9,
		z: 0
	}, {
		x: 2,
		y: 9,
		z: 0
	}, {
		x: 1,
		y: 9,
		z: 0
	}, {
		type: "tri",
		x: 0,
		y: 9,
		z: 0,
		rz: Math.PI
	}, {
		type: "stick",
		x: 7,
		y: 13.5,
		z: 9,
		d: 0,
		height: 8
	}, {
		type: "stick",
		x: 7,
		y: 13.5,
		z: 9,
		d: 1,
		height: 8
	}, {
		type: "stick",
		x: 7,
		y: 13.5,
		z: 9,
		d: 2,
		height: 8
	}, {
		type: "stick",
		x: 7,
		y: 13.5,
		z: 9,
		d: 3,
		height: 8
	}, {
		x: 7,
		y: 18,
		z: 9
	}, {
		x: 8,
		y: 18,
		z: 9
	}, {
		type: "tri",
		x: 9,
		y: 18,
		z: 9
	}, {
		type: "stair",
		x: 5,
		y: 16,
		z: 6,
		height:4
	}, {
		type: "plane",
		x: 5,
		y: 20,
		z: 2,
		height:4
	},{
		type:"group",
		x:0,
		y:0,
		z:0,
		children:[
		
		]
	}],
	materials: {
		m0: {
			type: "L",
			color: 0x818b89,
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
			z: 1000,
			y: 1150,
		},
		lookAt: {
			x: 0,
			y: 150,
			z: 0
		}
	}
}