module game {
    export class Scene implements game.IObject{
        public constructor() {

            this.id = game.CommonFunction.Token;

        }

        private id: number;

        public get ID(): number { return this.id;}

        private sceneKey: string = "scene1";

        private startTime: number;

        //传入场景的字符串
        public OnLoad(obj:any): void {

            this.OnRelease();

            game.ModuleManager.Instance.RegisterModule(this);

            this.sceneKey = obj;

            this.startTime = egret.getTimer();



            this.resLoad();

        }

        public OnRelease(): void {

            game.ModuleManager.Instance.UnRegisterModule(this);


        }

        /**
         * 配置文件加载完成,开始预加载preload资源组。
         */
        private resLoad(): void {

            game.Layer.Instance.LoadingViewOnOff();
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.loadGroup(this.sceneKey);
        }
        /**
         * preload资源组加载完成
         */
        private onResourceLoadComplete(event: RES.ResourceEvent): void {

            if (event.groupName == this.sceneKey) {
                game.Layer.Instance.LoadingViewOnOff();
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                this.init();
            }
        }
        /**
         * 资源组加载出错
         */
        private onResourceLoadError(event: RES.ResourceEvent): void {
            //TODO
            //console.warn("Group:" + event.groupName + " 中有加载失败的项目");
            //忽略加载失败的项目
            this.onResourceLoadComplete(event);
        }
        /**
         * 资源组加载进度
         */
        private onResourceProgress(event: RES.ResourceEvent): void {
            if (event.groupName == this.sceneKey) {
                game.Layer.Instance.SetLoadingView(event.itemsLoaded, event.itemsTotal);
            }
        }

        private isInit: boolean = false;

        private init(): void {

            this.createBG();

            this.isInit = true;

        }





        private createBG(): void {
            var bitmap: egret.Bitmap = new egret.Bitmap();
            bitmap.texture = RES.getRes("bg_png");
            game.Layer.Instance.BgLayer.addChild(bitmap);
        }




        private action: any[];





        //总部血量变化（主要处理总部0血量时候GAMEOVER）
        private gm_headquarters_hpChange(e: game.BaseEvent): void {
            egret.gui.Alert.show("游戏结束！", "弹窗", function () { location.reload() },"重新开始");
            game.ModuleManager.Instance.IsStop = true;
        }







        private lastime: number = 0;

        public OnUpdate(passTime: number): void {
            if (this.isInit && passTime > this.lastime){


                this.lastime = passTime + 800;

            }
        }

    }
} 