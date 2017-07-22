var game={};
game.settings={
	blockSize:30
}

function startLevel(){
	
}

var gameWorld;
function initMap(){
	gameWorld=core.createLevelWorld();
	gameWorld.toMain();
	
//	gameWorld.camera.position.set(1000,1414,1000);
//	gameWorld.camera.lookAt(gameWorld.scene.position);
	$$.Controls.createOrbitControls({},gameWorld);
	
}
