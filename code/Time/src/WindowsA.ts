class WindowsA extends fairygui.Window {
    public constructor() {
        super();
    }

    protected onInit(): void {
        this.contentPane = fairygui.UIPackage.createObject("Basic", "Window").asCom;
        this.center();

        //弹出窗口的动效已中心为轴心
        this.setPivot(0.5, 0.5);

        console.log(this.contentPane);

        const myFrame: fairygui.GLabel = this.contentPane.getChild("frame").asLabel;
        myFrame.title = "弹框";

        const closeBtn: fairygui.GButton = myFrame.getChild("closeBtn").asButton;
        closeBtn.addClickListener(this.__onClick, this);

        const inputGroup: fairygui.GComponent = this.contentPane.getChild("inputGroup").asCom;
        const ig_label: fairygui.GTextField = inputGroup.getChild("label").asTextField;

        ig_label.text = "测试：";

        console.log("whearwkerhwek");
        console.log(ig_label)


        console.log("inputGroup...............");
        console.log(ig_label);

    }

    protected onShown(): void {
        console.log(">>>>>>>>>>>>>>>>>>>>显示>>>>>>>>>>>");
    }

    protected onHide(): void {
        console.log("隐藏。。。。");
    }

    private __onClick(): void {
        console.log(">>>>>>>>>>>");
    }

}