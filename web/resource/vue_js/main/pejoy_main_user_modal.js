Vue.component('PejoyMainUserModal', {
    template: '#PejoyMainUserModal-template',
    props: {
        user_info_loading_state: {
            type: Number,
            default: 0,
            required: true
        },
        user_data: {
            type: String,
            default: "",
            required: true
        }
    },
    data: function () {
        return{
            title: "个人信息",
            userData: "",
            userInfo: {},
            userInfoLoadingState: 0
        }
    },
    watch: {
        user_info_loading_state: function (newVal, oldVal) {
            this.userInfoLoadingState = newVal;
        },
        user_data: function (newVal, oldVal) {
            this.userData = newVal;
        }
    },
    methods: {
        init() {
            this.userData = this.user_data;
            this.initAllCheckBox();
        },
        initAllCheckBox() {
            var curUserInfoObj = JSON.parse(JSON.parse(this.userData).user_info).question;

            $('.ui .checkbox').checkbox();

            var fruit = document.getElementsByName("fruit");
            var season = document.getElementsByName("season");
            var weekend = document.getElementsByName("weekend");
            var lemon = document.getElementsByName("lemon");

            for(key in fruit){
                if(fruit[key].value == curUserInfoObj.fruit) {
                    fruit[key].checked = true;
                }
            }
            for(key in season){
                if(season[key].value == curUserInfoObj.season) {
                    season[key].checked = true;
                }
            }
            for(key in weekend){
                if(weekend[key].value == curUserInfoObj.weekend) {
                    weekend[key].checked = true;
                }
            }
            for(key in lemon){
                if(lemon[key].value == curUserInfoObj.lemon) {
                    lemon[key].checked = true;
                }
            }
        },
        getCheckValue(){
            var fruit = document.getElementsByName("fruit");
            var season = document.getElementsByName("season");
            var weekend = document.getElementsByName("weekend");
            var lemon = document.getElementsByName("lemon");
            var question = {
                "fruit": "",
                "season": "",
                "weekend": "",
                "lemon": "",
            };
            for(key in fruit){
                if(fruit[key].checked) {
                    question.fruit = fruit[key].value;
                }
            }
            for(key in season){
                if(season[key].checked) {
                    question.season = season[key].value;
                }
            }
            for(key in weekend){
                if(weekend[key].checked) {
                    question.weekend = weekend[key].value;
                }
            }
            for(key in lemon){
                if(lemon[key].checked) {
                    question.lemon = lemon[key].value;
                }
            }
            return question;
        },
        submitUserInfoOnClick() {
            var question = this.getCheckValue();
            this.userInfo = {question: question};
            this.$emit("modify-user-info", JSON.stringify(this.userInfo));
        },
    },
    mounted: function() {
        this.init();
        console.debug("PejoyMainUserModal-template mounted");
    }
});