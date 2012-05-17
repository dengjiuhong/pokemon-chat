<?php

include('inc.globals.php');
require('required.php');

?>

<html>
    <head>
        <script type="text/javascript" src="http://code.jquery.com/jquery-1.4.2.js" ></script>
    </head>
    <body>
        
<?php

if( !isset($_GET['ts']) && !isset($_POST['tiles']) )
{ 
    /*
     * First Page: Select a tilesheet
     *
     */
    
    // get a list of all tilesheets
    $tilesheets = findTilesheets($globalMapDir);
    
    // start html form
    echo '<form method="get">';
    
    // echo html form element
    echo '<select name="ts" multiple="multiple">' . "\n";
        for($i=0; $i<count($tilesheets); $i++)
        {
            $explode = explode('\\', $tilesheets[$i]);
            $fileName = $explode[count($explode)-1];
            $dirName = $explode[count($explode)-2];
            if($i==0) $selected = 'selected="selected" '; else $selected = '';
            echo '<option '.$selected.'value="'.$tilesheets[$i].'">'.$dirName.'</option>' . "\n";
        }
        echo '</select>';
    
    // echo load button
    echo '<br>';
    echo '<input type="submit">';
    
    // end html form
    echo '</form>';
}
else if( isset($_GET['ts']) )
{
    /*
     * Second Page: Display tilesheet
     *
     */
    
    // create save button
    echo '<input type="button" value="Save" onclick="save();" '.
         'style="position: absolute; top: 0; left: 0;" />';
    
    $ts = $_GET['ts'];
    
    $size = getimagesize($ts);
    $width = $size[0]; // width in px of tilesheet
    $height = $size[1]; // height in px of tilesheet
    $widthInTiles = $width/$globalTilesize;
    $heightInTiles = $height/$globalTilesize;
    
    // load tilesheet for grabbing hashes
    $tilesheet = LoadPNG($ts);
    
    // comment slashes so background image loads
    $ts = str_replace('\\', "\\\\", $ts);
    
    // create tiles javascript object
    echo "\n\n" . '<!-- creating tile hash values -->' ."\n";
    echo '<script type="text/javascript">' ."\n";
    echo 'var tiles = new Object();'."\n";
    for($x=0; $x<$widthInTiles; $x++)
    {
        echo 'tiles['.$x.'] = new Object();'."\n";
        for($y=0; $y<$heightInTiles; $y++)
        {
            echo 'tiles['.$x.']['.$y.'] = new Object();'."\n";
            echo 'tiles['.$x.']['.$y.'].hash = "'.getTile($tilesheet, $globalTilesize, $x, $y).'";'."\n";
            echo 'tiles['.$x.']['.$y.'].collision = 0;';
        }
    }
    echo '</script>' ."\n";
    echo '<!-- ending tile hash values -->' ."\n\n";
    
    // create main tilesheet div w/ bg
    echo '<div style="'.
        'background: url(\''.$ts.'\'); '.
        'position: absolute; '.
        'left: 0px; '.
        'top: 28px; '.
        'width: '.$width.'px;'.
        'height: '.$height.'px;'.
        '">' ."\n";
    
        // fill with many tile-sized divs
        for($y=0; $y<$heightInTiles; $y++)
        {
            for($x=0; $x<$widthInTiles; $x++)
            {
                echo '<div '.
                        'style="'.
                            'background: none; '.
                            'width: '.$globalTilesize.'px; '.
                            'height: '.$globalTilesize.'px; '.
                            'position: absolute; '.
                            'left: '.($x*$globalTilesize).'px; '.
                            'top: '.($y*$globalTilesize).'px; '.
                        
                        '" id="x'.$x.'y'.$y.'"'.
                            
                        /*'" onClick="'.
                            'window.alert(\'You clicked '.$x.', '.$y.'\');'.*/
                        
                        '" onClick="'.
                            'tileClicked('.$x.','.$y.');'.
                            
                        '" onmouseover="'.
                            'tileOver('.$x.','.$y.');'.
                            //'$(\'#x'.$x.'y'.$y.'\').css(\'background-image\', \'url(images/mouseover.png)\');'.
                            
                        '" onmouseout="'.
                            'tileOut('.$x.','.$y.');'.
                            //'$(\'#x'.$x.'y'.$y.'\').css(\'background\', \'none\');'.
                        
                        '"></div>' . "\n";
            }
        }
    
    
    echo '</div>'; // close main tilesheet div
    
    
}
else
{
    /*
     * Third Page: Write tile hashes and collision data to file
     *
     */
    
    echo "I found the following data: \n" . $_POST['tiles'];
}

