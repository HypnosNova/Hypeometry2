var map = {
	background: 0xefe196,
	levelBoard: {
		life: 3500,
		duration: 1000,
		backgroundColor: "rgba(0,0,0,0.6)",
		info: [{
			type: "pic",
			src: "img/common/border.png",
			height: 0.1,
			y: 0.15
		}, {
			type: "text",
			text: "架构大会特别版",
			family: "微软雅黑",
			size: 0.04,
			y: 0.33,
			color: "#ffffff",
			weight: "bold"
		}, {
			type: "text",
			text: "─────",
			family: "微软雅黑",
			size: 0.02,
			y: 0.45,
			color: "#ffffff",
			weight: "normal"
		}, {
			type: "text",
			text: "在此",
			family: "微软雅黑",
			size: 0.03,
			y: 0.5,
			color: "#ffffff",
			weight: "bold"
		}, {
			type: "text",
			text: "我先预祝",
			family: "微软雅黑",
			size: 0.035,
			y: 0.625,
			color: "#ffffff",
			weight: "normal"
		}, {
			type: "text",
			text: "大会举办顺利",
			family: "微软雅黑",
			size: 0.035,
			y: 0.7,
			color: "#ffffff",
			weight: "normal"
		}, {
			type: "pic",
			src: "img/common/border.png",
			height: 0.1,
			y: 0.85
		}]
	},
	endBoard: {
		duration: 1000,
		backgroundColor: "rgba(255,255,255,0.6)",
		info: [{
			type: "pic",
			src: "img/common/border2.png",
			height: 0.1,
			y: 0.15
		}, {
			type: "text",
			text: "Hypeometry2",
			family: "微软雅黑",
			size: 0.05,
			y: 0.35,
			color: "#000000",
			weight: "bold"
		},{
			type: "pic",
			src: "img/ias.png",
			height: 0.3,
			y: 0.5
		}, {
			type: "pic",
			src: "img/common/border2.png",
			height: 0.1,
			y: 0.85
		}]
	},
	blocks: [{
		y: 14.5,
		x: 20,
		z: 20,
		sx: 12,
		sz: 3,
		sy: 2,
		ry: Math.PI / 4
	}, {
		type: "cylinder",
		y: 16,
		x: 17,
		z: 23,
		materialId: "m00"
	}, {
		type: "cylinder",
		y: 16,
		x: 23,
		z: 17,
		materialId: "m00"
	}, {
		type: "cylinder",
		y: 16,
		x: 20,
		z: 20,
		materialId: "m00"
	}, {
		type: "turntable",
		id: "turnI",
		axis: "y",
		y: 18,
		x: 17,
		z: 23,
		funcMove: function(e, angle) {
			core.childrenWithId["letterI"].rotation.y = angle;
		},
		funcEnd: function(e, angle) {
			var tmp = angle;
			while(tmp < 0) {
				tmp += 2 * Math.PI;
			}
			core.childrenWithId["letterI"].rotation.y = tmp;
			if(core.childrenWithId["letterI"].rotation.y > Math.PI / 4 * 7) {
				core.childrenWithId["letterI"].rotation.y -= 2 * Math.PI;
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
			var time = Math.abs(core.childrenWithId["letterI"].rotation.y - tmp) * 400;
			var tween = new TWEEN.Tween(core.childrenWithId["letterI"].rotation)
				.to({
					y: tmp
				}, time)
				.easing(TWEEN.Easing.Back.Out)
				.start().onComplete(function() {
					if(Math.abs(core.childrenWithId["letterI"].rotation.y - Math.PI)<0.001) {
						if(Math.abs(core.childrenWithId["letterA"].rotation.y - 0)<0.001) {
							if(Math.abs(core.childrenWithId["letterS"].rotation.y - 0)<0.001) {
								core.showEndBoard();
							}
						}
					}
				});
		},
		hoopMaterial: "red",
		poleMaterial: "red"
	}, {
		type: "turntable",
		id: "turn",
		axis: "y",
		y: 18,
		x: 20,
		z: 20,
		funcMove: function(e, angle) {
			core.childrenWithId["letterA"].rotation.y = angle - Math.PI / 2;
		},
		funcEnd: function(e, angle) {
			var tmp = angle - Math.PI / 2;
			while(tmp < 0) {
				tmp += 2 * Math.PI;
			}
			core.childrenWithId["letterA"].rotation.y = tmp;
			if(core.childrenWithId["letterA"].rotation.y > Math.PI / 4 * 7) {
				core.childrenWithId["letterA"].rotation.y -= 2 * Math.PI;
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
			var time = Math.abs(core.childrenWithId["letterA"].rotation.y - tmp) * 400;
			var tween = new TWEEN.Tween(core.childrenWithId["letterA"].rotation)
				.to({
					y: tmp
				}, time)
				.easing(TWEEN.Easing.Back.Out)
				.start().onComplete(function() {
					if(Math.abs(core.childrenWithId["letterI"].rotation.y - Math.PI)<0.001) {
						if(Math.abs(core.childrenWithId["letterA"].rotation.y - 0)<0.001) {
							if(Math.abs(core.childrenWithId["letterS"].rotation.y - 0)<0.001) {
								core.showEndBoard();
							}
						}
					}
				});
		},
		hoopMaterial: "green",
		poleMaterial: "green"
	}, {
		type: "turntable",
		id: "turnS",
		axis: "y",
		y: 18,
		x: 23,
		z: 17,
		funcMove: function(e, angle) {
			core.childrenWithId["letterS"].rotation.y = angle + Math.PI / 2;
		},
		funcEnd: function(e, angle) {
			var tmp = angle + Math.PI / 2;
			while(tmp < 0) {
				tmp += 2 * Math.PI;
			}
			core.childrenWithId["letterS"].rotation.y = tmp;
			if(core.childrenWithId["letterS"].rotation.y > Math.PI / 4 * 7) {
				core.childrenWithId["letterS"].rotation.y -= 2 * Math.PI;
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
			var time = Math.abs(core.childrenWithId["letterS"].rotation.y - tmp) * 400;
			var tween = new TWEEN.Tween(core.childrenWithId["letterS"].rotation)
				.to({
					y: tmp
				}, time)
				.easing(TWEEN.Easing.Back.Out)
				.start().onComplete(function() {
					if(Math.abs(core.childrenWithId["letterI"].rotation.y - Math.PI)<0.001) {
						if(Math.abs(core.childrenWithId["letterA"].rotation.y - 0)<0.001) {
							if(Math.abs(core.childrenWithId["letterS"].rotation.y - 0)<0.001) {
								core.showEndBoard();
							}
						}
					}
				});
		},
		hoopMaterial: "blue",
		poleMaterial: "blue"
	}, {
		type: "group",
		id: "letterI",
		x: -4,
		y: 8,
		z: 4,
		children: [{
			y: -2,
			x: 1,
			z: 1,
			sy: 4,
			materialId: "red"
		}, {
			y: 4,
			x: -1,
			z: -1,
			sy: 4,
			materialId: "red"
		}, {
			y: 4.5,
			x: -1,
			z: 1,
			materialId: "red"
		}, {
			y: 4.5,
			x: 1,
			z: -1,
			materialId: "red"
		}, {
			y: -2.5,
			x: -1,
			z: -1,
			materialId: "red"
		}, {
			y: -2.5,
			x: -1,
			z: 0,
			materialId: "red"
		}, {
			y: -2.5,
			x: 0,
			z: -1,
			materialId: "red"
		}, {
			y: -2.5,
			x: -2,
			z: 0,
			materialId: "red"
		}, {
			y: -2.5,
			x: 0,
			z: -2,
			materialId: "red"
		}]
	}, {
		type: "group",
		id: "letterA",
		x: -3,
		y: 5.5,
		z: -2,
		ry: -Math.PI / 2,
		children: [{
			x: 0,
			y: 1,
			z: 1,
			materialId: "green"
		}, {
			x: -2,
			materialId: "green"
		}, {
			x: 2,
			y: 1,
			type: "tri",
			materialId: "green"
		}, {
			x: 0,
			z: -1,
			y: 0,
			materialId: "green"
		}, {
			x: -1,
			z: -1,
			y: 0,
			materialId: "green"
		}, {
			x: -4,
			z: -2,
			y: -4,
			sy: 5,
			materialId: "green"
		}, {
			type: "stair",
			x: -3,
			y: -1,
			z: -2,
			height: 2,
			materialId: "green"
		}, {
			x: -4,
			z: -2,
			y: -4,
			sy: 5,
			materialId: "green"
		}, {
			x: -1,
			z: -2,
			y: 3,
			ry: -Math.PI / 2,
			type: "tri",
			materialId: "green"
		}, {
			x: 0,
			z: -2,
			y: 3,
			ry: -Math.PI,
			type: "tri",
			materialId: "green"
		}, {
			x: 1,
			z: -2,
			y: 3,
			rx: Math.PI,
			type: "tri",
			materialId: "green"
		}, {
			type: "stair",
			x: 1,
			z: -2,
			y: 2,
			d: 3,
			height: 1,
			materialId: "green"
		}, {
			sy: 6,
			x: 3,
			z: -1,
			y: 0.5,
			materialId: "green"
		}, {
			x: 2,
			z: -1,
			y: 0,
			materialId: "green"
		}, {
			x: 1,
			z: -1,
			y: 0,
			type: "tri",
			rx: Math.PI,
			ry: Math.PI,
			materialId: "green"
		}]
	}, {
		type: "group",
		id: "letterS",
		ry: Math.PI / 2,
		x: 3,
		y: 9,
		z: -4,
		children: [{
			x: 1,
			y: 2,
			z: -2,
			materialId: "blue"
		}, {
			x: -1,
			y: 1,
			z: -3,
			materialId: "blue"
		}, {
			x: -2,
			y: 1,
			z: -2,
			materialId: "blue"
		}, {
			x: -2,
			y: 0.5,
			z: -1,
			sy: 2,
			materialId: "blue"
		}, {
			x: 0,
			y: 1,
			z: 0,
			materialId: "blue"
		}, {
			type: "tri",
			x: 1,
			y: 1,
			z: 0,
			rx: Math.PI,
			materialId: "blue"
		}, {
			type: "arc",
			x: 1,
			y: 0,
			materialId: "blue"
		}, {
			x: 3,
			z: 1,
			y: 1,
			materialId: "blue"
		}, {
			x: 4,
			z: 1,
			y: -0.5,
			sy: 2,
			materialId: "blue"
		}, {
			x: 3,
			z: 1,
			y: 1,
			materialId: "blue"
		}, {
			x: 4,
			z: 2.5,
			y: -2,
			sz: 2,
			materialId: "blue"
		}, {
			type: "arc",
			x: 4,
			z: 1,
			y: 1,
			rz: Math.PI,
			materialId: "blue"
		}, {
			type: "stair",
			x: 1,
			z: 0,
			y: 0,
			d: 3,
			height: 1,
			materialId: "blue"
		}, {
			type: "stair",
			x: 3,
			z: 3,
			y: -2,
			d: 3,
			height: 1,
			materialId: "blue"
		}, {
			x: 1,
			z: 2,
			y: -2,
			materialId: "blue"
		}]
	}],
	materials: {
		m0: {
			type: "L",
			color: 0x818b89
		},
		m00: {
			type: "L",
			color: 0x717b79
		},
		m1: {
			type: "L",
			color: 0x9ba4a3
		},
		m2: {
			type: "L",
			color: 0x77b0bb
		},
		m4: {
			type: "B",
			color: 0xffffff,
			opacity: 0,
			mapId: "img/null.png"
		},
		m5: {
			type: "L",
			color: 0x818b89,
			mapId: "img/endPoint.png"
		},
		red: {
			type: "L",
			color: 0xff0000,
		},
		blue: {
			type: "L",
			color: 0x0088ff,
		},
		green: {
			type: "L",
			color: 0x00ff00,
		}
	},
	textures: ["img/ias.png","img/path/texture0.jpg", "img/common/border.png", "img/common/border2.png", "img/null.png", "img/endPoint.png"],
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
		distance: 50,
		lookAt: {
			x: 0,
			y: 7,
			z: 0
		}
	},
	currentPath: 0,
	path0: {
		"p1": {
			id: "p1",
			y: 14.5,
			x: 20,
			z: 20,
			face: 0,
			neighbors: ["p2", "p5"],
			materialId: "m4"
		}
	},
	startPoint: "p1"
}