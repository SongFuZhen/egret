//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private spr: egret.Sprite;

    private onAddToStage(event: egret.Event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.stage.scaleMode = egret.StageScaleMode.FIXED_NARROW;

        this.runGame().catch(e => {
            console.log(e);
        })

    }

    private async runGame() {
        await this.loadResource();
        fairygui.UIPackage.addPackage("basic");

        fairygui.UIConfig.defaultFont = "宋体";
        fairygui.UIConfig.verticalScrollBar = fairygui.UIPackage.getItemURL("Basic", "ScrollBar_VT");
        fairygui.UIConfig.horizontalScrollBar = fairygui.UIPackage.getItemURL("Basic", "ScrollBar_HZ");
        fairygui.UIConfig.popupMenu = fairygui.UIPackage.getItemURL("Basic", "PopupMenu");
        fairygui.UIConfig.buttonSound = fairygui.UIPackage.getItemURL("Basic", "click");

        this.stage.addChild(fairygui.GRoot.inst.displayObject);

        this.spr = new egret.Sprite();
        this.spr.width = this.stage.stageWidth;
        this.spr.height = this.stage.$stageHeight;
        this.spr.graphics.beginFill(0x8DDE99);
        this.spr.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.$stageHeight);
        this.spr.graphics.endFill();

        this.addChild(this.spr);

        this.onTimerShow();
        this.onShowAnim();

        this.onVirtualFactoryShow();

        this.onFairyGuiShow();
    }

    /**
     * Timer Game Show
     */
    private onTimerShow(): void {
        const timerImg = Main.createBitmapByName("zzd_png");
        const rect: egret.Rectangle = new egret.Rectangle(10, 10, 15, 15);

        timerImg.scale9Grid = rect;
        timerImg.y = 200;
        timerImg.x = 120;
        this.spr.addChild(timerImg);

        this.spr.touchEnabled = true;
        timerImg.touchEnabled = true;
        timerImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTimerTouch, this, true);
    }

    private onTimerTouch() {
        this.spr.removeChildren();
        const timerUI = new Timer();
        this.spr.addChild(timerUI);
    }

    /**
     * Anim Show
     */
    private onShowAnim(): void {
        const animImg = Main.createBitmapByName("btn");

        const rect: egret.Rectangle = new egret.Rectangle(10, 10, 15, 15);

        animImg.scale9Grid = rect;

        animImg.y = 300;
        animImg.x = 120;

        this.spr.addChild(animImg);

        this.spr.touchEnabled = true;
        animImg.touchEnabled = true;
        animImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAnimTouch, this, true);

    }

    private onAnimTouch() {
        this.spr.removeChildren();
        const animUI = new Anim();
        this.spr.addChild(animUI);
    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("button", 0, loadingView);
            await RES.loadGroup("preload", 1, loadingView);
            await RES.loadGroup("factory", 2, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    /**
     * 虚拟工厂展示图
     */
    private onVirtualFactoryShow() {
        const virtualFactoryImg = Main.createBitmapByName("xngc_png");

        const rect: egret.Rectangle = new egret.Rectangle(10, 10, 15, 15);

        virtualFactoryImg.scale9Grid = rect;

        virtualFactoryImg.y = 400;
        virtualFactoryImg.x = 120;

        this.spr.addChild(virtualFactoryImg);

        this.spr.touchEnabled = true;
        virtualFactoryImg.touchEnabled = true;
        virtualFactoryImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onVirtualFactory, this, true);
    }

    private onVirtualFactory(): void {
        this.spr.removeChildren();
        const virtualFactory = new VirtualFactory();
        this.spr.addChild(virtualFactory);
    }


    /**
     * Fairy UI
     */
    private onFairyGuiShow() {
        const virtualFactoryImg = Main.createBitmapByName("xngc_png");

        const rect: egret.Rectangle = new egret.Rectangle(10, 10, 15, 15);

        virtualFactoryImg.scale9Grid = rect;

        virtualFactoryImg.y = 500;
        virtualFactoryImg.x = 120;

        this.spr.addChild(virtualFactoryImg);

        this.spr.touchEnabled = true;
        virtualFactoryImg.touchEnabled = true;
        virtualFactoryImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFairyGui, this, true);
    }

    private onFairyGui(): void {
        this.spr.removeChildren();
        const fairyGui = new FairyGui();
        this.spr.addChild(fairyGui);
    }


    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    public static createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

}





