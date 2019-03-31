Vue.component('PejoyMainUserModal', {
    template: '#PejoyMainUserModal-template',
    props: {
        user_info_loading_state: {
            type: Number,
            default: 0,
            required: true
        }
    },
    data: function () {
        return{
            title: "个人信息",
            userInfo: {},
            userInfoLoadingState: 0
        }
    },
    watch: {
        user_info_loading_state: function (newVal, oldVal) {
            this.userInfoLoadingState = newVal;
        }
    },
    methods: {
        init() {
            this.initAllCheckBox();
        },
        initAllCheckBox() {
            $('.ui .checkbox').checkbox();
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