
class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * loading process interface
     */
    private loadingView:LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
       // egret.Profiler.getInstance().run();
    }

    private onAddToStage(event:egret.Event) {
        //inject the custom material parser
        //注入自定义的素材解析器
        egret.Injector.mapClass("egret.gui.IAssetAdapter", AssetAdapter);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        egret.gui.Theme.load("resource/theme.thm");
        //Config loading process interface
        game.Layer.Ins.OnLoad(this.stage);
        //设置加载进度界面
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        // initialize the Resource loading library
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * Loading of configuration file is complete, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createScene();
        }
    }

    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }



    /**
     * 创建场景界面
     * Create scene interface
     */
    private createScene():void {
        var mp3:egret.Sound = RES.getRes("Sound 9_mp3");
        mp3.play(true);

       var startPanel=new game.StartPanel();
        game.Layer.Ins.BgLayer.addChild(startPanel);
       game.EventControl.addEventListener("gm_start_game",this.onStart,this);
       // game.EventControl.addEventListener("gm_restart",this.onRestart,this);
    }
  private gamePanel:game.GamePanel;
   private onStart(e:game.BaseEvent):void{
       game.Layer.Ins.BgLayer.removeChildren();
      this.gamePanel=new game.GamePanel();
       game.Layer.Ins.GameLayer.addChild(this.gamePanel);

   }
    private onRestart(e:game.BaseEvent):void{
        game.Layer.Ins.GameLayer.removeChild(this.gamePanel);
        this.gamePanel=null;
        game.EventControl.dispatchEvent("gm_start_game",this);
    }
}
