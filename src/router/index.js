import { createRouter, createWebHistory } from "vue-router"
import StationList from "../views/StationList.vue"
import StationStats from "../views/StationStats.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "StationList",
            component: StationList,
        },
        {
            path: "/station/:stationid",
            name: "StationStats",
            component: StationStats,
        },
    ],
})

export default router
