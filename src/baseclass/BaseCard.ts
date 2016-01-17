/**
 * Created by Administrator on 2015/11/18.
 */
module game{
    export class BaseCard extends egret.Sprite implements game.IObject{
        public constructor(type:string){
            super();
            this.id=game.CommonFunction.Token;
            this.createmask();
            this.createcard(type);
            this.name=type;
            this.isright =game.CommonFunction.isRight(type);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this);
            var that=this;
            setTimeout(function () {
                that.touchEnabled=true;
            },5000);

            game.EventControl.addEventListener("gm_mask_now",this.masknow,this);

        }
        private id:number;
        private isright:boolean;
        private card:egret.Bitmap;
        public get ID():number{
            return this.id;
        }
        private masknow(e:game.BaseEvent){
             this.setChildIndex(this.masks,1);
            this.touchEnabled=true;
        }
        private createcard(type:string):void{
             this.card=new egret.Bitmap(RES.getRes(type));
            this.card.name=type;
            this.addChild(this.card);


        }
        private masks:egret.Bitmap;
        private createmask():void{
            this.masks=new egret.Bitmap(RES.getRes("f-card1_png"));
            this.masks.name="masks";
            this.addChild(this.masks);

        }


        private onTouch(e:egret.TouchEvent):void{
            if(this.isright){
                this.swapChildren(this.masks,this.card);
                game.EventControl.dispatchEvent("gm_is_touchable",[true,this.name]);
                this.touchEnabled=false;
            }else{
                this.swapChildren(this.masks,this.card);
                var that=this;
               setTimeout(function(){that.swapChildren(that.masks,that.card);
                   game.EventControl.dispatchEvent("gm_is_touchable",false);},200);
            }

        }
        public OnLoad(parent:egret.DisplayObjectContainer):void{

            parent.addChild(this);
        }
        public OnRelease():void{
        }
        public OnUpdate(point:egret.Point):void{
            this.x=point.x;
            this.y=point.y;
        }


    }
}