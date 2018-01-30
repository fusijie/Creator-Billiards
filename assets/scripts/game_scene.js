// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        ball_root: {
            type: cc.Node,
            default: null,
        },

        white_ball: {
            type: cc.Node,
            default: null,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.is_game_started = true;
    },

    restart_game: function() {
        for(var i = 0; i < this.ball_root.childrenCount; i ++) {
            var b = this.ball_root.children[i];
            b.getComponent("ball").reset();
        }

        this.white_ball.getComponent("white_ball").reset();
        this.is_game_started = true;
    },

    check_game_over: function() {
        for(var i = 0; i < this.ball_root.childrenCount; i ++) {
            var b = this.ball_root.children[i];
            if(b.active === true) {
                return;
            }
        }

        this.is_game_started = false; // game_over;
        this.scheduleOnce(this.restart_game.bind(this), 5);
    },

    update (dt) {
        if (!this.is_game_started) {
            return;
        }

        // 是否所有的球都打入进去了;
        
        // end 
    },
});
