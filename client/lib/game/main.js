ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',

	'game.background-animations',
	'game.position-dependent-animation',
	'game.update-border',
	'game.special-tiles',
	
	// Levels
	//'game.levels.test',
	// /*
	'game.levels.town',
	'game.levels.route101',
	'game.levels.lab',
	'game.levels.birchdownstairs',
	'game.levels.birchupstairs',
	'game.levels.homedownstairs',
	'game.levels.homeupstairs',
	// */

	// Entities
	'game.entities.grass',
	'game.entities.exit',
	'game.entities.npc',
	'game.entities.sign',
	'game.entities.non-weltmeister.player',
	'game.entities.non-weltmeister.local-player',
	'game.entities.non-weltmeister.network-player',
	'game.entities.non-weltmeister.bubble',
	'game.entities.non-weltmeister.name',
	'game.entities.non-weltmeister.jump',
	'game.entities.non-weltmeister.surf',

	//debug
	'impact.debug.debug',
	'plugins.debug_display' // require the debug display plugin
)
.defines(function(){

MyGame = ig.Game.extend({
	
	capitaliseFirstLetter: function(string)
	{
	    return string.charAt(0).toUpperCase() + string.slice(1);
	},

	/*
	 * Returns true if any tiles within 'tiles' are found at x, y 
	 * on the map layer named 'layer'.
	 *
	 * @param  x     int Position on x-axis in tiles.
	 * @param  y     int Position on y-axis in tiles.
	 * @param  tiles array Tiles to check for.
	 * @param  layer string Name of layer containing tile.
	 * @return bool	 true if tile is queried type, else false.
	 */
	isSpecialTile: function(x, y, tiles, layer)
	{
		// Search all map layers.
		for (var i = 0; i < this.backgroundMaps.length; i++) {

			// Find the layer with the correct name.
			if (this.backgroundMaps[i].name == layer) {
				
				// Try all tiles for a match.
				for (var j = 0; j < tiles.length; j++)
				{
					if (tiles[j] == this.backgroundMaps[i]['data'][y][x]) return true;
				}
				break; // No need to search further.
			}
		}
		return false;
	},
	
	autoSort: true,
	whiteFont: new ig.Font( 'media/font.white.with.shadow.png' ),
	events: new Array(), // contains game events such as player entering area
	eventsMax: 4, // max events to display on screen
	eventsTimer: null, // used for pruning old events
	eventsLifespan: 2, // time in seconds before clearing event
	
	hideName: function(name, seconds)
	// hides the name supplied as param for
	// supplied param seconds of time
	{
	    var names = ig.game.getEntitiesByType( EntityName );
	    if(names)
	    {
		for(var j=0; j<names.length; j++)
		{
		    if(names[j].follow == name)
		    {
			names[j].hideTimer.set(seconds);
		    }
		}
	    }
	},
	
	defaultLevel: LevelTown,
	defaultXStart: 256,
	defaultYStart: 256,
	defaultFacing: 'down',
	lastSkin: 'boy', // used when rebuilding the player
	goTo: null, // used to know where to place player when zoning
	mapName: 'Town', // must capitalize first letter
	//playerFirstBuild: true, // false after initial position is read from database
	zone: function(map, goTo) // used to change maps
	{
		this.goTo = goTo;
		this.mapName = map;
		this.leaveZone();
		this.loadLevelDeferred( ig.global['Level'+map] );
	},
	leaveZone: function ()
	{
		socket.emit('playerLeaveZone');	
	},
	buildPlayer: function()
	{
		var x = 0
		var y = 0
		var direction = 'right'; // should never stay this way in-game
		var exitAnimation = false;
		
		if(this.goTo==null)
		{
			console.debug("First time building player.");
			// first time drawing player, use defaults
			x = this.defaultXStart;
			y = this.defaultYStart;
			direction = this.defaultFacing;
		}
		else
		{
			console.debug("Rebuilding player using map exit values.");
			// find coordinates from goTo
			var exits = ig.game.getEntitiesByType( EntityExit );
			if(EntityExit)
			{
			    for(var i=0; i<exits.length; i++)
			    {
				if(exits[i].me==this.goTo)
				{
				    if(exits[i].type == 'door')
				    {
					 exitAnimation = true;
					 direction = 'down';
				    }
				    else direction = 'up';
				    x = exits[i].pos.x;
				    y = exits[i].pos.y;
				}
			    }
			}
			this.goTo = null; // reset
		    
		}
		
		if(exitAnimation) // walking out the door
		{
			return ig.game.spawnEntity( EntityLocalPlayer, x, y, // magic numbers = bad
			{
				 name: username,
				 facing: direction,
				 moveWaiting: true,
				 moveWhen: 336.7 + new Date().getTime(),
				 skin: this.lastSkin
			} );
		}
		else
		{
			return ig.game.spawnEntity( EntityLocalPlayer, x, y, // magic numbers = bad
			{
				 name: username,
				 facing: direction,
				 skin: this.lastSkin
			} );
		}
		
	},
	
	// Chat system
		// html elements
		inputFieldId: 'input', // id of HTML element
		
		//allowInput: true,
		inputActive: false,
		//lastInput: new Date().getTime(),
		emitSay: function(client, msg) { socket.emit('receiveSay',client,msg); },
		emitTell: function(to, msg) { socket.emit('receiveTell',to,msg); },
		emitReskin: function(skin) { socket.emit('receiveReskin',skin); },
		chatInputOff: function(game)
		{
			// check if anything has been typed
			var inputVal = $('#'+game.inputFieldId).val();
			if(inputVal!='')
			{
				// if so
				var player = this.getEntitiesByType( EntityLocalPlayer )[0];
				
				// check for command flag
				if(inputVal.substr(0,1)=='/')
				{
					var explodeInput = inputVal.split(' ');
					
					// check for private message /tell or /t
					if(explodeInput[0]=='/tell'
					   || explodeInput[0]=='/t')
					{
						var to = explodeInput[1]; // send to who
						var msg = ''; // message to send
						for(i=2; i<explodeInput.length; i++) msg += explodeInput[i];
						game.emitTell( to, msg ); // send message to other players
					}
					else if(explodeInput[0]=='/say'
					   || explodeInput[0]=='/s')
					{
						// strip away the command and space
						if(inputVal.substr(0,4)=='/say') inputVal = inputVal.substr(5, inputVal.length-5); // either remove '/say '
						else inputVal = inputVal.substr(3, inputVal.length-3); // or remove '/s '
						this.emitSay( player.name, inputVal ); // send message to other players
						// display message locally
						ig.game.spawnEntity(
							EntityBubble,
							player.pos.x,
							player.pos.y,
							{
								from: player.name,
								msg: inputVal,
								lifespan: 2
							}
						);
					}
					else if(explodeInput[0]=='/skin')
					{
						var skin = explodeInput[1]; // name of skin
						game.emitReskin(skin);
						player.skin = skin;
						player.reskin();
						game.lastSkin = skin;
					
					}
					
					// regular message /say or /s
				}
				else // assume it's a /say
				{
					this.emitSay( player.name, inputVal ); // send message to other players
					// display message locally
					ig.game.spawnEntity(
						EntityBubble,
						player.pos.x,
						player.pos.y,
						{
							from: player.name,
							msg: inputVal,
							lifespan: 2
						}
					);
				}
				
								
			}
			$('#'+game.inputFieldId).val(''); // reset
			$('#'+game.inputFieldId).hide();
			//$('#canvas').focus();
			//game.lastInput = new Date().getTime();
			//game.allowInput = false;
			game.inputActive = false;
		},
		
		
	
	
	init: function() {
		
		// create a new DebugDisplay, pass in your font
                this.debugDisplay = new DebugDisplay( this.whiteFont );
		
		// start talking with network
		socket.emit('init',username);
		
		// controls
		ig.input.bind( ig.KEY.A, 'left' );
		ig.input.bind( ig.KEY.D, 'right' );
		ig.input.bind( ig.KEY.W, 'up' );
		ig.input.bind( ig.KEY.S, 'down' );
		ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
		ig.input.bind( ig.KEY.UP_ARROW, 'up' );
		ig.input.bind( ig.KEY.DOWN_ARROW, 'down' );
		ig.input.bind( ig.KEY.ENTER, 'chatToggle' );
		ig.input.bind( ig.KEY.R, 'chatReply' );
		ig.input.bind( ig.KEY.Z, 'action' );
		ig.input.bind( ig.KEY.X, 'run');
		
		
		// set up map animations
		
			// flower animation from earlier version
			var as = new ig.AnimationSheet( 'media/bg-flower.png', 16, 16 );
			this.backgroundAnims = {
			    'media/starter-towna.png': {
				// flower
				4: new ig.Animation( as, 0.26667, [0,1,0,2] ) // 16 frames out of 60 per
			    }
			};
			
			// generated animations from mapper
			initBackgroundAnimations();
  		
		this.loadLevel (this.defaultLevel);

		// build player
		var player = this.buildPlayer();
		updateBorder(player);
		
		// add tab index to canvas to ensure it
		// retains focus (needed in Chrome!)
		$("#canvas").attr("tabindex", "0")
		
		// logic for submitting inputted text
		$('#'+this.inputFieldId).bind('keypress', function(e) {
			var code = (e.keyCode ? e.keyCode : e.which);
			if(code == 13) { //Enter keycode
				ig.game.chatInputOff(ig.game);
				$('#canvas').focus();
			}
		});
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		// rebuild player when loadLevel deletes it
		if(!this.getEntitiesByType( EntityLocalPlayer )[0])
		{
			var player = this.buildPlayer();
			console.debug("Player does not exist. Adding one.");
		}
		
		// screen positioning
		var player = this.getEntitiesByType( EntityLocalPlayer )[0];
		if( player ) {
			this.screen.x = player.pos.x - ig.system.width/2 + player.size.x/2;
			this.screen.y = player.pos.y - ig.system.height/2;
			
			// allow player to approach the edge of the map
			// without exposing where no tiles exists
			
			if(ig.system.width / this.collisionMap.tilesize <= this.collisionMap.width)
			{
				var howCloseLeft = 7; // how close player can go to left of map without seeing past
				if(player.pos.x <= (howCloseLeft*16)) this.screen.x = 0;
				if(player.pos.x >= this.collisionMap.width * this.collisionMap.tilesize - (howCloseLeft+1)*this.collisionMap.tilesize )
					this.screen.x = this.collisionMap.width * this.collisionMap.tilesize - ig.system.width;
			}
			if(ig.system.height / this.collisionMap.tilesize <= this.collisionMap.width)
			{
				var howCloseTop = 5; // how close player can get to top of map without seeing past
				if(player.pos.y <= (howCloseTop*16)) this.screen.y = 0; 
				if(player.pos.y >= this.collisionMap.height * this.collisionMap.tilesize - howCloseTop*this.collisionMap.tilesize )
					this.screen.y = this.collisionMap.height * this.collisionMap.tilesize - ig.system.height;
			}
			
			
		}
		
		// Check for player wanting to chat
		if(ig.input.pressed('chatToggle'))
		{
			//if(new Date().getTime() - this.lastInput > 200) this.allowInput = true;
			//this.allowInput = true;
			if(!this.inputActive)
			//if(!$('#input').is(":visible") && this.allowInput)
			// if input is hidden and allowed to open chat
			{
				
				$('#input').fadeIn(100);
				$('#input').focus();
				//this.lastInput = new Date().getTime();
				this.inputActive = true;
			}
			/*
			else
			//else if($('#input').is(":visible") && this.allowInput)
			// while its showing and allowed to close chat
			{
				this.chatInputOff(this);
			}
			*/
		}
		
		// prune the events array
		if(this.events.length>0)
		{
			if(this.eventsTimer==null)
			{
				this.eventsTimer = new ig.Timer();
				this.eventsTimer.set(this.eventsLifespan);
			}
			else if(this.eventsTimer.delta()>=0)
			{
				// prune oldest
				this.events.splice(0, 1);
				this.eventsTimer = null;
			}
			
			// if after that the events.length still
			// exceeds the maximum, prune to size
			while(this.events.length>this.eventsMax)
				this.events.splice(0, 1);
		}
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		// draw these certain entities above any and all map layers
		var names = this.getEntitiesByType( EntityName );
		if(names)
		{
			for(var i=0; i<names.length; i++)
			{
				names[i].draw(true);
			}
		}
		var bubbles = this.getEntitiesByType( EntityBubble );
		if(bubbles)
		{
			for(var i=0; i<bubbles.length; i++)
			{
				bubbles[i].draw(true);
			}
		}
		
		// write game events to screen
		var printEvents = '';
		for(var i=0; i<this.events.length; i++)
		{
			if(i==0) var space = ''; else var space = "\n"; 
			printEvents += space + this.events[i];
		}
		this.whiteFont.draw(printEvents, 3, 3, ig.Font.ALIGN.LEFT);
		
		// write FPS
		this.whiteFont.draw(
			'ARROWS move, Z action, X run, ENTER chat',
			ig.system.width/2,
			ig.system.height-10,
			ig.Font.ALIGN.CENTER
		);
		
        if(username=="Joncom")
		{
			this.debugDisplay.draw(
				[
					'ig.game.screen.x = ' + ig.game.screen.x,
					'ig.game.screen.y = ' + ig.game.screen.y
				], // will display each array element on a new line
				true, // true or false to either show the FPS
				false, // true or false to show the average FPS over a period of time
				10000, // amount of of time between samples. defaults to 10000 (10 seconds)
				100 // amount of samples to take over time. defaults to 500
			);

			// disable collisions
			ig.CollisionMap.inject({
			    trace: function( x, y, vx, vy, objectWidth, objectHeight ) {
			        // Return a dummy trace result, indicating that the object
			        // did not collide
			        return {
			            collision: {x: false, y: false},
			            pos: {x: x+vx, y: y+vy},
			            tile: {x: 0, y: 0}
			        };
			    }
			});
		}
	}
});

// Start the Game with 60fps, a resolution of 240x160, scaled
// up by a factor of 2
// Use the ig.ImpactSplashLoader class as the preloader
ig.main( '#canvas', MyGame, 60, 360, 240, 2, ig.ImpactSplashLoader );

});
