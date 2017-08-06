var game={};
game.settings={
	blockSize:30,
	moveSpeed:300
}

function startLevel(){
	
}

var gameWorld;
function initMap(){
	gameWorld=core.createLevelWorld();
	gameWorld.toMain();
//	$$.Controls.createOrbitControls({},gameWorld);
//	gameWorld.camera.position.set(1000,1414,1000);
//	gameWorld.camera.lookAt(gameWorld.scene.position);
	
	$$.global.renderer.sortObjects = false;
}
