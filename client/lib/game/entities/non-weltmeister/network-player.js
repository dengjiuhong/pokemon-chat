ig.module(

'game.entities.non-weltmeister.network-player')

.requires(

'game.entities.non-weltmeister.player').defines(function() {

	EntityNetworkPlayer = EntityPlayer.extend({
		
		// Priority relative to other entities.
		zPriority: 1,

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			// Set the players skin.
			this.reskin(this.skin);

			// Needed for passing a persistent reference of self into functions.
			var player = this;

			// Spawn a NameEntity to follow this player.
			ig.game.spawnEntity(
			EntityName, this.pos.x, this.pos.y, {
				name: this.name + "NameEntity",
				follow: player,
				color: 'blue'
			});
			
			// Some player changed his movement state.
			socket.on('moveUpdateOtherPlayer-' + this.name, function(x, y, direction, state) {
				player.vel.x = 0;
				player.vel.y = 0;
				player.pos.x = x;
				player.pos.y = y;
				player.facing = direction;
				player.moveState = state;
				player.startMove();
			});

			// Some player faced a new direction.
			socket.on('updateOtherPlayer-' + this.name, function(direction) {
				player.facing = direction;
			});

			// A player jumped a ledge.
			socket.on('otherPlayerJump-' + this.name, function(x, y, direction) {
				player.vel.x = 0;
				player.vel.y = 0;
				player.pos.x = x;
				player.pos.y = y;
				player.facing = direction;
				player.moveState = 'jump';
				player.netStartJump();
			});

			// A player set his skin.
			socket.on('reskinOtherPlayer-' + this.name, function(skin) {
				player.skin = skin;
				player.reskin();
			});

			// A player disconnected or left the area.
			socket.on('dropPlayer-' + this.name, function() {
				ig.game.events.push(player.name + " left the area.");
				player.kill();
			});

		},

		continueOrStop: function()
		// determines if player will continue moving or stop
		{
			if (this.moveState == 'idle') {
				// stop
				this.isMove = false;
				this.isJump = false;
				this.moveAnimStop();
			} else {
				if (this.canMove()) this.startMove();
			}
		},

		startMove: function() {
			if (this.moveState == 'idle') this.isMove = false;
			else {
				// determine speed
				if (this.moveState == 'run') this.speed = this.runSpeed;
				else if (this.moveState == 'walk') this.speed = this.walkSpeed;

				// Spawn new grass entity if needed.
				var newGrass = this.trySpawningGrass();
				if (newGrass) newGrass.play();

				// Remove old grass entity if leaving one.
				var oldGrass = this.inGrass();
				if (oldGrass) oldGrass.markForDeath();

				this.isMove = true;
				this.setMoveDestination();
				this.moveAnimStart(true);
			}
		},

		netStartJump: function() {
			// determine speed
			this.moveState = 'jump';
			this.speed = this.jumpSpeed;

			this.isJump = true;
			this.jumpStart = new ig.Timer();
			this.spawnShadow();
			this.setMoveDestination();

			this.moveAnimStart();
		},

		update: function() {
			this.parent();

			// movement
			if (this.isJump || this.isMove) {
				this.finishMove();
			} else {
				// keep animation consistent with this.facing
				this.moveAnimStop();
			}
		}


	});
})
