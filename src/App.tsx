import { FC } from 'react';
import { BrowserRouter, Route, RouteObject, Routes } from 'react-router-dom';
import { App as AntApp } from 'antd';
import { RouteConfig } from './constants/RouteConfig';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './components/Notification/Notification';
import { AuthLayout } from './layouts/AuthLayout/AuthLayout';
import { DashboardLayout } from './layouts/DashboardLayout/DashboardLayout';
import RootLayout from './layouts/RootLayout/RootLayout';
import CreateUserPage from './pages/authentication/AccountPage/CreateUserPage';
import ListUserPage from './pages/authentication/AccountPage/ListUserPage';
import UpdateUserPage from './pages/authentication/AccountPage/UpdateUserPage';
import CreateBlogCategoryPage from './pages/authentication/BlogCategoryPage/CreateBlogCategoryPage';
import ListBlogCategoryPage from './pages/authentication/BlogCategoryPage/ListBlogCategoryPage';
import UpdateBlogCategoryPage from './pages/authentication/BlogCategoryPage/UpdateBlogCategoryPage';
import CreateBlogPage from './pages/authentication/BlogPage/CreateBlogPage';
import ListBlogPage from './pages/authentication/BlogPage/ListBlogPage';
import UpdateBlogPage from './pages/authentication/BlogPage/UpdateBlogPage';
import { ListCustomer } from './pages/authentication/CustomerPage/ListCustomer';
import { DashboardPage } from './pages/authentication/DashboardPage/DashboardPage';
import CreateFlightCategoryPage from './pages/authentication/FlightCategoryPage/CreateFlightCategoryPage';
import ListFlightCategoryPage from './pages/authentication/FlightCategoryPage/ListFlightCategoryPage';
import UpdateFlightCategoryPage from './pages/authentication/FlightCategoryPage/UpdateFlightCategoryPage';
import CreateFlightPage from './pages/authentication/FlightPage/CreateFlightPage';
import ListFlightPage from './pages/authentication/FlightPage/ListFlightPage';
import UpdateFlightPage from './pages/authentication/FlightPage/UpdateFlightPage';
import CreateHotelCategoryPage from './pages/authentication/HotelCategoryPage/CreateHotelCategoryPage';
import ListHotelCategoryPage from './pages/authentication/HotelCategoryPage/ListHotelCategoryPage';
import UpdateHotelCategoryPage from './pages/authentication/HotelCategoryPage/UpdateHotelCategoryPage';
import CreateHotelPage from './pages/authentication/HotelPage/CreateHotelPage';
import ListHotelPage from './pages/authentication/HotelPage/ListHotelPage';
import UpdateHotelPage from './pages/authentication/HotelPage/UpdateHotelPage';
import ProfilePage from './pages/authentication/ProfilePage/ProfilePage';
import SettingPage from './pages/authentication/SettingPage/SettingPage';
import CreateTourCategoryPage from './pages/authentication/TourCategoryPage/CreateTourCategoryPage';
import ListTourCategoryPage from './pages/authentication/TourCategoryPage/ListTourCategoryPage';
import UpdateTourCategoryPage from './pages/authentication/TourCategoryPage/UpdateTourCategoryPage';
import CreateTourPage from './pages/authentication/TourPage/CreateTourPage';
import { ListTourPage } from './pages/authentication/TourPage/ListTourPage';
import { UpdateTourPage } from './pages/authentication/TourPage/UpdateTourPage';
import { ForbiddenPage } from './pages/unauthentication/ForbiddenPage/ForbiddenPage';
import { FormLogout } from './pages/unauthentication/FormLogout/FormLogout';
import { InternalErrorPage } from './pages/unauthentication/InternalErrorPage/InternalErrorPage';
import { LoginPage } from './pages/unauthentication/LoginPage/LoginPage';
import { NotFoundPage } from './pages/unauthentication/NotFoundPage/NotFoundPage';
import { ProtectRoute } from './components/ProtectRoute/ProtectRoute';

