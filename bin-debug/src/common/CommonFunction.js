/**
 * Created by Administrator on 2015/11/18.
 */
var game;
(function (game) {
    var CommonFunction = (function () {
        function CommonFunction() {
        }
        Object.defineProperty(CommonFunction, "Token", {
            get: function () {
                return this.token++;
            },
            enumerable: true,
            configurable: true
        });
        CommonFunction.isRight = function (type) {
            if (type.indexOf('t') == 0) {
                return true;
            }
            else {
                return false;
            }
        };
        CommonFunction.Layout = function (point, obj) {
            var arr = new Array();
            for (var j = 0; j < 4; j++) {
                for (var i = 0; i < 4; i++) {
                    var temp = new egret.Point();
                    temp.y = point.y + obj.width * j;
                    temp.x = point.x + obj.width * i;
                    arr.push(temp);
                }
            }
            return arr;
        };
        CommonFunction.Layout2 = function (point, obj) {
            var arr = new Array();
            for (var j = 0; j < 4; j++) {
                for (var i = 0; i < 4; i++) {
                    var temp = new egret.Point();
                    temp.y = point.y + obj.width * j;
                    temp.x = point.x + obj.width * i;
                    arr.push(temp);
                }
            }
            return arr;
        };
        CommonFunction.randArr = function (arr) {
            var ret = [], i = arr.length, n;
            arr = arr.slice(0);
            while (--i >= 0) {
                n = Math.floor(Math.random() * i);
                ret[ret.length] = arr[n];
                arr[n] = arr[i];
            }
            return ret;
        };
        CommonFunction.shakeObj = function (obj) {
            var shakeNum = 80;
            var oldX = obj.x;
            egret.Tween.get(obj).to({ x: obj.x - 10 }, shakeNum);
            egret.setTimeout(function () {
                egret.Tween.get(obj).to({ x: obj.x + 20 }, shakeNum);
            }, this, shakeNum * 2);
            egret.setTimeout(function () {
                egret.Tween.get(obj).to({ x: obj.x - 20 }, shakeNum);
            }, this, shakeNum * 3);
            egret.setTimeout(function () {
                egret.Tween.get(obj).to({ x: obj.x + 20 }, shakeNum);
            }, this, shakeNum * 4);
            egret.setTimeout(function () {
                egret.Tween.get(obj).to({ x: oldX }, shakeNum);
            }, this, shakeNum * 5);
        };
        CommonFunction.blinkEffect = function (obj, interval) {
            if (interval === void 0) { interval = 1000; }
            new game.BitmapBlink(obj, interval);
        };
        CommonFunction.token = 0;
        return CommonFunction;
    })();
    game.CommonFunction = CommonFunction;
    CommonFunction.prototype.__class__ = "game.CommonFunction";
})(game || (game = {}));
