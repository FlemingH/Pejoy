<%--
  Created by IntelliJ IDEA.
  User: Fleming
  Date: 2019/3/31
  Time: 0:24
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login</title>

    <script src="https://cdn.staticfile.org/jquery/3.3.1/jquery.js"></script>
    <script src="https://cdn.staticfile.org/vue/2.6.10/vue.js"></script>

    <!-- import semantic -->
    <link href="resource/semantic/Semantic-UI-CSS-master/semantic.css" rel="stylesheet">
    <script src="resource/semantic/Semantic-UI-CSS-master/semantic.js"></script>

    <!-- page css -->
    <link href="resource/vue_css/login/pejoy_login_panel.css" rel="stylesheet">
</head>
<body>

<div id="app">
    <pejoy-login-panel>
    </pejoy-login-panel>
</div>

<!------------------------------------panel start------------------------------------>
<template id="PejoyLoginPanel-template">
    <div>

        <!-- login area -->
        <div class="panel_area ui form" v-show="curForm == 0">

            <div class="field">
                <h2 class="ui header">
                    <i class="book icon"></i>
                    <div class="content">
                        S-hop
                        <div class="sub header">Share book in a group with your friends</div>
                    </div>
                </h2>
            </div>

            <div class="field">
                <label>Username</label>
                <input id="usernameInput" v-model="curUsername"
                       type="text" placeholder="输入你的用户名">
                <div class="ui below pointing label"
                     :class="isUsernameNull? 'show':'hidden' ">
                    请输入用户名
                </div>
            </div>

            <div class="field">
                <label>Password</label>
                <input id="passwordInput" v-model="curPassword"
                       type="password" placeholder="输入你的密码">
                <div class="ui below pointing label"
                     :class="isPasswordNull? 'show':'hidden' ">
                    请输入密码
                </div>
            </div>

            <div class="ui error message errorMsgArea">
                <div class="header">{{ errorTitle }}</div>
                <p>{{ errorMessage }}</p>
            </div>

            <div class="ui blue submit button"
                 :class="(loadingState==1)? 'loading':'' "
                 @click="loginButtonOnClick">登录</div>

            <div style="float: right; margin-top: 10px">
                <a href="#" @click="registerOnClick">注册</a>
            </div>
        </div>


        <!-- register area -->
        <div class="panel_area ui form" v-show="curForm == 1">

            <div class="field">
                <h2 class="ui header">
                    <i class="book icon"></i>
                    <div class="content">
                        注册
                        <div class="sub header">welcome</div>
                    </div>
                </h2>
            </div>

            <div class="field">
                <label>Username</label>
                <input id="usernameInputR" v-model="curUsername"
                       type="text" placeholder="输入要注册的用户名">
                <div class="ui below pointing label"
                     :class="isUsernameNull? 'show':'hidden' ">
                    请输入用户名
                </div>
            </div>

            <div class="field">
                <label>Password</label>
                <input id="passwordInputR" v-model="curPassword"
                       type="password" placeholder="输入要注册的密码">
                <div class="ui below pointing label"
                     :class="isPasswordNull? 'show':'hidden' ">
                    请输入密码
                </div>
            </div>

            <div class="field">
                <label>小组</label>
                <select class="ui dropdown groupDropDown">
                    <option :value="content.value" v-for="content in userGroupList">{{ content.name }}</option>
                </select>
            </div>

            <div class="ui error message errorMsgArea">
                <div class="header">{{ errorTitle }}</div>
                <p>{{ errorMessage }}</p>
            </div>

            <div class="ui success message successMsgArea">
                <div class="header">{{ successTitle }}</div>
                <p>{{ successMessage }}</p>
            </div>

            <div class="ui teal submit button"
                 :class="(loadingState==1)? 'loading':'' "
                 @click="registerButtonOnClick">注册</div>

            <div style="float: right; margin-top: 10px">
                <a href="#" @click="loginOnClick">登录</a>
            </div>
        </div>
    </div>
</template>
<script src="resource/vue_js/login/pejoy_login_panel.js"></script>
<!------------------------------------panel end------------------------------------>

<script>
    new Vue({ el: "#app" });
</script>
</body>
</html>
