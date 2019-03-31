<%--
  Created by IntelliJ IDEA.
  User: Fleming
  Date: 2019/3/31
  Time: 0:25
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>S-hop - home</title>
    <link rel="icon" href="resource/img/favicon.ico" type="image/x-icon" />

    <script src="https://cdn.staticfile.org/jquery/3.3.1/jquery.js"></script>
    <script src="https://cdn.staticfile.org/vue/2.6.10/vue.js"></script>

    <!-- import semantic -->
    <link href="resource/semantic/Semantic-UI-CSS-master/semantic.css" rel="stylesheet">
    <script src="resource/semantic/Semantic-UI-CSS-master/semantic.js"></script>

    <!-- page css -->
    <link href="resource/vue_css/main/pejoy_main_panel.css" rel="stylesheet">
</head>
<body>

<div id="app">
    <pejoy-main-panel>
    </pejoy-main-panel>
</div>

<!------------------------------------panel start------------------------------------>
<template id="PejoyMainPanel-template">
    <div>


        <div class="ui fixed inverted menu">
            <div class="ui container">
                <a href="/" class="header item">
                    <img class="logo" src="resource/img/projectIcon.png">
                    S-hop web
                </a>
                <a href="/login" class="item">切换用户</a>
            </div>
        </div><br><br><br><br>

        <div class="ui grid">

            <!-- recommend -->
            <div class="row">
                <div class="three wide column"></div>
                <div class="ten wide column">
                    <pejoy-main-recommend-modal>
                    </pejoy-main-recommend-modal>
                </div>
                <div class="three wide column"></div>
            </div>

            <!-- book -->
            <div class="row">
                <div class="three wide column"></div>
                <div class="ten wide column">
                    <pejoy-main-book-modal>
                    </pejoy-main-book-modal>
                </div>
                <div class="three wide column"></div>
            </div>

            <!-- cart -->
            <div class="row">
                <div class="three wide column"></div>
                <div class="ten wide column">
                    <pejoy-main-cart-modal>
                    </pejoy-main-cart-modal>
                </div>
                <div class="three wide column"></div>
            </div>

            <!-- order -->
            <div class="row">
                <div class="three wide column"></div>
                <div class="ten wide column">
                    <pejoy-main-order-modal>
                    </pejoy-main-order-modal>
                </div>
                <div class="three wide column"></div>
            </div>

            <!-- user -->
            <div class="row">
                <div class="three wide column"></div>
                <div class="ten wide column">
                    <pejoy-main-user-modal>
                    </pejoy-main-user-modal>
                </div>
                <div class="three wide column"></div>
            </div>

            <!-- book mgr -->
            <div class="row" v-show="authorityLevel > 0">
                <div class="three wide column"></div>
                <div class="ten wide column">
                    <pejoy-main-book-mgr-modal>
                    </pejoy-main-book-mgr-modal>
                </div>
                <div class="three wide column"></div>
            </div>

            <!-- order mgr -->
            <div class="row" v-show="authorityLevel > 0">
                <div class="three wide column"></div>
                <div class="ten wide column">
                    <pejoy-main-order-mgr-modal>
                    </pejoy-main-order-mgr-modal>
                </div>
                <div class="three wide column"></div>
            </div>

            <!-- user mgr -->
            <div class="row" v-show="authorityLevel > 1">
                <div class="three wide column"></div>
                <div class="ten wide column">
                    <pejoy-main-user-mgr-modal>
                    </pejoy-main-user-mgr-modal>
                </div>
                <div class="three wide column"></div>
            </div>
        </div>
    </div>
</template>
<script src="resource/vue_js/main/pejoy_main_panel.js"></script>
<!------------------------------------panel end------------------------------------>



<!------------------------------------recommand start------------------------------------>
<template id="PejoyMainRecommendModal-template">
    <div>
        <div class="ui orange large header">{{ title }}</div>
    </div>
</template>
<script src="resource/vue_js/main/pejoy_main_recommend_modal.js"></script>




<!------------------------------------book start------------------------------------>
<template id="PejoyMainBookModal-template">
    <div>
        <div class="ui olive large header">{{ title }}</div>
    </div>
</template>
<script src="resource/vue_js/main/pejoy_main_book_modal.js"></script>




<!------------------------------------cart start------------------------------------>
<template id="PejoyMainCartModal-template">
    <div>
        <div class="ui green large header">{{ title }}</div>
    </div>
</template>
<script src="resource/vue_js/main/pejoy_main_cart_modal.js"></script>




<!------------------------------------order start------------------------------------>
<template id="PejoyMainOrderModal-template">
    <div>
        <div class="ui teal large header">{{ title }}</div>
    </div>
</template>
<script src="resource/vue_js/main/pejoy_main_order_modal.js"></script>




<!------------------------------------user start------------------------------------>
<template id="PejoyMainUserModal-template">
    <div>
        <div class="ui blue large header">{{ title }}</div>
    </div>
</template>
<script src="resource/vue_js/main/pejoy_main_user_modal.js"></script>




<!------------------------------------book mgr start------------------------------------>
<template id="PejoyMainBookMgrModal-template">
    <div>
        <div class="ui purple large header">{{ title }}</div>
    </div>
</template>
<script src="resource/vue_js/main/pejoy_main_book_mgr_modal.js"></script>




<!------------------------------------order mgr start------------------------------------>
<template id="PejoyMainOrderMgrModal-template">
    <div>
        <div class="ui violet large header">{{ title }}</div>
    </div>
</template>
<script src="resource/vue_js/main/pejoy_main_order_mgr_modal.js"></script>




<!------------------------------------user mgr start------------------------------------>
<template id="PejoyMainUserMgrModal-template">
    <div>
        <div class="ui pink large header">{{ title }}</div>
    </div>
</template>
<script src="resource/vue_js/main/pejoy_main_user_mgr_modal.js"></script>



<script>
    new Vue({ el: "#app" });
</script>
</body>
</html>
