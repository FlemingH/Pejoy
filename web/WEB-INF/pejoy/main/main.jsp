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
                    <pejoy-main-user-modal
                            :user_info_loading_state="userInfoLoadingState"
                            :user_data="userData"
                            @modify-user-info="modifyUserInfo">
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
                    <pejoy-main-user-mgr-modal
                            :user_list="userList"
                            @delete-user="deleteUser">
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
        <div class="ui form">

            <div class="inline fields">
                <label>你最喜欢的水果?</label>
                <div class="field">
                    <div class="ui radio checkbox">
                        <input type="radio" name="fruit" tabindex="0" class="hidden" value="apple">
                        <label>苹果</label>
                    </div>
                </div>
                <div class="field">
                    <div class="ui radio checkbox">
                        <input type="radio" name="fruit" tabindex="0" class="hidden" value="orange">
                        <label>橘子</label>
                    </div>
                </div>
                <div class="field">
                    <div class="ui radio checkbox">
                        <input type="radio" name="fruit" tabindex="0" class="hidden" value="banana">
                        <label>香蕉</label>
                    </div>
                </div>
                <div class="field">
                    <div class="ui radio checkbox">
                        <input type="radio" name="fruit" tabindex="0" class="hidden" value="lemon">
                        <label>柠檬</label>
                    </div>
                </div>
            </div>

            <div class="inline fields">
                <label>你最喜欢的季节?</label>
                <div class="field">
                    <div class="ui radio checkbox">
                        <input type="radio" name="season" tabindex="0" class="hidden" value="spring">
                        <label>春</label>
                    </div>
                </div>
                <div class="field">
                    <div class="ui radio checkbox">
                        <input type="radio" name="season" tabindex="0" class="hidden" value="summer">
                        <label>夏</label>
                    </div>
                </div>
                <div class="field">
                    <div class="ui radio checkbox">
                        <input type="radio" name="season" tabindex="0" class="hidden" value="autumn">
                        <label>秋</label>
                    </div>
                </div>
                <div class="field">
                    <div class="ui radio checkbox">
                        <input type="radio" name="season" tabindex="0" class="hidden" value="winter">
                        <label>冬</label>
                    </div>
                </div>
            </div>

            <div class="inline fields">
                <label>周末你最想干什么?</label>
                <div class="field">
                    <div class="ui radio checkbox">
                        <input type="radio" name="weekend" tabindex="0" class="hidden" value="home">
                        <label>宅在家</label>
                    </div>
                </div>
                <div class="field">
                    <div class="ui radio checkbox">
                        <input type="radio" name="weekend" tabindex="0" class="hidden" value="Film">
                        <label>看电影</label>
                    </div>
                </div>
                <div class="field">
                    <div class="ui radio checkbox">
                        <input type="radio" name="weekend" tabindex="0" class="hidden" value="book">
                        <label>去图书馆</label>
                    </div>
                </div>
                <div class="field">
                    <div class="ui radio checkbox">
                        <input type="radio" name="weekend" tabindex="0" class="hidden" value="friend">
                        <label>找朋友</label>
                    </div>
                </div>
            </div>

            <div class="inline fields">
                <label>你认为柠檬是什么味道的?</label>
                <div class="field">
                    <div class="ui radio checkbox">
                        <input type="radio" name="lemon" tabindex="0" class="hidden" value="bitter">
                        <label>苦的</label>
                    </div>
                </div>
                <div class="field">
                    <div class="ui radio checkbox">
                        <input type="radio" name="lemon" tabindex="0" class="hidden" value="acid">
                        <label>酸的</label>
                    </div>
                </div>
                <div class="field">
                    <div class="ui radio checkbox">
                        <input type="radio" name="lemon" tabindex="0" class="hidden" value="puckery">
                        <label>涩的</label>
                    </div>
                </div>
                <div class="field">
                    <div class="ui radio checkbox">
                        <input type="radio" name="lemon" tabindex="0" class="hidden" value="sweet">
                        <label>甜的</label>
                    </div>
                </div>
            </div>

            <div class="ui blue submit button" :class="(userInfoLoadingState==1)? 'loading':'' "
                 @click="submitUserInfoOnClick">提交</div>
        </div>
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
        <table class="ui pink table">
            <thead>
                <tr>
                    <th>username</th>
                    <th>password</th>
                    <th>role_code</th>
                    <th>group_code</th>
                    <th>user_info</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="content in userList">
                    <td>{{ content.username }}</td>
                    <td>{{ content.password }}</td>
                    <td>{{ content.role_code }}</td>
                    <td>{{ content.group_code }}</td>
                    <td>{{ content.user_info }}</td>
                    <td>
                        <i class="edit icon editIcon"
                            @click="editOnClick(content)">
                        </i>
                    </td>
                    <td>
                        <i class="ban icon deleteIcon"
                            @click="deleteOnClick(content)">
                        </i>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- delete modal -->
        <div class="ui basic modal deleteModal">
            <div class="ui icon header">
                <i class="ban icon"></i>
                确认删除用户？<br>
                用户名：{{ curUsername }}，角色代号：{{ curRoleCode }}，小组代号：{{ curGroupCode }}
            </div>
            <div class="actions">
                <div class="ui red basic cancel inverted button">
                    <i class="remove icon"></i>
                    No
                </div>
                <div class="ui green ok inverted button" @click="confirmDeleteUser(curUsername)">
                    <i class="checkmark icon"></i>
                    Yes
                </div>
            </div>
        </div>
    </div>
</template>
<script src="resource/vue_js/main/pejoy_main_user_mgr_modal.js"></script>



<script>
    new Vue({ el: "#app" });
</script>
</body>
</html>