// Import các component mới
import ListActorPage from './pages/authentication/ActorPage/ListActorPage';
import CreateActorPage from './pages/authentication/ActorPage/CreateActorPage';
import UpdateActorPage from './pages/authentication/ActorPage/UpdateActorPage';
import ListGenresPage from './pages/authentication/GenresPage/ListGenresPage';
import CreateGenresPage from './pages/authentication/GenresPage/CreateGenresPage';
import UpdateGenresPage from './pages/authentication/GenresPage/UpdateGenresPage';
import ListDirectorPage from './pages/authentication/DirectorPage/ListDirectorPage';
import CreateDirectorPage from './pages/authentication/DirectorPage/CreateDirectorPage';
import UpdateDirectorPage from './pages/authentication/DirectorPage/UpdateDirectorPage';
import ListContentPage from './pages/authentication/ContentPage/ListContentPage';
import CreateContentPage from './pages/authentication/ContentPage/CreateContentPage';
import UpdateContentPage from './pages/authentication/ContentPage/UpdateContentPage';
import ListCommentPage from './pages/authentication/CommentPage/ListCommentPage';
import CreateCommentPage from './pages/authentication/CommentPage/CreateCommentPage';
import UpdateCommentPage from './pages/authentication/CommentPage/UpdateCommentPage';
import ListReviewPage from './pages/authentication/ReviewPage/ListReviewPage';
import CreateReviewPage from './pages/authentication/ReviewPage/CreateReviewPage';
import UpdateReviewPage from './pages/authentication/ReviewPage/UpdateReviewPage';

