var map = {
	background:0xefe196,
	levelBoard: {
		life: 2500,
		duration: 1000,
		backgroundColor: "rgba(0,0,0,0.4)",
		info: [{
			type: "pic",
			src: "img/common/border.png",
			height: 0.1,
			y: 0.15
		}, {
			type: "text",
			text: "第三章",
			family: "微软雅黑",
			size: 0.035,
			y: 0.27,
			color: "#ffffff",
			weight: "bolder"
		}, {
			type: "text",
			text: "隐寺",
			family: "微软雅黑",
			size: 0.07,
			y: 0.37,
			color: "#ffffff",
			weight: "bolder"
		}, {
			type: "text",
			text: "─────",
			family: "微软雅黑",
			size: 0.02,
			y: 0.45,
			color: "#ffffff",
			weight: "bold"
		}, {
			type: "text",
			text: "在此",
			family: "微软雅黑",
			size: 0.03,
			y: 0.5,
			color: "#ffffff",
			weight: "bolder"
		}, {
			type: "text",
			text: "我要向",
			family: "微软雅黑",
			size: 0.04,
			y: 0.625,
			color: "#ffffff",
			weight: "bold"
		}, {
			type: "text",
			text: "纪念碑谷致敬",
			family: "微软雅黑",
			size: 0.04,
			y: 0.7,
			color: "#ffffff",
			weight: "bold"
		}, {
			type: "pic",
			src: "img/common/border.png",
			height: 0.1,
			y: 0.85
		}]
	},
	endBoard: {
		duration: 1000,
		backgroundColor: "rgba(0,0,0,0.4)",
		info: [{
			type: "pic",
			src: "img/common/border.png",
			height: 0.1,
			y: 0.15
		}, {
			type: "text",
			text: "完成",
			family: "微软雅黑",
			size: 0.06,
			y: 0.5,
			color: "#ffffff",
			weight: "bolder"
		}, {
			type: "pic",
			src: "img/common/border.png",
			height: 0.1,
			y: 0.85
		}]
	},
	onGameStart: function() {
		//core.childrenWithId.turn.gameState = 0;
	},
	blocks: [{
		x:-1,
		y:-3,
		sx:3,
		sy:7
	},{
		z: -6,
		y:-4,
		sz:11,
		sy:7
	},{
		x: -2,
		z: -0.95,
		y: 0.75,
		sx: 0.7,
		sy: 0.06,
		materialId: "st",
		cannotClick: true
	},{
		x: -2,
		z: -0.95,
		y: 1,
		sx: 0.7,
		sy: 0.06,
		materialId: "st",
		cannotClick: true
	},{
		x: -2,
		z: -0.95,
		y: 1.25,
		sx: 0.7,
		sy: 0.06,
		materialId: "st",
		cannotClick: true
	},{
		x: -2,
		z: -0.95,
		y: 1.5,
		sx: 0.7,
		sy: 0.06,
		materialId: "st",
		cannotClick: true
	},{
		x: -2,
		z: -0.95,
		y: 1.75,
		sx: 0.7,
		sy: 0.06,
		materialId: "st",
		cannotClick: true
	},{
		x: -2,
		z: -0.95,
		y: 2,
		sx: 0.7,
		sy: 0.06,
		materialId: "st",
		cannotClick: true
	},{
		x: -2,
		z: -0.95,
		y: 2.25,
		sx: 0.7,
		sy: 0.06,
		materialId: "st",
		cannotClick: true
	},{
		z: -6.5,
		y:-3,
		sz:8,
		sy:7,
		x:-1
	},{
		z: -1,
		x:-1.5,
		y:1,
		sy:3,
		sx:2
	},{
		x:-3,
		y:-1,
		sy:7,
		z:-1,
		materialId:"m1"
	},{
		x:-3,
		y:1,
		z:-2,
		sy:7,
		sx:5,
	},{
		y:-2.5,
		z:-12.5,
		sy:10,
		sz:2,
	},{
		y:-0.5,
		z:-12,
		x:-1,
		sy:10,
		sz:3,
	},{
		type:"linear",
		children:[{
			x:1,
			z:-3,
			sz:4,
			sy:3,
			materialId:"m1",
			dragPart:true
		}]
	}],
	materials: {
		m0: {
			type: "L",
			color: 0xdad282
		},
		m1: {
			type: "L",
			color: 0xafa862,
			opacity: 0.5,
		},
		m2: {
			type: "L",
			color: 0xff6600
		},
		m3: {
			type: "L",
			color: 0xffffff,
			mapId: "img/level2ground.png"
		},
		m4: {
			type: "B",
			color: 0xdad282,
			type: "B",
			//			color: 0xffffff,
			opacity: 0,
			//			mapId: "img/null.png"
		},
		m5: {
			type: "L",
			color: 0xff8822,
			mapId: "img/endPoint.png"
		},
		mRoof: {
			type: "L",
			color: 0xf7b41f
		},
		st: {
			type: "L",
			color: 0x444444,
		}
	},
	textures: ["img/path/texture0.jpg", "img/common/border.png", "img/level2ground.png", "img/null.png", "img/endPoint.png"],
	lights: {
		areaLight: {
			color: 0x333333,
			type: "A"
		},
		directionLight: {
			color: 0xeedacc,
			type: "D",
			intensity: 1,
			position: {
				x: 200,
				y: 400,
				z: 100
			}
		},
		directionLight2: {
			color: 0x444444,
			type: "D",
			intensity: 1,
			position: {
				x: -200,
				y: -400,
				z: -100
			}
		}
	},
	camera: {
		distance: 50,
		lookAt: {
			x: 0,
			y: 5,
			z: 0
		}
	},
	currentPath: 0,
	path0: {
		p1: {
			id: "p1",
			x: -1,
			y: 1,
			z: 0,
			face: 0,
			neighbors: ["p2"],
			materialId: "m4"
		},
		p2: {
			id: "p2",
			x: 0,
			y: 1,
			z: 0,
			face: 0,
			neighbors: ["p1"],
			materialId: "m4"
		}
	},
	startPoint: "p1"
}