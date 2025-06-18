import { Account } from '../models/Account';
import { Customer } from '../models/Customer';
import { Tour } from '../models/Tour';
import { TourCategory } from '../models/TourCategory';

export const RouteConfig = {
    // Status
    ForbiddenPage: {
        path: '/403'
    },
    NotFoundPage: {
        path: '/404'
    },
    InternalErrorPage: {
        path: '/500'
    },

    // Auth
    LoginPage: {
        path: '/login',
        searchParam: 'redirectTo',
        getFullPath: (redirectTo: string) => {
            return `/login?redirectTo=${redirectTo}`;
        }
    },
    ForgotPassword: {
        path: '/forgot-password'
    },
    ForgotPasswordSucess: {
        path: '/forgot-password-success'
    },
    Logout: {
        path: '/logout'
    },
    ProfilePage: {
        path: '/profile'
    },

    //Main
    // Khách hàng
    DashBoardPage: {
        path: '/'
    },

    // Cấu hình
    SettingPage: {
        path: '/setting'
    },

    ListCustomerPage: {
        path: '/customer'
    },
    CreateCustomerPage: {
        path: '/customer/create'
    },
    UpdateCustomerPage: {
        path: '/customer/:id/update',
        getPath: (_id: ['_id']) => {
            return `/customer/${_id}/update`;
        }
    },
    DetailCustomerPage: {
        path: '/customer/:id/detail',
        paramKey: 'id',
        getPath: (_id: Customer['_id']) => {
            return `/customer/${_id}/detail`;
        }
    },
    // Tour du lịch
    ListTourPage: {
        path: '/tours'
    },
    CreateTourPage: {
        path: '/tours/create'
    },
    UpdateTourPage: {
        path: '/tours/:id/update',
        paramKey: 'id',
        getPath: (_id: Tour['_id']) => {
            return `/tours/${_id}/update`;
        }
    },
    DetailTourPage: {
        path: '/tours/:id/detail',
        paramKey: 'id',
        getPath: (_id: Tour['_id']) => {
            return `/tours/${_id}/detail`;
        }
    },

    // Danh mục tour
    ListTourCategoryPage: {
        path: '/tours-category'
    },
    CreateTourCategoryPage: {
        path: '/tours-category/create'
    },
    UpdateTourCategoryPage: {
        path: '/tours-category/:id/update',
        paramKey: 'id',
        getPath: (_id: TourCategory['_id']) => {
            return `/tours-category/${_id}/update`;
        }
    },
    // Khách sạn
    ListHotelPage: {
        path: '/hotels'
    },
    CreateHotelPage: {
        path: '/hotels/create'
    },
    UpdateHotelPage: {
        path: '/hotels/:id/update',
        getPath: (_id: ['_id']) => {
            return `/hotels/${_id}/update`;
        }
    },

    // Danh mục khách sạn
    ListHotelCategoryPage: {
        path: '/hotels-category'
    },
    CreateHotelCategoryPage: {
        path: '/hotels-category/create'
    },
    UpdateHotelCategoryPage: {
        path: '/hotels-category/:id/update',
        getPath: (_id: ['_id']) => {
            return `/hotels-category/${_id}/update`;
        }
    },

    // Chuyến bay
    ListFlightPage: {
        path: '/flight'
    },
    CreateFlightPage: {
        path: '/flight/create'
    },
    UpdateFlightPage: {
        path: '/flight/:id/update',
        getPath: (_id: ['_id']) => {
            return `/flight/${_id}/update`;
        }
    },

    // Danh mục chuyến bay
    ListFlightCategoryPage: {
        path: '/flights-category'
    },
    CreateFlightCategoryPage: {
        path: '/flights-category/create'
    },
    UpdateFlightCategoryPage: {
        path: '/flights-category/:id/update',
        getPath: (_id: ['_id']) => {
            return `/flights-category/${_id}/update`;
        }
    },

    // Blog
    ListBlogPage: {
        path: '/blog'
    },
    CreateBlogPage: {
        path: '/blog/create'
    },
    UpdateBlogPage: {
        path: '/blog/:id/update',
        getPath: (_id: ['_id']) => {
            return `/blog/${_id}/update`;
        }
    },

    // Danh mục blog
    ListBlogCategoryPage: {
        path: '/blogs-category'
    },
    CreateBlogCategoryPage: {
        path: '/blogs-category/create'
    },
    UpdateBlogCategoryPage: {
        path: '/blogs-category/:id/update',
        getPath: (_id: ['_id']) => {
            return `/blogs-category/${_id}/update`;
        }
    },

    // User
    ListUserPage: {
        path: '/users'
    },
    CreateUserPage: {
        path: '/users/create'
    },
    UpdateUserPage: {
        path: '/users/:id/update',
        getPath: (_id: Account['_id']) => {
            return `/users/${_id}/update`;
        }
    },
    DetailUserPage: {
        path: '/user/:id/detail',
        getPath: (_id: ['_id']) => {
            return `/user/${_id}/detail`;
        },
        paramKey: 'id'
    },

    // Phân quyền user
    ListUserRolePage: {
        path: '/users-roles'
    },
    CreateUserRolePage: {
        path: '/users-roles/create'
    },
    UpdateUserRolePage: {
        path: '/users-roles/:id/update',
        getPath: (_id: ['_id']) => {
            return `/users-roles/${_id}/update`;
        }
    }
};
