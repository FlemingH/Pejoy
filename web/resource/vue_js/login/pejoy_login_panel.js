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
            successTitle: "",
            successMessage: "",
            curForm: 0,
            curUsername: "",
            curPassword: "",
            loadingState: 0,
            userGroupList: [],
        }
    },
    watch: {

    },
    methods: {
        init() {
            this.reset();
            this.initGroupDropDown();
        },
        // set respones to semantic dropdown values beforeMount
        formatGroupDropDown(respones) {

            var t_selection = {
                value: "",
                name: ""
            }

            for(var i = 0; i < respones.length; i++) {
                t_selection.value = respones[i].group_code;
                t_selection.name = respones[i].group_name;
                this.userGroupList.push(t_selection);
            }
        },
        initGroupDropDown() {
            $('.groupDropDown').dropdown();
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
        showSuccessMessage() {
            $('.successMsgArea').show();
        },
        hideSuccessMessage() {
            this.successTitle = '';
            this.successMessage = '';
            $('.successMsgArea').hide();
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

            self.hideErrorMessage();
            self.hideSuccessMessage();

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

            } else if(respones.messageState == "success") {
                console.log("check login info success", JSON.parse(respones.messageData));

                // write params in localStorage
                localStorage.setItem("pejoy/login/data", respones.messageData)

                // goPejoyMain use post
                this.postRouter("/");
            }
        },
        handleRegister(respones) {

            var self = this;

            self.hideSuccessMessage();
            self.hideErrorMessage();

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
                url: "http://127.0.0.1:1123/pejoy/login/checkInfo",
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
                group_code: $('.groupDropDown').dropdown('get value'),
                user_info: '{}'
            }

            console.log(options);

            self.loadingState = 1;
            self.hideErrorMessage();
            self.hideSuccessMessage();

            $.ajax({
                url: "http://127.0.0.1:1123/pejoy/login/addUser",
                type: "POST",
                data: options
            }).done(function (respones) {
                self.loadingState = 0;

                self.successTitle = "注册成功！";
                self.successMessage = "您的账号现在可以使用。";
                self.showSuccessMessage();
                console.log("register user success", respones)

            }).fail(function (respones) {
                self.loadingState = 0;
                self.errorTitle = "注册失败！"
                self.errorMessage = "网络错误。"
                self.showErrorMessage();
                console.log("register user fail", respones);
            });
        },

        fetchGroupList() {

            var self = this;

            self.userGroupList = [];

            $.ajax({
                url: "http://127.0.0.1:1123/pejoy/login/fetchGroupList",
                type: "POST"
            }).done(function (respones) {

                if(respones.length > 0) {
                    console.log("fetch group list success", respones);
                    self.formatGroupDropDown(respones);
                } else {
                    console.log("fetch group list fail", respones);
                    self.userGroupList = [
                        {
                            value: "default",
                            name: "默认"
                        }
                    ]
                }

            }).fail(function (respones) {
                console.log("fetch group list fail", respones);
                self.userGroupList = [
                    {
                        value: "default",
                        name: "默认"
                    }
                ]
            });
        },

        postRouter(url) {
            var temp = document.createElement("form");
            temp.action = url;
            temp.method = "post";
            temp.style.display = "none";
            document.body.appendChild(temp);
            temp.submit();
            return temp;
        },
    },
    beforeMount: function() {
        this.fetchGroupList();
    },
    mounted: function() {
        this.init();
        console.debug("PejoyLoginPanel-template mounted");
    }
});