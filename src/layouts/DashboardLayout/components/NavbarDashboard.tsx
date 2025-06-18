import { Layout, Menu } from 'antd';
import {
    DashboardOutlined,
    UserOutlined,
    ShoppingCartOutlined,
    FileOutlined,
    TeamOutlined,
    SettingOutlined,
    BarsOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { RouteConfig } from '../../../constants';
import { ReactNode } from 'react';

const { Sider } = Layout;

interface NavbarDashboardProps {
    collapsed: boolean;
}

// Định nghĩa cấu trúc menu item để tăng tính an toàn cho kiểu dữ liệu
interface MenuItem {
    key: string;
    icon: ReactNode;
    label: string;
    onClick?: () => void;
    children?: SubMenuItem[];
}

interface SubMenuItem {
    key: string;
    label: string;
    path?: string;
    onClick: () => void;
}

// Bảng ánh xạ từ đường dẫn đến key để tìm kiếm key được chọn một cách hiệu quả
const PATH_TO_KEYS_MAP: Record<string, string[]> = {
    // <Đường dẫn Url, mảng chứa key của cha và key của con>
    [RouteConfig.DashBoardPage.path]: ['dashboard'],
    [RouteConfig.ListUserPage.path]: ['users', 'users-list'],
    [RouteConfig.ListUserRolePage.path]: ['users', 'users-roles'],
    [RouteConfig.ListTourPage.path]: ['tour', 'tour-list'],
    [RouteConfig.CreateTourPage.path]: ['tour', 'tour-list'],
    [RouteConfig.UpdateTourPage.path]: ['tour', 'tour-list'],
    [RouteConfig.ListTourCategoryPage.path]: ['tour', 'tour-category'],
    [RouteConfig.CreateTourCategoryPage.path]: ['tour', 'tour-category'],
    [RouteConfig.UpdateTourCategoryPage.path]: ['tour', 'tour-category'],
    [RouteConfig.ListHotelPage.path]: ['hotel', 'hotel-list'],
    [RouteConfig.ListHotelCategoryPage.path]: ['hotel', 'hotel-categories'],
    [RouteConfig.ListFlightPage.path]: ['flight', 'flight-list'],
    [RouteConfig.ListFlightCategoryPage.path]: ['flight', 'flight-categories'],
    [RouteConfig.ListBlogPage.path]: ['blog', 'blog-list'],
    [RouteConfig.ListBlogCategoryPage.path]: ['blog', 'blog-categories'],
    [RouteConfig.ProfilePage.path]: ['profile'],
    [RouteConfig.SettingPage.path]: ['settings']
};

export const NavbarDashboard = ({ collapsed }: NavbarDashboardProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems: MenuItem[] = [
        {
            key: 'dashboard',
            icon: <DashboardOutlined />,
            label: 'Tổng quan',
            onClick: () => navigate(RouteConfig.DashBoardPage.path)
        },
        {
            key: 'users',
            icon: <UserOutlined />,
            label: 'Quản lý người dùng',
            children: [
                {
                    key: 'users-list',
                    label: 'Danh sách người dùng',
                    onClick: () => navigate('/users')
                }
                // {
                //     key: 'users-roles',
                //     label: 'Phân quyền',
                //     onClick: () => navigate('/users/roles')
                // }
            ]
        },
        {
            key: 'tour',
            icon: <ShoppingCartOutlined />,
            label: 'Quản lý tour du lịch',
            children: [
                {
                    key: 'tour-list',
                    label: 'Danh sách tour',
                    onClick: () => navigate(RouteConfig.ListTourPage.path)
                },
                {
                    key: 'tour-category',
                    label: 'Danh mục',
                    onClick: () => navigate(RouteConfig.ListTourCategoryPage.path)
                }
            ]
        },
        // {
        //     key: 'hotel',
        //     icon: <BarsOutlined />,
        //     label: 'Quản lý khách sạn',
        //     children: [
        //         {
        //             key: 'hotel-list',
        //             label: 'Danh sách khách sạn',
        //             onClick: () => navigate(RouteConfig.ListHotelPage.path)
        //         },
        //         {
        //             key: 'hotel-categories',
        //             label: 'Danh mục',
        //             onClick: () => navigate(RouteConfig.ListHotelCategoryPage.path)
        //         }
        //     ]
        // },
        // {
        //     key: 'flight',
        //     icon: <FileOutlined />,
        //     label: 'Quản lý chuyến bay',
        //     children: [
        //         {
        //             key: 'flight-list',
        //             label: 'Danh sách chuyến bay',
        //             onClick: () => navigate(RouteConfig.ListFlightPage.path)
        //         },
        //         {
        //             key: 'flight-categories',
        //             label: 'Danh mục',
        //             onClick: () => navigate(RouteConfig.ListFlightCategoryPage.path)
        //         }
        //     ]
        // },
        {
            key: 'blog',
            icon: <TeamOutlined />,
            label: 'Quản lý blog',
            children: [
                {
                    key: 'blog-list',
                    label: 'Danh sách blog',
                    onClick: () => navigate(RouteConfig.ListBlogPage.path)
                },
                {
                    key: 'blog-categories',
                    label: 'Danh mục',
                    onClick: () => navigate(RouteConfig.ListBlogCategoryPage.path)
                }
            ]
        },
        {
            key: 'settings',
            icon: <SettingOutlined />,
            label: 'Cài đặt hệ thống',
            onClick: () => navigate(RouteConfig.SettingPage.path)
        }
    ];

    const getSelectedKeys = (): string[] => {
        const path = location.pathname;

        // Kiểm tra các đường dẫn động
        if (path.match(/\/tours\/[^/]+\/update$/)) {
            return ['tour', 'tour-list'];
        }
        if (path.match(/\/tours-category\/[^/]+\/update$/)) {
            return ['tour', 'tour-category'];
        }

        // Tìm kiếm đường dẫn trong bảng ánh xạ, hoặc mặc định về dashboard
        return PATH_TO_KEYS_MAP[path] || ['dashboard'];
    };

    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={{
                ...styles.sider,
                background: '#fff'
            }}
            width={260}
            theme='light'
        >
            <div
                style={{
                    ...styles.logo,
                    borderBottom: '1px solid #f0f0f0'
                }}
            >
                <img
                    src='/public/vite.svg'
                    alt='Logo'
                    style={{
                        height: '32px',
                        margin: collapsed ? '16px auto' : '16px 24px'
                    }}
                />
            </div>
            <Menu
                theme='light'
                mode='inline'
                selectedKeys={getSelectedKeys()}
                items={menuItems}
                style={{
                    ...styles.menu,
                    fontSize: '15px',
                    fontWeight: 400
                }}
            />
        </Sider>
    );
};

const styles = {
    sider: {
        overflow: 'auto',
        height: '100vh',
        position: 'fixed' as const,
        left: 0,
        top: 0,
        bottom: 0,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
    },
    logo: {
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    menu: {
        borderRight: 0
    }
} as const;

export default NavbarDashboard;
