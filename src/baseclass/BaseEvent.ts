/**
 * Created by Administrator on 2015/11/18.
 */
module game{
    export class BaseEvent extends egret.Event{
       public constructor(type: string, bubbles?: boolean, cancelable?: boolean){
           super(type,bubbles,cancelable);
       }

        public object: any;
        /**
         *  开始游戏
         */
        static gm_start_game: string = "gm_start_game";
        static gm_card_right:string="gm_card_right";
        static gm_time_end:string="gm_time_end";
        static gm_is_touchable:string="gm_is_touchable";
        static gm_success:string="gm_success";
        static gm_failed:string="gm_failed";
        static gm_mask_now:string="gm_mask_now";
        static gm_restart:string="gm_restart";
    }
}