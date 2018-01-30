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
        cue: {
            type: cc.Node,
            default: null,
        },

        min_dis: 20, // 如果拖动的距离到白球的中心 < 这个距离，那么我们就隐藏球杆，否者的话，显示球杆;
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.body = this.getComponent(cc.RigidBody);

        this.cue_inst = this.cue.getComponent("cue");
        this.start_x = this.node.x;
        this.start_y = this.node.y;

        // START(点击下去), MOVED（触摸移动）, ENDED(触摸在节点范围内弹起), CANCEL（节点范围外弹起）
        this.node.on(cc.Node.EventType.TOUCH_START, function(e) {

        }.bind(this), this);

        this.node.on(cc.Node.EventType.TOUCH_MOVE, function(e) {
            var w_pos = e.getLocation();
            var dst = this.node.parent.convertToNodeSpaceAR(w_pos);
            var src = this.node.getPosition();
            var dir = cc.pSub(dst, src);
            var len = cc.pLength(dir);

            
            if (len < this.min_dis) {
                this.cue.active = false; // 设置球杆为隐藏;
                return;
            }

            this.cue.active = true;

            var r = Math.atan2(dir.y, dir.x);
            var degree = r * 180 / Math.PI;
            degree = 360 - degree;
            
            this.cue.rotation = degree + 180; 

            var cue_pos = dst;
            var cue_len_half = this.cue.width * 0.5;
            cue_pos.x += (cue_len_half * dir.x / len);
            cue_pos.y += (cue_len_half * dir.y / len);

            this.cue.setPosition(cue_pos);
        }.bind(this), this);

        this.node.on(cc.Node.EventType.TOUCH_END, function(e) {
            if(this.cue.active === false) {
                return;
            }
            this.cue_inst.shoot_at(this.node.getPosition());
        }.bind(this), this);

        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function(e) {
            if(this.cue.active === false) {
                return;
            }
            this.cue_inst.shoot_at(this.node.getPosition());
        }.bind(this), this);
    },

    reset: function() {
        this.node.scale = 1;
        this.node.x = this.start_x;
        this.node.y = this.start_y;

        this.body.linearVelocity = cc.p(0, 0);
        this.body.angularVelocity = 0;
    },

    onBeginContact: function(contact, selfCollider, otherCollider) {
        // 白球有可能，碰球杆，碰球，碰边,球袋
        if(otherCollider.node.groupIndex == 2) {
           // 隔1秒一种，要把白球放回原处;
           this.node.scale = 0;
           this.scheduleOnce(this.reset.bind(this), 1);
           // end  
           return;
        }
    },
    // update (dt) {},
});
