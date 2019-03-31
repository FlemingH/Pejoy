Vue.component('PejoyMainPanel', {
    template: '#PejoyMainPanel-template',
    props: {
    },
    data: function () {
        return{
            userData: {},
            pageType: "",
            authorityLevel: 0
        }
    },
    watch: {

    },
    methods: {
        init() {
            if(this.isUserDataNull()) {
                this.postRouter("/login");
            }

            this.assignMainModalAccess();
        },
        loadLocalStorageLoginData() {
            this.userData = localStorage.getItem("pejoy/login/data");
        },
        isUserDataNull() {
            if(!this.userData || this.userData == "{}") {
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

        // decide which modal can be access by different user (role_code)
        assignMainModalAccess() {
            var role_code = JSON.parse(this.userData).role_code;
            if(role_code == 'gly') {
                this.authorityLevel = 2;
            } else if(role_code == 'zz') {
                this.authorityLevel = 1;
            } else {
                this.authorityLevel = 0;
            }
        }
    },
    beforeMount: function() {
        this.loadLocalStorageLoginData();
    },
    mounted: function() {
        this.init();
        console.debug("PejoyMainPanel-template mounted");
    }
});