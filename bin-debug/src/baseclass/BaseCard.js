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
    var BaseCard = (function (_super) {
        __extends(BaseCard, _super);
        function BaseCard(type) {
            _super.call(this);
            this.id = game.CommonFunction.Token;
            this.createmask();
            this.createcard(type);
            this.name = type;
            this.isright = game.CommonFunction.isRight(type);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            var that = this;
            setTimeout(function () {
                that.touchEnabled = true;
            }, 5000);
            game.EventControl.addEventListener("gm_mask_now", this.masknow, this);
        }
        Object.defineProperty(BaseCard.prototype, "ID", {
            get: function () {
                return this.id;
            },
            enumerable: true,
            configurable: true
        });
        BaseCard.prototype.masknow = function (e) {
            this.setChildIndex(this.masks, 1);
            this.touchEnabled = true;
        };
        BaseCard.prototype.createcard = function (type) {
            this.card = new egret.Bitmap(RES.getRes(type));
            this.card.name = type;
            this.addChild(this.card);
        };
        BaseCard.prototype.createmask = function () {
            this.masks = new egret.Bitmap(RES.getRes("f-card1_png"));
            this.masks.name = "masks";
            this.addChild(this.masks);
        };
        BaseCard.prototype.onTouch = function (e) {
            if (this.isright) {
                this.swapChildren(this.masks, this.card);
                game.EventControl.dispatchEvent("gm_is_touchable", [true, this.name]);
                this.touchEnabled = false;
            }
            else {
                this.swapChildren(this.masks, this.card);
                var that = this;
                setTimeout(function () {
                    that.swapChildren(that.masks, that.card);
                    game.EventControl.dispatchEvent("gm_is_touchable", false);
                }, 200);
            }
        };
        BaseCard.prototype.OnLoad = function (parent) {
            parent.addChild(this);
        };
        BaseCard.prototype.OnRelease = function () {
        };
        BaseCard.prototype.OnUpdate = function (point) {
            this.x = point.x;
            this.y = point.y;
        };
        return BaseCard;
    })(egret.Sprite);
    game.BaseCard = BaseCard;
    BaseCard.prototype.__class__ = "game.BaseCard";
})(game || (game = {}));
