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
        return {
            title: "书籍",
            bookList: [],
            authorityLevel: 0,
            csTitle: "",
            csMessage: "",
            curBook: {},
            curCSModal: "",
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
        reset() {
            this.csTitle = "";
            this.csMessage = "";
            this.curCSModal = "";
            this.curBook = {};
        },
        addToCartOnClick(book) {
            console.log(book);
        },
        shareOnClick(book) {

            this.reset();

            // save book for confirm
            this.curBook = {
                "book_id": book.book_id,
                "book_info": book.book_info
            };

            this.curCSModal = "share";

            var bookInfoObj = JSON.parse(book.book_info);

            this.csTitle = "分享书籍";
            this.csMessage = "书名：" + bookInfoObj.book_name
                            + "，作者：" + bookInfoObj.author
                            + "，价格：￥" + bookInfoObj.price;

            $('.csModal').modal('show');
        },
        confirmCS() {

            if(this.curCSModal == "share") {
                this.$emit("share-book", this.curBook);
            } else if(this.curCSModal == "addCart") {
            }
        },
    },
    mounted: function() {
        this.init();
        console.debug("PejoyMainBookModal-template mounted");
    }
});