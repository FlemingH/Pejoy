Vue.component('PejoyMainBookModal', {
    template: '#PejoyMainBookModal-template',
    props: {
        book_list: {
            type: Array,
            default: [],
            required: true
        },
        authority_level: {
            type: Number,
            default: 0,
            required: true
        }
    },
    data: function () {
        return{
            title: "书籍",
            bookList: [],
            authorityLevel: 0
        }
    },
    watch: {
        book_list: function (newVal, oldVal) {
            this.bookList = newVal;
        },
        authority_level: function (newVal, oldVal) {
            this.authorityLevel = newVal;
        }
    },
    methods: {
        init() {
            this.bookList = this.book_list;
            this.authorityLevel = this.authority_level;
        },
        addToCartOnClick(book) {
            console.log(book);
        }
    },
    mounted: function() {
        this.init();
        console.debug("PejoyMainBookModal-template mounted");
    }
});