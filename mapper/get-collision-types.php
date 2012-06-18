<?php

include('inc.globals.php');
require('inc.functions.php');


    if(!isset($_GET['go']))
    {
        echo 'Click <a href="?go=true">here</a> to write special tiles file.';
        die();
    }

    /*
     * List each collision type and the tiles that belong to each type.
     *
     */
    
    $interestedIn = array('grass', 'water', 'sandtrack', 'reflection', 'splash', 'ashgrass', 'tallgrass');

    // we'll need master tilesheet info to translate hashes into tile positions
    $masterTilesheetByHash = getTilesheetHashTable($globalMasterTilesheetJSON);

    // previously saved collisions will be needed
    $collisions = getCollisionsFromFile($globalCollisionsFile); // read from file
    $collisions = buildHashIndexCollisions($collisions); // use hashes as indexes
    
    // build array of collision types for easy lookup
    $collisionIndex = 0;
    $indexOfCollisionByName = array();
    $nameOfCollisionByIndex = array();
    foreach($globalCollisions as $collisionName => $collision)
    {
        $indexOfCollisionByName[$collisionName] = $collisionIndex;
        $nameOfCollisionByIndex[$collisionIndex] = $collisionName;
        $collisionIndex++;
    }

    // build array of all tiles and what collision types they belong to
    $tilesByCollisionType = array();
    foreach($collisions as $tileHash => $collisionType)
    {
        $currentCollisionName = $nameOfCollisionByIndex[$collisionType];
        if(in_array($currentCollisionName, $interestedIn))
        {
            if( !isset( $tilesByCollisionType[ $currentCollisionName ] ))
            {
                $tilesByCollisionType[ $currentCollisionName ] = array();
            }
            
            // Special case for reflection tiles, because their original tiles are on
            // a layer other than the primary map layer.
            if($currentCollisionName=='reflection') $tileHash = md5($tileHash);

            $tilePosInTilesheet = $masterTilesheetByHash[$tileHash] + $globalWMTileOffset; 
            array_push( $tilesByCollisionType[ $currentCollisionName ], $tilePosInTilesheet );
        }
    }

    // create JavaScript output
    $export =  'ig.module(\'game.special-tiles\')' . "\n" .
                '.requires()' . "\n" . 
                '.defines(function() {' . "\n";

        // create JavaScript object
        $export .=  'specialTiles = new Object();' . "\n";
        foreach($tilesByCollisionType as $collisionType => $tiles)
        {
            $tileIndex = 0;
            foreach($tiles as $tile)
            {
                if($tileIndex==0)
                    $export .= 'specialTiles.' . $collisionType . ' = new Array();' . "\n";
                $export .= 'specialTiles.' . $collisionType . '.push('.$tile.');' . "\n";
                $tileIndex++;
            }
        }
    $export .=  '})'; // close JavaScript output
    
    // Write output to a file.
    writeTextToFile($globalSpecialTilesJSON, $export);
    
?>