ig.module('game.entities.ash-puff')

.requires('impact.entity')

.defines(function() {

	EntityAshPuff = ig.Entity.extend({

		_wmIgnore: true,

		size: {
			x: 16,
			y: 16
		},

		// Should be higher than players and grass entities.
		zPriority: 7,

		// Load image resource.
		animSheet: new ig.AnimationSheet('media/rs.ash-puff.png', 16, 16),

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			// Tile 5 does not exist and so is used to add a few blank frames
			// to the start of the animation.
			this.addAnim('puff', (1 / 60), [5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], true);

			// Set current animation.
			this.currentAnim = this.anims.puff;

			this.zIndex = this.zPriority + this.pos.y;
		},

		update: function() {

			// Update animation frames.
			if (this.currentAnim != null) this.currentAnim.update();

			// Remove entity after animation finishes.
			if (this.currentAnim.loopCount >= 1) this.kill();
		}

	});
});