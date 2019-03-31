Vue.component('PejoyMainPanel', {
    template: '#PejoyMainPanel-template',
    props: {
    },
    data: function () {
        return{
            userData: {},
            pageType: "",
        }
    },
    watch: {

    },
    methods: {
        init() {
            if(this.isUserDataNull()) {
                this.postRouter("/login");
            }
        },
        loadLocalStorageLoginData() {
            this.userData = localStorage.getItem("pejoy/login/data");
        },
        isUserDataNull() {
            if(!this.userData || JSON.stringify(this.userData) == "{}") {
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
    },
    beforeMount: function() {
        this.loadLocalStorageLoginData();
    },
    mounted: function() {
        this.init();
        console.debug("PejoyMainPanel-template mounted");
    }
});