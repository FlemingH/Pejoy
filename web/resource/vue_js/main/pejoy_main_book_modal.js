Vue.component('PejoyMainBookModal', {
    template: '#PejoyMainBookModal-template',
    props: {
        book_list: {
            type: Array,
            default: [],
            required: true
        },
    },
    data: function () {
        return{
            title: "书籍",
            bookList: [],
        }
    },
    watch: {
        book_list: function (newVal, oldVal) {
            this.bookList = newVal;
        }
    },
    methods: {
        init() {
            this.bookList = this.book_list;
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