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
    var Timers = (function (_super) {
        __extends(Timers, _super);
        function Timers() {
            _super.call(this);
            this.init();
        }
        Timers.prototype.init = function () {
            var icon = new egret.Bitmap(RES.getRes(""));
            this.addChild(icon);
            this.timer = new egret.Timer(1000, 40);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.startTimer, this);
            this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.endTimer, this);
            var that = this;
            setTimeout(function () {
                that.timer.start();
            }, 5000);
            this.label = new egret.TextField();
            this.label.size = 40;
            this.label.textColor = 0xD3D3D3;
            this.label.text = "40" + " " + "秒";
            this.addChild(this.label);
        };
        Timers.prototype.startTimer = function (e) {
            var count = 40 - e.target.currentCount;
            this.label.text = count.toString() + " " + "秒";
            this.label.visible = true;
        };
        Timers.prototype.endTimer = function (e) {
            game.EventControl.dispatchEvent("gm_time_end", this);
        };
        Timers.prototype.OnLoad = function (parent) {
        };
        Timers.prototype.OnRelease = function () {
            this.timer.stop();
            this.timer.removeEventListener(egret.TimerEvent.TIMER, this.startTimer, this);
        };
        Timers.prototype.OnUpdate = function (type, value) {
        };
        return Timers;
    })(egret.Sprite);
    game.Timers = Timers;
    Timers.prototype.__class__ = "game.Timers";
})(game || (game = {}));
