/**
 * Created by Administrator on 2015/11/18.
 */
var game;
(function (game) {
    var EventControl = (function () {
        function EventControl() {
        }
        EventControl.dispatchEvent = function (type, object) {
            var event = new game.BaseEvent(type);
            event.object = object;
            this.dispatcher.dispatchEvent(event);
        };
        EventControl.addEventListener = function (type, listener, thisObject, useCapture, priority) {
            this.dispatcher.addEventListener(type, listener, thisObject, useCapture, priority);
        };
        EventControl.removeEventListener = function (type, listener, thisObject, useCapture) {
            this.dispatcher.removeEventListener(type, listener, thisObject, useCapture);
        };
        EventControl.dispatcher = new egret.EventDispatcher();
        return EventControl;
    })();
    game.EventControl = EventControl;
    EventControl.prototype.__class__ = "game.EventControl";
})(game || (game = {}));
