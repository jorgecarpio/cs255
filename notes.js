// Optional Javascript crash course
// Inspecting JSON



// This is an example of how the JSON would be structured.
// Note that chaingun_impact.png is not here.
//
// Note that this is an actual Javascript object, whereas
// JSON is a string that represents that object.

JSONExample = {
    "frames": {
        "chaingun.png": {
            "frame": {
                "x": 1766,
                "y": 202,
                "w": 42,
                "h": 34
            },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": {
                "x": 38,
                "y": 32,
                "w": 42,
                "h": 34
            },
            "sourceSize": {
                "w": 128,
                "h": 128
            }
        },
        "chaingun_impact.png": {
            "frame": {
                "x":1162,
                "y":322,
                "w":38,
                "h":34},
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": {
                "x":110,
                "y":111,
                "w":38,
                "h":34},
            "sourceSize": {
                "w":256,
                "h":256}
        },
        "chaingun_impact_0000.png": {
            "frame": {
                "x": 494,
                "y": 260,
                "w": 22,
                "h": 22
            },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": {
                "x": 113,
                "y": 108,
                "w": 22,
                "h": 22
            },
            "sourceSize": {
                "w": 256,
                "h": 256
            }
        }
    }
};

// The above is an example of how the JSON would be structured.
// Note that chaingun_impact.png is not here, we'll call your
// parseJSON function with the full JSON input.
//
// Note also that the above is an actual Javascript object, whereas
// JSON is a string that represents that object.
parseJSON = function (weaponJSON) {
    // First, use the JSON.parse function to
    // parse the passed in weaponJSON.
    //
    // Next, grab the 'x' data field within
    // 'spriteSourceSize' of 'chaingun_impact.png'
    //
    // After that, print this value to the console
    // and also return it.
    // YOUR CODE HERE
    parsedText = JSON.parse(weaponJSON)
    answer = parsedText['frames']['chaingun_impact.png']['spriteSourceSize']['x']
    console.log(answer)
    return answer
};

// Unit 1: Canvas

//Drawing Images




var canvas = null;
var context = null;
var img = null;

var onImageLoad = function(){
	console.log("IMAGE!!!");
	// Draw an image to the canvas at position 192,192.
	// Remember that the drawImage method is attached
	// to the 2D Context, not the canvas element!
	context.drawImage(img, 192, 192);
};

var setup = function() {
	var body = document.getElementById("body");
	canvas = document.createElement("canvas");

	context = canvas.getContext('2d');

	canvas.setAttribute('width', 500);
	canvas.setAttribute('height', 700);

	body.appendChild(canvas);

	img = new Image();
	img.onload = onImageLoad;
	img.src = "/media/js/standalone/libs/gamedev_assets/ralphyrobot.png";
};


setup();




//============================================================================

// Unit 2: Atlases Notes

//Texture atlasing
// A single large image that contains many smaller images but that
// can be referenced individually.

// Sprite sheet aka atlas, though only for animated objects

// Texture packing (bin packing); tricky eng task
// NP-Hard
// Grits uses texture packer; gens atlas data from loose textures
// alongside a data file that maps locations to atlas.

// Output is JSON

// Unit 2 Quiz 1: Parsing Texturepacker Output - Atlases



// We keep a global dictionary of loaded sprite-sheets,
// which are each an instance of our SpriteSheetClass
// below.
//
// This dictionary is indexed by the URL path that the
// atlas is located at. For example, calling:
//
// gSpriteSheets['grits_effects.png'] 
//
// would return the SpriteSheetClass object associated
// to that URL, assuming that it exists.
var gSpriteSheets = {};

//-----------------------------------------
SpriteSheetClass = Class.extend({

    // We store in the SpriteSheetClass:
    //
    // The Image object that we created for our
    // atlas.
	img: null,

    // The URL path that we grabbed our atlas
    // from.
	url: "",

    // An array of all the sprites in our atlas.
	sprites: new Array(),

	//-----------------------------------------
	init: function () {},

	//-----------------------------------------
    // Load the atlas at the path 'imgName' into
    // memory. This is similar to how we've
    // loaded images in previous units.
	load: function (imgName) {
		// Store the URL of the spritesheet we want.
        this.url = imgName;
        
        // Create a new image whose source is at 'imgName'.
		var img = new Image();
		img.src = imgName;

        // Store the Image object in the img parameter.
		this.img = img;

        // Store this SpriteSheetClass in our global
        // dictionary gSpriteSheets defined above.
		gSpriteSheets[imgName] = this;
	},

	//-----------------------------------------
	// Define a sprite for this atlas
	defSprite: function (name, x, y, w, h, cx, cy) {
        // We create a new object with:
        //
        // The name of the sprite as a string
        //
        // The x and y coordinates of the sprite
        // in the atlas.
        //
        // The width and height of the sprite in
        // the atlas.
        //
        // The x and y coordinates of the center
        // of the sprite in the atlas. This is
        // so we don't have to do the calculations
        // each time we need this. This might seem
        // minimal, but it adds up!
		var spt = {
			"id": name,
			"x": x,
			"y": y,
			"w": w,
			"h": h,
			"cx": cx == null ? 0 : cx,
			"cy": cy == null ? 0 : cy
		};

        // We push this new object into
        // our array of sprite objects,
        // at the end of the array.
		this.sprites.push(spt);
	},

	//-----------------------------------------
    // Parse the JSON file passed in as 'atlasJSON'
    // that is associated to this atlas.
	parseAtlasDefinition: function (atlasJSON) {
        // Parse the input 'atlasJSON' using the
        // JSON.parse method and store it in a
        // variable.
        //
		// YOUR CODE HERE
        this.parsedJSON = JSON.parse(atlasJSON);
       

        // For each sprite in the parsed JSON,
        // 'chaingun.png', chaingun_impact.png',
        // etc.:
        //
        // 1) Calculate the center (x,y) offsets
        //    from the 'width' and 'height'
        //    values listed in the JSON.
        //    Note that these are an offset
        //    FROM the 'width' and 'height',
        //    so they will be negative!
        //
        // 2) Pass the sprite name, the (x,y)
        //    coordinates, the width and height,
        //    and the center (x,y) offsets
        //    you just calculated to the above
        //    'defSprite' method of our
        //    'SpriteSheetClass'.
        //
        // YOUR CODE HERE
        
        for (var i in this.parsedJSON['frames']) {
            //or parsed.JSON.frames
            // var sprite = parsed.frames[key];
            this.name = i;
            console.log(this.name);
            this.x = this.parsedJSON['frames'][i]['frame']['x'];
            this.y = this.parsedJSON['frames'][i]['frame']['y'];
            this.w = this.parsedJSON['frames'][i]['frame']['w'];
            this.h = this.parsedJSON['frames'][i]['frame']['h'];
            this.cx = this.w/-2;
            console.log(this.cx);
            this.cy = this.h/-2;
            console.log(this.cy);
            this.defSprite(this.name, this.x, this.y, this.w, this.h, this.cx, this.cy);
        };

        
	}

});



