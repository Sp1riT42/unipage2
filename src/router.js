import Vue from "vue";
import Router from 'vue-router'
import trainingComp from "@/components/trainingComp";
import finishComp from "@/components/finishComp";

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: trainingComp
        },
        {
            path: '/finish',
            component: finishComp
        },
    ]
})