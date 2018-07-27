class Anim extends egret.DisplayObjectContainer {

    public constructor() {
        super();

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(e: egret.Event) {
        this.showAnim().catch(e => {
            console.log(e);
        })
    }

    private img: egret.Bitmap;

    private async showAnim() {
        this.img = Main.createBitmapByName("egret_icon_png");

        this.stage.addChild(this.img);

        this.returnMainPage();
    }

    private returnMainPage(): void {
        const returnMain: egret.TextField = new egret.TextField();
        returnMain.x = 180;
        returnMain.y = 300;
        returnMain.textColor = 0x000000;
        returnMain.textAlign = egret.HorizontalAlign.CENTER;
        returnMain.text = "返回主界面";

        this.addChild(returnMain);
        returnMain.touchEnabled = true;
        returnMain.addEventListener(egret.TouchEvent.TOUCH_TAP, this.returnMain, this);
    }

    private returnMain(): void {
        window.location.reload();
    }

}