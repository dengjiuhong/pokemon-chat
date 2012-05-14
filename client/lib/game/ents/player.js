ig.module (
    
    'game.ents.player'
)

.requires(
    
    'impact.entity'
)
.defines(function(){
    
    
    
    
    
    
    
    
    var move = function(player)
    // instructs impact to move player
    // in the direction he's facing
    {
	switch(player.facing)
	{
	    case 'left':
		player.vel.x = -player.speed;
		break;
	    case 'right':
		player.vel.x = +player.speed;
		break;
	    case 'up':
		player.vel.y = -player.speed;
		break;
	    case 'down':
		player.vel.y = +player.speed;
		break;
	}
    };
    
    var alignToGrid = function(player)
    {
	switch(player.facing)
	{
	    case 'left':
	    case 'right':
		player.pos.x = player.destination;
		break;
	    case 'up':
	    case 'down':
		player.pos.y = player.destination;
		break;
	}
    };
    
    var setMoveDestination = function(player)
    {
	var tilesize = ig.game.collisionMap.tilesize;
	if(player.isJump) var distance = 2; else var distance = 1;
	
	switch(player.facing)
	{
	    case 'left':
		player.destination = player.pos.x - tilesize * distance;
		break;
	    case 'right':
		player.destination = player.pos.x + tilesize * distance;
		break;
	    case 'up':
		player.destination = player.pos.y - tilesize * distance;
		break;
	    case 'down':
		player.destination = player.pos.y + tilesize * distance;
		break;
	}
    };
    
    var goAgain = function(player)
    // decides if another move should take place
    // and either starts one or stops the player
    {
	if(player.isLocal) // is Player entity
	{
	    var keepMoving = true;
	    
	    // if key pressed, update direction and proceed with move
	    if(moveStillPressed('left'))         player.facing = 'left';
	    else if(moveStillPressed('right'))   player.facing = 'right';
	    else if(moveStillPressed('up'))      player.facing = 'up';
	    else if(moveStillPressed('down'))    player.facing = 'down';
	    else keepMoving = false; // no key pressed, stop moving

	    if(keepMoving && canJump(player))
	    {
		player.isMove = false; // will use isJump instead
		player.startJump();
	    }
	    else if(keepMoving && canMove(player)) preStartMove(player);
	    else
	    {
		// stop the player
		player.isMove = false;
		player.isJump = false;
		player.moveState = 'idle';
		player.lastState = 'idle';
		moveAnimStop(player);
		// tell other players we've stopped
		emitUpdateMoveState(player.pos.x, player.pos.y, player.facing, player.moveState);
	    }
	}
	else // is Otherplayer entity
	{
	    if(player.moveState=='idle')
	    {
		// stop the player
		player.isMove = false;
		player.isJump = false;
		moveAnimStop(player);
	    }
	    else
	    {
		if(canMove(player)) player.netStartMove();
	    }
	}
    }
    
    var finishMove = function(player) {
    
	// check if reached destination
	if(destinationReached(player)) {
	    
	    // ensure player is at legal coordinates
	    alignToGrid(player);
	    
	    // stop player
	    player.vel.x = player.vel.y = 0;
	    
	    // check if we should continue moving
	    goAgain(player);

	}
	// continue to destination
	else
	{
	    move(player);
	}  
    };
    
    var finishJump = function(player) {
    
	// update jump animation
	var jumpTime = player.jumpStart.delta();
	if(jumpTime >= 0 && jumpTime < (2/60)) player.offset.y = 16+4;
	else if(jumpTime >= (2/60) && jumpTime < (4/60)) player.offset.y = 16+6;
	else if(jumpTime >= (4/60) && jumpTime < (6/60)) player.offset.y = 16+8;
	else if(jumpTime >= (6/60) && jumpTime < (8/60)) player.offset.y = 16+10;
	else if(jumpTime >= (8/60) && jumpTime < (10/60)) player.offset.y = 16+12;
	else if(jumpTime >= (10/60) && jumpTime < (16/60)) player.offset.y = 16+14;
	else if(jumpTime >= (16/60) && jumpTime < (18/60)) player.offset.y = 16+12;
	else if(jumpTime >= (18/60) && jumpTime < (20/60)) player.offset.y = 16+10;
	else if(jumpTime >= (20/60) && jumpTime < (22/60)) player.offset.y = 16+8;
	else if(jumpTime >= (22/60) && jumpTime < (24/60)) player.offset.y = 16+6;
	else if(jumpTime >= (24/60) && jumpTime < (26/60)) player.offset.y = 16+4;
	else player.offset.y = 16+0;
	
	// check if reached destination
	if(destinationReached(player)) {
	    
	    player.isJump = false;
	    
	    // ensure player is at legal coordinates
	    alignToGrid(player);
	    
	    // stop player
	    player.vel.x = player.vel.y = 0;
	    
	    // check if we should continue moving
	    goAgain(player);
	    
	}
	// continue to destination
	else
	{
	    move(player);
	}  
    };
    
    var facingExit = function(player)
    // returns an exit entity if the player
    // is facing one
    {
	var vx = vy = 0;
	var tilesize = 16; // this should not be here!!
	switch(player.facing)
	{
	    case 'left':
		vx = -tilesize;
		break;
	    case 'right':
		vx = tilesize;
		break;
	    case 'up':
		vy = -tilesize;
		break;
	    case 'down':
		vy = tilesize;
		break;
	}
	// check for collision against an exit entity
	var doors = ig.game.getEntitiesByType( EntityExit );
	if(doors)
	{
	    for(var i=0; i<doors.length; i++)
	    {
		if( doors[i].pos.x == player.pos.x + vx &&
		    doors[i].pos.y == player.pos.y + vy )
		{
		    return doors[i];
		}
	    }
	}
	return false;
    }
    
    var overExit = function (player)
    // returns an exit entity if the player is standing
    // on one. else return false
    {
	// check for collision against an exit entity
	var exits = ig.game.getEntitiesByType( EntityExit );
	if(exits)
	{
	    for(var i=0; i<exits.length; i++)
	    {
		if( exits[i].pos.x == player.pos.x &&
		    exits[i].pos.y == player.pos.y &&
		    exits[i].type != 'door')
		{
		    return exits[i];
		}
	    }
	}
	return false;
    }
    
    var canMove = function(player)
    // returns true if no collision will occur
    // in the direction the player faces
    {
	var vx = vy = 0; // velocity
	var ox = oy = 0; // tile offset
	var tilesize = ig.game.collisionMap.tilesize;
	switch(player.facing)
	{
	    case 'left':
		vx = -1;
		ox = -tilesize;
		break;
	    case 'right':
		vx = 1;
		ox = tilesize;
		break;
	    case 'up':
		vy = -1;
		oy = -tilesize;
		break;
	    case 'down':
		vy = 1;
		oy = tilesize;
		break;
	}
	// check map collisions
	var res = ig.game.collisionMap.trace( player.pos.x, player.pos.y, vx, vy, player.size.x, player.size.y );
	if(res.collision.x || res.collision.y) return false;
	
	// check npc collisions
	var npcs = ig.game.getEntitiesByType( EntityNpc );
	if(npcs)
	{
	    for(var i=0; i<npcs.length; i++)
	    {
		if( (npcs[i].pos.x == player.pos.x + ox) &&
		       (npcs[i].pos.y == player.pos.y + oy) )
		{
		    return false;
		}
	    }
	}
	
	
	return true; // no collisions
    };
    
    var canJump = function(player)
    // returns true if faced tile is jumpable
    // otherwise false
    {
	var vx = 0;
	var vy = 0;
	var want = -1; // to match weltmeister one-way collision tiles
	var c = ig.game.collisionMap;
	var tilesize = ig.game.collisionMap.tilesize;
	switch(player.facing)
	{
	    case 'left':
		vx = -tilesize;
		want = 45;
		break;
	    case 'right':
		vx = tilesize;
		want = 34;
		break;
	    case 'up':
		vy = -tilesize;
		want = 12;
		break;
	    case 'down':
		vy = tilesize;
		want = 23;
		break;
	}
	var pX = player.pos.x + vx;
	var pY = player.pos.y + vy;
	if(c.getTile(pX,pY) == want) return true; // can jump
	return false; // no collisions
    };
    
    var moveAnimStop = function(player)
    // set animation to idle
    {
	switch(player.facing)
	{

	    case 'left':
		player.currentAnim = player.anims.idleleft;
		break;
	    case 'right':
		player.currentAnim = player.anims.idleright;
		break;
	    case 'up':
		player.currentAnim = player.anims.idleup;
		break;
	    case 'down':
		player.currentAnim = player.anims.idledown;
		break;
	};
    }
    
    var emitJump = function(x, y, direction)
    {
	socket.emit('receiveJump', x, y, direction);
    }
    
    var emitUpdateMoveState = function(x, y, direction, state)
    {
	socket.emit('receiveUpdateMoveState', x, y, direction, state);
    }
    
    var emitDirection = function(client,direction)
    // sends player.facing value to server
    {
	socket.emit('receiveDirection',client,direction);
    }
    
    var action = function(player)
    {
	var vx = vy = 0;
	    var tilesize = ig.game.collisionMap.tilesize;
	    switch(player.facing)
	    {
		case 'left':
		    vx = -tilesize;
		    break;
		case 'right':
		    vx = tilesize;
		    break;
		case 'up':
		    vy = -tilesize;
		    break;
		case 'down':
		    vy = tilesize;
		    break;
	    }
	
	// tries to read signs
	var signs = ig.game.getEntitiesByType( EntitySign );
	if(signs)
	{
	    for(var i=0; i<signs.length; i++)
	    {
		if( (signs[i].pos.x == player.pos.x + vx) &&
		       (signs[i].pos.y == player.pos.y + vy) )
		{
		    var bubbleDuration = 3; // magic numbers are bad!
		    ig.game.spawnEntity( EntityBubble, signs[i].pos.x, signs[i].pos.y,
		    {
			     msg: signs[i].msg,
			     lifespan: bubbleDuration 
		    } );
		}
	    }
	}
	
	// tries to read npc message
	var npcs = ig.game.getEntitiesByType( EntityNpc );
	if(npcs)
	{
	    for(var i=0; i<npcs.length; i++)
	    {
		if( (npcs[i].pos.x == player.pos.x + vx) &&
		       (npcs[i].pos.y == player.pos.y + vy) )
		{
		    // display chat bubble
		    var bubbleDuration = 3; // magic numbers are bad!
		    ig.game.spawnEntity( EntityBubble, npcs[i].pos.x, npcs[i].pos.y,
		    {
			     msg: npcs[i].msg,
			     lifespan: bubbleDuration // magic numbers are bad!
		    } );
		    npcs[i].moveTimer.set(bubbleDuration+1);
		    
		    ig.game.hideName(npcs[i].name, bubbleDuration);
		    
		    break;
		}
	    }
	}
    }
    
    var preStartMove = function(player)
    {
	var cancelMove = false;
		
	// handle floor-exit zoning
	var exit = overExit(player);
	if(exit && player.facing==exit.direction)
	{
	    exit.trigger(); // zone
	    cancelMove = true;
	}
	
	if(!cancelMove)
	{		    
	    // facing an exit
	    var exit = facingExit(player);
	    if(exit)
	    {
		// check if going through a door
		if(exit.type=='door')
		{
		    exit.startAnim();
		    // 22 frame wait @ 60 frames per second = 22/60 = 0.36666..sec
		    player.moveWhen = 336.7 + new Date().getTime();
		    player.moveWaiting = true;
		    player.moveDoor = exit;
		    cancelMove = true; // prevent player from starting to move too soon
		}
		// not a door
		else
		{
		    if(player.facing==exit.direction) exit.startAnim(); // approaching floor exit
		}
	    }
	
	    // if no exits have taken place, move
	    if(!cancelMove)
	    {
		player.startMove();
	    }
	}
    }
    
    var movePressed = function(player)
    {
	if(player.moveCommitDirection!=player.facing)
	{
	    // don't let player combine different keys for one commit
	    player.moveCommitPending = false;
	    player.moveCommitWhen = 0;
	}
	
	if(!player.moveCommitPending)
	{
	    // start pending commit for faced direction
	    player.moveCommitPending = true;
	    player.moveCommitDirection = player.facing;
	    
	    // next line only runs once per direction, skip delay if facing already
	    if(player.facingLast==player.facing) var delay = 0; else var delay = 80;
	    player.moveCommitWhen = new Date().getTime() + delay;
	}
	
	// player is now committed to (trying to) move
	if( new Date().getTime() - player.moveCommitWhen >= 0)
	{
	    player.moveCommitPending = false; // happening now, so now reset for next time
	    player.moveCommitWhen = 0; // reset for cleanness
	    
	    turnOffExitAnimations();
	    
	    if(canJump(player))
	    {
		player.startJump();
	    }
	    else if(canMove(player))
	    {
		preStartMove(player);
	    }
	    else
	    {
		console.debug("Trying to set slow walk...");
		// can't move, set slow walk animation
		switch(player.facing)
		{
		    case 'left':
			player.currentAnim = player.anims.slowleft;
			break;
		    case 'right':
			player.currentAnim = player.anims.slowright;
			break;
		    case 'up':
			player.currentAnim = player.anims.slowup;
			break;
		    case 'down':
			player.currentAnim = player.anims.slowdown;
			break;
		}
	    }
	}
	else // player has not yet committed to (trying to) move
	{
	    // if player changed faced direction
	    if(player.facing!=player.facingLast)
	    {
		emitDirection(player.name, player.facing); // inform others players
		player.facingLast = player.facing; // so we don't inform them again
		moveAnimStart(player, false); // step-animate the change
		
		// check if we are on an exit that needs animating
		var exit = overExit(player);
		if(exit)
		{
		    if(player.facing==exit.direction) exit.startAnim();
		    else exit.stopAnim();
		}
	    }
	}
    }
    
    var moveWait = function(player)
    {
	if(player.moveWaiting)
	{
	    if(new Date().getTime() - player.moveWhen >= 0)
	    {
		player.startMove();
		player.moveWaiting = false;
	    }
	}
    }
    
    var turnOffExitAnimations = function ()
    // turn off all exit animations
    {
	var exits = ig.game.getEntitiesByType( EntityExit );
	if(exits)
	{
	    for(var i=0; i<exits.length; i++)
	    {
		exits[i].stopAnim();
	    }
	}
    }
    
    var facingGrass = function(player)
    // returns a grass entity if player is facing one
    // otherwise returns false
    {
	var vx = vy = 0;
	var tilesize = ig.game.collisionMap.tilesize;
	switch(player.facing)
	{
	    case 'left':
		vx = -tilesize;
		break;
	    case 'right':
		vx = tilesize;
		break;
	    case 'up':
		vy = -tilesize;
		break;
	    case 'down':
		vy = tilesize;
		break;
	}
	// check for collision against grass entity
	var allGrass = ig.game.getEntitiesByType( EntityGrass );
	if(allGrass)
	{
	    for(var i=0; i<allGrass.length; i++)
	    {
		if( allGrass[i].pos.x == player.pos.x + vx &&
		    allGrass[i].pos.y == player.pos.y + vy )
		{
		    return allGrass[i];
		}
	    }
	}
	return false;
    }
    
    var inGrass = function(player)
    // returns a grass entity if player is in one
    // otherwise returns false
    {
	// check for collision against grass entity
	var allGrass = ig.game.getEntitiesByType( EntityGrass );
	if(allGrass)
	{
	    for(var i=0; i<allGrass.length; i++)
	    {
		if( allGrass[i].pos.x == player.pos.x &&
		    allGrass[i].pos.y == player.pos.y )
		{
		    return allGrass[i];
		}
	    }
	}
	return false;
    }
    
    var spawnShadow = function(player)
    {
	ig.game.spawnEntity( EntityJump, player.pos.x, player.pos.y,
			    {
			       direction: player.facing,
			    } );
    }

   
		//////////////////
		// EntityPlayer //
		//////////////////
		EntityPlayer = ig.Entity.extend({
		    
		    isLocal: true,
		    
		    speed: 69,
		    runSpeed: 138,
		    walkSpeed: 69,
		    jumpSpeed: 69,
		    maxVel: { x: 138, y: 138 },
		    moveState: 'idle', // idle, walk, run
		    
		    size: {x: 16, y: 16},
		    offset: { x: 0, y: 16 },
		    
		    type: ig.Entity.TYPE.A,
		    checkAgainst: ig.Entity.TYPE.NONE,
		    collides: ig.Entity.COLLIDES.PASSIVE,
		    animSheet: new ig.AnimationSheet( 'media/people/rs.boy.png', 16, 32 ),
		    
		    lastState: '', // used to only send network move updates if change occurs
	    
		    facing: '',
		    facingLast: '',
		    isMove: false, // waiting for move key-press
		    isJump: false,
		    leftFoot: true, // used to alternate step animations
		    destination: 0, // used for both x and y planes
		    moveWaiting: false, // used for waiting while a door opens
		    moveWhen: 0, // system time in ms to wait before moving
		    moveDoor: false, // contains exit entity to use after moveWhen
		    moveCommitPending: false, // helps decide whether to move or just change direction
		    moveCommitWhen: 0, // system time in ms when will commit to a move
		    moveCommitDirection: '',
		    
		    skin: 'labgeek',
		    
		    destinationReached: function()
		    // returns true if reached or past destination
		    // otherwise returns false
		    {
			switch(this.facing) {
			    case 'left':
				return this.pos.x<=this.destination;
				break;
			    case 'right':
				return this.pos.x>=this.destination;
				break;
			    case 'up':
				return this.pos.y<=this.destination;
				break;
			    case 'down':
				return this.pos.y>=this.destination;
				break;
			}
			return false;
		    },
		    
		    moveAnimStart: function(alternateFeet)
		    {
			switch(this.facing)
			{
			    case 'left':
				if(this.speed==this.walkSpeed)
				{
				    if(this.leftFoot) this.currentAnim = this.anims.walkLeftA;
				    else this.currentAnim = this.anims.walkLeftB;
				}
				else // assume he is running
				{
				    if(this.leftFoot) this.currentAnim = this.anims.runLeftA;
				    else this.currentAnim = this.anims.runLeftB;
				}
				break;
			    case 'right':
				if(this.speed==this.walkSpeed)
				{
				    if(this.leftFoot) this.currentAnim = this.anims.walkRightA;
				    else this.currentAnim = this.anims.walkRightB;
				}
				else // assume he is running
				{
				    if(this.leftFoot) this.currentAnim = this.anims.runRightA;
				    else this.currentAnim = this.anims.runRightB;
				}
				break;
			    case 'up':
				if(this.speed==this.walkSpeed)
				{
				    if(this.leftFoot) this.currentAnim = this.anims.walkUpA;
				    else this.currentAnim = this.anims.walkUpB;
				}
				else // assume he is running
				{
				    if(this.leftFoot) this.currentAnim = this.anims.runUpA;
				    else this.currentAnim = this.anims.runUpB;
				}
				break;
			    case 'down':
				if(this.speed==this.walkSpeed)
				{
				    if(this.leftFoot) this.currentAnim = this.anims.walkDownA;
				    else this.currentAnim = this.anims.walkDownB;
				}
				else // assume he is running
				{
				    if(this.leftFoot) this.currentAnim = this.anims.runDownA;
				    else this.currentAnim = this.anims.runDownB;
				}
				break;
			}
			if(alternateFeet) this.leftFoot = !this.leftFoot;
			this.currentAnim.rewind();
		    },
		    
		    moveAnimStop: function()
		    // set animation to idle
		    {
			switch(this.facing)
			{
		
			    case 'left':
				this.currentAnim = this.anims.idleleft;
				break;
			    case 'right':
				this.currentAnim = this.anims.idleright;
				break;
			    case 'up':
				this.currentAnim = this.anims.idleup;
				break;
			    case 'down':
				this.currentAnim = this.anims.idledown;
				break;
			};
		    },
		    
		    startMove: function()
		    {
			// determine speed (running or walking)
			if(ig.input.state('run'))
			{
			    this.moveState = 'run';
			    this.speed = this.runSpeed;
			}
			else
			{
			    this.moveState = 'walk';
			    this.speed = this.walkSpeed;
			}
			
			this.isMove = true;
			setMoveDestination(this);
			
			var newGrass = facingGrass(this);
			if(newGrass) newGrass.play();
			
			moveAnimStart(this, true);
			
			// send movement update only when change occurs
			if( this.facingLast != this.facing || this.lastState != this.moveState )
			{
			    emitUpdateMoveState(this.pos.x, this.pos.y, this.facing, this.moveState);
			    this.lastState  = this.moveState;
			}
			
			this.facingLast = this.facing;
		    },
		    
		    startJump: function()
		    {
			// determine speed
			this.moveState = 'jump';
			this.speed = this.jumpSpeed;
			
			this.isJump = true;
			this.jumpStart = new ig.Timer();
			spawnShadow(this);
			setMoveDestination(this);
				
			moveAnimStart(this, true);
			emitJump(this.pos.x, this.pos.y, this.facing);
			this.facingLast = this.facing;
		    },
		    
		    init: function( x, y, settings ) {
			this.parent( x, y, settings );
			
			// set players appearance
			this.reskin(this.skin);
		    },
		    
		    reskin: function()
		    {
			if(this.skin)
			{
			    switch(this.skin)
			    {
				// kind of like enum
				case 'boy':
				case 'girl':
				case 'fat':
				case 'kid':
				case 'labgeek':
				    this.animSheet = new ig.AnimationSheet( 'media/people/rs.' + this.skin + '.png', 16, 32 );
				    break;
				default:
				    this.animSheet = new ig.AnimationSheet( 'media/people/rs.boy.png', 16, 32 );
				    break;
			    }
			    // add the animations
			    this.addAnim( 'walkUpA', 0.13333, [2,0], true );
			    this.addAnim( 'walkUpB', 0.13333, [1,0], true );
			    this.addAnim( 'walkDownA', 0.13333, [14,12], true );
			    this.addAnim( 'walkDownB', 0.13333, [13,12], true );
			    this.addAnim( 'walkLeftA', 0.13333, [8,6], true );
			    this.addAnim( 'walkLeftB', 0.13333, [7,6], true );
			    this.addAnim( 'walkRightA', 0.13333, [8,6], true );
			    this.addAnim( 'walkRightB', 0.13333, [7,6], true );
			    this.addAnim( 'runUpA', 0.08333, [4,3], true );
			    this.addAnim( 'runUpB', 0.08333, [5,3], true );
			    this.addAnim( 'runDownA', 0.08333, [16,15], true );
			    this.addAnim( 'runDownB', 0.08333, [17,15], true );
			    this.addAnim( 'runLeftA', 0.08333, [10,9], true );
			    this.addAnim( 'runLeftB', 0.08333, [11,9], true );
			    this.addAnim( 'runRightA', 0.08333, [10,9], true );
			    this.addAnim( 'runRightB', 0.08333, [11,9], true );
			    this.addAnim( 'slowup', 0.26667, [2,0,1,0] );
			    this.addAnim( 'slowdown', 0.26667, [14,12,13,12] );
			    this.addAnim( 'slowleft', 0.26667, [8,6,7,6] );
			    this.addAnim( 'slowright', 0.26667, [8,6,7,6] );
			    this.addAnim( 'idleup', 0.1, [0], true );
			    this.addAnim( 'idledown', 0.1, [12], true );
			    this.addAnim( 'idleleft', 0.1, [6], true );
			    this.addAnim( 'idleright', 0.1, [6], true );
			    // flip right-facing animations
			    this.anims.walkRightA.flip.x = true;
			    this.anims.walkRightB.flip.x = true;
			    this.anims.runRightA.flip.x = true;
			    this.anims.runRightB.flip.x = true;
			    this.anims.slowright.flip.x = true;
			    this.anims.idleright.flip.x = true;
			    // set initial animation
			    moveAnimStop(this);
			}
		    },
		    
		    update: function() {
			
			this.zIndex = this.pos.y + 2;
			
			this.parent();
			
			// action (like reading a sign or talking to npc)
			if(ig.input.pressed('action') && !this.isMove)
			{
				action(this);	    
			}
			
			// handle zoning
			if(this.moveDoor && !this.moveWaiting && !this.isMove)
			{
			    // we just entered a door, so zone
			    this.moveDoor.trigger();
			}
			else
			{
			    /////////////////////
			    // Handle Movement //
			    /////////////////////
			    if(this.moveWaiting)
			    {
				// about to move
				console.debug("Waiting to move...");
				moveWait(this);
			    }
			    else if(this.isJump)
			    {
				// a move has already been started
				finishJump(this);
			    }
			    else if(this.isMove)
			    {
				// a move has already been started
				finishMove(this);
			    }
			    else if( ig.input.state('left') &&
				    !ig.input.state('right') )
			    {
				// if player is trying to move left
				this.facing = 'left';
				movePressed(this);
			    }
			    else if( ig.input.state('right') &&
				    !ig.input.state('left') )
			    {
				// if player is trying to move right
				this.facing = 'right';
				movePressed(this);
			    }
			    else if( ig.input.state('up')&&
				    !ig.input.state('down') )
			    {
				// if player is trying to move up
				this.facing = 'up';
				movePressed(this);
			    }
			    else if( ig.input.state('down') &&
				    !ig.input.state('up') )
			    {
				// if player is trying to move down
				this.facing = 'down';
				movePressed(this);
			    }
			    else
			    {
				
				// if player not trying to move, set to idle
				moveAnimStop(this);
				// keep all slow-walk animations reset
				this.anims.slowleft.rewind();
				this.anims.slowright.rewind();
				this.anims.slowup.rewind();
				this.anims.slowdown.rewind();
			    }
			}
	
			    
		    }
		});
 

///////////////////////
// EntityOtherPlayer //
///////////////////////

EntityOtherplayer = ig.Entity.extend({
	    
	    isLocal: false,
	    
	    size: {x: 16, y: 16},
	    offset: { x: 0, y: 16 },
	    type: ig.Entity.TYPE.B,
	    
	    speed: 69,
	    runSpeed: 138,
	    walkSpeed: 69,
	    jumpSpeed: 69,
	    maxVel: { x: 138, y: 138 },
	    moveState: 'idle', // idle, walk, run
	    
	    name: "otherplayer",
	    animation: 1,
	    
	    //checkAgainst: ig.Entity.TYPE.B,
	    collides: ig.Entity.COLLIDES.PASSIVE,
	    animSheet: new ig.AnimationSheet( 'media/people/rs.boy.png', 16, 32 ),
	    
	    facing: 'down',
	    isMove: false, // being animated or not
	    isJump: false, // used to time offsets in animation
	    leftFoot: true, // used to alternate step animations
	    destination: 0, // used for both x and y planes
	    
	    skin: 'boy',
	    
	    init: function( x, y, settings )
	    {
		this.parent( x, y, settings );
				
		this.reskin(this.skin);
		
		// create a name entity to follow this one
		ig.game.spawnEntity(
		    EntityName,
		    this.pos.x,
		    this.pos.y,
		    { follow: this.name, color: 'blue' }
		);
	    },
	    
	    reskin: function()
	    {
		if(this.skin)
		{
		    switch(this.skin)
		    {
			// kind of like enum
			case 'boy':
			case 'girl':
			case 'fat':
			case 'kid':
			case 'labgeek':
			    this.animSheet = new ig.AnimationSheet( 'media/people/rs.' + this.skin + '.png', 16, 32 );
			    break;
			default:
			    this.animSheet = new ig.AnimationSheet( 'media/people/rs.boy.png', 16, 32 );
			    break;
		    }
		    // add the animations
		    this.addAnim( 'walkUpA', 0.13333, [2,0], true );
		    this.addAnim( 'walkUpB', 0.13333, [1,0], true );
		    this.addAnim( 'walkDownA', 0.13333, [14,12], true );
		    this.addAnim( 'walkDownB', 0.13333, [13,12], true );
		    this.addAnim( 'walkLeftA', 0.13333, [8,6], true );
		    this.addAnim( 'walkLeftB', 0.13333, [7,6], true );
		    this.addAnim( 'walkRightA', 0.13333, [8,6], true );
		    this.addAnim( 'walkRightB', 0.13333, [7,6], true );
		    this.addAnim( 'runUpA', 0.08333, [4,3], true );
		    this.addAnim( 'runUpB', 0.08333, [5,3], true );
		    this.addAnim( 'runDownA', 0.08333, [16,15], true );
		    this.addAnim( 'runDownB', 0.08333, [17,15], true );
		    this.addAnim( 'runLeftA', 0.08333, [10,9], true );
		    this.addAnim( 'runLeftB', 0.08333, [11,9], true );
		    this.addAnim( 'runRightA', 0.08333, [10,9], true );
		    this.addAnim( 'runRightB', 0.08333, [11,9], true );
		    this.addAnim( 'idleup', 0.1, [0], true );
		    this.addAnim( 'idledown', 0.1, [12], true );
		    this.addAnim( 'idleleft', 0.1, [6], true );
		    this.addAnim( 'idleright', 0.1, [6], true );
		    // flip right-facing animations
		    this.anims.walkRightA.flip.x = true;
		    this.anims.walkRightB.flip.x = true;
		    this.anims.runRightA.flip.x = true;
		    this.anims.runRightB.flip.x = true;
		    this.anims.idleright.flip.x = true;
		    // set initial animation
		    moveAnimStop(this);
		}
	    },
	    
	    netStartMove: function()
	    {
		if(this.moveState=='idle') this.isMove = false;
		else
		{
		    // determine speed
		    if(this.moveState=='run') this.speed = this.runSpeed;
		    else if(this.moveState=='walk') this.speed = this.walkSpeed;
		    
		    // create grass effect
		    var newGrass = facingGrass(this);
		    if(newGrass) newGrass.play();
		    
		    this.isMove = true;
		    setMoveDestination(this);
		    moveAnimStart(this, true);
		}
	    },
	    
	    netStartJump: function()
	    {
		// determine speed
		this.moveState = 'jump';
		this.speed = this.jumpSpeed;
		
		this.isJump = true;
		this.jumpStart = new ig.Timer();
		spawnShadow(this);
		setMoveDestination(this);
			
		moveAnimStart(this, true);
	    },
	    
	    draw: function() {
		this.parent();
	    },
	    
	    update: function()
	    {
		this.zIndex = this.pos.y + 1;
		
		this.parent();
		
		// movement
		if(this.isJump)
		{
		    // a move has already been started
		    finishJump(this);
		}
		else if(this.isMove)
		{
		    finishMove(this);
		}
		else
		{
		    // keep animation consistent with this.facing
		    moveAnimStop(this);
		}

	    }
	    
	    
	    
});


    
})