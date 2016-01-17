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
    var StartPanel = (function (_super) {
        __extends(StartPanel, _super);
        function StartPanel() {
            _super.call(this);
            this.init();
        }
        StartPanel.prototype.init = function () {
            this.width = egret.MainContext.instance.stage.stageWidth;
            this.height = egret.MainContext.instance.stage.stageHeight;
            //背景
            var bg = new egret.Bitmap(RES.getRes("start_bg_png"));
            this.addChild(bg);
            var starttest = new egret.Sprite();
            starttest.x = 1380;
            starttest.y = 880;
            starttest.width = 350;
            starttest.height = 80;
            var startBtn = new egret.Bitmap(RES.getRes("start_btn_png"));
            starttest.addChild(startBtn);
            this.addChild(starttest);
            starttest.touchEnabled = true;
            starttest.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnStartBtn, this);
            //this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.OnStartBtn,this);
        };
        StartPanel.prototype.OnStartBtn = function (e) {
            egret.gui.Alert.show("五个胰岛自身抗体是糖尿病分型诊断的关键指标，您还记得                                    是哪五个吗？                                                         考验您眼力的时候到了,                                下面有16张图片，请在5s内记住五个抗体的位置           并在40s内找出它们", "游戏规则", this.closeHandler, "下一步");
        };
        StartPanel.prototype.closeHandler = function (e) {
            game.EventControl.dispatchEvent("gm_start_game", this);
        };
        StartPanel.prototype.OnLoad = function (parent) {
            this.parent.addChild(this);
        };
        StartPanel.prototype.OnRelease = function () {
            this.parent.removeChild(this);
        };
        return StartPanel;
    })(egret.DisplayObjectContainer);
    game.StartPanel = StartPanel;
    StartPanel.prototype.__class__ = "game.StartPanel";
})(game || (game = {}));
