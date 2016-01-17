/**
 * Created by Administrator on 2015/11/18.
 */
module game{
    export class CommonFunction{
        public constructor(){

        }
        private static token: number = 0;
        public static get Token(): number {
            return this.token++;
        }



        public static isRight(type:string):boolean{

            if(type.indexOf('t')==0){
                return true;
            }else{
                return false;
            }
        }

        public static Layout(point:egret.Point,obj:egret.DisplayObject):Array<any>{
            var arr=new Array();
            for(var j=0;j<4;j++){
            for(var i=0;i<4;i++){
                var temp=new egret.Point();
                temp.y=point.y+obj.width*j;
              temp.x=point.x+obj.width*i;
                arr.push(temp);
            }
            }
            return arr;
       }
        public static Layout2(point:egret.Point,obj:egret.DisplayObject):Array<any>{
            var arr=new Array();
            for(var j=0;j<4;j++){
                for(var i=0;i<4;i++){
                    var temp=new egret.Point();
                    temp.y=point.y+obj.width*j;
                    temp.x=point.x+obj.width*i;
                    arr.push(temp);
                }
            }
            return arr;
        }

       public static randArr(arr) {
           var ret = [],
               i = arr.length,
               n;
           arr = arr.slice(0);

           while (--i >= 0) {
               n = Math.floor( Math.random() * i);
               ret[ret.length] = arr[n];
               arr[n] = arr[i];
           }
           return ret;
       }
        public static shakeObj(obj):void{
        var shakeNum =80;
        var oldX:number = obj.x;
        egret.Tween.get(obj).to({x:obj.x - 10},shakeNum);

        egret.setTimeout(function () {
            egret.Tween.get(obj).to({x:obj.x + 20},shakeNum);
        }, this, shakeNum*2);
        egret.setTimeout(function () {
            egret.Tween.get(obj).to({x:obj.x - 20},shakeNum);
        }, this, shakeNum*3);
        egret.setTimeout(function () {
            egret.Tween.get(obj).to({x:obj.x + 20},shakeNum);
        }, this, shakeNum*4);
        egret.setTimeout(function () {
            egret.Tween.get(obj).to({x:oldX},shakeNum);
        }, this, shakeNum*5);
    }
       public static blinkEffect(obj,interval:number = 1000):void{
        new game.BitmapBlink(obj,interval);
    }
}
}