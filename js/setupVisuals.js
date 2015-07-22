

/* ------------------------------------------------------------------------------------------------------------------

setupKonvaCanvas()
placeScreenVisuals()


*/




/*
Used once in main to create all canvas variables.
*/
function setupKonvaCanvas() {
	stage = new Konva.Stage({
		width: cCanvasWidth,
		height: cCanvasHeight,
		container: 'topdiv'
	});

	backLayer = new Konva.Layer();
	stage.add(backLayer);

	midLayer = new Konva.Layer();
	stage.add(midLayer);

	frontLayer = new Konva.Layer();
	stage.add(frontLayer);

} //end setupKonvaCanvas

/*
One time call from main.
*/
function setupSpriteImageObjects() {
	allSpriteObjects = {};

	allSpriteObjects['player1'] = new Image();
	allSpriteObjects['player1'].src = 'assets/aircraft_1.png';


} //end setupSpriteImageObjects



/*
One time call from main.
*/
function setupMenuVisuals() {

	allMenuVisuals = {};
	allMenuVisuals.backLayer = {};
	allMenuVisuals.midLayer = {};
	allMenuVisuals.frontLayer = {};

	var amv = allMenuVisuals.backLayer;

	amv.title = new Konva.Text({
		text: 'Space Invaders',
		fontSize: 30,
		fontFamily: 'Arial',
		fill: 'greem'
	});
	amv.title.x( cCanvasWidth/2 - amv.title.getTextWidth()/2 );
	amv.title.y( cCanvasHeight * 0.1);

} //end setupMenuVisuals


/*
One time call from main.
*/
function setupGameVisuals() {

	allGameVisuals = {};
	allGameVisuals.backLayer = {};
	allGameVisuals.midLayer = {};
	allGameVisuals.frontLayer = {};

	var amv = allGameVisuals.backLayer;

	amv.title = new Konva.Text({
		text: 'In Game',
		fontSize: 30,
		fontFamily: 'Arial',
		fill: 'greem'
	});
	amv.title.x( cCanvasWidth/2 - amv.title.getTextWidth()/2 );
	amv.title.y( cCanvasHeight/2 - amv.title.getTextHeight()/2 );


	amv = allGameVisuals.midLayer();

	//create players
	for(var i = 0; i < 2; i++) {
		var dir;
		if(i == 0) {dir = 'left';} else { dir = 'right';}
		allPlayers.push( createPlayer(dir) );
		amv[ 'pGroup' + i ] = allPlayers[ allPlayers.length -1 ].vGroup;

		//need to figure out how to get bullets.
		for(var b = 0; b < allPlayers[ allPlayers.length -1 ].allBullets.length; b++) {
			amv['pbGroup' + i + b] = allPlayers[ allPlayers.length -1 ].allBullets[i].vGroup;
		}
	}

	//create invaders
	for(var i = 0; i < leftInvaders; i++) {
		allInvaders.push( createInvader(1) );
		amv[ 'invGroupL' + i ] = allInvaders[ allInvaders.length -1 ].vGroup;

		//need to figure out how to get bullets.
		for(var b = 0; b < allInvaders[ allInvaders.length -1 ].allBullets.length; b++) {
			amv['invbLGroup' + i + b] = allInvaders[ allInvaders.length -1 ].allBullets[i].vGroup;
		}
	}
	for(var i = 0; i < rightInvaders; i++) {
		allInvaders.push( createInvader(1) );
		amv[ 'invGroupR' + i ] = allInvaders[ allInvaders.length -1 ].vGroup;

		//need to figure out how to get bullets.
		for(var b = 0; b < allInvaders[ allInvaders.length -1 ].allBullets.length; b++) {
			amv['invbRGroup' + i + b] = allInvaders[ allInvaders.length -1 ].allBullets[i].vGroup;
		}
	}



} //end setupGameVisuals










/*------------------------------------------------------------------------------------------------------
Use to switch all visuals to specified visual object.
*/
function placeScreenVisuals( allScreenVisuals ) {
	removeAllChildrenFromLayers();

	if(debug) { console.log('---adding screen visuals--------------------------------------------------------------------'); }
	for ( var key in allScreenVisuals.backLayer ) {
		if(debug) { console.log( 'adding visual: ' + key ); }
		backLayer.add( allScreenVisuals.backLayer[key] );
	}
	for ( var key in allScreenVisuals.midLayer ) {
		if(debug) { console.log( 'adding visual: ' + key ); }
		midLayer.add( allScreenVisuals.midLayer[key] );
	}
	for ( var key in allScreenVisuals.frontLayer ) {
		if(debug) { console.log( 'adding visual: ' + key ); }
		frontLayer.add( allScreenVisuals.frontLayer[key] );
	}

} //end placeScreenVisuals


//------------------------------------------------------------------------------------------------------

function removeAllChildrenFromLayers() {
	backLayer.removeChildren();
	midLayer.removeChildren();
	frontLayer.removeChildren();
} //end removeAllChildrenFromLayers











