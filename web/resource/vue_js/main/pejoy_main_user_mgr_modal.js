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
            userList: []
        }
    },
    watch: {
        user_list: function (newVal, oldVal) {
            this.userList = newVal;
        }
    },
    methods: {
        init() {
            this.userList = this.user_list;
        }
    },
    mounted: function() {
        this.init();
        console.debug("PejoyMainUserMgrModal-template mounted");
    }
});