/**
 * Created by Administrator on 2015/11/18.
 */
module game {
    export class EventControl{
        public constructor() {  }

        private static dispatcher: egret.EventDispatcher = new egret.EventDispatcher();

        public static dispatchEvent(type: string, object: any): void {
            var event: game.BaseEvent = new game.BaseEvent(type);
            event.object = object;
            this.dispatcher.dispatchEvent(event);


        }

        public static addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): void {

            this.dispatcher.addEventListener(type, listener, thisObject, useCapture, priority);
        }

        public static removeEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean): void {

            this.dispatcher.removeEventListener(type, listener, thisObject, useCapture);
        }
    }
}