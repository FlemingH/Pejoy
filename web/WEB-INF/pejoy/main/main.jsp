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
    </div>
</template>
<script src="resource/vue_js/main/pejoy_main_panel.js"></script>
<!------------------------------------panel end------------------------------------>

<script>
    new Vue({ el: "#app" });
</script>
</body>
</html>
