import { Router } from "express"
import { UserRoutes } from "../modules/user/user.route";
import { AdminRoutes } from "../modules/Admin/admin.route";
import { BlogRoutes } from "../modules/blog/blog.route";
// import { AuthRoutes } from "../modules/Auth/auth.route";

const router = Router()

const moduleRoutes = [
    {
        path: '/user',
        route: UserRoutes,
    },
    {
        path: '/admins',
        route: AdminRoutes,
    },
    {
        path: '/blogs',
        route: BlogRoutes,
    },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;