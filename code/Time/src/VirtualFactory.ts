import Shape = egret.Shape;

class VirtualFactory extends egret.DisplayObjectContainer {
    public constructor() {
        super();

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private stageW: number;
    private stageH: number;

    private onAddToStage(): void {
        this.stageW = this.width;
        this.stageH = this.height;

        console.log(this.stageW);
        console.log(this.stageH);
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        console.log(this.stage.width);
        console.log(this.stage.height);

        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.stage.scaleMode = egret.StageScaleMode.FIXED_NARROW;

        this.showVirtualFactory().catch(e => {
            console.log(e);
        })
    }

    private async showVirtualFactory() {
        console.log("展示虚拟工厂");

        const bg: egret.Shape = new Shape();
        bg.graphics.beginFill(0x000000);
        bg.graphics.drawRect(0, 0, 500, 500);
        bg.graphics.endFill();
        this.addChild(bg);
    }
}