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
        // this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        // this.stage.scaleMode = egret.StageScaleMode.FIXED_NARROW;

        this.runGame().catch(e => {
            console.log(e);
        })

    }

    private timer: egret.Timer;

    private async runGame() {
        await this.loadResource();

        this.spr = new egret.Sprite();
        this.spr.width = 480;
        this.spr.height = 800;
        this.addChild(this.spr);

        this.drawText();
        this.drawContent();
        this.onButtonComp();

        this.timer = new egret.Timer(1000, 8);

        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
    }

    private timerFunc(): void {
        if (this.n <= 3) {
            this.num.text = '?';
        } else {
            this.spr.removeChildren();
            this.drawText();
        }

        this.n--;
    }

    private timerComFunc(): void {
        if (this.n <= -2) {
            this.drawContent();
            this.con.text = "别迷糊了，赶紧醒醒;"
            this.spr.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchSRP, this, true);

            this.img.alpha = 1;
        }
    }

    private n: number = 6;
    private num: egret.TextField;
    private con: egret.TextField;

    private drawText() {
        this.num = new egret.TextField();
        this.num.text = this.n.toString();
        this.num.size = 100;
        this.num.width = 480;
        this.num.textColor = 0x00ff00;
        this.num.textAlign = egret.HorizontalAlign.CENTER;

        this.spr.addChild(this.num);
    }

    private drawContent(): void {
        this.con = new egret.TextField();
        this.con.text = "默默倒数6秒，迅速点击文字";
        this.con.width = 480;
        this.con.textColor = 0x00ff00;
        this.con.textAlign = egret.HorizontalAlign.CENTER;
        this.con.y = 120;
        this.spr.addChild(this.con);
    }

    private img: egret.Bitmap;
    private startTime: number;
    private stopTime: number;
    private finalTime: number;

    private onButtonComp(): void {
        this.img = this.createBitmapByName("btn");
        const rect: egret.Rectangle = new egret.Rectangle(10, 10, 15, 15);

        this.img.scale9Grid = rect;
        this.img.y = 200;
        this.img.x = 120;

        // this.img.width *= 5;
        // this.img.height = 70;

        this.spr.addChild(this.img);

        this.spr.touchEnabled = true;
        this.img.touchEnabled = true;
        this.img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this, true);
    }

    private onTouch(evt: egret.Event) {
        this.startTime = new Date().getTime();
        this.img.alpha = 0;
        this.timer.start();
        this.drawText();
        this.spr.touchEnabled = true;
        this.spr.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchSRP, this, true);
    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("button", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private onTouchSRP(evt: egret.Event) {
        this.spr.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchSRP, this, true);
        this.timer.stop();
        this.stopTime = new Date().getTime();
        this.finalTime = this.startTime - this.stopTime;

        this.num.text = (this.finalTime / 1000 + 6).toFixed(3);
        this.drawContent();

        switch (Math.floor(Math.abs(this.finalTime / 1000 + 6))) {
            case 0:
                this.con.text = "帅气的专注";
                break;
            case 1:
                this.con.text = "很专注，还需继续努力";
                break;
            case 2:
                this.con.text = "别摸糊了，赶紧醒醒";
                break;
            default:
                break;
        }

    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }


}





