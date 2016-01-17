var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by Administrator on 2015/11/18.
 */
var game;
(function (game) {
    var BaseEvent = (function (_super) {
        __extends(BaseEvent, _super);
        function BaseEvent(type, bubbles, cancelable) {
            _super.call(this, type, bubbles, cancelable);
        }
        /**
         *  开始游戏
         */
        BaseEvent.gm_start_game = "gm_start_game";
        BaseEvent.gm_card_right = "gm_card_right";
        BaseEvent.gm_time_end = "gm_time_end";
        BaseEvent.gm_is_touchable = "gm_is_touchable";
        BaseEvent.gm_success = "gm_success";
        BaseEvent.gm_failed = "gm_failed";
        BaseEvent.gm_mask_now = "gm_mask_now";
        BaseEvent.gm_restart = "gm_restart";
        return BaseEvent;
    })(egret.Event);
    game.BaseEvent = BaseEvent;
    BaseEvent.prototype.__class__ = "game.BaseEvent";
})(game || (game = {}));
