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

        const btn: fairygui.GButton = <fairygui.GButton><any>evt.currentTarget;
        fairygui.DragDropManager.inst.startDrag(btn, btn.icon, btn.icon);
    }

    private __onDrop(evt: fairygui.DropEvent): void {
        // 弹框，添加属性

        const cnt: number = this._rightContainer.numChildren;

        const btn: fairygui.GButton = fairygui.UIPackage.createObject("Basic", "BagGridSub").asButton;
        btn.icon = evt.source;
        // btn.title = "haha";
        btn.x = evt.target.x;
        btn.y = evt.target.y;
        btn.draggable = true;
        btn.sortingOrder = cnt + 1;
        // btn.addEventListener(fairygui.GButton.OVER, this.__onBtnRollOver, this);

        // 使用区域控制
        const obj = this._rightContainer;
        const bounds: fairygui.GObject = this._rightContainer;
        const rect: egret.Rectangle = new egret.Rectangle();
        bounds.localToGlobalRect(0, 0, bounds.width, bounds.height, rect);
        fairygui.GRoot.inst.globalToLocalRect(rect.x, rect.y, rect.width, rect.height, rect);

        console.log(btn);

        //因为这时候面板还在从右往左动，所以rect不准确，需要用相对位置算出最终停下来的范围
        rect.x -= obj.parent.x;
        btn.dragBounds = rect;

        for (let i: number = 0; i < cnt; i++) {
            if (evt.source.id == this._rightContainer.getChildAt(i).id) {
                return;
            }
        }

        // 如果在里面移动，就不需要添加了
        this._rightContainer.addChild(btn);

        btn.addClickListener(this.__onClick, this);

        // btn.addEventListener(fairygui.GButton.OVER, this.__onBtnRollOver, this);
    }

    private _win: fairygui.Window;

    private __onClick(): void {
        console.log("点击事件....");

        if (this._win == null) {
            this._win = new WindowsA();
            this._win.show();
        }
    }

    private __onBtnRollOver(): void {
        console.log("btn, 放上去了...............");
    }


    // private __onDragEnd(evt: fairygui.DragEvent): void {
    //     console.log(">...............");
    //
    //     this.t.color = 0xDC143C;
    //     this.t.setSize(100, 100);
    //     this.t.setXY(0, 0);
    //     this.t.text = "stageX: " + evt.stageX + ", stageY:" + evt.stageY;
    //
    //     console.log(this.t);
    //     this._rightContainer.removeChild(this.t);
    //     this._rightContainer.addChild(this.t);
    // }
}