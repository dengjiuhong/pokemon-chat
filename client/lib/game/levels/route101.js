ig.module( 'game.levels.route101' )
.requires('impact.image','game.entities.exit','game.entities.exit','game.entities.sign','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass','game.entities.grass')
.defines(function(){
LevelRoute101=/*JSON[*/{"entities":[{"type":"EntityExit","x":272,"y":304,"settings":{"me":1,"goTo":2,"map":"Town"}},{"type":"EntityExit","x":288,"y":304,"settings":{"me":0,"goTo":1,"map":"Town"}},{"type":"EntitySign","x":192,"y":144,"settings":{"msg":"Hello"}},{"type":"EntityGrass","x":144,"y":32},{"type":"EntityGrass","x":144,"y":48},{"type":"EntityGrass","x":176,"y":32},{"type":"EntityGrass","x":160,"y":32},{"type":"EntityGrass","x":160,"y":48},{"type":"EntityGrass","x":176,"y":48},{"type":"EntityGrass","x":192,"y":48},{"type":"EntityGrass","x":128,"y":64},{"type":"EntityGrass","x":112,"y":64},{"type":"EntityGrass","x":160,"y":64},{"type":"EntityGrass","x":144,"y":64},{"type":"EntityGrass","x":176,"y":64},{"type":"EntityGrass","x":192,"y":64},{"type":"EntityGrass","x":112,"y":80},{"type":"EntityGrass","x":128,"y":80},{"type":"EntityGrass","x":144,"y":80},{"type":"EntityGrass","x":160,"y":80},{"type":"EntityGrass","x":176,"y":80},{"type":"EntityGrass","x":144,"y":96},{"type":"EntityGrass","x":160,"y":96},{"type":"EntityGrass","x":336,"y":32},{"type":"EntityGrass","x":320,"y":32},{"type":"EntityGrass","x":352,"y":32},{"type":"EntityGrass","x":304,"y":48},{"type":"EntityGrass","x":352,"y":48},{"type":"EntityGrass","x":336,"y":48},{"type":"EntityGrass","x":320,"y":48},{"type":"EntityGrass","x":304,"y":64},{"type":"EntityGrass","x":336,"y":64},{"type":"EntityGrass","x":320,"y":64},{"type":"EntityGrass","x":352,"y":64},{"type":"EntityGrass","x":368,"y":64},{"type":"EntityGrass","x":384,"y":64},{"type":"EntityGrass","x":304,"y":80},{"type":"EntityGrass","x":320,"y":80},{"type":"EntityGrass","x":336,"y":80},{"type":"EntityGrass","x":352,"y":80},{"type":"EntityGrass","x":384,"y":80},{"type":"EntityGrass","x":368,"y":80},{"type":"EntityGrass","x":320,"y":96},{"type":"EntityGrass","x":336,"y":96},{"type":"EntityGrass","x":352,"y":96},{"type":"EntityGrass","x":368,"y":96},{"type":"EntityGrass","x":320,"y":144},{"type":"EntityGrass","x":288,"y":160},{"type":"EntityGrass","x":336,"y":144},{"type":"EntityGrass","x":288,"y":176},{"type":"EntityGrass","x":304,"y":160},{"type":"EntityGrass","x":320,"y":160},{"type":"EntityGrass","x":352,"y":160},{"type":"EntityGrass","x":336,"y":160},{"type":"EntityGrass","x":304,"y":176},{"type":"EntityGrass","x":320,"y":176},{"type":"EntityGrass","x":336,"y":176},{"type":"EntityGrass","x":352,"y":176},{"type":"EntityGrass","x":368,"y":176},{"type":"EntityGrass","x":288,"y":192},{"type":"EntityGrass","x":304,"y":192},{"type":"EntityGrass","x":320,"y":192},{"type":"EntityGrass","x":336,"y":192},{"type":"EntityGrass","x":352,"y":192},{"type":"EntityGrass","x":368,"y":192},{"type":"EntityGrass","x":304,"y":208},{"type":"EntityGrass","x":320,"y":208},{"type":"EntityGrass","x":352,"y":208},{"type":"EntityGrass","x":336,"y":208},{"type":"EntityGrass","x":368,"y":208},{"type":"EntityGrass","x":336,"y":224},{"type":"EntityGrass","x":352,"y":224},{"type":"EntityGrass","x":336,"y":240},{"type":"EntityGrass","x":352,"y":240},{"type":"EntityGrass","x":144,"y":208},{"type":"EntityGrass","x":160,"y":208},{"type":"EntityGrass","x":112,"y":224},{"type":"EntityGrass","x":128,"y":224},{"type":"EntityGrass","x":144,"y":224},{"type":"EntityGrass","x":160,"y":224},{"type":"EntityGrass","x":176,"y":224},{"type":"EntityGrass","x":112,"y":240},{"type":"EntityGrass","x":128,"y":240},{"type":"EntityGrass","x":144,"y":240},{"type":"EntityGrass","x":160,"y":240},{"type":"EntityGrass","x":176,"y":240},{"type":"EntityGrass","x":192,"y":240},{"type":"EntityGrass","x":144,"y":256},{"type":"EntityGrass","x":160,"y":256},{"type":"EntityGrass","x":160,"y":272},{"type":"EntityGrass","x":192,"y":256},{"type":"EntityGrass","x":144,"y":272},{"type":"EntityGrass","x":176,"y":256},{"type":"EntityGrass","x":176,"y":272}],"layer":[{"name":"below","width":34,"height":20,"linkWithCollision":false,"visible":1,"tilesetName":"media/starter-towna.png","repeat":false,"preRender":false,"distance":"1","tilesize":16,"foreground":false,"data":[[470,469,470,469,470,469,470,469,470,469,470,469,470,469,470,473,474,475,2,469,470,469,470,469,470,469,470,469,470,469,470,469,470,469],[478,477,478,477,478,477,478,477,478,485,486,485,486,485,486,481,482,483,2,485,486,485,486,477,478,477,478,477,478,477,478,477,478,477],[470,469,470,469,470,469,470,469,470,14,14,14,2,2,2,2,2,2,2,2,14,14,14,469,470,469,470,469,470,469,470,469,470,469],[478,477,478,477,478,477,478,485,486,14,14,14,14,2,2,2,2,2,2,14,14,14,14,485,486,477,478,477,478,477,478,477,478,477],[470,469,470,469,470,469,470,14,14,14,14,14,14,2,2,2,2,2,2,14,14,14,14,14,14,469,470,469,470,469,470,469,470,469],[478,477,478,477,478,477,478,14,14,14,14,14,2,2,2,2,2,2,2,14,14,14,14,14,14,485,486,477,478,477,478,477,478,477],[470,469,470,469,470,469,470,469,470,14,14,2,2,111,136,136,136,215,469,470,14,14,14,14,2,2,2,469,470,469,470,469,470,469],[478,477,478,477,478,477,478,477,478,214,136,136,136,143,2,2,2,2,477,478,469,470,2,2,465,467,2,477,478,477,478,477,478,477],[470,469,470,469,470,469,470,469,470,2,2,2,2,2,2,2,2,2,469,470,485,486,2,465,474,475,2,469,470,469,470,469,470,469],[478,477,478,477,478,477,478,477,478,469,470,2,4,2,465,466,467,2,485,486,14,14,2,481,474,474,467,477,478,477,478,477,478,477],[470,469,470,469,470,469,470,469,470,485,486,2,465,466,474,474,475,2,14,14,14,14,14,2,481,474,475,469,470,469,470,469,470,469],[478,477,478,477,478,477,478,477,478,469,470,2,481,474,474,474,483,2,14,14,14,14,14,14,2,481,483,477,478,477,478,477,478,477],[470,469,470,469,470,469,470,469,470,485,486,2,2,481,482,483,2,2,14,14,14,14,14,14,2,2,2,469,470,469,470,469,470,469],[478,477,478,477,478,477,478,485,486,14,14,2,2,2,2,214,136,136,215,14,14,14,14,14,2,2,2,477,478,477,478,477,478,477],[470,469,470,469,470,469,470,14,14,14,14,14,2,2,2,2,2,2,2,469,470,14,14,2,2,469,470,469,470,469,470,469,470,469],[478,477,478,477,478,477,478,14,14,14,14,14,14,2,2,2,2,2,2,477,478,14,14,2,2,477,478,477,478,477,478,477,478,477],[470,469,470,469,470,469,470,469,470,14,14,14,14,2,2,2,2,2,2,469,470,469,470,469,470,469,470,469,470,469,470,469,470,469],[478,477,478,477,478,477,478,485,486,14,14,14,2,2,2,2,2,2,2,477,478,477,478,477,478,477,478,477,478,477,478,477,478,477],[470,469,470,469,470,469,470,469,470,469,470,469,470,469,470,469,470,2,2,469,470,469,470,469,470,469,470,469,470,469,470,469,470,469],[478,477,478,477,478,477,478,477,478,477,478,477,478,477,478,477,478,2,2,477,478,477,478,477,478,477,478,477,478,477,478,477,478,477]]},{"name":"above","width":34,"height":20,"linkWithCollision":false,"visible":1,"tilesetName":"media/starter-townb.png","repeat":false,"preRender":false,"distance":"1","tilesize":16,"foreground":true,"data":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,481,482,0,0,0,0,0,0,0,0,0,481,482,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,481,482,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,481,482,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,481,482,0,0,0,0,481,482,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,481,482,0,0,0,0,0,0,0,0,0,0,0,0,481,482,481,482,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,481,482,481,482,481,482,481,482,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},{"name":"collision","width":34,"height":20,"linkWithCollision":false,"visible":1,"tilesetName":"","repeat":false,"preRender":false,"distance":1,"tilesize":16,"foreground":true,"data":[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,0,0,0,0,1,23,23,23,23,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,23,23,23,23,1,0,0,0,0,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,23,23,23,23,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]}]}/*]JSON*/;
LevelRoute101Resources=[new ig.Image('media/starter-towna.png'), new ig.Image('media/starter-townb.png')];
});