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
            if(!this.curUsername ||
                !$('#usernameInput').val().trim() ||
                !$('#usernameInputR').val().trim()) {

                this.isUsernameNull = true;

            } else {
                this.isUsernameNull = false;
            }

            if(!this.curPassword ||
                !$('#passwordInput').val().trim() ||
                !$('#passwordInputR').val().trim()) {

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
            // check input is null
            this.checkInput();

            if(!this.isUsernameNull && !this.isPasswordNull) {
                // send ajax
                this.checkInfo();
            }
        },
        registerButtonOnClick() {
            // check input is null
            this.checkInput();

            if(!this.isUsernameNull && !this.isPasswordNull) {
                // send ajax
                this.checkInfo();
            }
        },

        handleLogin(respones) {

            var self = this;

            if("data not found" == respones.messageData) {

                self.errorTitle = "登录失败！";
                self.errorMessage = "用户不存在，请检查输入的信息。";
                self.showErrorMessage();
                console.log("check login info fail", respones);

            } else if("db error" == respones.messageData) {

                self.errorTitle = "登录失败！";
                self.errorMessage = "用户信息错误，请检查输入的信息。";
                self.showErrorMessage();
                console.log("check login info fail", respones);

            } else if("data error" == respones.messageData) {

                self.errorTitle = "登录失败！";
                self.errorMessage = "用户信息错误，请检查输入的信息。";
                self.showErrorMessage();
                console.log("check login info fail", respones);

            } else if(!respones.messageData && respones.messageState == "success") {
                console.log("check login info success", respones);
            }
        },
        handleRegister(respones) {

            var self = this;

            // no such user can register
            if("data not found" == respones.messageData) {

                this.registerUser();

            // user exist can't register
            } else {
                self.errorTitle = "注册失败！";
                self.errorMessage = "此用户名存在，请重新输入信息。";
                self.showErrorMessage();
                console.log("register user fail", respones);
            }
        },

        checkInfo() {

            var self = this;

            var options = {
                username: this.curUsername.trim(),
                password: this.curPassword.trim()
            }

            self.loadingState = 1;
            self.hideErrorMessage();

            $.ajax({
                url: "http://127.0.0.1:1123/pejoy/index/checkInfo",
                type: "POST",
                data: options
            }).done(function (respones) {
                self.loadingState = 0;

                // handle register
                if(self.curForm == 1) {

                    self.handleRegister(respones);

                // handle login
                } else {

                    self.handleLogin(respones);

                }

            }).fail(function (respones) {
                self.loadingState = 0;
                self.errorTitle = "登录失败！"
                self.errorMessage = "网络错误。"
                self.showErrorMessage();
                console.log("check login info fail", respones);
            });

        },
        registerUser() {

            var self = this;

            var options = {
                username: this.curUsername.trim(),
                password: this.curPassword.trim(),
                role_code: 'yh',
                user_info: '{}'
            }

            self.loadingState = 1;
            self.hideErrorMessage();

            $.ajax({
                url: "http://127.0.0.1:1123/pejoy/index/addUser",
                type: "POST",
                data: options
            }).done(function (respones) {
                self.loadingState = 0;

                console.log("register user success", respones)

            }).fail(function (respones) {
                self.loadingState = 0;
                self.errorTitle = "注册失败！"
                self.errorMessage = "网络错误。"
                self.showErrorMessage();
                console.log("register user fail", respones);
            });
        }
    },
    mounted: function() {
        this.init();
        console.debug("NewGoMainPanel-template mounted");
    }
});