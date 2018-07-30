import GTextField = fairygui.GTextField;

class VF {
    private readonly _view: fairygui.GComponent;
    private _leftContainer: fairygui.GComponent;
    private _rightContainer: fairygui.GComponent;
    private t: GTextField = new GTextField();

    public constructor() {
        this._view = fairygui.UIPackage.createObject("Basic", "Main").asCom;
        this._view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        fairygui.GRoot.inst.addChild(this._view);

        this.onRun();
    }

    private onRun(): void {
        // left_container
        this._leftContainer = this._view.getChild("left_container").asCom;
        const cnt: number = this._leftContainer.numChildren;
        for (let i: number = 0; i < cnt; i++) {
            const obj: fairygui.GObject = this._leftContainer.getChildAt(i);
            if (obj.group != null && obj.group.name == "template") {
                // console.log(obj);
                this.onDragDrop(obj.name);
            }
        }

        // right_container
        this._rightContainer = this._view.getChild("right_container").asCom;
        this._rightContainer.addEventListener(fairygui.DropEvent.DROP, this.__onDrop, this);


        // 所有的btn都可以进行拖动

        // for (let i: number = 0; i < this._rightContainer.numChildren; i++) {
        //     // const testBtn: fairygui.GButton = this._view.getChild("test").asButton;
        //     const testBtn: fairygui.GButton = this._rightContainer.getChildAt(i).asButton;
        //
        //     console.log(testBtn);
        //     if (testBtn == null) return;
        //
        //     testBtn.draggable = true;
        //
        //     const bounds: fairygui.GObject = this._rightContainer;
        //     const rect: egret.Rectangle = new egret.Rectangle();
        //     bounds.localToGlobalRect(0, 0, bounds.width, bounds.height, rect);
        //     fairygui.GRoot.inst.globalToLocalRect(rect.x, rect.y, rect.width, rect.height, rect);
        //     rect.x -= this._view.parent.x;
        //
        //     testBtn.dragBounds = rect;
        //     testBtn.addEventListener(fairygui.DragEvent.DRAG_END, this.__onDragEnd, this);
        // }
    }

    /**
     * 将左边的内容拖动到右边
     * @param obj
     */
    private onDragDrop(obj: string): void {
        const btnB: fairygui.GButton = this._leftContainer.getChild(obj).asButton;
        btnB.draggable = true;
        btnB.addEventListener(fairygui.DragEvent.DRAG_START, this.__onDragStart, this);
    }

    /**
     * 开始拖动
     * @param evt
     * @private
     */
    private __onDragStart(evt: fairygui.DragEvent): void {
        //取消对原目标的拖动，换成一个替代品
        evt.preventDefault();

        console.log(evt);

        const btn: fairygui.GButton = <fairygui.GButton><any>evt.currentTarget;
        fairygui.DragDropManager.inst.startDrag(btn, btn.icon, btn);
    }


    private __onDrop(evt: fairygui.DropEvent): void {
        const cnt: number = this._rightContainer.numChildren;
        let hasExist: boolean = false;

        for (let i: number = 0; i < cnt; i++) {
            if (evt.source.id == this._rightContainer.getChildAt(i).id) {
                hasExist = true;
                // return;
                break;
            }
        }

        console.log(hasExist);

        if (!hasExist) {
            console.log("evt.............");
            console.log(evt);

            // const btn: fairygui.GButton = <fairygui.GButton><any>evt.currentTarget;
            // btn.icon = evt.source;
            // btn.title = "哈哈";

            // console.log(evt);
            // console.log(evt.source);

            // const btn: fairygui.GButton = <fairygui.GButton><any>evt.source;
            // btn.icon = evt.source;
            // btn.title = "哈哈";
            // this._rightContainer.addChild(btn);

            // btn.icon = evt.source;
            // btn.title = "哈哈";
            console.log(evt.source);

            // console.log(evt);

            const btn: fairygui.GButton = <fairygui.GButton><any>evt.source;

            // console.log(evt.source);
            //
            // const btn: fairygui.GButton = new fairygui.GButton();
            btn.icon = evt.source.icon;
            btn.x = 100;
            btn.y = 200;
            btn.height = evt.source.height;
            btn.width = evt.source.width;
            btn.visible = true;
            btn.name = "test";
            btn.title = "test";
            btn.opaque = true;
            btn.packageItem = evt.source.packageItem;
            btn.sourceWidth = evt.source.sourceWidth;
            btn.sourceHeight = evt.source.sourceHeight;
            btn.draggable = true;
            btn.sortingOrder = this._rightContainer.numChildren + 1;
            //

            const bounds: fairygui.GObject = this._rightContainer;
            const rect: egret.Rectangle = new egret.Rectangle();
            bounds.localToGlobalRect(0, 0, bounds.width, bounds.height, rect);
            fairygui.GRoot.inst.globalToLocalRect(rect.x, rect.y, rect.width, rect.height, rect);
            rect.x -= this._view.parent.x;

            btn.dragBounds = rect;
            btn.addEventListener(fairygui.DragEvent.DRAG_END, this.__onDragEnd, this);

            console.log("...........................");
            console.log(btn);

            this._rightContainer.addChild(btn);

            // const newBtn: fairygui.GButton = new fairygui.GButton();
            // newBtn.text = "hello";
            // newBtn.x = evt.target.x;
            // newBtn.y = evt.target.y;
            // newBtn.titleFontSize = 100;
            // newBtn.icon = evt.source;
            // newBtn.height = 100;
            // newBtn.width = 100;
            // newBtn.name = "hello";
            // newBtn.sourceHeight = 100;
            // newBtn.sourceWidth = 100;
            // newBtn.sortingOrder = parseInt(200 + newBtn.id);
            // newBtn.visible = true;

            // console.log(newBtn);
            // this._rightContainer.addChild(newBtn);

            // console.log(this._rightContainer.numChildren);
            // for (let i: number = 0; i < this._rightContainer.numChildren; i++) {
            //     console.log(this._rightContainer.getChildAt(i));
            // }

            // this._rightContainer.alpha = 0.2;
        } else {

        }
    }

    private __onDragEnd(evt: fairygui.DragEvent): void {
        console.log(">...............");

        this.t.color = 0xDC143C;
        this.t.setSize(100, 100);
        this.t.setXY(0, 0);
        this.t.text = "stageX: " + evt.stageX + ", stageY:" + evt.stageY;

        console.log(this.t);
        this._rightContainer.removeChild(this.t);
        this._rightContainer.addChild(this.t);
    }
}