?>


<script type="text/javascript">
    
    function post_to_url(path, params, method) {
        method = method || "post"; // Set method to post by default, if not specified.
    
        // The rest of this code assumes you are not using a library.
        // It can be made less wordy if you use one.
        var form = document.createElement("form");
        form.setAttribute("method", method);
        form.setAttribute("action", path);
    
        for(var key in params) {
            if(params.hasOwnProperty(key)) {
                var hiddenField = document.createElement("input");
                hiddenField.setAttribute("type", "hidden");
                hiddenField.setAttribute("name", key);
                hiddenField.setAttribute("value", params[key]);
    
                form.appendChild(hiddenField);
             }
        }
    
        document.body.appendChild(form);
        form.submit();
    }
    
    
    var collisionTypes = new Array();
    collisionTypes.push(<?php echo $collisionWalkable ?>);
    collisionTypes.push(<?php echo $collisionNoWalk ?>); 
    collisionTypes.push(<?php echo $collisionLeft ?>); 
    collisionTypes.push(<?php echo $collisionRight ?>); 
    collisionTypes.push(<?php echo $collisionUp ?>); 
    collisionTypes.push(<?php echo $collisionDown ?>);
    
    var save = function()
    {
        var dump = '';
        for(var x in tiles)
        {
            for(var y in tiles[x])
            {
                if(tiles[x][y].collision!=0)
                    dump = dump + tiles[x][y].hash + ":" + collisionTypes[tiles[x][y].collision] + "\n";
                else
                    ;//dump = dump + "Added the following dummy data instead: " + tiles[i][j].collision + "\n";
            }
        }
        post_to_url('collisions.php', {'tiles': dump} );
    }
    
    var tileClicked = function(x, y)
    {
        tiles[x][y].collision++; // next collision in cycle
        if(tiles[x][y].collision>=collisionTypes.length)
            tiles[x][y].collision = 0; // restart cycle if need be
        
        tileOver(x,y); // update displayed image
    }
    
    var tileOver = function(x, y)
    {
        var img = '';
        switch(collisionTypes[tiles[x][y].collision])
        {
            case <?php echo $collisionWalkable ?>:
                img = 'images/mouseover.png';
                break;
            case <?php echo $collisionNoWalk ?>:
                img = 'images/solid-mouseover.png';
                break;
            case <?php echo $collisionLeft ?>:
                img = 'images/left-mouseover.png';
                break;
            case <?php echo $collisionRight ?>:
                img = 'images/right-mouseover.png';
                break;
            case <?php echo $collisionUp ?>:
                img = 'images/up-mouseover.png';
                break;
            case <?php echo $collisionDown ?>:
                img = 'images/down-mouseover.png';
                break;
        }
        if(img!='') $('#x'+x+'y'+y).css('background-image', 'url("'+img+'")');
        else window.alert("Tile " + x + "," + y + " has improper collision type: " + tiles[x][y].collision);
    }
    
    var tileOut = function(x, y)
    {
        var img = '';
        switch(collisionTypes[tiles[x][y].collision])
        {
            case <?php echo $collisionWalkable ?>:
                img = 'images/spacer.png';
                break;
            case <?php echo $collisionNoWalk ?>:
                img = 'images/solid.gif';
                break;
            case <?php echo $collisionLeft ?>:
                img = 'images/left.gif';
                break;
            case <?php echo $collisionRight ?>:
                img = 'images/right.gif';
                break;
            case <?php echo $collisionUp ?>:
                img = 'images/up.gif';
                break;
            case <?php echo $collisionDown ?>:
                img = 'images/down.gif';
                break;
        }
        if(img!='') $('#x'+x+'y'+y).css('background-image', 'url("'+img+'")');
        else window.alert("Tile " + x + "," + y + " has improper collision type: " + tiles[x][y].collision);
    }
</script>
        
    </body>
</html>

