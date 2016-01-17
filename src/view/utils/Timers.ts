/**
 * Created by Administrator on 2015/11/18.
 */
module game{
    export class Timers extends egret.Sprite implements game.IDecoration,game.ILoad{
        public constructor(){
            super();
            this.init();
        }

        private label:egret.TextField;
        private timer:egret.Timer;
        private init():void{
            var icon=new egret.Bitmap(RES.getRes(""));
            this.addChild(icon);

            this.timer=new egret.Timer(1000,40);
            this.timer.addEventListener(egret.TimerEvent.TIMER,this.startTimer,this);
            this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.endTimer,this);
            var that=this;
            setTimeout(function(){
                that.timer.start();
            },5000);


            this.label=new egret.TextField();
            this.label.size=40;
            this.label.textColor=0xD3D3D3;
            this.label.text="40"+" "+"秒";
            this.addChild(this.label);

        }
        private startTimer(e:egret.TimerEvent):void{
            var count=40-e.target.currentCount;
            this.label.text=count.toString()+" "+"秒";
            this.label.visible=true;
        }
        private endTimer(e:egret.TimerEvent):void{
            game.EventControl.dispatchEvent("gm_time_end",this);
        }
        public OnLoad(parent:egret.DisplayObjectContainer):void{

        }
        public OnRelease():void{
             this.timer.stop();
          this.timer.removeEventListener(egret.TimerEvent.TIMER,this.startTimer,this);
        }
        public OnUpdate(type:number,value:any):void{

        }
    }
}