<?php

set_time_limit(300); // because processing maps can take a while
ini_set('memory_limit','512M'); // and use a lot of memory


include('inc.globals.php');
require('inc.functions.php');
echo '<script type="text/javascript" src="inc.functions.js" ></script>'; // used for submitting forms


if( !isset($_POST['compile']) )
{
    /*
     * First Page: Display maps which have been processed only
     *
     */
    
    // get a list of all maps which have been processed
    $maps = scanFileNameRecursivly($globalMapDir, $globalMapJSON);
    for($i=0; $i<count($maps); $i++)
    {
        $postSafePath = // needed to not lose slashes on next page
            str_replace('\\', "\\\\", $maps[$i]);
            
        echo $maps[$i].' found... ';
        echo '<input type="button" '.
             'value="Create tilesheet" '.
             'onClick="post_to_url( \'\', '. // post to same file ''
                '{ '.
                   '\'map\': \''.$postSafePath.'\' '.
             '} );"/> ';
        echo "<br>\n\n";
    }
    
    if(count($maps)>=1) // only offer to compile list if there are maps to read
    {
        echo '<input type="button" '.
            'value="Create tilesheets for all of the above" '.
            'onClick="post_to_url( \'\', '. // post to same file ''
               '{ '.
                   '\'map\': \'all\' '.
               '} );"/> ';
    }
}
else if(isset($_POST['map']))
{
    /*
     * Second Page: Create single or all mini-tilesheets from map JSON's
     *
     */
    
    $maps = array();
    
    // dump them all if map=='all'
    if(isset($_POST['map']) && $_POST['map']=='all')
        $maps = scanFileNameRecursivly($globalMapDir, $globalMapJSON);
    // or just do one map if one is specified
    else if(isset($_POST['map']))
        array_push($maps, $_POST['map']);
    
    // for each map JSON
    for($i=0; $i<count($maps); $i++)
    {
        // open json file
        if(file_exists($maps[$i]))
        {
            $mapJSON = file_get_contents($maps[$i]);
            if(!$mapJSON) die("Problem with ".$maps[$i]);
            
            $mapJSON = json_decode($mapJSON); // convert JSON into PHP
            
            // read through all tiles, adding them to an array
            foreach($mapJSON as $couldBeTiles) // traverse the stdClass Object
            {
                if(is_array($couldBeTiles)) // the tiles field, not the width/height fields
                {
                    for($j=0; $j<count($couldBeTiles); $j++)
                        // using hash for index so there are no duplicates
                        $tileIsUsed[ $couldBeTiles[$j] ] = true;
                    
                    // reporting
                    echo $maps[$i] . " contained ".count($couldBeTiles)." tiles... ";
                    
                    // prepare array for writing tilesheet
                    $tilesToWrite = array(); // stores unique tiles
                    if(count($tileIsUsed)>=1) // array of used-tiles is populated
                    {
                        // fetch hashes from index
                        foreach($tileIsUsed as $key => $value)
                            array_push($tilesToWrite, $key); // key is the tile's hash
                        
                        // load master tilesheet to read tiles from
                        $master = LoadPNG($globalMasterTilesheetFile);
                        $masterSize = getimagesize($globalMasterTilesheetFile;
                        $masterWidth = $masterSize[0];
                        $masterHeight = $masterSize[1];
                        // load master JSON containing hashes
                        $masterJSON = file_get_contents($globalMasterTilesheetJSON);
                        $masterJSON = json_decode($masterJSON);
                        // convert object into hash-indexed array
                        
                        
                        // get new tilesheet dimensions
                        $tilesheetWidthInTiles =
                            $globalMasterTilesheetWidth / $globalTilesize;
                        $tilesheetHeightInTiles =
                            ceil(count($tilesToWrite) / $tilesheetWidthInTiles);
                        
                        $newimg = // create empty tilesheet image
                            imagecreatetruecolor(
                                $tilesheetWidthInTiles * $globalTilesize,
                                $tilesheetHeightInTiles * $globalTilesize );
                            
                        $nextTile = 0; // used to traverse index of tiles array
                        // create tilesheet from array
                        for($y=0; $y<$tilesheetHeightInTiles; $y++)
                        {
                            for($x=0; $x<$tilesheetWidthInTiles; $x++)
                            {
                                // attempt to copy current tile into tilesheet
                                if(!imagecopy( 
                                    $newimg, // destination image
                                    $tile, // source image
                                    $x*$globalTilesize, $y*$globalTilesize, // x, y destination
                                    0, 0, // x, y source
                                    $globalTilesize, // copy width
                                    $globalTilesize // copy height
                                )) die( "".$tiles[$nextTile].' <b>failed</b>. '.
                                        'Could not copy tile.'  );
                            }
                        }
                        
                    }
                    else die("Array of tiles used in ".$maps[$i]." is empty.");
                }       
            }
        }
        else die("".$maps[$i]." does not exist."); // map JSON file doesn't exist
    }
}




?>