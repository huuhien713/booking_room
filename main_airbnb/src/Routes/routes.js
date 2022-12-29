import {lazy} from 'react'
import { createBrowserRouter } from 'react-router-dom'

const Layout = lazy(() => import('../Layout'));
const MainPage = lazy(() => import('../Layout/MainPage'));
const Signin = lazy(() => import('../Modules/Signin'));
const Signup = lazy(() => import('../Modules/Signup'));
const Account = lazy(() => import('../Modules/Account'));
const Location = lazy(() => import('../Modules/Location'));
const Room = lazy(() => import('../Modules/Room'));
const NotFound404 = lazy(() => import('../Components/NotFound404'));
const UserProtected = lazy(() => import('../Components/UserProtected'));

const router = createBrowserRouter([
    {
        path: '/', element: <Layout />, children: [
            { index: true, element: <MainPage />},
            { path: 'signin', element: <Signin /> },
            { path: 'signup', element: <Signup /> },
            {
                path: 'account', element: <UserProtected>
                    <Account />
                </UserProtected>
            },
            {path: 'vitri/:idLocation', element: <Location />},
            {path: 'phong/:idRoom', element: <Room />},
        ]
    },
    { path: '*', element: <NotFound404 /> }
]);

export default router;