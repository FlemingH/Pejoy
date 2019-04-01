Vue.component('PejoyMainRecommendModal', {
    template: '#PejoyMainRecommendModal-template',
    props: {
        recommend_list: {
            type: Array,
            default: 0,
            required: true
        }
    },
    data: function () {
        return{
            title: "推荐",
            recommendList: [],
            recommendBookList: [],
        }
    },
    watch: {
        recommend_list: function (newVal, oldVal) {
            if(newVal) {
                this.recommendList = newVal;
                this.loadRecommendData();
            }
        }
    },
    methods: {
        init() {
        },
        initBookCard() {
            $('.special.cards .image').dimmer({
                on: 'hover'
            });
        },
        timestampToString(timestamp) {
            var date = new Date(timestamp);
            Y = date.getFullYear() + '-';
            M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            D = date.getDate() + ' ';
            h = date.getHours() + ':';
            m = date.getMinutes() + ':';
            s = date.getSeconds();
            return Y+M+D+h+m+s;
        },
        loadRecommendData() {

            this.recommendBookList = [];

            var book = {
                book_name: "",
                zz: "",
                recommend_time: "",
            }

            for(var i = 0; i < this.recommendList.length; i++) {
                var recommend_info = JSON.parse(this.recommendList[i].recommend_info);
                book = {
                    book_name: recommend_info.book_name,
                    zz: recommend_info.zz,
                    recommend_time: this.timestampToString(this.recommendList[i].recommend_time)
                }
                this.recommendBookList.push(book);
            }

            this.$nextTick(function () {
                this.initBookCard();
            });
        },
    },
    mounted: function() {
        this.init();
        console.debug("PejoyMainRecommendModal-template mounted");
    }
});