const dashboardRoutes: RouteObject[] = [
    {
        path: RouteConfig.ListCustomerPage.path,
        element: (
            <ProtectRoute>
                <ListCustomer />
            </ProtectRoute>
        )
    },
    {
        path: '/',
        element: (
            <ProtectRoute>
                <DashboardPage />
            </ProtectRoute>
        )
    },

    {
        path: RouteConfig.ListTourPage.path,
        element: (
            <ProtectRoute>
                <ListTourPage />
            </ProtectRoute>
        )
    },
    {
        path: RouteConfig.CreateTourPage.path,
        element: (
            <ProtectRoute>
                <CreateTourPage />
            </ProtectRoute>
        )
    },
    {
        path: RouteConfig.UpdateTourPage.path,
        element: (
            <ProtectRoute>
                <UpdateTourPage />
            </ProtectRoute>
        )
    },

    {
        path: RouteConfig.ListTourCategoryPage.path,
        element: (
            <ProtectRoute>
                <ListTourCategoryPage />
            </ProtectRoute>
        )
    },
    {
        path: RouteConfig.CreateTourCategoryPage.path,
        element: (
            <ProtectRoute>
                <CreateTourCategoryPage />
            </ProtectRoute>
        )
    },
    {
        path: RouteConfig.UpdateTourCategoryPage.path,
        element: (
            <ProtectRoute>
                <UpdateTourCategoryPage />
            </ProtectRoute>
        )
    },

    {
        path: RouteConfig.ListHotelPage.path,
        element: (
            <ProtectRoute>
                <ListHotelPage />
            </ProtectRoute>
        )
    },
    {
        path: RouteConfig.CreateHotelPage.path,
        element: (
            <ProtectRoute>
                <CreateHotelPage />
            </ProtectRoute>
        )
    },
    {
        path: RouteConfig.UpdateHotelPage.path,
        element: (
            <ProtectRoute>
                <UpdateHotelPage />
            </ProtectRoute>
        )
    },

    {
        path: RouteConfig.ListHotelCategoryPage.path,
        element: (
            <ProtectRoute>
                <ListHotelCategoryPage />
            </ProtectRoute>
        )
    },
    {
        path: RouteConfig.CreateHotelCategoryPage.path,
        element: (
            <ProtectRoute>
                <CreateHotelCategoryPage />
            </ProtectRoute>
        )
    },
    {
        path: RouteConfig.UpdateHotelCategoryPage.path,
        element: (
            <ProtectRoute>
                <UpdateHotelCategoryPage />
            </ProtectRoute>
        )
    },

    {
        path: RouteConfig.ListFlightPage.path,
        element: (
            <ProtectRoute>
                <ListFlightPage />
            </ProtectRoute>
        )
    },
    {
        path: RouteConfig.CreateFlightPage.path,
        element: (
            <ProtectRoute>
                <CreateFlightPage />
            </ProtectRoute>
        )
    },
    {
        path: RouteConfig.UpdateFlightPage.path,
        element: (
            <ProtectRoute>
                <UpdateFlightPage />
            </ProtectRoute>
        )
    },

    {
        path: RouteConfig.ListFlightCategoryPage.path,
        element: (
            <ProtectRoute>
                <ListFlightCategoryPage />
            </ProtectRoute>
        )
    },
    {
        path: RouteConfig.CreateFlightCategoryPage.path,
        element: (
            <ProtectRoute>
                <CreateFlightCategoryPage />
            </ProtectRoute>
        )
    },
    {
        path: RouteConfig.UpdateFlightCategoryPage.path,
        element: (
            <ProtectRoute>
                <UpdateFlightCategoryPage />
            </ProtectRoute>
        )
    },

    {
        path: RouteConfig.ListBlogPage.path,
        element: (
            <ProtectRoute>
                <ListBlogPage />
            </ProtectRoute>
        )
    },
    {
        path: RouteConfig.CreateBlogPage.path,
        element: (
            <ProtectRoute>
                <CreateBlogPage />
            </ProtectRoute>
        )
    },
    {
        path: RouteConfig.UpdateBlogPage.path,
        element: (
            <ProtectRoute>
                <UpdateBlogPage />
            </ProtectRoute>
        )
    },

    {
        path: RouteConfig.ListBlogCategoryPage.path,
        element: (
            <ProtectRoute>
                <ListBlogCategoryPage />
            </ProtectRoute>
        )
    },
    {
        path: RouteConfig.CreateBlogCategoryPage.path,
        element: (
            <ProtectRoute>
                <CreateBlogCategoryPage />
            </ProtectRoute>
        )
    },
    {
        path: RouteConfig.UpdateBlogCategoryPage.path,
        element: (
            <ProtectRoute>
                <UpdateBlogCategoryPage />
            </ProtectRoute>
        )
    },

    {
        path: RouteConfig.ListUserPage.path,
        element: (
            <ProtectRoute>
                <ListUserPage />
            </ProtectRoute>
        )
    },
    {
        path: RouteConfig.CreateUserPage.path,
        element: (
            <ProtectRoute>
                <CreateUserPage />
            </ProtectRoute>
        )
    },
    {
        path: RouteConfig.UpdateUserPage.path,
        element: (
            <ProtectRoute>
                <UpdateUserPage />
            </ProtectRoute>
        )
    },

    {
        path: RouteConfig.SettingPage.path,
        element: (
            <ProtectRoute>
                <SettingPage />
            </ProtectRoute>
        )
    },

    // Actor routes
    {
        path: RouteConfig.ListActorPage.path,
        element: (
            <ProtectRoute>
                <ListActorPage />
            </ProtectRoute>
        )
    },
    {
        path: RouteConfig.CreateActorPage.path,
        element: (
            <ProtectRoute>
                <CreateActorPage />
            </ProtectRoute>
        )
    },
    {
        path: RouteConfig.UpdateActorPage.path,
        element: (
            <ProtectRoute>
                <UpdateActorPage />
            </ProtectRoute>
        )
    },

    // Genres routes
    {
        path: RouteConfig.ListGenresPage.path,
        element: (
            <ProtectRoute>
                <ListGenresPage />
            </ProtectRoute>
        )
    },
    {
        path: RouteConfig.CreateGenresPage.path,
        element: (
            <ProtectRoute>
                <CreateGenresPage />
            </ProtectRoute>
        )
    },
    {
        path: RouteConfig.UpdateGenresPage.path,
        element: (
            <ProtectRoute>
                <UpdateGenresPage />
            </ProtectRoute>
        )
    },

    // Director routes
    {
        path: RouteConfig.ListDirectorPage.path,
        element: (
            <ProtectRoute>
                <ListDirectorPage />
            </ProtectRoute>
        )
    },
    {
        path: RouteConfig.CreateDirectorPage.path,
        element: (
            <ProtectRoute>
                <CreateDirectorPage />
            </ProtectRoute>
        )
    },
    {
        path: RouteConfig.UpdateDirectorPage.path,
        element: (
            <ProtectRoute>
                <UpdateDirectorPage />
            </ProtectRoute>
        )
    },

    // Content routes
    {
        path: RouteConfig.ListContentPage.path,
        element: (
            <ProtectRoute>
                <ListContentPage />
            </ProtectRoute>
        )
    },
    {
        path: RouteConfig.CreateContentPage.path,
        element: (
            <ProtectRoute>
                <CreateContentPage />
            </ProtectRoute>
        )
    },
    {
        path: RouteConfig.UpdateContentPage.path,
        element: (
            <ProtectRoute>
                <UpdateContentPage />
            </ProtectRoute>
        )
    },

    // Comment routes
    {
        path: RouteConfig.ListCommentPage.path,
        element: (
            <ProtectRoute>
                <ListCommentPage />
            </ProtectRoute>
        )
    },
    {
        path: RouteConfig.CreateCommentPage.path,
        element: (
            <ProtectRoute>
                <CreateCommentPage />
            </ProtectRoute>
        )
    },
    {
        path: RouteConfig.UpdateCommentPage.path,
        element: (
            <ProtectRoute>
                <UpdateCommentPage />
            </ProtectRoute>
        )
    },

    // Review routes
    {
        path: RouteConfig.ListReviewPage.path,
        element: (
            <ProtectRoute>
                <ListReviewPage />
            </ProtectRoute>
        )
    },
    {
        path: RouteConfig.CreateReviewPage.path,
        element: (
            <ProtectRoute>
                <CreateReviewPage />
            </ProtectRoute>
        )
    },
    {
        path: RouteConfig.UpdateReviewPage.path,
        element: (
            <ProtectRoute>
                <UpdateReviewPage />
            </ProtectRoute>
        )
    }

    //     {
    //         path: RouteConfig.ListUserRolePage.path,
    //         element: <ListUserRolePage />
    //     },
    //     {
    //         path: RouteConfig.CreateUserRolePage.path,
    //         element: <CreateUserRolePage />
    //     },
    //     {
    //         path: RouteConfig.UpdateUserRolePage.path,
    //         element: <UpdateUserRolePage />
    //     }
];

