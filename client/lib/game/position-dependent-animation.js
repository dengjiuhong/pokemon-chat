ig.module ('game.position-dependent-animation')
.requires('impact.animation')
.defines(function(){

	ig.PositionDependantAnimation = ig.Animation.extend({
	    draw: function( x, y ) {
	        
	        // Find the position of tile within the world
	        var posInMapX = x + ig.game.screen.x;
	        var posInMapY = y + ig.game.screen.y;

	        // How many tiles are to the left since last 'base animation'?
	        var frameOffsetX = (posInMapX/ig.game.collisionMap.tilesize) % (this.sequence.length - 1);
			
			// How many tiles are above since last 'base animation'?
			var frameOffsetY = (posInMapY/ig.game.collisionMap.tilesize) % (this.sequence.length - 1);
			
			// As frameOffsetY increases, shift animation left
			var frameOffset = frameOffsetX - frameOffsetY;
			if(frameOffset<0) frameOffset = (this.sequence.length - 1) + frameOffset;
			
			// Make the frame dependant on the world position (add frame offset)
	        var f = this.frame + frameOffset;
	        
	        // Select the tile, wrap for sequence.length
	        this.tile = this.sequence[ Math.floor(f) % this.sequence.length ];
	        
	        // Call original draw function
	        this.parent( x, y );
	    }
	});

})