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
        SHOOT_POWER: 18, // 合适的值就可以了
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.body = this.getComponent(cc.RigidBody);

    },


    shoot_at: function(dst) {
        // 冲量: 给这个球杆一个方向的冲量，矢量，大小，有方向;
        // 方向问题:  src---> dst;
        var src = this.node.getPosition();
        var dir = cc.pSub(dst, src);


        // 大小问题;
        var cue_len_half = this.node.width * 0.5;
        var len = cc.pLength(dir);
        var distance = len - cue_len_half;
        // end 

        var power_x = distance * this.SHOOT_POWER * dir.x / len;
        var power_y = distance * this.SHOOT_POWER * dir.y / len;

        // applyLinearImpulse(冲量大小向量, 球杆的原点转成世界坐标, true)
        this.body.applyLinearImpulse(cc.p(power_x, power_y), this.node.convertToWorldSpaceAR(cc.p(0, 0)), true);
    },

    onPreSolve: function(contact, selfCollider, otherCollider) {
        this.node.active = false;
    },
    // update (dt) {},
});
