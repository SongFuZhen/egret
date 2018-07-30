class FairyGui extends egret.DisplayObjectContainer {

    public constructor() {
        super();

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(): void {
        this.showFairyGui().catch(e => {
            console.log(e);
        });
    }

    private async showFairyGui() {



    }
}