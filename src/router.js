import Game from "./pages/Game/Game";
import Home from "./pages/Home/Home";
import RecipeDetail from "./pages/Recipe/RecipeDetail";
import RecipeEditor from "./pages/Recipe/RecipeEditor";
import Login from "./pages/user/Login";
import Personal from "./pages/user/Personal";
import Signup from "./pages/user/Signup";

/**
 * Centralized route config
 */
export const routes = [
    {
        path: '/',
        component: Home,
        exact: true,
    },
    {
        path: '/game',
        component: Game,
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/signup',
        component: Signup,
    },
    {
        path: '/personal',
        component: Personal,
        // private: true,
    },
    {
        path: '/recipe',
        component: RecipeEditor,
        exact: true,
    },
    {
        path: '/recipe/:rid',
        component: RecipeDetail,
        exact: true,
    }
]
