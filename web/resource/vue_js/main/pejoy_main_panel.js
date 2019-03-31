Vue.component('PejoyMainPanel', {
    template: '#PejoyMainPanel-template',
    props: {
    },
    data: function () {
        return{
            userData: "",
            userList: [],
            groupList: [],
            roleList: [],
            pageType: "",
            authorityLevel: 0,

            userInfoLoadingState: 0,

            userModifyLoadingState: 0,
        }
    },
    watch: {

    },
    methods: {
        init() {
            if(this.isUserDataNull()) {
                this.postRouter("/login");
            }

            this.assignMainModalAccess();

            // fetchUserList & fetchGroupList & fetchRoleList for gly
            if(this.authorityLevel > 1) {
                this.fetchUserList();
                this.fetchGroupList();
                this.fetchRoleList();
            }
        },
        loadLocalStorageLoginData() {
            this.userData = localStorage.getItem("pejoy/login/data");
        },
        isUserDataNull() {
            if(!this.userData || this.userData == "{}") {
                return true;
            }
            var dataObject = JSON.parse(this.userData);
            if(!dataObject.username ||
                !dataObject.password || !dataObject.role_code ||
                !dataObject.group_code || !JSON.stringify(dataObject.user_info)) {
                return true
            }
            return false;
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

        // decide which modal can be access by different user (role_code)
        assignMainModalAccess() {
            var role_code = JSON.parse(this.userData).role_code;
            if(role_code == 'gly') {
                this.authorityLevel = 2;
            } else if(role_code == 'zz') {
                this.authorityLevel = 1;
            } else {
                this.authorityLevel = 0;
            }
        },


        modifyUserInfo(userInfo) {
            var self = this;

            var curUser = JSON.parse(self.userData);
            curUser.user_info = userInfo;

            var options = {
                username: curUser.username,
                user_info: userInfo
            }

            self.userInfoLoadingState = 1;

            $.ajax({
                url: "http://127.0.0.1:1123/pejoy/main/user/modifyUserInfo",
                type: "POST",
                data: options
            }).done(function (respones) {
                self.userInfoLoadingState = 0;

                // write new data in localStorage
                localStorage.setItem("pejoy/login/data", JSON.stringify(curUser))

                console.log("modify user info success", respones);
            }).fail(function (respones) {
                self.userInfoLoadingState = 0;
                console.log("check login info fail", respones);
            });
        },

        fetchUserList() {

            var self = this;

            self.userList = [];

            $.ajax({
                url: "http://127.0.0.1:1123/pejoy/main/user/fetchUserList",
                type: "POST"
            }).done(function (respones) {
                if(respones.length > 0) {
                    self.userList = respones;
                    console.log("fetch user list success", respones);
                } else {
                    console.log("fetch user list fail", respones);
                }
            }).fail(function (respones) {
                console.log("fetch user list fail", respones);
            });
        },

        fetchGroupList() {

            var self = this;

            self.groupList = [];

            $.ajax({
                url: "http://127.0.0.1:1123/pejoy/login/fetchGroupList",
                type: "POST"
            }).done(function (respones) {
                if(respones.length > 0) {
                    console.log("fetch group list success", respones);
                    self.groupList = respones;
                } else {
                    console.log("fetch group list fail", respones);
                }
            }).fail(function (respones) {
                console.log("fetch group list fail", respones);
            });
        },

        fetchRoleList() {

            var self = this;

            self.roleList = [];

            $.ajax({
                url: "http://127.0.0.1:1123/pejoy/main/user/fetchRoleList",
                type: "POST"
            }).done(function (respones) {
                if(respones.length > 0) {
                    console.log("fetch role list success", respones);
                    self.roleList = respones;
                } else {
                    console.log("fetch role list fail", respones);
                }
            }).fail(function (respones) {
                console.log("fetch role list fail", respones);
            });
        },

        deleteUser(username) {

            var self = this;

            var option = {
                username: username
            };

            $.ajax({
                url: "http://127.0.0.1:1123/pejoy/main/user/deleteUser",
                type: "POST",
                data: option
            }).done(function (respones) {
                console.log("delete user success", respones);
            }).fail(function (respones) {
                console.log("delete user fail", respones);
            }).always(function () {
                self.fetchUserList();
            });
        },

        // modify user without userInfo
        modifyUser(user) {

            var self = this;

            self.userModifyLoadingState = 1;

            console.log(user);

            $.ajax({
                url: "http://127.0.0.1:1123/pejoy/main/user/modifyUser",
                type: "POST",
                data: user
            }).done(function (respones) {
                self.userModifyLoadingState = 0;
                console.log("modify user success", respones);
            }).fail(function (respones) {
                self.userModifyLoadingState = 0;
                console.log("modify user fail", respones);
            }).always(function () {
                self.fetchUserList();
            });
        }
    },
    beforeMount: function() {
        this.loadLocalStorageLoginData();
    },
    mounted: function() {
        this.init();
        console.debug("PejoyMainPanel-template mounted");
    }
});