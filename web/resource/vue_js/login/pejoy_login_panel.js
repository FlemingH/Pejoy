Vue.component('PejoyLoginPanel', {
    template: '#PejoyLoginPanel-template',
    props: {
    },
    data: function () {
        return{
            isUsernameNull: false,
            isPasswordNull: false,
            isRUsernameNull: false,
            isRPasswordNull: false,
            errorTitle: "",
            errorMessage: "",
            curForm: 0,
            curUsername: "",
            curPassword: ""
        }
    },
    watch: {

    },
    methods: {
        switchArea() {
            if(this.curForm == 0) {
                this.curForm = 1;
            } else {
                this.curForm = 0;
            }
        },
        checkLoginInput() {
            if(!$('#usernameInput').val()) {
                this.isUsernameNull = true;
            } else {
                this.isUsernameNull = false;
            }
            if(!$('#passwordInput').val()) {
                this.isPasswordNull = true;
            } else {
                this.isPasswordNull = false;
            }
        },
        checkRegisterInput() {
            if(!$('#usernameInputR').val()) {
                this.isRUsernameNull = true;
            } else {
                this.isRUsernameNull = false;
            }
            if(!$('#passwordInputR').val()) {
                this.isRPasswordNull = true;
            } else {
                this.isRPasswordNull = false;
            }
        },
        registerOnClick() {
            this.switchArea();
        },
        loginOnClick() {
            this.switchArea();
        },
        loginButtonOnClick() {
            this.checkLoginInput();
            this.curUsername = $('#usernameInput').val();
            this.curPassword = $('#passwordInput').val();

        },
        registerButtonOnClick() {
            this.checkRegisterInput();
            this.curUsername = $('#usernameInputR').val();
            this.curPassword = $('#passwordInputR').val();
        }
    },
    mounted: function() {
        console.debug("NewGoMainPanel-template mounted");
    }
});