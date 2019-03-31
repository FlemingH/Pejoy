Vue.component('PejoyMainUserMgrModal', {
    template: '#PejoyMainUserMgrModal-template',
    props: {
        user_list: {
            type: Array,
            default: 0,
            required: true
        },
        role_list: {
            type: Array,
            default: 0,
            required: true
        },
        group_list: {
            type: Array,
            default: 0,
            required: true
        },
        user_modify_loading_state: {
            type: Number,
            default: 0,
            required: true
        }
    },
    data: function () {
        return{
            title: "用户管理",
            userList: [],
            roleList: [],
            roleDropDownData: [],
            groupList: [],
            groupDropDownData: [],
            curUsername: "",
            curPassword: "",
            curRoleCode: "",
            curGroupCode: "",
            userModifyLoadingState: 0,
        }
    },
    watch: {
        user_list: function (newVal, oldVal) {
            this.userList = newVal;
        },
        role_list: function (newVal, oldVal) {
            if(newVal.length > 0) {
                this.roleList = newVal;
                this.formatRoleDropDown();
                this.initDropDown();
            }
        },
        group_list: function (newVal, oldVal) {
            if(newVal.length > 0) {
                this.groupList = newVal;
                this.formatGroupDropDown();
                this.initDropDown();
            }
        },
        user_modify_loading_state: function (newVal, oldVal) {
            this.userModifyLoadingState = newVal;
        }
    },
    methods: {
        init() {
            this.reset();
            this.userList = this.user_list;
            this.groupList = this.group_list;
            this.roleList = this.role_list;
        },
        reset() {
            this.curUsername = "";
            this.curPassword = "";
            this.curRoleCode = "";
            this.curGroupCode = "";
            $('.editUsernameInput').val();
            $('.editPasswordInput').val();
            $('.roleDropDown').dropdown('restore defaults');
            $('.groupDropDown').dropdown('restore defaults');
        },
        formatRoleDropDown() {

            this.roleDropDownData = [];

            var t_selection = {
                value: "",
                name: ""
            }

            if(this.roleList.length > 0) {
                for(var i = 0; i < this.roleList.length; i++) {
                    t_selection = {
                        value: "",
                        name: ""
                    }
                    t_selection.value = this.roleList[i].role_code;
                    t_selection.name = this.roleList[i].role_name;
                    this.roleDropDownData.push(t_selection);
                }
            } else {
                t_selection = {
                    value: "default",
                    name: "默认"
                }
                this.roleDropDownData.push(t_selection);
            }
        },
        formatGroupDropDown() {

            this.groupDropDownData = [];

            var t_selection = {
                value: "",
                name: ""
            }

            if(this.groupList.length > 0) {
                for(var i = 0; i < this.groupList.length; i++) {
                    t_selection = {
                        value: "",
                        name: ""
                    }
                    t_selection.value = this.groupList[i].group_code;
                    t_selection.name = this.groupList[i].group_name;
                    this.groupDropDownData.push(t_selection);
                }
            } else {
                t_selection = {
                    value: "default",
                    name: "默认"
                }
                this.groupDropDownData.push(t_selection);
            }
        },
        initDropDown() {
            $('.roleDropDown').dropdown();
            $('.groupDropDown').dropdown();
        },

        deleteOnClick(content) {

            this.reset();

            this.curUsername = content.username;
            this.curRoleCode = content.role_code;
            this.curGroupCode = content.group_code;

            $('.deleteUserModal').modal('show');
        },
        editOnClick(content) {

            this.reset();
            this.curPassword = content.password;

            $('.editUsernameInput').val(content.username);
            $('.editPasswordInput').val(content.password);
            $('.roleDropDown').dropdown('set selected', content.role_code);
            $('.groupDropDown').dropdown('set selected', content.group_code);

            $('.editUserModal').modal('show');
        },

        confirmDeleteUser(username) {
            this.$emit("delete-user", username);
        },
        confirmEditUser() {

            var user = {
                username: $('.editUsernameInput').val(),
                // if password null use old one
                password: (!$('.editPasswordInput').val())? this.curPassword : $('.editPasswordInput').val(),
                role_code: $('.roleDropDown').dropdown('get value'),
                group_code: $('.groupDropDown').dropdown('get value'),
            }

            this.$emit("modify-user", user);
        }
    },
    mounted: function() {
        this.init();
        console.debug("PejoyMainUserMgrModal-template mounted");
    }
});