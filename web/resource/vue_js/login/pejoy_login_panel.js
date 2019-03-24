Vue.component('PejoyLoginPanel', {
    template: '#PejoyLoginPanel-template',
    props: {
    },
    data: function () {
        return{
            isUsernameNull: false,
            isPasswordNull: false,
            errorTitle: "",
            errorMessage: "",
            curForm: 0,
            curUsername: "",
            curPassword: "",
            loadingState: 0,
        }
    },
    watch: {

    },
    methods: {
        init() {
            this.reset();
        },
        reset() {
            this.hideErrorMessage();
            this.curUsername = "";
            this.curPassword = "";
            this.loadingState = 0;
            this.isUsernameNull = false;
            this.isPasswordNull = false;
            this.isRUsernameNull = false;
            this.isRPasswordNull = false;
        },
        switchArea() {
            this.reset();
            if(this.curForm == 0) {
                this.curForm = 1;
            } else {
                this.curForm = 0;
            }
        },
        checkInput() {
            if(!this.curUsername) {
                this.isUsernameNull = true;
            } else {
                this.isUsernameNull = false;
            }
            if(!this.curPassword) {
                this.isPasswordNull = true;
            } else {
                this.isPasswordNull = false;
            }
        },
        showErrorMessage() {
            $('.errorMsgArea').show();
        },
        hideErrorMessage() {
            this.errorTitle = '';
            this.errorMessage = '';
            $('.errorMsgArea').hide();
        },
        registerOnClick() {
            this.switchArea();
        },
        loginOnClick() {
            this.switchArea();
        },
        loginButtonOnClick() {
            this.checkInput();

            if(this.curUsername && this.curPassword) {
                this.checkLoginInfo();
            }
        },
        registerButtonOnClick() {
            this.checkInput();
        },
        checkLoginInfo() {

            var self = this;

            var options = {
                username: this.curUsername,
                password: this.curPassword
            }

            self.loadingState = 1;
            self.hideErrorMessage();

            $.ajax({
                url: "http://127.0.0.1:1123/checkLoginInfo",
                type: "POST",
                data: options
            }).done(function (respones) {
                self.loadingState = 0;

                if("data not found" == respones.messageData) {

                    self.errorTitle = "登录失败！";
                    self.errorMessage = "用户不存在，请检查输入的信息。";
                    self.showErrorMessage();
                    console.log("check login info fail", respones);

                } else if("db error" == respones.messageData) {

                    self.errorTitle = "登录失败！";
                    self.errorMessage = "用户信息错误，检查输入的信息。";
                    self.showErrorMessage();
                    console.log("check login info fail", respones);

                } else if("data error" == respones.messageData) {

                    self.errorTitle = "登录失败！";
                    self.errorMessage = "用户信息错误，检查输入的信息。";
                    self.showErrorMessage();
                    console.log("check login info fail", respones);

                } else if(!respones.messageData && respones.messageState == "success") {
                    console.log("check login info success", respones);
                }

            }).fail(function (respones) {
                self.loadingState = 0;
                self.errorTitle = "登录失败！"
                self.errorMessage = "网络错误。"
                self.showErrorMessage();
                console.log("check login info fail", respones);
            });

        }
    },
    mounted: function() {
        this.init();
        console.debug("NewGoMainPanel-template mounted");
    }
});