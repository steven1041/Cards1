module game{
    export class GamePanel extends egret.DisplayObjectContainer implements ILoad{
        public constructor(){
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAdded,this);
        }
        private onAdded(e:egret.Event):void{
            this.init();
            var that=this;
            setTimeout(function(){
                game.EventControl.dispatchEvent("gm_mask_now",that);
                game.EventControl.addEventListener("gm_is_touchable",that.touchable,that);
                game.EventControl.addEventListener("gm_success",that.success,that);
                game.EventControl.addEventListener("gm_time_end",that.gameEnd,that);
            },5000);

        }
        private gameEnd(e:game.BaseEvent):void{
            egret.gui.Alert.show("很遗憾，您没有找到五个抗体,请再努力！","游戏结束",this.closeHandler);

        }

        private closeHandler(evt:egret.gui.CloseEvent):void{
            window.location.href="http://wx.govmade.cn/yidao/";
          // game.EventControl.dispatchEvent("gm_restart",this);
        }
        private showtime(){
            var shows=new egret.Bitmap(RES.getRes("success_png"));
            shows.alpha=1;
            shows.x=this.width/2;
            shows.y=(this.height-shows.height)/2-200;
            shows.anchorX=0.5;
            shows.anchorY=0.5;
            shows.scaleX=0.1;
            shows.scaleY=0.1;
            this.addChild(shows);
            var tw=egret.Tween.get(shows);
            tw.to({rotation:3600,scaleX:1.5,scaleY:1.5},1500).call(function(){
                game.CommonFunction.shakeObj(shows);
                game.CommonFunction.blinkEffect(shows,3000);
            });

        }
        private success(e:game.BaseEvent):void{
            this.timer.OnRelease();
            game.EventControl.dispatchEvent("gm_mask_now",this);
            var spr=new egret.Sprite();
            spr.graphics.beginFill(0xD3D3D3,0.8);
            spr.graphics.drawRect(0,0,1980,1080);
            spr.graphics.endFill();
            this.addChild(spr);
            this.showtime();
            var that=this;
            setTimeout(function(){
                egret.gui.Alert.show("                                  恭喜你成功啦！                           五个抗体联合检测，糖尿病精准分型的GPS！","游戏结束",that.closeHandler)},4000);

        }
        private count:number=0;

        private touchable(e:game.BaseEvent):void{
            if(e.object){

                this.count++;
                if(this.count==5){
                    game.EventControl.dispatchEvent("gm_success",this);
                }
            }else{
                this.count=0;
                game.EventControl.dispatchEvent("gm_mask_now",this);
            }
        }

        private init():void{
            this.width=egret.MainContext.instance.stage.stageWidth;
            this.height=egret.MainContext.instance.stage.stageHeight;
            this.createBg();
            this.createCard();
            this.createTimer();

        }
        private bg:egret.Bitmap;
        private createBg(){
            this.bg=new egret.Bitmap(RES.getRes("game-bg_png"));
            this.addChild(this.bg);
        }
        private timer:game.Timers;
        private createTimer(){
            this.timer=new Timers();
            this.addChild(this.timer);
            this.timer.y=22;
            this.timer.x=180;
        }
        private cardContainer:egret.Sprite;
        private createCard():void{
            this.cardContainer=new egret.Sprite();
            this.cardContainer.x=105;
            this.cardContainer.y=90;
            this.addChild(this.cardContainer);
            //var point=new egret.Point(145,100);
            var point=new egret.Point(0,0);
            var card:game.BaseCard=new BaseCard("t-card1_png");
            var arr=game.CommonFunction.Layout(point,card);
            var randarr=game.CommonFunction.randArr(arr);
            for(var i=0;i<5;i++){
                var j=i+1;
                var str=j.toString();
                var cards=new BaseCard("t-card"+str+"_png");
                var nextPoint=randarr.shift();
                cards.x=nextPoint.x;
                cards.y=nextPoint.y;
                this.cardContainer.addChild(cards);
            }
            for(var i=0;i<2;i++){
                var j=i+2;
                var str=j.toString();
                var cards=new BaseCard("f-card"+str+"_png");
                var nextPoint=randarr.shift();
                cards.x=nextPoint.x;
                cards.y=nextPoint.y;
                this.cardContainer.addChild(cards);
            }
            for(var i=0;i<3;i++){
                var cards=new BaseCard("f-card4_png");
                var nextPoint=randarr.shift();
                cards.x=nextPoint.x;
                cards.y=nextPoint.y;
                this.cardContainer.addChild(cards);
            }
            for(var i=0;i<2;i++){
                var cards=new BaseCard("f-card5_png");
                var nextPoint=randarr.shift();
                cards.x=nextPoint.x;
                cards.y=nextPoint.y;
                this.cardContainer.addChild(cards);
            }
            for(var i=0;i<4;i++){
                var j=i+6;
                var str=j.toString();
                var cards=new BaseCard("f-card"+str+"_png");
                var nextPoint=randarr.shift();
                cards.x=nextPoint.x;
                cards.y=nextPoint.y;
                this.cardContainer.addChild(cards);
            }
        }
        public OnLoad(parent:egret.DisplayObjectContainer):void{
            this.parent.addChild(this);
        }
        public OnRelease():void{
            this.removeChild(this.timer);
            this.removeChild(this.cardContainer);
            this.timer=null;
            this.cardContainer=null;
        }
    }
}