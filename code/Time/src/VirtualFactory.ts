class VirtualFactory extends egret.DisplayObjectContainer {
    public constructor() {
        super();

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private stageW: number;
    private stageH: number;

    private onAddToStage(): void {

        // 使用 1024 * 768
        // this.stageW = this.stage.stageWidth;
        // this.stageH = this.stage.stageHeight;

        this.stageW = 1366;
        this.stageH = 960;

        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.stage.scaleMode = egret.StageScaleMode.FIXED_NARROW;

        this.showVirtualFactory().catch(e => {
            console.log(e);
        })
    }

    private async showVirtualFactory() {
        // 显示字体
        const t: egret.TextField = new egret.TextField();
        t.text = "虚拟工厂配置MVP";
        t.textAlign = egret.HorizontalAlign.CENTER;
        t.size = 20;
        t.textColor = 0x000000;
        t.x = 0;
        t.y = 0;
        this.addChild(t);

        // 分成左右两部分，左边是所有内容，右边是绘图区
        const leftCon = new egret.DisplayObjectContainer();
        leftCon.x = 0;
        leftCon.y = 0;
        this.addChild(leftCon);

        // 左边拖动区的区域
        const leftBorder: egret.Shape = new egret.Shape();
        leftBorder.graphics.lineStyle(2, 0xF0F8FF, 2, true);
        leftBorder.graphics.lineTo(0, 0);
        leftBorder.graphics.lineTo(200, 0);
        leftBorder.graphics.lineTo(200, this.stageH);
        leftBorder.graphics.lineTo(0, this.stageH);
        leftBorder.graphics.lineTo(0, 0);
        leftBorder.graphics.endFill();
        leftBorder.x = 0;
        leftBorder.y = 40;
        leftCon.addChild(leftBorder);

        for (const i in this.templateJson) {
            this.generateTemplate(this.templateJson[i], leftCon);
        }

        // 右侧框架
        const rightCon = new egret.DisplayObjectContainer();
        this.addChild(rightCon);

        const rightBorder: egret.Shape = new egret.Shape();
        rightBorder.graphics.lineStyle(2, 0xF0F8FF, 2, true);
        rightBorder.graphics.lineTo(0, 0);
        rightBorder.graphics.lineTo(this.stageW, 0);
        rightBorder.graphics.lineTo(this.stageW, this.stageH);
        rightBorder.graphics.lineTo(0, this.stageH);
        rightBorder.graphics.lineTo(0, 0);
        rightBorder.graphics.endFill();

        rightBorder.x = 210;
        rightBorder.y = 40;

        rightCon.addChild(rightBorder);

        for (const i in this.pseudoData.data) {
            this.drawIcon(this.pseudoData.data[i], rightCon);
        }
    }

    // 绘图假数据
    private pseudoData = {
        "result": true,
        "state": 200,
        "data": [
            {
                "category": "table",
                "type": "table",
                "width": 974,
                "height": 304,
                "icon": "table_png",
                "x": 220,
                "y": 140,
                "rotation": 0,
                "z-index": 0,
            },
            {
                "category": "worker",
                "type": "people",
                "width": 128,
                "height": 128,
                "icon": "people_gif",
                "x": 325,
                "y": 70,
                "rotation": 0,
                "z-index": 0,
            },
            {
                "category": "worker",
                "type": "worker",
                "width": 128,
                "height": 128,
                "icon": "worker_png",
                "x": 545,
                "y": 70,
                "rotation": 0,
                "z-index": 0,
            },
            {
                "category": "worker",
                "type": "worker",
                "width": 128,
                "height": 128,
                "icon": "worker_png",
                "x": 300,
                "y": 360,
                "rotation": 180,
                "z-index": 0,
            },
            {
                "category": "worker",
                "type": "worker",
                "width": 128,
                "height": 128,
                "icon": "worker_png",
                "x": 500,
                "y": 360,
                "rotation": 180,
                "z-index": 0,
            },
            {
                "category": "worker",
                "type": "worker",
                "width": 128,
                "height": 128,
                "icon": "worker_png",
                "x": 700,
                "y": 360,
                "rotation": 180,
                "z-index": 0,
            },
            // 路线
            {
                "category": "way",
                "type": "way",
                "width": 169,
                "height": 555,
                "icon": "way_png",
                "x": 1380,
                "y": 70,
                "rotation": 0,
                "z-index": 0,
            },
            {
                "category": "way",
                "type": "way",
                "width": 169,
                "height": 555,
                "icon": "way_png",
                "x": 1380,
                "y": 347.5,
                "rotation": 0,
                "z-index": 0,
            },
            {
                "category": "way",
                "type": "way",
                "width": 169,
                "height": 555,
                "icon": "way_png",
                "x": 1380,
                "y": 625,
                "rotation": 0,
                "z-index": 0,
            },
            // 叉车
            {
                "category": "stacker",
                "type": "stacker",
                "width": 125,
                "height": 110,
                "icon": "stacker_png",
                "x": 1390,
                "y": 80,
                "rotation": 0,
                "z-index": 1,
            },
            {
                "category": "stacker",
                "type": "stacker",
                "width": 125,
                "height": 110,
                "icon": "stacker_png",
                "x": 1390,
                "y": 180,
                "rotation": 0,
                "z-index": 1,
            },
            {
                "category": "stacker",
                "type": "stacker",
                "width": 125,
                "height": 110,
                "icon": "stacker_png",
                "x": 1390,
                "y": 280,
                "rotation": 0,
                "z-index": 1,
            },
            // {
            //     "category": "way",
            //     "type": "way",
            //     "width": 169,
            //     "height": 555,
            //     "icon": "way_png",
            //     "x": 1383,
            //     "y": 818,
            //     "rotation": 90
            // },
            {
                "category": "workstation",
                "type": "workstation",
                "width": 218,
                "height": 218,
                "icon": "workstation_png",
                "x": 730,
                "y": 160,
                "rotation": 0
            },
            // 第二个台子
            {
                "category": "table",
                "type": "table",
                "width": 974,
                "height": 304,
                "icon": "table_png",
                "x": 1350,
                "y": 290,
                "rotation": 180,
                "z-index": 0,
            },
            {
                "category": "worker",
                "type": "worker",
                "width": 128,
                "height": 128,
                "icon": "worker_png",
                "x": 880,
                "y": 70,
                "rotation": 0,
                "z-index": 0,
            },
            {
                "category": "worker",
                "type": "worker",
                "width": 128,
                "height": 128,
                "icon": "worker_png",
                "x": 1075,
                "y": 70,
                "rotation": 0,
                "z-index": 0,
            },
            {
                "category": "worker",
                "type": "worker",
                "width": 128,
                "height": 128,
                "icon": "worker_png",
                "x": 1275,
                "y": 70,
                "rotation": 0,
                "z-index": 0,
            },

            {
                "category": "worker",
                "type": "worker",
                "width": 128,
                "height": 128,
                "icon": "worker_png",
                "x": 1030,
                "y": 360,
                "rotation": 180,
                "z-index": 0,
            },
            {
                "category": "worker",
                "type": "worker",
                "width": 128,
                "height": 128,
                "icon": "worker_png",
                "x": 1250,
                "y": 360,
                "rotation": 180,
                "z-index": 0,
            }
        ],
        "message": "",
        "error_message": ""
    };


    // 左边 模板展示
    private templateJson = [
        {
            "category": "stacker",
            "type": "stacker",
            "width": 125,
            "height": 110,
            "icon": "stacker_png",
            "x": 0,
            // "y": 65
            "y": 0
        },
        {
            "category": "worker",
            "type": "worker",
            "width": 128,
            "height": 128,
            "icon": "worker_png",
            "x": 72,
            // "y": 253
            "y": 0
        },
        {
            "category": "workstation",
            "type": "ws1",
            "width": 512,
            "height": 512,
            "icon": "workstation_png",
            "x": 72,
            "y": 441
        },
    ];


    /**
     * 左侧的模板显示
     */
    private iconY = 60;

    private generateTemplate(t, leftCon: egret.DisplayObjectContainer) {
        const templateIconName = t.icon;
        let template = Main.createBitmapByName(templateIconName);
        template.name = t.category + "_" + t.type;

        let iconW = t.width;
        let iconH = t.height;

        if (t.width > 256) {
            iconW = 128;
            iconH = (iconW / t.width) * t.height;
        }

        // 动态设置位置
        t.x = (256 - iconW) / 2;
        t.y = this.iconY;

        template.x = (256 - iconW) / 2 - 30;
        template.y = this.iconY;

        template.width = iconW;
        template.height = iconH;

        leftCon.addChild(template);
        this.iconY = iconH + this.iconY + 60;
        // 不让拖动
        template.touchEnabled = true;
        let templateDrag: boolean = false;
        template.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
            templateDrag = true;
        }, leftCon);

        template.addEventListener(egret.TouchEvent.TOUCH_MOVE, (e) => {
            if (templateDrag) {
                template.x = e.stageX - template.width / 2;
                template.y = e.stageY - template.height / 2;
            }
        }, leftCon);

        template.addEventListener(egret.TouchEvent.TOUCH_END, (e) => {
            templateDrag = false;

            let templateCopy = null;
            for (const i in this.templateJson) {
                if (template.name === (this.templateJson[i].category + "_" + this.templateJson[i].type)) {
                    templateCopy = {
                        "category": this.templateJson[i].category,
                        "type": this.templateJson[i].type,
                        "width": this.templateJson[i].width,
                        "height": this.templateJson[i].height,
                        "icon": this.templateJson[i].icon,
                        "x": this.templateJson[i].x,
                        "y": this.templateJson[i].y,
                    };
                    break;
                }
            }

            if (templateCopy != null) {
                this.generateTemplate(templateCopy, leftCon);
            }

        }, leftCon);
    }


    private drawIcon(t, rightCon: egret.DisplayObjectContainer) {
        let icon = Main.createBitmapByName(t.icon);

        icon.width = t.width / 2;
        icon.height = t.height / 2;

        icon.rotation = t.rotation;
        icon.x = t.x;
        icon.y = t.y;

        rightCon.addChild(icon);

        // let iconDrag: boolean = false;

        // icon.touchEnabled = true;
        // icon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
        //     iconDrag = true;
        // }, rightCon);
        //
        // icon.addEventListener(egret.TouchEvent.TOUCH_MOVE, (e) => {
        //     if (iconDrag) {
        //         icon.x = e.stageX - icon.width / 2;
        //         icon.y = e.stageY - icon.height / 2;
        //     }
        // }, rightCon);
        //
        // icon.addEventListener(egret.TouchEvent.TOUCH_END, () => {
        //     iconDrag = false;
        // }, rightCon);

    }


}