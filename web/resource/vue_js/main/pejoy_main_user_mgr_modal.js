Vue.component('PejoyMainUserMgrModal', {
    template: '#PejoyMainUserMgrModal-template',
    props: {
        user_list: {
            type: Array,
            default: 0,
            required: true
        }
    },
    data: function () {
        return{
            title: "用户管理",
            userList: [],
            curUsername: "",
            curRoleCode: "",
            curGroupCode: "",
        }
    },
    watch: {
        user_list: function (newVal, oldVal) {
            this.userList = newVal;
        }
    },
    methods: {
        init() {
            this.reset();
            this.userList = this.user_list;
        },
        reset() {
            this.curUsername = "";
            this.curRoleCode = "";
            this.curGroupCode = "";
        },
        deleteOnClick(content) {

            this.reset();

            this.curUsername = content.username;
            this.curRoleCode = content.role_code;
            this.curGroupCode = content.group_code;

            $('.deleteModal').modal('show');
        },
        editOnClick(content) {

        },

        confirmDeleteUser(username) {
            this.$emit("delete-user", username);
        }
    },
    mounted: function() {
        this.init();
        console.debug("PejoyMainUserMgrModal-template mounted");
    }
});