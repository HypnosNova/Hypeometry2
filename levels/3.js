var map = {
	background: 0xefe196,
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
			text: "aaaa",
			family: "Century Gothic",
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
		x: -1,
		y: -3,
		sx: 3,
		sy: 7
	}, {
		z: -6,
		y: -4,
		sz: 11,
		sy: 7
	}, {
		x: -2,
		z: -0.95,
		y: 0.75,
		sx: 0.7,
		sy: 0.06,
		materialId: "st",
		cannotClick: true
	}, {
		x: -2,
		z: -0.95,
		y: 1,
		sx: 0.7,
		sy: 0.06,
		materialId: "st",
		cannotClick: true
	}, {
		x: -2,
		z: -0.95,
		y: 1.25,
		sx: 0.7,
		sy: 0.06,
		materialId: "st",
		cannotClick: true
	}, {
		x: -2,
		z: -0.95,
		y: 1.5,
		sx: 0.7,
		sy: 0.06,
		materialId: "st",
		cannotClick: true
	}, {
		x: -2,
		z: -0.95,
		y: 1.75,
		sx: 0.7,
		sy: 0.06,
		materialId: "st",
		cannotClick: true
	}, {
		x: -2,
		z: -0.95,
		y: 2,
		sx: 0.7,
		sy: 0.06,
		materialId: "st",
		cannotClick: true
	}, {
		x: -2,
		z: -0.95,
		y: 2.25,
		sx: 0.7,
		sy: 0.06,
		materialId: "st",
		cannotClick: true
	}, {
		z: -6.5,
		y: -3,
		sz: 8,
		sy: 7,
		x: -1
	}, {
		z: -1,
		x: -1.5,
		y: 1,
		sy: 3,
		sx: 2
	}, {
		x: -3,
		y: -1,
		sy: 7,
		z: -1,
		materialId: "m1"
	}, {
		x: -3,
		y: 1,
		z: -2,
		sy: 7,
		sx: 5,
	}, {
		y: -2.5,
		z: -12.5,
		sy: 10,
		sz: 2,
	}, {
		y: -0.5,
		z: -12,
		x: -1,
		sy: 10,
		sz: 3,
	}, {
		y: 4,
		z: -3,
		x: -4
	}, {
		type: "linear",
		id:"down",
		axis: "z",
		min: -9.5,
		max: -2.5,
		z:-5.5,
		y:1,
		children: [{
			x: 0,
			sz: 4,
			y:-0.5,
			sy: 2,
			materialId: "m1",
		},{
			x: 0,
			sz: 4,
			y:1,
			materialId: "m1",
			dragPart: true,
		},{
			type:"ring",
			x: 0.5,
			y:1,
			z:0.5,
			sz:0.3,
			sy:0.3,
			sx:0.3,
			ry:Math.PI/2,
			materialId: "m1",
			dragPart: true,
		},{
			type:"ring",
			x: 0.5,
			z:-1.5,
			y:1,
			sz:0.3,
			sy:0.3,
			sx:0.3,
			ry:Math.PI/2,
			materialId: "m1",
			dragPart: true,
		},{
			type:"ring",
			x: 0.5,
			z:1.5,
			y:1,
			sz:0.3,
			sy:0.3,
			sx:0.3,
			ry:Math.PI/2,
			materialId: "m1",
			dragPart: true,
		},{
			type:"ring",
			x: 0.5,
			z:-0.5,
			y:1,
			sz:0.3,
			sy:0.3,
			sx:0.3,
			ry:Math.PI/2,
			materialId: "m1",
			dragPart: true,
		}],
		onDown:function(){
			core.mapGraph.removeEdge("p8", "d1", "path0");
			core.mapGraph.removeEdge("p9", "d4", "path0");
		},
		onUp:function(){
			if(core.childrenWithId.down.position.z==-2.5*STEP){
				core.mapGraph.addEdge("p8", "d1", "path0");
			}else if(core.childrenWithId.down.position.z==-9.5*STEP){
				core.mapGraph.addEdge("p9", "d4", "path0");
			}
		},
		
	}, {
		type: "linear",
		id:"up",
		axis: "z",
		min: -9,
		max: -4,
		z:-5.5,
		y:2.5,
		x:-1,
		children: [{
			x: 0,
			sz: 3,
			sy: 3,
			y:-0.5,
			materialId: "m1"
		},{
			x: 0,
			sz: 3,
			y:1.5,
			dragPart: true,
			materialId: "m1"
		},{
			type:"ring",
			x: 0.5,
			y:1.5,
			sz:0.3,
			sy:0.3,
			sx:0.3,
			ry:Math.PI/2,
			materialId: "m1",
			dragPart: true,
		},{
			type:"ring",
			x: 0.5,
			z:-1,
			y:1.5,
			sz:0.3,
			sy:0.3,
			sx:0.3,
			ry:Math.PI/2,
			materialId: "m1",
			dragPart: true,
		},{
			type:"ring",
			x: 0.5,
			z:1,
			y:1.5,
			sz:0.3,
			sy:0.3,
			sx:0.3,
			ry:Math.PI/2,
			materialId: "m1",
			dragPart: true,
		}],
		onDown:function(){
			core.mapGraph.removeEdge("p17", "u3", "path0");
			core.mapGraph.removeEdge("p9", "u1", "path0");
		},
		onUp:function(){
			if(core.childrenWithId.up.position.z==-4*STEP){
				core.mapGraph.addEdge("p18", "u1", "path0");
			}else if(core.childrenWithId.up.position.z==-9*STEP){
				core.mapGraph.addEdge("p17", "u3", "path0");
			}
		},
	}, {
		type: "linear",
		id:"ver",
		axis: "y",
		min: 5,
		max: 11,
		z:-4.5,
		y:11,
		x:-3,
		children: [{
			x: 0,
			y:0,
			sy: 3,
			sz:2,
			materialId: "m1",
			dragPart: true
		},{
			x: 0,
			sz: 2,
			sy: 11,
			y:-7,
			materialId: "m1",
		},{
			type:"ring",
			x: 0.5,
			y:1,
			sz:0.3,
			sy:0.3,
			sx:0.3,
			ry:Math.PI/2,
			materialId: "m1",
			dragPart: true,
		},{
			type:"ring",
			x: 0.5,
			y:0,
			sz:0.3,
			sy:0.3,
			sx:0.3,
			ry:Math.PI/2,
			materialId: "m1",
			dragPart: true,
		},{
			type:"ring",
			x: 0.5,
			y:-1,
			sz:0.3,
			sy:0.3,
			sx:0.3,
			ry:Math.PI/2,
			materialId: "m1",
			dragPart: true,
		}],
		onDown:function(){
			core.mapGraph.removeEdge("p8", "d1", "path0");
			core.mapGraph.removeEdge("p9", "d4", "path0");
		},
		onUp:function(){
//			if(core.childrenWithId.down.position.z==-2.5*STEP){
//				core.mapGraph.addEdge("p8", "d1", "path0");
//			}else if(core.childrenWithId.down.position.z==-9.5*STEP){
//				core.mapGraph.addEdge("p9", "d4", "path0");
//			}
		},
		
	}, {
		x: -0.95,
		z: -13,
		y: 2.5,
		sz: 0.7,
		sy: 0.06,
		materialId: "st",
		cannotClick: true
	}, {
		x: -0.95,
		z: -13,
		y: 2.75,
		sz: 0.7,
		sy: 0.06,
		materialId: "st",
		cannotClick: true
	}, {
		x: -0.95,
		z: -13,
		y: 3,
		sz: 0.7,
		sy: 0.06,
		materialId: "st",
		cannotClick: true
	}, {
		x: -0.95,
		z: -13,
		y: 3.25,
		sz: 0.7,
		sy: 0.06,
		materialId: "st",
		cannotClick: true
	}, {
		x: -0.95,
		z: -13,
		y: 3.5,
		sz: 0.7,
		sy: 0.06,
		materialId: "st",
		cannotClick: true
	}, {
		x: -0.95,
		z: -13,
		y: 3.75,
		sz: 0.7,
		sy: 0.06,
		materialId: "st",
		cannotClick: true
	}, {
		x: -0.95,
		z: -13,
		y: 4,
		sz: 0.7,
		sy: 0.06,
		materialId: "st",
		cannotClick: true
	}, {
		x: -0.95,
		z: -13,
		y: 4.25,
		sz: 0.7,
		sy: 0.06,
		materialId: "st",
		cannotClick: true
	}, {
		y: -0.5,
		z: -14,
		x: -4,
		sx:3,
		sy:8,
		sz:3
	}, {
		y: 5,
		z: -3,
		x: -3,
		sy:3
	}, {
		y: 5.5,
		z: -3,
		x: -5,
		sy:2
	}, {
		y: 7.5,
		z: -3,
		x: -4,
		sy:2,
		sx:3
	}, {
		y: 4,
		z: -6,
		x: -6,
		sx:3,
		sy:17,
		sz:3,
		//------------------------
	},{
		type:"group",
		y: 6,
		z: -14,
		x: -4,
		children:[{
			y:-0.5,
			sx:3,
			sy:4,
			sz:3
		},{
			y:1,
			z:2,
			x:-1,
			sx:3,
		}]
	},{
		sy:3,
		y: 9,
		z: -4,
		x: -4,
	},{
		sy:3,
		y: 9,
		z: -4,
		x: -6,
	},{
		sy:3,
		y: 7,
		z: -4,
		x: -5,
	},{
		sy:2,
		sx:3,
		y: 11.5,
		z: -4,
		x: -5,
	}],
	materials: {
		m0: {
			type: "L",
			color: 0xdad282
		},
		m1: {
			type: "L",
			color: 0xafa862,
//			opacity: 0.3
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
			color: 0x222222,
			type: "B",
			//			color: 0xffffff,
			opacity: 0.5,
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
			x: -1,
			y: 11,
			z: -6
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
			neighbors: ["p2","p3"],
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
		},
		p3: {
			id: "p3",
			x: -2,
			y: 1,
			z: 0,
			face: 0,
			neighbors: ["p1","p4"],
			materialId: "m4",
			changeSpeed: {
				"p4": "auto"
			},
		},
		p4: {
			id: "p4",
			x: -2,
			y: 1,
			z: 0,
			face: 2,
			neighbors: ["p3","p5"],
			materialId: "m4",
			changeSpeed: {
				"p3": "auto"
			},
		},
		p5: {
			id: "p5",
			x: -2,
			y: 2,
			z: 0,
			face: 2,
			neighbors: ["p4","p6"],
			materialId: "m4",
			changeSpeed: {
				"p6": "auto"
			},
		},
		p6: {
			id: "p6",
			x: -2,
			y: 3,
			z: 0,
			face: 0,
			neighbors: ["p5","p7"],
			materialId: "m4",
			cannotClick: true,
			changeSpeed: {
				"p5": "auto"
			},
		},
		p7: {
			id: "p7",
			x: -2,
			y: 3,
			z: -1,
			face: 0,
			neighbors: ["p6","p8"],
			materialId: "m4"
		},
		p8: {
			id: "p8",
			x: -1,
			y: 3,
			z: -1,
			face: 0,
			neighbors: ["p7"],
			materialId: "m4",
			world:true
		},
		d1: {
			id: "d1",
			parentId:"down",
			local:true,
			x: 0,
			y: 2,
			z: 1.5,
			face: 0,
			neighbors: ["d2"],
			materialId: "m4"
		},
		d2: {
			id: "d2",
			local:true,
			parentId:"down",
			x: 0,
			y: 2,
			z: 0.5,
			face: 0,
			neighbors: ["d1","d3"],
			materialId: "m4"
		},
		d3: {
			id: "d3",
			local:true,
			parentId:"down",
			x: 0,
			y: 2,
			z: -0.5,
			face: 0,
			neighbors: ["d2","d4"],
			materialId: "m4"
		},
		d4: {
			id: "d4",
			local:true,
			parentId:"down",
			x: 0,
			y: 2,
			z: -1.5,
			face: 0,
			neighbors: ["d3"],
			materialId: "m4"
		},
		p9:{
			id:"p9",
			x: 0,
			y: 3,
			z: -12,
			face: 0,
			neighbors: ["p10"],
			materialId: "m4",
		},
		p10:{
			id:"p10",
			x: 0,
			y: 3,
			z: -13,
			face: 0,
			neighbors: ["p12","p9"],
			materialId: "m4",
			changeSpeed: {
				"p12": "auto"
			},
		},
		p12:{
			id:"p12",
			x: 0,
			y: 3,
			z: -13,
			face: 1,
			neighbors: ["p10","p13"],
			materialId: "m4",
			changeSpeed: {
				"p10": "auto"
			},
		},
		p13:{
			id:"p13",
			x: 0,
			y: 4,
			z: -13,
			face: 1,
			neighbors: ["p12","p14"],
			materialId: "m4",
		},
		p14:{
			id:"p14",
			x: 0,
			y: 5,
			z: -13,
			face: 0,
			neighbors: ["p13","p15"],
			materialId: "m4",
			cannotClick:true
		},
		p15:{
			id:"p15",
			x: -1,
			y: 5,
			z: -13,
			face: 0,
			neighbors: ["p16","p14"],
			materialId: "m4",
		},
		p16:{
			id:"p16",
			x: -1,
			y: 5,
			z: -12,
			face: 0,
			neighbors: ["p17","p15"],
			materialId: "m4",
		},
		p17:{
			id:"p17",
			x: -1,
			y: 5,
			z: -11,
			face: 0,
			neighbors: ["p16"],
			materialId: "m4",
		},
		u1: {
			id: "u1",
			parentId:"up",
			local:true,
			x: 0,
			y: 2.5,
			z: 1,
			face: 0,
			neighbors: ["u2"],
			materialId: "m4"
		},
		u2: {
			id: "u2",
			local:true,
			parentId:"up",
			x: 0,
			y: 2.5,
			z: 0,
			face: 0,
			neighbors: ["u1","u3"],
			materialId: "m4"
		},
		u3: {
			id: "u3",
			local:true,
			parentId:"up",
			x: 0,
			y: 2.5,
			z: -1,
			face: 0,
			neighbors: ["u2"],
			materialId: "m4"
		},
		p18:{
			id:"p18",
			x: -1,
			y: 5,
			z: -2,
			face: 0,
			neighbors: ["p19"],
			materialId: "m4",
		},
		p19:{
			id:"p19",
			x: -2,
			y: 5,
			z: -2,
			face: 0,
			neighbors: ["p18","p20"],
			materialId: "m4",
		},
		p20:{
			id:"p20",
			x: -3,
			y: 5,
			z: -2,
			face: 0,
			neighbors: ["p19","p21"],
			materialId: "m4",
		},
		p21:{
			id:"p21",
			x: -4,
			y: 5,
			z: -2,
			face: 0,
			neighbors: ["p22","p20"],
			materialId: "m4",
		},
		p22:{
			id:"p22",
			x: -5,
			y: 5,
			z: -2,
			face: 0,
			neighbors: ["p21"],
			materialId: "m4",
		},
		p23:{
			id:"p23",
			x: -4,
			y: 5,
			z: -3,
			face: 0,
			neighbors: ["p21"],
			materialId: "m4",
		},
	},
	startPoint: "p1"
}