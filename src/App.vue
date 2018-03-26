<template>
    <div>
        <div :class="{'mainnav':!is_mainnav_collapse,'mainnav_collapse':is_mainnav_collapse}">
            <mainnav></mainnav>
        </div>
        <div :class="{'maincontainer':!is_mainnav_collapse,'maincontainer_collapse':is_mainnav_collapse}">
            <mainheader></mainheader>
                <router-view/>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'

import mainnav from './components/layout/mainnav';
import mainheader from './components/layout/mainheader'

export default {
    name: 'app',
    components: {
        mainnav,
        mainheader
    },
    computed:{
        ...mapState({
            is_mainnav_collapse:state=>state.is_mainnav_collapse,
        })
    }
}
</script>

<style>
.mainnav {
    width: 200px;
    position: fixed;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 999;
    background-color: #2E4053;
}
.mainnav_collapse{
    width: 64px;
    position: fixed;
    height: 100%;
    z-index: 999;
    background-color: #2E4053;
}

.maincontainer_collapse {
    margin-left: 65px;
}

.maincontainer {
    margin-left: 200px;
    background-color: #eee;
}

.container{
    background-color: #fff;
    margin: 10px;
}

body{
    margin: 0px;
    background-color: #eee;
}
</style>
<style type="text/css">
@import "./assets/css/base.css"
</style>
