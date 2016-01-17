/**
 * Created by Administrator on 2015/11/18.
 */
module game{
    export interface ILoad{

         OnLoad(layer:egret.DisplayObjectContainer):void;

        OnRelease():void;

    }
}