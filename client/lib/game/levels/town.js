ig.module( 'game.levels.town' )
.requires('impact.image','game.entities.sign','game.entities.npc','game.entities.exit','game.entities.exit','game.entities.exit','game.entities.exit')
.defines(function(){
LevelTown=/*JSON[*/{"entities":[{"type":"EntitySign","x":208,"y":272,"settings":{"msg":"Welcome to the town."}},{"type":"EntityNpc","x":304,"y":208,"settings":{"msg":"The power of science is staggering!","name":"NPC","facing":"left","behaviour":"a"}},{"type":"EntityExit","x":224,"y":256,"settings":{"map":"Lab","me":0,"goTo":0,"isDoor":1,"direction":"up","type":"door"}},{"type":"EntityExit","x":288,"y":0,"settings":{"me":1,"goTo":0,"map":"Route101","direction":"up","type":"floor"}},{"type":"EntityExit","x":272,"y":0,"settings":{"me":2,"goTo":1,"map":"Route101","direction":"up","type":"floor"}},{"type":"EntityExit","x":272,"y":176,"settings":{"direction":"up","type":"floor"}}],"layer":[{"name":"below","width":34,"height":24,"linkWithCollision":false,"visible":1,"tilesetName":"media/starter-towna.png","repeat":false,"preRender":false,"distance":"1","tilesize":16,"foreground":false,"data":[[470,469,470,469,470,469,470,469,470,469,470,469,470,469,470,469,470,2,2,469,470,469,470,469,470,469,470,469,470,469,470,469,470,469],[478,477,478,477,478,477,478,477,478,485,486,485,486,485,486,485,488,2,2,487,486,485,486,485,486,477,478,477,478,477,478,477,478,477],[470,469,470,469,470,469,470,469,470,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,469,470,469,470,469,470,469,470,469],[478,477,478,477,478,477,478,485,488,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,487,486,477,478,477,478,477,478,477],[470,469,470,469,470,469,470,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,469,470,469,470,469,470,469],[478,477,478,477,478,477,478,2,2,2,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,2,2,477,478,477,478,477,478,477],[470,469,470,469,470,469,470,2,2,0,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0,2,2,469,470,469,470,469,470,469],[478,477,478,477,478,477,478,2,2,2,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,2,5,477,478,477,478,477,478,477],[470,469,470,469,470,469,470,5,2,2,0,0,0,0,4,2,2,2,2,4,2,0,0,0,0,5,2,469,470,469,470,469,470,469],[478,477,478,477,478,477,478,2,5,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5,477,478,477,478,477,478,477],[470,469,470,469,470,469,470,5,2,2,5,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5,2,469,470,469,470,469,470,469],[478,477,478,477,478,477,478,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,477,478,477,478,477,478,477],[470,469,470,469,470,469,470,2,2,2,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,469,470,469,470,469,470,469],[478,477,478,477,478,477,478,2,2,2,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,477,478,477,478,477,478,477],[470,469,470,469,470,469,470,2,2,2,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,469,470,469,470,469,470,469],[478,477,478,477,478,477,478,2,2,2,2,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,477,478,477,478,477,478,477],[470,469,470,469,470,469,470,2,2,2,2,0,0,0,0,0,0,2,2,2,2,2,2,2,2,471,470,469,470,469,470,469,470,469],[478,477,478,477,478,477,478,2,2,2,5,5,5,4,2,2,2,2,2,2,2,2,2,2,2,477,478,477,478,477,478,477,478,477],[470,469,470,469,470,469,470,469,472,2,5,5,5,2,2,2,2,2,2,2,2,2,2,471,470,469,470,469,470,469,470,469,470,469],[478,477,478,477,478,477,478,477,478,2,2,2,2,2,2,2,2,2,2,2,2,2,2,477,478,477,478,477,478,477,478,477,478,477],[470,469,470,469,470,469,470,469,470,469,470,469,470,469,470,469,470,469,470,469,470,469,470,469,470,469,470,469,470,469,470,469,470,469],[478,477,478,477,478,477,478,477,478,477,478,477,478,477,478,477,478,477,478,477,478,477,478,477,478,477,478,477,478,477,478,477,478,477],[470,469,470,469,470,469,470,469,470,469,470,469,470,469,470,469,470,469,470,469,470,469,470,469,470,469,470,469,470,469,470,469,470,469],[478,477,478,477,478,477,478,477,478,477,478,477,478,477,478,477,478,477,478,477,478,477,478,477,478,477,478,477,478,477,478,477,478,477]]},{"name":"buildings","width":32,"height":24,"linkWithCollision":false,"visible":1,"tilesetName":"media/starter-townb.png","repeat":false,"preRender":false,"distance":"1","tilesize":16,"foreground":false,"data":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,17,18,18,18,19,0,0,0,0,0,0,17,18,18,18,19,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,25,26,26,26,27,0,0,0,0,0,0,25,26,26,26,27,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,35,51,49,65,34,0,0,0,0,0,0,33,65,50,51,36,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,43,59,57,73,42,0,0,0,0,0,0,41,73,58,59,44,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,21,75,76,22,22,22,23,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,21,22,22,22,22,22,23,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,31,16,16,45,66,46,32,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,39,55,55,53,74,54,40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},{"name":"above","width":34,"height":24,"linkWithCollision":false,"visible":1,"tilesetName":"media/starter-townb.png","repeat":false,"preRender":false,"distance":"1","tilesize":16,"foreground":true,"data":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,9,10,10,10,11,0,0,0,0,0,0,9,10,10,10,11,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,13,67,68,14,14,14,15,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,481,482,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,481,482,0,0,0,0,0,0,0,0,0,0,0,0,0,0,481,482,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,481,482,481,482,481,482,481,482,481,482,481,482,481,482,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},{"name":"collision","width":34,"height":24,"linkWithCollision":false,"visible":1,"tilesetName":"","repeat":false,"preRender":false,"distance":1,"tilesize":16,"foreground":true,"data":[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,0,0,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,0,0,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,0,0,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,0,0,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,0,0,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,0,0,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,0,0,0,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]}]}/*]JSON*/;
LevelTownResources=[new ig.Image('media/starter-towna.png'), new ig.Image('media/starter-townb.png'), new ig.Image('media/starter-townb.png')];
});