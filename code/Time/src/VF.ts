import GTextField = fairygui.GTextField;

class VF {
    private readonly _view: fairygui.GComponent;
    private readonly _leftContainer: fairygui.GComponent;
    private readonly _rightContainer: fairygui.GComponent;
    private t: GTextField = new GTextField();

    public constructor() {
        this._view = fairygui.UIPackage.createObject("Basic", "Main").asCom;
        this._view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        fairygui.GRoot.inst.addChild(this._view);

        // left_container
        this._leftContainer = this._view.getChild("left_container").asCom;
        const cnt: number = this._leftContainer.numChildren;
        for (let i: number = 0; i < cnt; i++) {
            const obj: fairygui.GObject = this._leftContainer.getChildAt(i);
            if (obj.group != null && obj.group.name == "template") {
                this.onDragDrop(obj.name);
            }
        }

        // right_container
        this._rightContainer = this._view.getChild("right_container").asCom;
        this._rightContainer.addEventListener(fairygui.DropEvent.DROP, this.__onDrop, this._view);

        // 所有的btn都可以进行拖动
        // const testBtn: fairygui.GButton = this._view.getChild("test").asButton;
        // testBtn.addEventListener(fairygui.DropEvent.DROP, this.__onDrop, this);
        // testBtn.draggable = true;

        const bounds: fairygui.GObject = this._rightContainer;
        const rect: egret.Rectangle = new egret.Rectangle();
        bounds.localToGlobalRect(0, 0, bounds.width, bounds.height, rect);
        fairygui.GRoot.inst.globalToLocalRect(rect.x, rect.y, rect.width, rect.height, rect);
        rect.x -= this._view.parent.x;

        // testBtn.dragBounds = rect;
        // testBtn.addEventListener(fairygui.DragEvent.DRAG_END, this.__onDragEnd, this);
    }

    /**
     * 将左边的内容拖动到右边
     * @param obj
     */
    private onDragDrop(obj: string): void {
        const btnB: fairygui.GButton = this._leftContainer.getChild(obj).asButton;
        btnB.draggable = true;
        btnB.addEventListener(fairygui.DragEvent.DRAG_START, this.__onDragStart, this._view);
    }

    /**
     * 开始拖动
     * @param evt
     * @private
     */
    private __onDragStart(evt: fairygui.DragEvent): void {
        //取消对原目标的拖动，换成一个替代品
        evt.preventDefault();

        const btn: fairygui.GButton = <fairygui.GButton><any>evt.currentTarget;
        fairygui.DragDropManager.inst.startDrag(btn, btn.icon, btn.icon);
    }

    private __onDrop(evt: fairygui.DropEvent): void {
        // const btn: fairygui.GButton = <fairygui.GButton><any>evt.currentTarget;
        // btn.icon = evt.source;
        // btn.title = "哈哈";
        //
        // console.log(evt.source);
        // console.log(evt);

        console.log(">>>>>>>>>>>>>>>>>>>>");

        const newBtn: fairygui.GButton = new fairygui.GButton();
        newBtn.setXY(300, 400);
        newBtn.text = "hello";
        newBtn.icon = evt.source;

        console.log(newBtn);


        console.log(this._rightContainer);

        // this._rightContainer.addChild(newBtn);
        fairygui.GRoot.inst.addChild(this._view);
    }

    private __onDragEnd(evt: fairygui.DragEvent): void {
        this.t.color = 0xDC143C;
        this.t.setSize(100, 100);
        this.t.setXY(0, 0);
        this.t.text = "stageX: " + evt.stageX + ", stageY:" + evt.stageY;

        this._rightContainer.removeChild(this.t);
        this._rightContainer.addChild(this.t);
    }
}