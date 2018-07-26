class Timer extends egret.DisplayObjectContainer {

    public constructor() {
        super();

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }


    private onAddToStage() {
        this.showTimerGame().catch(e => {
            console.log(e);
        })
    }

    private n: number = 6;
    private num: egret.TextField;
    private con: egret.TextField;
    private img: egret.Bitmap;

    private timer: egret.Timer;

    private startTime: number;
    private stopTime: number;
    private finalTime: number;

    private async showTimerGame() {
        this.drawText();
        this.drawContent();
        this.onButtonComp();

        this.timer = new egret.Timer(1000, 8);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);

        this.returnMainPage();
    }

    private returnButton(): void {
        // const returnImg = Main.createBitmapByName("egret_icon_png");
        //
        // returnImg.x = 120;
        // returnImg.y = 200;

        const returnTextField = new egret.TextField();

        returnTextField.text = '重新玩游戏';
        returnTextField.x = 160;
        returnTextField.y = 200;

        this.addChild(returnTextField);

        returnTextField.touchEnabled = true;
        returnTextField.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReturnTouch, this, true);
    }

    private onReturnTouch(): void {
        this.n = 6;
        this.removeChildren();

        this.showTimerGame().catch(e => {
            console.log(e);
        })
    }

    private onButtonComp(): void {
        this.img = Main.createBitmapByName("play_png");
        const rect: egret.Rectangle = new egret.Rectangle(10, 10, 15, 15);

        this.img.scale9Grid = rect;
        this.img.y = 180;
        this.img.x = 120;
        this.addChild(this.img);

        this.img.touchEnabled = true;
        this.img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this, true);
    }

    private onTouch(): void {
        this.startTime = new Date().getTime();
        this.img.alpha = 0;
        this.timer.start();
        this.drawText();

        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchSRP, this, true);
    }

    private drawText() {
        this.num = new egret.TextField();
        this.num.text = this.n.toString();
        this.num.size = 100;
        this.num.width = 480;
        this.num.textColor = 0x00ff00;
        this.num.textAlign = egret.HorizontalAlign.CENTER;

        this.addChild(this.num);
    }

    private drawContent(): void {
        this.con = new egret.TextField();
        this.con.text = "默默倒数6秒，迅速点击文字";
        this.con.width = 480;
        this.con.textColor = 0x00ff00;
        this.con.textAlign = egret.HorizontalAlign.CENTER;
        this.con.y = 120;
        this.addChild(this.con);
    }

    private timerFunc(): void {
        if (this.n <= 3) {
            this.num.text = '?';
        } else {
            this.removeChildren();
            this.drawText();
        }

        this.n--;
    }

    private timerComFunc(): void {
        if (this.n <= -2) {
            this.drawContent();
            this.con.text = "别迷糊了，赶紧醒醒;";
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchSRP, this, true);

            this.img.alpha = 1;


        }
    }

    private onTouchSRP(evt: egret.Event) {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchSRP, this, true);
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

        this.returnButton();
    }

    private returnMainPage(): void {
        const returnMain: egret.TextField = new egret.TextField();
        returnMain.x = 180;
        returnMain.y = 320;
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