export const App: FC = () => {
    return (
        <AntApp>
            <NotificationProvider>
                <AuthProvider>
                    <BrowserRouter>
                        <Routes>
                            {/* Root routes */}
                            <Route path='/' element={<RootLayout />}>
                                {/* Root Layout  */}

                                {/* Auth Layout  */}
                                <Route element={<AuthLayout />}>
                                    <Route path={RouteConfig.LoginPage.path} element={<LoginPage />} />
                                    <Route path={RouteConfig.Logout.path} element={<FormLogout />} />
                                    {/* <Route path={RouteConfig.ForgotPassword.path} element={<ForgotPasswordPage />} />
                                    <Route path={RouteConfig.ForgotPasswordSucess.path} element={<ResetPasswordSuccess />} /> */}
                                </Route>

                                {/* Dashboard Layout  */}
                                <Route element={<DashboardLayout />}>
                                    <Route path={RouteConfig.ProfilePage.path} element={<ProfilePage />} />
                                    {dashboardRoutes.map((route) => {
                                        return <Route key={route.path} path={route.path} element={route.element} />;
                                    })}
                                </Route>

                                {/* Status page  */}
                                <Route path={RouteConfig.InternalErrorPage.path} element={<InternalErrorPage />} />
                                <Route path={RouteConfig.ForbiddenPage.path} element={<ForbiddenPage />} />
                                <Route path={RouteConfig.NotFoundPage.path} element={<NotFoundPage />} />
                                <Route path='*' element={<NotFoundPage />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </AuthProvider>
            </NotificationProvider>
        </AntApp>
    );
};
