/* Do the splash and jump entities share enough in common to share a single parent entity? */

ig.module('game.entities.non-weltmeister.splash')

.requires('impact.entity')

.defines(function() {

	EntitySplash = ig.Entity.extend({

		size: {
			x: 16,
			y: 16
		},

		offset: {
			x: 0,
			y: -8
		},

		// Used for fetching position.
		player: null,

		// Load image resource.
		animSheet: new ig.AnimationSheet('media/rs.splash.png', 16, 8),

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			// Define animation sequence.
			this.addAnim('spritz', (2 / 60), [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1]);

			// Set current animation.
			this.currentAnim = this.anims.spritz;
		},

		draw: function() {

			// Follow the player.
			this.pos = this.player.pos;

			this.parent();
		}

	});
});
