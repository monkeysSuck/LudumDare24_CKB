/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

cc.loadjs('../box2d/box2d.js');
cc.loadjs('contactListener.js');
cc.loadjs('Box2DLayer.js');
cc.loadjs('Map.js');//19
cc.loadjs('Stats.js');
cc.loadjs('CombatantClasses.js');
cc.loadjs('ItemSprites.js');
cc.loadjs('Items.js');
cc.loadjs('Classes/GameObjects/LivingObject.js');
cc.loadjs('Classes/GameObjects/Player.js');
cc.loadjs('Classes/GameObjects/Enemy.js');
cc.loadjs('Classes/GameObjects/Attacks/Attack.js');
cc.loadjs('Classes/GameObjects/Attacks/RangedAttack.js');
cc.loadjs('Classes/GameObjects/Attacks/MeleeAttack.js');
cc.loadjs('Classes/GUI.js');

var Helloworld = cc.Layer.extend({
    isMouseDown:false,
    helloImg:null,
    helloLabel:null,
    circle:null,
    sprite:null,
    size:null,
    map:null,
    scale:5,
    centerPos:null,
    player:null,
    enemies:null,
    gui:null,

    init:function () { 

        //////////////////////////////
        // 1. super init first
        this._super();
        this.setIsKeypadEnabled(true);
        this.setIsTouchEnabled(true);

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask director the window size
        this.size = cc.Director.sharedDirector().getWinSize();
        centerPos = cc.ccp(this.size.width / 2, this.size.height / 2);

        // add a "close" icon to exit the progress. it's an autorelease object
        /*var closeItem = cc.MenuItemImage.create(
            "Resources/CloseNormal.png",
            "Resources/CloseSelected.png",
            this,
            function () {
                history.go(-1);
            });
        closeItem.setAnchorPoint(new cc.Point(0.5,0.5));

        var menu = cc.Menu.create(closeItem, null);
        menu.setPosition( cc.PointZero() );
        this.addChild(menu, 1);
        closeItem.setPosition(new cc.Point(size.width -20 , 20));
        */
        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        /*        this.helloLabel = cc.LabelTTF.create("Hello World", "Arial", 38);
        // position the label on the center of the screen
        this.helloLabel.setPosition(cc.ccp(size.width / 2, size.height - 40));
        // add the label as a child to this layer
        this.addChild(this.helloLabel, 5);*/
        LivingObjectSpriteBatch = new cc.SpriteBatchNode.create("Resources/oryx_lofi/lofi_char.png");
        this.map = new Box2DLayer();
        this.map.screen = this.size;    
        this.map.uiYPercentage = .25;    
        this.addChild(this.map);
        Map.size = this.size;
        Map.scale = this.scale;
        Map.init(this.map,this.scale);
        cc.KeypadHandler.create(this);
        AttackSpriteBatch = new cc.SpriteBatchNode.create("Resources/oryx_lofi/lofi_obj.png");

        this.player = new Player( 
                            new cc.Rect(0, 0, 8 * this.scale, 8 * this.scale));

        //this.player.GetSprite().setPosition(cc.ccp(this.size.width , this.size.height));
        this.player.init(this.map);
        Map.addPlayer(this.player);

        this.enemies = new Enemy(new cc.Rect(0, 9*8*this.scale, 8 * this.scale, 8 * this.scale));
        this.enemies.init(this);
        this.enemies.GetSprite().setPosition(cc.ccp(this.size.width , this.size.height ));
        this.enemies.SetBody(this.map.addSprite(this.enemies.GetSprite(),this.size.width,this.size.height,2,"dynamic",false));

        this.gui = new GUI();
        this.gui.Initialize(this.player, this.size);
        this.addChild(this.gui);

        return true;
    },

    ccTouchesEnded:function(touches, event) {
        if (touches.length <= 0)
            return;

        var touch = touches[0];

        var touchLoc = touch.locationInView(touch.view());

        this.player.LaunchAttack(touchLoc);
    },
    keyUp:function(e){
    	if(e == 68){this.map.right = false;}
    	if(e == 83){this.map.down = false;}    	
    	if(e == 65){this.map.left = false;}
    	if(e == 87){this.map.up = false;}
    },
    keyDown:function(e){
    	if(e == 68){this.map.right = true;}
    	if(e == 83){this.map.down = true;}    	
    	if(e == 65){this.map.left = true;}
    	if(e == 87){this.map.up = true;}
    }
});

Helloworld.scene = function () {
    // 'scene' is an autorelease object
    var scene = cc.Scene.create();

    // 'layer' is an autorelease object
    var layer = this.node();
    scene.addChild(layer);
    return scene;
};
// implement the "static node()" method manually
Helloworld.node = function () {
    var ret = new Helloworld();

    // Init the helloworld display layer.
    if (ret && ret.init()) {
        return ret;
    }

    return null;
};



