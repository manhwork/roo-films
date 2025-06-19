import { Account } from '../models/Account';
import { Customer } from '../models/Customer';
import { Tour } from '../models/Tour';
import { TourCategory } from '../models/TourCategory';
import { User } from '../models/User';
import { Actor } from '../models/Actor';
import { Genres } from '../models/Genres';
import { Director } from '../models/Director';
import { Content } from '../models/Content';
import { Comment } from '../models/Comment';
import { Review } from '../models/Review';
import { Season } from '../models/Season';
import { Episode } from '../models/Episode';
import { WatchHistory } from '../models/WatchHistory';
import { Watchlist } from '../models/Watchlist';

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
    },

    // Actor
    ListActorPage: {
        path: '/actors'
    },
    CreateActorPage: {
        path: '/actors/create'
    },
    UpdateActorPage: {
        path: '/actors/:id/update',
        paramKey: 'id',
        getPath: (_id: Actor['_id']) => {
            return `/actors/${_id}/update`;
        }
    },
    DetailActorPage: {
        path: '/actors/:id/detail',
        paramKey: 'id',
        getPath: (_id: Actor['_id']) => {
            return `/actors/${_id}/detail`;
        }
    },

    // Genres
    ListGenresPage: {
        path: '/genres'
    },
    CreateGenresPage: {
        path: '/genres/create'
    },
    UpdateGenresPage: {
        path: '/genres/:id/update',
        paramKey: 'id',
        getPath: (_id: Genres['_id']) => {
            return `/genres/${_id}/update`;
        }
    },
    DetailGenresPage: {
        path: '/genres/:id/detail',
        paramKey: 'id',
        getPath: (_id: Genres['_id']) => {
            return `/genres/${_id}/detail`;
        }
    },

    // Director
    ListDirectorPage: {
        path: '/directors'
    },
    CreateDirectorPage: {
        path: '/directors/create'
    },
    UpdateDirectorPage: {
        path: '/directors/:id/update',
        paramKey: 'id',
        getPath: (_id: Director['_id']) => {
            return `/directors/${_id}/update`;
        }
    },
    DetailDirectorPage: {
        path: '/directors/:id/detail',
        paramKey: 'id',
        getPath: (_id: Director['_id']) => {
            return `/directors/${_id}/detail`;
        }
    },

    // Content
    ListContentPage: {
        path: '/contents'
    },
    CreateContentPage: {
        path: '/contents/create'
    },
    UpdateContentPage: {
        path: '/contents/:id/update',
        paramKey: 'id',
        getPath: (_id: Content['_id']) => {
            return `/contents/${_id}/update`;
        }
    },
    DetailContentPage: {
        path: '/contents/:id/detail',
        paramKey: 'id',
        getPath: (_id: Content['_id']) => {
            return `/contents/${_id}/detail`;
        }
    },

    // Comment
    ListCommentPage: {
        path: '/comments'
    },
    CreateCommentPage: {
        path: '/comments/create'
    },
    UpdateCommentPage: {
        path: '/comments/:id/update',
        paramKey: 'id',
        getPath: (_id: Comment['_id']) => {
            return `/comments/${_id}/update`;
        }
    },
    DetailCommentPage: {
        path: '/comments/:id/detail',
        paramKey: 'id',
        getPath: (_id: Comment['_id']) => {
            return `/comments/${_id}/detail`;
        }
    },

    // Review
    ListReviewPage: {
        path: '/reviews'
    },
    CreateReviewPage: {
        path: '/reviews/create'
    },
    UpdateReviewPage: {
        path: '/reviews/:id/update',
        paramKey: 'id',
        getPath: (_id: Review['_id']) => {
            return `/reviews/${_id}/update`;
        }
    },
    DetailReviewPage: {
        path: '/reviews/:id/detail',
        paramKey: 'id',
        getPath: (_id: Review['_id']) => {
            return `/reviews/${_id}/detail`;
        }
    },

    // Season
    ListSeasonPage: {
        path: '/seasons'
    },
    CreateSeasonPage: {
        path: '/seasons/create'
    },
    UpdateSeasonPage: {
        path: '/seasons/:id/update',
        paramKey: 'id',
        getPath: (_id: Season['_id']) => {
            return `/seasons/${_id}/update`;
        }
    },
    DetailSeasonPage: {
        path: '/seasons/:id/detail',
        paramKey: 'id',
        getPath: (_id: Season['_id']) => {
            return `/seasons/${_id}/detail`;
        }
    },

    // Episode
    ListEpisodePage: {
        path: '/episodes'
    },
    CreateEpisodePage: {
        path: '/episodes/create'
    },
    UpdateEpisodePage: {
        path: '/episodes/:id/update',
        paramKey: 'id',
        getPath: (_id: Episode['_id']) => {
            return `/episodes/${_id}/update`;
        }
    },
    DetailEpisodePage: {
        path: '/episodes/:id/detail',
        paramKey: 'id',
        getPath: (_id: Episode['_id']) => {
            return `/episodes/${_id}/detail`;
        }
    },

    // Watch History
    ListWatchHistoryPage: {
        path: '/watch-history'
    },
    CreateWatchHistoryPage: {
        path: '/watch-history/create'
    },
    UpdateWatchHistoryPage: {
        path: '/watch-history/:id/update',
        paramKey: 'id',
        getPath: (_id: WatchHistory['_id']) => {
            return `/watch-history/${_id}/update`;
        }
    },
    DetailWatchHistoryPage: {
        path: '/watch-history/:id/detail',
        paramKey: 'id',
        getPath: (_id: WatchHistory['_id']) => {
            return `/watch-history/${_id}/detail`;
        }
    },

    // Watchlist
    ListWatchlistPage: {
        path: '/watchlist'
    },
    CreateWatchlistPage: {
        path: '/watchlist/create'
    },
    UpdateWatchlistPage: {
        path: '/watchlist/:id/update',
        paramKey: 'id',
        getPath: (_id: Watchlist['_id']) => {
            return `/watchlist/${_id}/update`;
        }
    },
    DetailWatchlistPage: {
        path: '/watchlist/:id/detail',
        paramKey: 'id',
        getPath: (_id: Watchlist['_id']) => {
            return `/watchlist/${_id}/detail`;
        }
    }
};
