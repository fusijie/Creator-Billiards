// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

// 定义了一个类, new 构造函数模拟;
// extends: 扩展自 component;
// new 类， 实例化一个组件类， 往对应的节点上添加我们的组件,new出来来组件实例;
cc.Class({
    extends: cc.Component,

    // 属性列表，它将会作为组件实例的数据成员，到组件里面,绑定到我们的编辑器上;
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
        value: 1,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // this,指的就是当前的组件实例
    },

    start () {
        // this,指的就是当前的组件实例
        this.body = this.getComponent(cc.RigidBody);
        this.start_x = this.node.x;
        this.start_y = this.node.y;
    },

    // dt: 距离上一次刷新的时间;
    update (dt) {
        // this,指的就是当前的组件实例
    },

    reset: function() {
        this.node.active = true;
        this.node.x = this.start_x;
        this.node.y = this.start_y;
        
        this.body.linearVelocity = cc.p(0, 0);
        this.body.angularVelocity = 0;
    },

    onBeginContact: function(contact, selfCollider, otherCollider) {
        // 白球有可能，碰球杆，碰球，碰边,球袋
        if(otherCollider.node.groupIndex == 2) {
            this.node.active = false;
            return;
        }
    },
});
